import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";

export const TeleprompterObsStudioPT = () => (
    <>
        <h1 className="text-4xl font-bold text-white mb-6">Como Usar Teleprompter no OBS Studio: O Guia Definitivo para Streamers</h1>

        <p className="lead text-xl text-slate-300 mb-8">
            Para streamers e criadores de conteúdo ao vivo, alternar entre janelas para ler o roteiro é um pesadelo que quebra a imersão. O PromptNinja oferece a solução perfeita: integre o teleprompter diretamente no OBS Studio como uma fonte de navegador transparente ou use-o em um monitor secundário com controle remoto P2P. Use nossos <strong>temas Chroma Key (verde e azul)</strong> para remover o fundo e deixar apenas o texto flutuando sobre sua cena.
        </p>

        <div className="bg-slate-800 p-6 rounded-lg my-8 border-l-4 border-blue-600">
            <h2 className="text-2xl font-bold text-white mb-2">Por que Streamers Profissionais Escolhem o PromptNinja?</h2>
            <p className="text-slate-300">
                A estabilidade é crucial. Nosso sistema <strong>P2P (Peer-to-Peer)</strong> garante que o controle do texto (via celular) não consuma banda da sua live.
                <br /><br />
                Além disso, o tema "Chroma Key" permite que você sobreponha o texto diretamente na sua tela de jogo ou câmera, visível apenas para você (se usar projeção) ou para seu público (se desejar legendas ao vivo).
            </p>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Tutorial: PromptNinja no OBS Studio</h2>
        <div className="bg-slate-800 p-6 rounded-lg my-6">
            <ol className="list-decimal pl-6 space-y-6 text-slate-300">
                <li>
                    <strong>Fonte de Navegador (Browser Source):</strong> No OBS, adicione uma nova "Fonte de Navegador". Cole a URL do seu ID de sessão do PromptNinja (que você gera ao clicar em "Espelhar" ou "Conectar Remoto").
                </li>
                <li>
                    <strong>Interaja com a Fonte:</strong> Clique com o botão direito na fonte e selecione "Interagir" para fazer ajustes iniciais, se necessário.
                </li>
                <li>
                    <strong>Use o Celular como Stream Deck:</strong> Com o PromptNinja aberto no OBS, conecte seu celular via QR Code. Agora você tem um controlador dedicado para seus roteiros, sem precisar de Alt-Tab.
                </li>
                <li>
                    <strong>Temas Chroma Key (Verde/Azul):</strong> Ative o tema <strong>Chroma Green</strong> ou <strong>Chroma Blue</strong> no PromptNinja. No OBS, aplique o filtro "Chroma Key" na fonte do navegador para remover completamente o fundo colorido, deixando apenas o texto flutuando de forma profissional sobre sua gameplay ou câmera. Perfeito para quem quer parecer um apresentador de telejornal.
                </li>
            </ol>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Melhore sua Retenção em Lives</h2>
        <p className="mb-6">
            Ler o chat, agradecer subs e seguir o roteiro ao mesmo tempo é difícil. O PromptNinja ajuda você a manter a linha de raciocínio nos momentos cruciais da live (abertura, sponsors, encerramento).
        </p>

        <div className="text-center mt-12">
            <a
                href="https://promptninja.solutionkit.com.br"
                className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 font-bold py-3 px-6 rounded-lg transition hover:brightness-110"
                style={{ color: 'white' }}
            >
                Turbine sua Stream com PromptNinja
            </a>
        </div>

        <SEOContentFAQ
            title="Perguntas Frequentes sobre OBS e Teleprompter"
            items={[
                {
                    question: "Como removo o fundo do texto no OBS?",
                    answer: "No PromptNinja, mude o tema para 'Chroma Green'. No OBS, clique com o botão direito na fonte do navegador, vá em Filtros e adicione 'Chroma Key'. O verde ficará transparente."
                },
                {
                    question: "Funciona também com Streamlabs e Twitch Studio?",
                    answer: "Sim. A lógica é a mesma: adicione como uma 'Fonte de Navegador' (Browser Source). O PromptNinja é compatível com qualquer software de transmissão que aceite fontes web."
                },
                {
                    question: "Existe atraso (delay) no controle remoto?",
                    answer: "Virtualmente zero. Usamos tecnologia WebRTC que conecta seu celular e PC diretamente via rede local, garantindo latência abaixo de 20ms, imperceptível para uso humano."
                }
            ]}
        />
    </>
);
