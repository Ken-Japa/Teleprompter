import React from "react";
import { useTranslation } from "../../hooks/useTranslation";
import * as S from "../ui/Styled";
import { MicIcon } from "../ui/Icons";

interface BilingualTextEditorProps {
    primaryText: string;
    secondaryText: string;
    onChange: (texts: { primary: string; secondary: string; primaryLanguage?: string; secondaryLanguage?: string }) => void;
    voiceTrackLanguage?: 'primary' | 'secondary';
    onVoiceTrackLanguageChange?: (lang: 'primary' | 'secondary') => void;
    primaryLanguage?: string;
    secondaryLanguage?: string;
}

const SUPPORTED_LANGUAGES = ['pt', 'en', 'es', 'it', 'fr', 'de', 'ja', 'zh', 'other'];

export const BilingualTextEditor: React.FC<BilingualTextEditorProps> = ({
    primaryText,
    secondaryText,
    onChange,
    voiceTrackLanguage = 'primary',
    onVoiceTrackLanguageChange,
    primaryLanguage = 'pt',
    secondaryLanguage = 'en'
}) => {
    const { t } = useTranslation();

    const handleTextChange = (p: string, s: string, pLang?: string, sLang?: string) => {
        onChange({
            primary: p,
            secondary: s,
            primaryLanguage: pLang || primaryLanguage,
            secondaryLanguage: sLang || secondaryLanguage
        });
    };

    const LanguageSelect = ({ value, onChangeLang }: { value: string, onChangeLang: (l: string) => void }) => (
        <select
            value={value}
            onChange={(e) => onChangeLang(e.target.value)}
            className="bg-slate-800 text-slate-300 text-xs rounded border border-slate-700 px-2 py-1 outline-none focus:border-brand-500/50 transition-colors"
        >
            {SUPPORTED_LANGUAGES.map(code => (
                <option key={code} value={code}>{t(`bilingual.languages.${code}`)}</option>
            ))}
        </select>
    );

    return (
        <div className="flex flex-col md:flex-row gap-2 h-full overflow-hidden">
            {/* Primary Language Column */}
            <div className="flex-1 flex flex-col min-h-[250px] md:min-h-0">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                        <label className="text-sm text-slate-400 font-medium">
                            {t("bilingual.primaryLanguage")}
                        </label>
                        <LanguageSelect
                            value={primaryLanguage}
                            onChangeLang={(l) => handleTextChange(primaryText, secondaryText, l, secondaryLanguage)}
                        />
                    </div>

                    {onVoiceTrackLanguageChange && (
                        <button
                            onClick={() => onVoiceTrackLanguageChange('primary')}
                            className={`p-1.5 rounded-md transition-all flex items-center gap-1.5 text-xs font-medium border ${voiceTrackLanguage === 'primary'
                                ? 'bg-brand-500/20 text-brand-400 border-brand-500/30'
                                : 'bg-slate-800 text-slate-500 border-transparent hover:bg-slate-700'
                                }`}
                            title={t("bilingual.trackLanguage")}
                        >
                            <MicIcon className="w-3.5 h-3.5" />
                            {voiceTrackLanguage === 'primary' && <span className="hidden sm:inline">{t("bilingual.tracking")}</span>}
                        </button>
                    )}
                </div>
                <S.EditorTextArea
                    value={primaryText}
                    onChange={(e) => handleTextChange(e.target.value, secondaryText)}
                    placeholder={t("bilingual.primaryPlaceholder")}
                />
            </div>

            {/* Divider */}
            <div className="h-px md:h-auto md:w-px bg-slate-700/50 my-1 md:my-0" />

            {/* Secondary Language Column */}
            <div className="flex-1 flex flex-col min-h-[250px] md:min-h-0">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                        <label className="text-sm text-slate-400 font-medium">
                            {t("bilingual.secondaryLanguage")}
                        </label>
                        <LanguageSelect
                            value={secondaryLanguage}
                            onChangeLang={(l) => handleTextChange(primaryText, secondaryText, primaryLanguage, l)}
                        />
                    </div>

                    {onVoiceTrackLanguageChange && (
                        <button
                            onClick={() => onVoiceTrackLanguageChange('secondary')}
                            className={`p-1.5 rounded-md transition-all flex items-center gap-1.5 text-xs font-medium border ${voiceTrackLanguage === 'secondary'
                                ? 'bg-brand-500/20 text-brand-400 border-brand-500/30'
                                : 'bg-slate-800 text-slate-500 border-transparent hover:bg-slate-700'
                                }`}
                            title={t("bilingual.trackLanguage")}
                        >
                            <MicIcon className="w-3.5 h-3.5" />
                            {voiceTrackLanguage === 'secondary' && <span className="hidden sm:inline">{t("bilingual.tracking")}</span>}
                        </button>
                    )}
                </div>
                <S.EditorTextArea
                    value={secondaryText}
                    onChange={(e) => handleTextChange(primaryText, e.target.value)}
                    placeholder={t("bilingual.secondaryPlaceholder")}
                />
            </div>
        </div>
    );
};
