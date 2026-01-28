import { useState, useEffect, useCallback, useRef } from "react";
import { logger } from "../utils/logger";
import { useAuth } from "../contexts/AuthContext";
import { collection, doc, setDoc, deleteDoc, onSnapshot, writeBatch } from "firebase/firestore";
import { db } from "../config/firebase-client";

export interface Setlist {
    id: string;
    title: string;
    songIds: string[];
    lastModified: number;
}

const SETLISTS_KEY = "neonprompt_setlists";
const ACTIVE_SETLIST_KEY = "neonprompt_active_setlist_id";

// Pending deletes key for setlists
const PENDING_SETLIST_DELETES_KEY = "neonprompt_pending_setlist_deletes";

const generateId = () => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
    }
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export const useSetlistStorage = (isMusicianMode?: boolean) => {
    const { user } = useAuth(); // Auth integration

    // Key Logic
    const setlistsKey = isMusicianMode ? "neonprompt_setlists_music" : SETLISTS_KEY;
    const activeSetlistKey = isMusicianMode ? "neonprompt_active_setlist_id_music" : ACTIVE_SETLIST_KEY;

    // Ref for Sync Truth
    const localSetlistsRef = useRef<Setlist[]>([]);

    // --- State ---
    const [setlists, setSetlists] = useState<Setlist[]>(() => {
        try {
            const stored = localStorage.getItem(setlistsKey);
            if (stored) {
                const parsed = JSON.parse(stored);
                localSetlistsRef.current = parsed;
                return parsed;
            }
            // Default initial setlist
            const initial = [{
                id: generateId(),
                title: isMusicianMode ? "My First Setlist" : "New Setlist",
                songIds: [],
                lastModified: Date.now()
            }];
            localSetlistsRef.current = initial;
            return initial;
        } catch (e) {
            logger.error("Failed to load setlists", { error: e as Error });
            const fallback = [{
                id: generateId(),
                title: "New Setlist",
                songIds: [],
                lastModified: Date.now()
            }];
            localSetlistsRef.current = fallback;
            return fallback;
        }
    });

    // Update ref
    useEffect(() => {
        localSetlistsRef.current = setlists;
    }, [setlists]);

    const [activeSetlistId, setActiveSetlistId] = useState<string>(() => {
        try {
            const storedId = localStorage.getItem(activeSetlistKey);
            return storedId || "";
        } catch { return ""; }
    });

    // Ensure active valid
    useEffect(() => {
        if ((!activeSetlistId || !setlists.some(s => s.id === activeSetlistId)) && setlists.length > 0) {
            setActiveSetlistId(setlists[0].id);
        }
    }, [setlists, activeSetlistId]);

    // Persist Active ID
    useEffect(() => {
        if (activeSetlistId) {
            localStorage.setItem(activeSetlistKey, activeSetlistId);
        }
    }, [activeSetlistId, activeSetlistKey]);




    // --- Cloud Sync Logic ---

    // 1. Sync Down (Listen)
    useEffect(() => {
        if (!user) return;

        // Collection: use "setlists" or "music_setlists"
        // Since isMusicianMode prop exists, we'll try to honor separation if desired, 
        // but typically setlists are only for musician mode. 
        // Let's assume standard "music_setlists" for consistency with script naming pattern 
        // or just "setlists" if shared. 
        // The implementation plan suggested "setlists" or "music_setlists". 
        // Given existing key 'neonprompt_setlists_music', let's use 'music_setlists' if mode is on.
        const collectionName = isMusicianMode ? "music_setlists" : "setlists";
        const colRef = collection(db, "users", user.uid, collectionName);

        const unsubscribe = onSnapshot(colRef, { includeMetadataChanges: true }, (snapshot) => {
            // Pending Deletes
            let pendingDeletes: string[] = [];
            try {
                const storedDeletes = localStorage.getItem(PENDING_SETLIST_DELETES_KEY);
                pendingDeletes = storedDeletes ? JSON.parse(storedDeletes) : [];
            } catch (e) { }

            // Latest Local
            let localState: Setlist[] = [];
            try {
                const stored = localStorage.getItem(setlistsKey);
                localState = stored ? JSON.parse(stored) : [];
            } catch (e) { localState = localSetlistsRef.current; }

            const cloudMap = new Map<string, Setlist>();
            snapshot.forEach(doc => {
                const data = doc.data() as Setlist;
                if (!pendingDeletes.includes(data.id)) {
                    cloudMap.set(data.id, data);
                }
            });

            const merged: Setlist[] = [];
            const processedIds = new Set<string>();

            // Cloud Process
            cloudMap.forEach(cloudItem => {
                const localItem = localState.find(l => l.id === cloudItem.id);
                processedIds.add(cloudItem.id);

                if (localItem) {
                    // Conflict Resolution
                    if (localItem.lastModified > cloudItem.lastModified + 2000) {
                        merged.push(localItem);
                    } else {
                        merged.push(cloudItem);
                    }
                } else {
                    merged.push(cloudItem);
                }
            });

            // Local Only Process
            localState.forEach(localItem => {
                if (!processedIds.has(localItem.id) && !pendingDeletes.includes(localItem.id)) {
                    merged.push(localItem);
                }
            });

            if (merged.length > 0) {
                merged.sort((a, b) => b.lastModified - a.lastModified);
                const curStr = JSON.stringify(localState);
                const newStr = JSON.stringify(merged);
                if (curStr !== newStr) {
                    setSetlists(merged);
                    localStorage.setItem(setlistsKey, newStr);
                }
            }
        });

        return () => unsubscribe();
    }, [user, isMusicianMode, setlistsKey]);

    // 2. Sync Up (Deletes & Init)
    useEffect(() => {
        if (!user) return;

        const processPendingDeletes = async () => {
            const collectionName = isMusicianMode ? "music_setlists" : "setlists";
            try {
                const storedDeletes = localStorage.getItem(PENDING_SETLIST_DELETES_KEY);
                if (storedDeletes) {
                    const pending: string[] = JSON.parse(storedDeletes);
                    if (pending.length > 0) {
                        const batch = writeBatch(db);
                        pending.forEach(id => {
                            const docRef = doc(db, "users", user.uid, collectionName, id);
                            batch.delete(docRef);
                        });
                        await batch.commit();
                        localStorage.removeItem(PENDING_SETLIST_DELETES_KEY);
                        logger.info("Processed pending setlist deletes");
                    }
                }
            } catch (e) { logger.error("Failed syncing setlist deletes", { error: e as Error }); }
        };

        processPendingDeletes();

        const handleOnline = () => {
            processPendingDeletes();
        };
        window.addEventListener('online', handleOnline);
        return () => window.removeEventListener('online', handleOnline);

    }, [user, isMusicianMode]);


    // --- Core Action Logic (Unified) ---

    const handleUpdateSetlist = useCallback(async (id: string, updates: Partial<Setlist>) => {
        const timestamp = Date.now();

        setSetlists(prev => {
            const target = prev.find(s => s.id === id);
            if (!target) return prev;

            const newData = { ...target, ...updates, lastModified: timestamp };
            const newArr = prev.map(s => s.id === id ? newData : s);

            // Local Persist
            localStorage.setItem(setlistsKey, JSON.stringify(newArr));

            // Cloud Persist
            if (user) {
                const collectionName = isMusicianMode ? "music_setlists" : "setlists";
                setDoc(doc(db, "users", user.uid, collectionName, id), newData, { merge: true })
                    .catch(e => logger.error("Cloud setlist update failed", { error: e as Error }));
            }

            return newArr;
        });
    }, [user, isMusicianMode, setlistsKey]);


    // --- Public Actions ---

    const createSetlist = useCallback(async () => {
        const newSetlist: Setlist = {
            id: generateId(),
            title: isMusicianMode ? "New Setlist" : "New Setlist",
            songIds: [],
            lastModified: Date.now()
        };

        setSetlists(prev => {
            const next = [...prev, newSetlist];
            localStorage.setItem(setlistsKey, JSON.stringify(next));
            return next;
        });
        setActiveSetlistId(newSetlist.id);

        if (user) {
            try {
                const collectionName = isMusicianMode ? "music_setlists" : "setlists";
                await setDoc(doc(db, "users", user.uid, collectionName, newSetlist.id), newSetlist);
            } catch (e) { logger.error("Cloud setlist create failed", { error: e as Error }); }
        }
        return newSetlist.id;
    }, [user, isMusicianMode, setlistsKey]);


    const deleteSetlist = useCallback(async (id: string) => {
        // 1. Pending Queue
        try {
            const stored = localStorage.getItem(PENDING_SETLIST_DELETES_KEY);
            const pending = stored ? JSON.parse(stored) : [];
            if (!pending.includes(id)) {
                pending.push(id);
                localStorage.setItem(PENDING_SETLIST_DELETES_KEY, JSON.stringify(pending));
            }
        } catch (e) { }

        // 2. Optimistic Local
        setSetlists(prev => {
            const remaining = prev.filter(s => s.id !== id);
            if (remaining.length === 0) {
                const newSetlist = {
                    id: generateId(),
                    title: "New Setlist",
                    songIds: [],
                    lastModified: Date.now()
                };
                remaining.push(newSetlist);
            }
            localStorage.setItem(setlistsKey, JSON.stringify(remaining));
            if (activeSetlistId === id) setActiveSetlistId(remaining[0]?.id || "");
            return remaining;
        });

        // 3. Cloud Delete
        if (user) {
            const collectionName = isMusicianMode ? "music_setlists" : "setlists";
            try {
                await deleteDoc(doc(db, "users", user.uid, collectionName, id));
                // Remove from pending
                const stored = localStorage.getItem(PENDING_SETLIST_DELETES_KEY);
                if (stored) {
                    const pending = JSON.parse(stored) as string[];
                    const newPending = pending.filter(pid => pid !== id);
                    localStorage.setItem(PENDING_SETLIST_DELETES_KEY, JSON.stringify(newPending));
                }
            } catch (e) { logger.error("Cloud setlist delete failed (queued)", { error: e as Error }); }
        }
    }, [user, isMusicianMode, setlistsKey, activeSetlistId]);


    // Derived Actions using handleUpdateSetlist
    const updateSetlistTitle = useCallback((id: string, title: string) => {
        handleUpdateSetlist(id, { title });
    }, [handleUpdateSetlist]);

    const addSongToSetlist = useCallback((setlistId: string, songId: string) => {
        // We need current state to append. 
        // Since handleUpdateSetlist uses functional update, we can't easily append "blindly" 
        // without reading state. But 'setlists' is in scope.
        // BUT stale closures if we use 'setlists' directly defined outside the callback.
        // Better: logic inside handleUpdateSetlist OR read from ref?
        // Simpler: Read from ref inside this callback.

        const currentSetlists = localSetlistsRef.current;
        const setlist = currentSetlists.find(s => s.id === setlistId);
        if (setlist) {
            const newSongIds = [...setlist.songIds, songId];
            handleUpdateSetlist(setlistId, { songIds: newSongIds });
        }
    }, [handleUpdateSetlist]); // localSetlistsRef is stable

    const removeSongFromSetlist = useCallback((setlistId: string, songIndex: number) => {
        const currentSetlists = localSetlistsRef.current;
        const setlist = currentSetlists.find(s => s.id === setlistId);
        if (setlist) {
            const newSongIds = [...setlist.songIds];
            newSongIds.splice(songIndex, 1);
            handleUpdateSetlist(setlistId, { songIds: newSongIds });
        }
    }, [handleUpdateSetlist]);

    const reorderSongs = useCallback((setlistId: string, fromIndex: number, toIndex: number) => {
        const currentSetlists = localSetlistsRef.current;
        const setlist = currentSetlists.find(s => s.id === setlistId);
        if (setlist) {
            const newSongIds = [...setlist.songIds];
            const [moved] = newSongIds.splice(fromIndex, 1);
            newSongIds.splice(toIndex, 0, moved);
            handleUpdateSetlist(setlistId, { songIds: newSongIds });
        }
    }, [handleUpdateSetlist]);


    const activeSetlist = setlists.find(s => s.id === activeSetlistId) || setlists[0];

    return {
        setlists,
        activeSetlistId,
        activeSetlist,
        setActiveSetlistId,
        createSetlist,
        deleteSetlist,
        updateSetlistTitle,
        addSongToSetlist,
        removeSongFromSetlist,
        reorderSongs
    };
};
