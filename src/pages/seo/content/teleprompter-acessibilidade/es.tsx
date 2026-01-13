import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { ROUTES_CONFIG } from "../../../../config/routes";

export const TeleprompterAcessibilidadeES = () => (
    <>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Teleprompter y Accesibilidad: Tecnología de Foco Asistido
        </h2>

        <p className="lead text-xl text-slate-300 mb-8 font-medium">
            Transforma el desafío de hablar a la cámara en una experiencia de confianza. <strong>Descubre cómo las funciones inclusivas</strong> ayudan a personas con TDAH, Dislexia y otras neurodiversidades a brillar en video.
        </p>

        <p className="text-slate-300 mb-8 leading-relaxed">
            En esta inmersión profunda en la inclusión digital, exploramos el papel vital del teleprompter como herramienta de accesibilidad. Para los creadores neurodiversos, el acto de grabar puede estar lleno de ansiedad y pérdida de concentración. PromptNinja fue diseñado para combatir estos obstáculos, ofreciendo características únicas como la fuente OpenDyslexic — diseñada para aumentar la legibilidad y reducir el volteo de letras — y marcadores visuales de enfoque que aíslan la información relevante, eliminando el ruido cognitivo. Aprende cómo el Control por Voz permite que el guion espere tu tiempo de procesamiento, y cómo los esquemas de color de alto contraste protegen contra el estrés visual. Democratizamos la oratoria profesional ofreciendo todas estas herramientas de forma gratuita y en línea, asegurando que nadie se quede atrás en la era del contenido de video.
        </p>

        <div className="bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg mb-12">
            <h3 className="text-3xl font-bold text-white mb-6">Funciones de PromptNinja para la Neurodiversidad</h3>

            <div className="space-y-6">
                <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-orange-500">
                    <h3 className="text-xl font-bold text-white mb-2">Fuente OpenDyslexic</h3>
                    <p className="text-slate-300 mb-2">
                        PromptNinja es una de las pocas aplicaciones que ofrece nativamente la fuente <strong>OpenDyslexic</strong>.
                    </p>
                    <p className="text-sm text-slate-400">
                        Esta fuente tiene bases de letras "más pesadas", lo que ayuda al cerebro a identificar la dirección correcta de la letra y evita que "bailen" o se volteen en la pantalla.
                    </p>
                </div>

                <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-blue-500">
                    <h3 className="text-xl font-bold text-white mb-2">Enfoque Visual (La Regla)</h3>
                    <p className="text-slate-300 mb-2">
                        Las personas con TDAH a menudo se pierden en un bloque de texto. PromptNinja tiene un marcador visual central (resaltado) que destaca solo la línea actual.
                    </p>
                    <p className="text-sm text-slate-400">
                        Esto elimina el ruido visual del resto del texto y le dice a tu cerebro: "Lee SOLO esto ahora."
                    </p>
                </div>

                <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-purple-500">
                    <h3 className="text-xl font-bold text-white mb-2">Colores Personalizables</h3>
                    <p className="text-slate-300 mb-2">
                        El alto contraste (fondo negro, letra blanca) puede ser agotador para algunos (estrés visual). La aplicación permite cambiar a fondo gris, letras amarillas o cualquier combinación que sea cómoda para tu sensibilidad sensorial.
                    </p>
                </div>
            </div>
        </div>

        <h3 className="text-3xl font-bold text-white mt-12 mb-6">Consejos para Creadores con TDAH</h3>
        <ul className="list-disc list-inside space-y-4 text-slate-300 mb-12">
            <li><strong>Escribe Guiones Cortos:</strong> Divide el video en bloques de 3 minutos. El enfoque sostenido es difícil.</li>
            <li><strong>Usa Control por Voz:</strong> Si divagas (lo cual es normal), el teleprompter espera. Si aceleras por la emoción, te sigue. Esto reduce la ansiedad de "perder el lugar".</li>
            <li><strong>Graba de Pie:</strong> El movimiento ayuda a mantener la energía y el enfoque. El prompter a la altura de los ojos te permite moverte sin perder tu lectura.</li>
        </ul>

        <SEOContentFAQ
            title="Preguntas Frecuentes de Accesibilidad"
            items={[
                {
                    question: "¿PromptNinja funciona con lectores de pantalla?",
                    answer: "Estamos trabajando constantemente para mejorar la compatibilidad con lectores de pantalla y navegación por teclado, asegurando que la aplicación sea utilizable por personas con discapacidad visual."
                },
                {
                    question: "¿La fuente OpenDyslexic está realmente probada?",
                    answer: "Los estudios varían, pero muchos usuarios reportan una mejora significativa en la fluidez de lectura. Lo mejor es probarla: actívala en el menú de configuración (ícono de engranaje) y ve si funciona para ti."
                },
                {
                    question: "¿La aplicación es gratuita para uso educativo?",
                    answer: "¡Sí! PromptNinja es 100% gratis. Profesores y estudiantes con dificultades de aprendizaje pueden usarla sin restricciones."
                }
            ]}
        />

        <div className="text-center mt-12 pb-12">
            <a
                href="#app?lang=es"
                className="inline-block bg-gradient-to-r from-purple-700 to-blue-700 font-bold py-4 px-10 rounded-full transition hover:scale-105 shadow-xl text-white text-lg"
            >
                Probar Fuente OpenDyslexic Ahora
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
                    <a href={ROUTES_CONFIG.SEO_GRATIS.paths.es} className="text-purple-400 hover:text-purple-300 hover:underline text-lg">
                        💸 Teleprompter Online Gratis (Sin Login)
                    </a>
                </li>
                <li>
                    <a href={ROUTES_CONFIG.SEO_ORATORIA.paths.es} className="text-purple-400 hover:text-purple-300 hover:underline text-lg">
                        🗣️ Consejos de Oratoria para Video
                    </a>
                </li>
            </ul>
        </div>
    </>
);
