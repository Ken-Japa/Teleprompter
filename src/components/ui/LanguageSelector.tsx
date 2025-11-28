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
        className="text-sm font-bold px-3 py-1 rounded-lg transition bg-slate-700 text-slate-300 hover:bg-slate-600"
        aria-label="Selecionar Idioma"
      >
        🌐 {lang.toUpperCase()}
      </button>
      {showDropdown && (
        <div className="absolute right-0 mt-2 w-32 bg-slate-800 rounded-md shadow-lg z-[999]">
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
  );
};
