
import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { SEOContentHowTo } from "../../../../components/seo/SEOContentHowTo";

export const PrivacidadeSegurancaPT = () => (
    <>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Privacidade e Segurança: Seus Roteiros Protegidos e 100% Locais
        </h2>

        <p className="lead text-xl text-slate-300 mb-8 font-medium">
            Sua privacidade é nossa prioridade absoluta. No PromptNinja, adotamos uma arquitetura de <strong>Dados Zero</strong>, garantindo que seus roteiros e gravações nunca saiam do seu dispositivo.
        </p>

        <p className="text-slate-300 mb-8">
            Neste compromisso com a sua segurança digital, detalhamos por que o PromptNinja é a escolha mais confiável para jornalistas, executivos e criadores de conteúdo que valorizam a discrição. Entenda como nossa tecnologia WebRTC Peer-to-Peer permite o controle remoto sem a necessidade de intermediários ou armazenamento em nuvem. Descubra como processamos cada comando e cada palavra localmente em seu navegador, eliminando qualquer risco de vazamento de informações ou espionagem industrial. Com o PromptNinja, você tem o poder de um teleprompter profissional com a tranquilidade de saber que seus dados pertencem exclusivamente a você.
        </p>

        <p className="mb-6 text-xl text-slate-300">
            No PromptNinja, adotamos uma arquitetura radical de <strong>Dados Zero</strong>.
        </p>

        <p className="mb-8">
            Nós não sabemos quem você é. Não temos seus e-mails. Não temos seus roteiros. Tudo o que você escreve fica gravado magneticamente no chip de memória do <strong>seu próprio dispositivo</strong>, e em nenhum outro lugar.
        </p>

        <div className="grid md:grid-cols-2 gap-8 my-12">

            <div className="bg-slate-800 p-8 rounded-xl border border-green-500/30 shadow-lg">
                <h3 className="text-2xl font-bold text-green-400 mb-4 flex items-center gap-3">
                    <span className="text-3xl">🛡️</span> Arquitetura "Local-First"
                </h3>
                <p className="text-slate-300 mb-4">
                    Usamos uma tecnologia chamada <code>LocalStorage</code> e <code>IndexedDB</code>. É como um cofre dentro do seu navegador.
                </p>
                <div className="space-y-4">
                    <div className="flex items-start gap-3">
                        <span className="text-green-500 text-xl">✅</span>
                        <p className="text-sm text-slate-300"><strong>Seus Textos:</strong> Salvos apenas no seu HD/Celular.</p>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="text-green-500 text-xl">✅</span>
                        <p className="text-sm text-slate-300"><strong>Seu Microfone:</strong> O áudio é processado em tempo real na memória RAM e descartado. Nada é gravado.</p>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="text-green-500 text-xl">✅</span>
                        <p className="text-sm text-slate-300"><strong>Vazamentos:</strong> Impossível vazarmos seus dados, pois não os temos.</p>
                    </div>
                </div>
            </div>

            <div className="bg-slate-800 p-8 rounded-xl border border-blue-500/30">
                <h3 className="text-2xl font-bold text-blue-400 mb-4 flex items-center gap-3">
                    <span className="text-3xl">📡</span> Conexão P2P Blindada
                </h3>
                <p className="text-slate-300 mb-4">
                    "Mas como o celular controla o PC se não passa pelo servidor?"
                </p>
                <p className="text-sm text-slate-400 mb-4">
                    Usamos <strong>WebRTC</strong>. Nosso servidor atua apenas como uma "lista telefônica": ele apresenta o IP do seu celular ao seu PC. Depois desse "aperto de mão" inicial (que dura milissegundos), o servidor sai da conversa.
                </p>
                <div className="bg-black/30 p-4 rounded border border-slate-700">
                    <p className="text-xs text-slate-400 font-mono">
                        [Celular] &lt;========== Túnel Criptografado (DTLS) ==========&gt; [PC]
                    </p>
                    <p className="text-xs text-green-500 mt-2 font-mono">Status: Link Direto (Sem Intermediários)</p>
                </div>
            </div>
        </div>

        <h3 className="text-3xl font-bold text-white mt-12 mb-6">Auditoria: Como verificar?</h3>
        <p className="text-slate-300 mb-6">
            Não confie em nós. Confie na tecnologia. Faça o teste do "Modo Avião":
        </p>

        <SEOContentHowTo
            title=""
            schemaTitle="Como Verificar a Privacidade do PromptNinja"
            totalTime="PT1M"
            tools={["Navegador", "PromptNinja"]}
            steps={[
                {
                    title: "1. Carregue o App",
                    text: "Abra o PromptNinja e escreva um segredo no editor."
                },
                {
                    title: "2. Corte a Internet",
                    text: "Tire o cabo de rede ou desligue o Wi-Fi."
                },
                {
                    title: "3. Teste",
                    text: "Continue usando. O app funciona 100%? Sim. Se estivéssemos enviando seus dados para a nuvem da NSA, o app travaria ou daria erro de conexão."
                },
                {
                    title: "4. Limpeza Total",
                    text: "Quer apagar tudo? Basta limpar o cache do navegador ou clicar no ícone de 'Lixeira' no app. Os dados são triturados digitalmente do seu dispositivo."
                }
            ]}
        />

        <div className="mt-12 p-6 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <h3 className="text-lg font-bold text-yellow-500 mb-2">Compromisso com Jornalistas e Empresas</h3>
            <p className="text-slate-300">
                Sabemos que muitos usuários do PromptNinja são repórteres cobrindo matérias sensíveis ou CEOs gravando comunicados internos. Nossa garantia de "No-Login" é sua maior proteção legal e técnica contra espionagem industrial ou vazamento de furos jornalísticos.
            </p>
        </div>


        <SEOContentFAQ
            title="Dúvidas de Privacidade"
            items={[
                {
                    question: "O PromptNinja usa Cookies?",
                    answer: "Apenas cookies técnicos essenciais para salvar suas preferências (tamanho da fonte, velocidade) localmente. Não usamos cookies de rastreamento publicitário intrusivo de terceiros."
                },
                {
                    question: "Se meu computador quebrar, perco meus roteiros?",
                    answer: "Sim. Como não temos cópia na nuvem, você é o único dono dos dados. Recomendamos que você sempre tenha seu roteiro original salvo no Word/Docs como backup."
                },
                {
                    question: "O reconhecimento de voz é enviado para o Google?",
                    answer: "Depende do navegador. No Chrome, o processamento de voz pode passar pelos servidores do Google para maior precisão (política do próprio navegador). Se privacidade absoluta for vital, recomendamos usar apenas o modo de rolagem manual ou automático, sem ativar o microfone."
                }
            ]}
        />
    </>
);
