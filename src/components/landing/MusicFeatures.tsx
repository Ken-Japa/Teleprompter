import React from "react";
import { useTranslation } from "../../hooks/useTranslation";
import * as S from "../ui/Styled";
import { MusicIcon, MicIcon, PaletteIcon, ShieldIcon, ZapIcon, CrownIcon } from "../ui/Icons";

export const MusicFeatures: React.FC = () => {
    const { t } = useTranslation();

    return (
        <S.FeaturesSection id="features">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <S.SectionHeader>
                    <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
                        {t("music.features.headline") || "Tudo para o seu Show"}
                    </h2>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                        {t("music.features.subheadline") || "Ferramentas essenciais para ensaios e apresentações ao vivo."}
                    </p>
                </S.SectionHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Setlist / Scripts */}
                    <div className="stagger-item">
                        <S.FeatureCard
                            icon={<ZapIcon className="w-8 h-8 text-amber-400" />}
                            title={t("music.features.setlist.title") || "Setlists Ilimitados"}
                            desc={t("music.features.setlist.desc") || "Crie e organize repertórios para diferentes shows. Troque de música com um clique."}
                        />
                    </div>

                    {/* Offline Mode */}
                    <div className="stagger-item">
                        <S.FeatureCard
                            icon={<ShieldIcon className="w-8 h-8 text-green-400" />}
                            title={t("music.features.offline.title") || "100% Offline"}
                            desc={t("music.features.offline.desc") || "Sem internet no palco? Sem problemas. O PromptNinja Music salva tudo no seu dispositivo."}
                        />
                    </div>

                    {/* Dark Mode / Themes */}
                    <div className="stagger-item">
                        <S.FeatureCard
                            icon={<PaletteIcon className="w-8 h-8 text-purple-400" />}
                            title={t("music.features.themes.title") || "Modo Noturno (Stage Mode)"}
                            desc={t("music.features.themes.desc") || "Fundo escuro e letras contrastantes. Perfeito para ambientes com pouca luz sem ofuscar sua visão."}
                        />
                    </div>

                    {/* Lyrics Layout */}
                    <div className="stagger-item">
                        <S.FeatureCard
                            icon={<MusicIcon className="w-8 h-8 text-blue-400" />}
                            title={t("music.features.lyrics.title") || "Zero Lag P2P"}
                            desc={t("music.features.lyrics.desc") || "Controle remoto via celular com resposta instantânea."}
                        />
                    </div>

                    {/* Pedals & Hotkeys - NEW */}
                    <div className="stagger-item">
                        <S.FeatureCard
                            icon={<div className="w-8 h-8 text-rose-400"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg></div>}
                            title={t("music.features.pedal.title") || "Pedais e Hotkeys"}
                            desc={t("music.features.pedal.desc") || "Atalhos nativos para Page Up/Down. Compatível com pedais bluetooth."}
                        />
                    </div>

                    {/* BPM Sync - NEW */}
                    <div className="stagger-item">
                        <S.FeatureCard
                            icon={<div className="w-8 h-8 text-cyan-400"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>}
                            title={
                                <span className="flex items-center gap-2">
                                    {t("music.features.bpm.title") || "BPM Sync"}
                                    <span className="bg-cyan-500/20 text-cyan-300 text-[10px] px-2 py-0.5 rounded-full border border-cyan-500/30 uppercase tracking-wider font-bold">Em breve</span>
                                </span>
                            }
                            desc={t("music.features.bpm.desc") || "Rolagem automática no ritmo da banda."}
                        />
                    </div>

                    {/* Voice Control (Pro) */}
                    <div className="stagger-item">
                        <S.FeatureCard
                            className="border-amber-500/30"
                            icon={<MicIcon className="w-8 h-8 text-amber-400" />}
                            title={
                                <span className="flex items-center gap-2">
                                    {t("landing.features.voice.title")}
                                    <span className="bg-amber-500/20 text-amber-300 text-[10px] px-2 py-0.5 rounded-full border border-amber-500/30 uppercase tracking-wider font-bold">Pro</span>
                                </span>
                            }
                            desc={t("music.features.voice.desc") || "Deixe o PromptNinja virar a página pra você."}
                        />
                    </div>

                    {/* Pro Callout */}
                    <div className="stagger-item">
                        <S.FeatureCard
                            className="bg-gradient-to-br from-slate-900 to-amber-900/20 border-amber-500/30"
                            icon={<CrownIcon className="w-8 h-8 text-yellow-400" />}
                            title={t("landing.pricing.pro.title")}
                            desc={t("music.features.pro.desc") || "Desbloqueie controle por voz e setlists infinitos."}
                        />
                    </div>
                </div>
            </div>
        </S.FeaturesSection>
    );
};
