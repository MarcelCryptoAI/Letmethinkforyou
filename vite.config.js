// LetMeThinkForYou/crypto-platform/vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    proxy: {
      // Forward /api/... naar Python-backend op 5000
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        rewrite: (path) => path,
      },
    },
  },
});
