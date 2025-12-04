import React from "react";
import { useTranslation } from "../../hooks/useTranslation";
import { trackConversion } from "../../utils/analytics";
import { PricingCard } from "../ui/styles/Marketing";

interface PricingProps {
    onLaunch: () => void;
}

export const Pricing: React.FC<PricingProps> = ({ onLaunch }) => {
    const { t } = useTranslation();

    return (
        <section id="pricing" className="py-24 relative overflow-hidden bg-[#020617]">
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none -z-10" />

            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-white mb-4">{t("landing.pricing.title")}</h2>
                    <p className="text-slate-400">{t("landing.pricing.subtitle")}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-start">
                    {/* Free Plan */}
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

                    {/* PRO Plan */}
                    <PricingCard
                        title={t("landing.pricing.pro.title")}
                        description={t("landing.pricing.pro.desc")}
                        price={t("landing.pricing.pro.price")}
                        originalPrice={t("landing.pricing.pro.originalPrice")}
                        ctaText={t("landing.pricing.pro.cta")}
                        features={t("landing.pricing.pro.features") as unknown as string[]}
                        variant="featured"
                        badge={t("landing.pricing.pro.badge")}
                        footer={
                            <div className="space-y-2">
                                <p className="text-xs text-indigo-300">{t("landing.pricing.pro.priceNote")}</p>
                                <p className="text-xs text-slate-400">{t("landing.pricing.pro.timer")}</p>
                            </div>
                        }
                        onClick={() => {
                            trackConversion('Upgrade to Pro');
                            onLaunch();
                        }}
                    />
                </div>

                <div className="text-center mt-12 text-sm text-slate-500 whitespace-pre-line">
                    <p>{t("landing.pricing.paymentInfo")}</p>
                </div>
            </div>
        </section>
    );
};
