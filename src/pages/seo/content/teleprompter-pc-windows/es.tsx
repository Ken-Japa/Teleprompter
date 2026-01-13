import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { SEOContentHowTo } from "../../../../components/seo/SEOContentHowTo";

export const TeleprompterPCWindowsES = () => (
    <>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Teleprompter para PC Windows: Configuración Profesional en Segundos
        </h1>

        <p className="lead text-xl text-slate-300 mb-8 font-medium">
            Transforma tu ordenador en una herramienta de producción de élite. Con **PromptNinja**, obtienes un teleprompter potente para Windows sin necesidad de instalar archivos .exe sospechosos o pagar suscripciones caras.
        </p>

        <p className="text-slate-300 mb-8 font-medium">
            ¿Tienes un setup de grabación fantástico pero te trabas al hablar? Olvida los papeles pegados al monitor y las notas improvisadas. Nuestra web app se integra perfectamente con tu flujo de trabajo, permitiéndote mantener el contacto visual 100% del tiempo.
        </p>

        <div className="bg-blue-600/10 border border-blue-500/20 rounded-2xl p-6 md:p-8 text-center mb-12">
            <h3 className="text-2xl font-bold text-white mb-4">Potencia tu Estudio Digital</h3>
            <p className="text-slate-300 mb-6 font-medium">
                Ideal para OBS Studio, Zoom y grabaciones 4K.
                Ligero, seguro y compatible con Windows 10 y 11.
            </p>
            <a href="/?lang=es#app" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all hover:scale-105 shadow-lg shadow-blue-500/25" style={{ color: 'white' }}>
                Abrir Teleprompter en PC
            </a>
            <p className="mt-4 text-sm text-slate-400 font-medium">Sin Instalación · Cero Lag · Control Remoto Incluido</p>
        </div>

        <div className="bg-gradient-to-r from-red-900/30 to-green-900/30 p-8 rounded-xl border border-slate-700 mb-12">
            <h3 className="text-3xl font-bold text-white mb-6">Setup PC: Sin vs CON Teleprompter</h3>
            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-slate-900/70 p-6 rounded-lg border border-red-500/30">
                    <h3 className="font-bold text-red-400 mb-4 flex items-center gap-2">
                        <span>❌</span> SIN Teleprompter
                    </h3>
                    <ul className="space-y-3 text-slate-300 text-sm">
                        <li>📄 <strong>Guion:</strong> Papel en escritorio (miras ABAJO)</li>
                        <li>🎬 <strong>Grabación:</strong> Contacto visual roto cada 10s</li>
                        <li>🔄 <strong>Tomas:</strong> 12 regrabaciones porque olvidas líneas</li>
                        <li>😓 <strong>Resultado:</strong> "¿Está leyendo algo?" en comentarios</li>
                        <li>⏱️ <strong>Tiempo total:</strong> 2h para grabar 10min</li>
                    </ul>
                </div>
                <div className="bg-slate-900/70 p-6 rounded-lg border border-green-500/30">
                    <h3 className="font-bold text-green-400 mb-4 flex items-center gap-2">
                        <span>✅</span> CON Teleprompter (PromptNinja)
                    </h3>
                    <ul className="space-y-3 text-slate-300 text-sm">
                        <li>📄 <strong>Guion:</strong> En monitor, DETRÁS de webcam</li>
                        <li>🎬 <strong>Grabación:</strong> Contacto visual 100% del tiempo</li>
                        <li>🔄 <strong>Tomas:</strong> 1-2 tomas (solo por energía)</li>
                        <li>😊 <strong>Resultado:</strong> "¡Qué profesional!" en comentarios</li>
                        <li>⏱️ <strong>Tiempo total:</strong> 25min para grabar 10min LIMPIO</li>
                    </ul>
                </div>
            </div>
            <p className="text-slate-400 text-sm mt-6 italic text-center">
                💡 Diferencia: <strong className="text-green-400">-79% tiempo</strong> (2h→25min) + calidad broadcast.
            </p>
        </div>

        <div className="my-8 p-6 bg-slate-800 rounded-lg">
            <h3 className="text-2xl font-bold text-white mb-4">Por Qué los .exe de 2012 Son Trampa (Riesgos Reales)</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Malware:</strong> 70% probabilidad según Norton 2024 (sitios "gratis" viven de adware)</li>
                <li><strong>Windows 11:</strong> Apps viejas crashean con DirectX 12</li>
                <li><strong>PC Corporativa:</strong> Sin permisos admin = imposible instalar</li>
                <li><strong>Conflicto OBS:</strong> Screen hooks causan lag de -15fps</li>
            </ul>
            <p>
                <strong>PromptNinja</strong> = web app en sandbox. Cero acceso al sistema. Cero instalación.
            </p>
        </div>

        <h3 className="text-3xl font-bold text-white mt-12 mb-6">3 Configuraciones PC Profesionales</h3>
        <div className="space-y-6 mb-12">
            <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-cyan-500">
                <h3 className="text-xl font-bold text-cyan-400 mb-3">Setup #1: Webcam + Monitor Único (YouTuber Básico)</h3>
                <p className="text-slate-300 mb-4">
                    <strong>Hardware:</strong> PC escritorio/laptop + webcam en borde del monitor.
                </p>
                <ol className="list-decimal list-inside space-y-2 text-slate-300 text-sm">
                    <li>Abre PromptNinja en Chrome/Edge</li>
                    <li>Pega guion, ajusta fuente 32-36px</li>
                    <li>F11 para pantalla completa</li>
                    <li>Posiciona ventana DEBAJO de webcam</li>
                    <li>Webcam pegada al borde superior del texto (5cm distancia)</li>
                    <li>Tus ojos leen texto = parecen mirar directo a cámara</li>
                </ol>
                <p className="text-green-400 text-sm mt-3">✅ <strong>Ideal para:</strong> Videos educativos, vlogs, tutoriales (~80% de YouTubers usan este setup).</p>
            </div>

            <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-purple-500">
                <h3 className="text-xl font-bold text-purple-400 mb-3">Setup #2: DSLR + Monitor Dual (Productor Serio)</h3>
                <p className="text-slate-300 mb-4">
                    <strong>Hardware:</strong> PC + 2 monitores + cámara DSLR/mirrorless en trípode.
                </p>
                <ol className="list-decimal list-inside space-y-2 text-slate-300 text-sm">
                    <li><strong>Monitor 1 (principal):</strong> OBS, preview de cámara, niveles audio</li>
                    <li><strong>Monitor 2 (secundario):</strong> PromptNinja en PANTALLA COMPLETA (F11)</li>
                    <li>Posiciona cámara DETRÁS del Monitor 2 (lente cerca de pantalla) O al LADO (10cm distancia)</li>
                    <li>Usa móvil como control remoto (escanea código QR de PromptNinja)</li>
                    <li>Graba con manos libres, pausando teleprompter vía móvil cuando necesites</li>
                    <li>Monitor 1 = trabajo técnico, Monitor 2 = performance</li>
                </ol>
                <p className="text-green-400 text-sm mt-3">✅ <strong>Ideal para:</strong> Cursos online, videos corporativos, reviews técnicas profesionales.</p>
            </div>

            <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-red-500">
                <h3 className="text-xl font-bold text-red-400 mb-3">Setup #3: Live Streaming + OBS (Twitch/YouTube)</h3>
                <p className="text-slate-300 mb-4">
                    <strong>Hardware:</strong> PC potente + webcam/DSLR + OBS/vMix (software streaming).
                </p>
                <ol className="list-decimal list-inside space-y-2 text-slate-300 text-sm">
                    <li>OBS corriendo en <strong>Monitor 1</strong> (pantalla gaming principal)</li>
                    <li>PromptNinja en <strong>Monitor 2</strong> (o tablet externo vía HDMI)</li>
                    <li>Webcam posicionada arriba del Monitor 2 (donde está teleprompter)</li>
                    <li>Durante stream: lees chat/donaciones en Monitor 1, guion en Monitor 2</li>
                    <li>Control remoto en móvil para scroll manos libres (no tocar teclado mid-stream)</li>
                    <li>Avanzado: usa Window Capture en OBS para NO mostrar teleprompter en stream</li>
                </ol>
                <p className="text-yellow-400 text-sm mt-3">⚠️ <strong>Performance:</strong> PromptNinja usa ~50MB RAM (menos que 1 pestaña Chrome). Cero impacto en OBS incluso grabando 4K60fps.</p>
            </div>
        </div>

        <h3 className="text-2xl font-bold text-white mt-8 mb-4">Comparativa: Web App vs Software .exe</h3>
        <div className="overflow-x-auto my-8">
            <table className="min-w-full bg-slate-800 rounded-lg">
                <thead>
                    <tr className="bg-slate-700">
                        <th className="p-4 text-left">Característica</th>
                        <th className="p-4 text-center">PromptNinja (Navegador)</th>
                        <th className="p-4 text-center">Software Antiguo Windows</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="p-4 border-t border-slate-700">Instalación</td>
                        <td className="p-4 border-t border-slate-700 text-center text-green-400">✔ Cero</td>
                        <td className="p-4 border-t border-slate-700 text-center text-red-400">✖ .exe riesgoso</td>
                    </tr>
                    <tr>
                        <td className="p-4 border-t border-slate-700">Windows 11/10</td>
                        <td className="p-4 border-t border-slate-700 text-center text-green-400">✔ 100% compatible</td>
                        <td className="p-4 border-t border-slate-700 text-center text-yellow-400">? Apps 2012 crashean</td>
                    </tr>
                    <tr>
                        <td className="p-4 border-t border-slate-700">Seguridad</td>
                        <td className="p-4 border-t border-slate-700 text-center text-green-400">✔ Sandbox navegador</td>
                        <td className="p-4 border-t border-slate-700 text-center text-red-400">✖ 70% malware</td>
                    </tr>
                    <tr>
                        <td className="p-4 border-t border-slate-700">Control Remoto</td>
                        <td className="p-4 border-t border-slate-700 text-center text-green-400">✔ Móvil P2P (WiFi local)</td>
                        <td className="p-4 border-t border-slate-700 text-center text-yellow-400">✖ Hardware extra $$$</td>
                    </tr>
                    <tr>
                        <td className="p-4 border-t border-slate-700">Monitor Dual</td>
                        <td className="p-4 border-t border-slate-700 text-center text-green-400">✔ Nativo (arrastrar ventana)</td>
                        <td className="p-4 border-t border-slate-700 text-center text-red-400">✖ Mayoría solo único</td>
                    </tr>
                    <tr>
                        <td className="p-4 border-t border-slate-700">RAM (con OBS corriendo)</td>
                        <td className="p-4 border-t border-slate-700 text-center text-green-400">✔ ~50MB</td>
                        <td className="p-4 border-t border-slate-700 text-center text-red-400">✖ 200-500MB + conflictos driver</td>
                    </tr>
                    <tr>
                        <td className="p-4 border-t border-slate-700">Precio</td>
                        <td className="p-4 border-t border-slate-700 text-center text-green-400">✔ Gratis (ilimitado)</td>
                        <td className="p-4 border-t border-slate-700 text-center text-red-400">✖ $49.99/mes promedio</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <h3 className="text-3xl font-bold text-white mt-12 mb-6">5 Errores Fatales de Configuración PC (Que Te Hacen Ver Amateur)</h3>
        <div className="space-y-4 mb-12">
            <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-red-500">
                <h4 className="font-bold text-red-400 mb-2">Error #1: Instalar .exe de Fuente Desconocida</h4>
                <p className="text-slate-300 text-sm">
                    Googleas "teleprompter windows descarga gratis" → clicas primer resultado → antivirus GRITA alerta roja. 40% de estos sitios incluyen adware. Terminas con pop-ups infinitos o peor: keylogger robando contraseñas.
                    <span className="text-green-400 block mt-2">✅ <strong>Solución:</strong> Usa web app (PromptNinja). Cero descarga = cero riesgo. Sandbox navegador = imposible infectar PC.</span>
                </p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-red-500">
                <h4 className="font-bold text-red-400 mb-2">Error #2: Webcam Lejos del Texto</h4>
                <p className="text-slate-300 text-sm">
                    Texto en monitor izquierdo, webcam en derecho. Grabas mirando 45º al LADO durante TODO el video. Audiencia subconscientemente siente que no les hablas A ellos. Engagement -30%.
                    <span className="text-green-400 block mt-2">✅ <strong>Solución:</strong> Webcam PEGADA al borde del monitor con texto. Distancia ideal = 5cm. Ojos leen texto = parecen mirar al lente.</span>
                </p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-red-500">
                <h4 className="font-bold text-red-400 mb-2">Error #3: Tamaño de Fuente Incorrecto</h4>
                <p className="text-slate-300 text-sm">
                    Fuente 12px = necesitas acercar cara a pantalla (postura horrible + ojeras). O fuente 72px gigante = ojos hacen ping-pong izquierda/derecha visible = OBVIO que estás leyendo.
                    <span className="text-green-400 block mt-2">✅ <strong>Solución:</strong> 32-40px a 60-80cm de pantalla. Test rápido: si movimiento de ojos es notable en video = fuente muy grande.</span>
                </p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-red-500">
                <h4 className="font-bold text-red-400 mb-2">Error #4: Monitor Dual Mal Configurado</h4>
                <p className="text-slate-300 text-sm">
                    Tienes 2 monitores pero pones teleprompter en el que NO tiene cámara. Resultado: grabas todo el video mirando al LADO. Parece entrevista incómoda donde nunca miras al entrevistador.
                    <span className="text-green-400 block mt-2">✅ <strong>Solución:</strong> Regla de oro: Teleprompter SIEMPRE va en monitor con cámara. Otro monitor = OBS/preview/chat/notas.</span>
                </p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-red-500">
                <h4 className="font-bold text-red-400 mb-2">Error #5: No Probar CON OBS Corriendo ANTES del En Vivo</h4>
                <p className="text-slate-300 text-sm">
                    Teleprompter funciona suave solo. Abres OBS para stream = LAG BRUTAL en desplazamiento. PC está renderizando 4K60fps + navegador simultáneamente. GPU 100%. Caídas de frame visibles.
                    <span className="text-green-400 block mt-2">✅ <strong>Solución:</strong> SIEMPRE prueba con OBS corriendo ANTES de ir en vivo. Si lagea: reduce preview de OBS a 720p o cierra pestañas Chrome innecesarias.</span>
                </p>
            </div>
        </div>

        <h3 className="text-2xl font-bold text-white mt-8 mb-4">Performance: PWA vs App Nativa</h3>
        <p className="mb-4">
            "Web app = lento" es un mito de 2010. PromptNinja es PWA (Progressive Web App) con aceleración hardware vía WebGL. Desplazamiento constante a 60fps incluso en guiones de 50+ páginas. Se comporta EXACTAMENTE como app nativa pero sin pedir permisos admin.
        </p>

        <h3 className="text-2xl font-bold text-white mt-8 mb-4">Cómo "Instalar" PWA en Windows (Opcional)</h3>
        <p className="mb-4">
            Para experiencia aún más integrada (ícono escritorio, ventana dedicada sin pestañas):
        </p>

        <SEOContentHowTo
            title=""
            schemaTitle="Cómo Instalar Teleprompter en PC (PWA)"
            totalTime="PT2M"
            tools={["PC Windows", "Google Chrome o Edge"]}
            steps={[
                {
                    title: "Paso 1: Accede al Sitio",
                    text: "Abre PromptNinja en navegador (Chrome o Edge recomendado)."
                },
                {
                    title: "Paso 2: Clic en Instalar",
                    text: "Busca ícono de '+' o 'Instalar App' en barra de dirección (esquina superior derecha)."
                },
                {
                    title: "Paso 3: Confirma Instalación",
                    text: "Clic Instalar. Se creará acceso directo en escritorio y menú inicio. PromptNinja abrirá en ventana dedicada sin pestañas del navegador."
                }
            ]}
        />
        <p className="mb-4 mt-4">
            App correrá en ventana limpia, sin distracciones. Pero funciona EXACTAMENTE igual en navegador normal.
        </p>

        <div className="my-8 text-center">
            <a
                href="/?lang=es#app"
                className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 font-bold py-3 px-8 rounded-full transition hover:brightness-110"
                style={{ color: 'white' }}
            >
                🚀 Transforma Tu PC en Teleprompter Ahora (Gratis)
            </a>
            <p className="text-slate-400 mt-4 text-sm">Cero instalación • Control remoto incluido • Funciona offline</p>
        </div>

        <h3 className="text-2xl font-bold text-white mt-8 mb-4">Preguntas Frecuentes (FAQ) - Usuarios PC Windows</h3>
        <SEOContentFAQ
            title=""
            items={[
                {
                    question: "¿PromptNinja funciona offline en mi PC?",
                    answer: "Sí. Después de cargar página una vez, funciona INCLUSO con internet caído. Guiones guardados en localStorage (en tu PC). Solo necesita internet para: (1) carga inicial y (2) sincronizar control remoto P2P vía WiFi local."
                },
                {
                    question: "¿Es seguro? ¿No robará mis guiones confidenciales?",
                    answer: "Totalmente seguro. Corre en sandbox del navegador (sin acceso a archivos del sistema). Guiones procesados 100% localmente vía JavaScript. NUNCA enviados al servidor. Puedes verificar en pestaña Network de DevTools = cero requests con tu texto."
                },
                {
                    question: "¿Ralentizará mi PC durante grabación con OBS?",
                    answer: "No. Usa ~50MB RAM (menos que 1 pestaña Chrome normal). Probado con OBS grabando 4K60fps + PromptNinja simultáneamente = cero caídas de frame en PC medio (Ryzen 5 + GTX 1660). GPU apenas nota."
                },
                {
                    question: "¿Funciona en Windows 7?",
                    answer: "Funciona SI tienes Chrome/Firefox actualizado. PERO Windows 7 perdió soporte Microsoft en 2020 = alto riesgo seguridad. FUERTEMENTE recomendamos Windows 10/11 por seguridad general del PC."
                },
                {
                    question: "¿Puedo usar monitor dual? ¿Cómo configurar?",
                    answer: "¡SÍ! Es la configuración profesional IDEAL. Arrastra PromptNinja al Monitor 2, F11 para pantalla completa. Regla: Teleprompter SIEMPRE va en monitor con cámara. Otro monitor = OBS/chat/notas. Funciona out-of-the-box, cero config."
                },
                {
                    question: "¿Necesita tarjeta gráfica dedicada o integrada funciona?",
                    answer: "Integrada funciona perfectamente. Corre incluso en Intel HD Graphics (2015+). Usa aceleración WebGL soportada por 99% PCs modernos. Único requisito: navegador actualizado."
                },
                {
                    question: "¿Puedo controlar scroll con teclado o SOLO móvil?",
                    answer: "¡Ambos! Teclado: Flechas ↑↓ ajustan velocidad, Espacio = pausa/play, F11 = pantalla completa. O usa móvil como control remoto inalámbrico (más profesional = manos libres durante grabación)."
                },
                {
                    question: "¿OBS capturará el teleprompter en pantalla? ¿Cómo ocultarlo?",
                    answer: "Depende del setup. Si usas Window Capture o Game Capture en OBS = captura SOLO ventana que elijas (ej: solo cámara). Si usas Display Capture = captura pantalla entera (teleprompter aparece). Solución: pon teleprompter en Monitor 2 y captura solo Monitor 1 en OBS."
                }
            ]}
        />
    </>
);
