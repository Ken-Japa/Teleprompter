import { memo, useState } from "react";
import * as S from "../../components/ui/Styled";
import { TrashIcon, InfoIcon, MusicIcon, SearchIcon, KeyboardIcon, PlayIcon, HomeIcon } from "../../components/ui/Icons";
import { useTranslation } from "../../hooks/useTranslation";
import { TutorialModal } from "../../components/ui/TutorialModal";
import { FindReplaceModal } from "../../components/ui/FindReplaceModal";
import { HotkeyConfigModal } from "../../components/ui/HotkeyConfigModal";
import { ScriptManager } from "./ScriptManager";
import { Script } from "../../hooks/useScriptStorage";

interface MusicEditorToolbarProps {
    onInsertTag: (tag: string) => void;
    onClear: () => void;
    text: string;
    onTextChange?: (newText: string) => void;
    onSelectRange?: (start: number, end: number) => void;
    onUndo?: () => void;
    canUndo?: boolean;

    // Script Manager Props
    scripts: Script[];
    activeScriptId: string;
    onCreateScript: () => void;
    onSwitchScript: (id: string) => void;
    onDeleteScript: (id: string) => void;
    onUpdateScript: (id: string, updates: Partial<Script>) => void;

    onStart: () => void;
    isPro: boolean;
    onUnlockPro: () => void;
}

export const MusicEditorToolbar = memo(({
    onInsertTag, onClear, text, onTextChange, onSelectRange, onUndo, canUndo,
    scripts, activeScriptId, onCreateScript, onSwitchScript, onDeleteScript, onUpdateScript,
    onStart, isPro, onUnlockPro
}: MusicEditorToolbarProps) => {
    const { t } = useTranslation();
    const [showTutorialModal, setShowTutorialModal] = useState(false);
    const [showHotkeyModal, setShowHotkeyModal] = useState(false);
    const [showFindReplaceModal, setShowFindReplaceModal] = useState(false);

    return (
        <div className="md:sticky md:top-0 md:z-30 w-full bg-[#111] backdrop-blur-xl border-b border-white/5 md:shadow-lg transition-all duration-300">
            <div className="flex flex-col md:flex-row items-center md:gap-4 w-full md:px-6 md:py-3 max-w-7xl mx-auto mb-2">

                {/* 1. Header / Logo / Back (Left) */}
                <div className="flex items-center space-x-4 mr-auto">
                    <button
                        onClick={() => {
                            window.location.hash = "";
                        }}
                        className="flex items-center text-xs font-bold text-slate-500 hover:text-white transition"
                        aria-label="Back to Home"
                    >
                        <HomeIcon className="w-5 h-5 mr-1" />
                        <span className="hidden sm:inline">HOME</span>
                    </button>
                    <div className="h-6 w-px bg-white/10 hidden md:block"></div>
                    <div className="text-amber-500 font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                        <MusicIcon className="w-4 h-4" />
                        <span>Music Mode</span>
                    </div>
                </div>

                {/* 2. Color Tags (Center) */}
                <div className="order-3 md:order-2 w-full md:w-auto sticky top-0 z-20 md:static bg-[#111] md:bg-transparent border-b border-white/10 md:border-0 py-3 md:py-0 transition-all shadow-lg md:shadow-none flex justify-center">
                    <div className="flex items-center gap-3 bg-white/5 px-4 py-1.5 rounded-full border border-white/5">
                        <S.ColorButton color="red" label="Red" onClick={() => onInsertTag("r")} />
                        <S.ColorButton color="yellow" label="Yellow" onClick={() => onInsertTag("y")} />
                        <S.ColorButton color="green" label="Green" onClick={() => onInsertTag("g")} />
                        <S.ColorButton color="blue" label="Blue" onClick={() => onInsertTag("b")} />
                    </div>
                </div>

                {/* 3. Actions (Right) */}
                <div className="order-2 md:order-3 w-full md:w-auto flex items-center justify-center md:justify-end gap-3 py-3 md:py-0 border-b border-white/5 md:border-0">

                    {/* Play Button */}
                    <button
                        onClick={onStart}
                        className="flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-white px-6 py-2 rounded-full font-bold shadow-lg shadow-amber-500/20 transition-transform hover:scale-105 active:scale-95 mr-4"
                    >
                        <PlayIcon className="w-5 h-5" />
                        <span>PLAY</span>
                    </button>

                    <S.IconButton onClick={() => setShowHotkeyModal(true)} title="Hotkeys" className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/5">
                        <KeyboardIcon className="w-5 h-5" />
                    </S.IconButton>

                    <S.IconButton onClick={() => setShowFindReplaceModal(true)} title="Find/Replace" className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/5">
                        <SearchIcon className="w-5 h-5" />
                    </S.IconButton>

                    <S.IconButton onClick={onClear} title="Clear" className="w-9 h-9 rounded-full bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-400 border border-white/5">
                        <TrashIcon className="w-5 h-5" />
                    </S.IconButton>
                </div>
            </div>

            {/* Script Manager Bar (Separate Row for Setlist focus) */}
            <div className="w-full bg-[#0a0a0a] border-b border-white/5 py-2 px-4 flex justify-center sticky top-[57px] md:top-[65px] z-20">
                <ScriptManager
                    scripts={scripts}
                    activeScriptId={activeScriptId}
                    onSwitch={onSwitchScript}
                    onCreate={onCreateScript}
                    onDelete={onDeleteScript}
                    onUpdateTitle={(id, title) => onUpdateScript(id, { title })}
                />
            </div>

            <TutorialModal isOpen={showTutorialModal} onClose={() => setShowTutorialModal(false)} />
            <HotkeyConfigModal isOpen={showHotkeyModal} onClose={() => setShowHotkeyModal(false)} isPro={isPro} onUnlockPro={onUnlockPro} />
            {onTextChange && (
                <FindReplaceModal
                    isOpen={showFindReplaceModal}
                    onClose={() => setShowFindReplaceModal(false)}
                    text={text}
                    onTextChange={onTextChange}
                    onSelectRange={onSelectRange}
                    onUndo={onUndo}
                    canUndo={canUndo}
                />
            )}
        </div>
    );
});
