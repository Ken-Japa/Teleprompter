import React from "react";
import { useTranslation } from "../../hooks/useTranslation";
import * as S from "../ui/Styled";
import { CheckIcon } from "../ui/Icons";

interface PricingProps {
 onLaunch: () => void;
}

export const Pricing: React.FC<PricingProps> = ({ onLaunch }) => {
 const { t } = useTranslation();

 return (
  <section id="pricing" className="py-24 relative overflow-hidden">
   <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none -z-10" />

   <div className="max-w-6xl mx-auto px-6">
    <div className="text-center mb-16">
     <h2 className="text-3xl font-bold text-white mb-4">{t("landing.pricing.title")}</h2>
     <p className="text-slate-400">{t("landing.pricing.subtitle")}</p>
    </div>

    <S.PricingCard
     title={t("landing.pricing.lifetime")}
     price={t("landing.pricing.price")}
     oneTime={t("landing.pricing.oneTime")}
     subtitle={t("landing.pricing.cta")}
     onClick={onLaunch}
    >
     {(t("landing.pricing.features") as unknown as string[]).map((feat, i) => (
      <li key={i} className="flex items-center space-x-3 text-slate-300">
       <CheckIcon className="w-5 h-5 text-emerald-400 flex-shrink-0" />
       <span className="text-sm">{feat}</span>
      </li>
     ))}
    </S.PricingCard>
   </div>
  </section>
 );
};
