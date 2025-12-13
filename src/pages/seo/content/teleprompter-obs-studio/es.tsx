
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

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Tutorial: PromptNinja en OBS Studio</h2>
        <div className="bg-slate-800 p-6 rounded-lg my-6">
            <ol className="list-decimal pl-6 space-y-6 text-slate-300">
                <li>
                    <strong>Fuente de Navegador:</strong> En OBS, añade una nueva "Fuente de Navegador". Pega la URL de tu sesión de PromptNinja.
                </li>
                <li>
                    <strong>Interactuar:</strong> Haz clic derecho en la fuente y selecciona "Interactuar" para ajustes iniciales.
                </li>
                <li>
                    <strong>Stream Deck Móvil:</strong> Con PromptNinja abierto en OBS, conecta tu móvil vía QR Code. Ahora tienes un controlador dedicado para tus guiones.
                </li>
                <li>
                    <strong>Temas Chroma Key (Verde/Azul):</strong> Activa el tema <strong>Chroma Green</strong> o <strong>Chroma Blue</strong> en PromptNinja. En OBS, aplica el filtro "Chroma Key" a la fuente del navegador para eliminar completamente el fondo de color, dejando solo el texto flotando de forma profesional sobre tu gameplay o cámara. Perfecto para ese look de presentador de noticias.
                </li>
            </ol>
        </div>

        <div className="text-center mt-12">
            <a
                href="https://promptninja.solutionkit.com.br/?lang=es/#app"
                className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 font-bold py-3 px-6 rounded-lg transition hover:brightness-110"
                style={{ color: 'white' }}
            >
                Mejora tu Stream con PromptNinja
            </a>
        </div>
    </>
);
