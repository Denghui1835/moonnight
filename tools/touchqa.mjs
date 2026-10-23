import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Touch-control E2E: emulates a 375x812 phone and taps the on-screen pad.
//   node tools/touchqa.mjs
const TMP = process.env.QA_OUT || path.join(path.dirname(fileURLToPath(import.meta.url)), ".out");
const SHOTS = path.join(TMP, "shots");
const EDGE = process.env.EDGE_BIN || "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const URL = process.env.QA_URL || "http://localhost:5173/";
fs.mkdirSync(SHOTS, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const report = { started: new Date().toISOString(), checks: [] };
const check = (name, pass, detail) => {
  report.checks.push({ name, pass: !!pass, detail });
  console.log(`${pass ? "PASS" : "FAIL"}  ${name}${detail !== undefined ? "  " + JSON.stringify(detail) : ""}`);
};

class Cdp {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.id = 0;
    this.pending = new Map();
    this.ws.onmessage = (e) => {
      const m = JSON.parse(e.data);
      if (m.id && this.pending.has(m.id)) {
        const { res, rej } = this.pending.get(m.id);
        this.pending.delete(m.id);
        m.error ? rej(new Error(JSON.stringify(m.error))) : res(m.result);
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
    const box = await this.eval(`(() => { const e=document.querySelector(${JSON.stringify(sel)}); if(!e) return null; const b=e.getBoundingClientRect(); return {x:b.left+b.width/2, y:b.top+b.height/2, w:b.width, h:b.height}; })()`);
    if (!box) throw new Error("missing " + sel);
    await this.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: box.x, y: box.y }] });
    await sleep(40);
    await this.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    return box;
  }
  async shot(name) {
    const r = await this.send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
    const file = path.join(SHOTS, name + ".png");
    fs.writeFileSync(file, Buffer.from(r.data, "base64"));
    console.log("shot", name, fs.statSync(file).size);
    return file;
  }
}

async function boot(port) {
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
      "about:blank",
    ],
    { stdio: "ignore", detached: false }
  );
  for (let i = 0; i < 200; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (r.ok) return proc;
    } catch {}
    await sleep(200);
  }
  throw new Error("cdp not up on " + port);
}

async function newTarget(port, mobile) {
  const r = await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: "PUT" });
  const t = await r.json();
  const c = new Cdp(t.webSocketDebuggerUrl);
  await c.open();
  await c.send("Page.enable");
  await c.send("Runtime.enable");
  await c.send("Page.bringToFront").catch(() => {});
  await c.send("Emulation.setDeviceMetricsOverride", {
    width: mobile ? 375 : 1280,
    height: mobile ? 812 : 800,
    deviceScaleFactor: mobile ? 3 : 1,
    mobile: !!mobile,
  });
  if (mobile) {
    await c.send("Emulation.setTouchEmulationEnabled", { enabled: true, maxTouchPoints: 5 });
    await c.send("Emulation.setEmitTouchEventsForMouse", { enabled: true, configuration: "mobile" }).catch(() => {});
  }
  c.targetId = t.id;
  c.port = port;
  return c;
}

const selBox = (sel) => `(() => { const e=document.querySelector(${JSON.stringify(sel)}); if(!e) return null; const b=e.getBoundingClientRect(); return {x:+b.left.toFixed(1), y:+b.top.toFixed(1), w:+b.width.toFixed(1), h:+b.height.toFixed(1), display:getComputedStyle(e).display}; })()`;

