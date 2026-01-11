import React, { useState } from 'react';
import * as S from '../ui/Styled';
import { useTranslation } from '../../hooks/useTranslation';
// Removed unused icons

// MonitorIcon might not exist. I'll check Icons.tsx or use a generic one.

interface NDIOutputToggleProps {
    isPro: boolean;
    isEnabled: boolean;
    onToggle: () => void;
    onShowPaywall: () => void;
}

export const NDIOutputToggle: React.FC<NDIOutputToggleProps> = ({ isPro, isEnabled, onToggle, onShowPaywall }) => {
    const [showTutorial, setShowTutorial] = useState(false);
    // Using hardcoded strings here as fallback, but ideally should be in translations
    const t = (key: string) => key;

    const handleToggle = () => {
        if (!isPro) {
            onShowPaywall();
            return;
        }

        // Toggle state
        onToggle();

        // If turning ON, show tutorial
        if (!isEnabled) {
            setShowTutorial(true);
        }
    };

    return (
        <div className="flex flex-col gap-2 p-3 bg-slate-900/50 rounded-xl border border-white/5">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect width="20" height="14" x="2" y="3" rx="2" /><line x1="8" x2="16" y1="21" y2="21" /><line x1="12" x2="12" y1="17" y2="21" /></svg>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                            NDI Output
                            {!isPro && <span className="text-[10px] bg-brand-500 text-white px-1.5 py-0.5 rounded font-bold">PRO</span>}
                        </h3>
                        <p className="text-xs text-slate-400">Broadcast to OBS via Screen Capture</p>
                    </div>
                </div>
                <div className={!isPro ? "opacity-50" : ""}>
                    <S.Toggle
                        active={isEnabled}
                        onClick={handleToggle}
                    />
                </div>
            </div>

            {showTutorial && isEnabled && (
                <div className="mt-2 text-xs bg-slate-950 p-3 rounded border border-indigo-500/30 animate-in fade-in slide-in-from-top-2">
                    <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-indigo-400">How to use NDI/OBS:</h4>
                        <button onClick={() => setShowTutorial(false)} className="text-slate-500 hover:text-white">&times;</button>
                    </div>
                    <ol className="list-decimal list-inside space-y-1 text-slate-300">
                        <li>Open <b>vdo.ninja</b> in a new tab.</li>
                        <li>Select "Share Screen" and choose this window.</li>
                        <li>In OBS, add a "Browser Source" with the VDO.Ninja link.</li>
                        <li>Alternatively: Use OBS "Window Capture" directly on this window.</li>
                    </ol>
                    <div className="mt-2 flex gap-2">
                        <button
                            onClick={() => window.open('https://vdo.ninja', '_blank')}
                            className="text-[10px] bg-indigo-600 hover:bg-indigo-500 text-white px-2 py-1 rounded transition-colors"
                        >
                            Open VDO.Ninja
                        </button>
                        <button
                            onClick={() => {
                                // Trigger screen capture if we wanted to be fancy, but standard WebRTC flow is easier via external tool for "Zero Code"
                                // But we can offer a "Clean Mode"
                                const cleanModeHash = "#app/play?hud=0"; // Hypothetical
                                // For now just close
                                setShowTutorial(false);
                            }}
                            className="text-[10px] bg-slate-800 hover:bg-slate-700 text-white px-2 py-1 rounded transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
