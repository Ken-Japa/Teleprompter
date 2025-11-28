import React from 'react';
import { ConnectionStatus } from '../../types';
import * as S from '../ui/Styled';
import { useTranslation } from '../../hooks/useTranslation';
import { HomeIcon, PlayIcon } from '../ui/Icons';
import { ConnectSidebar } from './ConnectSidebar';
import { EditorToolbar } from './EditorToolbar';
import { useEditorLogic } from '../../hooks/useEditorLogic';

interface EditorProps {
    text: string;
    setText: (text: string) => void;
    peerId: string;
    status: ConnectionStatus;
    onStart: () => void;
}

export const Editor: React.FC<EditorProps> = ({ text, setText, peerId, status, onStart }) => {
    const { t } = useTranslation();
    
    // Separation of Concerns: Logic is now in the hook
    const { 
        localText, 
        textAreaRef, 
        handleChange, 
        handleInsertTag, 
        handleClear 
    } = useEditorLogic({ text, setText });

    return (
        <S.EditorContainer>
             <S.Header>
                <div className="flex items-center space-x-6">
                    <S.LogoText main={t('title.main')} sub={t('title.sub')} />
                    <button 
                        onClick={() => { window.location.hash = ''; }} 
                        className="flex items-center text-xs font-bold text-slate-500 hover:text-white transition"
                        aria-label="Back to Home"
                    >
                        <HomeIcon className="w-3 h-3 mr-1" /> {t('menu.backToHome')}
                    </button>
                </div>
                <div className="flex items-center space-x-3">
                    <S.PrimaryButton onClick={onStart} aria-label="Start Presentation Mode" className="!py-2 !px-5 !text-xs">
                        <PlayIcon className="w-3 h-3 mr-2" /> {t('host.startPrompter')}
                    </S.PrimaryButton>
                </div>
            </S.Header>

            <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
                 <div className="flex-1 relative flex flex-col h-full bg-slate-950">
                     <EditorToolbar onInsertTag={handleInsertTag} onClear={handleClear} />

                     <S.EditorTextArea 
                        ref={textAreaRef}
                        value={localText} 
                        onChange={handleChange} 
                        placeholder={t('host.editorPlaceholder')} 
                    />
                 </div>
                 
                 <ConnectSidebar peerId={peerId} status={status} />
            </div>
        </S.EditorContainer>
    );
};