import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";

export const HistoriaDoTeleprompterPT = () => (
    <>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            A História Secreta do Teleprompter: De Rolos de Papel à Inteligência Artificial
        </h1>

        <p className="lead text-xl text-slate-300 mb-8">
            Você já se perguntou como presidentes discursam por horas sem errar uma vírgula ou como âncoras de telejornal olham fixamente para a câmera enquanto leem notícias urgentes? A resposta não é "memória fotográfica", é tecnologia. Vamos viajar no tempo e descobrir como uma caixa de papelão evoluiu para o app que você tem no bolso hoje.
        </p>

        <div className="bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">1950: O Nascimento de uma Lenda</h2>
            <p className="text-slate-300 mb-4">
                Imagine um ator da Broadway, Fred Barton Jr., desesperado. Ele tinha que decorar montanhas de texto para a televisão ao vivo (sim, não existia "corta e grava de novo" naquela época). O medo de esquecer as falas, o famoso "branco", era aterrorizante.
            </p>
            <p className="text-slate-300">
                A solução? Em 1950, Fred, junto com Hubert Schlafly e Irving Berlin Khan, criou o primeiro "Teleprompter". Era uma engenhoca mecânica: um rolo de papel de açougueiro motorizado dentro de uma maleta, com as falas escritas em letras garrafais. Alguém tinha que girar uma manivela manualmente para o texto subir!
            </p>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">A Evolução em 4 Atos</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="border border-slate-700 p-6 rounded-lg bg-slate-800/50">
                <h3 className="text-xl font-bold text-purple-400 mb-2">1. A Era do Papel (1950-1980)</h3>
                <p className="text-slate-400 text-sm">
                    Rolos físicos girados à mão. Se o operador espirrasse e girasse rápido demais, o apresentador ficava mudo. Era tenso, caro e pesado.
                </p>
            </div>
            <div className="border border-slate-700 p-6 rounded-lg bg-slate-800/50">
                <h3 className="text-xl font-bold text-blue-400 mb-2">2. A Revolução do Vidro (1980s)</h3>
                <p className="text-slate-400 text-sm">
                    Surgiu o "Beam Splitter Glass". Um vidro especial a 45 graus que reflete o texto vindo de um monitor no chão, mas deixa a câmera ver através dele. Foi a mágica do "olho no olho".
                </p>
            </div>
            <div className="border border-slate-700 p-6 rounded-lg bg-slate-800/50">
                <h3 className="text-xl font-bold text-green-400 mb-2">3. Digitalização (1990-2010)</h3>
                <p className="text-slate-400 text-sm">
                    Computadores substituíram rolos. Softwares dedicados surgiram, mas ainda exigiam hardware caro. O teleprompter "presidencial" (aquele vidro em cima de um pedestal) virou ícone de discursos.
                </p>
            </div>
            <div className="border border-slate-700 p-6 rounded-lg bg-slate-800/50">
                <h3 className="text-xl font-bold text-yellow-400 mb-2">4. A Era Web & Mobile (Hoje)</h3>
                <p className="text-slate-400 text-sm">
                    Aqui entra o <strong>PromptNinja</strong>. A tecnologia que custava milhares de dólares agora roda no seu navegador, grátis. Controlado por voz (IA) e conectado via Wi-Fi.
                </p>
            </div>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Curiosidades Históricas</h2>
        <ul className="list-disc list-inside space-y-3 text-slate-300 mb-12">
            <li><strong>Dwight D. Eisenhower</strong> foi o primeiro presidente dos EUA a usar um teleprompter em 1952.</li>
            <li>No início, os operadores de teleprompter eram considerados "artistas", pois precisavam sentir o ritmo do orador, como um músico.</li>
            <li>A palavra "Teleprompter" era originalmente uma marca registrada, mas virou sinônimo do produto (como Gillete ou Durex).</li>
        </ul>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">O Futuro é Agora</h2>
        <p className="text-slate-300 mb-8">
            Hoje, você não precisa de uma equipe de TV. Com o PromptNinja, você tem um estúdio no bolso. A tecnologia evoluiu para permitir que criadores do YouTube, professores e vendedores tenham a mesma eloquência de um âncora de telejornal, sem o custo.
        </p>

        <SEOContentFAQ
            title="Perguntas da História"
            items={[
                {
                    question: "Quem inventou o Teleprompter?",
                    answer: "Foi Hubert Schlafly, Irving Berlin Khan e Fred Barton Jr. na década de 1950. Hubert Schlafly não usou um teleprompter publicamente até ter 88 anos!"
                },
                {
                    question: "Quanto custava um teleprompter antigo?",
                    answer: "Equipamentos profissionais custavam (e alguns ainda custam) milhares de dólares. Hoje, softwares como o PromptNinja democratizaram isso para R$ 0."
                },
                {
                    question: "O que é o 'Teleprompter Presidencial'?",
                    answer: "São aqueles dois vidros transparentes em pedestais ao lado do pódio. Eles permitem que o orador olhe para a esquerda e direita da plateia enquanto lê o discurso, sem parecer que está lendo."
                }
            ]}
        />

        <div className="text-center mt-12 pb-12">
            <a
                href="#app"
                className="inline-block bg-gradient-to-r from-purple-600 to-blue-500 font-bold py-4 px-10 rounded-full transition hover:scale-105 shadow-xl text-white text-lg"
            >
                Faça Parte da História: Use o PromptNinja Agora
            </a>
        </div>
    </>
);
