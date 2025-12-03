import React from "react";
import * as S from "../../components/ui/Styled";
import { Header } from "../../components/landing/Header";
import { FinalCTA } from "../../components/landing/FinalCTA";
import { useTranslation } from "../../hooks/useTranslation";
import { useSeo } from "../../hooks/useSeo";

interface SeoPageLayoutProps {
    title: string;
    description: string;
    canonicalUrl?: string;
    onLaunch: () => void;
    children: React.ReactNode;
}

export const SeoPageLayout: React.FC<SeoPageLayoutProps> = ({
    title,
    description,
    canonicalUrl,
    onLaunch,
    children
}) => {
    const { t } = useTranslation();
    useSeo({ title, description, canonicalUrl });

    return (
        <S.LandingContainer>
            <Header onLaunch={onLaunch} />
            
            <main className="pt-24 pb-12 px-4 max-w-4xl mx-auto text-slate-300">
                <article className="prose prose-invert prose-lg max-w-none">
                    {children}
                </article>
            </main>

            <FinalCTA onLaunch={onLaunch} />

            <footer className="py-12 border-t border-slate-900 text-center text-slate-500 text-sm bg-[#020617]">
                <p>&copy; {new Date().getFullYear()} {t("footer.copyright")}</p>
            </footer>
        </S.LandingContainer>
    );
};
