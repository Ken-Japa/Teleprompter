import React from "react";


// --- TYPOGRAPHY & BRANDING ---

export const LogoText = ({ main, sub, className = "" }: { main?: string; sub?: string; className?: string }) => (
    <div className={`flex items-center space-x-3 group cursor-pointer select-none ${className}`}>
        <div className="relative bg-gradient-to-br from-[#1e1b4b] to-[#020617] p-2.5 rounded-xl border border-white/10 shadow-[0_0_20px_rgba(99,102,241,0.2)] group-hover:shadow-[0_0_40px_rgba(99,102,241,0.5)] group-hover:border-indigo-500/30 transition-all duration-500 overflow-hidden">
            {/* Internal Glow */}
            <div className="absolute inset-0 bg-indigo-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <img
                src="/assets/LogoPrompt.png"
                alt="Logo PromptNinja"
                className="w-8 h-5 relative z-10 group-hover:brightness-125 transition-all duration-300"
            />
        </div>
        <h1 className="text-xl font-bold text-white tracking-tight flex items-center font-display">
            {main && (
                <span className="text-slate-200 tracking-tight group-hover:text-white transition-colors">{main}</span>
            )}
            {sub && (
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-300 ml-0.5 tracking-wide font-extrabold filter drop-shadow-[0_0_10px_rgba(139,92,246,0.3)]">
                    {sub}
                </span>
            )}
        </h1>
    </div>
);

// --- BUTTONS & INPUTS ---

export const PrimaryButton = ({
    onClick,
    children,
    className = "",
    ...props
}: {
    onClick: () => void;
    children: React.ReactNode;
    className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button
        onClick={onClick}
        className={`relative overflow-hidden flex items-center justify-center px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm tracking-wide transition-all duration-300 shadow-[0_0_20px_-5px_rgba(99,102,241,0.4)] hover:shadow-[0_0_30px_-5px_rgba(99,102,241,0.6)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 ring-1 ring-white/10 group ${className}`}
        {...props}
    >
        {/* Inner Highlight (Top) */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-50"></div>
        <span className="relative z-10 flex items-center">{children}</span>
    </button>
);

export const SecondaryButton = ({
    onClick,
    children,
    className = "",
    ...props
}: {
    onClick: () => void;
    children: React.ReactNode;
    className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button
        onClick={onClick}
        className={`px-6 py-3 bg-white/5 hover:bg-white/10 active:bg-white/5 border border-white/10 hover:border-white/20 rounded-xl font-medium text-sm transition-all text-slate-300 hover:text-white backdrop-blur-md ${className}`}
        {...props}
    >
        {children}
    </button>
);

export const IconButton = ({
    onClick,
    children,
    active = false,
    className = "",
    ...props
}: {
    onClick: () => void;
    children: React.ReactNode;
    active?: boolean;
    className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button
        onClick={onClick}
        className={`p-2.5 rounded-xl transition-all duration-300 border backdrop-blur-sm flex items-center justify-center ${active ? "bg-indigo-500/90 text-white border-indigo-400/50 shadow-[0_0_20px_rgba(99,102,241,0.4)]" : "bg-white/5 border-white/5 hover:bg-white/10 text-slate-400 hover:text-white hover:border-white/20 hover:scale-105 active:scale-95"} ${className}`}
        {...props}
    >
        {children}
    </button>
);

export const RangeSlider = ({
    value,
    min,
    max,
    step = 1,
    onChange,
    width = "w-24",
    ariaLabel,
    title,
    reverse = false,
}: {
    value: number;
    min: number;
    max: number;
    step?: number;
    onChange: (val: number) => void;
    width?: string;
    ariaLabel?: string;
    title?: string;
    label?: string;
    reverse?: boolean;
}) => {
    // Calcula a posição do slider, invertendo se reverse=true
    const percent = reverse
        ? ((max - value) / (max - min)) * 100
        : ((value - min) / (max - min)) * 100;
    return (
        <div className={`relative flex items-center ${width} h-8 group cursor-pointer`}>
            <div className="absolute inset-0 bg-slate-800 rounded-full h-1 top-1/2 -translate-y-1/2 border border-white/5"></div>
            <div
                className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-indigo-500 rounded-full group-hover:bg-indigo-400 transition-colors shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                style={{ width: `${percent}%` }}
            />
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full h-full absolute inset-0 opacity-0 cursor-pointer z-10"
                aria-label={ariaLabel || "Slider Control"}
                title={title}
            />
            <div
                className="absolute h-3 w-3 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)] pointer-events-none transition-transform duration-200 group-hover:scale-125 top-1/2 -translate-y-1/2 -ml-1.5"
                style={{ left: `${percent}%` }}
            />
        </div>
    );
};

export const ColorButton = ({
    color,
    onClick,
    label,
}: {
    color: "red" | "yellow" | "green" | "blue";
    onClick: () => void;
    label: string;
}) => {
    const styles = {
        red: "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.4)]",
        yellow: "bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.4)]",
        green: "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]",
        blue: "bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.4)]",
    };

    return (
        <button
            onClick={onClick}
            className={`w-5 h-5 rounded-full ring-2 ring-transparent hover:scale-110 active:scale-95 transition-all ${styles[color]} hover:ring-${color}/30`}
            title={label}
        ></button>
    );
};
