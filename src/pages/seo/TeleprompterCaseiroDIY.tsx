import React from "react";
import { useTranslation } from "../../hooks/useTranslation";
import { SeoPageLayout } from "./SeoPageLayout";
import { TeleprompterCaseiroDIYPT } from "./content/teleprompter-caseiro-diy/pt";
import { TeleprompterCaseiroDIYEN } from "./content/teleprompter-caseiro-diy/en";
import { TeleprompterCaseiroDIYES } from "./content/teleprompter-caseiro-diy/es";

interface Props {
    onLaunch: () => void;
}

export const TeleprompterCaseiroDIY: React.FC<Props> = ({ onLaunch }) => {
    const { lang } = useTranslation();

    let Content = TeleprompterCaseiroDIYPT;
    let title = "Teleprompter Caseiro (DIY) Barato + Software GRÁTIS";
    let description = "Guia DIY completo para montar seu teleprompter caseiro. Use nosso software GRÁTIS, P2P e sem travamentos para espelhar o texto do seu roteiro com perfeição.";
    let ctaText = "Abrir Modo Espelho Agora";
    let canonicalUrl = "https://promptninja.solutionkit.com.br/teleprompter-caseiro-diy";
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
        Content = TeleprompterCaseiroDIYEN;
        title = "Cheap Homemade Teleprompter DIY + FREE Software";
        description = "Complete DIY guide to build your homemade teleprompter. Use our FREE, P2P, zero-lag software for perfect text mirroring and remote control.";
        ctaText = "Open Mirror Mode Now";
        canonicalUrl = "https://promptninja.solutionkit.com.br/en/diy-homemade-teleprompter";
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
        Content = TeleprompterCaseiroDIYES;
        title = "Teleprompter Casero (DIY) Barato + Software GRATIS";
        description = "Guía DIY completa para armar tu teleprompter casero. Usa nuestro software GRATIS, P2P y sin lag para espejar el texto de tu guion con perfección.";
        ctaText = "Abrir Modo Espejo Ahora";
        canonicalUrl = "https://promptninja.solutionkit.com.br/es/teleprompter-casero-diy";
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
