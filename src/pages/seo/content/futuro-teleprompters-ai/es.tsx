import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { ROUTES_CONFIG } from "../../../../config/routes";

export const FuturoTelepromptersAiES = () => (
    <>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            El Futuro de los Teleprompters con IA: ¿El Fin del "Lector Robot"?
        </h2>

        <p className="lead text-xl text-slate-300 mb-8">
            Antiguamente, necesitabas a una persona girando una manivela para desplazar el papel. Hoy, la Inteligencia Artificial te escucha. Pronto, corregirá tus ojos. El futuro del teleprompter no es solo leer, es <strong>actuar</strong>.
        </p>

        <div className="bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg mb-12">
            <h3 className="text-3xl font-bold text-white mb-6">3 Tecnologías que Están Cambiando Todo</h3>

            <div className="space-y-6">
                <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-cyan-500">
                    <h3 className="text-xl font-bold text-white mb-2">1. Reconocimiento de Voz en Tiempo Real (Ya Disponible)</h3>
                    <p className="text-slate-300 mb-2">
                        PromptNinja ya hace esto hoy. El texto se desplaza exactamente a la velocidad que hablas. Si improvisas, espera. Esto elimina el 100% de la ansiedad de lectura.
                    </p>
                </div>

                <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-pink-500">
                    <h3 className="text-xl font-bold text-white mb-2">2. Corrección de Mirada por IA (NVIDIA Broadcast)</h3>
                    <p className="text-slate-300 mb-2">
                        Softwares como NVIDIA Eye Contact reposicionan digitalmente tus pupilas para que parezcan estar mirando a la cámara, incluso si estás leyendo un guion fuera del eje. Esto podría eliminar la necesidad de hardware caro con espejos.
                    </p>
                </div>

                <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-purple-500">
                    <h3 className="text-xl font-bold text-white mb-2">3. Generación Automática de Guiones (ChatGPT)</h3>
                    <p className="text-slate-300 mb-2">
                        En el futuro, no escribirás el guion. Dirás: "PromptNinja, genera un guion de 3 minutos sobre Marketing para Instagram", y él escribirá y cargará el texto instantáneamente en la pantalla.
                    </p>
                </div>
            </div>
        </div>

        <h3 className="text-3xl font-bold text-white mt-12 mb-6">¿Perderemos la Habilidad de Hablar?</h3>
        <p className="text-slate-300 mb-8">
            Al contrario. Con la IA cuidando la parte técnica (recordar qué decir, mantener el ritmo), los humanos podrán enfocarse en lo que la IA no tiene: <strong>emoción y conexión</strong>. El teleprompter dejará de ser una muleta para convertirse en un exoesqueleto de carisma.
        </p>

        <SEOContentFAQ
            title="Preguntas Futuristas"
            items={[
                {
                    question: "¿PromptNinja tendrá corrección de mirada?",
                    answer: "Estamos siempre atentos, pero esa tecnología exige tarjetas de video pesadas (GPUs) hoy. Preferimos enfocarnos en una herramienta ligera que corra en el navegador de cualquier celular."
                },
                {
                    question: "¿La IA reemplazará a los presentadores?",
                    answer: "Los avatares de IA ya existen, pero las personas confían en personas. El uso de teleprompter inteligente, de hecho, permitirá que más personas reales graben videos con calidad profesional."
                },
                {
                    question: "¿Puedo usar la IA de PromptNinja offline?",
                    answer: "¡Sí! El reconocimiento de voz de PromptNinja se ejecuta localmente en tu navegador (Web Speech API) en muchos dispositivos, garantizando privacidad y velocidad."
                }
            ]}
        />

        <div className="text-center mt-12 pb-12">
            <a
                href="#app?lang=es"
                className="inline-block bg-gradient-to-r from-purple-700 to-blue-700 font-bold py-4 px-10 rounded-full transition hover:scale-105 shadow-xl text-white text-lg"
            >
                Experimenta el Futuro Hoy (Voice Control)
            </a>
        </div>

        <div className="border-t border-slate-800 pt-12 mt-12">
            <h3 className="text-2xl font-bold text-white mb-6">Ver También</h3>
            <ul className="space-y-4">
                <li>
                    <a href={ROUTES_CONFIG.SEO_READING_SPEED.paths.es} className="text-purple-400 hover:text-purple-300 hover:underline text-lg">
                        🚀 ¿Cuál es la Velocidad Ideal de Lectura?
                    </a>
                </li>
                <li>
                    <a href={ROUTES_CONFIG.SEO_HARDWARE_VS_WEB.paths.es} className="text-purple-400 hover:text-purple-300 hover:underline text-lg">
                        💻 Teleprompter Web vs Hardware: ¿Necesito Espejo?
                    </a>
                </li>
                <li>
                    <a href={ROUTES_CONFIG.SEO_CELEBRITIES.paths.es} className="text-purple-400 hover:text-purple-300 hover:underline text-lg">
                        ⭐ Famosos que Usan Teleprompter
                    </a>
                </li>
            </ul>
        </div>
    </>
);
