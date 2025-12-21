import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { SEOContentHowTo } from "../../../../components/seo/SEOContentHowTo";

export const TeleprompterParaYoutubersPT = () => (
    <>
        <h1 className="text-4xl font-bold text-white mb-6 leading-tight">Teleprompter para YouTubers: Como Dobrar sua Retenção e Cortar a Edição pela Metade</h1>

        <p className="mb-6 text-xl text-slate-300">
            Você conhece a dor: você liga a câmera, fala duas frases, trava. "Corta, de novo".
            Você olha para o roteiro no colo, volta para a lente, perde o fio da meada.
        </p>

        <p className="mb-8 text-slate-300">
            No final do dia, você tem <strong>2 horas de material bruto para um vídeo de 8 minutos</strong>. E o pior: a edição vira um pesadelo de cortes ("Jump Cuts") para esconder os erros, matando a fluidez do vídeo.
        </p>

        <div className="bg-slate-800 p-8 rounded-xl border-l-4 border-red-500 mb-12 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-4">O Algoritmo Odeia Insegurança</h2>
            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-lg font-bold text-red-300 mb-2">📉 Sem Teleprompter</h3>
                    <ul className="space-y-2 text-slate-400 text-sm">
                        <li>• Olhar desviando (lendo notas) = Quebra de conexão.</li>
                        <li>• Muitos "Ahhh", "Éhhh" = Queda na retenção.</li>
                        <li>• Edição picotada = Cansaço visual.</li>
                        <li>• Resultado: O espectador sai em 30 segundos.</li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-green-400 mb-2">📈 Com PromptNinja</h3>
                    <ul className="space-y-2 text-slate-300 text-sm">
                        <li>• Olho no olho 100% do tempo = Autoridade.</li>
                        <li>• Fala contínua e segura = "Flow" hipnótico.</li>
                        <li>• Edição mínima = Vídeo pronto em minutos.</li>
                        <li>• Resultado: Watch Time (Tempo de Exibição) dispara.</li>
                    </ul>
                </div>
            </div>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">3 Formas de Usar (Do Iniciante ao Pro)</h2>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-700 hover:border-blue-500 transition">
                <div className="text-3xl mb-4">💻</div>
                <h3 className="text-xl font-bold text-white mb-2">1. O "Laptop Studio"</h3>
                <p className="text-sm text-slate-400 mb-4">Ideal para Webcam / Lives.</p>
                <p className="text-slate-300 text-sm">
                    Coloque a janela do PromptNinja no topo da tela, bem abaixo da webcam do notebook.
                    <br /><strong>Custo: R$ 0.</strong>
                </p>
            </div>

            <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-700 hover:border-purple-500 transition">
                <div className="text-3xl mb-4">📱</div>
                <h3 className="text-xl font-bold text-white mb-2">2. O "Mobile Creator"</h3>
                <p className="text-sm text-slate-400 mb-4">Ideal para Reels/Shorts.</p>
                <p className="text-slate-300 text-sm">
                    Use o PromptNinja no celular. Segure o celular perto da lente da câmera principal se estiver gravando alguém, ou use frontal.
                </p>
            </div>

            <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-700 hover:border-green-500 transition">
                <div className="text-3xl mb-4">🎥</div>
                <h3 className="text-xl font-bold text-white mb-2">3. O "Pro Glass"</h3>
                <p className="text-sm text-slate-400 mb-4">Ideal para Câmeras DSLR.</p>
                <p className="text-slate-300 text-sm">
                    Use um iPad com PromptNinja deitado sob um suporte de vidro (beam splitter). Ative o <strong>Modo Espelho</strong> (Tecla 'M').
                </p>
            </div>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Workflow Ninja: Roteiro à Publicação em 1h</h2>
        <SEOContentHowTo
            title=""
            schemaTitle="Como Gravar Vídeos YouTube com Teleprompter"
            totalTime="PT15M"
            tools={["PromptNinja", "Câmera", "Microfone"]}
            steps={[
                {
                    title: "1. Escreva Falando",
                    text: "Não escreva como um livro. Escreva como você fala. Use frases curtas. No PromptNinja, quebre as linhas onde você quer respirar."
                },
                {
                    title: "2. Ajuste a 'Zona de Leitura'",
                    text: "Não deixe o texto ocupar a tela toda. Diminua a margem lateral no PromptNinja para que seus olhos não fiquem 'varrendo' da esquerda para a direita. O texto deve ficar num centro estreito."
                },
                {
                    title: "3. O Truque da Distância",
                    text: "Fique a pelo menos 1 metro da câmera. Quanto mais longe, menos se percebe o movimento dos olhos."
                },
                {
                    title: "4. Ação!",
                    text: "Dê o Play (Espaço). Sorria. Fale com energia (20% a mais que o normal). Se errar, PAUSE, respire e volte uma frase. Não pare a gravação."
                }
            ]}
        />

        <div className="mt-16 bg-gradient-to-r from-red-600/20 to-red-900/20 p-8 rounded-xl border border-red-500/30">
            <h2 className="text-2xl font-bold text-white mb-4">Pare de perder tempo editando "Ehmmm..."</h2>
            <p className="text-slate-300 mb-6">
                Os maiores canais (MrBeast, Ali Abdaal, Peter McKinnon) usam algum tipo de roteiro ou teleprompter. A consistência deles vem do fluxo de trabalho. O PromptNinja te dá esse superpoder de graça.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <a href="/app" className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-bold transition text-center">
                    Começar a Gravar Agora
                </a>
            </div>
        </div>

        <SEOContentFAQ
            title="Dúvidas de Criadores"
            items={[
                {
                    question: "O YouTube penaliza leitura?",
                    answer: "Pelo contrário. O algoritmo ama Watch Time. Se você fala bem, sem pausas chatas, a pessoa assiste até o fim. O YouTube não sabe se você está lendo, ele só sabe que o público não saiu do vídeo."
                },
                {
                    question: "Como parecer natural?",
                    answer: "O segredo é a linguagem corporal. Mexa as mãos. Sorria. Franze a testa. Use o teleprompter apenas como um guia para as palavras, mas coloque emoção na voz. E configure a velocidade um pouco MAIS RÁPIDA que sua leitura confortável para te forçar a falar com energia."
                },
                {
                    question: "Funciona para Shorts e TikTok?",
                    answer: "Perfeito para isso. Em vídeos curtos de 60s, cada segundo conta. Você não pode desperdiçar tempo pensando. Com o roteiro na tela, você entrega o conteúdo em exatos 59 segundos sem gaguejar."
                }
            ]}
        />
    </>
);
