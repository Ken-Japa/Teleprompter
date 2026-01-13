import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { ROUTES_CONFIG } from "../../../../config/routes";

export const HistoriaDoTeleprompterPT = () => (
    <>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            A História do Teleprompter: De Rolos de Papel à Era Digital
        </h2>

        <p className="lead text-xl text-slate-300 mb-8 font-medium">
            Viaje no tempo e descubra como uma invenção desesperada para ajudar atores se tornou o PromptNinja. <strong>Conheça a fascinante jornada tecnológica</strong> que revolucionou a fala profissional.
        </p>

        <p className="text-slate-300 mb-8">
            Neste mergulho histórico, exploramos a evolução do teleprompter, uma ferramenta que se tornou indispensável para a comunicação moderna. Desde os primeiros rolos de papel motorizados na Broadway dos anos 50 até o advento do vidro 'beam splitter' e a revolução dos aplicativos online, a história do teleprompter é marcada pela busca constante por naturalidade e conexão. Descubra como presidentes, jornalistas e agora milhões de criadores de conteúdo utilizam essa tecnologia para transmitir confiança e autoridade. Entenda como o PromptNinja democratiza essa herança tecnológica, oferecendo recursos de ponta como controle por voz e sincronia em nuvem, tudo de forma gratuita para que você também faça parte da história da oratória digital.
        </p>

        <div className="bg-blue-600/10 border border-blue-500/20 rounded-2xl p-6 md:p-8 text-center mb-12">
            <h3 className="text-2xl font-bold text-white mb-4">Evolua sua Comunicação</h3>
            <p className="text-slate-300 mb-6">
                Não fique preso ao passado. Use a tecnologia que revolucionou a comunicação
                para gravar seus vídeos com a naturalidade de um profissional.
            </p>
            <a href="https://promptninja.solutionkit.com.br/#app" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all hover:scale-105 shadow-lg shadow-blue-500/25">
                Experimentar Tecnologia Ninja Gratis
            </a>
        </div>

        <h3 className="text-3xl font-bold text-white mt-12 mb-6">A Evolução em 4 Atos</h3>

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

        <h3 className="text-3xl font-bold text-white mt-12 mb-6">Curiosidades Históricas</h3>
        <ul className="list-disc list-inside space-y-3 text-slate-300 mb-12">
            <li><strong>Dwight D. Eisenhower</strong> foi o primeiro presidente dos EUA a usar um teleprompter em 1952.</li>
            <li>No início, os operadores de teleprompter eram considerados "artistas", pois precisavam sentir o ritmo do orador, como um músico.</li>
            <li>A palavra "Teleprompter" era originalmente uma marca registrada, mas virou sinônimo do produto (como Gillete ou Durex).</li>
        </ul>

        <h3 className="text-3xl font-bold text-white mt-12 mb-6">O Futuro é Agora</h3>
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
                href="https://promptninja.solutionkit.com.br/#app"
                className="inline-block bg-gradient-to-r from-purple-600 to-blue-500 font-bold py-4 px-10 rounded-full transition hover:scale-105 shadow-xl text-white text-lg"
            >
                Faça Parte da História: Use o PromptNinja Agora
            </a>
        </div>

        <div className="border-t border-slate-800 pt-12 mt-12">
            <h3 className="text-2xl font-bold text-white mb-6">Veja Também</h3>
            <ul className="space-y-4">
                <li>
                    <a href={ROUTES_CONFIG.SEO_VS_TELELESTRADOR.paths.pt} className="text-purple-400 hover:text-purple-300 hover:underline text-lg">
                        📺 Teleprompter vs Telelestrador: Qual a Diferença?
                    </a>
                </li>
                <li>
                    <a href={ROUTES_CONFIG.SEO_CELEBRITIES.paths.pt} className="text-purple-400 hover:text-purple-300 hover:underline text-lg">
                        ⭐ 7 Celebridades e Gigantes que Usam Teleprompter
                    </a>
                </li>
                <li>
                    <a href={ROUTES_CONFIG.SEO_O_QUE_E.paths.pt} className="text-purple-400 hover:text-purple-300 hover:underline text-lg">
                        🤔 O Que É Teleprompter? Guia Básico
                    </a>
                </li>
            </ul>
        </div>
    </>
);
