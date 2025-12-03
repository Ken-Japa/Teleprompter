import React from "react";
import { SeoPageLayout } from "./SeoPageLayout";

interface Props {
    onLaunch: () => void;
}

export const TeleprompterTravandoSolucao: React.FC<Props> = ({ onLaunch }) => {
    return (
        <SeoPageLayout
            title="Teleprompter Travando ou Pulando Texto? Veja a Solução"
            description="Seu app de teleprompter está travando ou o texto não rola suavemente? Entenda por que isso acontece e como o PromptNinja resolve com P2P."
            onLaunch={onLaunch}
        >
            <h1 className="text-4xl font-bold text-white mb-6">Teleprompter Travando: Por que acontece e como resolver</h1>

            <p className="mb-6">
                Não há nada pior do que estar no meio de uma gravação perfeita e o texto do teleprompter travar ou dar um "pulo" brusco. Isso quebra seu ritmo e arruina o vídeo.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Por que os apps tradicionais travam?</h2>
            <ul className="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Uso de CPU:</strong> Apps mal otimizados consomem muita bateria e processamento.</li>
                <li><strong>Conexão Bluetooth Instável:</strong> Muitos controles remotos bluetooth perdem conexão e causam "lags" na rolagem.</li>
                <li><strong>Dependência de Internet Lenta:</strong> Teleprompters online antigos dependem de servidores lentos para sincronizar.</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">A Solução P2P do PromptNinja</h2>
            <p className="mb-4">
                O PromptNinja utiliza uma tecnologia diferente chamada WebRTC Data Channels (P2P). Isso cria um "túnel" direto entre seu celular (controle) e seu computador (tela), através da sua rede Wi-Fi local.
            </p>
            <p className="mb-6">
                <strong>O resultado?</strong> Latência quase zero. Quando você aperta "pausa" no celular, o texto para instantaneamente na tela. A rolagem é suave (60fps) porque usamos o motor de renderização do navegador moderno.
            </p>

            <div className="bg-slate-900 p-6 rounded border-l-4 border-red-500 mb-8">
                <h3 className="text-lg font-bold text-white mb-2">Pare de sofrer com travamentos</h3>
                <p className="text-slate-300">
                    Teste a fluidez do PromptNinja agora. Seus olhos (e sua audiência) vão agradecer.
                </p>
            </div>

            <div className="text-center mt-10">
                <button
                    onClick={onLaunch}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-2xl hover:scale-105 transition transform duration-200"
                >
                    Testar Rolagem Suave (Grátis)
                </button>
            </div>
        </SeoPageLayout>
    );
};
