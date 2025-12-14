import { memo, useState } from "react";
import * as S from "../ui/Styled";
import { TrashIcon, InfoIcon, TimerIcon, MusicIcon, LaptopIcon } from "../ui/Icons";
import { useTranslation } from "../../hooks/useTranslation";
import { TutorialModal } from "../ui/TutorialModal";
import { PacingModal } from "../ui/PacingModal";
import { HotkeyConfigModal } from "../ui/HotkeyConfigModal";
import { KeyboardIcon } from "../ui/Icons";
import { ShareButton } from "../ui/ShareButton";

interface EditorToolbarProps {
    onInsertTag: (tag: string) => void;
    onClear: () => void;
    text: string;
    isMusicianMode: boolean;
    onToggleMusicianMode: () => void;
    onStartHudless: () => void;
    isPro?: boolean;
    onUnlockPro?: () => void;
}

export const EditorToolbar = memo(({ onInsertTag, onClear, text, isMusicianMode, onToggleMusicianMode, onStartHudless, isPro = false, onUnlockPro = () => { } }: EditorToolbarProps) => {
    const { t } = useTranslation();
    const [showTutorialModal, setShowTutorialModal] = useState(false);
    const [showPacingModal, setShowPacingModal] = useState(false);
    const [showHotkeyModal, setShowHotkeyModal] = useState(false);

    return (
        <S.FormattingToolbar>
            {/* Container with wrapping for mobile */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-y-4 gap-x-2 w-full justify-between">

                {/* Highlight Section - Full width on very small screens, or auto */}
                <div className="order-2 sm:order-1 flex items-center gap-2 justify-center sm:justify-start w-full sm:w-auto mt-2 sm:mt-0 border-t border-white/5 pt-3 sm:border-0 sm:pt-0">
                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider hidden md:block">
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
                    <span className="text-[10px] text-slate-600 hidden lg:inline-block font-mono ml-2">
                        {t("host.tips.desc")} &lt;tag&gt;
                    </span>
                </div>

                {/* Central Musician Mode Toggle - High Prominence */}
                {/* On mobile: Order 1 (Top Center) */}
                <div className="order-1 sm:order-2 flex-none sm:flex-1 flex justify-center w-full sm:w-auto mb-2 sm:mb-0">
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
                {/* On mobile: Order 3 (Below Highlight on small screens if wrapped, or next to it) */}
                {/* We'll make it wrap to a new line if needed or stay on the right */}
                <div className="order-3 flex items-center justify-center sm:justify-end gap-2 w-full sm:w-auto">
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
                        onClick={onStartHudless}
                        className="hover:text-blue-400 w-9 h-9"
                        aria-label={t("hudless.button")}
                        title={t("hudless.tooltip")}
                    >
                        <LaptopIcon className="w-5 h-5" />
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
                        onClick={() => setShowHotkeyModal(true)}
                        title={t("hotkeys.title") || "Keyboard Shortcuts"}
                        aria-label="Configure Hotkeys"
                        className="w-9 h-9 rounded-full bg-slate-800 text-slate-400 hover:text-white border border-slate-700"
                    >
                        <KeyboardIcon className="w-5 h-5" />
                    </S.IconButton>

                    <S.IconButton
                        onClick={() => setShowTutorialModal(true)}
                        title="Tutorial"
                        aria-label="Open Tutorial"
                        className="w-9 h-9 rounded-full bg-brand-500/10 text-brand-400 hover:bg-brand-500/20 hover:text-brand-300 border-brand-500/20"
                    >
                        <InfoIcon className="w-5 h-5" />
                    </S.IconButton>

                    {/* Share Button - Last Item */}
                    <div className="w-px h-6 bg-white/10 mx-1"></div>
                    <ShareButton variant="icon" className="w-9 h-9 rounded-full bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 hover:text-indigo-300 border border-indigo-500/20" />
                </div>
            </div>

            <TutorialModal isOpen={showTutorialModal} onClose={() => setShowTutorialModal(false)} />
            <PacingModal isOpen={showPacingModal} onClose={() => setShowPacingModal(false)} text={text} />
            <HotkeyConfigModal isOpen={showHotkeyModal} onClose={() => setShowHotkeyModal(false)} isPro={isPro} onUnlockPro={onUnlockPro} />
        </S.FormattingToolbar >
    );
});
