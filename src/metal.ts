/**
 * Original heavy-metal arrangement for MoonNight. Everything is synthesized
 * from oscillators, filtered noise and waveshapers — no samples, no covers.
 * The riffs are written in D Phrygian (b2 = Eb) to keep the gothic dread.
 *
 * The same rig drives the live game layer (from level 3) and the offline WAV
 * render, so what you hear in docs/music is what the game plays.
 */

type Ctx = BaseAudioContext;
export type MetalMode = "song" | "game";

const M = (n: number) => 440 * Math.pow(2, (n - 69) / 12);
const ACCENT_A = new Set([3, 6, 10, 12, 14]);

// D Phrygian riff: D D D Eb | D D F D | D D Eb D | G F Eb D
const RIFF_A = [50, 50, 50, 51, 50, 50, 53, 50, 50, 50, 51, 50, 55, 53, 51, 50];
const KICK_A = [1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0];
// half-time gothic progression: D5 Bb5 G5 A5
const VERSE_B = [50, 46, 43, 45];
// chorus sells the two-bar change: D5 Bb5 G5 A5
const CHORUS = [50, 46, 43, 45];
// tom pitches used in fills (high to low)
const TOMS = [57, 55, 52, 48];

type Note = [step: number, midi: number, steps: number, bendFrom?: number];

// eight-bar solo, D minor pentatonic + b2 / b6 for the evil flavour
const SOLO: Note[][] = [
  [[0, 62, 1], [1, 65, 1], [2, 67, 1], [3, 69, 1], [4, 72, 1], [5, 74, 1], [6, 72, 1], [7, 69, 1], [8, 67, 1], [9, 69, 1], [10, 65, 1], [11, 67, 1], [12, 62, 4]],
  [[0, 74, 4], [4, 75, 2], [6, 74, 2], [8, 72, 2], [10, 69, 2], [12, 67, 2], [14, 65, 2]],
  [[0, 62, 1], [1, 63, 1], [2, 65, 1], [3, 67, 1], [4, 69, 1], [5, 70, 1], [6, 72, 1], [7, 74, 1], [8, 75, 3], [11, 74, 2], [13, 72, 3]],
  [[0, 74, 2], [2, 72, 2], [4, 69, 2], [6, 67, 2], [8, 65, 1], [9, 67, 1], [10, 69, 1], [11, 72, 1], [12, 74, 4]],
  [[0, 74, 1], [1, 72, 1], [2, 69, 1], [3, 67, 1], [4, 69, 1], [5, 72, 1], [6, 74, 1], [7, 75, 1], [8, 74, 2], [10, 72, 2], [12, 69, 2], [14, 67, 2]],
  [[0, 81, 4, 79], [4, 79, 2], [6, 77, 2], [8, 75, 2], [10, 74, 2], [12, 72, 2], [14, 74, 2]],
  [[0, 75, 1], [1, 74, 1], [2, 72, 1], [3, 74, 1], [4, 75, 1], [5, 77, 1], [6, 79, 1], [7, 81, 1], [8, 79, 2], [10, 77, 2], [12, 75, 2], [14, 74, 2]],
  [[0, 74, 2], [2, 72, 2], [4, 69, 2], [6, 65, 2], [8, 62, 8]],
];

type Section = "intro" | "riffA" | "riffB" | "solo" | "chorus" | "fill" | "break" | "outro";

function sectionFor(bar: number, mode: MetalMode): Section {
  if (mode === "game") {
    const b = bar % 16;
    if (b < 4) return "riffA";
    if (b < 6) return "riffB";
    if (b < 8) return b === 7 ? "fill" : "riffA";
    if (b < 12) return "chorus";
    if (b < 14) return "solo";
    if (b === 14) return "fill";
    return "break";
  }
  if (bar < 4) return "intro";
  if (bar < 12) return "riffA";
  if (bar < 20) return "riffB";
  if (bar < 28) return "solo";
  if (bar < 36) return "chorus";
  if (bar < 39) return "outro";
  return "fill";
}

