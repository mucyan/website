import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { sites } from "./build/sites-vite-plugin";

const isCodexSeatbeltSandbox = process.env.CODEX_SANDBOX === "seatbelt";

export default defineConfig({
  plugins: [vue(), sites()],
  server: isCodexSeatbeltSandbox
    ? { watch: { useFsEvents: false, usePolling: true } }
    : undefined,
  build: {
    outDir: "dist/client",
    emptyOutDir: true,
    sourcemap: false,
  },
});
