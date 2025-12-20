import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { SEOContentHowTo } from "../../../../components/seo/SEOContentHowTo";

export const ComoUsarTeleprompterPT = () => (
    <>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Como Usar um Teleprompter Grátis: O Guia Definitivo para Vídeos Profissionais
        </h1>

        <p className="lead text-xl text-slate-300 mb-8">
            Gravar vídeos pode ser um pesadelo. Você tem um roteiro incrível, mas na hora de falar para a câmera, as palavras somem. Você gagueja, esquece pontos importantes e acaba com dezenas de tomadas, perdendo horas na edição. Se isso soa familiar, um teleprompter não é um luxo, é uma necessidade.
        </p>

        <div className="bg-slate-900 p-6 rounded-lg border border-slate-800 mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">O Problema Central: A Carga Cognitiva da Memorização</h2>
            <p className="text-slate-300">
                O cérebro humano não é otimizado para fazer duas coisas complexas ao mesmo tempo: lembrar de um texto palavra por palavra e apresentá-lo de forma carismática e natural. É por isso que atores de TV, apresentadores de jornais e até presidentes usam teleprompters. Eles liberam a mente da tarefa de memorizar, permitindo que toda a energia seja focada na performance, na entonação e na conexão com a audiência. Tentar fazer tudo "de cabeça" é a receita para um vídeo robótico e sem vida.
            </p>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Como Usar um Teleprompter: Do Básico ao Profissional</h2>
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