function makeDistortion(amount: number): Float32Array<ArrayBuffer> {
  const n = 1024;
  const curve = new Float32Array(n) as Float32Array<ArrayBuffer>;
  const norm = Math.tanh(amount);
  for (let i = 0; i < n; i++) {
    const x = (i / (n - 1)) * 2 - 1;
    curve[i] = Math.tanh(amount * x) / norm;
  }
  return curve;
}

export class MetalRig {
  private readonly ctx: Ctx;
  private readonly noise: AudioBuffer;
  private readonly gtrL: AudioNode;
  private readonly gtrR: AudioNode;
  private readonly bassIn: AudioNode;
  private readonly leadIn: AudioNode;
  private readonly drums: AudioNode;
  private readonly verb: AudioNode;
  private readonly curve = makeDistortion(5.2);

  constructor(ctx: Ctx, dest: AudioNode) {
    this.ctx = ctx;

    const len = Math.floor(ctx.sampleRate * 2);
    this.noise = ctx.createBuffer(1, len, ctx.sampleRate);
    const nd = this.noise.getChannelData(0);
    for (let i = 0; i < len; i++) nd[i] = Math.random() * 2 - 1;

    // shared plate-ish tail for snare, lead and crashes
    const verbLen = Math.floor(ctx.sampleRate * 1.6);
    const ir = ctx.createBuffer(2, verbLen, ctx.sampleRate);
    for (let c = 0; c < 2; c++) {
      const ch = ir.getChannelData(c);
      for (let i = 0; i < verbLen; i++) {
        const decay = Math.pow(1 - i / verbLen, 3.2);
        ch[i] = (Math.random() * 2 - 1) * decay;
      }
    }
    const conv = ctx.createConvolver();
    conv.buffer = ir;
    const verbOut = ctx.createGain();
    verbOut.gain.value = 0.32;
    conv.connect(verbOut).connect(dest);
    this.verb = conv;

    // drums
    const drumGain = ctx.createGain();
    drumGain.gain.value = 0.85;
    drumGain.connect(dest);
    this.drums = drumGain;

    // bass: mild grit, kept under the guitars
    const bassShaper = ctx.createWaveShaper();
    bassShaper.curve = makeDistortion(2.2);
    const bassLp = ctx.createBiquadFilter();
    bassLp.type = "lowpass";
    bassLp.frequency.value = 1500;
    bassLp.Q.value = 0.8;
    const bassGain = ctx.createGain();
    bassGain.gain.value = 0.62;
    this.bassIn = ctx.createGain();
    this.bassIn.connect(bassShaper).connect(bassLp).connect(bassGain).connect(dest);

    // lead: hotter drive + echo
    const leadShaper = ctx.createWaveShaper();
    leadShaper.oversample = "2x";
    leadShaper.curve = makeDistortion(7);
    const leadLp = ctx.createBiquadFilter();
    leadLp.type = "lowpass";
    leadLp.frequency.value = 5600;
    const leadGain = ctx.createGain();
    leadGain.gain.value = 0.5;
    this.leadIn = ctx.createGain();
    this.leadIn.connect(leadShaper).connect(leadLp).connect(leadGain).connect(dest);

    const delay = ctx.createDelay(1);
    delay.delayTime.value = 0.31;
    const fb = ctx.createGain();
    fb.gain.value = 0.3;
    const wet = ctx.createGain();
    wet.gain.value = 0.22;
    leadGain.connect(delay);
    delay.connect(fb).connect(delay);
    delay.connect(wet).connect(dest);

    const leadSend = ctx.createGain();
    leadSend.gain.value = 0.18;
    leadGain.connect(leadSend).connect(conv);

    this.gtrL = this.makeGuitar(dest, -0.55);
    this.gtrR = this.makeGuitar(dest, 0.55);
  }

