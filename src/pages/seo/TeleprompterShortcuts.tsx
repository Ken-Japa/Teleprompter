import React from "react";
import { useTranslation } from "../../hooks/useTranslation";
import { SeoPageLayout } from "./SeoPageLayout";
import { TeleprompterShortcutsPT } from "./content/teleprompter-shortcuts/pt";
import { TeleprompterShortcutsEN } from "./content/teleprompter-shortcuts/en";
import { TeleprompterShortcutsES } from "./content/teleprompter-shortcuts/es";

interface Props {
    onLaunch: () => void;
}

export const TeleprompterShortcuts: React.FC<Props> = ({ onLaunch }) => {
    const { lang } = useTranslation();

    let Content = TeleprompterShortcutsPT;
    let title = "Atalhos de Teclado para Teleprompter: Guia de Produtividade";
    let description = "Domine o PromptNinja com atalhos de teclado inteligentes. Controle velocidade, tamanho de fonte e rolagem sem usar o mouse. Compatível com pedais e Stream Deck.";
    let canonicalUrl = "https://promptninja.solutionkit.com.br/teleprompter-com-atalhos-de-teclado";
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
    let ctaText = "Testar Atalhos Agora";

    if (lang === 'en') {
        Content = TeleprompterShortcutsEN;
        title = "Teleprompter with Keyboard Shortcuts & Gamer Mode (No HUD)";
        description = "Boost productivity with keyboard shortcuts. Control the teleprompter without a mouse, compatible with pedals and Stream Deck.";
        canonicalUrl = "https://promptninja.solutionkit.com.br/en/teleprompter-keyboard-shortcuts";
        ctaText = "Try Shortcuts Now";
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
        Content = TeleprompterShortcutsES;
        title = "Teleprompter con Atajos de Teclado y Modo Gamer (Sin HUD)";
        description = "Aumenta tu productividad con atajos de teclado. Controla el teleprompter sin ratón, compatible con pedales y Stream Deck.";
        canonicalUrl = "https://promptninja.solutionkit.com.br/es/teleprompter-atajos-teclado";
        ctaText = "Probar Atajos Ahora";
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
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-2xl hover:scale-105 transition transform duration-200"
                >
                    {ctaText}
                </button>
            </div>
        </SeoPageLayout>
    );
};
