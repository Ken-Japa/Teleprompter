import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import * as S from '../components/ui/Styled';
import { Editor } from '../components/host/Editor';
import { Prompter } from '../components/host/Prompter';
import { useHostController } from '../hooks/useHostController';

export const Host: React.FC = () => {
  const { t } = useTranslation();
  
  // Separation of Concerns: Host is now a dumb component
  const { state, actions, refs } = useHostController();
  const { text, isEditMode, peerId, status, isPro, showPaywall, unlockKey, prompterState } = state;

  return (
    <>
      {showPaywall && (
          <S.PaywallModal title={t('host.paywall.title')} desc={t('host.paywall.desc')}>
              <div className="flex flex-col space-y-3">
                  <input 
                    type="text" 
                    placeholder={t('host.paywall.inputPlaceholder')} 
                    value={unlockKey} 
                    onChange={(e) => actions.setUnlockKey(e.target.value)} 
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white text-center font-mono tracking-widest uppercase" 
                  />
                  <S.PrimaryButton onClick={actions.handleUnlock}>{t('host.paywall.button')}</S.PrimaryButton>
              </div>
          </S.PaywallModal>
      )}

      {isEditMode ? (
          <Editor 
            text={text} 
            setText={actions.setText} 
            peerId={peerId} 
            status={status} 
            onStart={actions.navigation.startPresentation} 
          />
      ) : (
          <Prompter 
            ref={refs.prompterRef}
            text={text}
            isPro={isPro}
            peerId={peerId}
            status={status}
            onExit={actions.navigation.exitPresentation}
            setShowPaywall={actions.setShowPaywall}
            externalState={prompterState}
            onStateChange={actions.handlePrompterStateChange}
            onScrollUpdate={actions.handleScrollUpdate}
          />
      )}
    </>
  );
};