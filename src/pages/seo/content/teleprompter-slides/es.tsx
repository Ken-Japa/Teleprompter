import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { SEOContentHowTo } from "../../../../components/seo/SEOContentHowTo";

export const TeleprompterSlidesES = () => (
    <>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Cómo Sincronizar Teleprompter con PowerPoint y Slides
        </h1>

        <p className="lead text-xl text-slate-300 mb-8 font-medium">
            Nunca más pierda el ritmo en tus presentaciones. Con **PromptNinja** y el comando exclusivo **[STOP]**, puedes sincronizar perfectamente tu guion con tus diapositivas para una exposición magistral.
        </p>

        <p className="text-slate-300 mb-8 font-medium">
            El mayor temor de un orador es que el texto siga avanzando mientras todavía explica un gráfico importante. Nuestra tecnología permite que el guion te espere, garantizando que cada palabra coincida exactamente con lo que el público ve en pantalla.
        </p>

        <div className="bg-orange-600/10 border border-orange-500/20 rounded-2xl p-6 md:p-8 text-center mb-12">
            <h3 className="text-2xl font-bold text-white mb-4">Domina el Escenario Virtual</h3>
            <p className="text-slate-300 mb-6 font-medium">
                Ideal para Webinars, clases y presentaciones corporativas.
                Toma el control total de tu narrativa hoy mismo.
            </p>
            <a href="/?lang=es#app" className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-full transition-all hover:scale-105 shadow-lg shadow-orange-500/25" style={{ color: 'white' }}>
                Sincronizar con Slides
            </a>
            <p className="mt-4 text-sm text-slate-400 font-medium">Compatible con Clickers · Comando [STOP] · 100% Gratis</p>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg my-8 border-l-4 border-orange-500">
            <h3 className="text-2xl font-bold text-white mb-2">El Secreto: Comando [STOP]</h3>
            <p className="text-slate-300 mb-4">
                La lógica es simple: tu guion debe esperarte. Al insertar la etiqueta <strong>[STOP]</strong>, creas puntos de parada obligatorios.
            </p>
            <SEOContentHowTo
                title=""
                schemaTitle="Cómo Usar el Comando [STOP] en Diapositivas"
                totalTime="PT2M"
                tools={["PromptNinja", "PowerPoint"]}
                steps={[
                    {
                        title: "Paso 1: Insertar Etiqueta",
                        text: "Escribe [STOP] (mayúsculas, corchetes) en tu guion donde quieras pausar para cambiar diapositiva."
                    },
                    {
                        title: "Paso 2: Pausa Automática",
                        text: "El teleprompter se desplaza hasta encontrar [STOP] y se pausa solo."
                    },
                    {
                        title: "Paso 3: Cambiar Diapositiva y Reanudar",
                        text: "Cambia tu diapositiva, explica el gráfico y haz clic (o usa el pasador) para reanudar el scroll."
                    }
                ]}
            />
        </div>

        <h3 className="text-2xl font-bold text-white mt-8 mb-4">Compatible con Pasadores de Diapositivas (Clickers)</h3>
        <p className="mb-4">
            La mayoría de los pasadores de diapositivas (presentadores Logitech, etc.) funcionan enviando comandos de teclado (Flechas, Espacio o Avance de Página).
        </p>
        <p className="mb-6">
            PromptNinja reconoce estas señales. Esto significa que con un **solo dispositivo** en tu mano, puedes controlar tanto tus diapositivas en el ordenador como el texto en tu teleprompter. Productividad máxima, complicaciones cero.
        </p>

        <h3 className="text-2xl font-bold text-white mt-8 mb-4">Casos de Uso</h3>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-2">Webinars de Ventas</h3>
                <p className="text-sm text-slate-300">Asegura que el precio y la oferta aparezcan en tu discurso exactamente en el momento en que la diapositiva de "Checkout" aparece en pantalla. Usa <strong>[STOP]</strong> antes de revelar el precio.</p>
            </div>
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-2">Clases Online</h3>
                <p className="text-sm text-slate-300">Los profesores pueden bloquear el texto mientras dibujan en la pizarra digital o explican un concepto complejo fuera del guion.</p>
            </div>
        </div>

        <h3 className="text-2xl font-bold text-white mt-8 mb-4">Dicción y Ritmo</h3>
        <p className="mb-6">
            Además de la sincronización, usar paradas programadas ayuda a mantener un ritmo de habla más natural. Aprende más sobre cómo controlar tu ritmo en nuestra página sobre <a href="/es/teleprompter-pacing-timer-online" className="text-blue-400 hover:text-blue-300 underline">Pacing y Timer</a>.
        </p>

        <div className="text-center bg-slate-800 p-8 rounded-lg my-10">
            <h3 className="text-3xl font-bold text-white mb-4">Presenta con Confianza</h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                Nunca más te preocupes por "perder" el texto. Con PromptNinja, tú controlas el show.
            </p>
            <a
                href="/?lang=es#app"
                className="inline-block bg-white text-slate-900 font-bold py-3 px-8 mx-auto rounded-full transition hover:bg-slate-200"
            >
                Crear Presentación Ahora
            </a>
        </div>

        <SEOContentFAQ
            title="Preguntas sobre Diapositivas y Presentación"
            items={[
                {
                    question: "¿PromptNinja cambia la diapositiva de PowerPoint solo?",
                    answer: "No. PromptNinja controla TU GUION (texto). Tú sigues usando tu pasador de diapositivas o mouse para cambiar en PowerPoint, pero el comando [STOP] asegura que nunca pierdas tu lugar en la lectura."
                },
                {
                    question: "¿Qué pasadores de diapositivas son compatibles?",
                    answer: "Prácticamente todos (Logitech R400, R800, genéricos). Si el pasador funciona simulando las flechas del teclado o RePág/AvPág, funcionará nativamente en PromptNinja."
                },
                {
                    question: "¿Funciona en Zoom o Teams?",
                    answer: "Perfectamente. En presentaciones online, la técnica estándar es compartir solo la ventana de la presentación y mantener el teleprompter flotando encima para leer."
                }
            ]}
        />
    </>
);
