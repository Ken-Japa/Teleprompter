import { memo, useState, useCallback } from "react";
import * as S from "../../components/ui/Styled";
import { TrashIcon, SearchIcon, KeyboardIcon } from "../../components/ui/Icons";
import { TutorialModal } from "../../components/ui/TutorialModal";
import { FindReplaceModal } from "../../components/ui/FindReplaceModal";
import { HotkeyConfigModal } from "../../components/ui/HotkeyConfigModal";
import { SetlistManager } from "./SetlistManager";
import { Setlist } from "../../hooks/useSetlistStorage";
import { Script } from "../../hooks/useScriptStorage";
import { useMidi } from "../../hooks/useMidi";
import { MidiAction } from "../../types";

interface MusicActionToolbarProps {
    onInsertTag: (tag: string) => void;
    onClear: () => void;
    text: string;
    onTextChange?: (newText: string) => void;
    onSelectRange?: (start: number, end: number) => void;
    onUndo?: () => void;
    canUndo?: boolean;
    isPro: boolean;
    onUnlockPro: () => void;

    // Setlist Props
    setlists?: Setlist[];
    activeSetlistId?: string;
    onSwitchSetlist?: (id: string) => void;
    onCreateSetlist?: () => void;
    onDeleteSetlist?: (id: string) => void;
    onUpdateSetlistTitle?: (id: string, title: string) => void;

    activeSetlist?: Setlist | undefined;
    allScripts?: Script[];
    onAddSong?: (setlistId: string, songId: string) => void;
    onRemoveSong?: (setlistId: string, index: number) => void;
    onReorderSong?: (setlistId: string, fromIndex: number, toIndex: number) => void;

    onSwitchScript?: (id: string) => void;
    activeScriptId?: string;
    onCreateScript?: () => void;
    onUpdateScript?: (id: string, updates: Partial<Script>) => void;
    onDeleteScript?: (id: string) => void;

    onStart?: () => void;
}

export const MusicActionToolbar = memo(({
    onClear, text, onTextChange, onSelectRange, onUndo, canUndo, isPro, onUnlockPro,
    setlists, activeSetlistId, onSwitchSetlist, onCreateSetlist, onDeleteSetlist, onUpdateSetlistTitle,
    activeSetlist, allScripts, onAddSong, onRemoveSong, onReorderSong,
    onSwitchScript, activeScriptId, onCreateScript, onUpdateScript, onDeleteScript, onStart
}: MusicActionToolbarProps) => {
    const [showTutorialModal, setShowTutorialModal] = useState(false);
    const [showHotkeyModal, setShowHotkeyModal] = useState(false);
    const [showFindReplaceModal, setShowFindReplaceModal] = useState(false);

    const handleMidiAction = useCallback((action: MidiAction) => {
        if (!activeSetlist || !activeScriptId || !onSwitchScript) return;

        const currentIndex = activeSetlist.songIds.indexOf(activeScriptId);

        switch (action) {
            case MidiAction.NEXT_SONG:
                if (currentIndex < activeSetlist.songIds.length - 1) {
                    onSwitchScript(activeSetlist.songIds[currentIndex + 1]);
                }
                break;
            case MidiAction.PREV_SONG:
                if (currentIndex > 0) {
                    onSwitchScript(activeSetlist.songIds[currentIndex - 1]);
                }
                break;
            case MidiAction.TOGGLE_PLAY:
            case MidiAction.START_SCROLL:
                if (onStart) onStart();
                break;
            default:
                break;
        }
    }, [activeSetlist, activeScriptId, onSwitchScript, onStart]);

    const { isMidiEnabled, setIsMidiEnabled } = useMidi(handleMidiAction);

    return (
        <>
            <div className="w-full bg-[#0a0a0a] border-b border-white/5 py-2 px-4 flex justify-between items-center gap-3 sticky top-0 z-20">
                {/* SETLIST MANAGER (LEFT) */}
                <div className="flex-1 flex items-center justify-start gap-4">
                    {setlists && allScripts && (
                        <SetlistManager
                            setlists={setlists}
                            activeSetlistId={activeSetlistId!}
                            onSwitchSetlist={onSwitchSetlist!}
                            onCreateSetlist={onCreateSetlist!}
                            onDeleteSetlist={onDeleteSetlist!}
                            onUpdateSetlistTitle={onUpdateSetlistTitle!}
                            activeSetlist={activeSetlist}
                            allScripts={allScripts}
                            onAddSong={onAddSong!}
                            onRemoveSong={onRemoveSong!}
                            onReorderSong={onReorderSong!}
                            onSwitchScript={onSwitchScript!}
                            activeScriptId={activeScriptId!}
                            onCreateScript={onCreateScript!}
                            onUpdateScript={onUpdateScript!}
                            onDeleteScript={onDeleteScript!}
                        />
                    )}

                    {/* Active Song Title Editor */}
                    {activeScriptId && allScripts && onUpdateScript && (
                        <div className="flex-1 max-w-md hidden md:block group relative">
                            <input
                                type="text"
                                value={allScripts.find(s => s.id === activeScriptId)?.title || ""}
                                onChange={(e) => onUpdateScript(activeScriptId, { title: e.target.value })}
                                placeholder="Untitled Song"
                                className="w-full bg-transparent text-slate-300 font-semibold focus:text-white border-b border-transparent focus:border-amber-500/50 outline-none px-2 py-1 transition text-center md:text-left hover:bg-white/5 rounded-t"
                            />
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-50 pointer-events-none">
                                <span className="text-[10px] text-slate-500">RENAME</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* EDITING TOOLS (RIGHT) */}
                <div className="flex items-center gap-2">
                    {/* MIDI Toggle Tool */}
                    <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/5 mr-2">
                        <div className={`w-2 h-2 rounded-full ${isMidiEnabled ? 'bg-amber-500 animate-pulse' : 'bg-slate-600'}`} />
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest hidden sm:inline">MIDI MODE</span>
                        <S.Toggle
                            active={isMidiEnabled}
                            onClick={() => setIsMidiEnabled(!isMidiEnabled)}
                            size="sm"
                        />
                    </div>

                    <S.IconButton onClick={() => setShowHotkeyModal(true)} title="Hotkeys & MIDI" className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/5">
                        <KeyboardIcon className="w-4 h-4" />
                    </S.IconButton>

                    <S.IconButton onClick={() => setShowFindReplaceModal(true)} title="Find/Replace" className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/5">
                        <SearchIcon className="w-4 h-4" />
                    </S.IconButton>

                    <S.IconButton onClick={onClear} title="Clear" className="w-8 h-8 rounded-full bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-400 border border-white/5">
                        <TrashIcon className="w-4 h-4" />
                    </S.IconButton>
                </div>
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
        </>
    );
});
