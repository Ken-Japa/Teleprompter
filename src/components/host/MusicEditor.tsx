import React, { useEffect } from "react";
import { useTranslation } from "../../hooks/useTranslation";
import { ConnectionStatus } from "../../types";
import * as S from "../ui/Styled";
import { ConnectSidebar } from "./ConnectSidebar";
import { MusicHeader } from "./MusicHeader";
import { MusicActionToolbar } from "./MusicActionToolbar";
import { useEditorLogic } from "../../hooks/useEditorLogic";
import { Script } from "../../hooks/useScriptStorage";
import { useSetlistStorage } from "../../hooks/useSetlistStorage";
import { PrompterFeatureFlags } from "../../hooks/usePrompterSettings";

interface MusicEditorProps {
    text: string;
    setText: (text: string) => void;
    peerId: string;
    status: ConnectionStatus;
    onStart: () => void;

    // Feature Flags (passed for consistency, though we know we are in Music Mode)
    featureFlags?: PrompterFeatureFlags;

    isPro: boolean;
    onUnlockPro: () => void;

    // Script Management Props
    scripts: Script[];
    activeScriptId: string;
    onCreateScript: () => string;
    onSwitchScript: (id: string) => void;
    onDeleteScript: (id: string) => void;
    onUpdateScript: (id: string, updates: Partial<Script>) => void;

    // Setlist Storage passed from Host
    setlistStorage: ReturnType<typeof useSetlistStorage>;
    settings: any;
    prompterActions: any;
    detectedBpm?: number | null;
    autoBpmError?: string | null;
}

export const MusicEditor: React.FC<MusicEditorProps> = ({
    text, setText, peerId, status, onStart,
    isPro, onUnlockPro,
    scripts, activeScriptId, onCreateScript, onSwitchScript, onDeleteScript, onUpdateScript,
    setlistStorage, settings, prompterActions,
    detectedBpm, autoBpmError
}) => {
    const {
        setlists, activeSetlistId, activeSetlist, setActiveSetlistId,
        createSetlist, deleteSetlist, updateSetlistTitle,
        addSongToSetlist, removeSongFromSetlist, reorderSongs
    } = setlistStorage;

    const { localText, textAreaRef, handleChange, handleInsertTag, handleClear, handleSelectRange, handleUndo, handleUpdateText, canUndo } = useEditorLogic({
        text,
        setText,
    });

    // Auto-focus logic or specific music initialization could go here
    useEffect(() => {
        if (!localText) {
            // Maybe set a default specialized placeholder if empty?
            // But we use the placeholder prop on textarea usually.
        }
    }, []);

    const { t } = useTranslation();
    const musicPlaceholder = t("host.musicEditorPlaceholder");

    return (
        <S.EditorContainer className="bg-[#050505]"> {/* Darker background for stage */}
            <MusicHeader onStart={onStart} />

            <div className="flex-1 flex flex-col lg:flex-row lg:overflow-hidden relative">
                <div className="flex-1 relative flex flex-col h-full bg-[#050505]">
                    <MusicActionToolbar
                        onInsertTag={handleInsertTag}
                        onClear={handleClear}
                        text={localText}
                        onTextChange={handleUpdateText}
                        onSelectRange={handleSelectRange}
                        onUndo={handleUndo}
                        canUndo={canUndo}
                        isPro={isPro}
                        onUnlockPro={onUnlockPro}

                        // Setlist Props
                        setlists={setlists}
                        activeSetlistId={activeSetlistId}
                        onSwitchSetlist={setActiveSetlistId}
                        onCreateSetlist={createSetlist}
                        onDeleteSetlist={deleteSetlist}
                        onUpdateSetlistTitle={updateSetlistTitle}
                        activeSetlist={activeSetlist}
                        allScripts={scripts}
                        onAddSong={addSongToSetlist}
                        onRemoveSong={removeSongFromSetlist}
                        onReorderSong={reorderSongs}
                        onSwitchScript={onSwitchScript}
                        activeScriptId={activeScriptId}
                        onCreateScript={onCreateScript}
                        onUpdateScript={onUpdateScript}
                        onDeleteScript={onDeleteScript}
                        onStart={onStart}
                        settings={settings}
                        prompterActions={prompterActions}
                        detectedBpm={detectedBpm}
                        autoBpmError={autoBpmError}
                    />


                    <S.EditorTextArea
                        ref={textAreaRef}
                        value={localText}
                        onChange={handleChange}
                        placeholder={musicPlaceholder}
                        className="font-mono text-lg leading-relaxed text-slate-300 selection:bg-amber-500/30 selection:text-amber-100 placeholder:text-slate-700 block"
                        spellCheck={false}
                    />
                </div>

                <ConnectSidebar peerId={peerId} status={status} />
            </div>
        </S.EditorContainer>
    );
};
