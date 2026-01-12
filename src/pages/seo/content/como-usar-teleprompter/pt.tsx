import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { SEOContentHowTo } from "../../../../components/seo/SEOContentHowTo";

export const ComoUsarTeleprompterPT = () => (
    <>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Como Usar um Teleprompter Grátis: O Guia Definitivo para Vídeos Profissionais
        </h2>

        <p className="lead text-xl text-slate-300 mb-8">
            Primeira vez tentando usar teleprompter? Você abre um site qualquer, cola o texto, aperta play e... DESASTRE. O texto rola muito rápido (você parece um leiloeiro nervoso) ou devagar demais (pausas constrangedoras). Você tenta pausar mas precisa <strong>tocar na tela e tremer a câmera</strong>. Após 40 minutos testando, desiste e volta a regravar 20 vezes memorizando.
        </p>

        <p className="mb-6">
            EXATAMENTE o que aconteceu comigo na primeira vez. Pensei "teleprompter vai resolver minha vida". Resultado? Passei MAIS tempo brigando com a ferramenta do que se tivesse gravado sem nada. O problema não era EU. Era usar ferramentas feitas pra estúdios profissionais com equipamentos de $5000, não pra criadores solo gravando c om celular.
        </p>

        <p className="mb-8">
            Este guia existe pra você <strong>acertar na primeira vez</strong>. Vou te mostrar EXATAMENTE como usar teleprompter do jeito certo — não só a parte técnica ("cole texto, aperte play") mas os TRUQUES que separam quem parece lendo de quem parece falando naturalmente.
        </p>

        <div className="bg-gradient-to-r from-red-900/30 to-green-900/30 p-8 rounded-xl border border-slate-700 mb-12">
            <h3 className="text-3xl font-bold text-white mb-6">Primeiro Vídeo: Sem vs COM Teleprompter</h3>
            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-slate-900/70 p-6 rounded-lg border border-red-500/30">
                    <h3 className="font-bold text-red-400 mb-4 flex items-center gap-2">
                        <span>❌</span> SEM Teleprompter (Memorizando)
                    </h3>
                    <ul className="space-y-3 text-slate-300 text-sm">
                        <li>🧠 <strong>Preparação:</strong> 45min tentando decorar 2min de texto</li>
                        <li>🎬 <strong>Gravação:</strong> 18 tentativas (esquece no meio, trava, perde energia)</li>
                        <li>⏱️ <strong>Tempo total:</strong> 1h32min pra gravar 2min</li>
                        <li>😓 <strong>Resultado:</strong> Vídeo publicado com pequenas gaguejas "aceitáveis"</li>
                        <li>💬 <strong>Feedback:</strong> "Parece meio nervoso", "Tá lendo algo?"</li>
                    </ul>
                </div>
                <div className="bg-slate-900/70 p-6 rounded-lg border border-green-500/30">
                    <h3 className="font-bold text-green-400 mb-4 flex items-center gap-2">
                        <span>✅</span> COM Teleprompter (Primeira Vez Usando CERTO)
                    </h3>
                    <ul className="space-y-3 text-slate-300 text-sm">
                        <li>🧠 <strong>Preparação:</strong> 3min colando texto, ajustando velocidade</li>
                        <li>🎬 <strong>Gravação:</strong> 2 tentativas (1ª pra testar velocidade, 2ª é a boa)</li>
                        <li>⏱️ <strong>Tempo total:</strong> 12min pra gravar 2min</li>
                        <li>😊 <strong>Resultado:</strong> Vídeo PERFEITO, zero gaguejas, energia mantida</li>
                        <li>💬 <strong>Feedback:</strong> "Que confiança!", "Parece apresentador de TV"</li>
                    </ul>
                </div>
            </div>
            <p className="text-slate-400 text-sm mt-6 italic text-center">
                💡 Diferença: <strong className="text-green-400">-87% tempo</strong> (1h32→12min) + <strong className="text-green-400">qualidade profissional</strong> logo na 1ª vez.
            </p>
        </div>

        <div className="bg-slate-900 p-6 rounded-lg border border-slate-800 mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Por Que Iniciantes Falham (e Como Evitar)</h3>
            <p className="text-slate-300 mb-4">
                90% dos criadores que testam teleprompter pela primeira vez DESISTEM. Não porque a ferramenta não funciona, mas porque cometem 3 erros clássicos:
            </p>
            <div className="space-y-4">
                <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-red-500">
                    <h4 className="font-bold text-red-400 mb-2">Erro #1: Fonte Muito Grande</h4>
                    <p className="text-slate-300 text-sm">
                        Pensam: "Preciso ver bem o texto" e colocam fonte tamanho 72px. Resultado? Seus olhos fazem um <strong>movimento amplo esquerda/direita</strong> a cada linha. A câmera capta isso. Audiência percebe que você tá lendo.
                        <span className="text-green-400 block mt-2">✅ <strong>Solução:</strong> Fonte 28-36px + ficar mais LONGE da tela. Olhos se movem menos, parece natural.</span>
                    </p>
                </div>
                <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-red-500">
                    <h4 className="font-bold text-red-400 mb-2">Erro #2: Texto Longe da Câmera</h4>
                    <p className="text-slate-300 text-sm">
                        Colocam teleprompter num canto da tela, câmera em outro. Você grava olhando 20º pra LADO da câmera. Audiência sente que você não tá falando com ELA.
                        <span className="text-green-400 block mt-2">✅ <strong>Solução:</strong> Cole a janela do teleprompter LITERALMENTE em cima da câmera. Quanto mais próximo, melhor.</span>
                    </p>
                </div>
                <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-red-500">
                    <h4 className="font-bold text-red-400 mb-2">Erro #3: Velocidade Errada</h4>
                    <p className="text-slate-300 text-sm">
                        Deixam no padrão (geralmente muito rápido). Você corre pra acompanhar, fica sem ar, perde naturalidade. Ou muito lento: pausas constrangedoras gigantes.
                        <span className="text-green-400 block mt-2">✅ <strong>Solução:</strong> SEMPRE faça um teste de 30s ANTES de gravar. Ajuste até parecer sua fala natural. Não existe "velocidade certa universal".</span>
                    </p>
                </div>
            </div>
        </div>

        <h3 className="text-3xl font-bold text-white mt-12 mb-6">Como Usar um Teleprompter: Do Básico ao Profissional</h3>
        <p className="text-slate-300 mb-8">
            Existem duas maneiras principais de usar um teleprompter, especialmente com ferramentas web como o PromptNinja, que não exigem a compra de equipamentos caros.
        </p>

        <div className="mb-12 space-y-8">
            <div className="bg-slate-800 p-6 rounded-lg">
                <h3 className="font-bold text-xl text-white mb-3">Método 1: O Dispositivo Único (O Início Rápido)</h3>
                <p className="text-slate-400 mb-4">
                    Ideal para quem está começando ou para gravações rápidas. Você usa o mesmo dispositivo para gravar e ler.
                </p>
                <ol className="list-decimal list-inside space-y-2 text-slate-300">
                    <li>Abra a câmera do seu celular ou a webcam do seu notebook.</li>
                    <li>Em uma janela ao lado, abra o <strong>PromptNinja</strong> no navegador.</li>
                    <li>Cole seu roteiro, ajuste o tamanho da fonte e a velocidade.</li>
                    <li>Posicione a janela do teleprompter o mais perto possível da lente da câmera.</li>
                    <li>Comece a gravar e, em seguida, dê play no teleprompter.</li>
                </ol>
                <p className="text-sm text-slate-500 mt-4"><strong>Desvantagem:</strong> É difícil controlar a rolagem sem interromper a gravação ou desviar o olhar. Funciona melhor para vídeos curtos.</p>
            </div>

            <SEOContentHowTo
                title="Método 2: O Controle Remoto (O Jeito Profissional)"
                schemaTitle="Como usar Teleprompter com Controle Remoto"
                tools={["Computador ou Tablet", "Smartphone"]}
                totalTime="PT2M"
                className="border-2 border-blue-500 rounded-lg p-4"
                steps={[
                    {
                        title: "Prepare a Tela Principal",
                        text: "Abra o PromptNinja no dispositivo que servirá de tela (notebook, tablet, outro monitor). Esta será a tela que você lerá."
                    },
                    {
                        title: "Ative o Controle Remoto",
                        text: "No seu celular, abra o PromptNinja e selecione a opção \"Controle Remoto\" no menu inicial."
                    },
                    {
                        title: "Conecte os Dispositivos",
                        text: "Escaneie o QR Code que aparece na tela principal com a câmera do seu celular. A conexão é P2P (Peer-to-Peer) via Wi-Fi, instantânea e segura."
                    },
                    {
                        title: "Controle sua Gravação",
                        text: "Pronto! Seu celular agora é um controle remoto. Dê play, pause, ajuste a velocidade e edite o texto sem sair da sua posição de gravação."
                    }
                ]}
            />
            <p className="text-sm text-green-400 mt-2 px-4"><strong>Vantagem:</strong> Controle total sobre o fluxo da gravação, permitindo pausas dramáticas, aceleração e uma apresentação muito mais dinâmica e natural.</p>
        </div>

        <SEOContentFAQ
            title="Perguntas Frequentes (FAQ)"
            items={[
                {
                    question: "1. Preciso baixar algum aplicativo?",
                    answer: "Não. O PromptNinja é 100% baseado na web. Funciona no Chrome, Safari, Firefox ou Edge, tanto no computador quanto no celular. Sem downloads, sem instalações suspeitas."
                },
                {
                    question: "2. O controle remoto funciona mesmo?",
                    answer: "Sim, e é instantâneo. Usamos tecnologia P2P (Peer-to-Peer) que conecta seus dispositivos diretamente via Wi-Fi local. Não há servidores intermediários para causar atrasos."
                },
                {
                    question: "3. Posso usar offline?",
                    answer: "Sim! O PromptNinja é um PWA (Progressive Web App). Uma vez carregado, ele funciona mesmo sem internet, garantindo que você nunca fique na mão na hora da gravação."
                },
                {
                    question: "4. É realmente grátis?",
                    answer: "A versão principal com todas as funcionalidades essenciais é gratuita e ilimitada. Temos uma versão Pro para recursos avançados como reconhecimento de voz, mas o teleprompter manual é grátis para sempre."
                }
            ]}
        />

        <div className="text-center mt-12">
            <a
                href="https://promptninja.solutionkit.com.br"
                className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 font-bold py-3 px-8 mx-auto rounded-full transition hover:brightness-110"
                style={{ color: 'white' }}
            >
                Transforme Seus Vídeos Hoje. Use o PromptNinja Grátis!
            </a>
            <p className="text-slate-400 mt-4 text-sm">Controle remoto, sem instalação, sem limite de tempo.</p>
        </div>
    </>
);
