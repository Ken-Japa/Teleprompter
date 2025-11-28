import { useState, useEffect, useCallback, useRef } from 'react';
import { insertTagInText } from '../utils/editorHelpers';

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

    const handleInsertTag = useCallback((tag: string) => {
        const textarea = textAreaRef.current;
        if (!textarea) return;

        const result = insertTagInText(
            textarea.value,
            tag,
            textarea.selectionStart,
            textarea.selectionEnd
        );
        
        setLocalText(result.newText);
        
        // Restore Cursor / Selection Logic
        setTimeout(() => {
            if (textAreaRef.current) {
                textAreaRef.current.focus();
                textAreaRef.current.setSelectionRange(
                    result.newSelectionStart, 
                    result.newSelectionEnd
                );
            }
        }, 0);
    }, []);

    const handleClear = useCallback(() => {
        if (window.confirm('Tem certeza que deseja apagar todo o texto?')) {
            setLocalText('');
            setText('');
            if (textAreaRef.current) textAreaRef.current.focus();
        }
    }, [setText]);

    return {
        localText,
        textAreaRef,
        handleChange,
        handleInsertTag,
        handleClear
    };
};