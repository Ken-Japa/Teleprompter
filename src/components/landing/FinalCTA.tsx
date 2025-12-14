import React from "react";
import { useTranslation } from "../../hooks/useTranslation";
import { ShareButton } from "../ui/ShareButton";

interface FinalCTAProps {
  onLaunch: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onLaunch }) => {
  const { t } = useTranslation();

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-purple-900 via-black to-blue-900 relative overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute inset-0 bg-brand-500/10 blur-[100px] pointer-events-none"></div>

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <h2 className="text-5xl font-bold mb-6 text-white text-shadow-glow">
          {t("landing.finalCta.title")}
        </h2>
        <p className="text-xl text-gray-300 mb-8">
          {t("landing.finalCta.subtitle")}
        </p>

        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
            <button
              onClick={onLaunch}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-2xl hover:scale-105 transition btn-press"
            >
              {t("landing.finalCta.ctaPrimary")}
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
              {t("landing.finalCta.ctaSecondary")}
            </button>
          </div>

          {/* Share additional CTA */}
          <div className="mt-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 inline-flex flex-col items-center gap-3">
              <span className="text-sm text-slate-400 font-medium uppercase tracking-wider">
                {t("share.cardDescription") || "Gostou? Compartilhe com amigos!"}
              </span>
              <ShareButton variant="primary" className="shadow-lg shadow-brand-500/20" />
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-400 mt-10">
          {t("landing.finalCta.footer")}
        </p>
      </div>
    </section>
  );
};
