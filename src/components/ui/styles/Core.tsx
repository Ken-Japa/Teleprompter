import React from "react";


// --- TYPOGRAPHY & BRANDING ---


export const LogoText = ({ main, sub, className = "" }: { main?: string; sub?: string; className?: string }) => (
    <div className={`flex items-center space-x-3 group cursor-pointer select-none ${className}`}>
        <div className="relative bg-gradient-to-br from-brand-900/80 to-slate-950 p-2 rounded-xl border border-white/10 shadow-lg shadow-brand-500/10 transition-all duration-300 group-hover:border-brand-500/30 group-hover:shadow-brand-500/20 group-hover:scale-105">
            <div className="absolute inset-0 bg-brand-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <img
                src="/assets/LogoPrompt2.webp"
                alt="Logo PromptNinja"
                className="w-8 h-auto max-h-6 object-contain relative z-10 transition-all duration-300 drop-shadow-md"
            />
        </div>
        <h1 className="text-lg sm:text-2xl font-bold text-white tracking-tight flex items-center font-display">
            {main && (
                <span className="text-slate-100 tracking-tight group-hover:text-white transition-colors drop-shadow-sm">{main}</span>
            )}
            {sub && (
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-purple-400 ml-1 tracking-wide font-extrabold drop-shadow-sm">
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
            className={`relative overflow-hidden group flex items-center justify-center ${sizeClasses} bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-semibold transition-smooth shadow-lg shadow-brand-500/30 hover:shadow-xl hover:shadow-brand-500/40 hover:-translate-y-0.5 active:translate-y-0 btn-press ring-1 ring-white/20 hover-glow ${className}`}
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
            className={`${sizeClasses} glass hover:bg-slate-800/80 active:bg-slate-900 rounded-xl font-medium transition-smooth text-slate-200 hover:text-white shadow-sm hover:shadow-lg hover:shadow-brand-500/10 btn-press group ${className}`}
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
        ? "bg-brand-500/10 text-brand-300 border-brand-500/30"
        : "bg-transparent text-slate-400 hover:text-white hover:bg-white/5 border-transparent hover:border-white/10";

    return (
        <button
            onClick={onClick}
            className={`${sizeClasses} ${activeClasses} border rounded-lg font-medium transition-smooth flex items-center justify-center gap-2 ${className}`}
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
        className={`p-2.5 rounded-lg transition-smooth border flex items-center justify-center backdrop-blur-sm ${active
            ? "bg-brand-600 text-white border-brand-500 shadow-md shadow-brand-500/20 scale-105"
            : "bg-white/5 border-white/5 hover:bg-white/10 text-slate-400 hover:text-white hover:border-white/20 hover:shadow-sm hover:scale-105"
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
        <div className={`relative flex items-center ${width} h-8 group cursor-pointer select-none`}>
            <div className="absolute inset-0 bg-slate-800/60 rounded-full h-1.5 top-1/2 -translate-y-1/2 border border-white/5"></div>
            <div
                className="absolute left-0 top-1/2 -translate-y-1/2 h-1.5 bg-brand-500 rounded-full group-hover:bg-brand-400 transition-colors"
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
                className="absolute h-4 w-4 bg-white rounded-full shadow-sm shadow-black/50 border border-slate-200 pointer-events-none transition-transform duration-200 group-hover:scale-110 top-1/2 -translate-y-1/2 -ml-2"
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
        red: "bg-red-500 hover:bg-red-400 shadow-red-500/40 ring-red-500/50",
        yellow: "bg-amber-400 hover:bg-amber-300 shadow-amber-400/40 ring-amber-400/50",
        green: "bg-emerald-500 hover:bg-emerald-400 shadow-emerald-500/40 ring-emerald-500/50",
        blue: "bg-cyan-400 hover:bg-cyan-300 shadow-cyan-400/40 ring-cyan-400/50",
    };

    return (
        <button
            onClick={onClick}
            className={`w-8 h-8 rounded-full hover:scale-110 active:scale-95 transition-all duration-200 shadow-lg ring-2 ring-transparent hover:ring-offset-2 hover:ring-offset-slate-900 ${styles[color]}`}
            title={label}
            aria-label={label}
        ></button>
    );
};
