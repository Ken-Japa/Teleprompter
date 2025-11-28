import React from "react";
import { ConnectionStatus } from "../types";
import { MinusIcon, PauseIcon, PlayIcon, PlusIcon } from "../components/ui/Icons";
import { useTranslation } from "../hooks/useTranslation";
import * as S from "../components/ui/Styled";
import { Trackpad } from "../components/remote/Trackpad";
import { ConnectionState } from "../components/remote/ConnectionState";
import { useRemoteController } from "../hooks/useRemoteController";

interface RemoteProps {
  hostId: string;
}

export const Remote: React.FC<RemoteProps> = ({ hostId }) => {
  const { t } = useTranslation();

  const { state, actions } = useRemoteController(hostId);
  const { status, isPlaying, speed, progress, errorMessage } = state;

  return (
    <S.ScreenContainer className="bg-[#020617]">
      {errorMessage && <S.ErrorToast message={errorMessage} />}
      <S.Header>
        <S.LogoText main={t("title.main")} sub={t("title.remote")} />
        <S.StatusBadge status={status} label={t(`status.${status.toLowerCase()}`)} />
      </S.Header>

      {status === ConnectionStatus.CONNECTED && <S.ProgressBar progress={progress} />}

      <div className="flex-1 flex flex-col relative overflow-hidden">
        {status !== ConnectionStatus.CONNECTED ? (
          <ConnectionState status={status} hostId={hostId} />
        ) : (
          <>
            <Trackpad
              label={t("remote.touchArea")}
              onDelta={actions.handleTrackpadDelta}
              onStop={actions.handleTrackpadStop}
            />

            <S.ControlsContainer>
              <div className="flex items-center justify-between px-6 pb-safe gap-6">
                {/* Speed Control Pill */}
                <div className="flex flex-col items-center bg-white/5 p-3 rounded-3xl border border-white/5 backdrop-blur-md">
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                    {t("remote.speed")}
                  </span>
                  <div className="flex flex-col items-center gap-2">
                    <S.IconButton
                      onClick={() => actions.handleSpeedChange(Math.min(10, speed + 0.5))}
                      className="w-12 h-12 !rounded-2xl !bg-white/10 hover:!bg-white/20 border-white/10"
                    >
                      <PlusIcon />
                    </S.IconButton>
                    <span className="font-mono text-2xl font-black text-indigo-400 min-w-[3ch] text-center my-1 drop-shadow-md">
                      {speed.toFixed(1)}
                    </span>
                    <S.IconButton
                      onClick={() => actions.handleSpeedChange(Math.max(0, speed - 0.5))}
                      className="w-12 h-12 !rounded-2xl !bg-white/10 hover:!bg-white/20 border-white/10"
                    >
                      <MinusIcon />
                    </S.IconButton>
                  </div>
                </div>

                {/* Big Play Button */}
                <button
                  onClick={actions.handlePlayToggle}
                  className={`flex-1 h-44 rounded-[2.5rem] shadow-2xl transition-all duration-300 active:scale-95 border-t border-white/10 flex flex-col items-center justify-center gap-3 relative overflow-hidden group ${isPlaying
                      ? "bg-gradient-to-b from-amber-500 to-amber-600 text-white shadow-[0_0_60px_-10px_rgba(245,158,11,0.4)]"
                      : "bg-gradient-to-b from-indigo-600 to-indigo-700 text-white shadow-[0_0_60px_-10px_rgba(79,70,229,0.4)] hover:shadow-[0_0_80px_-10px_rgba(79,70,229,0.6)]"
                    }`}
                >
                  {/* Inner Highlight */}
                  <div className="absolute inset-x-0 top-0 h-[1px] bg-white/40"></div>

                  <div className="relative z-10 flex flex-col items-center">
                    {isPlaying ? (
                      <PauseIcon className="w-16 h-16 fill-current drop-shadow-lg" />
                    ) : (
                      <PlayIcon className="w-16 h-16 fill-current ml-2 drop-shadow-lg" />
                    )}
                    <span className="text-xs font-bold uppercase tracking-[0.2em] opacity-80 mt-2">
                      {isPlaying ? t("remote.pause") : t("remote.start")}
                    </span>
                  </div>
                </button>
              </div>
            </S.ControlsContainer>
          </>
        )}
      </div>
    </S.ScreenContainer>
  );
};
