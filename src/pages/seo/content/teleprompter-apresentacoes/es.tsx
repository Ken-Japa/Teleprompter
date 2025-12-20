import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { SEOContentHowTo } from "../../../../components/seo/SEOContentHowTo";

export const TeleprompterApresentacoesES = () => (
    <>
        <h1 className="text-4xl font-bold text-white mb-6">Teleprompter para Presentaciones (PowerPoint y Keynote)</h1>

        <p className="lead text-xl text-slate-300 mb-8">
            Hacer una presentación de diapositivas mientras recuerdas todas las estadísticas y argumentos es un desafío. PromptNinja te permite sincronizar tu discurso con tus diapositivas de PowerPoint, Google Slides o Keynote, asegurando un rendimiento seguro y profesional.
        </p>

        <div className="bg-slate-800 p-6 rounded-lg my-8 border-l-4 border-orange-500">
            <h2 className="text-2xl font-bold text-white mb-2">La Técnica del "Segundo Cerebro"</h2>
            <p className="text-slate-300">
                No llenes tus diapositivas de texto. Usa las diapositivas para lo visual y PromptNinja para el contenido hablado.
                <br /><br />
                Al usar nuestra herramienta como tu guion invisible, puedes mantener tus diapositivas limpias e impactantes, mientras hablas con autoridad, sin necesidad de memorizar. <a href="/es/guiones-institucionales" className="text-purple-400 hover:text-purple-300 underline">Estructura tu discurso con nuestros ejemplos de guiones corporativos</a>.
            </p>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Cómo Sincronizar Discurso y Diapositivas</h2>
        <div className="bg-slate-800 p-6 rounded-lg my-6">
            <SEOContentHowTo
                title=""
                schemaTitle="Cómo Sincronizar Teleprompter y Diapositivas"
                totalTime="PT2M"
                tools={["PromptNinja", "PowerPoint o Google Slides"]}
                steps={[
                    {
                        title: "Paso 1: Marcadores",
                        text: "Usa marcadores visuales (ej: [DIAPOSITIVA 1]) en tu guion para saber cuándo avanzar."
                    },
                    {
                        title: "Paso 2: Setup Presencial",
                        text: "Usa tu portátil como teleprompter (vista privada) y el proyector para las diapositivas."
                    },
                    {
                        title: "Paso 3: Setup Online",
                        text: "Comparte solo la ventana de PowerPoint. Mantén PromptNinja flotando encima para leer."
                    }
                ]}
            />
        </div>

        <div className="text-center mt-12">
            <a
                href="https://promptninja.solutionkit.com.br/?lang=es/#app"
                className="inline-block bg-gradient-to-r from-orange-500 to-red-600 font-bold py-3 px-6 rounded-lg transition hover:brightness-110"
                style={{ color: 'white' }}
            >
                Haz Presentaciones Memorables
            </a>
        </div>

        <SEOContentFAQ
            title="Preguntas sobre Presentaciones"
            items={[
                {
                    question: "¿El público notará que leo?",
                    answer: "Si posicionas bien cerca de la cámara (online) o miras tu portátil naturalmente (presencial), es imperceptible. El truco es mirar al público/cámara a menudo."
                },
                {
                    question: "¿Funciona con PowerPoint?",
                    answer: "Sí. En reuniones online, comparte SOLO la ventana de PowerPoint. Mantén el teleprompter flotando encima; la audiencia no lo verá."
                },
                {
                    question: "¿Cómo marco el cambio de diapositiva?",
                    answer: "Escribe marcadores visuales como [DIAPOSITIVA 1] o usa colores distintos en el editor de PromptNinja para indicar visualmente cuándo avanzar."
                }
            ]}
        />
    </>
);
