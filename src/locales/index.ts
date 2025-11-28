import { pt } from "./pt";
import { en } from "./en";
import { es } from "./es";

export const resources = {
 pt,
 en,
 es,
};

export type Language = "pt" | "en" | "es";
export type TranslationKey = keyof typeof pt;
