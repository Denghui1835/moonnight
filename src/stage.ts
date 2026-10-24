import { BODY_HEIGHT, Pose, SEG, Vec } from "./rig";

export type Figure = {
  pose: Pose;
  x: number;
  y: number;
  height: number;
  alpha: number;
  stare: number;
  wire?: boolean;
  lag?: number;
  reflection?: boolean;
  /** 0 normal, 1 head under the arm, 2 missing hand, 3 head on sideways, 4 half body */
  variant?: number;
  /** extra silhouette lean, radians */
  sway?: number;
  /** triangular dress instead of bare legs */
  skirt?: boolean;
  /** black fedora, like the dancer in the mirror */
  hat?: boolean;
};

export type Scene = {
  time: number;
  beatPhase: number;
  instructor: Figure;
  zombies: Figure[];
  reflection: Figure | null;
  crack: number;
  crowCount: number;
  dark: number;
  glitch: number;
  shake: number;
  /** 0 = still behind the door, 1 = fully inside */
  intro: number;
  /** 0..1, used while they lunge at the glass */
  lunge: number;
  /** 0..1, crimson wash on death */
  blood: number;
  /** ending elapsed seconds, 0 while still dancing */
  ending?: number;
  /** story props unlock by level */
  level?: number;
};

const BODY = "#000000";
const RIM = "196, 222, 214";

