import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";

export const TeleprompterGoogleMeetTeamsPT = () => (
    <>
        <h1 className="text-4xl font-bold text-white mb-6">Teleprompter para Google Meet e Microsoft Teams: Reuniões Executivas</h1>

        <p className="lead text-xl text-slate-300 mb-8">
            Em reuniões de board, vendas B2B ou apresentações de RH, a precisão da fala é fundamental. O PromptNinja transforma seu Google Meet ou Microsoft Teams em um palco profissional, permitindo que você leia seus pontos-chave mantendo contato visual constante com os stakeholders.
        </p>

        <div className="bg-slate-800 p-6 rounded-lg my-8 border-l-4 border-indigo-500">
            <h2 className="text-2xl font-bold text-white mb-2">A Tecnologia Invisível para Corporações</h2>
            <p className="text-slate-300">
                O PromptNinja roda 100% no navegador, <strong>sem necessidade de instalações (admin rights)</strong> no computador da empresa.
                <br /><br />
                Segurança é prioridade: todos os roteiros ficam salvos localmente no seu dispositivo. Nada é enviado para a nuvem, garantindo total conformidade com políticas de dados sensíveis.
            </p>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Como Fazer Apresentações Executivas Impecáveis</h2>
        <div className="bg-slate-800 p-6 rounded-lg my-6">
            <ol className="list-decimal pl-6 space-y-6 text-slate-300">
                <li>
                    <strong>Overlay Transparente (Dica):</strong> Redimensione a janela do browser do PromptNinja para ficar bem estreita e posicione-a no topo da tela, centralizada logo abaixo da webcam.
                </li>
                <li>
                    <strong>Google Meet/Teams:</strong> Abra o aplicativo de reunião em tela cheia (ou quase). O PromptNinja ficará "flutuando" acima se você usar um utilitário de "Always on Top" ou simplesmente posicionar as janelas lado a lado estrategicamente.
                </li>
                <li>
                    <strong>Controle Discreto:</strong> Conecte seu celular corporativo como controle remoto. Mantenha as mãos sobre a mesa e controle a rolagem com toques sutis, sem cliques de mouse perceptíveis no áudio.
                </li>
            </ol>
        </div>

        <div className="text-center mt-12">
            <a
                href="https://promptninja.solutionkit.com.br"
                className="inline-block bg-gradient-to-r from-indigo-600 to-blue-800 font-bold py-3 px-6 rounded-lg transition hover:brightness-110"
                style={{ color: 'white' }}
            >
                Domine Suas Reuniões Online Agora
            </a>
        </div>

        <SEOContentFAQ
            title="Perguntas Frequentes sobre Reuniões Online"
            items={[
                {
                    question: "O teleprompter aparece para os outros participantes?",
                    answer: "Não. O PromptNinja é uma janela independente no seu navegador. Se você compartilhar apenas uma guia do Chrome (com sua apresentação) ou apenas falar para a câmera, ninguém verá o texto rolando."
                },
                {
                    question: "Funciona se eu tiver apenas um monitor?",
                    answer: "Sim. Recomendamos usar o modo 'Janela' e deixá-la estreita, posicionada logo abaixo da webcam, sobrepondo parcialmente o Teams/Meet. Ajuste a transparência se necessário."
                },
                {
                    question: "É seguro para informações confidenciais?",
                    answer: "Totalmente. O PromptNinja opera localmente no seu navegador. O texto que você cola nele não é enviado para servidores na nuvem, garantindo a privacidade dos dados da sua empresa."
                }
            ]}
        />
    </>
);
