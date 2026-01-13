import React from "react";
import { useTranslation } from "../../hooks/useTranslation";
import { SeoPageLayout } from "./SeoPageLayout";
import { TeleprompterGamersPT } from "./content/teleprompter-gamers/pt";
import { TeleprompterGamersEN } from "./content/teleprompter-gamers/en";
import { TeleprompterGamersES } from "./content/teleprompter-gamers/es";

interface Props {
    onLaunch: () => void;
}

export const TeleprompterGamers: React.FC<Props> = ({ onLaunch }) => {
    const { lang } = useTranslation();

    let Content = TeleprompterGamersPT;
    let title = "Teleprompter para Gamers e Streamers: Melhore seu Chat e Performance";
    let description = "Eleve o nível da sua stream na Twitch ou YouTube. Use o PromptNinja para ler roteiros e agradecimentos sem tirar os olhos da ação. Otimizado para baixa latência. Comece grátis.";
    let canonicalUrl = "https://promptninja.solutionkit.com.br/teleprompter-gamers-streaming";
    let ogImage = "https://promptninja.solutionkit.com.br/og-image.webp";
    let schema: object = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": title,
        "description": description,
        "url": canonicalUrl,
        "image": ogImage,
        "author": {
            "@type": "Organization",
            "name": "PromptNinja",
            "url": "https://promptninja.solutionkit.com.br"
        }
    };
    let ctaText = "Abrir Modo Gamer";

    if (lang === 'en') {
        Content = TeleprompterGamersEN;
        title = "Minimalist Teleprompter for Gamers & Streamers | PromptNinja";
        description = "The ultimate teleprompter for OBS and Twitch. Features 'No HUD' mode, transparent background for Chroma Key, and zero distractions for professional gaming content.";
        canonicalUrl = "https://promptninja.solutionkit.com.br/en/teleprompter-gamers-streaming";
        ctaText = "Open Gamer Mode";
        schema = {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": title,
            "description": description,
            "url": canonicalUrl,
            "image": ogImage,
            "author": {
                "@type": "Organization",
                "name": "PromptNinja",
                "url": "https://promptninja.solutionkit.com.br/?lang=en"
            }
        };
    } else if (lang === 'es') {
        Content = TeleprompterGamersES;
        title = "Teleprompter para Gamers y Streamers: Cero Lag, Máximo Impacto";
        description = "Domina tus directos sin perder el hilo de la conversación. Con PromptNinja, obtienes un teleprompter ultra ligero diseñado específicamente para integrarse con OBS Studio y Twitch sin afectar tus FPS.";
        canonicalUrl = "https://promptninja.solutionkit.com.br/es/teleprompter-gamers-streaming";
        ctaText = "Abrir Modo Gamer";
        schema = {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": title,
            "description": description,
            "url": canonicalUrl,
            "image": ogImage,
            "author": {
                "@type": "Organization",
                "name": "PromptNinja",
                "url": "https://promptninja.solutionkit.com.br/?lang=es"
            }
        };
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

            <div className="my-8 p-6 bg-slate-900 rounded-lg border border-slate-800 text-center">
                <button
                    onClick={onLaunch}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-2xl hover:scale-105 transition transform duration-200"
                >
                    {ctaText}
                </button>
            </div>
        </SeoPageLayout>
    );
};
