import React from "react";
import { useTranslation } from "../../hooks/useTranslation";
import { SeoPageLayout } from "./SeoPageLayout";
import { ErrosComunsTeleprompterPT } from "./content/erros-comuns-teleprompter/pt";
import { ErrosComunsTeleprompterEN } from "./content/erros-comuns-teleprompter/en";
import { ErrosComunsTeleprompterES } from "./content/erros-comuns-teleprompter/es";

interface Props {
    onLaunch: () => void;
}

export const ErrosComunsTeleprompter: React.FC<Props> = ({ onLaunch }) => {
    const { lang } = useTranslation();

    let Content = ErrosComunsTeleprompterPT;
    let title = "5 Erros de Teleprompter que Profissionais NÃO Cometem (Lista)";
    let description = "Você mexe os olhos lendo? E a 'voz de robô'? Veja como corrigir os erros mais comuns e parecer natural usando teleprompter.";
    let canonicalUrl = "https://promptninja.solutionkit.com.br/erros-comuns-teleprompter";

    if (lang === 'en') {
        Content = ErrosComunsTeleprompterEN;
        title = "5 Teleprompter Mistakes Professionals DON'T Make (List)";
        description = "Do your eyes move while reading? And the 'robot voice'? See how to fix common mistakes and look natural using a teleprompter.";
        canonicalUrl = "https://promptninja.solutionkit.com.br/en/common-teleprompter-mistakes";
    } else if (lang === 'es') {
        Content = ErrosComunsTeleprompterES;
        title = "5 Errores de Teleprompter que los Profesionales NO Cometen";
        description = "¿Mueves los ojos al leer? ¿Y la 'voz de robot'? Ve cómo corregir los errores más comunes y parecer natural usando teleprompter.";
        canonicalUrl = "https://promptninja.solutionkit.com.br/es/errores-comunes-teleprompter";
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
