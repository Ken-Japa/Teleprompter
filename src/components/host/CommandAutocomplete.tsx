import React, { useRef } from 'react';
import { useTranslation } from '../../hooks/useTranslation';

export interface AutocompleteSuggestion {
    id: string;
    label: string;
    description: string;
    command: string; // The text to be inserted
}

interface CommandAutocompleteProps {
    suggestions: AutocompleteSuggestion[];
    position: { top: number; left: number };
    activeIndex: number;
    onSelect: (suggestion: AutocompleteSuggestion) => void;
    onClose: () => void;
}

export const CommandAutocomplete: React.FC<CommandAutocompleteProps> = ({
    suggestions,
    position,
    activeIndex,
    onSelect,
    onClose
}) => {
    const { t } = useTranslation();
    const containerRef = useRef<HTMLDivElement>(null);

    // Close when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    if (suggestions.length === 0) return null;

    return (
        <div
            ref={containerRef}
            className="fixed z-[9999] min-w-[300px] overflow-hidden rounded-2xl border border-white/10 bg-slate-900/90 shadow-2xl backdrop-blur-2xl transition-all duration-300 animate-in fade-in slide-in-from-top-2"
            style={{
                top: position.top + 25,
                left: position.left,
            }}
        >
            <div className="flex flex-col p-2 space-y-1">
                <div className="px-3 py-2 text-[10px] uppercase tracking-widest text-slate-500 font-bold border-b border-white/5 mb-1">
                    {t('host.autocomplete.title')}
                </div>
                {suggestions.map((suggestion, index) => (
                    <button
                        key={suggestion.id}
                        onClick={() => onSelect(suggestion)}
                        className={`flex flex-col items-start px-4 py-3 rounded-xl transition-all duration-200 text-left w-full group
                              ${index === activeIndex
                                ? 'bg-brand-500/20 shadow-[inset_0_0_20px_rgba(99,102,241,0.1)] border-white/10 border'
                                : 'hover:bg-white/5 border border-transparent'
                            }`}
                    >
                        <div className="flex items-center justify-between w-full">
                            <span className={`font-mono text-sm font-bold tracking-tight ${index === activeIndex ? 'text-brand-300' : 'text-slate-200'}`}>
                                {suggestion.label}
                            </span>
                            <span className="text-[10px] text-slate-500 group-hover:text-slate-400 font-mono">
                                {suggestion.command}
                            </span>
                        </div>
                        <span className="text-xs text-slate-400 mt-1 line-clamp-1 italic">
                            {suggestion.description}
                        </span>
                    </button>
                ))}
            </div>

            <div className="px-4 py-2 bg-slate-950/50 border-t border-white/5 flex items-center justify-between">
                <div className="flex gap-3 text-[9px] text-slate-500 uppercase font-bold tracking-tighter">
                    <span className="flex items-center gap-1">
                        <kbd className="px-1 py-0.5 bg-white/5 rounded">↑↓</kbd> {t('host.autocomplete.navigate')}
                    </span>
                    <span className="flex items-center gap-1">
                        <kbd className="px-1 py-0.5 bg-white/5 rounded">ENTER</kbd> {t('host.autocomplete.select')}
                    </span>
                </div>
                <span className="text-[9px] text-slate-600 font-mono">
                    {suggestions.length} {t('host.autocomplete.results')}
                </span>
            </div>
        </div>
    );
};
