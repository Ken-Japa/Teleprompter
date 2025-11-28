import React from 'react';
import * as S from './Styled'; // Assuming Styled.tsx is in the same directory or accessible
import { useTranslation } from '../../hooks/useTranslation';

interface TutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TutorialModal: React.FC<TutorialModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <S.ModalHeader>
          <S.ModalTitle>{t('tutorial.title')}</S.ModalTitle>
          <S.CloseButton onClick={onClose}>&times;</S.CloseButton>
        </S.ModalHeader>
        <S.ModalBody>
          <S.StyledH3>{t('tutorial.overview.title')}</S.StyledH3>
          <S.StyledP>{t('tutorial.overview.description')}</S.StyledP>

          <S.StyledH3>{t('tutorial.howToUse.title')}</S.StyledH3>
          <S.StyledUl>
            <S.StyledLi><strong>{t('tutorial.howToUse.step1.title')}:</strong> {t('tutorial.howToUse.step1.description')}</S.StyledLi>
            <S.StyledLi><strong>{t('tutorial.howToUse.step2.title')}:</strong> {t('tutorial.howToUse.step2.description')}</S.StyledLi>
            <S.StyledLi><strong>{t('tutorial.howToUse.step3.title')}:</strong> {t('tutorial.howToUse.step3.description')}</S.StyledLi>
          </S.StyledUl>

          <S.StyledH3>{t('tutorial.advancedFeatures.title')}</S.StyledH3>
          <S.StyledUl>
            <S.StyledLi><strong>{t('tutorial.advancedFeatures.voiceControl.title')}:</strong> {t('tutorial.advancedFeatures.voiceControl.description')}</S.StyledLi>
            <S.StyledLi><strong>{t('tutorial.advancedFeatures.themes.title')}:</strong> {t('tutorial.advancedFeatures.themes.description')}</S.StyledLi>
            <S.StyledLi><strong>{t('tutorial.advancedFeatures.focusMode.title')}:</strong> {t('tutorial.advancedFeatures.focusMode.description')}</S.StyledLi>
          </S.StyledUl>

          <S.StyledH3>{t('tutorial.tips.title')}</S.StyledH3>
          <S.StyledUl>
            <S.StyledLi>{t('tutorial.tips.tip1')}</S.StyledLi>
            <S.StyledLi>{t('tutorial.tips.tip2')}</S.StyledLi>
          </S.StyledUl>
        </S.ModalBody>
      </S.ModalContent>
    </S.ModalOverlay>
  );
};
