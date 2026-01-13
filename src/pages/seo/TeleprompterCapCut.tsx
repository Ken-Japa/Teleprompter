
import React from "react";
import { useTranslation } from "../../hooks/useTranslation";
import { SeoPageLayout } from "./SeoPageLayout";
import { TeleprompterCapCutPT } from "./content/teleprompter-capcut/pt";
import { TeleprompterCapCutEN } from "./content/teleprompter-capcut/en";
import { TeleprompterCapCutES } from "./content/teleprompter-capcut/es";

interface Props {
    onLaunch: () => void;
}

export const TeleprompterCapCut: React.FC<Props> = ({ onLaunch }) => {
    const { lang } = useTranslation();

    let Content = TeleprompterCapCutPT;
    let title = "CapCut Teleprompter: O Guia para Vídeos Perfeitos (Sem Instalar) | PromptNinja";
    let description = "Combine o poder do CapCut com o teleprompter do PromptNinja. Grave vídeos sem erros, mantenha o contato visual e facilite sua edição. Otimize sua produção de conteúdo com facilidade!";
    let ctaText = "Abrir Teleprompter para CapCut";
    let canonicalUrl = "https://promptninja.solutionkit.com.br/teleprompter-capcut";
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
        Content = TeleprompterCapCutEN;
        title = "Teleprompter for CapCut - Record Better Videos";
        description = "Improve your CapCut videos by recording with PromptNinja Teleprompter. Perfect scripts, no recording errors, and faster editing.";
        ctaText = "Open Teleprompter for CapCut";
        canonicalUrl = "https://promptninja.solutionkit.com.br/en/teleprompter-capcut";
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
        Content = TeleprompterCapCutES;
        title = "Teleprompter para CapCut - Graba Mejores Videos";
        description = "Mejora tus videos de CapCut grabando con Teleprompter PromptNinja. Guiones perfectos, sin errores de grabación y edición más rápida.";
        ctaText = "Abrir Teleprompter para CapCut";
        canonicalUrl = "https://promptninja.solutionkit.com.br/es/teleprompter-capcut";
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
                    className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-2xl hover:scale-105 transition transform duration-200"
                >
                    {ctaText}
                </button>
            </div>
        </SeoPageLayout>
    );
};
