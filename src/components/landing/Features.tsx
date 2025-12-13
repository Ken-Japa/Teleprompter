import React from "react";
import { useTranslation } from "../../hooks/useTranslation";
import * as S from "../ui/Styled";
import { MagicIcon, MicIcon, PaletteIcon, ShieldIcon, ZapIcon, CrownIcon, TimerIcon, PiPIcon, RecordIcon, KeyboardIcon } from "../ui/Icons";

export const Features: React.FC = () => {
    const { t } = useTranslation();

    return (
        <section id="features" className="py-24 bg-slate-950 relative">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t("landing.features.title") || "Features"}</h2>
                    <p className="text-slate-300 max-w-2xl mx-auto">{t("landing.features.subtitle") || "Everything you need for professional teleprompting"}</p>
                </div>

                {/* Voice Control Highlight - New Section */}
                <div className="mb-12 stagger-item">
                    <S.FeatureCard
                        className="md:col-span-3 border-emerald-500/30 max-w-4xl mx-auto text-center"
                        icon={<MicIcon className="w-8 h-8 text-emerald-400 icon-hover-rotate" />}
                        title={t("landing.features.voice.title")}
                        desc={t("landing.features.voice.desc")}
                    >
                        <a
                            href="https://pay.kiwify.com.br/dl571EZ"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-6 py-3 text-base font-bold text-white transition-all transform bg-emerald-600 rounded-xl hover:bg-emerald-500 hover:scale-105 shadow-lg shadow-emerald-500/25 group-hover:shadow-emerald-500/40"
                        >
                            {t("landing.features.voice.cta") || "Unlock PRO Feature 🎤"}
                        </a>
                    </S.FeatureCard>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    <div className="stagger-item">
                        <S.FeatureCard
                            icon={<ZapIcon className="w-6 h-6 icon-hover-rotate" />}
                            title={t("landing.features.sync.title")}
                            desc={t("landing.features.sync.desc")}
                        />
                    </div>
                    <div className="stagger-item">
                        <S.FeatureCard
                            icon={<CrownIcon className="w-6 h-6 icon-hover-rotate" />}
                            title={t("landing.features.privacy.title")}
                            desc={t("landing.features.privacy.desc")}
                        />
                    </div>
                    <div className="stagger-item">
                        <S.FeatureCard
                            icon={<PiPIcon className="w-6 h-6 icon-hover-rotate" />}
                            title={t("landing.features.pip.title")}
                            desc={t("landing.features.pip.desc")}
                        />
                    </div>
                    <div className="stagger-item">
                        <S.FeatureCard
                            icon={<ShieldIcon className="w-6 h-6 icon-hover-rotate" />}
                            title={t("landing.features.offline.title")}
                            desc={t("landing.features.offline.desc")}
                        />
                    </div>
                    <div className="stagger-item">
                        <S.FeatureCard
                            icon={<PaletteIcon className="w-6 h-6 icon-hover-rotate" />}
                            title={t("landing.features.themes.title")}
                            desc={t("landing.features.themes.desc")}
                        />
                    </div>
                    <div className="stagger-item">
                        <S.FeatureCard
                            icon={<TimerIcon className="w-6 h-6 icon-hover-rotate" />}
                            title={t("landing.features.pacing.title")}
                            desc={t("landing.features.pacing.desc")}
                        />
                    </div>
                    <div className="stagger-item">
                        <S.FeatureCard
                            icon={<RecordIcon className="w-6 h-6 icon-hover-rotate" />}
                            title={t("landing.features.recording.title")}
                            desc={t("landing.features.recording.desc")}
                        />
                    </div>
                    <div className="stagger-item">
                        <S.FeatureCard
                            icon={<MagicIcon className="w-6 h-6 icon-hover-rotate" />}
                            title={t("landing.features.focus.title")}
                            desc={t("landing.features.focus.desc")}
                        />
                    </div>
                    <div className="stagger-item">
                        <S.FeatureCard
                            icon={<KeyboardIcon className="w-6 h-6 icon-hover-rotate" />}
                            title={t("landing.features.shortcuts.title")}
                            desc={t("landing.features.shortcuts.desc")}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};
