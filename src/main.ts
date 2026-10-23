import "./style.css";
import { buildPose, blendParams, easeInOut } from "./rig";
import { MOVES } from "./moves";
import { place, renderScene, Scene } from "./stage";

const canvas = document.getElementById("stage") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

let W = 0;
let H = 0;

function resize() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  W = window.innerWidth;
  H = window.innerHeight;
  canvas.width = Math.floor(W * dpr);
  canvas.height = Math.floor(H * dpr);
  canvas.style.width = W + "px";
  canvas.style.height = H + "px";
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

window.addEventListener("resize", resize);
resize();

const demo = ["stand", "spread", "armsUp", "slump", "clawL", "clawR", "kneeL", "twist", "reach", "clawBoth"];
const start = performance.now();

function frame() {
  const t = (performance.now() - start) / 1000;
  const per = 1.8;
  const idx = Math.floor(t / per) % demo.length;
  const next = (idx + 1) % demo.length;
  const local = (t % per) / per;
  const eased = local < 0.4 ? easeInOut(local / 0.4) : 1;
  const pose = buildPose(blendParams(MOVES[demo[idx]].params, MOVES[demo[next]].params, eased));
  const backupPose = buildPose(MOVES[demo[idx]].params);

  const ground = H * 0.94;
  const height = Math.min(H * 0.6, W * 0.52);

  const scene: Scene = {
    time: t,
    beatPhase: (t * 2) % 1,
    instructor: place(pose, W * 0.5, ground, height, { reflection: true }),
    backups: [
      place(backupPose, W * 0.5 - height * 0.64, ground - H * 0.02, height * 0.8, { alpha: 0.75 }),
      place(backupPose, W * 0.5 + height * 0.64, ground - H * 0.02, height * 0.8, { alpha: 0.75 }),
      place(backupPose, W * 0.5 - height * 1.08, ground - H * 0.035, height * 0.72, { alpha: 0.55 }),
      place(backupPose, W * 0.5 + height * 1.08, ground - H * 0.035, height * 0.72, { alpha: 0.55 }),
    ],
    reflection: null,
    fear: 0.15,
    litCandles: 2,
    candleTotal: 5,
    dark: 0,
    glitch: 0,
    shake: 0,
  };

  renderScene(ctx, W, H, scene);
  requestAnimationFrame(frame);
}

requestAnimationFrame(frame);
