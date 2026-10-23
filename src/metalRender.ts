import { MetalRig } from "./metal";

export const METAL_BPM = 148;
export const METAL_BARS = 40;
const BAR_SECONDS = (60 / METAL_BPM) * 4;

function encodeWav(left: Float32Array, right: Float32Array, sampleRate: number): Uint8Array {
  const frames = left.length;
  const bytes = 44 + frames * 4;
  const buf = new ArrayBuffer(bytes);
  const view = new DataView(buf);
  const writeStr = (off: number, s: string) => {
    for (let i = 0; i < s.length; i++) view.setUint8(off + i, s.charCodeAt(i));
  };
  writeStr(0, "RIFF");
  view.setUint32(4, bytes - 8, true);
  writeStr(8, "WAVE");
  writeStr(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 2, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 4, true);
  view.setUint16(32, 4, true);
  view.setUint16(34, 16, true);
  writeStr(36, "data");
  view.setUint32(40, frames * 4, true);
  let off = 44;
  for (let i = 0; i < frames; i++) {
    for (const ch of [left, right]) {
      const s = Math.max(-1, Math.min(1, ch[i]));
      view.setInt16(off, s < 0 ? s * 0x8000 : s * 0x7fff, true);
      off += 2;
    }
  }
  return new Uint8Array(buf);
}

export async function renderMetalWav(sampleRate = 44100): Promise<{ wav: Uint8Array; seconds: number; peak: number }> {
  const total = METAL_BARS * BAR_SECONDS;
  const tail = 0.8;
  const ctx = new OfflineAudioContext(2, Math.ceil((total + tail) * sampleRate), sampleRate);

  const comp = ctx.createDynamicsCompressor();
  comp.threshold.value = -15;
  comp.knee.value = 10;
  comp.ratio.value = 3.6;
  comp.attack.value = 0.004;
  comp.release.value = 0.18;
  const out = ctx.createGain();
  out.gain.value = 0.8;
  out.connect(comp).connect(ctx.destination);

  const rig = new MetalRig(ctx, out);
  for (let bar = 0; bar < METAL_BARS; bar++) {
    rig.scheduleBar(0.02 + bar * BAR_SECONDS, bar, METAL_BPM, "song");
  }

  const rendered = await ctx.startRendering();
  const L = rendered.getChannelData(0);
  const R = rendered.getChannelData(1);

  let peak = 0;
  for (let i = 0; i < L.length; i++) {
    peak = Math.max(peak, Math.abs(L[i]), Math.abs(R[i]));
  }
  const gain = peak > 0.0001 ? 0.92 / peak : 1;
  const fadeIn = Math.floor(sampleRate * 0.008);
  const fadeOut = Math.floor(sampleRate * 0.06);
  for (let i = 0; i < L.length; i++) {
    let g = gain;
    if (i < fadeIn) g *= i / fadeIn;
    const fromEnd = L.length - 1 - i;
    if (fromEnd < fadeOut) g *= fromEnd / fadeOut;
    L[i] *= g;
    R[i] *= g;
  }

  return {
    wav: encodeWav(L, R, sampleRate),
    seconds: rendered.duration,
    peak,
  };
}
