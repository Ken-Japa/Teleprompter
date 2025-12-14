import { memo, useState } from "react";
import * as S from "../ui/Styled";
import { TrashIcon, InfoIcon, TimerIcon, MusicIcon } from "../ui/Icons";
import { useTranslation } from "../../hooks/useTranslation";
import { TutorialModal } from "../ui/TutorialModal";
import { PacingModal } from "../ui/PacingModal";

interface EditorToolbarProps {
    onInsertTag: (tag: string) => void;
    onClear: () => void;
    text: string;
    isMusicianMode: boolean;
    onToggleMusicianMode: () => void;
}

export const EditorToolbar = memo(({ onInsertTag, onClear, text, isMusicianMode, onToggleMusicianMode }: EditorToolbarProps) => {
    const { t } = useTranslation();
    const [showTutorialModal, setShowTutorialModal] = useState(false);
    const [showPacingModal, setShowPacingModal] = useState(false);

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

                    {/* Hint text closer to color menu */}
                    <span className="text-[10px] text-slate-600 hidden md:inline-block font-mono ml-2">
                        {t("host.tips.desc")} &lt;tag&gt;
                    </span>
                </div>



                {/* Central Musician Mode Toggle - High Prominence */}
                <div className="flex-1 flex justify-center px-4">
                    <S.IconButton
                        onClick={onToggleMusicianMode}
                        title={t("host.editor.musicianMode")}
                        aria-label="Toggle Musician Mode"
                        className={`w-10 h-10 rounded-2xl transition-all duration-300 border backdrop-blur-md group ${isMusicianMode
                            ? "bg-gradient-to-br from-amber-500/20 to-yellow-600/20 text-yellow-400 border-yellow-500/60 shadow-[0_0_20px_-3px_rgba(234,179,8,0.4)] ring-1 ring-yellow-500/30 scale-105"
                            : "bg-white/5 text-slate-500 border-white/5 hover:text-yellow-200 hover:bg-yellow-500/10 hover:border-yellow-500/30 grayscale hover:grayscale-0"
                            }`}
                        active={isMusicianMode}
                    >
                        <MusicIcon className={`w-6 h-6 transition-transform duration-300 ${isMusicianMode ? "scale-110 drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]" : "group-hover:scale-110"}`} />
                    </S.IconButton>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    {/* Enhanced Pacing Button */}
                    <S.IconButton
                        onClick={() => setShowPacingModal(true)}
                        title={t("pacing.button")}
                        aria-label="Open Pacing Tool"
                        className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-purple-300 hover:from-purple-500/30 hover:to-pink-500/30 hover:text-purple-200 border border-purple-500/30 hover:border-purple-400/50 transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20"
                    >
                        <TimerIcon className="w-5 h-5" />
                    </S.IconButton>

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
            <PacingModal isOpen={showPacingModal} onClose={() => setShowPacingModal(false)} text={text} />
        </S.FormattingToolbar >
    );
});
