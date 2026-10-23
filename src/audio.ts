/** Web Audio engine: procedural funk/horror groove + all sfx. No samples, no external assets. */

import { MetalRig } from "./metal";

const NOTE = (n: number) => 440 * Math.pow(2, (n - 69) / 12);
const D2 = NOTE(38), F2 = NOTE(41), G2 = NOTE(43), A2 = NOTE(45), BB2 = NOTE(46), D3 = NOTE(50);

const BASS: (number | 0)[] = [
  D2, 0, 0, D2, 0, 0, F2, 0,
  G2, 0, 0, G2, 0, A2, 0, 0,
];
const KICK = [1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1];
const SNARE = [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0];
const STAB = [0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0];

export class AudioEngine {
  ctx: AudioContext | null = null;
  bpm = 128;
  playing = false;

  private master!: GainNode;
  private music!: GainNode;
  private sfx!: GainNode;
  private noise!: AudioBuffer;
  private timer: number | null = null;
  private nextStepTime = 0;
  private stepIdx = 0;
  private layerDrums = 1;
  private layerBass = 1;
  private layerStab = 0;
  private layerLead = 0;
  private layerHats = 0;
  private metal: MetalRig | null = null;
  private metalGain!: GainNode;
  private metalOn = false;
  private metalBar = 0;
  private muted = false;

  get ready(): boolean {
    return this.ctx !== null;
  }

  isRunning(): boolean {
    return this.ctx !== null && this.ctx.state === "running";
  }

  now(): number {
    if (this.ctx && this.ctx.state === "running") return this.ctx.currentTime;
    return performance.now() / 1000;
  }

  async init(): Promise<void> {
    if (this.ctx) {
      if (this.ctx.state === "suspended") await this.ctx.resume();
      return;
    }
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new Ctor();
    this.ctx = ctx;

    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -14;
    comp.ratio.value = 4;
    comp.attack.value = 0.004;
    comp.release.value = 0.18;
    comp.connect(ctx.destination);

    this.master = ctx.createGain();
    this.master.gain.value = 0.9;
    this.master.connect(comp);

    this.music = ctx.createGain();
    this.music.gain.value = 0.72;
    this.music.connect(this.master);

    this.metalGain = ctx.createGain();
    this.metalGain.gain.value = 0.0001;
    this.metalGain.connect(this.music);
    this.metal = new MetalRig(ctx, this.metalGain);

    this.sfx = ctx.createGain();
    this.sfx.gain.value = 0.9;
    this.sfx.connect(this.master);

    const len = ctx.sampleRate * 2;
    this.noise = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = this.noise.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;

    if (ctx.state === "suspended") await ctx.resume();
  }

  setTempo(bpm: number) {
    this.bpm = bpm;
  }

  setLayers(level: number) {
    // from level 3 the band turns into a distorted metal arrangement
    const metal = level >= 3;
    if (metal !== this.metalOn) {
      this.metalOn = metal;
      this.metalBar = 0;
      if (this.ctx) {
        const t = this.ctx.currentTime;
        this.metalGain.gain.cancelScheduledValues(t);
        this.metalGain.gain.setTargetAtTime(metal ? 0.85 : 0.0001, t, 0.25);
      }
    }
    this.layerDrums = metal ? 0 : 1;
    this.layerBass = metal ? 0 : 1;
    this.layerStab = metal || level < 1 ? 0 : 1;
    this.layerHats = metal || level < 1 ? 0 : 1;
    this.layerLead = metal || level < 3 ? 0 : 1;
  }

  startGroove() {
    if (!this.ctx || this.playing) return;
    this.playing = true;
    this.stepIdx = 0;
    this.metalBar = 0;
    this.nextStepTime = this.ctx.currentTime + 0.08;
    this.timer = window.setInterval(() => this.schedule(), 25);
  }

  stopGroove() {
    this.playing = false;
    if (this.timer !== null) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  duckMusic(amount: number, seconds: number) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    this.music.gain.cancelScheduledValues(t);
    this.music.gain.setValueAtTime(this.music.gain.value, t);
    this.music.gain.linearRampToValueAtTime(amount, t + 0.08);
    this.music.gain.linearRampToValueAtTime(0.72, t + seconds);
  }

