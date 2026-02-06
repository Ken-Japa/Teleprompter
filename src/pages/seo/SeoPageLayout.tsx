import React from "react";
import * as S from "../../components/ui/Styled";
import { ROUTES_CONFIG } from "../../config/routes";
import { Header } from "../../components/landing/Header";
import { FinalCTA } from "../../components/landing/FinalCTA";
import { useTranslation } from "../../hooks/useTranslation";
import { useSeo } from "../../hooks/useSeo";
import { FeedbackModal } from "../../components/FeedbackModal";

interface SeoPageLayoutProps {
    title: string;
    description: string;
    canonicalUrl?: string;
    ogImage?: string;
    ogType?: 'website' | 'article';
    schema?: object;
    onLaunch: () => void;
    children: React.ReactNode;
}

export const SeoPageLayout: React.FC<SeoPageLayoutProps> = ({
    title,
    description,
    canonicalUrl,
    ogImage,
    ogType,
    schema,
    onLaunch,
    children
}) => {
    const { t, lang } = useTranslation();
    const [showFeedback, setShowFeedback] = React.useState(false);

    const alternates = React.useMemo(() => {
        if (!canonicalUrl) return undefined;

        // Find matching route in ROUTES_CONFIG
        const routeEntry = Object.values(ROUTES_CONFIG).find((route: any) => {
            if (!route.paths) return false;
            return Object.values(route.paths).some((path: any) => canonicalUrl.endsWith(path));
        });

        if (!routeEntry || !routeEntry.paths) return undefined;

        const baseUrl = "https://promptninja.solutionkit.com.br";
        return [
            { hreflang: "pt", href: `${baseUrl}${routeEntry.paths.pt}` },
            { hreflang: "en", href: `${baseUrl}${routeEntry.paths.en}` },
            { hreflang: "es", href: `${baseUrl}${routeEntry.paths.es}` },
            { hreflang: "x-default", href: `${baseUrl}${routeEntry.paths.en}` },
        ];
    }, [canonicalUrl]);

    useSeo({ title, description, canonicalUrl, ogImage, ogType, schema, alternates });

    return (
        <S.LandingContainer>
            <Header />

            <div className="relative pt-32 pb-16 md:pt-48 md:pb-32 overflow-hidden">
                {/* Background Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none z-0">
                    <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px]" />
                    <div className="absolute top-40 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px]" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-6xl pb-4 font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 mb-6 leading-tight">
                        {title.split(":")[0]}
                        {title.includes(":") && (
                            <span className="block text-2xl md:text-3xl mt-4 font-normal text-slate-400">
                                {title.split(":")[1]}
                            </span>
                        )}
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full mb-8 opacity-80"></div>
                </div>
            </div>

            <main className="relative z-10 pb-24 px-6 max-w-3xl mx-auto">
                <article className="prose prose-invert prose-lg prose-slate max-w-none 
                    prose-headings:text-white prose-headings:font-bold 
                    prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 
                    prose-h3:text-xl prose-h3:text-blue-400
                    prose-p:text-slate-300 prose-p:leading-relaxed
                    prose-strong:text-white prose-strong:font-semibold
                    prose-ul:my-6 prose-li:marker:text-purple-500
                    prose-a:no-underline hover:prose-a:underline">
                    {children}
                </article>
            </main>


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
            <footer className="py-12 border-t border-slate-900 text-center text-slate-500 text-sm bg-[#020617]">
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
                <p>&copy; {new Date().getFullYear()} {t("footer.copyright")}</p>
            </footer>

            <FeedbackModal show={showFeedback} onClose={() => setShowFeedback(false)} />
        </S.LandingContainer>
    );
};
