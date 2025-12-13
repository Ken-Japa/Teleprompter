
import React from "react";
import { useTranslation } from "../../hooks/useTranslation";
import { SeoPageLayout } from "./SeoPageLayout";
import { TeleprompterWebVsHardwarePT } from "./content/teleprompter-web-vs-hardware/pt";
import { TeleprompterWebVsHardwareEN } from "./content/teleprompter-web-vs-hardware/en";
import { TeleprompterWebVsHardwareES } from "./content/teleprompter-web-vs-hardware/es";

interface Props {
    onLaunch: () => void;
}

export const TeleprompterWebVsHardware: React.FC<Props> = ({ onLaunch }) => {
    const { lang } = useTranslation();

    let Content = TeleprompterWebVsHardwarePT;
    let title = "Teleprompter Online vs Hardware: Comparativo 2024";
    let description = "Vale a pena comprar um teleprompter físico? Veja o comparativo de custo-benefício entre o PromptNinja (Web App) e equipamentos como Ulanzi e SmallRig.";
    let ctaText = "Começar Grátis com PromptNinja";
    let canonicalUrl = "https://promptninja.solutionkit.com.br/teleprompter-web-vs-hardware";
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
        Content = TeleprompterWebVsHardwareEN;
        title = "Online Teleprompter vs Hardware: 2024 Comparison";
        description = "Is it worth buying a physical teleprompter? Compare cost-benefit between PromptNinja (Web App) and gear like Ulanzi and SmallRig.";
        ctaText = "Start Free with PromptNinja";
        canonicalUrl = "https://promptninja.solutionkit.com.br/en/teleprompter-web-vs-hardware-comparison";
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
        Content = TeleprompterWebVsHardwareES;
        title = "Teleprompter Online vs Hardware: Comparativa 2024";
        description = "¿Vale la pena comprar un teleprompter físico? Mira la comparativa de calidad-precio entre PromptNinja (Web App) y equipos como Ulanzi y SmallRig.";
        ctaText = "Empezar Gratis con PromptNinja";
        canonicalUrl = "https://promptninja.solutionkit.com.br/es/comparativa-teleprompter-web-vs-hardware";
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
            ogType="website"
        >
            <Content />

            <div className="text-center mt-10">
                <button
                    onClick={onLaunch}
                    className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-2xl hover:scale-105 transition transform duration-200"
                >
                    {ctaText}
                </button>
            </div>
        </SeoPageLayout>
    );
};
