import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { SEOImage } from "../../../../components/seo/SEOImage";
import { ROUTES_CONFIG } from "../../../../config/routes";

export const ComoEscolherTeleprompterPT = () => (
    <>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Como Escolher o Teleprompter Ideal: Guia de Compra Completo
        </h2>

        <p className="lead text-xl text-slate-300 mb-8 font-medium">
            Tome a decisão certa para o seu setup de vídeo. <strong>Descubra o que considerar antes de comprar</strong> um teleprompter e saiba quando a solução de software é superior ao hardware.
        </p>

        <p className="text-slate-300 mb-8">
            Neste guia exaustivo, navegamos pelo complexo mercado de teleprompters para ajudar você a economizar tempo e dinheiro. Seja para um estúdio profissional, um canal no YouTube ou reuniões remotas, entender as diferenças fundamentais entre equipamentos físicos de alto custo e soluções de software modernas é crucial. Analisamos detalhadamente os prós e contras de cada tipo de equipamento, desde os tradicionais sistemas beam splitter até o poder dos aplicativos online como o PromptNinja. Aprenda a avaliar a qualidade do vidro, a portabilidade, a facilidade de controle e como integrar ferramentas gratuitas para obter resultados de elite sem investir fortunas iniciais. Escolha com inteligência e foque no que realmente importa: a clareza e autoridade da sua mensagem.
        </p>

        <SEOImage
            slug="como-escolher-teleprompter"
            src="how-to-choose-teleprompter-buying-guide.webp"
            alt="Diferentes tipos de teleprompter e equipamentos"
            caption="Escolher o equipamento certo depende do seu objetivo, distância e orçamento."
            width={1200}
            height={675}
            priority={true}
        />

        <div className="bg-blue-600/10 border border-blue-500/20 rounded-2xl p-6 md:p-8 text-center mb-12">
            <h3 className="text-2xl font-bold text-white mb-4">Teste Antes de Investir</h3>
            <p className="text-slate-300 mb-6">
                Não gaste dinheiro agora. Use a tela que você já tem para testar seu workflow
                e entender o que você realmente precisa em um teleprompter.
            </p>
            <a href="https://promptninja.solutionkit.com.br/#app" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all hover:scale-105 shadow-lg shadow-blue-500/25">
                Abrir Teleprompter Grátis
            </a>
        </div>

        <div className="bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg mb-12">
            <h3 className="text-3xl font-bold text-white mb-6">Os 3 Tipos Principais de Teleprompter</h3>

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

        <h3 className="text-3xl font-bold text-white mt-12 mb-6">Checklist de Compra: O Que Considerar?</h3>
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

        <h3 className="text-3xl font-bold text-white mt-12 mb-6">Veredito: Por Onde Começar?</h3>
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
                href="https://promptninja.solutionkit.com.br/#app"
                className="inline-block bg-gradient-to-r from-purple-700 to-blue-700 font-bold py-4 px-10 rounded-full transition hover:scale-105 shadow-xl text-white text-lg"
            >
                Economize R$ 500: Use o PromptNinja Grátis
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
                    <a href={ROUTES_CONFIG.SEO_DIY.paths.pt} className="text-purple-400 hover:text-purple-300 hover:underline text-lg">
                        🛠️ Como Fazer um Teleprompter Caseiro em 5 Minutos
                    </a>
                </li>
                <li>
                    <a href={ROUTES_CONFIG.SEO_O_QUE_E.paths.pt} className="text-purple-400 hover:text-purple-300 hover:underline text-lg">
                        🤔 O Que é Teleprompter? (Definição Completa)
                    </a>
                </li>
            </ul>
        </div>
    </>
);
