export type Vec = { x: number; y: number };

export type Pose = {
  pelvis: Vec;
  shoulderCenter: Vec;
  head: Vec;
  lShoulder: Vec;
  lElbow: Vec;
  lWrist: Vec;
  rShoulder: Vec;
  rElbow: Vec;
  rWrist: Vec;
  lHip: Vec;
  lKnee: Vec;
  lAnkle: Vec;
  rHip: Vec;
  rKnee: Vec;
  rAnkle: Vec;
};

export type MoveParams = {
  /** torso tilt in degrees, + leans toward the figure's own left */
  lean?: number;
  /** head tilt in degrees, + tilts toward the figure's own left */
  head?: number;
  /** [upper-arm angle, elbow bend] degrees. 0 = arm hanging down, 90 = out to the side, 180 = straight up */
  armL?: [number, number];
  armR?: [number, number];
  /** [hip angle, knee bend] degrees. 0 = leg straight down, 90 = knee lifted to hip height */
  legL?: [number, number];
  legR?: [number, number];
};

export type Features = {
  lean: number;
  head: number;
  armLSh: number;
  armLEl: number;
  armRSh: number;
  armREl: number;
  legLHip: number;
  legLKnee: number;
  legRHip: number;
  legRKnee: number;
};

export const SEG = {
  torso: 1,
  shoulderHalf: 0.29,
  headUp: 0.4,
  headR: 0.155,
  upperArm: 0.44,
  foreArm: 0.42,
  thigh: 0.55,
  shin: 0.52,
  hipHalf: 0.19,
};

export const BODY_HEIGHT = SEG.headUp + SEG.headR + SEG.torso + SEG.thigh + SEG.shin;

const DOWN: Vec = { x: 0, y: -1 };

export const add = (a: Vec, b: Vec): Vec => ({ x: a.x + b.x, y: a.y + b.y });
export const sub = (a: Vec, b: Vec): Vec => ({ x: a.x - b.x, y: a.y - b.y });
export const mul = (a: Vec, k: number): Vec => ({ x: a.x * k, y: a.y * k });

export function rot(v: Vec, angle: number): Vec {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return { x: v.x * c - v.y * s, y: v.x * s + v.y * c };
}

const RAD = Math.PI / 180;
const DEG = 180 / Math.PI;

/** direction for an angle measured from straight down, sign = +1 for the figure's left, -1 for right */
function armDir(deg: number, sign: number): Vec {
  const a = deg * RAD;
  return { x: Math.sin(a) * sign, y: -Math.cos(a) };
}

export function buildPose(p: MoveParams): Pose {
  const lean = (p.lean ?? 0);
  const up = rot(DOWN, Math.PI + lean * RAD); // torso axis, pelvis -> shoulders
  const side = rot(up, -Math.PI / 2); // toward the figure's own left

  const pelvis: Vec = { x: 0, y: 0 };
  const shoulderCenter = add(pelvis, mul(up, SEG.torso));

  const lShoulder = add(shoulderCenter, mul(side, SEG.shoulderHalf));
  const rShoulder = add(shoulderCenter, mul(side, -SEG.shoulderHalf));

  const armL = p.armL ?? [0, 0];
  const armR = p.armR ?? [0, 0];
  const legL = p.legL ?? [0, 0];
  const legR = p.legR ?? [0, 0];

  const lElbow = add(lShoulder, mul(armDir(armL[0], 1), SEG.upperArm));
  const lWrist = add(lElbow, mul(armDir(armL[0] + armL[1], 1), SEG.foreArm));
  const rElbow = add(rShoulder, mul(armDir(armR[0], -1), SEG.upperArm));
  const rWrist = add(rElbow, mul(armDir(armR[0] + armR[1], -1), SEG.foreArm));

  const lHip = add(pelvis, mul(side, SEG.hipHalf));
  const rHip = add(pelvis, mul(side, -SEG.hipHalf));
  const lKnee = add(lHip, mul(armDir(legL[0], 1), SEG.thigh));
  const lAnkle = add(lKnee, mul(armDir(legL[0] + legL[1], 1), SEG.shin));
  const rKnee = add(rHip, mul(armDir(legR[0], -1), SEG.thigh));
  const rAnkle = add(rKnee, mul(armDir(legR[0] + legR[1], -1), SEG.shin));

  const headTilt = (p.head ?? 0) * RAD;
  const head = add(add(shoulderCenter, mul(up, SEG.headUp)), mul(rot(side, -headTilt), 0));

  return {
    pelvis, shoulderCenter, head,
    lShoulder, lElbow, lWrist,
    rShoulder, rElbow, rWrist,
    lHip, lKnee, lAnkle,
    rHip, rKnee, rAnkle,
  };
}

