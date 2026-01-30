import { useState, useCallback, useEffect, createContext, useContext, ReactNode } from "react";
import { resources, Language } from "../locales/index";

interface TranslationContextType {
    lang: Language;
    setLang: (lang: Language) => void;
    t: (path: string, params?: Record<string, string | number | boolean>) => any;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const getInitialLanguage = (): Language => {
    // 1. Tenta obter do prefixo do caminho (/en/, /es/)
    if (typeof window !== "undefined") {
        const path = window.location.pathname;
        if (path === "/en" || path.startsWith("/en/")) return "en";
        if (path === "/es" || path.startsWith("/es/")) return "es";
    }

    // 2. Tenta obter do parâmetro 'lang' da URL
    if (typeof window !== "undefined") {
        const urlParams = new URLSearchParams(window.location.search);
        const urlLang = urlParams.get("lang")?.trim().replace(/\/$/, ""); // Remove trailing slash and whitespace
        if (urlLang === "pt" || urlLang === "en" || urlLang === "es") {
            return urlLang as Language;
        }
    }

    // 3. Tenta obter do localStorage
    if (typeof window !== "undefined") {
        const storedLang = localStorage.getItem("app_language");
        if (storedLang === "pt" || storedLang === "en" || storedLang === "es") {
            return storedLang as Language;
        }
    }

    // 3. Tenta detectar do navegador
    if (typeof navigator !== "undefined") {
        const browserLang = navigator.language.split("-")[0];
        if (browserLang === "pt" || browserLang === "en" || browserLang === "es") {
            return browserLang as Language;
        }
    }

    // 4. Padrão para português
    return "pt";
};

export const TranslationProvider = ({ children, initialLang }: { children: ReactNode; initialLang?: Language }) => {
    const [lang, setLangState] = useState<Language>(() => {
        if (initialLang) return initialLang;
        return getInitialLanguage();
    });

    // Update lang if initialLang changes (optional, depending on behavior desired)
    useEffect(() => {
        if (initialLang) {
            setLangState(initialLang);
        }
    }, [initialLang]);

    // Atualiza o localStorage sempre que o idioma muda
    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("app_language", lang);
            document.documentElement.lang = lang === 'pt' ? 'pt-BR' : lang === 'es' ? 'es-ES' : 'en-US';
        }
    }, [lang]);

    const setLang = useCallback((newLang: Language) => {
        setLangState(newLang);
    }, []);

    const t = useCallback(
        (path: string, params?: Record<string, string | number | boolean>) => {
            const keys = path.split(".");
            let current: any = resources[lang];

            for (const key of keys) {
                if (current[key] === undefined) {
                    console.warn(`Translation missing for key: ${path}`);
                    return path;
                }
                current = current[key];
            }

            // String interpolation logic
            if (typeof current === "string" && params) {
                return current.replace(/{{(\w+)}}/g, (_, key) => {
                    return params[key] !== undefined ? String(params[key]) : `{{${key}}}`;
                });
            }

            return current;
        },
        [lang]
    );

    const value = { lang, setLang, t };

    return <TranslationContext.Provider value={value}>{children}</TranslationContext.Provider>;
};

export const useTranslation = () => {
    const context = useContext(TranslationContext);
    if (context === undefined) {
        throw new Error("useTranslation must be used within a TranslationProvider");
    }
    return context;
};
