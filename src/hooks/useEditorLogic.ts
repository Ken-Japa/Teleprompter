import { useState, useEffect, useCallback, useRef } from "react";
import { insertTagInText, getTextCursorPosition } from "../utils/editorHelpers";
import { useLocalStorage } from "./useLocalStorage";
import { AutocompleteSuggestion } from "../components/host/CommandAutocomplete";
import { HotkeyConfig } from "../types";
import { HOTKEY_DEFAULTS } from "../config/constants";
import { getEventHotkey } from "../utils/hotkeyUtils";
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

    // Keyboard padding state for iPad fix
    const [keyboardHeight, setKeyboardHeight] = useState(0);

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

        // Improved scroll into view logic
        // We use requestAnimationFrame to ensure the focus/layout has stabilized
        requestAnimationFrame(() => {
            const currentTextArea = textAreaRef.current;
            if (!currentTextArea) return;

            // Use the utility to get precise pixel coordinates within the textarea
            // This correctly accounts for text wrapping (unlike line-counting)
            const pos = getTextCursorPosition(currentTextArea);

            // getTextCursorPosition returns position relative to visible area
            // We need the absolute Y within the textarea scrollable content
            const absoluteY = pos.top + currentTextArea.scrollTop;

            // Current visibility metrics
            const viewportHeight = window.visualViewport ? window.visualViewport.height : currentTextArea.clientHeight;
            const currentScroll = currentTextArea.scrollTop;

            const computedStyle = window.getComputedStyle(currentTextArea);
            const lineHeight = parseInt(computedStyle.lineHeight) || 32;

            // Margin to keep caret away from edges
            const margin = lineHeight * 1.5;

            // CONSERVATIVE CHECK: Only scroll if jumping or obscured
            const isObscured = absoluteY < (currentScroll + margin) ||
                (absoluteY + lineHeight) > (currentScroll + viewportHeight - margin);

            if (isObscured) {
                // Smoothly center the active line in the visible area
                currentTextArea.scrollTop = absoluteY - (viewportHeight / 2) + (lineHeight / 2);
            }
        });
    }, []);

    // Effect to handle keyboard appearance (Visual Viewport resize)
    useEffect(() => {
        let timeoutId: ReturnType<typeof setTimeout>;

        const handler = () => {
            if (!window.visualViewport) return;

            const height = window.innerHeight;
            const viewportHeight = window.visualViewport.height;
            const offset = height - viewportHeight;

            // Only set if significant (avoid small jitter)
            if (offset > 100) {
                setKeyboardHeight(offset);
            } else {
                setKeyboardHeight(0);
            }

            // If focused, re-trigger the scroll logic to ensure the cursor is still visible
            // We adding a small delay to allow native browser scrolling to finish first
            if (document.activeElement === textAreaRef.current && textAreaRef.current) {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    if (textAreaRef.current) {
                        const start = textAreaRef.current.selectionStart;
                        const end = textAreaRef.current.selectionEnd;
                        handleSelectRange(start, end);
                    }
                }, 300);
            }
        };

        if (window.visualViewport) {
            window.visualViewport.addEventListener('resize', handler);
            window.visualViewport.addEventListener('scroll', handler);
            return () => {
                window.visualViewport?.removeEventListener('resize', handler);
                window.visualViewport?.removeEventListener('scroll', handler);
                clearTimeout(timeoutId);
            };
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

        let tag = "";
        const hotkey = getEventHotkey(e);

        if (hotkey === customHotkeys.FORMAT_BOLD) {
            tag = "bold";
        } else if (hotkey === customHotkeys.FORMAT_ITALIC) {
            tag = "i";
        } else if (hotkey === customHotkeys.FORMAT_UNDERLINE) {
            tag = "u";
        } else if (hotkey === customHotkeys.FORMAT_RED) {
            tag = "red";
        } else if (hotkey === customHotkeys.FORMAT_YELLOW) {
            tag = "yellow";
        } else if (hotkey === customHotkeys.FORMAT_GREEN) {
            tag = "green";
        } else if (hotkey === customHotkeys.FORMAT_BLUE) {
            tag = "blue";
        }

        if (tag) {
            e.preventDefault();
            handleInsertTag(tag);
            return;
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
        keyboardHeight,
        canUndo: history.length > 0,
    };
};
