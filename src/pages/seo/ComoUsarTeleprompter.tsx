import React from "react";
import { useTranslation } from "../../hooks/useTranslation";
import { SeoPageLayout } from "./SeoPageLayout";
import { ComoUsarTeleprompterPT } from "./content/como-usar-teleprompter/pt";
import { ComoUsarTeleprompterEN } from "./content/como-usar-teleprompter/en";
import { ComoUsarTeleprompterES } from "./content/como-usar-teleprompter/es";

interface Props {
    onLaunch: () => void;
}

export const ComoUsarTeleprompter: React.FC<Props> = ({ onLaunch }) => {
    const { lang } = useTranslation();

    let Content = ComoUsarTeleprompterPT;
    let title = "Como Usar Teleprompter no Celular: Guia Completo";
    let description = "Aprenda como usar seu celular como teleprompter ou como controle remoto. Tutorial passo a passo para gravar vídeos profissionais.";
    let canonicalUrl = "https://promptninja.solutionkit.com.br/como-usar-teleprompter-celular";
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
    let ctaText = "Testar o PromptNinja Agora";

    if (lang === 'en') {
        Content = ComoUsarTeleprompterEN;
        title = "How to Use Teleprompter on Mobile: Complete Guide";
        description = "Learn how to use your phone as a teleprompter or remote control. Step-by-step tutorial to record professional videos.";
        canonicalUrl = "https://promptninja.solutionkit.com.br/en/how-to-use-teleprompter-mobile";
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
                "url": "https://promptninja.solutionkit.com.br/?lang=en"
            }
        };
        ctaText = "Test PromptNinja Now";
    } else if (lang === 'es') {
        Content = ComoUsarTeleprompterES;
        title = "Cómo Usar Teleprompter en el Móvil: Guía Completa";
        description = "Aprende a usar tu móvil como teleprompter o control remoto. Tutorial paso a paso para grabar videos profesionales.";
        canonicalUrl = "https://promptninja.solutionkit.com.br/es/como-usar-teleprompter-movil";
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
                "url": "https://promptninja.solutionkit.com.br/?lang=es"
            }
        };
        ctaText = "Probar PromptNinja Ahora";
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

            <div className="mt-10 text-center">
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
