import React from "react";
import { useTranslation } from "../../hooks/useTranslation";

interface FinalCTAProps {
  onLaunch: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onLaunch }) => {
  const { t } = useTranslation();

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-purple-900 via-black to-blue-900">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-5xl font-bold mb-6 text-white">
          {t("landing.finalCta.title")}
        </h2>
        <p className="text-xl text-gray-300 mb-8">
          {t("landing.finalCta.subtitle")}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onLaunch}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-2xl hover:scale-105 transition"
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
            className="bg-white/10 hover:bg-white/20 backdrop-blur text-white font-medium py-4 px-8 rounded-lg text-lg border border-white/20 transition"
          >
            {t("landing.finalCta.ctaSecondary")}
          </button>
        </div>
        <p className="text-sm text-gray-400 mt-6">
          {t("landing.finalCta.footer")}
        </p>
      </div>
    </section>
  );
};
