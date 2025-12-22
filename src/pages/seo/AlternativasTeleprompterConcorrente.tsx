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
    let description = "Procurando uma alternativa ao Teleprompter Pro? Não perca tempo. O PromptNinja é a melhor opção GRATUITA para PC, Notebook e como teleprompter para iPhone.";
    let canonicalUrl = "https://promptninja.solutionkit.com.br/alternativas-teleprompter-concorrente";
    let ogImage = "https://promptninja.solutionkit.com.br/og-image.webp";
    let schema: object = {
        "@context": "https://schema.org",
        "@type": "Review",
        "name": title,
        "description": description,
        "url": canonicalUrl,
        "image": ogImage,
        "author": {
            "@type": "Organization",
            "name": "PromptNinja",
            "url": "https://promptninja.solutionkit.com.br"
        },
        "itemReviewed": {
            "@type": "SoftwareApplication",
            "name": "PromptNinja",
            "applicationCategory": "MultimediaApplication",
            "operatingSystem": "Windows, macOS, Android, iOS",
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
            }
        },
        "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5",
            "worstRating": "1"
        }
    };
    let ctaText = "Trocar para o PromptNinja (Sem Instalar Nada)";

    if (lang === 'en') {
        Content = AlternativasTeleprompterConcorrenteEN;
        title = "The ONLY FREE Alternative to Teleprompter Pro (Zero Lag)";
        description = "Looking for an alternative to Teleprompter Pro? Don't waste any time. PromptNinja is the best FREE option for PC, Notebook, and as a teleprompter for iPhone.";
        canonicalUrl = "https://promptninja.solutionkit.com.br/en/teleprompter-alternatives";
        ogImage = "https://promptninja.solutionkit.com.br/og-image.webp";
        schema = {
            "@context": "https://schema.org",
            "@type": "Review",
            "name": title,
            "description": description,
            "url": canonicalUrl,
            "image": ogImage,
            "author": {
                "@type": "Organization",
                "name": "PromptNinja",
                "url": "https://promptninja.solutionkit.com.br/?lang=en"
            },
            "itemReviewed": {
                "@type": "SoftwareApplication",
                "name": "PromptNinja",
                "applicationCategory": "MultimediaApplication",
                "operatingSystem": "Windows, macOS, Android, iOS",
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
                }
            },
            "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5",
                "bestRating": "5",
                "worstRating": "1"
            }
        };
        ctaText = "Switch to PromptNinja (No Install Needed)";
    } else if (lang === 'es') {
        Content = AlternativasTeleprompterConcorrenteES;
        title = "La ÚNICA alternativa GRATUITA a Teleprompter Pro (sin retrasos)";
        description = "¿Buscas una alternativa a Teleprompter Pro? No pierdas tiempo. PromptNinja es la mejor opção GRATUITA para PC, portátiles y como teleprompter para iPhone.";
        canonicalUrl = "https://promptninja.solutionkit.com.br/es/alternativas-teleprompter";
        ogImage = "https://promptninja.solutionkit.com.br/og-image.webp";
        schema = {
            "@context": "https://schema.org",
            "@type": "Review",
            "name": title,
            "description": description,
            "url": canonicalUrl,
            "image": ogImage,
            "author": {
                "@type": "Organization",
                "name": "PromptNinja",
                "url": "https://promptninja.solutionkit.com.br/?lang=es"
            },
            "itemReviewed": {
                "@type": "SoftwareApplication",
                "name": "PromptNinja",
                "applicationCategory": "MultimediaApplication",
                "operatingSystem": "Windows, macOS, Android, iOS",
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
                }
            },
            "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5",
                "bestRating": "5",
                "worstRating": "1"
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
