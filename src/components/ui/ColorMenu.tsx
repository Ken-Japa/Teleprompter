import { memo } from "react";
import * as S from "./Styled";
import { useTranslation } from "../../hooks/useTranslation";

interface ColorMenuProps {
    onInsertTag: (tag: string) => void;
}

export const ColorMenu = memo(({ onInsertTag }: ColorMenuProps) => {
    const { t } = useTranslation();

    return (
        <div className="flex items-center">
            <span className="text-[10px] uppercase font-bold text-slate-500 mr-3 tracking-wider">{t("host.editor.highlight") || "HIGHLIGHT"}</span>
            <div
                className="flex space-x-1.5 bg-white/5 p-1.5 rounded-xl border border-white/5"
                role="group"
                aria-label="Text Highlights"
            >
                <S.ColorButton color="red" label="Red Highlight" onClick={() => onInsertTag("r")} />
                <S.ColorButton color="yellow" label="Yellow Highlight" onClick={() => onInsertTag("y")} />
                <S.ColorButton color="green" label="Green Highlight" onClick={() => onInsertTag("g")} />
                <S.ColorButton color="blue" label="Blue Highlight" onClick={() => onInsertTag("b")} />
            </div>
        </div>
    );
});
