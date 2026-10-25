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
    key: "↑",
  },
  twist: {
    id: "twist",
    name: "扭身",
    params: { armL: [62, 58], armR: [62, -58], lean: -12, head: 18, legL: [8, 0], legR: [8, 0] },
    key: "←",
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
  /** 退步：重心后撤、双臂微张护身，不是踏步的前探 */
  stepBack: {
    id: "stepBack",
    name: "退步",
    params: { legL: [10, 14], legR: [10, 14], armL: [24, -10], armR: [24, -10], lean: 18, head: 8 },
    key: "↓",
  },
  /** 抬头：核心四动作里最安静的一个，手臂垂落，只把头扬起来 */
  lookUp: {
    id: "lookUp",
    name: "抬头",
    params: { armL: [4, -2], armR: [4, -2], legL: [5, 0], legR: [5, 0], lean: -4, head: -34 },
    key: "→",
  },
};

/**
 * 故事首尾贯穿的四个核心动作：伸手、退步、转身、抬头。
 * 教程只教这四个；第 1–6 关在这四个之上加花；
 * 终章（breakdown + 高潮段）把它们收回来，只跳这四个。
 */
export const CORE_FOUR = ["reach", "stepBack", "twist", "lookUp"];

/** 第 0 关：教程只教核心四动作——伸手、退步、转身、抬头 */
export const TUTORIAL = CORE_FOUR;

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

/** dead beat.mp3 的真实速度（librosa 测得），整套编舞都踩它 */
export const SONG_BPM = 129.2;

/**
 * 固定编舞表：不再随机生成。
 * 每关的序列都是手写的，头一个和最后一个都落在核心四动作上，
 * 这样"伸手—退步—转身—抬头"这条线从教学一路贯到终章。
 * 相邻两拍绝不同键，避免玩家连着按同一个方向。
 */
const LEVEL_SEQUENCES: string[][] = [
  // 第 1 关：只有最基础的动作
  ["reach", "slump", "twist", "spread", "stepBack", "lookUp", "slump", "reach"],
  // 第 2 关：开始加方向变化
  ["reach", "slump", "twist", "leanR", "stepBack", "spread", "kneeL", "lookUp", "slump", "reach"],
  // 第 3 关：加入抓与双臂
  ["reach", "stepBack", "twist", "clawR", "spread", "kneeL", "lookUp", "leanL", "armsUp", "stepL", "slump", "reach"],
  // 第 4 关：从这一关起每动作 3 拍，密度上来
  ["reach", "clawL", "stepBack", "kneeR", "twist", "leanR", "armsUp", "lookUp", "stepL", "hang", "slump", "clawR", "kneeL", "reach"],
  // 第 5 关
  ["reach", "stepL", "armsUp", "leanR", "stepBack", "clawL", "lookUp", "hang", "kneeL", "clawBoth", "slump", "stepR", "twist", "spread", "leanL", "reach"],
  // 第 6 关：全动作池，最后一拍仍然是"伸手"
  ["reach", "clawL", "leanR", "stepBack", "kneeL", "armsUp", "twist", "clawR", "hang", "stepL", "slump", "leanL", "spread", "kneeR", "clawBoth", "stepR", "twist", "reach"],
];

const LEVEL_BEATS_PER_MOVE = [4, 4, 4, 3, 3, 3];

/**
 * 终章·前半（歌曲 breakdown 段，第 564–598 拍）：
 * 动作全收回到核心四动作，但仍保留方向变化，忽快忽慢。
 */
export const BREAKDOWN_SEQUENCE = [
  "stepBack", "lookUp", "reach", "twist",
  "stepBack", "lookUp", "reach", "twist",
];
export const BREAKDOWN_BEATS_PER_MOVE = 4;

/**
 * 终章·高潮（歌曲 peak 段，第 598–680 拍，约 80 拍）：
 * 只剩核心四动作，一遍一遍重复，不再加花、不再提速。
 */
export const PEAK_SEQUENCE = [
  "reach", "stepBack", "twist", "lookUp",
  "reach", "stepBack", "twist", "lookUp",
  "reach", "stepBack", "twist", "lookUp",
  "reach", "stepBack", "twist", "lookUp",
  "reach", "stepBack", "twist", "lookUp",
];
export const PEAK_BEATS_PER_MOVE = 4;

export function levelPlan(level: number): LevelPlan {
  const n = Math.min(MAX_LEVEL, Math.max(1, level));
  return {
    level: n,
    bpm: SONG_BPM,
    beatsPerMove: LEVEL_BEATS_PER_MOVE[n - 1],
    moveIds: LEVEL_SEQUENCES[n - 1],
    cycleBeats: Math.max(8, 13 - n),
    zombieCount: Math.min(6, n + 1),
  };
}

/** 终章的两个段落，同样返回 LevelPlan，好让关卡逻辑原样复用 */
export function finalePlan(section: "breakdown" | "peak"): LevelPlan {
  if (section === "breakdown") {
    return {
      level: MAX_LEVEL,
      bpm: SONG_BPM,
      beatsPerMove: BREAKDOWN_BEATS_PER_MOVE,
      moveIds: BREAKDOWN_SEQUENCE,
      cycleBeats: 8,
      zombieCount: 6,
    };
  }
  return {
    level: MAX_LEVEL,
    bpm: SONG_BPM,
    beatsPerMove: PEAK_BEATS_PER_MOVE,
    moveIds: PEAK_SEQUENCE,
    cycleBeats: 8,
    zombieCount: 6,
  };
}
