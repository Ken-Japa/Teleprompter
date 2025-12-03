import React from "react";
import { SeoPageLayout } from "./SeoPageLayout";

interface Props {
    onLaunch: () => void;
}

export const TeleprompterOnlineGratis: React.FC<Props> = ({ onLaunch }) => {
    return (
        <SeoPageLayout
            title="Teleprompter Online Grátis - Funciona no Navegador"
            description="Procurando um teleprompter online grátis? O PromptNinja funciona direto no seu navegador, sem baixar nada. Controle pelo celular via Wi-Fi."
            onLaunch={onLaunch}
        >
            <h1 className="text-4xl font-bold text-white mb-6">Teleprompter Online Grátis: A Solução Profissional no Seu Navegador</h1>

            <p className="mb-6">
                Se você está procurando uma maneira simples, rápida e gratuita de ler seus roteiros enquanto grava vídeos, você encontrou.
                O <strong>PromptNinja</strong> é um teleprompter online que roda direto no seu navegador (Chrome, Edge, Safari, Firefox) sem a necessidade de instalar programas pesados ou aplicativos que ocupam espaço no seu celular.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Por que usar um Teleprompter Online?</h2>
            <ul className="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Sem Downloads:</strong> Acesse e comece a usar imediatamente.</li>
                <li><strong>Compatibilidade Universal:</strong> Funciona em Windows, Mac, Linux, Android e iOS.</li>
                <li><strong>Sincronização em Tempo Real:</strong> Diferente de soluções básicas, o PromptNinja permite controlar a rolagem do texto usando outro dispositivo (como seu celular) como controle remoto.</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Como funciona o PromptNinja?</h2>
            <p className="mb-4">
                O PromptNinja utiliza tecnologia P2P (Peer-to-Peer) para conectar seus dispositivos. Isso significa que o controle é instantâneo e não depende de servidores lentos.
            </p>
            <ol className="list-decimal pl-6 mb-6 space-y-2">
                <li>Abra o PromptNinja no seu computador (onde o texto será exibido).</li>
                <li>Escaneie o QR Code com seu celular.</li>
                <li>Pronto! Seu celular virou um controle remoto para ajustar velocidade, tamanho da fonte e iniciar/pausar a rolagem.</li>
            </ol>

            <div className="my-8 p-6 bg-slate-900 rounded-lg border border-slate-800">
                <h3 className="text-xl font-bold text-primary mb-2">Comece agora mesmo</h3>
                <p className="mb-4">Não é necessário cadastro para testar. Experimente a liberdade de gravar vídeos com confiança.</p>
                <button
                    onClick={onLaunch}
                    className="px-6 py-3 bg-primary text-white font-bold rounded hover:bg-primary/90 transition-colors"
                >
                    Abrir Teleprompter Grátis
                </button>
            </div>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Recursos Gratuitos</h2>
            <p className="mb-6">
                A versão gratuita do PromptNinja oferece tudo o que você precisa para começar: espelhamento de texto (para usar com hardware de teleprompter), ajuste de velocidade, controle de fonte e muito mais.
            </p>
        </SeoPageLayout>
    );
};
