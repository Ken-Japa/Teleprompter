import React, { useState, useEffect } from "react";
import { usePeerMaster } from "../hooks/usePeerMaster";
import { useTranslation } from "../hooks/useTranslation";
import { MessageType, ConnectionStatus } from "../types";
import * as S from "../components/ui/Styled";
import {
    PlayIcon,
    PauseIcon,
    RefreshIcon,
    PlusIcon,
    TrashIcon,
    SmartphoneIcon,
    ControlIcon,
    EditIcon,
    SaveIcon,
    FileTextIcon,
    CloudUploadIcon,
    CheckCircleIcon
} from "../components/ui/Icons";

/**
 * Interface para os scripts salvos localmente no Master
 */
interface SavedScript {
    id: string;
    title: string;
    content: string;
    lastUpdated: number;
}

/**
 * Página principal do Modo Master (Modo Evento).
 * Dashboard profissional para controle de múltiplos teleprompters.
 */
export const Master: React.FC = () => {
    const {
        peerId,
        status,
        receivers,
        errorMessage,
        connectToReceiver,
        broadcast,
        sendTo,
        removeReceiver
    } = usePeerMaster();
    const { t } = useTranslation();

    // UI States
    const [newTargetId, setNewTargetId] = useState("");
    const [globalSpeed, setGlobalSpeed] = useState(20);
    const [isGlobalPlaying, setIsGlobalPlaying] = useState(false);

    // Remote Editor States
    const [editingReceiverId, setEditingReceiverId] = useState<string | null>(null);
    const [editText, setEditText] = useState("");

    // Script Library States
    const [scripts, setScripts] = useState<SavedScript[]>(() => {
        const saved = localStorage.getItem("promptninja_master_scripts");
        return saved ? JSON.parse(saved) : [
            { id: "1", title: t("master.exampleTitle"), content: t("master.exampleContent"), lastUpdated: Date.now() }
        ];
    });
    const [selectedScriptId, setSelectedScriptId] = useState<string | null>(null);

    // Script Editing States
    const [editingLibraryScriptId, setEditingLibraryScriptId] = useState<string | null>(null);
    const [libEditTitle, setLibEditTitle] = useState("");
    const [libEditContent, setLibEditContent] = useState("");

    // Persistence for scripts
    useEffect(() => {
        localStorage.setItem("promptninja_master_scripts", JSON.stringify(scripts));
    }, [scripts]);

    const handleAddReceiver = (e: React.FormEvent) => {
        e.preventDefault();
        if (newTargetId.trim()) {
            connectToReceiver(newTargetId.trim());
            setNewTargetId("");
        }
    };

    const toggleGlobalPlay = () => {
        const nextState = !isGlobalPlaying;
        setIsGlobalPlaying(nextState);
        broadcast(nextState ? MessageType.PLAY : MessageType.PAUSE);
    };

    const handleGlobalSpeedChange = (val: number) => {
        setGlobalSpeed(val);
        broadcast(MessageType.SPEED_UPDATE, val);
    };

    // Script Store Logic
    const handleSaveScript = (title: string, content: string) => {
        const newScript: SavedScript = {
            id: Date.now().toString(),
            title: title || "Sem Título",
            content,
            lastUpdated: Date.now()
        };
        setScripts([newScript, ...scripts]);
    };

    const handleDeleteScript = (id: string) => {
        setScripts(scripts.filter((s: SavedScript) => s.id !== id));
        if (selectedScriptId === id) setSelectedScriptId(null);
    };

    const handleUpdateScript = (id: string, title: string, content: string) => {
        setScripts(scripts.map(s => s.id === id ? { ...s, title, content, lastUpdated: Date.now() } : s));
    };

    const deployToReceiver = (receiverId: string, content: string) => {
        sendTo(receiverId, MessageType.TEXT_UPDATE, content);
    };

    const deployToAll = (content: string) => {
        broadcast(MessageType.TEXT_UPDATE, content);
    };

    return (
        <S.ScreenContainer className="bg-slate-950 min-h-screen text-slate-100 p-4 sm:p-8 flex flex-col gap-8">
            {errorMessage && <S.ErrorToast message={errorMessage} />}

            {/* Header Section */}
            <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-8">
                <div className="flex items-center gap-4">
                    <S.LogoText main={t("master.title").split(" ")[0]} sub={t("master.title").split(" ")[1] || "HUB"} />
                    <div className="h-10 w-px bg-white/10 hidden md:block" />
                    <div className="flex flex-col">
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{t("host.idLabel")}</span>
                        <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${status === ConnectionStatus.CONNECTED ? 'bg-emerald-500 animate-pulse' : 'bg-slate-700'}`} />
                            <span className="text-xs font-mono text-slate-400">{peerId || t("host.generatingId")}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <form onSubmit={handleAddReceiver} className="flex gap-2">
                        <input
                            type="text"
                            placeholder={t("master.idPlaceholder")}
                            value={newTargetId}
                            onChange={(e) => setNewTargetId(e.target.value)}
                            className="bg-slate-900 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-brand-500/50 transition-all w-32 sm:w-48"
                        />
                        <S.PrimaryButton type="submit" className="!p-2 !rounded-xl">
                            <PlusIcon className="w-5 h-5" />
                        </S.PrimaryButton>
                    </form>
                    <S.PrimaryButton onClick={() => window.location.hash = "app"} className="!bg-slate-800 hover:!bg-slate-700 !shadow-none !text-xs">
                        {t("host.exit")}
                    </S.PrimaryButton>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* Left Column: Receivers Dashboard */}
                <div className="lg:col-span-8 flex flex-col gap-6">

                    {/* Global Quick Controls */}
                    <div className="glass-brand p-4 rounded-2xl border border-brand-500/20 flex flex-wrap items-center gap-6 shadow-xl shadow-brand-500/5">
                        <button
                            onClick={toggleGlobalPlay}
                            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${isGlobalPlaying ? 'bg-amber-500 shadow-amber-500/20' : 'bg-brand-600 shadow-brand-500/20'} shadow-lg`}
                        >
                            {isGlobalPlaying ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5 ml-0.5" />}
                        </button>

                        <div className="flex-1 min-w-[150px]">
                            <div className="flex justify-between mb-1.5">
                                <span className="text-[10px] text-brand-300 font-bold uppercase tracking-wider">{t("master.globalControl")}</span>
                                <span className="text-[10px] font-mono text-brand-400">{globalSpeed}px/s</span>
                            </div>
                            <S.RangeSlider value={globalSpeed} min={1} max={100} onChange={handleGlobalSpeedChange} width="w-full" />
                        </div>

                        <div className="h-10 w-px bg-white/10" />

                        <S.SecondaryButton onClick={() => broadcast(MessageType.RESTART)} className="!text-[10px] !py-2 !px-4">
                            <RefreshIcon className="w-3.5 h-3.5 mr-2" /> {t("master.resetAll")}
                        </S.SecondaryButton>
                    </div>

                    {/* Displays Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {receivers.length === 0 ? (
                            <div className="col-span-full glass border-dashed border-2 border-white/5 rounded-3xl p-16 flex flex-col items-center opacity-50">
                                <ControlIcon className="text-slate-700 w-12 h-12 mb-4" />
                                <p className="text-slate-500 text-sm font-medium">{t("master.noDisplays")}</p>
                            </div>
                        ) : (
                            receivers.map((rec) => (
                                <div key={rec.id} className="glass p-5 rounded-2xl border border-white/5 group relative overflow-hidden transition-all hover:border-brand-500/30">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-slate-900 border border-white/5 flex items-center justify-center">
                                                <SmartphoneIcon className={`w-4 h-4 ${rec.status === ConnectionStatus.CONNECTED ? 'text-brand-400' : 'text-slate-600'}`} />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold font-mono tracking-tight w-24 truncate" title={rec.id}>{rec.id}</span>
                                                <span className={`text-[8px] uppercase tracking-widest font-bold ${rec.status === ConnectionStatus.CONNECTED ? 'text-emerald-500' :
                                                    rec.status === ConnectionStatus.CONNECTING ? 'text-amber-500 animate-pulse' : 'text-red-500'
                                                    }`}>
                                                    {rec.status}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex gap-1">
                                            <button
                                                onClick={() => {
                                                    setEditingReceiverId(rec.id);
                                                    setEditText(rec.textPreview || "");
                                                }}
                                                className="p-1.5 rounded-lg hover:bg-white/5 text-slate-500 hover:text-white transition-colors"
                                            >
                                                <EditIcon className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => removeReceiver(rec.id)}
                                                className="p-1.5 rounded-lg hover:bg-white/5 text-slate-500 hover:text-red-400 transition-colors"
                                            >
                                                <TrashIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Preview Window */}
                                    <div className="bg-slate-950/80 rounded-xl border border-white/5 p-3 mb-4 h-24 overflow-hidden relative">
                                        <div className="text-[10px] leading-relaxed text-slate-400 select-none whitespace-pre-wrap">
                                            {rec.textPreview || t("master.noScripts")}
                                        </div>
                                        <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-slate-950 to-transparent" />
                                    </div>

                                    {/* Quick Actions */}
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => sendTo(rec.id, MessageType.PLAY)}
                                            className="flex-1 py-2 rounded-lg bg-slate-900 hover:bg-emerald-600/20 hover:text-emerald-400 text-[10px] font-bold transition-all border border-white/5"
                                        >
                                            {t("master.displayActions.play")}
                                        </button>
                                        <button
                                            onClick={() => sendTo(rec.id, MessageType.PAUSE)}
                                            className="flex-1 py-2 rounded-lg bg-slate-900 hover:bg-amber-600/20 hover:text-amber-400 text-[10px] font-bold transition-all border border-white/5"
                                        >
                                            {t("master.displayActions.pause")}
                                        </button>
                                        {rec.status === ConnectionStatus.DISCONNECTED && (
                                            <button
                                                onClick={() => connectToReceiver(rec.id)}
                                                className="flex-1 py-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-[10px] font-bold transition-all"
                                            >
                                                {t("common.reconnect")}
                                            </button>
                                        )}
                                    </div>

                                    {/* Scroll Progress Bar */}
                                    {rec.scrollProgress !== undefined && (
                                        <div className="absolute bottom-0 left-0 h-0.5 bg-brand-500" style={{ width: `${rec.scrollProgress * 100}%`, transition: 'width 0.3s ease' }} />
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Right Column: Script Management */}
                <div className="lg:col-span-4 flex flex-col gap-6 sticky top-8">

                    <div className="glass p-6 rounded-3xl border border-white/5 flex flex-col gap-6">
                        <div className="flex items-center justify-between">
                            <h3 className="font-bold flex items-center gap-2">
                                <FileTextIcon className="text-brand-400 w-4 h-4" />
                                {t("master.scriptLibrary")}
                            </h3>
                            <button
                                onClick={() => handleSaveScript("Novo Roteiro", "")}
                                className="w-8 h-8 rounded-lg bg-brand-500/10 text-brand-400 flex items-center justify-center hover:bg-brand-500 hover:text-white transition-all"
                            >
                                <PlusIcon className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                            {scripts.map((s: SavedScript) => (
                                <div
                                    key={s.id}
                                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${selectedScriptId === s.id ? 'bg-brand-500/10 border-brand-500/50' : 'bg-slate-900/50 border-white/5 hover:border-white/10'
                                        }`}
                                    onClick={() => setSelectedScriptId(s.id)}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="font-bold text-sm truncate max-w-[150px]">{s.title}</div>
                                        <div className="flex gap-1">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setEditingLibraryScriptId(s.id);
                                                    setLibEditTitle(s.title);
                                                    setLibEditContent(s.content);
                                                }}
                                                className="p-1 text-slate-600 hover:text-brand-400 transition-colors"
                                            >
                                                <EditIcon className="w-3 h-3" />
                                            </button>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleDeleteScript(s.id); }}
                                                className="p-1 text-slate-600 hover:text-red-400 transition-colors"
                                            >
                                                <TrashIcon className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="text-[10px] text-slate-500 mb-3 line-clamp-2 italic">
                                        {s.content || t("master.noScripts")}
                                    </div>

                                    {selectedScriptId === s.id && (
                                        <div className="flex gap-2 animate-in slide-in-from-top-1 duration-200">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); deployToAll(s.content); }}
                                                className="flex-1 py-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-[9px] font-bold flex items-center justify-center gap-1.5"
                                            >
                                                <CloudUploadIcon className="w-3 h-3" /> {t("master.pushAll")}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {selectedScriptId && (
                            <div className="pt-4 border-t border-white/5 flex flex-col gap-3 animate-in fade-in duration-300">
                                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{t("master.deployHint")}</span>
                                <div className="grid grid-cols-2 gap-2">
                                    {receivers.filter(r => r.status === ConnectionStatus.CONNECTED).map(r => (
                                        <button
                                            key={r.id}
                                            onClick={() => deployToReceiver(r.id, scripts.find((s: SavedScript) => s.id === selectedScriptId)?.content || "")}
                                            className="p-2 rounded-lg bg-slate-900 border border-brand-500/20 hover:bg-brand-500/10 text-[9px] font-bold truncate transition-colors"
                                        >
                                            {t("master.displayActions.push")} {r.id.substring(0, 6)}
                                        </button>
                                    ))}
                                    {receivers.filter(r => r.status === ConnectionStatus.CONNECTED).length === 0 && (
                                        <span className="col-span-2 text-[9px] text-slate-600 italic">{t("master.noDisplays")}</span>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>

            {/* Remote Text Editor Modal */}
            {editingReceiverId && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setEditingReceiverId(null)} />
                    <div className="relative w-full max-w-2xl glass p-8 rounded-3xl border border-white/10 shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-brand-500/10 rounded-xl flex items-center justify-center text-brand-400">
                                    <EditIcon className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold">{t("master.editingLocal")}</h3>
                                    <p className="text-xs text-slate-500 font-mono">{editingReceiverId}</p>
                                </div>
                            </div>
                            <button onClick={() => setEditingReceiverId(null)} className="p-2 text-slate-600 hover:text-white">&times;</button>
                        </div>

                        <textarea
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            className="w-full h-64 bg-slate-900/50 border border-white/10 rounded-2xl p-4 text-slate-300 focus:outline-none focus:border-brand-500/50 mb-6 custom-scrollbar resize-none"
                            placeholder={t("master.scriptContent")}
                        />

                        <div className="flex gap-4">
                            <button
                                onClick={() => {
                                    handleSaveScript(t("script.untitled"), editText);
                                }}
                                className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2"
                            >
                                <SaveIcon className="w-4 h-4" /> {t("common.save")}
                            </button>
                            <S.PrimaryButton
                                onClick={() => {
                                    deployToReceiver(editingReceiverId, editText);
                                    setEditingReceiverId(null);
                                }}
                                className="flex-1 gap-2"
                            >
                                <CheckCircleIcon className="w-4 h-4" /> {t("common.sync")}
                            </S.PrimaryButton>
                        </div>
                    </div>
                </div>
            )}

            {/* Library Script Editor Modal */}
            {editingLibraryScriptId && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setEditingLibraryScriptId(null)} />
                    <div className="relative w-full max-w-2xl glass p-8 rounded-3xl border border-white/10 shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-brand-500/10 rounded-xl flex items-center justify-center text-brand-400">
                                    <FileTextIcon className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                    <input
                                        value={libEditTitle}
                                        onChange={(e) => setLibEditTitle(e.target.value)}
                                        className="bg-transparent border-b border-white/10 text-lg font-bold w-full focus:outline-none focus:border-brand-500 transition-colors"
                                        placeholder={t("master.scriptTitle")}
                                    />
                                    <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">{t("master.editingLocal")}</p>
                                </div>
                            </div>
                            <button onClick={() => setEditingLibraryScriptId(null)} className="p-2 text-slate-600 hover:text-white">&times;</button>
                        </div>

                        <textarea
                            value={libEditContent}
                            onChange={(e) => setLibEditContent(e.target.value)}
                            className="w-full h-80 bg-slate-900/50 border border-white/10 rounded-2xl p-4 text-slate-300 focus:outline-none focus:border-brand-500/50 mb-6 custom-scrollbar resize-none font-sans"
                            placeholder={t("master.scriptContent")}
                        />

                        <div className="flex gap-4">
                            <button
                                onClick={() => setEditingLibraryScriptId(null)}
                                className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl font-bold text-sm transition-all"
                            >
                                {t("common.cancel")}
                            </button>
                            <S.PrimaryButton
                                onClick={() => {
                                    handleUpdateScript(editingLibraryScriptId, libEditTitle, libEditContent);
                                    setEditingLibraryScriptId(null);
                                }}
                                className="flex-1 gap-2"
                            >
                                <SaveIcon className="w-4 h-4" /> {t("master.saveChanges")}
                            </S.PrimaryButton>
                        </div>
                    </div>
                </div>
            )}
        </S.ScreenContainer>
    );
};
