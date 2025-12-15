import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";

export const TeleprompterWebVsHardwarePT = () => (
    <>
        <h1 className="text-4xl font-bold text-white mb-6">Teleprompter Online vs. Hardware: Qual a Melhor Escolha para Você?</h1>

        <p className="lead text-xl text-slate-300 mb-8">
            Você está pronto para elevar a qualidade dos seus vídeos, mas deve investir R$ 500 em um equipamento físico ou usar uma solução de software avançada? Comparamos o PromptNinja com os teleprompters físicos tradicionais para ajudar você a decidir.
        </p>

        <div className="bg-slate-800 p-6 rounded-lg my-8 border-l-4 border-green-500">
            <h2 className="text-2xl font-bold text-white mb-2">Veredito Rápido</h2>
            <p className="text-slate-300">
                Se você usa celular ou webcam e quer mobilidade, o <strong>PromptNinja</strong> vence em custo-benefício e facilidade de uso. Se você usa uma câmera DSLR pesada em estúdio fixo, um hardware dedicado pode ser útil, mas o PromptNinja ainda pode substituí-lo via monitor secundário. Se o orçamento está apertado, você pode até montar um <a href="/teleprompter-caseiro-diy" className="text-purple-400 hover:text-purple-300 underline">teleprompter caseiro DIY</a> usando nosso app.
            </p>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Comparativo Detalhado</h2>
        <div className="overflow-x-auto">
            <table className="w-full text-left text-slate-300 border-collapse">
                <thead>
                    <tr className="border-b border-slate-700 bg-slate-900">
                        <th className="p-4">Recurso</th>
                        <th className="p-4 text-green-400 font-bold">PromptNinja (Web)</th>
                        <th className="p-4 text-slate-400">Hardware (Físico)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b border-slate-800">
                        <td className="p-4">Preço</td>
                        <td className="p-4 font-bold text-green-400">Gratuito (ou taxa única baixa)</td>
                        <td className="p-4">R$ 300 - R$ 2.000+</td>
                    </tr>
                    <tr className="border-b border-slate-800">
                        <td className="p-4">Setup</td>
                        <td className="p-4">Instantâneo (abrir navegador)</td>
                        <td className="p-4">Demorado (montar vidro, tripé)</td>
                    </tr>
                    <tr className="border-b border-slate-800">
                        <td className="p-4">Controle Remoto</td>
                        <td className="p-4">Qualquer celular (Grátis)</td>
                        <td className="p-4">Controle dedicado (perdeu = parou)</td>
                    </tr>
                    <tr className="border-b border-slate-800">
                        <td className="p-4">Portabilidade</td>
                        <td className="p-4">Zero peso (está na nuvem/celular)</td>
                        <td className="p-4">Volumoso e frágil (vidro)</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">O Diferencial Invisível: A Tecnologia P2P</h2>
        <p className="mb-6">
            A maior vantagem do hardware era não depender de internet para rolar o texto. O PromptNinja igualou esse jogo. Nossa tecnologia P2P funciona offline na rede local, garantindo latência zero e confiabilidade total, sem o peso do equipamento físico.
        </p>

        <div className="text-center mt-12">
            <a
                href="https://promptninja.solutionkit.com.br"
                className="inline-block bg-gradient-to-r from-green-600 to-teal-600 font-bold py-3 px-6 rounded-lg transition hover:brightness-110"
                style={{ color: 'white' }}
            >
                Teste a Evolução do Teleprompter
            </a>
        </div>

        <SEOContentFAQ
            title="Dúvidas: Software vs Hardware"
            items={[
                {
                    question: "O PromptNinja substitui um teleprompter de vidro?",
                    answer: "Depende do seu uso. Para câmeras frontais de celular e webcam, sim, é até melhor pois o olho fica na lente. Para câmeras DSLR profissionais a 2 metros de distância, você pode usar o PromptNinja EM CONJUNTO com o vidro (modo espelho)."
                },
                {
                    question: "Preciso de internet rápida?",
                    answer: "Não. O PromptNinja carrega uma vez e funciona offline. A tecnologia P2P usa sua rede local (Wi-Fi), não a internet de fora, garantindo velocidade máxima."
                },
                {
                    question: "Posso usar em um monitor antigo?",
                    answer: "Sim! Qualquer tela que tenha um navegador (Chrome, Edge) serve. Você pode dar vida nova a um monitor velho ou tablet antigo usando-o apenas como tela de leitura."
                }
            ]}
        />
    </>
);
