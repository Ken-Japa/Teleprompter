import React from "react";
import { TextSegment } from "../../hooks/useRemoteTextHandling";

interface RemoteNavigationProps {
    textSegments: TextSegment[];
    actions: any; // Ideally typed
    // Optional: setActiveTab prop if we want to auto-switch
}

export const RemoteNavigation: React.FC<RemoteNavigationProps> = ({ textSegments, actions }) => {
    return (
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
                        }}
                        className="w-full text-left p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:bg-slate-800 hover:border-brand-500/50 transition-all group"
                        aria-label={`Jump to section: ${seg.text.substring(0, 30)}...`}
                    >
                        <div className="flex items-start gap-3">
                            <span className="text-[10px] font-mono text-slate-500 mt-1 w-8 text-right">
                                {(seg.progress * 100).toFixed(0)}%
                            </span>
                            <p className="text-sm text-slate-300 font-medium line-clamp-2 group-hover:text-white">
                                {seg.text}
                            </p>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};
