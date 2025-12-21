import React from "react";
import { useTranslation } from "../../hooks/useTranslation";
import { SeoPageLayout } from "./SeoPageLayout";
import { FuturoTelepromptersAiPT } from "./content/futuro-teleprompters-ai/pt";
import { FuturoTelepromptersAiEN } from "./content/futuro-teleprompters-ai/en";
import { FuturoTelepromptersAiES } from "./content/futuro-teleprompters-ai/es";

interface Props {
    onLaunch: () => void;
}

export const FuturoTelepromptersAi: React.FC<Props> = ({ onLaunch }) => {
    const { lang } = useTranslation();

    let Content = FuturoTelepromptersAiPT;
    let title = "O Futuro dos Teleprompters com IA: O Que Vem Por Aí?";
    let description = "Reconhecimento de voz, correção de olhar e geração de roteiros. Descubra como a Inteligência Artificial está transformando os teleprompters.";
    let canonicalUrl = "https://promptninja.solutionkit.com.br/futuro-teleprompters-ai";

    if (lang === 'en') {
        Content = FuturoTelepromptersAiEN;
        title = "The Future of AI Teleprompters: What's Next?";
        description = "Voice recognition, eye contact correction, and script generation. Discover how Artificial Intelligence is transforming teleprompters.";
        canonicalUrl = "https://promptninja.solutionkit.com.br/en/future-teleprompters-ai";
    } else if (lang === 'es') {
        Content = FuturoTelepromptersAiES;
        title = "El Futuro de los Teleprompters con IA: ¿Qué Viene?";
        description = "Reconocimiento de voz, corrección de mirada y generación de guiones. Descubre cómo la Inteligencia Artificial está transformando los teleprompters.";
        canonicalUrl = "https://promptninja.solutionkit.com.br/es/futuro-teleprompters-ai";
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
