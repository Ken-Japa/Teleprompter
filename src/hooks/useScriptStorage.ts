import { useState, useEffect, useCallback } from "react";
import { logger } from "../utils/logger";
import { useTranslation } from "../hooks/useTranslation";
import { useAuth } from "../contexts/AuthContext";
import { collection, doc, setDoc, deleteDoc, onSnapshot, writeBatch } from "firebase/firestore";
import { db } from "../config/firebase-client";

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

const MUSIC_SCRIPTS_KEY = "neonprompt_musics";
const MUSIC_ACTIVE_SCRIPT_KEY = "neonprompt_active_music_id";

const generateId = () => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
    }
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export const useScriptStorage = (isMusicianMode?: boolean) => {
    const { t } = useTranslation();
    const { user } = useAuth(); // Auth integration

    const scriptsKey = isMusicianMode ? MUSIC_SCRIPTS_KEY : SCRIPTS_KEY;
    const activeScriptKey = isMusicianMode ? MUSIC_ACTIVE_SCRIPT_KEY : ACTIVE_SCRIPT_KEY;

    // --- State ---
    const [scripts, setScripts] = useState<Script[]>(() => {
        // Initial load only from LocalStorage (fastest)
        try {
            const storedScripts = localStorage.getItem(scriptsKey);
            if (storedScripts) {
                return JSON.parse(storedScripts);
            }

            // Migration from legacy single text (Only for general mode)
            const legacyText = !isMusicianMode ? localStorage.getItem(LEGACY_TEXT_KEY) : null;
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
            return localStorage.getItem(activeScriptKey) || "";
        } catch { return ""; }
    });

    // Ensure we always have an active script ID
    useEffect(() => {
        if (!activeScriptId || !scripts.some(s => s.id === activeScriptId)) {
            if (scripts.length > 0) {
                setActiveScriptId(scripts[0].id);
            }
        }
    }, [scripts, activeScriptId]);

    // Update activeScriptId storage
    useEffect(() => {
        if (activeScriptId) {
            localStorage.setItem(activeScriptKey, activeScriptId);
        }
    }, [activeScriptId, activeScriptKey]);


    // --- Cloud Sync Logic ---

    // 1. Sync Down: Listen to Firestore changes
    useEffect(() => {
        if (!user) return; // Only if logged in

        // Collection path: users/{uid}/scripts (or music_scripts)
        const collectionName = isMusicianMode ? "music_scripts" : "scripts";
        const scriptsRef = collection(db, "users", user.uid, collectionName);

        const unsubscribe = onSnapshot(scriptsRef, (snapshot) => {
            const cloudScripts: Script[] = [];
            snapshot.forEach((doc) => {
                cloudScripts.push(doc.data() as Script);
            });

            // If cloud has data, use it. 
            // If cloud is empty, we might be new user OR just synced. 
            // We'll handle the "Push Up" in a separate effect once on login.
            if (cloudScripts.length > 0) {
                // Sort by lastModified desc
                cloudScripts.sort((a, b) => b.lastModified - a.lastModified);
                setScripts(cloudScripts);

                // Also update localStorage as a backup/cache
                localStorage.setItem(scriptsKey, JSON.stringify(cloudScripts));
            }
        });

        return () => unsubscribe();
    }, [user, isMusicianMode, scriptsKey]);


    // 2. Sync Up: Merge Local to Cloud on Login
    useEffect(() => {
        if (!user) return;

        const mergeLocalToCloud = async () => {
            const hasMergedKey = `merged_${user.uid}_${scriptsKey}`;
            if (sessionStorage.getItem(hasMergedKey)) return; // Avoid re-merging in same session

            try {
                const storedScripts = localStorage.getItem(scriptsKey);
                if (!storedScripts) return;

                const localScripts: Script[] = JSON.parse(storedScripts);
                if (localScripts.length === 0) return;

                const collectionName = isMusicianMode ? "music_scripts" : "scripts";
                const batch = writeBatch(db);

                // We blindly overwrite/write these to cloud. 
                // Firestore handles idempotency if ID matches.
                localScripts.forEach(script => {
                    const docRef = doc(db, "users", user.uid, collectionName, script.id);
                    batch.set(docRef, script, { merge: true });
                });

                await batch.commit();
                sessionStorage.setItem(hasMergedKey, "true");
                logger.info("Local scripts merged to cloud successfully.");

            } catch (error) {
                logger.error("Failed to merge scripts to cloud", { error: error as Error });
            }
        };

        mergeLocalToCloud();
    }, [user, isMusicianMode, scriptsKey]);


    // --- Actions (Hybrid) ---


    // Refined Action Implementations for Hybrid Mode

    const handleCreateScript = useCallback(async () => {
        const newScript: Script = {
            id: generateId(),
            title: t("script.new"),
            content: "",
            lastModified: Date.now()
        };

        if (user) {
            try {
                const collectionName = isMusicianMode ? "music_scripts" : "scripts";
                await setDoc(doc(db, "users", user.uid, collectionName, newScript.id), newScript);
                // Firestore listener will update state
                setActiveScriptId(newScript.id);
            } catch (e) { logger.error("Cloud create failed", { error: e as Error }); }
        } else {
            setScripts(prev => {
                const next = [...prev, newScript];
                localStorage.setItem(scriptsKey, JSON.stringify(next));
                return next;
            });
            setActiveScriptId(newScript.id);
        }
        return newScript.id;
    }, [user, t, isMusicianMode, scriptsKey]);

    const handleDeleteScript = useCallback(async (id: string) => {
        if (user) {
            const collectionName = isMusicianMode ? "music_scripts" : "scripts";
            try {
                await deleteDoc(doc(db, "users", user.uid, collectionName, id));
                // Listener updates state
                if (activeScriptId === id) setActiveScriptId("");
            } catch (e) { logger.error("Cloud delete failed", { error: e as Error }); }
        } else {
            setScripts(prev => {
                const remaining = prev.filter(s => s.id !== id);
                // Prevent empty state locally
                if (remaining.length === 0) {
                    const newScript = {
                        id: generateId(),
                        title: t("script.new"),
                        content: "",
                        lastModified: Date.now()
                    };
                    remaining.push(newScript);
                }
                localStorage.setItem(scriptsKey, JSON.stringify(remaining));
                return remaining;
            });
            if (activeScriptId === id) setActiveScriptId("");
        }
    }, [user, isMusicianMode, scriptsKey, activeScriptId, t]);


    const handleUpdateScript = useCallback(async (id: string, updates: Partial<Script>) => {
        // This needs to be robust for both local and cloud
        // We can't rely on 'scripts' in dependency array too much or it re-renders.
        // Functional updates are best for local state, but for Cloud we need the data.

        setScripts(prev => {
            const target = prev.find(s => s.id === id);
            if (!target) return prev;

            const newData = { ...target, ...updates, lastModified: Date.now() };
            const newArr = prev.map(s => s.id === id ? newData : s);

            if (user) {
                const collectionName = isMusicianMode ? "music_scripts" : "scripts";
                // Fire and forget cloud update (debouncing might be good in UI layer, but here is fine for now)
                setDoc(doc(db, "users", user.uid, collectionName, id), newData, { merge: true })
                    .catch(e => logger.error("Cloud update failed", { error: e as Error }));
            } else {
                localStorage.setItem(scriptsKey, JSON.stringify(newArr));
            }
            return newArr;
        });
    }, [user, isMusicianMode, scriptsKey]);


    const switchScript = useCallback((id: string) => {
        // We can check if it exists in current state 'scripts'
        // But since state might be async, we just trust the ID for now or check current scripts ref.
        setActiveScriptId(id);
    }, []);

    // Legacy compatibility layer
    const setText = useCallback((newText: string) => {
        if (activeScriptId) {
            handleUpdateScript(activeScriptId, { content: newText });
        }
    }, [activeScriptId, handleUpdateScript]);

    const activeScript = scripts.find(s => s.id === activeScriptId) || scripts[0];

    return {
        scripts,
        activeScriptId,
        activeScript,
        createScript: handleCreateScript,
        updateScript: handleUpdateScript,
        deleteScript: handleDeleteScript,
        switchScript,
        text: activeScript?.content || "",
        setText
    };
};
