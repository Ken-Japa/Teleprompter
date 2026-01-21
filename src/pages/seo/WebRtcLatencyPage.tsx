import React from "react";
import { useTranslation } from "../../hooks/useTranslation";
import { SeoPageLayout } from "./SeoPageLayout";
import { WebRtcLatencyContentPT } from "./content/webrtc-latency/pt";
import { WebRtcLatencyContentEN } from "./content/webrtc-latency/en";
import { WebRtcLatencyContentES } from "./content/webrtc-latency/es";

interface Props {
    onLaunch: () => void;
}

export const WebRtcLatencyPage: React.FC<Props> = ({ onLaunch }) => {
    const { lang } = useTranslation();

    let Content = WebRtcLatencyContentPT;
    let title = lang === "pt" ? "Controle Remoto P2P: Por que o PromptNinja é Mais Rápido" : "WebRTC e P2P em Teleprompters: Tecnologia de Baixa Latência";
    let description = lang === "pt" ? "Descubra como o WebRTC e P2P garantem latência zero no controle remoto do PromptNinja. Compare agora por que somos superiores ao Bluetooth e Wi-Fi comum." : "Entenda a tecnologia por trás do PromptNinja. Usamos WebRTC para garantir rolagem instantânea e sincronizada, superando qualquer app de teleprompter comum.";
    let ctaText = "Testar Tecnologia WebRTC Agora";
    let canonicalUrl = "https://promptninja.solutionkit.com.br/tecnologia-webrtc-baixa-latencia";
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
        Content = WebRtcLatencyContentEN;
        title = "Zero Latency Teleprompter: WebRTC & P2P Technology | PromptNinja";
        description = "No more delays! Discover how PromptNinja uses WebRTC for instant sync between phone and PC, ensuring professional, smooth performance for your presentations.";
        ctaText = "Test WebRTC Technology Now";
        canonicalUrl = "https://promptninja.solutionkit.com.br/en/webrtc-low-latency-technology";
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
        Content = WebRtcLatencyContentES;
        title = "Teleprompter con Latencia Cero: Tecnología WebRTC y P2P";
        description = "¡Elimina el lag! Descubre cómo PromptNinja usa WebRTC para una sincronización instantánea entre móvil y PC. Grabaciones fluidas y sin errores garantizadas.";
        ctaText = "Probar Tecnología WebRTC Ahora";
        canonicalUrl = "https://promptninja.solutionkit.com.br/es/tecnologia-webrtc-baja-latencia";
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

            <div className="mt-12 text-center">
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
