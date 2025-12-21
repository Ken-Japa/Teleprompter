import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { ROUTES_CONFIG } from "../../../../config/routes";

export const VelocidadeLeituraTeleprompterPT = () => (
    <>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Qual a Velocidade Ideal para o Teleprompter? Pare de Correr Atrás do Texto
        </h1>

        <p className="lead text-xl text-slate-300 mb-8">
            Você ajusta a velocidade para 3. Está lento demais. Ajusta para 4. Rápido demais. O resultado? Você acelera a fala para acompanhar a máquina e soa como um narrador de corrida de cavalos. Chega de sofrer.
        </p>

        <div className="bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">A Métrica de Ouro: WPM (Palavras Por Minuto)</h2>
            <p className="text-slate-300 mb-6">
                A fala natural de conversação gira em torno de <strong>130 a 150 palavras por minuto (WPM)</strong>.
                <br />
                Audiobooks e telejornais são um pouco mais lentos, cerca de 150-160 WPM, para garantir clareza.
                Youtubers energéticos podem chegar a 180 WPM.
            </p>
            <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-yellow-500">
                <p className="text-slate-300">
                    <strong className="text-yellow-400">Teste Rápido:</strong> Pegue um texto de 150 palavras. Cronometre sua leitura normal. Se der 1 minuto, parabéns, você tem o ritmo ideal.
                </p>
            </div>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Por que o Ajuste Manual Falha?</h2>
        <p className="text-slate-300 mb-8">
            O problema da rolagem automática fixa é que nós, humanos, não somos robôs. Às vezes fazemos uma pausa dramática. Às vezes rimos. Às vezes precisamos respirar. A rolagem fixa não espera por você, criando ansiedade.
        </p>

        <div className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 p-8 rounded-2xl border border-purple-500/30 mb-12">
            <h3 className="text-2xl font-bold text-white mb-4">A Revolução do Voice Control (IA)</h3>
            <p className="text-slate-300 mb-4">
                Esqueça o controle de velocidade. O <strong>PromptNinja</strong> usa inteligência artificial para ouvir sua voz.
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-300">
                <li>Você para de falar? O texto para.</li>
                <li>Você fala rápido? O texto acelera.</li>
                <li>Você faz uma pausa longa? O texto espera pacientemente.</li>
            </ul>
            <p className="text-slate-300 mt-4 font-bold">
                É como ter um operador de teleprompter humano te ouvindo, mas grátis.
            </p>
        </div>

        <SEOContentFAQ
            title="Dúvidas sobre Ritmo"
            items={[
                {
                    question: "Como treino minha dicção para falar mais rápido?",
                    answer: "Exercícios de trava-línguas ajudam. Tente ler 'O rato roeu a roupa do rei de Roma' aumentando a velocidade sem perder a clareza. Mas lembre-se: clareza é mais importante que velocidade."
                },
                {
                    question: "O tamanho da fonte influencia a velocidade?",
                    answer: "Sim! Fontes maiores exigem mais rolagem, o que pode dar a ilusão de estar mais rápido. Fontes menores mostram mais texto, mas cansam a vista. Ache o equilíbrio onde você lê confortavelmente a 1 metro."
                },
                {
                    question: "Devo falar mais devagar para vídeos educativos?",
                    answer: "Definitivamente. Se o assunto é complexo, dê tempo para o cérebro do espectador processar. Use pausas de 2 segundos entre conceitos importantes."
                }
            ]}
        />

        <div className="text-center mt-12 pb-12">
            <a
                href="#app"
                className="inline-block bg-gradient-to-r from-purple-700 to-blue-700 font-bold py-4 px-10 rounded-full transition hover:scale-105 shadow-xl text-white text-lg"
            >
                Ativar Rolagem por Voz (Grátis)
            </a>
        </div>

        <div className="border-t border-slate-800 pt-12 mt-12">
            <h3 className="text-2xl font-bold text-white mb-6">Veja Também</h3>
            <ul className="space-y-4">
                <li>
                    <a href={ROUTES_CONFIG.SEO_COMMON_MISTAKES.paths.pt} className="text-purple-400 hover:text-purple-300 hover:underline text-lg">
                        ⚠️ 5 Erros Comuns ao Usar Teleprompter
                    </a>
                </li>
                <li>
                    <a href={ROUTES_CONFIG.SEO_ORATORIA.paths.pt} className="text-purple-400 hover:text-purple-300 hover:underline text-lg">
                        🗣️ Dicas de Oratória para Vídeo
                    </a>
                </li>
                <li>
                    <a href={ROUTES_CONFIG.SEO_SCRIPTS.paths.pt} className="text-purple-400 hover:text-purple-300 hover:underline text-lg">
                        📝 Modelos de Scripts para Teleprompter
                    </a>
                </li>
            </ul>
        </div>
    </>
);
