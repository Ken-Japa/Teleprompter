import React, { useEffect } from "react";
import { ConnectionStatus } from "../../types";
import * as S from "../ui/Styled";
import { useTranslation } from "../../hooks/useTranslation";
import { ConnectSidebar } from "./ConnectSidebar";
import { MusicEditorToolbar } from "./MusicEditorToolbar";
import { useEditorLogic } from "../../hooks/useEditorLogic";
import { Script } from "../../hooks/useScriptStorage";
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
    onCreateScript: () => void;
    onSwitchScript: (id: string) => void;
    onDeleteScript: (id: string) => void;
    onUpdateScript: (id: string, updates: Partial<Script>) => void;
}

export const MusicEditor: React.FC<MusicEditorProps> = ({
    text, setText, peerId, status, onStart,
    isPro, onUnlockPro,
    scripts, activeScriptId, onCreateScript, onSwitchScript, onDeleteScript, onUpdateScript
}) => {
    const { t } = useTranslation();

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

    const musicPlaceholder = `🎵 Cole sua cifra ou letra aqui...

[Am]      [F]
Letras e acordes
[C]       [G]
Alinhados perfeitamente

Dica: Use [SPEED 5] para definir a velocidade de cada música.`;

    return (
        <S.EditorContainer className="bg-[#050505]"> {/* Darker background for stage */}
            <MusicEditorToolbar
                onInsertTag={handleInsertTag}
                onClear={handleClear}
                text={localText}
                onTextChange={handleUpdateText}
                onSelectRange={handleSelectRange}
                onUndo={handleUndo}
                canUndo={canUndo}

                scripts={scripts}
                activeScriptId={activeScriptId}
                onCreateScript={onCreateScript}
                onSwitchScript={onSwitchScript}
                onDeleteScript={onDeleteScript}
                onUpdateScript={onUpdateScript}

                onStart={onStart}
                isPro={isPro}
                onUnlockPro={onUnlockPro}
            />

            <div className="flex-1 flex flex-col lg:flex-row lg:overflow-hidden relative">
                <div className="flex-1 relative flex flex-col h-full bg-[#050505]">
                    <S.EditorTextArea
                        ref={textAreaRef}
                        value={localText}
                        onChange={handleChange}
                        placeholder={musicPlaceholder}
                        className="font-mono text-lg leading-relaxed text-slate-300 selection:bg-amber-500/30 selection:text-amber-100 placeholder:text-slate-700"
                        spellCheck={false}
                    />
                </div>

                <ConnectSidebar peerId={peerId} status={status} />
            </div>
        </S.EditorContainer>
    );
};
