export const TeleprompterZoomMeetingES = () => (
    <>
        <h1 className="text-4xl font-bold text-white mb-6">Cómo usar Teleprompter en Zoom, Teams y Google Meet</h1>

        <p className="mb-6">
            Mantener el contacto visual durante una presentación online es difícil. Si miras tus notas, pierdes la conexión con el público. Si miras a la cámara, olvidas qué decir. PromptNinja resuelve esto, permitiéndote leer tu guion mientras miras directamente a la lente de la cámara.
        </p>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">El Problema de la "Mirada Desviada" en Videollamadas</h2>
        <p className="mb-4">
            En reuniones importantes de ventas, entrevistas de trabajo o presentaciones ejecutivas, la confianza se transmite a través de la mirada. Leer un guion en papel o en una ventana lateral te hace parecer poco preparado, robótico o inseguro.
        </p>
        <p className="mb-4">
            La solución técnica es simple, pero requiere la posición correcta: colocar el texto <strong>lo más cerca posible de la webcam</strong>.
        </p>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Paso a Paso Definitivo para Reuniones Online</h2>
        <div className="bg-slate-800 p-6 rounded-lg my-6">
            <ol className="list-decimal pl-6 space-y-4 text-slate-300">
                <li>
                    <strong>Posicionamiento de la Ventana:</strong> Abre PromptNinja en tu navegador y cambia el tamaño de la ventana para que sea estrecha. Arrástrala a la parte superior de la pantalla, centrada justo debajo de tu webcam física.
                </li>
                <li>
                    <strong>Configuración del Texto:</strong> Aumenta el tamaño de la fuente y disminuye el ancho de los márgenes. Esto hace que tus ojos se muevan menos de izquierda a derecha, disimulando la lectura.
                </li>
                <li>
                    <strong>Control Remoto Invisible:</strong> ¡No toques el ratón o el teclado! El sonido del clic distrae y el movimiento de los hombros revela que estás operando la computadora. Usa tu móvil como control remoto silencioso (solo escanea el Código QR).
                </li>
                <li>
                    <strong>Transparencia (Consejo Pro):</strong> Si necesitas ver diapositivas o las caras de otras personas mientras hablas, reduce el ancho de la ventana del teleprompter para que ocupe solo una franja estrecha en la parte superior, dejando el resto de la pantalla libre.
                </li>
            </ol>
        </div>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Funciona en cualquier plataforma de videoconferencia</h2>
        <p className="mb-6">
            Como PromptNinja se ejecuta en el navegador, es universalmente compatible. No necesitas plugins o integraciones complejas. Funciona como una capa "por encima" de tu reunión.
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Zoom:</strong> Ideal para seminarios web y clases.</li>
            <li><strong>Microsoft Teams:</strong> Perfecto para reuniones corporativas.</li>
            <li><strong>Google Meet:</strong> Genial para llamadas rápidas en el navegador.</li>
            <li><strong>Skype, Discord, Slack:</strong> Funciona en cualquier aplicación que use cámara.</li>
        </ul>
        <p className="mb-6">
            <strong>Importante:</strong> <em>No</em> necesitas compartir tu pantalla para que el teleprompter funcione. Es una herramienta solo para tus ojos. Si necesitas compartir pantalla, comparte solo la ventana de la presentación (PowerPoint/PDF) y mantén el teleprompter visible solo para ti.
        </p>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Consejos Avanzados de Etiqueta y Rendimiento</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-900 p-4 rounded-lg">
                <h3 className="text-xl font-bold text-purple-400 mb-2">Iluminación</h3>
                <p className="text-sm text-slate-400">Asegúrate de que tu cara esté bien iluminada desde el frente. El reflejo de la pantalla blanca del teleprompter puede ayudar a iluminar tu rostro, pero una luz dedicada es mejor.</p>
            </div>
            <div className="bg-slate-900 p-4 rounded-lg">
                <h3 className="text-xl font-bold text-blue-400 mb-2">Posición de la Cámara</h3>
                <p className="text-sm text-slate-400">La cámara debe estar a la altura de los ojos. Si usas laptop, coloca libros debajo de ella. Cámara baja (mirando hacia arriba a tu nariz) transmite arrogancia; cámara alta transmite sumisión.</p>
            </div>
        </div>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Preguntas Frecuentes</h2>
        <dl className="space-y-4">
            <div>
                <dt className="font-bold text-white">¿La gente sabrá que estoy leyendo?</dt>
                <dd className="text-slate-300">Si colocas el texto muy cerca de la cámara y usas una fuente grande, el movimiento de tus ojos será imperceptible. Practica leer con entonación natural.</dd>
            </div>
            <div>
                <dt className="font-bold text-white">¿Puedo grabar la reunión?</dt>
                <dd className="text-slate-300">¡Sí! El teleprompter no aparece en la grabación de Zoom/Teams, a menos que estés grabando la captura total de tu pantalla en lugar de solo la cámara.</dd>
            </div>
        </dl>
    </>
);
