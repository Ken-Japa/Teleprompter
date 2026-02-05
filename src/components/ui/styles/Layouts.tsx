import React from "react";

// --- GENERIC CONTAINERS ---


export const ScreenContainer = React.forwardRef<
    HTMLDivElement,
    {
        children: React.ReactNode;
        className?: string;
    } & React.HTMLAttributes<HTMLDivElement>
>(({ children, className = "", ...props }, ref) => (
    <div ref={ref} className={`flex flex-col relative ${className}`} {...props}>
        {/* Subtle Noise Texture Overlay via CSS class */}
        <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none z-[1]"></div>
        {children}
    </div>
));

export const Header = ({ children }: { children: React.ReactNode }) => (
    <header className="flex items-center justify-between px-8 py-5 z-40 sticky top-0 transition-all duration-300">
        <div className="absolute inset-0 glass border-b-0 z-[-1]"></div>
        {children}
    </header>
);

export const MainContent = ({
    children,
    onMouseMove,
}: {
    children: React.ReactNode;
    onMouseMove?: () => void;
}) => (
    <div className="flex-1 relative flex overflow-hidden z-10" onMouseMove={onMouseMove}>
        {children}
    </div>
);

// --- EDITOR & SIDEBAR ---

export const EditorContainer = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={`flex flex-col h-screen bg-slate-950 relative ${className}`}>
        {/* Editor Background Grid - Refined */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_40%,transparent_100%)] pointer-events-none z-0"></div>
        {children}
    </div>
);

export const EditorTextArea = React.forwardRef<
    HTMLTextAreaElement,
    React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className = "", ...props }, ref) => (
    <textarea
        ref={ref}
        id="editor-script-input"
        name="scriptText"
        className={`flex-1 min-h-[500px] bg-transparent p-8 lg:p-16 pb-16 text-lg lg:text-2xl font-sans text-slate-200 resize-none focus:outline-none focus:ring-0 scrollbar-thin scrollbar-thumb-slate-800 placeholder:text-slate-700 leading-[1.8] max-w-7xl mx-auto w-full relative z-10 selection:bg-brand-500/30 tracking-wide ${className}`}
        aria-label="Editor Script Input"
        spellCheck={true}
        {...props}
    />
));

export const SidebarWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="w-full lg:w-[400px] glass border-l border-white/5 p-8 pb-safe flex flex-col items-center justify-start space-y-8 shadow-2xl z-20 relative overflow-y-auto min-h-[300px] lg:min-h-[500px]">
        {children}
    </div>
);

export const SidebarContainer = ({ children }: { children: React.ReactNode }) => (
    <div className="text-center w-full space-y-6">{children}</div>
);

export const ActionButtonsGrid = ({ children }: { children: React.ReactNode }) => (
    <div className="grid grid-cols-2 gap-3 w-full">{children}</div>
);

export const QRCodeBox = ({ children, hasId }: { children: React.ReactNode; hasId: boolean }) => (
    <div
        className={`relative group p-1 bg-gradient-to-br from-brand-500/30 via-purple-500/30 to-pink-500/30 rounded-3xl transition-all duration-500 max-w-[210px] w-full aspect-square mx-auto ${hasId ? "shadow-lg shadow-brand-500/20 scale-100 hover:scale-105" : "scale-95 opacity-50 grayscale"}`}
    >
        <div className="bg-slate-950 p-1 sm:p-1.5 rounded-[22px] relative z-10 w-full h-full">
            <div className="bg-white p-1 sm:p-1.5 rounded-xl shadow-inner w-full h-full flex items-center justify-center overflow-hidden">
                {children}
            </div>
        </div>
    </div>
);

export const FormattingToolbar = ({ children }: { children: React.ReactNode }) => (
    <div className="flex items-center space-x-2 px-4 sm:px-6 py-3 border-b border-white/5 z-10 sticky top-0 shadow-lg backdrop-blur-xl bg-slate-950/80 supports-[backdrop-filter]:bg-slate-950/60">
        <div className="max-w-4xl mx-auto w-full flex items-center overflow-x-auto scrollbar-none gap-2">{children}</div>
    </div>
);

export const ToolbarDivider = () => <div className="h-5 w-[1px] bg-white/10 mx-2 sm:mx-4 shrink-0" />;

// --- PROMPTER & HUD ---

export const PrompterScrollArea = React.forwardRef<
    HTMLDivElement,
    {
        children: React.ReactNode;
        onScroll: (e: React.UIEvent<HTMLDivElement>) => void;
        className?: string;
        contentStyle?: React.CSSProperties;
    } & React.HTMLAttributes<HTMLDivElement>
