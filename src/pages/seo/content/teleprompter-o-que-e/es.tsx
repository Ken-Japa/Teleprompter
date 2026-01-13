import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";

export const TeleprompterOQueEES = () => (
    <>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            ¿Qué es un Teleprompter? Guía Completa para Principiantes y Profesionales
        </h2>

        <p className="lead text-xl text-slate-300 mb-8 font-medium">
            Entiende cómo funciona la herramienta que revolucionó la oratoria y la producción de video. <strong>Descubre la tecnología detrás del teleprompter</strong> y cómo usarla para brillar.
        </p>

        <p className="text-slate-300 mb-8 leading-relaxed">
            En esta guía exhaustiva, desvelamos todos los secretos del teleprompter, desde su origen en los inicios de la televisión hasta su modernización digital con PromptNinja. Aprende por qué los presentadores de noticias, grandes líderes y YouTubers exitosos nunca graban sin un guion fluyendo ante sus ojos. Exploramos el funcionamiento físico del cristal "beam splitter", técnicas de lectura natural y cómo transformar cualquier dispositivo en un teleprompter profesional gratis. Domina el arte de mantener contacto visual perfecto con tu audiencia y transmite tu mensaje con autoridad y fluidez inquebrantables.
        </p>

        <div className="bg-slate-900/50 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-xl mb-12">
            <h3 className="text-2xl font-bold text-white mb-6">¿Por qué es revolucionario el Teleprompter?</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <li className="flex items-start gap-3 bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                    <span className="text-blue-400 text-xl">👁️</span>
                    <div className="text-sm">
                        <strong className="text-white block mb-1">Mantiene el Contacto Visual</strong>
                        <span className="text-slate-400">El teleprompter permite que el texto fluya exactamente frente a la lente de la cámara, asegurando una conexión total.</span>
                    </div>
                </li>
                <li className="flex items-start gap-3 bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                    <span className="text-blue-400 text-xl">🎯</span>
                    <div className="text-sm">
                        <strong className="text-white block mb-1">Asegura Precisión Absoluta</strong>
                        <span className="text-slate-400">Ideal para discursos donde cada palabra importa, como comunicados oficiales y guiones de ventas.</span>
                    </div>
                </li>
                <li className="flex items-start gap-3 bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                    <span className="text-blue-400 text-xl">💪</span>
                    <div className="text-sm">
                        <strong className="text-white block mb-1">Aumenta la Confianza</strong>
                        <span className="text-slate-400">Elimina la ansiedad de los momentos en "blanco" y enfócate en tu desempeño y entonación durante la grabación.</span>
                    </div>
                </li>
                <li className="flex items-start gap-3 bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                    <span className="text-blue-400 text-xl">⚡</span>
                    <div className="text-sm">
                        <strong className="text-white block mb-1">Acelera la Producción</strong>
                        <span className="text-slate-400">Menos errores significan menos re-grabaciones. Ahorra tiempo y productividad en tu día a día.</span>
                    </div>
                </li>
            </ul>
        </div>

        <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 mb-12">
            <h3 className="text-2xl font-bold text-white mb-4">Cómo Funciona la Magia (El Espejo)</h3>
            <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1">
                    <p className="text-slate-300 mb-4">
                        La magia está en un cristal especial llamado <strong>"Beam Splitter"</strong>.
                    </p>
                    <ul className="list-disc pl-6 text-slate-300 space-y-2">
                        <li>Un lado (audiencia/cámara) es transparente 🪟.</li>
                        <li>El otro lado (presentador) es un espejo 🪞.</li>
                    </ul>
                    <p className="text-slate-300 mt-4">
                        Esto permite que una pantalla en el suelo refleje el texto en el cristal. El presentador lee el reflejo, pero la cámara graba a través del cristal transparente sin captar el texto.
                        Resultado: El presentador mira <strong>directamente a los ojos de la lente</strong> mientras lee.
                    </p>
                </div>
                <div className="bg-black p-4 rounded-lg border border-slate-600 font-mono text-xs text-green-400 w-full md:w-1/3">
                    <div className="text-center mb-2">📷 Cámara (No ve nada)</div>
                    <div className="border-b border-slate-500 my-2 text-center text-slate-500">| | Cristal Inclinado 45° | |</div>
                    <div className="text-center mt-2">👁️ Presentador (Ve el texto)</div>
                    <div className="mt-4 text-center text-yellow-400">📱 Tablet (Emite luz)</div>
                </div>
            </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
                <h3 className="text-xl font-bold text-white mb-2">1950: El Rollo de Papel</h3>
                <p className="text-sm text-slate-400">
                    El primer teleprompter (usado en la serie <em>The First Hundred Years</em>) era literalmente un rollo de papel de carnicero motorizado, operado por alguien girando una manivela. ¡Si el actor hablaba muy rápido, el operador tenía que girar más rápido!
                </p>
            </div>
            <div>
                <h3 className="text-xl font-bold text-white mb-2">1952: Eisenhower y la Política</h3>
                <p className="text-sm text-slate-400">
                    Dwight Eisenhower fue el primer presidente de EE. UU. en usar TP en campaña. Se dio cuenta de que mirar a la audiencia (vía cámara) transmitía mucha más sinceridad que leer discursos en la mesa. Desde entonces, ningún político vive sin uno.
                </p>
            </div>
        </div>

        <section id="cta-o-que-e" className="p-8 bg-gradient-to-r from-slate-900 to-indigo-900 text-white rounded-2xl my-12 text-center shadow-2xl relative border border-slate-700">
            <div className="absolute inset-0 bg-blue-500/5 pointer-events-none"></div>
            <h2 className="text-3xl font-extrabold mb-6">¡Experimenta la "Magia" del Teleprompter Hoy!</h2>
            <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">Ahora que sabes qué es, ¿qué tal usar el teleprompter digital más moderno y fácil del mercado? PromptNinja es gratis y está listo para usar.</p>
            <div className="flex flex-wrap justify-center gap-4 relative z-10">
                <a href="/?lang=es#app" className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-10 rounded-full shadow-lg transition-transform hover:scale-105">Comenzar Ahora (Gratis)</a>
                <a href="/es/como-usar-teleprompter" className="bg-transparent border-2 border-slate-500 hover:bg-slate-800 text-white font-bold py-4 px-10 rounded-full transition-colors">Ver Guía de Uso</a>
            </div>
            <p className="mt-6 text-sm text-slate-400 italic">"Ahorra tiempo y tartamudea menos con PromptNinja."</p>
        </section>

        <SEOContentFAQ
            title="Curiosidades del Teleprompter"
            items={[
                {
                    question: "¿Qué es un 'Teleprompter Presidencial'?",
                    answer: "Son esos dos soportes de cristal, uno a cada lado del podio. Son invisibles para la audiencia (parecen cristal ahumado), pero reflejan el texto desde monitores en el suelo. El político cambia la mirada entre izquierda y derecha para parecer que se dirige a toda la multitud."
                },
                {
                    question: "¿Por qué se llama 'Teleprompter'?",
                    answer: "De 'Tele' (Distancia) + 'Prompter' (Apuntador). En el teatro antiguo, el 'Apuntador' era una persona escondida en la caja del escenario que susurraba las líneas si el actor olvidaba."
                },
                {
                    question: "¿Puedo hacer uno casero?",
                    answer: "¡Sí! El cristal de un marco de fotos normal funciona (con un poco de doble reflejo/fantasma). Para calidad profesional, necesitas un cristal especial '70/30 Beam Splitter'."
                }
            ]}
        />
    </>
);
