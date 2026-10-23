import { BODY_HEIGHT, Pose, SEG, Vec } from "./rig";

export type Figure = {
  pose: Pose;
  /** pelvis position in screen px */
  x: number;
  y: number;
  /** figure height in px (head top to heel) */
  height: number;
  alpha: number;
  /** 0..1 pale eyes fade in — used when a dancer turns to look at you */
  stare: number;
  wire?: boolean;
  /** extra horizontal offset for the lagging reflection */
  lag?: number;
  /** draw a faint mirrored copy under the feet */
  reflection?: boolean;
};

export type Scene = {
  time: number;
  beatPhase: number;
  instructor: Figure;
  backups: Figure[];
  reflection: Figure | null;
  fear: number;
  litCandles: number;
  candleTotal: number;
  dark: number;
  glitch: number;
  shake: number;
};

const BODY = "#000000";
const RIM = "196, 222, 214";

export function scaleFor(heightPx: number): number {
  return heightPx / BODY_HEIGHT;
}

/** place a pose so its feet land on groundY */
export function place(pose: Pose, groundX: number, groundY: number, heightPx: number, extra: Partial<Figure> = {}): Figure {
  const s = scaleFor(heightPx);
  return {
    pose,
    x: groundX,
    y: groundY - (SEG.thigh + SEG.shin) * s,
    height: heightPx,
    alpha: 1,
    stare: 0,
    ...extra,
  };
}

type Pt = { x: number; y: number };

function limb(ctx: CanvasRenderingContext2D, a: Pt, b: Pt, w: number) {
  ctx.lineWidth = w;
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x, b.y);
  ctx.stroke();
}

