import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { SEOContentHowTo } from "../../../../components/seo/SEOContentHowTo";
import { SEOImage } from "../../../../components/seo/SEOImage";

export const TeleprompterGamersPT = () => (
    <>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Teleprompter para Gamers e Streamers: Melhore seu Chat e Performance
        </h2>

        <p className="lead text-xl text-slate-300 mb-8 font-medium">
            No meio de uma partida intensa ou de um react ao vivo, cada distração pode custar caro. Você já teve que dar Alt-Tab para ler um roteiro ou agradecer uma donate e acabou perdendo a ação? <strong>A vida de um streamer exige foco total, e o improviso nem sempre é o melhor caminho.</strong>
        </p>

        <p className="text-slate-300 mb-8">
            Neste guia, mostramos por que streamers de sucesso na Twitch e no YouTube estão adotando o <strong>PromptNinja</strong> como sua ferramenta secreta. Descubra como configurar um teleprompter minimalista que não consome seus preciosos FPS, permite a leitura de agradecimentos sem tirar os olhos do game e se integra perfeitamente ao OBS Studio via Chroma Key. Eleve o nível da sua produção, mantenha seu chat engajado e nunca mais perca o ritmo da sua stream!
        </p>

        <SEOImage
            slug="teleprompter-gamers"
            src="teleprompter-gamers-streaming-interface.webp"
            alt="Teleprompter para Gamers e Streamers"
            caption="O PromptNinja se integra ao seu setup gamer sem consumir FPS."
            width={1200}
            height={675}
            priority={true}
        />

        <div className="bg-gradient-to-r from-red-900/30 to-green-900/30 p-8 rounded-xl border border-slate-700 mb-12">
            <h3 className="text-3xl font-bold text-white mb-6">Setup Gamer: Improviso vs PRO</h3>
            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-slate-900/70 p-6 rounded-lg border border-red-500/30">
                    <h3 className="font-bold text-red-400 mb-4 flex items-center gap-2">
                        <span>❌</span> Improviso (Métodos Amadores)
                    </h3>
                    <ul className="space-y-3 text-slate-300 text-sm">
                        <li>📝 <strong>Notas:</strong> Notepad aberto (Alt-Tab = jogo trava)</li>
                        <li>🎮 <strong>Mid-Stream:</strong> "Ehhh deixa eu ver aqui..." (viewers percebem)</li>
                        <li>💾 <strong>RAM:</strong> 12 abas Chrome abertas = 2GB usado</li>
                        <li>😓 <strong>Resultado:</strong> Parece desorganizado, perde viewers</li>
                        <li>⏱️ <strong>Eficiência:</strong> 40% do tempo OFF-screen</li>
                    </ul>
                </div>
                <div className="bg-slate-900/70 p-6 rounded-lg border border-green-500/30">
                    <h3 className="font-bold text-green-400 mb-4 flex items-center gap-2">
                        <span>✅</span> PRO (PromptNinja Setup)
                    </h3>
                    <ul className="space-y-3 text-slate-300 text-sm">
                        <li>📝 <strong>Notas:</strong> Monitor secundário (zero Alt-Tab)</li>
                        <li>🎮 <strong>Mid-Stream:</strong> Lê roteiro SEM sair do game</li>
                        <li>💾 <strong>RAM:</strong> ~50MB (menos que Discord)</li>
                        <li>😊 <strong>Resultado:</strong> "Ele é TÃO preparado!" no chat</li>
                        <li>⏱️ <strong>Eficiência:</strong> 98% ON-screen, flow constante</li>
                    </ul>
                </div>
            </div>
            <p className="text-slate-400 text-sm mt-6 italic text-center">
                💡 Streamer PRO = roteiro invisível pro viewer + hands-free control.
            </p>
        </div>

        <h3 className="text-3xl font-bold text-white mt-12 mb-6">3 Setups Gamer Profissionais</h3>
        <div className="space-y-6 mb-12">
            <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-cyan-500">
                <h3 className="text-xl font-bold text-cyan-400 mb-3">Setup #1: Single Monitor Speedrunner</h3>
                <p className="text-slate-300 mb-4">
                    <strong>Hardware:</strong> 1 monitor + game fullscreen.
                </p>
                <ol className="list-decimal list-inside space-y-2 text-slate-300 text-sm">
                    <li>Abra PromptNinja em janela PEQUENA (300x200px canto superior)</li>
                    <li>Cole notas speedrun (splits, skip tricks, safety strats)</li>
                    <li>Tecla <strong>H</strong> = esconde HUD (só texto fica)</li>
                    <li>Ajuste opacidade 70% (vê através do texto)</li>
                    <li>Posicione canto que NÃO atrapalha HUD do game</li>
                    <li>Controle via celular (sem tocar teclado mid-run)</li>
                </ol>
                <p className="text-green-400 text-sm mt-3">✅ <strong>Ideal pra:</strong> Speedruns, competitive gaming, notas rápidas.</p>
            </div>

            <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-purple-500">
                <h3 className="text-xl font-bold text-purple-400 mb-3">Setup #2: Dual Monitor Streamer</h3>
                <p className="text-slate-300 mb-4">
                    <strong>Hardware:</strong> Monitor 1 = game, Monitor 2 = OBS/chat/teleprompter.
                </p>
                <ol className="list-decimal list-inside space-y-2 text-slate-300 text-sm">
                    <li><strong>Monitor 1:</strong> Game fullscreen (capturado no OBS)</li>
                    <li><strong>Monitor 2 (alto):</strong> OBS preview</li>
                    <li><strong>Monitor 2 (meio):</strong> Chat/donations overlay</li>
                    <li><strong>Monitor 2 (baixo):</strong> PromptNinja com roteiro</li>
                    <li>Usa comando <strong>[STOP]</strong> pra pausar em cada segmento</li>
                    <li>Celular = remote pra scroll/pause (deixa no mousepad)</li>
                </ol>
                <p className="text-green-400 text-sm mt-3">✅ <strong>Ideal pra:</strong> Variety streamers, just chatting, react content.</p>
            </div>

            <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-red-500">
                <h3 className="text-xl font-bold text-red-400 mb-3">Setup #3: VTuber com Chroma Key</h3>
                <p className="text-slate-300 mb-4">
                    <strong>Hardware:</strong> PC + OBS + VTuber tracking (VSeeFace/VTube Studio).
                </p>
                <ol className="list-decimal list-inside space-y-2 text-slate-300 text-sm">
                    <li>PromptNinja theme = <strong>"Chroma Green"</strong></li>
                    <li>OBS → Add Source → Window Capture (PromptNinja)</li>
                    <li>Adiciona filtro "Chroma Key" (remove fundo verde)</li>
                    <li>Posiciona texto DENTRO da cena (como subtitle profissional)</li>
                    <li>Roteiro aparece ON-STREAM como "legenda" do que você fala</li>
                    <li>Audience NÃO vê controles, só texto limpo</li>
                </ol>
                <p className="text-yellow-400 text-sm mt-3">⚠️ <strong>Pro tip:</strong> Use comandos [COUNT 3] antes de cada take pra sincronizar modelo VTuber.</p>
            </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg my-8 border-l-4 border-green-500">
            <h3 className="text-2xl font-bold text-white mb-2">Modo "No HUD" (Tecla H = Interface Invisível)</h3>
            <p className="text-slate-300 mb-4">
                Aperte <kbd className="bg-slate-700 px-2 py-1 rounded text-white mx-1">H</kbd> e POOF: botões, scrollbar, menu = GONE. Só fica texto flutuante.
            </p>
            <SEOContentHowTo
                title=""
                schemaTitle="Como Ativar Modo Gamer (Sem Interface)"
                totalTime="PT1M"
                tools={["PromptNinja", "Teclado"]}
                steps={[
                    {
                        title: "Passo 1: Abra o App",
                        text: "Acesse PromptNinja e cole seu roteiro."
                    },
                    {
                        title: "Passo 2: Aperte 'H'",
                        text: "Pressione tecla H = ativa 'Hide HUD'. Interface desaparece."
                    },
                    {
                        title: "Passo 3: Ajuste Opacidade",
                        text: "ANTES de esconder HUD, ajuste opacidade ~70% pra ver através do texto durante gameplay."
                    }
                ]}
            />
            <p className="text-slate-300 mt-4">
                <strong>Perfeito pra:</strong>
            </p>
            <ul className="list-disc pl-6 mt-2 text-slate-300 space-y-2">
                <li><strong>Speedrunners:</strong> Notas de skip/safety visíveis sem poluir screen</li>
                <li><strong>React Streamers:</strong> Lê artigos/script sem mostrar controles</li>
                <li><strong>VTubers:</strong> Roteiro próximo ao tracking de olhos</li>
            </ul>
        </div>

        <h3 className="text-3xl font-bold text-white mt-12 mb-6">5 Erros Fatais de Streamer (Que Matam Profissionalismo)</h3>
        <div className="space-y-4 mb-12">
            <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-red-500">
                <h4 className="font-bold text-red-400 mb-2">Erro #1: Alt-Tab Durante Gameplay Intenso</h4>
                <p className="text-slate-300 text-sm">
                    Mid-teamfight ranked. Precisa ler donation. Alt-Tab pro Notepad. Jogo FPS cai de 144→30fps por 2s. Você morre. Team rage. -25 LP.
                    <span className="text-green-400 block mt-2">✅ <strong>Solução:</strong> Monitor secundário (mesmo que 60Hz barato) OU janela minúscula canto da tela + tecla H (no HUD).</span>
                </p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-red-500">
                <h4 className="font-bold text-red-400 mb-2">Erro #2: App Pesado Competindo com o Game</h4>
                <p className="text-slate-300 text-sm">
                    Baixa "teleprompter pro streamer" que usa 500MB RAM. Seu PC (16GB total): 6GB game + 2GB OBS + 3GB Chrome = 11GB. +500MB = começa swap disk. FPS instável.
                    <span className="text-green-400 block mt-2">✅ <strong>Solução:</strong> PromptNinja usa ~50MB (verificado Task Manager). Literalmente menos que Spotify.</span>
                </p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-red-500">
                <h4 className="font-bold text-red-400 mb-2">Erro #3: Texto Muito Grande (Cobre HUD do Game)</h4>
                <p className="text-slate-300 text-sm">
                    Fonte 48px gigante. Texto cobre minimap do LoL/Dota. Você não vê gank chegando. Morre. Viewers: "Ele nem olhou map".
                    <span className="text-green-400 block mt-2">✅ <strong>Solução:</strong> Fonte 24-28px + opacidade 70% + posição canto OPOSTO do HUD crítico. Vê através do texto.</span>
                </p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-red-500">
                <h4 className="font-bold text-red-400 mb-2">Erro #4: Não Usar Controle Remoto (Suja Teclado Bind)</h4>
                <p className="text-slate-300 text-sm">
                    Você binda Pause teleprompter em "P". Mid-game aperta P pra pausar roteiro. Game TAMBÉM tem bind em P (shop/menu). Abre janela errada = você morre.
                    <span className="text-green-400 block mt-2">✅ <strong>Solução:</strong> Celular = controle dedicado. Zero conflito com game binds. Deixa ao lado do mouse.</span>
                </p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-red-500">
                <h4 className="font-bold text-red-400 mb-2">Erro #5: Chroma Key Mal Configurado (Verde Vaza)</h4>
                <p className="text-slate-300 text-sm">
                    Usa chroma green mas threshold errado. Skin verde do champion TAMBÉM fica transparente no OBS. Personagem com "buracos" visíveis.
                    <span className="text-green-400 block mt-2">✅ <strong>Solução:</strong> OBS Chroma Key: Similarity = 400, Smoothness = 80, Key Color Spill = 100. OU use tema "Chroma Blue" se game tem muito verde.</span>
                </p>
            </div>
        </div>

        <h3 className="text-2xl font-bold text-white mt-8 mb-4">Chroma Key & OBS Integration</h3>
        <p className="mb-4">
            Precisa texto DENTRO da stream (visível pro viewer)? PromptNinja tem temas Chroma Green/Blue nativos.
        </p>
        <ol className="list-decimal list-inside space-y-2 mb-6 text-slate-300">
            <li>PromptNinja → Settings → Theme → <strong>"Chroma Green"</strong></li>
            <li>OBS → Add Source → <strong>Window Capture</strong> (seleciona PromptNinja)</li>
            <li>Right-click source → Filters → Add → <strong>"Chroma Key"</strong></li>
            <li>Ajuste Similarity ~400 até fundo verde desaparecer</li>
            <li>Texto fica com fundo transparente = parece subtitle profissional</li>
        </ol>
        <p className="text-yellow-400 text-sm">💡 <strong>Pro tip:</strong> Se seu game tem MUITO verde (Minecraft, Zelda), use "Chroma Blue".</p>

        <h3 className="text-2xl font-bold text-white mt-8 mb-4">Controle Sem Alt-Tab (3 Métodos)</h3>
        <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-2">📱 Celular P2P</h3>
                <p className="text-sm text-slate-300">Scan QR code. Celular vira Stream Deck free. Pause/play/speed ao lado do mouse. Zero lag (WiFi local).</p>
            </div>
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-2">⌨️ Atalhos Globais</h3>
                <p className="text-sm text-slate-300">Setas ↑↓ = speed. Space = pause/play. Funciona MESMO com game fullscreen (não precisa focar janela).</p>
            </div>
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-2">📝 Comandos Texto</h3>
                <p className="text-sm text-slate-300">[STOP] = pausa automática. [COUNT 3] = countdown. Ideal pra segmentar roteiro entre boss fights.</p>
            </div>
        </div>

        <div className="text-center bg-slate-800 p-8 rounded-lg my-10">
            <h3 className="text-3xl font-bold text-white mb-4">🎮 Level Up Sua Stream</h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                Streamer PRO = roteiro invisível + zero lag + hands-free control. Tudo que você precisa, nada que você não precisa.
            </p>
            <a
                href="https://promptninja.solutionkit.com.br/#app"
                className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 font-bold py-3 px-8 rounded-full transition hover:brightness-110"
                style={{ color: 'white' }}
            >
                🚀 Abrir Modo Gamer (Grátis)
            </a>
            <p className="text-slate-400 mt-4 text-sm">~50MB RAM • Chroma key nativo • Controle P2P</p>
        </div>

        <SEOContentFAQ
            title="Perguntas Frequentes - Streamers & Gamers"
            items={[
                {
                    question: "Funciona com OBS e Streamlabs?",
                    answer: "SIM! Duas opções: (1) Window Capture pra mostrar texto NA stream (use tema Chroma Key = fundo transparente) OU (2) janela em monitor secundário invisível pro viewer (uso pessoal). Ambos zero lag."
                },
                {
                    question: "Posso controlar texto sem Alt-Tab (sair do game)?",
                    answer: "ABSOLUTAMENTE. 3 métodos: (1) Celular via P2P (melhor - hands-free), (2) Atalhos globais (Setas/Space funcionam MESMO  em fullscreen), (3) Comandos texto [STOP] pra pause automática."
                },
                {
                    question: "Consome muita CPU/GPU? Vai lagar meu game?",
                    answer: "NÃO. ~50MB RAM (menos que Discord/Spotify). GPU usage <1% (só renderiza texto). Testado: CS2 300fps + OBS 1080p60 + PromptNinja = zero frame drops (Ryzen 5 + RTX 3060)."
                },
                {
                    question: "Dá pra usar em Single Monitor sem cobrir o game?",
                    answer: "SIM. Janela pequena (300x200px) no canto + tecla H (esconde UI) + opacidade 70% = vê ATRAVÉS do texto. Posiciona canto que não tem HUD importante. Speedrunners usam assim."
                },
                {
                    question: "Como faço Chroma Key sem vazar verde do game?",
                    answer: "OBS Chroma settings: Similarity = 400, Smoothness = 80, Key Color Spill = 100. Se game tem MUITO verde (Minecraft/Zelda), usa tema 'Chroma Blue'. Test antes da live: pause game em área verde pra ver se vaza."
                },
                {
                    question: "Funciona pra VTuber? Posso mostrar texto on-stream?",
                    answer: "PERFEITO pra VTuber! Modo Chroma = texto aparece como 'subtitle' profissional na stream. Audience vê o que você fala (tipo karaoke). Usa comando [STOP] pra pausar entre frases = sincroniza com modelo VTuber."
                },
                {
                    question: "Celular de controle precisa cabo ou WiFi? Tem lag?",
                    answer: "WiFi LOCAL (P2P direto PC↔celular). Lag <50ms (imperceptível). NÃO usa internet - funciona offline. Celular fica ao lado do mouse = controle instantâneo sem tirar mão do teclado."
                },
                {
                    question: "Dá pra script automático? Tipo 'leia linha, aguarda 5s, próxima'?",
                    answer: "SIM! Use comando [WAIT 5] entre linhas. Ou [STOP] pra pausar até você apertar play manual. Ideal pra: (1) React content (pausa entre clips), (2) RPG narrative (pausa entre chapters), (3) Tutorial (pausa pra demonstrar)."
                }
            ]}
        />
    </>
);
