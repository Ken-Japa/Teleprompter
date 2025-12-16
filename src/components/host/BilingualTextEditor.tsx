import React from "react";
import { useTranslation } from "../../hooks/useTranslation";
import * as S from "../ui/Styled";
import { MicIcon } from "../ui/Icons";

interface BilingualTextEditorProps {
    primaryText: string;
    secondaryText: string;
    onChange: (texts: { primary: string; secondary: string }) => void;
    voiceTrackLanguage?: 'primary' | 'secondary';
    onVoiceTrackLanguageChange?: (lang: 'primary' | 'secondary') => void;
}

export const BilingualTextEditor: React.FC<BilingualTextEditorProps> = ({
    primaryText,
    secondaryText,
    onChange,
    voiceTrackLanguage = 'primary',
    onVoiceTrackLanguageChange
}) => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col md:flex-row gap-2 h-full">
            {/* Primary Language Column */}
            <div className="flex-1 flex flex-col min-h-[300px] md:min-h-0">
                <div className="flex items-center justify-between mb-2">
                    <label className="text-sm text-slate-400 font-medium">
                        {t("bilingual.primaryLanguage")}
                    </label>

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
                            {voiceTrackLanguage === 'primary' && <span>{t("bilingual.tracking")}</span>}
                        </button>
                    )}
                </div>
                <S.EditorTextArea
                    value={primaryText}
                    onChange={(e) => onChange({
                        primary: e.target.value,
                        secondary: secondaryText
                    })}
                    placeholder={t("bilingual.primaryPlaceholder")}
                />
            </div>

            {/* Divider */}
            <div className="h-px md:h-auto md:w-px bg-slate-700/50 my-2 md:my-0" />

            {/* Secondary Language Column */}
            <div className="flex-1 flex flex-col min-h-[300px] md:min-h-0">
                <div className="flex items-center justify-between mb-2">
                    <label className="text-sm text-slate-400 font-medium">
                        {t("bilingual.secondaryLanguage")}
                    </label>

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
                            {voiceTrackLanguage === 'secondary' && <span>{t("bilingual.tracking")}</span>}
                        </button>
                    )}
                </div>
                <S.EditorTextArea
                    value={secondaryText}
                    onChange={(e) => onChange({
                        primary: primaryText,
                        secondary: e.target.value
                    })}
                    placeholder={t("bilingual.secondaryPlaceholder")}
                />
            </div>
        </div>
    );
};
