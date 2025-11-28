import React from "react";
import { useTranslation } from "../../hooks/useTranslation";
import * as S from "../ui/Styled";
import { Language } from "../../locales";

interface HeaderProps {
 onLaunch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onLaunch }) => {
 const { t, lang, setLang } = useTranslation();

 const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
 };

 const handleLanguageChange = (newLang: Language) => {
  setLang(newLang);
 };

 return (
  <S.LandingNav>
   <div
    onClick={() => window.scrollTo(0, 0)}
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
     onClick={() => window.scrollTo(0, 0)}
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

   <div className="flex items-center space-x-4">
    <div className="flex space-x-2">
     <button
      onClick={() => handleLanguageChange("pt")}
      className={`text-sm font-bold px-3 py-1 rounded-lg transition ${lang === "pt" ? "bg-indigo-600 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"}`}
      aria-label="Mudar para Português"
     >
      PT
     </button>
     <button
      onClick={() => handleLanguageChange("en")}
      className={`text-sm font-bold px-3 py-1 rounded-lg transition ${lang === "en" ? "bg-indigo-600 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"}`}
      aria-label="Change to English"
     >
      EN
     </button>
    </div>
    <button
     onClick={onLaunch}
     className="text-sm font-bold bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-lg transition shadow-lg shadow-indigo-500/20"
     aria-label="Launch App"
    >
     Login
    </button>
   </div>
  </S.LandingNav>
 );
};
