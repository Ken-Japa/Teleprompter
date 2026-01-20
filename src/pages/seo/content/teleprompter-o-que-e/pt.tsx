import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { SEOImage } from "../../../../components/seo/SEOImage";

export const TeleprompterOQueEPT = () => (
    <>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            O Que é Teleprompter? Guia Completo para Iniciantes e Profissionais
        </h2>

        <p className="lead text-xl text-slate-300 mb-8 font-medium">
            Entenda como funciona a ferramenta que revolucionou a fala em público e a produção de vídeos. <strong>Descubra a tecnologia por trás do teleprompter</strong> e como usá-lo para brilhar.
        </p>

        <p className="text-slate-300 mb-8">
            Neste guia exaustivo, desvendamos todos os segredos do teleprompter, desde sua origem nos primórdios da televisão até sua modernização digital com o PromptNinja. Aprenda por que âncoras de jornal, grandes líderes e YouTubers de sucesso nunca gravam sem um roteiro fluindo diante de seus olhos. Exploramos o funcionamento físico do vidro divisor de feixe, as técnicas de leitura natural e como você pode transformar qualquer dispositivo em um teleprompter profissional de forma gratuita. Domine a arte de manter o contato visual perfeito com sua audiência e transmita sua mensagem com uma autoridade e fluidez inabaláveis.
        </p>

        <SEOImage
            slug="teleprompter-o-que-e"
            src="what-is-a-teleprompter-explanation.webp"
            alt="Exemplificação de um teleprompter em uso profissional"
            caption="O teleprompter permite que você leia seu roteiro enquanto mantém contato visual direto com a câmera."
            width={1200}
            height={675}
            priority={true}
        />

        <div className="bg-slate-900/50 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-xl mb-12">
            <h3 className="text-2xl font-bold text-white mb-6">Por que o Teleprompter é Revolucionário?</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <li className="flex items-start gap-3 bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                    <span className="text-blue-400 text-xl">👁️</span>
                    <div className="text-sm">
                        <strong className="text-white block mb-1">Mantém o Contato Visual</strong>
                        <span className="text-slate-400">O teleprompter permite que o texto flua exatamente na frente da lente da câmera, garantindo conexão total.</span>
                    </div>
                </li>
                <li className="flex items-start gap-3 bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                    <span className="text-blue-400 text-xl">🎯</span>
                    <div className="text-sm">
                        <strong className="text-white block mb-1">Garante Precisão Absoluta</strong>
                        <span className="text-slate-400">Ideal para discursos onde cada palavra importa, como pronunciamentos oficiais e scripts de vendas.</span>
                    </div>
                </li>
                <li className="flex items-start gap-3 bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                    <span className="text-blue-400 text-xl">💪</span>
                    <div className="text-sm">
                        <strong className="text-white block mb-1">Aumenta a Confiança</strong>
                        <span className="text-slate-400">Remova a ansiedade do "branco" e foque na sua performance e entonação durante a gravação.</span>
                    </div>
                </li>
                <li className="flex items-start gap-3 bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                    <span className="text-blue-400 text-xl">⚡</span>
                    <div className="text-sm">
                        <strong className="text-white block mb-1">Agiliza a Produção</strong>
                        <span className="text-slate-400">Menos erros significam menos regravações. Ganhe tempo e produtividade no seu dia a dia.</span>
                    </div>
                </li>
            </ul>
        </div>

        <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 mb-12">
            <h3 className="text-2xl font-bold text-white mb-4">Como Funciona a Mágica (O Espelho)</h3>
            <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1">
                    <p className="text-slate-300 mb-4">
                        A mágica está num vidro especial chamado <strong>"Beam Splitter" (Divisor de Feixe)</strong>.
                    </p>
                    <ul className="list-disc pl-6 text-slate-300 space-y-2">
                        <li>De um lado (plateia/câmera), ele é transparente 🪟.</li>
                        <li>Do outro (apresentador), ele é um espelho 🪞.</li>
                    </ul>
                    <p className="text-slate-300 mt-4">
                        Isso permite que uma tela colocada no chão reflita o texto no vidro. O apresentador lê o reflexo, mas a câmera filma através do vidro transparente sem ver o texto.
                        Resultado: O apresentador olha <strong>diretamente nos olhos</strong> da lente enquanto lê.
                    </p>
                </div>

                <div className="bg-black p-4 rounded-lg border border-slate-600 font-mono text-xs text-green-400 w-full md:w-1/3">
                    <div className="text-center mb-2">📷 Câmera (Não vê nada)</div>
                    <div className="border-b border-slate-500 my-2 text-center text-slate-500">| | Vidro Inclinado 45° | |</div>
                    <div className="text-center mt-2">👁️ Apresentador (Vê texto)</div>
                    <div className="mt-4 text-center text-yellow-400">📱 Tablet (Emite luz)</div>
                </div>
            </div>
        </div>

        <SEOImage
            slug="teleprompter-o-que-e"
            src="what-is-a-teleprompter-how-does-it-work.webp"
            alt="Infográfico mostrando o funcionamento do vidro divisor de feixe no teleprompter"
            caption="O segredo do teleprompter está no vidro que reflete o texto mas é transparente para a câmera."
            width={1200}
            height={675}
        />

        <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
                <h3 className="text-xl font-bold text-white mb-2">1950: O Rolo de Papel</h3>
                <p className="text-sm text-slate-400">
                    O primeiro teleprompter (usado na série <em>The First Hundred Years</em>) era literalmente um rolo de papel de açougueiro motorizado, operado por alguém que girava uma manivela. Se o ator falasse rápido demais, o operador tinha que girar mais rápido!
                </p>
            </div>
            <div>
                <h3 className="text-xl font-bold text-white mb-2">1952: Eisenhower e a Política</h3>
                <p className="text-sm text-slate-400">
                    Dwight Eisenhower foi o primeiro presidente dos EUA a usar um TP em campanha. Ele percebeu que olhar para o público (via câmera) passava muito mais sinceridade do que ler discursos na mesa. Desde então, nenhum político vive sem um.
                </p>
            </div>
        </div>

        <section id="cta-o-que-e" className="p-8 bg-gradient-to-r from-slate-900 to-indigo-900 text-white rounded-2xl my-12 text-center shadow-2xl relative border border-slate-700">
            <div className="absolute inset-0 bg-blue-500/5 pointer-events-none"></div>
            <h2 className="text-3xl font-extrabold mb-6">Experimente a "Mágica" do Teleprompter Hoje!</h2>
            <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">Agora que você sabe o que é, que tal usar o teleprompter digital mais moderno e fácil do mercado? O PromptNinja é gratuito e pronto para usar.</p>
            <div className="flex flex-wrap justify-center gap-4 relative z-10">
                <a href="https://promptninja.solutionkit.com.br/#app" className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-10 rounded-full shadow-lg transition-transform hover:scale-105">Começar Agora (Grátis)</a>
                <a href="#link-para-home" className="bg-transparent border-2 border-slate-500 hover:bg-slate-800 text-white font-bold py-4 px-10 rounded-full transition-colors">Ver Guia de Uso</a>
            </div>
            <p className="mt-6 text-sm text-slate-400 italic">"Economize tempo e gagueje menos com o PromptNinja."</p>
        </section>

        <SEOContentFAQ
            title="Curiosidades do Teleprompter"
            items={[
                {
                    question: "O que é um 'Presidential Teleprompter'?",
                    answer: "São aqueles dois vidros de pé, um de cada lado do pódio. Eles são invisíveis para a plateia (parecem vidro fumê), mas refletem o texto vindo de monitores no chão. O político alterna o olhar entre esquerda e direita para parecer que está olhando para todo o público."
                },
                {
                    question: "Por que se chama 'Teleprompter'?",
                    answer: "Vem de 'Tele' (Distância) + 'Prompter' (Aquele que sopra/lembra). No teatro antigo, o 'Ponto' (Prompter) era a pessoa escondida no palco que soprava a fala caso o ator esquecesse."
                },
                {
                    question: "Posso fazer um em casa?",
                    answer: "Sim! Um vidro de porta-retrato comum funciona (com um pouco de reflexo duplo/fantasmas). Para qualidade profissional, você precisa de um vidro especial '70/30 Beam Splitter'."
                }
            ]}
        />
    </>
);