  private makeGuitar(dest: AudioNode, pan: number): AudioNode {
    const ctx = this.ctx;
    const pre = ctx.createGain();
    pre.gain.value = 2.6;
    const shaper = ctx.createWaveShaper();
    shaper.oversample = "2x";
    shaper.curve = this.curve;
    const hp = ctx.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 88;
    const pk = ctx.createBiquadFilter();
    pk.type = "peaking";
    pk.frequency.value = 1550;
    pk.Q.value = 0.9;
    pk.gain.value = 3.2;
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 4700;
    lp.Q.value = 0.7;
    const cab = ctx.createGain();
    cab.gain.value = 0.42;
    const panner = ctx.createStereoPanner();
    panner.pan.value = pan;
    const send = ctx.createGain();
    send.gain.value = 0.06;
    pre.connect(shaper).connect(hp).connect(pk).connect(lp).connect(cab);
    cab.connect(panner).connect(dest);
    cab.connect(send).connect(this.verb);
    return pre;
  }

  /** schedules one 4/4 bar; `t` is the absolute start time of step 0 */
  scheduleBar(t: number, bar: number, bpm: number, mode: MetalMode = "game") {
    const sd = 60 / bpm / 4;
    const sec = sectionFor(bar, mode);
    switch (sec) {
      case "intro":
        this.introBar(t, sd, bar);
        break;
      case "riffA":
        this.riffA(t, sd, bar % 4 === 0);
        break;
      case "riffB":
        this.riffB(t, sd, VERSE_B[bar % 4], bar % 4 === 3);
        if (bar % 8 === 0) this.crash(t, 0.7);
        break;
      case "solo":
        this.riffA(t, sd, false);
        this.leadPhrase(t, sd, SOLO[(bar - 20 + 8) % 8], 0.9);
        if (bar % 4 === 0) this.crash(t, 0.6);
        break;
      case "chorus":
        this.chorusBar(t, sd, CHORUS[bar % 4], bar % 2 === 0);
        break;
      case "fill":
        this.fillBar(t, sd);
        break;
      case "break":
        this.breakBar(t, sd, bar);
        break;
      case "outro":
        this.outroBar(t, sd, bar);
        break;
    }
  }

  // ---------- sections ----------

  private introBar(t: number, sd: number, bar: number) {
    if (bar === 0) {
      this.crash(t, 0.9);
      this.chord(t, 50, sd * 3.2, 0.95, false);
      this.bass(t, 38, sd * 3.6, 0.85);
      this.drone(t, sd * 8);
      this.door(t + 0.35);
      this.heart(t + 0.9);
      this.heart(t + 2.2);
      this.crow(t + 1.6);
      this.kick(t, 0.8);
      this.kick(t + sd * 8, 0.6);
      return;
    }
    if (bar === 1) {
      for (let s = 0; s < 16; s += 2) {
        this.chord(t + s * sd, 50, sd * 0.85, 0.55, true);
      }
      this.bass(t, 38, sd * 15, 0.7);
      for (const s of [0, 4, 8, 12]) this.kick(t + s * sd, 0.7);
      for (let s = 0; s < 16; s += 2) this.hat(t + s * sd, s === 14);
      this.crow(t + sd * 10);
      return;
    }
    if (bar === 2) {
      for (let s = 0; s < 16; s += 2) {
        this.chord(t + s * sd, 50, sd * 0.85, 0.6, true);
      }
      for (const s of [3, 7, 11, 15]) this.chord(t + s * sd, 51, sd * 0.7, 0.6, true);
      this.bass(t, 38, sd * 15, 0.72);
      for (let s = 0; s < 16; s++) if (KICK_A[s]) this.kick(t + s * sd, 0.62);
      this.snare(t + 4 * sd, 0.7);
      this.snare(t + 12 * sd, 0.75);
      for (let s = 0; s < 16; s += 2) this.hat(t + s * sd, false);
      this.scream(t + sd * 11, 0.55);
      return;
    }
    // bar 3: build
    for (let s = 0; s < 8; s++) this.chord(t + s * sd, 50, sd * 0.8, 0.5 + s * 0.03, true);
    for (let s = 4; s < 16; s++) this.snare(t + s * sd, 0.42 + (s - 4) * 0.035);
    for (const [i, s] of [12, 13, 14, 15].entries()) this.tom(t + s * sd, TOMS[i], 0.75);
    for (const s of [0, 2, 4, 6, 8, 10, 12, 13, 14, 15]) this.kick(t + s * sd, 0.6);
    this.bass(t, 38, sd * 7, 0.6);
    this.door(t + sd * 8);
    this.noiseRiser(t + sd * 8, sd * 8);
  }

