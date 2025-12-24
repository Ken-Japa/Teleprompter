import React, { useState, useEffect, useRef } from "react";
import { Modal } from "../ui/styles/Modal";
import * as S from "../ui/Styled";
import { useTranslation } from "../../hooks/useTranslation";
import { ColorMenu } from "../ui/ColorMenu";
import { insertTagInText } from "../../utils/editorHelpers";
import { ScriptManager } from "./ScriptManager";
import { Script } from "../../hooks/useScriptStorage";

interface QuickEditModalProps {
    isOpen: boolean;
    onClose: () => void;
    text: string;
    onSave: (newText: string) => void;
    // Script Management Props
    scripts: Script[];
    activeScriptId: string;
    onSwitchScript: (id: string) => void;
    onCreateScript: () => void;
    onDeleteScript: (id: string) => void;
    onUpdateScript: (id: string, updates: Partial<Script>) => void;
}

export const QuickEditModal: React.FC<QuickEditModalProps> = ({
    isOpen,
    onClose,
    text,
    onSave,
    scripts,
    activeScriptId,
    onSwitchScript,
    onCreateScript,
    onDeleteScript,
    onUpdateScript,
}) => {
    const { t } = useTranslation();
    const [localText, setLocalText] = useState(text);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (isOpen) {
            setLocalText(text);
        }
    }, [text, isOpen]);

    const handleSave = () => {
        onSave(localText);
        onClose();
    };

    const handleInsertTag = (tag: string) => {
        const textarea = textAreaRef.current;
        if (!textarea) return;

        const result = insertTagInText(textarea.value, tag, textarea.selectionStart, textarea.selectionEnd);
        setLocalText(result.newText);

        setTimeout(() => {
            if (textAreaRef.current) {
                textAreaRef.current.focus();
                const start = Math.max(0, result.newSelectionStart);
                const end = Math.max(0, result.newSelectionEnd);
                textAreaRef.current.setSelectionRange(start, end);
            }
        }, 0);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={t("host.editText") || "Edit Text"}>
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-center pb-2 border-b border-slate-700">
                    <ScriptManager
                        scripts={scripts}
                        activeScriptId={activeScriptId}
                        onSwitch={onSwitchScript}
                        onCreate={onCreateScript}
                        onDelete={onDeleteScript}
                        onUpdateTitle={(id, title) => onUpdateScript(id, { title })}
                    />
                </div>
                <ColorMenu onInsertTag={handleInsertTag} />
                <textarea
                    ref={textAreaRef}
                    id="quick-edit-text"
                    name="quickEditText"
                    className="w-full h-96 p-4 bg-slate-800/50 border border-slate-700 rounded-xl text-slate-200 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none resize-none font-sans text-lg leading-relaxed"
                    value={localText}
                    onChange={(e) => setLocalText(e.target.value)}
                    placeholder={t("host.editorPlaceholder") || "Enter your text here..."}
                />
                <div className="flex justify-end gap-3">
                    <S.SecondaryButton onClick={onClose}>
                        {t("common.cancel") || "Cancel"}
                    </S.SecondaryButton>
                    <S.PrimaryButton onClick={handleSave}>
                        {t("common.save") || "Save"}
                    </S.PrimaryButton>
                </div>
            </div>
        </Modal>
    );
};
