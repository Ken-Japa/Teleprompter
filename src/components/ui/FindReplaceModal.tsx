import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { TrashIcon, RefreshIcon, SearchIcon, CloseIcon } from './Icons';

interface FindReplaceModalProps {
    isOpen: boolean;
    onClose: () => void;
    text: string;
    onTextChange: (newText: string) => void;
    onSelectRange?: (start: number, end: number) => void;
    onUndo?: () => void;
    canUndo?: boolean;
}

export const FindReplaceModal: React.FC<FindReplaceModalProps> = ({ isOpen, onClose, text, onTextChange, onSelectRange, onUndo, canUndo }) => {
    const { t } = useTranslation();
    const [findText, setFindText] = useState("");
    const [replaceText, setReplaceText] = useState("");
    const [matchCount, setMatchCount] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [lastMatchIndex, setLastMatchIndex] = useState(-1);

    // Reset when opening
    useEffect(() => {
        if (isOpen) {
            setLastMatchIndex(-1);
            setCurrentIndex(-1);
        }
    }, [isOpen]);

    // Count matches
    useEffect(() => {
        if (!findText) {
            setMatchCount(0);
            return;
        }
        try {
            const regex = new RegExp(escapeRegExp(findText), 'gi');
            const matches = text.match(regex);
            setMatchCount(matches ? matches.length : 0);
        } catch (e) {
            setMatchCount(0);
        }
    }, [findText, text]);

    const escapeRegExp = (string: string) => {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    const handleFindNext = useCallback(() => {
        if (!findText) return;
        const searchStr = findText.toLowerCase();
        const content = text.toLowerCase();

        let startIndex = lastMatchIndex + 1;
        let nextIndex = content.indexOf(searchStr, startIndex);

        if (nextIndex === -1) {
            // Wrap around
            nextIndex = content.indexOf(searchStr, 0);
        }

        if (nextIndex !== -1) {
            setLastMatchIndex(nextIndex);

            // Update "current index" display (e.g. 1 of 5)
            const matchesBefore = content.substring(0, nextIndex).match(new RegExp(escapeRegExp(findText), 'gi'));
            setCurrentIndex(matchesBefore ? matchesBefore.length + 1 : 1);

            onSelectRange?.(nextIndex, nextIndex + findText.length);
        }
    }, [findText, text, lastMatchIndex, onSelectRange]);

    const handleReplace = () => {
        if (!findText) return;

        if (lastMatchIndex !== -1) {
            const before = text.substring(0, lastMatchIndex);
            const match = text.substring(lastMatchIndex, lastMatchIndex + findText.length);
            const after = text.substring(lastMatchIndex + findText.length);

            if (match.toLowerCase() === findText.toLowerCase()) {
                const newText = before + replaceText + after;
                onTextChange(newText);

                setTimeout(() => {
                    onSelectRange?.(lastMatchIndex, lastMatchIndex + replaceText.length);
                }, 50);
                return;
            }
        }

        const regex = new RegExp(escapeRegExp(findText), 'i');
        const newText = text.replace(regex, replaceText);
        onTextChange(newText);
    };

    const handleReplaceAll = () => {
        if (!findText) return;
        const regex = new RegExp(escapeRegExp(findText), 'gi');
        const newText = text.replace(regex, replaceText);
        onTextChange(newText);
    };

    const handleRemoveLineBreaks = () => {
        const newText = text.replace(/(\r\n|\n|\r)+/g, '\n').trim();
        onTextChange(newText);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed top-24 right-4 sm:right-8 z-[100] w-[90vw] sm:w-80 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="p-4 border-b border-white/5 flex justify-between items-center bg-slate-950/40">
                <div className="flex items-center gap-2 text-slate-100">
                    <h3 className="font-bold text-sm uppercase tracking-wider">{t("editor.findReplace") || "Localizar"}</h3>
                </div>
                <div className="flex items-center gap-1">
                    {onUndo && (
                        <button
                            onClick={onUndo}
                            disabled={!canUndo}
                            className="p-1.5 text-slate-400 hover:text-brand-400 transition-colors rounded-lg hover:bg-white/5 disabled:opacity-20 disabled:cursor-not-allowed"
                            title={t("editor.undo") || "Desfazer (Alt+Z)"}
                        >
                            <RefreshIcon className="w-5 h-5 -scale-x-100" />
                        </button>
                    )}
                    <button
                        onClick={onClose}
                        className="p-1.5 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                    >
                        <CloseIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="p-5 space-y-5">
                {/* Find */}
                <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                            {t("editor.find") || "Localizar"}
                        </label>
                        {matchCount > 0 && (
                            <span className="text-[10px] font-bold text-brand-400">
                                {currentIndex > 0 ? `${currentIndex} / ` : ""}{matchCount} {t("editor.matches") || "resultados"}
                            </span>
                        )}
                    </div>
                    <div className="relative group">
                        <input
                            type="text"
                            value={findText}
                            onChange={(e) => {
                                setFindText(e.target.value);
                                setLastMatchIndex(-1);
                                setCurrentIndex(-1);
                            }}
                            placeholder={t("editor.findPlaceholder") || "Buscar..."}
                            className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-2.5 px-3.5 text-white text-sm focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/30 transition-all font-sans"
                            autoFocus
                        />
                        <button
                            onClick={handleFindNext}
                            disabled={!findText || matchCount === 0}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-brand-500/10 hover:bg-brand-500/20 text-brand-400 rounded-lg disabled:opacity-30 transition-all"
                            title={t("editor.findNext") || "Procurar Próximo"}
                        >
                            <SearchIcon className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Replace */}
                <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        {t("editor.replaceWith") || "Substituir por"}
                    </label>
                    <input
                        type="text"
                        value={replaceText}
                        onChange={(e) => setReplaceText(e.target.value)}
                        placeholder={t("editor.replacePlaceholder") || "Novo texto..."}
                        className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-2.5 px-3.5 text-white text-sm focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/30 transition-all font-sans"
                    />
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                        onClick={handleReplace}
                        disabled={!findText || (matchCount === 0 && lastMatchIndex === -1)}
                        className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl text-xs font-bold transition-all border border-white/5 flex items-center justify-center gap-2"
                    >
                        <RefreshIcon className="w-3.5 h-3.5" />
                        {t("editor.replace") || "Substituir"}
                    </button>
                    <button
                        onClick={handleReplaceAll}
                        disabled={!findText || matchCount === 0}
                        className="py-2.5 px-4 bg-brand-600 hover:bg-brand-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-brand-500/10 flex items-center justify-center gap-2"
                    >
                        <TrashIcon className="w-3.5 h-3.5 rotate-180" />
                        {t("editor.replaceAll") || "Todos"}
                    </button>
                </div>

                <div className="border-t border-white/5 pt-4 mt-2">
                    <button
                        onClick={handleRemoveLineBreaks}
                        className="w-full py-2.5 px-4 bg-slate-800/40 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 text-slate-400 rounded-xl text-xs font-medium transition-all border border-white/5 flex items-center justify-center gap-2"
                    >
                        <span className="text-base leading-none translate-y-[-1px]">↵</span>
                        {t("editor.removeLineBreaks") || "Limpar Linhas"}
                    </button>
                </div>
            </div>
        </div>
    );
};
