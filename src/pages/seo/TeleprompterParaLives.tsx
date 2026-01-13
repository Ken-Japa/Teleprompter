import React from "react";
import { useTranslation } from "../../hooks/useTranslation";
import { SeoPageLayout } from "./SeoPageLayout";
import { TeleprompterParaLivesPT } from "./content/teleprompter-para-lives/pt";
import { TeleprompterParaLivesEN } from "./content/teleprompter-para-lives/en";
import { TeleprompterParaLivesES } from "./content/teleprompter-para-lives/es";

interface Props {
    onLaunch: () => void;
}

export const TeleprompterParaLives: React.FC<Props> = ({ onLaunch }) => {
    const { lang } = useTranslation();

    let Content = TeleprompterParaLivesPT;
    let title = "Teleprompter para Lives e Streamings: Engaje seu Público com Fluidez";
    let description = "Mantenha o foco no chat e a fluidez no discurso. O PromptNinja é o teleprompter ideal para transmissões ao vivo no YouTube, Instagram e Twitch. Grátis e sem lag.";
    let canonicalUrl = "https://promptninja.solutionkit.com.br/teleprompter-para-lives";

    if (lang === 'en') {
        Content = TeleprompterParaLivesEN;
        title = "Teleprompter for Lives & Streamers (OBS Studio Overlay)";
        description = "Learn how to do professional YouTube and Twitch live streams reading scripts without the audience noticing. Setup Tutorial for OBS with PromptNinja.";
        canonicalUrl = "https://promptninja.solutionkit.com.br/en/teleprompter-for-live-streaming";
    } else if (lang === 'es') {
        Content = TeleprompterParaLivesES;
        title = "Teleprompter para Directos y Streamers (OBS Studio Overlay)";
        description = "Aprende a hacer directos profesionales en YouTube y Twitch leyendo guiones sin que la audiencia lo note. Tutorial de Setup para OBS con PromptNinja.";
        canonicalUrl = "https://promptninja.solutionkit.com.br/es/teleprompter-para-directos";
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
