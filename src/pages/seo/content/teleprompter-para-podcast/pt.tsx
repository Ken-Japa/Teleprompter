import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { SEOImage } from "../../../../components/seo/SEOImage";
import { ROUTES_CONFIG } from "../../../../config/routes";

export const TeleprompterParaPodcastPT = () => (
    <>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Como Usar Teleprompter em Videocasts: O Segredo da Fluidez Profissional
        </h2>

        <p className="lead text-xl text-slate-300 mb-8 font-medium">
            "Olá a todos e bem-vindos a... uh... qual o número do episódio mesmo?" Se você já passou por isso, sabe que o charme de um podcast pode ser arruinado por gaguejos e esquecimentos. <strong>Podcasters profissionais não improvisam tudo; eles usam sistemas que garantem a perfeição das intros e anúncios.</strong>
        </p>

        <p className="text-slate-300 mb-8">
            Neste artigo, vamos revelar como o <strong>PromptNinja</strong> se tornou a ferramenta secreta para manter o fluxo da conversa sem perder a espontaneidade. Aprenda onde posicionar o teleprompter no seu setup de videocast para manter o contato visual com a audiência e o convidado, e descubra como garantir que seus anúncios de patrocínio sejam lidos com a precisão exigida pelas grandes marcas, tudo isso de forma gratuita e intuitiva.
        </p>

        <SEOImage
            slug="teleprompter-para-podcast"
            src="teleprompter-podcast-audio-recording.webp"
            alt="Podcast sendo gravado com teleprompter"
            caption="O teleprompter garante que o apresentador mantenha o contato visual com os convidados enquanto segue o roteiro."
            width={1200}
            height={675}
            priority={true}
        />

        <div className="bg-blue-600/10 border border-blue-500/20 rounded-2xl p-6 md:p-8 text-center mb-12">
            <h3 className="text-2xl font-bold text-white mb-4">Grave com Confiança e Fluidez</h3>
            <p className="text-slate-300 mb-6">
                Elimine o "ééé..." e as pausas desconfortáveis. Com o <strong>PromptNinja</strong>, suas intros e
                ads de patrocínio ficam impecáveis logo na primeira gravação.
            </p>
            <a href="https://promptninja.solutionkit.com.br/#app" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all hover:scale-105 shadow-lg shadow-blue-500/25">
                Experimentar PromptNinja Grátis
            </a>
        </div>

        <div className="bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg mb-12">
            <h3 className="text-3xl font-bold text-white mb-6">Onde Usar (e Onde NÃO Usar)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-green-900/20 border border-green-800 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-green-400 mb-4">✅ USE PARA:</h3>
                    <ul className="space-y-3 text-slate-300">
                        <li><strong>Introdução do Episódio:</strong> "No episódio de hoje, vamos falar com Fulano sobre..." (Fica enérgico e sem erros).</li>
                        <li><strong>Leitura de Ads (Patrocínio):</strong> Marcas odeiam quando você erra o nome do produto ou esquece o cupom. Leia o copy exato.</li>
                        <li><strong>Biografia do Convidado:</strong> "Ele é formado em Harvard, autor de 3 livros..." (Não confie na memória para currículos).</li>
                        <li><strong>Encerramento (CTA):</strong> Pedir like, sininho e newsletter.</li>
                    </ul>
                </div>
                <div className="bg-red-900/20 border border-red-800 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-red-400 mb-4">❌ NÃO USE PARA:</h3>
                    <ul className="space-y-3 text-slate-300">
                        <li><strong>A Entrevista em Si:</strong> O charme do podcast é a conversa espontânea. Não roteirize as perguntas e respostas, use apenas tópicos.</li>
                        <li><strong>Reações:</strong> Risadas e surpresas devem ser genuínas.</li>
                    </ul>
                </div>
            </div>
        </div>

        <h3 className="text-3xl font-bold text-white mt-12 mb-6">Setup para Videocast (Mesa)</h3>
        <p className="text-slate-300 mb-8">
            Diferente do estúdio de TV, no podcast você geralmente está olhando para o convidado ou para um microfone, e não para a câmera o tempo todo. Porém, nas introduções, <strong>o contato visual com a câmera é essencial</strong> para conectar com quem assiste no YouTube/Spotify Video.
        </p>

        <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-purple-500 mb-12">
            <h3 className="text-xl font-bold text-white mb-2">A Técnica Híbrida do PromptNinja</h3>
            <p className="text-slate-300">
                Coloque um tablet ou celular com o PromptNinja rodando logo abaixo da lente da sua câmera principal. Use o modo "Espelhado" se tiver um vidro, ou o modo normal se for apenas a tela.
                <br /><br />
                Quando for falar com a audiência (Intro/Ad), olhe para a lente/prompter. Quando for falar com o convidado, ignore o prompter.
            </p>
        </div>

        <h3 className="text-3xl font-bold text-white mt-12 mb-6">Dicas de Edição</h3>
        <p className="text-slate-300 mb-8">
            Muitos podcasters gravam a introdução e os anúncios <strong>depois</strong> que a entrevista acaba. Assim, você já sabe exatamente o que rolou de bom no papo para fazer um "teaser" matador na abertura. O teleprompter é seu melhor amigo nessa hora, pois você estará cansado e quer gravar rápido.
        </p>

        <SEOContentFAQ
            title="FAQ de Podcasters"
            items={[
                {
                    question: "Preciso de um teleprompter para podcast apenas de áudio?",
                    answer: "Ajuda muito! Mesmo sem vídeo, ler o roteiro da intro garante que você não gagueje e mantenha a energia alta na voz. Ninguém gosta de ouvir 'éééé...' no fone de ouvido."
                },
                {
                    question: "Como controlo o texto com as mãos ocupadas?",
                    answer: "O PromptNinja tem rolagem automática por voz (Voice Control). Basta ler, e ele rola. Ou use o pedal de controle (se tiver) ou o app no celular."
                },
                {
                    question: "Posso colocar os tópicos da entrevista no prompter?",
                    answer: "Sim! Use fontes grandes e palavras-chave (ex: 'PERGUNTAR SOBRE INFÂNCIA'). Assim você bate o olho rápido e volta para o convidado."
                }
            ]}
        />

        <div className="text-center mt-12 pb-12">
            <a
                href="https://promptninja.solutionkit.com.br/#app"
                className="inline-block bg-gradient-to-r from-purple-700 to-blue-700 font-bold py-4 px-10 rounded-full transition hover:scale-105 shadow-xl text-white text-lg"
            >
                Profissionalize Seu Podcast com PromptNinja
            </a>
        </div>

        <div className="border-t border-slate-800 pt-12 mt-12">
            <h3 className="text-2xl font-bold text-white mb-6">Veja Também</h3>
            <ul className="space-y-4">
                <li>
                    <a href={ROUTES_CONFIG.SEO_YOUTUBERS.paths.pt} className="text-purple-400 hover:text-purple-300 hover:underline text-lg">
                        📹 Teleprompter para YouTubers
                    </a>
                </li>
                <li>
                    <a href={ROUTES_CONFIG.SEO_CELEBRITIES.paths.pt} className="text-purple-400 hover:text-purple-300 hover:underline text-lg">
                        ⭐ 7 Celebridades que Usam Teleprompter
                    </a>
                </li>
                <li>
                    <a href={ROUTES_CONFIG.SEO_READING_SPEED.paths.pt} className="text-purple-400 hover:text-purple-300 hover:underline text-lg">
                        🚀 Qual a Velocidade Ideal de Leitura?
                    </a>
                </li>
            </ul>
        </div>
    </>
);
