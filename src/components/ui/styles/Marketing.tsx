import React from "react";


export const LandingContainer = ({ children }: { children: React.ReactNode }) => (
    <div className="min-h-screen bg-[#020617] text-slate-50 selection:bg-brand-500/30 selection:text-white overflow-y-auto overflow-x-hidden relative">
        <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none z-[1]"></div>
        <div className="fixed inset-0 bg-grid-pattern opacity-[0.15] pointer-events-none z-0"></div>
        {/* Enhanced Background Gradients */}
        <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-brand-900/20 blur-[120px] rounded-full pointer-events-none z-0 animate-pulse-slow"></div>
        <div className="fixed bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-purple-900/10 blur-[120px] rounded-full pointer-events-none z-0 animate-pulse-slow delay-700"></div>
        <div className="fixed top-[40%] left-[50%] -translate-x-1/2 w-[40vw] h-[40vw] bg-blue-900/10 blur-[150px] rounded-full pointer-events-none z-0"></div>
        {children}
    </div>
);

export const LandingNav = ({ children }: { children: React.ReactNode }) => (
    <header className="fixed top-0 w-full z-50 bg-[#020617]/70 backdrop-blur-xl border-b border-white/5 transition-all duration-300 supports-[backdrop-filter]:bg-[#020617]/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">{children}</div>
    </header>
);

export const HeroSection = ({ children }: { children: React.ReactNode }) => (
    <section className="pt-48 pb-32 px-6 text-center relative overflow-hidden z-10 min-h-[90vh] flex flex-col justify-center">
        <div className="max-w-7xl mx-auto relative w-full">
            {/* Ambient Hero Light - Improved */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-brand-500/20 to-purple-500/20 blur-[100px] rounded-full -z-10 pointer-events-none opacity-80 mix-blend-screen animate-pulse-slow"></div>

            {children}
        </div>
    </section>
);
export const FeaturesSection = ({ children, id, className = "" }: { children: React.ReactNode; id?: string; className?: string }) => (
    <section id={id} className={`py-24 bg-slate-950 relative overflow-hidden ${className}`}>
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px]"></div>
        {children}
    </section>
);

export const SectionHeader = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={`text-center max-w-3xl mx-auto mb-16 ${className}`}>
        {children}
    </div>
);

