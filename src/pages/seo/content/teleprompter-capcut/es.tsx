import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { SEOContentHowTo } from "../../../../components/seo/SEOContentHowTo";

export const TeleprompterCapCutES = () => (
    <>
        <h1 className="text-4xl font-bold text-white mb-6">Cómo Usar Teleprompter para CapCut: Tutorial de Video Profesional</h1>

        <p className="lead text-xl text-slate-300 mb-8">
            CapCut es la herramienta de edición favorita de los creadores, pero su función de teleprompter integrada puede ser limitada. PromptNinja es el compañero perfecto para CapCut: graba tu video con nuestro teleprompter profesional y edita en CapCut para añadir subtítulos, efectos y música viral.
        </p>

        <div className="bg-slate-800 p-6 rounded-lg my-8 border-l-4 border-cyan-500">
            <h2 className="text-2xl font-bold text-white mb-2">¿Por qué No Usar el Teleprompter Integrado de CapCut?</h2>
            <p className="text-slate-300">
                Aunque útil, el prompter de CapCut carece de funciones profesionales.
                <br /><br />
                Con PromptNinja, obtienes <strong>Control Remoto P2P</strong> (usa otro móvil para controlar la velocidad mientras grabas), <strong>Control por Voz</strong> y formato de texto avanzado. Graba el video crudo a la perfección en PromptNinja y llévalo a CapCut solo para el pulido final.
            </p>
        </div>
        <SEOContentHowTo
            title="Flujo de Trabajo Ganador: PromptNinja + CapCut"
            schemaTitle="Cómo Usar Teleprompter con CapCut"
            totalTime="PT10M"
            tools={["CapCut", "PromptNinja", "Smartphone"]}
            steps={[
                {
                    title: "Paso 1: Preparación",
                    text: "Escribe tu guion en PromptNinja. Usa colores para marcar cortes o efectos."
                },
                {
                    title: "Paso 2: Grabación",
                    text: "Abre PromptNinja en el móvil y graba. Usa un segundo dispositivo para controlar el desplazamiento remotamente."
                },
                {
                    title: "Paso 3: Edición en CapCut",
                    text: "Importa el video grabado. Como no te equivocaste en el texto, tu línea de tiempo estará limpia."
                },
                {
                    title: "Paso 4: Subtítulos Dinámicos",
                    text: "Usa \"Subtítulos Automáticos\" de CapCut. Gracias a tu dicción guiada, serán mucho más precisos."
                }
            ]}
        />

        <div className="text-center mt-12">
            <a
                href="https://promptninja.solutionkit.com.br/?lang=es/#app"
                className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 font-bold py-3 px-6 rounded-lg transition hover:brightness-110"
                style={{ color: 'white' }}
            >
                Prueba el Combo PromptNinja + CapCut
            </a>
        </div>

        <SEOContentFAQ
            title="Dudas: CapCut y PromptNinja"
            items={[
                {
                    question: "¿PromptNinja exporta directo a CapCut?",
                    answer: "No directamente. Grabas el video en PromptNinja, se guarda en la galería de tu móvil, y luego abres CapCut e importas el video desde la galería. Así de simple."
                },
                {
                    question: "¿Puedo usar los efectos de CapCut?",
                    answer: "¡Sí! La idea es grabar el video 'limpio' (sin texto en pantalla) usando PromptNinja para leer, y luego añadir toda la magia (efectos, subtítulos, música) en CapCut."
                },
                {
                    question: "¿La calidad del video es buena?",
                    answer: "Sí. PromptNinja usa la cámara nativa de tu dispositivo a la máxima resolución permitida por el navegador (generalmente Full HD o 4K, dependiendo del móvil)."
                }
            ]}
        />
    </>
);
