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
    let title = "Teleprompter Online Grátis - Funciona no Navegador";
    let description = "Procurando um teleprompter online grátis? O PromptNinja funciona direto no seu navegador, sem baixar nada. Controle pelo celular via Wi-Fi.";
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
        title = "Free Online Teleprompter - Works in Browser";
        description = "Looking for a free online teleprompter? PromptNinja works directly in your browser, no download needed. Control via mobile over Wi-Fi.";
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
                "url": "https://promptninja.solutionkit.com.br"
            }
        };
        ctaText = "Open Free Teleprompter";
    } else if (lang === 'es') {
        Content = TeleprompterOnlineGratisES;
        title = "Teleprompter Online Gratis - Funciona en el Navegador";
        description = "¿Buscas un teleprompter online gratis? PromptNinja funciona directo en tu navegador, sin descargar nada. Controla desde el móvil vía Wi-Fi.";
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
                "url": "https://promptninja.solutionkit.com.br"
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
