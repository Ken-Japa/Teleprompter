import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { SEOContentHowTo } from "../../../../components/seo/SEOContentHowTo";

export const TeleprompterIphoneIpadES = () => (
    <>
        <h1 className="text-4xl font-bold text-white mb-6 leading-tight">Teleprompter para iPhone e iPad: Cero Instalación, 100% Profesional</h1>

        <p className="mb-6 text-lg text-slate-300">
            iPhone 15 Pro Max. $1200. Cámara 4K60fps ProRes. Estabilización cinematográfica. Luego grabas el video... miras al papel cada 5 segundos. Pierdes contacto visual. Audiencia siente desconexión. Cámara PRO + guion AMATEUR = desperdicio.
        </p>

        <p className="mb-6">
            Piensas "necesito app teleprompter". Abres App Store. Encuentras apps que: (1) cobran $9.99/semana ($520/año!), (2) limitan 60 segundos en tier gratis, o (3) tienen marca de agua gigante. ¿En serio? ¿Pagar más que Netflix para desplazar texto?
        </p>

        <p className="mb-8">
            Esta guía muestra EXACTAMENTE cómo transformar iPhone/iPad en teleprompter PRO en 45 segundos: cero instalación App Store, cero suscripción, funciona offline, sincroniza vía AirPlay/P2P.
        </p>

        <div className="bg-gradient-to-r from-red-900/30 to-green-900/30 p-8 rounded-xl border border-slate-700 mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Setup iOS: App Store vs Web App</h2>
            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-slate-900/70 p-6 rounded-lg border border-red-500/30">
                    <h3 className="font-bold text-red-400 mb-4 flex items-center gap-2">
                        <span>❌</span> Apps de App Store (Trampa Freemium)
                    </h3>
                    <ul className="space-y-3 text-slate-300 text-sm">
                        <li>💰 <strong>Precio:</strong> $9.99/semana = $520/año</li>
                        <li>⏱️ <strong>Tier gratis:</strong> Límite 60s texto (inútil)</li>
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
                        <li>📱 <strong>"Instalación":</strong> Add to Home Screen (2s)</li>
                        <li>🔒 <strong>Datos:</strong> 100% local (localStorage iOS)</li>
                        <li>💾 <strong>Almacenamiento:</strong> ~5MB caché (1% de una app)</li>
                    </ul>
                </div>
            </div>
            <p className="text-slate-400 text-sm mt-6 italic text-center">
                💡 Web App = ahorro $520/año + privacidad total.
            </p>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">3 Configuraciones iOS Profesionales</h2>
        <div className="space-y-6 mb-12">
            <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-cyan-500">
                <h3 className="text-xl font-bold text-cyan-400 mb-3">Setup #1: iPhone Solo (Vlog/TikTok)</h3>
                <p className="text-slate-300 mb-4">
                    <strong>Hardware:</strong> iPhone con trípode/gimbal.
                </p>
                <ol className="list-decimal list-inside space-y-2 text-slate-300 text-sm">
                    <li>Safari → PromptNinja.solutionkit.com.br</li>
                    <li>Compartir → <strong>Añadir a Pantalla de Inicio</strong> (ícono aparece como app)</li>
                    <li>Pega guion, fuente 28-32px</li>
                    <li>Posiciona iPhone en trípode, cámara frontal</li>
                    <li>PromptNinja debajo de cámara frontal (lees mirando "al lente")</li>
                    <li>Graba en app Cámara nativa (ProRes/Cinematic)</li>
                </ol>
                <p className="text-green-400 text-sm mt-3">✅ <strong>Ideal para:</strong> Stories, vlogs, reels, contenido vertical.</p>
            </div>

            <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-purple-500">
                <h3 className="text-xl font-bold text-purple-400 mb-3">Setup #2: iPad + iPhone (Dual Device PRO)</h3>
                <p className="text-slate-300 mb-4">
                    <strong>Hardware:</strong> iPad (teleprompter) + iPhone (control remoto).
                </p>
                <ol className="list-decimal list-inside space-y-2 text-slate-300 text-sm">
                    <li><strong>iPad:</strong> PromptNinja fullscreen, posiciona debajo de DSLR/mirrorless</li>
                    <li><strong>iPhone:</strong> Escanea código QR del iPad (botón "Remote" en PromptNinja)</li>
                    <li>iPhone se convierte en control inalámbrico instantáneo (pausa, velocidad, reset)</li>
                    <li>Graba con DSLR mirando iPad = pareces mirar a cámara</li>
                    <li>Manos libres durante grabación (scroll vía iPhone)</li>
                </ol>
                <p className="text-green-400 text-sm mt-3">✅ <strong>Ideal para:</strong> YouTube profesional, cursos online, corporativo.</p>
            </div>

            <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-red-500">
                <h3 className="text-xl font-bold text-red-400 mb-3">Setup #3: iPad + Mac vía AirPlay (Mirror Inalámbrico)</h3>
                <p className="text-slate-300 mb-4">
                    <strong>Hardware:</strong> MacBook + iPad + misma red WiFi.
                </p>
                <ol className="list-decimal list-inside space-y-2 text-slate-300 text-sm">
                    <li><strong>Mac:</strong> Abre PromptNinja en Safari/Chrome</li>
                    <li><strong>iPad:</strong> Centro de Control → Duplicar Pantalla → selecciona Mac</li>
                    <li>Pantalla Mac aparece en iPad (inalámbrico cero lag)</li>
                    <li>Controla guion desde Mac, iPad solo muestra (como monitor externo)</li>
                    <li>Posiciona iPad debajo de webcam Mac</li>
                </ol>
                <p className="text-yellow-400 text-sm mt-3">⚠️ <strong>Pro tip:</strong> O usa P2P directo (Mac = display, iPhone = remoto) sin AirPlay.</p>
            </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg my-8 border-l-4 border-green-500">
            <h2 className="text-2xl font-bold text-white mb-4">PWA en iOS: App "Nativa" Sin App Store</h2>
            <p className="text-slate-300 mb-4">
                iOS tiene PWA (Progressive Web App) desde 2018. PromptNinja se convierte en "app nativa" en 3 taps:
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
                        title: "Paso 2: Compartir → Añadir a Pantalla de Inicio",
                        text: "Toca ícono Compartir (cuadrado con flecha) → 'Añadir a Pantalla de Inicio' → Confirma."
                    },
                    {
                        title: "Paso 3: Abre como App",
                        text: "Ícono PromptNinja aparece en Pantalla de Inicio. Abre en fullscreen, parece app nativa, funciona offline."
                    }
                ]}
            />
            <p className="text-green-400 text-sm mt-4">
                ✅ <strong>Beneficios PWA:</strong> (1) Fullscreen sin barra Safari, (2) Funciona offline, (3) Ícono bonito en Inicio, (4) Cero espacio (solo caché), (5) Actualiza automático.
            </p>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">5 Errores Fatales iOS Que Matan Profesionalismo</h2>
        <div className="space-y-4 mb-12">
            <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-red-500">
                <h4 className="font-bold text-red-400 mb-2">Error #1: Usar Chrome iOS para PWA (No Funciona)</h4>
                <p className="text-slate-300 text-sm">
                    Abres PromptNinja en Chrome iOS. Intentas "Añadir a Pantalla de Inicio"... opción deshabilitada. Chrome iOS = solo wrapper de Safari SIN soporte PWA.
                    <span className="text-green-400 block mt-2">✅ <strong>Solución:</strong> USA SAFARI. Único navegador iOS con PWA real. Chrome/Firefox iOS = limitados por Apple.</span>
                </p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-red-500">
                <h4 className="font-bold text-red-400 mb-2">Error #2: iPad Muy Lejos de Cámara (Mirando al Lado)</h4>
                <p className="text-slate-300 text-sm">
                    iPad 1 metro a la IZQUIERDA de DSLR mirrorless. Grabas mirando 60º al lado. Parece entrevista incómoda donde nunca miras al entrevistador.
                    <span className="text-green-400 block mt-2">✅ <strong>Solución:</strong> iPad DIRECTAMENTE debajo o detrás del lente. Máximo 15cm distancia. Ojos leen = parecen mirar a cámara.</span>
                </p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-red-500">
                <h4 className="font-bold text-red-400 mb-2">Error #3: Brillo Pantalla Bajo (Reflejo en Lentes Desaparece)</h4>
                <p className="text-slate-300 text-sm">
                    Brillo iPad 30% para "ahorrar batería durante grabación". Texto casi invisible. Acercas cara = mala postura. O aumentas fuente = texto gigante obvio.
                    <span className="text-green-400 block mt-2">✅ <strong>Solución:</strong> Brillo 80-100% durante grabación. iPad enchufado (no depende de batería). Texto visible = postura natural.</span>
                </p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-red-500">
                <h4 className="font-bold text-red-400 mb-2">Error #4: Ignorar Modo "No Molestar" (Notificación Mid-Record)</h4>
                <p className="text-slate-300 text-sm">
                    Toma perfecta de 5min. Notificación WhatsApp CUBRE el texto. Paras, pierdes línea, regraras todo. 5min desperdiciados.
                    <span className="text-green-400 block mt-2">✅ <strong>Solución:</strong> SIEMPRE activa "No Molestar" antes de grabar (Centro de Control → Luna). O usa Focus Mode "Grabación".</span>
                </p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-red-500">
                <h4 className="font-bold text-red-400 mb-2">Error #5: Olvidar Que Safari Vuelve a Pestaña Anterior (Pierde Posición)</h4>
                <p className="text-slate-300 text-sm">
                    Grabando. Safari tiene PromptNinja abierto. Accidentalmente swipe vuelve a Google. Cuando regresas a PromptNinja... texto reset al inicio. Perdiste posición.
                    <span className="text-green-400 block mt-2">✅ <strong>Solución:</strong> Usa PWA (Añadir a Pantalla de Inicio) = abre en app dedicada, NUNCA mezcla con pestañas Safari. O bloquea pantalla (Acceso Guiado).</span>
                </p>
            </div>
        </div>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Funciones Exclusivas iOS</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-2">🎥 Grabación ProRes</h3>
                <p className="text-sm text-slate-300">iPhone 13 Pro+: Graba 4K ProRes MIENTRAS lees del teleprompter. PromptNinja en segundo plano = cero interferencia con códec ProRes.</p>
            </div>
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-2">📱 Handoff (Continuity)</h3>
                <p className="text-sm text-slate-300">Empieza guion en Mac. Toma iPhone. Notificación "Continuar desde Mac" = abre EXACTO mismo punto. Magia ecosistema Apple.</p>
            </div>
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-2">✈️ Modo Avión OK</h3>
                <p className="text-sm text-slate-300">PWA funciona 100% offline. Graba en avión, bosque, anywhere. Solo necesita WiFi para control remoto P2P (opcional).</p>
            </div>
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-2">🎨 Dynamic Island Friendly</h3>
                <p className="text-sm text-slate-300">iPhone 14 Pro+: PromptNinja respeta Dynamic Island. Texto no va debajo de ella. Layout adapta automáticamente.</p>
            </div>
        </div>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Control Remoto P2P (iPhone ↔ iPad)</h2>
        <p className="mb-4">
            Setup más popular: iPad = display teleprompter, iPhone = control inalámbrico.
        </p>
        <ol className="list-decimal list-inside space-y-2 mb-6 text-slate-300">
            <li><strong>iPad:</strong> PromptNinja abierto, toca botón "Remote" → código QR aparece</li>
            <li><strong>iPhone:</strong> Cámara nativa escanea código QR → abre PromptNinja en modo Remote</li>
            <li>Dispositivos conectan vía WiFi LOCAL (P2P WebRTC)</li>
            <li>iPhone controla: Play/Pause, Speed ↑↓, Reset, Skip párrafo</li>
            <li>Latencia menos de 50ms (imperceptible)</li>
        </ol>
        <p className="text-yellow-400 text-sm">💡 <strong>Pro tip:</strong> Funciona SIN internet. Solo necesita ambos en misma red WiFi (o hotspot iPhone).</p>

        <div className="text-center bg-slate-800 p-8 rounded-lg my-10">
            <h2 className="text-3xl font-bold text-white mb-4">📱 Transforma Tu iPhone/iPad Ahora</h2>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                Cámara PRO merece teleprompter PRO. Cero App Store, cero suscripción, cero límites.
            </p>
            <a
                href="https://promptninja.solutionkit.com.br"
                className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 font-bold py-3 px-8 rounded-full transition hover:brightness-110"
                style={{ color: 'white' }}
            >
                🚀 Abrir en Safari (Añadir a Pantalla de Inicio)
            </a>
            <p className="text-slate-400 mt-4 text-sm">PWA • Offline • Control P2P • Gratis ilimitado</p>
        </div>

        <SEOContentFAQ
            title="Preguntas Frecuentes - Usuarios iPhone/iPad"
            items={[
                {
                    question: "¿Necesito descargar app de App Store?",
                    answer: "NO. PromptNinja es Web App (PWA). Accede en Safari → 'Añadir a Pantalla de Inicio' = se convierte en app VISUAL nativa (fullscreen, ícono, offline). Pero técnicamente no descargaste nada de App Store. Ahorro: $520/año vs apps pagadas."
                },
                {
                    question: "¿Funciona offline (sin internet)?",
                    answer: "¡SÍ! Después de cargar una vez, queda en caché iOS. Funciona en modo avión, metro, bosque. Guiones guardados en localStorage (en tu iPhone). Solo necesita internet para: (1) primera carga y (2) control remoto P2P (opcional)."
                },
                {
                    question: "¿Puedo controlar iPad usando iPhone (2 dispositivos)?",
                    answer: "¡EXACTO! Setup favorito: iPad = display grande (debajo de cámara DSLR), iPhone = control remoto inalámbrico (en mano, en bolsillo, anywhere). Escanea código QR = conexión instantánea vía WiFi local. Latencia menos de 50ms."
                },
                {
                    question: "¿Por qué usar Safari y no Chrome iOS?",
                    answer: "Chrome/Firefox iOS = wrappers de Safari limitados por Apple. NO soportan PWA real (Añadir a Pantalla de Inicio deshabilitado). Safari = ÚNICO con PWA completo: offline, fullscreen, notificaciones, localStorage ilimitado."
                },
                {
                    question: "¿Consume mucha batería durante grabación larga?",
                    answer: "~5-8% batería por hora (menos que YouTube). iPhone 15 Pro (batería 3200mAh) = ~4h uso continuo. Pro tip: Enchufa iPad si grabación >2h. Brillo 100% consume más, pero texto es visible = mejor postura."
                },
                {
                    question: "¿Puedo grabar ProRes/Cinematic Mode MIENTRAS uso teleprompter?",
                    answer: "¡SÍ! PromptNinja corre en segundo plano. Graba en app Cámara nativa (ProRes, Cinematic, Action Mode) mientras Safari/PWA está abierto. iOS gestiona RAM automáticamente. Probado iPhone 13 Pro+ = cero problemas."
                },
                {
                    question: "¿Texto aparece invertido (modo espejo) para usar con vidrio DIY?",
                    answer: "¡SÍ! Settings → Mirror Mode = texto espeja horizontalmente. Perfecto para setup DIY: iPad detrás de vidrio semi-transparente (beam splitter). Lees a través del vidrio, cámara ve tu cara SIN ver iPad."
                },
                {
                    question: "¿Puedo usar con AirPlay (iPad → Mac/Apple TV)?",
                    answer: "SÍ pero innecesario. Mejor usa P2P directo (Mac teleprompter, iPhone remoto). AirPlay agrega ~200ms lag. P2P = menos de 50ms. Ambos misma red WiFi, pero P2P WebRTC mucho más responsive que AirPlay Mirroring."
                }
            ]}
        />
    </>
);
