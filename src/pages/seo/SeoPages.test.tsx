

import { render, act } from '@testing-library/react';
import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { ROUTES_CONFIG } from '../../config/routes';
import type { RouteConfig } from '../../config/routes.d';
import { SeoPages, SeoRouteKey, seoKeyMap } from '../../config/seoRoutes';
import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';
import { useTranslation } from '../../hooks/useTranslation';
import type { Language } from '../../locales';

// Mock the useTranslation hook
vi.mock('../../hooks/useTranslation', () => ({
    useTranslation: vi.fn(() => ({
        t: (key: string) => key,
        lang: 'pt',
        setLang: () => { },
    })),
}));

const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
const sitemap = fs.readFileSync(sitemapPath, 'utf8');

const contentModules = import.meta.glob('./content/**/*.tsx');

describe('SEO Pages', () => {
    it('should have a sitemap with all the routes and correct attributes', () => {
        const dom = new JSDOM(sitemap, { contentType: 'application/xml' });
        const urls = Array.from(dom.window.document.querySelectorAll('url'));

        Object.values(ROUTES_CONFIG).forEach((route: RouteConfig) => {
            Object.entries(route.paths).forEach(([, routePath]) => {
                const urlElement = urls.find(u => u.querySelector('loc')?.textContent === `https://promptninja.solutionkit.com.br${routePath}`);
                expect(urlElement).not.toBeUndefined();

                const changefreq = urlElement?.querySelector('changefreq')?.textContent;
                expect(changefreq).toBe(route.changefreq);

                const priority = urlElement?.querySelector('priority')?.textContent;
                expect(priority).toBe(route.priority);

                const hreflangs = Array.from(urlElement!.querySelectorAll('xhtml\\:link'));
                expect(hreflangs.length).toBe(Object.keys(route.paths).length);
            });
        });
    });

    const contentDirectoryMap: Record<SeoRouteKey, string> = {
        SEO_GRATIS: "teleprompter-online-gratis",
        SEO_TUTORIAL: "como-usar-teleprompter",
        SEO_MELHOR_APP: "melhor-app-teleprompter",
        SEO_ALTERNATIVAS: "alternativas-teleprompter-concorrente",
        SEO_YOUTUBERS: "teleprompter-para-youtubers",
        SEO_TRAVANDO: "teleprompter-travando-solucao",
        SEO_DIY: "teleprompter-caseiro-diy",
        SEO_ORATORIA: "oratoria-video",
        SEO_DECORAR: "como-decorar-texto",
        SEO_WEBRTC: "webrtc-latency",
        SEO_PC_WINDOWS: "teleprompter-pc-windows",
        SEO_ZOOM: "teleprompter-zoom-meeting",
    };

    const metadataMap: Record<string, Record<string, { title: string; description: string }>> = {
        SEO_GRATIS: {
            pt: {
                title: "Teleprompter Online Grátis - Funciona no Navegador",
                description: "Procurando um teleprompter online grátis? O PromptNinja funciona direto no seu navegador, sem baixar nada. Controle pelo celular via Wi-Fi.",
            },
            en: {
                title: "Free Online Teleprompter - Works in Browser",
                description: "Looking for a free online teleprompter? PromptNinja works directly in your browser, no download needed. Control via mobile over Wi-Fi.",
            },
            es: {
                title: "Teleprompter Online Gratis - Funciona en el Navegador",
                description: "¿Buscas un teleprompter online gratis? PromptNinja funciona directo en tu navegador, sin descargar nada. Controla desde el móvil vía Wi-Fi.",
            },
        },
        // TODO: Add other pages metadata here
    };

    (Object.keys(ROUTES_CONFIG) as Array<SeoRouteKey>).forEach(routeKey => {
        const routeInfo = ROUTES_CONFIG[routeKey];
        const pageMetadata = metadataMap[routeKey];

        // Only run tests for pages with metadata defined
        if (!pageMetadata) {
            return;
        }

        it(`should render the ${routeKey} page with the correct meta tags`, async () => {
            const pageKey = seoKeyMap[routeKey];
            const SeoPageComponent = SeoPages[pageKey];

            if (SeoPageComponent) {
                const { rerender } = render(
                    <React.Suspense fallback={<div>Loading...</div>}>
                        <SeoPageComponent onLaunch={() => { }} />
                    </React.Suspense>
                );

                for (const lang of Object.keys(routeInfo.paths)) {
                    const metadata = pageMetadata[lang];
                    if (!metadata) {
                        continue; // Skip if no metadata for this language
                    }

                    (useTranslation as vi.Mock).mockReturnValue({
                        t: (key: string) => key,
                        lang: lang as Language,
                        setLang: () => { },
                    });

                    act(() => {
                        rerender(
                            <React.Suspense fallback={<div>Loading...</div>}>
                                <SeoPageComponent onLaunch={() => { }} />
                            </React.Suspense>
                        );
                    });

                    await vi.waitFor(() => {
                        // Check the title
                        expect(document.title).toContain(metadata.title);

                        // Check the description
                        const description = document.querySelector('meta[name="description"]');
                        expect(description).not.toBeNull();
                        expect(description?.getAttribute('content')).toBe(metadata.description);
                    });
                }
            }
        });
    });
});
