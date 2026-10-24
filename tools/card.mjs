import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// 主角卡：一句话 / 3D 人偶 / 游戏内，三段式竖版海报。
//   node tools/card.mjs
// 输出 docs/主角卡.png（1800×2700）
const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "tools", ".out");
const EDGE = process.env.EDGE_BIN || "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
fs.mkdirSync(OUT, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const dataUri = (p) => "data:image/png;base64," + fs.readFileSync(path.join(ROOT, p)).toString("base64");

const html = `<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8" />
<style>
  * { margin: 0; box-sizing: border-box; }
  body {
    width: 900px; height: 1350px; overflow: hidden;
    background: #05080a;
    color: #dfeae6;
    font-family: "PingFang SC", "Microsoft YaHei", system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  .card {
    position: relative; width: 100%; height: 100%;
    padding: 46px 54px 40px;
    background:
      radial-gradient(120% 60% at 78% 6%, rgba(120, 190, 176, 0.16), rgba(5, 8, 10, 0) 62%),
      radial-gradient(90% 50% at 12% 96%, rgba(255, 207, 150, 0.10), rgba(5, 8, 10, 0) 60%),
      #05080a;
    display: flex; flex-direction: column;
  }
  .card::after {
    content: ""; position: absolute; inset: 20px; border: 1px solid rgba(190, 220, 212, 0.14);
    pointer-events: none;
  }
  header { display: flex; justify-content: space-between; align-items: baseline;
    letter-spacing: 0.42em; font-size: 15px; color: #b9cbc5; }
  header .en { letter-spacing: 0.32em; font-size: 12px; color: #6f8a83; }

  .hero { display: flex; align-items: flex-end; gap: 30px; margin-top: 34px; }
  .hero .name { font-size: 116px; line-height: 0.92; letter-spacing: 0.06em; color: #f2f7f5; font-weight: 300; }
  .hero .meta { padding-bottom: 12px; }
  .hero .meta .en { font-size: 15px; letter-spacing: 0.5em; color: #9fb8b1; }
  .hero .meta .line { margin-top: 10px; font-size: 20px; color: #cfe0da; letter-spacing: 0.04em; }
  .moon { margin-left: auto; width: 66px; height: 66px; border-radius: 50%;
    background: radial-gradient(circle at 34% 34%, #eaf5f0, #9fc4bb 62%, rgba(120,160,152,0) 72%);
    opacity: 0.55; filter: blur(0.3px); }

  .panel { margin-top: 30px; }
  .label { display: flex; align-items: center; gap: 12px; font-size: 13px; letter-spacing: 0.34em; color: #7f9a93; }
  .label::after { content: ""; flex: 1; height: 1px; background: rgba(190, 220, 212, 0.14); }
  .quote { margin-top: 14px; font-size: 27px; line-height: 1.62; color: #e6efec; letter-spacing: 0.03em; }
  .quote em { font-style: normal; color: #ffd9a8; }

  .shot { position: relative; margin-top: 14px; overflow: hidden; border: 1px solid rgba(190, 220, 212, 0.16); }
  .shot img { display: block; width: 100%; height: 100%; object-fit: cover; }
  .shot.portrait img { height: 430px; object-position: 50% 42%; transform: scale(1.34); transform-origin: 50% 42%; }
  .shot.wide img { height: 356px; object-position: 50% 46%; }
  .shot .tag { position: absolute; left: 16px; bottom: 14px; font-size: 12px; letter-spacing: 0.3em;
    color: #cfe0da; background: rgba(3, 6, 7, 0.55); padding: 6px 10px; }
  footer { margin-top: auto; display: flex; justify-content: space-between; align-items: flex-end; padding-top: 18px;
    font-size: 12px; letter-spacing: 0.24em; color: #6f8a83; }
</style></head>
<body><div class="card">
  <header><span>月 夜 · MOONNIGHT</span><span class="en">主角卡 · CHARACTER</span></header>

  <div class="hero">
    <div class="name">她</div>
    <div class="meta">
      <div class="en">THE DANCER</div>
      <div class="line">镜中的领舞。她戴着礼帽，等一支没跳完的舞。</div>
    </div>
    <div class="moon"></div>
  </div>

  <div class="panel">
    <div class="label">01 · 一句话</div>
    <div class="quote">午夜十二点，旧剧院开门。<br />
      镜子里有人朝你伸出手——<em>跟着她跳，跳错一拍，他们就会吃掉你的脑子。</em></div>
  </div>

  <div class="panel">
    <div class="label">02 · 她的人偶</div>
    <div class="shot portrait"><img src="${dataUri("tools/.out/shots/v02-tutorial.png")}" />
      <span class="tag">程序化骨骼 · 零贴图建模</span></div>
  </div>

  <div class="panel">
    <div class="label">03 · 游戏内</div>
    <div class="shot wide"><img src="${dataUri("tools/.out/shots/v04-level5.png")}" />
      <span class="tag">第 5 关 · 队伍已经靠近</span></div>
  </div>

  <footer><span>DEAD BEAT · 最后一拍</span><span>WAYTOAGI 1024 · 南京站</span></footer>
</div></body></html>`;

const page = path.join(OUT, "card.html");
fs.writeFileSync(page, html);

class Cdp {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.id = 0;
    this.pending = new Map();
    this.ws.onmessage = (e) => {
      const m = JSON.parse(e.data);
      if (!m.id || !this.pending.has(m.id)) return;
      const { res, rej } = this.pending.get(m.id);
      this.pending.delete(m.id);
      m.error ? rej(new Error(JSON.stringify(m.error))) : res(m.result);
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
}

const PORT = 9700 + Math.floor(Math.random() * 200);
const profile = path.join(OUT, "profile-card");
fs.rmSync(profile, { recursive: true, force: true });
const proc = spawn(
  EDGE,
  [
    "--headless=new",
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${profile}`,
    "--window-size=900,1350",
    "--hide-scrollbars",
    "--no-first-run",
    "--no-default-browser-check",
    "--allow-file-access-from-files",
    "about:blank",
  ],
  { stdio: "ignore" },
);

try {
  for (let i = 0; i < 100; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      if (r.ok) break;
    } catch {}
    await sleep(200);
  }
  const target = await (await fetch(`http://127.0.0.1:${PORT}/json/new?about:blank`, { method: "PUT" })).json();
  const c = new Cdp(target.webSocketDebuggerUrl);
  await c.open();
  await c.send("Page.enable");
  await c.send("Emulation.setDeviceMetricsOverride", { width: 900, height: 1350, deviceScaleFactor: 2, mobile: false });
  await c.send("Page.navigate", { url: "file:///" + page.replaceAll("\\", "/") });
  await sleep(1200);
  const shot = await c.send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
  const file = path.join(ROOT, "docs", "主角卡.png");
  fs.writeFileSync(file, Buffer.from(shot.data, "base64"));
  console.log("card", path.relative(ROOT, file), fs.statSync(file).size);
} finally {
  proc.kill();
}
