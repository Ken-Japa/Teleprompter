import React from "react";
import { useTranslation } from "../../hooks/useTranslation";
import { SeoPageLayout } from "./SeoPageLayout";
import { HistoriaDoTeleprompterPT } from "./content/historia-do-teleprompter/pt";
import { HistoriaDoTeleprompterEN } from "./content/historia-do-teleprompter/en";
import { HistoriaDoTeleprompterES } from "./content/historia-do-teleprompter/es";

interface Props {
    onLaunch: () => void;
}

export const HistoriaDoTeleprompter: React.FC<Props> = ({ onLaunch }) => {
    const { lang } = useTranslation();

    let Content = HistoriaDoTeleprompterPT;
    let title = "História do Teleprompter: De Rolos de Papel à Inteligência Artificial | PromptNinja";
    let description = "Descubra a fascinante história do teleprompter, desde sua invenção em 1950 até o PromptNinja. Conheça os pioneiros e como a tecnologia revolucionou a comunicação.";
    let canonicalUrl = "https://promptninja.solutionkit.com.br/historia-do-teleprompter";

    if (lang === 'en') {
        Content = HistoriaDoTeleprompterEN;
        title = "History of the Teleprompter: Who Invented It & Evolution";
        description = "Did you know the teleprompter started with butcher paper rolls? Discover the secret history of this invention that changed TV and world politics.";
        canonicalUrl = "https://promptninja.solutionkit.com.br/en/history-of-teleprompter";
    } else if (lang === 'es') {
        Content = HistoriaDoTeleprompterES;
        title = "Historia del Teleprompter: Quién lo Inventó y Evolución";
        description = "¿Sabías que el teleprompter comenzó con rollos de papel de carnicero? Conoce la historia secreta de esta invención que cambió la TV y la política mundial.";
        canonicalUrl = "https://promptninja.solutionkit.com.br/es/historia-del-teleprompter";
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
