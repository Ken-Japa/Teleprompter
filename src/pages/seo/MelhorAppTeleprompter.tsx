import React from "react";
import { useTranslation } from "../../hooks/useTranslation";
import { SeoPageLayout } from "./SeoPageLayout";
import { MelhorAppTeleprompterPT } from "./content/melhor-app-teleprompter/pt";
import { MelhorAppTeleprompterEN } from "./content/melhor-app-teleprompter/en";
import { MelhorAppTeleprompterES } from "./content/melhor-app-teleprompter/es";

interface Props {
    onLaunch: () => void;
}

export const MelhorAppTeleprompter: React.FC<Props> = ({ onLaunch }) => {
    const { lang } = useTranslation();

    let Content = MelhorAppTeleprompterPT;
    let title = "Pare de Pagar! O Melhor Teleprompter App para Celular e PC é GRÁTIS (2026)";
    let description = "Comparativo final: Descubra o App de Teleprompter GRÁTIS e Online com Latência Zero. Funciona com Controle Remoto (Celular) e Sem Instalação. Veja o ganhador de 2026!";
    let canonicalUrl = "https://promptninja.solutionkit.com.br/melhor-app-teleprompter";
    let ogImage = "https://promptninja.solutionkit.com.br/og-image.webp";
    let schema: object = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": title,
        "datePublished": "2025-01-01",
        "dateModified": new Date().toISOString().split('T')[0],
        "name": title,
        "description": description,
        "url": canonicalUrl,
        "image": ogImage,
        "author": {
            "@type": "Organization",
            "name": "PromptNinja",
            "url": "https://promptninja.solutionkit.com.br"
        },
        "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5",
            "worstRating": "1"
        },
        "mainEntity": {
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "Por que o controle remoto do PromptNinja é melhor?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Utilizamos WebRTC, a mesma tecnologia de videochamadas, para criar uma conexão P2P (ponto-a-ponto) direta entre seus dispositivos na mesma rede Wi-Fi. Isso significa latência quase zero e uma conexão que não depende da velocidade da sua internet, ao contrário do Bluetooth que é suscetível a interferências."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Preciso de algum equipamento especial?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Não! Você só precisa de dois dispositivos com um navegador moderno (como Chrome ou Safari). Pode ser um notebook e um celular, um tablet e um celular, ou qualquer combinação. Sem cabos, sem apps, sem complicações."
                    }
                },
                {
                    "@type": "Question",
                    "name": "A versão gratuita é realmente funcional?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Sim. Acreditamos que o controle remoto é uma função essencial, não um luxo. Por isso, nossa funcionalidade principal é 100% gratuita e sem limite de tempo. Oferecemos uma versão Pro com recursos avançados como reconhecimento de voz, mas o núcleo da ferramenta está disponível para todos."
                    }
                }
            ]
        }
    };
    let ctaText = "Experimentar o Vencedor (Grátis)";

    if (lang === 'en') {
        Content = MelhorAppTeleprompterEN;
        title = "Best Free Teleprompter App: No Install Needed | PromptNinja (2026)";
        description = "Don't download anything. Use the best Free Online Teleprompter. Works on PC, Mobile, and Tablet. Remote control via Wi-Fi and text mirroring. Try it now.";
        canonicalUrl = "https://promptninja.solutionkit.com.br/en/best-teleprompter-app";
        ogImage = "https://promptninja.solutionkit.com.br/og-image.webp";
        schema = {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": title,
            "datePublished": "2025-01-01",
            "dateModified": new Date().toISOString().split('T')[0],
            "name": title,
            "description": description,
            "url": canonicalUrl,
            "image": ogImage,
            "author": {
                "@type": "Organization",
                "name": "PromptNinja",
                "url": "https://promptninja.solutionkit.com.br/?lang=en"
            },
            "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5",
                "bestRating": "5",
                "worstRating": "1"
            },
            "mainEntity": {
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "Why is PromptNinja's remote control better?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "We use WebRTC, the same technology as video calls, to create a direct P2P (peer-to-peer) connection between your devices on the same Wi-Fi network. This means near-zero latency and a connection that doesn't depend on your internet speed, unlike Bluetooth which is susceptible to interference."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Do I need any special equipment?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "No! You just need two devices with a modern browser (like Chrome or Safari). It can be a laptop and a phone, a tablet and a phone, or any combination. No cables, no apps, no hassle."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Is the free version really functional?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes. We believe that remote control is an essential feature, not a luxury. That's why our core functionality is 100% free and with no time limit. We offer a Pro version with advanced features like voice recognition, but the core tool is available to everyone."
                        }
                    }
                ]
            }
        };
        ctaText = "Try the Winner (Free)";
    } else if (lang === 'es') {
        Content = MelhorAppTeleprompterES;
        title = "Mejor App de Teleprompter Gratis: Sin Instalación | PromptNinja (2026)";
        description = "No descargues nada. Usa el mejor Teleprompter Gratis y Online. Funciona en PC, Móvil y Tablet. Control remoto vía Wi-Fi y modo espejo. Pruébalo ahora.";
        canonicalUrl = "https://promptninja.solutionkit.com.br/es/mejor-app-teleprompter";
        ogImage = "https://promptninja.solutionkit.com.br/og-image.webp";
        schema = {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": title,
            "datePublished": "2025-01-01",
            "dateModified": new Date().toISOString().split('T')[0],
            "name": title,
            "description": description,
            "url": canonicalUrl,
            "image": ogImage,
            "author": {
                "@type": "Organization",
                "name": "PromptNinja",
                "url": "https://promptninja.solutionkit.com.br/?lang=es"
            },
            "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5",
                "bestRating": "5",
                "worstRating": "1"
            },
            "mainEntity": {
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "¿Necesito instalar algo para usar PromptNinja?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Absolutamente no. PromptNinja funciona directamente en tu navegador (Chrome, Safari, Firefox) en cualquier dispositivo: PC, Mac, tablet o smartphone. Sin descargas, sin instalaciones."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "¿El control remoto es realmente gratis?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Sí. El control remoto es una de nuestras funciones principales y es 100% gratuito. Usamos tecnología P2P (Peer-to-Peer) a través de un código QR. Simplemente escanea el código con tu teléfono para convertirlo instantáneamente en un control remoto para la pantalla de tu PC o tablet. Es rápido, seguro y no depende de Bluetooth."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "¿Funciona si mi Wi-Fi es lento?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Sí. La conexión P2P para el control remoto se establece en tu red local (Wi-Fi). No depende de la velocidad de tu internet, solo de que ambos dispositivos estén en la misma red. Esto garantiza una respuesta instantánea y sin demoras."
                        }
                    }
                ]
            }
        };
        ctaText = "Probar el Ganador (Gratis)";
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

            <div className="text-center mt-8">
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
