import React from 'react';

interface FitnessHUDProps {
    mode: 'REST' | 'COUNT' | null;
    value: number; // Current time left or current rep count
    target?: number; // Target reps (only for COUNT)
    label?: string; // Optional label (e.g. "REST", "PUSH-UPS")
}

export const FitnessHUD: React.FC<FitnessHUDProps> = ({ mode, value, target }) => {
    if (!mode) return null;

    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="flex flex-col items-center justify-center">
                {/* Ring / Circle Container */}
                <div className="relative">
                    {/* Outer Glow */}
                    <div className={`absolute inset-0 rounded-full blur-2xl opacity-40 ${mode === 'REST' ? 'bg-blue-500' : 'bg-green-500'}`} />

                    <div className="relative bg-slate-900/90 w-64 h-64 rounded-full border-4 border-slate-700 flex flex-col items-center justify-center shadow-2xl">
                        {/* Dynamic Border Color based on mode */}
                        <div className={`absolute inset-0 rounded-full border-4 ${mode === 'REST' ? 'border-blue-500' : 'border-green-500'} opacity-20`} />

                        {mode === 'REST' && (
                            <>
                                <span className="text-blue-400 text-lg font-bold tracking-widest uppercase mb-2">REST</span>
                                <span className="text-8xl font-black text-white tabular-nums tracking-tighter filter drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">
                                    {value}
                                </span>
                                <span className="text-slate-500 text-sm mt-2 font-mono">SECONDS</span>
                            </>
                        )}

                        {mode === 'COUNT' && (
                            <>
                                <span className="text-green-400 text-lg font-bold tracking-widest uppercase mb-2">REPS</span>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-8xl font-black text-white tabular-nums tracking-tighter filter drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]">
                                        {value}
                                    </span>
                                    {target && (
                                        <span className="text-3xl font-bold text-slate-500">
                                            /{target}
                                        </span>
                                    )}
                                </div>
                                <span className="text-slate-500 text-sm mt-2 font-mono">SAY "{value + 1}"...</span>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
