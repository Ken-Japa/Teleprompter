import React from 'react';
import { SeoPageLayout } from './SeoPageLayout';
import { useTranslation } from '../../hooks/useTranslation';
import { TeleprompterEventosProfissionaisPT } from './content/teleprompter-eventos-profissionais/pt';
import { TeleprompterEventosProfissionaisEN } from './content/teleprompter-eventos-profissionais/en';
import { TeleprompterEventosProfissionaisES } from './content/teleprompter-eventos-profissionais/es';
import { Language } from '../../locales';

interface Props {
    onLaunch: () => void;
    lang?: Language;
}

export const TeleprompterEventosProfissionais: React.FC<Props> = ({ onLaunch }) => {
    const { lang } = useTranslation();

    const titles = {
        pt: "Teleprompter para Eventos Profissionais: Sincronia e Performance",
        en: "Teleprompter for Professional Events: Sync and Performance",
        es: "Teleprompter para Eventos Profesionales: Sincronía e Performance"
    };

    const descriptions = {
        pt: "Gerencie palestras e eventos corporativos com perfeição. Use o modo Master/Receiver do PromptNinja para sincronia em tempo real e latência zero em qualquer palco.",
        en: "Manage lectures and corporate events perfectly. Use PromptNinja's Master/Receiver mode for real-time synchronization and zero latency on any stage.",
        es: "Gestione conferencias y eventos corporativos a la perfección. Use el modo Maestro/Receptor de PromptNinja para sincronía en tiempo real y latência cero."
    };

    const content = {
        pt: <TeleprompterEventosProfissionaisPT />,
        en: <TeleprompterEventosProfissionaisEN />,
        es: <TeleprompterEventosProfissionaisES />
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
