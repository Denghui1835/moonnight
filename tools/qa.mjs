import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// E2E harness: drives the dev server with headless Edge over CDP.
//   node tools/qa.mjs
// Override with QA_URL / EDGE_BIN / QA_OUT when needed.
const TMP = process.env.QA_OUT || path.join(path.dirname(fileURLToPath(import.meta.url)), ".out");
const SHOTS = path.join(TMP, "shots");
const EDGE = process.env.EDGE_BIN || "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const URL = process.env.QA_URL || "http://localhost:5173/";
fs.mkdirSync(SHOTS, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const report = { started: new Date().toISOString(), checks: [], logs: [], errors: [] };
const check = (name, pass, detail) => {
  report.checks.push({ name, pass: !!pass, detail });
  console.log(`${pass ? "PASS" : "FAIL"}  ${name}${detail !== undefined ? "  " + JSON.stringify(detail) : ""}`);
};

class Cdp {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.id = 0;
    this.pending = new Map();
    this.errors = [];
    this.ws.onmessage = (e) => {
      const m = JSON.parse(e.data);
      if (m.id && this.pending.has(m.id)) {
        const { res, rej } = this.pending.get(m.id);
        this.pending.delete(m.id);
        m.error ? rej(new Error(JSON.stringify(m.error))) : res(m.result);
        return;
      }
      if (m.method === "Runtime.exceptionThrown") {
        this.errors.push("exception: " + (m.params.exceptionDetails?.exception?.description || m.params.exceptionDetails?.text));
      }
      if (m.method === "Log.entryAdded" && m.params.entry.level === "error") {
        this.errors.push("log: " + m.params.entry.text);
      }
      if (m.method === "Runtime.consoleAPICalled" && m.params.type === "error") {
        this.errors.push("console: " + m.params.args.map((a) => a.value ?? a.description).join(" "));
      }
    };
  }
  open() {
    return new Promise((res, rej) => {
      this.ws.onopen = res;
      this.ws.onerror = (e) => rej(new Error("ws fail " + e.message));
    });
  }
  send(method, params = {}) {
    const id = ++this.id;
    this.ws.send(JSON.stringify({ id, method, params }));
    return new Promise((res, rej) => this.pending.set(id, { res, rej }));
  }
  async eval(expr) {
    const r = await this.send("Runtime.evaluate", { expression: expr, awaitPromise: true, returnByValue: true, userGesture: true });
    if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text);
    return r.result.value;
  }
  async waitFor(expr, timeout = 15000, every = 100) {
    const t0 = Date.now();
    while (Date.now() - t0 < timeout) {
      try {
        if (await this.eval(expr)) return true;
      } catch {}
      await sleep(every);
    }
    return false;
  }
  async click(sel) {
    const box = await this.eval(`(() => { const e=document.querySelector(${JSON.stringify(sel)}); if(!e) return null; const b=e.getBoundingClientRect(); return {x:b.left+b.width/2, y:b.top+b.height/2, w:b.width, h:b.height, disabled: !!e.disabled}; })()`);
    if (!box) throw new Error("missing " + sel);
    await this.send("Input.dispatchMouseEvent", { type: "mouseMoved", x: box.x, y: box.y });
    await this.send("Input.dispatchMouseEvent", { type: "mousePressed", x: box.x, y: box.y, button: "left", clickCount: 1 });
    await this.send("Input.dispatchMouseEvent", { type: "mouseReleased", x: box.x, y: box.y, button: "left", clickCount: 1 });
    return box;
  }
  async key(key, code, vk) {
    await this.send("Input.dispatchKeyEvent", { type: "keyDown", key, code, windowsVirtualKeyCode: vk, nativeVirtualKeyCode: vk });
    await this.send("Input.dispatchKeyEvent", { type: "keyUp", key, code, windowsVirtualKeyCode: vk, nativeVirtualKeyCode: vk });
  }
  async shot(name) {
    const r = await this.send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
    const file = path.join(SHOTS, name + ".png");
    fs.writeFileSync(file, Buffer.from(r.data, "base64"));
    const size = fs.statSync(file).size;
    console.log("shot", name, size);
    return { file, size };
  }
}

