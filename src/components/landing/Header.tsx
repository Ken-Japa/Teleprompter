import React, { useState, useEffect } from "react";
import { useTranslation } from "../../hooks/useTranslation";
import * as S from "../ui/Styled";
import { LanguageSelector } from "../ui/LanguageSelector";
import { GoogleAuthButton } from "../ui/GoogleAuthButton";
import { useFirstVisit } from "../../hooks/useFirstVisit";
import { useAuth } from "../../contexts/AuthContext";

interface HeaderProps {
    // onLaunch used to be here but is unused
}

export const Header: React.FC<HeaderProps> = () => {
    const { t } = useTranslation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user } = useAuth();
    const isFirstVisit = useFirstVisit("has_seen_landing_start_hint");
    const showStartHint = isFirstVisit && !user;

    const scrollToSection = (id: string) => {
        // Close mobile menu when navigating
        setIsMobileMenuOpen(false);

        if (window.location.pathname !== "/") {
            window.location.href = `/#${id}`;
            return;
        }

        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        } else {
            // Fallback if element not found even on home
            window.location.href = `/#${id}`;
        }
    };

    // Close menu on scroll
    useEffect(() => {
        if (!isMobileMenuOpen) return;

        const handleScroll = () => {
            setIsMobileMenuOpen(false);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isMobileMenuOpen]);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobileMenuOpen]);

    return (
        <>
            <S.LandingNav>
                <div
                    onClick={() => scrollToSection("hero")}
                    className="cursor-pointer"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && window.scrollTo(0, 0)}
                    aria-label="Go to top"
                >
                    <S.LogoText main={t("title.main")} sub={t("title.sub")} className="md:scale-100 scale-75" />
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8" role="navigation">
                    <button
                        onClick={() => scrollToSection("hero")}
                        className="text-sm font-medium text-slate-400 hover:text-white transition"
                        aria-label="Go to Home"
                    >
                        {t("menu.home")}
                    </button>
                    <button
                        onClick={() => scrollToSection("features")}
                        className="text-sm font-medium text-slate-400 hover:text-white transition"
                        aria-label="Go to Features"
                    >
                        {t("menu.features")}
                    </button>
                    <button
                        onClick={() => scrollToSection("pricing")}
                        className="text-sm font-medium text-slate-400 hover:text-white transition"
                        aria-label="Go to Pricing"
                    >
                        {t("menu.pricing")}
                    </button>
                </nav>

                <div className="flex items-center space-x-4 relative">
                    <GoogleAuthButton />

                    {/* Desktop Language Selector and Start Button */}
                    <LanguageSelector className="hidden md:block" />
                    <div className="relative group hidden sm:block">
                        {showStartHint && (
                            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 sm:opacity-100">
                                <p className="text-slate-400 text-xs font-medium animate-bounce bg-slate-900/90 backdrop-blur px-2 py-1 rounded-full border border-brand-500/30 shadow-lg flex items-center gap-1">
                                    <span className="text-sm">👆</span> {t("landing.hero.startHint") || "Comece aqui"}
                                </p>
                            </div>
                        )}
                        <S.PrimaryButton
                            onClick={() => {
                                window.location.hash = "app";
                            }}
                            aria-label={t("menu.start")}
                            className="bg-brand-600 hover:bg-brand-500 text-white font-bold shadow-brand-500/20 shadow-lg hover:scale-105 transition-transform py-3 px-6 text-sm"
                        >
                            {t("menu.start")}
                        </S.PrimaryButton>
                    </div>
                    <S.PrimaryButton
                        onClick={() => {
                            window.location.hash = "app?redeem=true";
                        }}
                        size="sm"
                        aria-label="Validar Licença"
                        className="hidden sm:block"
                    >
                        {t("menu.validate")}
                    </S.PrimaryButton>

                    {/* Mobile Start Button - Icon Only */}
                    <button
                        onClick={() => {
                            window.location.hash = "app";
                        }}
                        className="sm:hidden p-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-lg shadow-lg shadow-brand-500/20 hover:scale-105 transition-all duration-200 touch-target"
                        aria-label={t("menu.start")}
                    >
                        <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </button>

                    {/* Mobile Menu Button - Hamburger */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 text-slate-400 hover:text-white transition touch-target relative z-[60]"
                        aria-label="Toggle mobile menu"
                        aria-expanded={isMobileMenuOpen}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>
            </S.LandingNav>

            {/* Mobile Menu Overlay - Full Screen Immersive */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-[100] md:hidden">
                    {/* Backdrop with blur */}
                    <div
                        className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl animate-fade-in"
                        aria-hidden="true"
                    />

                    {/* Menu Content */}
                    <nav
                        className="relative h-full flex flex-col p-6 animate-scale-in"
                        role="navigation"
                    >
                        {/* Header with Logo and Close Button */}
                        <div className="flex items-center justify-between mb-8">
                            <S.LogoText main={t("title.main")} sub={t("title.sub")} className="scale-90 origin-left" />

                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="p-2.5 text-slate-400 hover:text-white transition rounded-full hover:bg-white/10 touch-target border border-transparent hover:border-white/10"
                                aria-label="Close menu"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>

                        {/* Navigation Links */}
                        <div className="flex-1 flex flex-col justify-center items-center space-y-6">
                            <button
                                onClick={() => scrollToSection("hero")}
                                className="text-3xl font-display font-bold text-slate-300 hover:text-white transition-colors py-4 w-full text-center active:scale-95 duration-200"
                            >
                                {t("menu.home")}
                            </button>
                            <button
                                onClick={() => scrollToSection("features")}
                                className="text-3xl font-display font-bold text-slate-300 hover:text-white transition-colors py-4 w-full text-center active:scale-95 duration-200"
                            >
                                {t("menu.features")}
                            </button>
                            <button
                                onClick={() => scrollToSection("pricing")}
                                className="text-3xl font-display font-bold text-slate-300 hover:text-white transition-colors py-4 w-full text-center active:scale-95 duration-200"
                            >
                                {t("menu.pricing")}
                            </button>
                        </div>

                        {/* Footer Actions */}
                        <div className="mt-auto pt-8 flex flex-col space-y-6">
                            <div className="flex justify-center">
                                <LanguageSelector />
                            </div>

                            <S.PrimaryButton
                                onClick={() => {
                                    window.location.hash = "app";
                                    setIsMobileMenuOpen(false);
                                }}
                                className="w-full py-4 text-lg shadow-xl shadow-brand-500/20 bg-slate-700 hover:bg-slate-600"
                                aria-label={t("menu.start")}
                            >
                                {t("menu.start")}
                            </S.PrimaryButton>

                            <S.PrimaryButton
                                onClick={() => {
                                    window.location.hash = "app?redeem=true";
                                    setIsMobileMenuOpen(false);
                                }}
                                className="w-full py-4 text-lg shadow-xl shadow-brand-500/20"
                                aria-label={t("menu.validateLicense")}
                            >
                                {t("menu.validateLicense")}
                            </S.PrimaryButton>
                        </div>
                    </nav>
                </div>
            )}
        </>
    );
};

