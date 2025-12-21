import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";

export const CelebridadesUsamTeleprompterPT = () => (
    <>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            7 Celebridades e Gigantes que Usam Teleprompter (e Você Nem Sabia)
        </h1>

        <p className="lead text-xl text-slate-300 mb-8">
            Existe um mito de que usar teleprompter é "trapaça" ou sinal de que você não domina o assunto. A verdade? Os maiores comunicadores do mundo usam. A diferença é que eles usam tão bem que parece natural. Se Barack Obama e Adele usam, por que você deveria ter vergonha?
        </p>

        <div className="bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">A Verdade Sobre a "Naturalidade"</h2>
            <p className="text-slate-300 mb-4">
                A naturalidade em vídeo não vem de decorar texto, vem de estar relaxado. E nada relaxa mais do que saber exatamente o que você vai dizer. O teleprompter não tira a emoção; ele <strong>libera</strong> sua mente para focar na emoção, em vez de focar na memória.
            </p>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">A Lista VIP</h2>

        <div className="space-y-8 mb-12">
            <div className="flex flex-col md:flex-row gap-6 items-start bg-slate-800/50 p-6 rounded-lg border border-slate-700">
                <div className="bg-purple-600/20 p-4 rounded-full text-3xl">🎤</div>
                <div>
                    <h3 className="text-2xl font-bold text-white mb-2">1. Adele e Músicos de Elite</h3>
                    <p className="text-slate-300">
                        Sim, até a Adele admite. Em shows grandes, cantores usam teleprompters (muitas vezes disfarçados no chão do palco) para lembrar letras de músicas antigas ou novas. Isso garante que o show flua sem "brancos". <br />
                        <span className="text-sm text-purple-400 italic">Lição: Respeito ao público é não errar a letra.</span>
                    </p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-start bg-slate-800/50 p-6 rounded-lg border border-slate-700">
                <div className="bg-blue-600/20 p-4 rounded-full text-3xl">🏛️</div>
                <div>
                    <h3 className="text-2xl font-bold text-white mb-2">2. Barack Obama</h3>
                    <p className="text-slate-300">
                        Conhecido como um dos maiores oradores modernos, Obama elevou o uso do teleprompter presidencial a uma arte. Ele alterna o olhar entre os dois vidros com tanta naturalidade que a plateia sente que ele está falando diretamente com cada pessoa.
                    </p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-start bg-slate-800/50 p-6 rounded-lg border border-slate-700">
                <div className="bg-green-600/20 p-4 rounded-full text-3xl">📺</div>
                <div>
                    <h3 className="text-2xl font-bold text-white mb-2">3. William Bonner e Jornalistas</h3>
                    <p className="text-slate-300">
                        Você realmente acha que eles decoram 1 hora de notícias todos os dias? Jornalistas leem 100% do tempo. A habilidade deles está na <strong>leitura dinâmica</strong> e na entonação, não na memorização.
                    </p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-start bg-slate-800/50 p-6 rounded-lg border border-slate-700">
                <div className="bg-yellow-600/20 p-4 rounded-full text-3xl">💻</div>
                <div>
                    <h3 className="text-2xl font-bold text-white mb-2">4. Palestrantes do TED Talks</h3>
                    <p className="text-slate-300">
                        Embora o formato TED incentive a memorização ("talk like you feel it"), muitos palestrantes usam monitores de confiança no chão (confidence monitors) que funcionam como teleprompters com tópicos ou texto corrido.
                    </p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-start bg-slate-800/50 p-6 rounded-lg border border-slate-700">
                <div className="bg-red-600/20 p-4 rounded-full text-3xl">🎬</div>
                <div>
                    <h3 className="text-2xl font-bold text-white mb-2">5. Youtubers Gigantes</h3>
                    <p className="text-slate-300">
                        Canais de tecnologia, ciência e educação (como Kurzgesagt, VSauce, ou canais de review tech brasileiros) usam scripts rigorosos. Para manter o ritmo rápido (o famoso "retention editing"), ler é essencial para não gaguejar e facilitar os cortes.
                    </p>
                </div>
            </div>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Como Usar Como um Profissional (Dicas Rápidas)</h2>
        <ul className="list-disc list-inside space-y-4 text-slate-300 mb-12">
            <li><strong>Distância é Chave:</strong> Fique a pelo menos 1 metro da câmera para reduzir o movimento dos olhos.</li>
            <li><strong>Escreva Como Fala:</strong> Use linguagem coloquial no roteiro. Nada de "pois", use "porque". Nada de "entretanto", use "mas".</li>
            <li><strong>Use o PromptNinja:</strong> Ajuste a velocidade para sua fala natural, não tente correr atrás do texto. O texto deve seguir você.</li>
        </ul>

        <SEOContentFAQ
            title="FAQ dos Famosos"
            items={[
                {
                    question: "Os Youtubers admitem que usam?",
                    answer: "A maioria não fala abertamente para manter a ilusão de 'conversa casual', mas qualquer editor de vídeo experiente reconhece o padrão de olhar e fala contínua de um roteiro."
                },
                {
                    question: "É caro ter um setup igual ao deles?",
                    answer: "Não mais. Antigamente sim, mas hoje com um laptop e o PromptNinja (Grátis), você tem a mesma ferramenta de software. A diferença é só a iluminação e câmera."
                },
                {
                    question: "Usar teleprompter atrapalha a atuação?",
                    answer: "Pelo contrário. Atores de novela usam 'ponto eletrônico' (áudio no ouvido) que é uma forma de teleprompter auditivo. Ter o texto seguro permite focar na expressão facial."
                }
            ]}
        />

        <div className="text-center mt-12 pb-12">
            <a
                href="#app"
                className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 font-bold py-4 px-10 rounded-full transition hover:scale-105 shadow-xl text-white text-lg"
            >
                Fale Como um Líder: Use PromptNinja
            </a>
        </div>
    </>
);
