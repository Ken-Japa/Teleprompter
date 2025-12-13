import React from "react";
import * as S from "../components/ui/Styled";
import { Header } from "../components/landing/Header";
import { Hero } from "../components/landing/Hero";
import { ProblemSolution } from "../components/landing/ProblemSolution";
import { Features } from "../components/landing/Features";
import { PwaSection } from "../components/landing/PwaSection";
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
    const { t, lang } = useTranslation();

    React.useEffect(() => {
        if (window.location.hash === "#pricing") {
            const element = document.getElementById("pricing");
            if (element) {
                // Small delay to ensure rendering
                setTimeout(() => {
                    element.scrollIntoView({ behavior: "smooth" });
                }, 100);
            }
        }
    }, []);

    return (
        <S.LandingContainer>
            <Header />
            <Hero onLaunch={onLaunch} />
            <ProblemSolution />
            <HowItWorks onLaunch={onLaunch} />
            <Features />
            <PwaSection />
            <ComparisonTable />
            <Pricing onLaunch={onLaunch} />
            <FAQ />
            <FinalCTA onLaunch={onLaunch} />

            <footer className="py-12 border-t border-slate-900 bg-[#020617] text-slate-500 text-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
                    <div className="mb-8 text-center">
                        <h4 className="font-semibold text-slate-400 mb-4 uppercase tracking-wider text-xs">
                            {t("footer.links.resources")}
                        </h4>
                        <div className="flex flex-wrap justify-center gap-6">
                            <a
                                href={
                                    lang === "pt"
                                        ? "/dicas-oratoria-video"
                                        : lang === "es"
                                            ? "/es/consejos-oratoria-video"
                                            : "/en/public-speaking-tips-video"
                                }
                                className="hover:text-white transition-colors"
                            >
                                {t("footer.links.oratory")}
                            </a>
                            <a
                                href={
                                    lang === "pt"
                                        ? "/alternativas-teleprompter-concorrente"
                                        : lang === "es"
                                            ? "/es/alternativas-teleprompter"
                                            : "/en/teleprompter-alternatives"
                                }
                                className="hover:text-white transition-colors"
                            >
                                {t("footer.links.alternatives")}
                            </a>
                            <a
                                href={
                                    lang === "pt"
                                        ? "/teleprompter-o-que-e"
                                        : lang === "es"
                                            ? "/es/teleprompter-que-es"
                                            : "/en/teleprompter-what-is-it"
                                }
                                className="hover:text-white transition-colors"
                            >
                                {t("footer.links.whatIs")}
                            </a>
                        </div>
                    </div>
                    <p>
                        &copy; {new Date().getFullYear()} {t("footer.copyright")}
                    </p>
                </div>
            </footer>
        </S.LandingContainer>
    );
};
