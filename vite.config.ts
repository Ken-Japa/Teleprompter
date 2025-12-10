import { defineConfig, mergeConfig } from "vite";
import { defineConfig as defineVitestConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

const viteConfig = defineConfig({
 plugins: [
  react(),
  VitePWA({
   registerType: "prompt",
   injectRegister: "script",
   includeAssets: ["assets/favicon.ico", "assets/apple-touch-icon.png", "assets/favicon.svg"],
   manifest: {
    name: "PromptNinja",
    short_name: "PromptNinja",
    description: "Transforme seu celular em um controle remoto profissional para seus roteiros.",
    theme_color: "#0f172a",
    background_color: "#0f172a",
    display: "standalone",
    start_url: "/",
    orientation: "portrait",
    icons: [
     {
      src: "assets/web-app-manifest-192x192.png",
      sizes: "192x192",
      type: "image/png",
      purpose: "any maskable",
     },
     {
      src: "assets/web-app-manifest-512x512.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "any maskable",
     },
    ],
   },
   workbox: {
    maximumFileSizeToCacheInBytes: 3000000,
    globPatterns: ["**/*.{js,css,html,svg,woff2}"],
    ignoreURLParametersMatching: [/^__WB_REVISION__$/],
   },
  }),
 ],
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
  pool: "forks",
 },
});

export default mergeConfig(viteConfig, vitestConfig);
