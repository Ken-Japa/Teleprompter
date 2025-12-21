import React from "react";
import { useTranslation } from "../../hooks/useTranslation";
import { SeoPageLayout } from "./SeoPageLayout";
import { TeleprompterAcessibilidadePT } from "./content/teleprompter-acessibilidade/pt";
import { TeleprompterAcessibilidadeEN } from "./content/teleprompter-acessibilidade/en";
import { TeleprompterAcessibilidadeES } from "./content/teleprompter-acessibilidade/es";

interface Props {
    onLaunch: () => void;
}

export const TeleprompterAcessibilidade: React.FC<Props> = ({ onLaunch }) => {
    const { lang } = useTranslation();

    let Content = TeleprompterAcessibilidadePT;
    let title = "Teleprompter para TDAH e Dislexia: Fonte OpenDyslexic Grátis";
    let description = "Descubra como o PromptNinja ajuda pessoas com TDAH e Dislexia a gravar vídeos com foco e fluidez usando fontes especiais e cores adaptadas.";
    let canonicalUrl = "https://promptninja.solutionkit.com.br/teleprompter-acessibilidade";

    let schema: object = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": title,
        "description": description,
        "url": canonicalUrl,
        "author": {
            "@type": "Organization",
            "name": "PromptNinja",
            "url": "https://promptninja.solutionkit.com.br"
        }
    };

    if (lang === 'en') {
        Content = TeleprompterAcessibilidadeEN;
        title = "Teleprompter for ADHD and Dyslexia: Free OpenDyslexic Font";
        description = "Discover how PromptNinja helps people with ADHD and Dyslexia record videos with focus and fluency using special fonts and adapted colors.";
        canonicalUrl = "https://promptninja.solutionkit.com.br/en/teleprompter-accessibility";
        schema = {
            "@context": "https://schema.org",
            "@type": "Article",
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
        Content = TeleprompterAcessibilidadeES;
        title = "Teleprompter para TDAH y Dislexia: Fuente OpenDyslexic Gratis";
        description = "Descubre cómo PromptNinja ayuda a personas con TDAH y Dislexia a grabar videos con enfoque y fluidez usando fuentes especiales y colores adaptados.";
        canonicalUrl = "https://promptninja.solutionkit.com.br/es/teleprompter-accesibilidad";
        schema = {
            "@context": "https://schema.org",
            "@type": "Article",
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
            onLaunch={onLaunch}
            schema={schema}
        >
            <Content />
        </SeoPageLayout>
    );
};
