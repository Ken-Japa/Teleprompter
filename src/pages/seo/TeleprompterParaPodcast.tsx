import React from "react";
import { useTranslation } from "../../hooks/useTranslation";
import { SeoPageLayout } from "./SeoPageLayout";
import { TeleprompterParaPodcastPT } from "./content/teleprompter-para-podcast/pt";
import { TeleprompterParaPodcastEN } from "./content/teleprompter-para-podcast/en";
import { TeleprompterParaPodcastES } from "./content/teleprompter-para-podcast/es";

interface Props {
    onLaunch: () => void;
}

export const TeleprompterParaPodcast: React.FC<Props> = ({ onLaunch }) => {
    const { lang } = useTranslation();

    let Content = TeleprompterParaPodcastPT;
    let title = "Teleprompter para Podcast e Videocast: Roteiro e Ads";
    let description = "Descubra como usar teleprompter em podcasts para ler anúncios e bios de convidados sem perder a naturalidade da conversa.";
    let canonicalUrl = "https://promptninja.solutionkit.com.br/teleprompter-para-podcast";

    if (lang === 'en') {
        Content = TeleprompterParaPodcastEN;
        title = "Teleprompter for Podcast and Videocast: Scripts & Ads";
        description = "Discover how to use a teleprompter in podcasts to read ads and guest bios without losing conversational flow.";
        canonicalUrl = "https://promptninja.solutionkit.com.br/en/teleprompter-for-podcast";
    } else if (lang === 'es') {
        Content = TeleprompterParaPodcastES;
        title = "Teleprompter para Podcast y Videocast: Guiones y Anuncios";
        description = "Descubre cómo usar teleprompter en podcasts para leer anuncios y biografías de invitados sin perder la naturalidad de la conversación.";
        canonicalUrl = "https://promptninja.solutionkit.com.br/es/teleprompter-para-podcast";
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
