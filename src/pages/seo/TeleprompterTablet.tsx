import React from "react";
import { useTranslation } from "../../hooks/useTranslation";
import { SeoPageLayout } from "./SeoPageLayout";
import { TeleprompterTabletPT } from "./content/teleprompter-tablet/pt";
import { TeleprompterTabletEN } from "./content/teleprompter-tablet/en";
import { TeleprompterTabletES } from "./content/teleprompter-tablet/es";

interface Props {
    onLaunch: () => void;
}

export const TeleprompterTablet: React.FC<Props> = ({ onLaunch }) => {
    const { lang } = useTranslation();

    let Content = TeleprompterTabletPT;
    let title = "Teleprompter para Tablet Android e iPad: Otimizado para Telas Maiores";
    let description = "Transforme qualquer tablet em um teleprompter de alta performance. Layout responsivo, controle remoto e estabilidade total. O PromptNinja é gratuito e funciona no navegador.";
    let ctaText = "Usar Teleprompter no Tablet";
    let canonicalUrl = "https://promptninja.solutionkit.com.br/teleprompter-para-tablet-ipad-android";
    const ogImage = "https://promptninja.solutionkit.com.br/og-image.webp";
    let schema: object = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "PromptNinja Teleprompter",
        "headline": title,
        "description": description,
        "applicationCategory": "MultimediaApplication",
        "operatingSystem": "Android, iOS, iPadOS",
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5",
            "ratingCount": "87",
            "bestRating": "5",
            "worstRating": "1"
        },
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "url": canonicalUrl,
        "image": ogImage,
        "author": {
            "@type": "Organization",
            "name": "PromptNinja",
            "url": "https://promptninja.solutionkit.com.br"
        }
    };

    if (lang === 'en') {
        Content = TeleprompterTabletEN;
        title = "Best Teleprompter App for Tablet (iPad, Android) | PromptNinja";
        description = "Turn your iPad or Android tablet into a professional teleprompter. PromptNinja offers remote control, font adjustment, and mirroring for flawless recording. Free and online!";
        ctaText = "Use Teleprompter on Tablet";
        canonicalUrl = "https://promptninja.solutionkit.com.br/en/teleprompter-app-for-tablet-ipad";
        schema = {
            ...schema,
            "headline": title,
            "description": description,
            "url": canonicalUrl,
            "author": {
                "@type": "Organization",
                "name": "PromptNinja",
                "url": "https://promptninja.solutionkit.com.br/?lang=en"
            }
        };
    } else if (lang === 'es') {
        Content = TeleprompterTabletES;
        title = "Teleprompter para Tablet y iPad: El Potencial Máximo de tu Pantalla";
        description = "No limites tu talento a pantallas pequeñas. Usa tu iPad o Tablet como un teleprompter profesional para obtener una lectura cómoda, natural y 100% fluida en cada grabación.";
        ctaText = "Usar Teleprompter en Tablet";
        canonicalUrl = "https://promptninja.solutionkit.com.br/es/teleprompter-para-tablet-ipad-android";
        schema = {
            ...schema,
            "headline": title,
            "description": description,
            "url": canonicalUrl,
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
