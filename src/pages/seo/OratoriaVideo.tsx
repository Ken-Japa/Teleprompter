import React from "react";
import { useTranslation } from "../../hooks/useTranslation";
import { SeoPageLayout } from "./SeoPageLayout";
import { OratoriaVideoPT } from "./content/oratoria-video/pt";
import { OratoriaVideoEN } from "./content/oratoria-video/en";
import { OratoriaVideoES } from "./content/oratoria-video/es";

interface Props {
    onLaunch: () => void;
}

export const OratoriaVideo: React.FC<Props> = ({ onLaunch }) => {
    const { lang } = useTranslation();

    let Content = OratoriaVideoPT;
    let title = "Dicas de Oratória para Vídeo: Como Falar com Confiança";
    let description = "Melhore sua presença em frente às câmeras. Aprenda técnicas de oratória e descubra como o teleprompter pode ajudar a eliminar os 'ééé' e 'hmmm' dos seus vídeos.";
    let ctaText = "Praticar com Teleprompter Grátis";
    let ctaSubText = "Comece a gravar vídeos profissionais hoje mesmo.";

    if (lang === 'en') {
        Content = OratoriaVideoEN;
        title = "Video Speaking Tips: How to Speak with Confidence";
        description = "Improve your presence in front of cameras. Learn speaking techniques and discover how teleprompters can help eliminate filler words from your videos.";
        ctaText = "Practice with Free Teleprompter";
        ctaSubText = "Start recording professional videos today.";
    } else if (lang === 'es') {
        Content = OratoriaVideoES;
        title = "Consejos de Oratoria para Video: Cómo Hablar con Confianza";
        description = "Mejora tu presencia frente a las cámaras. Aprende técnicas de oratoria y descubre cómo el teleprompter puede ayudar a eliminar las muletillas de tus videos.";
        ctaText = "Practicar con Teleprompter Gratis";
        ctaSubText = "Empieza a grabar videos profesionales hoy mismo.";
    }

    return (
        <SeoPageLayout
            title={title}
            description={description}
            onLaunch={onLaunch}
        >
            <Content />

            <div className="mt-12 text-center">
                <button
                    onClick={onLaunch}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-2xl hover:scale-105 transition transform duration-200"
                >
                    {ctaText}
                </button>
                <p className="mt-4 text-sm text-slate-500">{ctaSubText}</p>
            </div>
        </SeoPageLayout>
    );
};
