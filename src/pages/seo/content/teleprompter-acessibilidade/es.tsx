import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";

export const TeleprompterAcessibilidadeES = () => (
    <>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Teleprompter para TDAH y Dislexia: Cómo la Tecnología Ayuda al Habla
        </h1>

        <p className="lead text-xl text-slate-300 mb-8">
            Para quienes tienen TDAH (Trastorno por Déficit de Atención con Hiperactividad) o Dislexia, grabar videos puede ser una pesadilla. Olvidar lo que iban a decir, cambiar palabras, perder el foco... El teleprompter no es solo una herramienta de lectura, es una herramienta de <strong>enfoque asistido</strong>.
        </p>

        <div className="bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Funciones de PromptNinja para Neurodiversidad</h2>

            <div className="space-y-6">
                <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-orange-500">
                    <h3 className="text-xl font-bold text-white mb-2">Fuente OpenDyslexic</h3>
                    <p className="text-slate-300 mb-2">
                        PromptNinja es una de las pocas apps que ofrece nativamente la fuente <strong>OpenDyslexic</strong>.
                    </p>
                    <p className="text-sm text-slate-400">
                        Esta fuente tiene la base de las letras "más pesada", lo que ayuda al cerebro a identificar la dirección correcta de la letra y evita que "bailen" o se inviertan en la pantalla.
                    </p>
                </div>

                <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-blue-500">
                    <h3 className="text-xl font-bold text-white mb-2">Enfoque Visual (La Regla)</h3>
                    <p className="text-slate-300 mb-2">
                        Las personas con TDAH a menudo se pierden en medio de un bloque de texto. PromptNinja tiene un marcador visual central (resaltado) que destaca solo la línea actual.
                    </p>
                    <p className="text-sm text-slate-400">
                        Esto elimina el ruido visual del resto del texto y le dice a tu cerebro: "Lee SOLO esto ahora".
                    </p>
                </div>

                <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-purple-500">
                    <h3 className="text-xl font-bold text-white mb-2">Colores Personalizables</h3>
                    <p className="text-slate-300 mb-2">
                        El alto contraste (fondo negro, letra blanca) puede ser agotador para algunos (estrés visual). La app permite cambiar a fondo gris, letras amarillas, o cualquier combinación que sea cómoda para tu sensibilidad sensorial.
                    </p>
                </div>
            </div>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Consejos para Creadores con TDAH</h2>
        <ul className="list-disc list-inside space-y-4 text-slate-300 mb-12">
            <li><strong>Escribe Guiones Cortos:</strong> Divide el video en bloques de 3 minutos. El enfoque sostenido es difícil.</li>
            <li><strong>Usa Voice Control:</strong> Si divagas (lo cual es normal), el teleprompter espera. Si aceleras por la emoción, te sigue. Esto reduce la ansiedad de "perder el punto".</li>
            <li><strong>Graba de Pie:</strong> El movimiento ayuda a mantener la energía y el foco. El prompter a la altura de los ojos te permite moverte sin perder la lectura.</li>
        </ul>

        <SEOContentFAQ
            title="FAQ de Accesibilidad"
            items={[
                {
                    question: "¿PromptNinja funciona con lectores de pantalla?",
                    answer: "Estamos trabajando constantemente para mejorar la compatibilidad con lectores de pantalla y navegación por teclado, asegurando que la app sea utilizable por personas con discapacidad visual."
                },
                {
                    question: "¿La fuente OpenDyslexic está realmente probada?",
                    answer: "Los estudios varían, pero muchos usuarios reportan una mejora significativa en la fluidez de lectura. Lo mejor es probar: actívala en el menú de configuración (icono de engranaje) y ve si funciona para ti."
                },
                {
                    question: "¿La app es gratuita para uso educativo?",
                    answer: "¡Sí! PromptNinja es 100% gratuito. Profesores y alumnos con dificultades de aprendizaje pueden usarla sin restricciones."
                }
            ]}
        />

        <div className="text-center mt-12 pb-12">
            <a
                href="#app?lang=es"
                className="inline-block bg-gradient-to-r from-purple-700 to-blue-700 font-bold py-4 px-10 rounded-full transition hover:scale-105 shadow-xl text-white text-lg"
            >
                Prueba la Fuente OpenDyslexic Ahora
            </a>
        </div>
    </>
);
