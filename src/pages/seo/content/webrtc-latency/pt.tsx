import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";

export const WebRtcLatencyContentPT = () => (
    <>
        <h2 className="text-4xl font-bold text-white mb-6 leading-tight">Por que o PromptNinja é Mais Rápido que o Bluetooth? (A Ciência da Latência)</h2>

        <p className="lead text-xl text-slate-300 mb-8">
            Você aperta "Pausa". O texto continua rolando por mais meio segundo. Você se perde. Precisa regravar.
            Esse atraso invisível chama-se <strong>latência</strong>, e é o inimigo número 1 da fluidez.
        </p>

        <div className="bg-slate-800 p-8 rounded-xl border border-blue-500/30 mb-12">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">A Corrida dos Dados: Via Satélite vs Via Local</h3>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-red-900/10 p-4 rounded border border-red-500/20 opacity-70">
                    <h3 className="font-bold text-red-400 mb-2">🐢 Apps Tradicionais (Cloud)</h3>
                    <div className="font-mono text-xs text-slate-400 mb-2">
                        [Celular] ➡️ [Roteador] ➡️ [Provedor] ➡️ [Servidor EUA] ➡️ [Processamento] ➡️ [Volta p/ Brasil] ➡️ [PC]
                    </div>
                    <p className="text-slate-300 text-sm">
                        É como enviar uma carta para o vizinho via correio internacional. O sinal viaja 10.000km para andar 2 metros.
                        <br /><span className="font-bold text-red-400">Latência: 200ms - 800ms</span> (Perceptível)
                    </p>
                </div>

                <div className="bg-green-900/10 p-4 rounded border border-green-500/50">
                    <h3 className="font-bold text-green-400 mb-2">🚀 PromptNinja (WebRTC P2P)</h3>
                    <div className="font-mono text-xs text-slate-400 mb-2">
                        [Celular] ➡️ [Roteador Wi-Fi] ➡️ [PC]
                    </div>
                    <p className="text-slate-300 text-sm">
                        É como gritar pela janela. O sinal não sai da sua casa. Ele viaja na velocidade da luz pela sua rede Wi-Fi local.
                        <br /><span className="font-bold text-green-400">Latência: &lt; 10ms</span> (Instantâneo)
                    </p>
                </div>
            </div>
        </div>

        <h3 className="text-3xl font-bold text-white mt-12 mb-6">Por que milissegundos importam?</h3>
        <p className="text-slate-300 mb-6">
            O cérebro humano percebe qualquer atraso acima de 100ms como "lag".
        </p>
        <ul className="list-disc pl-6 mb-8 text-slate-300 space-y-3">
            <li><strong>Sincronia Labial:</strong> Se você lê e o texto não acompanha, você começa a falar mais devagar inconscientemente, parecendo "robótico".</li>
            <li><strong>Ajustes Sutis:</strong> Com latência zero, você pode acelerar levemente em trechos fáceis e frear em palavras difíceis em tempo real, como dirigir um carro esportivo.</li>
            <li><strong>Confiança:</strong> Saber que o botão de "Pausa" funciona na hora tira a ansiedade da gravação ao vivo.</li>
        </ul>

        <h3 className="text-3xl font-bold text-white mt-12 mb-6">A Tecnologia Sob o Capô</h3>
        <p className="text-slate-300 mb-6">
            Usamos <strong>WebRTC Data Channels</strong> com protocolo UDP.
        </p>

        <div className="grid sm:grid-cols-2 gap-6 mb-12">
            <div className="bg-slate-800 p-5 rounded-lg border-l-4 border-purple-500">
                <h3 className="font-bold text-white mb-2">Sem Servidor no Meio</h3>
                <p className="text-sm text-slate-400">
                    Nossos servidores apenas "apresentam" os dispositivos (como um app de namoro). Depois do match, eles saem da conversa e deixam vocês sozinhos. Menos intermediários = Menos Lag.
                </p>
            </div>
            <div className="bg-slate-800 p-5 rounded-lg border-l-4 border-yellow-500">
                <h3 className="font-bold text-white mb-2">Protocolo UDP (Velocidade Pura)</h3>
                <p className="text-sm text-slate-400">
                    A maioria da web usa TCP (seguro, mas lento). Nós usamos UDP para controles. Ele não perde tempo checando recibos de entrega. Ele apenas entrega a ordem de "PLAY" imediatamente.
                </p>
            </div>
        </div>

        <SEOContentFAQ
            title="Dúvidas Técnicas sobre Latência"
            items={[
                {
                    question: "Funciona se a internet for lenta?",
                    answer: "Sim! A latência do PromptNinja depende da qualidade do seu Roteador Wi-Fi, não da velocidade da sua internet da operadora. Se o roteador for bom, a conexão será instantânea mesmo com internet discada."
                },
                {
                    question: "Por que às vezes demora para conectar?",
                    answer: "O processo inicial de 'Handshake' (encontrar os dispositivos) pode levar alguns segundos dependendo de firewalls corporativos. Mas uma vez conectado, a latência do controle cai para zero."
                },
                {
                    question: "É mais rápido que controle Bluetooth físico?",
                    answer: "Surpreendentemente, sim ou igual. Controles Bluetooth baratos têm um 'input lag' de hardware e processamento do driver. O Wi-Fi local moderno (5Ghz) é absurdamente rápido e estável para transmissão de dados pequenos como comandos de texto."
                }
            ]}
        />
    </>
);
