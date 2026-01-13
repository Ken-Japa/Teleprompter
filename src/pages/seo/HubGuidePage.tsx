import React from "react";
import { useTranslation } from "../../hooks/useTranslation";
import { SeoPageLayout } from "./SeoPageLayout";
import { HubGuideContentPT } from "./content/hub-guide/pt";
import { HubGuideContentEN } from "./content/hub-guide/en";
import { HubGuideContentES } from "./content/hub-guide/es";
import { ROUTES_CONFIG } from "../../config/routes";

interface Props {
    onLaunch: () => void;
}

const SeoHubLinks: React.FC<{ lang: 'pt' | 'en' | 'es' }> = ({ lang }) => {
    // Group routes for better UX
    const groups = [
        {
            title: lang === 'pt' ? 'Começando com Teleprompter' : (lang === 'en' ? 'Getting Started' : 'Empezando'),
            keys: ['SEO_O_QUE_E', 'SEO_TUTORIAL', 'SEO_GRATIS', 'SEO_PWA_INSTALL', 'SEO_PRIVACY']
        },
        {
            title: lang === 'pt' ? 'Dispositivos e Hardware' : (lang === 'en' ? 'Devices & Hardware' : 'Dispositivos y Hardware'),
            keys: ['SEO_PC_WINDOWS', 'SEO_IPHONE_IPAD', 'SEO_TABLET', 'SEO_HARDWARE_VS_WEB', 'SEO_DIY']
        },
        {
            title: lang === 'pt' ? 'Casos de Uso' : (lang === 'en' ? 'Use Cases' : 'Casos de Uso'),
            keys: ['SEO_YOUTUBERS', 'SEO_TIKTOK', 'SEO_ORATORIA', 'SEO_APRESENTACOES', 'SEO_MODO_MUSICO', 'SEO_FITNESS', 'SEO_GAMER']
        },
        {
            title: lang === 'pt' ? 'Recursos Avançados' : (lang === 'en' ? 'Advanced Features' : 'Funciones Avanzadas'),
            keys: ['SEO_MODO_BILINGUE', 'SEO_PACING', 'SEO_SHORTCUTS', 'SEO_SLIDES_SYNC', 'SEO_WEBRTC', 'SEO_TRAVANDO', 'SEO_DECORAR']
        },
        {
            title: lang === 'pt' ? 'Integrações' : (lang === 'en' ? 'Integrations' : 'Integraciones'),
            keys: ['SEO_ZOOM', 'SEO_MEET_TEAMS', 'SEO_OBS', 'SEO_CAPCUT']
        },
        {
            title: lang === 'pt' ? 'Scripts e Roteiros' : (lang === 'en' ? 'Scripts' : 'Guiones'),
            keys: ['SEO_SCRIPTS', 'SEO_SCRIPTS_YOUTUBE', 'SEO_SCRIPTS_TIKTOK', 'SEO_SCRIPTS_SALES', 'SEO_SCRIPTS_CLASSES', 'SEO_SCRIPTS_INSTITUTIONAL']
        }
    ];

    return (
        <div className="mt-16 pt-12 border-t border-slate-800">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
                {lang === 'pt' ? 'Explore Todo o Ecossistema PromptNinja' : (lang === 'en' ? 'Explore the PromptNinja Ecosystem' : 'Explora Todo el Ecosistema PromptNinja')}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {groups.map(group => (
                    <div key={group.title} className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                        <h3 className="text-xl font-bold text-purple-400 mb-4">{group.title}</h3>
                        <ul className="space-y-2">
                            {group.keys.map(key => {
                                const route = ROUTES_CONFIG[key as keyof typeof ROUTES_CONFIG];
                                if (!route) return null;
                                const path = route.paths[lang];
                                // simple extraction of link text from path for now, better would be a mapping of titles
                                const linkText = path.split('/').pop()?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

                                return (
                                    <li key={key}>
                                        <a href={path} className="text-slate-400 hover:text-white hover:underline transition-colors text-sm">
                                            {linkText}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const HubGuidePage: React.FC<Props> = ({ onLaunch }) => {
    const { lang } = useTranslation();

    let Content = HubGuideContentPT;
    let title = "Guia Completo de Teleprompter | De Iniciante a Profissional";
    let description = "O guia definitivo sobre teleprompters: o que são, como usar, melhores apps, dicas de oratória e scripts gratuitos. Tudo o que você precisa saber em um só lugar.";
    let canonicalUrl = "https://promptninja.solutionkit.com.br/guia-completo-teleprompter";
    let ogImage = "https://promptninja.solutionkit.com.br/og-image.webp";

    // Default Schema for Hub Page
    let schema: object = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": title,
        "description": description,
        "image": ogImage,
        "author": {
            "@type": "Organization",
            "name": "PromptNinja",
            "url": "https://promptninja.solutionkit.com.br"
        }
    };

    let ctaText = "Usar Teleprompter Online";

    if (lang === 'en') {
        Content = HubGuideContentEN;
        title = "Ultimate Teleprompter Guide (2025): From Beginner to Pro";
        description = "The definitive guide to teleprompters: what they are, how to use them, best apps, public speaking tips, and scripts. Everything you need to know in one place.";
        canonicalUrl = "https://promptninja.solutionkit.com.br/en/ultimate-teleprompter-guide";
        ctaText = "Use Online Teleprompter";
    } else if (lang === 'es') {
        Content = HubGuideContentES;
        title = "Guía Definitiva de Teleprompter (2025): De Principiante a Profesional";
        description = "La guía definitiva sobre teleprompters: qué son, cómo usarlos, mejores apps, consejos de oratoria y guiones. Todo lo que necesitas saber en un solo lugar.";
        canonicalUrl = "https://promptninja.solutionkit.com.br/es/guia-definitiva-teleprompter";
        ctaText = "Usar Teleprompter Online";
    }

    return (
        <SeoPageLayout
            title={title}
            description={description}
            canonicalUrl={canonicalUrl}
            ogImage={ogImage}
            schema={schema}
            onLaunch={onLaunch}
        >
            <Content />

            <SeoHubLinks lang={lang} />

            <div className="my-12 p-8 bg-gradient-to-br from-slate-900 to-purple-900/20 rounded-2xl border border-purple-500/20 text-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-purple-600/5 group-hover:bg-purple-600/10 transition-colors duration-500" />
                <div className="relative z-10">
                    <h3 className="text-3xl font-bold text-white mb-4">
                        {lang === 'pt' ? 'Comece a Gravar Agora' : (lang === 'en' ? 'Start Recording Now' : 'Empieza a Grabar Ahora')}
                    </h3>
                    <p className="text-slate-300 mb-8 max-w-2xl mx-auto text-lg">
                        {lang === 'pt'
                            ? 'O PromptNinja é a ferramenta gratuita que vai transformar seus vídeos. Sem login, sem download, 100% seguro.'
                            : (lang === 'en'
                                ? 'PromptNinja is the free tool that will transform your videos. No login, no download, 100% secure.'
                                : 'PromptNinja es la herramienta gratuita que transformará tus videos. Sin registro, sin descarga, 100% seguro.')}
                    </p>
                    <button
                        onClick={onLaunch}
                        className="bg-white text-purple-900 hover:bg-slate-100 font-bold py-4 px-10 rounded-full text-xl shadow-xl hover:shadow-2xl hover:scale-105 transition transform duration-200"
                    >
                        {ctaText}
                    </button>
                </div>
            </div>
        </SeoPageLayout>
    );
};