export const FeatureCard = ({
    title,
    desc,
    icon,
    children,
    badge,
    className = "",
}: {
    title: React.ReactNode;
    desc: string;
    icon: React.ReactNode;
    children?: React.ReactNode;
    badge?: { text: string; variant: "free" | "pro" };
    className?: string;
}) => (
    <div className={`relative group h-full perspective-1000 ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-b from-brand-500/20 to-transparent rounded-3xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
        <div className="h-full p-[1px] rounded-3xl bg-gradient-to-b from-white/10 via-white/5 to-transparent transition-colors duration-500 group-hover:from-brand-500/40 group-hover:via-brand-500/10 group-hover:to-transparent">
            <div className="bg-[#0a0f1e]/80 backdrop-blur-md h-full p-8 rounded-[23px] relative z-10 overflow-hidden transition-all duration-500 group-hover:bg-[#0a0f1e]/90 group-hover:translate-y-[-4px]">
                {badge && (
                    <div className={`absolute top-6 right-6 px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-tighter z-30 shadow-sm border ${badge.variant === "pro"
                        ? "bg-brand-500/20 text-brand-400 border-brand-500/30"
                        : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        }`}>
                        {badge.text}
                    </div>
                )}
                <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none"></div>
                <div className="relative z-20 flex flex-col h-full">
                    <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-6 text-brand-400 group-hover:scale-110 group-hover:bg-brand-500 group-hover:text-white group-hover:border-transparent transition-all duration-300 shadow-lg group-hover:shadow-brand-500/40">
                        {icon}
                    </div>
                    <h3 className="text-xl font-display font-bold text-white mb-3 tracking-tight">{title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed text-balance group-hover:text-slate-300 transition-colors mb-6">{desc}</p>
                    {children && <div className="mt-auto">{children}</div>}
                </div>
            </div>
        </div>
    </div>
);

export const PricingCard = ({
    title,
    description,
    price,
    period,
    originalPrice,
    ctaText,
    features,
    missingFeatures = [],
    variant = "default",
    badge,
    footer,
    onClick,
}: {
    title: string;
    description?: string;
    price: string;
    period?: string;
    originalPrice?: string;
    ctaText: string;
    features: string[];
    missingFeatures?: string[];
    variant?: "default" | "featured";
    badge?: string;
    footer?: React.ReactNode;
    onClick: () => void;
}) => {
    const isFeatured = variant === "featured";

    return (
        <div className={`relative flex flex-col h-full ${isFeatured ? "transform md:-translate-y-4" : ""}`}>
            {/* Glow effect for featured card */}
            {isFeatured && (
                <div className="absolute -inset-[2px] bg-gradient-to-b from-brand-500 via-purple-500 to-pink-500 rounded-[2rem] opacity-70 blur-sm -z-10" />
            )}

            <div className={`relative h-full flex flex-col p-8 rounded-[1.9rem] overflow-hidden transition-all duration-300 ${isFeatured
                ? "bg-[#0a0f1e] ring-1 ring-white/10"
                : "bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/[0.07]"
                }`}>

                {/* Featured Badge */}
                {badge && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-gradient-to-r from-brand-500 to-purple-500 text-white px-4 py-1 rounded-b-xl text-xs font-bold tracking-wider shadow-lg z-20 animate-glow-pulse">
                        {badge}
                    </div>
                )}

                {/* Header */}
                <div className={`mb-8 text-center ${badge ? 'pt-8' : ''}`}>
                    <h3 className={`text-lg font-bold mb-2 ${isFeatured ? "text-white" : "text-slate-200"}`}>
                        {title}
                    </h3>
                    {description && (
                        <p className="text-slate-400 text-sm mb-4 h-10 flex items-center justify-center">{description}</p>
                    )}
                    <div className="flex items-baseline justify-center gap-2">
                        <span className={`text-4xl font-bold ${isFeatured ? "text-white" : "text-slate-100"}`}>
                            {price}
                        </span>
                        {originalPrice && (
                            <span className="text-slate-500 text-lg line-through decoration-red-500/50 decoration-2">{originalPrice}</span>
                        )}
                        {period && <span className="text-slate-500 text-sm">{period}</span>}
                    </div>
                </div>

                {/* Features */}
                <div className="flex-grow space-y-4 mb-8">
                    {features.map((feat, i) => (
                        <div key={i} className="flex items-start gap-3">
                            <div className={`mt-0.5 p-0.5 rounded-full ${isFeatured ? "bg-brand-500/20" : "bg-emerald-500/10"}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`w-4 h-4 ${isFeatured ? "text-brand-400" : "text-emerald-400"}`}>
                                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <span className={`text-sm ${isFeatured ? "text-slate-300" : "text-slate-400"}`}>{feat}</span>
                        </div>
                    ))}
                    {missingFeatures.map((feat, i) => (
                        <div key={i} className="flex items-start gap-3 opacity-50">
                            <div className="mt-0.5 p-0.5">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-slate-600">
                                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                                </svg>
                            </div>
                            <span className="text-sm text-slate-500">{feat}</span>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <button
                    onClick={onClick}
                    className={`w-full py-3.5 rounded-xl font-bold transition-smooth btn-press ${isFeatured
                        ? "bg-gradient-to-r from-brand-600 to-purple-600 hover:from-brand-500 hover:to-purple-500 text-white shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 hover:-translate-y-0.5 hover-glow"
                        : "bg-white/10 hover:bg-white/15 text-white border border-white/5 hover:border-white/10"
                        }`}
                >
                    {ctaText}
                </button>

                {footer && <div className="mt-4 text-center">{footer}</div>}
            </div>
        </div>
    );
};
