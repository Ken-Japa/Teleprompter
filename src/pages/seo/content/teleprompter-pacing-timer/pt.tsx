import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";

export const TeleprompterPacingTimerPT = () => (
    <>
        <h1 className="text-4xl font-bold text-white mb-6 leading-tight">
            Domine o Tempo: Como Não Ser Cortado no Seu Pitch ou Palestra
        </h1>

        <p className="mb-6 text-xl text-slate-300">
            "Seu tempo acabou." Nada é mais constrangedor do que ser interrompido no meio da conclusão de uma palestra ou Pitch de Vendas porque você falou demais.
        </p>

        <div className="bg-slate-800 p-8 rounded-xl border-l-4 border-orange-500 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">A Armadilha da Adrenalina</h2>
            <p className="text-slate-300 mb-4">
                Quando estamos nervosos, nossa percepção de tempo distorce. Achamos que falamos por 2 minutos, mas foram 5. Ou então corremos demais e acabamos em 30 segundos.
            </p>
            <p className="text-slate-300">
                O Teleprompter é seu metrônomo visual. Se o texto acaba em 3 minutos na velocidade X, ele <strong>sempre</strong> acabará em 3 minutos, não importa o quanto seu coração esteja acelerado.
            </p>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Técnicas de Pacing (Ritmo)</h2>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-slate-900/50 p-6 rounded border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-2">⏱️ O Método TED Talk</h3>
                <p className="text-slate-300 text-sm">
                    Palestras TED têm 18 minutos rígidos. Palestrantes treinam com teleprompter para internalizar esse ritmo. Use o cronômetro embutido na HUD do PromptNinja para monitorar seu tempo real vs tempo estimado.
                </p>
            </div>
            <div className="bg-slate-900/50 p-6 rounded border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-2">🐢 Pausas Dramáticas</h3>
                <p className="text-slate-300 text-sm">
                    Escreva <code>[PAUSA LONGA]</code> ou pule 5 linhas no seu roteiro. Isso te obriga a respirar e olhar para a plateia, criando impacto. O silêncio é tão importante quanto a fala.
                </p>
            </div>
        </div>

        <SEOContentFAQ
            title="Dúvidas sobre Tempo"
            items={[
                {
                    question: "Quantas palavras por minuto (WPM)?",
                    answer: "A média de fala conversacional é 130-150 palavras por minuto. Para vídeos educativos, tente 140 WPM. Para anúncios energéticos (vendas), suba para 160 WPM. O PromptNinja calcula seu WPM estimado automaticamente."
                },
                {
                    question: "O cronômetro para se eu pausar?",
                    answer: "Sim. O contador de tempo do PromptNinja é vinculado ao movimento do texto. Se você pausar o texto para responder uma pergunta da plateia, o tempo estimado para."
                }
            ]}
        />
    </>
);
