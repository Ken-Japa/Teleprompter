import React from "react";
import { useTranslation } from "../../hooks/useTranslation";

export const ComparisonTable: React.FC = () => {
    const { t } = useTranslation();

    const rows = ["remote", "offline", "privacy", "latency", "price"];

    return (
        <section className="py-24 px-4 bg-black border-t border-white/5">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        {t("landing.comparison.title")}
                    </h2>
                    <p className="text-slate-400">
                        {t("landing.comparison.subtitle")}
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-800">
                                <th className="py-4 pr-4 bg-black sticky left-0 z-10"></th>
                                <th className="py-4 px-4 text-center min-w-[140px]">
                                    <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-4 py-2 rounded-lg font-bold shadow-lg shadow-indigo-500/20">
                                        {t("landing.comparison.columns.ninja")}
                                    </div>
                                </th>
                                <th className="py-4 px-4 text-center text-gray-400 font-medium min-w-[120px]">{t("landing.comparison.columns.paid")}</th>
                                <th className="py-4 px-4 text-center text-gray-400 font-medium min-w-[120px]">{t("landing.comparison.columns.hardware")}</th>
                                <th className="py-4 px-4 text-center text-gray-400 font-medium min-w-[120px]">{t("landing.comparison.columns.free")}</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm md:text-base">
                            {rows.map((row) => (
                                <tr key={row} className="border-b border-gray-800 hover:bg-white/5 transition-colors">
                                    <td className="py-6 pr-4 font-medium text-slate-300 bg-black sticky left-0 z-10 border-r border-gray-800/50 md:border-none">
                                        {t(`landing.comparison.rows.${row}`)}
                                    </td>
                                    
                                    {/* Ninja */}
                                    <td className="py-6 px-4 text-center bg-indigo-900/10 border-x border-indigo-500/10 relative">
                                        {/* Highlight logic based on row content could be added here, but simple text is fine for now */}
                                        <span className="font-bold text-emerald-400">
                                            {row === 'offline' || row === 'privacy' ? '✅ ' : ''}
                                            {t(`landing.comparison.values.ninja.${row}`)}
                                        </span>
                                    </td>

                                    {/* Paid */}
                                    <td className="py-6 px-4 text-center text-slate-500">
                                         {row === 'remote' || row === 'offline' ? '❌ ' : ''}
                                         {t(`landing.comparison.values.paid.${row}`)}
                                    </td>

                                    {/* Hardware */}
                                    <td className="py-6 px-4 text-center text-slate-500">
                                         {row === 'price' ? '⚠️ ' : ''}
                                         {t(`landing.comparison.values.hardware.${row}`)}
                                    </td>

                                    {/* Free */}
                                    <td className="py-6 px-4 text-center text-slate-500">
                                         {row === 'privacy' || row === 'latency' ? '❌ ' : ''}
                                         {t(`landing.comparison.values.free.${row}`)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};