  silenceMusic() {
    if (!this.ctx) return;
    this.music.gain.cancelScheduledValues(this.ctx.currentTime);
    this.music.gain.setTargetAtTime(0.0001, this.ctx.currentTime, 0.05);
  }

  restoreMusic() {
    if (!this.ctx) return;
    this.music.gain.cancelScheduledValues(this.ctx.currentTime);
    this.music.gain.setTargetAtTime(0.72, this.ctx.currentTime, 0.1);
  }

  toggleMute(): boolean {
    if (!this.master) return this.muted;
    this.muted = !this.muted;
    this.master.gain.setTargetAtTime(this.muted ? 0 : 0.9, this.now(), 0.05);
    return this.muted;
  }

  private schedule() {
    if (!this.ctx || !this.playing) return;
    const stepDur = 60 / this.bpm / 4;
    while (this.nextStepTime < this.ctx.currentTime + 0.12) {
      const s = this.stepIdx % 16;
      const t = this.nextStepTime;

      if (s === 0) {
        if (this.metalOn) this.metal?.scheduleBar(t, this.metalBar++, this.bpm, "game");
      }

      if (this.layerDrums) {
        if (KICK[s]) this.kick(t);
        if (SNARE[s]) this.snare(t);
      }
      if (this.layerHats && s % 2 === 0) this.hat(t, s % 4 === 2);
      if (this.layerBass) {
        const n = BASS[s];
        if (n) this.bass(t, n, stepDur * 1.4);
      }
      if (this.layerStab && STAB[s]) this.stab(t, s % 8 === 3 ? [D3, F2, A2] : [D3, G2, BB2]);
      if (this.layerLead && s % 8 === 6) this.lead(t, s % 16 === 6 ? A2 * 2 : D3 * 2);

      this.nextStepTime += stepDur;
      this.stepIdx++;
    }
  }

  // ---------- instruments ----------

  private env(g: GainNode, t: number, peak: number, attack: number, decay: number) {
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(Math.max(0.0002, peak), t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + attack + decay);
  }

  private kick(t: number) {
    const ctx = this.ctx!;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sine";
    o.frequency.setValueAtTime(150, t);
    o.frequency.exponentialRampToValueAtTime(42, t + 0.11);
    this.env(g, t, 0.95, 0.004, 0.3);
    o.connect(g).connect(this.music);
    o.start(t);
    o.stop(t + 0.4);
  }

  private snare(t: number) {
    const ctx = this.ctx!;
    const src = ctx.createBufferSource();
    src.buffer = this.noise;
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 1900;
    bp.Q.value = 0.8;
    const g = ctx.createGain();
    this.env(g, t, 0.5, 0.002, 0.16);
    src.connect(bp).connect(g).connect(this.music);
    src.start(t, Math.random() * 1.5);
    src.stop(t + 0.22);

    const o = ctx.createOscillator();
    const og = ctx.createGain();
    o.type = "triangle";
    o.frequency.setValueAtTime(185, t);
    o.frequency.exponentialRampToValueAtTime(120, t + 0.1);
    this.env(og, t, 0.28, 0.002, 0.1);
    o.connect(og).connect(this.music);
    o.start(t);
    o.stop(t + 0.16);
  }

  private hat(t: number, open: boolean) {
    const ctx = this.ctx!;
    const src = ctx.createBufferSource();
    src.buffer = this.noise;
    const hp = ctx.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 7600;
    const g = ctx.createGain();
    this.env(g, t, open ? 0.16 : 0.1, 0.001, open ? 0.13 : 0.035);
    src.connect(hp).connect(g).connect(this.music);
    src.start(t, Math.random() * 1.5);
    src.stop(t + 0.2);
  }

