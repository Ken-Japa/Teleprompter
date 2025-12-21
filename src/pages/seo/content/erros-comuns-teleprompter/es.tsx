import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { ROUTES_CONFIG } from "../../../../config/routes";

export const ErrosComunsTeleprompterES = () => (
    <>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            5 Errores de Novato al Usar Teleprompter que Arruinan tus Videos (y Cómo Corregirlos)
        </h1>

        <p className="lead text-xl text-slate-300 mb-8">
            Compraste el equipo, descargaste la app, pero el video final quedó... raro. Leído robóticamente, ojos corriendo de un lado a otro. Calma, el problema no eres tú, es la técnica. Corrijamos los 5 errores clásicos ahora.
        </p>

        <div className="space-y-8 mb-12">
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-xl shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl font-bold text-red-500">1</div>
                <h2 className="text-2xl font-bold text-red-400 mb-3 relative z-10">La "Mirada de Tenis"</h2>
                <p className="text-slate-300 mb-4 relative z-10">
                    El error más obvio: tus ojos se mueven de izquierda a derecha mientras leen, pareciendo que estás viendo un partido de ping-pong.
                </p>
                <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-green-500">
                    <h4 className="font-bold text-green-400 mb-1">Cómo Corregir con PromptNinja:</h4>
                    <p className="text-sm text-slate-300">
                        Aumenta la distancia de la cámara (mínimo 1 metro) y <strong>estrecha los márgenes</strong> del texto en la app. Cuanto más estrecha la columna de texto, menos necesitan moverse tus ojos lateralmente.
                    </p>
                </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-8 rounded-xl shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl font-bold text-red-500">2</div>
                <h2 className="text-2xl font-bold text-red-400 mb-3 relative z-10">La "Voz de Robot"</h2>
                <p className="text-slate-300 mb-4 relative z-10">
                    Hablar monótono, sin pausas y sin emoción, solo soltando palabras. Esto sucede cuando intentas seguir la velocidad del texto, en lugar de que el texto te siga a ti.
                </p>
                <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-green-500">
                    <h4 className="font-bold text-green-400 mb-1">Cómo Corregir con PromptNinja:</h4>
                    <p className="text-sm text-slate-300">
                        Usa la función de <strong>Voice Control (IA)</strong>. PromptNinja escucha tu voz y desplaza el texto solo cuando hablas. Esto te permite hacer pausas dramáticas, respirar y actuar con naturalidad.
                    </p>
                </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-8 rounded-xl shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl font-bold text-red-500">3</div>
                <h2 className="text-2xl font-bold text-red-400 mb-3 relative z-10">Olvidar Parpadear (La Mirada Fija)</h2>
                <p className="text-slate-300 mb-4 relative z-10">
                    En la ansiedad por no perder la lectura, abres mucho los ojos y dejas de parpadear. El resultado asusta al espectador.
                </p>
                <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-green-500">
                    <h4 className="font-bold text-green-400 mb-1">La Solución:</h4>
                    <p className="text-sm text-slate-300">
                        Agrega emojis o saltos de línea en el guion como recordatorios visuales para [PARPADEAR] o [SONREÍR]. Relájate.
                    </p>
                </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-8 rounded-xl shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl font-bold text-red-500">4</div>
                <h2 className="text-2xl font-bold text-red-400 mb-3 relative z-10">Escribir "Libros" en vez de "Conversaciones"</h2>
                <p className="text-slate-300 mb-4 relative z-10">
                    Guiones con frases largas y palabras difíciles (tipo "sin embargo", "por consiguiente") suenan artificiales.
                </p>
                <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-green-500">
                    <h4 className="font-bold text-green-400 mb-1">La Solución:</h4>
                    <p className="text-sm text-slate-300">
                        Lee tu guion en voz alta antes de grabar. Si te trabas, reescríbelo. Escribe como si estuvieras hablando con un amigo en un bar.
                    </p>
                </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-8 rounded-xl shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl font-bold text-red-500">5</div>
                <h2 className="text-2xl font-bold text-red-400 mb-3 relative z-10">Fuente Demasiado Pequeña</h2>
                <p className="text-slate-300 mb-4 relative z-10">
                    Tratar de leer letras diminutas te hace entrecerrar los ojos (squinting), lo que transmite inseguridad.
                </p>
                <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-green-500">
                    <h4 className="font-bold text-green-400 mb-1">Cómo Corregir con PromptNinja:</h4>
                    <p className="text-sm text-slate-300">
                        Aumenta el tamaño de la fuente a XL. Es mejor desplazarse más rápido que forzar la vista.
                    </p>
                </div>
            </div>
        </div>

        <SEOContentFAQ
            title="FAQ de Errores Técnicos"
            items={[
                {
                    question: "¿Y si me equivoco en una palabra durante la grabación?",
                    answer: "¡Sigue! Si es un error pequeño y natural, mantenlo. Agrega autenticidad. Si es grave, para, respira, mira a la cámara (no al texto) y repite la frase. Edita después."
                },
                {
                    question: "¿Puedo usar gafas mientras leo el teleprompter?",
                    answer: "Cuidado con el reflejo de la pantalla en las gafas. Intenta subir la luz del teleprompter (brillo) o cambiar el ángulo de iluminación de la habitación para evitar reflejos en los lentes."
                },
                {
                    question: "¿Puedo improvisar en medio?",
                    answer: "Seguro. PromptNinja tiene un atajo [ESPACIO] que detiene el desplazamiento instantáneamente. Improvisa, y cuando vuelvas al guion, presiona espacio nuevamente."
                }
            ]}
        />

        <div className="text-center mt-12 pb-12">
            <a
                href="#app?lang=es"
                className="inline-block bg-gradient-to-r from-purple-600 to-blue-700 font-bold py-4 px-10 rounded-full transition hover:scale-105 shadow-xl text-white text-lg"
            >
                Graba Sin Errores Ahora (Gratis)
            </a>
        </div>

        <div className="border-t border-slate-800 pt-12 mt-12">
            <h3 className="text-2xl font-bold text-white mb-6">Ver También</h3>
            <ul className="space-y-4">
                <li>
                    <a href={ROUTES_CONFIG.SEO_READING_SPEED.paths.es} className="text-purple-400 hover:text-purple-300 hover:underline text-lg">
                        🚀 ¿Cuál es la Velocidad Ideal de Lectura (WPM)?
                    </a>
                </li>
                <li>
                    <a href={ROUTES_CONFIG.SEO_ORATORIA.paths.es} className="text-purple-400 hover:text-purple-300 hover:underline text-lg">
                        🗣️ 5 Consejos de Oratoria para Video
                    </a>
                </li>
                <li>
                    <a href={ROUTES_CONFIG.SEO_DECORAR.paths.es} className="text-purple-400 hover:text-purple-300 hover:underline text-lg">
                        🧠 Cómo Memorizar Guiones Rápido
                    </a>
                </li>
            </ul>
        </div>
    </>
);
