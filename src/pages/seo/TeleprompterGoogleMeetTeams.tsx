
import React from "react";
import { useTranslation } from "../../hooks/useTranslation";
import { SeoPageLayout } from "./SeoPageLayout";
import { TeleprompterGoogleMeetTeamsPT } from "./content/teleprompter-google-meet-teams/pt";
import { TeleprompterGoogleMeetTeamsEN } from "./content/teleprompter-google-meet-teams/en";
import { TeleprompterGoogleMeetTeamsES } from "./content/teleprompter-google-meet-teams/es";

interface Props {
    onLaunch: () => void;
}

export const TeleprompterGoogleMeetTeams: React.FC<Props> = ({ onLaunch }) => {
    const { lang } = useTranslation();

    let Content = TeleprompterGoogleMeetTeamsPT;
    let title = "Teleprompter para Google Meet e Microsoft Teams";
    let description = "Solução segura e sem instalação para usar teleprompter em reuniões corporativas no Teams, Meet e Zoom. Dados 100% locais.";
    let ctaText = "Começar Reunião com Teleprompter";
    let canonicalUrl = "https://promptninja.solutionkit.com.br/teleprompter-google-meet-teams";
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
        Content = TeleprompterGoogleMeetTeamsEN;
        title = "Teleprompter for Google Meet and Microsoft Teams";
        description = "Secure, zero-install teleprompter solution for corporate meetings on Teams, Meet, and Zoom. 100% local data privacy.";
        ctaText = "Start Meeting with Teleprompter";
        canonicalUrl = "https://promptninja.solutionkit.com.br/en/teleprompter-google-meet-teams";
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
        Content = TeleprompterGoogleMeetTeamsES;
        title = "Teleprompter para Google Meet y Microsoft Teams";
        description = "Solución segura y sin instalación para usar teleprompter en reuniones corporativas en Teams, Meet y Zoom. Privacidad de datos 100% local.";
        ctaText = "Iniciar Reunión con Teleprompter";
        canonicalUrl = "https://promptninja.solutionkit.com.br/es/teleprompter-google-meet-teams";
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
                    className="bg-gradient-to-r from-indigo-600 to-blue-800 hover:from-indigo-500 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-2xl hover:scale-105 transition transform duration-200"
                >
                    {ctaText}
                </button>
            </div>
        </SeoPageLayout>
    );
};
