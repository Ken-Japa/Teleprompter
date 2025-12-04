export const TeleprompterCaseiroDIYES = () => (
    <>
        <h1 className="text-4xl font-bold text-white mb-6">Cómo Hacer un Teleprompter Casero: Guía DIY</h1>

        <p className="mb-6">
            Los equipos profesionales de teleprompter pueden costar miles de dólares. ¿Pero sabías que puedes montar uno en casa gastando casi nada? El principio físico es simple: el "Fantasma de Pepper".
        </p>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Lista de Materiales</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Un marco de cuadro con vidrio (o un pedazo de vidrio/acrílico transparente).</li>
            <li>Una caja de cartón o madera negra.</li>
            <li>Una tablet o monitor (para mostrar el texto).</li>
            <li>Un paño negro (para cubrir la cámara).</li>
        </ul>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">La Parte Más Importante: El Software</h2>
        <p className="mb-4">
            Después de montar la estructura física, notarás un problema: cuando colocas la tablet debajo del vidrio, el texto se refleja <strong>invertido</strong>.
        </p>
        <p className="mb-4">
            Aquí es donde entra <strong>PromptNinja</strong>. Posee una función nativa de "Modo Espejo" (Mirror Mode) que invierte el texto horizontal y verticalmente.
        </p>

        <div className="bg-slate-800 p-6 rounded-lg my-6">
            <h3 className="text-lg font-bold text-white mb-2">Paso a Paso del Software:</h3>
            <ol className="list-decimal pl-6 space-y-2 text-slate-300">
                <li>Abre PromptNinja en tu tablet/monitor.</li>
                <li>Pega tu texto.</li>
                <li>Haz clic en el icono de Configuración (engranaje).</li>
                <li>Activa la opción <strong>"Espejar Texto"</strong>.</li>
                <li>¡Coloca el dispositivo en tu estructura casera y comienza a grabar!</li>
            </ol>
        </div>

        <p className="mb-6">
            No necesitas gastar en software costoso después de ahorrar en hardware. PromptNinja es gratis y resuelve la parte técnica para tu proyecto DIY.
        </p>
    </>
);
