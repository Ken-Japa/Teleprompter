import React, { useState, useEffect } from "react";
import { calculateReadingTime, formatTime, getRecommendedWPM } from "../../utils/pacingCalculator";
import { TimerIcon, ZapIcon } from "../ui/Icons";

interface Props {
    onCtaClick: () => void;
}

export const PacingCalculator: React.FC<Props> = ({ onCtaClick }) => {
    const [text, setText] = useState("");
    const [wpm, setWpm] = useState(150);
    const [time, setTime] = useState(0);

    const rates = getRecommendedWPM();

    useEffect(() => {
        // Calculate word count
        const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;
        // avoid counting empty string as 1 word if it has spaces
        const validWords = text.trim() === "" ? 0 : words;

        const seconds = calculateReadingTime(validWords, wpm);
        setTime(seconds);
    }, [text, wpm]);

    return (
        <div className="bg-slate-800 border-2 border-slate-700 rounded-xl p-6 shadow-xl my-8">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <TimerIcon className="w-6 h-6 text-brand-400" />
                Calculadora de Ritmo Grátis
            </h3>

            <div className="space-y-4">
                <div>
                    <label className="text-slate-300 text-sm mb-2 block">Cole seu roteiro aqui e descubra o tempo:</label>
                    <textarea
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-4 text-white min-h-[150px] focus:outline-none focus:border-brand-500 transition-colors resize-y"
                        placeholder="Cole seu texto aqui..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <div className="text-right text-xs text-slate-500 mt-1">
                        {text.trim() === "" ? 0 : text.trim().split(/\s+/).filter(w => w.length > 0).length} palavras
                    </div>
                </div>

                <div>
                    <label className="text-slate-300 text-sm mb-2 block">Velocidade de Fala (WPM): {wpm}</label>
                    <input
                        type="range"
                        min="100"
                        max="250"
                        step="5"
                        value={wpm}
                        onChange={(e) => setWpm(Number(e.target.value))}
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-500"
                    />
                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                        <button onClick={() => setWpm(rates.slow)} className="cursor-pointer hover:text-white transition-colors">Lento ({rates.slow})</button>
                        <button onClick={() => setWpm(rates.medium)} className="cursor-pointer hover:text-white transition-colors">Normal ({rates.medium})</button>
                        <button onClick={() => setWpm(rates.fast)} className="cursor-pointer hover:text-white transition-colors">Rápido ({rates.fast})</button>
                    </div>
                </div>

                <div className="bg-slate-900 rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between border border-slate-700 gap-4">
                    <div className="text-center sm:text-left">
                        <span className="text-slate-400 text-sm uppercase font-bold tracking-wider block">Tempo Estimado</span>
                        <div className="text-3xl font-mono text-white font-bold">{formatTime(time)}</div>
                    </div>
                    <button
                        onClick={onCtaClick}
                        className="w-full sm:w-auto bg-brand-600 hover:bg-brand-500 text-white px-6 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-brand-500/20"
                    >
                        <ZapIcon className="w-4 h-4 fill-current" />
                        Usar no Teleprompter
                    </button>
                </div>
            </div>
        </div>
    );
};
