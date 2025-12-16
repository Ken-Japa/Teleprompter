import React, { useState } from "react";
import * as S from "./Styled";
import { useTranslation } from "../../hooks/useTranslation";
import {
    calculateWordCount,
    calculateReadingTime,
    getPlatformRecommendations,
    formatTime,
    getRecommendedWPM,
} from "../../utils/pacingCalculator";

interface PacingModalProps {
    isOpen: boolean;
    onClose: () => void;
    text: string;
}

export const PacingModal: React.FC<PacingModalProps> = ({ isOpen, onClose, text }) => {
    const { t } = useTranslation();
    const wpmRates = getRecommendedWPM();
    const [customWPM, setCustomWPM] = useState<string>(wpmRates.medium.toString());

    const wordCount = calculateWordCount(text);
    const platformRecommendations = getPlatformRecommendations(wordCount);

    // Calculate times for preset WPMs
    const slowTime = calculateReadingTime(wordCount, wpmRates.slow);
    const mediumTime = calculateReadingTime(wordCount, wpmRates.medium);
    const fastTime = calculateReadingTime(wordCount, wpmRates.fast);

    // Calculate time for custom WPM
    const customWPMNumber = parseInt(customWPM) || wpmRates.medium;
    const customTime = calculateReadingTime(wordCount, customWPMNumber);

    return (
        <S.Modal isOpen={isOpen} onClose={onClose} title={t("pacing.title")}>
            <div className="space-y-6">
                {/* Word Count */}
                <div className="p-4 bg-gradient-to-br from-brand-500/10 to-purple-500/10 rounded-lg border border-brand-500/20">
                    <div className="text-center">
                        <div className="text-5xl font-bold text-brand-400 mb-2">{wordCount}</div>
                        <div className="text-sm text-slate-400 uppercase tracking-wider">{t("pacing.wordCount")}</div>
                    </div>
                </div>

                {/* Reading Time Estimates */}
                <section>
                    <h3 className="text-lg font-semibold text-white mb-4">{t("pacing.estimatedTime")}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {/* Slow */}
                        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                            <div className="text-xs text-slate-400 uppercase tracking-wider mb-2">
                                {t("pacing.slow")}
                            </div>
                            <div className="text-2xl font-bold text-blue-400">{formatTime(slowTime)}</div>
                            <div className="text-xs text-slate-500 mt-1">{wpmRates.slow} WPM</div>
                        </div>

                        {/* Medium */}
                        <div className="bg-gradient-to-br from-brand-500/20 to-purple-500/20 rounded-lg p-4 border border-brand-500/30">
                            <div className="text-xs text-slate-400 uppercase tracking-wider mb-2">
                                {t("pacing.medium")}
                            </div>
                            <div className="text-2xl font-bold text-brand-400">{formatTime(mediumTime)}</div>
                            <div className="text-xs text-slate-500 mt-1">{wpmRates.medium} WPM</div>
                        </div>

                        {/* Fast */}
                        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                            <div className="text-xs text-slate-400 uppercase tracking-wider mb-2">
                                {t("pacing.fast")}
                            </div>
                            <div className="text-2xl font-bold text-purple-400">{formatTime(fastTime)}</div>
                            <div className="text-xs text-slate-500 mt-1">{wpmRates.fast} WPM</div>
                        </div>
                    </div>
                </section>

                {/* Custom WPM Calculator */}
                <section>
                    <h3 className="text-lg font-semibold text-white mb-4">{t("pacing.custom.title")}</h3>
                    <div className="bg-slate-900/50 rounded-xl p-4 border border-white/5">
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <div className="flex-1 w-full">
                                <label className="block text-sm text-slate-400 mb-2">{t("pacing.custom.label")}</label>
                                <input
                                    type="number"
                                    min="60"
                                    max="300"
                                    value={customWPM}
                                    onChange={(e) => setCustomWPM(e.target.value)}
                                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-brand-500 transition-colors"
                                    placeholder="150"
                                />
                            </div>
                            <div className="flex-1 w-full sm:pt-6">
                                <div className="text-center sm:text-left">
                                    <div className="text-3xl font-bold text-brand-400">{formatTime(customTime)}</div>
                                    <div className="text-xs text-slate-500 mt-1">{t("pacing.custom.result")}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Total Time with Pauses (if applicable) */}
                {(() => {
                    const pauseMatches = text.matchAll(/\[(pause|pausa)\s+(\d+)\]/gi);
                    let totalPauseSeconds = 0;
                    for (const match of pauseMatches) {
                        const duration = parseInt(match[2], 10);
                        if (!isNaN(duration)) {
                            totalPauseSeconds += duration;
                        }
                    }

                    if (totalPauseSeconds > 0) {
                        const totalWithPauses = customTime + totalPauseSeconds;
                        return (
                            <section className="animate-fade-in">
                                <h3 className="text-lg font-semibold text-white mb-4">{t("pacing.totalWithPauses.title", "Total Duration (with Pauses)")}</h3>
                                <div className="bg-gradient-to-r from-blue-900/40 to-indigo-900/40 rounded-xl p-4 border border-blue-500/30">
                                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                        <div className="text-sm text-blue-200">
                                            {t("pacing.totalWithPauses.details", "Reading Time")} ({formatTime(customTime)}) + {t("pacing.totalWithPauses.pauses", "Pauses")} ({formatTime(totalPauseSeconds)})
                                        </div>
                                        <div className="text-3xl font-bold text-blue-400 drop-shadow-lg">
                                            {formatTime(totalWithPauses)}
                                        </div>
                                    </div>
                                </div>
                            </section>
                        );
                    }
                    return null;
                })()}

                {/* Platform Recommendations */}
                <section>
                    <h3 className="text-lg font-semibold text-white mb-4">{t("pacing.platforms.title")}</h3>
                    <div className="space-y-3">
                        {platformRecommendations.map((rec) => {
                            const platformKey = rec.platform.key;
                            const isPerfect = rec.currentFit === "perfect";
                            const isTooLong = rec.currentFit === "tooLong";

                            return (
                                <div
                                    key={platformKey}
                                    className={`p-4 rounded-lg border ${isPerfect
                                        ? "bg-green-500/10 border-green-500/30"
                                        : "bg-slate-800/30 border-slate-700/50"
                                        }`}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <div className="text-sm font-semibold text-white">
                                                {t(`pacing.platforms.${platformKey}`)}
                                            </div>
                                            {isPerfect && (
                                                <span className="text-green-400 text-xs">
                                                    ✓ {t("pacing.suggestions.perfect")}
                                                </span>
                                            )}
                                        </div>
                                        <div className="text-xs text-slate-400">
                                            ~{rec.suggestedWords.medium} {t("pacing.wordCount").toLowerCase()}
                                        </div>
                                    </div>

                                    {!isPerfect && rec.adjustment && (
                                        <div className={`text-sm ${isTooLong ? "text-red-400" : "text-yellow-400"}`}>
                                            {isTooLong
                                                ? t("pacing.suggestions.tooLong", {
                                                    words: rec.adjustment.words,
                                                })
                                                : t("pacing.suggestions.tooShort", {
                                                    words: rec.adjustment.words,
                                                })}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </section>
            </div>
        </S.Modal>
    );
};
