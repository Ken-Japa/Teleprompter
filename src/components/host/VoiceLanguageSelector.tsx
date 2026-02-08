import React from 'react';
import { useTranslation } from "../../hooks/useTranslation";

interface LanguageSelectorProps {
    value?: string;
    onChange: (lang: string) => void;
    className?: string;
}

const SUPPORTED_LANGUAGES = ['pt', 'en', 'es', 'it', 'fr', 'de', 'ja', 'zh', 'other'];

export const VoiceLanguageSelector: React.FC<LanguageSelectorProps> = ({
    value = '',
    onChange,
    className = ''
}) => {
    const { t } = useTranslation();

    // Map empty string to global lang for the UI label if needed, 
    // but the selector itself can handle "" as "auto/global"

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <label className="text-xs text-slate-500 font-medium whitespace-nowrap hidden sm:inline">
                {t("host.controls.voiceLanguage") || "Idioma de Reconhecimento"}:

                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="bg-slate-800 text-slate-300 text-[11px] sm:text-xs rounded border border-slate-700 px-1.5 py-1 outline-none focus:border-brand-500/50 transition-colors"
                    title={t("bilingual.trackLanguage")}
                    name="voiceLanguage"
                    id="voiceLanguage"
                >
                    <option value="">{t("bilingual.languages.auto") || "Automático"}</option>
                    {SUPPORTED_LANGUAGES.map(code => (
                        code !== 'other' && (
                            <option key={code} value={code}>
                                {t(`bilingual.languages.${code}`)}
                            </option>
                        )
                    ))}
                    <option value="other">{t("bilingual.languages.other")}</option>
                </select>
            </label>
        </div>
    );
};
