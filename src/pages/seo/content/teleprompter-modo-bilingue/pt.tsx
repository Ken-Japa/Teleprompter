import React from "react";
import * as S from "../../../../components/ui/Styled";
import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { SEOContentHowTo } from "../../../../components/seo/SEOContentHowTo";

export const TeleprompterModoBilinguePT: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
                Teleprompter Modo Bilíngue: A Revolução para Aprendizado e Apresentações
            </h1>

            <div className="prose prose-lg prose-invert mx-auto mb-12">
                <p>
                    Se você está aprendendo um novo idioma, preparando uma apresentação internacional ou criando conteúdo para uma audiência global, o <strong>Modo Bilíngue do PromptNinja</strong> é a ferramenta que faltava no seu arsenal.
                </p>
                <p>
                    Diferente de qualquer outro <a href="/teleprompter-online-gratis" className="text-blue-400 hover:underline">teleprompter online gratuito</a>, o PromptNinja permite que você visualize dois scripts simultaneamente, lado a lado, com sincronización perfeita e controle independente.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                <S.FeatureCard
                    icon={<span className="text-4xl">📚</span>}
                    title="Aprendizado de Idiomas"
                    desc="Coloque o texto original na esquerda e a tradução na direita. Acompanhe a estrutura das frases e expanda seu vocabulário enquanto pratica a pronúncia."
                />
                <S.FeatureCard
                    icon={<span className="text-4xl">🎤</span>}
                    title="Apresentações Internacionais"
                    desc="Mantenha seu script nativo como referência enquanto lê o discurso no idioma estrangeiro. Nunca mais se perca na tradução."
                />
            </div>

            <h2 className="text-3xl font-bold text-white mb-6 mt-12">Como Funciona o Modo Bilíngue?</h2>

            <div className="space-y-6 text-gray-300 text-lg mb-12">
                <p>
                    Ativar o modo bilíngue é simples e imediato. No editor do PromptNinja, basta clicar no botão <strong>"Modo Bilíngue"</strong>.
                </p>
                <SEOContentHowTo
                    title=""
                    schemaTitle="Como Usar o Modo Bilíngue"
                    totalTime="PT1M"
                    tools={["PromptNinja", "Texto Original", "Tradução"]}
                    steps={[
                        {
                            title: "Passo 1: Ativar",
                            text: "Clique no botão 'Modo Bilíngue'. A tela se divide em duas colunas."
                        },
                        {
                            title: "Passo 2: Inserir Textos",
                            text: "Cole o texto base na esquerda (Idioma Principal) e a tradução/notas na direita (Secundário)."
                        },
                        {
                            title: "Passo 3: Sincronizar",
                            text: "Use o Controle de Voz ou rolagem manual. Ambos os textos rolam juntos."
                        }
                    ]}
                />
                <p>
                    Durante a rolagem do teleprompter, ambos os textos se movem em sincronia. Se você usar nosso exclusivo <strong>Controle de Voz</strong>, pode escolher qual dos dois idiomas o sistema deve "ouvir" para avançar o texto automaticamente!
                </p>
            </div>

            <h2 className="text-3xl font-bold text-white mb-6">Por que usar um Teleprompter Bilíngue?</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-slate-800 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-white mb-3">Poliglotas e Estudantes</h3>
                    <p className="text-gray-400">
                        A técnica de "Shadowing" fica muito mais fácil quando você tem o texto original e a tradução visíveis ao mesmo tempo. Ideal para praticar com <a href="/teleprompter-apresentacoes" className="text-blue-400 hover:underline">apresentações profissionais</a>.
                    </p>
                </div>
                <div className="bg-slate-800 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-white mb-3">Palestrantes Globais</h3>
                    <p className="text-gray-400">
                        Garanta que suas piadas e pontos-chave sejam entregues corretamente em outro idioma, tendo seu backup na língua materna.
                    </p>
                </div>
                <div className="bg-slate-800 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-white mb-3">Criadores de Conteúdo</h3>
                    <p className="text-gray-400">
                        Grave versões do mesmo vídeo em múltiplos idiomas sem precisar decorar novos roteiros do zero. Se você é músico, confira também nosso <a href="/teleprompter-modo-musico" className="text-blue-400 hover:underline">Modo Músico</a>.
                    </p>
                </div>
            </div>

            <div className="bg-blue-900/30 border border-blue-500/30 p-8 rounded-xl mb-12">
                <h3 className="text-2xl font-bold text-blue-400 mb-4">Dica Pro: Alinhamento Perfeito</h3>
                <p className="text-gray-300">
                    Para garantir que os parágrafos fiquem sempre alinhados, recomendamos usar quebras de linha duplas (Enter x2) nos mesmos pontos em ambos os textos. Assim, a sincronia visual se mantém do início ao fim da sua gravação.
                </p>
            </div>

            <SEOContentFAQ
                title="Perguntas Frequentes sobre o Modo Bilíngue"
                items={[
                    {
                        question: "Preciso instalar algum software?",
                        answer: "Não! O PromptNinja é 100% online. Você acessa diretamente pelo navegador, seja no computador, tablet ou celular, sem precisar baixar nada."
                    },
                    {
                        question: "O controle de voz funciona nos dois idiomas?",
                        answer: "Sim, mas você deve selecionar qual idioma o sistema deve 'ouvir' para controlar a rolagem. Você pode alternar entre rastrear o idioma da esquerda ou da direita nas configurações."
                    },
                    {
                        question: "Posso usar em apresentações ao vivo?",
                        answer: "Com certeza. O Modo Bilíngue é perfeito para palestras onde você precisa de um apoio visual em dois idiomas. E como funciona offline (PWA), você não depende da internet do evento."
                    },
                    {
                        question: "É gratuito?",
                        answer: "Sim, o Modo Bilíngue está disponível na versão gratuita do PromptNinja para que todos possam experimentar e melhorar suas habilidades linguísticas."
                    }
                ]}
            />
        </div>
    );
};
