import React from "react";
import { useTranslation } from "../../hooks/useTranslation";
import * as S from "../ui/Styled";

interface MusicHeroProps {
    onLaunch: () => void;
}

export const MusicHero: React.FC<MusicHeroProps> = ({ onLaunch }) => {
    const { t } = useTranslation();

    return (
        <S.HeroSection>
            <div id="hero" className="inline-flex items-center space-x-3 glass px-4 py-2 rounded-full mb-12 animate-float hover:bg-white/5 transition-colors cursor-default">
                <span className="flex h-2.5 w-2.5 relative mx-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
                </span>
                <span className="text-xs font-bold text-amber-200 uppercase tracking-widest text-shadow-glow">
                    {t("music.hero.badge") || "Modo Palco"}
                </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-black text-white mb-8 tracking-tight leading-[1.1] drop-shadow-2xl">
                <span className="block text-gradient-amber">
                    {t("music.hero.headline") || "Suas Letras e Cifras."}
                </span>
                <span className="block text-slate-100 relative z-10">
                    {t("music.hero.subHeadline") || "No Tempo Certo."}
                </span>
            </h1>

            <p className="text-lg md:text-2xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed font-light tracking-wide">
                {t("music.hero.description") || "O teleprompter feito para músicos. Role letras e acordes automaticamente, crie setlists e nunca mais esqueça uma música no palco. Funciona offline."}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 relative z-10 mb-16">
                <div className="relative group">
                    <S.PrimaryButton
                        onClick={onLaunch}
                        className="text-xl font-bold py-5 px-12 w-full sm:w-auto !rounded-2xl !bg-amber-600 hover:!bg-amber-500 !text-white shadow-amber-500/50 hover:shadow-amber-500/80 hover-glow btn-press transition-smooth border-2 border-amber-400/50 relative z-10"
                        aria-label="Launch Music App"
                    >
                        {t("music.hero.cta") || "🎸 Abrir Setlist Agora"}
                    </S.PrimaryButton>
                </div>

                {t("music.hero.ctaSecondary") && (
                    <button
                        onClick={() => {
                            const features = document.getElementById('features');
                            features?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="px-8 py-4 rounded-xl border border-white/10 hover:border-white/30 hover:bg-white/5 text-slate-300 hover:text-white transition-all font-medium backdrop-blur-sm"
                    >
                        {t("music.hero.ctaSecondary")}
                    </button>
                )}
            </div>
        </S.HeroSection >
    );
};