export function scaleFor(heightPx: number): number {
  return heightPx / BODY_HEIGHT;
}

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
  const variant = f.variant ?? 0;
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

  const headPos = variant === 3
    ? { x: head.x + headR * 0.75, y: head.y + headR * 0.55 }
    : head;
  const carryHead = variant === 1;
  const halfBody = variant === 4;

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

    const drawBody = () => {
      limb(ctx, lS, lE, upperW);
      if (variant !== 2) limb(ctx, lE, lW, foreW);
      else limb(ctx, lE, { x: lE.x + (lW.x - lE.x) * 0.55, y: lE.y + (lW.y - lE.y) * 0.55 }, foreW);
      limb(ctx, rS, rE, upperW);
      limb(ctx, rE, rW, foreW);

      if (!halfBody) {
        limb(ctx, lH, lK, thighW);
        limb(ctx, lK, lA, shinW);
        limb(ctx, rH, rK, thighW);
        limb(ctx, rK, rA, shinW);
        if (f.skirt) {
          const hem = pelvis.y + s * 0.72;
          const w2 = s * 0.46;
          // lHip sits at +x (screen right), so the hem must fan the same way
          ctx.beginPath();
          ctx.moveTo(lH.x, lH.y);
          ctx.lineTo(pelvis.x + w2, hem);
          ctx.quadraticCurveTo(pelvis.x, hem + s * 0.08, pelvis.x - w2, hem);
          ctx.lineTo(rH.x, rH.y);
          ctx.closePath();
          ctx.fill();
        }
      } else {
        ctx.beginPath();
        ctx.moveTo(lH.x, lH.y);
        ctx.quadraticCurveTo(pelvis.x + s * 0.1, pelvis.y + s * 0.22, rH.x, rH.y);
        ctx.lineTo(rH.x + s * 0.04, rH.y + s * 0.18);
        ctx.quadraticCurveTo(pelvis.x, pelvis.y + s * 0.34, lH.x - s * 0.04, lH.y + s * 0.18);
        ctx.closePath();
        ctx.fill();
      }

      ctx.beginPath();
      ctx.moveTo(lS.x, lS.y);
      ctx.lineTo(lH.x, lH.y);
      ctx.lineTo(rH.x, rH.y);
      ctx.lineTo(rS.x, rS.y);
      ctx.closePath();
      ctx.fill();

      if (!carryHead) {
        limb(ctx, sc, headPos, headR * 0.9);
        ctx.beginPath();
        ctx.arc(headPos.x, headPos.y, headR, 0, Math.PI * 2);
        ctx.fill();
        if (f.hat && variant === 0) {
          ctx.beginPath();
          ctx.ellipse(headPos.x, headPos.y - headR * 0.52, headR * 1.72, headR * 0.2, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.moveTo(headPos.x - headR * 0.8, headPos.y - headR * 0.5);
          ctx.lineTo(headPos.x - headR * 0.6, headPos.y - headR * 1.38);
          ctx.quadraticCurveTo(headPos.x, headPos.y - headR * 1.5, headPos.x + headR * 0.6, headPos.y - headR * 1.38);
          ctx.lineTo(headPos.x + headR * 0.8, headPos.y - headR * 0.5);
          ctx.closePath();
          ctx.fill();
        }
      } else {
        const hp = { x: lH.x + s * 0.16, y: lH.y + s * 0.02 };
        ctx.beginPath();
        ctx.arc(hp.x, hp.y, headR, 0, Math.PI * 2);
        ctx.fill();
        limb(ctx, { x: lE.x, y: lE.y }, { x: hp.x - headR * 0.6, y: hp.y }, upperW * 0.9);
      }
    };

    // pale rim
    ctx.strokeStyle = `rgba(${RIM}, 0.30)`;
    ctx.fillStyle = `rgba(${RIM}, 0.30)`;
    ctx.save();
    ctx.lineWidth = 2.4;
    drawBody();
    ctx.restore();

    ctx.strokeStyle = BODY;
    ctx.fillStyle = BODY;
    drawBody();

    if (variant === 2) {
      ctx.beginPath();
      ctx.ellipse(lW.x + s * 0.02, lW.y + s * 0.1, s * 0.055, s * 0.035, 0.4, 0, Math.PI * 2);
      ctx.fill();
    }

    if (f.stare > 0.01) {
      const a = f.stare;
      const ex = headR * 0.36;
      const ey = headR * 0.05;
      const hp = carryHead ? { x: lH.x + s * 0.16, y: lH.y + s * 0.02 } : headPos;
      ctx.globalAlpha = f.alpha * a;
      ctx.fillStyle = `rgba(232, 244, 238, ${0.45 + 0.5 * a})`;
      ctx.shadowColor = `rgba(232, 244, 238, ${0.9 * a})`;
      ctx.shadowBlur = Math.max(4, s * 0.05);
      ctx.beginPath();
      ctx.arc(hp.x - ex, hp.y + ey, Math.max(0.9, s * 0.013), 0, Math.PI * 2);
      ctx.arc(hp.x + ex, hp.y + ey, Math.max(0.9, s * 0.013), 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      if (a > 0.55) {
        ctx.globalAlpha = f.alpha * (a - 0.55) * 1.6;
        ctx.beginPath();
        ctx.ellipse(hp.x, hp.y + headR * 0.34, headR * 0.16, headR * 0.22, 0, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(12, 14, 14, 0.95)";
        ctx.fill();
      }
    }
  };

  ctx.save();
  ctx.globalAlpha = f.alpha;
  if (f.sway) {
    ctx.translate(ox, oy);
    ctx.rotate(f.sway);
    ctx.translate(-ox, -oy);
  }

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

/* ---------------- background ---------------- */

let fogTex: HTMLCanvasElement | null = null;

function fogTexture(): HTMLCanvasElement {
  if (fogTex) return fogTex;
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 256;
  const g = c.getContext("2d")!;
  for (let i = 0; i < 46; i++) {
    const x = rand(i * 3.3) * 512;
    const y = 100 + rand(i * 7.1) * 150;
    const r = 40 + rand(i * 5.7) * 90;
    const grad = g.createRadialGradient(x, y, 0, x, y, r);
    grad.addColorStop(0, "rgba(180, 208, 202, 0.16)");
    grad.addColorStop(1, "rgba(180, 208, 202, 0)");
    g.fillStyle = grad;
    g.fillRect(x - r, y - r, r * 2, r * 2);
  }
  fogTex = c;
  return c;
}

function drawTrees(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const horizon = h * 0.72;
  ctx.save();
  ctx.beginPath();
  ctx.rect(w * 0.13, h * 0.04, w * 0.74, h * 0.62);
  ctx.clip();
  ctx.strokeStyle = "rgba(2, 5, 6, 0.92)";
  ctx.lineCap = "round";

  const branch = (x: number, y: number, angle: number, len: number, width: number, depth: number, seed: number) => {
    if (depth <= 0 || len < 6) return;
    const x2 = x + Math.cos(angle) * len;
    const y2 = y + Math.sin(angle) * len;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    const n = 2;
    for (let i = 0; i < n; i++) {
      const a = angle + (rand(seed + i * 3.1) - 0.5) * 1.1;
      branch(x2, y2, a, len * (0.62 + rand(seed + i * 7.7) * 0.16), width * 0.62, depth - 1, seed + i * 11 + 1);
    }
  };

  branch(w * 0.2, horizon - 20, -Math.PI / 2 - 0.08, h * 0.24, 12, 5, 3);
  branch(w * 0.82, horizon - 20, -Math.PI / 2 + 0.14, h * 0.21, 10, 5, 9);
  branch(w * 0.55, horizon - 16, -Math.PI / 2, h * 0.14, 5, 4, 21);
  ctx.restore();
}

function drawCrows(ctx: CanvasRenderingContext2D, w: number, h: number, count: number, time: number) {
  const spots = [
    [0.24, 0.2], [0.78, 0.17], [0.33, 0.31], [0.68, 0.27],
    [0.16, 0.36], [0.86, 0.33], [0.45, 0.14], [0.6, 0.39],
  ];
  ctx.save();
  ctx.fillStyle = "rgba(1, 3, 4, 0.96)";
  for (let i = 0; i < Math.min(count, spots.length); i++) {
    const [px, py] = spots[i];
    const x = w * px;
    const y = h * py + Math.sin(time * 0.7 + i) * 1.2;
    const s = Math.max(5, w * 0.009);
    ctx.save();
    ctx.translate(x, y);
    ctx.beginPath();
    ctx.ellipse(0, 0, s, s * 0.45, -0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(s * 0.85, -s * 0.18, s * 0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(-s * 0.8, 0);
    ctx.lineTo(-s * 1.6, s * 0.14);
    ctx.lineTo(-s * 0.8, s * 0.2);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
  ctx.restore();
}

function drawRoom(ctx: CanvasRenderingContext2D, w: number, h: number, scene: Scene) {
  const horizon = h * 0.72;

  ctx.fillStyle = "#05090a";
  ctx.fillRect(0, 0, w, h);

  const wx0 = w * 0.13;
  const wx1 = w * 0.87;
  const wy0 = h * 0.04;
  const wy1 = h * 0.66;

  const win = ctx.createLinearGradient(0, wy0, 0, wy1);
  win.addColorStop(0, "rgba(26, 46, 52, 0.98)");
  win.addColorStop(0.38, "rgba(90, 130, 128, 0.72)");
  win.addColorStop(0.72, "rgba(170, 204, 198, 0.44)");
  win.addColorStop(1, "rgba(120, 158, 155, 0.14)");
  ctx.fillStyle = win;
  ctx.fillRect(wx0, wy0, wx1 - wx0, wy1 - wy0);

  for (let i = 0; i < 44; i++) {
    const sx = wx0 + rand(i * 5.3) * (wx1 - wx0);
    const sy = wy0 + rand(i * 9.7) * (wy1 - wy0) * 0.5;
    ctx.fillStyle = `rgba(226, 244, 238, ${0.14 + rand(i * 3.9) * 0.4})`;
    ctx.fillRect(sx, sy, 1.4, 1.4);
  }

  const mx = w * 0.66;
  const my = wy0 + h * 0.14;
  const mr = Math.max(13, w * 0.042);
  const halo = ctx.createRadialGradient(mx, my, mr * 0.5, mx, my, mr * 6);
  halo.addColorStop(0, "rgba(240, 255, 250, 0.5)");
  halo.addColorStop(0.22, "rgba(214, 240, 233, 0.2)");
  halo.addColorStop(1, "rgba(200, 228, 220, 0)");
  ctx.fillStyle = halo;
  ctx.fillRect(wx0, wy0, wx1 - wx0, wy1 - wy0);

  const disc = ctx.createRadialGradient(mx - mr * 0.3, my - mr * 0.35, mr * 0.1, mx, my, mr);
  disc.addColorStop(0, "rgba(253, 255, 252, 0.98)");
  disc.addColorStop(0.72, "rgba(228, 247, 239, 0.92)");
  disc.addColorStop(1, "rgba(198, 224, 216, 0.72)");
  ctx.beginPath();
  ctx.arc(mx, my, mr, 0, Math.PI * 2);
  ctx.fillStyle = disc;
  ctx.fill();

  ctx.fillStyle = "rgba(150, 182, 176, 0.2)";
  for (let i = 0; i < 5; i++) {
    const a = rand(i * 4.1) * Math.PI * 2;
    const d = rand(i * 7.3) * mr * 0.6;
    ctx.beginPath();
    ctx.arc(mx + Math.cos(a) * d, my + Math.sin(a) * d, mr * (0.09 + rand(i * 2.3) * 0.16), 0, Math.PI * 2);
    ctx.fill();
  }

  drawTrees(ctx, w, h);
  drawCrows(ctx, w, h, scene.crowCount, scene.time);

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

  const spill = ctx.createRadialGradient(w * 0.5, horizon, 10, w * 0.5, horizon, w * 0.6);
  spill.addColorStop(0, "rgba(150, 190, 185, 0.12)");
  spill.addColorStop(1, "rgba(150, 190, 185, 0)");
  ctx.fillStyle = spill;
  ctx.fillRect(0, horizon - h * 0.15, w, h * 0.55);
}

function drawFog(ctx: CanvasRenderingContext2D, w: number, h: number, time: number) {
  const tex = fogTexture();
  ctx.save();
  ctx.globalCompositeOperation = "screen";
  for (let layer = 0; layer < 3; layer++) {
    const speed = 9 + layer * 7;
    const offset = (time * speed) % tex.width;
    const scale = 1 + layer * 0.35;
    const y = h * (0.55 + layer * 0.1);
    ctx.globalAlpha = 0.16 - layer * 0.03;
    for (let x = -offset; x < w; x += tex.width * scale) {
      ctx.drawImage(tex, x, y, tex.width * scale, tex.height * scale);
    }
  }
  ctx.restore();
}

function drawCracks(ctx: CanvasRenderingContext2D, w: number, h: number, amount: number) {
  if (amount < 0.04) return;
  const count = Math.floor(amount * 14);
  ctx.save();
  for (let i = 0; i < count; i++) {
    const sx = w * (0.08 + rand(i * 3.1) * 0.84);
    const sy = h * (0.05 + rand(i * 7.7) * 0.8);
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
    ctx.strokeStyle = `rgba(210, 228, 224, ${0.05 + amount * 0.3})`;
    ctx.lineWidth = 1;
    ctx.stroke();
  }
  ctx.restore();
}

function drawDust(ctx: CanvasRenderingContext2D, w: number, h: number, time: number) {
  ctx.save();
  for (let i = 0; i < 70; i++) {
    const speed = 4 + rand(i) * 12;
    const x = (rand(i * 2.7) * w + Math.sin(time * 0.3 + i) * 18 + w) % w;
    const y = ((rand(i * 4.3) * h - time * speed) % h + h) % h;
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

function drawDoors(ctx: CanvasRenderingContext2D, w: number, h: number, intro: number) {
  if (intro >= 1) return;
  const open = Math.min(1, Math.max(0, (intro - 0.25) / 0.55));
  const half = (w / 2) * (1 - open);
  ctx.save();
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, half, h);
  ctx.fillRect(w - half, 0, half, h);

  if (intro < 0.25) {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, w, h);
    const slit = Math.max(0.5, (intro / 0.25) * 6);
    const g = ctx.createLinearGradient(w / 2 - slit, 0, w / 2 + slit, 0);
    g.addColorStop(0, "rgba(0,0,0,0)");
    g.addColorStop(0.5, `rgba(190, 218, 210, ${0.25 * (intro / 0.25)})`);
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.fillRect(w / 2 - slit * 4, 0, slit * 8, h);
  }
  ctx.restore();
}

export function renderScene(ctx: CanvasRenderingContext2D, w: number, h: number, scene: Scene) {
  ctx.save();

  const shakeX = (rand(scene.time * 31) - 0.5) * scene.shake * 18;
  const shakeY = (rand(scene.time * 47) - 0.5) * scene.shake * 18;
  ctx.translate(shakeX, shakeY);

  if (scene.intro < 1) {
    const z = 1.18 - 0.18 * scene.intro;
    ctx.translate(w / 2, h / 2);
    ctx.scale(z, z);
    ctx.translate(-w / 2, -h / 2);
  }

  drawRoom(ctx, w, h, scene);

  for (const b of scene.zombies) drawFigure(ctx, b);
  drawFigure(ctx, scene.instructor);
  if (scene.reflection) drawFigure(ctx, scene.reflection);

  drawFog(ctx, w, h, scene.time);
  drawDust(ctx, w, h, scene.time);
  drawCracks(ctx, w, h, scene.crack);

  if (scene.blood > 0.001) {
    ctx.fillStyle = `rgba(58, 6, 5, ${scene.blood * 0.5})`;
    ctx.fillRect(0, 0, w, h);
  }
  if (scene.dark > 0.001) {
    ctx.fillStyle = `rgba(0, 0, 0, ${scene.dark})`;
    ctx.fillRect(0, 0, w, h);
  }

  applyGlitch(ctx, w, h, scene.glitch, scene.time);
  drawFrame(ctx, w, h);

  ctx.restore();

  if (scene.intro < 1) drawDoors(ctx, w, h, scene.intro);
}
