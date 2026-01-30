import React, { useState } from "react";
import { useTranslation } from "../../hooks/useTranslation";
import { ZapIcon, SmartphoneIcon, ApertureIcon } from "./Icons";
import * as S from "./Styled";

interface OnboardingDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

const icons = {
    camera: <ApertureIcon className="w-8 h-8" />,
    remote: <SmartphoneIcon className="w-8 h-8" />,
    pro: <ZapIcon className="w-8 h-8 text-brand-400" />,
};

export const OnboardingDialog: React.FC<OnboardingDialogProps> = ({ isOpen, onClose }) => {
    const { t } = useTranslation();
    const [currentStep, setCurrentStep] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const steps = t("onboarding.steps", { returnObjects: true }) as unknown as any[];

    if (!isOpen || !steps || !Array.isArray(steps)) return null;

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentStep(prev => prev + 1);
                setIsAnimating(false);
            }, 200);
        } else {
            onClose();
        }
    };

    return (
        <S.Modal isOpen={isOpen} onClose={onClose} title={t("onboarding.title")}>
            <div className="relative min-h-[300px] flex flex-col justify-between">
                <div className={`transition-all duration-300 transform ${isAnimating ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0"}`}>
                    <div className="py-4">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-brand-400 shadow-xl group">
                                <div className="group-hover:scale-110 transition-transform duration-300">
                                    {icons[steps[currentStep].icon as keyof typeof icons] || <ZapIcon />}
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-white">{steps[currentStep].title}</h3>
                        </div>
                        <p className="text-lg text-slate-400 leading-relaxed">
                            {steps[currentStep].desc}
                        </p>
                    </div>
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-6">
                    <div className="flex gap-2">
                        {steps.map((_, idx) => (
                            <div
                                key={idx}
                                className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentStep ? "w-8 bg-brand-500" : "w-2 bg-white/10"
                                    }`}
                            />
                        ))}
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
                        >
                            {t("onboarding.skip")}
                        </button>
                        <button
                            onClick={handleNext}
                            className="px-6 py-2 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-brand-500/20"
                        >
                            {currentStep === steps.length - 1 ? t("onboarding.finish") : t("onboarding.cta")}
                        </button>
                    </div>
                </div>
            </div>
        </S.Modal>
    );
};
