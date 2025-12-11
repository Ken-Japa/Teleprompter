
import React from "react";
import { useTranslation } from "../../hooks/useTranslation";
import { SeoPageLayout } from "./SeoPageLayout";
import { TeleprompterIphoneIpadPT } from "./content/teleprompter-iphone-ipad/pt";
import { TeleprompterIphoneIpadEN } from "./content/teleprompter-iphone-ipad/en";
import { TeleprompterIphoneIpadES } from "./content/teleprompter-iphone-ipad/es";

interface Props {
    onLaunch: () => void;
}

export const TeleprompterIphoneIpad: React.FC<Props> = ({ onLaunch }) => {
    const { lang } = useTranslation();

    let Content = TeleprompterIphoneIpadPT;
    let title = "Melhor App Teleprompter para iPhone e iPad (Grátis)";
    let description = "Transforme seu iPhone ou iPad em um teleprompter profissional. Funciona no Safari, sem instalar apps pesados, com controle remoto P2P.";
    let ctaText = "Abrir no iPhone/iPad";
    let canonicalUrl = "https://promptninja.solutionkit.com.br/teleprompter-iphone-ipad";
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
        Content = TeleprompterIphoneIpadEN;
        title = "Best Free Teleprompter App for iPhone and iPad";
        description = "Turn your iPhone or iPad into a professional teleprompter. Works in Safari, no heavy app installs, with P2P remote control.";
        ctaText = "Open on iPhone/iPad";
        canonicalUrl = "https://promptninja.solutionkit.com.br/en/teleprompter-for-iphone-ipad";
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
        Content = TeleprompterIphoneIpadES;
        title = "Mejor App Teleprompter para iPhone y iPad (Gratis)";
        description = "Convierte tu iPhone o iPad en un teleprompter profesional. Funciona en Safari, sin instalar apps pesadas, con control remoto P2P.";
        ctaText = "Abrir en iPhone/iPad";
        canonicalUrl = "https://promptninja.solutionkit.com.br/es/teleprompter-para-iphone-ipad";
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
            ogType="website"
        >
            <Content />

            <div className="text-center mt-10">
                <button
                    onClick={onLaunch}
                    className="bg-gradient-to-r from-slate-700 to-slate-500 hover:from-slate-600 hover:to-slate-400 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-2xl hover:scale-105 transition transform duration-200"
                >
                    {ctaText}
                </button>
            </div>
        </SeoPageLayout>
    );
};
