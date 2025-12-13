
import React from "react";
import { useTranslation } from "../../hooks/useTranslation";
import { SeoPageLayout } from "./SeoPageLayout";
import { TeleprompterObsStudioPT } from "./content/teleprompter-obs-studio/pt";
import { TeleprompterObsStudioEN } from "./content/teleprompter-obs-studio/en";
import { TeleprompterObsStudioES } from "./content/teleprompter-obs-studio/es";

interface Props {
    onLaunch: () => void;
}

export const TeleprompterObsStudio: React.FC<Props> = ({ onLaunch }) => {
    const { lang } = useTranslation();

    let Content = TeleprompterObsStudioPT;
    let title = "Teleprompter para OBS Studio e Streaming";
    let description = "Guia completo para usar teleprompter no OBS Studio. Adicione como Browser Source, controle pelo celular e melhore suas lives.";
    let ctaText = "Abrir Teleprompter para OBS";
    let canonicalUrl = "https://promptninja.solutionkit.com.br/teleprompter-obs-studio";
    const ogImage = "https://promptninja.solutionkit.com.br/og-image.webp";
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

    if (lang === 'en') {
        Content = TeleprompterObsStudioEN;
        title = "Teleprompter for OBS Studio and Streaming";
        description = "Complete guide to using teleprompter in OBS Studio. Add as Browser Source, control via mobile, and improve your streams.";
        ctaText = "Open Teleprompter for OBS";
        canonicalUrl = "https://promptninja.solutionkit.com.br/en/teleprompter-obs-studio";
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
        Content = TeleprompterObsStudioES;
        title = "Teleprompter para OBS Studio y Streaming";
        description = "Guía completa para usar teleprompter en OBS Studio. Añade como Browser Source, controla por móvil y mejora tus directos.";
        ctaText = "Abrir Teleprompter para OBS";
        canonicalUrl = "https://promptninja.solutionkit.com.br/es/teleprompter-obs-studio";
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
            ogType="website"
        >
            <Content />

            <div className="text-center mt-10">
                <button
                    onClick={onLaunch}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-2xl hover:scale-105 transition transform duration-200"
                >
                    {ctaText}
                </button>
            </div>
        </SeoPageLayout>
    );
};
