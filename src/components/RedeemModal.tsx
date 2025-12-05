import React from "react";
import * as S from "./ui/Styled";
import { useTranslation } from "../hooks/useTranslation";

interface RedeemModalProps {
  show: boolean;
  unlockKey: string;
  onUnlockKeyChange: (val: string) => void;
  onUnlock: () => void;
  onClose: () => void;
  errorMessage: string | null;
  isValidating: boolean;
}

export const RedeemModal: React.FC<RedeemModalProps> = ({
  show,
  unlockKey,
  onUnlockKeyChange,
  onUnlock,
  onClose,
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
        <S.PrimaryButton onClick={onUnlock} disabled={isValidating} className={isValidating ? "opacity-70 cursor-not-allowed" : ""}>
          {isValidating ? "Validando..." : t("host.paywall.button")}
        </S.PrimaryButton>

        <button
          onClick={() => window.open('https://pay.kiwify.com.br/dl571EZ', '_blank')}
          className="w-full py-3 px-6 bg-slate-800 hover:bg-slate-700 text-brand-300 hover:text-white font-bold rounded-xl transition-all duration-300 mt-2 border border-slate-700 hover:border-brand-500"
        >
          Assinar / Comprar
        </button>
      </div>
    </S.PaywallModal>
  );
};
