import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { SEOContentHowTo } from "../../../../components/seo/SEOContentHowTo";
import { SEORelatedLinks } from "../../../../components/seo/SEORelatedLinks";

export const ChecklistGravacaoPT = () => (
    <>
        <p className="lead text-xl text-slate-300 mb-8 font-medium">
            Grave vídeos como um profissional desde a primeira tentativa. Siga nosso checklist definitivo para garantir que seu setup de teleprompter, iluminação e áudio estejam impecáveis.
        </p>

        <p className="text-slate-300 mb-8">
            Muitos criadores focam apenas no roteiro e esquecem que a preparação técnica é o que separa um vídeo amador de uma produção de autoridade. Um teleprompter mal configurado pode resultar em olhos "escaneando" o texto ou uma leitura mecânica. Este guia resolve isso.
        </p>

        <SEOContentHowTo
            title="Checklist Pré-Gravação: Passos Essenciais"
            schemaTitle="Como se Preparar para Gravar com Teleprompter"
            totalTime="PT20M"
            tools={["PromptNinja", "Câmera", "Iluminação", "Microfone"]}
            steps={[
                {
                    title: "1. O Roteiro Ninja",
                    text: "No PromptNinja, quebre seu texto em parágrafos curtos. Use LETRAS MAIÚSCULAS apenas para ênfase emocional. Deixe espaços em branco para respiração."
                },
                {
                    title: "2. Posicionamento da Câmera",
                    text: "Sua lente deve estar alinhada com seus olhos. Se usar espelho divisor, garanta que não haja luz entrando por trás do tecido (hood)."
                },
                {
                    title: "3. Iluminação de 3 Pontos",
                    text: "Luz principal (Key), Luz de preenchimento (Fill) e Luz de fundo (Back). Evite sombras fortes no rosto que distraiam o espectador."
                },
                {
                    title: "4. Teste de Áudio",
                    text: "Grave 30 segundos e ouça com fones. Verifique se o som do ar condicionado ou ruído externo está sendo captado."
                },
                {
                    title: "5. Ajuste de Velocidade",
                    text: "Faça um teste de leitura no PromptNinja. A velocidade deve ser um pouco mais rápida do que sua fala confortável para manter a energia alta."
                }
            ]}
        />

        <div className="bg-yellow-600/10 border border-yellow-500/20 rounded-2xl p-8 my-12 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-4">Dica de Ouro: A Regra dos 2 Metros</h3>
            <p className="text-slate-300 mb-4">
                Quanto mais longe você estiver da tela do teleprompter, menos o movimento dos seus olhos será percebido pela câmera.
            </p>
            <p className="text-sm text-slate-400 italic">
                Aumente o tamanho da fonte no PromptNinja para conseguir ler a uma distância de 2 a 3 metros com clareza.
            </p>
        </div>

        <SEOContentFAQ
            title="Perguntas Frequentes sobre Gravação"
            items={[
                {
                    question: "Devo olhar fixamente para o teleprompter?",
                    answer: "Não. Tente gesticular e mover levemente a cabeça. Imagine que o teleprompter é um amigo atrás da câmera te lembrando do que falar. Mantenha o contato visual com a lente, não com as letras individuais."
                },
                {
                    question: "O que fazer se eu errar uma frase?",
                    answer: "Não pare a gravação. Respire, faça uma pausa silenciosa de 2 segundos (para facilitar o corte na edição) e recomece a frase. O PromptNinja tem atalhos rápidos para voltar o texto se necessário."
                },
                {
                    question: "Qual a melhor cor de fundo para o teleprompter?",
                    answer: "Para a maioria dos setups, fundo PRETO com letras BRANCAS ou AMARELAS. Isso evita que o brilho da tela reflita nos seus olhos ou óculos."
                }
            ]}
        />

        <SEORelatedLinks
            title="Continue Evoluindo"
            links={[
                { label: "Dicas de Oratória para Vídeo", href: "/dicas-oratoria-video" },
                { label: "Como Decorar Texto Rápido", href: "/como-decorar-texto-rapido" },
                { label: "Velocidade de Leitura Ideal", href: "/velocidade-leitura-teleprompter" },
                { label: "Guia de Escrita para YouTube", href: "/scripts-para-youtube" }
            ]}
        />
    </>
);
