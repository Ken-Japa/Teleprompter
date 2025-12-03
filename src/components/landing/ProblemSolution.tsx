import React from "react";
import { useTranslation } from "../../hooks/useTranslation";

export const ProblemSolution: React.FC = () => {
    const { t } = useTranslation();

    return (
        <section className="py-20 px-6 bg-slate-950 border-y border-white/5">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white" dangerouslySetInnerHTML={{ __html: t("landing.problemSolution.title") as string }} />

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Problem */}
                    <div className="bg-red-500/5 border border-red-500/20 rounded-3xl p-8 hover:bg-red-500/10 transition-colors duration-300">
                        <h3 className="text-xl font-bold mb-6 text-red-400 flex items-center gap-2">
                            {t("landing.problemSolution.before.title")}
                        </h3>
                        <ul className="space-y-4 text-slate-300">
                            {(t("landing.problemSolution.before.items") as unknown as string[]).map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Solution */}
                    <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-3xl p-8 hover:bg-emerald-500/10 transition-colors duration-300 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
                        <h3 className="text-xl font-bold mb-6 text-emerald-400 flex items-center gap-2">
                            {t("landing.problemSolution.after.title")}
                        </h3>
                        <ul className="space-y-4 text-slate-300 relative z-10">
                            {(t("landing.problemSolution.after.items") as unknown as string[]).map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};
