import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";

export const TeleprompterApresentacoesPT = () => (
    <>
        <h1 className="text-4xl font-bold text-white mb-6">Teleprompter para Apresentações (PowerPoint e Keynote)</h1>

        <p className="lead text-xl text-slate-300 mb-8">
            Fazer uma apresentação de slides enquanto lembra de todas as estatísticas e argumentos é um desafio. O PromptNinja permite que você sincronize sua fala com seus slides do PowerPoint, Google Slides ou Keynote, garantindo uma performance segura e profissional.
        </p>

        <div className="bg-slate-800 p-6 rounded-lg my-8 border-l-4 border-orange-500">
            <h2 className="text-2xl font-bold text-white mb-2">A Técnica do "Segundo Cérebro"</h2>
            <p className="text-slate-300">
                Não lote seus slides de texto. Use os slides para o visual e o PromptNinja para o conteúdo falado.
                <br /><br />
                Ao usar nossa ferramenta como seu roteiro invisível, você pode manter seus slides limpos e impactantes, enquanto fala com a autoridade de quem domina o assunto, sem precisar memorizar cada vírgula. <a href="/scripts-institucionais" className="text-purple-400 hover:text-purple-300 underline">Estruture sua fala com nossos exemplos de roteiros corporativos</a>.
            </p>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Como Sincronizar Fala e Slides</h2>
        <div className="bg-slate-800 p-6 rounded-lg my-6">
            <ol className="list-decimal pl-6 space-y-6 text-slate-300">
                <li>
                    <strong>Marcações de Slide:</strong> No editor do PromptNinja, use marcadores visuais (como [SLIDE 1], [SLIDE 2]) em amarelo ou vermelho para saber exatamente quando avançar o slide na apresentação.
                </li>
                <li>
                    <strong>Setup de Duas Telas:</strong> Se estiver apresentando presencialmente, use seu notebook como teleprompter (visível apenas para você) e o projetor para os slides.
                </li>
                <li>
                    <strong>Apresentação Online:</strong> Em reuniões virtuais, compartilhe apenas a janela do PowerPoint. Mantenha o PromptNinja flutuando por cima para ler seu roteiro enquanto avança os slides.
                </li>
            </ol>
        </div>

        <div className="text-center mt-12">
            <a
                href="https://promptninja.solutionkit.com.br"
                className="inline-block bg-gradient-to-r from-orange-500 to-red-600 font-bold py-3 px-6 rounded-lg transition hover:brightness-110"
                style={{ color: 'white' }}
            >
                Faça Apresentações Memoráveis
            </a>
        </div>

        <SEOContentFAQ
            title="Dúvidas sobre Apresentações"
            items={[
                {
                    question: "O público vai ver que estou lendo?",
                    answer: "Se você posicionar o PromptNinja próximo à webcam (em chamadas online) ou usar como 'cola' no notebook (presencial), é imperceptível. O segredo é olhar para o público/câmera, não fixamente para o texto."
                },
                {
                    question: "Funciona junto com o PowerPoint?",
                    answer: "Sim. Em reuniões online, compartilhe APENAS a janela do PowerPoint, não a tela inteira. Assim você pode deixar o teleprompter aberto por cima de tudo e ninguém verá."
                },
                {
                    question: "Como marco a hora de mudar o slide?",
                    answer: "Digite marcadores visuais no seu roteiro, como [SLIDE 1] ou use cores diferentes no editor do PromptNinja para indicar visualmente o momento da transição."
                }
            ]}
        />
    </>
);
