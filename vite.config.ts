import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  build: {
    outDir: "/var/www/html/tma",
  },
  plugins: [react()],
  css: {
    postcss: "./postcss.config.cjs",
  },
  server: {
    allowedHosts: [
      "be.specialized-air.services",
      "tma.specialized-air.services",
      "localhost",
      "127.0.0.1",
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
