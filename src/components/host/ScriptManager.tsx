import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { Script } from '../../hooks/useScriptStorage';
import { PlusIcon, TrashIcon, EditIcon, CheckIcon, ChevronDownIcon, GoogleIcon, LogoutIcon } from '../ui/Icons';
import { useAuth } from '../../contexts/AuthContext';

interface ScriptManagerProps {
    scripts: Script[];
    activeScriptId: string;
    onSwitch: (id: string) => void;
    onCreate: () => void;
    onDelete: (id: string) => void;
    onUpdateTitle: (id: string, title: string) => void;
}

export const ScriptManager: React.FC<ScriptManagerProps> = ({
    scripts,
    activeScriptId,
    onSwitch,
    onCreate,
    onDelete,
    onUpdateTitle
}) => {
    const { t } = useTranslation();
    const { user, loginWithGoogle, logout, loading } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState("");
    const wrapperRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Detect mobile view for better positioning
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const activeScript = scripts.find(s => s.id === activeScriptId);

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleStartEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (activeScript) {
            setEditTitle(activeScript.title);
            setIsEditing(true);
            setIsOpen(false); // Close dropdown if open
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    };

    const handleSaveTitle = () => {
        if (activeScript && editTitle.trim()) {
            onUpdateTitle(activeScript.id, editTitle.trim());
        }
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSaveTitle();
        } else if (e.key === 'Escape') {
            setIsEditing(false);
        }
    };

    const handleDelete = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        if (window.confirm(t("script.deleteConfirm"))) {
            onDelete(id);
        }
    };

    return (
        <div className="relative z-50 group" ref={wrapperRef} onClick={(e) => e.stopPropagation()} onTouchStart={(e) => e.stopPropagation()}>
            {isEditing ? (
                <div className="flex items-center bg-slate-800 rounded-lg p-1 border border-brand-500 w-[200px]">
                    <input
                        ref={inputRef}
                        value={editTitle}
                        onChange={e => setEditTitle(e.target.value)}
                        onBlur={handleSaveTitle}
                        onKeyDown={handleKeyDown}
                        className="bg-transparent text-white text-sm px-2 py-1 w-full focus:outline-none"
                    />
                    <button onClick={handleSaveTitle} className="p-1 text-green-500 hover:text-green-400">
                        <CheckIcon className="w-4 h-4" />
                    </button>
                </div>
            ) : (
                <div className="flex items-center">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg transition border border-slate-700 hover:border-slate-600 shadow-sm"
                    >
                        <div className="flex flex-col items-start min-w-[120px] max-w-[220px]">
                            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold leading-none mb-0.5">{t("script.manager")}</span>
                            <span className="text-sm font-medium truncate w-full text-left leading-tight">{activeScript?.title || "Untitled"}</span>
                        </div>
                        <ChevronDownIcon className={`w-4 h-4 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <button
                        onClick={handleStartEdit}
                        className="ml-2 p-2 text-slate-500 hover:text-brand-400 hover:bg-slate-800 rounded-md transition duration-200 opacity-0 group-hover:opacity-100"
                        title={t("script.rename")}
                    >
                        <EditIcon className="w-4 h-4" />
                    </button>
                </div>
            )}

            {/* Dropdown Menu */}
            {isOpen && !isEditing && (
                <>
                    {/* Backdrop for Mobile */}
                    <div
                        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] md:hidden`}
                        onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                        onTouchStart={(e) => { e.stopPropagation(); setIsOpen(false); }}
                    />

                    <div className={`
                        ${isMobile
                            ? 'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-sm z-[9999]'
                            : 'absolute top-full left-0 mt-2 w-80 z-[100]'}
                        bg-[#0f172a] border border-slate-700 rounded-xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200
                    `}>
                        <div className="p-2 border-b border-slate-800 flex justify-between items-center bg-[#0f172a]">
                            <span className="text-xs font-bold text-slate-500 px-2 uppercase tracking-wide">{t("script.yourScripts")}</span>
                            <button
                                onClick={(e) => { e.stopPropagation(); onCreate(); setIsOpen(false); }}
                                className="px-3 py-1.5 bg-brand-600 hover:bg-brand-500 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-lg shadow-brand-500/20"
                            >
                                <PlusIcon className="w-3 h-3" /> {t("script.new")}
                            </button>
                        </div>

                        <div className="max-h-[60vh] md:max-h-[300px] overflow-y-auto custom-scrollbar p-1.5 space-y-1 bg-[#0f172a]">
                            {scripts.map(script => (
                                <div
                                    key={script.id}
                                    onClick={(e) => { e.stopPropagation(); onSwitch(script.id); setIsOpen(false); }}
                                    className={`group flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all border ${script.id === activeScriptId ? 'bg-brand-500/10 border-brand-500/30 shadow-inner' : 'hover:bg-slate-800 border-transparent hover:border-slate-700'}`}
                                >
                                    <div className="flex-1 min-w-0 flex items-center gap-3">
                                        <div className={`w-1 h-8 rounded-full ${script.id === activeScriptId ? 'bg-brand-500' : 'bg-slate-700'}`}></div>
                                        <div className="flex flex-col min-w-0">
                                            <span className={`text-sm font-medium truncate ${script.id === activeScriptId ? 'text-brand-400' : 'text-slate-300'}`}>
                                                {script.title}
                                            </span>
                                            <span className="text-[10px] text-slate-500">
                                                {new Date(script.lastModified).toLocaleDateString()} • {new Date(script.lastModified).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                    </div>

                                    {scripts.length > 1 && (
                                        <button
                                            onClick={(e) => handleDelete(e, script.id)}
                                            className="p-3 -mr-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-md sm:opacity-0 group-hover:opacity-100 transition-all"
                                            title={t("common.delete")}
                                        >
                                            <TrashIcon className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Cloud Sync Footer */}
                        <div className="p-2 border-t border-slate-800 bg-slate-900/50">
                            {!user ? (
                                <button
                                    onClick={(e) => { e.stopPropagation(); loginWithGoogle(); }}
                                    disabled={loading}
                                    className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-lg transition border border-slate-700 hover:border-slate-600"
                                >
                                    <GoogleIcon className="w-4 h-4" />
                                    {loading ? "Loading..." : "Login to Sync Scripts"}
                                </button>
                            ) : (
                                <div className="flex items-center justify-between px-2 py-1">
                                    <div className="flex flex-col overflow-hidden mr-2">
                                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Cloud Sync Active</span>
                                        <span className="text-xs text-slate-300 truncate" title={user.email || ""}>{user.email}</span>
                                    </div>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); logout(); }}
                                        className="p-1.5 text-slate-500 hover:text-slate-300 hover:bg-slate-800 rounded-md transition"
                                        title="Logout"
                                    >
                                        <LogoutIcon className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
