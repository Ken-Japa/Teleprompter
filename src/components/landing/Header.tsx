import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "../../hooks/useTranslation";
import * as S from "../ui/Styled";
import { Language } from "../../locales/index";

interface HeaderProps {
 onLaunch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onLaunch }) => {
 const { t, lang, setLang } = useTranslation();
 const [showDropdown, setShowDropdown] = useState(false);
 const dropdownRef = useRef<HTMLDivElement>(null);

 const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
 };

 const handleLanguageChange = (newLang: Language) => {
  setLang(newLang);
  setShowDropdown(false); // Fecha o dropdown após a seleção
 };

 const toggleDropdown = () => {
  setShowDropdown((prev) => !prev);
 };

 useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
   if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
    setShowDropdown(false);
   }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
   document.removeEventListener("mousedown", handleClickOutside);
  };
 }, [dropdownRef]);

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

   <div className="flex items-center space-x-4 relative">
    <div className="relative" ref={dropdownRef}>
     <button
      onClick={toggleDropdown}
      className="text-sm font-bold px-3 py-1 rounded-lg transition bg-slate-700 text-slate-300 hover:bg-slate-600"
      aria-label="Selecionar Idioma"
     >
      🌐 {lang.toUpperCase()}
     </button>
     {showDropdown && (
      <div className="absolute right-0 mt-2 w-32 bg-slate-800 rounded-md shadow-lg z-10">
       <button
        onClick={() => handleLanguageChange("pt")}
        className="block w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700"
       >
        Português
       </button>
       <button
        onClick={() => handleLanguageChange("en")}
        className="block w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700"
       >
        English
       </button>
       <button
        onClick={() => handleLanguageChange("es")}
        className="block w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700"
       >
        Español
       </button>
      </div>
     )}
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
