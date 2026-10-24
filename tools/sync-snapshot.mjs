// Incremental snapshot sync for D:\MoonNight.
// Explicitly skips dependencies, test scratch/cache and reproducible output.
import { readdir, stat, mkdir, copyFile, chmod, rm } from "node:fs/promises";
import { join, relative, extname } from "node:path";

const SRC = process.cwd();
const DEST = process.argv[2] || "D:\\MoonNight";
// tools/.out 整个目录都是验收产物（截图、report.json、CDP profile、临时下载的站点副本），
// 能从 `npm run qa` 重新生成，不进快照
const SKIP_EXT = new Set([".log"]);

const norm = (p) => p.replaceAll("\\", "/");
const BANNED_SEGMENTS = ["node_modules", "dist-mirror", ".edgecheck", ".out", "profile-"];
// 按路径分段匹配：`tools/.out/mirror2/profile-9333/…` 这种嵌套目录也要拦掉
const skipDir = (rel) => rel.split("/").some((seg) => BANNED_SEGMENTS.some((d) => (d.endsWith("-") ? seg.startsWith(d) : seg === d)));

async function walk(srcDir, destDir, rel, stats) {
  for (const entry of await readdir(srcDir, { withFileTypes: true })) {
    const relPath = rel ? `${rel}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      if (skipDir(relPath)) continue;
      await walk(join(srcDir, entry.name), join(destDir, entry.name), relPath, stats);
      continue;
    }
    if (!entry.isFile() || SKIP_EXT.has(extname(entry.name))) continue;
    const from = join(srcDir, entry.name);
    const to = join(destDir, entry.name);
    const s = await stat(from);
    let copy = true;
    try {
      const d = await stat(to);
      copy = d.size !== s.size || d.mtimeMs < s.mtimeMs;
    } catch {}
    if (!copy) {
      stats.skipped++;
      continue;
    }
    await mkdir(destDir, { recursive: true });
    try {
      await copyFile(from, to);
    } catch (e) {
      // git object files are read-only on Windows; clear the bit and retry once
      if (e.code !== "EPERM") throw e;
      await chmod(to, 0o666);
      await copyFile(from, to);
    }
    stats.copied++;
    stats.bytes += s.size;
  }
}

async function sizeOf(dir) {
  let bytes = 0;
  let files = 0;
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) {
      const sub = await sizeOf(p);
      bytes += sub.bytes;
      files += sub.files;
    } else if (entry.isFile()) {
      bytes += (await stat(p)).size;
      files++;
    }
  }
  return { bytes, files };
}

// Remove excluded leftovers (earlier full-tree copies) so the snapshot matches the rule.
async function prune(dir) {
  const removed = { dirs: [], logs: 0, locked: 0 };
  for (const name of ["node_modules", "dist-mirror", join("tools", ".out"), join("tools", ".edgecheck")]) {
    const p = join(dir, name);
    try {
      const s = await stat(p);
      if (s.isDirectory()) {
        const sub = await sizeOf(p);
        await rm(p, { recursive: true, force: true });
        removed.dirs.push(`${name} (${(sub.bytes / 1024 / 1024).toFixed(1)} MB)`);
      }
    } catch {
      removed.locked++;
    }
  }
  async function dropLogs(d) {
    for (const entry of await readdir(d, { withFileTypes: true })) {
      const p = join(d, entry.name);
      if (entry.isDirectory()) await dropLogs(p);
      else if (entry.isFile() && entry.name.endsWith(".log")) {
        try {
          await rm(p, { force: true });
          removed.logs++;
        } catch {
          removed.locked++;
        }
      }
    }
  }
  await dropLogs(dir);
  return removed;
}

const stats = { copied: 0, skipped: 0, bytes: 0 };
await walk(SRC, DEST, "", stats);
const removed = await prune(DEST);
const total = await sizeOf(DEST);
const mb = (n) => (n / 1024 / 1024).toFixed(1);
console.log(`copied ${stats.copied} files (${mb(stats.bytes)} MB), skipped ${stats.skipped} unchanged`);
console.log(`pruned: ${removed.dirs.join(", ") || "nothing"}; ${removed.logs} *.log removed${removed.locked ? `, ${removed.locked} locked` : ""}`);
console.log(`snapshot ${norm(DEST)}: ${mb(total.bytes)} MB, ${total.files} files`);
