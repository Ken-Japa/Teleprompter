import React from "react";
import { useTranslation } from "../../hooks/useTranslation";
import { SeoPageLayout } from "./SeoPageLayout";
import { TeleprompterVsTelelestradorPT } from "./content/teleprompter-vs-telelestrador/pt";
import { TeleprompterVsTelelestradorEN } from "./content/teleprompter-vs-telelestrador/en";
import { TeleprompterVsTelelestradorES } from "./content/teleprompter-vs-telelestrador/es";

interface Props {
    onLaunch: () => void;
}

export const TeleprompterVsTelelestrador: React.FC<Props> = ({ onLaunch }) => {
    const { lang } = useTranslation();

    let Content = TeleprompterVsTelelestradorPT;
    let title = "Teleprompter vs. Telelestrador: Qual a Diferença e Qual Usar?";
    let description = "Descubra a diferença real entre Teleprompter e Telelestrador (ou cartazes de apoio). Saiba qual ferramenta vai te ajudar a gravar vídeos melhores e mais rápidos em 2026. Spoiler: O Teleprompter ganha.";
    let canonicalUrl = "https://promptninja.solutionkit.com.br/teleprompter-vs-telelestrador";

    if (lang === 'en') {
        Content = TeleprompterVsTelelestradorEN;
        title = "Teleprompter vs. Telestrator (Cue Cards): Which One Wins?";
        description = "Discover the real difference between Teleprompter and Telestrator (or cue cards). Find out which tool will help you record better and faster videos in 2026. Spoiler: Teleprompter wins.";
        canonicalUrl = "https://promptninja.solutionkit.com.br/en/teleprompter-vs-telelestrador"; // Note: This URL will need to match routes.js exactly
    } else if (lang === 'es') {
        Content = TeleprompterVsTelelestradorES;
        title = "Teleprompter vs. Telelestrador (Carteles): ¿Cuál Elegir?";
        description = "Descubre la diferencia real entre Teleprompter y Telelestrador (o carteles de apoyo). Sepa qué herramienta le ayudará a grabar videos mejores y más rápidos en 2026. Spoiler: El Teleprompter gana.";
        canonicalUrl = "https://promptninja.solutionkit.com.br/es/teleprompter-vs-telelestrador";
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
