import { AudioEngine } from "./audio";
import { PoseTracker } from "./pose";
import { blendParams, buildPose, easeInOut, matchScore, MoveParams, Pose } from "./rig";
import { BASE, levelPlan, LevelPlan, MAX_LEVEL, MOVES, TUTORIAL } from "./moves";
import { Figure, place, renderScene, Scene } from "./stage";
import type { SceneRenderer } from "./render3d";

export type GameMode = "camera" | "keys";
export type Phase = "intro" | "tutorial" | "level" | "levelup" | "dead" | "ending";

export type Stats = { level: number; hits: number; perfects: number; zombies: number };

export type Hud = {
  visible: boolean;
  round: string;
  hits: number;
  moveIndex: number;
  moveTotal: number;
  moveName: string;
  key: string;
  dots: string[];
  subtitle: string;
  meter: number;
  tutorial: boolean;
  /** 结局/死亡时收起计分板，只留叙事字幕 */
  cinema: boolean;
};

export type GameDeps = {
  audio: AudioEngine;
  tracker: PoseTracker | null;
  mode: GameMode;
  renderer?: SceneRenderer | null;
  onDeath: (s: Stats) => void;
  onEnding: (s: Stats) => void;
};

type TutStep = { id: string; kind: "demo" | "do"; beats: number };

const PASS = 0.45;
const PERFECT = 0.75;
const LEAD_IN = 2;

/** 每关开头的一句叙事，之后让位给连对提示 */
const LEVEL_LINES: Record<number, string> = {
  1: "她们开始靠近了。",
  2: "它们曾经也站在这里。",
  3: "老树上，系着一条褪色的红绳。",
  4: "镜中的她，只比你快半拍。",
  5: "所有人都在等你。",
  6: "最后一遍。跳完就去看月亮。",
};

const KEY_MOVE: Record<string, string> = { "↑": "spread", "↓": "slump", "←": "clawL", "→": "clawR" };

function normalizeKey(k: string): string {
  switch (k) {
    case "ArrowUp":
    case "w":
    case "W":
    case "↑":
      return "↑";
    case "ArrowDown":
    case "s":
    case "S":
    case "↓":
      return "↓";
    case "ArrowLeft":
    case "a":
    case "A":
    case "←":
      return "←";
    case "ArrowRight":
    case "d":
    case "D":
    case "→":
      return "→";
    default:
      return "";
  }
}

const mod = (a: number, b: number) => ((a % b) + b) % b;

export class Game {
  readonly hud: Hud = {
    visible: false,
    round: "",
    hits: 0,
    moveIndex: 0,
    moveTotal: 0,
    moveName: "",
    key: "",
    dots: [],
    subtitle: "",
    meter: 0,
    tutorial: false,
    cinema: false,
  };
  readonly stats: Stats = { level: 0, hits: 0, perfects: 0, zombies: 2 };

  phase: Phase = "intro";
  mode: GameMode;

  private audio: AudioEngine;
  private tracker: PoseTracker | null;
  private renderer: SceneRenderer | null;
  private onDeath: (s: Stats) => void;
  private onEnding: (s: Stats) => void;

  private w = 0;
  private h = 0;
  private last = 0;
  private dt = 0;
  private time = 0;
  private phaseT = 0;

  private bpm = 104;
  private beatOrigin = 0;
  private beat = 0;
  private beatPhase = 0;
  private lastBeat = 0;
  private audioClockOn = false;
  private musicOn = false;

  private level = 0;
  private plan: LevelPlan | null = null;
  private moveIndex = -1;
  private results: string[] = [];
  private best = 0;
  private judged = false;
  private resolved = false;
  private failed = false;
  private sawPose = false;
  private combo = 0;

  private tutSteps: TutStep[] = [];
  private tutIdx = 0;
  private tutStart = 2;

  private playerPose: Pose | null = null;
  private keyed = "";
  private keyDown = false;

