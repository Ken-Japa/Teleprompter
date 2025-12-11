import { memo, useState } from "react";
import * as S from "../ui/Styled";
import { TrashIcon, InfoIcon } from "../ui/Icons";
import { useTranslation } from "../../hooks/useTranslation";
import { TutorialModal } from "../ui/TutorialModal";

interface EditorToolbarProps {
    onInsertTag: (tag: string) => void;
    onClear: () => void;
}

export const EditorToolbar = memo(({ onInsertTag, onClear }: EditorToolbarProps) => {
    const { t } = useTranslation();
    const [showTutorialModal, setShowTutorialModal] = useState(false);

    return (
        <S.FormattingToolbar>
            <div className="flex items-center">
                <span className="text-[10px] uppercase font-bold text-slate-500 mr-3 tracking-wider">{t("host.editor.highlight")}</span>
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




            <span className="text-[10px] text-slate-600 hidden sm:inline-block ml-2 font-mono pl-3 border-l border-white/10">
                {t("host.tips.desc")} &lt;tag&gt;
            </span>
            <S.ToolbarDivider />
            <S.IconButton
                onClick={onClear}
                className="hover:text-red-400"
                aria-label="Clear All Text"
                title="Clear All Text"
            >
                <TrashIcon className="w-4 h-4" />
            </S.IconButton>
            <S.ToolbarDivider />
            <S.IconButton
                onClick={() => setShowTutorialModal(true)}
                title="Tutorial"
                aria-label="Open Tutorial"
                className="w-9 h-9 rounded-full p-0 flex items-center justify-center leading-none"
            >
                <InfoIcon className="w-4 h-4 block" />
            </S.IconButton>
            <TutorialModal isOpen={showTutorialModal} onClose={() => setShowTutorialModal(false)} />
        </S.FormattingToolbar>
    );
});
