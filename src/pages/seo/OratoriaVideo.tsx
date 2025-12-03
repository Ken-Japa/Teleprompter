import React from "react";
import { SeoPageLayout } from "./SeoPageLayout";

interface Props {
    onLaunch: () => void;
}

export const OratoriaVideo: React.FC<Props> = ({ onLaunch }) => {
    return (
        <SeoPageLayout
            title="Dicas de Oratória para Vídeo: Como Falar com Confiança"
            description="Melhore sua presença em frente às câmeras. Aprenda técnicas de oratória e descubra como o teleprompter pode ajudar a eliminar os 'ééé' e 'hmmm' dos seus vídeos."
            onLaunch={onLaunch}
        >
            <p className="lead text-xl text-slate-300 mb-8">
                Falar para uma lente fria de vidro não é natural. Mesmo grandes palestrantes travam quando a luz "REC" acende. A boa notícia é que carisma em vídeo é uma habilidade treinável.
            </p>

            <h2>1. O Poder do Contato Visual</h2>
            <p>
                Em uma conversa real, olhamos nos olhos. Em vídeo, o "olho" é a lente da câmera.
                Muitos criadores cometem o erro de olhar para a tela do celular (para se verem) ou para o lado. Isso quebra a conexão com o espectador.
            </p>
            <div className="bg-slate-900 p-6 rounded-lg border-l-4 border-purple-500 my-8">
                <h4 className="text-white font-bold mb-2">Dica Profissional</h4>
                <p className="mb-0">
                    Use um Teleprompter. Ele projeta o texto diretamente na frente da lente, permitindo que você leia enquanto mantém contato visual perfeito com seu público.
                </p>
            </div>

            <h2>2. Elimine os Vícios de Linguagem</h2>
            <p>
                "Ééé...", "Tipo assim...", "Né?". Esses sons de preenchimento acontecem quando seu cérebro está buscando a próxima palavra.
                Quando você tem um roteiro bem escrito rolando na sua frente, seu cérebro não precisa "buscar" nada. Você apenas entrega a mensagem com fluidez.
            </p>

            <h2>3. A Regra da Energia + 10%</h2>
            <p>
                A câmera "rouba" parte da sua energia. O que parece normal ao vivo, parece desanimado em vídeo. Ao gravar, tente elevar sua energia e entonação em 10% a 20% acima do normal.
            </p>

            <h2>4. Prepare um Roteiro (Script)</h2>
            <p>
                A improvisação é inimiga da retenção. Os vídeos mais assistidos do YouTube são roteirizados palavra por palavra.
                Isso garante que você vá direto ao ponto e respeite o tempo de quem assiste.
            </p>

            <div className="mt-12 text-center">
                <button 
                    onClick={onLaunch}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-2xl hover:scale-105 transition transform duration-200"
                >
                    Praticar com Teleprompter Grátis
                </button>
                <p className="mt-4 text-sm text-slate-500">Comece a gravar vídeos profissionais hoje mesmo.</p>
            </div>
        </SeoPageLayout>
    );
};
