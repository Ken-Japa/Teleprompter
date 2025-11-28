import { useState, useCallback } from "react";
import { resources, Language } from "../locales";

export const useTranslation = () => {
 const [lang, setLang] = useState<Language>("pt");

 const t = useCallback(
  (path: string, params?: Record<string, string | number>) => {
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

 return { t, setLang, lang };
};
