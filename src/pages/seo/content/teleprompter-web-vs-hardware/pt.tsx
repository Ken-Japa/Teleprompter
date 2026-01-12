import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { SEOContentHowTo } from "../../../../components/seo/SEOContentHowTo";

export const TeleprompterWebVsHardwarePT = () => (
    <>
        <h2 className="text-4xl font-bold text-white mb-6 leading-tight">Teleprompter Online vs Físico: O Guia Definitivo para Criadores</h2>

        <p className="mb-6 text-lg text-slate-300">
            Você está pronto para profissionalizar seus vídeos. O dilema clássico surge: "Devo gastar R$ 800,00 em um trambolho de vidro e plástico para minha câmera, ou existe uma solução inteligente via software?"
        </p>

        <p className="mb-6">
            Há 5 anos, o hardware era obrigatório. Hoje, com câmeras de alta resolução e softwares inteligentes como o PromptNinja, a linha entre "amador" e "profissional" ficou invisível. Mas cuidado: escolher errado pode custar não só dinheiro, mas horas de setup frustrante.
        </p>

        <p className="mb-8">
            Neste guia honesto, vamos dissecar quando você DEVE comprar um hardware e quando o software (Web & App) é não apenas mais barato, mas <strong>superior</strong>.
        </p>

        <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 mb-12 shadow-2xl">
            <h3 className="text-3xl font-bold text-white mb-8 text-center">Batalha: Vidro vs Pixel</h3>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Lado Esquerdo: Hardware */}
                <div className="space-y-4">
                    <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
                        <h3 className="text-xl font-bold text-red-400 mb-2 flex items-center">
                            🎥 Teleprompter Físico (Hardware)
                        </h3>
                        <p className="text-sm text-slate-400 mb-3">O clássico "caixote" com espelho angulado na frente da lente.</p>
                        <ul className="space-y-2 text-slate-300 text-sm">
                            <li className="flex gap-2"><span>👍</span> <strong>Olho na Lente:</strong> Perfeito absoluto. Você olha 100% para o centro da câmera.</li>
                            <li className="flex gap-2"><span>👎</span> <strong>Perda de Luz:</strong> O vidro "rouba" 1 a 2 pontos de luz (f-stops). Exige iluminação muito potente.</li>
                            <li className="flex gap-2"><span>👎</span> <strong>Preço e Peso:</strong> Custa de R$ 500 a R$ 3.000. Pesado, exige tripé robusto e caro.</li>
                            <li className="flex gap-2"><span>👎</span> <strong>Setup:</strong> Demora 15-20 minutos para montar, limpar vidro, alinhar.</li>
                        </ul>
                    </div>
                </div>

                {/* Lado Direito: Software */}
                <div className="space-y-4">
                    <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                        <h3 className="text-xl font-bold text-green-400 mb-2 flex items-center">
                            💻 Teleprompter Web (PromptNinja)
                        </h3>
                        <p className="text-sm text-slate-400 mb-3">Solução moderna que usa a tela do dispositivo (PC, Tablet, Celular).</p>
                        <ul className="space-y-2 text-slate-300 text-sm">
                            <li className="flex gap-2"><span>👍</span> <strong>Custo Zero:</strong> Gratuito. Usa o que você já tem.</li>
                            <li className="flex gap-2"><span>👍</span> <strong>Qualidade de Imagem:</strong> 100% pura. Nada na frente da lente. Imagem mais nítida e clara.</li>
                            <li className="flex gap-2"><span>👍</span> <strong>Portabilidade:</strong> Zero peso adicional na mochila.</li>
                            <li className="flex gap-2"><span>⚠️</span> <strong>Olho na Lente:</strong> Requer técnica (posicionar texto perto da câmera) para simular contato visual perfeito.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <h3 className="text-3xl font-bold text-white mt-12 mb-6">A Verdade Sobre o "Olhar Desviado"</h3>
        <p className="mb-6 text-slate-300">
            O principal argumento dos vendedores de hardware é: <em>"Sem o vidro, o público percebe que você não está olhando para eles".</em> Isso era verdade em 2010. Hoje, não é bem assim.
        </p>
        <div className="bg-slate-800 p-6 rounded-lg mb-8 border-l-4 border-blue-500">
            <h3 className="text-xl font-bold text-white mb-2">A Regra dos 3 Graus (O Segredo)</h3>
            <p className="text-slate-300 mb-4">
                Se o texto estiver fisicamente próximo da lente da câmera, a diferença angular é menor que 3 graus. O cérebro humano <strong>não percebe</strong> esse desvio a uma distância normal de visualização.
            </p>
            <p className="text-slate-300">
                <strong>O Truque do PromptNinja:</strong> Ao reduzir a largura da janela de texto e colá-la no topo da tela (logo abaixo da webcam), você entra na "Zona de Invisibilidade". Você lê, mas seus olhos parecem estar focados na lente. Economia: R$ 800,00.
            </p>
        </div>

        <h3 className="text-3xl font-bold text-white mt-12 mb-6">Quando Você REALMENTE Precisa de Hardware?</h3>
        <p className="mb-6 text-slate-300">
            Não somos anti-hardware. O PromptNinja foi feito para funcionar <strong>com</strong> hardware também. Você deve comprar um teleprompter de vidro se:
        </p>
        <ul className="list-disc pl-6 mb-8 text-slate-300 space-y-2">
            <li><strong>Distância Longa:</strong> Se a câmera está a mais de 3 metros de você (estúdio de TV). Nessa distância, ler numa tela ao lado da câmera fica óbvio.</li>
            <li><strong>Leitura Dinâmica Rápida:</strong> Se você precisa mover muito a cabeça/olhos, o vidro centraliza esse movimento, disfarçando melhor.</li>
            <li><strong>Produção Cinematográfica:</strong> Clientes pagantes exigem "cara de estúdio". O trambolho impressiona o cliente (efeito psicológico).</li>
        </ul>

        <div className="bg-slate-900 p-8 rounded-xl border border-yellow-600/50 my-10">
            <h3 className="text-2xl font-bold text-yellow-500 mb-4">A Solução Híbrida (O Melhor dos Dois Mundos)</h3>
            <p className="text-slate-300 mb-6">
                Você já comprou o hardware? Ótimo. Mas não use o software ruim que veio com ele (geralmente apps chineses Bluetooth instáveis).
            </p>
            <SEOContentHowTo
                title=""
                schemaTitle="Como Usar PromptNinja com Teleprompter Físico"
                totalTime="PT2M"
                tools={["Hardware Teleprompter", "Tablet/Celular", "PromptNinja"]}
                steps={[
                    {
                        title: "Prepare o Hardware",
                        text: "Monte seu teleprompter físico na frente da câmera. Coloque seu tablet ou celular na base (bandeja)."
                    },
                    {
                        title: "O Pulo do Gato: Modo Espelho",
                        text: "Abra o PromptNinja no tablet. Clique no ícone 'M' (Mirror). O texto inverterá horizontalmente."
                    },
                    {
                        title: "Reflexo Perfeito",
                        text: "Como o texto na tela está invertido, ao refletir no vidro, ele ficará legível para você! Você ganha a ótica do hardware com a inteligência do nosso software (Scroll por voz, controle remoto Wi-Fi)."
                    }
                ]}
            />
        </div>

        <div className="text-center bg-slate-800 p-8 rounded-lg my-10">
            <h3 className="text-3xl font-bold text-white mb-4">Teste o Software Antes de Gastar</h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                Antes de investir em vidro, tripé pesado e suportes, tente gravar um vídeo com o PromptNinja bem configurado. 95% dos usuários desistem da compra do hardware depois do teste.
            </p>
            <a
                href="/?lang=pt#app"
                className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 font-bold py-3 px-8 rounded-full transition hover:brightness-110 text-white shadow-lg"
            >
                🎯 Testar Gratuitamente Agora
            </a>
            <p className="text-slate-400 mt-4 text-sm">Não precisa de cartão de crédito • Funciona em qualquer tela</p>
        </div>

        <SEOContentFAQ
            title="Dúvidas Frequentes: Web App vs Hardware"
            items={[
                {
                    question: "O PromptNinja funciona offline se a internet cair?",
                    answer: "Sim! Ao contrário de sites simples, somos um PWA. Uma vez carregado, o app funciona 100% offline, assim como um software instalado. Você não corre risco de travar no meio da gravação."
                },
                {
                    question: "Hardware barato de R$ 200 vale a pena?",
                    answer: "Cuidado. Geralmente usam vidro comum (não 'beam splitter') que causa 'imagem fantasma' (texto duplicado) e escurece muito o vídeo. Muitas vezes, usar apenas o PromptNinja direto na tela dá um resultado final de imagem melhor."
                },
                {
                    question: "Posso controlar a velocidade sem tocar na tela?",
                    answer: "Sim, essa é a vantagem do software. Com o PromptNinja, você usa seu celular como controle remoto, ou usa Comandos de Voz (IA) para que o texto siga sua fala automaticamente. Hardwares baratos não têm essa inteligência."
                },
                {
                    question: "Preciso de um monitor externo para usar hardware?",
                    answer: "Não. Você pode colocar um tablet ou até seu celular na bandeja do teleprompter físico. O PromptNinja se adapta a qualquer tamanho de tela, de relógio a TV de 60 polegadas."
                },
                {
                    question: "O que é 'Beam Splitter Glass'?",
                    answer: "É um vidro especial com revestimento reflexivo em um lado e transparente no outro. Ele reflete o texto para você sem que a câmera veja o texto. É caro. Plásticos ou vidros comuns destroem a qualidade da imagem."
                }
            ]}
        />
    </>
);
