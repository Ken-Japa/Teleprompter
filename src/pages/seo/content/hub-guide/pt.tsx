import { ROUTES_CONFIG } from "../../../../config/routes";
import { SEOImage } from "../../../../components/seo/SEOImage";

export const HubGuideContentPT = () => (
    <>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Guia Completo de Teleprompter: O Maior Repositório de Conhecimento
        </h2>

        <p className="lead text-xl text-slate-300 mb-8 font-medium">
            Domine a arte da comunicação e eleve o nível das suas produções. <strong>Explore tudo o que você precisa saber</strong> sobre teleprompters, de técnicas de leitura a equipamentos profissionais.
        </p>

        <SEOImage
            slug="guia-completo-teleprompter"
            src="complete-guide-teleprompter-everything-about.webp"
            alt="Guia completo de teleprompter e oratória"
            caption="Nosso hub de conhecimento reúne tudo o que você precisa para dominar a arte de falar em frente às câmeras."
            width={1200}
            height={675}
        />

        <p className="text-slate-300 mb-8">
            Seja você um iniciante buscando pela primeira vez entender o que é um teleprompter, ou um profissional experiente atrás das melhores ferramentas e roteiros, este guia foi desenhado para você. No PromptNinja, consolidamos anos de experiência em vídeos, oratória e tecnologia para criar o hub definitivo sobre o assunto. Aqui, você aprenderá desde a montagem de um setup de baixo custo até a utilização de funções avançadas como rolagem por voz e sincronização multi-dispositivos. Descubra como economizar horas de edição gravando em tomada única e transmita uma autoridade inabalável olhando diretamente para sua audiência.
        </p>

        <section id="oque" className="mb-16">
            <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="bg-purple-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                O Que É Teleprompter?
            </h3>
            <p>
                O <a href={ROUTES_CONFIG.SEO_O_QUE_E.paths.pt}>Teleprompter</a> (ou "prompter") é a ferramenta secreta por trás de apresentadores de TV, presidentes e youtubers de sucesso. Ele permite que você leia um texto enquanto olha diretamente para a lente da câmera.
            </p>
            <p>
                Isso cria uma conexão imediata com seu público, pois simula o contato visual natural. Ninguém percebe que você está lendo, e você nunca mais esquece o que tem a dizer.
            </p>
        </section>

        <section id="como-usar" className="mb-16">
            <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="bg-purple-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                Como Usar (Passo a Passo)
            </h3>
            <p>
                Usar um teleprompter hoje é muito mais fácil do que na época da TV analógica. Você não precisa de equipamentos de R$ 5.000.
            </p>
            <h3 className="text-xl font-bold text-white mt-8 mb-4">O Setup Básico</h3>
            <ul className="list-disc pl-6 space-y-4 marker:text-purple-500">
                <li>
                    <strong>No Computador:</strong> Basta acessar o <a href={ROUTES_CONFIG.SEO_PC_WINDOWS.paths.pt}>PromptNinja no navegador</a>. Ideal para aulas online, Zoom e Google Meet.
                </li>
                <li>
                    <strong>No Celular/Tablet:</strong> Use nosso <a href={ROUTES_CONFIG.SEO_PWA_INSTALL.paths.pt}>Web App (PWA)</a> que funciona offline. Posicione o celular próximo à lente da câmera.
                </li>
                <li>
                    <strong>Kit Profissional:</strong> Use um "Beam Splitter" (vidro reflexivo) com um <a href={ROUTES_CONFIG.SEO_TABLET.paths.pt}>Tablet</a> embaixo.
                </li>
            </ul>
        </section>

        <section id="apps" className="mb-16">
            <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="bg-purple-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
                Melhores Apps e Ferramentas
            </h3>
            <p>
                Existem dezenas de opções, mas o futuro é <strong>Web-Based</strong>. Por que baixar um app pesado se você pode usar direto no navegador?
            </p>
            <div className="bg-slate-800 p-6 rounded-xl my-6">
                <h4 className="font-bold text-lg text-white mb-2">Por que o PromptNinja?</h4>
                <ul className="grid md:grid-cols-2 gap-4">
                    <li className="flex items-center gap-2">✅ <strong>100% Grátis</strong> (sem marcas d'água gigantes)</li>
                    <li className="flex items-center gap-2">✅ <strong>Privacidade Total</strong> (seus dados não saem do seu PC)</li>
                    <li className="flex items-center gap-2">✅ <strong>Comando de Voz</strong> (o texto rola quando você fala)</li>
                    <li className="flex items-center gap-2">✅ <strong>Funciona Offline</strong></li>
                </ul>
            </div>
            <p>
                Veja nossa comparação completa do <a href={ROUTES_CONFIG.SEO_MELHOR_APP.paths.pt}>Melhor App de Teleprompter</a> e também <a href={ROUTES_CONFIG.SEO_ALTERNATIVAS.paths.pt}>Alternativas aos concorrentes</a>.
            </p>
        </section>

        <section id="diy" className="mb-16">
            <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="bg-purple-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">4</span>
                DIY vs Profissional
            </h3>
            <p>
                Você pode começar com zero investimento. Temos um guia incrível sobre <a href={ROUTES_CONFIG.SEO_DIY.paths.pt}>Como fazer um Teleprompter Caseiro</a> usando capa de CD ou vidro de porta-retrato.
            </p>
            <p>
                Se você busca qualidade máxima para o YouTube, veja nossas dicas de <a href={ROUTES_CONFIG.SEO_HARDWARE_VS_WEB.paths.pt}>Hardware vs Software</a>.
            </p>
        </section>

        <section id="casos" className="mb-16">
            <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="bg-purple-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">5</span>
                Casos de Uso Específicos
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-purple-500 transition-colors">
                    <h3 className="font-bold text-white mb-2">📹 Youtubers e Creators</h3>
                    <p className="text-sm text-slate-400 mb-4">
                        Grave vídeos longos em "One Take" (tomada única). Economize horas de edição.
                    </p>
                    <a href={ROUTES_CONFIG.SEO_YOUTUBERS.paths.pt} className="text-purple-400 text-sm font-bold hover:underline">Ver Guia para Creators →</a>
                </div>
                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-purple-500 transition-colors">
                    <h3 className="font-bold text-white mb-2">💼 Home Office e Reuniões</h3>
                    <p className="text-sm text-slate-400 mb-4">
                        Impressione seu chefe no Zoom, Teams ou Meet. Fale sem gaguejar e com autoridade.
                    </p>
                    <a href={ROUTES_CONFIG.SEO_ZOOM.paths.pt} className="text-purple-400 text-sm font-bold hover:underline">Guia para Reuniões →</a>
                </div>
                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-purple-500 transition-colors">
                    <h3 className="font-bold text-white mb-2">🎵 Músicos e Cantores</h3>
                    <p className="text-sm text-slate-400 mb-4">
                        Nunca mais esqueça a letra da música no show ou na live.
                    </p>
                    <a href={ROUTES_CONFIG.SEO_MODO_MUSICO.paths.pt} className="text-purple-400 text-sm font-bold hover:underline">Modo Músico →</a>
                </div>
                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-purple-500 transition-colors">
                    <h3 className="font-bold text-white mb-2">🏋️ Fitness e Treinos</h3>
                    <p className="text-sm text-slate-400 mb-4">
                        Dê aulas de exercícios cronometradas com perfeição usando nosso timer.
                    </p>
                    <a href={ROUTES_CONFIG.SEO_FITNESS.paths.pt} className="text-purple-400 text-sm font-bold hover:underline">Para Personal Trainers →</a>
                </div>
            </div>
        </section>

        <section id="recursos" className="mb-16">
            <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="bg-purple-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">6</span>
                Scripts e Oratória
            </h3>
            <p>
                A ferramenta é inútil sem um bom conteúdo. Por isso, criamos uma biblioteca de <a href={ROUTES_CONFIG.SEO_SCRIPTS.paths.pt}>Scripts para Teleprompter</a> prontos para usar.
            </p>
            <p>
                Além disso, confira nossas <a href={ROUTES_CONFIG.SEO_ORATORIA.paths.pt}>Dicas de Oratória para Vídeo</a> e aprenda <a href={ROUTES_CONFIG.SEO_DECORAR.paths.pt}>como decorar textos rápido</a> caso o prompter falhe (o que não vai acontecer conosco, veja nossa solução <a href={ROUTES_CONFIG.SEO_TRAVANDO.paths.pt}>Anti-Travamento</a>).
            </p>
        </section>
    </>
);