  private cue: MoveParams = BASE;
  private prevCue: MoveParams = BASE;
  private cueT = 1;
  private cueDur = 0.22;
  private instructor: Pose = buildPose(BASE);
  private target: Pose = buildPose(BASE);

  private zombieP: number[] = [];
  private prevZombieP: number[] = [];
  private snapPulse = 0;

  private deadT = 0;
  private hitSfx = false;
  private lunge = 0;
  private dark = 0;
  private blood = 0;
  private shake = 0;
  private glitch = 0;

  private endingT = 0;
  private reported = false;

  constructor(deps: GameDeps) {
    this.audio = deps.audio;
    this.tracker = deps.tracker;
    this.renderer = deps.renderer ?? null;
    this.mode = deps.mode;
    this.onDeath = deps.onDeath;
    this.onEnding = deps.onEnding;
  }

  /* ---------------- lifecycle ---------------- */

  begin(): void {
    this.reset();
    this.phase = "intro";
    this.phaseT = 0;
    this.bpm = 104;
    this.audio.setTempo(104);
    this.audio.setLayers(0);
    this.beatOrigin = this.audio.now();
    this.beat = 0;
    this.lastBeat = 0;
    this.audioClockOn = this.audio.isRunning();
    this.hud.visible = false;
    this.hud.subtitle = "";
    this.audio.door();
  }

  restart(): void {
    this.reset();
    this.startLevel(1);
  }

  private reset(): void {
    this.stats.level = 0;
    this.stats.hits = 0;
    this.stats.perfects = 0;
    this.stats.zombies = 2;
    this.level = 0;
    this.plan = null;
    this.moveIndex = -1;
    this.results = [];
    this.combo = 0;
    this.playerPose = null;
    this.keyed = "";
    this.keyDown = false;
    this.musicOn = false;
    this.zombieP = [];
    this.prevZombieP = [];
    this.snapPulse = 0;
    this.deadT = 0;
    this.hitSfx = false;
    this.lunge = 0;
    this.dark = 0;
    this.blood = 0;
    this.shake = 0;
    this.glitch = 0;
    this.endingT = 0;
    this.reported = false;
    this.hud.dots = [];
    this.hud.moveName = "";
    this.hud.key = "";
    this.hud.tutorial = false;
    this.hud.meter = 0;
    this.setInstructor(BASE, true);
    this.audio.restoreMusic();
  }

  /* ---------------- input ---------------- */

  pushKey(raw: string): void {
    const key = normalizeKey(raw);
    if (!key) return;
    this.keyDown = true;
    this.keyed = KEY_MOVE[key];
    if (this.phase === "tutorial") this.keyTutorial(key);
    else if (this.phase === "level") this.keyLevel(key);
  }

  releaseKey(): void {
    this.keyDown = false;
    this.keyed = "";
  }

  replayMove(): void {
    if (this.phase !== "tutorial") return;
    const step = this.tutSteps[this.tutIdx];
    const id = step ? step.id : TUTORIAL[0];
    this.tutSteps = [
      { id, kind: "demo", beats: 2 },
      { id, kind: "demo", beats: 2 },
      { id, kind: "do", beats: 4 },
    ];
    this.tutIdx = 0;
    this.tutStart = this.beat + 1;
    this.resetWindow();
    this.hud.subtitle = "再看一遍。";
  }

  replayAll(): void {
    if (this.phase !== "tutorial") return;
    this.tutSteps = this.tutorialSteps();
    this.tutIdx = 0;
    this.tutStart = this.beat + 1;
    this.resetWindow();
    this.hud.subtitle = "从第一个开始。";
  }

  skipTutorial(): void {
    if (this.phase !== "tutorial") return;
    this.startLevel(1);
  }

  /** 摄像头中途断开：保住当前这一拍，之后改用键盘 / 触屏。 */
  degradeToKeys(): void {
    if (this.mode === "keys") return;
    this.mode = "keys";
    this.tracker = null;
    if ((this.phase === "tutorial" || this.phase === "level") && !this.judged) {
      this.judged = true;
      this.best = Math.max(this.best, PASS);
    }
  }

