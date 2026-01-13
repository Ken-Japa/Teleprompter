import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { SEOContentHowTo } from "../../../../components/seo/SEOContentHowTo";

export const TeleprompterIphoneIpadES = () => (
    <>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Teleprompter para iPad y iPhone: Transforma tu Dispositivo en un Estudio Profesional
        </h2>

        <p className="lead text-xl text-slate-300 mb-8 font-medium">
            El iPad es, sin duda, la mejor herramienta física para un teleprompter. Su pantalla retina de alta definición y tamaño generoso son ideales para una lectura clara, incluso desde varios metros. Pero ¿por qué pagar suscripciones costosas de la App Store cuando puedes obtener el mejor rendimiento gratis?
        </p>

        <p className="text-slate-300 mb-8 leading-relaxed">
            En esta guía, aprenderás cómo configurar <strong>PromptNinja</strong> en tu iPad para una experiencia de estudio de TV. Descubre cómo ahorrar cientos de dólares dejando las apps "freemium" limitadas y adoptando nuestra tecnología Web App. Te mostraremos cómo sincronizar tu iPhone como control remoto P2P, configurar el modo espejo para equipos profesionales, y asegurar que nunca pierdas una línea en tus videos o presentaciones.
        </p>

        <div className="bg-blue-600/10 border border-blue-500/20 rounded-2xl p-6 md:p-8 text-center mb-12 shadow-xl">
            <h3 className="text-2xl font-bold text-white mb-4">Libera el Potencial de tu Dispositivo</h3>
            <p className="text-slate-300 mb-6 font-medium">
                El profesionalismo no tiene que ser caro. Usa el poder de nuestro teleprompter PWA
                directamente en Safari y graba como un pro hoy mismo.
            </p>
            <a href="/?lang=es#app" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all hover:scale-105 shadow-lg shadow-blue-500/25">
                Lanzar PromptNinja en iOS Ahora
            </a>
            <p className="mt-4 text-sm text-slate-400 font-medium">Sin cuenta. Funciona 100% offline.</p>
        </div>


        <div className="bg-gradient-to-r from-red-900/30 to-green-900/30 p-8 rounded-xl border border-slate-700 mb-12">
            <h3 className="text-3xl font-bold text-white mb-6">Configuración iOS: App Store vs Web App</h3>
            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-slate-900/70 p-6 rounded-lg border border-red-500/30">
                    <h3 className="font-bold text-red-400 mb-4 flex items-center gap-2">
                        <span>❌</span> Apps de App Store (Trampa Freemium)
                    </h3>
                    <ul className="space-y-3 text-slate-300 text-sm">
                        <li>💰 <strong>Precio:</strong> $9.99/semana = $520/año</li>
                        <li>⏱️ <strong>Nivel gratis:</strong> Límite de 60s (inútil)</li>
                        <li>📱 <strong>Instalación:</strong> 250MB descarga + login obligatorio</li>
                        <li>🔒 <strong>Datos:</strong> Guiones enviados a su nube</li>
                        <li>💾 <strong>Almacenamiento:</strong> Ocupa 500MB-1GB iPhone</li>
                    </ul>
                </div>
                <div className="bg-slate-900/70 p-6 rounded-lg border border-green-500/30">
                    <h3 className="font-bold text-green-400 mb-4 flex items-center gap-2">
                        <span>✅</span> PromptNinja (PWA Web App)
                    </h3>
                    <ul className="space-y-3 text-slate-300 text-sm">
                        <li>💰 <strong>Precio:</strong> $0.00 (gratis ilimitado)</li>
                        <li>⏱️ <strong>Sin límites:</strong> Guiones de 50+ páginas OK</li>
                        <li>📱 <strong>"Instalación":</strong> Agregar a Inicio (2s)</li>
                        <li>🔒 <strong>Datos:</strong> 100% local (iOS localStorage)</li>
                        <li>💾 <strong>Almacenamiento:</strong> ~5MB caché (1% de una app)</li>
                    </ul>
                </div>
            </div>
            <p className="text-slate-400 text-sm mt-6 italic text-center">
                💡 Web App = ahorra $520/año + privacidad total.
            </p>
        </div>

        <h3 className="text-3xl font-bold text-white mt-12 mb-6">3 Configuraciones Profesionales en iOS</h3>
        <div className="space-y-6 mb-12">
            <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-cyan-500">
                <h3 className="text-xl font-bold text-cyan-400 mb-3">Setup #1: iPhone Solo (Vlog/TikTok)</h3>
                <p className="text-slate-300 mb-4">
                    <strong>Hardware:</strong> iPhone con trípode/gimbal.
                </p>
                <ol className="list-decimal list-inside space-y-2 text-slate-300 text-sm">
                    <li>Safari → PromptNinja.solutionkit.com.br</li>
                    <li>Compartir → <strong>Agregar a Inicio</strong> (icono aparece como app)</li>
                    <li>Pega guion, fuente 28-32px</li>
                    <li>Posiciona iPhone en trípode, cámara frontal</li>
                    <li>PromptNinja debajo de cámara frontal (lees mirando "al lente")</li>
                    <li>Graba en app de Cámara nativa (ProRes/Cinematic)</li>
                </ol>
                <p className="text-green-400 text-sm mt-3">✅ <strong>Ideal para:</strong> Historias, vlogs, reels, contenido vertical.</p>
            </div>

            <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-purple-500">
                <h3 className="text-xl font-bold text-purple-400 mb-3">Setup #2: iPad + iPhone (Dual Device PRO)</h3>
                <p className="text-slate-300 mb-4">
                    <strong>Hardware:</strong> iPad (teleprompter) + iPhone (control remoto).
                </p>
                <ol className="list-decimal list-inside space-y-2 text-slate-300 text-sm">
                    <li><strong>iPad:</strong> PromptNinja pantalla completa, poner bajo DSLR/mirrorless</li>
                    <li><strong>iPhone:</strong> Escanea QR del iPad (botón "Remoto" en PromptNinja)</li>
                    <li>iPhone se vuelve control inalámbrico instantáneo (pausa, vel, reset)</li>
                    <li>Graba con DSLR mirando al iPad = parece que miras a cámara</li>
                    <li>Manos libres durante grabación (scroll vía iPhone)</li>
                </ol>
                <p className="text-green-400 text-sm mt-3">✅ <strong>Ideal para:</strong> YouTube profesional, cursos online, corporativo.</p>
            </div>

            <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-red-500">
                <h3 className="text-xl font-bold text-red-400 mb-3">Setup #3: iPad + Mac vía AirPlay (Espejo Inalámbrico)</h3>
                <p className="text-slate-300 mb-4">
                    <strong>Hardware:</strong> MacBook + iPad + misma red WiFi.
                </p>
                <ol className="list-decimal list-inside space-y-2 text-slate-300 text-sm">
                    <li><strong>Mac:</strong> Abre PromptNinja en Safari/Chrome</li>
                    <li><strong>iPad:</strong> Centro de Control → Duplicar Pantalla → selecciona Mac</li>
                    <li>Pantalla de Mac aparece en iPad (cero lag inalámbrico)</li>
                    <li>Controla guion desde Mac, iPad solo muestra (como monitor externo)</li>
                    <li>Posiciona iPad bajo webcam de Mac</li>
                </ol>
                <p className="text-yellow-400 text-sm mt-3">⚠️ <strong>Tip Pro:</strong> O usa P2P directo (Mac = pantalla, iPhone = remoto) sin AirPlay.</p>
            </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg my-8 border-l-4 border-green-500">
            <h3 className="text-2xl font-bold text-white mb-4">PWA en iOS: App "Nativa" Sin App Store</h3>
            <p className="text-slate-300 mb-4">
                iOS tiene PWA (Progressive Web App) desde 2018. PromptNinja se vuelve "app nativa" en 3 toques:
            </p>
            <SEOContentHowTo
                title=""
                schemaTitle="Cómo Instalar Teleprompter en iPhone/iPad (PWA)"
                totalTime="PT1M"
                tools={["iPhone o iPad", "Safari"]}
                steps={[
                    {
                        title: "Paso 1: Abre en Safari",
                        text: "Accede a promptninja.solutionkit.com.br EN SAFARI (Chrome iOS no soporta PWA)."
                    },
                    {
                        title: "Paso 2: Compartir → Agregar a Inicio",
                        text: "Toca el icono Compartir (cuadrado con flecha) → 'Agregar a Inicio' → Confirmar."
                    },
                    {
                        title: "Paso 3: Abrir como App",
                        text: "El icono de PromptNinja aparece en Inicio. Abre pantalla completa, parece app nativa, funciona offline."
                    }
                ]}
            />
            <p className="text-green-400 text-sm mt-4">
                ✅ <strong>Beneficios PWA:</strong> (1) Pantalla completa sin barra Safari, (2) Funciona offline, (3) Lindo icono en Inicio, (4) Cero espacio (solo caché), (5) Auto-actualizaciones.
            </p>
        </div>

        <h3 className="text-3xl font-bold text-white mt-12 mb-6">5 Errores Fatales en iOS que Matan el Profesionalismo</h3>
        <div className="space-y-4 mb-12">
            <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-red-500">
                <h4 className="font-bold text-red-400 mb-2">Error #1: Usar Chrome iOS para PWA (No Funciona)</h4>
                <p className="text-slate-300 text-sm">
                    Abres PromptNinja en Chrome iOS. Intentas "Agregar a Inicio"... opción deshabilitada. Chrome iOS = solo envoltura de Safari SIN soporte PWA.
                    <span className="text-green-400 block mt-2">✅ <strong>Solución:</strong> USA SAFARI. Único navegador iOS con PWA real. Chrome/Firefox iOS = limitados por Apple.</span>
                </p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-red-500">
                <h4 className="font-bold text-red-400 mb-2">Error #2: iPad Muy Lejos de Cámara (Mirada de Lado)</h4>
                <p className="text-slate-300 text-sm">
                    iPad a 1 metro a la IZQUIERDA de mirrorless DSLR. Grabas mirando 60º de lado. Parece entrevista incómoda donde nunca miras al entrevistador.
                    <span className="text-green-400 block mt-2">✅ <strong>Solución:</strong> iPad DIRECTAMENTE debajo o detrás del lente. Máximo 15cm distancia. Ojos leen = parecen mirar cámara.</span>
                </p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-red-500">
                <h4 className="font-bold text-red-400 mb-2">Error #3: Brillo de Pantalla Bajo (Reflejo en Lentes Desaparece)</h4>
                <p className="text-slate-300 text-sm">
                    Brillo iPad 30% para "ahorrar batería grabando". Texto apenas visible. Acercas la cara = mala postura. O aumentas fuente = texto gigante obvio.
                    <span className="text-green-400 block mt-2">✅ <strong>Solución:</strong> Brillo 80-100% al grabar. iPad enchufado (no dependas de batería). Texto visible = postura natural.</span>
                </p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-red-500">
                <h4 className="font-bold text-red-400 mb-2">Error #4: Ignorar Modo "No Molestar" (Notificación a Mitad de Toma)</h4>
                <p className="text-slate-300 text-sm">
                    Toma perfecta de 5min. Notificación de WhatsApp TAPA el texto. Paras, pierdes línea, regrabas todo. 5min perdidos.
                    <span className="text-green-400 block mt-2">✅ <strong>Solución:</strong> SIEMPRE activa "No Molestar" antes de grabar (Centro de Control → Luna). O usa Modo Enfoque "Grabación".</span>
                </p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-red-500">
                <h4 className="font-bold text-red-400 mb-2">Error #5: Olvidar que Safari Vuelve a Pestaña Anterior (Pierde Posición)</h4>
                <p className="text-slate-300 text-sm">
                    Grabando. Safari tiene PromptNinja abierto. Deslizas accidentalmente atrás a Google. Al volver a PromptNinja... texto reseteado al inicio. Posición perdida.
                    <span className="text-green-400 block mt-2">✅ <strong>Solución:</strong> Usa PWA (Agregar a Inicio) = abre en app dedicada, NUNCA mezcla con pestañas Safari. O bloquea pantalla (Acceso Guiado).</span>
                </p>
            </div>
        </div>

        <h3 className="text-2xl font-bold text-white mt-8 mb-4">Funciones Exclusivas iOS</h3>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-2">🎥 Grabación ProRes</h3>
                <p className="text-sm text-slate-300">iPhone 13 Pro+: Graba 4K ProRes MIENTRAS lees del teleprompter. PromptNinja en fondo = cero interferencia con códec ProRes.</p>
            </div>
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-2">📱 Handoff (Continuidad)</h3>
                <p className="text-sm text-slate-300">Empieza guion en Mac. Toma iPhone. Notificación "Continuar de Mac" = abre punto EXACTO. Magia ecosistema Apple.</p>
            </div>
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-2">✈️ Modo Avión OK</h3>
                <p className="text-sm text-slate-300">PWA funciona 100% offline. Graba en avión, selva, donde sea. Solo necesita WiFi para control remoto P2P (opcional).</p>
            </div>
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-2">🎨 Amigable con Isla Dinámica</h3>
                <p className="text-sm text-slate-300">iPhone 14 Pro+: PromptNinja respeta la Dynamic Island. Texto no va debajo. El diseño se adapta automáticamente.</p>
            </div>
        </div>

        <h3 className="text-2xl font-bold text-white mt-8 mb-4">Control Remoto P2P (iPhone ↔ iPad)</h3>
        <p className="mb-4">
            Setup más popular: iPad = pantalla teleprompter, iPhone = control inalámbrico.
        </p>
        <ol className="list-decimal list-inside space-y-2 mb-6 text-slate-300">
            <li><strong>iPad:</strong> PromptNinja abierto, toca botón "Remoto" → aparece QR</li>
            <li><strong>iPhone:</strong> Cámara nativa escanea QR → abre PromptNinja en modo Remoto</li>
            <li>Dispositivos conectan vía WiFi LOCAL (P2P WebRTC)</li>
            <li>iPhone controla: Play/Pausa, Vel ↑↓, Reset, Saltar párrafo</li>
            <li>Latencia menor a 50ms (imperceptible)</li>
        </ol>
        <p className="text-yellow-400 text-sm">💡 <strong>Tip Pro:</strong> Funciona SIN internet. Solo necesita ambos en misma red WiFi (o hotspot de iPhone).</p>

        <div className="text-center bg-slate-800 p-8 rounded-lg my-10">
            <h3 className="text-3xl font-bold text-white mb-4">📱 Transforma tu iPhone/iPad Ahora</h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                Cámara PRO merece teleprompter PRO. Cero App Store, cero suscripción, cero límites.
            </p>
            <a
                href="/?lang=es#app"
                className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 font-bold py-3 px-8 rounded-full transition hover:brightness-110"
                style={{ color: 'white' }}
            >
                🚀 Abrir en Safari (Agregar a Inicio)
            </a>
            <p className="text-slate-400 mt-4 text-sm">PWA • Offline • Remoto P2P • Gratis ilimitado</p>
        </div>

        <SEOContentFAQ
            title="Preguntas Frecuentes - Usuarios iPhone/iPad"
            items={[
                {
                    question: "¿Necesito descargar app de App Store?",
                    answer: "NO. PromptNinja es Web App (PWA). Accede en Safari → 'Agregar a Inicio' = se vuelve app nativa VISUAL (pantalla completa, icono, offline). Pero técnicamente no bajaste nada de App Store. Ahorro: $520/año vs apps pagas."
                },
                {
                    question: "¿Funciona offline (sin internet)?",
                    answer: "¡SÍ! Tras cargar una vez, queda en caché iOS. Funciona en modo avión, metro, bosque. Guiones guardados en localStorage (en tu iPhone). Solo necesita internet para: (1) primera carga y (2) control remoto P2P (opcional)."
                },
                {
                    question: "¿Puedo controlar iPad usando iPhone (2 dispositivos)?",
                    answer: "¡EXACTAMENTE! Setup favorito: iPad = pantalla grande (bajo cámara DSLR), iPhone = control remoto inalámbrico (en mano, bolsillo, donde sea). Escanea QR = conexión instantánea vía WiFi local. Latencia < 50ms."
                },
                {
                    question: "¿Por qué usar Safari y no Chrome iOS?",
                    answer: "Chrome/Firefox iOS = Envolturas de Safari limitadas por Apple. NO soportan PWA real (Agregar a Inicio deshabilitado). Safari = ÚNICO con PWA completa: offline, pantalla completa, notificaciones, localStorage ilimitado."
                },
                {
                    question: "¿Gasta mucha batería durante grabación larga?",
                    answer: "~5-8% batería por hora (menos que YouTube). iPhone 15 Pro (batería 3200mAh) = ~4h uso continuo. Tip Pro: Enchufa iPad si grabas >2h. 100% brillo usa más, pero texto es visible = mejor postura."
                },
                {
                    question: "¿Puedo grabar ProRes/Modo Cine MIENTRAS uso teleprompter?",
                    answer: "¡SÍ! PromptNinja corre en fondo. Graba en app Cámara nativa (ProRes, Cine, Modo Acción) mientras Safari/PWA está abierto. iOS gestiona RAM automáticamente. Probado en iPhone 13 Pro+ = cero problemas."
                },
                {
                    question: "¿Aparece texto invertido (modo espejo) para usar con vidrio DIY?",
                    answer: "¡SÍ! Configuración → Modo Espejo = texto se voltea horizontalmente. Perfecto para setup DIY: iPad detrás de vidrio semitransparente (beam splitter). Lees a través del vidrio, cámara ve tu cara SIN ver el iPad."
                },
                {
                    question: "¿Puedo usar con AirPlay (iPad → Mac/Apple TV)?",
                    answer: "SÍ pero innecesario. Mejor usa P2P directo (Mac teleprompter, iPhone remoto). AirPlay agrega ~200ms lag. P2P = menos de 50ms. Ambos misma red WiFi, pero P2P WebRTC mucho más responsivo que AirPlay Mirroring."
                }
            ]}
        />
    </>
);
