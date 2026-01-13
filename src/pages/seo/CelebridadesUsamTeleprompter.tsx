import React from "react";
import { useTranslation } from "../../hooks/useTranslation";
import { SeoPageLayout } from "./SeoPageLayout";
import { CelebridadesUsamTeleprompterPT } from "./content/celebridades-usam-teleprompter/pt";
import { CelebridadesUsamTeleprompterEN } from "./content/celebridades-usam-teleprompter/en";
import { CelebridadesUsamTeleprompterES } from "./content/celebridades-usam-teleprompter/es";

interface Props {
    onLaunch: () => void;
}

export const CelebridadesUsamTeleprompter: React.FC<Props> = ({ onLaunch }) => {
    const { lang } = useTranslation();

    let Content = CelebridadesUsamTeleprompterPT;
    let title = "Celebridades que Usam Teleprompter: Exemplos de Profissionalismo";
    let description = "Descubra as celebridades, líderes e jornalistas que utilizam teleprompters para discursos impecáveis. Saiba por que usar roteiro é essencial para grandes performances.";
    let canonicalUrl = "https://promptninja.solutionkit.com.br/celebridades-usam-teleprompter";

    if (lang === 'en') {
        Content = CelebridadesUsamTeleprompterEN;
        title = "7 Celebrities Who Use Teleprompters (And You Didn't Know)";
        description = "Find out which celebrities, singers, and journalists use teleprompters daily. Learn why using a script isn't 'cheating' but professionalism.";
        canonicalUrl = "https://promptninja.solutionkit.com.br/en/celebrities-use-teleprompter";
    } else if (lang === 'es') {
        Content = CelebridadesUsamTeleprompterES;
        title = "7 Famosos que Usan Teleprompter (y Ni Te Enteraste)";
        description = "Descubre qué famosos, cantantes y periodistas usan teleprompter a diario. Aprende por qué usar guion no es 'trampa', sino profesionalismo.";
        canonicalUrl = "https://promptninja.solutionkit.com.br/es/famosos-usan-teleprompter";
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
