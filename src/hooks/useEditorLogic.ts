import { useState, useEffect, useCallback, useRef } from "react";
import { insertTagInText, getTextCursorPosition } from "../utils/editorHelpers";
import { useLocalStorage } from "./useLocalStorage";
import { AutocompleteSuggestion } from "../components/host/CommandAutocomplete";
import { HotkeyConfig } from "../types";
import { HOTKEY_DEFAULTS } from "../config/constants";
import { useTranslation } from "./useTranslation";
import { useMemo } from "react";

interface UseEditorLogicProps {
    text: string;
    setText: (text: string) => void;
}

export const useEditorLogic = ({ text, setText }: UseEditorLogicProps) => {
    // Local state for immediate UI feedback
    const [localText, setLocalText] = useState(text);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    // Autocomplete State
    const [autocompleteActive, setAutocompleteActive] = useState(false);
    const [autocompleteQuery, setAutocompleteQuery] = useState("");
    const [autocompletePos, setAutocompletePos] = useState({ top: 0, left: 0 });
    const [autocompleteIndex, setAutocompleteIndex] = useState(0);

    const { t } = useTranslation();

    // Centralized Commands List (Internationalized)
    const allCommands: AutocompleteSuggestion[] = useMemo(() => [
        { id: 'part', label: t('host.autocomplete.suggestions.part.label'), description: t('host.autocomplete.suggestions.part.desc'), command: '[PART X]' },
        { id: 'loop_start', label: t('host.autocomplete.suggestions.loop_start.label'), description: t('host.autocomplete.suggestions.loop_start.desc'), command: '[LOOP START]' },
        { id: 'loop_end', label: t('host.autocomplete.suggestions.loop_end.label'), description: t('host.autocomplete.suggestions.loop_end.desc'), command: '[LOOP X]' },
        { id: 'speed', label: t('host.autocomplete.suggestions.speed.label'), description: t('host.autocomplete.suggestions.speed.desc'), command: '[SPEED X]' },
        { id: 'pause', label: t('host.autocomplete.suggestions.pause.label'), description: t('host.autocomplete.suggestions.pause.desc'), command: '[PAUSE X]' },
        { id: 'stop', label: t('host.autocomplete.suggestions.stop.label'), description: t('host.autocomplete.suggestions.stop.desc'), command: '[STOP]' },
    ], [t]);

    // Derived filtered commands
    const filteredCommands = useMemo(() => {
        const q = autocompleteQuery.toLowerCase().trim();
        return !q ? allCommands : allCommands.filter(c =>
            c.label.toLowerCase().includes(q) ||
            c.id.toLowerCase().includes(q) ||
            c.command.toLowerCase().includes(q)
        );
    }, [autocompleteQuery, allCommands]);

    // Load hotkey config
    const [customHotkeys] = useLocalStorage<HotkeyConfig>("neonprompt_hotkeys_v1", HOTKEY_DEFAULTS as unknown as HotkeyConfig);

    // Sync from parent if prop changes externally (e.g. initial load or reset)
    useEffect(() => {
        setLocalText(text);
    }, [text]);

    // Debounce propagation to parent to avoid expensive re-renders/storage calls
    useEffect(() => {
        const handler = setTimeout(() => {
            if (localText !== text) {
                setText(localText);
            }
        }, 500);

        return () => clearTimeout(handler);
    }, [localText, setText, text]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        const curPos = e.target.selectionStart;
        setLocalText(value);

        // Autocomplete detection logic
        const textBeforeCursor = value.substring(0, curPos);
        const lastOpenBracket = textBeforeCursor.lastIndexOf("[");
        const textAfterLastBracket = textBeforeCursor.substring(lastOpenBracket + 1);

        if (lastOpenBracket !== -1 && !textAfterLastBracket.includes("]")) {
            setAutocompleteActive(true);
            setAutocompleteQuery(textAfterLastBracket);
            setAutocompleteIndex(0);

            if (textAreaRef.current) {
                const pos = getTextCursorPosition(textAreaRef.current);
                setAutocompletePos({ top: pos.top, left: pos.left });
            }
        } else {
            setAutocompleteActive(false);
        }
    }, [setAutocompleteActive, setAutocompleteQuery, setAutocompleteIndex, setAutocompletePos]);

    // History for Undo
    const [history, setHistory] = useState<string[]>([]);

    const handleUpdateText = useCallback((newText: string) => {
        setHistory(prev => [...prev, localText].slice(-50));
        setLocalText(newText);
    }, [localText]);

    const handleUndo = useCallback(() => {
        if (history.length === 0) return;
        const previous = history[history.length - 1];
        setHistory(prev => prev.slice(0, -1));
        setLocalText(previous);
        // Sync immediately on undo
        setText(previous);
    }, [history, setText]);

    const handleInsertTag = useCallback((tag: string) => {
        const textarea = textAreaRef.current;
        if (!textarea) return;

        // Save scroll position before making changes
        const savedScrollTop = textarea.scrollTop;

        setHistory(prev => [...prev, localText].slice(-50));
        const result = insertTagInText(textarea.value, tag, textarea.selectionStart, textarea.selectionEnd);

        setLocalText(result.newText);

        // Restore Cursor / Selection Logic AND Scroll Position
        setTimeout(() => {
            if (textAreaRef.current) {
                textAreaRef.current.focus();
                const start = Math.max(0, result.newSelectionStart);
                const end = Math.max(0, result.newSelectionEnd);
                textAreaRef.current.setSelectionRange(start, end);

                // Restore scroll position to keep the view where the user was editing
                textAreaRef.current.scrollTop = savedScrollTop;
            }
        }, 0);
    }, [localText]);

    const handleSelectRange = useCallback((start: number, end: number) => {
        const textarea = textAreaRef.current;
        if (!textarea) return;

        textarea.focus();
        textarea.setSelectionRange(start, end);

        // Improved scroll into view using Visual Viewport if available
        const viewportHeight = window.visualViewport ? window.visualViewport.height : textarea.clientHeight;
        const computedStyle = window.getComputedStyle(textarea);
        const lineHeight = parseInt(computedStyle.lineHeight) || 32;
        const padding = parseInt(computedStyle.paddingTop) || 0;

        // Calculate line number
        const textBefore = textarea.value.substr(0, start);
        const lines = textBefore.split("\n").length;

        const targetScroll = (lines - 1) * lineHeight + padding;

        // If the target is NOT already visible in the middle-ish area, scroll to it
        const currentScroll = textarea.scrollTop;
        if (targetScroll < currentScroll || targetScroll > (currentScroll + viewportHeight - lineHeight * 2)) {
            // Center the found text within the VISIBLE viewport
            textarea.scrollTop = targetScroll - (viewportHeight / 2) + (lineHeight / 2);
        }
    }, []);

    // Effect to handle keyboard appearance (Visual Viewport resize)
    useEffect(() => {
        const handler = () => {
            // If focused, re-trigger the scroll logic to ensure the cursor is still visible
            if (document.activeElement === textAreaRef.current && textAreaRef.current) {
                const start = textAreaRef.current.selectionStart;
                const end = textAreaRef.current.selectionEnd;
                handleSelectRange(start, end);
            }
        };

        if (window.visualViewport) {
            window.visualViewport.addEventListener('resize', handler);
            return () => window.visualViewport?.removeEventListener('resize', handler);
        }
    }, [handleSelectRange]);

    const handleClear = useCallback(() => {
        if (window.confirm("Tem certeza que deseja apagar todo o texto?")) {
            setHistory(prev => [...prev, localText].slice(-50));
            setLocalText("");
            setText("");
            if (textAreaRef.current) textAreaRef.current.focus();
        }
    }, [localText, setText]);

    const handleAutocompleteSelect = useCallback((suggestion: AutocompleteSuggestion) => {
        const textarea = textAreaRef.current;
        if (!textarea) return;

        const val = textarea.value;
        const curPos = textarea.selectionStart;
        const textBeforeCursor = val.substring(0, curPos);
        const lastOpenBracket = textBeforeCursor.lastIndexOf("[");

        let commandToInsert = suggestion.command;

        // Dynamic PART numbering logic
        if (suggestion.id === 'part') {
            const partRegex = /\[PART(?:\s+[^\]]*)?\]/gi;
            const matches = val.match(partRegex) || [];
            const nextPartNumber = matches.length + 1;
            commandToInsert = `[PART ${nextPartNumber}]`;
        }

        const newText = val.substring(0, lastOpenBracket) + commandToInsert + val.substring(curPos);
        const newCursorPos = lastOpenBracket + commandToInsert.length;

        setLocalText(newText);
        setAutocompleteActive(false);

        setTimeout(() => {
            if (textAreaRef.current) {
                textAreaRef.current.focus();
                textAreaRef.current.setSelectionRange(newCursorPos, newCursorPos);
            }
        }, 0);
    }, [setLocalText, setAutocompleteActive]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (autocompleteActive) {
            const count = filteredCommands.length;
            if (e.key === "ArrowDown") {
                e.preventDefault();
                setAutocompleteIndex(prev => (count > 0 ? (prev + 1) % count : 0));
                return;
            }
            if (e.key === "ArrowUp") {
                e.preventDefault();
                setAutocompleteIndex(prev => (count > 0 ? (prev - 1 + count) % count : 0));
                return;
            }
            if (e.key === "Enter" || e.key === "Tab") {
                if (count > 0) {
                    e.preventDefault();
                    handleAutocompleteSelect(filteredCommands[autocompleteIndex]);
                }
                return;
            }
            if (e.key === "Escape") {
                e.preventDefault();
                setAutocompleteActive(false);
                return;
            }
        }

        const isMod = e.ctrlKey || e.metaKey;
        const isAlt = e.altKey;
        const isShift = e.shiftKey;

        // Check for formatting shortcuts (usually requires Mod)
        if (isMod) {
            let tag = "";
            const key = e.code;

            if (key === customHotkeys.FORMAT_BOLD) {
                if (isShift || isAlt) {
                    tag = "b";
                } else {
                    tag = "bold";
                }
            } else if (key === customHotkeys.FORMAT_ITALIC) {
                tag = "i";
            } else if (key === customHotkeys.FORMAT_UNDERLINE) {
                tag = "u";
            } else if (key === customHotkeys.FORMAT_RED) {
                if (key === "KeyR") e.preventDefault();
                tag = "r";
            } else if (key === customHotkeys.FORMAT_YELLOW) {
                tag = "y";
            } else if (key === customHotkeys.FORMAT_GREEN) {
                tag = "g";
            } else if (key === customHotkeys.FORMAT_BLUE) {
                tag = "b";
            }

            if (tag) {
                e.preventDefault();
                handleInsertTag(tag);
            }
        } else if (isAlt && e.code === customHotkeys.FORMAT_RED) {
            e.preventDefault();
            handleInsertTag("r");
        }
    }, [handleInsertTag, customHotkeys, autocompleteActive, filteredCommands, autocompleteIndex, handleAutocompleteSelect]);

    return {
        localText,
        textAreaRef,
        autocompleteActive,
        autocompleteQuery,
        autocompletePos,
        autocompleteIndex,
        handleAutocompleteSelect,
        autocompleteCommands: filteredCommands,
        setAutocompleteActive,
        handleChange,
        handleInsertTag,
        handleClear,
        handleSelectRange,
        handleUndo,
        handleUpdateText,
        handleKeyDown,
        canUndo: history.length > 0,
    };
};
