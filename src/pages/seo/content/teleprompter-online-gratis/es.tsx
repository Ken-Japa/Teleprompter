import { ROUTES_CONFIG } from "../../../../config/routes";
import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { SEOImage } from "../../../../components/seo/SEOImage";

export const TeleprompterOnlineGratisES = () => (
    <>
        <p className="lead text-xl text-slate-300 mb-8 font-medium">
            Deja de perder horas regrabando vídeos. Usa **PromptNinja**, el teleprompter online gratuito que funciona directamente en tu navegador. Sin instalaciones, sin registros y con control remoto P2P de latencia cero.
        </p>

        <p className="text-slate-300 mb-8 font-medium">
            ¿Alguna vez pasaste 3 horas intentando grabar un vídeo de 8 minutos? Empiezas a hablar, te trabas, pierdes el contacto visual con la cámara y tienes que empezar de nuevo. La frustración de saber lo que quieres decir pero trabarte en el "cómo" decirlo termina hoy.
        </p>

        <div className="bg-purple-600/10 border border-purple-500/20 rounded-2xl p-6 md:p-8 text-center mb-12">
            <h3 className="text-2xl font-bold text-white mb-4">Empieza a Grabar Como un Profesional</h3>
            <p className="text-slate-300 mb-6 font-medium">
                Únete a miles de creadores que ahorran horas de edición y regrabación
                usando nuestra tecnología de sincronización instantánea.
            </p>
            <a href="/?lang=es#app" className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full transition-all hover:scale-105 shadow-lg shadow-purple-500/25">
                Abrir Teleprompter Gratis
            </a>
            <p className="mt-4 text-sm text-slate-400 font-medium">100% Gratis · Sin Registro · Modo Espejo Incluido</p>
        </div>

        <SEOImage
            slug="teleprompter-online-gratis"
            src="teleprompter-showcase-multi-device.webp"
            alt="PromptNinja funcionando en múltiples dispositivos sincronizados"
            caption="Accede a tu teleprompter desde cualquier lugar y sincronize sus dispositivos al instante."
            width={1200}
            height={675}
            priority={true}
        />

        <SEOImage
            slug="teleprompter-online-gratis"
            src="free-online-teleprompter-devices.webp"
            alt="Diferentes dispositivos usando el teleprompter online gratuito PromptNinja"
            caption="PromptNinja se adapta perfectamente a cualquier tamaño de pantalla, garantizando la máxima legibilidad."
            width={1200}
            height={675}
        />

        <div className="bg-slate-800 p-6 rounded-lg my-8 border-l-4 border-green-500">
            <h3 className="text-2xl font-bold text-white mb-2">¿Por qué PromptNinja No Se Traba? (La Diferencia del P2P)</h3>
            <p className="text-slate-300 mb-4">
                ¿Sabes por qué la mayoría de los teleprompters se "congelan" a mitad de frase? Porque dependen de tu internet para enviar cada comando al servidor en la nube y volver. Si tu internet titubea (aunque sea por 1 segundo), el texto se congela.
            </p>
            <p className="text-slate-300">
                PromptNinja usa <strong>tecnología WebRTC (P2P)</strong>: tu celular se conecta directamente a tu laptop por Wi-Fi local. Es como si los dos dispositivos conversaran directamente, sin intermediarios. <strong>Cero dependencia de internet</strong>. ¿El resultado? Bluetooth típico tiene ~300ms de retraso. Apps tradicionales pueden tener 500-1000ms. ¿PromptNinja? <strong>Menos de 50ms</strong>. Presionas pausa, y el texto se detiene <em>instantáneamente</em>.
            </p>
        </div>

        <h3 className="text-2xl font-bold text-white mt-8 mb-4">El Dilema de las Herramientas Gratuitas (Lag y Anuncios)</h3>
        <p className="mb-4">
            Muchos teleprompters online gratuitos son, en realidad, cebos. Ocultan problemas serios que solo aparecen a la hora de grabar:
        </p>
        <ul className="list-disc pl-6 mb-6 text-slate-300 space-y-2">
            <li><strong>LAG y Congelamientos:</strong> El texto se atasca al desplazarse, haciéndote perder el ritmo y parecer amateur.</li>
            <li><strong>Anuncios Intrusivos:</strong> Pop-ups que cubren el texto justo en medio de tu mejor toma.</li>
            <li><strong>Limitaciones Artificiales:</strong> "Paga para desbloquear el control remoto" o "Paga para quitar la marca de agua".</li>
        </ul>

        <h3 className="text-2xl font-bold text-white mt-8 mb-4">Privacidad Garantizada: El Teleprompter que NUNCA Ve Tu Guion (¡Sin Login!)</h3>
        <p className="mb-6 text-slate-300">
            A diferencia de otras apps que te obligan a crear una cuenta y guardan tus guiones en la "nube" (donde pueden filtrarse o ser leídos), PromptNinja opera con <strong>Privacidad Local</strong>.
            <br /><br />
            Como no exigimos inicio de sesión, <strong>nunca enviamos tu guion a nuestros servidores</strong>. Todo el procesamiento ocurre dentro de tu navegador. Tus datos, tus reglas.
        </p>

        <div className="my-8 p-6 bg-slate-800 rounded-lg">
            <h3 className="text-2xl font-bold text-white mb-4">El Dilema del Creador de Contenido: Apps vs. Sitios Web</h3>
            <p className="mb-4">
                Al buscar un teleprompter gratuito, te enfrentas a una elección: descargar una aplicación móvil o usar un sitio web. Las aplicaciones a menudo limitan funciones clave a versiones de pago o te inundan de anuncios. Los sitios web, por otro lado, suelen ser demasiado básicos, sin funciones esenciales como un control remoto.
            </p>
            <p>
                <strong>PromptNinja resuelve este dilema.</strong> Ofrecemos las funciones avanzadas que esperarías de una aplicación premium, pero con la simplicidad y accesibilidad de una herramienta online. Y lo más importante: sin anuncios y sin necesidad de registrarse para usar las funciones principales.
            </p>
        </div>

        <h3 className="text-2xl font-bold text-white mt-8 mb-4">Tabla Comparativa: PromptNinja vs. Alternativas</h3>
        <div className="overflow-x-auto">
            <table className="min-w-full bg-slate-800 rounded-lg">
                <thead>
                    <tr className="bg-slate-700">
                        <th className="p-4 text-left">Funcionalidad</th>
                        <th className="p-4 text-center">PromptNinja</th>
                        <th className="p-4 text-center">Apps Genéricas</th>
                        <th className="p-4 text-center">Otros Sitios Online</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="p-4 border-t border-slate-700">Control Remoto</td>
                        <td className="p-4 border-t border-slate-700 text-center text-green-400">✔ Gratuito</td>
                        <td className="p-4 border-t border-slate-700 text-center text-yellow-400">✖ De pago o Limitado</td>
                        <td className="p-4 border-t border-slate-700 text-center text-red-400">✖ Inexistente</td>
                    </tr>
                    <tr>
                        <td className="p-4 border-t border-slate-700">Modo Espejo (Hardware)</td>
                        <td className="p-4 border-t border-slate-700 text-center text-green-400">✔ Gratuito</td>
                        <td className="p-4 border-t border-slate-700 text-center text-yellow-400">✖ De pago</td>
                        <td className="p-4 border-t border-slate-700 text-center text-yellow-400">✖ De pago o Limitado</td>
                    </tr>
                    <tr>
                        <td className="p-4 border-t border-slate-700">Sin Anuncios</td>
                        <td className="p-4 border-t border-slate-700 text-center text-green-400">✔ Sí</td>
                        <td className="p-4 border-t border-slate-700 text-center text-red-400">✖ No</td>
                        <td className="p-4 border-t border-slate-700 text-center text-green-400">✔ Generalmente</td>
                    </tr>
                    <tr>
                        <td className="p-4 border-t border-slate-700">Sin Instalación</td>
                        <td className="p-4 border-t border-slate-700 text-center text-green-400">✔ Sí</td>
                        <td className="p-4 border-t border-slate-700 text-center text-red-400">✖ No</td>
                        <td className="p-4 border-t border-slate-700 text-center text-green-400">✔ Sí</td>
                    </tr>
                    <tr>
                        <td className="p-4 border-t border-slate-700">Privacidad (Procesamiento Local)</td>
                        <td className="p-4 border-t border-slate-700 text-center text-green-400">✔ Sí</td>
                        <td className="p-4 border-t border-slate-700 text-center text-yellow-400">? Variable</td>
                        <td className="p-4 border-t border-slate-700 text-center text-red-400">✖ No (Servidor)</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <SEOImage
            slug="teleprompter-online-gratis"
            src="free-online-teleprompter-monitors.webp"
            alt="Configuración profesional con monitores y teleprompter online"
            caption="PromptNinja se adapta a configuraciones profesionales o amateur con la misma eficiencia."
            width={1200}
            height={675}
        />

        <h3 className="text-2xl font-bold text-white mt-8 mb-4">¿Cómo Funciona el Control Remoto Gratuito?</h3>
        <p className="mb-4">
            PromptNinja utiliza tecnología <strong>WebRTC (Peer-to-Peer)</strong> para una conexión directa y ultrarrápida entre tu computadora y tu celular. Esto significa que no hay retrasos. Tu celular se convierte en un control remoto para pausar, reanudar, y ajustar la velocidad y el tamaño del texto en tiempo real.
        </p>
        <ol className="list-decimal pl-6 mb-6 space-y-2">
            <li>Abre PromptNinja en el dispositivo que mostrará el texto (PC/Mac/Tablet).</li>
            <li>Toca el icono del control remoto para mostrar un código QR.</li>
            <li>Escanea el código QR con la cámara de tu celular.</li>
            <li>¡Listo! La conexión es instantánea. No se necesita la misma red Wi-Fi.</li>
        </ol>

        <h3 className="text-2xl font-bold text-white mt-12 mb-4">Casos Reales con Números: Antes vs Después</h3>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
                <h3 className="font-bold text-lg text-green-400 mb-3">📈 YouTuber Educativo</h3>
                <p className="text-slate-300 text-sm mb-4">
                    "Grabo clases de matemáticas. <strong>ANTES:</strong> 3h25min para grabar 1 video de 20min (23 intentos, olvidaba fórmulas). <strong>DESPUÉS:</strong> 35min por video (2 intentos). Reducción del <strong>84% en el tiempo</strong>. Ahora publico 3x/semana vs 1x antes."
                </p>
                <p className="text-slate-500 text-xs italic">— Setup: Laptop + tablet como pantalla | Ahorro: 8h40min/semana</p>
            </div>
            <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
                <h3 className="font-bold text-lg text-blue-400 mb-3">📈 Ejecutivo en Home Office</h3>
                <p className="text-slate-300 text-sm mb-4">
                    "Presentaciones Zoom para directiva. <strong>ANTES:</strong> Usaba notas, desviaba mirada 40+ veces (parecía inseguro). <strong>DESPUÉS:</strong> PromptNinja transparente sobre Zoom. 100% contacto visual. Promoción llegó 2 meses después."
                </p>
                <p className="text-slate-500 text-xs italic">— Setup: PC + celular remoto | ROI: Promoción = +$800/mes</p>
            </div>
            <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
                <h3 className="font-bold text-lg text-purple-400 mb-3">🎬 Productor de Contenido</h3>
                <p className="text-slate-300 text-sm mb-4">
                    "Grabación por lotes semanal. <strong>ANTES:</strong> 12h cada sábado memorizando + grabando 5 videos. <strong>DESPUÉS:</strong> 4h grabando 15 videos con PromptNinja (solo cambio texto). Triplicó output, ahorra <strong>8h/semana = 32h/mes</strong>."
                </p>
                <p className="text-slate-500 text-xs italic">— Setup: Monitor externo + control vocal PRO | Videos/mes: 15→60</p>
            </div>
        </div>

        <h3 className="text-2xl font-bold text-white mt-12 mb-4">5 Errores Que Matan Teleprompters Gratis (Y Cómo PromptNinja Los Evita)</h3>
        <div className="bg-gradient-to-r from-red-900/20 to-slate-900 p-8 rounded-xl border border-red-500/30 mb-12">
            <div className="space-y-5">
                <div className="bg-slate-900/50 p-5 rounded-lg border-l-4 border-red-500">
                    <h3 className="font-bold text-red-400 mb-2">❌ Error #1: Depender de Servidor Central (LAG Mortal)</h3>
                    <p className="text-slate-300 text-sm mb-3">
                        <strong>El problema:</strong> 90% de los teleprompters "gratis" envían cada comando (pausa, play, velocidad) al servidor en internet y vuelve. Si tu internet titubea 1s, el texto se congela. Dejas de hablar, pierdes el ritmo, tomas arruinadas.
                    </p>
                    <p className="text-green-400 text-sm">
                        <strong>✅ PromptNinja:</strong> Conexión P2P directa entre tus dispositivos vía Wi-Fi local. Latencia 50ms (vs 300-1000ms apps tradicionales). Tu internet puede hasta caerse - el teleprompter sigue funcionando.
                    </p>
                </div>

                <div className="bg-slate-900/50 p-5 rounded-lg border-l-4 border-red-500">
                    <h3 className="font-bold text-red-400 mb-2">❌ Error #2: "Gratis" Con Paywall Escondido</h3>
                    <p className="text-slate-300 text-sm mb-3">
                        <strong>El problema:</strong> Pruebas, te gusta, grabas 3 videos... luego descubres: "Upgrade a PRO para usar control remoto" ($9.99/mes). O "Quita marca de agua: $4.99/mes". Terminas pagando $15/mes por algo que debería ser gratis.
                    </p>
                    <p className="text-green-400 text-sm">
                        <strong>✅ PromptNinja:</strong> Control remoto, espejado, ajustes de fuente/velocidad = TODO GRATIS para siempre. Pro existe (control por voz IA), mas funcionalidades esenciales nunca serán de pago.
                    </p>
                </div>

                <div className="bg-slate-900/50 p-5 rounded-lg border-l-4 border-red-500">
                    <h3 className="font-bold text-red-400 mb-2">❌ Error #3: Anuncios a Mitad de Grabación</h3>
                    <p className="text-slate-300 text-sm mb-3">
                        <strong>El problema:</strong> Estás grabando la toma PERFECTA, de repente: POP-UP de anuncio cubriendo el texto. Regrabar todo. O peor: anuncio de video auto-play con sonido arruina grabación de audio.
                    </p>
                    <p className="text-green-400 text-sm">
                        <strong>✅ PromptNinja:</strong> Cero anuncios. Nunca. Ni pop-up, ni banner, ni video. Experiencia 100% limpia enfocada en tu grabación.
                    </p>
                </div>

                <div className="bg-slate-900/50 p-5 rounded-lg border-l-4 border-red-500">
                    <h3 className="font-bold text-red-400 mb-2">❌ Error #4: Obligar Registro (Filtración de Guiones)</h3>
                    <p className="text-slate-300 text-sm mb-3">
                        <strong>El problema:</strong> "Crea cuenta para continuar". Ahora tus guiones confidenciales (estrategias de negocio, lanzamientos no anunciados) quedan en servidor de terceros. Riesgo de filtración o uso indebido.
                    </p>
                    <p className="text-green-400 text-sm">
                        <strong>✅ PromptNinja:</strong> SIN registro obligatorio. Todo el texto procesado localmente en TU navegador. Nunca enviado a nuestro servidor. Cierras pestaña = texto eliminado. Privacidad total.
                    </p>
                </div>

                <div className="bg-slate-900/50 p-5 rounded-lg border-l-4 border-red-500">
                    <h3 className="font-bold text-red-400 mb-2">❌ Error #5: Funciona SOLO Desktop O SOLO Móvil</h3>
                    <p className="text-slate-300 text-sm mb-3">
                        <strong>El problema:</strong> Apps de celular no funcionan bien para YouTube (pantalla pequeña). Sitios desktop no funcionan para TikTok (sin modo vertical). Necesitas 2 herramientas separadas.
                    </p>
                    <p className="text-green-400 text-sm">
                        <strong>✅ PromptNinja:</strong> Web responsivo. Abres en desktop = layout horizontal perfecto para YouTube. Abres en celular vertical = interfaz optimizada para Shorts/Reels. UNA herramienta, todos los formatos.
                    </p>
                </div>
            </div>
        </div>

        <SEOContentFAQ
            title="Preguntas Frecuentes (FAQ)"
            items={[
                {
                    question: "¿Mis guiones están seguros?",
                    answer: "Absolutamente. A diferencia de otros sitios que suben tu texto a un servidor, PromptNinja procesa todo localmente en tu navegador. Tu guion nunca sale de tu dispositivo, garantizando total privacidad."
                },
                {
                    question: "¿Necesito crear una cuenta?",
                    answer: "No. Puedes usar todas las funciones gratuitas, incluido el control remoto y el modo espejo, sin necesidad de registrarte. Una cuenta solo es necesaria para la versión Pro, que incluye control por voz y guardado de guiones en la nube."
                },
                {
                    question: "¿Funciona en cualquier dispositivo?",
                    answer: "Sí. PromptNinja es compatible con todos los navegadores modernos en Windows, macOS, Linux, Android e iOS. Solo necesitas una conexión a internet para acceder al sitio."
                }
            ]}
        />
        <div className="bg-slate-800 p-6 rounded-lg mt-8 mb-8">
            <h3 className="text-xl font-bold text-white mb-3">Ver También</h3>
            <ul className="space-y-2">
                <li>
                    <a href={ROUTES_CONFIG.SEO_ZOOM.paths.es} className="text-purple-400 hover:text-purple-300 underline flex items-center">
                        <span className="mr-2">🔍</span>
                        Teleprompter para Zoom y Teams
                    </a>
                </li>
                <li>
                    <a href={ROUTES_CONFIG.SEO_MELHOR_APP.paths.es} className="text-purple-400 hover:text-purple-300 underline flex items-center">
                        <span className="mr-2">⭐</span>
                        Mejor App de Teleprompter (Comparativa)
                    </a>
                </li>
                <li>
                    <a href={ROUTES_CONFIG.SEO_DIY.paths.es} className="text-purple-400 hover:text-purple-300 underline flex items-center">
                        <span className="mr-2">🛠️</span>
                        Teleprompter Casero: Guía DIY
                    </a>
                </li>
            </ul>
        </div>
    </>
);

