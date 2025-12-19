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
    let title = "Melhor Teleprompter para YouTubers: Grave 2x Mais Rápido | PromptNinja";
    let description = "Pare de decorar textos. Use o teleprompter para YouTubers do PromptNinja para gravar vídeos sem cortes, com contato visual e aparência profissional. Teste grátis.";
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
        },
        "mainEntity": {
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "As pessoas vão perceber que estou lendo?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Não, se usado corretamente. O segredo é posicionar a tela do teleprompter o mais próximo possível da lente da câmera. Com o PromptNinja, você pode ajustar o tamanho da fonte e as margens para que seus olhos se movam minimamente, tornando a leitura imperceptível."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Preciso de um equipamento de teleprompter caro?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Não! Você pode começar usando um notebook, tablet ou até mesmo um segundo monitor posicionado acima ou abaixo da sua câmera. Se mais tarde você investir em um hardware de teleprompter (com vidro espelhado), o PromptNinja tem um Modo Espelho gratuito que inverte o texto para você."
                    }
                },
                {
                    "@type": "Question",
                    "name": "O controle remoto funciona em qualquer celular?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Sim. O controle remoto funciona em qualquer smartphone (iPhone ou Android) com uma câmera e um navegador de internet. A conexão é via WebRTC (P2P), o que a torna instantânea e não exige que os dispositivos estejam na mesma rede Wi-Fi."
                    }
                }
            ]
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
            },
            "mainEntity": {
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "Will people notice I'm reading?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Not if used correctly. The secret is to position the teleprompter screen as close to the camera lens as possible. With PromptNinja, you can adjust the font size and margins so your eye movement is minimal, making the reading unnoticeable."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Do I need expensive teleprompter hardware?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "No! You can start by using a laptop, tablet, or even a second monitor positioned above or below your camera. If you later invest in teleprompter hardware (with mirrored glass), PromptNinja has a free Mirror Mode that flips the text for you."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Does the remote work on any phone?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Yes. The remote control works on any smartphone (iPhone or Android) with a camera and an internet browser. The connection is via WebRTC (P2P), which makes it instantaneous and doesn't require the devices to be on the same Wi-Fi network."
                        }
                    }
                ]
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
            },
            "mainEntity": {
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "¿La gente notará que estoy leyendo?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "No, si se usa correctamente. El secreto es colocar la pantalla del teleprompter lo más cerca posible de la lente de la cámara. Con PromptNinja, puedes ajustar el tamaño de la fuente y los márgenes para que tus ojos se muevan mínimamente, haciendo que la lectura sea imperceptible."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "¿Necesito un equipo de teleprompter caro?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "¡No! Puedes empezar usando un portátil, una tablet o incluso un segundo monitor colocado encima o debajo de tu cámara. Si más adelante inviertes en hardware de teleprompter (con cristal de espejo), PromptNinja tiene un Modo Espejo gratuito que invierte el texto por ti."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "¿El control remoto funciona en cualquier móvil?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Sí. El control remoto funciona en cualquier smartphone (iPhone o Android) con una cámara y un navegador de internet. La conexión es a través de WebRTC (P2P), lo que la hace instantánea y no requiere que los dispositivos estén en la misma red Wi-Fi."
                        }
                    }
                ]
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
