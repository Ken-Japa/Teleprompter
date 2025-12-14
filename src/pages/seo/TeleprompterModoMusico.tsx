import React from "react";
import { useTranslation } from "../../hooks/useTranslation";
import { SeoPageLayout } from "./SeoPageLayout";
import { TeleprompterModoMusicoPT } from "./content/teleprompter-modo-musico/pt";
import { TeleprompterModoMusicoEN } from "./content/teleprompter-modo-musico/en";
import { TeleprompterModoMusicoES } from "./content/teleprompter-modo-musico/es";

interface Props {
    onLaunch: () => void;
}

export const TeleprompterModoMusico: React.FC<Props> = ({ onLaunch }) => {
    const { lang } = useTranslation();

    let Content = TeleprompterModoMusicoPT;
    let title = "Teleprompter Modo Músico: A Solução Definitiva para Acompanhar Letras e Cifras";
    let description = "Descubra como o Modo Músico do PromptNinja transforma a forma como músicos acompanham letras e cifras. Alinhamento perfeito, controle remoto e integração com voz.";
    let canonicalUrl = "https://promptninja.solutionkit.com.br/teleprompter-modo-musico";
    let ogImage = "https://promptninja.solutionkit.com.br/og-image.webp";
    let schema: object = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": title,
        "description": description,
        "url": canonicalUrl,
        "image": ogImage,
        "author": {
            "@type": "Organization",
            "name": "PromptNinja",
            "url": "https://promptninja.solutionkit.com.br"
        },
        "publisher": {
            "@type": "Organization",
            "name": "PromptNinja",
            "logo": {
                "@type": "ImageObject",
                "url": ogImage
            }
        },
        "datePublished": "2025-12-13",
        "dateModified": "2025-12-13"
    };
    let ctaText = "Experimentar Modo Músico Grátis";

    if (lang === 'en') {
        Content = TeleprompterModoMusicoEN;
        title = "Teleprompter Musician Mode: The Ultimate Solution for Following Lyrics and Chords";
        description = "Discover how PromptNinja's Musician Mode transforms how musicians follow lyrics and chords. Perfect alignment, remote control, and voice integration.";
        canonicalUrl = "https://promptninja.solutionkit.com.br/en/teleprompter-musician-mode";
        ogImage = "https://promptninja.solutionkit.com.br/og-image.webp";
        schema = {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": title,
            "description": description,
            "url": canonicalUrl,
            "image": ogImage,
            "author": {
                "@type": "Organization",
                "name": "PromptNinja",
                "url": "https://promptninja.solutionkit.com.br/?lang=en"
            },
            "publisher": {
                "@type": "Organization",
                "name": "PromptNinja",
                "logo": {
                    "@type": "ImageObject",
                    "url": ogImage
                }
            },
            "datePublished": "2025-12-13",
            "dateModified": "2025-12-13"
        };
        ctaText = "Try Musician Mode Free";
    } else if (lang === 'es') {
        Content = TeleprompterModoMusicoES;
        title = "Teleprompter Modo Músico: La Solución Definitiva para Seguir Letras y Acordes";
        description = "Descubre cómo el Modo Músico de PromptNinja transforma la forma en que los músicos siguen letras y acordes. Alineación perfecta, control remoto e integración de voz.";
        canonicalUrl = "https://promptninja.solutionkit.com.br/es/teleprompter-modo-musico";
        ogImage = "https://promptninja.solutionkit.com.br/og-image.webp";
        schema = {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": title,
            "description": description,
            "url": canonicalUrl,
            "image": ogImage,
            "author": {
                "@type": "Organization",
                "name": "PromptNinja",
                "url": "https://promptninja.solutionkit.com.br/?lang=es"
            },
            "publisher": {
                "@type": "Organization",
                "name": "PromptNinja",
                "logo": {
                    "@type": "ImageObject",
                    "url": ogImage
                }
            },
            "datePublished": "2025-12-13",
            "dateModified": "2025-12-13"
        };
        ctaText = "Probar Modo Músico Gratis";
    }

    return (
        <SeoPageLayout
            title={title}
            description={description}
            canonicalUrl={canonicalUrl}
            ogImage={ogImage}
            ogType="article"
            schema={schema}
            onLaunch={onLaunch}
        >
            <Content />

            <div className="my-8 p-6 bg-slate-900 rounded-lg border border-slate-800 text-center">
                <button
                    onClick={onLaunch}
                    className="bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-500 hover:to-amber-500 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-2xl hover:scale-105 transition transform duration-200"
                >
                    {ctaText}
                </button>
            </div>
        </SeoPageLayout>
    );
};
