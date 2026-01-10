import { useState, useEffect, useCallback } from "react";
import { logger } from "../utils/logger";
import { useTranslation } from "../hooks/useTranslation";

export interface Script {
    id: string;
    title: string;
    content: string;
    lastModified: number;
    backingTrack?: {
        name: string;
        size: number;
        type: string;
    };
}


const SCRIPTS_KEY = "neonprompt_scripts";
const ACTIVE_SCRIPT_KEY = "neonprompt_active_script_id";
const LEGACY_TEXT_KEY = "neonprompt_text";

const generateId = () => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
    }
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export const useScriptStorage = () => {
    const { t } = useTranslation();

    // Initialize state from storage
    const [scripts, setScripts] = useState<Script[]>(() => {
        try {
            const storedScripts = localStorage.getItem(SCRIPTS_KEY);
            if (storedScripts) {
                return JSON.parse(storedScripts);
            }

            // Migration from legacy single text
            const legacyText = localStorage.getItem(LEGACY_TEXT_KEY);
            const defaultText = t("host.defaultText");
            const initialContent = legacyText || defaultText;

            return [{
                id: generateId(),
                title: t("script.untitled"),
                content: initialContent,
                lastModified: Date.now()
            }];
        } catch (e) {
            logger.error("Failed to load scripts", { error: e as Error });
            return [{
                id: generateId(),
                title: "Untitled Script",
                content: "",
                lastModified: Date.now()
            }];
        }
    });

    const [activeScriptId, setActiveScriptId] = useState<string>(() => {
        try {
            const storedId = localStorage.getItem(ACTIVE_SCRIPT_KEY);
            // Verify if stored ID exists in loaded scripts
            // We need to access the scripts we just initialized. 
            // Since we can't search 'scripts' state yet (it's initializing), we repeat the logic or just take the first one after mount.
            // But here we can use a trick: read from localStorage again or just trust the first one.
            // Safer:
            const storedScripts = localStorage.getItem(SCRIPTS_KEY);
            if (storedScripts) {
                const parsed: Script[] = JSON.parse(storedScripts);
                if (storedId && parsed.some(s => s.id === storedId)) {
                    return storedId;
                }
                return parsed[0]?.id || "";
            }
            // If we migrated, we don't know the ID yet because we generated it randomly above.
            // So we rely on the effect to fix this if it's mismatching, 
            // BUT strict mode might cause double render.
            // Better approach: Init activeScriptId inside the scripts initializer? No, separate state.
            // Let's just default to null and set it in effect if not found.
            return storedId || "";
        } catch {
            return "";
        }
    });

    // Ensure we always have an active script ID
    useEffect(() => {
        if (!activeScriptId || !scripts.some(s => s.id === activeScriptId)) {
            if (scripts.length > 0) {
                setActiveScriptId(scripts[0].id);
            }
        }
    }, [scripts, activeScriptId]);

    // Persistence
    useEffect(() => {
        try {
            localStorage.setItem(SCRIPTS_KEY, JSON.stringify(scripts));
        } catch (e) {
            logger.error("Failed to save scripts", { error: e as Error });
        }
    }, [scripts]);

    useEffect(() => {
        if (activeScriptId) {
            localStorage.setItem(ACTIVE_SCRIPT_KEY, activeScriptId);
        }
    }, [activeScriptId]);

    const activeScript = scripts.find(s => s.id === activeScriptId) || scripts[0];

    // Actions
    const updateScript = useCallback((id: string, updates: Partial<Script>) => {
        setScripts(prev => prev.map(s =>
            s.id === id ? { ...s, ...updates, lastModified: Date.now() } : s
        ));
    }, []);

    const createScript = useCallback(() => {
        const newScript: Script = {
            id: generateId(),
            title: t("script.new"),
            content: "",
            lastModified: Date.now()
        };
        setScripts(prev => [...prev, newScript]);
        setActiveScriptId(newScript.id);
        return newScript.id;
    }, [t]);

    const deleteScript = useCallback((id: string) => {
        setScripts(prev => {
            const remaining = prev.filter(s => s.id !== id);
            if (remaining.length === 0) {
                // Prevent empty state
                const newScript = {
                    id: generateId(),
                    title: t("script.new"),
                    content: "",
                    lastModified: Date.now()
                };
                return [newScript];
            }
            return remaining;
        });

        if (activeScriptId === id) {
            // Effect will handle switching to valid ID
            setActiveScriptId("");
        }
    }, [activeScriptId, t]);

    const switchScript = useCallback((id: string) => {
        if (scripts.some(s => s.id === id)) {
            setActiveScriptId(id);
        }
    }, [scripts]);

    // Legacy compatibility layer
    const setText = useCallback((newText: string) => {
        if (activeScriptId) {
            updateScript(activeScriptId, { content: newText });
        }
    }, [activeScriptId, updateScript]);

    return {
        scripts,
        activeScriptId,
        activeScript,
        createScript,
        updateScript,
        deleteScript,
        switchScript,
        // Legacy return values (mimicking [text, setText])
        text: activeScript?.content || "",
        setText
    };
};
