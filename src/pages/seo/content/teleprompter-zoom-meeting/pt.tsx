
import { ROUTES_CONFIG } from "../../../../config/routes";
import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { SEOContentHowTo } from "../../../../components/seo/SEOContentHowTo";

export const TeleprompterZoomMeetingPT = () => (
    <>
        <h1 className="text-4xl font-bold text-white mb-6">Teleprompter GRÁTIS para Zoom, Teams e Google Meet: O Segredo do Contato Visual Perfeito</h1>

        <p className="lead text-xl text-slate-300 mb-8">
            Manter contato visual durante uma apresentação online é o segredo para prender a atenção e transmitir confiança. No entanto, a realidade é um malabarismo constante: se você olha para suas anotações, perde a conexão com o público; se olha para a câmera, corre o risco de esquecer pontos cruciais. O PromptNinja surge como a solução definitiva para este dilema, permitindo que você leia seu roteiro de forma fluida enquanto olha diretamente para a lente da câmera, criando uma comunicação poderosa e autêntica.
        </p>

        <div className="bg-slate-800 p-6 rounded-lg my-8 border-l-4 border-blue-500">
            <h2 className="text-2xl font-bold text-white mb-2">O Segredo da Fluidez: Por Que o Controle Remoto P2P do PromptNinja Não Trava no Zoom</h2>
            <p className="text-slate-300">
                Diferente de outros teleprompters, o PromptNinja usa tecnologia <strong>P2P (Peer-to-Peer)</strong> para garantir que sua rolagem não trave durante a reunião.
                <br /><br />
                Enquanto ferramentas comuns dependem da velocidade da sua internet (que já está ocupada com o Zoom/Teams), o PromptNinja cria uma conexão direta entre seu celular e seu PC. O resultado? Você muda a velocidade ou pausa o texto instantaneamente, sem atrasos, mesmo se o Wi-Fi oscilar.
            </p>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">O Problema Psicológico do "Olhar Desviado" em Videochamadas</h2>
        <p className="mb-4">
            Em um ambiente de negócios digital, a confiança é a moeda mais valiosa. Em reuniões importantes de vendas, entrevistas de emprego ou apresentações executivas, o contato visual direto é interpretado pelo cérebro humano como um sinal de honestidade, preparo e autoridade. Quando seus olhos vagueiam para ler um script em papel ou em uma janela lateral, você involuntariamente projeta uma imagem de despreparo, nervosismo ou até desinteresse.
        </p>
        <p className="mb-6">
            A solução técnica é elegantemente simples, mas sua execução é crucial: posicionar o texto <strong>o mais próximo possível da sua webcam</strong>. Isso minimiza o movimento dos olhos, tornando a leitura praticamente indetectável para quem assiste.
        </p>

        <div className="bg-slate-900 p-6 rounded border-l-4 border-blue-500 my-8">
            <h3 className="text-xl font-bold text-white mb-2">Você Sabia?</h3>
            <p className="text-slate-300">
                Estudos de comunicação indicam que mais de 55% do impacto de uma mensagem é transmitido através da linguagem corporal, incluindo o contato visual. Em videochamadas, onde o corpo está parcialmente visível, os olhos ganham um peso ainda maior na comunicação.
            </p>
        </div>
        <SEOContentHowTo
            title="Passo a Passo Definitivo para uma Apresentação Online Perfeita"
            schemaTitle="Como Usar Teleprompter no Zoom e Teams"
            totalTime="PT2M"
            tools={["Zoom ou Teams", "PromptNinja", "Webcam"]}
            steps={[
                {
                    title: "Passo 1: Posicionamento Estratégico",
                    text: "Abra o PromptNinja em seu navegador e redimensione a janela para que ela se torne uma faixa estreita. Arraste-a para o topo da tela, centralizada logo abaixo da sua webcam."
                },
                {
                    title: "Passo 2: Configuração Otimizada",
                    text: "Aumente o tamanho da fonte para uma leitura confortável à distância e diminua a largura das margens. Isso concentra o texto em uma área menor, alinhada verticalmente com a câmera."
                },
                {
                    title: "Passo 3: Controle Remoto Invisível",
                    text: "O PromptNinja elimina cliques de mouse com seu controle remoto via QR Code. Seu celular se transforma em um passador de slides silencioso e discreto."
                },
                {
                    title: "Passo 4: Modo Foco",
                    text: "Ative o Modo Foco nas configurações. Isso torna o fundo do teleprompter semi-transparente ou remove elementos desnecessários, criando uma visualização minimalista."
                }
            ]}
        />

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Compatibilidade Universal: Liberdade para se Apresentar</h2>
        <p className="mb-6">
            A beleza do PromptNinja está em sua simplicidade e universalidade. Por rodar diretamente no navegador, ele independe de qualquer plataforma de videoconferência. Não há necessidade de instalar plugins, extensões ou lidar com integrações complexas. Ele funciona como uma camada visual "acima" da sua reunião, visível apenas para você.
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <li className="bg-slate-900 p-3 rounded"><strong>Zoom:</strong> Ideal para webinars, aulas e grandes audiências.</li>
            <li className="bg-slate-900 p-3 rounded"><strong>Microsoft Teams:</strong> Perfeito para o ambiente corporativo e apresentações formais.</li>
            <li className="bg-slate-900 p-3 rounded"><strong>Google Meet:</strong> Ótimo para chamadas rápidas, entrevistas e reuniões de equipe.</li>
            <li className="bg-slate-900 p-3 rounded"><strong>Skype, Discord, Slack:</strong> Funciona perfeitamente em qualquer aplicativo que utilize sua câmera.</li>
        </ul>
        <p className="mb-8">
            <strong>Lembrete Crucial:</strong> Você <em>não</em> precisa compartilhar sua tela para que o teleprompter funcione. Ele é uma ferramenta para seus olhos. Se precisar mostrar uma apresentação, compartilhe apenas a janela específica (PowerPoint, Google Slides, PDF) e mantenha o PromptNinja flutuando discretamente no topo, visível apenas para você.
        </p>

        <div className="bg-slate-800 p-6 rounded-lg my-8 border-l-4 border-purple-500">
            <h2 className="text-2xl font-bold text-white mb-4">Dica Pro: Teleprompter Transparente no Zoom com OBS (Chroma Key)</h2>
            <p className="text-slate-300 mb-4">
                Quer um nível ainda maior de profissionalismo? Você pode fazer o texto flutuar "magicamente" na sua tela usando o OBS Studio.
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-slate-300">
                <li>Abra o PromptNinja e mude o tema para <strong>Chroma Green</strong> ou <strong>Chroma Blue</strong>.</li>
                <li>No OBS Studio, adicione o navegador (Browser Source) com o link do seu teleprompter.</li>
                <li>Aplique o filtro de efeito <strong>Chroma Key</strong> para remover o fundo colorido.</li>
                <li>Inicie a <strong>Câmera Virtual</strong> no OBS e selecione-a como sua câmera no Zoom/Teams.</li>
            </ol>
            <p className="text-slate-300 mt-4 text-sm">
                Isso permite que você veja seus slides e o público *através* do texto, como em um telejornal real.
            </p>
        </div>


        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Erros Comuns a Evitar para Não Parecer um Robô</h2>
        <ul className="list-disc pl-6 mb-8 space-y-3">
            <li><strong>Leitura Monótona:</strong> O teleprompter é um guia, não uma sentença. Use pausas, varie o tom de voz e adicione ênfase para soar natural. Respire!</li>
            <li><strong>Falta de Prática:</strong> Nunca leia um roteiro pela primeira vez ao vivo. Pratique antes para se familiarizar com o fluxo do texto e marcar pontos de ênfase.</li>
            <li><strong>Velocidade Inadequada:</strong> Uma rolagem muito rápida gera ansiedade; muito lenta, monotonia. Use o controle remoto para ajustar a velocidade em tempo real, acompanhando seu ritmo de fala.</li>
            <li><strong>Esquecer a Linguagem Corporal:</strong> Seus olhos estão na câmera, mas e o resto do seu corpo? Gesticule com as mãos, sorria e use expressões faciais para complementar sua mensagem.</li>
        </ul>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Dicas Avançadas de Etiqueta e Performance Digital</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-900 p-4 rounded-lg">
                <h3 className="text-xl font-bold text-purple-400 mb-2">Iluminação Profissional</h3>
                <p className="text-sm text-slate-400">Uma boa iluminação frontal (como uma ring light) elimina sombras e cria uma aparência profissional. O reflexo da tela branca do teleprompter pode ajudar, mas uma luz dedicada é transformadora.</p>
            </div>
            <div className="bg-slate-900 p-4 rounded-lg">
                <h3 className="text-xl font-bold text-blue-400 mb-2">Ângulo da Câmera</h3>
                <p className="text-sm text-slate-400">A câmera deve estar na altura dos olhos. Se usar um notebook, empilhe livros sob ele. Uma câmera baixa (filmando de baixo para cima) pode transmitir arrogância, enquanto uma muito alta pode passar submissão.</p>
            </div>
            <div className="bg-slate-900 p-4 rounded-lg">
                <h3 className="text-xl font-bold text-green-400 mb-2">Qualidade do Áudio</h3>
                <p className="text-sm text-slate-400">Um áudio ruim pode arruinar a melhor das apresentações. Use um microfone externo (de lapela ou USB) sempre que possível. Sua mensagem será ouvida com clareza e profissionalismo.</p>
            </div>
            <div className="bg-slate-900 p-4 rounded-lg">
                <h3 className="text-xl font-bold text-yellow-400 mb-2">Cenário (Background)</h3>
                <p className="text-sm text-slate-400">Escolha um fundo neutro e organizado. Evite janelas com muita luz ou ambientes bagunçados. Um fundo virtual de bom gosto também é uma opção válida se o seu ambiente real não for ideal.</p>
            </div>
        </div>

        <SEOContentFAQ
            title="Perguntas Frequentes (FAQ)"
            items={[
                {
                    question: "As pessoas realmente não vão saber que estou lendo?",
                    answer: "Se você seguir as dicas de posicionamento da janela, tamanho da fonte e, principalmente, praticar para falar com naturalidade, a leitura será imperceptível. O segredo é usar o texto como um guia, não como uma prisão."
                },
                {
                    question: "O teleprompter aparece na gravação da reunião?",
                    answer: "Não. O PromptNinja é uma janela do seu navegador, visível apenas para você. A gravação do Zoom, Teams ou Meet captura apenas o feed da sua câmera, então o teleprompter permanece seu segredo."
                },
                {
                    question: "Funciona com uma webcam externa?",
                    answer: "Sim, perfeitamente. Na verdade, é ainda melhor. Posicione a janela do PromptNinja logo acima ou abaixo da sua webcam externa para um alinhamento ocular ideal."
                }
            ]}
        />


        <div className="bg-slate-800 p-6 rounded-lg mt-8 mb-8">
            <h3 className="text-xl font-bold text-white mb-3">Veja Também: Domine o Vídeo Online</h3>
            <ul className="space-y-2">
                <li>
                    <a href={ROUTES_CONFIG.SEO_GRATIS.paths.pt} className="text-purple-400 hover:text-purple-300 underline flex items-center">
                        <span className="mr-2">📺</span>
                        Teleprompter Online Grátis (Funciona no Navegador)
                    </a>
                </li>
                <li>
                    <a href={ROUTES_CONFIG.SEO_DIY.paths.pt} className="text-purple-400 hover:text-purple-300 underline flex items-center">
                        <span className="mr-2">🛠️</span>
                        Como Montar um Teleprompter Caseiro (DIY)
                    </a>
                </li>
                <li>
                    <a href={ROUTES_CONFIG.SEO_WEBRTC.paths.pt} className="text-purple-400 hover:text-purple-300 underline flex items-center">
                        <span className="mr-2">⚡</span>
                        Entenda por que o PromptNinja não tem atraso (Zero Latency)
                    </a>
                </li>
            </ul>
        </div>

        <div className="text-center mt-12">
            <a
                href="/?lang=pt#app"
                className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 font-bold py-3 px-6 rounded-lg transition hover:brightness-110"
                style={{ color: 'white' }}
            >
                Eleve suas Apresentações Hoje. Teste o PromptNinja Gratuitamente!
            </a>
        </div>
    </>
);
