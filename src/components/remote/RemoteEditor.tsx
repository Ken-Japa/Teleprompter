import React, { useRef } from "react";
import { ColorMenu } from "../ui/ColorMenu";
import { insertTagInText } from "../../utils/editorHelpers";
import { RemoteActions } from "../../types";
import { useTranslation } from "../../hooks/useTranslation";
import { ScriptManager } from "../host/ScriptManager";
import { Script } from "../../hooks/useScriptStorage";

interface RemoteEditorProps {
    text: string;
    actions: RemoteActions;
    isBilingualMode?: boolean;
    // Script Management Props
    scripts: Script[];
    activeScriptId: string;
    onSwitchScript: (id: string) => void;
    onCreateScript: () => void;
    onDeleteScript: (id: string) => void;
    onUpdateScript: (id: string, updates: Partial<Script>) => void;
}

export const RemoteEditor: React.FC<RemoteEditorProps> = ({
    text,
    actions,
    isBilingualMode,
    scripts,
    activeScriptId,
    onSwitchScript,
    onCreateScript,
    onDeleteScript,
    onUpdateScript,
}) => {
    const { t } = useTranslation();
    const remoteTextAreaRef = useRef<HTMLTextAreaElement>(null);

    if (isBilingualMode) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center p-8 bg-slate-950 text-center">
                <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/5 shadow-lg max-w-sm">
                    <div className="text-4xl mb-4">🔒</div>
                    <h3 className="text-xl text-white font-bold mb-2">
                        {t("remote.bilingualEditTitle") || "Edição Bloqueada"}
                    </h3>
                    <p className="text-slate-400">
                        {t("remote.bilingualEditWarning") || "A edição de texto está desabilitada no Modo Bilíngue. Por favor, faça alterações no computador principal."}
                    </p>
                </div>
            </div>
        );
    }

    const handleRemoteInsertTag = (tag: string) => {
        const textarea = remoteTextAreaRef.current;
        if (!textarea) return;

        const result = insertTagInText(textarea.value, tag, textarea.selectionStart, textarea.selectionEnd);
        actions.handleTextChange(result.newText);

        setTimeout(() => {
            if (remoteTextAreaRef.current) {
                remoteTextAreaRef.current.focus();
                const start = Math.max(0, result.newSelectionStart);
                const end = Math.max(0, result.newSelectionEnd);
                remoteTextAreaRef.current.setSelectionRange(start, end);
            }
        }, 0);
    };

    return (
        <div className="flex-1 flex flex-col p-4 bg-slate-950 overflow-hidden">
            <div className="flex items-center justify-center pb-3 border-b border-slate-800 mb-4">
                <ScriptManager
                    scripts={scripts}
                    activeScriptId={activeScriptId}
                    onSwitch={onSwitchScript}
                    onCreate={onCreateScript}
                    onDelete={onDeleteScript}
                    onUpdateTitle={(id, title) => onUpdateScript(id, { title })}
                />
            </div>
            <div className="mb-4">
                <ColorMenu onInsertTag={handleRemoteInsertTag} />
            </div>
            <textarea
                ref={remoteTextAreaRef}
                id="remote-script-editor"
                name="remoteScriptText"
                value={text}
                onChange={(e) => actions.handleTextChange(e.target.value)}
                className="flex-1 w-full bg-slate-900/50 border border-slate-800 rounded-xl p-4 text-slate-200 font-mono text-sm focus:outline-none focus:border-brand-500 resize-none h-full"
                placeholder="Enter your script here..."
                aria-label="Script Editor"
            />
        </div>
    );
};
