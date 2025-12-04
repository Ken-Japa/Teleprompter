export const TeleprompterTravandoSolucaoES = () => (
    <>
        <h1 className="text-4xl font-bold text-white mb-6">Teleprompter Congelado: Por qué sucede y cómo solucionarlo</h1>

        <p className="mb-6">
            No hay nada peor que estar en medio de una toma perfecta y que el texto del teleprompter se congele o dé un salto brusco. Esto rompe tu ritmo y arruina el video.
        </p>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">¿Por qué se congelan las apps tradicionales?</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Uso de CPU:</strong> Las apps mal optimizadas consumen mucha batería y procesamiento.</li>
            <li><strong>Conexión Bluetooth Inestable:</strong> Muchos controles remotos bluetooth pierden conexión y causan "lags" en el desplazamiento.</li>
            <li><strong>Dependencia de Internet Lenta:</strong> Los teleprompters online antiguos dependen de servidores lentos para sincronizar.</li>
        </ul>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">La Solución P2P de PromptNinja</h2>
        <p className="mb-4">
            PromptNinja utiliza una tecnología diferente llamada WebRTC Data Channels (P2P). Esto crea un "túnel" directo entre tu móvil (control) y tu computadora (pantalla), a través de tu red Wi-Fi local.
        </p>
        <p className="mb-6">
            <strong>¿El resultado?</strong> Latencia casi cero. Cuando presionas "pausa" en tu móvil, el texto se detiene instantáneamente en la pantalla. El desplazamiento es suave (60fps) porque usamos el motor de renderizado del navegador moderno.
        </p>

        <div className="bg-slate-900 p-6 rounded border-l-4 border-red-500 mb-8">
            <h3 className="text-lg font-bold text-white mb-2">Deja de sufrir con congelamientos</h3>
            <p className="text-slate-300">
                Prueba la fluidez de PromptNinja ahora. Tus ojos (y tu audiencia) te lo agradecerán.
            </p>
        </div>
    </>
);
