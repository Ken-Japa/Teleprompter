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
    let title = "7 Celebridades que Usam Teleprompter (e Você Nem Sabia)";
    let description = "Descubra quais famosos, cantores e jornalistas usam teleprompter diariamente. Aprenda por que usar roteiro não é 'trapaça', mas sim profissionalismo.";
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
