import React from "react";
import { useTranslation } from "../../hooks/useTranslation";
import { SeoPageLayout } from "./SeoPageLayout";
import { AlternativasTeleprompterConcorrentePT } from "./content/alternativas-teleprompter-concorrente/pt";
import { AlternativasTeleprompterConcorrenteEN } from "./content/alternativas-teleprompter-concorrente/en";
import { AlternativasTeleprompterConcorrenteES } from "./content/alternativas-teleprompter-concorrente/es";

interface Props {
    onLaunch: () => void;
}

export const AlternativasTeleprompterConcorrente: React.FC<Props> = ({ onLaunch }) => {
    const { lang } = useTranslation();

    let Content = AlternativasTeleprompterConcorrentePT;
    let title = "A ÚNICA Alternativa GRATUITA ao Teleprompter Pro (Zero Lag)";
    let description = "Cansado de apps caros ou com delay? O PromptNinja é a alternativa GRATUITA que você procurava. Use no PC/Celular, P2P e sem instalação.";
    let canonicalUrl = "https://promptninja.solutionkit.com.br/alternativas-teleprompter-concorrente";
    let ogImage = "https://promptninja.solutionkit.com.br/og-image.webp";
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
    let ctaText = "Trocar para o PromptNinja (Sem Instalar Nada)";

    if (lang === 'en') {
        Content = AlternativasTeleprompterConcorrenteEN;
        title = "Alternative to Teleprompter Pro and PrompterPro (Free & Online)";
        description = "Looking for a Teleprompter Pro alternative? Meet PromptNinja: free, no login, works on PC and Mobile with remote control.";
        canonicalUrl = "https://promptninja.solutionkit.com.br/en/alternative-to-teleprompter-pro";
        ogImage = "https://promptninja.solutionkit.com.br/og-image.webp";
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
                "url": "https://promptninja.solutionkit.com.br"
            }
        };
        ctaText = "Switch to PromptNinja (No Install Needed)";
    } else if (lang === 'es') {
        Content = AlternativasTeleprompterConcorrenteES;
        title = "Alternativa a Teleprompter Pro y PrompterPro (Gratis y Online)";
        description = "¿Buscas una alternativa a Teleprompter Pro? Conoce PromptNinja: gratis, sin registro, funciona en PC y Móvil con control remoto.";
        canonicalUrl = "https://promptninja.solutionkit.com.br/es/alternativa-teleprompter-pro";
        ogImage = "https://promptninja.solutionkit.com.br/og-image.webp";
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
                "url": "https://promptninja.solutionkit.com.br"
            }
        };
        ctaText = "Cambiar a PromptNinja (Sin Instalación)";
    }

    return (
        <SeoPageLayout
            title={title}
            description={description}
            canonicalUrl={canonicalUrl}
            ogImage={ogImage}
            schema={schema}
            onLaunch={onLaunch}
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
