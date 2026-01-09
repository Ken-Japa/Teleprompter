import React from "react";
import { HomeIcon, PlayIcon, MusicIcon } from "../ui/Icons";

interface MusicHeaderProps {
    onStart: () => void;
}

export const MusicHeader: React.FC<MusicHeaderProps> = ({
    onStart,
}) => {
    return (
        <div className="w-full bg-[#111] backdrop-blur-xl border-b border-white/5 md:shadow-lg transition-all duration-300 z-30">
            <div className="flex items-center justify-between w-full px-4 py-3 max-w-[1920px] mx-auto">
                {/* 1. Logo / Back (Left) */}
                <div className="flex items-center space-x-6 min-w-[200px]">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => {
                                window.location.hash = "";
                            }}
                            className="flex items-center text-xs font-bold text-slate-500 hover:text-white transition"
                            aria-label="Back to Home"
                        >
                            <HomeIcon className="w-5 h-5 mr-1" />
                            <span className="hidden sm:inline">HOME</span>
                        </button>
                    </div>
                </div>

                {/* 2. Spacer (Center) */}
                <div className="flex-1" />

                {/* 3. Actions (Right) */}
                <div className="flex items-center justify-end space-x-3 min-w-[200px]">
                    <div className="text-amber-500 font-bold uppercase tracking-widest text-xs flex items-center gap-1.5 mr-4 opacity-80">
                        <MusicIcon className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Music Mode</span>
                    </div>

                    <button
                        onClick={onStart}
                        className="flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-white px-5 py-2 rounded-full font-bold shadow-lg shadow-amber-500/20 transition-transform hover:scale-105 active:scale-95"
                    >
                        <PlayIcon className="w-5 h-5" />
                        <span>PLAY</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
