import React from "react";
import { useTranslation } from "../../hooks/useTranslation";
import * as S from "../ui/Styled";
import { CheckIcon } from "../ui/Icons";
import { trackConversion } from "../../utils/analytics";

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

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Free Plan */}
                    <div className="bg-white/5 backdrop-blur border border-white/10 rounded-3xl p-8 flex flex-col">
                        <h3 className="text-2xl font-bold mb-2 text-white">{t("landing.pricing.free.title")}</h3>
                        <p className="text-slate-400 mb-6">{t("landing.pricing.free.desc")}</p>
                        <div className="text-4xl font-bold mb-6 text-white">
                            {t("landing.pricing.free.price")}<span className="text-lg text-slate-500 font-normal">{t("landing.pricing.free.period")}</span>
                        </div>
                        
                        <ul className="space-y-4 mb-8 flex-grow">
                            {(t("landing.pricing.free.features") as unknown as string[]).map((feat, i) => (
                                <li key={i} className="flex items-start gap-3 text-slate-300">
                                    <CheckIcon className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                                    <span className="text-sm">{feat}</span>
                                </li>
                            ))}
                            {(t("landing.pricing.free.missing") as unknown as string[]).map((feat, i) => (
                                <li key={i} className="flex items-start gap-3 text-slate-500">
                                    <span className="w-5 h-5 flex items-center justify-center text-slate-600">✕</span>
                                    <span className="text-sm">{feat}</span>
                                </li>
                            ))}
                        </ul>

                        <button
                            onClick={onLaunch}
                            className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-4 rounded-xl transition border border-white/10"
                        >
                            {t("landing.pricing.free.cta")}
                        </button>
                    </div>

                    {/* PRO Plan */}
                    <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 backdrop-blur border-2 border-indigo-500/50 rounded-3xl p-8 relative shadow-2xl shadow-indigo-500/20 flex flex-col">
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-500 text-white px-4 py-1 rounded-full text-xs font-bold tracking-wider shadow-lg shadow-indigo-500/40 whitespace-nowrap">
                            {t("landing.pricing.pro.badge")}
                        </div>
                        
                        <h3 className="text-2xl font-bold mb-2 text-white">{t("landing.pricing.pro.title")}</h3>
                        <p className="text-indigo-200 mb-6">{t("landing.pricing.pro.desc")}</p>
                        
                        <div className="flex items-baseline gap-3 mb-2">
                            <span className="text-5xl font-bold text-white">{t("landing.pricing.pro.price")}</span>
                            <span className="text-xl line-through text-slate-500">{t("landing.pricing.pro.originalPrice")}</span>
                        </div>
                        <p className="text-xs text-indigo-300 mb-8">
                            {t("landing.pricing.pro.priceNote")}
                        </p>

                        <ul className="space-y-4 mb-8 flex-grow">
                            {(t("landing.pricing.pro.features") as unknown as string[]).map((feat, i) => (
                                <li key={i} className="flex items-start gap-3 text-white">
                                    <div className="bg-indigo-500/20 rounded-full p-1">
                                        <CheckIcon className="w-4 h-4 text-indigo-300 flex-shrink-0" />
                                    </div>
                                    <span className="text-sm font-medium">{feat}</span>
                                </li>
                            ))}
                        </ul>

                        <button
                            onClick={() => {
                                trackConversion('Upgrade to Pro');
                                onLaunch();
                            }}
                            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold py-4 rounded-xl transition shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transform hover:-translate-y-1"
                        >
                            {t("landing.pricing.pro.cta")}
                        </button>
                        
                        <p className="text-xs text-center text-slate-400 mt-4">
                            {t("landing.pricing.pro.timer")}
                        </p>
                    </div>
                </div>

                <div className="text-center mt-12 text-sm text-slate-500">
                    <p>{t("landing.pricing.paymentInfo")}</p>
                </div>
            </div>
        </section>
    );
};
