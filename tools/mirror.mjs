// Build a root-hosted mirror from the GitHub Pages build:
// the Pages artifact hardcodes /moonnight/, which 404s on a domain root.
import { cp, readFile, writeFile, readdir, rm } from "node:fs/promises";
import { join, extname } from "node:path";

const SRC = "dist";
const OUT = "dist-mirror";
const TEXT = new Set([".html", ".js", ".css", ".json", ".svg", ".webmanifest", ".txt"]);

await rm(OUT, { recursive: true, force: true });
await cp(SRC, OUT, {
  recursive: true,
  filter: (p) => !p.split(/[\\/]/).includes(".git"),
});

let rewritten = 0;
async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === ".git") continue;
      await walk(p);
    } else if (TEXT.has(extname(entry.name))) {
      const text = await readFile(p, "utf8");
      if (!text.includes("/moonnight/")) continue;
      await writeFile(p, text.replaceAll("/moonnight/", "/"));
      rewritten++;
    }
  }
}
await walk(OUT);
console.log(`mirror ready: ${OUT} (${rewritten} files rewritten)`);
