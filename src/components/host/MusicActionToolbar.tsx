import { memo, useState, useCallback, useMemo, useEffect } from "react";
import { useTranslation } from "../../hooks/useTranslation";
import * as S from "../../components/ui/Styled";
import { TutorialModal } from "../../components/ui/TutorialModal";

import { FindReplaceModal } from "../../components/ui/FindReplaceModal";
import { HotkeyConfigModal } from "../../components/ui/HotkeyConfigModal";
import { SetlistManager } from "./SetlistManager";
import { Setlist } from "../../hooks/useSetlistStorage";
import { Script } from "../../hooks/useScriptStorage";
import { useMidi } from "../../hooks/useMidi";
import { MidiAction, PrompterSettings } from "../../types";
import { MetronomeIcon, MusicIcon, UploadIcon, PauseIcon, PlayIcon, TrashIcon, SearchIcon, KeyboardIcon, MicIcon } from "../../components/ui/Icons";
import { saveBackingTrack, deleteBackingTrack, getBackingTrack } from "../../utils/audioStorage";
import { UI_LIMITS } from "../../config/constants";
import { PrompterActions } from "../../hooks/usePrompterSettings";
import { useBackingTrack } from "../../hooks/useBackingTrack";
import { parseTextToSentences } from "../../utils/textParser";
import { trackEvent } from "../../utils/analytics";


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
    onCreateSetlist?: () => string;
    onDeleteSetlist?: (id: string) => void;
    onUpdateSetlistTitle?: (id: string, title: string) => void;

    activeSetlist?: Setlist | undefined;
    allScripts?: Script[];
    onAddSong?: (setlistId: string, songId: string) => void;
    onRemoveSong?: (setlistId: string, index: number) => void;
    onReorderSong?: (setlistId: string, fromIndex: number, toIndex: number) => void;

    onSwitchScript?: (id: string) => void;
    activeScriptId?: string;
    onCreateScript?: () => string;
    onUpdateScript?: (id: string, updates: Partial<Script>) => void;
    onDeleteScript?: (id: string) => void;

    onStart?: () => void;
    settings?: PrompterSettings;
    prompterActions?: PrompterActions;
    detectedBpm?: number | null;
    autoBpmError?: string | null;
    textAreaRef?: React.RefObject<HTMLTextAreaElement>;
}

