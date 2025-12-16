import React from "react";
import { useTranslation } from "../../hooks/useTranslation";
import * as S from "../ui/Styled";

interface BilingualTextEditorProps {
    primaryText: string;
    secondaryText: string;
    onChange: (texts: { primary: string; secondary: string }) => void;
}

export const BilingualTextEditor: React.FC<BilingualTextEditorProps> = ({
    primaryText,
    secondaryText,
    onChange
}) => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col md:flex-row gap-2 h-full">
            {/* Primary Language Column */}
            <div className="flex-1 flex flex-col min-h-[300px] md:min-h-0">
                <label className="text-sm text-slate-400 mb-2 font-medium">
                    {t("bilingual.primaryLanguage")}
                </label>
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
                <label className="text-sm text-slate-400 mb-2 font-medium">
                    {t("bilingual.secondaryLanguage")}
                </label>
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
