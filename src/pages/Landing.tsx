import React from "react";
import * as S from "../components/ui/Styled";
import { Header } from "../components/landing/Header";
import { Hero } from "../components/landing/Hero";
import { Features } from "../components/landing/Features";
import { Pricing } from "../components/landing/Pricing";
import { useTranslation } from "../hooks/useTranslation";

interface LandingProps {
 onLaunch: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onLaunch }) => {
 const { t } = useTranslation();
 return (
  <S.LandingContainer>
   <Header onLaunch={onLaunch} />
   <Hero onLaunch={onLaunch} />
   <Features />
   <Pricing onLaunch={onLaunch} />

   <footer className="py-12 border-t border-slate-900 text-center text-slate-500 text-sm">
    <p>&copy; {new Date().getFullYear()} {t("footer.copyright")}</p>
   </footer>
  </S.LandingContainer>
 );
};
