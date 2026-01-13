import React from "react";
import { useTranslation } from "../../hooks/useTranslation";
import { SeoPageLayout } from "./SeoPageLayout";
import { ComoInstalarPwaPT } from "./content/como-instalar-pwa/pt";
import { ComoInstalarPwaEN } from "./content/como-instalar-pwa/en";
import { ComoInstalarPwaES } from "./content/como-instalar-pwa/es";

interface Props {
    onLaunch: () => void;
}

export const ComoInstalarPwa: React.FC<Props> = ({ onLaunch }) => {
    const { lang } = useTranslation();

    let Content = ComoInstalarPwaPT;
    let title = "Como Instalar o Teleprompter PromptNinja no iPhone e Android";
    let description = "Aprenda a instalar o PromptNinja como um aplicativo nativo no seu iPhone ou Android. Melhor performance, funcionamento offline e sem ocupar memória. Guia passo a passo.";
    let canonicalUrl = "https://promptninja.solutionkit.com.br/como-instalar-app-teleprompter-pwa";
    let ogImage = "https://promptninja.solutionkit.com.br/og-image.webp";
    let schema: object = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": title,
        "description": description,
        "step": [
            {
                "@type": "HowToStep",
                "name": "Abrir no Navegador",
                "text": "Abra o PromptNinja no Safari (iOS) ou Chrome (Android)."
            },
            {
                "@type": "HowToStep",
                "name": "Adicionar à Tela de Início",
                "text": "Use a opção 'Adicionar à Tela de Início' no menu de compartilhamento ou configurações."
            }
        ]
    };
    let ctaText = "Abrir Teleprompter Agora";

    if (lang === 'en') {
        Content = ComoInstalarPwaEN;
        title = "How to Install the PromptNinja (PWA) - iPhone and Android";
        description = "Learn how to install PromptNinja as a native app on your iPhone or Android. Enjoy better performance, offline mode, and a professional full-screen experience.";
        canonicalUrl = "https://promptninja.solutionkit.com.br/en/how-to-install-teleprompter-app-pwa";
        ctaText = "Open Teleprompter Now";
    } else if (lang === 'es') {
        Content = ComoInstalarPwaES;
        title = "Cómo Instalar PromptNinja (PWA) en iPhone y Android | Guía Fácil";
        description = "Aprende a instalar PromptNinja como una app nativa en tu móvil. Disfruta de mejor rendimiento, modo offline y pantalla completa sin ocupar memoria.";
        canonicalUrl = "https://promptninja.solutionkit.com.br/es/como-instalar-app-teleprompter-pwa";
        ctaText = "Abrir Teleprompter Ahora";
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
