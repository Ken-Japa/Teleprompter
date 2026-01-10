import React from "react";
import { useTranslation } from "../../hooks/useTranslation";
import { ShareButton } from "../ui/ShareButton";

interface FinalCTAProps {
  onLaunch: () => void;
  titleKey?: string;
  subtitleKey?: string;
  ctaPrimaryKey?: string;
  ctaSecondaryKey?: string;
  footerKey?: string;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({
  onLaunch,
  titleKey = "landing.finalCta.title",
  subtitleKey = "landing.finalCta.subtitle",
  ctaPrimaryKey = "landing.finalCta.ctaPrimary",
  ctaSecondaryKey = "landing.finalCta.ctaSecondary",
  footerKey = "landing.finalCta.footer"
}) => {
  const { t } = useTranslation();

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-purple-900 via-black to-blue-900 relative overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute inset-0 bg-brand-500/10 blur-[100px] pointer-events-none"></div>

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <h2 className="text-5xl font-bold mb-6 text-white text-shadow-glow">
          {t(titleKey)}
        </h2>
        <p className="text-xl text-gray-300 mb-8">
          {t(subtitleKey)}
        </p>

        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
            <button
              onClick={onLaunch}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-2xl hover:scale-105 transition btn-press"
            >
              {t(ctaPrimaryKey)}
            </button>
            <button
              onClick={() => {
                const pricingSection = document.getElementById('pricing');
                if (pricingSection) {
                  pricingSection.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.location.href = "/#pricing";
                }
              }}
              className="bg-white/10 hover:bg-white/20 backdrop-blur text-white font-medium py-4 px-8 rounded-lg text-lg border border-white/20 transition hover:scale-105 btn-press"
            >
              {t(ctaSecondaryKey)}
            </button>
          </div>

          <p className="text-sm text-gray-400 mt-10">
            {t(footerKey)}
          </p>

          {/* Share additional CTA - Elegant minimal style */}
          <div className="mt-8 animate-fade-in-up flex items-center justify-center" style={{ animationDelay: '0.2s' }}>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative flex items-center gap-3 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full pl-5 pr-2 py-2 hover:bg-black/50 transition-colors">
                <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                  {t("share.cardDescription")?.split("?")[0] + "?" || "Curtiu?"}
                </span>

                <div className="h-4 w-px bg-white/10"></div>

                <ShareButton
                  variant="primary"
                  className="!py-1.5 !px-4 !text-xs !bg-white/10 hover:!bg-white/20 !border-white/5 !shadow-none"
                />
              </div>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
};
