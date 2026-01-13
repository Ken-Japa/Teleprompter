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
        title = "Virtual Teleprompter for Zoom: Master Your Online Presentations | PromptNinja";
        description = "Transform your Zoom meetings and lives with PromptNinja’s virtual teleprompter. Read scripts discretely, maintain eye contact, and convey professional confidence. Try for free and simplify your calls!";
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
        title = "Teleprompter Virtual para Zoom y Videollamadas: El Secreto del Contacto Visual | PromptNinja";
        description = "Mantén el contacto visual perfecto durante tus reuniones en línea. Usa PromptNinja para leer tu guion con fluidez mientras miras directamente a la cámara, transmitiendo total confianza y autoridad a tu audiencia.";
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