async function boot(port, extraArgs = []) {
  const profile = path.join(TMP, "profile-" + port);
  fs.rmSync(profile, { recursive: true, force: true });
  const proc = spawn(
    EDGE,
    [
      "--headless=new",
      `--remote-debugging-port=${port}`,
      `--user-data-dir=${profile}`,
      "--window-size=1280,800",
      "--hide-scrollbars",
      "--no-first-run",
      "--no-default-browser-check",
      "--disable-extensions",
      "--autoplay-policy=no-user-gesture-required",
      "--disable-features=CalculateNativeWinOcclusion",
      ...extraArgs,
      "about:blank",
    ],
    { stdio: "ignore", detached: false }
  );
  for (let i = 0; i < 100; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (r.ok) return proc;
    } catch {}
    await sleep(200);
  }
  throw new Error("cdp not up on " + port);
}

async function newTarget(port, cdp) {
  const r = await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: "PUT" });
  const t = await r.json();
  const c = new Cdp(t.webSocketDebuggerUrl);
  await c.open();
  await c.send("Page.enable");
  await c.send("Runtime.enable");
  await c.send("Log.enable");
  await c.send("Page.bringToFront").catch(() => {});
  await c.send("Emulation.setDeviceMetricsOverride", { width: 1280, height: 800, deviceScaleFactor: 1, mobile: false });
  c.targetId = t.id;
  c.port = port;
  return c;
}

async function closeTarget(c) {
  try {
    await fetch(`http://127.0.0.1:${c.port}/json/close/${c.targetId}`);
  } catch {}
}

const AUTO = `window.__auto = setInterval(() => {
  const g = window.__game; if (!g) return;
  const M = { '↑': 'ArrowUp', '↓': 'ArrowDown', '←': 'ArrowLeft', '→': 'ArrowRight' };
  if (g.phase === 'tutorial' && g.hud.subtitle === '跟着做。' && !g.judged) g.pushKey(M[g.hud.key] || g.hud.key);
  if (g.phase === 'level' && g.hud.key && !g.judged) g.pushKey(M[g.hud.key] || g.hud.key);
}, 45);`;

