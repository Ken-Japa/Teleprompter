
import React from "react";
import { useTranslation } from "../../hooks/useTranslation";
import { SeoPageLayout } from "./SeoPageLayout";
import { TeleprompterApresentacoesPT } from "./content/teleprompter-apresentacoes/pt";
import { TeleprompterApresentacoesEN } from "./content/teleprompter-apresentacoes/en";
import { TeleprompterApresentacoesES } from "./content/teleprompter-apresentacoes/es";

interface Props {
    onLaunch: () => void;
}

export const TeleprompterApresentacoes: React.FC<Props> = ({ onLaunch }) => {
    const { lang } = useTranslation();

    let Content = TeleprompterApresentacoesPT;
    let title = "Teleprompter para PowerPoint & Apresentações | PromptNinja";
    let description = "Domine suas apresentações de slides com o teleprompter invisível do PromptNinja. Funciona com PowerPoint, Google Slides e Keynote. Fale com confiança e naturalidade.";
    let ctaText = "Começar Apresentação";
    let canonicalUrl = "https://promptninja.solutionkit.com.br/teleprompter-apresentacoes";
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
        Content = TeleprompterApresentacoesEN;
        title = "Teleprompter for PowerPoint and Live Presentations";
        description = "Improve your public speaking in slide presentations. Use PromptNinja as your invisible script for PowerPoint, Google Slides, and Keynote.";
        ctaText = "Start Presentation";
        canonicalUrl = "https://promptninja.solutionkit.com.br/en/teleprompter-for-presentations";
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
        Content = TeleprompterApresentacoesES;
        title = "Teleprompter para PowerPoint y Presentaciones en Vivo";
        description = "Mejora tu oratoria en presentaciones de diapositivas. Usa PromptNinja como tu guion invisible para PowerPoint, Google Slides y Keynote.";
        ctaText = "Iniciar Presentación";
        canonicalUrl = "https://promptninja.solutionkit.com.br/es/teleprompter-para-presentaciones";
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
                    className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-2xl hover:scale-105 transition transform duration-200"
                >
                    {ctaText}
                </button>
            </div>
        </SeoPageLayout>
    );
};
