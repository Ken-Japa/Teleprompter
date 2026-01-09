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
import { useSeo } from "../hooks/useSeo";
import { ROUTES_CONFIG } from "../config/routes";
import { FeedbackModal } from "../components/FeedbackModal";

interface LandingProps {
    onLaunch: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onLaunch }) => {
    const { t, lang } = useTranslation();
    const [showFeedback, setShowFeedback] = React.useState(false);

    useSeo({
        title: t("landing.meta.title"),
        description: t("landing.meta.description"),
        // Aqui garantimos que o Google saiba qual versão está lendo
        canonicalUrl: `https://promptninja.solutionkit.com.br/${lang !== 'pt' ? `?lang=${lang}` : ''}`,
        ogType: 'website'
    });

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
            <Pricing onLaunch={onLaunch} />
            <ComparisonTable />
            <PwaSection />
            <FAQ />

            {/* Hub Guide Link Section */}
            <div className="bg-[#020617] border-slate-900 mb-16 text-center">
                <p className="text-slate-400 mb-4 text-sm">
                    {lang === "pt" ? "Explore mais conteúdos" :
                        lang === "es" ? "Explora más contenido" :
                            "Explore more content"}
                </p>
                <a
                    href={
                        lang === "pt" ? ROUTES_CONFIG.SEO_HUB_GUIDE.paths.pt :
                            lang === "es" ? ROUTES_CONFIG.SEO_HUB_GUIDE.paths.es :
                                ROUTES_CONFIG.SEO_HUB_GUIDE.paths.en
                    }
                    className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 hover:brightness-110 transition-all border-b border-purple-500/30 hover:border-purple-500 pb-1"
                >
                    {lang === "pt" ? "📖 Guia Completo de Teleprompter" :
                        lang === "es" ? "📖 Guía Definitiva de Teleprompter" :
                            "📖 Ultimate Teleprompter Guide"}
                </a>
            </div>

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

                    <div className="flex flex-col items-center gap-4 mb-8">
                        <a href="mailto:teleprompterninja@gmail.com" className="text-slate-400 hover:text-brand-400 transition-colors font-medium">
                            teleprompterninja@gmail.com
                        </a>
                        <button
                            onClick={() => setShowFeedback(true)}
                            className="px-4 py-2 rounded-full border border-slate-800 hover:border-slate-600 text-slate-400 hover:text-white transition-all text-xs uppercase tracking-widest font-bold"
                        >
                            Feedback / Sugestões
                        </button>
                    </div>

                    <p>
                        &copy; {new Date().getFullYear()} {t("footer.copyright")}
                    </p>
                </div>
            </footer>

            <FeedbackModal show={showFeedback} onClose={() => setShowFeedback(false)} />
        </S.LandingContainer>
    );
};
