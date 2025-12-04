import React from "react";
import { useTranslation } from "../../hooks/useTranslation";
import { SeoPageLayout } from "./SeoPageLayout";
import { TeleprompterTravandoSolucaoPT } from "./content/teleprompter-travando-solucao/pt";
import { TeleprompterTravandoSolucaoEN } from "./content/teleprompter-travando-solucao/en";
import { TeleprompterTravandoSolucaoES } from "./content/teleprompter-travando-solucao/es";

interface Props {
    onLaunch: () => void;
}

export const TeleprompterTravandoSolucao: React.FC<Props> = ({ onLaunch }) => {
    const { lang } = useTranslation();

    let Content = TeleprompterTravandoSolucaoPT;
    let title = "Teleprompter Travando ou Pulando Texto? Veja a Solução";
    let description = "Seu app de teleprompter está travando ou o texto não rola suavemente? Entenda por que isso acontece e como o PromptNinja resolve com P2P.";
    let ctaText = "Testar Rolagem Suave (Grátis)";

    if (lang === 'en') {
        Content = TeleprompterTravandoSolucaoEN;
        title = "Teleprompter Freezing or Skipping Text? See the Solution";
        description = "Is your teleprompter app freezing or the text not scrolling smoothly? Understand why this happens and how PromptNinja solves it with P2P.";
        ctaText = "Test Smooth Scrolling (Free)";
    } else if (lang === 'es') {
        Content = TeleprompterTravandoSolucaoES;
        title = "¿Teleprompter Congelado o Saltando Texto? Mira la Solución";
        description = "¿Tu app de teleprompter se congela o el texto no se desplaza suavemente? Entiende por qué sucede esto y cómo PromptNinja lo resuelve con P2P.";
        ctaText = "Probar Desplazamiento Suave (Gratis)";
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
