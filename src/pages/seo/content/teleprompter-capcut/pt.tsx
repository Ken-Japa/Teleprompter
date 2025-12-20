import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { SEOContentHowTo } from "../../../../components/seo/SEOContentHowTo";

export const TeleprompterCapCutPT = () => (
    <>
        <h1 className="text-4xl font-bold text-white mb-6">Como Usar Teleprompter para CapCut: Tutorial de Vídeo Profissional</h1>

        <p className="lead text-xl text-slate-300 mb-8">
            CapCut é a ferramenta de edição favorita dos criadores, mas sua função de teleprompter embutida pode ser limitada. O PromptNinja é o companheiro perfeito para o CapCut: grave seu vídeo com nosso teleprompter profissional e edite no CapCut para adicionar legendas, efeitos e músicas virais.
        </p>

        <div className="bg-slate-800 p-6 rounded-lg my-8 border-l-4 border-cyan-500">
            <h2 className="text-2xl font-bold text-white mb-2">Por que Não Usar o Teleprompter Embutido do CapCut?</h2>
            <p className="text-slate-300">
                Embora útil, o prompter do CapCut carece de recursos profissionais.
                <br /><br />
                Com o PromptNinja, você ganha <strong>Controle Remoto P2P</strong> (use outro celular para controlar a velocidade enquanto grava), <strong>Controle por Voz</strong> (o texto anda conforme você fala) e formatação de texto avançada (cores para dar ênfase). Grave o vídeo "cru" com perfeição no PromptNinja e leve para o CapCut apenas para o polimento final.
            </p>
        </div>


        <SEOContentHowTo
            title="Workflow Vencedor: PromptNinja + CapCut"
            schemaTitle="Como Usar Teleprompter com CapCut"
            totalTime="PT10M"
            tools={["CapCut", "PromptNinja", "Smartphone"]}
            steps={[
                {
                    title: "Passo 1: Preparação",
                    text: "Escreva seu roteiro no PromptNinja. Use cores para marcar onde você fará cortes ou aplicará efeitos visuais no CapCut."
                },
                {
                    title: "Passo 2: Gravação",
                    text: "Abra o PromptNinja no celular, posicione-o na vertical e grave. Use um segundo dispositivo para controlar a rolagem remotamente."
                },
                {
                    title: "Passo 3: Edição no CapCut",
                    text: "Importe o vídeo gravado. Como você não errou o texto (graças ao teleprompter), sua linha do tempo estará limpa."
                },
                {
                    title: "Passo 4: Legendas Dinâmicas",
                    text: "Use a função \"Legendas Automáticas\" do CapCut. Como sua dicção foi guiada pelo roteiro, as legendas serão geradas com muito mais precisão."
                }
            ]}
        />

        <div className="text-center mt-12">
            <a
                href="https://promptninja.solutionkit.com.br"
                className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 font-bold py-3 px-6 rounded-lg transition hover:brightness-110"
                style={{ color: 'white' }}
            >
                Experimente o Combo PromptNinja + CapCut
            </a>
        </div>

        <SEOContentFAQ
            title="Dúvidas: CapCut e PromptNinja"
            items={[
                {
                    question: "O PromptNinja exporta direto para o CapCut?",
                    answer: "Não diretamente. Você grava o vídeo no PromptNinja, ele salva na galeria do seu celular, e aí você abre o CapCut e importa o vídeo da galeria. Simples assim."
                },
                {
                    question: "Posso usar os efeitos do CapCut?",
                    answer: "Sim! A ideia é gravar o vídeo 'limpo' (sem texto na tela) usando o PromptNinja para leitura, e depois adicionar toda a mágica (efeitos, legendas, música) no CapCut."
                },
                {
                    question: "A qualidade do vídeo é boa?",
                    answer: "Sim. O PromptNinja usa a câmera nativa do seu dispositivo na resolução máxima permitida pelo navegador (geralmente Full HD ou 4K, dependendo do celular)."
                }
            ]}
        />
    </>
);
