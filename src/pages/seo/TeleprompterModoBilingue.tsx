import React from "react";
import { useTranslation } from "../../hooks/useTranslation";
import { SeoPageLayout } from "./SeoPageLayout";
import { TeleprompterModoBilinguePT } from "./content/teleprompter-modo-bilingue/pt";
import { TeleprompterModoBilingueEN } from "./content/teleprompter-modo-bilingue/en";
import { TeleprompterModoBilingueES } from "./content/teleprompter-modo-bilingue/es";

interface Props {
    onLaunch: () => void;
}

export const TeleprompterModoBilingue: React.FC<Props> = ({ onLaunch }) => {
    const { lang } = useTranslation();

    let Content = TeleprompterModoBilinguePT;
    let title = "Teleprompter Modo Bilíngue: Scripts Lado a Lado (Grátis)";
    let description = "Descubra o Modo Bilíngue do PromptNinja. Visualize dois scripts simultaneamente, ideal para aprender idiomas e apresentações internacionais. Teleprompter gratuito e sem login.";
    let canonicalUrl = "https://promptninja.solutionkit.com.br/teleprompter-modo-bilingue";
    let ogImage = "https://promptninja.solutionkit.com.br/og-image.webp";
    let schema: object = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": title,
        "description": description,
        "url": canonicalUrl,
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
                "url": ogImage
            }
        },
        "datePublished": "2025-12-16",
        "dateModified": "2025-12-16"
    };
    let ctaText = "Usar Modo Bilíngue Agora";

    if (lang === 'en') {
        Content = TeleprompterModoBilingueEN;
        title = "Bilingual Mode Teleprompter: Side-by-Side Scripts (Free)";
        description = "Discover PromptNinja's Bilingual Mode. View two scripts simultaneously, perfect for language learning and international presentations. Free teleprompter, no login required.";
        canonicalUrl = "https://promptninja.solutionkit.com.br/en/teleprompter-bilingual-mode";
        ogImage = "https://promptninja.solutionkit.com.br/og-image.webp";
        schema = {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": title,
            "description": description,
            "url": canonicalUrl,
            "image": ogImage,
            "author": {
                "@type": "Organization",
                "name": "PromptNinja",
                "url": "https://promptninja.solutionkit.com.br/?lang=en"
            },
            "publisher": {
                "@type": "Organization",
                "name": "PromptNinja",
                "logo": {
                    "@type": "ImageObject",
                    "url": ogImage
                }
            },
            "datePublished": "2025-12-16",
            "dateModified": "2025-12-16"
        };
        ctaText = "Try Bilingual Mode Now";
    } else if (lang === 'es') {
        Content = TeleprompterModoBilingueES;
        title = "Teleprompter Modo Bilingüe: Guiones Lado a Lado (Gratis)";
        description = "Descubre el Modo Bilingüe de PromptNinja. Visualiza dos guiones simultáneamente, ideal para aprender idiomas y presentaciones internacionales. Teleprompter gratuito sin registro.";
        canonicalUrl = "https://promptninja.solutionkit.com.br/es/teleprompter-modo-bilingue";
        ogImage = "https://promptninja.solutionkit.com.br/og-image.webp";
        schema = {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": title,
            "description": description,
            "url": canonicalUrl,
            "image": ogImage,
            "author": {
                "@type": "Organization",
                "name": "PromptNinja",
                "url": "https://promptninja.solutionkit.com.br/?lang=es"
            },
            "publisher": {
                "@type": "Organization",
                "name": "PromptNinja",
                "logo": {
                    "@type": "ImageObject",
                    "url": ogImage
                }
            },
            "datePublished": "2025-12-16",
            "dateModified": "2025-12-16"
        };
        ctaText = "Usar Modo Bilingüe Ahora";
    }

    return (
        <SeoPageLayout
            title={title}
            description={description}
            canonicalUrl={canonicalUrl}
            ogImage={ogImage}
            ogType="article"
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
