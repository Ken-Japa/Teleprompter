import React from "react";
import { useTranslation } from "../../hooks/useTranslation";
import { SeoPageLayout } from "./SeoPageLayout";
import { MelhorAppTeleprompterPT } from "./content/melhor-app-teleprompter/pt";
import { MelhorAppTeleprompterEN } from "./content/melhor-app-teleprompter/en";
import { MelhorAppTeleprompterES } from "./content/melhor-app-teleprompter/es";

interface Props {
    onLaunch: () => void;
}

export const MelhorAppTeleprompter: React.FC<Props> = ({ onLaunch }) => {
    const { lang } = useTranslation();

    let Content = MelhorAppTeleprompterPT;
    let title = "PromptNinja: O Melhor App de Teleprompter para Conteúdo Impecável (Compare e Veja!)";
    let description = "Descubra por que o PromptNinja é a escolha superior para youtubers, palestrantes e músicos. Compare recursos, prove resultados reais e comece grátis hoje.";
    let canonicalUrl = "https://promptninja.solutionkit.com.br/melhor-teleprompter-app";
    let ogImage = "https://promptninja.solutionkit.com.br/og-image.webp";
    let schema: object = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": title,
        "datePublished": "2025-01-01T08:00:00+00:00",
        "dateModified": new Date().toISOString(),
        "name": title,
        "description": description,
        "url": canonicalUrl,
        "image": ogImage,
        "author": {
            "@type": "Organization",
            "name": "PromptNinja",
            "url": "https://promptninja.solutionkit.com.br"
        },
        "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5",
            "worstRating": "1"
        }
    };
    let ctaText = "Experimentar o Vencedor (Grátis)";

    if (lang === 'en') {
        Content = MelhorAppTeleprompterEN;
        title = "PromptNinja: The Best Teleprompter App for Impeccable Content (Compare!)";
        description = "Discover why PromptNinja is the top choice for YouTubers, speakers, and musicians. Compare features, see real results, and start for free today.";
        canonicalUrl = "https://promptninja.solutionkit.com.br/en/best-teleprompter-app";
        ogImage = "https://promptninja.solutionkit.com.br/og-image.webp";
        schema = {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": title,
            "datePublished": "2025-01-01T08:00:00+00:00",
            "dateModified": new Date().toISOString(),
            "name": title,
            "description": description,
            "url": canonicalUrl,
            "image": ogImage,
            "author": {
                "@type": "Organization",
                "name": "PromptNinja",
                "url": "https://promptninja.solutionkit.com.br/?lang=en"
            },
            "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5",
                "bestRating": "5",
                "worstRating": "1"
            }
        };
        ctaText = "Try the Winner (Free)";
    } else if (lang === 'es') {
        Content = MelhorAppTeleprompterES;
        title = "Mejor App de Teleprompter Gratis: Sin Instalación | PromptNinja (2026)";
        description = "No descargues nada. Usa el mejor Teleprompter Gratis y Online. Funciona en PC, Móvil y Tablet. Control remoto vía Wi-Fi y modo espejo. Pruébalo ahora.";
        canonicalUrl = "https://promptninja.solutionkit.com.br/es/mejor-app-teleprompter";
        ogImage = "https://promptninja.solutionkit.com.br/og-image.webp";
        schema = {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": title,
            "datePublished": "2025-01-01T08:00:00+00:00",
            "dateModified": new Date().toISOString(),
            "name": title,
            "description": description,
            "url": canonicalUrl,
            "image": ogImage,
            "author": {
                "@type": "Organization",
                "name": "PromptNinja",
                "url": "https://promptninja.solutionkit.com.br/?lang=es"
            },
            "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5",
                "bestRating": "5",
                "worstRating": "1"
            }
        };
        ctaText = "Probar el Ganador (Gratis)";
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

            <div className="text-center mt-8">
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
