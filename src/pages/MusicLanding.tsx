import React from "react";
import * as S from "../components/ui/Styled";
import { Header } from "../components/landing/Header";
import { MusicHero } from "../components/landing/MusicHero";
import { MusicFeatures } from "../components/landing/MusicFeatures";
import { PwaSection } from "../components/landing/PwaSection";
import { FAQ } from "../components/landing/FAQ";
import { FinalCTA } from "../components/landing/FinalCTA";
import { useTranslation } from "../hooks/useTranslation";
import { useSeo } from "../hooks/useSeo";
import { FeedbackModal } from "../components/FeedbackModal";

interface MusicLandingProps {
    onLaunch: () => void;
}

export const MusicLanding: React.FC<MusicLandingProps> = ({ onLaunch }) => {
    const { t, lang } = useTranslation();
    const [showFeedback, setShowFeedback] = React.useState(false);

    const faqItems = t("music.landing.faq.items") as unknown as any[];

    useSeo({
        title: t("music.landing.meta.title") || t("landing.meta.title"),
        description: t("music.landing.meta.description") || t("landing.meta.description"),
        keywords: t("music.landing.meta.keywords"),
        canonicalUrl: `https://music.solutionkit.com.br/${lang !== 'pt' ? `?lang=${lang}` : ''}`,
        alternates: [
            { hreflang: "pt", href: "https://music.solutionkit.com.br/?lang=pt" },
            { hreflang: "en", href: "https://music.solutionkit.com.br/?lang=en" },
            { hreflang: "es", href: "https://music.solutionkit.com.br/?lang=es" },
            { hreflang: "x-default", href: "https://music.solutionkit.com.br/?lang=pt" }
        ],
        ogType: 'website',
        schema: {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "PromptNinja Music",
            "applicationCategory": "MusicApplication",
            "operatingSystem": "Web",
            "offers": {
                "@type": "Offer",
                "price": "67",
                "priceCurrency": "BRL"
            },
            "aggregateRating": { "@type": "AggregateRating", "ratingValue": "5", "reviewCount": "19" }
        }
    });

    return (
        <S.LandingContainer>
            <Header />
            <MusicHero onLaunch={onLaunch} />
            <MusicFeatures />
            <PwaSection
                titleKey="music.landing.pwa.title"
                subtitleKey="music.landing.pwa.subtitle"
                ctaKey="music.landing.pwa.cta"
            />
            <FAQ
                titleKey="music.landing.faq.title"
                items={faqItems && faqItems.length > 0 ? faqItems : undefined}
            />

            <FinalCTA
                onLaunch={onLaunch}
                titleKey="music.landing.cta.title"
                subtitleKey="music.landing.cta.subtitle"
                ctaPrimaryKey="music.landing.cta.ctaPrimary"
                ctaSecondaryKey="music.landing.cta.ctaSecondary"
                footerKey="music.landing.cta.footer"
            />

            <footer className="py-12 border-t border-slate-900 bg-[#020617] text-slate-500 text-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
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
