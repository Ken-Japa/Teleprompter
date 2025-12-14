import React from "react";
import { ConnectionStatus } from "../../types";
import * as S from "../ui/Styled";
import { useTranslation } from "../../hooks/useTranslation";
import { HomeIcon, PlayIcon } from "../ui/Icons";
import { ConnectSidebar } from "./ConnectSidebar";
import { EditorToolbar } from "./EditorToolbar";
import { useEditorLogic } from "../../hooks/useEditorLogic";
import { LanguageSelector } from "../ui/LanguageSelector";

interface EditorProps {
    text: string;
    setText: (text: string) => void;
    peerId: string;
    status: ConnectionStatus;
    onStart: () => void;
    onStartHudless: () => void;
    isMusicianMode: boolean;
    onToggleMusicianMode: () => void;
}

export const Editor: React.FC<EditorProps> = ({ text, setText, peerId, status, onStart, onStartHudless, isMusicianMode, onToggleMusicianMode }) => {
    const { t } = useTranslation();

    // Separation of Concerns: Logic is now in the hook
    const { localText, textAreaRef, handleChange, handleInsertTag, handleClear } = useEditorLogic({
        text,
        setText,
    });

    return (
        <S.EditorContainer>
            <S.Header>
                <div className="flex items-center space-x-6">
                    <S.LogoText main={t("title.main")} sub={t("title.sub")} className="hidden sm:flex" />
                    <S.LogoText sub={t("title.main")} className="sm:hidden" />
                    <button
                        onClick={() => {
                            window.location.hash = "";
                        }}
                        className="flex items-center text-xs font-bold text-slate-500 hover:text-white transition"
                        aria-label="Back to Home"
                    >
                        <HomeIcon className="w-4 h-4 mr-1" /> <span className="hidden sm:inline">{t("menu.backToHome")}</span>
                    </button>
                </div>
                <div className="flex items-center space-x-3">

                    <LanguageSelector />
                    <S.PrimaryButton onClick={onStart} aria-label="Start Presentation Mode" size="sm">
                        <PlayIcon className="w-4 h-4 sm:w-3 sm:h-3 sm:mr-2" /> <span className="hidden sm:inline">{t("host.startPrompter")}</span>
                    </S.PrimaryButton>
                </div>
            </S.Header>

            <div className="flex-1 flex flex-col md:flex-row md:overflow-hidden relative">
                <div className="flex-1 relative flex flex-col h-full bg-slate-950">
                    <EditorToolbar
                        onInsertTag={handleInsertTag}
                        onClear={handleClear}
                        text={localText}
                        isMusicianMode={isMusicianMode}
                        onToggleMusicianMode={onToggleMusicianMode}
                        onStartHudless={onStartHudless}
                    />

                    <S.EditorTextArea
                        ref={textAreaRef}
                        value={localText}
                        onChange={handleChange}
                        placeholder={t("host.editorPlaceholder")}
                    />
                </div>

                <ConnectSidebar peerId={peerId} status={status} />
            </div>
        </S.EditorContainer>
    );
};
