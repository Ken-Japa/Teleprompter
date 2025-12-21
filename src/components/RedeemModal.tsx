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
}

export const RedeemModal: React.FC<RedeemModalProps> = ({
  show,
  unlockKey,
  onUnlockKeyChange,
  onUnlock,
  onClose,
  onOpenFeedback,
  errorMessage,
  isValidating
}) => {
  const { t } = useTranslation();

  if (!show) return null;

  return (
    <S.PaywallModal title={t("host.paywall.title")} desc={t("host.paywall.desc")} onClose={onClose}>
      <div className="flex flex-col space-y-3">
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
          <p className="text-sm text-slate-400 mb-3 font-semibold">
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
                className="w-full py-2 px-4 text-xs text-slate-500 hover:text-slate-300 transition-colors flex items-center justify-center gap-2"
              >
                <span>Tem críticas ou sugestões?</span>
                <span className="underline">Dê seu feedback</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </S.PaywallModal>
  );
};
