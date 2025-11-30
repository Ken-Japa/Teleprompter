import React from "react";

// --- GENERIC CONTAINERS ---

export const ScreenContainer = React.forwardRef<
    HTMLDivElement,
    {
        children: React.ReactNode;
        className?: string;
    } & React.HTMLAttributes<HTMLDivElement>
>(({ children, className = "", ...props }, ref) => (
    <div ref={ref} className={`flex flex-col bg-[#020617] relative ${className}`} {...props}>
        {/* Subtle Noise Texture Overlay via CSS class */}
        <div className="absolute inset-0 bg-noise opacity-50 pointer-events-none z-[1]"></div>

        {/* Cinematic Ambient Lighting - Top Center Spotlight */}
        <div className="absolute top-[-20%] left-[20%] right-[20%] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

        {children}
    </div>
));

export const Header = ({ children }: { children: React.ReactNode }) => (
    <header className="flex items-center justify-between px-8 py-5 z-30 sticky top-0 transition-all duration-300">
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl border-b border-white/5 z-[-1]"></div>
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

export const EditorContainer = ({ children }: { children: React.ReactNode }) => (
    <div className="flex flex-col h-full bg-[#020617] relative overflow-hidden">
        {/* Editor Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-0"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
        {children}
    </div>
);

export const EditorTextArea = React.forwardRef<
    HTMLTextAreaElement,
    {
        value: string;
        onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
        placeholder: string;
    }
>(({ value, onChange, placeholder }, ref) => (
    <textarea
        ref={ref}
        className="flex-1 min-h-[600px] bg-transparent p-8 md:p-12 text-lg md:text-xl font-mono text-slate-300 resize-none focus:outline-none focus:ring-0 scrollbar-thin scrollbar-thumb-slate-800 placeholder:text-slate-700 leading-relaxed max-w-5xl mx-auto w-full relative z-10 selection:bg-indigo-500/30"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-label="Editor Script Input"
        spellCheck={false}
    />
));

export const SidebarWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="w-full md:w-[400px] bg-[#050b1d] border-l border-white/5 p-8 flex flex-col items-center justify-center space-y-8 shadow-[0_0_100px_rgba(0,0,0,0.8)] z-20 relative">
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
        className={`relative group p-1.5 bg-gradient-to-br from-indigo-500/30 via-purple-500/30 to-pink-500/30 rounded-3xl transition-all duration-700 max-w-fit mx-auto ${hasId ? "shadow-[0_0_60px_rgba(99,102,241,0.15)] scale-100" : "scale-95 opacity-50 grayscale"}`}
    >
        <div className="bg-slate-950 p-4 rounded-[22px] relative z-10">
            <div className="bg-white p-3 rounded-xl">{children}</div>
        </div>
    </div>
);

export const FormattingToolbar = ({ children }: { children: React.ReactNode }) => (
    <div className="flex items-center space-x-2 px-6 py-4 border-b border-white/5 z-10 bg-slate-950/50 backdrop-blur-md">
        <div className="max-w-5xl mx-auto w-full flex items-center">{children}</div>
    </div>
);

export const ToolbarDivider = () => <div className="h-6 w-[1px] bg-white/10 mx-6 shrink-0" />;

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
        className={`flex-1 overflow-y-scroll relative z-10 px-4 ${className}`}
        onScroll={onScroll}
        {...props}
    >
        <div 
            className="max-w-5xl mx-auto w-full relative z-20"
            style={contentStyle}
        >
            {children}
        </div>
    </div>
));

export const FocusIndicator = () => (
    <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 pointer-events-none z-20 mix-blend-overlay">
        {/* Line with fade - using currentColor to match theme */}
        <div className="absolute inset-x-12 h-[2px] bg-gradient-to-r from-transparent via-current to-transparent opacity-30" />

        {/* Left Arrow (Points Right) */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 w-0 h-0 border-y-[8px] border-y-transparent border-l-[12px] border-l-current opacity-60 drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]" />

        {/* Right Arrow (Points Left) */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 w-0 h-0 border-y-[8px] border-y-transparent border-r-[12px] border-r-current opacity-60 drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]" />
    </div>
);

export const HudContainer = ({ children, visible }: { children: React.ReactNode; visible: boolean }) => (
    <div
        className={`fixed bottom-4 w-full px-4 sm:left-1/2 sm:-translate-x-1/2 sm:w-auto glass-panel py-2 rounded-xl sm:bottom-12 sm:px-6 sm:py-3 sm:rounded-full z-50 transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) flex flex-wrap justify-center items-center gap-x-4 gap-y-3 sm:flex-nowrap sm:space-x-6 ring-1 ring-white/10 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.8)] ${visible ? "opacity-100 translate-y-0 scale-100 blur-0" : "opacity-0 translate-y-12 scale-90 blur-lg pointer-events-none"}`}
    >
        {children}
    </div>
);

export const HudGroup = ({ children, label }: { children: React.ReactNode; label?: string }) => (
    <div className="flex flex-col items-center space-y-1.5 sm:border-r sm:border-white/10 sm:last:border-0 sm:pr-6 sm:last:pr-0 group relative">
        <div className="flex items-center sm:gap-3">{children}</div>
        {label && (
            <span className="text-[9px] uppercase text-slate-500 font-bold tracking-[0.2em] group-hover:text-indigo-400 transition-colors absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 duration-300">
                {label}
            </span>
        )}
    </div>
);

// --- REMOTE SPECIFIC ---

export const ControlsContainer = ({ children }: { children: React.ReactNode }) => (
    <div className="bg-[#0b0f1d]/90 backdrop-blur-3xl p-6 pb-12 rounded-t-[3rem] shadow-[0_-10px_60px_rgba(0,0,0,0.6)] border-t border-white/10 space-y-6 z-20 relative ring-1 ring-white/5 overflow-hidden">
        {/* Subtle sheen at the top */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent"></div>
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

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-500 opacity-20 group-active:opacity-50 group-active:scale-105 group-active:blur-[2px]">
            <div className="text-white font-display font-black text-6xl md:text-8xl -rotate-90 whitespace-nowrap select-none tracking-tighter drop-shadow-2xl opacity-10 border border-white/10 rounded-full px-12 py-4 backdrop-blur-sm">
                {label}
            </div>
        </div>
        {children}
    </div>
));
