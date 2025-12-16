import React from 'react';
import * as S from './Styled';
import { useTranslation } from '../../hooks/useTranslation';

interface TutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TutorialModal: React.FC<TutorialModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();

  const shortcuts = [
    { keys: ["Space", "Enter"], desc: "Play / Pause" },
    { keys: ["↑"], desc: t("host.controls.speed") + " (+)" },
    { keys: ["↓"], desc: t("host.controls.speed") + " (-)" },
    { keys: ["+"], desc: t("host.controls.size") + " (+)" },
    { keys: ["-"], desc: t("host.controls.size") + " (-)" },
    { keys: ["M"], desc: t("host.mirror") },
    { keys: ["V"], desc: t("host.mirrorV") },
    { keys: ["F"], desc: t("host.controls.focusLine") },
  ];

  return (
    <S.Modal isOpen={isOpen} onClose={onClose} title={t('tutorial.title')}>
      <div className="space-y-8">
        {/* Overview Section */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-brand-500/10 border border-brand-500/20 text-brand-400">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 01-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 01-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 01-1.5 0v-.75c0-.796.421-1.503 1.125-1.905a2.25 2.25 0 001.105-2.1c0-.765-.328-1.448-.852-1.912zm-2.482 8.434a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white">{t('tutorial.overview.title')}</h3>
          </div>
          <p className="text-slate-400 leading-relaxed pl-1">{t('tutorial.overview.description')}</p>
        </section>

        {/* Keyboard Shortcuts */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M1.5 6.375c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v3.563c0 .54-.214 1.055-.595 1.436L9.75 20.962v-5.969c0-.683-.538-1.25-1.209-1.355l-5.25-.82a.75.75 0 01-.62-.652V6.375z" clipRule="evenodd" />
                <path d="M1.5 12.75a.75.75 0 01.75-.75h4.862a2.25 2.25 0 012.187 1.908l.33 2.115.397-.397a2.25 2.25 0 011.59-.659h3.804a2.25 2.25 0 011.591.659l.397.397.33-2.115a2.25 2.25 0 012.187-1.908h4.862a.75.75 0 010 1.5h-4.862a.75.75 0 00-.729.636l-.37 2.37a.75.75 0 01-.74.634h-4.52a.75.75 0 01-.74-.634l-.37-2.37a.75.75 0 00-.729-.636H2.25a.75.75 0 01-.75-.75z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white">Atalhos de Teclado</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {shortcuts.map((s, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                <div className="flex gap-1">
                  {s.keys.map((k, j) => (
                    <kbd key={j} className="px-2 py-1 bg-slate-800 rounded-lg border border-slate-700 text-xs font-mono text-slate-300 shadow-sm min-w-[24px] text-center">
                      {k}
                    </kbd>
                  ))}
                </div>
                <span className="text-sm text-slate-400 font-medium">{s.desc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* How to Use Steps */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436h.008c.366.031.73.069 1.091.118 1.085.147 1.83.96 1.83 1.968v1.5c0 1.665-1.336 3.005-2.995 3.06L3.34 21.988a3.004 3.004 0 01-2.737-2.053c-.423-1.38.265-2.82 1.462-3.472l6.19-3.368c.516-.281 1.094-.444 1.68-.474a25.305 25.305 0 01-.62-5.037zm1.562.532a26.785 26.785 0 00-1.23 4.196c1.087.068 2.146.335 3.11.775a7.747 7.747 0 00-1.88-4.97z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white">{t('tutorial.howToUse.title')}</h3>
          </div>
          <div className="space-y-4">
            <div className="flex gap-4 group">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-sm font-bold text-slate-300 group-hover:bg-brand-600 group-hover:text-white group-hover:border-brand-500 transition-colors">1</div>
              <div>
                <h4 className="font-bold text-slate-200 mb-1 group-hover:text-brand-300 transition-colors">{t('tutorial.howToUse.step1.title')}</h4>
                <p className="text-sm text-slate-400">{t('tutorial.howToUse.step1.description')}</p>
              </div>
            </div>
            <div className="flex gap-4 group">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-sm font-bold text-slate-300 group-hover:bg-brand-600 group-hover:text-white group-hover:border-brand-500 transition-colors">2</div>
              <div>
                <h4 className="font-bold text-slate-200 mb-1 group-hover:text-brand-300 transition-colors">{t('tutorial.howToUse.step2.title')}</h4>
                <p className="text-sm text-slate-400">{t('tutorial.howToUse.step2.description')}</p>
              </div>
            </div>
            <div className="flex gap-4 group">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-sm font-bold text-slate-300 group-hover:bg-brand-600 group-hover:text-white group-hover:border-brand-500 transition-colors">3</div>
              <div>
                <h4 className="font-bold text-slate-200 mb-1 group-hover:text-brand-300 transition-colors">{t('tutorial.howToUse.step3.title')}</h4>
                <p className="text-sm text-slate-400">{t('tutorial.howToUse.step3.description')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Advanced Features */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813a3.75 3.75 0 002.576-2.576l.813-2.846A.75.75 0 019 4.5zM1.5 1.5a.75.75 0 011.5 0v1.5h1.5a.75.75 0 010 1.5h-1.5v1.5a.75.75 0 01-1.5 0v-1.5h-1.5a.75.75 0 010-1.5h1.5v-1.5z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white">{t('tutorial.advancedFeatures.title')}</h3>
          </div>
          <div className="bg-slate-900/50 rounded-xl p-4 border border-white/5 space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
              <p className="text-sm text-slate-400"><strong className="text-slate-200 block mb-0.5">{t('tutorial.advancedFeatures.voiceControl.title')}</strong> {t('tutorial.advancedFeatures.voiceControl.description')}</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
              <p className="text-sm text-slate-400"><strong className="text-slate-200 block mb-0.5">{t('tutorial.advancedFeatures.themes.title')}</strong> {t('tutorial.advancedFeatures.themes.description')}</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
              <p className="text-sm text-slate-400"><strong className="text-slate-200 block mb-0.5">{t('tutorial.advancedFeatures.focusMode.title')}</strong> {t('tutorial.advancedFeatures.focusMode.description')}</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
              <p className="text-sm text-slate-400"><strong className="text-slate-200 block mb-0.5">{t('tutorial.advancedFeatures.textCommands.title')}</strong> {t('tutorial.advancedFeatures.textCommands.description')}</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
              <p className="text-sm text-slate-400"><strong className="text-slate-200 block mb-0.5">{t('tutorial.advancedFeatures.noControls.title')}</strong> {t('tutorial.advancedFeatures.noControls.description')}</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
              <p className="text-sm text-slate-400"><strong className="text-slate-200 block mb-0.5">{t('tutorial.advancedFeatures.musicianMode.title')}</strong> {t('tutorial.advancedFeatures.musicianMode.description')}</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
              <p className="text-sm text-slate-400"><strong className="text-slate-200 block mb-0.5">{t('tutorial.advancedFeatures.bilingualMode.title')}</strong> {t('tutorial.advancedFeatures.bilingualMode.description')}</p>
            </div>
          </div>
        </section>
      </div>
    </S.Modal>
  );
};
