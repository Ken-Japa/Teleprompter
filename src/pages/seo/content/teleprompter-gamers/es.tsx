
export const TeleprompterGamersES = () => (
    <>
        <h1 className="text-4xl font-bold text-white mb-6">Teleprompter Minimalista para Gamers y Streamers</h1>

        <p className="mb-6">
            Durante una transmisión de juego, cada píxel de tu pantalla es valioso. Necesitas leer el chat, verificar notas de speedrun o seguir un guion de "lore" sin saturar tu visión con interfaces complejas. <strong>PromptNinja</strong> ofrece el modo más limpio del mercado, diseñado específicamente para quienes juegan y transmiten al mismo tiempo.
        </p>

        <p className="mb-6">
            Ya seas usuario de OBS, Twitch Studio o Streamlabs, nuestro teleprompter se adapta a tu setup, no al revés.
        </p>

        <div className="bg-slate-800 p-6 rounded-lg my-8 border-l-4 border-green-500">
            <h2 className="text-2xl font-bold text-white mb-2">Modo "No HUD" (Interfaz Invisible)</h2>
            <p className="text-slate-300">
                Presiona la tecla <kbd className="bg-slate-700 px-2 py-1 rounded text-white mx-1">H</kbd> y mira la magia suceder. Todos los botones, barras de progreso y menús desaparecen instantáneamente.
            </p>
            <p className="text-slate-300 mt-2">
                Solo queda tu texto flotando en la pantalla. Esto es perfecto para:
            </p>
            <ul className="list-disc pl-6 mt-4 text-slate-300 space-y-2">
                <li><strong>Speedrunners:</strong> Ten tus notas y "splits" visibles sin distracciones.</li>
                <li><strong>Streamers de Reacción:</strong> Lee artículos o noticias en pantalla sin que tu audiencia vea los controles del reproductor.</li>
                <li><strong>VTubers:</strong> Mantén el guion cerca de la cámara (o modelo) para mantener el contacto visual.</li>
            </ul>
        </div>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Chroma Key y Fondos Transparentes</h2>
        <p className="mb-4">
            ¿Necesitas integrar el texto directamente en tu escena de OBS? PromptNinja tiene temas nativos de <a href="/es/teleprompter-obs-studio" className="text-blue-400 hover:text-blue-300 underline">Chroma Key (Verde y Azul)</a>.
        </p>
        <p className="mb-6">
            Simplemente selecciona el tema "Chroma Green", captura la ventana en OBS y aplica el filtro de "Chroma Key". El fondo desaparece y tu texto permanece con fondo transparente, pareciendo subtítulos profesionales integrados en tu directo.
        </p>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Control Total Sin Alt-Tab</h2>
        <p className="mb-4">
            Nada rompe más la inmersión que tener que hacer Alt-Tab para pausar tu guion. Con nuestros <a href="/es/teleprompter-atajos-teclado" className="text-blue-400 hover:text-blue-300 underline">atajos de teclado globales</a> y control móvil, ordenas el texto sin salir del juego.
        </p>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-2">Móvil como "Stream Deck"</h3>
                <p className="text-sm text-slate-300">Conecta tu móvil vía código QR y úsalo como un control remoto dedicado. Mantenlo junto a tu teclado para ajustes rápidos de velocidad o para reiniciar el texto entre partidas.</p>
            </div>
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-2">Comandos de Texto</h3>
                <p className="text-sm text-slate-300">Usa comandos como <strong>[STOP]</strong> al final de cada párrafo para que el texto se pause solo, esperando que actives la siguiente parte de la historia. Ideal para juegos de rol o narrativas.</p>
            </div>
        </div>

        <div className="text-center bg-slate-800 p-8 rounded-lg my-10">
            <h2 className="text-3xl font-bold text-white mb-4">Sube de Nivel tu Stream</h2>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                Profesionaliza tu transmisión con el teleprompter hecho para quienes entienden de setups minimalistas y alto rendimiento.
            </p>
            <a
                href="https://promptninja.solutionkit.com.br/?lang=es/#app"
                className="inline-block bg-white text-slate-900 font-bold py-3 px-8 mx-auto rounded-full transition hover:bg-slate-200"
            >
                Abrir Modo Gamer
            </a>
        </div>
    </>
);
