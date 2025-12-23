import React from "react";
import * as S from "./ui/Styled";
import { useTranslation } from "../hooks/useTranslation";
import { trackEvent, trackGoogleAdsInterest } from "../utils/analytics";

interface RedeemModalProps {
  show: boolean;
  unlockKey: string;
  onUnlockKeyChange: (val: string) => void;
  onUnlock: () => void;
  onClose: () => void;
  onOpenFeedback?: () => void;
  errorMessage: string | null;
  isValidating: boolean;
  isTrialActive?: boolean;
  trialEndTime?: number | null;
  onStartTrial?: () => void;
}

export const RedeemModal: React.FC<RedeemModalProps> = ({
  show,
  unlockKey,
  onUnlockKeyChange,
  onUnlock,
  onClose,
  onOpenFeedback,
  errorMessage,
  isValidating,
  isTrialActive,
  trialEndTime,
  onStartTrial
}) => {
  const { t } = useTranslation();

  const hasTrialRecentlyExpired = !isTrialActive && trialEndTime && trialEndTime < Date.now();

  const title = hasTrialRecentlyExpired ? t("host.paywall.trialExpiredTitle") : t("host.paywall.title");
  const desc = hasTrialRecentlyExpired ? t("host.paywall.trialExpiredDesc") : t("host.paywall.desc");

  if (!show) return null;

  return (
    <S.PaywallModal title={title} desc={desc} onClose={onClose}>
      <div className="flex flex-col space-y-5">
        {errorMessage && (
          <p className="text-red-500 text-center text-sm">{errorMessage}</p>
        )}
        <input
          type="text"
          placeholder={t("host.paywall.inputPlaceholder")}
          value={unlockKey}
          onChange={(e) => onUnlockKeyChange(e.target.value)}
          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white text-center font-mono tracking-widest uppercase focus:outline-none focus:border-brand-500 transition-colors disabled:opacity-50"
          disabled={isValidating}
        />
        <S.PrimaryButton onClick={() => { trackEvent('paywall_cta_click', { cta_type: 'redeem_key' }); onUnlock(); }} disabled={isValidating} className={isValidating ? "opacity-70 cursor-not-allowed" : ""}>
          {isValidating ? "Validando..." : t("host.paywall.button")}
        </S.PrimaryButton>

        <button
          onClick={() => { trackEvent('paywall_cta_click', { cta_type: 'buy_subscription' }); trackGoogleAdsInterest('https://pay.kiwify.com.br/dl571EZ'); }}
          className="w-full py-3 px-6 bg-slate-800 hover:bg-slate-700 text-brand-300 hover:text-white font-bold rounded-xl transition-all duration-300 mt-2 border border-slate-700 hover:border-brand-500"
        >
          Assinar / Comprar
        </button>

        <div className="text-center mt-6 pt-6 border-t border-slate-700">
          {!isTrialActive && onStartTrial && (
            <button
              onClick={() => {
                trackEvent('paywall_cta_click', { cta_type: 'start_trial' });
                onStartTrial();
              }}
              className="w-full py-3 px-6 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl transition-all duration-300 mt-2 border border-brand-400 group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                ⚡ {t("host.paywall.trialButton")}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            </button>
          )}

          {isTrialActive && trialEndTime && (
            <div className="bg-brand-500/10 border border-brand-500/20 rounded-xl p-3 text-center">
              <p className="text-brand-400 font-bold text-sm flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-brand-500 rounded-full animate-pulse"></span>
                {t("host.paywall.trialActive")}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                {t("host.paywall.faltam")} {Math.max(0, Math.floor((trialEndTime - Date.now()) / (1000 * 60 * 60)))}h {Math.max(0, Math.floor(((trialEndTime - Date.now()) / (1000 * 60)) % 60))}min
              </p>
            </div>
          )}

          <p className="text-sm text-slate-400 mt-6 mb-3 font-semibold">
            {t("host.paywall.freeAlternativeTitle")}
          </p>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => {
                trackEvent('paywall_cta_click', { cta_type: 'leave_review_free' });
                window.open('https://search.google.com/local/writereview?placeid=ChIJdcYvDRJ7y5QR-6UakXLxbkg', '_blank');
                onClose();
              }}
              className="w-full py-2 px-4 text-sm text-blue-400 hover:text-blue-200 transition-colors"
            >
              {t("host.paywall.leaveReviewCta")}
            </button>

            {onOpenFeedback && (
              <button
                onClick={onOpenFeedback}
                className="w-full pt-2 px-4 text-2xs text-slate-500 hover:text-slate-300 transition-colors flex items-center justify-center gap-2"
              >
                <span>{t("host.paywall.feedbackQuestion")}</span>
                <span className="underline">{t("host.paywall.feedbackAction")}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </S.PaywallModal>
  );
};