function angleFromDown(a: Vec, b: Vec, sign: number): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return Math.atan2(dx * sign, -dy) * DEG;
}

function wrap(d: number): number {
  while (d > 180) d -= 360;
  while (d < -180) d += 360;
  return d;
}

export function poseFeatures(p: Pose): Features {
  const lean = Math.atan2(p.shoulderCenter.x - p.pelvis.x, p.shoulderCenter.y - p.pelvis.y) * DEG;
  const hv = sub(p.head, p.shoulderCenter);
  const headAbs = Math.atan2(hv.x, hv.y) * DEG;
  const armLSh = angleFromDown(p.lShoulder, p.lElbow, 1);
  const armLEl = wrap(angleFromDown(p.lElbow, p.lWrist, 1) - armLSh);
  const armRSh = angleFromDown(p.rShoulder, p.rElbow, -1);
  const armREl = wrap(angleFromDown(p.rElbow, p.rWrist, -1) - armRSh);
  const legLHip = angleFromDown(p.lHip, p.lKnee, 1);
  const legLKnee = wrap(angleFromDown(p.lKnee, p.lAnkle, 1) - legLHip);
  const legRHip = angleFromDown(p.rHip, p.rKnee, -1);
  const legRKnee = wrap(angleFromDown(p.rKnee, p.rAnkle, -1) - legRHip);
  return {
    lean, head: wrap(headAbs - lean),
    armLSh, armLEl, armRSh, armREl,
    legLHip, legLKnee, legRHip, legRKnee,
  };
}

const MATCH_WEIGHTS: [keyof Features, number][] = [
  ["armLSh", 1.0], ["armLEl", 0.7],
  ["armRSh", 1.0], ["armREl", 0.7],
  ["legLHip", 0.55], ["legLKnee", 0.35],
  ["legRHip", 0.55], ["legRKnee", 0.35],
  ["lean", 0.7], ["head", 0.2],
];

export const MATCH_TOLERANCE = 46;

/** 0..1 similarity between a player pose and the target pose */
export function matchScore(player: Pose, target: Pose): number {
  const a = poseFeatures(player);
  const b = poseFeatures(target);
  let sum = 0;
  let wsum = 0;
  for (const [k, w] of MATCH_WEIGHTS) {
    sum += Math.abs(wrap(a[k] - b[k])) * w;
    wsum += w;
  }
  const err = sum / wsum;
  return Math.max(0, Math.min(1, 1 - err / MATCH_TOLERANCE));
}

export function blendParams(a: MoveParams, b: MoveParams, t: number): MoveParams {
  const lerp = (x = 0, y = 0) => x + (y - x) * t;
  const pair = (p?: [number, number], q?: [number, number]): [number, number] => [
    lerp(p?.[0], q?.[0]),
    lerp(p?.[1], q?.[1]),
  ];
  return {
    lean: lerp(a.lean, b.lean),
    head: lerp(a.head, b.head),
    armL: pair(a.armL, b.armL),
    armR: pair(a.armR, b.armR),
    legL: pair(a.legL, b.legL),
    legR: pair(a.legR, b.legR),
  };
}

export const easeInOut = (t: number): number =>
  t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
