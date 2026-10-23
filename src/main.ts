import "./style.css";
import { AudioEngine } from "./audio";
import { Game, GameMode, Hud, Stats } from "./game";
import { MOVES } from "./moves";
import { PoseTracker } from "./pose";
import { buildPose } from "./rig";
import { place, renderScene, Scene } from "./stage";

const canvas = document.getElementById("stage") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;
const video = document.getElementById("cam") as HTMLVideoElement;
const hudEl = document.getElementById("hud") as HTMLElement;
const dotsEl = document.getElementById("dots") as HTMLElement;
const meterEl = document.getElementById("meter") as HTMLElement;
const tutbar = document.getElementById("tutbar") as HTMLElement;
const toastEl = document.getElementById("toast") as HTMLElement;
const startScreen = document.getElementById("start") as HTMLElement;
const resultScreen = document.getElementById("result") as HTMLElement;
const endingScreen = document.getElementById("ending") as HTMLElement;

const audio = new AudioEngine();
let game: Game | null = null;
let mode: GameMode = "keys";
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

/* ---------------- title backdrop ---------------- */

function idleScene(t: number): Scene {
  return {
    time: t,
    beatPhase: (t * 0.4) % 1,
    instructor: place(buildPose(MOVES.stand.params), W * 0.5, H * 0.93, Math.min(H * 0.62, W * 0.58), {
      reflection: true,
    }),
    zombies: [],
    reflection: null,
    crack: 0,
    crowCount: 3,
    dark: 0.15,
    glitch: 0,
    shake: 0,
    intro: 1,
    lunge: 0,
    blood: 0,
  };
}

/* ---------------- dom helpers ---------------- */

const cache: Record<string, string> = {};
let hudHold = false;

function text(id: string, value: string) {
  if (cache[id] === value) return;
  cache[id] = value;
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function toggle(el: HTMLElement, name: string, on: boolean) {
  if (el.classList.contains(name) !== on) el.classList.toggle(name, on);
}

let toastTimer = 0;
function toast(msg: string) {
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toastEl.classList.remove("show"), 2600);
}

function syncHud(h: Hud) {
  toggle(hudEl, "hidden", !h.visible || hudHold);
  toggle(hudEl, "tutorial-on", h.tutorial);
  toggle(tutbar, "hidden", !h.tutorial);
  text("round", h.round);
  text("score", String(h.hits));
  text("moveinfo", h.moveTotal ? `${h.moveIndex} / ${h.moveTotal}` : "");
  text("cue-name", h.moveName);
  text("sub", h.subtitle);

  const keyEl = document.getElementById("cue-key") as HTMLElement;
  const key = mode === "keys" ? h.key : "";
  text("cue-key", key);
  toggle(keyEl, "hidden", !key);

  const sig = h.dots.join(",");
  if (cache.dots !== sig) {
    cache.dots = sig;
    if (dotsEl.children.length !== h.dots.length) {
      dotsEl.innerHTML = "";
      for (let i = 0; i < h.dots.length; i++) dotsEl.appendChild(document.createElement("i"));
    }
    h.dots.forEach((d, i) => {
      dotsEl.children[i].className = d;
    });
  }

  const pct = Math.round(h.meter * 100);
  if (cache.meter !== String(pct)) {
    cache.meter = String(pct);
    meterEl.style.width = `${pct}%`;
    meterEl.style.opacity = pct > 0 ? "1" : "0.25";
  }
}

/* ---------------- screens ---------------- */

function showDeath(s: Stats) {
  hudHold = true;
  hudEl.classList.add("hidden");
  const line =
    s.level <= 1
      ? "你连第一遍都没跳完。\n他们在镜子后面，等这一刻等了很久。"
      : s.level <= 3
        ? "你跳错的那一下，她看见了。\n镜子里的每一个人都看见了。"
        : "你已经快跳到最后了。\n可他们的手，从来不在乎你跳到第几个。";
  (document.getElementById("final-line") as HTMLElement).textContent = line;
  text("final-level", `第 ${Math.max(1, s.level)} 关`);
  text("final-hits", String(s.hits));
  text("final-heads", `${s.zombies + 1} 人`);
  resultScreen.classList.remove("hidden");
}

