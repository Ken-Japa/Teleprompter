import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { SEOContentHowTo } from "../../../../components/seo/SEOContentHowTo";
import { SEORelatedLinks } from "../../../../components/seo/SEORelatedLinks";

export const ChecklistGravacaoES = () => (
    <>
        <p className="lead text-xl text-slate-300 mb-8 font-medium">
            Grabe videos como un profesional desde su primer intento. Siga nuestro checklist definitivo para asegurar que su configuración de teleprompter, iluminación y audio sean impecables.
        </p>

        <p className="text-slate-300 mb-8">
            Muchos creadores se enfocan solo en el guion y olvidan que la preparación técnica es lo que separa un video amateur de una producción de autoridad. Un teleprompter mal configurado puede resultar en ojos "escaneando" el texto o una lectura mecánica. Esta guía resuelve eso.
        </p>

        <SEOContentHowTo
            title="Checklist Pre-Grabación: Pasos Esenciales"
            schemaTitle="Cómo Prepararse para Grabar con Teleprompter"
            totalTime="PT20M"
            tools={["PromptNinja", "Cámara", "Iluminación", "Micrófono"]}
            steps={[
                {
                    title: "1. El Guion Ninja",
                    text: "Em PromptNinja, rompa su texto en párrafos cortos. Use LETRAS MAYÚSCULAS solo para énfasis emocional. Deje espacios en blanco para respirar."
                },
                {
                    title: "2. Posicionamiento de la Cámara",
                    text: "Su lente debe estar alineado con sus ojos. Si usa un espejo divisor, asegúrese de que no entre luz por detrás de la tela (hood)."
                },
                {
                    title: "3. Iluminación de 3 Puntos",
                    text: "Luz principal (Key), Luz de relleno (Fill) y Luz de fondo (Back). Evite sombras fuertes en la cara que distraigan al espectador."
                },
                {
                    title: "4. Prueba de Audio",
                    text: "Grabe durante 30 segundos y escuche con auriculares. Verifique si el aire acondicionado o el ruido externo se está captando."
                },
                {
                    title: "5. Ajuste de Velocidad",
                    text: "Haga una prueba de lectura en PromptNinja. La velocidad debe ser un poco más rápida que su habla cómoda para mantener la energía alta."
                }
            ]}
        />

        <div className="bg-yellow-600/10 border border-yellow-500/20 rounded-2xl p-8 my-12 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-4">Consejo Pro: La Regla de los 2 Metros</h3>
            <p className="text-slate-300 mb-4">
                Cuanto más lejos esté de la pantalla del teleprompter, menos notará la cámara el movimiento de sus ojos.
            </p>
            <p className="text-sm text-slate-400 italic">
                Aumente el tamaño de la fuente en PromptNinja para poder leer con claridad a una distancia de 2 a 3 metros.
            </p>
        </div>

        <SEOContentFAQ
            title="Preguntas Frecuentes sobre Grabación"
            items={[
                {
                    question: "¿Debo mirar fijamente al teleprompter?",
                    answer: "No. Intente gesticular y mover levemente la cabeza. Imagine que el teleprompter es un amigo detrás de la cámara recordándole qué decir. Mantenga el contacto visual con el lente, no con las letras individuales."
                },
                {
                    question: "¿Qué hacer si me equivoco en una frase?",
                    answer: "No detenga la grabación. Respire, haga una pausa silenciosa de 2 segundos (para facilitar el corte en edición) y reinicie la frase. PromptNinja tiene atajos rápidos para retroceder el texto si es necesario."
                },
                {
                    question: "¿Cuál es el mejor color de fondo para el teleprompter?",
                    answer: "Para la mayoría de las configuraciones, fondo NEGRO con letras BLANCAS o AMARILLAS. Esto evita que el brillo de la pantalla se refleje en sus ojos o lentes."
                }
            ]}
        />

        <SEORelatedLinks
            title="Continúe Evolucionando"
            links={[
                { label: "Consejos de Oratoria para Video", href: "/es/consejos-oratoria-video" },
                { label: "Cómo Memorizar Guiones Rápido", href: "/es/como-memorizar-guiones-rapido" },
                { label: "Velocidad de Lectura Ideal", href: "/es/velocidad-lectura-teleprompter" },
                { label: "Guía de Escritura para YouTube", href: "/es/guiones-para-youtube" }
            ]}
        />
    </>
);
