import React from "react";
import { useTranslation } from "../../hooks/useTranslation";

export const FAQ: React.FC = () => {
    const { t } = useTranslation();

    return (
        <section className="py-24 px-6 bg-[#020617]">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
                    {t("landing.faq.title")}
                </h2>

                <div className="space-y-6">
                    {(t("landing.faq.items") as unknown as any[]).map((item, index) => (
                        <details key={index} className="group bg-white/5 backdrop-blur border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:bg-white/[0.07] open:bg-white/[0.07] open:shadow-lg open:shadow-indigo-500/10">
                            <summary className="flex items-center justify-between font-bold text-lg p-6 cursor-pointer select-none text-slate-200 group-hover:text-white">
                                {item.q}
                                <span className="transform transition-transform duration-300 group-open:rotate-180 text-indigo-400">
                                    ▼
                                </span>
                            </summary>
                            <div className="px-6 pb-6 pt-0 text-slate-400 leading-relaxed border-t border-transparent group-open:border-white/5">
                                <p className="mt-2">{item.a}</p>
                            </div>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
};
