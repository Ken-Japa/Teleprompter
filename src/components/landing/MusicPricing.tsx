import React from "react";
import { useTranslation } from "../../hooks/useTranslation";
import { trackConversion } from "../../utils/analytics";
import { PricingCard } from "../ui/styles/Marketing";

interface MusicPricingProps {
    onLaunch: () => void;
}

export const MusicPricing: React.FC<MusicPricingProps> = ({ onLaunch }) => {
    const { t } = useTranslation();

    return (
        <section id="pricing" className="py-24 relative overflow-hidden bg-[#020617]">
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-amber-500/5 blur-[100px] rounded-full pointer-events-none -z-10" />

            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        {t("music.landing.pricing.title") || "PRO Vitalício para Músicos"}
                    </h2>
                    <p className="text-slate-300">
                        {t("music.landing.pricing.subtitle") || "Pagamento único, sem mensalidades."}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-start">
                    {/* Free Plan */}
                    <div className="hover-lift transition-smooth">
                        <PricingCard
                            title={t("landing.pricing.free.title")}
                            description={t("landing.pricing.free.desc")}
                            price={t("landing.pricing.free.price")}
                            period={t("landing.pricing.free.period")}
                            ctaText={t("landing.pricing.free.cta")}
                            features={t("landing.pricing.free.features") as unknown as string[]}
                            missingFeatures={t("landing.pricing.free.missing") as unknown as string[]}
                            variant="default"
                            onClick={onLaunch}
                        />
                    </div>

                    {/* PRO Plan */}
                    <div className="hover-lift hover-glow transition-smooth rounded-2xl">
                        <PricingCard
                            title={t("music.landing.pricing.title")}
                            description={t("music.landing.pricing.subtitle")}
                            price={t("music.landing.pricing.price") || "R$ 97"}
                            originalPrice="R$ 197"
                            ctaText={t("landing.pricing.pro.cta")}
                            features={t("music.landing.pricing.features") as unknown as string[]}
                            variant="featured"
                            badge={t("music.landing.pricing.badge") || "OFERTA LIMITADA"}
                            footer={
                                <div className="space-y-2">
                                    <p className="text-xs text-amber-300">{t("music.landing.pricing.priceNote")}</p>
                                    <p className="text-xs text-slate-400">{t("music.landing.pricing.timer")}</p>
                                </div>
                            }
                            onClick={() => {
                                trackConversion('Upgrade to Pro Music');
                                window.gtag?.('event', 'conversion', {
                                    'send_to': 'AW-17795014366/_3RZCNLTxtEbEN69qaVC',
                                });
                                // Using the Kiwify link for the R$97 offer if available, otherwise fallback
                                window.open('https://pay.kiwify.com.br/dl571EZ', '_blank');
                            }}
                        />
                        <div className="mt-4 text-center">
                            <button
                                onClick={() => {
                                    localStorage.setItem("PROMPTNINJA_START_TRIAL", "true");
                                    onLaunch();
                                }}
                                className="text-sm font-bold text-amber-400 hover:text-amber-300 transition-colors flex items-center justify-center gap-2 mx-auto py-2 px-4 rounded-lg hover:bg-white/5"
                            >
                                ⚡ Testar Recursos PRO por 24h
                            </button>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-12 text-sm text-slate-400 whitespace-pre-line">
                    <p>{t("landing.pricing.paymentInfo")}</p>
                </div>
            </div>
        </section>
    );
};
