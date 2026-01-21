import React from "react";
import { useTranslation } from "../../hooks/useTranslation";
import { SeoPageLayout } from "./SeoPageLayout";
import { TeleprompterOnlineGratisPT } from "./content/teleprompter-online-gratis/pt";
import { TeleprompterOnlineGratisEN } from "./content/teleprompter-online-gratis/en";
import { TeleprompterOnlineGratisES } from "./content/teleprompter-online-gratis/es";

interface Props {
    onLaunch: () => void;
}

export const TeleprompterOnlineGratis: React.FC<Props> = ({ onLaunch }) => {
    const { lang } = useTranslation();

    let Content = TeleprompterOnlineGratisPT;
    let title = "Teleprompter Online GRÁTIS: Controle por Voz e Câmera | PromptNinja";
    let description = "Chega de esquecer falas! Use o PromptNinja Teleprompter Online GRÁTIS para vídeos e apresentações. Controle a rolagem com sua voz e grave direto com sua câmera. Experimente fácil e sem cadastro!";
    let canonicalUrl = "https://promptninja.solutionkit.com.br/teleprompter-online-gratis";
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
    let ctaText = "Abrir Teleprompter Grátis";

    if (lang === 'en') {
        Content = TeleprompterOnlineGratisEN;
        title = "Free Online Teleprompter | Use PromptNinja Instantly for Perfect Videos";
        description = "Create professional videos and presentations with PromptNinja's free online teleprompter. Use without registration, directly in your browser! Ideal for YouTubers, Musicians, and Speakers. Start now!";
        canonicalUrl = "https://promptninja.solutionkit.com.br/en/free-online-teleprompter";
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
        ctaText = "Open Free Teleprompter";
    } else if (lang === 'es') {
        Content = TeleprompterOnlineGratisES;
        title = "Teleprompter Online Gratis: Graba Vídeos Profesionales sin Errores";
        description = "Deja de perder horas regrabando vídeos. Usa PromptNinja, el teleprompter online gratuito que funciona directamente en tu navegador. Sin instalaciones, sin registros y con control remoto P2P de latencia cero.";
        canonicalUrl = "https://promptninja.solutionkit.com.br/es/teleprompter-online-gratis";
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
        ctaText = "Abrir Teleprompter Gratis";
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
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-2xl hover:scale-105 transition transform duration-200"
                >
                    {ctaText}
                </button>
            </div>
        </SeoPageLayout>
    );
};
