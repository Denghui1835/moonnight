import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// 视觉自测：截几张关键画面，不做断言。
//   node tools/shot.mjs
// QA_URL / EDGE_BIN / QA_OUT 可覆盖。
const TMP = path.resolve(process.env.QA_OUT || path.join(path.dirname(fileURLToPath(import.meta.url)), ".out"));
const SHOTS = path.join(TMP, "shots");
const EDGE = process.env.EDGE_BIN || "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const URL = process.env.QA_URL || "http://localhost:5173/";
fs.mkdirSync(SHOTS, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

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
    const box = await this.eval(`(() => { const e=document.querySelector(${JSON.stringify(sel)}); if(!e) return null; const b=e.getBoundingClientRect(); return {x:b.left+b.width/2, y:b.top+b.height/2}; })()`);
    if (!box) throw new Error("missing " + sel);
    for (const type of ["mouseMoved", "mousePressed", "mouseReleased"]) {
      await this.send("Input.dispatchMouseEvent", {
        type,
        x: box.x,
        y: box.y,
        ...(type === "mouseMoved" ? {} : { button: "left", clickCount: 1 }),
      });
    }
  }
  async shot(name) {
    const r = await this.send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
    const file = path.join(SHOTS, name + ".png");
    fs.writeFileSync(file, Buffer.from(r.data, "base64"));
    console.log("shot", name, fs.statSync(file).size);
  }
}

async function boot(port) {
  const profile = path.join(TMP, "profile-shot" + port);
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
      // 国内镜像直连可达，走系统代理反而被掐断：QA_DIRECT=1 时绕开代理
      ...(process.env.QA_DIRECT ? ["--no-proxy-server"] : []),
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

const PORT = 9400 + Math.floor(Math.random() * 300);
const proc = await boot(PORT);
const r = await fetch(`http://127.0.0.1:${PORT}/json/new?about:blank`, { method: "PUT" });
const t = await r.json();
const c = new Cdp(t.webSocketDebuggerUrl);
await c.open();
await c.send("Page.enable");
await c.send("Runtime.enable");
await c.send("Log.enable");
await c.send("Emulation.setDeviceMetricsOverride", { width: 1280, height: 800, deviceScaleFactor: 1, mobile: false });

try {
  if (process.env.QA_FALLBACK) {
    await c.send("Page.addScriptToEvaluateOnNewDocument", {
      source: `(() => {
        const orig = HTMLCanvasElement.prototype.getContext;
        HTMLCanvasElement.prototype.getContext = function (type, ...args) {
          if (/webgl/i.test(String(type))) return null;
          return orig.call(this, type, ...args);
        };
      })();`,
    });
  }
  await c.send("Page.navigate", { url: URL });
  await c.waitFor(`document.readyState === 'complete' && !!document.getElementById('stage3d')`, 15000);
  await sleep(1500);
  if (process.env.QA_FALLBACK) {
    const state = await c.eval(`({
      stage3d: getComputedStyle(document.getElementById('stage3d')).display,
      stage2d: getComputedStyle(document.getElementById('stage')).display,
      fallback: document.getElementById('stage').classList.contains('offscreen'),
    })`);
    console.log("fallback state", JSON.stringify(state));
    await c.click("#btn-keys");
    await c.waitFor(`!!window.__game`, 5000);
    await c.waitFor(`__game.phase === 'tutorial'`, 20000);
    await sleep(2500);
    await c.shot("f01-tutorial-2d");
    console.log("page errors", JSON.stringify(c.errors));
    process.exit(0);
  }
  await c.shot("v01-title");

  await c.click("#btn-keys");
  await c.waitFor(`!!window.__game`, 5000);
  await c.waitFor(`__game.phase === 'tutorial'`, 20000);
  await sleep(2600);
  await c.shot("v02-tutorial");

  await c.eval(`window.__auto = setInterval(() => {
    const g = window.__game; if (!g) return;
    const M = { '↑': 'ArrowUp', '↓': 'ArrowDown', '←': 'ArrowLeft', '→': 'ArrowRight' };
    if (g.phase === 'tutorial' && g.hud.subtitle === '跟着做。' && !g.judged) g.pushKey(M[g.hud.key] || g.hud.key);
    if (g.phase === 'level' && g.hud.key && !g.judged) g.pushKey(M[g.hud.key] || g.hud.key);
  }, 45); true`);

  await c.waitFor(`__game.phase === 'level'`, 25000);
  await sleep(3200);
  await c.shot("v03-level1");

  await c.eval(`__game.startLevel(5); true`);
  await sleep(4200);
  await c.shot("v04-level5");

  await c.eval(`__game.startLevel(6); true`);
  await sleep(3000);
  await c.shot("v05-level6");

  await c.eval(`clearInterval(window.__auto); __game.toEnding(); true`);
  await sleep(2600);
  await c.shot("v06-ending-a");
  await sleep(2200);
  await c.shot("v07-ending-b");

  await c.eval(`__game.die(); true`);
  await sleep(600);
  await c.shot("v08-death");

  const info = await c.eval(`({ phase: __game.phase, endingT: +__game.endingT.toFixed(2), errors: 0 })`);
  console.log("state", JSON.stringify(info));
  console.log("page errors", JSON.stringify(c.errors));
} finally {
  proc.kill();
}
