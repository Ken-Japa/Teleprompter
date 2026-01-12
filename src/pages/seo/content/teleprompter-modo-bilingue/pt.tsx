import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { SEOContentHowTo } from "../../../../components/seo/SEOContentHowTo";

export const TeleprompterModoBilinguePT = () => (
    <>
        <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
            Aprenda Inglês com Teleprompter: A Técnica de "Shadowing"
        </h2>

        <p className="mb-6 text-xl text-slate-300">
            Você estuda inglês há anos, entende a gramática, mas quando vai falar... trava. A pronúncia não sai.
            Isso acontece porque sua boca não tem "memória muscular".
        </p>

        <div className="bg-slate-800 p-8 rounded-xl border border-blue-500/30 mb-12">
            <h3 className="text-2xl font-bold text-white mb-4">O Segredo dos Poliglotas: Shadowing</h3>
            <p className="text-slate-300 mb-4">
                Shadowing (Sombreamento) é uma técnica usada por espiões e diplomatas. Consiste em ouvir um nativo falando e repetir em voz alta *simultaneamente*, com apenas milissegundos de atraso.
            </p>
            <p className="text-slate-300">
                O PromptNinja é a ferramenta perfeita para isso. Você cola o texto do áudio, ajusta a velocidade para combinar com a fala do nativo, e lê junto.
            </p>
        </div>

        <h3 className="text-3xl font-bold text-white mt-12 mb-6">Como Usar o Modo Bilíngue para Estudar</h3>

        <SEOContentHowTo
            title=""
            schemaTitle="Como Praticar Shadowing com Teleprompter"
            totalTime="PT10M"
            tools={["PromptNinja", "Áudio Original (Podcast/YouTube)"]}
            steps={[
                {
                    title: "1. Encontre o Material",
                    text: "Pegue a transcrição de um TED Talk ou cena de filme."
                },
                {
                    title: "2. Formatação Visual",
                    text: "Cole no PromptNinja. Use letras MAIÚSCULAS para onde o falante dá ênfase (entoação)."
                },
                {
                    title: "3. Sincronia",
                    text: "Dê play no vídeo/áudio e ajuste a velocidade do teleprompter para acompanhar o ritmo exato da fala original."
                },
                {
                    title: "4. Fale Alto",
                    text: "Tente imitar não só as palavras, mas a 'música' da frase. O teleprompter te força a não parar para pensar, criando fluidez."
                }
            ]}
        />

        <SEOContentFAQ
            title="Dúvidas de Estudantes"
            items={[
                {
                    question: "Serve para outros idiomas?",
                    answer: "Sim! PromptNinja suporta caracteres especiais (Japonês, Chinês, Russo, Árabe) pois usa codificação UTF-8. É ideal para scripts com alfabetos diferentes."
                },
                {
                    question: "Posso colocar tradução?",
                    answer: "Sim. Uma técnica comum é colocar a linha em Inglês e, logo abaixo, a tradução em Português em uma cor diferente (use formatação Markdown ou apenas parênteses)."
                }
            ]}
        />
    </>
);
