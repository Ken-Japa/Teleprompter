import React from "react";
import { useTranslation } from "../../hooks/useTranslation";
import { SeoPageLayout } from "./SeoPageLayout";
import { TeleprompterOQueEPT } from "./content/teleprompter-o-que-e/pt";
import { TeleprompterOQueEEN } from "./content/teleprompter-o-que-e/en";
import { TeleprompterOQueEES } from "./content/teleprompter-o-que-e/es";

interface Props {
    onLaunch: () => void;
}

export const TeleprompterOQueE: React.FC<Props> = ({ onLaunch }) => {
    const { lang } = useTranslation();

    let Content = TeleprompterOQueEPT;
    let title = "Teleprompter: O Que É, Como Funciona e Benefícios";
    let description = "Descubra o que é um teleprompter, como ele funciona e por que o PromptNinja é a melhor opção online grátis para seus vídeos.";
    let canonicalUrl = "https://promptninja.solutionkit.com.br/teleprompter-o-que-e";
    let ogImage = "https://promptninja.solutionkit.com.br/og-image.webp";
    let schema: object = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": title,
        "description": description,
        "image": ogImage,
        "author": {
            "@type": "Organization",
            "name": "PromptNinja",
            "url": "https://promptninja.solutionkit.com.br"
        },
        "publisher": {
            "@type": "Organization",
            "name": "PromptNinja",
            "logo": {
                "@type": "ImageObject",
                "url": "https://promptninja.solutionkit.com.br/icons/icon-512x512.png"
            }
        }
    };
    let ctaText = "Usar Teleprompter Grátis";

    if (lang === 'en') {
        Content = TeleprompterOQueEEN;
        title = "Teleprompter: What It Is, How It Works & Benefits";
        description = "Discover what a teleprompter is, how it works, and why PromptNinja is the best free online option for your videos.";
        canonicalUrl = "https://promptninja.solutionkit.com.br/en/teleprompter-what-is-it";
        schema = {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": title,
            "description": description,
            "image": ogImage,
            "author": {
                "@type": "Organization",
                "name": "PromptNinja",
                "url": "https://promptninja.solutionkit.com.br"
            },
            "publisher": {
                "@type": "Organization",
                "name": "PromptNinja",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://promptninja.solutionkit.com.br/icons/icon-512x512.png"
                }
            }
        };
        ctaText = "Use Free Teleprompter";
    } else if (lang === 'es') {
        Content = TeleprompterOQueEES;
        title = "Teleprompter: Qué Es, Cómo Funciona y Beneficios";
        description = "Descubre qué es un teleprompter, cómo funciona y por qué PromptNinja es la mejor opción online gratis para tus videos.";
        canonicalUrl = "https://promptninja.solutionkit.com.br/es/teleprompter-que-es";
        schema = {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": title,
            "description": description,
            "image": ogImage,
            "author": {
                "@type": "Organization",
                "name": "PromptNinja",
                "url": "https://promptninja.solutionkit.com.br"
            },
            "publisher": {
                "@type": "Organization",
                "name": "PromptNinja",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://promptninja.solutionkit.com.br/icons/icon-512x512.png"
                }
            }
        };
        ctaText = "Usar Teleprompter Gratis";
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
                <h3 className="text-2xl font-bold text-white mb-4">
                    {lang === 'pt' ? 'Pronto para começar?' : (lang === 'en' ? 'Ready to start?' : '¿Listo para empezar?')}
                </h3>
                <p className="text-slate-400 mb-6">
                    {lang === 'pt'
                        ? 'Transforme seu dispositivo em um teleprompter profissional agora mesmo.'
                        : (lang === 'en'
                            ? 'Turn your device into a professional teleprompter right now.'
                            : 'Transforma tu dispositivo en un teleprompter profesional ahora mismo.')}
                </p>
                <button
                    onClick={onLaunch}
                    className="bg-gradient-to-r from-purple-700 to-blue-700 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-2xl hover:scale-105 transition transform duration-200"
                >
                    {ctaText}
                </button>
            </div>
        </SeoPageLayout>
    );
};
