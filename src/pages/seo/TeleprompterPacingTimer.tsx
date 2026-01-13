import React from "react";
import { useTranslation } from "../../hooks/useTranslation";
import { SeoPageLayout } from "./SeoPageLayout";
import { TeleprompterPacingTimerPT } from "./content/teleprompter-pacing-timer/pt";
import { TeleprompterPacingTimerEN } from "./content/teleprompter-pacing-timer/en";
import { TeleprompterPacingTimerES } from "./content/teleprompter-pacing-timer/es";
import { PacingCalculator } from "../../components/seo/PacingCalculator";

interface Props {
    onLaunch: () => void;
}

export const TeleprompterPacingTimer: React.FC<Props> = ({ onLaunch }) => {
    const { lang } = useTranslation();

    let Content = TeleprompterPacingTimerPT;
    let title = "Pacing e Timer para Teleprompter: Controle seu Ritmo de Fala";
    let description = "Domine o ritmo das suas gravações com o cronômetro e timer do PromptNinja. Evite falar rápido demais ou devagar. Ajuste de WPM e feedback em tempo real. Grátis e online.";
    let canonicalUrl = "https://promptninja.solutionkit.com.br/teleprompter-pacing-timer-online";
    let ogImage = "https://promptninja.solutionkit.com.br/og-image.webp"; // Standard image for now
    let schema: object = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": title,
        "description": description,
        "url": canonicalUrl,
        "image": ogImage,
        "author": {
            "@type": "Organization",
            "name": "PromptNinja",
            "url": "https://promptninja.solutionkit.com.br"
        }
    };
    let ctaText = "Usar Pacing e Timer Grátis";

    if (lang === 'en') {
        Content = TeleprompterPacingTimerEN;
        title = "Teleprompter with Pacing & Timer: Exact Duration for Videos";
        description = "Control your speech rhythm and video duration. Use [STOP] and [PAUSE] text commands in the best online teleprompter with timer.";
        canonicalUrl = "https://promptninja.solutionkit.com.br/en/teleprompter-pacing-timer-online";
        ctaText = "Use Pacing & Timer for Free";
        schema = {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": title,
            "description": description,
            "url": canonicalUrl,
            "image": ogImage,
            "author": {
                "@type": "Organization",
                "name": "PromptNinja",
                "url": "https://promptninja.solutionkit.com.br/?lang=en"
            }
        };
    } else if (lang === 'es') {
        Content = TeleprompterPacingTimerES;
        title = "Teleprompter con Pacing y Timer: Duración Exacta para Videos";
        description = "Controla el ritmo de tu habla y la duración del video. Usa comandos de texto [STOP] y [PAUSE] en el mejor teleprompter con timer online.";
        canonicalUrl = "https://promptninja.solutionkit.com.br/es/teleprompter-pacing-timer-online";
        ctaText = "Usar Pacing y Timer Gratis";
        schema = {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": title,
            "description": description,
            "url": canonicalUrl,
            "image": ogImage,
            "author": {
                "@type": "Organization",
                "name": "PromptNinja",
                "url": "https://promptninja.solutionkit.com.br/?lang=es"
            }
        };
    }

    return (
        <SeoPageLayout
            title={title}
            description={description}
            canonicalUrl={canonicalUrl}
            ogImage={ogImage}
            schema={schema}
            onLaunch={onLaunch}
        >
            {/* Calculator Tool Feature */}
            <PacingCalculator onCtaClick={onLaunch} />

            <div className="h-px bg-slate-800 my-8"></div>

            <Content />

            <div className="my-8 p-6 bg-slate-900 rounded-lg border border-slate-800 text-center">
                <button
                    onClick={onLaunch}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-2xl hover:scale-105 transition transform duration-200"
                >
                    {ctaText}
                </button>
            </div>
        </SeoPageLayout>
    );
};
