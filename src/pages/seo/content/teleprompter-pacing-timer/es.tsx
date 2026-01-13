import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";

export const TeleprompterPacingTimerES = () => (
    <>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Ritmo y Temporizador para Teleprompter: Controla el Ritmo de tu Habla
        </h2>

        <p className="lead text-xl text-slate-300 mb-8 font-medium">
            Hablar demasiado rápido debido a los nervios o demasiado lento hasta aburrir a tu audiencia son errores comunes que pueden arruinar tu vídeo. <strong>Domina el ritmo de tus grabaciones con precisión quirúrgica.</strong>
        </p>

        <p className="text-slate-300 mb-8 leading-relaxed">
            En esta guía, aprenderás a usar el cronómetro y temporizador integrados de <strong>PromptNinja</strong> para asegurar que tu contenido se ajuste perfectamente al tiempo planeado. Descubre cómo ajustar las Palabras Por Minuto (WPM), usar comandos de pausa estratégicos y recibir retroalimentación de tiempo en tiempo real. ¡Ya sea para un pitch de 60 segundos o una clase de una hora, nuestra herramienta gratuita asegura que mantengas la fluidez y la autoridad, sin que nunca te corten o te falte el aire!
        </p>

        <div className="bg-slate-800 p-8 rounded-xl border-l-4 border-orange-500 mb-12">
            <h3 className="text-2xl font-bold text-white mb-4">La Trampa de la Adrenalina</h3>
            <p className="text-slate-300 mb-4">
                Cuando estamos nerviosos, nuestra percepción del tiempo se distorsiona. Creemos que hablamos por 2 minutos, pero fueron 5. O nos apresuramos y terminamos en 30 segundos.
            </p>
            <p className="text-slate-300">
                El teleprompter es tu metrónomo visual. Si el texto termina en 3 minutos a velocidad X, <strong>siempre</strong> terminará en 3 minutos, sin importar qué tan rápido lata tu corazón.
            </p>
        </div>

        <h3 className="text-3xl font-bold text-white mt-12 mb-6">Técnicas de Ritmo (Pacing)</h3>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-slate-900/50 p-6 rounded border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-2">⏱️ El Método TED</h3>
                <p className="text-slate-300 text-sm">
                    Las Charlas TED son estrictamente de 18 minutos. Los oradores entrenan con teleprompter para internalizar este ritmo. Usa el temporizador HUD integrado de PromptNinja para monitorear el tiempo real vs el tiempo estimado.
                </p>
            </div>
            <div className="bg-slate-900/50 p-6 rounded border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-2">🐢 Pausas Dramáticas</h3>
                <p className="text-slate-300 text-sm">
                    Escribe <code>[PAUSA LARGA]</code> o salta 5 líneas en tu guion. Esto te obliga a respirar y mirar a la audiencia, creando impacto. El silencio es tan importante como el habla.
                </p>
            </div>
        </div>

        <SEOContentFAQ
            title="FAQ de Tiempo"
            items={[
                {
                    question: "¿Cuántas palabras por minuto (WPM)?",
                    answer: "El promedio conversacional es 130-150 WPM. Para videos educativos, apunta a 140 WPM. Para anuncios enérgicos (ventas), sube a 160 WPM. PromptNinja calcula tu WPM estimado automáticamente."
                },
                {
                    question: "¿El temporizador se detiene si pauso?",
                    answer: "Sí. El temporizador de PromptNinja está vinculado al movimiento del texto. Si pausas el texto para responder una pregunta de la audiencia, el tiempo estimado se detiene."
                }
            ]}
        />
    </>
);