function showEnding(s: Stats) {
  hudHold = true;
  hudEl.classList.add("hidden");
  (document.getElementById("ending-line") as HTMLElement).textContent =
    "最后一拍，她放下了手。\n镜子空了。队伍的最后，多了一个人。\n第二天，镜子前放着两瓶汽水。";
  text("ending-hits", String(s.hits));
  text("ending-perfect", String(s.perfects));
  endingScreen.classList.remove("hidden");
}

/* ---------------- start ---------------- */

async function startGame(choice: GameMode) {
  const btnCam = document.getElementById("btn-cam") as HTMLButtonElement;
  const btnKeys = document.getElementById("btn-keys") as HTMLButtonElement;
  const note = document.getElementById("loadnote") as HTMLElement;
  btnCam.disabled = true;
  btnKeys.disabled = true;
  note.textContent = choice === "camera" ? "正在加载姿势模型…" : "";

  try {
    await audio.init();
  } catch {
    toast("音频初始化失败，将静音游玩");
  }

  let tracker: PoseTracker | null = null;
  mode = choice;
  if (choice === "camera") {
    tracker = new PoseTracker(video);
    try {
      await tracker.start();
      video.classList.remove("hidden");
    } catch {
      // 模型加载失败时摄像头可能已经点亮，必须显式关闭轨道
      tracker.stop();
      tracker = null;
      mode = "keys";
      video.classList.add("hidden");
      toast("摄像头打不开，已切到键盘模式");
    }
  }

  cache.dots = "";
  cache.meter = "";
  hudHold = false;
  startScreen.classList.add("hidden");
  resultScreen.classList.add("hidden");
  endingScreen.classList.add("hidden");
  hudEl.classList.remove("hidden");

  game = new Game({
    audio,
    tracker,
    mode,
    onDeath: showDeath,
    onEnding: showEnding,
  });
  game.begin();
  btnCam.disabled = false;
  btnKeys.disabled = false;
  note.textContent = mode === "keys" && choice === "camera" ? "摄像头不可用，本次为键盘模式" : "";
  if (import.meta.env.DEV) (window as unknown as { __game: Game }).__game = game;
}

document.getElementById("btn-cam")!.addEventListener("click", () => void startGame("camera"));
document.getElementById("btn-keys")!.addEventListener("click", () => void startGame("keys"));

document.getElementById("btn-again")!.addEventListener("click", () => {
  resultScreen.classList.add("hidden");
  cache.dots = "";
  hudHold = false;
  game?.restart();
});

document.getElementById("btn-again2")!.addEventListener("click", () => {
  endingScreen.classList.add("hidden");
  cache.dots = "";
  hudHold = false;
  game?.restart();
});

document.getElementById("btn-replay")!.addEventListener("click", () => game?.replayMove());
document.getElementById("btn-replayall")!.addEventListener("click", () => game?.replayAll());
document.getElementById("btn-skip")!.addEventListener("click", () => game?.skipTutorial());

/* ---------------- input ---------------- */

window.addEventListener("keydown", (e) => {
  if (e.key === "m" || e.key === "M") {
    audio.toggleMute();
    return;
  }
  if (!game) return;
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)) e.preventDefault();
  if (e.repeat) return;
  game.pushKey(e.key);
});

window.addEventListener("keyup", (e) => {
  if (!game) return;
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "w", "a", "s", "d"].includes(e.key)) {
    game.releaseKey();
  }
});

/* ---------------- loop ---------------- */

function frame(ms: number) {
  const now = ms / 1000;
  if (game) {
    game.tick(now, W, H);
    game.render(ctx);
    syncHud(game.hud);
  } else {
    renderScene(ctx, W, H, idleScene(now));
  }
  requestAnimationFrame(frame);
}

requestAnimationFrame(frame);