  /* ---------------- tick ---------------- */

  tick(now: number, w: number, h: number): void {
    this.w = w;
    this.h = h;
    const dt = this.last ? Math.min(0.06, now - this.last) : 0.016;
    this.last = now;
    this.dt = dt;
    this.time = now;
    this.phaseT += dt;
    this.snapPulse = Math.max(0, this.snapPulse - dt * 2.2);
    this.glitch = Math.max(0, this.glitch - dt * 2.6);
    this.shake = Math.max(0, this.shake - dt * 1.7);

    if (this.tracker) {
      const p = this.tracker.update(now * 1000);
      if (p) {
        this.playerPose = p;
        this.sawPose = true;
      }
    }

    this.syncBeat();

    switch (this.phase) {
      case "intro":
        this.tickIntro();
        break;
      case "tutorial":
        this.tickTutorial();
        break;
      case "level":
        this.tickLevel();
        break;
      case "levelup":
        if (this.phaseT > 2.4) this.startLevel(this.level + 1);
        break;
      case "dead":
        this.tickDead(dt);
        break;
      case "ending":
        this.tickEnding();
        break;
    }

    this.updateCue(dt);
    if (this.phase !== "ending" && this.phase !== "dead") this.updateZombies();
    this.syncHud();
  }

  /** AudioContext 是单点故障：挂起/未初始化时退回帧时钟，恢复时重新锚定，不倒退也不跳拍。 */
  private syncBeat(): void {
    const step = (this.dt * this.bpm) / 60;
    if (this.audio.isRunning()) {
      const raw = this.audio.now();
      let next = ((raw - this.beatOrigin) * this.bpm) / 60;
      const drift = next - this.lastBeat;
      const stalled = drift < -0.25 || drift > Math.max(0.75, step + 0.4);
      if (!this.audioClockOn || stalled) {
        this.beatOrigin = raw - ((this.lastBeat + step) * 60) / this.bpm;
        next = this.lastBeat + step;
      }
      this.beat = next;
      this.audioClockOn = true;
    } else {
      this.beat += step;
      this.audioClockOn = false;
    }
    this.lastBeat = this.beat;
    this.beatPhase = this.beat - Math.floor(this.beat);
  }

  private startMusic(bpm: number, layers: number): void {
    this.bpm = bpm;
    this.audio.setTempo(bpm);
    this.audio.setLayers(layers);
    this.audio.restoreMusic();
    this.audio.stopGroove();
    this.audio.startGroove();
    this.beatOrigin = this.audio.now() + 0.08;
    this.beat = 0;
    this.lastBeat = 0;
    this.audioClockOn = this.audio.isRunning();
    this.musicOn = true;
  }

  private tickIntro(): void {
    const k = this.phaseT;
    if (k > 1.1 && !this.musicOn) this.startMusic(104, 0);
    if (k > 0.2) this.hud.subtitle = "午夜，旧剧院。";
    if (k > 2.6) this.hud.subtitle = "镜子里，有人在等你。";
    if (k > 4.4) this.hud.subtitle = "跟着她跳。";
    if (k > 6.2) this.startTutorial();
  }

  /* ---------------- tutorial ---------------- */

  private tutorialSteps(): TutStep[] {
    const out: TutStep[] = [];
    for (const id of TUTORIAL) {
      out.push({ id, kind: "demo", beats: 2 }, { id, kind: "demo", beats: 2 }, { id, kind: "do", beats: 4 });
    }
    return out;
  }

  private startTutorial(): void {
    this.phase = "tutorial";
    this.phaseT = 0;
    this.tutSteps = this.tutorialSteps();
    this.tutIdx = 0;
    this.tutStart = LEAD_IN;
    this.resetWindow();
    this.startMusic(100, 0);
    this.hud.round = "教学";
    this.hud.moveTotal = TUTORIAL.length;
    this.hud.subtitle = "先看她跳两遍。";
  }

