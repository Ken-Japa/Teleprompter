import { memo, useCallback } from "react";
import { useTranslation } from "../../../hooks/useTranslation";
import * as S from "../../ui/Styled";
import { PrompterActions } from "../../../hooks/usePrompterSettings";
import { trackSettingChange } from "../../../utils/analytics";

interface FontFamilyControlProps {
    fontFamily: string;
    setFontFamily: PrompterActions["setFontFamily"];
}

export const FontFamilyControl = memo(({ fontFamily, setFontFamily }: FontFamilyControlProps) => {
    const { t } = useTranslation();

    const toggleFont = useCallback(() => {
        const nextFont = fontFamily === 'OpenDyslexic' ? 'sans-serif' : 'OpenDyslexic';
        trackSettingChange("font_family", nextFont);
        setFontFamily(nextFont);
    }, [fontFamily, setFontFamily]);

    return (
        <S.HudGroup label={t("host.controls.font") || "Font"}>
            <button
                onClick={toggleFont}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${fontFamily === 'OpenDyslexic'
                        ? "bg-slate-700 border-brand-500 text-white"
                        : "bg-slate-800/50 border-white/10 text-slate-400 hover:text-slate-200"
                    }`}
                title="Toggle OpenDyslexic Font"
            >
                <span className={`text-sm ${fontFamily === 'OpenDyslexic' ? 'font-[OpenDyslexic]' : ''}`}>
                    {fontFamily === 'OpenDyslexic' ? 'OpenDyslexic' : 'Default'}
                </span>
            </button>
        </S.HudGroup>
    );
});