  private bass(t: number, freq: number, dur: number) {
    const ctx = this.ctx!;
    const o = ctx.createOscillator();
    const f = ctx.createBiquadFilter();
    const g = ctx.createGain();
    o.type = "sawtooth";
    o.frequency.setValueAtTime(freq, t);
    f.type = "lowpass";
    f.frequency.setValueAtTime(900, t);
    f.frequency.exponentialRampToValueAtTime(220, t + dur);
    f.Q.value = 6;
    this.env(g, t, 0.34, 0.006, dur);
    o.connect(f).connect(g).connect(this.music);
    o.start(t);
    o.stop(t + dur + 0.05);
  }

  private stab(t: number, freqs: number[]) {
    const ctx = this.ctx!;
    const g = ctx.createGain();
    this.env(g, t, 0.12, 0.004, 0.22);
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 2400;
    for (const fr of freqs) {
      const o = ctx.createOscillator();
      o.type = "sawtooth";
      o.frequency.value = fr;
      o.detune.value = (Math.random() - 0.5) * 12;
      o.connect(lp);
      o.start(t);
      o.stop(t + 0.3);
    }
    lp.connect(g).connect(this.music);
  }

  private lead(t: number, freq: number) {
    const ctx = this.ctx!;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    const vib = ctx.createOscillator();
    const vibGain = ctx.createGain();
    o.type = "sine";
    o.frequency.setValueAtTime(freq * 0.97, t);
    o.frequency.linearRampToValueAtTime(freq, t + 0.12);
    vib.frequency.value = 5.5;
    vibGain.gain.value = 3;
    vib.connect(vibGain).connect(o.frequency);
    this.env(g, t, 0.09, 0.05, 0.55);
    o.connect(g).connect(this.music);
    o.start(t);
    vib.start(t);
    o.stop(t + 0.7);
    vib.stop(t + 0.7);
  }

  // ---------- sfx ----------

  private noiseBurst(t: number, dur: number, type: BiquadFilterType, freq: number, q: number, peak: number, dest: AudioNode) {
    const ctx = this.ctx!;
    const src = ctx.createBufferSource();
    src.buffer = this.noise;
    const f = ctx.createBiquadFilter();
    f.type = type;
    f.frequency.value = freq;
    f.Q.value = q;
    const g = ctx.createGain();
    this.env(g, t, peak, 0.003, dur);
    src.connect(f).connect(g).connect(dest);
    src.start(t, Math.random() * 1.2);
    src.stop(t + dur + 0.1);
    return f;
  }

  crow() {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;
    for (let i = 0; i < 2; i++) {
      const at = t + i * 0.22;
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      const f = ctx.createBiquadFilter();
      o.type = "sawtooth";
      o.frequency.setValueAtTime(620 + Math.random() * 120, at);
      o.frequency.exponentialRampToValueAtTime(300, at + 0.18);
      f.type = "bandpass";
      f.frequency.value = 1400;
      f.Q.value = 4;
      this.env(g, at, 0.22, 0.01, 0.2);
      o.connect(f).connect(g).connect(this.sfx);
      o.start(at);
      o.stop(at + 0.25);
    }
  }

  heartbeat(strength = 1) {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;
    for (let i = 0; i < 2; i++) {
      const at = t + i * 0.17;
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sine";
      o.frequency.setValueAtTime(62, at);
      o.frequency.exponentialRampToValueAtTime(34, at + 0.16);
      this.env(g, at, 0.5 * strength * (i === 0 ? 1 : 0.65), 0.01, 0.16);
      o.connect(g).connect(this.sfx);
      o.start(at);
      o.stop(at + 0.22);
    }
  }

  door() {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const f = this.noiseBurst(t, 0.5, "bandpass", 320, 3, 0.3, this.sfx);
    f.frequency.setValueAtTime(300, t);
    f.frequency.linearRampToValueAtTime(140, t + 0.45);
  }