  private tickTutorial(): void {
    const step = this.tutSteps[this.tutIdx];
    if (!step) {
      this.startLevel(1);
      return;
    }
    const local = this.beat - this.tutStart;
    if (local < 0) {
      this.setInstructor(BASE);
      return;
    }

    const move = MOVES[step.id];
    this.setInstructor(move.params);
    this.hud.moveName = move.name;
    this.hud.key = move.key;
    this.hud.moveIndex = TUTORIAL.indexOf(step.id) + 1;

    if (step.kind === "demo") {
      this.hud.subtitle = "看她的手。";
      this.hud.meter = 0;
    } else {
      this.hud.subtitle = "跟着做。";
      this.sample();
    }

    if (local >= step.beats) {
      if (step.kind === "do") {
        const ok = this.mode === "keys" ? this.judged && !this.failed : this.best >= PASS;
        if (!ok) {
          this.retryTutorial(step.id);
          return;
        }
        this.stats.hits++;
        this.combo++;
        this.hud.subtitle = "对。";
      }
      this.tutStart += step.beats;
      this.tutIdx++;
      this.resetWindow();
      if (this.tutIdx >= this.tutSteps.length) this.startLevel(1);
    }
  }

  private retryTutorial(id: string): void {
    this.audio.crow();
    this.hud.subtitle =
      this.mode === "keys" ? "按错了。再看一遍。" : this.sawPose ? "还差一点。再看一遍。" : "看不到你。站远些，或跳过教学。";
    this.tutSteps = [
      { id, kind: "demo", beats: 2 },
      { id, kind: "demo", beats: 2 },
      { id, kind: "do", beats: 4 },
    ];
    this.tutIdx = 0;
    this.tutStart = this.beat + 1;
    this.resetWindow();
  }

  private keyTutorial(key: string): void {
    const step = this.tutSteps[this.tutIdx];
    if (!step || step.kind !== "do" || this.judged) return;
    const local = this.beat - this.tutStart;
    if (local < 0 || local > step.beats) return;
    this.judged = true;
    if (key === MOVES[step.id].key) {
      this.best = 1;
      this.hud.meter = 1;
      this.audio.step();
    } else {
      this.failed = true;
      this.hud.meter = 0;
    }
  }

  /* ---------------- levels ---------------- */

  private startLevel(n: number): void {
    this.phase = "level";
    this.phaseT = 0;
    this.level = n;
    this.stats.level = n;
    this.plan = levelPlan(n);
    this.stats.zombies = this.plan.zombieCount;
    this.moveIndex = -1;
    this.results = new Array(this.plan.moveIds.length).fill("");
    this.prevZombieP = [];
    this.resetWindow();
    this.setInstructor(BASE, true);
    this.hud.tutorial = false;
    this.hud.round = `第 ${n} 关`;
    this.hud.moveTotal = this.plan.moveIds.length;
    this.hud.moveIndex = 0;
    this.hud.dots = this.results.slice();
    this.hud.subtitle = LEVEL_LINES[n] ?? "";
    this.startMusic(this.plan.bpm, n);
  }

  private tickLevel(): void {
    const plan = this.plan;
    if (!plan) return;
    const t = this.beat - LEAD_IN;
    if (t < 0) {
      this.setInstructor(BASE);
      this.hud.subtitle = `第 ${this.level} 关`;
      return;
    }
    const idx = Math.floor(t / plan.beatsPerMove);
    if (idx >= plan.moveIds.length) {
      this.clearLevel();
      return;
    }
    const move = MOVES[plan.moveIds[idx]];
    if (idx !== this.moveIndex) {
      this.moveIndex = idx;
      this.resetWindow();
      this.setInstructor(move.params);
      this.target = buildPose(move.params);
    }
    const local = t - idx * plan.beatsPerMove;
    this.hud.moveIndex = idx + 1;
    this.hud.moveName = move.name;
    this.hud.key = move.key;
    this.hud.subtitle =
      t < 4 ? LEVEL_LINES[this.level] ?? "" : this.combo >= 3 ? `连对 ${this.combo}` : "";
    this.sample();
    if (!this.resolved && local > plan.beatsPerMove - 0.15) this.judgeLevel(idx);
  }

