import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { SEOContentHowTo } from "../../../../components/seo/SEOContentHowTo";

export const TeleprompterShortcutsPT = () => (
    <>
        <h2 className="text-4xl font-bold text-white mb-6 leading-tight">Atalhos de Teclado no Teleprompter: O Segredo da Produtividade em Vídeo</h2>

        <p className="mb-6 text-lg text-slate-300">
            Você já cronometrou quanto tempo perde em uma gravação apenas indo até a câmera, apertando REC, voltando para a posição, errando, levantando de novo para pausar...?
        </p>

        <p className="mb-6">
            Editores de vídeo profissionais no Adobe Premiere ou DaVinci Resolve raramente tocam no mouse. Eles sabem que <strong>atalhos de teclado = velocidade</strong>.
        </p>

        <p className="mb-8">
            O PromptNinja é o único teleprompter online desenhado com a filosofia "Keyboard First". Isso significa que você pode controlar 100% da sua gravação sem nunca tirar as mãos do teclado (ou do seu pedal/clicker).
        </p>

        <div className="bg-slate-800 p-8 rounded-xl border border-blue-500/30 mb-12 shadow-2xl">
            <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                ⌨️ Tabela Mestre de Comandos
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-xl font-bold text-blue-400 mb-4 border-b border-blue-500/20 pb-2">Controle de Fluxo</h3>
                    <ul className="space-y-3">
                        <li className="flex justify-between items-center text-slate-300">
                            <span>Iniciar / Pausar Scroll</span>
                            <kbd className="bg-slate-700 text-white px-3 py-1 rounded font-mono border border-slate-600">ESPAÇO</kbd>
                        </li>
                        <li className="flex justify-between items-center text-slate-300">
                            <span>Reiniciar Texto (Topo)</span>
                            <kbd className="bg-slate-700 text-white px-3 py-1 rounded font-mono border border-slate-600">R</kbd>
                        </li>
                        <li className="flex justify-between items-center text-slate-300">
                            <span>Sair / Voltar</span>
                            <kbd className="bg-slate-700 text-white px-3 py-1 rounded font-mono border border-slate-600">ESC</kbd>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-xl font-bold text-purple-400 mb-4 border-b border-purple-500/20 pb-2">Ajustes Dinâmicos</h3>
                    <ul className="space-y-3">
                        <li className="flex justify-between items-center text-slate-300">
                            <span>Velocidade (+ / -)</span>
                            <div className="flex gap-2">
                                <kbd className="bg-slate-700 text-white px-2 py-1 rounded font-mono border border-slate-600">↑</kbd>
                                <kbd className="bg-slate-700 text-white px-2 py-1 rounded font-mono border border-slate-600">↓</kbd>
                            </div>
                        </li>
                        <li className="flex justify-between items-center text-slate-300">
                            <span>Tamanho Fonte (+ / -)</span>
                            <div className="flex gap-2">
                                <kbd className="bg-slate-700 text-white px-2 py-1 rounded font-mono border border-slate-600">+</kbd>
                                <kbd className="bg-slate-700 text-white px-2 py-1 rounded font-mono border border-slate-600">-</kbd>
                            </div>
                        </li>
                        <li className="flex justify-between items-center text-slate-300">
                            <span>Espelhar (Mirror)</span>
                            <kbd className="bg-slate-700 text-white px-3 py-1 rounded font-mono border border-slate-600">M</kbd>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="mt-8 bg-black/30 p-4 rounded-lg border border-yellow-500/20">
                <h3 className="text-lg font-bold text-yellow-500 mb-2">🎮 Modo Gamer / Streamer (Exclusivo)</h3>
                <div className="flex justify-between items-center text-slate-300">
                    <p className="text-sm">Oculta toda a interface (botões, menus), deixando apenas o texto flutuante. Perfeito para gravar gameplays ou tutoriais de software.</p>
                    <kbd className="bg-yellow-600/20 text-yellow-400 px-4 py-2 rounded font-mono border border-yellow-500/50 text-xl font-bold ml-4">H</kbd>
                </div>
            </div>
        </div>

        <h3 className="text-3xl font-bold text-white mt-12 mb-6">Integração com Hardware Externo</h3>
        <p className="mb-6 text-slate-300">
            A beleza de usar atalhos de teclado padrão é que qualquer dispositivo que emule um teclado funciona nativamente com o PromptNinja.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-slate-800 p-6 rounded-lg border-t-4 border-blue-500">
                <h3 className="font-bold text-white mb-2">Elgato Stream Deck</h3>
                <p className="text-sm text-slate-400 mb-3">O queridinho dos streamers.</p>
                <p className="text-slate-300 text-sm">
                    Basta arrastar a ação "Hotkey" no software da Elgato e atribuir a tecla <strong>SPACE</strong> para um botão físico. Adicione outro para <strong>R</strong> (Reset) e tenha um centro de comando na sua mesa.
                </p>
            </div>
            <div className="bg-slate-800 p-6 rounded-lg border-t-4 border-green-500">
                <h3 className="font-bold text-white mb-2">Pedais USB</h3>
                <p className="text-sm text-slate-400 mb-3">Para músicos e "mãos ocupadas".</p>
                <p className="text-slate-300 text-sm">
                    Se você faz unboxing ou toca violão, suas mãos estão ocupadas. Use um pedal USB configurado como "Espaço" para iniciar/pausar o texto com os pés.
                </p>
            </div>
            <div className="bg-slate-800 p-6 rounded-lg border-t-4 border-purple-500">
                <h3 className="font-bold text-white mb-2">Apresentadores (Clickers)</h3>
                <p className="text-sm text-slate-400 mb-3">Logitech R400, R800, etc.</p>
                <p className="text-slate-300 text-sm">
                    A maioria dos clickers de slide envia comandos de "Seta Direita/Esquerda" ou "Page Up/Down". O PromptNinja interpreta isso inteligentemente para controle de scroll.
                </p>
            </div>
        </div>

        <h3 className="text-3xl font-bold text-white mt-12 mb-6">Workflow Ninja: Edite e Grave em Segundos</h3>
        <SEOContentHowTo
            title=""
            schemaTitle="Como Otimizar Gravação com Atalhos"
            totalTime="PT5M"
            tools={["PC/Mac", "Teclado", "PromptNinja"]}
            steps={[
                {
                    title: "Prepare o Texto",
                    text: "Cole seu roteiro. Use ENTER para quebrar frases longas em blocos visuais."
                },
                {
                    title: "Ajuste Visual (Sem Mouse)",
                    text: "Use '+' e '-' para deixar a fonte gigante (leitura confortável). Use 'M' se estiver usando vidro."
                },
                {
                    title: "O Pulo do Gato: Loop de Erro",
                    text: "Errou a frase? Não xingue. Aperte ESPAÇO (Pausa). Respire. Aperte Seta Cima (Volta um pouco). Aperte ESPAÇO (Play). Continue gravando. Na edição, você verá a pausa visualmente na waveform do áudio e cortará fácil."
                }
            ]}
        />

        <div className="text-center bg-slate-800 p-8 rounded-lg my-10 border border-slate-700">
            <h3 className="text-3xl font-bold text-white mb-4">PromptNinja PRO: Mapeamento Total</h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                Usa teclado Dvorak? Tem um controle remoto específico que envia a tecla "F5"?
                Na versão PRO, você pode <strong>impor</strong> qual tecla faz o que. Liberdade total.
            </p>
            <a
                href="/?lang=pt#app"
                className="inline-block bg-white text-slate-900 font-bold py-3 px-8 rounded-full transition hover:bg-slate-200"
            >
                Configurar Atalhos Agora
            </a>
        </div>

        <SEOContentFAQ
            title="Dúvidas Técnicas sobre Teclado"
            items={[
                {
                    question: "Os atalhos funcionam se eu estiver em outra janela (ex: OBS)?",
                    answer: "Não nativamente (limitação de segurança dos navegadores). O PromptNinja precisa estar 'em foco' (janela ativa). Dica: Use um segundo monitor para o PromptNinja e clique nele antes de começar."
                },
                {
                    question: "Funciona com teclados Bluetooth de iPad?",
                    answer: "Sim! O iPadOS reconhece teclados externos perfeitamente e o PromptNinja responde aos mesmos atalhos (Espaço, Setas) no Safari/Chrome móvel."
                },
                {
                    question: "Posso usar um controle de videogame (Xbox/PS5)?",
                    answer: "Diretamente não, mas se você usar um software como 'JoyToKey' (Windows) ou 'Mapper' (Mac) para transformar botões do joystick em teclas (A = Espaço), funciona perfeitamente!"
                },
                {
                    question: "A tecla 'H' (Hide) esconde o texto também?",
                    answer: "Não, ela esconde apenas a UI (Interface de Usuário) - botões, menus, logo. O texto continua lá, flutuando. Se o fundo estiver transparente, parece mágica sobre seu vídeo."
                }
            ]}
        />
    </>
);