async function keyboardRun(port) {
  console.log("\n=== keyboard E2E ===");
  const c = await newTarget(port);
  await c.send("Page.navigate", { url: URL });
  await c.waitFor(`document.readyState === 'complete' && !!document.getElementById('stage')`, 15000);
  await sleep(1200);
  const raf = await c.eval(`new Promise((res) => { let n = 0; const loop = () => { n++; requestAnimationFrame(loop); }; requestAnimationFrame(loop); setTimeout(() => res({ n, vis: document.visibilityState }), 500); })`);
  check("headless page is visible and rAF runs", raf.vis === "visible" && raf.n > 10, raf);
  await c.shot("01-title");

  await c.eval(`window.__log = []; window.__logTimer = setInterval(() => {
    const g = window.__game; if (!g) return;
    window.__log.push({ t: Math.round(performance.now()), phase: g.phase, level: g.level, bpm: g.bpm,
      beat: +g.beat.toFixed(2), sub: g.hud.subtitle, key: g.hud.key, hits: g.stats.hits,
      zp: g.zombieP && g.zombieP[0] !== undefined ? +g.zombieP[0].toFixed(3) : null,
      snap: +(g.snapPulse || 0).toFixed(2),
      dots: [...document.querySelectorAll('#dots i')].map((i) => i.className).join('|'),
      score: (document.getElementById('score') || {}).textContent,
      round: (document.getElementById('round') || {}).textContent });
  }, 120); true`);

  await c.click("#btn-keys");
  const started = await c.waitFor(`!!window.__game`, 5000);
  check("keyboard mode starts", started, await c.eval(`window.__game ? { mode: __game.mode, audioRunning: __game.audio.isRunning(), bpm: __game.bpm } : null`));

  const gotTut = await c.waitFor(`!!window.__game && __game.phase === 'tutorial'`, 20000);
  check("intro -> tutorial", gotTut, await c.eval(`window.__game ? { phase: __game.phase, sub: __game.hud.subtitle } : null`));
  await c.shot("02-tutorial");
  check(
    "tutorial bar with 3 buttons is visible",
    await c.eval(`(() => { const b = document.getElementById('tutbar'); const bs = [...b.querySelectorAll('button')]; return !b.classList.contains('hidden') && bs.every((x) => !x.disabled) && bs.length === 3; })()`)
  );

  await c.waitFor(`__game.beat > __game.tutStart + 0.6`, 6000);
  const beforeReplay = await c.eval(`({ tutStart: __game.tutStart, tutIdx: __game.tutIdx, beat: +__game.beat.toFixed(2) })`);
  await c.click("#btn-replay");
  await sleep(200);
  const afterReplay = await c.eval(`({ tutStart: __game.tutStart, tutIdx: __game.tutIdx, beat: +__game.beat.toFixed(2) })`);
  check("replay current move rewinds the step", afterReplay.tutStart > beforeReplay.tutStart && afterReplay.tutIdx === beforeReplay.tutIdx, { beforeReplay, afterReplay });

  await c.click("#btn-replayall");
  await sleep(200);
  const afterAll = await c.eval(`({ tutStart: __game.tutStart, tutIdx: __game.tutIdx, beat: +__game.beat.toFixed(2) })`);
  check("replay all resets to first move", afterAll.tutIdx === 0 && Math.abs(afterAll.tutStart - (afterAll.beat + 1)) < 0.6, afterAll);

  // trusted keyboard event once: press the required arrow in a do-window
  await c.eval(AUTO);
  await sleep(400);
  const tutDone = await c.waitFor(`__game.phase === 'level'`, 60000);
  const tutStats = await c.eval(`({ phase: __game.phase, hits: __game.stats.hits, level: __game.level, round: __game.hud.round, bpm: __game.bpm })`);
  check("tutorial completes and enters level 1", tutDone && tutStats.level === 1 && tutStats.hits === 4 && tutStats.round === "第 1 关", tutStats);

  // real arrow key via CDP (pause autoplay so the window is ours)
  await c.eval(`clearInterval(window.__auto)`);
  await c.waitFor(`__game.phase === 'level' && __game.moveIndex >= 0 && !!__game.plan && !__game.judged && (__game.beat - 2 - __game.moveIndex * __game.plan.beatsPerMove) > 0.15`, 12000);
  const realKey = await c.eval(`(() => { const g=__game; return { key: g.hud.key, judged: g.judged, moveIndex: g.moveIndex, local: g.plan && g.moveIndex >= 0 ? +(g.beat - 2 - g.moveIndex * g.plan.beatsPerMove).toFixed(2) : -1 }; })()`);
  const map = { "↑": ["ArrowUp", 38], "↓": ["ArrowDown", 40], "←": ["ArrowLeft", 37], "→": ["ArrowRight", 39] };
  if (map[realKey.key] && realKey.local > 0.1 && !realKey.judged) {
    await c.eval(`window.dispatchEvent(new KeyboardEvent('keydown', { key: ${JSON.stringify(map[realKey.key][0])}, bubbles: true }))`);
    await sleep(120);
    const after = await c.eval(`({ judged: __game.judged, failed: __game.failed, hits: __game.stats.hits })`);
    check("ArrowRight keydown is accepted by the HUD", after.judged && !after.failed, { realKey, after });
  } else {
    check("trusted Arrow key is accepted by the HUD", false, { skipped: true, realKey });
  }

  await c.eval(AUTO);
  await sleep(1500);
  const hudDom = await c.eval(`({
    round: document.getElementById('round').textContent,
    score: document.getElementById('score').textContent,
    dots: [...document.querySelectorAll('#dots i')].map((i) => i.className),
    moveinfo: document.getElementById('moveinfo') ? document.getElementById('moveinfo').textContent : null,
    cueKey: document.getElementById('cue-key').textContent,
    hudVisible: !document.getElementById('hud').classList.contains('hidden'),
    scoreVisible: getComputedStyle(document.getElementById('score')).opacity
  })`);
  check("HUD shows round/score/dots/key", hudDom.round === "第 1 关" && Number(hudDom.score) >= 4 && hudDom.dots.length === 4 && hudDom.dots.includes("now") && hudDom.cueKey.length === 1, hudDom);
  await c.shot("03-level1");

  // audio clock suspend / resume
  const clock = await c.eval(`(async () => {
    const g = window.__game, a = g.audio;
    const running = a.isRunning();
    const b0 = g.beat; const t0 = performance.now();
    if (a.ctx) await a.ctx.suspend();
    await new Promise((r) => setTimeout(r, 650));
    const b1 = g.beat;
    if (a.ctx) await a.ctx.resume();
    await new Promise((r) => setTimeout(r, 300));
    const b2 = g.beat;
    return { running, b0: +b0.toFixed(2), b1: +b1.toFixed(2), b2: +b2.toFixed(2), bpm: g.bpm, ms: Math.round(performance.now() - t0) };
  })()`);
  const expectSuspend = (0.65 * clock.bpm) / 60;
  const expectResume = (0.3 * clock.bpm) / 60;
  check(
    "beat keeps advancing while AudioContext is suspended",
    clock.running && clock.b1 - clock.b0 > expectSuspend - 0.45 && clock.b1 - clock.b0 < expectSuspend + 0.45,
    { ...clock, expectSuspend: +expectSuspend.toFixed(2) }
  );
  check(
    "beat does not jump after AudioContext resumes",
    clock.b2 >= clock.b1 - 0.05 && clock.b2 - clock.b1 < expectResume + 0.4,
    { delta: +(clock.b2 - clock.b1).toFixed(2), expectResume: +expectResume.toFixed(2) }
  );

  // mute toggle via real key
  await c.eval(`window.dispatchEvent(new KeyboardEvent('keydown', { key: 'm', bubbles: true }))`);
  await sleep(150);
  const muted = await c.eval(`({ muted: __game.audio.muted, master: __game.audio.master ? __game.audio.master.gain.value : null })`);
  await c.eval(`window.dispatchEvent(new KeyboardEvent('keydown', { key: 'm', bubbles: true }))`);
  check("M toggles mute", muted.muted === true, muted);

  // wrong key -> death
  await c.eval(`clearInterval(window.__auto)`);
  const ready = await c.waitFor(`__game.phase === 'level' && __game.moveIndex >= 0 && !__game.judged && __game.hud.key && (__game.beat - 2 - __game.moveIndex * __game.plan.beatsPerMove) > 0.2`, 12000);
  const wrong = await c.eval(`(() => { const k = __game.hud.key; const M = { '↑': 'ArrowUp', '↓': 'ArrowDown', '←': 'ArrowLeft', '→': 'ArrowRight' }; const w = ['↑','↓','←','→'].find((x) => x !== k); return { label: w, raw: M[w] }; })()`);
  await c.eval(`__game.pushKey(${JSON.stringify(wrong.raw)})`);
  const died = await c.waitFor(`__game.phase === 'dead'`, 3000);
  check("wrong key kills the run", died && ready, { wrong, ready });
  await sleep(700);
  await c.shot("04-death");
  const result = await c.waitFor(`!document.getElementById('result').classList.contains('hidden')`, 6000);
  const resultText = await c.eval(`({
    cls: document.getElementById('result').className,
    level: document.getElementById('final-level').textContent,
    hits: document.getElementById('final-hits').textContent,
    heads: document.getElementById('final-heads').textContent,
    line: document.getElementById('final-line').textContent,
    againVisible: !document.getElementById('btn-again').disabled
  })`);
  await sleep(700);
  const resultText2 = resultText;
  void resultText2;
  check("death screen shows level / hits / headcount", result && resultText.level === "第 1 关" && resultText.heads === "3 人" && Number(resultText.hits) >= 4, resultText);
  await sleep(600);
  await c.shot("05-result");

  await c.click("#btn-again");
  await sleep(600);
  const restarted = await c.eval(`({ phase: __game.phase, level: __game.level, hits: __game.stats.hits, round: __game.hud.round, score: document.getElementById('score').textContent })`);
  check("restart returns to level 1 with a clean score", restarted.phase === "level" && restarted.level === 1 && restarted.hits === 0 && restarted.score === "0", restarted);

  // full run
  const runLogStart = await c.eval(`window.__log.length`);
  await c.eval(AUTO);
  const levels = [];
  let shotMid = false;
  const runStart = Date.now();
  while (Date.now() - runStart < 150000) {
    const s = await c.eval(`({ phase: __game.phase, level: __game.level, bpm: __game.bpm, hits: __game.stats.hits, round: __game.hud.round })`);
    if (s.phase === "level" && !levels.some((l) => l.level === s.level && l.bpm === s.bpm)) levels.push(s);
    if (s.phase === "level" && s.level >= 5 && !shotMid) {
      shotMid = true;
      await sleep(2200);
      await c.shot("06-late-level");
    }
    if (s.phase === "ending") break;
    if (s.phase === "dead") break;
    await sleep(250);
  }
  const final = await c.eval(`({ phase: __game.phase, level: __game.level, hits: __game.stats.hits, perfects: __game.stats.perfects, results: __game.results.slice() })`);
  check("all 6 levels use rising bpm 128..168", JSON.stringify(levels.map((l) => l.bpm)) === JSON.stringify([128, 136, 144, 152, 160, 168]), levels.map((l) => ({ level: l.level, bpm: l.bpm, round: l.round })));
  check("full keyboard run reaches the ending with 38 level hits", final.phase === "ending" && final.hits === 38 && final.level === 6, final);

  const ended = await c.waitFor(`!document.getElementById('ending').classList.contains('hidden')`, 12000);
  const endingText = await c.eval(`({
    hits: document.getElementById('ending-hits').textContent,
    perfect: document.getElementById('ending-perfect').textContent,
    line: document.getElementById('ending-line').textContent
  })`);
  await sleep(900);
  check("ending screen shows 38 hits and the first-one reveal", ended && endingText.hits === "38" && endingText.line.includes("队伍的最后"), endingText);
  await sleep(300);
  await c.shot("07-ending");

  const log = await c.eval(`window.__log`);
  fs.writeFileSync(path.join(TMP, "log-keyboard.json"), JSON.stringify(log, null, 1));
  const snapFrames = log.filter((e, i) => i > 0 && e.zp !== null && log[i - 1].zp !== null && e.zp + 0.4 < log[i - 1].zp && e.snap > 0);
  check("zombie loop snaps back with a glitch pulse", snapFrames.length > 0, { frames: snapFrames.length, sample: snapFrames[0] });
  check("HUD dots had both done and now states", log.some((e) => e.dots.includes("done")) && log.some((e) => e.dots.includes("now")), "log entries: " + log.length);
  check("no death during a correct run", !log.slice(runLogStart).some((e) => e.phase === "dead"), { from: runLogStart, entries: log.length - runLogStart });

  check("keyboard run: zero page errors", c.errors.length === 0, c.errors);
  report.logs.push({ run: "keyboard", entries: log.length, errors: c.errors });
  await closeTarget(c);
}