  private riffA(t: number, sd: number, crash: boolean) {
    if (crash) this.crash(t, 0.8);
    for (let s = 0; s < 16; s++) {
      const acc = ACCENT_A.has(s);
      this.chord(t + s * sd, RIFF_A[s], acc ? sd * 2.6 : sd * 0.85, acc ? 0.92 : 0.6, !acc);
    }
    for (let s = 0; s < 16; s += 2) this.bass(t + s * sd, (RIFF_A[s] ?? 50) - 12, sd * 1.05, s === 0 ? 0.85 : 0.6);
    for (let s = 0; s < 16; s++) if (KICK_A[s]) this.kick(t + s * sd, s % 4 === 0 ? 0.8 : 0.62);
    this.snare(t + 4 * sd, 0.85);
    this.snare(t + 12 * sd, 0.85);
    for (let s = 0; s < 16; s += 2) this.hat(t + s * sd, s === 14);
  }

  private riffB(t: number, sd: number, chord: number, fill: boolean) {
    this.chord(t, chord, sd * 3.4, 0.95, false);
    this.chord(t + 3 * sd, chord, sd * 0.8, 0.6, true);
    this.chord(t + 6 * sd, chord, sd * 0.8, 0.55, true);
    this.chord(t + 8 * sd, chord, sd * 2.3, 0.9, false);
    this.chord(t + 11 * sd, chord, sd * 0.8, 0.6, true);
    this.chord(t + 14 * sd, chord, sd * 0.8, 0.65, true);
    this.bass(t, chord - 12, sd * 3.2, 0.85);
    this.bass(t + 6 * sd, chord - 12, sd * 0.9, 0.6);
    this.bass(t + 8 * sd, chord - 12, sd * 2.2, 0.75);
    this.bass(t + 14 * sd, chord - 12, sd * 1.8, 0.65);
    for (const s of [0, 3, 6, 8, 11, 14]) this.kick(t + s * sd, s === 0 ? 0.82 : 0.6);
    this.snare(t + 4 * sd, 0.8);
    this.snare(t + 12 * sd, 0.82);
    for (let s = 0; s < 16; s += 2) this.hat(t + s * sd, s === 6);
    if (fill) {
      for (const [i, s] of [12, 13, 14, 15].entries()) this.tom(t + s * sd, TOMS[i], 0.7);
      this.bass(t + 15 * sd, chord - 12, sd, 0.6);
    }
  }

  private chorusBar(t: number, sd: number, chord: number, crash: boolean) {
    if (crash) this.crash(t, 0.75);
    for (const s of [0, 4, 8, 12]) {
      this.chord(t + s * sd, chord, sd * (s === 0 ? 3.1 : 1.7), 0.95, false);
    }
    for (const s of [14, 15]) this.chord(t + s * sd, chord, sd * 0.85, 0.62, true);
    for (let s = 0; s < 16; s += 2) this.bass(t + s * sd, chord - 12, sd * 1.1, 0.8);
    for (let s = 0; s < 16; s++) this.kick(t + s * sd, s % 4 === 0 ? 0.78 : 0.5);
    this.snare(t + 4 * sd, 0.9);
    this.snare(t + 12 * sd, 0.9);
    this.snare(t + 15 * sd, 0.45);
    for (let s = 0; s < 16; s += 2) this.hat(t + s * sd, s === 14);
  }

