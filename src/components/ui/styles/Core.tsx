import React from "react";


// --- TYPOGRAPHY & BRANDING ---


export const LogoText = ({ main, sub, className = "" }: { main?: string; sub?: string; className?: string }) => (
    <div className={`flex items-center space-x-3 group cursor-pointer select-none ${className}`}>
        <div className="relative bg-gradient-to-br from-indigo-900/80 to-slate-950 p-2 rounded-xl border border-white/10 shadow-lg shadow-indigo-500/10 transition-all duration-300 group-hover:border-indigo-500/30 group-hover:shadow-indigo-500/20 group-hover:scale-105">
            <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <img
                src="/assets/LogoPrompt.png"
                alt="Logo PromptNinja"
                className="w-8 h-5  sm:w-8 sm:h-5 relative z-10 transition-all duration-300 drop-shadow-md"
            />
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center font-display">
            {main && (
                <span className="text-slate-100 tracking-tight group-hover:text-white transition-colors drop-shadow-sm">{main}</span>
            )}
            {sub && (
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 ml-1 tracking-wide font-extrabold drop-shadow-sm">
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
    size = "default",
    ...props
}: {
    onClick: () => void;
    children: React.ReactNode;
    className?: string;
    size?: "default" | "sm";
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    const sizeClasses = size === "sm" ? "px-4 py-2 text-xs" : "px-8 py-3.5 text-sm";

    return (
        <button
            onClick={onClick}
            className={`relative overflow-hidden group flex items-center justify-center ${sizeClasses} bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white rounded-xl font-semibold transition-all duration-300 shadow-[0_1px_2px_rgba(0,0,0,0.1),0_4px_14px_rgba(99,102,241,0.4)] hover:shadow-[0_6px_20px_rgba(99,102,241,0.5)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] ring-1 ring-white/20 ${className}`}
            {...props}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out z-0"></div>
            <span className="relative z-10 flex items-center gap-2 tracking-wide">{children}</span>
        </button>
    );
};

export const SecondaryButton = ({
    onClick,
    children,
    className = "",
    size = "default",
    ...props
}: {
    onClick: () => void;
    children: React.ReactNode;
    className?: string;
    size?: "default" | "sm";
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    const sizeClasses = size === "sm" ? "px-4 py-2 text-xs" : "px-8 py-3.5 text-sm";

    return (
        <button
            onClick={onClick}
            className={`${sizeClasses} bg-slate-800/40 backdrop-blur-md hover:bg-slate-700/60 active:bg-slate-800/80 border border-white/10 hover:border-white/20 rounded-xl font-medium transition-all duration-200 text-slate-200 hover:text-white shadow-sm hover:shadow-lg hover:shadow-indigo-500/10 group ${className}`}
            {...props}
        >
            <span className="flex items-center justify-center gap-2 relative z-10">{children}</span>
        </button>
    );
};

export const GhostButton = ({
    onClick,
    children,
    className = "",
    size = "default",
    active = false,
    ...props
}: {
    onClick: () => void;
    children: React.ReactNode;
    className?: string;
    size?: "default" | "sm";
    active?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    const sizeClasses = size === "sm" ? "px-3 py-1.5 text-xs" : "px-6 py-2 text-sm";
    const activeClasses = active
        ? "bg-indigo-500/10 text-indigo-300 border-indigo-500/30"
        : "bg-transparent text-slate-400 hover:text-white hover:bg-white/5 border-transparent hover:border-white/10";

    return (
        <button
            onClick={onClick}
            className={`${sizeClasses} border rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${activeClasses} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

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
        className={`p-2 rounded-lg transition-all duration-200 border flex items-center justify-center backdrop-blur-sm ${active
            ? "bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-500/20 scale-105"
            : "bg-slate-800/50 border-white/5 hover:bg-slate-700/50 text-slate-400 hover:text-white hover:border-white/20 hover:shadow-md"
            } ${className}`}
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
    // Ensure value is within bounds to prevent visual glitches
    const safeValue = Math.min(Math.max(value, min), max);

    // Calcula a posição do slider, invertendo se reverse=true
    const percent = reverse
        ? ((max - safeValue) / (max - min)) * 100
        : ((safeValue - min) / (max - min)) * 100;
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
        red: "bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.4)] hover:shadow-[0_0_20px_rgba(239,68,68,0.6)]",
        yellow: "bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.4)] hover:shadow-[0_0_20px_rgba(251,191,36,0.6)]",
        green: "bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)] hover:shadow-[0_0_20px_rgba(16,185,129,0.6)]",
        blue: "bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.4)] hover:shadow-[0_0_20px_rgba(34,211,238,0.6)]",
    };

    return (
        <button
            onClick={onClick}
            className={`w-6 h-6 rounded-full ring-2 ring-transparent hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-white/10 hover:border-white/30 ${styles[color]}`}
            title={label}
            aria-label={label}
        ></button>
    );
};
