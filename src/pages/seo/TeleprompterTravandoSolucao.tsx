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
    let title = "Teleprompter Travando ou Pulando Texto? Veja a Solução";
    let description = "Seu app de teleprompter está travando ou o texto não rola suavemente? Entenda por que isso acontece e como o PromptNinja resolve com P2P.";
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
        title = "Teleprompter Freezing or Skipping Text? See the Solution";
        description = "Is your teleprompter app freezing or the text not scrolling smoothly? Understand why this happens and how PromptNinja solves it with P2P.";
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
                "url": "https://promptninja.solutionkit.com.br"
            }
        };
    } else if (lang === 'es') {
        Content = TeleprompterTravandoSolucaoES;
        title = "¿Teleprompter Congelado o Saltando Texto? Mira la Solución";
        description = "¿Tu app de teleprompter se congela o el texto no se desplaza suavemente? Entiende por qué sucede esto y cómo PromptNinja lo resuelve con P2P.";
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
                "url": "https://promptninja.solutionkit.com.br"
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
