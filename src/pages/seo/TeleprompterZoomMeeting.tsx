import React from "react";
import { useTranslation } from "../../hooks/useTranslation";
import { SeoPageLayout } from "./SeoPageLayout";
import { TeleprompterZoomMeetingPT } from "./content/teleprompter-zoom-meeting/pt";
import { TeleprompterZoomMeetingEN } from "./content/teleprompter-zoom-meeting/en";
import { TeleprompterZoomMeetingES } from "./content/teleprompter-zoom-meeting/es";

interface Props {
    onLaunch: () => void;
}

export const TeleprompterZoomMeeting: React.FC<Props> = ({ onLaunch }) => {
    const { lang } = useTranslation();

    let Content = TeleprompterZoomMeetingPT;
    let title = "⭐ Truque: Teleprompter GRÁTIS no Zoom, Teams e Meet (Sem Instalar Nada!)";
    let description = "Use o Teleprompter P2P GRÁTIS do PromptNinja para ler roteiros sem desviar o olhar. Sem travar e 100% online. Guia definitivo para reuniões de impacto.";
    let ctaText = "Abrir Teleprompter para Zoom";
    let canonicalUrl = "https://promptninja.solutionkit.com.br/teleprompter-zoom-meeting";
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
        Content = TeleprompterZoomMeetingEN;
        title = "⭐ Secret: FREE Teleprompter for Zoom, Teams & Meet (Zero Downloads!)";
        description = "Use the FREE P2P Teleprompter to read scripts without breaking eye contact. Zero lag, 100% online. Ultimate guide for professional online meetings.";
        ctaText = "Open Teleprompter for Zoom";
        canonicalUrl = "https://promptninja.solutionkit.com.br/en/teleprompter-zoom-meeting";
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
        Content = TeleprompterZoomMeetingES;
        title = "⭐ Truco: Teleprompter GRATIS en Zoom, Teams y Meet (¡Sin Descargas!)";
        description = "Usa el Teleprompter P2P GRATIS para leer guiones sin perder contacto visual. Cero lag, 100% online. Guía definitiva para profesionales de reuniones.";
        ctaText = "Abrir Teleprompter para Zoom";
        canonicalUrl = "https://promptninja.solutionkit.com.br/es/teleprompter-zoom-meeting";
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
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-2xl hover:scale-105 transition transform duration-200"
                >
                    {ctaText}
                </button>
            </div>
        </SeoPageLayout>
    );
};
