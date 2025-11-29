import React, { useState, useMemo } from "react";
import { ConnectionStatus, Theme } from "../types";
import { MinusIcon, PauseIcon, PlayIcon, PlusIcon } from "../components/ui/Icons";
import { useTranslation } from "../hooks/useTranslation";
import * as S from "../components/ui/Styled";
import { Trackpad } from "../components/remote/Trackpad";
import { ConnectionState } from "../components/remote/ConnectionState";
import { useRemoteController } from "../hooks/useRemoteController";

interface RemoteProps {
  hostId: string;
}

// Simple Icons for tabs
const ControlIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>;
const EditIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>;
const GearIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>;
const NavIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>;

export const Remote: React.FC<RemoteProps> = ({ hostId }) => {
  const { t } = useTranslation();
  const { state, actions } = useRemoteController(hostId);
  const { status, isPlaying, speed, progress, errorMessage, settings, text, elapsedTime } = state;

  const [activeTab, setActiveTab] = useState<'control' | 'edit' | 'settings' | 'nav'>('control');

  // Format Timer
  const formattedTime = useMemo(() => {
    if (elapsedTime === undefined) return "00:00";
    const mins = Math.floor(elapsedTime / 60).toString().padStart(2, "0");
    const secs = (elapsedTime % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  }, [elapsedTime]);

  // Parse text for Navigation with Visual Weight Heuristic
  const textSegments = useMemo(() => {
    if (!text) return [];
    const segments: { id: number; text: string; progress: number }[] = [];
    
    // Heuristic: Each line (visual block) consumes vertical space equivalent to ~80 characters of height
    // This compensates for short lines consuming equal vertical space as full lines
    const NEWLINE_WEIGHT = 80; 
    
    // 1. Calculate Total Visual Weight
    let totalVisualWeight = 0;
    for (let i = 0; i < text.length; i++) {
        totalVisualWeight += 1;
        if (text[i] === '\n') totalVisualWeight += NEWLINE_WEIGHT;
    }
    // Add base weight if text doesn't end in newline to account for last line height
    if (text.length > 0 && text[text.length-1] !== '\n') totalVisualWeight += NEWLINE_WEIGHT;

    // 2. Find Segments and Calculate Progress
    const regex = /.+/g; // Matches non-empty lines
    let match;
    
    // Helper to calculate weight up to an index
    const getWeightUntil = (endIndex: number) => {
        let w = 0;
        for (let i = 0; i < endIndex; i++) {
            w += 1;
            if (text[i] === '\n') w += NEWLINE_WEIGHT;
        }
        return w;
    };

    while ((match = regex.exec(text)) !== null) {
        if (match[0].trim().length > 0) {
             const currentWeight = getWeightUntil(match.index);
             segments.push({
                 id: match.index,
                 text: match[0],
                 progress: currentWeight / totalVisualWeight
             });
        }
    }
    return segments;
  }, [text]);


  if (status !== ConnectionStatus.CONNECTED) {
    return (
        <S.ScreenContainer className="bg-[#020617] h-[100dvh] flex flex-col">
            {errorMessage && <S.ErrorToast message={errorMessage} />}
            <S.Header>
                <S.LogoText main={t("title.main")} sub={t("title.remote")} />
                <S.StatusBadge status={status} label={t(`status.${status.toLowerCase()}`)} />
            </S.Header>
            <div className="flex-1 flex flex-col relative overflow-hidden">
                <ConnectionState status={status} hostId={hostId} />
            </div>
        </S.ScreenContainer>
    );
  }

  return (
    <S.ScreenContainer className="bg-[#020617] h-[100dvh] flex flex-col">
      {errorMessage && <S.ErrorToast message={errorMessage} />}
      
      {/* Header & Navigation */}
      <div className="flex flex-col bg-slate-900 border-b border-white/5 z-20">
        <div className="flex items-center justify-between px-4 py-3">
             <S.StatusBadge status={status} label={t(`status.${status.toLowerCase()}`)} />
             <div className="flex gap-1 bg-slate-800 rounded-lg p-1">
                <button onClick={() => setActiveTab('control')} className={`p-2 rounded-md transition-all ${activeTab === 'control' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}>
                    <ControlIcon />
                </button>
                <button onClick={() => setActiveTab('nav')} className={`p-2 rounded-md transition-all ${activeTab === 'nav' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}>
                    <NavIcon />
                </button>
                <button onClick={() => setActiveTab('edit')} className={`p-2 rounded-md transition-all ${activeTab === 'edit' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}>
                    <EditIcon />
                </button>
                <button onClick={() => setActiveTab('settings')} className={`p-2 rounded-md transition-all ${activeTab === 'settings' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}>
                    <GearIcon />
                </button>
             </div>
        </div>
        
        {/* Progress Bar / Scrubber */}
         <div className="px-4 pb-3">
            <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono text-slate-500">{Math.round(progress * 100)}%</span>
                <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.001" 
                    value={progress} 
                    onChange={(e) => actions.handleScrollTo(parseFloat(e.target.value))}
                    className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
            </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col relative overflow-hidden">
        
        {/* CONTROL TAB */}
        {activeTab === 'control' && (
            <>
                <Trackpad
                    label={t("remote.touchArea")}
                    onDelta={actions.handleTrackpadDelta}
                    onStop={actions.handleTrackpadStop}
                />
                
                {/* Timer Display Overlay */}
                <div className="absolute top-20 left-1/2 -translate-x-1/2 pointer-events-none z-50">
                     <div className="bg-slate-950/90 backdrop-blur-xl px-6 py-3 rounded-2xl border border-white/10 shadow-2xl ring-1 ring-white/5">
                        <span className="font-mono text-3xl font-black text-indigo-400 tracking-widest drop-shadow-[0_0_15px_rgba(129,140,248,0.5)]">{formattedTime}</span>
                     </div>
                </div>

                <S.ControlsContainer>
                    <div className="flex items-center justify-between px-6 pb-safe gap-6">
                        {/* Speed Control */}
                        <div className="flex flex-col items-center bg-white/5 p-3 rounded-3xl border border-white/5 backdrop-blur-md">
                            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-2">{t("remote.speed")}</span>
                            <div className="flex flex-col items-center gap-2">
                                <S.IconButton onClick={() => actions.handleSpeedChange(Math.min(10, speed + 0.5))} className="w-12 h-12 !rounded-2xl !bg-white/10 hover:!bg-white/20 border-white/10"><PlusIcon /></S.IconButton>
                                <span className="font-mono text-2xl font-black text-indigo-400 min-w-[3ch] text-center my-1 drop-shadow-md">{speed.toFixed(1)}</span>
                                <S.IconButton onClick={() => actions.handleSpeedChange(Math.max(0, speed - 0.5))} className="w-12 h-12 !rounded-2xl !bg-white/10 hover:!bg-white/20 border-white/10"><MinusIcon /></S.IconButton>
                            </div>
                        </div>

                        {/* Play Button */}
                        <button onClick={actions.handlePlayToggle} className={`flex-1 h-44 rounded-[2.5rem] shadow-2xl transition-all duration-300 active:scale-95 border-t border-white/10 flex flex-col items-center justify-center gap-3 relative overflow-hidden group ${isPlaying ? "bg-gradient-to-b from-amber-500 to-amber-600 text-white shadow-[0_0_60px_-10px_rgba(245,158,11,0.4)]" : "bg-gradient-to-b from-indigo-600 to-indigo-700 text-white shadow-[0_0_60px_-10px_rgba(79,70,229,0.4)] hover:shadow-[0_0_80px_-10px_rgba(79,70,229,0.6)]"}`}>
                            <div className="absolute inset-x-0 top-0 h-[1px] bg-white/40"></div>
                            <div className="relative z-10 flex flex-col items-center">
                                {isPlaying ? <PauseIcon className="w-16 h-16 fill-current drop-shadow-lg" /> : <PlayIcon className="w-16 h-16 fill-current ml-2 drop-shadow-lg" />}
                                <span className="text-xs font-bold uppercase tracking-[0.2em] opacity-80 mt-2">{isPlaying ? t("remote.pause") : t("remote.start")}</span>
                            </div>
                        </button>
                    </div>
                </S.ControlsContainer>
            </>
        )}

        {/* NAV TAB */}
        {activeTab === 'nav' && (
            <div className="flex-1 overflow-y-auto p-4 bg-slate-950">
                <div className="space-y-2 pb-safe">
                    {textSegments.length === 0 && (
                         <div className="text-slate-500 text-center mt-10">No text content available.</div>
                    )}
                    {textSegments.map((seg) => (
                        <button 
                            key={seg.id}
                            onClick={() => {
                                actions.handleScrollTo(seg.progress);
                                // Optional: Auto-switch back to control? 
                                // setActiveTab('control'); 
                            }}
                            className="w-full text-left p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:bg-slate-800 hover:border-indigo-500/50 transition-all group"
                        >
                            <div className="flex items-start gap-3">
                                <span className="text-[10px] font-mono text-slate-500 mt-1 w-8 text-right">{(seg.progress * 100).toFixed(0)}%</span>
                                <p className="text-sm text-slate-300 font-medium line-clamp-2 group-hover:text-white">{seg.text}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        )}

        {/* EDIT TAB */}
        {activeTab === 'edit' && (
            <div className="flex-1 flex flex-col p-4 bg-slate-950 overflow-hidden">
                <textarea 
                    value={text} 
                    onChange={(e) => actions.handleTextChange(e.target.value)} 
                    className="flex-1 w-full bg-slate-900/50 border border-slate-800 rounded-xl p-4 text-slate-200 font-mono text-sm focus:outline-none focus:border-indigo-500 resize-none h-full"
                    placeholder="Enter your script here..."
                />
            </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === 'settings' && settings && (
            <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-slate-950">
                
                {/* Font Size */}
                <div className="space-y-3">
                    <div className="flex justify-between text-sm text-slate-400 uppercase tracking-widest font-bold">
                        <span>Font Size</span>
                        <span>{settings.fontSize}px</span>
                    </div>
                    <input 
                        type="range" min="20" max="200" step="4" 
                        value={settings.fontSize} 
                        onChange={(e) => actions.handleSettingsChange({ fontSize: parseInt(e.target.value) })}
                        className="w-full h-4 bg-slate-800 rounded-full appearance-none cursor-pointer accent-indigo-500"
                    />
                </div>

                {/* Margin */}
                <div className="space-y-3">
                    <div className="flex justify-between text-sm text-slate-400 uppercase tracking-widest font-bold">
                        <span>Margin</span>
                        <span>{settings.margin}%</span>
                    </div>
                    <input 
                        type="range" min="0" max="40" step="1" 
                        value={settings.margin} 
                        onChange={(e) => actions.handleSettingsChange({ margin: parseInt(e.target.value) })}
                        className="w-full h-4 bg-slate-800 rounded-full appearance-none cursor-pointer accent-indigo-500"
                    />
                </div>

                {/* Toggles */}
                <div className="grid grid-cols-2 gap-4">
                    <button 
                        onClick={() => actions.handleSettingsChange({ isMirrored: !settings.isMirrored })}
                        className={`p-4 rounded-xl border ${settings.isMirrored ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                    >
                        <div className="font-bold mb-1">Mirror H</div>
                        <div className="text-xs opacity-60">{settings.isMirrored ? 'ON' : 'OFF'}</div>
                    </button>

                    <button 
                        onClick={() => actions.handleSettingsChange({ isFlipVertical: !settings.isFlipVertical })}
                        className={`p-4 rounded-xl border ${settings.isFlipVertical ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                    >
                        <div className="font-bold mb-1">Mirror V</div>
                        <div className="text-xs opacity-60">{settings.isFlipVertical ? 'ON' : 'OFF'}</div>
                    </button>

                     <button 
                        onClick={() => actions.handleSettingsChange({ isUpperCase: !settings.isUpperCase })}
                        className={`p-4 rounded-xl border ${settings.isUpperCase ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                    >
                        <div className="font-bold mb-1">ALL CAPS</div>
                        <div className="text-xs opacity-60">{settings.isUpperCase ? 'ON' : 'OFF'}</div>
                    </button>

                    <button 
                        onClick={() => actions.handleSettingsChange({ isFocusMode: !settings.isFocusMode })}
                        className={`p-4 rounded-xl border ${settings.isFocusMode ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                    >
                        <div className="font-bold mb-1">Focus</div>
                        <div className="text-xs opacity-60">{settings.isFocusMode ? 'ON' : 'OFF'}</div>
                    </button>
                </div>

                {/* Themes */}
                <div className="space-y-3">
                     <div className="text-sm text-slate-400 uppercase tracking-widest font-bold">Theme</div>
                     <div className="grid grid-cols-3 gap-3">
                        {(['ninja', 'paper', 'contrast', 'matrix', 'cyber', 'cream'] as Theme[]).map(theme => (
                            <button 
                                key={theme}
                                onClick={() => actions.handleSettingsChange({ theme })}
                                className={`p-3 rounded-lg border text-xs font-bold capitalize ${settings.theme === theme ? 'bg-white text-black border-white' : 'bg-slate-900 border-slate-800 text-slate-500'}`}
                            >
                                {theme}
                            </button>
                        ))}
                     </div>
                </div>
            </div>
        )}
        {activeTab === 'settings' && !settings && (
            <div className="flex-1 flex items-center justify-center text-slate-500">
                Waiting for host settings...
            </div>
        )}
      </div>
    </S.ScreenContainer>
  );
};
