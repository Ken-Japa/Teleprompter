import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";

export const WebRtcLatencyContentPT = () => (
    <>
        <p className="lead text-xl text-slate-300 mb-8">
            Você aperta o botão de "pausa" no controle remoto. O texto continua rolando por mais meio segundo. Você se perde, gagueja e precisa regravar.
            Esse "atraso" (latência) é o pesadelo de qualquer apresentador. Neste artigo técnico, vamos explicar como a tecnologia WebRTC resolveu esse problema definitivamente.
        </p>

        <h2>O Problema da Latência em Dispositivos Bluetooth</h2>
        <p>
            A maioria dos teleprompters do mercado utiliza controles remotos Bluetooth baratos. Embora populares, eles sofrem de um problema estrutural: a pilha de protocolos.
            Quando você clica em um botão, o sinal precisa:
        </p>
        <ol>
            <li>Ser codificado pelo chip do controle.</li>
            <li>Viajar pelo ar (frequência 2.4GHz, superlotada).</li>
            <li>Ser decodificado pelo sistema operacional do computador/celular.</li>
            <li>Ser interpretado pelo driver.</li>
            <li>Finalmente chegar à aplicação.</li>
        </ol>
        <p>
            Em ambientes com muitas interferências (estúdios com microfones sem fio, roteadores Wi-Fi), essa latência pode chegar a <strong>200-500 milissegundos</strong>. Parece pouco, mas para o cérebro humano lendo em tempo real, é a diferença entre uma leitura fluida e uma pausa estranha.
        </p>

        <h2>Entra em Cena o WebRTC (Web Real-Time Communication)</h2>
        <p>
            O WebRTC é uma tecnologia de código aberto desenvolvida pelo Google (e adotada pela Apple, Microsoft e Mozilla) que permite a comunicação direta entre navegadores.
            É a mesma tecnologia usada no Google Meet e Zoom. Mas o PromptNinja a utiliza de uma forma diferente: <strong>Data Channels</strong>.
        </p>

        <h3>P2P: O Caminho Mais Curto</h3>
        <p>
            Diferente de aplicativos web tradicionais que funcionam no modelo Cliente-Servidor (onde seu comando vai até um servidor na Virgínia/EUA e volta para seu computador), o WebRTC cria uma conexão <strong>Peer-to-Peer (Ponto a Ponto)</strong>.
        </p>
        <p>
            Isso significa que seu celular (controle) e seu computador (tela) conversam diretamente através da sua rede Wi-Fi local. O sinal não sai da sua casa.
            Resultado? Latência de <strong>5 a 20 milissegundos</strong>. É virtualmente instantâneo.
        </p>

        <h2>A Arquitetura Técnica do PromptNinja</h2>
        <p>
            Para os desenvolvedores e curiosos, aqui está como implementamos essa mágica:
        </p>
        <ul>
            <li><strong>Signaling (Sinalização):</strong> Usamos um servidor leve apenas para o "aperto de mão" inicial (Handshake). Os dispositivos trocam metadados (SDP offers/answers) para se encontrarem.</li>
            <li><strong>STUN Servers:</strong> Usamos servidores STUN para descobrir o endereço IP público/privado dos dispositivos, furando a barreira do NAT (Network Address Translation).</li>
            <li><strong>Data Channels (UDP):</strong> Ao contrário do TCP (usado na web normal), usamos protocolo UDP para os comandos de controle. O UDP não perde tempo verificando se cada pacote chegou perfeitamente em ordem; ele prioriza a velocidade. Para um botão de "Play/Pause", isso é crucial.</li>
        </ul>

        <div className="bg-slate-900 p-6 rounded-lg border border-slate-700 my-8">
            <h3 className="text-xl font-bold text-white mb-4">Por que isso importa para você?</h3>
            <p className="mb-0 text-slate-300">
                Você não precisa entender de pacotes UDP ou servidores STUN. O que você sente na prática é <strong>controle absoluto</strong>.
                Quando você quer que o texto pare, ele para. Instantaneamente. Isso te dá confiança para falar mais rápido, fazer pausas dramáticas e ser mais natural.
            </p>
        </div>

        <h2>Comparativo de Latência</h2>
        <div className="overflow-x-auto mb-8">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-slate-600">
                        <th className="py-2 text-primary">Tecnologia</th>
                        <th className="py-2 text-primary">Latência Média</th>
                        <th className="py-2 text-primary">Estabilidade</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b border-slate-800">
                        <td className="py-2 text-white font-bold">PromptNinja (WebRTC P2P)</td>
                        <td className="py-2 text-green-400 font-bold">&lt; 20ms</td>
                        <td className="py-2">Extrema (Rede Local)</td>
                    </tr>
                    <tr className="border-b border-slate-800">
                        <td className="py-2">Bluetooth Padrão</td>
                        <td className="py-2">150ms - 300ms</td>
                        <td className="py-2">Média (Interferência)</td>
                    </tr>
                    <tr className="border-b border-slate-800">
                        <td className="py-2">Web Sockets (Servidor Cloud)</td>
                        <td className="py-2">200ms - 1000ms+</td>
                        <td className="py-2">Baixa (Depende da Internet)</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <h2>Conclusão</h2>
        <p>
            A latência não é apenas um detalhe técnico; é uma barreira para a performance artística. Ao eliminar o atraso entre o pensamento ("quero pausar") e a ação (o texto parar), o WebRTC permite que o apresentador se concentre apenas na mensagem.
        </p>
        <p>
            O PromptNinja é um dos poucos teleprompters do mundo a utilizar essa arquitetura avançada de forma gratuita e acessível direto no navegador.
        </p>

        <SEOContentFAQ
            title="Perguntas Técnicas sobre Latência"
            items={[
                {
                    question: "O que causa o atraso (latência) no teleprompter?",
                    answer: "Geralmente é a comunicação lenta entre o controle e a tela. Em Bluetooth e WebSockets (internet), o sinal dá uma volta longa. No nosso sistema P2P, ele vai direto."
                },
                {
                    question: "É seguro? Meus dados passam pelo servidor?",
                    answer: "Sim, é extremamente seguro. Como a conexão é P2P (Ponto a Ponto), o texto do seu roteiro e os comandos viajam apenas dentro da sua rede local. Nada é armazenado em nossos servidores."
                },
                {
                    question: "Funciona se o Wi-Fi cair?",
                    answer: "Desde que o roteador esteja ligado (mantendo a rede local ativa), sim. A internet externa não é necessária após o carregamento inicial da página."
                }
            ]}
        />
    </>
);
