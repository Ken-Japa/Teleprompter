import React from "react";
import { useTranslation } from "../../hooks/useTranslation";
import { SeoPageLayout } from "./SeoPageLayout";
import { TeleprompterCaseiroDIYPT } from "./content/teleprompter-caseiro-diy/pt";
import { TeleprompterCaseiroDIYEN } from "./content/teleprompter-caseiro-diy/en";
import { TeleprompterCaseiroDIYES } from "./content/teleprompter-caseiro-diy/es";

interface Props {
    onLaunch: () => void;
}

export const TeleprompterCaseiroDIY: React.FC<Props> = ({ onLaunch }) => {
    const { lang } = useTranslation();

    let Content = TeleprompterCaseiroDIYPT;
    let title = "Como Fazer um Teleprompter Caseiro (DIY): Guia Completo + Software GRÁTIS";
    let description = "Aprenda como fazer um teleprompter caseiro profissional gastando pouco. Guia passo a passo com lista de materiais. Inclui software de teleprompter online grátis com modo espelho.";
    let ctaText = "Abrir Modo Espelho Agora";
    let canonicalUrl = "https://promptninja.solutionkit.com.br/teleprompter-caseiro-diy";
    const ogImage = "https://promptninja.solutionkit.com.br/og-image.webp";

    // PT Schema
    let schema: object = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebPage",
                "name": title,
                "description": description,
                "url": canonicalUrl,
                "image": ogImage,
                "inLanguage": "pt-BR",
                "publisher": {
                    "@type": "Organization",
                    "name": "PromptNinja",
                    "url": "https://promptninja.solutionkit.com.br"
                }
            },
            {
                "@type": "HowTo",
                "name": "Como Fazer um Teleprompter Caseiro",
                "description": "Monte um teleprompter profissional em casa gastando menos de R$ 50 usando materiais simples.",
                "image": ogImage,
                "totalTime": "PT30M",
                "supply": [
                    { "@type": "HowToSupply", "name": "Vidro ou Acrílico" },
                    { "@type": "HowToSupply", "name": "Caixa de Papelão ou Madeira" },
                    { "@type": "HowToSupply", "name": "Fita Adesiva" }
                ],
                "tool": [
                    { "@type": "HowToTool", "name": "Tesoura ou Estilete" },
                    { "@type": "HowToTool", "name": "Tablet ou Celular" }
                ],
                "step": [
                    {
                        "@type": "HowToStep",
                        "name": "Preparar a Base",
                        "text": "Corte a caixa de papelão para criar a estrutura que sustentará o vidro e o tablet.",
                        "url": canonicalUrl + "#passo-1"
                    },
                    {
                        "@type": "HowToStep",
                        "name": "Posicionar o Vidro",
                        "text": "Fixe o vidro em um ângulo de 45 graus em relação à lente da câmera.",
                        "url": canonicalUrl + "#passo-2"
                    },
                    {
                        "@type": "HowToStep",
                        "name": "Configurar o Software",
                        "text": "Acesse o PromptNinja no seu tablet, cole seu texto e ative o Modo Espelho.",
                        "url": canonicalUrl + "#passo-5"
                    }
                ]
            },
            {
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "Preciso de um vidro especial para teleprompter?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Não. Um vidro de porta-retrato comum funciona bem para projetos caseiros. O vidro profissional 'beam splitter' é melhor, mas muito mais caro."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Como espelhar o texto no teleprompter?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Use um software como o PromptNinja, que possui uma função 'Modo Espelho' gratuita que inverte o texto para reflexão correta."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": "Posso usar o celular como teleprompter?",
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Sim, qualquer celular com navegador funciona. Basta acessar o site do PromptNinja e usar."
                        }
                    }
                ]
            }
        ]
    };

    if (lang === 'en') {
        Content = TeleprompterCaseiroDIYEN;
        title = "DIY Homemade Teleprompter Guide + FREE Mirror Mode Software 🔄";
        description = "Learn how to build a professional DIY teleprompter at home on a budget. Step-by-step guide with materials list. Includes free online teleprompter software with mirror mode.";
        ctaText = "Open Mirror Mode Now";
        canonicalUrl = "https://promptninja.solutionkit.com.br/en/diy-homemade-teleprompter";

        // EN Schema
        schema = {
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": "WebPage",
                    "name": title,
                    "description": description,
                    "url": canonicalUrl,
                    "image": ogImage,
                    "inLanguage": "en-US",
                    "publisher": {
                        "@type": "Organization",
                        "name": "PromptNinja",
                        "url": "https://promptninja.solutionkit.com.br/?lang=en"
                    }
                },
                {
                    "@type": "HowTo",
                    "name": "How to Make a DIY Teleprompter",
                    "description": "Build a professional teleprompter at home for under $15 using simple materials.",
                    "image": ogImage,
                    "totalTime": "PT30M",
                    "supply": [
                        { "@type": "HowToSupply", "name": "Glass or Acrylic" },
                        { "@type": "HowToSupply", "name": "Cardboard Box or Wood" },
                        { "@type": "HowToSupply", "name": "Tape" }
                    ],
                    "tool": [
                        { "@type": "HowToTool", "name": "Scissors or Cutter" },
                        { "@type": "HowToTool", "name": "Tablet or Phone" }
                    ],
                    "step": [
                        {
                            "@type": "HowToStep",
                            "name": "Prepare the Base",
                            "text": "Cut the cardboard box to create the structure that will hold the glass and tablet.",
                            "url": canonicalUrl + "#step-1"
                        },
                        {
                            "@type": "HowToStep",
                            "name": "Position the Glass",
                            "text": "Fix the glass at a 45-degree angle relative to the camera lens.",
                            "url": canonicalUrl + "#step-2"
                        },
                        {
                            "@type": "HowToStep",
                            "name": "Setup Software",
                            "text": "Open PromptNinja on your tablet, paste your script and enable Mirror Mode.",
                            "url": canonicalUrl + "#step-5"
                        }
                    ]
                },
                {
                    "@type": "FAQPage",
                    "mainEntity": [
                        {
                            "@type": "Question",
                            "name": "Why does the text look backwards on my DIY teleprompter?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "This happens because of the physical reflection on the glass. To fix this, use PromptNinja and toggle 'Mirror Mode', which horizontally flips the text so it's readable in the reflection."
                            }
                        },
                        {
                            "@type": "Question",
                            "name": "Do I need special glass for a teleprompter?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "No. Ordinary picture frame glass works well for DIY projects. Professional 'beam splitter' glass is better but much more expensive."
                            }
                        },
                        {
                            "@type": "Question",
                            "name": "How do I mirror text for teleprompter?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "Use software like PromptNinja, which has a free 'Mirror Mode' feature that flips text for correct reflection."
                            }
                        },
                        {
                            "@type": "Question",
                            "name": "Can I use my phone as a teleprompter?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "Yes, any phone with a browser works. Just access the PromptNinja website and use it."
                            }
                        }
                    ]
                }
            ]
        };
    } else if (lang === 'es') {
        Content = TeleprompterCaseiroDIYES;
        title = "Teleprompter Casero: Guía DIY + Software con Modo Espejo GRATIS 🔄";
        description = "Aprende a construir un teleprompter casero profesional con poco dinero. Guía paso a paso. Incluye software de teleprompter online gratis con modo espejo.";
        ctaText = "Abrir Modo Espejo Ahora";
        canonicalUrl = "https://promptninja.solutionkit.com.br/es/teleprompter-casero-diy";

        // ES Schema
        schema = {
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": "WebPage",
                    "name": title,
                    "description": description,
                    "url": canonicalUrl,
                    "image": ogImage,
                    "inLanguage": "es-ES",
                    "publisher": {
                        "@type": "Organization",
                        "name": "PromptNinja",
                        "url": "https://promptninja.solutionkit.com.br/?lang=es"
                    }
                },
                {
                    "@type": "HowTo",
                    "name": "Cómo Hacer un Teleprompter Casero",
                    "description": "Monta un teleprompter profesional en casa por menos de $15 USD usando materiales simples.",
                    "image": ogImage,
                    "totalTime": "PT30M",
                    "supply": [
                        { "@type": "HowToSupply", "name": "Vidrio o Acrílico" },
                        { "@type": "HowToSupply", "name": "Caja de Cartón o Madera" },
                        { "@type": "HowToSupply", "name": "Cinta Adhesiva" }
                    ],
                    "tool": [
                        { "@type": "HowToTool", "name": "Tijeras o Cúter" },
                        { "@type": "HowToTool", "name": "Tablet o Móvil" }
                    ],
                    "step": [
                        {
                            "@type": "HowToStep",
                            "name": "Preparar la Base",
                            "text": "Corta la caja de cartón para crear la estructura que sostendrá el vidrio y la tablet.",
                            "url": canonicalUrl + "#paso-1"
                        },
                        {
                            "@type": "HowToStep",
                            "name": "Posicionar el Vidrio",
                            "text": "Fija el vidrio en un ángulo de 45 grados con respecto a la lente de la cámara.",
                            "url": canonicalUrl + "#paso-2"
                        },
                        {
                            "@type": "HowToStep",
                            "name": "Configurar el Software",
                            "text": "Abre PromptNinja en tu tablet, pega tu guion y activa el Modo Espejo.",
                            "url": canonicalUrl + "#paso-5"
                        }
                    ]
                },
                {
                    "@type": "FAQPage",
                    "mainEntity": [
                        {
                            "@type": "Question",
                            "name": "¿Por qué el texto se ve al revés en mi teleprompter casero?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "Esto sucede por la reflexión física en el vidrio. Para solucionarlo, usa PromptNinja y activa el botón de 'Modo Espejo', que invierte el texto horizontalmente para que sea legible en el reflejo."
                            }
                        },
                        {
                            "@type": "Question",
                            "name": "¿Necesito un vidrio especial para teleprompter?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "No. Un vidrio de marco de fotos común funciona bien para proyectos caseros. Los vidrios profesionales 'beam splitter' son mejores pero mucho más caros."
                            }
                        },
                        {
                            "@type": "Question",
                            "name": "¿Cómo poner el texto espejo en teleprompter?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "Usa un software como PromptNinja, que tiene una función gratuita de 'Modo Espejo' que invierte el texto para el reflejo correcto."
                            }
                        },
                        {
                            "@type": "Question",
                            "name": "¿Puedo usar mi móvil como teleprompter?",
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": "Sí, cualquier móvil con navegador funciona. Solo accede al sitio de PromptNinja."
                            }
                        }
                    ]
                }
            ]
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
