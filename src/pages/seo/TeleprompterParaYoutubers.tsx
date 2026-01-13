import React from "react";
import { useTranslation } from "../../hooks/useTranslation";
import { SeoPageLayout } from "./SeoPageLayout";
import { TeleprompterParaYoutubersPT } from "./content/teleprompter-para-youtubers/pt";
import { TeleprompterParaYoutubersEN } from "./content/teleprompter-para-youtubers/en";
import { TeleprompterParaYoutubersES } from "./content/teleprompter-para-youtubers/es";

interface Props {
    onLaunch: () => void;
}

export const TeleprompterParaYoutubers: React.FC<Props> = ({ onLaunch }) => {
    const { lang } = useTranslation();

    let Content = TeleprompterParaYoutubersPT;
    let title = "Teleprompter para Youtubers & Criadores | Grave Sem Erros com PromptNinja";
    let description = "Domine suas câmeras, grave vídeos impecáveis e impulsione seu canal. Descubra como youtubers e criadores de conteúdo usam PromptNinja para transformar suas produções de forma simples.";
    let ctaText = "Começar a Gravar Agora";
    let canonicalUrl = "https://promptninja.solutionkit.com.br/teleprompter-para-youtubers-e-criadores";
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
        Content = TeleprompterParaYoutubersEN;
        title = "Best Teleprompter for YouTubers: Record 2x Faster | PromptNinja";
        description = "Stop memorizing scripts. Use PromptNinja's teleprompter for YouTubers to record videos without cuts, with eye contact, and professional look. Try for free.";
        ctaText = "Start Recording Now";
        canonicalUrl = "https://promptninja.solutionkit.com.br/en/teleprompter-for-youtubers-creators";
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
        Content = TeleprompterParaYoutubersES;
        title = "Mejor Teleprompter para YouTubers: Graba 2x Más Rápido | PromptNinja";
        description = "Deja de memorizar guiones. Usa el teleprompter para YouTubers de PromptNinja para grabar videos sin cortes, con contacto visual y look profesional. Pruébalo gratis.";
        ctaText = "Empezar a Grabar Ahora";
        canonicalUrl = "https://promptninja.solutionkit.com.br/es/teleprompter-para-youtubers-creadores";
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