async function mobileRun(port) {
  console.log("\n=== phone / touch ===");
  const c = await newTarget(port, true);
  await c.send("Page.navigate", { url: URL });
  await c.waitFor(`document.readyState === 'complete' && !!document.getElementById('btn-keys')`, 20000);
  await sleep(1200);

  const mq = await c.eval(`({ coarse: matchMedia('(pointer: coarse)').matches, noHover: matchMedia('(hover: none)').matches, vw: innerWidth, vh: innerHeight })`);
  check("phone emulation reports coarse pointer", mq.coarse && mq.noHover, mq);
  check("title has no horizontal overflow", await c.eval(`document.documentElement.scrollWidth <= innerWidth + 1`));
  await c.shot("20-phone-title");

  await c.click("#btn-keys");
  const started = await c.waitFor(`!!window.__game`, 5000);
  check("phone starts keyboard-mode session", started);

  const tut = await c.waitFor(`__game.phase === 'tutorial'`, 25000);
  check("phone reaches tutorial", tut, await c.eval(`({ phase: __game.phase, sub: __game.hud.subtitle })`));
  await sleep(400);

  const pad = await c.eval(selBox("#touchpad"));
  check("touch pad is visible on phone", !!pad && pad.display === "flex" && pad.w > 200, pad);
  const buttons = await c.eval(`[...document.querySelectorAll('#touchpad button')].map((b) => { const r=b.getBoundingClientRect(); return { key:b.dataset.key, x:+r.left.toFixed(1), y:+r.top.toFixed(1), w:+r.width.toFixed(1), h:+r.height.toFixed(1) }; })`);
  check("touch pad has 4 reachable buttons", buttons.length === 4 && buttons.every((b) => b.h >= 44 && b.w >= 44), buttons);
  const bar = await c.eval(selBox("#tutbar"));
  const cue = await c.eval(selBox("#cue"));
  const noOverlap = (a, b) => !a || !b || a.y + a.h <= b.y + 0.5 || b.y + b.h <= a.y + 0.5;
  check("pad does not overlap tutorial bar", noOverlap(pad, bar), { pad, bar });
  check("pad does not overlap move cue", noOverlap(pad, cue) || !cue || cue.w === 0, { pad, cue });
  check("pad stays inside viewport", pad && pad.x >= 0 && pad.y + pad.h <= 812.5 && pad.x + pad.w <= 375.5, pad);
  await c.shot("21-phone-tutorial");

  // tap the indicated key inside a do-window
  const ready = await c.waitFor(`__game.phase === 'tutorial' && __game.hud.subtitle === '跟着做。' && !__game.judged`, 20000);
  const wanted = await c.eval(`__game.hud.key`);
  const hitsBefore = await c.eval(`__game.stats.hits`);
  const box = await c.eval(selBox(`#touchpad button[data-key="${wanted}"]`));
  check("do-window shows the expected move", ready && !!box, { wanted, box });

  await c.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: box.x + box.w / 2, y: box.y + box.h / 2 }] });
  await sleep(60);
  const active = await c.eval(`document.querySelector('#touchpad button[data-key="${wanted}"]').classList.contains('on')`);
  await c.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  await sleep(250);
  const tapped = await c.eval(`({ hits: __game.stats.hits, judged: __game.judged, failed: __game.failed, score: document.getElementById('score').textContent })`);
  const tutScored = tapped.hits === hitsBefore + 1 || (await c.waitFor(`__game.stats.hits === ${hitsBefore + 1}`, 4000));
  check("pad button lights up while pressed", active);
  check("tap is judged as a hit", tapped.judged && !tapped.failed && tutScored, { hitsBefore, tapped, tutScored });

  // finish the tutorial through the same pad listeners, then hold off for the level check
  await c.eval(`window.__holdTap = false; window.__autoTap = setInterval(() => {
    const g = window.__game; if (!g || window.__holdTap) return;
    const due = (g.phase === 'tutorial' && g.hud.subtitle === '跟着做。' && !g.judged)
      || (g.phase === 'level' && !!g.hud.key && !g.judged);
    if (!due) return;
    const b = document.querySelector('#touchpad button[data-key="' + g.hud.key + '"]');
    if (!b) return;
    b.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, cancelable: true, pointerType: 'touch' }));
    setTimeout(() => b.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, cancelable: true, pointerType: 'touch' })), 30);
  }, 60); true`);
  await c.waitFor(`__game.phase === 'level'`, 60000);
  await c.eval(`window.__holdTap = true`);
  const lvl = await c.eval(`({ phase: __game.phase, level: __game.level })`);
  check("phone reaches level 1 through tapping", lvl.phase === "level" && lvl.level === 1, lvl);
  const padLvl = await c.eval(selBox("#touchpad"));
  const hudBottom = await c.eval(selBox("#hud .bottom"));
  check("pad still visible in level and clear of HUD", padLvl.display === "flex" && noOverlap(padLvl, hudBottom), { padLvl, hudBottom });

  // level tap
  const lvlReady = await c.waitFor(`__game.phase === 'level' && !!__game.hud.key && !__game.judged && (() => { const l = __game.beat - 2 - __game.moveIndex * __game.plan.beatsPerMove; return l > 0.3 && l < 0.9; })()`, 15000);
  const lvlKey = await c.eval(`__game.hud.key`);
  const lvlHits = await c.eval(`__game.stats.hits`);
  const b2 = await c.eval(selBox(`#touchpad button[data-key="${lvlKey}"]`));
  await c.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: b2.x + b2.w / 2, y: b2.y + b2.h / 2 }] });
  await sleep(40);
  await c.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  await sleep(350);
  const lvlTap = await c.eval(`({ phase: __game.phase, hits: __game.stats.hits, judged: __game.judged, failed: __game.failed, best: __game.best, local: +(__game.beat - 2 - __game.moveIndex * __game.plan.beatsPerMove).toFixed(2) })`);
  const lvlScored = lvlTap.hits === lvlHits + 1 || (await c.waitFor(`__game.stats.hits === ${lvlHits + 1}`, 5000));
  check("level tap judges the move", lvlReady && lvlTap.judged && !lvlTap.failed && lvlTap.best === 1 && lvlScored, { lvlKey, lvlHits, lvlTap, lvlScored });
  await c.shot("22-phone-level");
  return c;
}

