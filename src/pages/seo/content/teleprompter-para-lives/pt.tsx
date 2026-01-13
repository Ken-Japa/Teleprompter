import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { ROUTES_CONFIG } from "../../../../config/routes";

export const TeleprompterParaLivesPT = () => (
    <>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Teleprompter para Lives e Streamings: Engaje seu Público com Fluidez
        </h2>

        <p className="lead text-xl text-slate-300 mb-8 font-medium">
            Fazer uma transmissão ao vivo é como caminhar em uma corda bamba. Você precisa monitorar o chat, gerenciar o áudio, interagir com os viewers e, ao mesmo tempo, não perder o fio da meada. <strong>Quantas vezes você já viu um streamer se perder em divagações e ver a audiência despencar em tempo real?</strong>
        </p>

        <p className="text-slate-300 mb-8">
            Neste guia prático, vamos te mostrar como o <strong>PromptNinja</strong> se torna o seu copiloto invisível durante lives na Twitch, YouTube ou Instagram. Aprenda como configurar um roteiro ou tópicos estratégicos que ficam visíveis apenas para você, permitindo que você entregue conteúdo de alto valor e anúncios de patrocínio com perfeição, sem nunca tirar o foco da sua comunidade. Descubra o setup ideal para OBS Studio e como usar o controle remoto via celular para ter fluidez total sem gaguejar!
        </p>

        <div className="bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg mb-12">
            <h3 className="text-3xl font-bold text-white mb-6">O Problema da Live Sem Roteiro</h3>
            <p className="text-slate-300 mb-6">
                Você já assistiu a uma live onde o apresentador divaga por 10 minutos, gagueja e perde o fio da meada? A audiência cai na hora. Ter tópicos ou um roteiro completo na tela garante que você entregue valor constante, aumentando a retenção.
            </p>
            <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-red-500">
                <p className="text-slate-300">
                    <strong className="text-red-400">O Desafio:</strong> Como ler o roteiro sem tirar os olhos da câmera e sem que o roteiro apareça na transmissão do OBS?
                </p>
            </div>
        </div>

        <h3 className="text-3xl font-bold text-white mt-12 mb-6">A Solução: Overlay Invisível com PromptNinja</h3>
        <p className="text-slate-300 mb-8">
            O PromptNinja permite que você coloque uma janela transparente de teleprompter <strong>sobre</strong> o seu software de transmissão (OBS Studio, vMix, Streamlabs), mas posicionada fisicamente na tela bem abaixo da sua webcam.
        </p>

        <h3 className="text-2xl font-bold text-white mt-8 mb-4">Passo a Passo para Setup de Live</h3>
        <ol className="list-decimal list-inside space-y-4 text-slate-300 mb-12">
            <li className="pl-2">
                <strong className="text-white">Abra o PromptNinja em uma Janela Separada:</strong>
                <br /> Não use tela cheia. Redimensione a janela do navegador para ficar estreita e transparente.
            </li>
            <li className="pl-2">
                <strong className="text-white">Posicione no Topo:</strong>
                <br /> Arraste essa janela para o centro superior do seu monitor, logo abaixo da webcam.
            </li>
            <li className="pl-2">
                <strong className="text-white">Controle pelo Celular (O Pulo do Gato):</strong>
                <br /> Conecte seu celular como controle remoto. Assim, você pode dar play/pause ou mudar a velocidade discretamente, com o celular fora do enquadramento, sem precisar usar o mouse.
            </li>
            <li className="pl-2">
                <strong className="text-white">Não Capture essa Janela no OBS:</strong>
                <br /> No OBS, em vez de usar "Captura de Tela" (que mostraria o teleprompter), use "Captura de Janela" ou "Captura de Jogo" para capturar apenas o game ou o slide que você quer mostrar. O teleprompter fica visível só para você!
            </li>
        </ol>

        <h3 className="text-3xl font-bold text-white mt-12 mb-6">Roteiro vs. Tópicos em Lives</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="border border-slate-700 p-6 rounded-lg bg-slate-800/50">
                <h3 className="text-xl font-bold text-blue-400 mb-2">Roteiro Completo</h3>
                <p className="text-slate-400 text-sm mb-4">
                    Ideal para a <strong>Introdução</strong> e a <strong>Conclusão/CTA</strong>. São momentos críticos onde você não pode errar ou esquecer de pedir o like/inscrito.
                </p>
            </div>
            <div className="border border-slate-700 p-6 rounded-lg bg-slate-800/50">
                <h3 className="text-xl font-bold text-purple-400 mb-2">Tópicos (Bullet Points)</h3>
                <p className="text-slate-400 text-sm mb-4">
                    Ideal para o <strong>Conteúdo Principal</strong>. Coloque palavras-chave no teleprompter e role manualmente conforme avança nos assuntos. Isso mantém a naturalidade da live.
                </p>
            </div>
        </div>

        <SEOContentFAQ
            title="Dúvidas de Streamers"
            items={[
                {
                    question: "O PromptNinja consome muita CPU durante a live?",
                    answer: "Não. O PromptNinja é extremamente leve. Ele não vai derrubar seus FPS em jogos ou sobrecarregar a codificação do OBS."
                },
                {
                    question: "O público vai ver meu teleprompter na live?",
                    answer: "Só se você compartilhar a tela inteira (Display Capture). Se você compartilhar apenas janelas específicas (Window Capture) no OBS, o teleprompter fica invisível para a live, mas visível para você."
                },
                {
                    question: "Como controlo a velocidade se estiver jogando?",
                    answer: "Use o celular como controle remoto. Deixe-o apoiado na mesa. Um toque rápido na tela do celular pausa ou continua o texto, sem precisar dar Alt-Tab no jogo."
                }
            ]}
        />

        <div className="text-center mt-12 pb-12">
            <a
                href="https://promptninja.solutionkit.com.br/#app"
                className="inline-block bg-gradient-to-r from-purple-600 to-indigo-500 font-bold py-4 px-10 rounded-full transition hover:scale-105 shadow-xl text-white text-lg"
            >
                Configure Sua Live Profissional Agora (Grátis)
            </a>
        </div>

        <div className="border-t border-slate-800 pt-12 mt-12">
            <h3 className="text-2xl font-bold text-white mb-6">Veja Também</h3>
            <ul className="space-y-4">
                <li>
                    <a href={ROUTES_CONFIG.SEO_ZOOM.paths.pt} className="text-purple-400 hover:text-purple-300 hover:underline text-lg">
                        💻 Melhor Teleprompter para Zoom e Reuniões
                    </a>
                </li>
                <li>
                    <a href={ROUTES_CONFIG.SEO_ORATORIA.paths.pt} className="text-purple-400 hover:text-purple-300 hover:underline text-lg">
                        🗣️ Dicas de Oratória para Falar em Vídeo
                    </a>
                </li>
                <li>
                    <a href={ROUTES_CONFIG.SEO_YOUTUBERS.paths.pt} className="text-purple-400 hover:text-purple-300 hover:underline text-lg">
                        📹 Teleprompter para YouTubers e Criadores
                    </a>
                </li>
            </ul>
        </div>
    </>
);
