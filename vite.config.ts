import { defineConfig, mergeConfig } from "vite";
import { defineConfig as defineVitestConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

const viteConfig = defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: "autoUpdate",
            injectRegister: "script-defer",
            includeAssets: ["assets/favicon.ico", "assets/apple-touch-icon.png"],
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
                globPatterns: ["**/*.{js,css,html,svg,woff2,png,jpg,jpeg,webp}"],
                ignoreURLParametersMatching: [/^__WB_REVISION__$/],
                // Runtime caching strategies for better offline support
                runtimeCaching: [
                    {
                        // Cache Google Fonts stylesheets
                        urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
                        handler: "CacheFirst",
                        options: {
                            cacheName: "google-fonts-stylesheets",
                            expiration: {
                                maxEntries: 10,
                                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
                            },
                            cacheableResponse: {
                                statuses: [0, 200],
                            },
                        },
                    },
                    {
                        // Cache Google Fonts webfont files
                        urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
                        handler: "CacheFirst",
                        options: {
                            cacheName: "google-fonts-webfonts",
                            expiration: {
                                maxEntries: 30,
                                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
                            },
                            cacheableResponse: {
                                statuses: [0, 200],
                            },
                        },
                    },
                    {
                        // Cache images with CacheFirst strategy
                        urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/i,
                        handler: "CacheFirst",
                        options: {
                            cacheName: "images-cache",
                            expiration: {
                                maxEntries: 60,
                                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
                            },
                            cacheableResponse: {
                                statuses: [0, 200],
                            },
                        },
                    },
                ],
            },
        }),
    ],
    build: {
        sourcemap: true,
        cssCodeSplit: true, // Enable CSS code splitting
        rollupOptions: {
            output: {
                // Let Vite/Rollup handle chunking automatically for better granular performance
                // manualChunks removed to prevent forcing huge blocking vendor files
            },
        },
        minify: "terser",
        terserOptions: {
            compress: {
                drop_console: false, // Enabled for GA4 debugging
                drop_debugger: true,
            },
        },
        modulePreload: {
            polyfill: true, // Ensure module preload works on all browsers
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
