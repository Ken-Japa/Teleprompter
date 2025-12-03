import React from "react";
import { SeoPageLayout } from "./SeoPageLayout";

interface Props {
    onLaunch: () => void;
}

export const TeleprompterParaYoutubers: React.FC<Props> = ({ onLaunch }) => {
    return (
        <SeoPageLayout
            title="Melhor Teleprompter para YouTubers e Criadores de Curso"
            description="Grave vídeos longos sem errar o texto. Descubra como o PromptNinja ajuda YouTubers e professores online a gravar aulas perfeitas."
            onLaunch={onLaunch}
        >
            <h1 className="text-4xl font-bold text-white mb-6">Teleprompter para YouTubers: O Segredo da Produtividade</h1>
            
            <p className="mb-6">
                Você já passou horas gravando um vídeo de 10 minutos porque ficava esquecendo o que falar? Para YouTubers e criadores de cursos online, tempo é dinheiro. O teleprompter não é "trapaça", é uma ferramenta de eficiência.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Como gravar vídeo-aulas longas sem cortes?</h2>
            <p className="mb-4">
                O segredo dos grandes canais de educação é o uso do teleprompter. Ele permite que você mantenha contato visual constante com a câmera (e com seu aluno), passando mais autoridade e confiança.
            </p>
            <p className="mb-4">
                O <strong>PromptNinja</strong> foi desenhado pensando nesse fluxo de trabalho:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Edição de Texto Rápida:</strong> Cole seu roteiro e ajuste o tamanho da fonte para leitura confortável à distância.</li>
                <li><strong>Sem App na Câmera:</strong> Use seu notebook como tela principal e seu celular apenas para controlar a velocidade.</li>
                <li><strong>Voice Control (Pro):</strong> O texto rola automaticamente conforme você fala (recurso avançado).</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Ideal para Setups de Home Studio</h2>
            <p className="mb-6">
                Se você grava sozinho em casa, sabe como é chato ter que levantar para ajustar o equipamento. Com o controle remoto via Wi-Fi do PromptNinja, você senta na cadeira, prepara a iluminação e controla tudo pelo celular na sua mão.
            </p>

            <div className="text-center mt-10">
                <button 
                    onClick={onLaunch}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-2xl hover:scale-105 transition transform duration-200"
                >
                    Começar a Gravar Agora
                </button>
            </div>
        </SeoPageLayout>
    );
};
