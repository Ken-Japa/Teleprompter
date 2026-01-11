import React, { useState } from 'react';
import * as S from '../ui/Styled';
import { useTranslation } from '../../hooks/useTranslation';

interface NDIOutputToggleProps {
    isPro: boolean;
    isEnabled: boolean;
    onToggle: () => void;
    onShowPaywall: () => void;
}

export const NDIOutputToggle: React.FC<NDIOutputToggleProps> = ({ isPro, isEnabled, onToggle, onShowPaywall }) => {
    const [showTutorial, setShowTutorial] = useState(false);
    const { t } = useTranslation();

    const handleToggle = () => {
        if (!isPro) {
            onShowPaywall();
            return;
        }

        // Toggle state
        onToggle();

        // If turning ON, show tutorial
        if (!isEnabled) {
            setShowTutorial(true);
        }
    };

    const handleCleanMode = () => {
        const url = new URL(window.location.href);
        url.searchParams.set('hud', '0');
        window.location.href = url.toString();
    };

    return (
        <div className="flex flex-col gap-2 p-3 bg-slate-900/50 rounded-xl border border-white/5">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect width="20" height="14" x="2" y="3" rx="2" /><line x1="8" x2="16" y1="21" y2="21" /><line x1="12" x2="12" y1="17" y2="21" /></svg>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                            {t('host.ndi.toggleLabel')}
                            {!isPro && <span className="text-[10px] bg-brand-500 text-white px-1.5 py-0.5 rounded font-bold">PRO</span>}
                        </h3>
                        <p className="text-xs text-slate-400">{t('host.ndi.toggleDesc')}</p>
                    </div>
                </div>
                <div className={!isPro ? "opacity-50" : ""}>
                    <S.Toggle
                        active={isEnabled}
                        onClick={handleToggle}
                    />
                </div>
            </div>

            {showTutorial && isEnabled && (
                <div className="mt-2 text-xs bg-slate-950 p-3 rounded border border-indigo-500/30 animate-in fade-in slide-in-from-top-2">
                    <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-indigo-400">{t('host.ndi.tutorial.title')}</h4>
                        <button onClick={() => setShowTutorial(false)} className="text-slate-500 hover:text-white">&times;</button>
                    </div>
                    <ol className="list-decimal list-inside space-y-1 text-slate-300">
                        <li dangerouslySetInnerHTML={{ __html: t('host.ndi.tutorial.step1') }} />
                        <li>{t('host.ndi.tutorial.step2')}</li>
                        <li>{t('host.ndi.tutorial.step3')}</li>
                        <li>{t('host.ndi.tutorial.step4')}</li>
                    </ol>

                    <div className="mt-2 p-2 bg-slate-900 rounded border border-white/5 text-slate-400">
                        <p>💡 {t('host.ndi.tutorial.vingesterConfig')}</p>
                    </div>

                    <div className="mt-3 flex gap-2 flex-wrap">
                        <button
                            onClick={() => window.open('https://vdo.ninja', '_blank')}
                            className="text-[10px] bg-indigo-600 hover:bg-indigo-500 text-white px-2 py-1 rounded transition-colors"
                        >
                            {t('host.ndi.tutorial.openVdo')}
                        </button>

                        <button
                            onClick={handleCleanMode}
                            className="text-[10px] bg-emerald-600 hover:bg-emerald-500 text-white px-2 py-1 rounded transition-colors flex items-center gap-1"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3"><path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h11" /><path d="M14 2v6h6" /><path d="M10 20v-6h4v6a2 2 0 0 1-2 2 2 2 0 0 1-2-2z" /></svg>
                            {t('host.ndi.tutorial.cleanModeBtn')}
                        </button>

                        <button
                            onClick={() => setShowTutorial(false)}
                            className="text-[10px] bg-slate-800 hover:bg-slate-700 text-white px-2 py-1 rounded transition-colors ml-auto"
                        >
                            {t('host.ndi.tutorial.close')}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
