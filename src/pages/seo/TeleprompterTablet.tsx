import React from "react";
import { useTranslation } from "../../hooks/useTranslation";
import { SeoPageLayout } from "./SeoPageLayout";
import { TeleprompterTabletPT } from "./content/teleprompter-tablet/pt";
import { TeleprompterTabletEN } from "./content/teleprompter-tablet/en";
import { TeleprompterTabletES } from "./content/teleprompter-tablet/es";

interface Props {
    onLaunch: () => void;
}

export const TeleprompterTablet: React.FC<Props> = ({ onLaunch }) => {
    const { lang } = useTranslation();

    let Content = TeleprompterTabletPT;
    let title = "Teleprompter para Tablet e iPad (App Online Grátis)";
    let description = "Transforme seu Tablet ou iPad em um Teleprompter profissional. App online grátis, leve e sem downloads. Compatível com iPad, Samsung Tab e Android.";
    let ctaText = "Usar Teleprompter no Tablet";
    let canonicalUrl = "https://promptninja.solutionkit.com.br/teleprompter-para-tablet-ipad-android";
    const ogImage = "https://promptninja.solutionkit.com.br/og-image.webp";
    let schema: object = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "PromptNinja Teleprompter",
        "headline": title,
        "description": description,
        "applicationCategory": "MultimediaApplication",
        "operatingSystem": "Android, iOS, iPadOS",
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5",
            "ratingCount": "87",
            "bestRating": "5",
            "worstRating": "1"
        },
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "url": canonicalUrl,
        "image": ogImage,
        "author": {
            "@type": "Organization",
            "name": "PromptNinja",
            "url": "https://promptninja.solutionkit.com.br"
        }
    };

    if (lang === 'en') {
        Content = TeleprompterTabletEN;
        title = "Teleprompter for Tablet and iPad (Free Online App)";
        description = "Turn your Tablet or iPad into a professional Teleprompter. Free online app, lightweight, no downloads. Compatible with iPad, Samsung Tab, and Android.";
        ctaText = "Use Teleprompter on Tablet";
        canonicalUrl = "https://promptninja.solutionkit.com.br/en/teleprompter-app-for-tablet-ipad";
        schema = {
            ...schema,
            "headline": title,
            "description": description,
            "url": canonicalUrl,
            "author": {
                "@type": "Organization",
                "name": "PromptNinja",
                "url": "https://promptninja.solutionkit.com.br/?lang=en"
            }
        };
    } else if (lang === 'es') {
        Content = TeleprompterTabletES;
        title = "Teleprompter para Tablet y iPad (App Online Gratis)";
        description = "Transforma tu Tablet o iPad en un Teleprompter profesional. App online gratis, ligera y sin descargas. Compatible con iPad, Samsung Tab y Android.";
        ctaText = "Usar Teleprompter en Tablet";
        canonicalUrl = "https://promptninja.solutionkit.com.br/es/teleprompter-para-tablet-ipad-android";
        schema = {
            ...schema,
            "headline": title,
            "description": description,
            "url": canonicalUrl,
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
