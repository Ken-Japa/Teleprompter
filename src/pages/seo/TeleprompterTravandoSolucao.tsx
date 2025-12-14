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
    let title = "Pare de Travar! Teleprompter P2P GRÁTIS: Solução para Texto Congelado";
    let description = "O PromptNinja é a solução P2P GRÁTIS para teleprompter que trava. Entenda por que apps comuns congelam e use o único com rolagem 100% suave e sem lag.";
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
        title = "Stop Freezing! P2P Teleprompter FREE: Solution for Lagging and Frozen Text";
        description = "PromptNinja is the FREE P2P solution for lagging teleprompters. Learn why common apps freeze and use the only one with 100% smooth, zero-lag scrolling.";
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
        title = "¡No Más Congelamientos! Teleprompter P2P GRATIS: Solución Cero Lag";
        description = "PromptNinja es la solución P2P GRATIS para teleprompters congelados. Entiende por qué las apps fallan y usa el único con desplazamiento 100% suave y cero lag.";
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
