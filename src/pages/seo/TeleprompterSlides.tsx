import React from "react";
import { useTranslation } from "../../hooks/useTranslation";
import { SeoPageLayout } from "./SeoPageLayout";
import { TeleprompterSlidesPT } from "./content/teleprompter-slides/pt";
import { TeleprompterSlidesEN } from "./content/teleprompter-slides/en";
import { TeleprompterSlidesES } from "./content/teleprompter-slides/es";

interface Props {
    onLaunch: () => void;
}

export const TeleprompterSlides: React.FC<Props> = ({ onLaunch }) => {
    const { lang } = useTranslation();

    let Content = TeleprompterSlidesPT;
    let title = "Como Sincronizar Teleprompter com PowerPoint (Comando STOP)";
    let description = "Apresentações perfeitas com slides. Use o comando [STOP] para pausar o teleprompter automaticamente enquanto você muda o slide.";
    let canonicalUrl = "https://promptninja.solutionkit.com.br/teleprompter-sincronizar-powerpoint-slides";
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
    let ctaText = "Sincronizar com Slides";

    if (lang === 'en') {
        Content = TeleprompterSlidesEN;
        title = "Sync Teleprompter with PowerPoint: Master Your Slides | PromptNinja";
        description = "Learn how to synchronize PromptNinja with PowerPoint using the [STOP] command. Perfectly timed presentations without ever losing your place or rhythm.";
        canonicalUrl = "https://promptninja.solutionkit.com.br/en/teleprompter-sync-powerpoint-slides";
        ctaText = "Sync with Slides";
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
        Content = TeleprompterSlidesES;
        title = "Sincroniza Teleprompter con PowerPoint y Slides | PromptNinja";
        description = "Nunca más pierdas el ritmo en tus presentaciones. Con PromptNinja y el comando exclusivo [STOP], puedes sincronizar perfectamente tu guion con tus diapositivas para una exposición magistral.";
        canonicalUrl = "https://promptninja.solutionkit.com.br/es/teleprompter-sincronizar-powerpoint-slides";
        ctaText = "Sincronizar con Slides";
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

            <div className="my-8 p-6 bg-slate-900 rounded-lg border border-slate-800 text-center">
                <button
                    onClick={onLaunch}
                    className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-2xl hover:scale-105 transition transform duration-200"
                >
                    {ctaText}
                </button>
            </div>
        </SeoPageLayout>
    );
};