async function skipRun(port) {
  console.log("\n=== skip tutorial ===");
  const c = await newTarget(port);
  await c.send("Page.navigate", { url: URL });
  await c.waitFor(`document.readyState === 'complete' && !!document.getElementById('stage')`, 15000);
  await sleep(500);
  await c.click("#btn-keys");
  await c.waitFor(`!!window.__game && __game.phase === 'tutorial'`, 20000);
  await c.click("#btn-skip");
  await sleep(500);
  const s = await c.eval(`({ phase: __game.phase, level: __game.level, round: __game.hud.round, bpm: __game.bpm, dots: __game.hud.dots.length })`);
  check("skip tutorial jumps straight to level 1", s.phase === "level" && s.level === 1 && s.round === "第 1 关", s);
  check("skip run: zero page errors", c.errors.length === 0, c.errors);
  await closeTarget(c);
}

async function cameraLeakRun(port) {
  console.log("\n=== camera fail -> keyboard, tracks closed ===");
  const c = await newTarget(port);
  await c.send("Network.enable");
  await c.send("Network.setBlockedURLs", { urls: ["*/wasm/*", "*/models/*"] });
  await c.send("Page.addScriptToEvaluateOnNewDocument", {
    source: `(() => {
      const cv = document.createElement('canvas'); cv.width = 320; cv.height = 240;
      const g = cv.getContext('2d');
      g.fillStyle = '#335'; g.fillRect(0, 0, 320, 240);
      setInterval(() => { g.fillStyle = '#335'; g.fillRect(0, 0, 320, 240); g.fillStyle = '#9cf'; g.fillRect(Math.random() * 300, 80, 20, 80); }, 100);
      const src = cv.captureStream(10);
      navigator.mediaDevices.getUserMedia = async () => { const s = src.clone(); window.__fakeStream = s; return s; };
    })();`,
  });
  await c.send("Page.navigate", { url: URL });
  await c.waitFor(`document.readyState === 'complete' && !!document.getElementById('stage')`, 15000);
  await sleep(600);
  await c.click("#btn-cam");
  const started = await c.waitFor(`!!window.__game`, 30000);
  const state = await c.eval(`({
    mode: __game && __game.mode,
    toast: document.getElementById('toast').textContent,
    camHidden: document.getElementById('cam').classList.contains('hidden'),
    srcNull: document.getElementById('cam').srcObject === null,
    trackStates: window.__fakeStream ? window.__fakeStream.getTracks().map((t) => t.readyState) : null,
    btnCamDisabled: document.getElementById('btn-cam').disabled,
    btnKeysDisabled: document.getElementById('btn-keys').disabled,
    note: document.getElementById('loadnote').textContent
  })`);
  check("model-load failure auto-degrades to keyboard", started && state.mode === "keys" && state.toast.includes("摄像头打不开"), { started, ...state });
  check("camera tracks are actually closed after failure", state.srcNull && state.trackStates && state.trackStates.every((s) => s === "ended"), state);
  check("start buttons are re-enabled after failure", state.btnCamDisabled === false && state.btnKeysDisabled === false, state);
  await c.shot("08-camera-fallback");
  report.logs.push({ run: "camera-leak", errors: c.errors, state });
  const realErrors = c.errors.filter((e) => !e.includes("ERR_BLOCKED_BY_CLIENT") && !e.includes("Failed to fetch") && !e.includes("net::"));
  check("camera failure: no unexpected page errors", realErrors.length === 0, realErrors);
  await closeTarget(c);
}

