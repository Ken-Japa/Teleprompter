import puppeteer from 'puppeteer';
import puppeteerCore from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ROUTES_CONFIG } from '../src/config/routes.js';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.join(__dirname, '..', 'dist');
const PORT = 4173;
const BASE_URL = `http://localhost:${PORT}`;

const isVercel = process.env.VERCEL === '1';

async function prerender() {
    console.log('🚀 Starting Prerender Process...');
    console.log(`Environment: ${isVercel ? 'Vercel (CI)' : 'Local'}`);

    // 1. Start static server (using vite preview)
    console.log('📦 Starting preview server...');
    const server = spawn('npm', ['run', 'preview', '--', '--port', PORT.toString()], {
        stdio: 'pipe',
        cwd: path.join(__dirname, '..'),
        shell: true
    });

    // Wait for server to be ready
    await new Promise((resolve) => {
        server.stdout.on('data', (data) => {
            if (data.toString().includes('Local:')) {
                resolve();
            }
        });
        // Fallback timeout
        setTimeout(resolve, 5000);
    });
    console.log(`✅ Server running at ${BASE_URL}`);

    // 2. Launch Puppeteer
    let browser;
    if (isVercel) {
        console.log('☁️ Launching Vercel Chromium...');
        browser = await puppeteerCore.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath(),
            headless: chromium.headless,
        });
    } else {
        console.log('💻 Launching Local Chrome...');
        browser = await puppeteer.launch({
            headless: "new"
        });
    }

    const page = await browser.newPage();

    // 3. Collect routes
    const routes = ['/', '/en', '/es'];
    Object.values(ROUTES_CONFIG).forEach(config => {
        Object.values(config.paths).forEach(p => routes.push(p));
    });

    // Add Script Categories manually if needed, or if they are in routes
    // (Assuming SEO_SCRIPTS_* are in ROUTES_CONFIG, which they are)

    console.log(`📄 Found ${routes.length} routes to prerender.`);

    // 4. Snapshot each route
    for (const route of routes) {
        const fullUrl = `${BASE_URL}${route}`;
        const outputPath = path.join(DIST_DIR, route.startsWith('/') ? route.slice(1) : route, 'index.html');
        const outputDir = path.dirname(outputPath);

        console.log(`📸 Prerendering: ${route}`);

        try {
            await page.goto(fullUrl, { waitUntil: 'networkidle0' });

            // Wait for a specific element to ensure hydration (e.g., Footer or Main)
            await page.waitForSelector('footer', { timeout: 10000 }).catch(() => { });

            const html = await page.content();

            // Ensure directory exists
            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir, { recursive: true });
            }

            fs.writeFileSync(outputPath, html);
        } catch (e) {
            console.error(`❌ Failed to prerender ${route}:`, e.message);
        }
    }

    // 5. Cleanup
    await browser.close();
    server.kill();
    console.log('✨ Prerender finished successfully!');
    process.exit(0);
}

prerender();
