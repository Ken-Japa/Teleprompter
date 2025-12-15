
import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";

export const ComoInstalarPwaPT = () => (
    <>
        <h1 className="text-4xl font-bold text-white mb-6">Como Instalar o PromptNinja (App PWA)</h1>
        <p className="mb-6 text-xl text-slate-300">
            O PromptNinja é um <strong>Progressive Web App (PWA)</strong>. Isso significa que você pode instalá-lo diretamente do seu navegador, sem precisar visitar a App Store ou Play Store. É mais leve, mais rápido e funciona offline.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mt-12">

            {/* iOS Guide */}
            <div className="bg-slate-800 p-8 rounded-xl border border-slate-700">
                <div className="flex items-center gap-4 mb-6">
                    <span className="text-5xl">🍎</span>
                    <h2 className="text-2xl font-bold text-white">iPhone / iPad (iOS)</h2>
                </div>
                <ol className="space-y-6 text-slate-300 list-decimal pl-5 marker:text-blue-500 marker:font-bold">
                    <li>
                        Abra o <strong>PromptNinja</strong> no <strong>Safari</strong>.
                        <p className="text-sm text-slate-400 mt-1">(PWAs só instalam pelo Safari no iOS)</p>
                    </li>
                    <li>
                        Toque no botão <strong>Compartilhar</strong> (ícone do quadrado com a seta para cima) na barra inferior.
                    </li>
                    <li>
                        Role para baixo e toque em <strong>"Adicionar à Tela de Início"</strong> (Add to Home Screen).
                    </li>
                    <li>
                        Toque em <strong>Adicionar</strong> no canto superior direito.
                    </li>
                </ol>
                <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg text-sm text-blue-200">
                    <strong>Dica:</strong> Uma vez instalado, o PromptNinja aparecerá como um app nativo na sua tela inicial, rodando em tela cheia e sem barras de navegação.
                </div>
            </div>

            {/* Android Guide */}
            <div className="bg-slate-800 p-8 rounded-xl border border-slate-700">
                <div className="flex items-center gap-4 mb-6">
                    <span className="text-5xl">🤖</span>
                    <h2 className="text-2xl font-bold text-white">Android (Chrome)</h2>
                </div>
                <ol className="space-y-6 text-slate-300 list-decimal pl-5 marker:text-green-500 marker:font-bold">
                    <li>
                        Abra o <strong>PromptNinja</strong> no <strong>Google Chrome</strong>.
                    </li>
                    <li>
                        Toque no botão de <strong>Menu</strong> (três pontinhos) no canto superior direito.
                    </li>
                    <li>
                        Toque em <strong>"Instalar aplicativo"</strong> ou <strong>"Adicionar à tela inicial"</strong>.
                    </li>
                    <li>
                        Confirme tocando em <strong>Instalar</strong>.
                    </li>
                </ol>
                <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-sm text-green-200">
                    <strong>Dica:</strong> O app é extremamente leve (menos de 2MB) e atualiza automaticamente sempre que você o abre conectado à internet.
                </div>
            </div>

        </div>

        <div className="mt-16 bg-slate-800/50 p-8 rounded-xl text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Por que instalar o PWA?</h2>
            <div className="grid sm:grid-cols-3 gap-6 text-left mt-8">
                <div>
                    <h3 className="text-lg font-bold text-purple-400 mb-2">⚡ Performance Nativa</h3>
                    <p className="text-slate-400 text-sm">Carregamento instantâneo e navegação fluida, igual a um app da loja.</p>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-blue-400 mb-2">📶 Funciona Offline</h3>
                    <p className="text-slate-400 text-sm">Sem internet? Sem problemas. O app cacheia os recursos necessários para funcionar em qualquer lugar.</p>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-green-400 mb-2">💾 Economia de Espaço</h3>
                    <p className="text-slate-400 text-sm">Ocupa uma fração do espaço de um app convencional. Menos memória, mais eficiência.</p>
                </div>
            </div>
        </div>

        <SEOContentFAQ
            title="Dúvidas sobre Instalação (PWA)"
            items={[
                {
                    question: "É seguro instalar? Tem vírus?",
                    answer: "Sim, é 100% seguro. PWAs rodam dentro da 'caixa de areia' (sandbox) do navegador, o que significa que eles não têm acesso aos seus arquivos pessoais ou sistema sem sua permissão."
                },
                {
                    question: "Funciona sem internet?",
                    answer: "Sim. Após a instalação (ou primeiro acesso), o app salva os arquivos essenciais no seu dispositivo para funcionar offline."
                },
                {
                    question: "Ocupa muito espaço?",
                    answer: "Não. Diferente de apps nativos que podem pesar 100MB+, o PromptNinja geralmente ocupa menos de 2MB, pois reutiliza recursos do navegador."
                }
            ]}
        />
    </>
);
