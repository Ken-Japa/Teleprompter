import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { SEOContentHowTo } from "../../../../components/seo/SEOContentHowTo";
import { SEOImage } from "../../../../components/seo/SEOImage";

export const TeleprompterGamersES = () => (
    <>
        <p className="lead text-xl text-slate-300 mb-8 font-medium">
            Domina tus directos sin perder el hilo de la conversación. Con **PromptNinja**, obtienes un teleprompter ultra ligero diseñado específicamente para integrarse con OBS Studio y Twitch sin afectar tus FPS.
        </p>

        <SEOImage
            slug="teleprompter-gamers-streaming"
            src="teleprompter-gamers-streaming-setup.webp"
            alt="Teleprompter en línea para streamers y gamers"
            caption="Un teleprompter ayuda a los gamers a mantener el contacto visual con la cámara mientras leen el chat o notas."
            width={1200}
            height={675}
            priority={true}
        />

        <p className="text-slate-300 mb-8 font-medium">
            Ya sea que estés leyendo donaciones, narrando un speedrun o siguiendo un guion para un video de "React", nuestra herramienta te permite mantener la concentración en el juego mientras tu narrativa fluye de forma natural y profesional.
        </p>

        <div className="bg-green-600/10 border border-green-500/20 rounded-2xl p-6 md:p-8 text-center mb-12">
            <h3 className="text-2xl font-bold text-white mb-4">Sube de Nivel tus Transmisiones</h3>
            <p className="text-slate-300 mb-6 font-medium">
                Modo invisible "No HUD", fondo para Chroma Key y control remoto.
                Todo lo que un streamer profesional necesita, 100% gratis.
            </p>
            <a href="/?lang=es#app" className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition-all hover:scale-105 shadow-lg shadow-green-500/25" style={{ color: 'white' }}>
                Abrir Modo Gamer Gratis
            </a>
            <p className="mt-4 text-sm text-slate-400 font-medium">Consumo: ~50MB RAM · Cero Lag · Integración OBS</p>
        </div>

        <div className="bg-gradient-to-r from-red-900/30 to-green-900/30 p-8 rounded-xl border border-slate-700 mb-12">
            <h3 className="text-3xl font-bold text-white mb-6">Setup Gamer: Amateur vs PRO</h3>
            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-slate-900/70 p-6 rounded-lg border border-red-500/30">
                    <h3 className="font-bold text-red-400 mb-4 flex items-center gap-2">
                        <span>❌</span> Amateur (Métodos Improvisados)
                    </h3>
                    <ul className="space-y-3 text-slate-300 text-sm">
                        <li>🗒️ <strong>Notas:</strong> Notepad abierto (Alt-Tab = juego congela)</li>
                        <li>🎤 <strong>Mid-Stream:</strong> "Ehhh déjame ver..." (viewers notan)</li>
                        <li>📉 <strong>RAM:</strong> 12 pestañas Chrome = 2GB usado</li>
                        <li>😔 <strong>Resultado:</strong> Parece desorganizado, pierde viewers</li>
                        <li>⏱️ <strong>Eficiencia:</strong> 40% tiempo OFF-screen</li>
                    </ul>
                </div>
                <div className="bg-slate-900/70 p-6 rounded-lg border border-green-500/30">
                    <h3 className="font-bold text-green-400 mb-4 flex items-center gap-2">
                        <span>✅</span> PRO (PromptNinja Setup)
                    </h3>
                    <ul className="space-y-3 text-slate-300 text-sm">
                        <li>🗒️ <strong>Notas:</strong> Monitor secundario (cero Alt-Tab)</li>
                        <li>🎤 <strong>Mid-Stream:</strong> Lee guion SIN salir del game</li>
                        <li>🚀 <strong>RAM:</strong> ~50MB (menos que Discord)</li>
                        <li>😊 <strong>Resultado:</strong> "¡Está TAN preparado!" en chat</li>
                        <li>⏱️ <strong>Eficiencia:</strong> 98% ON-screen, flow constante</li>
                    </ul>
                </div>
            </div>
            <p className="text-slate-400 text-sm mt-6 italic text-center">
                💡 Streamer PRO = guion invisible para viewers + control manos libres.
            </p>
        </div>

        <h3 className="text-3xl font-bold text-white mt-12 mb-6">3 Configuraciones Gamer Profesionales</h3>
        <div className="space-y-6 mb-12">
            <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-cyan-500">
                <h3 className="text-xl font-bold text-cyan-400 mb-3">Setup #1: Monitor Único Speedrunner</h3>
                <p className="text-slate-300 mb-4">
                    <strong>Hardware:</strong> 1 monitor + juego pantalla completa.
                </p>
                <ol className="list-decimal list-inside space-y-2 text-slate-300 text-sm">
                    <li>Abre PromptNinja en ventana PEQUEÑA (300x200px esquina superior)</li>
                    <li>Pega notas speedrun (splits, skip tricks, safety strats)</li>
                    <li>Tecla <strong>H</strong> = esconde HUD (solo queda texto)</li>
                    <li>Ajusta opacidad 70% (ve a través del texto)</li>
                    <li>Posiciona en esquina que NO bloquea HUD del juego</li>
                    <li>Controla vía móvil (sin tocar teclado mid-run)</li>
                </ol>
                <p className="text-green-400 text-sm mt-3">✅ <strong>Ideal para:</strong> Speedruns, competitive gaming, notas rápidas.</p>
            </div>

            <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-purple-500">
                <h3 className="text-xl font-bold text-purple-400 mb-3">Setup #2: Monitor Dual Streamer</h3>
                <p className="text-slate-300 mb-4">
                    <strong>Hardware:</strong> Monitor 1 = juego, Monitor 2 = OBS/chat/teleprompter.
                </p>
                <ol className="list-decimal list-inside space-y-2 text-slate-300 text-sm">
                    <li><strong>Monitor 1:</strong> Juego pantalla completa (capturado en OBS)</li>
                    <li><strong>Monitor 2 (arriba):</strong> OBS preview</li>
                    <li><strong>Monitor 2 (medio):</strong> Chat/donaciones overlay</li>
                    <li><strong>Monitor 2 (abajo):</strong> PromptNinja con guion</li>
                    <li>Usa comando <strong>[STOP]</strong> para pausar en cada segmento</li>
                    <li>Móvil = remoto para scroll/pausa (deja en mousepad)</li>
                </ol>
                <p className="text-green-400 text-sm mt-3">✅ <strong>Ideal para:</strong> Variety streamers, just chatting, react content.</p>
            </div>

            <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-red-500">
                <h3 className="text-xl font-bold text-red-400 mb-3">Setup #3: VTuber con Chroma Key</h3>
                <p className="text-slate-300 mb-4">
                    <strong>Hardware:</strong> PC + OBS + VTuber tracking (VSeeFace/VTube Studio).
                </p>
                <ol className="list-decimal list-inside space-y-2 text-slate-300 text-sm">
                    <li>PromptNinja tema = <strong>"Chroma Green"</strong></li>
                    <li>OBS → Add Source → Window Capture (PromptNinja)</li>
                    <li>Agrega filtro "Chroma Key" (remueve fondo verde)</li>
                    <li>Posiciona texto DENTRO de escena (como subtitle profesional)</li>
                    <li>Guion aparece ON-STREAM como "caption" de lo que dices</li>
                    <li>Audiencia NO ve controles, solo texto limpio</li>
                </ol>
                <p className="text-yellow-400 text-sm mt-3">⚠️ <strong>Pro tip:</strong> Usa comandos [COUNT 3] antes de cada take para sincronizar modelo VTuber.</p>
            </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg my-8 border-l-4 border-green-500">
            <h3 className="text-2xl font-bold text-white mb-2">Modo "No HUD" (Tecla H = Interfaz Invisible)</h3>
            <p className="text-slate-300 mb-4">
                Presiona <kbd className="bg-slate-700 px-2 py-1 rounded text-white mx-1">H</kbd> y POOF: botones, scrollbars, menús = GONE. Solo queda texto flotante.
            </p>
            <SEOContentHowTo
                title=""
                schemaTitle="Cómo Activar Modo Gamer (Sin Interfaz)"
                totalTime="PT1M"
                tools={["PromptNinja", "Teclado"]}
                steps={[
                    {
                        title: "Paso 1: Abre la App",
                        text: "Accede a PromptNinja y pega tu guion."
                    },
                    {
                        title: "Paso 2: Presiona 'H'",
                        text: "Presiona tecla H = activa 'Hide HUD'. Interfaz desaparece."
                    },
                    {
                        title: "Paso 3: Ajusta Opacidad",
                        text: "ANTES de esconder HUD, ajusta opacidad ~70% para ver a través del texto durante gameplay."
                    }
                ]}
            />
            <p className="text-slate-300 mt-4">
                <strong>Perfecto para:</strong>
            </p>
            <ul className="list-disc pl-6 mt-2 text-slate-300 space-y-2">
                <li><strong>Speedrunners:</strong> Notas de skip/safety visibles sin saturar pantalla</li>
                <li><strong>React Streamers:</strong> Lee artículos/scripts sin mostrar controles</li>
                <li><strong>VTubers:</strong> Guion cerca del tracking de ojos</li>
            </ul>
        </div>

        <h3 className="text-3xl font-bold text-white mt-12 mb-6">5 Errores Fatales de Streamer (Que Matan Profesionalismo)</h3>
        <div className="space-y-4 mb-12">
            <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-red-500">
                <h4 className="font-bold text-red-400 mb-2">Error #1: Alt-Tab Durante Gameplay Intenso</h4>
                <p className="text-slate-300 text-sm">
                    Mid-teamfight ranked. Necesitas leer donación. Alt-Tab a Notepad. FPS cae de 144→30fps por 2s. Mueres. Team rage. -25 LP.
                    <span className="text-green-400 block mt-2">✅ <strong>Solución:</strong> Monitor secundario (incluso 60Hz barato) O ventana tiny en esquina de pantalla + tecla H (no HUD).</span>
                </p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-red-500">
                <h4 className="font-bold text-red-400 mb-2">Error #2: App Pesada Compitiendo con Juego</h4>
                <p className="text-slate-300 text-sm">
                    Descargas "teleprompter pro for streamers" usando 500MB RAM. Tu PC (16GB total): 6GB juego + 2GB OBS + 3GB Chrome = 11GB. +500MB = empieza swap disk. FPS inestable.
                    <span className="text-green-400 block mt-2">✅ <strong>Solución:</strong> PromptNinja usa ~50MB (verificado Task Manager). Literalmente menos que Spotify.</span>
                </p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-red-500">
                <h4 className="font-bold text-red-400 mb-2">Error #3: Texto Muy Grande (Cubre HUD del Juego)</h4>
                <p className="text-slate-300 text-sm">
                    Fuente 48px gigante. Texto cubre minimap de LoL/Dota. No ves gank llegando. Mueres. Viewers: "Ni miró el mapa".
                    <span className="text-green-400 block mt-2">✅ <strong>Solución:</strong> Fuente 24-28px + opacidad 70% + posición esquina OPUESTA a HUD crítico. Ve a través del texto.</span>
                </p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-red-500">
                <h4 className="font-bold text-red-400 mb-2">Error #4: No Usar Control Remoto (Ensucia Binds Teclado)</h4>
                <p className="text-slate-300 text-sm">
                    Bindeas Pause teleprompter en "P". Mid-game presionas P para pausar guion. Juego TAMBIÉN tiene bind en P (shop/menú). Abre ventana equivocada = mueres.
                    <span className="text-green-400 block mt-2">✅ <strong>Solución:</strong> Móvil = control dedicado. Cero conflicto con game binds. Deja al lado del mouse.</span>
                </p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-red-500">
                <h4 className="font-bold text-red-400 mb-2">Error #5: Chroma Key Mal Configurado (Verde Se Filtra)</h4>
                <p className="text-slate-300 text-sm">
                    Usas chroma green pero threshold incorrecto. Skins verdes de champions TAMBIÉN quedan transparentes en OBS. Personaje con "huecos" visibles.
                    <span className="text-green-400 block mt-2">✅ <strong>Solución:</strong> OBS Chroma Key: Similarity = 400, Smoothness = 80, Key Color Spill = 100. O usa tema "Chroma Blue" si juego tiene mucho verde.</span>
                </p>
            </div>
        </div>

        <h3 className="text-2xl font-bold text-white mt-8 mb-4">Chroma Key e Integración OBS</h3>
        <p className="mb-4">
            ¿Necesitas texto DENTRO del stream (visible para viewer)? PromptNinja tiene temas nativos Chroma Green/Blue.
        </p>
        <ol className="list-decimal list-inside space-y-2 mb-6 text-slate-300">
            <li>PromptNinja → Settings → Theme → <strong>"Chroma Green"</strong></li>
            <li>OBS → Add Source → <strong>Window Capture</strong> (selecciona PromptNinja)</li>
            <li>Right-click source → Filters → Add → <strong>"Chroma Key"</strong></li>
            <li>Ajusta Similarity ~400 hasta que fondo verde desaparezca</li>
            <li>Texto queda con fondo transparente = parece subtitle profesional</li>
        </ol>
        <p className="text-yellow-400 text-sm">💡 <strong>Pro tip:</strong> Si tu juego tiene MUCHO verde (Minecraft, Zelda), usa "Chroma Blue".</p>

        <h3 className="text-2xl font-bold text-white mt-8 mb-4">Control Sin Alt-Tab (3 Métodos)</h3>
        <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-2">📱 Móvil P2P</h3>
                <p className="text-sm text-slate-300">Escanea QR code. Móvil se convierte en Stream Deck gratis. Pause/play/speed al lado del mouse. Cero lag (WiFi local).</p>
            </div>
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-2">⌨️ Hotkeys Globales</h3>
                <p className="text-sm text-slate-300">Flechas ↑↓ = velocidad. Espacio = pause/play. Funciona INCLUSO con juego fullscreen (no necesita focar ventana).</p>
            </div>
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-2">🗒️ Comandos Texto</h3>
                <p className="text-sm text-slate-300">[STOP] = pausa automática. [COUNT 3] = countdown. Ideal para segmentar guion entre boss fights.</p>
            </div>
        </div>

        <div className="text-center bg-slate-800 p-8 rounded-lg my-10">
            <h3 className="text-3xl font-bold text-white mb-4">🎮 Sube de Nivel Tu Stream</h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                Streamer PRO = guion invisible + cero lag + control manos libres. Todo lo que necesitas, nada que no necesites.
            </p>
            <a
                href="/?lang=es#app"
                className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 font-bold py-3 px-8 rounded-full transition hover:brightness-110"
                style={{ color: 'white' }}
            >
                🚀 Abrir Modo Gamer (Gratis)
            </a>
            <p className="text-slate-400 mt-4 text-sm">~50MB RAM • Chroma key nativo • Control P2P</p>
        </div>

        <SEOContentFAQ
            title="Preguntas Frecuentes - Streamers & Gamers"
            items={[
                {
                    question: "¿Funciona con OBS y Streamlabs?",
                    answer: "¡SÍ! Dos opciones: (1) Window Capture para mostrar texto EN stream (usa tema Chroma Key = fondo transparente) O (2) ventana en monitor secundario invisible para viewer (uso personal). Ambos zerolag."
                },
                {
                    question: "¿Puedo controlar texto sin Alt-Tab (salir del juego)?",
                    answer: "ABSOLUTAMENTE. 3 métodos: (1) Móvil vía P2P (mejor - manos libres), (2) Hotkeys globales (Flechas/Espacio funcionan INCLUSO en fullscreen), (3) Comandos texto [STOP] para pausa automática."
                },
                {
                    question: "¿Consume mucha CPU/GPU? ¿Lagueará mi juego?",
                    answer: "NO. ~50MB RAM (menos que Discord/Spotify). GPU usage <1% (solo renderiza texto). Probado: CS2 300fps + OBS 1080p60 + PromptNinja = cero caídas de frame (Ryzen 5 + RTX 3060)."
                },
                {
                    question: "¿Puedo usar en Monitor Único sin cubrir juego?",
                    answer: "SÍ. Ventana pequeña (300x200px) en esquina + tecla H (esconder UI) + opacidad 70% = ve A TRAVÉS del texto. Posiciona en esquina sin HUD importante. Speedrunners usan así."
                },
                {
                    question: "¿Cómo hago Chroma Key sin filtrar verde del juego?",
                    answer: "OBS Chroma settings: Similarity = 400, Smoothness = 80, Key Color Spill = 100. Si juego tiene MUCHO verde (Minecraft/Zelda), usa tema 'Chroma Blue'. Prueba antes del stream: pausa juego en área verde para ver si filtra."
                },
                {
                    question: "¿Funciona para VTuber? ¿Puedo mostrar texto on-stream?",
                    answer: "PERFECTO para VTuber! Modo Chroma = texto aparece como 'subtitle' profesional en stream. Audiencia ve lo que dices (tipo karaoke). Usa comando [STOP] para pausar entre frases = sincroniza con modelo VTuber."
                },
                {
                    question: "¿Móvil de control necesita cable o WiFi? ¿Tiene lag?",
                    answer: "WiFi LOCAL (P2P directo PCâ†”móvil). Lag <50ms (imperceptible). NO usa internet - funciona offline. Móvil queda al lado del mouse = control instantáneo sin quitar mano del teclado."
                },
                {
                    question: "¿Se puede script automático? Tipo 'lee línea, espera 5s, siguiente'?",
                    answer: "¡SÍ! Usa comando [WAIT 5] entre líneas. O [STOP] para pausar hasta que presiones play manual. Ideal para: (1) React content (pausa entre clips), (2) RPG narrative (pausa entre chapters), (3) Tutorial (pausa para demostrar)."
                }
            ]}
        />
    </>
);

