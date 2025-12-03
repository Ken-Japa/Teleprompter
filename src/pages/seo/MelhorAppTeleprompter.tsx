import React from "react";
import { SeoPageLayout } from "./SeoPageLayout";

interface Props {
    onLaunch: () => void;
}

export const MelhorAppTeleprompter: React.FC<Props> = ({ onLaunch }) => {
    return (
        <SeoPageLayout
            title="Melhor App de Teleprompter para Celular e PC (2025)"
            description="Comparativo dos melhores aplicativos de teleprompter. Descubra qual é o melhor app grátis, com controle remoto e espelhamento."
            onLaunch={onLaunch}
        >
            <h1 className="text-4xl font-bold text-white mb-6">Qual é o Melhor App de Teleprompter em 2025?</h1>
            
            <p className="mb-6">
                Com tantas opções na App Store e Google Play, escolher o melhor aplicativo de teleprompter pode ser confuso. Analisamos as principais opções baseadas em facilidade de uso, custo e funcionalidades.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">O que define um bom Teleprompter?</h2>
            <ul className="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Controle Remoto:</strong> Essencial para não ter que levantar a cada erro.</li>
                <li><strong>Espelhamento (Mirroring):</strong> Obrigatório para quem usa espelhos profissionais (Beam Splitter).</li>
                <li><strong>Multi-plataforma:</strong> Funcionar no PC, Mac e Celular.</li>
                <li><strong>Preço:</strong> Ninguém gosta de assinaturas caras para funções básicas.</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Top 3 Melhores Opções</h2>

            <div className="space-y-8">
                <div className="bg-slate-900 p-6 rounded-lg border border-primary/30">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-white">1. PromptNinja (Vencedor Geral)</h3>
                        <span className="px-3 py-1 bg-primary text-xs font-bold rounded text-white">Recomendado</span>
                    </div>
                    <p className="mb-4 text-sm">
                        O PromptNinja se destaca por não exigir instalação e oferecer controle remoto P2P gratuito. É a solução mais versátil para criadores modernos.
                    </p>
                    <ul className="text-sm space-y-1 text-slate-400">
                        <li>✅ Funciona no Navegador (Sem App)</li>
                        <li>✅ Controle Remoto via Wi-Fi</li>
                        <li>✅ Modo Espelho Grátis</li>
                        <li>✅ Reconhecimento de Voz (Versão Pro)</li>
                    </ul>
                </div>

                <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
                    <h3 className="text-xl font-bold text-white mb-2">2. Teleprompter Pro (Clássico)</h3>
                    <p className="mb-4 text-sm">
                        Um app sólido para iPad e Android, muito usado em estúdios antigos.
                    </p>
                    <ul className="text-sm space-y-1 text-slate-400">
                        <li>✅ Bom para iPads antigos</li>
                        <li>❌ Requer instalação</li>
                        <li>❌ Controle remoto geralmente pago à parte</li>
                    </ul>
                </div>

                <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
                    <h3 className="text-xl font-bold text-white mb-2">3. CapCut (Básico)</h3>
                    <p className="mb-4 text-sm">
                        O editor de vídeo popular tem um teleprompter embutido. Ótimo para vídeos curtos de TikTok.
                    </p>
                    <ul className="text-sm space-y-1 text-slate-400">
                        <li>✅ Integrado à câmera</li>
                        <li>❌ Tela pequena (apenas celular)</li>
                        <li>❌ Sem controle remoto externo</li>
                    </ul>
                </div>
            </div>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Veredito</h2>
            <p className="mb-6">
                Se você precisa gravar vídeos rápidos no celular, o CapCut resolve. Mas se você busca uma solução profissional, com tela grande (PC/Tablet) e controle remoto, o <strong>PromptNinja</strong> é a melhor escolha custo-benefício.
            </p>

            <div className="text-center mt-8">
                <button 
                    onClick={onLaunch}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-2xl hover:scale-105 transition transform duration-200"
                >
                    Experimentar o Vencedor (Grátis)
                </button>
            </div>
        </SeoPageLayout>
    );
};
