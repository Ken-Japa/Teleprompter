import React from 'react';
import * as S from '../components/ui/Styled';
import { Header } from '../components/landing/Header';
import { Hero } from '../components/landing/Hero';
import { Features } from '../components/landing/Features';
import { Pricing } from '../components/landing/Pricing';

interface LandingProps {
    onLaunch: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onLaunch }) => {
    return (
        <S.LandingContainer>
            <Header onLaunch={onLaunch} />
            <Hero onLaunch={onLaunch} />
            <Features />
            <Pricing onLaunch={onLaunch} />

            <footer className="py-12 border-t border-slate-900 text-center text-slate-500 text-sm">
                <p>&copy; {new Date().getFullYear()} PromptNinja. All rights reserved.</p>
            </footer>
        </S.LandingContainer>
    );
};