async function desktopRun(port) {
  console.log("\n=== desktop unchanged ===");
  const c = await newTarget(port, false);
  await c.send("Page.navigate", { url: URL });
  await c.waitFor(`document.readyState === 'complete' && !!document.getElementById('btn-keys')`, 20000);
  await sleep(1000);
  const pad = await c.eval(selBox("#touchpad"));
  check("pad stays hidden on desktop", !pad || pad.display === "none", pad);
  check("desktop has no horizontal overflow", await c.eval(`document.documentElement.scrollWidth <= innerWidth + 1`));
  return c;
}

// Production builds do not expose __game; this run proves the live bundle by DOM only.
async function liveRun(port) {
  console.log("\n=== live site (DOM only) ===");
  const c = await newTarget(port, true);
  await c.send("Page.navigate", { url: URL });
  const loaded = await c.waitFor(`document.readyState === 'complete' && !!document.getElementById('btn-keys')`, 30000);
  check("live title loads", loaded);
  await sleep(1200);
  check("live: pad hidden on the title", await c.eval(`document.getElementById('hud').classList.contains('hidden') && getComputedStyle(document.getElementById('hud')).opacity === '0'`));

  await c.click("#btn-keys");
  const tut = await c.waitFor(`!document.getElementById('tutbar').classList.contains('hidden')`, 30000);
  check("live: tutorial bar appears", tut);
  check("live: pad is visible and has four keys", await c.eval(`getComputedStyle(document.getElementById('touchpad')).display === 'flex' && document.querySelectorAll('#touchpad button').length === 4`));
  await c.shot("30-live-phone-tutorial");

  const tapUntil = async (target) => {
    const t0 = Date.now();
    while (Date.now() - t0 < 60000) {
      const st = await c.eval(`(() => {
        const k = document.getElementById('cue-key');
        return { key: k && !k.classList.contains('hidden') ? k.textContent.trim() : '',
          round: document.getElementById('round').textContent,
          score: Number(document.getElementById('score').textContent) || 0 };
      })()`);
      if (st.key) {
        const box = await c.eval(selBox(`#touchpad button[data-key="${st.key}"]`));
        if (box && box.w > 0) {
          await c.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: box.x + box.w / 2, y: box.y + box.h / 2 }] });
          await c.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
        }
      }
      if (st.round === "第 1 关" && st.score >= target) return st;
      await sleep(80);
    }
    return null;
  };

  const tutDone = await tapUntil(4);
  check("live: tapping completes the tutorial", !!tutDone, tutDone);
  const lvl = await tapUntil(5);
  check("live: tapping scores in level 1", !!lvl, lvl);
  check("live: pad stays on screen in level", await c.eval(`getComputedStyle(document.getElementById('touchpad')).display === 'flex'`));
  await c.shot("31-live-phone-level");
  return c;
}

const port = 9333 + (Number(process.env.QA_PORT_OFFSET) || 0);
const proc = await boot(port);
const live = !!process.env.QA_LIVE;
let mobileCdp;
let desktopCdp;
try {
  if (live) {
    mobileCdp = await liveRun(port);
  } else {
    mobileCdp = await mobileRun(port);
    desktopCdp = await desktopRun(port);
  }
} catch (e) {
  console.error("TOUCH QA crashed:", e);
  report.crashed = String(e);
} finally {
  for (const c of [mobileCdp, desktopCdp]) {
    if (c) await fetch(`http://127.0.0.1:${port}/json/close/${c.targetId}`).catch(() => {});
  }
  proc.kill();
}
const passed = report.checks.filter((x) => x.pass).length;
console.log(`\n== touch ${passed}/${report.checks.length} checks passed ==`);
fs.writeFileSync(path.join(TMP, "touch-report.json"), JSON.stringify(report, null, 2));
process.exit(report.crashed || passed !== report.checks.length ? 1 : 0);
