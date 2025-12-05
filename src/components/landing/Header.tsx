import React from "react";
import { useTranslation } from "../../hooks/useTranslation";
import * as S from "../ui/Styled";
import { LanguageSelector } from "../ui/LanguageSelector";

interface HeaderProps {
    onLaunch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onLaunch }) => {
    const { t } = useTranslation();

    const scrollToSection = (id: string) => {
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

    return (
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
                >
                    Validar
                </S.PrimaryButton>
            </div>
        </S.LandingNav>
    );
};
