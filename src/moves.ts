import { MoveParams } from "./rig";

export type KeyHint = "↑" | "↓" | "←" | "→";

export type Move = {
  id: string;
  /** 2-4 chars, shown as the cue while it plays */
  name: string;
  params: MoveParams;
  key: KeyHint;
};

export const BASE: MoveParams = {
  armL: [10, -8],
  armR: [10, -8],
  legL: [5, 0],
  legR: [5, 0],
  lean: 0,
  head: 0,
};

export const MOVES: Record<string, Move> = {
  stand: { id: "stand", name: "站住", params: BASE, key: "↓" },
  spread: {
    id: "spread",
    name: "张开",
    params: { armL: [96, 0], armR: [96, 0], legL: [10, 0], legR: [10, 0], lean: 0, head: 0 },
    key: "↑",
  },
  armsUp: {
    id: "armsUp",
    name: "举高",
    params: { armL: [152, 12], armR: [152, 12], legL: [6, 0], legR: [6, 0], head: -6 },
    key: "↑",
  },
  slump: {
    id: "slump",
    name: "垂下",
    params: { armL: [2, -4], armR: [2, -4], legL: [5, 0], legR: [5, 0], lean: 6, head: 20 },
    key: "↓",
  },
  clawL: {
    id: "clawL",
    name: "左手抓",
    params: { armL: [118, 74], armR: [6, -6], legL: [6, 0], legR: [6, 0], lean: -8, head: -6 },
    key: "←",
  },
  clawR: {
    id: "clawR",
    name: "右手抓",
    params: { armR: [118, 74], armL: [6, -6], legL: [6, 0], legR: [6, 0], lean: 8, head: 6 },
    key: "→",
  },
  kneeL: {
    id: "kneeL",
    name: "抬左膝",
    params: { legL: [78, -82], legR: [2, 0], armL: [26, 0], armR: [26, 0], lean: 4 },
    key: "←",
  },
  kneeR: {
    id: "kneeR",
    name: "抬右膝",
    params: { legR: [78, -82], legL: [2, 0], armL: [26, 0], armR: [26, 0], lean: -4 },
    key: "→",
  },
  leanL: {
    id: "leanL",
    name: "向左倒",
    params: { lean: 26, head: 10, armL: [46, 0], armR: [46, 0], legL: [12, 0], legR: [4, 0] },
    key: "←",
  },
  leanR: {
    id: "leanR",
    name: "向右倒",
    params: { lean: -26, head: -10, armL: [46, 0], armR: [46, 0], legL: [4, 0], legR: [12, 0] },
    key: "→",
  },
  reach: {
    id: "reach",
    name: "斜伸",
    params: { armL: [128, 6], armR: [34, -18], lean: 12, head: 12, legL: [16, 0], legR: [2, 0] },
    key: "←",
  },
  twist: {
    id: "twist",
    name: "扭身",
    params: { armL: [62, 58], armR: [62, -58], lean: -12, head: 18, legL: [8, 0], legR: [8, 0] },
    key: "↓",
  },
  clawBoth: {
    id: "clawBoth",
    name: "双手抓",
    params: { armL: [104, 82], armR: [104, 82], lean: 0, head: -4, legL: [8, 0], legR: [8, 0] },
    key: "↑",
  },
  hang: {
    id: "hang",
    name: "手伸直",
    params: { armL: [168, 4], armR: [168, 4], lean: 0, head: 26, legL: [4, 0], legR: [4, 0] },
    key: "↑",
  },
  stepL: {
    id: "stepL",
    name: "左踏步",
    params: { legL: [34, -26], legR: [2, 0], armL: [30, 0], armR: [58, 0], lean: 8 },
    key: "←",
  },
  stepR: {
    id: "stepR",
    name: "右踏步",
    params: { legR: [34, -26], legL: [2, 0], armL: [58, 0], armR: [30, 0], lean: -8 },
    key: "→",
  },
};

/** 第 0 关：四个动作，跳错了不会死，只会被要求重来 */
export const TUTORIAL = ["spread", "armsUp", "slump", "kneeR"];

export const MAX_LEVEL = 6;

export type LevelPlan = {
  level: number;
  bpm: number;
  beatsPerMove: number;
  moveIds: string[];
  /** beats for one full creep-in-and-snap-back cycle */
  cycleBeats: number;
  zombieCount: number;
};

const POOLS: string[][] = [
  ["spread", "slump", "armsUp"],
  ["spread", "slump", "armsUp", "twist"],
  ["spread", "slump", "armsUp", "twist", "kneeL", "kneeR"],
  ["spread", "slump", "armsUp", "twist", "kneeL", "kneeR", "clawL", "clawR", "clawBoth"],
  ["spread", "slump", "armsUp", "twist", "kneeL", "kneeR", "clawL", "clawR", "clawBoth", "leanL", "leanR"],
  [
    "spread", "slump", "armsUp", "twist", "kneeL", "kneeR", "clawL", "clawR",
    "clawBoth", "leanL", "leanR", "reach", "stepL", "stepR", "hang",
  ],
];

function poolFor(level: number): string[] {
  const i = Math.min(POOLS.length, Math.max(1, level)) - 1;
  return POOLS[i];
}

export function makeSequence(level: number, count: number, rand: () => number): string[] {
  const pool = poolFor(level);
  const out: string[] = [];
  let prev = "";
  let prevKey = "";
  let run = 0;
  for (let i = 0; i < count; i++) {
    let pick = pool[Math.floor(rand() * pool.length)];
    for (let k = 0; k < 24 && (pick === prev || (MOVES[pick].key === prevKey && run >= 2)); k++) {
      pick = pool[Math.floor(rand() * pool.length)];
    }
    run = MOVES[pick].key === prevKey ? run + 1 : 1;
    prevKey = MOVES[pick].key;
    prev = pick;
    out.push(pick);
  }
  return out;
}

export function levelPlan(level: number): LevelPlan {
  const n = Math.min(MAX_LEVEL, Math.max(1, level));
  return {
    level: n,
    bpm: Math.min(168, 120 + n * 8),
    beatsPerMove: n >= 4 ? 3 : 4,
    moveIds: makeSequence(n, Math.min(8, 3 + n), Math.random),
    cycleBeats: Math.max(8, 13 - n),
    zombieCount: Math.min(6, n + 1),
  };
}