  private judgeLevel(idx: number): void {
    this.resolved = true;
    if (this.mode === "camera" && !this.sawPose) {
      this.judged = true;
      this.results[idx] = "done";
      return;
    }
    const ok = this.mode === "keys" ? this.judged && !this.failed : this.best >= PASS;
    if (!ok) {
      this.die();
      return;
    }
    this.judged = true;
    const perfect = this.mode === "camera" && this.best >= PERFECT;
    this.results[idx] = perfect ? "perfect" : "done";
    this.stats.hits++;
    if (perfect) this.stats.perfects++;
    this.combo++;
    this.audio.step();
  }

  private keyLevel(key: string): void {
    const plan = this.plan;
    if (!plan || this.judged) return;
    if (this.moveIndex < 0 || this.moveIndex >= plan.moveIds.length) return;
    const local = this.beat - LEAD_IN - this.moveIndex * plan.beatsPerMove;
    if (local < 0.05 || local > plan.beatsPerMove) return;
    const move = MOVES[plan.moveIds[this.moveIndex]];
    this.judged = true;
    if (key === move.key) {
      this.best = 1;
      this.hud.meter = 1;
    } else {
      this.failed = true;
      this.die();
    }
  }

  private clearLevel(): void {
    if (this.level >= MAX_LEVEL) {
      this.toEnding();
      return;
    }
    this.phase = "levelup";
    this.phaseT = 0;
    this.hud.subtitle = `第 ${this.level} 关 · 过了`;
    this.audio.stinger();
  }

  private die(): void {
    if (this.phase === "dead") return;
    this.phase = "dead";
    this.phaseT = 0;
    this.deadT = 0;
    this.lunge = 0;
    this.shake = 1;
    this.glitch = 0.85;
    this.hud.meter = 0;
    this.hud.subtitle = "";
    this.hud.moveName = "";
    this.hud.key = "";
    this.audio.scream();
    this.audio.crowd();
    this.audio.silenceMusic();
  }

  private tickDead(dt: number): void {
    this.deadT += dt;
    this.lunge = Math.min(1, this.deadT / 0.26);
    if (!this.hitSfx && this.deadT > 0.3) {
      this.hitSfx = true;
      this.audio.glass();
      this.shake = 1;
      this.glitch = 1;
    }
    this.blood = Math.min(1, Math.max(0, (this.deadT - 0.25) / 0.3));
    this.dark = Math.min(1, Math.max(0, (this.deadT - 0.7) / 0.8));
    if (this.deadT > 2.6 && !this.reported) {
      this.reported = true;
      this.onDeath({ ...this.stats, level: this.level });
    }
  }

  private toEnding(): void {
    this.phase = "ending";
    this.phaseT = 0;
    this.endingT = 0;
    this.audio.silenceMusic();
    this.audio.crow();
    this.hud.subtitle = "她放下了手。";
    this.hud.dots = [];
    this.hud.tutorial = false;
    this.hud.moveName = "";
    this.hud.key = "";
  }

  private tickEnding(): void {
    this.endingT += this.dt;
    if (this.endingT > 2.2) this.hud.subtitle = "你转过身。";
    if (this.endingT > 4.2) this.hud.subtitle = "队伍的最后，多了一个人。";
    if (this.endingT > 7.6 && !this.reported) {
      this.reported = true;
      this.onEnding({ ...this.stats });
    }
  }

  /* ---------------- shared bits ---------------- */

