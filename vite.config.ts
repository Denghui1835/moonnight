import { defineConfig } from "vite";

export default defineConfig(({ mode }) => ({
  // GitHub Pages serves the repo under /moonnight/; keep dev at /
  base: mode === "production" ? "/moonnight/" : "/",
}));
