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
    let title = lang === "pt" ? "PromptNinja: Teleprompter Profissional com Latência ZERO via WebRTC" : "Como o WebRTC Elimina a Latência em Teleprompters";
    let description = lang === "pt" ? "Chega de atrasos! Descubra como o PromptNinja usa a tecnologia WebRTC para sincronização instantânea, garantindo fluidez e performance impecável em suas apresentações, lives e gravações. Experimente agora!" : "Entenda a tecnologia por trás do PromptNinja. Descubra como usamos WebRTC e P2P para garantir rolagem suave e instantânea, superando o Bluetooth.";
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
        title = "PromptNinja: Professional Teleprompter with ZERO Latency via WebRTC";
        description = "No more delays! Discover how PromptNinja uses WebRTC technology for instant synchronization, ensuring smooth and impeccable performance in your presentations.";
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
        title = "Teleprompter con Latencia Cero: La Tecnología WebRTC | PromptNinja";
        description = "Descubre cómo PromptNinja elimina el lag mediante WebRTC y P2P. Sincronización instantánea entre tu móvil y PC para grabaciones fluidas y sin errores.";
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