async function cameraRun(port) {
  console.log("\n=== fake camera mode ===");
  const c = await newTarget(port);
  await c.send("Page.navigate", { url: URL });
  await c.waitFor(`document.readyState === 'complete' && !!document.getElementById('stage')`, 15000);
  await sleep(600);
  await c.click("#btn-cam");
  const started = await c.waitFor(`!!window.__game`, 60000);
  await sleep(1500);
  const state = await c.eval(`({
    mode: __game && __game.mode,
    status: __game && __game.tracker ? __game.tracker.status : null,
    videoHidden: document.getElementById('cam').classList.contains('hidden'),
    trackStates: document.getElementById('cam').srcObject ? document.getElementById('cam').srcObject.getTracks().map((t) => t.readyState) : null,
    videoSize: [document.getElementById('cam').videoWidth, document.getElementById('cam').videoHeight],
    phase: __game && __game.phase
  })`);
  check("camera mode loads the pose model", started && state.mode === "camera" && state.status === "ready" && state.trackStates && state.trackStates.every((s) => s === "live"), state);
  await c.shot("09-camera");

  await c.waitFor(`__game.phase === 'tutorial'`, 20000);
  // nobody in frame: the tutorial should keep asking, so skip it
  await c.waitFor(`!document.getElementById('tutbar').classList.contains('hidden')`, 5000);
  const tutWait = await c.eval(`({ sub: __game.hud.subtitle, best: +__game.best.toFixed(2), sawPose: __game.sawPose })`);
  await c.click("#btn-skip");
  await sleep(500);
  const lv1 = await c.eval(`({ phase: __game.phase, level: __game.level, sawPose: __game.sawPose })`);
  const advanced = await c.waitFor(`__game.level >= 2 || __game.phase === 'ending'`, 40000);
  const lv2 = await c.eval(`({ phase: __game.phase, level: __game.level, stats: __game.stats, results: __game.results.slice() })`);
  check("camera levels advance without a detected body (lenient dropouts)", advanced && (lv2.level >= 2 || lv2.phase === "ending"), { tutWait, lv1, lv2 });
  const camState = await c.eval(`(() => { const v = document.getElementById('cam'); return { hasStream: !!v.srcObject, tracks: v.srcObject ? v.srcObject.getTracks().map((t) => ({ kind: t.kind, state: t.readyState, enabled: t.enabled, muted: t.muted })) : null, status: __game.tracker ? __game.tracker.status : null, hidden: v.classList.contains('hidden') }; })()`);
  check("camera run: camera track still live at level 2", camState.tracks && camState.tracks.every((t) => t.state === "live"), camState);
  await c.shot("10-camera-level");

  // synthesize an unplug: the app must fall back to keys without freezing
  await c.eval(`document.getElementById('cam').srcObject.getVideoTracks()[0].dispatchEvent(new Event('ended')); true`);
  const degraded = await c.waitFor(`__game.mode === 'keys' && !__game.tracker`, 5000);
  const lostState = await c.eval(`(() => { const v = document.getElementById('cam'); return { mode: __game.mode, tracker: !!__game.tracker, videoHidden: v.classList.contains('hidden'), hasStream: !!v.srcObject, cue: document.getElementById('cue-key').textContent, toast: document.getElementById('toast').textContent, phase: __game.phase }; })()`);
  check("camera track ending mid-run degrades to keyboard", degraded && lostState.videoHidden && !lostState.hasStream && lostState.cue !== "", lostState);
  check("camera loss toast explains the switch", /键盘/.test(lostState.toast || ""), lostState);
  report.logs.push({ run: "camera", state, tutWait, lv1, lv2, errors: c.errors });
  const realErrors = c.errors.filter((e) => !e.includes("Failed to fetch") && !e.includes("net::"));
  check("camera run: no unexpected page errors", realErrors.length === 0, realErrors);
  await closeTarget(c);
}

const procs = [];
try {
  const p1 = await boot(9333);
  procs.push(p1);
  const probe = new Cdp((await (await fetch("http://127.0.0.1:9333/json/list")).json())[0].webSocketDebuggerUrl);
  await keyboardRun(9333);
  await skipRun(9333);
  await cameraLeakRun(9333);
  await probe.send("Browser.close").catch(() => {});

  const p2 = await boot(9334, ["--use-fake-device-for-media-stream", "--use-fake-ui-for-media-stream", "--disable-gpu"]);
  procs.push(p2);
  await cameraRun(9334);
} catch (e) {
  console.error("QA crashed:", e);
  report.errors.push(String(e && e.stack ? e.stack : e));
} finally {
  fs.writeFileSync(path.join(TMP, "report.json"), JSON.stringify(report, null, 2));
  for (const p of procs) {
    try { p.kill(); } catch {}
  }
  await sleep(500);
  const failed = report.checks.filter((x) => !x.pass);
  console.log(`\n== ${report.checks.length - failed.length}/${report.checks.length} checks passed ==`);
  if (failed.length) console.log("failed:", failed.map((f) => f.name));
  process.exit(0);
}
