import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { ROUTES_CONFIG } from "../../../../config/routes";

export const TeleprompterAcessibilidadePT = () => (
    <>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Teleprompter para TDAH e Dislexia: Como a Tecnologia Ajuda na Fala
        </h1>

        <p className="lead text-xl text-slate-300 mb-8">
            Para quem tem TDAH (Transtorno de Déficit de Atenção com Hiperatividade) ou Dislexia, gravar vídeos pode ser um pesadelo. Esquecer o que ia falar, trocar palavras, perder o foco... O teleprompter não é apenas uma ferramenta de leitura, é uma ferramenta de <strong>foco assistido</strong>.
        </p>

        <div className="bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Recursos do PromptNinja para Neurodiversidade</h2>

            <div className="space-y-6">
                <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-orange-500">
                    <h3 className="text-xl font-bold text-white mb-2">Fonte OpenDyslexic</h3>
                    <p className="text-slate-300 mb-2">
                        O PromptNinja é um dos poucos apps que oferece nativamente a fonte <strong>OpenDyslexic</strong>.
                    </p>
                    <p className="text-sm text-slate-400">
                        Esta fonte tem a base das letras "mais pesada", o que ajuda o cérebro a identificar a direção correta da letra e evita que elas "danem" ou se invertam na tela.
                    </p>
                </div>

                <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-blue-500">
                    <h3 className="text-xl font-bold text-white mb-2">Foco Visual (A Régua)</h3>
                    <p className="text-slate-300 mb-2">
                        Pessoas com TDAH muitas vezes se perdem no meio de um bloco de texto. O PromptNinja tem um marcador visual central (highlight) que destaca apenas a linha atual.
                    </p>
                    <p className="text-sm text-slate-400">
                        Isso elimina o ruído visual do resto do texto e diz ao seu cérebro: "Leia SÓ isso agora".
                    </p>
                </div>

                <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-purple-500">
                    <h3 className="text-xl font-bold text-white mb-2">Cores Personalizáveis</h3>
                    <p className="text-slate-300 mb-2">
                        Alto contraste (fundo preto, letra branca) pode ser cansativo para alguns (estresse visual). O app permite mudar para fundo cinza, letras amarelas, ou qualquer combinação que seja confortável para sua sensibilidade sensorial.
                    </p>
                </div>
            </div>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Dicas para Criadores com TDAH</h2>
        <ul className="list-disc list-inside space-y-4 text-slate-300 mb-12">
            <li><strong>Escreva Roteiros Curtos:</strong> Divida o vídeo em blocos de 3 minutos. Foco sustentado é difícil.</li>
            <li><strong>Use Voice Control:</strong> Se você divagar (o que é normal), o teleprompter espera. Se você acelerar na empolgação, ele acompanha. Isso reduz a ansiedade de "perder o ponto".</li>
            <li><strong>Grave em Pé:</strong> O movimento ajuda a manter a energia e o foco. O prompter na altura dos olhos permite que você se mova sem perder a leitura.</li>
        </ul>

        <SEOContentFAQ
            title="FAQ de Acessibilidade"
            items={[
                {
                    question: "O PromptNinja funciona com leitores de tela?",
                    answer: "Estamos trabalhando constantemente para melhorar a compatibilidade com leitores de tela e navegação por teclado, garantindo que o app seja utilizável por pessoas com deficiência visual."
                },
                {
                    question: "A fonte OpenDyslexic é realmente comprovada?",
                    answer: "Estudos variam, mas muitos usuários relatam uma melhora significativa na fluidez da leitura. O melhor é testar: ative-a no menu de configurações (ícone de engrenagem) e veja se funciona para você."
                },
                {
                    question: "O app é gratuito para uso educacional?",
                    answer: "Sim! O PromptNinja é 100% gratuito. Professores e alunos com dificuldades de aprendizagem podem usar sem restrições."
                }
            ]}
        />

        <div className="text-center mt-12 pb-12">
            <a
                href="#app"
                className="inline-block bg-gradient-to-r from-purple-700 to-blue-700 font-bold py-4 px-10 rounded-full transition hover:scale-105 shadow-xl text-white text-lg"
            >
                Experimente a Fonte OpenDyslexic Agora
            </a>
        </div>

        <div className="border-t border-slate-800 pt-12 mt-12">
            <h3 className="text-2xl font-bold text-white mb-6">Veja Também</h3>
            <ul className="space-y-4">
                <li>
                    <a href={ROUTES_CONFIG.SEO_READING_SPEED.paths.pt} className="text-purple-400 hover:text-purple-300 hover:underline text-lg">
                        🚀 Qual a Velocidade Ideal de Leitura?
                    </a>
                </li>
                <li>
                    <a href={ROUTES_CONFIG.SEO_GRATIS.paths.pt} className="text-purple-400 hover:text-purple-300 hover:underline text-lg">
                        💸 Teleprompter Online Grátis (Sem Login)
                    </a>
                </li>
                <li>
                    <a href={ROUTES_CONFIG.SEO_ORATORIA.paths.pt} className="text-purple-400 hover:text-purple-300 hover:underline text-lg">
                        🗣️ Dicas de Oratória para Vídeo
                    </a>
                </li>
            </ul>
        </div>
    </>
);
