import { MoveParams } from "./rig";

export type Move = {
  id: string;
  params: MoveParams;
  /** short hint shown under the beat ring, in keyboard mode */
  key?: string;
};

const idle: MoveParams = { armL: [10, -8], armR: [10, -8], legL: [5, 0], legR: [5, 0], lean: 0, head: 0 };

export const BASE: MoveParams = idle;

export const MOVES: Record<string, Move> = {
  stand: { id: "stand", params: idle, key: "—" },
  spread: {
    id: "spread",
    params: { armL: [96, 0], armR: [96, 0], legL: [10, 0], legR: [10, 0], lean: 0 },
    key: "↑",
  },
  armsUp: {
    id: "armsUp",
    params: { armL: [152, 12], armR: [152, 12], legL: [6, 0], legR: [6, 0], head: -6 },
    key: "↑",
  },
  slump: {
    id: "slump",
    params: { armL: [2, -4], armR: [2, -4], lean: 6, head: 20 },
    key: "↓",
  },
  clawL: {
    id: "clawL",
    params: { armL: [118, 74], armR: [6, -6], lean: -8, head: -6 },
    key: "←",
  },
  clawR: {
    id: "clawR",
    params: { armR: [118, 74], armL: [6, -6], lean: 8, head: 6 },
    key: "→",
  },
  kneeL: {
    id: "kneeL",
    params: { legL: [78, -82], legR: [2, 0], armL: [26, 0], armR: [26, 0], lean: 4 },
    key: "←",
  },
  kneeR: {
    id: "kneeR",
    params: { legR: [78, -82], legL: [2, 0], armL: [26, 0], armR: [26, 0], lean: -4 },
    key: "→",
  },
  leanL: {
    id: "leanL",
    params: { lean: 26, head: 10, armL: [46, 0], armR: [46, 0], legL: [12, 0], legR: [4, 0] },
    key: "←",
  },
  leanR: {
    id: "leanR",
    params: { lean: -26, head: -10, armL: [46, 0], armR: [46, 0], legL: [4, 0], legR: [12, 0] },
    key: "→",
  },
  reach: {
    id: "reach",
    params: { armL: [128, 6], armR: [34, -18], lean: 12, head: 12, legL: [16, 0], legR: [2, 0] },
    key: " ←",
  },
  twist: {
    id: "twist",
    params: { armL: [62, 58], armR: [62, -58], lean: -12, head: 18 },
    key: "↓",
  },
  clawBoth: {
    id: "clawBoth",
    params: { armL: [104, 82], armR: [104, 82], lean: 0, head: -4 },
    key: "↑",
  },
  hang: {
    id: "hang",
    params: { armL: [168, 4], armR: [168, 4], lean: 0, head: 26 },
    key: "↑",
  },
  stepL: {
    id: "stepL",
    params: { legL: [34, -26], legR: [2, 0], armL: [30, 0], armR: [58, 0], lean: 8 },
    key: "←",
  },
  stepR: {
    id: "stepR",
    params: { legR: [34, -26], legL: [2, 0], armL: [58, 0], armR: [30, 0], lean: -8 },
    key: "→",
  },
};

export type Segment = {
  index: number;
  title: string;
  line: string;
  bpm: number;
  moveIds: string[];
  /** beats of silence/ambience before the first move */
  leadIn: number;
  /** how many backup dancers are present */
  backups: number;
  /** reflection lag in seconds */
  lag: number;
  /** multiplier applied to the scoring window */
  strictness: number;
};

export const SEGMENTS: Segment[] = [
  {
    index: 0,
    title: "第一段 · 空排练厅",
    line: "镜子是干净的。你不记得谁擦的。",
    bpm: 108,
    leadIn: 8,
    moveIds: ["spread", "slump", "armsUp", "stand", "kneeL", "kneeR", "spread", "stand"],
    backups: 0,
    lag: 0,
    strictness: 1,
  },
  {
    index: 1,
    title: "第二段 · 她们来了",
    line: "她们跳得比你准。",
    bpm: 116,
    leadIn: 4,
    moveIds: ["reach", "clawL", "clawR", "twist", "leanL", "leanR", "armsUp", "slump"],
    backups: 2,
    lag: 0,
    strictness: 1,
  },
  {
    index: 2,
    title: "第三段 · 慢半拍",
    line: "镜子里的你，比你要晚一点。",
    bpm: 122,
    leadIn: 4,
    moveIds: ["clawBoth", "stepL", "stepR", "reach", "hang", "twist", "kneeL", "armsUp"],
    backups: 3,
    lag: 0.16,
    strictness: 1.1,
  },
  {
    index: 3,
    title: "第四段 · 多一个",
    line: "别数。",
    bpm: 128,
    leadIn: 4,
    moveIds: ["leanL", "clawL", "stepR", "clawBoth", "hang", "kneeR", "reach", "twist"],
    backups: 4,
    lag: 0.22,
    strictness: 1.2,
  },
  {
    index: 4,
    title: "终段 · 谢幕",
    line: "最后一遍。跳对，就结束了。",
    bpm: 136,
    leadIn: 4,
    moveIds: ["clawBoth", "armsUp", "stepL", "clawR", "kneeL", "reach", "hang", "stand"],
    backups: 5,
    lag: 0.3,
    strictness: 1.3,
  },
];

export const BEATS_PER_MOVE = 4;

export function moveBySegment(seg: Segment, i: number): Move {
  return MOVES[seg.moveIds[i % seg.moveIds.length]];
}

/** total beats a segment occupies */
export function segmentBeats(seg: Segment): number {
  return seg.leadIn + seg.moveIds.length * BEATS_PER_MOVE + 4;
}
