import React from "react";
import { useTranslation } from "../../hooks/useTranslation";
import { SeoPageLayout } from "./SeoPageLayout";
import { TeleprompterTravandoSolucaoPT } from "./content/teleprompter-travando-solucao/pt";
import { TeleprompterTravandoSolucaoEN } from "./content/teleprompter-travando-solucao/en";
import { TeleprompterTravandoSolucaoES } from "./content/teleprompter-travando-solucao/es";

interface Props {
    onLaunch: () => void;
}

export const TeleprompterTravandoSolucao: React.FC<Props> = ({ onLaunch }) => {
    const { lang } = useTranslation();

    let Content = TeleprompterTravandoSolucaoPT;
    let title = "Teleprompter Travando? 🛠️ 5 Soluções para Gravações Perfeitas";
    let description = "Cansado do teleprompter travando? Descubra como resolver problemas de hardware e conexão com a tecnologia GPU do PromptNinja para vídeos 100% fluidos.";
    let ctaText = "Testar Rolagem Suave (Grátis)";
    let canonicalUrl = "https://promptninja.solutionkit.com.br/teleprompter-travando-solucao";
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
        Content = TeleprompterTravandoSolucaoEN;
        title = "Teleprompter Lagging? 🛠️ Fix Freezing and Slow Scrolling Now";
        description = "Stop frames dropping! Learn why teleprompters freeze and how PromptNinja uses GPU acceleration for 100% smooth, zero-lag scrolling performance.";
        ctaText = "Test Smooth Scrolling (Free)";
        canonicalUrl = "https://promptninja.solutionkit.com.br/en/teleprompter-freezing-solution";
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
        Content = TeleprompterTravandoSolucaoES;
        title = "¿Teleprompter Congelado? 🛠️ 5 Soluciones para Videos Fluidos";
        description = "¡No más cortes! Aprende por qué tu teleprompter se traba y cómo PromptNinja usa aceleración por GPU para un desplazamiento 100% suave y sin lag.";
        ctaText = "Probar Desplazamiento Suave (Gratis)";
        canonicalUrl = "https://promptninja.solutionkit.com.br/es/solucion-teleprompter-congelado";
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
