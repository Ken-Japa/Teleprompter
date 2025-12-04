import React from "react";
import { useTranslation } from "../../hooks/useTranslation";
import { SeoPageLayout } from "./SeoPageLayout";
import { TeleprompterParaYoutubersPT } from "./content/teleprompter-para-youtubers/pt";
import { TeleprompterParaYoutubersEN } from "./content/teleprompter-para-youtubers/en";
import { TeleprompterParaYoutubersES } from "./content/teleprompter-para-youtubers/es";

interface Props {
    onLaunch: () => void;
}

export const TeleprompterParaYoutubers: React.FC<Props> = ({ onLaunch }) => {
    const { lang } = useTranslation();

    let Content = TeleprompterParaYoutubersPT;
    let title = "Melhor Teleprompter para YouTubers e Criadores de Curso";
    let description = "Grave vídeos longos sem errar o texto. Descubra como o PromptNinja ajuda YouTubers e professores online a gravar aulas perfeitas.";
    let ctaText = "Começar a Gravar Agora";

    if (lang === 'en') {
        Content = TeleprompterParaYoutubersEN;
        title = "Best Teleprompter for YouTubers and Course Creators";
        description = "Record long videos without missing the text. Discover how PromptNinja helps YouTubers and online teachers record perfect lessons.";
        ctaText = "Start Recording Now";
    } else if (lang === 'es') {
        Content = TeleprompterParaYoutubersES;
        title = "Mejor Teleprompter para YouTubers y Creadores de Cursos";
        description = "Graba videos largos sin equivocarte en el texto. Descubre cómo PromptNinja ayuda a YouTubers y profesores online a grabar clases perfectas.";
        ctaText = "Empezar a Grabar Ahora";
    }

    return (
        <SeoPageLayout
            title={title}
            description={description}
            onLaunch={onLaunch}
        >
            <Content />

            <div className="text-center mt-10">
                <button
                    onClick={onLaunch}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-2xl hover:scale-105 transition transform duration-200"
                >
                    {ctaText}
                </button>
            </div>
        </SeoPageLayout>
    );
};
