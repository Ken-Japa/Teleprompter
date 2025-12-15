import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";

export const TeleprompterSlidesPT = () => (
    <>
        <h1 className="text-4xl font-bold text-white mb-6">Sincronize Teleprompter com PowerPoint: Apresentações Perfeitas</h1>

        <p className="mb-6">
            O maior pesadelo de quem apresenta com slides é a dissincronia: o teleprompter continua rolando enquanto você ainda está explicando o gráfico do slide anterior. O <strong>PromptNinja</strong> resolve isso definitivamente com a funcionalidade de <strong>Sincronização por Comandos</strong>.
        </p>

        <p className="mb-6">
            Transforme suas apresentações institucionais, aulas online e webinars em performances profissionais onde áudio e visual caminham juntos, sem esforço.
        </p>

        <div className="bg-slate-800 p-6 rounded-lg my-8 border-l-4 border-orange-500">
            <h2 className="text-2xl font-bold text-white mb-2">O Segredo: Comando [STOP]</h2>
            <p className="text-slate-300">
                A lógica é simples: seu roteiro deve esperar por você, não o contrário. Ao inserir a tag <strong>[STOP]</strong> no seu texto, você cria "pontos de parada" obrigatórios.
            </p>
            <div className="bg-slate-900 p-4 rounded mt-4 font-mono text-sm text-green-400">
                "...e como vemos neste gráfico de vendas:<br />
                [STOP]<br />
                Observem que o crescimento foi de 40% no último trimestre..."
            </div>
            <p className="text-slate-300 mt-4">
                Quando o teleprompter atinge o <strong>[STOP]</strong>, ele pausa automaticamente. Você tem todo o tempo do mundo para mudar seu slide no PowerPoint, beber água ou responder uma pergunta. Quando estiver pronto, um simples clique (ou aperto no passador de slides) retoma a rolagem.
            </p>
        </div>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Compatível com Passadores de Slides (Clickers)</h2>
        <p className="mb-4">
            A maioria dos passadores de slides (apresentadores Logitech, etc.) funciona enviando comandos de teclado (Setas, Espaço ou Page Down).
        </p>
        <p className="mb-6">
            O PromptNinja reconhece esses sinais. Isso significa que com <strong>um único dispositivo</strong> na sua mão, você pode controlar tanto seus slides no computador quanto o texto no seu teleprompter. Produtividade máxima, complicações zero.
        </p>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Cenários de Uso</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-2">Webinars de Vendas</h3>
                <p className="text-sm text-slate-300">Garanta que o preço e a oferta apareçam na sua fala exatamente no momento em que o slide de "Checkout" aparece na tela. Use <strong>[STOP]</strong> antes da revelação do preço.</p>
            </div>
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-2">Aulas Online</h3>
                <p className="text-sm text-slate-300">Professores podem travar o texto enquanto desenham na lousa digital ou explicam um conceito complexo fora do roteiro.</p>
            </div>
        </div>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Dicção e Pacing</h2>
        <p className="mb-6">
            Além da sincronia, usar paradas programadas ajuda a manter um ritmo de fala mais natural. Veja mais sobre como controlar seu ritmo em nossa página sobre <a href="/teleprompter-pacing-timer-online" className="text-blue-400 hover:text-blue-300 underline">Pacing e Timer</a>.
        </p>

        <div className="text-center bg-slate-800 p-8 rounded-lg my-10">
            <h2 className="text-3xl font-bold text-white mb-4">Apresente com Confiança</h2>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                Nunca mais se preocupe em "perder" o texto. Com o PromptNinja, você controla o show.
            </p>
            <a
                href="https://promptninja.solutionkit.com.br/#app"
                className="inline-block bg-white text-slate-900 font-bold py-3 px-8 mx-auto rounded-full transition hover:bg-slate-200 "
            >
                Criar Apresentação Agora
            </a>
        </div>

        <SEOContentFAQ
            title="Dúvidas sobre Slides e Apresentações"
            items={[
                {
                    question: "O PromptNinja muda o slide do PowerPoint sozinho?",
                    answer: "Não. O PromptNinja controla o SEU ROTEIRO (texto). Você continua usando seu passador de slides ou mouse para mudar o slide no PowerPoint, mas o comando [STOP] garante que você nunca se perca na leitura."
                },
                {
                    question: "Quais passadores de slides são compatíveis?",
                    answer: "Praticamente todos (Logitech R400, R800, genéricos). Se o passador funciona simulando as setas do teclado ou PageUp/PageDown, ele funcionará nativamente no PromptNinja."
                },
                {
                    question: "Funciona no Zoom ou Teams?",
                    answer: "Perfeitamente. Em apresentações online, a técnica mais comum é compartilhar apenas a janela da apresentação e deixar o teleprompter flutuando por cima para leitura."
                }
            ]}
        />
    </>
);
