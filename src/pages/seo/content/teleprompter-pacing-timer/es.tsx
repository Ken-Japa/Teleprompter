import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";

export const TeleprompterPacingTimerES = () => (
    <>
        <h1 className="text-4xl font-bold text-white mb-6 leading-tight">
            Domina el Tiempo: Cómo No Ser Cortado en tu Pitch o Charla
        </h1>

        <p className="mb-6 text-xl text-slate-300">
            "Su tiempo acabó." Nada es más vergonzoso que ser interrumpido a media conclusión en una Charla o Pitch de Ventas porque hablaste de más.
        </p>

        <div className="bg-slate-800 p-8 rounded-xl border-l-4 border-orange-500 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">Trampa de Adrenalina</h2>
            <p className="text-slate-300 mb-4">
                Cuando nerviosos, nuestra percepción de tiempo se distorsiona. Creemos que hablamos por 2 minutos, pero fueron 5. O corremos y acabamos en 30 segundos.
            </p>
            <p className="text-slate-300">
                El Teleprompter es tu metrónomo visual. Si texto acaba en 3 minutos a velocidad X, <strong>siempre</strong> acabará en 3 minutos, sin importar cuánto tu corazón lata.
            </p>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Técnicas de Pacing (Ritmo)</h2>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-slate-900/50 p-6 rounded border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-2">⏱️ Método TED Talk</h3>
                <p className="text-slate-300 text-sm">
                    Charlas TED tienen 18 minutos rígidos. Oradores entrenan con teleprompter para internalizar ese ritmo. Usa cronómetro integrado en HUD de PromptNinja para monitorizar tiempo real vs estimado.
                </p>
            </div>
            <div className="bg-slate-900/50 p-6 rounded border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-2">🐢 Pausas Dramáticas</h3>
                <p className="text-slate-300 text-sm">
                    Escribe <code>[PAUSA LARGA]</code> o salta 5 líneas en tu guion. Esto te obliga a respirar y mirar audiencia, creando impacto. El silencio es tan importante como el habla.
                </p>
            </div>
        </div>

        <SEOContentFAQ
            title="FAQ de Tiempo"
            items={[
                {
                    question: "¿Cuántas palabras por minuto (PPM)?",
                    answer: "Promedio de habla conversacional es 130-150 PPM. Para videos educativos, busca 140 PPM. Para anuncios energéticos (ventas), sube a 160 PPM. PromptNinja calcula tu PPM estimado automáticamente."
                },
                {
                    question: "¿Cronómetro para si pauso?",
                    answer: "Sí. El contador de tiempo de PromptNinja está vinculado al movimiento del texto. Si pausas texto para responder pregunta de audiencia, tiempo estimado para."
                }
            ]}
        />
    </>
);
