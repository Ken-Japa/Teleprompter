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
    let title = "PromptNinja: A Alternativa Inteligente ao Teleprompter Tradicional & Apps Caros";
    let description = "Cansado de teleprompters volumosos e softwares limitados? Descubra PromptNinja, a plataforma online que oferece controle profissional, flexibilidade e custo-benefício. Compare e eleve sua performance!";
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
        title = "PromptNinja: The Smart Alternative to Traditional Teleprompters & Expensive Apps";
        description = "Tired of bulky teleprompters and limited software? Discover PromptNinja, the online platform offering professional control, flexibility, and cost-benefit. Compare and elevate your performance!";
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
        title = "La Mejor Alternativa Gratuita a Teleprompter Pro y Apps de Pago";
        description = "¿Cansado de pagar suscripciones caras por funciones básicas? PromptNinja es la alternativa inteligente que ofrece control remoto, modo espejo y privacidad total sin el costo de las aplicaciones tradicionales.";
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
