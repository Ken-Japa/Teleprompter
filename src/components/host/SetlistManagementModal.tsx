import React, { useState, useEffect } from "react";
import { Setlist } from "../../hooks/useSetlistStorage";
import { Script } from "../../hooks/useScriptStorage";

import { TrashIcon, PlusIcon, EditIcon, ArrowUpIcon, ArrowDownIcon, SearchIcon, MusicIcon } from "../ui/Icons";

interface SetlistManagementModalProps {
    isOpen: boolean;
    onClose: () => void;

    setlists: Setlist[];
    activeSetlistId: string;
    onSwitchSetlist: (id: string) => void;
    onCreateSetlist: () => void;
    onDeleteSetlist: (id: string) => void;
    onUpdateSetlistTitle: (id: string, title: string) => void;

    allScripts: Script[];
    activeSetlist: Setlist | undefined;
    onAddSong: (setlistId: string, songId: string) => void;
    onRemoveSong: (setlistId: string, index: number) => void;
    onReorderSong: (setlistId: string, fromIndex: number, toIndex: number) => void;

    onCreateScript: () => void;
    onUpdateScript: (id: string, updates: Partial<Script>) => void;
    onDeleteScript: (id: string) => void;
}

export const SetlistManagementModal: React.FC<SetlistManagementModalProps> = ({
    isOpen, onClose,
    setlists, activeSetlistId, onSwitchSetlist, onCreateSetlist, onDeleteSetlist, onUpdateSetlistTitle,
    allScripts, activeSetlist, onAddSong, onRemoveSong, onReorderSong,
    onCreateScript, onUpdateScript, onDeleteScript
}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [editingSetlistId, setEditingSetlistId] = useState<string | null>(null);
    const [editSetlistTitle, setEditSetlistTitle] = useState("");

    const [editingSongId, setEditingSongId] = useState<string | null>(null);
    const [editSongTitle, setEditSongTitle] = useState("");

    // Reset state when opening
    useEffect(() => {
        if (isOpen) {
            setSearchTerm("");
            setEditingSetlistId(null);
            setEditingSongId(null);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSaveSetlistTitle = (id: string) => {
        if (editSetlistTitle.trim()) {
            onUpdateSetlistTitle(id, editSetlistTitle);
        }
        setEditingSetlistId(null);
    };

    const handleSaveSongTitle = (id: string) => {
        if (editSongTitle.trim()) {
            onUpdateScript(id, { title: editSongTitle });
        }
        setEditingSongId(null);
    };

    // Derived State
    const currentSongs = activeSetlist?.songIds.map((songId, idx) => {
        const script = allScripts.find(s => s.id === songId);
        return {
            id: songId,
            idx,
            title: script?.title || "Unknown",
            exists: !!script
        };
    }) || [];

    const availableSongs = allScripts.filter(s =>
        s.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="bg-[#111] w-full max-w-5xl h-[85vh] rounded-2xl shadow-2xl border border-white/10 flex overflow-hidden flex-col md:flex-row">

                {/* 1. Sidebar: Setlists List */}
                <div className="w-full md:w-64 bg-black/40 border-r border-white/10 flex flex-col">
                    <div className="p-4 border-b border-white/5 flex items-center justify-between">
                        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Setlists</h2>
                        <button onClick={onCreateSetlist} className="text-amber-500 hover:text-amber-400 p-1 rounded hover:bg-white/5 transition">
                            <PlusIcon className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-2 space-y-1">
                        {setlists.map(list => (
                            <div
                                key={list.id}
                                onClick={() => onSwitchSetlist(list.id)}
                                className={`group flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer text-sm transition-all
                                    ${list.id === activeSetlistId ? 'bg-amber-500/10 text-amber-500 font-medium border border-amber-500/20' : 'text-slate-400 hover:bg-white/5 hover:text-slate-200 border border-transparent'}
                                `}
                            >
                                {editingSetlistId === list.id ? (
                                    <input
                                        autoFocus
                                        type="text"
                                        className="bg-transparent border-b border-amber-500 outline-none w-full text-white pb-0.5"
                                        value={editSetlistTitle}
                                        onChange={e => setEditSetlistTitle(e.target.value)}
                                        onBlur={() => handleSaveSetlistTitle(list.id)}
                                        onKeyDown={e => e.key === 'Enter' && handleSaveSetlistTitle(list.id)}
                                        onClick={e => e.stopPropagation()}
                                    />
                                ) : (
                                    <>
                                        <span className="truncate">{list.title}</span>
                                        <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); setEditingSetlistId(list.id); setEditSetlistTitle(list.title); }}
                                                className="p-1 hover:text-white text-slate-500"
                                            >
                                                <EditIcon className="w-3 h-3" />
                                            </button>
                                            {setlists.length > 1 && (
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); onDeleteSetlist(list.id); }}
                                                    className="p-1 hover:text-red-400 text-slate-500 ml-1"
                                                >
                                                    <TrashIcon className="w-3 h-3" />
                                                </button>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* 2. Main Content */}
                <div className="flex-1 flex flex-col h-full bg-[#111]">
                    {/* Header */}
                    <div className="p-4 border-b border-white/5 flex items-center justify-between">
                        <div>
                            <h1 className="text-xl font-bold text-white flex items-center gap-2">
                                <MusicIcon className="w-5 h-5 text-amber-500" />
                                {activeSetlist?.title}
                            </h1>
                            <p className="text-slate-500 text-xs mt-1">Manage songs and their order.</p>
                        </div>
                        <button onClick={onClose} className="px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-300 rounded-lg text-sm font-medium transition">
                            Close
                        </button>
                    </div>

                    <div className="flex-1 flex flex-col md:flex-row overflow-hidden">

                        {/* COLUMN A: Available Songs */}
                        <div className="flex-1 flex flex-col border-r border-white/5 min-w-[300px]">
                            <div className="p-3 border-b border-white/5 bg-white/[0.02]">
                                <div className="relative">
                                    <SearchIcon className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                                    <input
                                        type="text"
                                        placeholder="Search available songs..."
                                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-amber-500/50"
                                        value={searchTerm}
                                        onChange={e => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <button
                                    onClick={onCreateScript}
                                    className="w-full mt-2 py-2 flex items-center justify-center gap-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 text-xs font-bold rounded-lg border border-amber-500/10 transition"
                                >
                                    <PlusIcon className="w-3 h-3" /> CREATE NEW SONG
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-2">
                                <h3 className="text-[10px] font-bold text-slate-600 uppercase mb-2 px-2">Library ({availableSongs.length})</h3>
                                <div className="space-y-1">
                                    {availableSongs.map(script => {
                                        return (
                                            <div key={script.id} className="group flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/5 text-sm text-slate-300 border border-transparent hover:border-white/5 transition-all">

                                                {editingSongId === script.id ? (
                                                    <input
                                                        autoFocus
                                                        type="text"
                                                        className="bg-transparent border-b border-white/20 outline-none w-full text-white pb-0.5"
                                                        value={editSongTitle}
                                                        onChange={e => setEditSongTitle(e.target.value)}
                                                        onBlur={() => handleSaveSongTitle(script.id)}
                                                        onKeyDown={e => e.key === 'Enter' && handleSaveSongTitle(script.id)}
                                                    />
                                                ) : (
                                                    <div className="flex items-center gap-2 flex-1 min-w-0">
                                                        <span className="truncate">{script.title}</span>
                                                        <button
                                                            onClick={() => { setEditingSongId(script.id); setEditSongTitle(script.title); }}
                                                            className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-white transition-opacity"
                                                            title="Rename"
                                                        >
                                                            <EditIcon className="w-3 h-3" />
                                                        </button>
                                                        {allScripts.length > 1 && (
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    if (window.confirm("Are you sure you want to delete this song? This cannot be undone.")) {
                                                                        onDeleteScript(script.id);
                                                                    }
                                                                }}
                                                                className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-500 transition-opacity ml-1"
                                                                title="Delete Song"
                                                            >
                                                                <TrashIcon className="w-3 h-3" />
                                                            </button>
                                                        )}
                                                    </div>
                                                )}

                                                {activeSetlist && (
                                                    <button
                                                        onClick={() => onAddSong(activeSetlist.id, script.id)}
                                                        className="ml-2 w-6 h-6 flex items-center justify-center rounded bg-white/5 hover:bg-amber-500 hover:text-white transition text-slate-500"
                                                        title="Add to Setlist"
                                                    >
                                                        <PlusIcon className="w-3 h-3" />
                                                    </button>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* COLUMN B: Setlist Songs */}
                        <div className="flex-1 flex flex-col bg-[#0a0a0a]/50 min-w-[300px]">
                            <div className="p-3 border-b border-white/5 bg-amber-500/5">
                                <h3 className="text-xs font-bold text-amber-500 uppercase tracking-wide flex items-center gap-2">
                                    Current Setlist
                                    <span className="bg-amber-500/20 px-1.5 py-0.5 rounded text-[10px] text-amber-300">{currentSongs.length} Songs</span>
                                </h3>
                            </div>

                            <div className="flex-1 overflow-y-auto p-2">
                                {currentSongs.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-full text-slate-600 text-sm gap-2">
                                        <MusicIcon className="w-8 h-8 opacity-20" />
                                        <p>No songs in this setlist yet.</p>
                                        <p className="text-xs opacity-50">Add songs from the library on the left.</p>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        {currentSongs.map((song, i) => (
                                            <div key={`${song.id}-${i}`} className="flex items-center gap-3 bg-[#151515] border border-white/5 p-3 rounded-lg group hover:border-white/10 transition-all">
                                                <span className="text-slate-600 font-mono font-bold text-sm w-6 text-center">{i + 1}</span>

                                                <div className="flex-1 min-w-0">
                                                    <span className="text-slate-200 font-medium truncate block">{song.title}</span>
                                                </div>

                                                <div className="flex items-center gap-1">
                                                    <button
                                                        onClick={() => onReorderSong(activeSetlistId, i, i - 1)}
                                                        disabled={i === 0}
                                                        className="w-7 h-7 flex items-center justify-center rounded hover:bg-white/10 hover:text-white text-slate-500 disabled:opacity-20 transition"
                                                    >
                                                        <ArrowUpIcon className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => onReorderSong(activeSetlistId, i, i + 1)}
                                                        disabled={i === currentSongs.length - 1}
                                                        className="w-7 h-7 flex items-center justify-center rounded hover:bg-white/10 hover:text-white text-slate-500 disabled:opacity-20 transition"
                                                    >
                                                        <ArrowDownIcon className="w-4 h-4" />
                                                    </button>
                                                    <div className="w-px h-4 bg-white/10 mx-1" />
                                                    <button
                                                        onClick={() => onRemoveSong(activeSetlistId, i)}
                                                        className="w-7 h-7 flex items-center justify-center rounded hover:bg-red-500/20 hover:text-red-400 text-slate-600 transition"
                                                    >
                                                        <TrashIcon className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};
