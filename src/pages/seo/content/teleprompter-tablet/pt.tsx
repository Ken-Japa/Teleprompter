import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { SEOContentHowTo } from "../../../../components/seo/SEOContentHowTo";

export const TeleprompterTabletPT = () => (
    <>
        <h1 className="text-4xl font-bold text-white mb-6 leading-tight">Teleprompter para Tablet e iPad: O Sweet Spot da Criação de Vídeo</h1>

        <p className="mb-6 text-lg text-slate-300">
            Você tenta gravar com o celular, mas a tela é minúscula e força a vista. Tenta usar o notebook, mas é pesado e impossível de colocar no tripé. Você está preso no "limbo do equipamento": ou muito pequeno, ou muito desajeitado.
        </p>

        <p className="mb-6">
            O resultado? Vídeos com olhos apertados (tentando ler letrinhas), postura rígida e cansaço visual após 15 minutos. Sua performance sofre, e seu vídeo parece amador.
        </p>

        <p className="mb-8">
            O Tablet (seja iPad, Samsung Tab ou Kindle Fire) é a ferramenta de ouro ignorada por 90% dos criadores. Com a tela perfeita de 10-12 polegadas e portabilidade extrema, ele transforma qualquer canto em um estúdio de TV profissional – se você tiver o software certo.
        </p>

        <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-8 rounded-xl border border-slate-700 mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Tablet vs Celular vs Laptop: A Batalha das Telas</h2>
            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-slate-900/70 p-6 rounded-lg border border-red-500/30">
                    <h3 className="font-bold text-red-400 mb-4 text-center">📱 Celular (Smartphone)</h3>
                    <ul className="space-y-3 text-slate-300 text-sm">
                        <li>❌ <strong>Tela:</strong> Muito pequena (6"). Exige fonte minúscula ou leitura rápida demais.</li>
                        <li>❌ <strong>Distância:</strong> Só funciona a 50cm. Fica "em cima" da câmera.</li>
                        <li>❌ <strong>Vidro:</strong> Pequeno demais para teleprompters de vidro profissionais.</li>
                    </ul>
                </div>
                <div className="bg-slate-900/70 p-6 rounded-lg border border-red-500/30">
                    <h3 className="font-bold text-red-400 mb-4 text-center">💻 Laptop / Monitor</h3>
                    <ul className="space-y-3 text-slate-300 text-sm">
                        <li>❌ <strong>Montagem:</strong> Pesado. Difícil montar em tripés sem acessórios caros.</li>
                        <li>❌ <strong>Mobilidade:</strong> Exige mesa ou suporte. Prende você ao estúdio.</li>
                        <li>❌ <strong>Complexidade:</strong> Cabos, mouse, teclado... setup demora 15min.</li>
                    </ul>
                </div>
                <div className="bg-slate-900/70 p-6 rounded-lg border border-green-500/30 shadow-lg shadow-green-900/20 transform scale-105">
                    <h3 className="font-bold text-green-400 mb-4 text-center">✨ Tablet / iPad</h3>
                    <ul className="space-y-3 text-slate-300 text-sm">
                        <li>✅ <strong>Tela:</strong> Perfeita (10-12"). Leitura confortável a 2-3 metros.</li>
                        <li>✅ <strong>Montagem:</strong> Leve. Qualquer suporte de R$50 segura no tripé.</li>
                        <li>✅ <strong>Profissional:</strong> Tamanho padrão para teleprompters de vidro de estúdio.</li>
                    </ul>
                </div>
            </div>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">3 Setups Profissionais com Tablet</h2>
        <div className="space-y-8 mb-12">
            <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-cyan-500">
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">Setup #1: O "Estúdio de Mochila" (Mobile Creator)</h3>
                        <p className="text-slate-300 mb-4">
                            Ideal para quem grava sozinho em locações externas ou home studios compactos.
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-slate-300 text-sm">
                            <li><strong>Hardware:</strong> iPad/Tablet + Tripé com suporte simples.</li>
                            <li><strong>Câmera:</strong> Usa a PRÓPRIA câmera frontal do tablet.</li>
                            <li><strong>Posicionamento:</strong> Tablet na altura dos olhos. Lente limpa.</li>
                            <li><strong>PromptNinja:</strong> Texto centralizado no topo, próximo à lente da câmera.</li>
                            <li><strong>Vantagem:</strong> Setup de 30 segundos. Qualidade 4K (na maioria dos iPads novos). Zero cabos.</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-purple-500">
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-purple-400 mb-3">Setup #2: O "Pro Glass" (Para DSLRs/Mirrorless)</h3>
                        <p className="text-slate-300 mb-4">
                            O padrão ouro de YouTuers grandes e TVs. Requer um hardware de teleprompter (beam splitter).
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-slate-300 text-sm">
                            <li><strong>Hardware:</strong> Câmera DSLR no tripé + Teleprompter de vidro + Tablet deitado na base.</li>
                            <li><strong>Como Funciona:</strong> O tablet reflete o texto no vidro. A câmera grava através do vidro.</li>
                            <li><strong>Configuração PromptNinja:</strong> Ative o <strong>Modo Espelho (Mirror Mode)</strong> com um clique (ícone 'M').</li>
                            <li><strong>Controle:</strong> Use seu celular como controle remoto para variar a velocidade enquanto grava.</li>
                            <li><strong>Vantagem:</strong> Olhar 100% na lente. Qualidade de cinema. O tablet é apenas o monitor.</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-yellow-500">
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-yellow-400 mb-3">Setup #3: O "Sidekick" (Híbrido para Lives)</h3>
                        <p className="text-slate-300 mb-4">
                            Perfeito para lives no Instagram/TikTok ou Webinars onde você usa o PC para transmitir.
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-slate-300 text-sm">
                            <li><strong>Hardware:</strong> PC/Gamer Setup + Tablet em um braço articulado.</li>
                            <li><strong>Posicionamento:</strong> Tablet posicionado EXATAMENTE sob a webcam principal ou ao lado do monitor gamer.</li>
                            <li><strong>Uso:</strong> O tablet roda o roteiro (PromptNinja) independentemente do PC.</li>
                            <li><strong>Vantagem:</strong> Libera 100% dos monitores do PC para o jogo/chat/OBS. O roteiro não "rouba" espaço de tela do Windows.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Como Instalar (Sem App Store)</h2>
        <div className="bg-slate-800 p-6 rounded-lg my-6">
            <p className="text-slate-300 mb-6">
                O PromptNinja é um PWA (Progressive Web App). Isso significa que você não baixa na loja, você "instala" direto do navegador. Isso economiza 200MB de espaço e garante atualizações instantâneas.
            </p>
            <SEOContentHowTo
                title=""
                schemaTitle="Como Instalar PromptNinja no iPad e Android"
                totalTime="PT2M"
                tools={["Tablet (iPad ou Android)", "Navegador (Safari ou Chrome)"]}
                steps={[
                    {
                        title: "No iPad (Safari)",
                        text: "1. Abra 'promptninja.solutionkit.com.br' no Safari.\n2. Toque no botão 'Compartilhar' (quadrado com seta pra cima).\n3. Role para baixo e toque em 'Adicionar à Tela de Início' (Add to Home Screen).\n4. O ícone roxo aparecerá junto com seus outros apps."
                    },
                    {
                        title: "No Android (Chrome)",
                        text: "1. Abra o site no Chrome.\n2. Toque nos três pontinhos (menu) no canto superior direito.\n3. Selecione 'Instalar aplicativo' ou 'Adicionar à tela inicial'.\n4. Confirme e pronto, o app está instalado."
                    },
                    {
                        title: "Modo Offline",
                        text: "Uma vez adicionado à tela de início, abra o app. Ele carregará instantaneamente e funcionará MESMO se você desligar o Wi-Fi (modo avião recomendado para evitar notificações)."
                    }
                ]}
            />
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">5 Erros Fatais ao Usar Tablet como Teleprompter</h2>
        <div className="space-y-4 mb-12">
            <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-red-500">
                <h4 className="font-bold text-red-400 mb-2">Erro #1: Esquecer de Bloquear a Rotação de Tela</h4>
                <p className="text-slate-300 text-sm">
                    Você mexe no tripé e o tablet gira a tela horizontal/vertical no meio da gravação. O texto realinha e você perde o ponto.
                    <span className="text-green-400 block mt-2">✅ <strong>Solução:</strong> Ative o "Orientation Lock" no centro de controle do iPad/Android ANTES de começar.</span>
                </p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-red-500">
                <h4 className="font-bold text-red-400 mb-2">Erro #2: Brilho da Tela no Máximo (Reflexo Fantasma)</h4>
                <p className="text-slate-300 text-sm">
                    Em teleprompters de vidro, brilho 100% causa um "halo" ou reflexo duplo na lente da câmera, deixando a imagem leitosa.
                    <span className="text-green-400 block mt-2">✅ <strong>Solução:</strong> Use o brilho em 60-70%. É suficiente para ver o texto no reflexo, mas não estoura a imagem da câmera.</span>
                </p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-red-500">
                <h4 className="font-bold text-red-400 mb-2">Erro #3: Notificações "Pop-up" no Vídeo</h4>
                <p className="text-slate-300 text-sm">
                    No meio da frase inspiradora, aparece: "TINDER: Novo Match!". Destrói a gravação (e talvez sua reputação se estiver espelhando tela).
                    <span className="text-green-400 block mt-2">✅ <strong>Solução:</strong> Modo Não Perturbe (Do Not Disturb) ou Modo Avião são OBRIGATÓRIOS. O PromptNinja funciona offline, então desligue o Wi-Fi se possível.</span>
                </p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-red-500">
                <h4 className="font-bold text-red-400 mb-2">Erro #4: Tamanho de Fonte Errado para a Distância</h4>
                <p className="text-slate-300 text-sm">
                    Usar fonte tamanho 40 (padrão celular) num tablet a 2 metros de distância. Você aperta os olhos para ler (squinting).
                    <span className="text-green-400 block mt-2">✅ <strong>Solução:</strong> A regra é: quanto mais longe o tablet, MAIOR a fonte. Em tablets a 2m, use tamanho 70-90px. Teste a legibilidade antes de gravar.</span>
                </p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-red-500">
                <h4 className="font-bold text-red-400 mb-2">Erro #5: Tentar Controlar Tocando na Tela (Longe)</h4>
                <p className="text-slate-300 text-sm">
                    O tablet está a 2 metros. Você erra uma frase. Tem que levantar, andar até o tripé, rebobinar, voltar, sentar... Quebra o fluxo.
                    <span className="text-green-400 block mt-2">✅ <strong>Solução:</strong> Use o recurso "Remote Control" do PromptNinja. Deixe seu celular no colo. Errou? Pause e volte pelo celular, sem sair da cadeira.</span>
                </p>
            </div>
        </div>

        <div className="text-center bg-slate-800 p-8 rounded-lg my-10">
            <h2 className="text-3xl font-bold text-white mb-4">Transforme seu Tablet em Estúdio</h2>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                Não deixe seu iPad pegando poeira. Ele é o equipamento de R$5.000 que você já tem e não está usando para melhorar seus vídeos.
            </p>
            <a
                href="https://promptninja.solutionkit.com.br"
                className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 font-bold py-3 px-8 rounded-full transition hover:brightness-110"
                style={{ color: 'white' }}
            >
                🚀 Abrir PromptNinja no Tablet
            </a>
            <p className="text-slate-400 mt-4 text-sm">Compatível com iPadOS, Android e Fire OS</p>
        </div>

        <SEOContentFAQ
            title="Perguntas Frequentes - Tablets e iPads"
            items={[
                {
                    question: "Funciona em iPads antigos (ex: iPad 2)?",
                    answer: "Sim! Como rodamos no navegador, a compatibilidade é altíssima. Se o tablet abre sites modernos, ele roda o PromptNinja. Demos vida nova a iPads de 2013 que estavam na gaveta."
                },
                {
                    question: "Preciso de um controle remoto Bluetooth?",
                    answer: "Não necessariamente. O PromptNinja tem um sistema exclusivo de controle via Wi-Fi (P2P). Você usa seu próprio celular para controlar o tablet. Mas se preferir, também suportamos passadores de slide e teclados bluetooth."
                },
                {
                    question: "Como faço para o texto ficar espelhado (invertido)?",
                    answer: "Toque na tela para abrir o menu, clique no ícone 'Configurações' (engrenagem) ou procure o botão 'M' (Mirror). O texto inverte horizontalmente instantaneamente. Essa configuração fica salva para a próxima vez."
                },
                {
                    question: "O app gasta muita bateria do tablet?",
                    answer: "Muito pouco. Por ser otimizado e usar fundo preto (OLED friendly), o consumo é mínimo. Recomendamos usar brilho em 70%, o que economiza ainda mais energia em telas AMOLED (Samsung) e dura horas."
                },
                {
                    question: "Qual o tamanho de tablet ideal para teleprompter?",
                    answer: "Depende da distância. Para uso a 1 metro (mesa), tablets de 7-8 polegadas (iPad Mini) são ótimos. Para uso a 2-3 metros (estúdio em pé), recomendamos 10 polegadas ou mais (iPad Air/Pro, Galaxy Tab S)."
                },
                {
                    question: "Posso importar roteiros do Word ou Google Docs no tablet?",
                    answer: "Sim. A maneira mais fácil é copiar o texto no seu PC/Celular e colar no PromptNinja. Se você estiver logado (ou usar o recurso de Sync P2P), o texto aparece magicamente no tablet sem precisar digitar nada na tela de vidro."
                },
                {
                    question: "Funciona com o tablet na vertical (Portrait) ou só horizontal?",
                    answer: "Ambos! O PromptNinja é responsivo. Vertical é ótimo para gravar TikToks/Reels (texto estreito, menos movimento ocular). Horizontal é melhor para vídeos longos de YouTube e setups de vidro tradicionais."
                }
            ]}
        />
    </>
);
