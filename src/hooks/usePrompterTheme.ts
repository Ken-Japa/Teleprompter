import { useCallback } from 'react';
import { Theme } from '../types';

export const usePrompterTheme = (theme: Theme) => {
    const getThemeClass = useCallback(() => {
        switch (theme) {
            case Theme.PAPER:
                return "bg-white text-slate-900";
            case Theme.CONTRAST:
                return "bg-black text-yellow-400 font-bold";
            case Theme.MATRIX:
                return "bg-black text-green-500 font-mono";
            case Theme.CYBER:
                return "bg-slate-900 text-pink-500 shadow-[inset_0_0_100px_rgba(236,72,153,0.1)]";
            case Theme.CREAM:
                return "bg-[#fdfbf7] text-[#333]";
            case Theme.DEFAULT:
            default:
                return "bg-slate-950 text-slate-100";
        }
    }, [theme]);

    return { getThemeClass };
};
