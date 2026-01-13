import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { ROUTES_CONFIG } from "../../../../config/routes";

export const TeleprompterAcessibilidadePT = () => (
    <>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Teleprompter e Acessibilidade: Tecnologia de Foco Assistido
        </h2>

        <p className="lead text-xl text-slate-300 mb-8 font-medium">
            Transforme o desafio de falar para a câmera em uma experiência de confiança. <strong>Descubra como recursos inclusivos</strong> ajudam pessoas com TDAH, Dislexia e outras neurodiversidades a brilharem em vídeo.
        </p>

        <p className="text-slate-300 mb-8">
            Neste mergulho sobre inclusão digital, exploramos o papel vital do teleprompter como uma ferramenta de acessibilidade. Para criadores neurodiversos, o ato de gravar pode ser repleto de ansiedade e perda de foco. O PromptNinja foi desenhado para combater esses obstáculos, oferecendo recursos únicos como a fonte OpenDyslexic — projetada para aumentar a legibilidade e reduzir a inversão de letras — e marcadores de foco visual que isolam a informação relevante, eliminando o ruído cognitivo. Saiba como o Voice Control permite que o roteiro aguarde seu tempo de processamento, e como esquemas de cores de alto contraste protegem contra o estresse visual. democratizamos a oratória profissional oferecendo todas essas ferramentas de forma gratuita e online, garantindo que ninguém seja deixado para trás na era do conteúdo em vídeo.
        </p>

        <div className="bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg mb-12">
            <h3 className="text-3xl font-bold text-white mb-6">Recursos do PromptNinja para Neurodiversidade</h3>

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

        <h3 className="text-3xl font-bold text-white mt-12 mb-6">Dicas para Criadores com TDAH</h3>
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
                href="https://promptninja.solutionkit.com.br/#app"
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
