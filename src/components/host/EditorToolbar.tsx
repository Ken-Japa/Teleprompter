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
        // Wrapper replaces S.FormattingToolbar to allow custom sticky logic
        // Desktop: Sticky Top (whole bar). Mobile: Static (children handle sticky).
        <div className="md:sticky md:top-0 md:z-30 w-full bg-slate-950/80 backdrop-blur-xl border-b border-white/5 md:shadow-lg transition-all duration-300">

            {/* Flex Container */}
            <div className="flex flex-col md:flex-row items-center md:gap-4 w-full md:px-6 md:py-3 max-w-4xl mx-auto">

                {/* 3. Color Section - Highlight (Bottom Sticky on Mobile, First on Desktop) */}
                <div className="order-3 md:order-1 md:mr-auto w-full md:w-auto sticky top-0 z-20 md:static bg-slate-950/90 md:bg-transparent backdrop-blur-md md:backdrop-blur-none border-b border-white/10 md:border-0 py-3 md:py-0 transition-all shadow-lg md:shadow-none">
                    <div className="flex items-center justify-center md:justify-start gap-2">
                        <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider hidden lg:block">
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
                </div>

                {/* 1. Musician Mode (Top on Mobile, Middle on Desktop) */}
                <div className="w-full md:w-auto flex justify-center py-3 md:py-0 border-b border-white/5 md:border-0 order-1 md:order-2">
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

                {/* 2. Actions (Middle on Mobile, Last on Desktop) */}
                <div className="order-2 md:order-3 w-full md:w-auto flex flex-wrap justify-center gap-2 py-3 md:py-0 border-b border-white/5 md:border-0">
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

                    <div className="w-px h-6 bg-white/10 mx-1 hidden sm:block"></div>
                    <ShareButton variant="icon" className="w-9 h-9 rounded-full bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 hover:text-indigo-300 border border-indigo-500/20" />
                </div>



            </div>

            <TutorialModal isOpen={showTutorialModal} onClose={() => setShowTutorialModal(false)} />
            <PacingModal isOpen={showPacingModal} onClose={() => setShowPacingModal(false)} text={text} />
            <HotkeyConfigModal isOpen={showHotkeyModal} onClose={() => setShowHotkeyModal(false)} isPro={isPro} onUnlockPro={onUnlockPro} />
        </div>
    );
});
