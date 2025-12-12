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
            <div className="flex items-center gap-4 w-full">
                {/* Highlight Section */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider hidden sm:block">
                        {t("host.editor.highlight")}
                    </span>
                    <div
                        className="flex items-center gap-3 bg-white/5 px-3 py-1.5 rounded-full border border-white/5"
                        role="group"
                        aria-label="Text Highlights"
                    >
                        <S.ColorButton color="red" label="Red Highlight" onClick={() => onInsertTag("r")} />
                        <S.ColorButton color="yellow" label="Yellow Highlight" onClick={() => onInsertTag("y")} />
                        <S.ColorButton color="green" label="Green Highlight" onClick={() => onInsertTag("g")} />
                        <S.ColorButton color="blue" label="Blue Highlight" onClick={() => onInsertTag("b")} />
                    </div>
                </div>

                <div className="flex-1"></div>

                {/* Actions */}
                <div className="flex items-center gap-2 border-l border-white/10 pl-4">
                    <span className="text-[10px] text-slate-600 hidden md:inline-block font-mono">
                        {t("host.tips.desc")} &lt;tag&gt;
                    </span>

                    <S.IconButton
                        onClick={onClear}
                        className="hover:text-red-400 w-9 h-9"
                        aria-label="Clear All Text"
                        title="Clear All Text"
                    >
                        <TrashIcon className="w-5 h-5" />
                    </S.IconButton>

                    <S.IconButton
                        onClick={() => setShowTutorialModal(true)}
                        title="Tutorial"
                        aria-label="Open Tutorial"
                        className="w-9 h-9 rounded-full bg-brand-500/10 text-brand-400 hover:bg-brand-500/20 hover:text-brand-300 border-brand-500/20"
                    >
                        <InfoIcon className="w-5 h-5" />
                    </S.IconButton>
                </div>
            </div>
            <TutorialModal isOpen={showTutorialModal} onClose={() => setShowTutorialModal(false)} />
        </S.FormattingToolbar>
    );
});
