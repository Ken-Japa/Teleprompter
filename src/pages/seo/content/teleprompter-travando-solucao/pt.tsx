import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { SEOContentHowTo } from "../../../../components/seo/SEOContentHowTo";

export const TeleprompterTravandoSolucaoPT = () => (
    <>
        <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
            Teleprompter Travando? Por Que Isso Acontece e Como Resolver
        </h2>

        <p className="mb-6 text-xl text-slate-300">
            Você está gravando, focado, no "flow". De repente, o texto dá um pulo (engasga). Você perde a concentração. Sua dicção falha. Gravação arruinada.
        </p>
        <p className="mb-8 text-slate-300">
            Se o seu teleprompter online está travando ("lagging") ou pulando frames, o problema geralmente não é seu computador. <strong>É o código malfeito do site.</strong>
        </p>

        <div className="bg-slate-800 p-8 rounded-xl border-l-4 border-red-500 mb-12">
            <h3 className="text-2xl font-bold text-white mb-4">A Culpa é do DOM (Document Object Model)</h3>
            <p className="text-slate-300 mb-4">
                A maioria dos teleprompters online gratuitos são feitos por amadores. Eles tentam mover o texto mexendo na "posição da página" (CSS Top/Margin).
            </p>
            <p className="text-slate-300">
                Isso força o navegador a <strong>redesenhar (Repaint)</strong> a tela inteira a cada milímetro de movimento. Em textos longos, isso consome 100% da sua CPU, causando aquecimento e travamentos.
            </p>
        </div>

        <h3 className="text-3xl font-bold text-white mt-12 mb-6">A Solução PromptNinja: Aceleração por GPU</h3>
        <p className="mb-6 text-slate-300">
            Nós fomos engenheiros de software antes de criarmos este app. O PromptNinja usa uma técnica diferente chamada <code>requestAnimationFrame</code> combinada com <code>Hardware Acceleration</code>.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-slate-900/50 p-6 rounded border border-slate-700">
                <h3 className="font-bold text-red-400 mb-2">🐢 Outros Sites</h3>
                <p className="text-sm text-slate-400">
                    Processamento feito pela <strong>CPU</strong> (Processador).
                    <br />Resultado: Computador esquenta, ventoinha faz barulho, texto engasga se você abrir outra aba.
                </p>
            </div>
            <div className="bg-slate-900/50 p-6 rounded border border-green-500/50">
                <h3 className="font-bold text-green-400 mb-2">🚀 PromptNinja</h3>
                <p className="text-sm text-slate-400">
                    Processamento feito pela <strong>GPU</strong> (Placa de Vídeo).
                    <br />Resultado: Movimento manteiga (60 FPS constantes), mesmo em computadores antigos ou celulares baratos.
                </p>
            </div>
        </div>

        <h3 className="text-3xl font-bold text-white mt-12 mb-6">Checklist para Eliminar Travamentos Hoje</h3>

        <SEOContentHowTo
            title=""
            schemaTitle="Como Otimizar Teleprompter para não Travar"
            totalTime="PT2M"
            tools={["Navegador", "PromptNinja"]}
            steps={[
                {
                    title: "1. Use PromptNinja",
                    text: "Parece óbvio, mas nosso motor de renderização é o único otimizado para não 'vazar memória' em textos longos."
                },
                {
                    title: "2. Feche Abas Pesadas",
                    text: "Sites como Facebook, LinkedIn e Dashboards de Analytics consomem muita RAM. Feche-os durante a gravação."
                },
                {
                    title: "3. 'Modo Jogo' no Windows",
                    text: "Se estiver no Windows, ative o 'Modo de Jogo'. Isso prioriza a janela ativa (o teleprompter) e silencia processos de fundo."
                },
                {
                    title: "4. Desative Extensões",
                    text: "AdBlockers mal configurados às vezes tentam ler o texto do teleprompter, causando lentidão. Use uma aba anônima (Incognito) para testar."
                }
            ]}
        />

        <SEOContentFAQ
            title="Dúvidas sobre Performance"
            items={[
                {
                    question: "Funciona em PC antigo?",
                    answer: "Sim. Como usamos a GPU, tiramos a carga do processador. Testamos com sucesso em laptops de 2012 e celulares de entrada."
                },
                {
                    question: "Por que o texto fica embaçado quando rola?",
                    answer: "Isso se chama 'Ghosting' e depende do tempo de resposta do seu monitor (ms). Monitores gamers (144hz) eliminam isso. Em monitores comuns, tente aumentar o tamanho da fonte e diminuir a velocidade para reduzir o efeito visual."
                },
                {
                    question: "Interfere no OBS Studio?",
                    answer: "Não. O PromptNinja roda tão leve que sobra recurso de sobra para o OBS gravar ou transmitir em 1080p/4K simultaneamente."
                }
            ]}
        />
    </>
);