  private resetWindow(): void {
    this.best = 0;
    this.judged = false;
    this.resolved = false;
    this.failed = false;
    this.sawPose = false;
    this.hud.meter = 0;
  }

  private sample(): void {
    if (this.mode !== "camera" || !this.playerPose) return;
    const s = matchScore(this.playerPose, this.target);
    if (s > this.best) this.best = s;
    this.hud.meter = s;
  }

  private setInstructor(params: MoveParams, snap = false): void {
    if (snap) {
      this.prevCue = params;
      this.cue = params;
      this.cueT = 1;
      this.target = buildPose(params);
      return;
    }
    if (this.cue === params) return;
    this.prevCue = this.cue;
    this.cue = params;
    this.cueT = 0;
    this.target = buildPose(params);
  }

  private updateCue(dt: number): void {
    this.cueT = Math.min(1, this.cueT + dt / this.cueDur);
    const t = easeInOut(this.cueT);
    this.instructor = buildPose(blendParams(this.prevCue, this.cue, t));
  }

  private updateZombies(): void {
    const plan = this.plan;
    const n = this.phase === "intro" || this.phase === "tutorial" ? 2 : plan ? plan.zombieCount : 2;
    const cycle = plan ? plan.cycleBeats : 12;
    const ps: number[] = [];
    for (let j = 0; j < n; j++) {
      let p = 0.02 + j * 0.012;
      if (this.phase !== "intro" && this.phase !== "tutorial") {
        p = mod(this.beat + j * cycle * 0.17, cycle) / cycle;
      }
      const prev = this.prevZombieP[j];
      if (prev !== undefined && p + 0.5 < prev) {
        this.snapPulse = Math.min(1, this.snapPulse + 0.55);
        this.glitch = Math.max(this.glitch, 0.2);
        this.audio.step();
      }
      this.prevZombieP[j] = p;
      ps.push(p);
    }
    this.prevZombieP.length = n;
    this.zombieP = ps;
  }

  private syncHud(): void {
    this.hud.hits = this.stats.hits;
    this.hud.visible = this.phase !== "intro";
    this.hud.tutorial = this.phase === "tutorial";
    this.hud.cinema = this.phase === "ending" || this.phase === "dead";
    if (this.phase === "level" || this.phase === "levelup") {
      this.hud.dots = this.results.map((r, i) => (this.phase === "level" && i === this.moveIndex ? "now" : r));
    }
  }

  /* ---------------- render ---------------- */

  render(ctx: CanvasRenderingContext2D): void {
    const scene = this.scene();
    if (this.renderer) this.renderer.render(scene, this.w, this.h);
    else renderScene(ctx, this.w, this.h, scene);
  }

  private scene(): Scene {
    const w = this.w;
    const h = this.h;
    const ground = h * 0.93;
    const figH = Math.min(h * 0.62, w * 0.58);

    let instructorAlpha = 1;
    let zombies: Figure[] = [];
    if (this.phase === "ending") {
      instructorAlpha = Math.max(0, 1 - this.endingT / 1.4);
      if (this.endingT > 3.6) {
        const a = Math.min(1, (this.endingT - 3.6) / 2);
        zombies = [
          place(this.shamblePose(0), w * 0.17, h * 0.79, h * 0.36, {
            alpha: a * 0.9,
            stare: a * 0.55,
            reflection: true,
            skirt: true,
          }),
        ];
      }
    } else if (this.phase === "dead") {
      zombies = this.lungeFigures();
    } else {
      zombies = this.creepFigures();
    }

    const instructor = place(this.instructor, w * 0.5, ground, figH, {
      reflection: true,
      alpha: instructorAlpha,
      skirt: true,
      hat: true,
    });

    return {
      time: this.time,
      beatPhase: this.beatPhase,
      instructor,
      zombies,
      reflection: this.playerFigure(),
      crack: Math.min(1, this.blood * 0.8 + this.snapPulse * 0.18),
      crowCount: 1 + Math.min(7, this.level + (this.phase === "intro" ? 1 : 0)),
      dark: this.dark,
      glitch: Math.max(this.glitch, this.snapPulse * 0.22),
      shake: this.shake + this.snapPulse * 0.05,
      intro: this.phase === "intro" ? Math.min(1, this.phaseT / 4.6) : 1,
      lunge: this.lunge,
      blood: this.blood,
      ending: this.phase === "ending" ? this.endingT : 0,
      level: this.level,
    };
  }

