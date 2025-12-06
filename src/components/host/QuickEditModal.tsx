import React, { useState, useEffect } from "react";
import { Modal } from "../ui/styles/Modal";
import * as S from "../ui/Styled";
import { useTranslation } from "../../hooks/useTranslation";

interface QuickEditModalProps {
    isOpen: boolean;
    onClose: () => void;
    text: string;
    onSave: (newText: string) => void;
}

export const QuickEditModal: React.FC<QuickEditModalProps> = ({
    isOpen,
    onClose,
    text,
    onSave,
}) => {
    const { t } = useTranslation();
    const [localText, setLocalText] = useState(text);

    useEffect(() => {
        if (isOpen) {
            setLocalText(text);
        }
    }, [text, isOpen]);

    const handleSave = () => {
        onSave(localText);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={t("host.editText") || "Edit Text"}>
            <div className="flex flex-col gap-4">
                <textarea
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
