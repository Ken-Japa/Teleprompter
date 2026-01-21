import React from "react";
import { useTranslation } from "../../hooks/useTranslation";
import { SeoPageLayout } from "./SeoPageLayout";
import { TeleprompterPCWindowsPT } from "./content/teleprompter-pc-windows/pt";
import { TeleprompterPCWindowsEN } from "./content/teleprompter-pc-windows/en";
import { TeleprompterPCWindowsES } from "./content/teleprompter-pc-windows/es";

interface Props {
    onLaunch: () => void;
}

export const TeleprompterPCWindows: React.FC<Props> = ({ onLaunch }) => {
    const { lang } = useTranslation();

    let Content = TeleprompterPCWindowsPT;
    let title = "Teleprompter para PC Windows: Gratis e sem Instalação | PromptNinja";
    let description = "Transforme seu PC Windows em um teleprompter profissional. Sem downloads ou vírus, direto no Chrome ou Edge. Otimizado para Windows 10 e 11. Teste grátis!";
    let ctaText = "Abrir Teleprompter no PC";
    let canonicalUrl = "https://promptninja.solutionkit.com.br/teleprompter-pc-windows";
    const ogImage = "https://promptninja.solutionkit.com.br/og-image.webp";
    let schema: object = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "PromptNinja Teleprompter",
        "headline": title,
        "description": description,
        "url": canonicalUrl,
        "image": ogImage,
        "applicationCategory": "MultimediaApplication",
        "operatingSystem": "Windows",
        "author": {
            "@type": "Organization",
            "name": "PromptNinja",
            "url": "https://promptninja.solutionkit.com.br"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5",
            "ratingCount": "98",
            "bestRating": "5",
            "worstRating": "1"
        },
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        }
    };

    if (lang === 'en') {
        Content = TeleprompterPCWindowsEN;
        title = "Best Online Teleprompter for Windows PC (Free) | PromptNinja";
        description = "Turn your Windows PC into a professional studio. Easy online teleprompter with smooth scrolling and remote control. No installation required. Try it free!";
        ctaText = "Open Teleprompter on PC";
        canonicalUrl = "https://promptninja.solutionkit.com.br/en/teleprompter-pc-windows";
        schema = {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "PromptNinja Teleprompter",
            "headline": title,
            "description": description,
            "url": canonicalUrl,
            "image": ogImage,
            "applicationCategory": "MultimediaApplication",
            "operatingSystem": "Windows",
            "author": {
                "@type": "Organization",
                "name": "PromptNinja",
                "url": "https://promptninja.solutionkit.com.br/?lang=en"
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5",
                "ratingCount": "98",
                "bestRating": "5",
                "worstRating": "1"
            },
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
            }
        };
    } else if (lang === 'es') {
        Content = TeleprompterPCWindowsES;
        title = "Teleprompter para PC Windows: Profesional y Sin Instalación";
        description = "Convierte tu ordenador en un teleprompter de élite. Sin archivos .exe ni suscripciones caras. La mejor herramienta online para creadores en Windows. Grátis.";
        ctaText = "Abrir Teleprompter en PC";
        canonicalUrl = "https://promptninja.solutionkit.com.br/es/teleprompter-pc-windows";
        schema = {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "PromptNinja Teleprompter",
            "headline": title,
            "description": description,
            "url": canonicalUrl,
            "image": ogImage,
            "applicationCategory": "MultimediaApplication",
            "operatingSystem": "Windows",
            "author": {
                "@type": "Organization",
                "name": "PromptNinja",
                "url": "https://promptninja.solutionkit.com.br/?lang=es"
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5",
                "ratingCount": "98",
                "bestRating": "5",
                "worstRating": "1"
            },
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
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
