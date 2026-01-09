import React, { useState } from "react";
import { useTranslation } from "../../hooks/useTranslation";
import * as S from "../ui/Styled";

interface MusicHeroProps {
    onLaunch: () => void;
}

export const MusicHero: React.FC<MusicHeroProps> = ({ onLaunch }) => {
    const { t } = useTranslation();
    const [isPlaying, setIsPlaying] = useState(false);

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
            </div>

            {/* App Video Demo - Reusing generic for now or placeholder */}
            <div className="relative max-w-4xl mx-auto mt-12 animate-fade-in-up safe-container px-4" style={{ animationDelay: '0.6s' }}>
                <div className="relative glass bg-slate-900/40 rounded-2xl shadow-2xl overflow-hidden border border-white/10 group card-depth hover-lift">
                    {!isPlaying ? (
                        <div
                            className="w-full h-auto aspect-video rounded-2xl relative z-0 cursor-pointer"
                            onClick={() => setIsPlaying(true)}
                        >
                            <div className="absolute inset-0 bg-amber-500/5 group-hover:bg-amber-500/10 transition-colors pointer-events-none z-10"></div>
                            {/* Placeholder Video Thumbnail - Replace with music specific if available */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-slate-500 text-sm">Demo Video Placeholder</span>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center z-20">
                                <div className="w-20 h-20 bg-amber-600 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                                    <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-black text-white p-20">
                            Video Placehoder
                        </div>
                    )}
                </div>
                {/* Ambient Glow */}
                <div className="absolute -inset-4 bg-amber-500/20 blur-3xl -z-10 rounded-[3rem] opacity-30"></div>
            </div>

        </S.HeroSection >
    );
};