  private leadPhrase(t: number, sd: number, phrase: Note[], vel: number) {
    for (const [s, midi, steps, bendFrom] of phrase) {
      const dur = steps * sd * 0.92;
      this.lead(t + s * sd, midi, dur, vel, bendFrom, steps >= 3 ? 0.9 : 0);
    }
  }

  private fillBar(t: number, sd: number) {
    for (let s = 0; s < 8; s++) this.chord(t + s * sd, 50, sd * 0.8, 0.5 + s * 0.04, true);
    this.bass(t, 38, sd * 7.5, 0.6);
    for (let s = 4; s < 16; s++) this.snare(t + s * sd, 0.4 + (s - 4) * 0.04);
    for (const [i, s] of [12, 13, 14, 15].entries()) this.tom(t + s * sd, TOMS[i], 0.8);
    for (const s of [0, 2, 4, 6, 8, 10, 12, 13, 14, 15]) this.kick(t + s * sd, 0.55);
    this.crow(t + sd * 2);
    this.door(t + sd * 9);
  }

  private breakBar(t: number, sd: number, bar: number) {
    const chord = bar === 36 ? 50 : bar === 37 ? 51 : 50;
    this.crash(t, 0.85);
    this.chord(t, chord, sd * 3.4, 0.95, false);
    this.chord(t + 8 * sd, 51, sd * 3, 0.9, false);
    this.bass(t, chord - 12, sd * 3.4, 0.8);
    this.bass(t + 8 * sd, 39, sd * 3, 0.75);
    this.kick(t, 0.8);
    this.kick(t + 8 * sd, 0.7);
    this.snare(t + 4 * sd, 0.8);
    this.snare(t + 12 * sd, 0.85);
    for (let s = 0; s < 16; s += 2) this.hat(t + s * sd, false);
    this.scream(t + sd * 1.5, 0.5);
    this.heart(t + sd * 6);
  }

  private outroBar(t: number, sd: number, bar: number) {
    if (bar === 36) {
      this.crash(t, 0.9);
      this.chord(t, 50, sd * 3.6, 0.95, false);
      this.bass(t, 38, sd * 3.8, 0.85);
      this.kick(t, 0.8);
      this.snare(t + 8 * sd, 0.75);
      this.heart(t + sd * 2);
      this.door(t + sd * 9);
      return;
    }
    if (bar === 37) {
      this.chord(t, 51, sd * 3.4, 0.95, false);
      this.chord(t + 8 * sd, 50, sd * 2.5, 0.9, false);
      this.bass(t, 39, sd * 3.4, 0.8);
      this.bass(t + 8 * sd, 38, sd * 2.5, 0.75);
      this.kick(t, 0.7);
      this.snare(t + 4 * sd, 0.75);
      this.snare(t + 12 * sd, 0.8);
      this.crow(t + sd * 2);
      return;
    }
    this.chord(t, 55, sd * 3.2, 0.9, false);
    this.chord(t + 8 * sd, 57, sd * 3.2, 0.9, false);
    this.bass(t, 43, sd * 3.2, 0.78);
    this.bass(t + 8 * sd, 45, sd * 3.2, 0.72);
    this.kick(t, 0.7);
    this.kick(t + 8 * sd, 0.7);
    this.snare(t + 4 * sd, 0.8);
    this.snare(t + 12 * sd, 0.82);
    for (const [i, s] of [13, 14, 15].entries()) this.tom(t + s * sd, TOMS[i], 0.7);
    this.scream(t + sd * 6, 0.42);
  }

  // ---------- instruments ----------

