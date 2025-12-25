import { useState, useEffect, useCallback, useRef } from "react";
import { insertTagInText } from "../utils/editorHelpers";

interface UseEditorLogicProps {
    text: string;
    setText: (text: string) => void;
}

export const useEditorLogic = ({ text, setText }: UseEditorLogicProps) => {
    // Local state for immediate UI feedback
    const [localText, setLocalText] = useState(text);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

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

        setHistory(prev => [...prev, localText].slice(-50));
        const result = insertTagInText(textarea.value, tag, textarea.selectionStart, textarea.selectionEnd);

        setLocalText(result.newText);

        // Restore Cursor / Selection Logic
        setTimeout(() => {
            if (textAreaRef.current) {
                textAreaRef.current.focus();
                const start = Math.max(0, result.newSelectionStart);
                const end = Math.max(0, result.newSelectionEnd);
                textAreaRef.current.setSelectionRange(start, end);
            }
        }, 0);
    }, [localText]);

    const handleSelectRange = useCallback((start: number, end: number) => {
        const textarea = textAreaRef.current;
        if (!textarea) return;

        textarea.focus();
        textarea.setSelectionRange(start, end);

        // Improved scroll into view
        const computedStyle = window.getComputedStyle(textarea);
        const lineHeight = parseInt(computedStyle.lineHeight) || 32;
        const padding = parseInt(computedStyle.paddingTop) || 0;

        // Calculate line number
        const textBefore = textarea.value.substr(0, start);
        const lines = textBefore.split("\n").length;

        const targetScroll = (lines - 1) * lineHeight + padding;
        const containerHeight = textarea.clientHeight;

        // If the target is NOT already visible in the middle-ish area, scroll to it
        const currentScroll = textarea.scrollTop;
        if (targetScroll < currentScroll || targetScroll > (currentScroll + containerHeight - lineHeight * 2)) {
            // Center the found text
            textarea.scrollTop = targetScroll - (containerHeight / 2) + (lineHeight / 2);
        }
    }, []);

    const handleClear = useCallback(() => {
        if (window.confirm("Tem certeza que deseja apagar todo o texto?")) {
            setHistory(prev => [...prev, localText].slice(-50));
            setLocalText("");
            setText("");
            if (textAreaRef.current) textAreaRef.current.focus();
        }
    }, [localText, setText]);

    return {
        localText,
        textAreaRef,
        handleChange,
        handleInsertTag,
        handleClear,
        handleSelectRange,
        handleUndo,
        handleUpdateText,
        canUndo: history.length > 0,
    };
};