  stinger() {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;
    const o = ctx.createOscillator();
    const o2 = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sawtooth";
    o2.type = "sawtooth";
    o.frequency.setValueAtTime(220, t);
    o.frequency.exponentialRampToValueAtTime(880, t + 0.35);
    o2.frequency.setValueAtTime(233, t);
    o2.frequency.exponentialRampToValueAtTime(932, t + 0.35);
    this.env(g, t, 0.16, 0.004, 0.5);
    o.connect(g);
    o2.connect(g);
    g.connect(this.sfx);
    o.start(t);
    o2.start(t);
    o.stop(t + 0.6);
    o2.stop(t + 0.6);
  }

  glass() {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    this.noiseBurst(t, 0.5, "highpass", 2600, 1, 0.5, this.sfx);
    this.noiseBurst(t + 0.02, 0.35, "bandpass", 5200, 8, 0.25, this.sfx);
  }

  /** a human scream: saw + three formants + falling pitch + breath */
  scream() {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const t0 = ctx.currentTime;
    const dur = 1.1;

    const out = ctx.createGain();
    out.gain.setValueAtTime(0.0001, t0);
    out.gain.exponentialRampToValueAtTime(0.55, t0 + 0.06);
    out.gain.setValueAtTime(0.55, t0 + 0.5);
    out.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    out.connect(this.sfx);

    const shaper = ctx.createWaveShaper();
    const curve = new Float32Array(1024);
    for (let i = 0; i < 1024; i++) {
      const x = (i / 1023) * 2 - 1;
      curve[i] = Math.tanh(x * 3.2);
    }
    shaper.curve = curve;
    shaper.connect(out);

    const src = ctx.createOscillator();
    src.type = "sawtooth";
    src.frequency.setValueAtTime(760, t0);
    src.frequency.exponentialRampToValueAtTime(430, t0 + 0.25);
    src.frequency.exponentialRampToValueAtTime(175, t0 + dur);

    const vib = ctx.createOscillator();
    const vibG = ctx.createGain();
    vib.frequency.value = 7.5;
    vibG.gain.value = 16;
    vib.connect(vibG).connect(src.frequency);

    const formants: [number, number][] = [
      [820, 9],
      [1180, 11],
      [2650, 8],
    ];
    for (const [freq, q] of formants) {
      const bp = ctx.createBiquadFilter();
      bp.type = "bandpass";
      bp.frequency.value = freq;
      bp.Q.value = q;
      const g = ctx.createGain();
      g.gain.value = 1.6;
      src.connect(bp).connect(g).connect(shaper);
    }

    const breath = ctx.createBufferSource();
    breath.buffer = this.noise;
    const bf = ctx.createBiquadFilter();
    bf.type = "bandpass";
    bf.frequency.value = 1800;
    bf.Q.value = 1.2;
    const bg = ctx.createGain();
    bg.gain.setValueAtTime(0.0001, t0);
    bg.gain.exponentialRampToValueAtTime(0.18, t0 + 0.08);
    bg.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.8);
    breath.connect(bf).connect(bg).connect(out);
    breath.start(t0);
    breath.stop(t0 + 0.9);

    src.start(t0);
    vib.start(t0);
    src.stop(t0 + dur);
    vib.stop(t0 + dur);
  }

  /** the crowd of them, dry and voiceless */
  crowd() {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;
    for (let i = 0; i < 5; i++) {
      const at = t + Math.random() * 0.12;
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      const f1 = ctx.createBiquadFilter();
      const f2 = ctx.createBiquadFilter();
      o.type = "sawtooth";
      o.frequency.setValueAtTime(120 + Math.random() * 90, at);
      o.frequency.exponentialRampToValueAtTime(70 + Math.random() * 40, at + 0.9);
      f1.type = "bandpass";
      f1.frequency.value = 450 + Math.random() * 200;
      f1.Q.value = 3;
      f2.type = "bandpass";
      f2.frequency.value = 1100 + Math.random() * 500;
      f2.Q.value = 5;
      this.env(g, at, 0.16, 0.05, 0.9);
      o.connect(f1).connect(f2).connect(g).connect(this.sfx);
      o.start(at);
      o.stop(at + 1.1);
    }
  }

  step() {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    this.noiseBurst(t, 0.08, "lowpass", 420, 1, 0.16, this.sfx);
  }
}
