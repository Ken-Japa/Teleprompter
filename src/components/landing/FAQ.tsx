import React from "react";
import { useTranslation } from "../../hooks/useTranslation";
import { useFAQSchema } from "../../hooks/useFAQSchema";

interface FAQProps {
    items?: Array<{ q: string; a: string }>;
    titleKey?: string;
}

export const FAQ: React.FC<FAQProps> = ({ items, titleKey = "landing.faq.title" }) => {
    const { t } = useTranslation();
    const rawItems = items || (t("landing.faq.items") as unknown as any[]);
    const faqItems = Array.isArray(rawItems) ? rawItems : [];

    useFAQSchema(faqItems);

    return (
        <section className="py-24 px-6 bg-[#020617]">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
                    {t(titleKey)}
                </h2>

                <div className="space-y-6">
                    {faqItems.map((item, index) => (
                        <details key={index} className="group bg-white/5 backdrop-blur border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:bg-white/[0.07] open:bg-white/[0.07] open:shadow-lg open:shadow-brand-500/10">
                            <summary className="flex items-center justify-between font-bold text-lg p-6 cursor-pointer select-none text-slate-200 group-hover:text-white list-none">
                                <h3 className="inline text-lg font-bold m-0">{item.q}</h3>
                                <div className="text-brand-400 transition-transform duration-300 group-open:rotate-180">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                </div>
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
