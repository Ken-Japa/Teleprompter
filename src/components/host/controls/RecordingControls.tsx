import { memo } from "react";
import { useTranslation } from "../../../hooks/useTranslation";
import * as S from "../../ui/Styled";
import { RecordIcon, StopIcon, PlayIcon, PauseIcon, LaptopIcon, SmartphoneIcon } from "../../ui/Icons";
import { RecordingMode } from "../../../types";

interface RecordingControlsProps {
    isRecording: boolean;
    isPaused: boolean;
    recordingTime: string;
    hasRecordedData: boolean;
    recordingMode: RecordingMode;
    onToggleMode: () => void;
    onStart: () => void;
    onStop: () => void;
    onPause: () => void;
    onResume: () => void;
    onDownload: () => void;
}

export const RecordingControls = memo(({ 
    isRecording, 
    isPaused, 
    recordingTime, 
    hasRecordedData,
    recordingMode,
    onToggleMode,
    onStart, 
    onStop, 
    onPause, 
    onResume, 
    onDownload 
}: RecordingControlsProps) => {
    const { t } = useTranslation();
    
    if (!isRecording && !hasRecordedData) {
        return (
            <div className="flex items-center gap-1">
                <S.IconButton
                    onClick={onStart}
                    title={t("host.controls.record")}
                    aria-label={t("host.controls.record")}
                    className="w-9 h-9 rounded-full hover:bg-red-500/20 hover:text-red-400 border-transparent text-slate-400"
                >
                    <RecordIcon className="w-5 h-5" />
                </S.IconButton>
                <S.IconButton
                    onClick={onToggleMode}
                    title={recordingMode === "remote" ? "Record on Remote" : "Record on Host"}
                    aria-label="Toggle Recording Mode"
                    className="w-9 h-9 rounded-full hover:bg-white/10 border-transparent text-slate-400"
                >
                    {recordingMode === "remote" ? (
                        <SmartphoneIcon className="w-5 h-5" />
                    ) : (
                        <LaptopIcon className="w-5 h-5" />
                    )}
                </S.IconButton>
            </div>
        );
    }

    if (hasRecordedData && !isRecording) {
        return (
            <div className="flex items-center gap-2 bg-slate-900/80 rounded-full px-2 py-1 border border-white/10">
                 <S.IconButton
                    onClick={onDownload}
                    title={t("host.controls.downloadRecord")}
                    aria-label={t("host.controls.downloadRecord")}
                    className="w-8 h-8 rounded-full bg-green-500/20 text-green-400 hover:bg-green-500/30 border-transparent"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                </S.IconButton>
                <S.IconButton
                    onClick={onStart} // Reset and start new
                    title={t("host.controls.recordNew")}
                    aria-label={t("host.controls.recordNew")}
                    className="w-8 h-8 rounded-full hover:bg-white/10 text-slate-400 border-transparent"
                >
                    <RecordIcon className="w-4 h-4" />
                </S.IconButton>
                <S.IconButton
                    onClick={onToggleMode}
                    title={recordingMode === "remote" ? "Record on Remote" : "Record on Host"}
                    aria-label="Toggle Recording Mode"
                    className="w-8 h-8 rounded-full hover:bg-white/10 text-slate-400 border-transparent"
                >
                    {recordingMode === "remote" ? (
                        <SmartphoneIcon className="w-4 h-4" />
                    ) : (
                        <LaptopIcon className="w-4 h-4" />
                    )}
                </S.IconButton>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-2 bg-red-900/20 rounded-full px-3 py-1 border border-red-500/30">
            <div className="relative w-3 h-3 flex items-center justify-center mr-1">
                 <div className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-75"></div>
                 <div className="relative w-2 h-2 rounded-full bg-red-500"></div>
            </div>
            <span className="text-xs font-mono text-red-200 min-w-[40px]">{recordingTime}</span>
            
            {isPaused ? (
                <S.IconButton
                    onClick={onResume}
                    title={t("host.controls.record")}
                    aria-label={t("host.controls.record")}
                    className="w-8 h-8 rounded-full hover:bg-white/10 text-white border-transparent"
                >
                    <PlayIcon className="w-4 h-4" />
                </S.IconButton>
            ) : (
                <S.IconButton
                    onClick={onPause}
                    title={t("host.controls.pause")}
                    aria-label={t("host.controls.pause")}
                    className="w-8 h-8 rounded-full hover:bg-white/10 text-white border-transparent"
                >
                    <PauseIcon className="w-4 h-4" />
                </S.IconButton>
            )}

            <S.IconButton
                onClick={onStop}
                title={t("host.controls.stopRecord")}
                aria-label={t("host.controls.stopRecord")}
                className="w-8 h-8 rounded-full bg-red-500 text-white hover:bg-red-600 border-transparent"
            >
                <StopIcon className="w-4 h-4 fill-current" />
            </S.IconButton>
        </div>
    );
});
