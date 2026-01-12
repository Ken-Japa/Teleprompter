import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { SEOContentHowTo } from "../../../../components/seo/SEOContentHowTo";

export const ComoDecorarTextoPT = () => (
    <>
        <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
            Como Decorar Textos Longos em Minutos (O Segredo é Não Decorar)
        </h2>

        <p className="text-lg text-slate-300 mb-8">
            Você tem uma apresentação amanhã. O roteiro tem 5 páginas. Seu coração acelera só de pensar em esquecer uma frase e travar na frente da câmera.
            A verdade brutal? <strong>Tentar decorar é amadorismo.</strong>
        </p>

        <div className="bg-slate-800 p-8 rounded-xl border-l-4 border-yellow-500 mb-12 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-4">O Mito da Memória Perfeita</h3>
            <p className="text-slate-300 mb-4">
                Achamos que âncoras de telejornal, políticos e grandes Youtubers têm memórias fotográficas. Mentira. Eles têm <strong>Teleprompters</strong>.
            </p>
            <p className="text-slate-300">
                A indústria da TV descobriu há 50 anos que o cérebro humano não foi feito para recitar. Ele foi feito para conversar. Quando você tenta lembrar palavras, seu olhar fica vago ("olhar de peixe morto") e sua voz fica robótica.
            </p>
        </div>

        <h3 className="text-3xl font-bold text-white mt-12 mb-6">A Técnica do "Olhar Invisível"</h3>
        <p className="mb-6 text-slate-300">
            "Mas se eu ler, vai dar pra perceber!"
            Não se você usar a técnica correta. O segredo não é o que você lê, mas <strong>como você configura a tela.</strong>
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-red-900/10 p-6 rounded border border-red-500/30">
                <h3 className="font-bold text-red-400 mb-2">❌ O Erro Comum</h3>
                <p className="text-sm text-slate-300">
                    Colocar o texto ocupando a tela inteira do monitor widesreen.
                    <br /><strong>Resultado:</strong> Seus olhos correm de um lado para o outro como se estivesse assistindo tênis. Todo mundo percebe.
                </p>
            </div>
            <div className="bg-green-900/10 p-6 rounded border border-green-500/50">
                <h3 className="font-bold text-green-400 mb-2">✅ A Técnica Ninja</h3>
                <p className="text-sm text-slate-300">
                    Estreitar a margem do texto para apenas 3 ou 4 palavras por linha, bem no centro.
                    <br /><strong>Resultado:</strong> Seus olhos ficam fixos no centro. Para quem assiste, você está olhando profundamente na alma deles.
                </p>
            </div>
        </div>

        <h3 className="text-3xl font-bold text-white mt-12 mb-6">Passo a Passo: Da Leitura à Performance</h3>

        <SEOContentHowTo
            title=""
            schemaTitle="Como Ler Teleprompter Naturalmente"
            totalTime="PT5M"
            tools={["PromptNinja", "Texto"]}
            steps={[
                {
                    title: "1. A Configuração de Funil",
                    text: "No PromptNinja, aumente a margem lateral até que o texto fique uma coluna fina no centro. Aumente a fonte para tamanho gigante."
                },
                {
                    title: "2. A Distância Mágica",
                    text: "Afaste-se da tela. Quanto mais longe você estiver, menor é o ângulo de movimento dos seus olhos. Mínimo de 1 metro."
                },
                {
                    title: "3. Linguagem Corporal",
                    text: "O público perdoa uma olhadinha, mas não perdoa falta de energia. Mexa as mãos. Balance a cabeça. Sorria. Quando seu corpo se mexe, seus olhos vivos disfarçam a leitura."
                }
            ]}
        />

        <div className="mt-12 bg-slate-900 p-8 rounded-xl border border-slate-700">
            <h3 className="text-2xl font-bold text-white mb-4">A Ciência do "Alívio Cognitivo"</h3>
            <p className="text-slate-300">
                Quando você não precisa gastar 90% do seu processamento cerebral tentando lembrar a próxima palavra, essa energia sobra para a <strong>Interpretação</strong>.
                Você finalmente pode colocar emoção, ironia e pausa na sua fala. O teleprompter não te prende; ele te liberta.
            </p>
        </div>

        <SEOContentFAQ
            title="Dúvidas sobre Leitura"
            items={[
                {
                    question: "E se eu perder o ritmo?",
                    answer: "O PromptNinja tem 'Voice Activated Scroll' na versão Pro, que ouve sua voz e rola o texto automaticamente. Se você parar para espirrar ou improvisar, ele espera por você."
                },
                {
                    question: "Funciona para quem usa óculos?",
                    answer: "Sim! Na verdade é melhor, pois o reflexo dos óculos às vezes esconde micro-movimentos dos olhos. Só cuidado com o reflexo da tela na lente (aumente o brilho do ambiente ou mude o ângulo da luz)."
                },
                {
                    question: "Quanto tempo economizo?",
                    answer: "Estudos mostram que usar teleprompter reduz o tempo de gravação em 60% e o tempo de edição em 80% (pois elimina cortes de erros). É a ferramenta de produtividade definitiva."
                }
            ]}
        />

        <div className="text-center mt-12">
            <a
                href="https://promptninja.solutionkit.com.br"
                className="inline-block bg-white text-slate-900 font-bold py-3 px-8 mx-auto rounded-full transition hover:bg-slate-200"
            >
                Abrir Teleprompter Agora (Sem Login)
            </a>
        </div>
    </>
);
