import React from "react";
import { useTranslation } from "../../hooks/useTranslation";
import { SeoPageLayout } from "./SeoPageLayout";
import { VelocidadeLeituraTeleprompterPT } from "./content/velocidade-leitura-teleprompter/pt";
import { VelocidadeLeituraTeleprompterEN } from "./content/velocidade-leitura-teleprompter/en";
import { VelocidadeLeituraTeleprompterES } from "./content/velocidade-leitura-teleprompter/es";

interface Props {
    onLaunch: () => void;
}

export const VelocidadeLeituraTeleprompter: React.FC<Props> = ({ onLaunch }) => {
    const { lang } = useTranslation();

    let Content = VelocidadeLeituraTeleprompterPT;
    let title = "Velocidade de Leitura no Teleprompter: Tudo sobre WPM";
    let description = "Descubra a velocidade de leitura ideal para gravar vídeos naturais. Aprenda o que é WPM, como calcular seu ritmo e use o Voice Control do PromptNinja.";
    let canonicalUrl = "https://promptninja.solutionkit.com.br/velocidade-leitura-teleprompter";

    if (lang === 'en') {
        Content = VelocidadeLeituraTeleprompterEN;
        title = "What is the Ideal Teleprompter Speed? (WPM)";
        description = "Stop chasing the text. Discover the ideal reading speed and how to use Voice Control for the teleprompter to follow you automatically.";
        canonicalUrl = "https://promptninja.solutionkit.com.br/en/teleprompter-reading-speed";
    } else if (lang === 'es') {
        Content = VelocidadeLeituraTeleprompterES;
        title = "¿Cuál es la Velocidad Ideal para Teleprompter? (WPM)";
        description = "Deja de correr tras el texto. Descubre la velocidad ideal de lectura y cómo usar Voice Control para que el teleprompter te siga automáticamente.";
        canonicalUrl = "https://promptninja.solutionkit.com.br/es/velocidad-lectura-teleprompter";
    }

    return (
        <SeoPageLayout
            title={title}
            description={description}
            canonicalUrl={canonicalUrl}
            onLaunch={onLaunch}
        >
            <Content />
        </SeoPageLayout>
    );
};
