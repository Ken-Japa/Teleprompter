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
    let title = "Teleprompter para Zoom: Fale com Naturalidade e Olhar na Câmera";
    let description = "Cansado de desviar o olhar no Zoom? Use o PromptNinja para ler seu roteiro enquanto mantém contato visual. Ideal para reuniões e webinars. Teste grátis!";
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
        title = "Virtual Teleprompter for Zoom: Eye Contact & Confidence | PromptNinja";
        description = "Master your Zoom meetings! Read scripts discretely while maintaining perfect eye contact with PromptNinja. Professional confidence for lives and calls. Try free.";
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
        title = "Teleprompter para Zoom y Videollamadas: Contacto Visual Perfecto";
        description = "¡No pierdas el contacto visual! Usa PromptNinja para leer tu guion con fluidez mientras miras a la cámara en Zoom y Teams. Transmite confianza y autoridad gratis.";
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
