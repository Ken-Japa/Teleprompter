import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { SEOContentHowTo } from "../../../../components/seo/SEOContentHowTo";

export const ComoInstalarPwaPT = () => (
    <>
        <h2 className="text-4xl font-bold text-white mb-6 leading-tight">Como "Baixar" o PromptNinja (Instalar App PWA)</h2>

        <p className="mb-6 text-xl text-slate-300">
            Você procurou na App Store ou Play Store e não achou? Calma, isso é uma <strong>vantagem</strong>, não um defeito.
        </p>

        <p className="mb-8 text-slate-300">
            O PromptNinja é um <strong>Progressive Web App (PWA) Elite</strong>. Isso significa que ele tem o poder de um aplicativo nativo (funciona offline, tela cheia, sem travamentos), mas sem a burocracia das lojas. Você instala direto do navegador, em segundos, sem ocupar a memória do seu celular.
        </p>

        <div className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 p-8 rounded-xl border border-purple-500/30 mb-12">
            <h3 className="text-2xl font-bold text-white mb-4">Por que instalar assim é melhor?</h3>
            <div className="grid sm:grid-cols-3 gap-6">
                <div className="bg-slate-900/50 p-4 rounded-lg">
                    <h3 className="text-lg font-bold text-green-400 mb-2">💾 Leveza Extrema</h3>
                    <p className="text-slate-400 text-sm">Apps de teleprompter pesam média de 150MB. O PromptNinja instalado pesa menos de <strong>2MB</strong>. Sobra espaço para seus vídeos 4K.</p>
                </div>
                <div className="bg-slate-900/50 p-4 rounded-lg">
                    <h3 className="text-lg font-bold text-blue-400 mb-2">📱 Tela Cheia Real</h3>
                    <p className="text-slate-400 text-sm">Ao instalar, as barras de endereço do Safari/Chrome somem. Você ganha 15% a mais de tela para ler seu texto.</p>
                </div>
                <div className="bg-slate-900/50 p-4 rounded-lg">
                    <h3 className="text-lg font-bold text-purple-400 mb-2">⚡ Offline First</h3>
                    <p className="text-slate-400 text-sm">Vai gravar no meio do mato? Sem problemas. Uma vez instalado, o app abre instantaneamente mesmo sem sinal de Wi-Fi.</p>
                </div>
            </div>
        </div>

        <h3 className="text-3xl font-bold text-white mb-8">Guia de Instalação Passo a Passo</h3>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* iOS Guide */}
            <SEOContentHowTo
                title="🍎 iPhone / iPad (Safari)"
                schemaTitle="Como Instalar o PromptNinja no iPhone (iOS)"
                steps={[
                    {
                        title: "1. Use o Safari",
                        text: "PWAs no iPhone funcionam melhor no Safari. Abra 'promptninja.solutionkit.com.br'."
                    },
                    {
                        title: "2. Botão Compartilhar",
                        text: "Toque no ícone do meio na barra inferior (um quadrado com uma seta apontando para cima)."
                    },
                    {
                        title: "3. O Segredo",
                        text: "Role a lista para baixo até encontrar 'Adicionar à Tela de Início' (Add to Home Screen). Cuidado: Não é 'Adicionar aos Favoritos'."
                    },
                    {
                        title: "4. Confirmar",
                        text: "Toque em 'Adicionar' no canto superior direito. O ícone roxo aparecerá na sua home."
                    }
                ]}
                className="bg-slate-800 p-8 rounded-xl border-l-4 border-slate-500 h-full"
            />

            {/* Android Guide */}
            <SEOContentHowTo
                title="🤖 Android (Chrome/Samsung)"
                schemaTitle="Como Instalar o PromptNinja no Android"
                steps={[
                    {
                        title: "1. Notificação Automática",
                        text: "Muitas vezes, uma barra aparece embaixo: 'Adicionar PromptNinja à tela inicial'. Se aparecer, só clicar!"
                    },
                    {
                        title: "2. Menu Manual",
                        text: "Se não aparecer, toque nos três pontinhos (⋮) no canto superior direito do Chrome."
                    },
                    {
                        title: "3. Instalar",
                        text: "Procure por 'Instalar aplicativo' ou 'Adicionar à tela principal' no menu."
                    },
                    {
                        title: "4. Pronto",
                        text: "O sistema vai criar um APK leve e instalar como um aplicativo nativo."
                    }
                ]}
                className="bg-slate-800 p-8 rounded-xl border-l-4 border-green-500 h-full"
            />
        </div>

        <div className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-6">💻 No Computador (PC / Mac)</h3>
            <div className="bg-slate-800 p-6 rounded-xl border border-blue-500/30">
                <p className="text-slate-300 mb-4">
                    Sim, você pode instalar no desktop também! Isso coloca o ícone do PromptNinja na sua barra de tarefas ou Dock, e roda ele numa janela independente (sem as abas distraindo).
                </p>
                <ul className="space-y-4 text-slate-300">
                    <li className="flex gap-3 items-start">
                        <span className="bg-blue-900 text-blue-300 rounded px-2 font-bold">Chrome/Edge:</span>
                        <span>Olhe para o lado direito da barra de endereço (URL). Você verá um pequeno ícone de um <strong>computador com uma seta para baixo</strong> ⬇️. Clique nele e depois em "Instalar".</span>
                    </li>
                </ul>
            </div>
        </div>

        <SEOContentFAQ
            title="Dúvidas Frequentes sobre PWA"
            items={[
                {
                    question: "É seguro? Pega vírus?",
                    answer: "É mais seguro que um app normal. PWAs rodam isolados na 'caixa de areia' do navegador. Eles não têm acesso aos seus contatos, fotos ou arquivos do sistema a menos que você autorize explicitamente cada ação."
                },
                {
                    question: "Como atualizo o app?",
                    answer: "Essa é a melhor parte: ele se atualiza sozinho. Sempre que você abre o app conectado à internet, ele baixa a versão mais recente em milissegundos. Você nunca mais verá aquela barra de carregamento de 'Atualizando...'."
                },
                {
                    question: "Não achei o botão de instalar no iPhone.",
                    answer: "Certifique-se de estar usando o **Safari**. O Chrome no iOS às vezes não mostra essa opção devido a restrições da Apple. No Safari, o botão 'Adicionar à Tela de Início' está escondido dentro do menu de Compartilhar."
                }
            ]}
        />
    </>
);
