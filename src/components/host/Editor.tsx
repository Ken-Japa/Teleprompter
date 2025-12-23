import React from "react";
import { ConnectionStatus } from "../../types";
import * as S from "../ui/Styled";
import { useTranslation } from "../../hooks/useTranslation";
import { HomeIcon, PlayIcon } from "../ui/Icons";
import { ConnectSidebar } from "./ConnectSidebar";
import { EditorToolbar } from "./EditorToolbar";
import { BilingualTextEditor } from "./BilingualTextEditor";
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
    isBilingualMode: boolean;
    onToggleBilingualMode: () => void;
    isCameraMode: boolean;
    onToggleCameraMode: () => void;
    isWidgetMode: boolean;
    onToggleWidgetMode: () => void;
    bilingualTexts?: {
        primary: string;
        secondary: string;
        primaryLanguage?: string;
        secondaryLanguage?: string;
    };
    onBilingualTextsChange?: (texts: { primary: string; secondary: string; primaryLanguage?: string; secondaryLanguage?: string }) => void;
    // New Props for Voice Tracking
    bilingualVoiceTrackLanguage?: 'primary' | 'secondary';
    onBilingualVoiceTrackChange?: (lang: 'primary' | 'secondary') => void;

    isPro: boolean;
    onUnlockPro: () => void;
}

export const Editor: React.FC<EditorProps> = ({
    text, setText, peerId, status, onStart, onStartHudless,
    isMusicianMode, onToggleMusicianMode, isBilingualMode, onToggleBilingualMode,
    isCameraMode, onToggleCameraMode, isWidgetMode, onToggleWidgetMode,
    bilingualTexts, onBilingualTextsChange,
    bilingualVoiceTrackLanguage, onBilingualVoiceTrackChange,
    isPro, onUnlockPro
}) => {
    const { t } = useTranslation();

    // Separation of Concerns: Logic is now in the hook
    const { localText, textAreaRef, handleChange, handleInsertTag, handleClear } = useEditorLogic({
        text,
        setText,
    });

    return (
        <S.EditorContainer>
            <S.Header>
                <div className="flex items-center sm:space-x-6">
                    <S.LogoText main={t("title.main")} sub={t("title.sub")} className="hidden sm:flex" />
                    <S.LogoText main={t("title.main")} className="!block sm:!hidden scale-90 origin-left -ml-2 !space-x-1" />
                    <button
                        onClick={() => {
                            window.location.hash = "";
                        }}
                        className="flex items-center text-xs font-bold text-slate-500 hover:text-white ml-2 transition"
                        aria-label="Back to Home"
                    >
                        <HomeIcon className="w-6 h-6 mr-1" /> <span className="hidden sm:inline">{t("menu.backToHome")}</span>
                    </button>
                </div>
                <div className="flex items-center space-x-3 relative">
                    {/* Visual Hint */}
                    {/* Visual Hint - Positioned BELOW on mobile/desktop to avoid being cut off by top edge */}
                    <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none z-50">
                        <p className="text-slate-400 text-xs sm:text-sm font-medium animate-bounce bg-slate-900/90 backdrop-blur px-3 py-1.5 rounded-full border border-brand-500/30 shadow-xl shadow-black/50 flex items-center gap-2">
                            <span className="sm:hidden">{t("menu.startHintShort") || "Aperte PLAY"}</span><span className="hidden sm:inline">{t("menu.startHint") || "Aperte PLAY para começar"}</span> <span className="text-lg">👆</span>
                        </p>
                    </div>

                    <LanguageSelector />
                    <S.PrimaryButton
                        onClick={onStart}
                        aria-label="Start Presentation Mode"
                        // Removed invalid size="lg" prop, relying on className below
                        className="!py-2 !px-3 !text-sm sm:!py-3 sm:!px-6 sm:!text-lg shadow-brand-500/50 shadow-lg hover:shadow-brand-500/70 hover:scale-105 transition-all duration-300" // Added custom styles for prominence
                    >
                        <PlayIcon className="w-5 h-5 sm:w-6 sm:h-6 mr-1.5 sm:mr-2" /> {/* Increased icon size */}
                        <span className="font-bold tracking-wide">
                            {t("host.startPrompter").split(' ')[0]} <span className="hidden sm:inline">{t("host.startPrompter").split(' ').slice(1).join(' ')}</span>
                        </span>
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
                        isBilingualMode={isBilingualMode}
                        onToggleBilingualMode={onToggleBilingualMode}
                        onStartHudless={onStartHudless}
                        isCameraMode={isCameraMode}
                        onToggleCameraMode={onToggleCameraMode}
                        isWidgetMode={isWidgetMode}
                        onToggleWidgetMode={onToggleWidgetMode}
                        isPro={isPro}
                        onUnlockPro={onUnlockPro}
                    />

                    {isBilingualMode ? (
                        <BilingualTextEditor
                            primaryText={bilingualTexts?.primary || ""}
                            secondaryText={bilingualTexts?.secondary || ""}
                            onChange={onBilingualTextsChange || (() => { })}
                            voiceTrackLanguage={bilingualVoiceTrackLanguage}
                            onVoiceTrackLanguageChange={onBilingualVoiceTrackChange}
                            primaryLanguage={bilingualTexts?.primaryLanguage}
                            secondaryLanguage={bilingualTexts?.secondaryLanguage}
                        />
                    ) : (
                        <S.EditorTextArea
                            ref={textAreaRef}
                            value={localText}
                            onChange={handleChange}
                            placeholder={t("host.editorPlaceholder")}
                        />
                    )}
                </div>

                <ConnectSidebar peerId={peerId} status={status} />
            </div>
        </S.EditorContainer>
    );
};
