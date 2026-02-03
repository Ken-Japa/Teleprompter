import { useState, useEffect, useCallback, useRef } from "react";
import { insertTagInText } from "../utils/editorHelpers";
import { useLocalStorage } from "./useLocalStorage";
import { HotkeyConfig } from "../types";
import { HOTKEY_DEFAULTS } from "../config/constants";

interface UseEditorLogicProps {
    text: string;
    setText: (text: string) => void;
}

export const useEditorLogic = ({ text, setText }: UseEditorLogicProps) => {
    // Local state for immediate UI feedback
    const [localText, setLocalText] = useState(text);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

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
        setLocalText(e.target.value);
    }, []);

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

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        const isMod = e.ctrlKey || e.metaKey;
        const isAlt = e.altKey;
        const isShift = e.shiftKey;

        // Check for formatting shortcuts (usually requires Mod)
        if (isMod) {
            let tag = "";
            const key = e.code;

            if (key === customHotkeys.FORMAT_BOLD) {
                // If Shift or Alt is pressed with B, use Blue instead of Bold
                // This logic preserves the user's special request while allowing customization of the base key
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
                // Specifically prevent refresh for Red shortcut if it's Ctrl+R
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
            // Support user's Option+R request for red
            e.preventDefault();
            handleInsertTag("r");
        }
    }, [handleInsertTag, customHotkeys]);

    return {
        localText,
        textAreaRef,
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
