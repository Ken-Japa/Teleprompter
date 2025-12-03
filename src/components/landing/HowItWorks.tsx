import React from "react";
import { useTranslation } from "../../hooks/useTranslation";

interface HowItWorksProps {
    onLaunch: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onLaunch }) => {
    const { t } = useTranslation();

    return (
        <section id="how-it-works" className="py-24 px-6 bg-[#020617] relative overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">
                    {t("landing.howItWorks.title")}
                </h2>

                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    <div className="text-center group">
                        <div className="bg-gradient-to-br from-indigo-600 to-violet-800 w-20 h-20 rounded-2xl rotate-3 flex items-center justify-center mx-auto mb-6 text-3xl font-bold shadow-lg shadow-indigo-500/20 group-hover:rotate-6 transition-transform duration-300 border border-white/10">
                            1
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-white">{t("landing.howItWorks.step1.title")}</h3>
                        <p className="text-slate-400 leading-relaxed px-4">{t("landing.howItWorks.step1.desc")}</p>
                    </div>

                    <div className="text-center group">
                        <div className="bg-gradient-to-br from-blue-600 to-cyan-800 w-20 h-20 rounded-2xl -rotate-3 flex items-center justify-center mx-auto mb-6 text-3xl font-bold shadow-lg shadow-blue-500/20 group-hover:-rotate-6 transition-transform duration-300 border border-white/10">
                            2
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-white">{t("landing.howItWorks.step2.title")}</h3>
                        <p className="text-slate-400 leading-relaxed px-4">{t("landing.howItWorks.step2.desc")}</p>
                    </div>

                    <div className="text-center group">
                        <div className="bg-gradient-to-br from-emerald-600 to-teal-800 w-20 h-20 rounded-2xl rotate-3 flex items-center justify-center mx-auto mb-6 text-3xl font-bold shadow-lg shadow-emerald-500/20 group-hover:rotate-6 transition-transform duration-300 border border-white/10">
                            3
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-white">{t("landing.howItWorks.step3.title")}</h3>
                        <p className="text-slate-400 leading-relaxed px-4">{t("landing.howItWorks.step3.desc")}</p>
                    </div>
                </div>

                <div className="text-center">
                    <button
                        onClick={onLaunch}
                        className="inline-block bg-white text-slate-950 font-bold py-4 px-10 rounded-xl hover:bg-indigo-50 transition-all text-lg shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:-translate-y-1"
                    >
                        {t("landing.howItWorks.cta")}
                    </button>
                </div>
            </div>
        </section>
    );
};
