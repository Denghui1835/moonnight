// 重新生成两张二维码：docs/screenshots/qr-moonnight-{mirror,pages}.png
// 镜像地址必须指向当前账号能发布的那个站，改了 dist 就重跑 `npm run qr`。
import QRCode from "qrcode";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "docs", "screenshots");

const targets = {
  "qr-moonnight-mirror.png": process.env.QA_MIRROR_URL || "https://moonnight-mirror-rvzkngbzcr9.qoder.website/",
  "qr-moonnight-pages.png": "https://denghui1835.github.io/moonnight/",
};

for (const [file, url] of Object.entries(targets)) {
  await QRCode.toFile(path.join(OUT, file), url, { width: 720, margin: 4, errorCorrectionLevel: "M", color: { dark: "#0B0D10ff", light: "#F2EFE6ff" } });
  console.log(file, "->", url);
}
