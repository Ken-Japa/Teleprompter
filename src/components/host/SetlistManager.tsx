import React, { useState, useRef, useEffect } from "react";
import { ChevronDownIcon, MusicIcon, SettingsIcon, PlusIcon } from "../ui/Icons";
import { Setlist } from "../../hooks/useSetlistStorage";
import { Script } from "../../hooks/useScriptStorage";
import { SetlistManagementModal } from "./SetlistManagementModal";

interface SetlistManagerProps {
    setlists: Setlist[];
    activeSetlistId: string;
    onSwitchSetlist: (id: string) => void;

    // Song Management
    activeSetlist: Setlist | undefined;
    allScripts: Script[];
    onAddSong: (setlistId: string, songId: string) => void;
    onRemoveSong: (setlistId: string, index: number) => void;
    onReorderSong: (setlistId: string, fromIndex: number, toIndex: number) => void;

    // For switching actual song causing editor to update
    onSwitchScript: (id: string) => void;
    activeScriptId: string;

    // Song CRUD
    onCreateScript: () => void;
    onUpdateScript: (id: string, updates: Partial<Script>) => void;
    onDeleteScript: (id: string) => void;
    onCreateSetlist: () => void;
    onDeleteSetlist: (id: string) => void;
    onUpdateSetlistTitle: (id: string, title: string) => void;
}

export const SetlistManager: React.FC<SetlistManagerProps> = (props) => {
    const {
        setlists, activeSetlistId, onSwitchSetlist, activeSetlist,
        onSwitchScript, activeScriptId, onCreateScript
    } = props;

    const [isOpen, setIsOpen] = useState(false);
    const [isManageModalOpen, setIsManageModalOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    return (
        <>
            <div className="flex items-center gap-2" ref={wrapperRef}>
                {/* 1. Setlist Selector Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 rounded-lg px-3 py-1.5 transition text-sm text-slate-200 min-w-[160px] justify-between"
                    >
                        <div className="flex items-center gap-2 truncate">
                            <MusicIcon className="w-4 h-4 text-amber-500" />
                            <span className="font-medium truncate max-w-[150px]">{activeSetlist?.title || "Select Setlist"}</span>
                        </div>
                        <ChevronDownIcon className={`w-3 h-3 text-slate-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                    </button>

                    {isOpen && (
                        <div className="absolute top-full left-0 mt-2 w-56 bg-[#0a0a0a] border border-white/10 rounded-xl shadow-2xl p-1 z-50 animate-in fade-in zoom-in-95 duration-200">
                            <div className="max-h-60 overflow-y-auto">
                                {setlists.map(list => (
                                    <button
                                        key={list.id}
                                        onClick={() => { onSwitchSetlist(list.id); setIsOpen(false); }}
                                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition flex items-center justify-between
                                            ${list.id === activeSetlistId ? 'bg-amber-500/10 text-amber-500' : 'text-slate-400 hover:bg-white/5 hover:text-white'}
                                        `}
                                    >
                                        <span className="truncate">{list.title}</span>
                                        {list.id === activeSetlistId && <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />}
                                    </button>
                                ))}
                            </div>
                            <div className="h-px bg-white/5 my-1" />
                            <button
                                onClick={() => { setIsManageModalOpen(true); setIsOpen(false); }}
                                className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold text-slate-500 hover:text-amber-500 hover:bg-amber-500/10 transition uppercase tracking-wide flex items-center justify-center gap-2"
                            >
                                <SettingsIcon className="w-3 h-3" /> Manage Setlists
                            </button>
                        </div>
                    )}
                </div>

                {/* 2. Song Navigation Dots & Quick Add */}
                {activeSetlist && (
                    <div className="flex items-center gap-2 px-2 border-l border-white/10 mx-2">
                        {/* Song Dots */}
                        <div className="flex -space-x-1.5 overflow-hidden max-w-[300px] hover:max-w-none transition-all duration-500">
                            {activeSetlist.songIds.map((songId, idx) => (
                                <div
                                    key={`${songId}-${idx}`}
                                    onClick={() => onSwitchScript(songId)}
                                    className={`
                                        relative flex items-center justify-center w-8 h-8 rounded-full border-2 border-[#0a0a0a] cursor-pointer transition-transform hover:scale-110 hover:z-10
                                        ${activeScriptId === songId ? 'bg-amber-500 text-white z-10' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}
                                    `}
                                    title={`Song ${idx + 1}`}
                                >
                                    <span className="text-[10px] font-bold">{idx + 1}</span>
                                </div>
                            ))}
                        </div>

                        {/* Quick Add Button */}
                        <button
                            onClick={() => {
                                onCreateScript();
                            }}
                            className="w-8 h-8 rounded-full bg-white/5 hover:bg-amber-500/20 text-slate-400 hover:text-amber-500 border border-white/10 flex items-center justify-center transition ml-1"
                            title="Create New Song"
                        >
                            <PlusIcon className="w-4 h-4" />
                        </button>
                    </div>
                )}

                {/* 3. Manage Button (Quick Access) */}
                <button
                    onClick={() => setIsManageModalOpen(true)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/5 transition"
                    title="Manage Setlist"
                >
                    <SettingsIcon className="w-4 h-4" />
                </button>
            </div>

            <SetlistManagementModal
                isOpen={isManageModalOpen}
                onClose={() => setIsManageModalOpen(false)}
                {...props}
            />
        </>
    );
};
