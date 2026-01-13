import React from "react";
import { useTranslation } from "../../hooks/useTranslation";
import { SeoPageLayout } from "./SeoPageLayout";
import { ComoEscolherTeleprompterPT } from "./content/como-escolher-teleprompter/pt";
import { ComoEscolherTeleprompterEN } from "./content/como-escolher-teleprompter/en";
import { ComoEscolherTeleprompterES } from "./content/como-escolher-teleprompter/es";

interface Props {
    onLaunch: () => void;
}

export const ComoEscolherTeleprompter: React.FC<Props> = ({ onLaunch }) => {
    const { lang } = useTranslation();

    let Content = ComoEscolherTeleprompterPT;
    let title = "Como Escolher o Teleprompter Ideal | Guia de Compra Completo";
    let description = "Saiba como escolher o teleprompter perfeito para suas necessidades. Compare hardware e software, entenda o custo-benefício e economize com o PromptNinja.";
    let canonicalUrl = "https://promptninja.solutionkit.com.br/como-escolher-teleprompter";

    if (lang === 'en') {
        Content = ComoEscolherTeleprompterEN;
        title = "How to Choose a Teleprompter: Buying Guide 2026 (Beginners)";
        description = "Don't waste money. Find out which type of teleprompter is best for your level (Software vs Hardware) and start for free.";
        canonicalUrl = "https://promptninja.solutionkit.com.br/en/how-to-choose-teleprompter";
    } else if (lang === 'es') {
        Content = ComoEscolherTeleprompterES;
        title = "Cómo Elegir un Teleprompter: Guía de Compra 2026 (Principiantes)";
        description = "No gastes dinero en vano. Sepa qué tipo de teleprompter es mejor para su nivel (Software vs Hardware) y comience gratis.";
        canonicalUrl = "https://promptninja.solutionkit.com.br/es/como-elegir-teleprompter";
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
