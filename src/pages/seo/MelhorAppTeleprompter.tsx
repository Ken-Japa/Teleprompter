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
    let title = "Melhor App de Teleprompter para Celular e PC (2026)";
    let description = "Comparativo dos melhores aplicativos de teleprompter. Descubra qual é o melhor app grátis, com controle remoto e espelhamento.";
    let canonicalUrl = "https://promptninja.solutionkit.com.br/melhor-app-teleprompter";
    let ogImage = "https://promptninja.solutionkit.com.br/og-image.webp";
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
    let ctaText = "Experimentar o Vencedor (Grátis)";

    if (lang === 'en') {
        Content = MelhorAppTeleprompterEN;
        title = "Best Teleprompter App for Mobile and PC (2026)";
        description = "Comparison of the best teleprompter apps. Discover which is the best free app, with remote control and mirroring.";
        canonicalUrl = "https://promptninja.solutionkit.com.br/en/best-teleprompter-app";
        ogImage = "https://promptninja.solutionkit.com.br/og-image.webp";
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
        ctaText = "Try the Winner (Free)";
    } else if (lang === 'es') {
        Content = MelhorAppTeleprompterES;
        title = "Mejor App de Teleprompter para Móvil y PC (2026)";
        description = "Comparativa de las mejores apps de teleprompter. Descubre cuál es la mejor app gratis, con control remoto y modo espejo.";
        canonicalUrl = "https://promptninja.solutionkit.com.br/es/mejor-app-teleprompter";
        ogImage = "https://promptninja.solutionkit.com.br/og-image.webp";
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
