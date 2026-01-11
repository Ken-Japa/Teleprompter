import { useState, useEffect, useCallback } from "react";
import { logger } from "../utils/logger";


export interface Setlist {
    id: string;
    title: string;
    songIds: string[];
    lastModified: number;
}

const SETLISTS_KEY = "neonprompt_setlists";
const ACTIVE_SETLIST_KEY = "neonprompt_active_setlist_id";

const generateId = () => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
    }
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export const useSetlistStorage = (isMusicianMode?: boolean) => {
    const setlistsKey = isMusicianMode ? "neonprompt_setlists_music" : SETLISTS_KEY;
    const activeSetlistKey = isMusicianMode ? "neonprompt_active_setlist_id_music" : ACTIVE_SETLIST_KEY;

    // Initialize state from storage
    const [setlists, setSetlists] = useState<Setlist[]>(() => {
        try {
            const stored = localStorage.getItem(setlistsKey);
            if (stored) {
                return JSON.parse(stored);
            }
            // Default initial setlist
            return [{
                id: generateId(),
                title: isMusicianMode ? "My First Setlist" : "New Setlist",
                songIds: [],
                lastModified: Date.now()
            }];
        } catch (e) {
            logger.error("Failed to load setlists", { error: e as Error });
            return [];
        }
    });

    const [activeSetlistId, setActiveSetlistId] = useState<string>(() => {
        try {
            const storedId = localStorage.getItem(activeSetlistKey);
            if (storedId) return storedId;
            return ""; // Will be fixed by effect if empty and setlists exist
        } catch {
            return "";
        }
    });

    // Ensure active setlist valid
    useEffect(() => {
        if ((!activeSetlistId || !setlists.some(s => s.id === activeSetlistId)) && setlists.length > 0) {
            setActiveSetlistId(setlists[0].id);
        }
    }, [setlists, activeSetlistId]);

    // Persistence
    useEffect(() => {
        try {
            localStorage.setItem(setlistsKey, JSON.stringify(setlists));
        } catch (e) {
            logger.error("Failed to save setlists", { error: e as Error });
        }
    }, [setlists, setlistsKey]);

    useEffect(() => {
        if (activeSetlistId) {
            localStorage.setItem(activeSetlistKey, activeSetlistId);
        }
    }, [activeSetlistId, activeSetlistKey]);

    const activeSetlist = setlists.find(s => s.id === activeSetlistId) || setlists[0];

    // Actions
    const createSetlist = useCallback(() => {
        const newSetlist: Setlist = {
            id: generateId(),
            title: "New Setlist",
            songIds: [],
            lastModified: Date.now()
        };
        setSetlists(prev => [...prev, newSetlist]);
        setActiveSetlistId(newSetlist.id);
        return newSetlist.id;
    }, []);

    const deleteSetlist = useCallback((id: string) => {
        setSetlists(prev => {
            const remaining = prev.filter(s => s.id !== id);
            if (remaining.length === 0) {
                // Ensure at least one
                return [{
                    id: generateId(),
                    title: "My First Setlist",
                    songIds: [],
                    lastModified: Date.now()
                }];
            }
            return remaining;
        });
    }, []);

    const updateSetlistTitle = useCallback((id: string, title: string) => {
        setSetlists(prev => prev.map(s =>
            s.id === id ? { ...s, title, lastModified: Date.now() } : s
        ));
    }, []);

    const addSongToSetlist = useCallback((setlistId: string, songId: string) => {
        setSetlists(prev => prev.map(s => {
            if (s.id !== setlistId) return s;
            // Avoid duplicates? Maybe allow duplicates for reprise? Let's allow for now.
            return {
                ...s,
                songIds: [...s.songIds, songId],
                lastModified: Date.now()
            };
        }));
    }, []);

    const removeSongFromSetlist = useCallback((setlistId: string, songIndex: number) => {
        setSetlists(prev => prev.map(s => {
            if (s.id !== setlistId) return s;
            const newSongs = [...s.songIds];
            newSongs.splice(songIndex, 1);
            return {
                ...s,
                songIds: newSongs,
                lastModified: Date.now()
            };
        }));
    }, []);

    const reorderSongs = useCallback((setlistId: string, fromIndex: number, toIndex: number) => {
        setSetlists(prev => prev.map(s => {
            if (s.id !== setlistId) return s;
            const newSongs = [...s.songIds];
            const [moved] = newSongs.splice(fromIndex, 1);
            newSongs.splice(toIndex, 0, moved);
            return {
                ...s,
                songIds: newSongs,
                lastModified: Date.now()
            };
        }));
    }, []);

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
