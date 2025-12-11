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
    let title = "Como Montar um Teleprompter Caseiro (DIY) Barato";
    let description = "Aprenda a fazer um teleprompter caseiro com vidro e caixa de papelão. E use o PromptNinja como software gratuito para espelhar o texto.";
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
        title = "How to Make a Cheap Homemade Teleprompter (DIY)";
        description = "Learn how to make a homemade teleprompter with glass and cardboard box. And use PromptNinja as free software to mirror the text.";
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
                "url": "https://promptninja.solutionkit.com.br"
            }
        };
    } else if (lang === 'es') {
        Content = TeleprompterCaseiroDIYES;
        title = "Cómo Montar un Teleprompter Casero (DIY) Barato";
        description = "Aprende a hacer un teleprompter casero con vidrio y caja de cartón. Y usa PromptNinja como software gratuito para espejar el texto.";
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
