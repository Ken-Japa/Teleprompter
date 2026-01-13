
import React from "react";
import { useTranslation } from "../../hooks/useTranslation";
import { SeoPageLayout } from "./SeoPageLayout";
import { TeleprompterTikTokShortsPT } from "./content/teleprompter-tiktok-shorts/pt";
import { TeleprompterTikTokShortsEN } from "./content/teleprompter-tiktok-shorts/en";
import { TeleprompterTikTokShortsES } from "./content/teleprompter-tiktok-shorts/es";

interface Props {
    onLaunch: () => void;
}

export const TeleprompterTikTokShorts: React.FC<Props> = ({ onLaunch }) => {
    const { lang } = useTranslation();

    let Content = TeleprompterTikTokShortsPT;
    let title = "Teleprompter para TikTok & Shorts: Grave Sem Erros e Viralize! - PromptNinja";
    let description = "Chega de gaguejar! Use o PromptNinja para criar vídeos perfeitos no TikTok e Shorts. Mantenha o contato visual, a fluidez e entregue sua mensagem em segundos. Experimente grátis!";
    let ctaText = "Abrir Teleprompter para TikTok";
    let canonicalUrl = "https://promptninja.solutionkit.com.br/teleprompter-tiktok-shorts";
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
        "operatingSystem": "Android, iOS",
        "author": {
            "@type": "Organization",
            "name": "PromptNinja",
            "url": "https://promptninja.solutionkit.com.br"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5",
            "ratingCount": "156",
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
        Content = TeleprompterTikTokShortsEN;
        title = "Teleprompter for TikTok, Reels and Shorts";
        description = "Record perfect vertical videos for TikTok and Instagram Reels. Free teleprompter that works on mobile with P2P remote control.";
        ctaText = "Open Teleprompter for TikTok";
        canonicalUrl = "https://promptninja.solutionkit.com.br/en/teleprompter-tiktok-shorts";
        schema = {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "PromptNinja Teleprompter",
            "headline": title,
            "description": description,
            "url": canonicalUrl,
            "image": ogImage,
            "applicationCategory": "MultimediaApplication",
            "operatingSystem": "Android, iOS",
            "author": {
                "@type": "Organization",
                "name": "PromptNinja",
                "url": "https://promptninja.solutionkit.com.br/?lang=en"
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5",
                "ratingCount": "156",
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
        Content = TeleprompterTikTokShortsES;
        title = "Teleprompter para TikTok, Reels y Shorts";
        description = "Graba videos verticales perfectos para TikTok e Instagram Reels. Teleprompter gratuito que funciona en el móvil con control remoto P2P.";
        ctaText = "Abrir Teleprompter para TikTok";
        canonicalUrl = "https://promptninja.solutionkit.com.br/es/teleprompter-tiktok-shorts";
        schema = {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "PromptNinja Teleprompter",
            "headline": title,
            "description": description,
            "url": canonicalUrl,
            "image": ogImage,
            "applicationCategory": "MultimediaApplication",
            "operatingSystem": "Android, iOS",
            "author": {
                "@type": "Organization",
                "name": "PromptNinja",
                "url": "https://promptninja.solutionkit.com.br/?lang=es"
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5",
                "ratingCount": "156",
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
                    className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-2xl hover:scale-105 transition transform duration-200"
                >
                    {ctaText}
                </button>
            </div>
        </SeoPageLayout>
    );
};