>(({ children, onScroll, className = "", contentStyle, ...props }, ref) => (
    <div
        ref={ref}
        className={`flex-1 overflow-y-scroll relative z-10 px-4 scrollbar-none optimize-scroll ${className}`}
        onScroll={onScroll}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        {...props}
    >
        <style>{`
            .scrollbar-none::-webkit-scrollbar {
                display: none;
            }
        `}</style>
        <div
            className="max-w-5xl mx-auto w-full relative z-20"
            style={contentStyle}
        >
            {children}
        </div>
    </div>
));

export const FocusIndicator = () => (
    <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 pointer-events-none z-20 mix-blend-overlay opacity-60">
        {/* Line with fade - using currentColor to match theme */}
        <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-brand-400 to-transparent opacity-40" />

        {/* Glow Effect */}
        <div className="absolute inset-x-20 h-[40px] -translate-y-1/2 bg-gradient-to-r from-transparent via-brand-500/10 to-transparent blur-xl" />

        {/* Left Arrow (Points Right) */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 w-0 h-0 border-y-[6px] border-y-transparent border-l-[10px] border-l-brand-300 opacity-60 drop-shadow-[0_0_10px_rgba(99,102,241,0.8)]" />

        {/* Right Arrow (Points Left) */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 w-0 h-0 border-y-[6px] border-y-transparent border-r-[10px] border-r-brand-300 opacity-60 drop-shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
    </div>
);

export const HudContainer = ({ children, visible }: { children: React.ReactNode; visible: boolean }) => (
    <div
        className={`fixed bottom-1 w-[95%] sm:w-auto left-1/2 -translate-x-1/2 px-4 py-3 rounded-2xl sm:px-8 sm:py-4  z-50 transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) flex flex-wrap justify-center items-center gap-x-4 gap-y-3 xl:flex-nowrap xl:gap-0 shadow-2xl backdrop-blur-2xl bg-slate-900/80 border border-white/10 ${visible ? "opacity-100 translate-y-0 scale-100 blur-0" : "opacity-0 translate-y-12 scale-90 blur-lg pointer-events-none"}`}
    >
        {/* Top sheen for glass effect */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full opacity-50"></div>
        {/* Bottom shine */}
        <div className="absolute bottom-0 left-0 right-0 h-[10px] bg-gradient-to-t from-brand-500/5 to-transparent rounded-full pointer-events-none"></div>
        {children}
    </div>
);

export const HudGroup = ({ children, label }: { children: React.ReactNode; label?: string }) => (
    <div className="flex flex-col items-center justify-center  sm:border-white/10 sm:last:border-0 sm:px-4 group relative h-full">
        <div className="flex items-center justify-center sm:gap-3">{children}</div>
        {label && (
            <span className="hidden sm:block absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] uppercase text-slate-500 font-bold tracking-[0.2em] group-hover:text-brand-400 transition-colors whitespace-nowrap opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 duration-300 pointer-events-none">
                {label}
            </span>
        )}
    </div>
);

// --- REMOTE SPECIFIC ---

export const ControlsContainer = ({ children }: { children: React.ReactNode }) => (
    <div className="flex-none bg-slate-950/90 backdrop-blur-3xl p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] rounded-t-[3rem] shadow-[0_-10px_60px_rgba(0,0,0,0.6)] border-t border-white/10 space-y-6 z-20 relative ring-1 ring-white/5 overflow-hidden">
        {/* Subtle sheen at the top */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-500/40 to-transparent"></div>
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-1 bg-white/10 rounded-full" />
        {children}
    </div>
);

export const TouchPad = React.forwardRef<
    HTMLDivElement,
    {
        onTouchStart: React.TouchEventHandler<HTMLDivElement>;
        onTouchMove: React.TouchEventHandler<HTMLDivElement>;
        onTouchEnd?: React.TouchEventHandler<HTMLDivElement>;
        label: string;
        children: React.ReactNode;
        className?: string;
    }
>(({ onTouchStart, onTouchMove, onTouchEnd, label, children, className = "" }, ref) => (
    <div
        ref={ref}
        className={`flex-1 bg-slate-950 relative overflow-hidden touch-none group ${className}`}
        style={{
            touchAction: "none",
            backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        aria-label={label}
        role="slider"
    >
        {/* Deep Space Background for Remote */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020617]/50 to-[#020617] pointer-events-none" />

        {/* Noise Texture for Grip Feeling */}
        <div className="absolute inset-0 bg-noise opacity-[0.08] pointer-events-none"></div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-500 opacity-40 group-active:opacity-60 group-active:scale-105 group-active:blur-[2px]">
            <div className="text-white font-display font-black text-2xl md:text-4xl whitespace-nowrap select-none tracking-widest drop-shadow-2xl opacity-50 border border-white/10 rounded-full px-8 py-2 backdrop-blur-sm bg-black/20">
                {label}
            </div>
        </div>
        {children}
    </div>
));
