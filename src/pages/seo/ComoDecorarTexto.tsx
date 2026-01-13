import React from "react";
import { useTranslation } from "../../hooks/useTranslation";
import { SeoPageLayout } from "./SeoPageLayout";
import { ComoDecorarTextoPT } from "./content/como-decorar-texto/pt";
import { ComoDecorarTextoEN } from "./content/como-decorar-texto/en";
import { ComoDecorarTextoES } from "./content/como-decorar-texto/es";

interface Props {
    onLaunch: () => void;
}

export const ComoDecorarTexto: React.FC<Props> = ({ onLaunch }) => {
    const { lang } = useTranslation();

    let Content = ComoDecorarTextoPT;
    let title = "Como Decorar Texto Rápido? 🧠 5 Técnicas Infalíveis (e por que não decorar!)";
    let description = "Aprenda como decorar texto para vídeos e apresentações com técnicas de memorização rápida. Descubra por que youtubers de sucesso preferem o PromptNinja e comece grátis.";
    let canonicalUrl = "https://promptninja.solutionkit.com.br/como-decorar-texto-rapido";
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
        }
    };
    let ctaText = "Parar de Decorar e Começar a Gravar";

    if (lang === 'en') {
        Content = ComoDecorarTextoEN;
        title = "How to Memorize Text Fast: 5 Fail-proof Techniques | PromptNinja";
        description = "Stop struggling to memorize long scripts. Discover effective memory techniques and the definitive solution to never forget a line again. Save hours of re-recording.";
        canonicalUrl = "https://promptninja.solutionkit.com.br/en/how-to-memorize-scripts-fast";
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
            }
        };
        ctaText = "Stop Memorizing and Start Recording";
    } else if (lang === 'es') {
        Content = ComoDecorarTextoES;
        title = "Cómo Memorizar Textos Rápido: El Secreto de los Profesionales";
        description = "¿Pasas horas intentando memorizar guiones para terminar bloqueado frente a la cámara? La clave de los grandes comunicadores no es una memoria sobrehumana, sino el uso inteligente de herramientas como PromptNinja.";
        canonicalUrl = "https://promptninja.solutionkit.com.br/es/como-memorizar-guiones-rapido";
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
            }
        };
        ctaText = "Deja de Memorizar y Empieza a Grabar";
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

            <button
                onClick={onLaunch}
                className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-lg transition transform hover:-translate-y-1"
            >
                {ctaText}
            </button>
        </SeoPageLayout>
    );
};
