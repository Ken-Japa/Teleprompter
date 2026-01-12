import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { ROUTES_CONFIG } from "../../../../config/routes";

export const ErrosComunsTeleprompterPT = () => (
    <>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            5 Erros Amadores ao Usar Teleprompter que Arruínam Seus Vídeos (E Como Corrigir)
        </h2>

        <p className="lead text-xl text-slate-300 mb-8">
            Você comprou o equipamento, baixou o app, mas o vídeo final ficou... estranho. Roboticamente lido, olhos correndo de um lado para o outro. Calma, o problema não é você, é a técnica. Vamos corrigir os 5 erros clássicos agora.
        </p>

        <div className="space-y-8 mb-12">
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-xl shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl font-bold text-red-500">1</div>
                <h3 className="text-2xl font-bold text-red-400 mb-3 relative z-10">O Olhar de "Assistir Tênis"</h3>
                <p className="text-slate-300 mb-4 relative z-10">
                    O erro mais óbvio: seus olhos se movem da esquerda para a direita enquanto leem, parecendo que você está assistindo a uma partida de ping-pong.
                </p>
                <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-green-500">
                    <h4 className="font-bold text-green-400 mb-1">Como Corrigir com PromptNinja:</h4>
                    <p className="text-sm text-slate-300">
                        Aumente a distância da câmera (mínimo 1 metro) e <strong>estreite as margens</strong> do texto no app. Quanto mais estreita a coluna de texto, menos seus olhos precisam mover lateralmente.
                    </p>
                </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-8 rounded-xl shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl font-bold text-red-500">2</div>
                <h3 className="text-2xl font-bold text-red-400 mb-3 relative z-10">A "Voz de Robô"</h3>
                <p className="text-slate-300 mb-4 relative z-10">
                    Falar monotone, sem pausas e sem emoção, apenas despejando palavras. Isso acontece quando você tenta acompanhar a velocidade do texto, em vez do texto acompanhar você.
                </p>
                <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-green-500">
                    <h4 className="font-bold text-green-400 mb-1">Como Corrigir com PromptNinja:</h4>
                    <p className="text-sm text-slate-300">
                        Use o recurso de <strong>Voice Control (IA)</strong>. O PromptNinja escuta sua voz e rola o texto apenas quando você fala. Isso permite que você faça pausas dramáticas, respire e atue naturalmente.
                    </p>
                </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-8 rounded-xl shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl font-bold text-red-500">3</div>
                <h3 className="text-2xl font-bold text-red-400 mb-3 relative z-10">Esquecer de Piscar (O Olhar Vidrado)</h3>
                <p className="text-slate-300 mb-4 relative z-10">
                    Na ansiedade de não perder a leitura, você arregala os olhos e para de piscar. O resultado é assustador para quem assiste.
                </p>
                <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-green-500">
                    <h4 className="font-bold text-green-400 mb-1">A Solução:</h4>
                    <p className="text-sm text-slate-300">
                        Adicione emojis ou quebras de linha no roteiro como lembretes visuais para [PISCAR] ou [SORRIR]. Relaxe.
                    </p>
                </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-8 rounded-xl shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl font-bold text-red-500">4</div>
                <h3 className="text-2xl font-bold text-red-400 mb-3 relative z-10">Escrever "Livros" em vez de "Conversas"</h3>
                <p className="text-slate-300 mb-4 relative z-10">
                    Roteiros com frases longas, palavras difíceis (tipo "outrossim", "entretanto") soam artificiais.
                </p>
                <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-green-500">
                    <h4 className="font-bold text-green-400 mb-1">A Solução:</h4>
                    <p className="text-sm text-slate-300">
                        Leia seu roteiro em voz alta antes de gravar. Se travar a língua, reescreva. Escreva como se estivesse falando com um amigo no bar.
                    </p>
                </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-8 rounded-xl shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl font-bold text-red-500">5</div>
                <h3 className="text-2xl font-bold text-red-400 mb-3 relative z-10">Fonte Pequena Demais</h3>
                <p className="text-slate-300 mb-4 relative z-10">
                    Tentar ler letras miúdas faz você apertar os olhos (squinting), o que passa insegurança.
                </p>
                <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-green-500">
                    <h4 className="font-bold text-green-400 mb-1">Como Corrigir com PromptNinja:</h4>
                    <p className="text-sm text-slate-300">
                        Aumente o tamanho da fonte para EXATAS (Extra Large). É melhor rolar mais rápido do que forçar a vista.
                    </p>
                </div>
            </div>
        </div>

        <SEOContentFAQ
            title="FAQ de Erros Técnicos"
            items={[
                {
                    question: "E se eu errar uma palavra durante a gravação?",
                    answer: "Continue! Se for um erro pequeno e natural, mantenha. Isso adiciona autenticidade. Se for grave, pare, respire, olhe para a câmera (não pro texto) e repita a frase. Edite depois."
                },
                {
                    question: "Devo usar óculos lendo o teleprompter?",
                    answer: "Cuidado com o reflexo da tela nos óculos. Tente levantar a luz do teleprompter (brilho) ou mudar o ângulo da iluminação do ambiente para evitar reflexos nas lentes."
                },
                {
                    question: "Posso improvisar no meio?",
                    answer: "Com certeza. O PromptNinja tem um atalho [ESPAÇO] que para a rolagem instantaneamente. Improvise, e quando voltar ao roteiro, aperte espaço novamente."
                }
            ]}
        />

        <div className="text-center mt-12 pb-12">
            <a
                href="#app"
                className="inline-block bg-gradient-to-r from-purple-600 to-blue-700 font-bold py-4 px-10 rounded-full transition hover:scale-105 shadow-xl text-white text-lg"
            >
                Grave Sem Erros Agora (Grátis)
            </a>
        </div>

        <div className="border-t border-slate-800 pt-12 mt-12">
            <h3 className="text-2xl font-bold text-white mb-6">Veja Também</h3>
            <ul className="space-y-4">
                <li>
                    <a href={ROUTES_CONFIG.SEO_READING_SPEED.paths.pt} className="text-purple-400 hover:text-purple-300 hover:underline text-lg">
                        🚀 Qual a Velocidade Ideal de Leitura (WPM)?
                    </a>
                </li>
                <li>
                    <a href={ROUTES_CONFIG.SEO_ORATORIA.paths.pt} className="text-purple-400 hover:text-purple-300 hover:underline text-lg">
                        🗣️ 5 Dicas de Oratória em Vídeo
                    </a>
                </li>
                <li>
                    <a href={ROUTES_CONFIG.SEO_DECORAR.paths.pt} className="text-purple-400 hover:text-purple-300 hover:underline text-lg">
                        🧠 Como Decorar Texto Rápido (Se o Prompter falhar)
                    </a>
                </li>
            </ul>
        </div>
    </>
);
