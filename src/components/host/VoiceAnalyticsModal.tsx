import tw from "tailwind-styled-components";
import {
    Modal,
    ModalBody,
    StyledP
} from "../ui/styles/Modal";
import { useTranslation } from "../../hooks/useTranslation";

const StatsGrid = tw.div`
  grid grid-cols-2 gap-4 my-8
`;

const StatCard = tw.div`
  bg-white/5 border border-white/10 rounded-2xl p-5
  flex flex-col items-center justify-center
  transition-all duration-300 hover:bg-white/10 hover:border-white/20
  group
`;

const StatValue = tw.span`
  text-3xl font-bold text-white mb-1
  bg-gradient-to-br from-white to-slate-400 bg-clip-text text-transparent
`;

const StatLabel = tw.span`
  text-xs font-semibold text-slate-400 uppercase tracking-widest
  group-hover:text-brand-400 transition-colors
`;

const IconWrapper = tw.div`
  text-2xl mb-3 text-brand-400
`;

const SuccessBadge = tw.div`
  bg-brand-500/20 text-brand-400 px-4 py-2 rounded-full
  text-sm font-bold flex items-center gap-2 mx-auto mb-6 w-fit
  border border-brand-500/30 animate-bounce-subtle
`;

const ActionButton = tw.button`
  w-full py-4 rounded-xl bg-gradient-to-r from-brand-500 to-violet-600
  text-white font-bold text-lg shadow-lg shadow-brand-500/20
  hover:from-brand-600 hover:to-violet-700 transition-all
  active:scale-95 mt-4
`;

interface VoiceAnalyticsModalProps {
    isOpen: boolean;
    onClose: () => void;
    summary: {
        duration: number;
        averageWPM: number;
        accuracy: number;
        sentencesCompleted: number;
    } | null;
}

export const VoiceAnalyticsModal = ({ isOpen, onClose, summary }: VoiceAnalyticsModalProps) => {
    const { t } = useTranslation();

    if (!summary) return null;

    const formatDuration = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}m ${secs}s`;
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={t("voice_analytics.title") || "Apresentação Concluída"}
        >
            <ModalBody>
                <SuccessBadge>
                    <span>✨</span>
                    <span>{t("voice_analytics.congratulations") || "Incrível! Você terminou o script."}</span>
                </SuccessBadge>

                <StyledP className="text-center text-slate-400">
                    {t("voice_analytics.subtitle") || "Aqui está o resumo do seu desempenho nesta sessão:"}
                </StyledP>

                <StatsGrid>
                    <StatCard>
                        <IconWrapper>⏱️</IconWrapper>
                        <StatValue>{formatDuration(summary.duration)}</StatValue>
                        <StatLabel>{t("voice_analytics.duration") || "Duração"}</StatLabel>
                    </StatCard>

                    <StatCard>
                        <IconWrapper>🚀</IconWrapper>
                        <StatValue>{summary.averageWPM}</StatValue>
                        <StatLabel>{t("voice_analytics.wpm") || "WPM (Velocidade)"}</StatLabel>
                    </StatCard>

                    <StatCard>
                        <IconWrapper>🎯</IconWrapper>
                        <StatValue>{summary.accuracy}%</StatValue>
                        <StatLabel>{t("voice_analytics.accuracy") || "Precisão"}</StatLabel>
                    </StatCard>

                    <StatCard>
                        <IconWrapper>📖</IconWrapper>
                        <StatValue>{summary.sentencesCompleted}</StatValue>
                        <StatLabel>{t("voice_analytics.sentences") || "Frases"}</StatLabel>
                    </StatCard>
                </StatsGrid>

                <ActionButton onClick={onClose}>
                    {t("voice_analytics.close") || "Fechar Resumo"}
                </ActionButton>
            </ModalBody>
        </Modal>
    );
};
