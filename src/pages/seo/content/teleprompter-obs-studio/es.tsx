import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { SEOContentHowTo } from "../../../../components/seo/SEOContentHowTo";

export const TeleprompterObsStudioES = () => (
    <>
        <h1 className="text-4xl font-bold text-white mb-6">Cómo Usar Teleprompter en OBS Studio: La Guía Definitiva para Streamers</h1>

        <p className="lead text-xl text-slate-300 mb-8">
            Para streamers y creadores de contenido en vivo, cambiar de ventana para leer el guion es una pesadilla. PromptNinja ofrece la solución perfecta: integra el teleprompter directamente en OBS Studio como una fuente de navegador transparente o úsalo en un monitor secundario con control remoto P2P. Usa nuestros <strong>temas Chroma Key (verde y azul)</strong> para eliminar el fondo y dejar solo el texto flotando sobre tu escena.
        </p>

        <div className="bg-slate-800 p-6 rounded-lg my-8 border-l-4 border-blue-600">
            <h2 className="text-2xl font-bold text-white mb-2">¿Por qué los Streamers Profesionales Eligen PromptNinja?</h2>
            <p className="text-slate-300">
                La estabilidad es crucial. Nuestro sistema <strong>P2P (Peer-to-Peer)</strong> asegura que el control del texto (vía móvil) no consuma ancho de banda de tu directo.
                <br /><br />
                Además, el tema "Chroma Key" te permite superponer el texto directamente en tu pantalla de juego o cámara.
            </p>
        </div>

        <SEOContentHowTo
            title="Tutorial: PromptNinja en OBS Studio"
            schemaTitle="Cómo Usar Teleprompter en OBS Studio"
            totalTime="PT5M"
            tools={["OBS Studio", "Ordenador", "Smartphone"]}
            steps={[
                {
                    title: "Paso 1: Fuente de Navegador",
                    text: "En OBS, añade una nueva \"Fuente de Navegador\". Pega la URL de tu sesión de PromptNinja."
                },
                {
                    title: "Paso 2: Interactuar",
                    text: "Haz clic derecho en la fuente y selecciona \"Interactuar\" para realizar ajustes iniciales si es necesario."
                },
                {
                    title: "Paso 3: Stream Deck Móvil",
                    text: "Con PromptNinja abierto en OBS, conecta tu móvil vía QR Code. Ahora tienes un controlador dedicado para tus guiones sin necesidad de Alt-Tab."
                },
                {
                    title: "Paso 4: Temas Chroma Key",
                    text: "Activa el tema Chroma Green o Chroma Blue en PromptNinja. En OBS, aplica el filtro \"Chroma Key\" a la fuente del navegador para eliminar completamente el fondo de color, dejando solo el texto flotando."
                }
            ]}
        />

        <div className="text-center mt-12">
            <a
                href="https://promptninja.solutionkit.com.br/?lang=es/#app"
                className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 font-bold py-3 px-6 rounded-lg transition hover:brightness-110"
                style={{ color: 'white' }}
            >
                Mejora tu Stream con PromptNinja
            </a>
        </div>

        <SEOContentFAQ
            title="Preguntas Frecuentes sobre OBS y Teleprompter"
            items={[
                {
                    question: "¿Cómo elimino el fondo del texto en OBS?",
                    answer: "En PromptNinja, cambia el tema a 'Chroma Green'. En OBS, haz clic derecho en la fuente del navegador, ve a Filtros y añade 'Chroma Key'. El verde se volverá transparente."
                },
                {
                    question: "¿Funciona también con Streamlabs y Twitch Studio?",
                    answer: "Sí. La lógica es la misma: añádelo como una 'Fuente de Navegador' (Browser Source). PromptNinja es compatible con cualquier software de transmisión que acepte fuentes web."
                },
                {
                    question: "¿Hay retraso (delay) en el control remoto?",
                    answer: "Virtualmente cero. Usamos tecnología WebRTC que conecta tu móvil y PC directamente vía red local, asegurando una latencia por debajo de 20ms, imperceptible para el ser humano."
                }
            ]}
        />
    </>
);
