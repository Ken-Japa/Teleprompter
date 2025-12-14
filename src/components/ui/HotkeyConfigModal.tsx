import React, { useState, useEffect, useCallback } from "react";
import * as S from "./Styled";
import { useTranslation } from "../../hooks/useTranslation";
import { HotkeyAction, HotkeyConfig } from "../../types";
import { HOTKEY_DEFAULTS } from "../../config/constants";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { RefreshIcon } from "./Icons";

interface HotkeyConfigModalProps {
    isOpen: boolean;
    onClose: () => void;
    isPro: boolean;
    onUnlockPro: () => void;
}

export const HotkeyConfigModal: React.FC<HotkeyConfigModalProps> = ({ isOpen, onClose, isPro, onUnlockPro }) => {
    const { t } = useTranslation();
    const [customHotkeys, setCustomHotkeys] = useLocalStorage<HotkeyConfig>("neonprompt_hotkeys_v1", HOTKEY_DEFAULTS as unknown as HotkeyConfig);
    const [editingAction, setEditingAction] = useState<HotkeyAction | null>(null);

    // Merge custom with defaults to ensure all keys exist
    const currentConfig = { ...HOTKEY_DEFAULTS, ...customHotkeys };

    const handleReset = () => {
        if (confirm("Reset all hotkeys to default?")) {
            setCustomHotkeys(HOTKEY_DEFAULTS as unknown as HotkeyConfig);
        }
    };

    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (!editingAction) return;

            e.preventDefault();
            e.stopPropagation();

            // Ignore modifier-only presses
            if (["Control", "Shift", "Alt", "Meta"].includes(e.key)) return;

            const code = e.code;

            // Check for conflicts
            const conflict = Object.entries(currentConfig).find(([_, val]) => val === code);
            if (conflict && conflict[0] !== editingAction) {
                // Determine conflicting action name (simple check)
                const conflictName = conflict[0];
                if (!confirm(`Key '${code}' is already used for ${conflictName}. Overwrite?`)) {
                    setEditingAction(null);
                    return;
                }
            }

            setCustomHotkeys((prev) => ({
                ...prev,
                [editingAction]: code,
            }));
            setEditingAction(null);
        },
        [editingAction, currentConfig, setCustomHotkeys]
    );

    useEffect(() => {
        if (editingAction) {
            window.addEventListener("keydown", handleKeyDown);
            return () => window.removeEventListener("keydown", handleKeyDown);
        }
    }, [editingAction, handleKeyDown]);


    if (!isOpen) return null;

    return (
        <S.Modal isOpen={isOpen} onClose={onClose} title={t("hotkeys.title") || "Keyboard Shortcuts"}>
            <div className="space-y-6">
                {!isPro && (
                    <div className="p-4 bg-gradient-to-br from-brand-500/10 to-purple-500/10 rounded-lg border border-brand-500/20 text-center">
                        <h3 className="text-brand-400 font-bold mb-2">{t("paywall.title")}</h3>
                        <p className="text-slate-400 text-sm mb-4">
                            {t("hotkeys.proDescription") || "Customizing hotkeys is a PRO feature."}
                        </p>
                        <S.PrimaryButton onClick={() => {
                            onUnlockPro();
                            onClose();
                        }}>
                            {t("paywall.unlock")}
                        </S.PrimaryButton>
                    </div>
                )}

                <div className={`space-y-3 ${!isPro ? "opacity-50 pointer-events-none filter blur-sm select-none" : ""}`}>
                    <div className="flex justify-end">
                        <button
                            onClick={handleReset}
                            className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                        >
                            <RefreshIcon className="w-3 h-3" />
                            {t("hotkeys.reset") || "Reset Defaults"}
                        </button>
                    </div>

                    <div className="grid gap-2 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                        {Object.values(HotkeyAction).map((action) => (
                            <div
                                key={action}
                                className={`flex items-center justify-between p-3 rounded-lg border transition-all ${editingAction === action
                                    ? "bg-brand-500/20 border-brand-500 text-white shadow-lg shadow-brand-500/10"
                                    : "bg-slate-800/50 border-slate-700/50 hover:bg-slate-800"
                                    }`}
                                onClick={() => isPro && setEditingAction(action)}
                            >
                                <span className="text-sm font-medium text-slate-200">
                                    {t(`hotkeys.actions.${action}`) || action.replace(/_/g, " ")}
                                </span>
                                <div className="flex items-center gap-2">
                                    {editingAction === action ? (
                                        <span className="text-xs text-brand-300 animate-pulse">
                                            {t("hotkeys.pressKey") || "Press key..."}
                                        </span>
                                    ) : (
                                        <kbd className="px-2 py-1 bg-slate-950 rounded border border-slate-700 text-xs font-mono text-slate-400 min-w-[2rem] text-center">
                                            {currentConfig[action] || "—"}
                                        </kbd>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </S.Modal>
    );
};
