import { useState, useEffect, useCallback, useRef } from "react";
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

// New key for pending deletes
const PENDING_DELETES_KEY = "neonprompt_pending_deletes";

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

    // We use a ref to keep track of the latest local scripts state to avoid
    // dependency cycles in the onSnapshot listener, but we still prefer reading from LocalStorage
    // as the "source of truth" for local edits during sync.
    const localScriptsRef = useRef<Script[]>([]);

    // --- State ---
    const [scripts, setScripts] = useState<Script[]>(() => {
        // Initial load only from LocalStorage (fastest)
        try {
            const storedScripts = localStorage.getItem(scriptsKey);
            if (storedScripts) {
                const parsed = JSON.parse(storedScripts);
                localScriptsRef.current = parsed;
                return parsed;
            }

            // Migration from legacy single text (Only for general mode)
            const legacyText = !isMusicianMode ? localStorage.getItem(LEGACY_TEXT_KEY) : null;
            const defaultText = t("host.defaultText");
            const initialContent = legacyText || defaultText;

            const initial = [{
                id: generateId(),
                title: t("script.untitled"),
                content: initialContent,
                lastModified: Date.now()
            }];

            localScriptsRef.current = initial;
            return initial;
        } catch (e) {
            logger.error("Failed to load scripts", { error: e as Error });
            const fallback = [{
                id: generateId(),
                title: "Untitled Script",
                content: "",
                lastModified: Date.now()
            }];
            localScriptsRef.current = fallback;
            return fallback;
        }
    });

    // Update ref whenever state changes
    useEffect(() => {
        localScriptsRef.current = scripts;
    }, [scripts]);

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

    // 1. Sync Down: Listen to Firestore changes with Conflict Resolution
    useEffect(() => {
        if (!user) return; // Only if logged in

        const collectionName = isMusicianMode ? "music_scripts" : "scripts";
        const scriptsRef = collection(db, "users", user.uid, collectionName);

        // Enable metadata changes to potentially detect local vs server writes if needed,
        // but primarily we rely on data comparison.
        const unsubscribe = onSnapshot(scriptsRef, { includeMetadataChanges: true }, (snapshot) => {
            // 1. Load pending deletes
            let pendingDeletes: string[] = [];
            try {
                const storedDeletes = localStorage.getItem(PENDING_DELETES_KEY);
                pendingDeletes = storedDeletes ? JSON.parse(storedDeletes) : [];
            } catch (e) { console.warn("Failed to parse pending deletes", e); }

            // 2. Load latest local state (most reliable source of truth for "Working Copy")
            let localState: Script[] = [];
            try {
                const stored = localStorage.getItem(scriptsKey);
                localState = stored ? JSON.parse(stored) : [];
            } catch (e) { localState = localScriptsRef.current; }


            const cloudScriptsMap = new Map<string, Script>();

            snapshot.forEach((doc) => {
                const data = doc.data() as Script;
                // Exclude if marked for deletion locally
                if (!pendingDeletes.includes(data.id)) {
                    cloudScriptsMap.set(data.id, data);
                }
            });

            // 3. Merge Strategy: Union of Cloud and Local
            // We start with Cloud scripts, but verify against Local timestamps.
            const mergedScripts: Script[] = [];
            const processedIds = new Set<string>();

            // Process Cloud Scripts
            cloudScriptsMap.forEach((cloudScript) => {
                const localScript = localState.find(l => l.id === cloudScript.id);
                processedIds.add(cloudScript.id);

                if (localScript) {
                    // CONFLICT RESOLUTION:
                    // If local version is significantly newer (> 2000ms), assume it's a work-in-progress 
                    // that hasn't synced up yet. Keep local.
                    // The 2000ms buffer helps avoid clock skew issues or race conditions where 
                    // cloud roundtrip makes it look "older" but it's actually the same ack.
                    if (localScript.lastModified > cloudScript.lastModified + 2000) {
                        mergedScripts.push(localScript);
                        // Optional: Trigger a push-up here? 
                        // The 'Sync Up' logic or the next edit will handle it.
                    } else {
                        // Cloud is newer or same -> Accept Cloud
                        mergedScripts.push(cloudScript);
                    }
                } else {
                    // Only on cloud -> New script from another device
                    mergedScripts.push(cloudScript);
                }
            });

            // Process Local-Only Scripts (created while offline, or not yet synced)
            localState.forEach(localScript => {
                if (!processedIds.has(localScript.id) && !pendingDeletes.includes(localScript.id)) {
                    // Verify it hasn't been deleted on cloud?
                    // If it's not in cloudScriptsMap, it might have been deleted remotely OR created locally.
                    // Hard to distinguish without a "tombstone" or "syncedAt" timestamp.
                    // For now, if we have it locally and it wasn't in the snapshot (and wasn't pending delete),
                    // we keep it. This biases towards "Retention".
                    mergedScripts.push(localScript);
                }
            });

            // If we have data, update state
            if (mergedScripts.length > 0) {
                mergedScripts.sort((a, b) => b.lastModified - a.lastModified);

                // Deep comparison to avoid unnecessary re-renders/loops if data is identical
                const currentStr = JSON.stringify(localState);
                const newStr = JSON.stringify(mergedScripts);

                if (currentStr !== newStr) {
                    setScripts(mergedScripts);
                    localStorage.setItem(scriptsKey, newStr);
                }
            } else if (snapshot.empty && localState.length === 0) {
                // Cloud empty, local empty. Do nothing (or init default).
            }
        });

        return () => unsubscribe();
    }, [user, isMusicianMode, scriptsKey]);


    // 2. Sync Up: Retry Pending Deletes & Merge Local to Cloud on Mount
    useEffect(() => {
        if (!user) return;

        const processPendingDeletes = async () => {
            const collectionName = isMusicianMode ? "music_scripts" : "scripts";
            try {
                const storedDeletes = localStorage.getItem(PENDING_DELETES_KEY);
                if (storedDeletes) {
                    const pendingDeletes: string[] = JSON.parse(storedDeletes);
                    if (pendingDeletes.length > 0) {
                        const batch = writeBatch(db);
                        pendingDeletes.forEach(id => {
                            const docRef = doc(db, "users", user.uid, collectionName, id);
                            batch.delete(docRef);
                        });
                        await batch.commit();
                        // Clear pending deletes on success
                        localStorage.removeItem(PENDING_DELETES_KEY);
                        logger.info("Processed pending deletes");
                    }
                }
            } catch (e) { logger.error("Failed syncing deletes", { error: e as Error }); }
        };

        // Initial check
        processPendingDeletes();

        // Listen for network recovery
        const handleOnline = () => {
            logger.info("Network restored, retrying pending operations...");
            processPendingDeletes();
        };

        window.addEventListener('online', handleOnline);
        return () => window.removeEventListener('online', handleOnline);

    }, [user, isMusicianMode]);


    // --- Actions ---

    const handleCreateScript = useCallback(async () => {
        const newScript: Script = {
            id: generateId(),
            title: t("script.new"),
            content: "",
            lastModified: Date.now()
        };

        // Optimistic Update
        setScripts(prev => {
            const next = [newScript, ...prev];
            localStorage.setItem(scriptsKey, JSON.stringify(next));
            return next;
        });
        setActiveScriptId(newScript.id);

        if (user) {
            try {
                const collectionName = isMusicianMode ? "music_scripts" : "scripts";
                await setDoc(doc(db, "users", user.uid, collectionName, newScript.id), newScript);
            } catch (e) { logger.error("Cloud create failed", { error: e as Error }); }
        }
        return newScript.id;
    }, [user, t, isMusicianMode, scriptsKey]);


    const handleDeleteScript = useCallback(async (id: string) => {
        // 1. Add to pending deletes (always safe)
        try {
            const storedDeletes = localStorage.getItem(PENDING_DELETES_KEY);
            const pending = storedDeletes ? JSON.parse(storedDeletes) : [];
            if (!pending.includes(id)) {
                pending.push(id);
                localStorage.setItem(PENDING_DELETES_KEY, JSON.stringify(pending));
            }
        } catch (e) { }

        // 2. Optimistic Update Local
        setScripts(prev => {
            const remaining = prev.filter(s => s.id !== id);

            // Prevent empty state
            if (remaining.length === 0) {
                const newScript = {
                    id: generateId(),
                    title: t("script.new"),
                    content: "",
                    lastModified: Date.now()
                };
                remaining.push(newScript);
                // Also create this new replacement script in cloud? 
                // We'll let the user interact with it first, or handleCreateScript logic applies if we used it.
                // But here we just inject it into state.
            }

            localStorage.setItem(scriptsKey, JSON.stringify(remaining));

            if (activeScriptId === id) {
                // Switch to first available or the new empty one
                setActiveScriptId(remaining[0]?.id || "");
            }
            return remaining;
        });

        // 3. Try Cloud Delete
        if (user) {
            const collectionName = isMusicianMode ? "music_scripts" : "scripts";
            try {
                await deleteDoc(doc(db, "users", user.uid, collectionName, id));
                // If successful, remove from pending deletes
                const storedDeletes = localStorage.getItem(PENDING_DELETES_KEY);
                if (storedDeletes) {
                    const pending = JSON.parse(storedDeletes) as string[];
                    const newPending = pending.filter(pid => pid !== id);
                    localStorage.setItem(PENDING_DELETES_KEY, JSON.stringify(newPending));
                }
            } catch (e) {
                logger.error("Cloud delete failed (queued)", { error: e as Error });
                // It remains in pendingDeletes for the useEffect to retry later
            }
        }
    }, [user, isMusicianMode, scriptsKey, activeScriptId, t]);


    const handleUpdateScript = useCallback(async (id: string, updates: Partial<Script>) => {
        const timestamp = Date.now();

        setScripts(prev => {
            const target = prev.find(s => s.id === id);
            // If doesn't exist, maybe it was deleted?
            if (!target) return prev;

            const newData = { ...target, ...updates, lastModified: timestamp };
            const newArr = prev.map(s => s.id === id ? newData : s);

            // Must update localStorage synchronously for safety
            localStorage.setItem(scriptsKey, JSON.stringify(newArr));

            if (user) {
                const collectionName = isMusicianMode ? "music_scripts" : "scripts";
                setDoc(doc(db, "users", user.uid, collectionName, id), newData, { merge: true })
                    .catch(e => logger.error("Cloud update failed", { error: e as Error }));
            }

            return newArr;
        });
    }, [user, isMusicianMode, scriptsKey]);


    const switchScript = useCallback((id: string) => {
        setActiveScriptId(id);
    }, []);

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
