import { memo } from "react";
import { TextFragment, TextCommand } from "../../../types";

interface SentenceItemProps {
    id: number;
    fragments: TextFragment[];
    isChord?: boolean;
    isMusicianMode?: boolean;
    command?: TextCommand;
    originalSentenceId?: number; // For voice control in musician mode
    darkMode?: boolean; // Added darkMode prop
}

export const SentenceItem = memo(
    ({ id, fragments, isChord, isMusicianMode, command, originalSentenceId, darkMode }: SentenceItemProps) => {
        // Musician Mode Styling Logic
        const className = `sentence-item content-visibility-auto block min-h-[1em] ${isMusicianMode
            ? `font-mono whitespace-pre ${isChord ? "text-yellow-400 font-bold" : "text-white"}`
            : ""
            }`;

        return (
            <span
                id={`sentence-${id}`}
                data-original-sentence-id={originalSentenceId} // For voice control matching
                className={className}
                data-command={command ? JSON.stringify(command) : undefined}
            >
                {fragments.map((frag, i) => {
                    const isCommandTag = /^\[.+\]$/.test(frag.text.trim());
                    const isChordTag = isChord && /^[A-G]/.test(frag.text.trim()); // Use isChord prop

                    return (
                        <span
                            key={i}
                            className={`
                                ${frag.type === 'red' ? (darkMode ? 'text-red-400' : 'text-red-600') : ''}
                                ${frag.type === 'yellow' ? (darkMode ? 'text-yellow-300' : 'text-yellow-600') : ''}
                                ${frag.type === 'green' ? (darkMode ? 'text-green-400' : 'text-green-600') : ''}
                                ${frag.type === 'blue' ? (darkMode ? 'text-blue-400' : 'text-blue-500') : ''}
                                ${frag.bold ? 'font-bold' : ''}
                                ${frag.italic ? 'italic' : ''}
                                ${frag.underline ? 'underline' : ''}
                                ${isCommandTag ? 'inline-block px-2 py-0.5 mx-0.5 rounded-md bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 font-mono text-xs font-semibold tracking-tight shadow-sm' : ''}
                                ${isChordTag ? 'inline-block px-1.5 py-0.5 rounded bg-red-500/10 border border-red-400/20 font-mono text-sm' : ''}
                            `}
                            style={isCommandTag ? { letterSpacing: '0.02em' } : undefined}
                        >
                            {frag.text}
                        </span>
                    );
                })}{" "}
            </span>
        );
    },
    (prev, next) =>
        prev.id === next.id &&
        prev.fragments === next.fragments &&
        prev.isMusicianMode === next.isMusicianMode &&
        prev.isChord === next.isChord &&
        prev.command === next.command &&
        prev.originalSentenceId === next.originalSentenceId &&
        prev.darkMode === next.darkMode // Added darkMode to comparison
);
