import { defineConfig, mergeConfig } from "vite";
import { defineConfig as defineVitestConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

const viteConfig = defineConfig({
 plugins: [react()],
 build: {
  rollupOptions: {
   output: {
    manualChunks: {
     vendor: ["react", "react-dom"],
     ui: ["@fontsource/inter", "@fontsource/outfit", "tailwind-styled-components"],
    },
   },
  },
  minify: "terser",
  terserOptions: {
   compress: {
    drop_console: true,
    drop_debugger: true,
   },
  },
 },
});

const vitestConfig = defineVitestConfig({
 test: {
  globals: true,
  environment: "jsdom",
  setupFiles: "./src/setupTests.ts",
 },
});

export default mergeConfig(viteConfig, vitestConfig);
