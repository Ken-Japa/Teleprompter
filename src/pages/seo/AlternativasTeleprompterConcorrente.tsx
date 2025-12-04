import React from "react";
import { useTranslation } from "../../hooks/useTranslation";
import { SeoPageLayout } from "./SeoPageLayout";
import { AlternativasTeleprompterConcorrentePT } from "./content/alternativas-teleprompter-concorrente/pt";
import { AlternativasTeleprompterConcorrenteEN } from "./content/alternativas-teleprompter-concorrente/en";
import { AlternativasTeleprompterConcorrenteES } from "./content/alternativas-teleprompter-concorrente/es";

interface Props {
    onLaunch: () => void;
}

export const AlternativasTeleprompterConcorrente: React.FC<Props> = ({ onLaunch }) => {
    const { lang } = useTranslation();

    let Content = AlternativasTeleprompterConcorrentePT;
    let title = "Alternativa ao Teleprompter Pro e PrompterPro (Grátis e Online)";
    let description = "Procurando uma alternativa ao Teleprompter Pro? Conheça o PromptNinja: gratuito, sem login, funciona no PC e Celular com controle remoto.";
    let ctaText = "Trocar para o PromptNinja (Sem Instalar Nada)";

    if (lang === 'en') {
        Content = AlternativasTeleprompterConcorrenteEN;
        title = "Alternative to Teleprompter Pro and PrompterPro (Free & Online)";
        description = "Looking for a Teleprompter Pro alternative? Meet PromptNinja: free, no login, works on PC and Mobile with remote control.";
        ctaText = "Switch to PromptNinja (No Install Needed)";
    } else if (lang === 'es') {
        Content = AlternativasTeleprompterConcorrenteES;
        title = "Alternativa a Teleprompter Pro y PrompterPro (Gratis y Online)";
        description = "¿Buscas una alternativa a Teleprompter Pro? Conoce PromptNinja: gratis, sin registro, funciona en PC y Móvil con control remoto.";
        ctaText = "Cambiar a PromptNinja (Sin Instalación)";
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
