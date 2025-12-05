import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "../../hooks/useTranslation";
import { Language } from "../../locales/index";

export const LanguageSelector: React.FC = () => {
  const { lang, setLang } = useTranslation();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    setShowDropdown(false);
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
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="text-sm font-bold px-3 py-1.5 rounded-full transition-all bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-transparent hover:border-white/10 flex items-center gap-2"
        aria-label="Selecionar Idioma"
      >
        <span className="text-base">🌐</span> {lang.toUpperCase()}
      </button>
      {showDropdown && (
        <div className="absolute right-0 mt-2 w-32 glass rounded-xl shadow-2xl z-[999] overflow-hidden border border-white/10">
          <button
            onClick={() => handleLanguageChange("pt")}
            className="block w-full text-left px-4 py-2.5 text-sm text-slate-300 hover:bg-brand-500/20 hover:text-white transition-colors"
          >
            Português
          </button>
          <button
            onClick={() => handleLanguageChange("en")}
            className="block w-full text-left px-4 py-2.5 text-sm text-slate-300 hover:bg-brand-500/20 hover:text-white transition-colors"
          >
            English
          </button>
          <button
            onClick={() => handleLanguageChange("es")}
            className="block w-full text-left px-4 py-2.5 text-sm text-slate-300 hover:bg-brand-500/20 hover:text-white transition-colors"
          >
            Español
          </button>
        </div>
      )}
    </div>
  );
};
