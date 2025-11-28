import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import * as S from '../ui/Styled';
import { MagicIcon, MicIcon, PaletteIcon, ShieldIcon, ZapIcon, CrownIcon } from '../ui/Icons';

export const Features: React.FC = () => {
    const { t } = useTranslation();

    return (
        <section id="features" className="py-24 bg-slate-950 relative">
            <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
                <S.FeatureCard 
                    icon={<ZapIcon className="w-6 h-6" />}
                    title={t('landing.features.sync.title')}
                    desc={t('landing.features.sync.desc')}
                />
                <S.FeatureCard 
                    icon={<MicIcon className="w-6 h-6" />}
                    title={t('landing.features.voice.title')}
                    desc={t('landing.features.voice.desc')}
                />
                 <S.FeatureCard 
                    icon={<MagicIcon className="w-6 h-6" />}
                    title={t('landing.features.focus.title')}
                    desc={t('landing.features.focus.desc')}
                />
                <S.FeatureCard 
                    icon={<PaletteIcon className="w-6 h-6" />}
                    title={t('landing.features.themes.title')}
                    desc={t('landing.features.themes.desc')}
                />
                <S.FeatureCard 
                    icon={<ShieldIcon className="w-6 h-6" />}
                    title={t('landing.features.offline.title')}
                    desc={t('landing.features.offline.desc')}
                />
                <S.FeatureCard 
                    icon={<CrownIcon className="w-6 h-6" />}
                    title={t('landing.features.privacy.title')}
                    desc={t('landing.features.privacy.desc')}
                />
            </div>
        </section>
    );
};