import React from "react";
import { useTranslation } from "../hooks/useTranslation";
import { startPageUsageTracking, stopPageUsageTracking } from "../utils/analytics";
import * as S from "../components/ui/Styled";
import { Editor } from "../components/host/Editor";
import { Prompter } from "../components/host/Prompter";
import { useHostController } from "../hooks/useHostController";
import { CountdownModal } from "../components/ui/CountdownModal";
import { RedeemModal } from "../components/RedeemModal";
import { FeedbackModal } from "../components/FeedbackModal";
import { VoiceAnalyticsModal } from "../components/host/VoiceAnalyticsModal";

export const Host: React.FC = () => {
    const { t } = useTranslation();
    const [showFeedback, setShowFeedback] = React.useState(false);
    const [sessionSummary, setSessionSummary] = React.useState<any | null>(null);

    React.useEffect(() => {
        startPageUsageTracking();
        return () => {
            stopPageUsageTracking();
        };
    }, []);

    // Separation of Concerns: Host is now a dumb component
    const { state, actions, refs } = useHostController();
    const { text, isEditMode, peerId, status, isPro, showPaywall, unlockKey, prompterState, errorMessage, paywallErrorMessage, showCountdownModal, prompterSettings, isValidating, bilingualTexts, isTrialActive, trialEndTime } = state;

    const handleScriptFinished = React.useCallback((summary: any) => {
        setSessionSummary(summary);
    }, []);

    return (
        <>
            <RedeemModal
                show={showPaywall}
                unlockKey={unlockKey}
                onUnlockKeyChange={actions.setUnlockKey}
                onUnlock={actions.handleUnlock}
                onClose={actions.handleClosePaywall}
                onOpenFeedback={() => {
                    actions.handleClosePaywall();
                    setShowFeedback(true);
                }}
                errorMessage={paywallErrorMessage}
                isValidating={isValidating}
                isTrialActive={isTrialActive}
                trialEndTime={trialEndTime}
                onStartTrial={actions.startTrial}
            />

            {showCountdownModal && (
                <CountdownModal
                    duration={3}
                    onCountdownEnd={actions.handleCountdownEnd}
                    message={t("host.paywall.countdownMessage")}
                />
            )}

            {errorMessage && <S.ErrorToast message={errorMessage} />}

            {isEditMode ? (
                <Editor
                    text={text}
                    setText={actions.setText}
                    peerId={peerId}
                    status={status}
                    onStart={() => {
                        actions.prompterActions.setIsHudless(false);
                        actions.navigation.startPresentation();
                    }}
                    onStartHudless={() => {
                        actions.prompterActions.setIsHudless(true);
                        actions.navigation.startPresentation();
                    }}

                    isMusicianMode={prompterSettings.isMusicianMode}
                    onToggleMusicianMode={() => actions.prompterActions.setIsMusicianMode(!prompterSettings.isMusicianMode)}
                    isBilingualMode={prompterSettings.isBilingualMode}
                    onToggleBilingualMode={() => actions.prompterActions.setIsBilingualMode(!prompterSettings.isBilingualMode)}
                    isCameraMode={prompterSettings.isCameraMode}
                    onToggleCameraMode={() => actions.prompterActions.setIsCameraMode(!prompterSettings.isCameraMode)}
                    isWidgetMode={prompterSettings.isWidgetMode}
                    onToggleWidgetMode={() => actions.prompterActions.setIsWidgetMode(!prompterSettings.isWidgetMode)}
                    bilingualTexts={bilingualTexts}
                    onBilingualTextsChange={actions.handleBilingualTextsChange}
                    bilingualVoiceTrackLanguage={prompterSettings.bilingualConfig?.voiceTrackLanguage}
                    onBilingualVoiceTrackChange={(lang) => actions.prompterActions.setBilingualConfig({
                        ...prompterSettings.bilingualConfig, // Preserve other config fields
                        voiceTrackLanguage: lang
                    } as any)}
                    isPro={isPro}
                    onUnlockPro={() => actions.setShowPaywall(true)}
                    voiceLanguage={prompterSettings.voiceLanguage}
                    onVoiceLanguageChange={actions.prompterActions.setVoiceLanguage}
                    scripts={state.scripts}
                    activeScriptId={state.activeScriptId || ""}
                    onCreateScript={actions.createScript}
                    onSwitchScript={actions.switchScript}
                    onDeleteScript={actions.deleteScript}
                    onUpdateScript={actions.updateScript}
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
                    onNavigationMapUpdate={actions.handleNavigationMapUpdate}
                    onResetTimer={actions.resetTimer}
                    settings={prompterSettings}
                    actions={actions.prompterActions}
                    onSync={actions.forceSync}
                    onTextChange={actions.setText}
                    onVoiceModeChange={actions.setIsVoiceMode}
                    onRecordingStatusChange={actions.setIsRecording}
                    onScriptFinished={handleScriptFinished}
                    onReset={actions.handleReset}
                    onStartRemoteRecording={actions.startRemoteRecording}
                    onStopRemoteRecording={actions.stopRemoteRecording}
                    scripts={state.scripts}
                    activeScriptId={state.activeScriptId || ""}
                    onCreateScript={actions.createScript}
                    onSwitchScript={actions.switchScript}
                    onDeleteScript={actions.deleteScript}
                    onUpdateScript={actions.updateScript}
                />
            )}

            <FeedbackModal show={showFeedback} onClose={() => setShowFeedback(false)} />

            <VoiceAnalyticsModal
                isOpen={!!sessionSummary}
                onClose={() => setSessionSummary(null)}
                summary={sessionSummary}
            />
        </>
    );
};
