import React, { useRef } from "react";
import { ColorMenu } from "../ui/ColorMenu";
import { insertTagInText } from "../../utils/editorHelpers";
import { RemoteActions } from "../../types";

interface RemoteEditorProps {
    text: string;
    actions: RemoteActions;
}

export const RemoteEditor: React.FC<RemoteEditorProps> = ({ text, actions }) => {
    const remoteTextAreaRef = useRef<HTMLTextAreaElement>(null);

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
            <div className="mb-4">
                <ColorMenu onInsertTag={handleRemoteInsertTag} />
            </div>
            <textarea
                ref={remoteTextAreaRef}
                value={text}
                onChange={(e) => actions.handleTextChange(e.target.value)}
                className="flex-1 w-full bg-slate-900/50 border border-slate-800 rounded-xl p-4 text-slate-200 font-mono text-sm focus:outline-none focus:border-brand-500 resize-none h-full"
                placeholder="Enter your script here..."
                aria-label="Script Editor"
            />
        </div>
    );
};
