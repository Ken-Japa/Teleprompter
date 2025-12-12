import React, { useState, useEffect } from "react";
import { useTranslation } from "../../hooks/useTranslation";
import * as S from "../ui/Styled";
import { LanguageSelector } from "../ui/LanguageSelector";

interface HeaderProps {
    // onLaunch used to be here but is unused
}

export const Header: React.FC<HeaderProps> = () => {
    const { t } = useTranslation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
                    <S.LogoText main={t("title.main")} sub={t("title.sub")} />
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
                    <LanguageSelector />
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

            {/* Mobile Menu Overlay - Moved OUTSIDE S.LandingNav to avoid stacking context issues */}
            {isMobileMenuOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[90] md:hidden animate-fade-in"
                        onClick={() => setIsMobileMenuOpen(false)}
                        aria-hidden="true"
                    />

                    {/* Mobile Menu - Floating Card Style */}
                    <nav
                        className="fixed top-4 right-4 w-72 bg-slate-950 border border-white/10 rounded-2xl z-[100] md:hidden animate-scale-in shadow-2xl origin-top-right overflow-hidden"
                        role="navigation"
                    >
                        {/* Close Button - Restored */}
                        <div className="flex justify-end p-4 border-b border-white/10">
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="p-2 text-slate-400 hover:text-white transition rounded-lg hover:bg-white/5 touch-target"
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

                        <div className="flex flex-col p-6 space-y-4">
                            <button
                                onClick={() => scrollToSection("hero")}
                                className="text-left text-lg font-medium text-slate-300 hover:text-white transition py-3 px-4 rounded-lg hover:bg-white/5 touch-target"
                            >
                                {t("menu.home")}
                            </button>
                            <button
                                onClick={() => scrollToSection("features")}
                                className="text-left text-lg font-medium text-slate-300 hover:text-white transition py-3 px-4 rounded-lg hover:bg-white/5 touch-target"
                            >
                                {t("menu.features")}
                            </button>
                            <button
                                onClick={() => scrollToSection("pricing")}
                                className="text-left text-lg font-medium text-slate-300 hover:text-white transition py-3 px-4 rounded-lg hover:bg-white/5 touch-target"
                            >
                                {t("menu.pricing")}
                            </button>

                            <div className="pt-6 border-t border-white/10">
                                <S.PrimaryButton
                                    onClick={() => {
                                        window.location.hash = "app?redeem=true";
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="w-full touch-target"
                                    aria-label={t("menu.validateLicense")}
                                >
                                    {t("menu.validateLicense")}
                                </S.PrimaryButton>
                            </div>
                        </div>
                    </nav>
                </>
            )}
        </>
    );
};