function drawFigure(ctx: CanvasRenderingContext2D, f: Figure) {
  const s = scaleFor(f.height);
  const ox = f.x + (f.lag ?? 0);
  const oy = f.y;
  const P = (v: Vec): Pt => ({ x: ox + v.x * s, y: oy - v.y * s });

  const p = f.pose;
  const pelvis = P(p.pelvis);
  const sc = P(p.shoulderCenter);
  const head = P(p.head);
  const lS = P(p.lShoulder), lE = P(p.lElbow), lW = P(p.lWrist);
  const rS = P(p.rShoulder), rE = P(p.rElbow), rW = P(p.rWrist);
  const lH = P(p.lHip), lK = P(p.lKnee), lA = P(p.lAnkle);
  const rH = P(p.rHip), rK = P(p.rKnee), rA = P(p.rAnkle);

  const upperW = Math.max(3, s * 0.155);
  const foreW = Math.max(2.5, s * 0.12);
  const thighW = Math.max(4, s * 0.2);
  const shinW = Math.max(3, s * 0.15);
  const headR = s * SEG.headR;

  const paint = () => {
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    if (f.wire) {
      ctx.strokeStyle = `rgba(${RIM}, 0.72)`;
      ctx.shadowColor = `rgba(${RIM}, 0.55)`;
      ctx.shadowBlur = 12;
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(lS.x, lS.y); ctx.lineTo(lH.x, lH.y); ctx.lineTo(rH.x, rH.y); ctx.lineTo(rS.x, rS.y); ctx.closePath();
      ctx.moveTo(sc.x, sc.y); ctx.lineTo(lS.x, lS.y);
      ctx.moveTo(sc.x, sc.y); ctx.lineTo(rS.x, rS.y);
      ctx.moveTo(sc.x, sc.y); ctx.lineTo(pelvis.x, pelvis.y);
      for (const [a, b, c] of [[lS, lE, lW], [rS, rE, rW], [lH, lK, lA], [rH, rK, rA]] as const) {
        ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.lineTo(c.x, c.y);
      }
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(head.x, head.y, headR, 0, Math.PI * 2);
      ctx.stroke();
      ctx.shadowBlur = 0;
      return;
    }

    // pale rim, then black on top — a 1px backlight edge
    ctx.strokeStyle = `rgba(${RIM}, 0.30)`;
    ctx.fillStyle = `rgba(${RIM}, 0.30)`;
    limb(ctx, lS, lE, upperW + 2.4);
    limb(ctx, lE, lW, foreW + 2.4);
    limb(ctx, rS, rE, upperW + 2.4);
    limb(ctx, rE, rW, foreW + 2.4);
    limb(ctx, lH, lK, thighW + 2.4);
    limb(ctx, lK, lA, shinW + 2.4);
    limb(ctx, rH, rK, thighW + 2.4);
    limb(ctx, rK, rA, shinW + 2.4);
    ctx.beginPath();
    ctx.moveTo(lS.x, lS.y); ctx.lineTo(lH.x, lH.y); ctx.lineTo(rH.x, rH.y); ctx.lineTo(rS.x, rS.y); ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.arc(head.x, head.y, headR + 1.2, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = BODY;
    ctx.fillStyle = BODY;
    limb(ctx, lS, lE, upperW);
    limb(ctx, lE, lW, foreW);
    limb(ctx, rS, rE, upperW);
    limb(ctx, rE, rW, foreW);
    limb(ctx, lH, lK, thighW);
    limb(ctx, lK, lA, shinW);
    limb(ctx, rH, rK, thighW);
    limb(ctx, rK, rA, shinW);
    ctx.beginPath();
    ctx.moveTo(lS.x, lS.y);
    ctx.lineTo(lH.x, lH.y);
    ctx.lineTo(rH.x, rH.y);
    ctx.lineTo(rS.x, rS.y);
    ctx.closePath();
    ctx.fill();
    // neck
    limb(ctx, sc, head, headR * 0.9);
    ctx.beginPath();
    ctx.arc(head.x, head.y, headR, 0, Math.PI * 2);
    ctx.fill();

    if (f.stare > 0.01) {
      const a = f.stare;
      const ex = headR * 0.36;
      const ey = headR * 0.05;
      ctx.globalAlpha = f.alpha * a;
      ctx.fillStyle = `rgba(228, 242, 234, ${0.5 + 0.5 * a})`;
      ctx.shadowColor = `rgba(228, 242, 234, ${0.85 * a})`;
      ctx.shadowBlur = Math.max(4, s * 0.05);
      ctx.beginPath();
      ctx.arc(head.x - ex, head.y + ey, Math.max(0.9, s * 0.013), 0, Math.PI * 2);
      ctx.arc(head.x + ex, head.y + ey, Math.max(0.9, s * 0.013), 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  };

  ctx.save();
  ctx.globalAlpha = f.alpha;

  if (f.reflection) {
    const groundY = f.y + (SEG.thigh + SEG.shin) * s;
    ctx.save();
    ctx.translate(0, groundY * 2);
    ctx.scale(1, -1);
    ctx.globalAlpha = f.alpha * 0.085;
    paint();
    ctx.restore();
  }

  paint();
  ctx.restore();
}

function rand(seed: number): number {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function drawRoom(ctx: CanvasRenderingContext2D, w: number, h: number, scene: Scene) {
  const horizon = h * 0.72;

  ctx.fillStyle = "#060a0b";
  ctx.fillRect(0, 0, w, h);

  // the big window: the only light in the room
  const wx0 = w * 0.13;
  const wx1 = w * 0.87;
  const wy0 = h * 0.04;
  const wy1 = h * 0.66;
  const win = ctx.createLinearGradient(0, wy0, 0, wy1);
  win.addColorStop(0, "rgba(214, 238, 231, 0.62)");
  win.addColorStop(0.5, "rgba(176, 212, 205, 0.40)");
  win.addColorStop(1, "rgba(120, 158, 155, 0.16)");
  ctx.fillStyle = win;
  ctx.fillRect(wx0, wy0, wx1 - wx0, wy1 - wy0);

  // moon disc inside the window
  const moon = ctx.createRadialGradient(w * 0.62, wy0 + h * 0.12, 4, w * 0.62, wy0 + h * 0.12, w * 0.3);
  moon.addColorStop(0, "rgba(248, 255, 250, 0.55)");
  moon.addColorStop(0.3, "rgba(220, 245, 236, 0.18)");
  moon.addColorStop(1, "rgba(200, 228, 220, 0)");
  ctx.fillStyle = moon;
  ctx.fillRect(wx0, wy0, wx1 - wx0, wy1 - wy0);

  // mullions
  ctx.fillStyle = "#030607";
  for (let i = 1; i <= 3; i++) {
    const x = wx0 + ((wx1 - wx0) * i) / 4;
    ctx.fillRect(x - 4, wy0, 8, wy1 - wy0);
  }
  for (let i = 1; i <= 2; i++) {
    const y = wy0 + ((wy1 - wy0) * i) / 3;
    ctx.fillRect(wx0, y - 3, wx1 - wx0, 6);
  }
  ctx.strokeStyle = "rgba(200, 228, 220, 0.16)";
  ctx.lineWidth = 3;
  ctx.strokeRect(wx0, wy0, wx1 - wx0, wy1 - wy0);

  // wall above the floor, showing the window's light bleeding onto it
  const bleed = ctx.createLinearGradient(0, wy1, 0, horizon);
  bleed.addColorStop(0, "rgba(150, 190, 185, 0.06)");
  bleed.addColorStop(1, "rgba(150, 190, 185, 0)");
  ctx.fillStyle = bleed;
  ctx.fillRect(0, wy1, w, horizon - wy1);

  const floor = ctx.createLinearGradient(0, horizon, 0, h);
  floor.addColorStop(0, "#0c1213");
  floor.addColorStop(0.45, "#080c0d");
  floor.addColorStop(1, "#020303");
  ctx.fillStyle = floor;
  ctx.fillRect(0, horizon, w, h - horizon);

  // floor boards
  ctx.strokeStyle = "rgba(160, 190, 185, 0.06)";
  ctx.lineWidth = 1;
  for (let i = 1; i < 10; i++) {
    const t = i / 10;
    const y = horizon + (h - horizon) * t * t;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }
  for (let i = -7; i <= 7; i++) {
    const x0 = w / 2 + i * (w / 8);
    const x1 = w / 2 + i * (w / 1.9);
    ctx.beginPath();
    ctx.moveTo(x0, horizon);
    ctx.lineTo(x1, h);
    ctx.stroke();
  }

  // the window's light on the floor
  const spill = ctx.createRadialGradient(w * 0.5, horizon, 10, w * 0.5, horizon, w * 0.6);
  spill.addColorStop(0, "rgba(150, 190, 185, 0.12)");
  spill.addColorStop(1, "rgba(150, 190, 185, 0)");
  ctx.fillStyle = spill;
  ctx.fillRect(0, horizon - h * 0.15, w, h * 0.55);
}

function drawCandles(ctx: CanvasRenderingContext2D, w: number, h: number, scene: Scene) {
  const n = scene.candleTotal;
  const gap = Math.min(34, w * 0.045);
  const startX = w * 0.055;
  const y = h * 0.955;
  for (let i = 0; i < n; i++) {
    const x = startX + i * gap;
    const lit = i < scene.litCandles;
    const flick = 0.72 + 0.28 * Math.sin(scene.time * (7 + i * 1.7) + i * 2.1);
    ctx.fillStyle = "rgba(190, 188, 172, 0.18)";
    ctx.fillRect(x - 1.2, y - 14, 2.4, 14);
    if (lit) {
      const g = ctx.createRadialGradient(x, y - 17, 0, x, y - 17, 30);
      g.addColorStop(0, `rgba(255, 208, 140, ${0.30 * flick})`);
      g.addColorStop(1, "rgba(255, 190, 120, 0)");
      ctx.fillStyle = g;
      ctx.fillRect(x - 30, y - 47, 60, 60);
      ctx.fillStyle = `rgba(255, 236, 196, ${0.92 * flick})`;
      ctx.beginPath();
      ctx.ellipse(x, y - 18, 1.8, 4.6, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

function drawCracks(ctx: CanvasRenderingContext2D, w: number, h: number, scene: Scene) {
  const amount = scene.fear;
  if (amount < 0.05) return;
  const count = Math.floor(amount * 10);
  ctx.save();
  for (let i = 0; i < count; i++) {
    const sx = w * (0.08 + rand(i * 3.1) * 0.84);
    const sy = h * (0.05 + rand(i * 7.7) * 0.72);
    let x = sx;
    let y = sy;
    let a = rand(i * 11.3) * Math.PI * 2;
    const segs = 5 + Math.floor(rand(i * 5.5) * 6);
    ctx.beginPath();
    ctx.moveTo(x, y);
    for (let k = 0; k < segs; k++) {
      a += (rand(i * 13 + k) - 0.5) * 1.6;
      const len = 10 + rand(i * 17 + k) * 46;
      x += Math.cos(a) * len;
      y += Math.sin(a) * len;
      ctx.lineTo(x, y);
    }
    ctx.strokeStyle = `rgba(205, 225, 220, ${0.05 + amount * 0.22})`;
    ctx.lineWidth = 1;
    ctx.stroke();
  }
  ctx.restore();
}

function drawDust(ctx: CanvasRenderingContext2D, w: number, h: number, scene: Scene) {
  ctx.save();
  for (let i = 0; i < 70; i++) {
    const speed = 4 + rand(i) * 12;
    const x = (rand(i * 2.7) * w + Math.sin(scene.time * 0.3 + i) * 18 + w) % w;
    const y = ((rand(i * 4.3) * h - scene.time * speed) % h + h) % h;
    const a = 0.03 + rand(i * 9.1) * 0.09;
    ctx.fillStyle = `rgba(200, 222, 216, ${a})`;
    ctx.fillRect(x, y, 1.2, 1.2);
  }
  ctx.restore();
}

function drawFrame(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const inset = Math.min(w, h) * 0.028;
  ctx.save();
  const g = ctx.createLinearGradient(0, 0, w, h);
  g.addColorStop(0, "#0e1416");
  g.addColorStop(0.5, "#05080a");
  g.addColorStop(1, "#131a1c");
  ctx.strokeStyle = g;
  ctx.lineWidth = inset * 2;
  ctx.strokeRect(inset * 0.5, inset * 0.5, w - inset, h - inset);
  ctx.strokeStyle = "rgba(190, 215, 210, 0.09)";
  ctx.lineWidth = 1;
  ctx.strokeRect(inset * 1.5, inset * 1.5, w - inset * 3, h - inset * 3);
  ctx.restore();
}

function applyGlitch(ctx: CanvasRenderingContext2D, w: number, h: number, amount: number, time: number) {
  if (amount <= 0.001) return;
  const slices = Math.floor(2 + amount * 7);
  const snap = Math.floor(time * 14);
  for (let i = 0; i < slices; i++) {
    const sy = rand(snap + i * 3.3) * h;
    const sh = 6 + rand(snap + i * 7.1) * 42;
    const dx = (rand(snap + i * 11.9) - 0.5) * 60 * amount;
    try {
      ctx.drawImage(ctx.canvas, 0, sy, w, sh, dx, sy, w, sh);
    } catch {
      break;
    }
  }
}

export function renderScene(ctx: CanvasRenderingContext2D, w: number, h: number, scene: Scene) {
  ctx.save();

  const shakeX = (rand(scene.time * 31) - 0.5) * scene.shake * 18;
  const shakeY = (rand(scene.time * 47) - 0.5) * scene.shake * 18;
  ctx.translate(shakeX, shakeY);

  drawRoom(ctx, w, h, scene);

  for (const b of scene.backups) drawFigure(ctx, b);
  drawFigure(ctx, scene.instructor);
  if (scene.reflection) drawFigure(ctx, scene.reflection);

  drawCandles(ctx, w, h, scene);
  drawDust(ctx, w, h, scene);
  drawCracks(ctx, w, h, scene);

  if (scene.fear > 0.01) {
    ctx.fillStyle = `rgba(46, 5, 5, ${scene.fear * 0.18})`;
    ctx.fillRect(0, 0, w, h);
  }
  if (scene.dark > 0.001) {
    ctx.fillStyle = `rgba(0, 0, 0, ${scene.dark})`;
    ctx.fillRect(0, 0, w, h);
  }

  applyGlitch(ctx, w, h, scene.glitch, scene.time);
  drawFrame(ctx, w, h);

  ctx.restore();
}
