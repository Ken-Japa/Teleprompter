
import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { SEOContentHowTo } from "../../../../components/seo/SEOContentHowTo";

export const ComoInstalarPwaPT = () => (
    <>
        <h1 className="text-4xl font-bold text-white mb-6">Como Instalar o PromptNinja (App PWA)</h1>
        <p className="mb-6 text-xl text-slate-300">
            O PromptNinja é um <strong>Progressive Web App (PWA)</strong>. Isso significa que você pode instalá-lo diretamente do seu navegador, sem precisar visitar a App Store ou Play Store. É mais leve, mais rápido e funciona offline.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mt-12">

            {/* iOS Guide */}
            <SEOContentHowTo
                title="iPhone / iPad (iOS)"
                schemaTitle="Como Instalar o PromptNinja no iPhone (iOS)"
                steps={[
                    {
                        title: "Passo 1",
                        text: "Abra o PromptNinja no Safari. (Importante: PWAs só instalam pelo Safari no iOS)."
                    },
                    {
                        title: "Passo 2",
                        text: "Toque no botão Compartilhar (ícone do quadrado com a seta para cima) na barra inferior."
                    },
                    {
                        title: "Passo 3",
                        text: "Role para baixo e toque em \"Adicionar à Tela de Início\" (Add to Home Screen)."
                    },
                    {
                        title: "Passo 4",
                        text: "Toque em Adicionar no canto superior direito."
                    }
                ]}
                className="bg-slate-800 p-8 rounded-xl border border-slate-700 h-full"
            />

            {/* Android Guide */}
            <SEOContentHowTo
                title="Android (Chrome)"
                schemaTitle="Como Instalar o PromptNinja no Android"
                steps={[
                    {
                        title: "Passo 1",
                        text: "Abra o PromptNinja no Google Chrome."
                    },
                    {
                        title: "Passo 2",
                        text: "Toque no botão de Menu (três pontinhos) no canto superior direito."
                    },
                    {
                        title: "Passo 3",
                        text: "Toque em \"Instalar aplicativo\" ou \"Adicionar à tela inicial\"."
                    },
                    {
                        title: "Passo 4",
                        text: "Confirme tocando em Instalar."
                    }
                ]}
                className="bg-slate-800 p-8 rounded-xl border border-slate-700 h-full"
            />

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
