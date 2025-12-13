
/// <reference types="vite/client" />
import { render, act } from '@testing-library/react';
import React from 'react';
import { describe, it, expect, vi, type Mock } from 'vitest';
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
        SEO_TUTORIAL: {
            pt: {
                title: "Como Usar Teleprompter no Celular: Guia Completo",
                description: "Aprenda como usar seu celular como teleprompter ou como controle remoto. Tutorial passo a passo para gravar vídeos profissionais.",
            }
        },
        SEO_MELHOR_APP: {
            pt: {
                title: "Melhor App de Teleprompter para Celular e PC (2026)",
                description: "Comparativo dos melhores aplicativos de teleprompter. Descubra qual é o melhor app grátis, com controle remoto e espelhamento.",
            }
        },
        SEO_ALTERNATIVAS: {
            pt: {
                title: "A ÚNICA Alternativa GRATUITA ao Teleprompter Pro (Zero Lag)",
                description: "Procurando uma alternativa ao Teleprompter Pro? Não perca tempo. O PromptNinja é a melhor opção GRATUITA para PC, Notebook e como teleprompter para iPhone.",
            }
        },
        SEO_YOUTUBERS: {
            pt: {
                title: "Melhor Teleprompter para YouTubers e Criadores de Curso",
                description: "Grave vídeos longos sem errar o texto. Descubra como o PromptNinja ajuda YouTubers e professores online a gravar aulas perfeitas.",
            }
        },
        SEO_TRAVANDO: {
            pt: {
                title: "Teleprompter Travando ou Pulando Texto? Veja a Solução",
                description: "Seu app de teleprompter está travando ou o texto não rola suavemente? Entenda por que isso acontece e como o PromptNinja resolve com P2P.",
            }
        },
        SEO_DIY: {
            pt: {
                title: "Como Montar um Teleprompter Caseiro (DIY) Barato",
                description: "Aprenda a fazer um teleprompter caseiro com vidro e caixa de papelão. E use o PromptNinja como software gratuito para espelhar o texto.",
            }
        },
        SEO_ORATORIA: {
            pt: {
                title: "5 Dicas de Oratória em Vídeo que VÃO te Fazer Parar de Regravar",
                description: "Pare de travar e perder tempo! 5 técnicas rápidas para falar bem no vídeo. Bônus: Teleprompter GRÁTIS para aplicar a técnica instantaneamente.",
            }
        },
        SEO_DECORAR: {
            pt: {
                title: "Como Decorar Texto Rápido: 5 Técnicas Infalíveis",
                description: "Pare de sofrer tentando decorar roteiros longos. Conheça técnicas de memorização e a solução definitiva para nunca mais esquecer uma fala.",
            }
        },
        SEO_WEBRTC: {
            pt: {
                title: "Como o WebRTC Elimina a Latência em Teleprompters",
                description: "Entenda a tecnologia por trás do PromptNinja. Descubra como usamos WebRTC e P2P para garantir rolagem suave e instantânea, superando o Bluetooth.",
            }
        },
        SEO_PC_WINDOWS: {
            pt: {
                title: "Teleprompter Grátis para PC e Windows (Sem Download)",
                description: "Use seu PC Windows como teleprompter profissional. Sem baixar programas, sem vírus e com controle remoto via celular. Funciona no Chrome e Edge.",
            }
        },
        SEO_ZOOM: {
            pt: {
                title: "Como usar Teleprompter no Zoom, Teams e Google Meet",
                description: "Aprenda a ler seus scripts durante reuniões online sem desviar o olhar da câmera. Guia para Zoom, Teams e Google Meet com teleprompter gratuito.",
            }
        },
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
                const { rerender } = await act(async () => render(
                    <React.Suspense fallback={<div>Loading...</div>}>
                        <SeoPageComponent onLaunch={() => { }} />
                    </React.Suspense>
                ));

                for (const lang of Object.keys(routeInfo.paths)) {
                    const metadata = pageMetadata[lang];
                    if (!metadata) {
                        continue; // Skip if no metadata for this language
                    }

                    (useTranslation as Mock).mockReturnValue({
                        t: (key: string) => key,
                        lang: lang as Language,
                        setLang: () => { },
                    });

                    await act(async () => {
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