  private zombieParams(j: number, p: number): MoveParams {
    const ph = this.beat * Math.PI * 0.5 + j * 1.7;
    const side = j % 2 === 0 ? -1 : 1;
    return {
      armL: [30 + Math.sin(ph) * 8, 14],
      armR: [26 - Math.sin(ph) * 8, -12],
      legL: [18 + Math.sin(ph) * 10, -8],
      legR: [18 - Math.sin(ph) * 10, -8],
      lean: side * -3 + Math.sin(ph * 0.5) * 2,
      head: 12 + p * 10,
    };
  }

  private shamblePose(j: number): Pose {
    return buildPose(this.zombieParams(j, 0));
  }

  private creepFigures(): Figure[] {
    const w = this.w;
    const h = this.h;
    const out: Figure[] = [];
    const still = this.phase === "intro" || this.phase === "tutorial";
    for (let j = 0; j < this.zombieP.length; j++) {
      const p = this.zombieP[j];
      const side = j % 2 === 0 ? -1 : 1;
      const tier = Math.floor(j / 2);
      const u = Math.pow(p, 2);
      const sx = w * (0.5 + side * (0.24 + tier * 0.05));
      const nx = w * (0.5 + side * (0.48 + tier * 0.1));
      const x = sx + (nx - sx) * u;
      const gy = h * (0.775 + 0.235 * u);
      const ht = h * (0.33 + 0.5 * u);
      const variant = this.level >= 2 || still ? (j * 2 + this.level) % 5 : 0;
      out.push(
        place(buildPose(this.zombieParams(j, p)), x, gy, ht, {
          alpha: still ? 0.32 : 0.55 + 0.45 * p,
          stare: still ? 0.25 : Math.max(0, (p - 0.42) / 0.58),
          variant: still ? 0 : variant,
          sway: Math.sin(this.beat * Math.PI + j) * 0.035,
          reflection: true,
          skirt: j % 2 === 1,
        }),
      );
    }
    return out;
  }

  private lungeFigures(): Figure[] {
    const w = this.w;
    const h = this.h;
    const out: Figure[] = [];
    for (let j = 0; j < Math.max(1, this.zombieP.length); j++) {
      const p = this.zombieP[j] ?? 0.9;
      const side = j % 2 === 0 ? -1 : 1;
      const tier = Math.floor(j / 2);
      const k = this.lunge;
      const baseX = w * (0.5 + side * (0.48 + tier * 0.1));
      const x = baseX + (w * 0.5 - baseX) * k * 0.85;
      const gy = h * (1.01 + 0.04 * k);
      const ht = h * (0.83 + 0.35 * k);
      out.push(
        place(buildPose(this.zombieParams(j, 1)), x, gy, ht, {
          alpha: 0.65 + 0.35 * p,
          stare: 1,
          variant: (j * 2 + Math.max(2, this.level)) % 5,
          reflection: true,
          skirt: j % 2 === 1,
        }),
      );
    }
    return out;
  }

  private playerFigure(): Figure | null {
    if (this.phase === "dead" || this.phase === "ending") return null;
    let pose: Pose | null = null;
    if (this.mode === "camera") pose = this.playerPose;
    else if (this.keyDown && this.keyed) pose = buildPose(MOVES[this.keyed].params);
    if (!pose) return null;
    return place(pose, this.w * 0.5, this.h * 1.06, this.h * 0.36, {
      alpha: 0.22,
      wire: true,
      reflection: true,
    });
  }
}