  private chord(t: number, root: number, dur: number, vel: number, mute: boolean) {
    const ctx = this.ctx;
    const peak = vel * (mute ? 0.8 : 0.95);
    for (const [side, bus] of [[0, this.gtrL], [1, this.gtrR]] as const) {
      const at = t + side * 0.006;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, at);
      g.gain.linearRampToValueAtTime(peak, at + 0.004);
      const tail = mute ? 0.05 : Math.min(0.4, dur);
      g.gain.exponentialRampToValueAtTime(Math.max(0.0002, peak * 0.3), at + tail);
      g.gain.setValueAtTime(Math.max(0.0002, peak * (mute ? 0.14 : 0.28)), at + dur);
      g.gain.exponentialRampToValueAtTime(0.0001, at + dur + (mute ? 0.05 : 0.09));
      g.connect(bus);
      const interval = mute ? [[0, -3], [7, 4]] : [[0, -3], [7, 3], [12, 5]];
      for (const [iv, cents] of interval) {
        const o = ctx.createOscillator();
        o.type = "sawtooth";
        o.frequency.value = M(root + iv);
        o.detune.value = cents * (side ? 1 : -1);
        o.connect(g);
        o.start(at);
        o.stop(at + dur + 0.15);
      }
      // pick attack
      const pick = ctx.createBufferSource();
      pick.buffer = this.noise;
      const pf = ctx.createBiquadFilter();
      pf.type = "bandpass";
      pf.frequency.value = 2600;
      pf.Q.value = 1.4;
      const pg = ctx.createGain();
      pg.gain.setValueAtTime(0.11 * vel, at);
      pg.gain.exponentialRampToValueAtTime(0.0001, at + 0.035);
      pick.connect(pf).connect(pg).connect(bus);
      pick.start(at, Math.random() * 1.4);
      pick.stop(at + 0.05);
    }
  }

  private bass(t: number, midi: number, dur: number, vel: number) {
    const ctx = this.ctx;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(vel, t + 0.006);
    g.gain.setValueAtTime(vel, t + Math.max(0.02, dur * 0.7));
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur + 0.05);
    g.connect(this.bassIn);
    const saw = ctx.createOscillator();
    saw.type = "sawtooth";
    saw.frequency.value = M(midi);
    const sub = ctx.createOscillator();
    sub.type = "sine";
    sub.frequency.value = M(midi - 12);
    const subG = ctx.createGain();
    subG.gain.value = 0.55;
    saw.connect(g);
    sub.connect(subG).connect(g);
    saw.start(t);
    sub.start(t);
    saw.stop(t + dur + 0.08);
    sub.stop(t + dur + 0.08);
  }

  private lead(t: number, midi: number, dur: number, vel: number, bendFrom?: number, vib = 0) {
    const ctx = this.ctx;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(vel, t + 0.01);
    g.gain.setValueAtTime(vel * 0.9, t + Math.max(0.05, dur * 0.7));
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur + 0.08);
    g.connect(this.leadIn);

    const oscs: OscillatorNode[] = [];
    for (const [type, cents] of [["sawtooth", -6], ["square", 5]] as const) {
      const o = ctx.createOscillator();
      o.type = type;
      o.frequency.setValueAtTime(M(bendFrom ?? midi), t);
      if (bendFrom !== undefined) o.frequency.exponentialRampToValueAtTime(M(midi), t + 0.11);
      o.detune.value = cents;
      o.connect(g);
      o.start(t);
      o.stop(t + dur + 0.1);
      oscs.push(o);
    }
    if (vib > 0) {
      const lfo = ctx.createOscillator();
      const depth = ctx.createGain();
      lfo.frequency.value = 5.6;
      depth.gain.setValueAtTime(0, t);
      depth.gain.linearRampToValueAtTime(9 * vib, t + 0.22);
      lfo.connect(depth);
      for (const o of oscs) depth.connect(o.frequency);
      lfo.start(t);
      lfo.stop(t + dur + 0.1);
    }
  }

  private kick(t: number, vel: number) {
    const ctx = this.ctx;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sine";
    o.frequency.setValueAtTime(168, t);
    o.frequency.exponentialRampToValueAtTime(46, t + 0.085);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(vel, t + 0.003);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.24);
    o.connect(g).connect(this.drums);
    o.start(t);
    o.stop(t + 0.28);
    const click = ctx.createBufferSource();
    click.buffer = this.noise;
    const hp = ctx.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 2200;
    const cg = ctx.createGain();
    cg.gain.setValueAtTime(0.16 * vel, t);
    cg.gain.exponentialRampToValueAtTime(0.0001, t + 0.03);
    click.connect(hp).connect(cg).connect(this.drums);
    click.start(t, Math.random() * 1.4);
    click.stop(t + 0.04);
  }

  private snare(t: number, vel: number) {
    const ctx = this.ctx;
    const src = ctx.createBufferSource();
    src.buffer = this.noise;
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 1850;
    bp.Q.value = 0.7;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(vel * 0.7, t + 0.002);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);
    src.connect(bp).connect(g).connect(this.drums);
    const send = ctx.createGain();
    send.gain.value = 0.45;
    g.connect(send).connect(this.verb);
    src.start(t, Math.random() * 1.4);
    src.stop(t + 0.22);

    const o = ctx.createOscillator();
    const og = ctx.createGain();
    o.type = "triangle";
    o.frequency.setValueAtTime(200, t);
    o.frequency.exponentialRampToValueAtTime(130, t + 0.09);
    og.gain.setValueAtTime(0.0001, t);
    og.gain.linearRampToValueAtTime(vel * 0.4, t + 0.002);
    og.gain.exponentialRampToValueAtTime(0.0001, t + 0.11);
    o.connect(og).connect(this.drums);
    o.start(t);
    o.stop(t + 0.14);
  }

  private hat(t: number, open: boolean) {
    const ctx = this.ctx;
    const src = ctx.createBufferSource();
    src.buffer = this.noise;
    const hp = ctx.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 8400;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(open ? 0.18 : 0.12, t + 0.001);
    g.gain.exponentialRampToValueAtTime(0.0001, t + (open ? 0.22 : 0.045));
    src.connect(hp).connect(g).connect(this.drums);
    src.start(t, Math.random() * 1.4);
    src.stop(t + 0.26);
  }

  private tom(t: number, midi: number, vel: number) {
    const ctx = this.ctx;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sine";
    o.frequency.setValueAtTime(M(midi), t);
    o.frequency.exponentialRampToValueAtTime(M(midi) * 0.6, t + 0.16);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(vel * 0.8, t + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.3);
    o.connect(g).connect(this.drums);
    o.start(t);
    o.stop(t + 0.34);
    const src = ctx.createBufferSource();
    src.buffer = this.noise;
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 500;
    const ng = ctx.createGain();
    ng.gain.setValueAtTime(vel * 0.18, t);
    ng.gain.exponentialRampToValueAtTime(0.0001, t + 0.1);
    src.connect(lp).connect(ng).connect(this.drums);
    src.start(t, Math.random() * 1.4);
    src.stop(t + 0.12);
  }

  private crash(t: number, vel: number) {
    const ctx = this.ctx;
    const src = ctx.createBufferSource();
    src.buffer = this.noise;
    const hp = ctx.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 4600;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(vel * 0.38, t + 0.003);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 1.7);
    src.connect(hp).connect(g).connect(this.drums);
    const send = ctx.createGain();
    send.gain.value = 0.5;
    g.connect(send).connect(this.verb);
    src.start(t, Math.random() * 1.2);
    src.stop(t + 1.8);
  }

  private drone(t: number, dur: number, vel = 0.22) {
    const ctx = this.ctx;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(vel, t + Math.min(0.6, dur * 0.3));
    g.gain.setValueAtTime(vel, t + dur * 0.7);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    g.connect(this.bassIn);
    const o = ctx.createOscillator();
    o.type = "sawtooth";
    o.frequency.value = M(38);
    const o2 = ctx.createOscillator();
    o2.type = "sine";
    o2.frequency.value = M(26);
    o2.detune.value = 6;
    o.connect(g);
    o2.connect(g);
    o.start(t);
    o2.start(t);
    o.stop(t + dur + 0.1);
    o2.stop(t + dur + 0.1);
  }

  // ---------- horror fx (absolute time, usable offline) ----------

  private heart(t: number) {
    for (let i = 0; i < 2; i++) {
      const at = t + i * 0.17;
      const o = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      o.type = "sine";
      o.frequency.setValueAtTime(62, at);
      o.frequency.exponentialRampToValueAtTime(34, at + 0.16);
      g.gain.setValueAtTime(0.0001, at);
      g.gain.linearRampToValueAtTime(0.5 * (i === 0 ? 1 : 0.65), at + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, at + 0.2);
      o.connect(g).connect(this.drums);
      o.start(at);
      o.stop(at + 0.24);
    }
  }

  private crow(t: number) {
    for (let i = 0; i < 2; i++) {
      const at = t + i * 0.22;
      const o = this.ctx.createOscillator();
      const bp = this.ctx.createBiquadFilter();
      const g = this.ctx.createGain();
      o.type = "sawtooth";
      o.frequency.setValueAtTime(620 + Math.random() * 120, at);
      o.frequency.exponentialRampToValueAtTime(300, at + 0.18);
      bp.type = "bandpass";
      bp.frequency.value = 1400;
      bp.Q.value = 4;
      g.gain.setValueAtTime(0.0001, at);
      g.gain.linearRampToValueAtTime(0.18, at + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, at + 0.21);
      o.connect(bp).connect(g).connect(this.drums);
      o.start(at);
      o.stop(at + 0.25);
    }
  }

  private door(t: number) {
    const src = this.ctx.createBufferSource();
    src.buffer = this.noise;
    const bp = this.ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.setValueAtTime(330, t);
    bp.frequency.linearRampToValueAtTime(150, t + 0.5);
    bp.Q.value = 3;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(0.22, t + 0.04);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.55);
    src.connect(bp).connect(g).connect(this.drums);
    src.start(t, Math.random() * 1.2);
    src.stop(t + 0.6);
  }

  private scream(t: number, vel: number) {
    const ctx = this.ctx;
    const dur = 0.9;
    const out = ctx.createGain();
    out.gain.setValueAtTime(0.0001, t);
    out.gain.exponentialRampToValueAtTime(vel * 0.5, t + 0.05);
    out.gain.setValueAtTime(vel * 0.5, t + 0.4);
    out.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    out.connect(this.verb);
    out.connect(this.drums);

    const src = ctx.createOscillator();
    src.type = "sawtooth";
    src.frequency.setValueAtTime(700, t);
    src.frequency.exponentialRampToValueAtTime(410, t + 0.22);
    src.frequency.exponentialRampToValueAtTime(170, t + dur);

    const vib = ctx.createOscillator();
    const vibG = ctx.createGain();
    vib.frequency.value = 7.2;
    vibG.gain.value = 15;
    vib.connect(vibG).connect(src.frequency);

    const shaper = ctx.createWaveShaper();
    shaper.curve = makeDistortion(3);
    for (const [freq, q] of [[820, 9], [1180, 11], [2600, 8]] as const) {
      const bp = ctx.createBiquadFilter();
      bp.type = "bandpass";
      bp.frequency.value = freq;
      bp.Q.value = q;
      const g = ctx.createGain();
      g.gain.value = 1.5;
      src.connect(bp).connect(g).connect(shaper);
    }
    shaper.connect(out);
    src.start(t);
    vib.start(t);
    src.stop(t + dur);
    vib.stop(t + dur);
  }

  private noiseRiser(t: number, dur: number) {
    const src = this.ctx.createBufferSource();
    src.buffer = this.noise;
    src.loop = true;
    const bp = this.ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.setValueAtTime(300, t);
    bp.frequency.exponentialRampToValueAtTime(3600, t + dur);
    bp.Q.value = 1.2;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.16, t + dur * 0.95);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur + 0.05);
    src.connect(bp).connect(g).connect(this.drums);
    src.start(t);
    src.stop(t + dur + 0.1);
  }
}
