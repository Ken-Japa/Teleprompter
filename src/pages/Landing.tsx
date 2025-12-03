import React from "react";
import * as S from "../components/ui/Styled";
import { Header } from "../components/landing/Header";
import { Hero } from "../components/landing/Hero";
import { ProblemSolution } from "../components/landing/ProblemSolution";
import { Features } from "../components/landing/Features";
import { HowItWorks } from "../components/landing/HowItWorks";
import { ComparisonTable } from "../components/landing/ComparisonTable";
import { Pricing } from "../components/landing/Pricing";
import { FAQ } from "../components/landing/FAQ";
import { FinalCTA } from "../components/landing/FinalCTA";
import { useTranslation } from "../hooks/useTranslation";

interface LandingProps {
    onLaunch: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onLaunch }) => {
    const { t } = useTranslation();
    return (
        <S.LandingContainer>
            <Header onLaunch={onLaunch} />
            <Hero onLaunch={onLaunch} />
            <ProblemSolution />
            <HowItWorks onLaunch={onLaunch} />
            <Features />
            <ComparisonTable />
            <Pricing onLaunch={onLaunch} />
            <FAQ />
            <FinalCTA onLaunch={onLaunch} />

            <footer className="py-12 border-t border-slate-900 text-center text-slate-500 text-sm bg-[#020617]">
                <p>&copy; {new Date().getFullYear()} {t("footer.copyright")}</p>
            </footer>
        </S.LandingContainer>
    );
};
