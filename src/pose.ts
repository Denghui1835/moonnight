import { FilesetResolver, PoseLandmarker } from "@mediapipe/tasks-vision";
import { Pose, SEG, Vec } from "./rig";

const I = {
  nose: 0,
  ls: 11, rs: 12,
  le: 13, re: 14,
  lw: 15, rw: 16,
  lh: 23, rh: 24,
  lk: 25, rk: 26,
  la: 27, ra: 28,
} as const;

type Pt = { x: number; y: number; v: number };

export type TrackerStatus = "idle" | "loading" | "ready" | "error";

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function smoothPose(prev: Pose | null, next: Pose, t: number): Pose {
  if (!prev) return next;
  const out = {} as Pose;
  for (const key of Object.keys(next) as (keyof Pose)[]) {
    out[key] = {
      x: lerp(prev[key].x, next[key].x, t),
      y: lerp(prev[key].y, next[key].y, t),
    };
  }
  return out;
}

export class PoseTracker {
  status: TrackerStatus = "idle";
  errorMessage = "";

  private landmarker: PoseLandmarker | null = null;
  private video: HTMLVideoElement;
  private lastVideoTime = -1;
  private smoothed: Pose | null = null;
  private lastDetect = 0;

  constructor(video: HTMLVideoElement) {
    this.video = video;
  }

  async start(): Promise<void> {
    if (this.status === "ready") return;
    this.status = "loading";
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: "user" },
        audio: false,
      });
      this.video.srcObject = stream;
      await this.video.play();
    } catch (e) {
      this.status = "error";
      this.errorMessage = "打不开摄像头，可以用键盘模式。";
      throw e;
    }

    const base = import.meta.env.BASE_URL;
    const fileset = await FilesetResolver.forVisionTasks(`${base}wasm`);
    const create = (delegate: "GPU" | "CPU") =>
      PoseLandmarker.createFromOptions(fileset, {
        baseOptions: { modelAssetPath: `${base}models/pose_landmarker_lite.task`, delegate },
        numPoses: 1,
        runningMode: "VIDEO",
        minPoseDetectionConfidence: 0.5,
        minPosePresenceConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

    try {
      this.landmarker = await create("GPU");
    } catch {
      this.landmarker = await create("CPU");
    }
    this.status = "ready";
  }

  stop() {
    const stream = this.video.srcObject as MediaStream | null;
    stream?.getTracks().forEach((t) => t.stop());
    this.video.srcObject = null;
    this.landmarker?.close();
    this.landmarker = null;
    this.status = "idle";
  }

  /** returns the current player pose in body units, or null when nobody is visible */
  update(nowMs: number): Pose | null {
    if (!this.landmarker || this.video.readyState < 2) return null;
    if (nowMs - this.lastDetect < 28) return this.smoothed;
    this.lastDetect = nowMs;
    if (this.video.currentTime === this.lastVideoTime) return this.smoothed;
    this.lastVideoTime = this.video.currentTime;

    let result;
    try {
      result = this.landmarker.detectForVideo(this.video, nowMs);
    } catch {
      return this.smoothed;
    }
    const lm = result.landmarks?.[0];
    if (!lm) return this.smoothed;

    const aspect = this.video.videoWidth / Math.max(1, this.video.videoHeight);
    const p = (i: number): Pt => ({
      x: lm[i].x * aspect,
      y: lm[i].y,
      v: lm[i].visibility ?? 1,
    });

    const ls = p(I.ls), rs = p(I.rs), lh = p(I.lh), rh = p(I.rh);
    if (ls.v < 0.5 || rs.v < 0.5 || lh.v < 0.5 || rh.v < 0.5) return this.smoothed;

    const sc = { x: (ls.x + rs.x) / 2, y: (ls.y + rs.y) / 2 };
    const pel = { x: (lh.x + rh.x) / 2, y: (lh.y + rh.y) / 2 };
    const torso = Math.hypot(sc.x - pel.x, sc.y - pel.y);
    if (torso < 0.04) return this.smoothed;

    const s = 1 / torso;
    const conv = (q: Pt): Vec => ({ x: (q.x - pel.x) * s, y: -(q.y - pel.y) * s });

    const raw: Pose = {
      pelvis: { x: 0, y: 0 },
      shoulderCenter: conv({ ...sc, v: 1 }),
      head: conv(p(I.nose)),
      lShoulder: conv(ls),
      lElbow: conv(p(I.le)),
      lWrist: conv(p(I.lw)),
      rShoulder: conv(rs),
      rElbow: conv(p(I.re)),
      rWrist: conv(p(I.rw)),
      lHip: conv(lh),
      lKnee: conv(p(I.lk)),
      lAnkle: conv(p(I.la)),
      rHip: conv(rh),
      rKnee: conv(p(I.rk)),
      rAnkle: conv(p(I.ra)),
    };

    // laptop cameras clip the legs; rebuild a straight leg instead of scoring against junk
    fixLeg(raw, "l", p(I.lk).v, p(I.la).v);
    fixLeg(raw, "r", p(I.rk).v, p(I.ra).v);

    this.smoothed = smoothPose(this.smoothed, raw, 0.45);
    return this.smoothed;
  }
}

function fixLeg(pose: Pose, side: "l" | "r", kneeVis: number, ankleVis: number) {
  const hip = side === "l" ? pose.lHip : pose.rHip;
  const knee = side === "l" ? pose.lKnee : pose.rKnee;
  const ankle = { x: knee.x, y: knee.y - SEG.shin };
  if (kneeVis < 0.4) {
    pose[side === "l" ? "lKnee" : "rKnee"] = { x: hip.x, y: hip.y - SEG.thigh };
    pose[side === "l" ? "lAnkle" : "rAnkle"] = { x: hip.x, y: hip.y - SEG.thigh - SEG.shin };
    return;
  }
  if (ankleVis < 0.4) {
    const dx = knee.x - hip.x;
    const dy = knee.y - hip.y;
    const len = Math.hypot(dx, dy) || 1;
    ankle.x = knee.x + (dx / len) * SEG.shin;
    ankle.y = knee.y + (dy / len) * SEG.shin;
    pose[side === "l" ? "lAnkle" : "rAnkle"] = ankle;
  }
}
