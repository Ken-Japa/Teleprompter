import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";

export const TeleprompterParaPodcastPT = () => (
    <>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Teleprompter para Podcast: O Segredo das Intros e Ads Perfeitos
        </h1>

        <p className="lead text-xl text-slate-300 mb-8">
            "Olá a todos e bem-vindos a... uh... qual o número do episódio mesmo?"
            <br /> Podcasters profissionais não improvisam tudo. Existe uma estrutura invisível que mantém o papo fluindo e os patrocinadores felizes. Descubra onde o teleprompter se encaixa no seu setup de áudio e vídeo.
        </p>

        <div className="bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Onde Usar (e Onde NÃO Usar)</h2>
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

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Setup para Videocast (Mesa)</h2>
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

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Dicas de Edição</h2>
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
                href="#app"
                className="inline-block bg-gradient-to-r from-purple-700 to-blue-700 font-bold py-4 px-10 rounded-full transition hover:scale-105 shadow-xl text-white text-lg"
            >
                Profissionalize Seu Podcast com PromptNinja
            </a>
        </div>
    </>
);
