import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";

export const TeleprompterOQueEES = () => (
    <>
        <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
            ¿Qué es Teleprompter? Historia del "Acordeón" Profesional
        </h2>

        <p className="mb-6 text-xl text-slate-300">
            Ves al Presidente mirando directo a cámara, hablando elocuentemente por 30 minutos sin mirar ningún papel. ¿Genio? No. Tecnología.
        </p>

        <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 mb-12">
            <h3 className="text-2xl font-bold text-white mb-4">Cómo Funciona la Magia (El Espejo)</h3>
            <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1">
                    <p className="text-slate-300 mb-4">
                        Magia está en vidrio especial llamado <strong>"Beam Splitter" (Divisor de Haz)</strong>.
                    </p>
                    <ul className="list-disc pl-6 text-slate-300 space-y-2">
                        <li>Un lado (público/cámara) es transparente 🪟.</li>
                        <li>Otro lado (presentador) es un espejo 🪞.</li>
                    </ul>
                    <p className="text-slate-300 mt-4">
                        Esto permite que pantalla en suelo refleje texto en vidrio. Presentador lee reflejo, pero cámara filma a través de vidrio transparente sin ver texto.
                        Resultado: Presentador mira <strong>directo a ojos del lente</strong> mientras lee.
                    </p>
                </div>
                <div className="bg-black p-4 rounded-lg border border-slate-600 font-mono text-xs text-green-400 w-full md:w-1/3">
                    <div className="text-center mb-2">📷 Cámara (Ve nada)</div>
                    <div className="border-b border-slate-500 my-2 text-center text-slate-500">| | Vidrio Inclinado 45° | |</div>
                    <div className="text-center mt-2">👁️ Presentador (Ve texto)</div>
                    <div className="mt-4 text-center text-yellow-400">📱 Tablet (Emite luz)</div>
                </div>
            </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
                <h3 className="text-xl font-bold text-white mb-2">1950: Rollo de Papel</h3>
                <p className="text-sm text-slate-400">
                    Primer teleprompter (usado en serie <em>The First Hundred Years</em>) era literalmente rollo de papel carnicero motorizado, operado por alguien girando manivela. ¡Si actor hablaba muy rápido, operador debía girar más rápido!
                </p>
            </div>
            <div>
                <h3 className="text-xl font-bold text-white mb-2">1952: Eisenhower y Política</h3>
                <p className="text-sm text-slate-400">
                    Dwight Eisenhower fue primer presidente EEUU en usar TP en campaña. Notó que mirar al público (vía cámara) transmitía mucha más sinceridad que leer discursos en mesa. Desde entonces, ningún político vive sin uno.
                </p>
            </div>
        </div>

        <SEOContentFAQ
            title="Curiosidades Teleprompter"
            items={[
                {
                    question: "¿Qué es 'Teleprompter Presidencial'?",
                    answer: "Son esos dos parantes de vidrio, uno a cada lado del podio. Son invisibles a audiencia (parecen vidrio ahumado), pero reflejan texto de monitores de piso. Político alterna mirada entre izq y der para parecer que habla a todo el público."
                },
                {
                    question: "¿Por qué se llama 'Teleprompter'?",
                    answer: "De 'Tele' (Distancia) + 'Prompter' (Apuntador). En teatro antiguo, 'Apuntador' era persona escondida en caja escenario que susurraba líneas si actor olvidaba."
                },
                {
                    question: "¿Puedo hacer uno casero?",
                    answer: "¡Sí! Vidrio de portarretrato común funciona (con un poco de doble reflejo/fantasma). Para calidad pro, necesitas vidrio especial '70/30 Beam Splitter'."
                }
            ]}
        />
    </>
);
