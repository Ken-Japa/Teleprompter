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
    let title = "Teleprompter Virtual para Zoom: Domine Suas Apresentações Online | PromptNinja";
    let description = "Transforme suas reuniões e lives no Zoom com o teleprompter virtual do PromptNinja. Leia roteiros discretamente, mantenha o contato visual e transmita confiança profissional. Experimente grátis e simplifique suas calls!";
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
        title = "Teleprompter for Zoom & Google Meet: Transparent Reading (Free)";
        description = "Use PromptNinja's Transparent Teleprompter to read scripts in Zoom, Teams & Meet calls without breaking eye contact. 100% Free & Online.";
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
        title = "Teleprompter para Zoom GRATIS: Lee tu Guion sin que se Note 💡";
        description = "Mejora tus reuniones en Zoom. Lee tu guion directamente en la pantalla sin desviar la mirada. 100% Gratis, sin descargas y con control remoto desde el móvil.";
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
