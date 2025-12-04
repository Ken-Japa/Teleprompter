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
    let locale = "pt_BR";

    if (lang === 'en') {
        Content = TeleprompterZoomMeetingEN;
        title = "How to use Teleprompter for Zoom, Teams and Google Meet";
        description = "Learn how to read your scripts during online meetings without looking away from the camera. Guide for Zoom, Teams, and Google Meet with free teleprompter.";
        ctaText = "Open Teleprompter for Zoom";
        locale = "en_US";
    } else if (lang === 'es') {
        Content = TeleprompterZoomMeetingES;
        title = "Cómo usar Teleprompter en Zoom, Teams y Google Meet";
        description = "Aprende a leer tus guiones durante reuniones online sin desviar la mirada de la cámara. Guía para Zoom, Teams y Google Meet con teleprompter gratuito.";
        ctaText = "Abrir Teleprompter para Zoom";
        locale = "es_ES";
    }

    // Schema.org JSON-LD
    const schema = {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "headline": title,
        "description": description,
        "image": "https://promptninja.site/images/teleprompter-zoom-meeting.jpg",
        "author": {
            "@type": "Organization",
            "name": "PromptNinja"
        },
        "publisher": {
            "@type": "Organization",
            "name": "PromptNinja",
            "logo": {
                "@type": "ImageObject",
                "url": "https://promptninja.site/logo.png"
            }
        },
        "datePublished": "2024-01-15",
        "dateModified": new Date().toISOString().split('T')[0]
    };

    return (
        <SeoPageLayout
            title={title}
            description={description}
            onLaunch={onLaunch}
            schema={schema}
            ogType="article"
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
