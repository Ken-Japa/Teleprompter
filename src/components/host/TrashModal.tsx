import React from "react";
import { Modal } from "../ui/styles/Modal";
import { useTranslation } from "../../hooks/useTranslation";
import { Script } from "../../hooks/useScriptStorage";
import { TrashIcon, RotateCcwIcon, InfoIcon } from "../ui/Icons";
import * as S from "../ui/Styled";

interface TrashModalProps {
    isOpen: boolean;
    onClose: () => void;
    deletedScripts: Script[];
    onRestore: (id: string) => void;
    onPermanentlyDelete: (id: string) => void;
}

export const TrashModal: React.FC<TrashModalProps> = ({
    isOpen,
    onClose,
    deletedScripts,
    onRestore,
    onPermanentlyDelete,
}) => {
    const { t } = useTranslation();

    const formatDate = (timestamp: number) => {
        return new Date(timestamp).toLocaleDateString(undefined, {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={t("script.trash") || "Trash"}>
            <div className="flex flex-col gap-4">
                {/* Info Note */}
                <div className="flex gap-3 p-3 bg-brand-500/10 border border-brand-500/20 rounded-xl text-brand-300 text-sm items-start">
                    <InfoIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <p>{t("script.autoCleanupNote") || "Scripts are automatically deleted after 14 days"}</p>
                </div>

                <div className="max-h-[60vh] overflow-y-auto custom-scrollbar pr-1">
                    {deletedScripts.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 text-slate-500 gap-4">
                            <TrashIcon className="w-16 h-16 opacity-20" />
                            <p className="text-lg font-medium">{t("script.emptyTrash") || "Your trash is empty"}</p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2">
                            {deletedScripts.sort((a, b) => (b.deletedAt || 0) - (a.deletedAt || 0)).map((script) => (
                                <div
                                    key={script.id}
                                    className="flex items-center justify-between p-4 bg-slate-800/40 border border-slate-700/50 rounded-xl hover:bg-slate-800/60 transition-all group"
                                >
                                    <div className="flex flex-col min-w-0 pr-4">
                                        <span className="text-slate-200 font-medium truncate">
                                            {script.title || t("script.untitled")}
                                        </span>
                                        <span className="text-xs text-slate-500">
                                            {t("common.delete")}: {script.deletedAt ? formatDate(script.deletedAt) : "---"}
                                        </span>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => onRestore(script.id)}
                                            className="p-2.5 bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-colors"
                                            title={t("script.restore") || "Restore"}
                                        >
                                            <RotateCcwIcon className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => {
                                                if (window.confirm(t("script.deleteConfirm"))) {
                                                    onPermanentlyDelete(script.id);
                                                }
                                            }}
                                            className="p-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-lg transition-colors"
                                            title={t("script.permanentlyDelete") || "Permanently Delete"}
                                        >
                                            <TrashIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex justify-end pt-2">
                    <S.SecondaryButton onClick={onClose}>
                        {t("host.exit") || "Done"}
                    </S.SecondaryButton>
                </div>
            </div>
        </Modal>
    );
};
