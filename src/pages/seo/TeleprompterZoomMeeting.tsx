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
    let title = "Como usar Teleprompter no Zoom, Teams e Google Meet";
    let description = "Aprenda a ler seus scripts durante reuniões online sem desviar o olhar da câmera. Guia para Zoom, Teams e Google Meet com teleprompter gratuito.";
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
        title = "How to use Teleprompter for Zoom, Teams and Google Meet";
        description = "Learn how to read your scripts during online meetings without looking away from the camera. Guide for Zoom, Teams, and Google Meet with free teleprompter.";
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
        title = "Cómo usar Teleprompter en Zoom, Teams y Google Meet";
        description = "Aprende a leer tus guiones durante reuniones online sin desviar la mirada de la cámara. Guía para Zoom, Teams y Google Meet con teleprompter gratuito.";
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
