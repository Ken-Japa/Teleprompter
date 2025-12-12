import React from "react";
import { useTranslation } from "../../hooks/useTranslation";

export const ComparisonTable: React.FC = () => {
    const { t } = useTranslation();

    const rows = ["remote", "offline", "privacy", "latency", "price"];
    const columns = ["ninja", "paid", "hardware", "free"];

    return (
        <section className="py-24 px-4 bg-black border-t border-white/5">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        {t("landing.comparison.title")}
                    </h2>
                    <p className="text-slate-300 text-sm md:text-base max-w-2xl mx-auto">
                        {t("landing.comparison.subtitle")}
                    </p>
                </div>

                {/* Mobile: Card Layout */}
                <div className="md:hidden space-y-4 px-4">
                    {rows.map((row) => (
                        <div key={row} className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden hover-lift transition-smooth">
                            <div className="bg-slate-800/50 px-4 py-3 border-b border-slate-700">
                                <h3 className="font-bold text-white text-center">{t(`landing.comparison.rows.${row}`)}</h3>
                            </div>
                            <div className="p-4 space-y-2">
                                {columns.map((col) => {
                                    const isNinja = col === 'ninja';
                                    const value = t(`landing.comparison.values.${col}.${row}`);
                                    let emoji = '';
                                    let textColor = 'text-slate-300';

                                    if (isNinja) {
                                        textColor = 'text-emerald-400';
                                        if (row === 'offline' || row === 'privacy') emoji = '✅ ';
                                    } else if (col === 'paid') {
                                        if (row === 'remote' || row === 'offline') emoji = '❌ ';
                                    } else if (col === 'hardware') {
                                        if (row === 'price' || row === 'remote') {
                                            emoji = '⚠️ ';
                                            textColor = 'text-yellow-400';
                                        }
                                    } else if (col === 'free') {
                                        if (row === 'privacy' || row === 'latency') emoji = '❌ ';
                                    }

                                    return (
                                        <div key={col} className={`flex items-center justify-between p-3 rounded-lg transition-smooth ${isNinja ? 'bg-brand-900/20 border border-brand-500/20' : 'bg-slate-800/30'}`}>
                                            <span className={`text-sm font-medium ${isNinja ? 'text-brand-300' : 'text-slate-300'}`}>
                                                {t(`landing.comparison.columns.${col}`)}
                                            </span>
                                            <span className={`text-sm font-bold ${textColor}`}>
                                                {emoji}{value}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Desktop: Table Layout */}
                <div className="hidden md:block overflow-x-auto border border-gray-800 rounded-2xl overflow-hidden shadow-depth">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-800">
                                <th className="py-4 px-4 bg-black"></th>
                                <th className="py-4 px-4 text-center min-w-[140px]">
                                    <div className="bg-gradient-to-r from-brand-600 to-purple-600 text-white px-4 py-2 rounded-lg font-bold shadow-lg shadow-brand-500/20 hover-glow transition-smooth">
                                        {t("landing.comparison.columns.ninja")}
                                    </div>
                                </th>
                                <th className="py-4 px-4 text-center text-slate-300 font-medium min-w-[120px]">{t("landing.comparison.columns.paid")}</th>
                                <th className="py-4 px-4 text-center text-slate-300 font-medium min-w-[120px]">{t("landing.comparison.columns.hardware")}</th>
                                <th className="py-4 px-4 text-center text-slate-300 font-medium min-w-[120px]">{t("landing.comparison.columns.free")}</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm md:text-base">
                            {rows.map((row) => (
                                <tr key={row} className="border-b border-gray-800 hover:bg-white/5 transition-smooth">
                                    <td className="py-6 px-4 font-medium text-center text-slate-200 bg-black">
                                        {t(`landing.comparison.rows.${row}`)}
                                    </td>

                                    {/* Ninja */}
                                    <td className="py-6 px-4 text-center bg-brand-900/10 border-x border-brand-500/10 relative">
                                        <span className="font-bold text-emerald-400">
                                            {row === 'offline' || row === 'privacy' ? '✅ ' : ''}
                                            {t(`landing.comparison.values.ninja.${row}`)}
                                        </span>
                                    </td>

                                    {/* Paid */}
                                    <td className="py-6 px-4 text-center text-slate-400">
                                        {row === 'remote' || row === 'offline' ? '❌ ' : ''}
                                        {t(`landing.comparison.values.paid.${row}`)}
                                    </td>

                                    {/* Hardware */}
                                    <td className={`py-6 px-4 text-center ${row === 'remote' ? 'text-yellow-400' : 'text-slate-400'}`}>
                                        {row === 'price' || row === 'remote' ? '⚠️ ' : ''}
                                        {t(`landing.comparison.values.hardware.${row}`)}
                                    </td>

                                    {/* Free */}
                                    <td className="py-6 px-4 text-center text-slate-400">
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
