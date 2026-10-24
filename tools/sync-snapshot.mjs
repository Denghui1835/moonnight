// Incremental snapshot sync for D:\MoonNight.
// Explicitly skips dependencies, test scratch/cache and reproducible output.
import { readdir, stat, mkdir, copyFile, chmod } from "node:fs/promises";
import { join, relative, extname } from "node:path";

const SRC = process.cwd();
const DEST = process.argv[2] || "D:\\MoonNight";
const SKIP_DIRS = ["node_modules", "dist-mirror", "tools/.out/profile-", "tools/.edgecheck"];
const SKIP_EXT = new Set([".log"]);

const norm = (p) => p.replaceAll("\\", "/");
const skipDir = (rel) => SKIP_DIRS.some((d) => (d.endsWith("-") ? rel.startsWith(d) : rel === d || rel.startsWith(d + "/")));

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

const stats = { copied: 0, skipped: 0, bytes: 0 };
await walk(SRC, DEST, "", stats);
const total = await sizeOf(DEST);
const mb = (n) => (n / 1024 / 1024).toFixed(1);
console.log(`copied ${stats.copied} files (${mb(stats.bytes)} MB), skipped ${stats.skipped} unchanged`);
console.log(`snapshot ${norm(DEST)}: ${mb(total.bytes)} MB, ${total.files} files`);
