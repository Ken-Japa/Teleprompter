import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { SEOContentHowTo } from "../../../../components/seo/SEOContentHowTo";

export const TeleprompterIphoneIpadPT = () => (
    <>
        <h1 className="text-4xl font-bold text-white mb-6 leading-tight">Teleprompter para iPhone e iPad: Zero Instalação, 100% Profissional</h1>

        <p className="mb-6 text-lg text-slate-300">
            iPhone 15 Pro Max. R$9500. Câmera 4K60fps ProRes. Estabilização cinematográfica. Aí grava o vídeo... olha pro papel a cada 5 segundos. Perde contato visual. Público sente disconnect. Câmera PRO + roteiro AMADOR = desperdício.
        </p>

        <p className="mb-6">
            Você pensa "preciso app teleprompter". Abre App Store. Encontra apps que: (1) cobram R$49.99/semana (R$2600/ano!), (2) limitam 60 segundos no free tier, ou (3) têm marca d'água gigante. Sério? Pagar mais que Netflix pra rolar texto?
        </p>

        <p className="mb-8">
            Este guia mostra EXATAMENTE como transformar iPhone/iPad em teleprompter PRO em 45 segundos: zero instalação App Store, zero mensalidade, funciona offline, sincroniza via AirPlay/P2P.
        </p>

        <div className="bg-gradient-to-r from-red-900/30 to-green-900/30 p-8 rounded-xl border border-slate-700 mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Setup iOS: App Store vs Web App</h2>
            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-slate-900/70 p-6 rounded-lg border border-red-500/30">
                    <h3 className="font-bold text-red-400 mb-4 flex items-center gap-2">
                        <span>❌</span> Apps da App Store (Freemium Trap)
                    </h3>
                    <ul className="space-y-3 text-slate-300 text-sm">
                        <li>💰 <strong>Preço:</strong> R$49.99/semana = R$2600/ano</li>
                        <li>⏱️ <strong>Free tier:</strong> Limite 60s texto (inútil)</li>
                        <li>📱 <strong>Instalação:</strong> 250MB download + login obrigatório</li>
                        <li>🔒 <strong>Dados:</strong> Roteiros enviados pra nuvem deles</li>
                        <li>💾 <strong>Storage:</strong> Ocupa 500MB-1GB iPhone</li>
                    </ul>
                </div>
                <div className="bg-slate-900/70 p-6 rounded-lg border border-green-500/30">
                    <h3 className="font-bold text-green-400 mb-4 flex items-center gap-2">
                        <span>✅</span> PromptNinja (Web App PWA)
                    </h3>
                    <ul className="space-y-3 text-slate-300 text-sm">
                        <li>💰 <strong>Preço:</strong> R$0,00 (grátis ilimitado)</li>
                        <li>⏱️ <strong>Sem limites:</strong> Roteiros de 50+ páginas OK</li>
                        <li>📱 <strong>"Instalação":</strong> Add to Home Screen (2s)</li>
                        <li>🔒 <strong>Dados:</strong> 100% local (localStorage iOS)</li>
                        <li>💾 <strong>Storage:</strong> ~5MB cache (1% de um app)</li>
                    </ul>
                </div>
            </div>
            <p className="text-slate-400 text-sm mt-6 italic text-center">
                💡 Web App = economia R$2600/ano + privacidade total.
            </p>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">3 Setups iOS Profissionais</h2>
        <div className="space-y-6 mb-12">
            <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-cyan-500">
                <h3 className="text-xl font-bold text-cyan-400 mb-3">Setup #1: iPhone Solo (Vlog/TikTok)</h3>
                <p className="text-slate-300 mb-4">
                    <strong>Hardware:</strong> iPhone com tripé/gimbal.
                </p>
                <ol className="list-decimal list-inside space-y-2 text-slate-300 text-sm">
                    <li>Safari → PromptNinja.solutionkit.com.br</li>
                    <li>Share → <strong>Add to Home Screen</strong> (ícone aparece como app)</li>
                    <li>Cole roteiro, fonte 28-32px</li>
                    <li>Posiciona iPhone em tripé, câmera frontal</li>
                    <li>PromptNinja embaixo da câmera frontal (você lê olhando "pra lens")</li>
                    <li>Grava no app Câmera nativo (ProRes/Cinematic)</li>
                </ol>
                <p className="text-green-400 text-sm mt-3">✅ <strong>Ideal pra:</strong> Stories, vlogs, reels, conteúdo vertical.</p>
            </div>

            <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-purple-500">
                <h3 className="text-xl font-bold text-purple-400 mb-3">Setup #2: iPad + iPhone (Dual Device PRO)</h3>
                <p className="text-slate-300 mb-4">
                    <strong>Hardware:</strong> iPad (teleprompter) + iPhone (controle remoto).
                </p>
                <ol className="list-decimal list-inside space-y-2 text-slate-300 text-sm">
                    <li><strong>iPad:</strong> PromptNinja fullscreen, posiciona abaixo da DSLR/mirrorless</li>
                    <li><strong>iPhone:</strong> Scan QR code do iPad (botão "Remote" no PromptNinja)</li>
                    <li>iPhone vira controle wireless instantâneo (pause, speed, reset)</li>
                    <li>Grave com DSLR olhando pro iPad = parecer olhar pra câmera</li>
                    <li>Mãos livres durante gravação (scroll via iPhone)</li>
                </ol>
                <p className="text-green-400 text-sm mt-3">✅ <strong>Ideal pra:</strong> YouTube profissional, cursos online, corporativo.</p>
            </div>

            <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-red-500">
                <h3 className="text-xl font-bold text-red-400 mb-3">Setup #3: iPad + Mac via AirPlay (Wireless Mirror)</h3>
                <p className="text-slate-300 mb-4">
                    <strong>Hardware:</strong> MacBook + iPad + mesma rede WiFi.
                </p>
                <ol className="list-decimal list-inside space-y-2 text-slate-300 text-sm">
                    <li><strong>Mac:</strong> Abra PromptNinja no Safari/Chrome</li>
                    <li><strong>iPad:</strong> Control Center → Screen Mirroring → seleciona Mac</li>
                    <li>Tela Mac aparece no iPad (wireless zero lag)</li>
                    <li>Controla roteiro do Mac, iPad só mostra (como monitor externo)</li>
                    <li>Posiciona iPad abaixo da webcam Mac</li>
                </ol>
                <p className="text-yellow-400 text-sm mt-3">⚠️ <strong>Pro tip:</strong> Ou use P2P direto (Mac = display, iPhone = remote) sem AirPlay.</p>
            </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg my-8 border-l-4 border-green-500">
            <h2 className="text-2xl font-bold text-white mb-4">PWA no iOS: App "Nativo" Sem App Store</h2>
            <p className="text-slate-300 mb-4">
                iOS tem PWA (Progressive Web App) desde 2018. PromptNinja vira "app nativo" em 3 taps:
            </p>
            <SEOContentHowTo
                title=""
                schemaTitle="Como Instalar Teleprompter no iPhone/iPad (PWA)"
                totalTime="PT1M"
                tools={["iPhone ou iPad", "Safari"]}
                steps={[
                    {
                        title: "Passo 1: Abra no Safari",
                        text: "Acesse promptninja.solutionkit.com.br NO SAFARI (Chrome iOS não suporta PWA)."
                    },
                    {
                        title: "Passo 2: Share → Add to Home Screen",
                        text: "Toque ícone Share (quadrado com seta) → 'Add to Home Screen' → Confirme."
                    },
                    {
                        title: "Passo 3: Abra como App",
                        text: "Ícone PromptNinja aparece na Home Screen. Abre em fullscreen, parece app nativo, funciona offline."
                    }
                ]}
            />
            <p className="text-green-400 text-sm mt-4">
                ✅ <strong>Benefícios PWA:</strong> (1) Fullscreen sem barra Safari, (2) Funciona offline, (3) Ícone bonito na Home, (4) Zero espaço (só cache), (5) Atualiza automático.
            </p>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">5 Erros iOS Que Matam Profissionalismo</h2>
        <div className="space-y-4 mb-12">
            <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-red-500">
                <h4 className="font-bold text-red-400 mb-2">Erro #1: Usar Chrome iOS Pra PWA (Não Funciona)</h4>
                <p className="text-slate-300 text-sm">
                    Abre PromptNinja no Chrome iOS. Tenta "Add to Home Screen"... opção desabilitada. Chrome iOS = apenas wrapper do Safari SEM suporte PWA.
                    <span className="text-green-400 block mt-2">✅ <strong>Solução:</strong> USE SAFARI. Único browser iOS com PWA real. Chrome/Firefox iOS = limitados pela Apple.</span>
                </p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-red-500">
                <h4 className="font-bold text-red-400 mb-2">Erro #2: iPad Muito Longe da Câmera (Olha Pro Lado)</h4>
                <p className="text-slate-300 text-sm">
                    iPad 1 metro à ESQUERDA da DSLR mirrorless. Você grava olhando 60º pro lado. Parece entrevista estranha onde você nunca olha pro entrevistador.
                    <span className="text-green-400 block mt-2">✅ <strong>Solução:</strong> iPad DIRETAMENTE embaixo ou atrás da lens. Máximo 15cm distância. Olhos leem = parecem olhar pra câmera.</span>
                </p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-red-500">
                <h4 className="font-bold text-red-400 mb-2">Erro #3: Brilho Tela Baixo (Reflexo Nos Óculos Some)</h4>
                <p className="text-slate-300 text-sm">
                    Brilho iPad 30% pra "economizar bateria durante gravação". Texto quase invisível. Você aproxima cara = postura ruim. Ou aumenta fonte = texto gigante óbvio.
                    <span className="text-green-400 block mt-2">✅ <strong>Solução:</strong> Brilho 80-100% durante gravação. iPad plugado na tomada (não depende bateria). Texto visível = postura natural.</span>
                </p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-red-500">
                <h4 className="font-bold text-red-400 mb-2">Erro #4: Ignorar Modo "Não Perturbe" (Notificação Mid-Record)</h4>
                <p className="text-slate-300 text-sm">
                    Take perfeita de 5min. WhatsApp notification COVER o texto. Você para, perde linha, regrava tudo. 5min desperdiçados.
                    <span className="text-green-400 block mt-2">✅ <strong>Solução:</strong> SEMPRE ative "Não Perturbe" antes gravar (Control Center → Lua). Ou use Focus Mode "Gravação".</span>
                </p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-red-500">
                <h4 className="font-bold text-red-400 mb-2">Erro #5: Esquecer Que Safari Volta Aba Anterior (Perde Posição)</h4>
                <p className="text-slate-300 text-sm">
                    Gravando. Safari tá com PromptNinja. Você acidentalmente swipe volta pra Google. Quando volta no PromptNinja... texto resetou pro início. Perdeu posição.
                    <span className="text-green-400 block mt-2">✅ <strong>Solução:</strong> Use PWA (Add to Home Screen) = abre em app dedicado, NUNCA mistura com abas Safari. Ou trave tela (Guided Access).</span>
                </p>
            </div>
        </div>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">iOS Features Exclusivos</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-2">🎥 ProRes Recording</h3>
                <p className="text-sm text-slate-300">iPhone 13 Pro+: Grave 4K ProRes ENQUANTO lê do teleprompter. PromptNinja em segundo plano = zero interferência codec ProRes.</p>
            </div>
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-2">📱 Handoff (Continuity)</h3>
                <p className="text-sm text-slate-300">Começa roteiro no Mac. Pega iPhone. Notification "Continue from Mac" = abre EXATO mesmo ponto. Ecossistema Apple magic.</p>
            </div>
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-2">✈️ Modo Avião OK</h3>
                <p className="text-sm text-slate-300">PWA funciona 100% offline. Grave em avião, floresta, anywhere. Só precisa WiFi pra controle remoto P2P (opcional).</p>
            </div>
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-2">🎨 Dynamic Island Friendly</h3>
                <p className="text-sm text-slate-300">iPhone 14 Pro+: PromptNinja respeita Dynamic Island. Texto não fica embaixo dela. Layout adapta automaticamente.</p>
            </div>
        </div>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Controle Remoto P2P (iPhone ↔ iPad)</h2>
        <p className="mb-4">
            Setup mais popular: iPad = teleprompter display, iPhone = controle wireless.
        </p>
        <ol className="list-decimal list-inside space-y-2 mb-6 text-slate-300">
            <li><strong>iPad:</strong> PromptNinja aberto, toca botão "Remote" → QR code aparece</li>
            <li><strong>iPhone:</strong> Câmera nativa scan QR code → abre PromptNinja em modo Remote</li>
            <li>Dispositivos conectam via WiFi LOCAL (P2P WebRTC)</li>
            <li>iPhone controla: Play/Pause, Speed ↑↓, Reset, Skip paragraph</li>
            <li>Latência menos que 50ms (imperceptível)</li>
        </ol>
        <p className="text-yellow-400 text-sm">💡 <strong>Pro tip:</strong> Funciona SEM internet. Só precisa ambos na mesma rede WiFi (ou hotspot iPhone).</p>

        <div className="text-center bg-slate-800 p-8 rounded-lg my-10">
            <h2 className="text-3xl font-bold text-white mb-4">📱 Transforme Seu iPhone/iPad Agora</h2>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                Câmera PRO merece teleprompter PRO. Zero App Store, zero mensalidade, zero limite.
            </p>
            <a
                href="/?lang=pt#app"
                className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 font-bold py-3 px-8 rounded-full transition hover:brightness-110"
                style={{ color: 'white' }}
            >
                🚀 Abrir no Safari (Add to Home Screen)
            </a>
            <p className="text-slate-400 mt-4 text-sm">PWA • Offline • P2P Remote • Grátis ilimitado</p>
        </div>

        <SEOContentFAQ
            title="Perguntas Frequentes - Usuários iPhone/iPad"
            items={[
                {
                    question: "Preciso baixar app da App Store?",
                    answer: "NÃO. PromptNinja é Web App (PWA). Acessa no Safari → 'Add to Home Screen' = vira app nativo VISUAL (fullscreen, ícone, offline). Mas tecnicamente não baixou nada da App Store. Economia: R$2600/ano vs apps pagos."
                },
                {
                    question: "Funciona offline (sem internet)?",
                    answer: "SIM! Depois carregar uma vez, fica em cache iOS. Funciona em modo avião, metrô, floresta. Roteiros salvos em localStorage (no seu iPhone). Só precisa internet pra: (1) primeiro load e (2) controle remoto P2P (opcional)."
                },
                {
                    question: "Posso controlar iPad usando iPhone (2 devices)?",
                    answer: "EXATO! Setup favorito: iPad = display grande (embaixo câmera DSLR), iPhone = controle remoto wireless (na mão, no bolso, anywhere). Scan QR code = conecta instantâneo via WiFi local. Latência <50ms."
                },
                {
                    question: "Por que usar Safari e não Chrome iOS?",
                    answer: "Chrome/Firefox iOS = wrappers do Safari limitados pela Apple. NÃO suportam PWA real (Add to Home Screen desabilitado). Safari = ÚNICO com PWA completo: offline, fullscreen, notificações, localStorage ilimitado."
                },
                {
                    question: "Consome muita bateria durante gravação longa?",
                    answer: "~5-8% bateria por hora (menos que YouTube). iPhone 15 Pro (bateria 3200mAh) = ~4h uso contínuo. Pro tip: Plugue iPad na tomada se gravação >2h. Brilho 100% consome mais, mas texto fica visível = postura melhor."
                },
                {
                    question: "Dá pra gravar ProRes/Cinematic Mode ENQUANTO usa teleprompter?",
                    answer: "SIM! PromptNinja roda em segundo plano. Grave no app Câmera nativo (ProRes, Cinematic, Action Mode) enquanto Safari/PWA tá aberto. iOS gerencia RAM automaticamente. Testado iPhone 13 Pro+ = zero problema."
                },
                {
                    question: "Texto aparece invertido (modo espelho) pra usar com vidro DIY?",
                    answer: "SIM! Settings → Mirror Mode = texto espelha horizontalmente. Perfeito pra setup DIY: iPad atrás de vidro semi-transparente (beam splitter). Você lê através do vidro, câmera vê sua cara SEM ver iPad."
                },
                {
                    question: "Posso usar com AirPlay (iPad → Mac/Apple TV)?",
                    answer: "SIM mas desnecessário. Melhor usar P2P direto (Mac teleprompter, iPhone remote). AirPlay adiciona ~200ms lag. P2P = <50ms. Ambos mesma rede WiFi, mas P2P WebRTC muito mais responsivo que AirPlay Mirroring."
                }
            ]}
        />
    </>
);