export const MusicActionToolbar = memo(({
    onClear, text, onTextChange, onSelectRange, onUndo, canUndo, isPro, onUnlockPro,
    setlists, activeSetlistId, onSwitchSetlist, onCreateSetlist, onDeleteSetlist, onUpdateSetlistTitle,
    activeSetlist, allScripts, onAddSong, onRemoveSong, onReorderSong,
    onSwitchScript, activeScriptId, onCreateScript, onUpdateScript, onDeleteScript, onStart,
    settings, prompterActions, detectedBpm, autoBpmError, textAreaRef
}: MusicActionToolbarProps) => {
    const { t } = useTranslation();
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
    const [isPreviewSyncMode, setIsPreviewSyncMode] = useState(false);

    // Parse sentences for preview sync
    const { sentences } = useMemo(() => parseTextToSentences(text), [text]);

    // Backing Track Hook for Preview
    const {
        isPlaying: isAudioPlaying,
        currentTime,
        markers,
        error: audioError,
        play,
        pause
    } = useBackingTrack(activeScriptId!, sentences, isPro);

    // Preview Sync scrolling logic
    useEffect(() => {
        if (!isPreviewSyncMode || !isAudioPlaying || !textAreaRef?.current) return;

        // Find current marker/sentence
        const currentMarker = [...markers].reverse().find(m => currentTime >= m.timestamp);
        if (currentMarker) {
            const sentence = sentences.find((s: any) => s.id === currentMarker.sentenceId);
            if (sentence && sentence.startIndex !== undefined) {
                const textarea = textAreaRef.current;
                const textBefore = text.substring(0, sentence.startIndex);
                const lineCount = (textBefore.match(/\n/g) || []).length;

                // Estimate line height (approximated)
                const lineHeight = 28; // text-lg leading-relaxed usually around 28px
                textarea.scrollTop = lineCount * lineHeight - 50; // Offset for better view
            }
        }

        // Auto-stop after 15s if in preview sync
        if (currentTime > 15 && isPreviewSyncMode) {
            pause();
            setIsPreviewSyncMode(false);
        }
    }, [currentTime, isPreviewSyncMode, isAudioPlaying, markers, sentences, textAreaRef, text, pause]);

    const handlePreviewSyncToggle = () => {
        if (!isPro) {
            trackEvent("paywall_view", { trigger: "preview_sync_pro" });
            onUnlockPro();
            return;
        }

        const newState = !isPreviewSyncMode;
        setIsPreviewSyncMode(newState);
        if (newState) {
            play();
            trackEvent("preview_sync_activated", { script_id: activeScriptId! });
        } else {
            pause();
        }
    };

    const [previewAudio, setPreviewAudio] = useState<HTMLAudioElement | null>(null);

    const handlePreview = async () => {
        if (!activeScriptId) return;

        if (previewAudio) {
            previewAudio.pause();
            setPreviewAudio(null);
            return;
        }

        try {
            const data = await getBackingTrack(activeScriptId);
            if (data) {
                const blob = new Blob([data.data], { type: data.type });
                const url = URL.createObjectURL(blob);
                const audio = new Audio(url);
                audio.play();
                setPreviewAudio(audio);

                // Stop after 10s
                setTimeout(() => {
                    audio.pause();
                    setPreviewAudio(null);
                }, 10000);
            }
        } catch (err) {
            console.error("Preview failed", err);
        }
    };


    const handleBackingTrackUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isPro) {
            onUnlockPro();
            return;
        }
        const file = e.target.files?.[0];
        if (!file || !activeScriptId || !onUpdateScript) return;

        // Limit size to 50MB
        if (file.size > 50 * 1024 * 1024) {
            alert(t("music.backingTrack.largeFile") || "Arquivo muito grande. Limite de 50MB.");
            return;
        }

        try {
            await saveBackingTrack(activeScriptId, file);
            onUpdateScript(activeScriptId, {
                backingTrack: {
                    name: file.name,
                    size: file.size,
                    type: file.type
                }
            });
            trackEvent("backing_uploaded", { file_name: file.name, file_size: file.size });
        } catch (err) {
            console.error("Upload failed", err);
            alert(t("music.backingTrack.error") || "Falha no upload do áudio.");
        }
    };


    const handleRemoveBackingTrack = async () => {
        if (!activeScriptId || !onUpdateScript) return;
        try {
            await deleteBackingTrack(activeScriptId);
            onUpdateScript(activeScriptId, {
                backingTrack: undefined
            });
        } catch (err) {
            console.error("Remove failed", err);
        }
    };

    const activeScript = allScripts?.find(s => s.id === activeScriptId);



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
                                <span className="text-[10px] text-slate-500 uppercase tracking-tighter">{t("script.rename") || "Renomear"}</span>
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

            {/* MUSICIAN SUB-TOOLBAR (BPM & SYNC) */}
            <div className="w-full bg-[#080808] border-b border-white/5 py-1.5 px-4 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-amber-500/5 px-3 py-1.5 rounded-lg border border-amber-500/10">
                        <MetronomeIcon className="w-4 h-4 text-amber-500" />
                        <span className="text-xs font-bold text-amber-500/80 w-16 uppercase tracking-wider">{t("music.bpmSync")}</span>

                        <div className="flex items-center gap-3 ml-2">
                            <input
                                type="range"
                                min={UI_LIMITS.BPM.MIN}
                                max={UI_LIMITS.BPM.MAX}
                                step={UI_LIMITS.BPM.STEP}
                                value={settings?.bpm || 120}
                                onChange={(e) => prompterActions?.setBpm(parseInt(e.target.value))}
                                className="w-24 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                            />
                            <span className="text-sm font-mono font-bold text-amber-500 w-12 tabular-nums">
                                {settings?.bpm || 120}
                            </span>
                        </div>
                    </div>

                    {/* AUTO BPM TOGGLE */}
                    <div className="flex items-center gap-2 border-l border-white/10 pl-4">
                        <S.IconButton
                            onClick={() => isPro ? prompterActions?.setIsAutoBpmEnabled(!settings?.autoBpmEnabled) : onUnlockPro()}
                            active={settings?.autoBpmEnabled}
                            className={`w-9 h-9 rounded-full ${settings?.autoBpmEnabled ? "bg-amber-500/20 text-amber-500 border-amber-500/30 animate-pulse" : "text-slate-500 hover:text-slate-300"}`}
                            title={isPro ? (autoBpmError || "Auto BPM (Microfone)") : t("music.bpmTeaser")}
                        >
                            <MicIcon className="w-4 h-4" />
                        </S.IconButton>

                        {settings?.autoBpmEnabled && isPro && (
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-amber-500 animate-pulse flex items-center gap-1 leading-none">
                                    {detectedBpm ? `${detectedBpm} BPM` : (autoBpmError ? "Erro Mic" : "Escutando...")}
                                </span>
                                {detectedBpm && (
                                    <div className="flex gap-0.5 mt-0.5">
                                        {[0.1, 0.2, 0.3].map(delay => (
                                            <span
                                                key={delay}
                                                className="w-1 h-2 bg-amber-500/40 rounded-full animate-bounce"
                                                style={{ animationDelay: `${delay}s` }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* BACKING TRACK UPLOAD */}
                    <div className="flex items-center gap-2 border-l border-white/10 pl-4">
                        {!activeScript?.backingTrack ? (
                            <label className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border cursor-pointer transition-all ${isPro ? "bg-indigo-500/10 border-indigo-500/20 text-indigo-400 hover:bg-indigo-500/20" : "bg-slate-800/50 border-white/5 text-slate-500"}`}>
                                <UploadIcon className="w-4 h-4" />
                                <span className="text-xs font-bold uppercase tracking-wider">{t("music.backingTrack.upload") || "Backing Track"}</span>

                                <input
                                    type="file"
                                    className="hidden"
                                    accept="audio/*"
                                    disabled={!isPro}
                                    onChange={handleBackingTrackUpload}
                                    onClick={(e) => !isPro && (e.preventDefault(), onUnlockPro())}
                                />
                            </label>
                        ) : (
                            <div className="flex items-center gap-2 bg-indigo-500/20 px-3 py-1.5 rounded-lg border border-indigo-500/30">
                                <MusicIcon className="w-4 h-4 text-indigo-400" />
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold text-indigo-400 leading-none truncate max-w-[100px]">
                                        {activeScript.backingTrack.name}
                                    </span>
                                    <button
                                        onClick={handleRemoveBackingTrack}
                                        className="text-[9px] text-red-500/60 hover:text-red-400 text-left uppercase tracking-tighter font-bold"
                                    >
                                        {t("music.backingTrack.remove") || "Remover"}
                                    </button>

                                </div>
                                <S.IconButton
                                    onClick={handlePreview}
                                    className={`w-8 h-8 rounded-full ${previewAudio ? "bg-amber-500 text-black animate-pulse" : "bg-white/10 text-indigo-400"}`}
                                    title={t("music.backingTrack.preview") || "Preview"}
                                >

                                    {previewAudio ? <PauseIcon className="w-3.5 h-3.5 fill-current" /> : <PlayIcon className="w-3.5 h-3.5 fill-current ml-0.5" />}
                                </S.IconButton>
                            </div>
                        )}
                    </div>

                    {/* AUDIO ERROR FALLBACK */}
                    {audioError && activeScript?.backingTrack && (
                        <div className="flex items-center gap-2 bg-red-500/10 px-3 py-1.5 rounded-lg border border-red-500/20 mr-2" title={audioError}>
                            <span className="text-[10px] font-bold text-red-500 uppercase tracking-tighter">Erro de Áudio</span>
                            <button
                                onClick={() => window.location.reload()}
                                className="text-[9px] text-white hover:underline uppercase font-bold"
                            >
                                Recarregar
                            </button>
                        </div>
                    )}

                    {/* PREVIEW SYNC BUTTON */}
                    <div className="flex items-center gap-2 border-l border-white/10 pl-4">
                        <button
                            onClick={handlePreviewSyncToggle}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${isPreviewSyncMode ? "bg-amber-500 text-black border-amber-600" : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"}`}
                            title="Preview Sync (15s)"
                        >
                            <PlayIcon className={`w-3.5 h-3.5 ${isPreviewSyncMode ? "fill-black" : "fill-current"}`} />
                            <span className="text-xs font-bold uppercase tracking-wider">Preview Sync</span>
                        </button>
                    </div>

                </div>

                <div className="flex items-center gap-4">
                    {/* Placeholder for future Part/Song metadata or duration estimates */}
                    <span className="text-[10px] text-slate-600 font-medium uppercase tracking-widest hidden sm:inline">Music Mode v1.1</span>
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
