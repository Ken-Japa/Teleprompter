import React from 'react';
import { SeoPageLayout } from './SeoPageLayout';
import { useTranslation } from '../../hooks/useTranslation';
import { ChecklistGravacaoPT } from './content/checklist-gravacao/pt';
import { ChecklistGravacaoEN } from './content/checklist-gravacao/en';
import { ChecklistGravacaoES } from './content/checklist-gravacao/es';
import { Language } from '../../locales';

interface Props {
    onLaunch: () => void;
    lang?: Language;
}

export const ChecklistGravacao: React.FC<Props> = ({ onLaunch }) => {
    const { lang } = useTranslation();

    const titles = {
        pt: "Checklist de Gravação: O Guia para o Vídeo Perfeito",
        en: "Recording Checklist: The Guide to the Perfect Video",
        es: "Checklist de Grabación: La Guía para el Video Perfecto"
    };

    const descriptions = {
        pt: "Siga nosso checklist passo a passo para gravar vídeos impecáveis com teleprompter. Dicas de iluminação, áudio e setup para criadores de conteúdo.",
        en: "Follow our step-by-step checklist to record flawless videos with a teleprompter. Lighting, audio, and setup tips for content creators.",
        es: "Siga nuestro checklist paso a paso para grabar videos impecables con teleprompter. Consejos de iluminación, audio y configuración para creadores."
    };

    const content = {
        pt: <ChecklistGravacaoPT />,
        en: <ChecklistGravacaoEN />,
        es: <ChecklistGravacaoES />
    };

    return (
        <SeoPageLayout
            title={titles[lang as keyof typeof titles] || titles.pt}
            description={descriptions[lang as keyof typeof descriptions] || descriptions.pt}
            onLaunch={onLaunch}
        >
            {content[lang as keyof typeof content] || content.pt}
        </SeoPageLayout>
    );
};
