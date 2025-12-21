import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";

export const ComoEscolherTeleprompterPT = () => (
    <>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Como Escolher o Teleprompter Ideal em 2026: O Guia Definitivo
        </h1>

        <p className="lead text-xl text-slate-300 mb-8">
            Você pesquisou no Mercado Livre ou Amazon e ficou confuso com tantas opções? Vidro, iPad, para celular, de estúdio... os preços variam de R$ 50 a R$ 5.000. Antes de abrir a carteira, leia este guia. A melhor escolha pode custar zero.
        </p>

        <div className="bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Os 3 Tipos Principais de Teleprompter</h2>

            <div className="space-y-6">
                <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-purple-500">
                    <h3 className="text-xl font-bold text-white mb-2">1. Teleprompter de Câmera (iPad/Tablet)</h3>
                    <p className="text-slate-300 mb-2"><strong>O que é:</strong> Uma estrutura que acopla na lente da câmera DSLR, com um vidro que reflete a tela de um tablet.</p>
                    <p className="text-sm text-slate-400"><strong>Pros:</strong> Olhar direto na lente, profissional. <strong>Contras:</strong> Custo alto (R$ 500+), requer tablet e câmera.</p>
                </div>

                <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-blue-500">
                    <h3 className="text-xl font-bold text-white mb-2">2. Teleprompter de Presidencial (Palco)</h3>
                    <p className="text-slate-300 mb-2"><strong>O que é:</strong> Vidros transparentes em pedestais. Usado em palestras.</p>
                    <p className="text-sm text-slate-400"><strong>Pros:</strong> Invisível para a plateia. <strong>Contras:</strong> Caríssimo, difícil de montar e transportar.</p>
                </div>

                <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-green-500">
                    <h3 className="text-xl font-bold text-white mb-2">3. Teleprompter de Software (Web/App)</h3>
                    <p className="text-slate-300 mb-2"><strong>O que é:</strong> Apps como o PromptNinja que rodam na tela do PC, Laptop ou Celular, logo abaixo da webcam.</p>
                    <p className="text-sm text-slate-400"><strong>Pros:</strong> Grátis, setup instantâneo, funciona com webcam. <strong>Contras:</strong> Olhar levemente acima da lente (imperceptível a 1m de distância).</p>
                </div>
            </div>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Checklist de Compra: O Que Considerar?</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            <li className="flex items-center gap-3 bg-slate-800/50 p-4 rounded-lg">
                <span className="text-green-400 text-xl">✅</span>
                <span className="text-slate-300">Tamanho da Tela (Legibilidade)</span>
            </li>
            <li className="flex items-center gap-3 bg-slate-800/50 p-4 rounded-lg">
                <span className="text-green-400 text-xl">✅</span>
                <span className="text-slate-300">Portabilidade (Peso)</span>
            </li>
            <li className="flex items-center gap-3 bg-slate-800/50 p-4 rounded-lg">
                <span className="text-green-400 text-xl">✅</span>
                <span className="text-slate-300">Facilidade de Controle (Controle Remoto)</span>
            </li>
            <li className="flex items-center gap-3 bg-slate-800/50 p-4 rounded-lg">
                <span className="text-green-400 text-xl">✅</span>
                <span className="text-slate-300">Compatibilidade (iOS, Android, Windows)</span>
            </li>
        </ul>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Veredito: Por Onde Começar?</h2>
        <p className="text-slate-300 mb-8">
            Se você está começando um canal no YouTube ou gravando vídeos para redes sociais, <strong>não compre hardware agora</strong>. Comece com Software.
        </p>
        <p className="text-slate-300 mb-8">
            O <strong>PromptNinja</strong> resolve 90% dos casos de uso sem custar um centavo. Ele simula a experiência de um teleprompter físico usando a tela que você já tem. Se um dia você sentir necessidade de comprar um espelho (vidro beam splitter) para usar com câmera profissional, o PromptNinja tem o "Modo Espelho" pronto para isso também.
        </p>

        <SEOContentFAQ
            title="Dúvidas na Hora da Compra"
            items={[
                {
                    question: "Vale a pena comprar aqueles teleprompters de R$ 100 da China?",
                    answer: "Geralmente não. O vidro costuma ser de baixa qualidade (escurece demais a imagem) e o plástico é frágil. Melhor usar um app no laptop."
                },
                {
                    question: "Preciso de um controle remoto físico?",
                    answer: "Com o PromptNinja, não. Você transforma qualquer celular velho (ou o seu atual) em um controle remoto via Wi-Fi. É mais responsivo que os controles Bluetooth baratos."
                },
                {
                    question: "Qual tamanho de tela é ideal?",
                    answer: "Depende da distância. Para webcam (50cm-1m), a tela do laptop é perfeita. Para câmera longe (2m+), use um monitor ou TV grande com o texto em letras gigantes."
                }
            ]}
        />

        <div className="text-center mt-12 pb-12">
            <a
                href="#app"
                className="inline-block bg-gradient-to-r from-purple-700 to-blue-700 font-bold py-4 px-10 rounded-full transition hover:scale-105 shadow-xl text-white text-lg"
            >
                Economize R$ 500: Use o PromptNinja Grátis
            </a>
        </div>
    </>
);
