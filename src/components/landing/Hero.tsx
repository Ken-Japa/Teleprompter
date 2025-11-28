import React from "react";
import { useTranslation } from "../../hooks/useTranslation";
import * as S from "../ui/Styled";
import { RocketIcon } from "../ui/Icons";

interface HeroProps {
    onLaunch: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onLaunch }) => {
    const { t } = useTranslation();

    return (
        <S.HeroSection>
            <div className="inline-flex items-center space-x-3 bg-slate-900/60 border border-white/10 backdrop-blur-md rounded-full pl-2 pr-5 py-2 mb-12 shadow-lg shadow-indigo-500/10 hover:border-indigo-500/30 transition-colors cursor-default animate-float">
                <span className="flex h-2.5 w-2.5 relative mx-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-bold text-indigo-200 uppercase tracking-widest text-shadow-glow">
                    {t("landing.hero.versionLive")}
                </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-9xl font-display font-black text-white mb-8 tracking-tight leading-[0.9] drop-shadow-2xl">
                {(t("landing.hero.headline") as string).split(" ").map((word, i) => (
                    <span
                        key={i}
                        className={
                            i === 2 || i === 3 ? "text-gradient block md:inline relative z-10" : "block md:inline text-slate-100"
                        }
                    >
                        {word}{" "}
                    </span>
                ))}
            </h1>
            <p className="text-lg md:text-2xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed font-light tracking-wide">
                {t("landing.hero.subheadline")}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 relative z-10">
                <S.PrimaryButton
                    onClick={onLaunch}
                    className="text-lg py-5 px-12 w-full sm:w-auto shadow-[0_0_50px_rgba(99,102,241,0.4)] hover:shadow-[0_0_80px_rgba(99,102,241,0.6)] transform hover:-translate-y-1 !rounded-2xl ring-2 ring-white/10"
                    aria-label="Launch Web App"
                >
                    {t("landing.hero.cta")} <RocketIcon className="w-5 h-5 ml-2" />
                </S.PrimaryButton>
            </div>
        </S.HeroSection>
    );
};
