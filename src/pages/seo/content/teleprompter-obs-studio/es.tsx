import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { SEOContentHowTo } from "../../../../components/seo/SEOContentHowTo";

export const TeleprompterObsStudioES = () => (
    <>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Teleprompter para OBS Studio: Guía Completa para Streamers y Creadores de Lives
        </h2>

        <p className="lead text-xl text-slate-300 mb-8">
            Estás en vivo, intentas leer el guion en el segundo monitor, pierdes el contacto visual con la cámara por 3 segundos y BOOM — 50 personas salieron del stream. O peor: sigues haciendo Alt+Tab, rompes el flow, el chat nota que estás leyendo algo, la atmósfera muere.
        </p>

        <p className="mb-6">
            Los streamers profesionales tienen un secreto: <strong>texto flotante invisible para la audiencia, visible para ellos</strong>. Como en las noticias de TV. Mantienes el ojo en la cámara (o en el juego), lees el guion sin que nadie lo note, y parece que hablas de improviso. Esto es lo que separa 50 viewers de 500 viewers.
        </p>

        <p className="mb-8">
            PromptNinja resuelve esto. Integras directamente en OBS Studio como Browser Source, aplicas Chroma Key para remover el fondo, y controlas desde el móvil mientras estás en vivo. Cero Alt+Tab. Cero mirar al segundo monitor. <strong>Profesionalismo nivel TV.</strong>
        </p>

        <div className="bg-gradient-to-r from-red-900/30 to-purple-900/30 p-8 rounded-xl border border-purple-500/30 my-12">
            <h3 className="text-3xl font-bold text-white mb-6">El Problema del Streamer Que Lee Guiones</h3>
            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-slate-900/50 p-6 rounded-lg border border-red-500/30">
                    <h3 className="font-bold text-red-400 mb-4 flex items-center gap-2">
                        <span>❌</span> SIN Teleprompter (Improvisando o Alt+Tab)
                    </h3>
                    <ul className="space-y-3 text-slate-300 text-sm">
                        <li>🎮 <strong>Apertura del stream:</strong> Tartamudea, olvida mencionar sponsor</li>
                        <li>👀 <strong>Contacto visual:</strong> Sigue mirando al segundo monitor = parece distante</li>
                        <li>⌨️ <strong>Alt+Tab:</strong> Minimiza juego para ver guion = chat se queja</li>
                        <li>😰 <strong>Energía:</strong> Se traba a mitad de frase, pierde momentum</li>
                        <li>📊 <strong>Retención:</strong> 40-50% (gente se va cuando "desapareces")</li>
                        <li>💬 <strong>Chat:</strong> "¿Está leyendo algo?" "Parece robotizado"</li>
                    </ul>
                </div>
                <div className="bg-slate-900/50 p-6 rounded-lg border border-green-500/30">
                    <h3 className="font-bold text-green-400 mb-4 flex items-center gap-2">
                        <span>✅</span> CON PromptNinja en OBS
                    </h3>
                    <ul className="space-y-3 text-slate-300 text-sm">
                        <li>🎮 <strong>Apertura del stream:</strong> Fluida, todos los sponsors mencionados</li>
                        <li>👀 <strong>Contacto visual:</strong> 100% ojo en la cámara</li>
                        <li>⌨️ <strong>Alt+Tab:</strong> Cero. Texto queda superpuesto invisiblemente</li>
                        <li>😊 <strong>Energía:</strong> Confiado, sabe exactamente qué decir</li>
                        <li>📊 <strong>Retención:</strong> 70-85% (audiencia se queda pegada)</li>
                        <li>💬 <strong>Chat:</strong> "¡Manda mucho!" "Comunicación top"</li>
                    </ul>
                </div>
            </div>
            <p className="text-slate-400 text-sm mt-6 italic text-center">
                💡 Resultado: <strong className="text-green-400">+30% retención promedio</strong>. Más viewers = más subs = más ingresos.
            </p>
        </div>

        <h3 className="text-3xl font-bold text-white mt-12 mb-6">Por Qué PromptNinja Está Hecho Para OBS</h3>
        <p className="mb-6">
            Existen varias soluciones de teleprompter, pero la mayoría no fueron pensadas para streaming. Ve las diferencias:
        </p>

        <div className="overflow-x-auto my-8">
            <table className="w-full text-left border-collapse bg-slate-800 rounded-lg">
                <thead>
                    <tr className="bg-slate-700">
                        <th className="p-4 border border-slate-600">Función</th>
                        <th className="p-4 border border-slate-600 text-center">PromptNinja</th>
                        <th className="p-4 border border-slate-600 text-center">Soluciones Genéricas</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="p-4 border border-slate-700 font-semibold">Compatible con Browser Source</td>
                        <td className="p-4 border border-slate-700 text-center text-green-400">✔ Funciona perfectamente</td>
                        <td className="p-4 border border-slate-700 text-center text-yellow-400">~ Algunos se cuelgan o no cargan</td>
                    </tr>
                    <tr>
                        <td className="p-4 border border-slate-700 font-semibold">Temas Chroma Key</td>
                        <td className="p-4 border border-slate-700 text-center text-green-400">✔ Verde y Azul integrados</td>
                        <td className="p-4 border border-slate-700 text-center text-red-400">✖ Necesitas editar CSS manualmente</td>
                    </tr>
                    <tr>
                        <td className="p-4 border border-slate-700 font-semibold">Control Remoto (no consume ancho de banda)</td>
                        <td className="p-4 border border-slate-700 text-center text-green-400">✔ P2P vía Wi-Fi local</td>
                        <td className="p-4 border border-slate-700 text-center text-red-400">✖ Depende de internet (compite con stream)</td>
                    </tr>
                    <tr>
                        <td className="p-4 border border-slate-700 font-semibold">Transparencia Ajustable</td>
                        <td className="p-4 border border-slate-700 text-center text-green-400">✔ Slider 0-100%</td>
                        <td className="p-4 border border-slate-700 text-center text-yellow-400">~ Fijo o complicado</td>
                    </tr>
                    <tr>
                        <td className="p-4 border border-slate-700 font-semibold">Rendimiento (CPU/GPU)</td>
                        <td className="p-4 border border-slate-700 text-center text-green-400">Muy ligero (solo texto)</td>
                        <td className="p-4 border border-slate-700 text-center text-yellow-400">Varía (algunos pesados)</td>
                    </tr>
                    <tr>
                        <td className="p-4 border border-slate-700 font-semibold">Soporte Hot Keys OBS</td>
                        <td className="p-4 border border-slate-700 text-center text-green-400">✔ Vía control remoto</td>
                        <td className="p-4 border border-slate-700 text-center text-red-400">✖ Necesitas Alt+Tab</td>
                    </tr>
                    <tr>
                        <td className="p-4 border border-slate-700 font-semibold">Precio</td>
                        <td className="p-4 border border-slate-700 text-center text-green-400">Gratis</td>
                        <td className="p-4 border border-slate-700 text-center text-yellow-400">$5-15/mes</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg my-12 border-l-4 border-purple-600">
            <h3 className="text-2xl font-bold text-white mb-4">🎯 Ventajas Específicas Para Streaming</h3>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-900 p-4 rounded-lg">
                    <h4 className="font-bold text-purple-400 mb-2">⚡ Cero Impacto en Rendimiento</h4>
                    <p className="text-sm text-slate-400">PromptNinja es solo HTML + CSS. No usa rendering pesado de GPU. Tu PC ya está sudando corriendo juego + OBS + stream. Nosotros no añadimos carga.</p>
                </div>
                <div className="bg-slate-900 p-4 rounded-lg">
                    <h4 className="font-bold text-purple-400 mb-2">🎮 Funciona con Cualquier Juego</h4>
                    <p className="text-sm text-slate-400">¿Fullscreen? ¿Borderless? No importa. El teleprompter queda dentro de OBS, no necesita overlay encima del juego.</p>
                </div>
                <div className="bg-slate-900 p-4 rounded-lg">
                    <h4 className="font-bold text-purple-400 mb-2">📱 El Móvil se Vuelve Stream Deck</h4>
                    <p className="text-sm text-slate-400">Pausa/reproduce texto sin quitar mano del teclado/mouse. Ajusta velocidad durante el live sin hacer clic en nada en la PC.</p>
                </div>
                <div className="bg-slate-900 p-4 rounded-lg">
                    <h4 className="font-bold text-purple-400 mb-2">🔴 Invisible Para la Audiencia</h4>
                    <p className="text-sm text-slate-400">Monta la escena con texto SOLO para ti (monitor auxiliar) o superpón invisiblemente con Chroma Key. Tú eliges.</p>
                </div>
            </div>
        </div>

        {/* Start: NEW SECTION - NATIVE OBS CONTROL */}
        <div className="bg-brand-900/20 p-8 rounded-2xl border border-brand-500/30 my-16 shadow-2xl relative overflow-hidden group">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl group-hover:bg-brand-500/20 transition-all duration-700"></div>

            <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
                <div className="flex-1">
                    <div className="inline-flex items-center gap-2 bg-brand-500/20 text-brand-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                        Exclusivo Ninja PRO
                    </div>
                    <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
                        Integración Nativa <span className="text-brand-400">Direct-Connect</span>
                    </h3>
                    <p className="text-slate-300 text-lg leading-relaxed mb-6">
                        A diferencia de las soluciones básicas que son solo una "ayuda de texto", PromptNinja se conecta <strong className="text-white">directamente a tu OBS Studio</strong> vía WebSocket.
                    </p>
                    <ul className="space-y-4">
                        <li className="flex gap-3">
                            <span className="text-brand-400 font-bold text-xl">🚀</span>
                            <span className="text-slate-400"><strong className="text-white">Automatización Ninja:</strong> Pulsa Play en el teleprompter y OBS comienza a grabar (o streamear) automáticamente.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-brand-400 font-bold text-xl">🔃</span>
                            <span className="text-slate-400"><strong className="text-white">Sincronización Dual:</strong> Comienza a grabar en OBS y el teleprompter inicia el desplazamiento sin que tengas que hacer nada más.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-brand-400 font-bold text-xl">🎮</span>
                            <span className="text-slate-400"><strong className="text-white">Cambio de Escenas:</strong> Cambia de escenas en OBS directamente desde el panel de PromptNinja (o mediante el control remoto en tu móvil).</span>
                        </li>
                    </ul>
                </div>
                <div className="w-full md:w-72 aspect-square bg-slate-900 rounded-3xl border border-white/5 flex items-center justify-center p-6 shadow-inner relative">
                    <div className="absolute inset-4 border-2 border-dashed border-brand-500/20 rounded-2xl"></div>
                    <div className="text-center">
                        <div className="text-6xl mb-2">🔌</div>
                        <p className="text-brand-400 font-black text-xl mb-1">PRO LINK</p>
                        <p className="text-slate-500 text-xs">Latencia Cero</p>
                    </div>
                </div>
            </div>
        </div>
        {/* End: NEW SECTION */}

        <SEOContentHowTo
            title="Setup Paso a Paso: PromptNinja + OBS Studio"
            schemaTitle="Cómo Integrar Teleprompter en OBS Studio"
            totalTime="PT10M"
            tools={["OBS Studio (v27+)", "PromptNinja", "Smartphone (opcional)"]}
            steps={[
                {
                    title: "Paso 1: Abrir PromptNinja y Copiar URL",
                    text: "Accede a promptninja.solutionkit.com.br, pega tu guion. Haz clic en 'Conectar Dispositivo' o 'Reflejar Pantalla' y COPIA la URL completa que aparece (tiene un ID único de tu sesión)."
                },
                {
                    title: "Paso 2: Añadir Browser Source en OBS",
                    text: "En OBS: Fuentes → Añadir → Navegador (Browser). Pega la URL que copiaste. Ancho: 1920, Alto: 1080. Marca 'Actualizar navegador cuando la escena se active'."
                },
                {
                    title: "Paso 3: Posicionar y Redimensionar",
                    text: "Arrastra la fuente a la posición deseada (generalmente debajo de la webcam o superposición suave). Redimensiona manteniendo Shift (mantiene proporción). Ajusta opacidad haciendo clic derecho → Filtros → Corrección de Color → Opacidad."
                },
                {
                    title: "Paso 4: (Opcional) Aplicar Chroma Key",
                    text: "En PromptNinja, cambia tema a 'Chroma Green'. En OBS: Clic derecho en fuente → Filtros → Añadir → Chroma Key. Selecciona color verde. Ajusta 'Similitud' hasta que desaparezca el fondo, dejando solo texto."
                },
                {
                    title: "Paso 5: Conectar Control Remoto",
                    text: "Con PromptNinja ya corriendo en OBS, abre promptninja.solutionkit.com.br en el móvil. Escanea el código QR que aparece en la pantalla de la PC. Ahora controlas el texto desde el móvil DURANTE el live."
                },
                {
                    title: "Paso 6: Probar Antes de Salir en Vivo",
                    text: "SIEMPRE prueba grabando 2min antes de salir en vivo. Verifica si el texto es visible, si Chroma Key funcionó, si el control remoto responde. Ajusta opacidad y posición según necesario."
                }
            ]}
        />

        <h3 className="text-3xl font-bold text-white mt-16 mb-6">Troubleshooting: Problemas Comunes y Soluciones</h3>

        <div className="space-y-4 mb-12">
            <div className="bg-slate-800 p-5 rounded-lg border-l-4 border-yellow-500">
                <h3 className="font-bold text-white mb-2">⚠️ Problema: La fuente del navegador no carga / Queda en blanco</h3>
                <p className="text-slate-300 text-sm mb-3">
                    <strong>Causa:</strong> URL incorrecta o navegador de OBS con caché antigua.
                </p>
                <p className="text-green-400 text-sm">
                    <strong>✅ Solución:</strong> (1) Verifica que la URL tenga el ID de sesión (formato: ?session=xxx). (2) Clic derecho en fuente → Actualizar. (3) Si persiste, elimina la fuente y añádela nuevamente copiando URL nueva de PromptNinja.
                </p>
            </div>

            <div className="bg-slate-800 p-5 rounded-lg border-l-4 border-yellow-500">
                <h3 className="font-bold text-white mb-2">⚠️ Problema: Chroma Key deja "halo" verde alrededor del texto</h3>
                <p className="text-slate-300 text-sm mb-3">
                    <strong>Causa:</strong> Suavizado antialiasing del texto crea píxeles semi-verdes.
                </p>
                <p className="text-green-400 text-sm">
                    <strong>✅ Solución:</strong> En el filtro Chroma Key de OBS, AUMENTA 'Suavidad' (Smoothness) hasta ~20-30. Reduce 'Reducción de Derrame' (Spill Reduction). Prueba hasta que desaparezca el halo.
                </p>
            </div>

            <div className="bg-slate-800 p-5 rounded-lg border-l-4 border-yellow-500">
                <h3 className="font-bold text-white mb-2">⚠️ Problema: El control remoto no responde</h3>
                <p className="text-slate-300 text-sm mb-3">
                    <strong>Causa:</strong> Móvil y PC no están en la misma red Wi-Fi local O firewall bloqueando P2P.
                </p>
                <p className="text-green-400 text-sm">
                    <strong>✅ Solución:</strong> (1) Confirma que ambos dispositivos estén en el MISMO Wi-Fi (no 4G). (2) Desactiva temporalmente el firewall de Windows para probar. (3) Si usas VPN, desconecta durante la configuración. (4) Reinicia PromptNinja y escanea código QR nuevamente.
                </p>
            </div>

            <div className="bg-slate-800 p-5 rounded-lg border-l-4 border-yellow-500">
                <h3 className="font-bold text-white mb-2">⚠️ Problema: Texto cortado en los bordes de la pantalla</h3>
                <p className="text-slate-300 text-sm mb-3">
                    <strong>Causa:</strong> Resolución de la Browser Source menor que el texto configurado.
                </p>
                <p className="text-green-400 text-sm">
                    <strong>✅ Solución:</strong> En las propiedades de Browser Source, configura Ancho: 1920 y Alto: 1080 (aunque tu pantalla sea 2K/4K). OBS redimensionará automáticamente. O aumenta márgenes en PromptNinja.
                </p>
            </div>

            <div className="bg-slate-800 p-5 rounded-lg border-l-4 border-yellow-500">
                <h3 className="font-bold text-white mb-2">⚠️ Problema: Lag / Texto se congela durante stream pesado</h3>
                <p className="text-slate-300 text-sm mb-3">
                    <strong>Causa:</strong> PC sobrecargado (juego + encoding + 50 fuentes en OBS).
                </p>
                <p className="text-green-400 text-sm">
                    <strong>✅ Solución:</strong> (1) Reduce FPS de Browser Source a 30fps (propiedades → FPS). (2) Desactiva 'Actualizar cuando no visible'. (3) Considera setup 3 (teleprompter en monitor separado fuera de OBS).
                </p>
            </div>
        </div>

        <h3 className="text-3xl font-bold text-white mt-16 mb-6">Caso Real: Streamer Duplicó Viewers Promedio con Intros Profesionales</h3>
        <div className="bg-gradient-to-r from-purple-900/20 to-indigo-900/20 p-8 rounded-xl border border-purple-500/30 mb-12">
            <p className="text-slate-300 mb-4">
                <strong className="text-purple-400">Streamer:</strong> @gamer_educativo (nombre cambiado), 1.2k seguidores Twitch, live de Valorant + tutoriales.
            </p>
            <p className="text-slate-300 mb-6">
                <strong className="text-purple-400">Problema:</strong> Las intros siempre eran improvisadas. Olvidaba mencionar horario del próximo stream, olvidaba call-to-action (follow/sub). Primera hora del stream solo tenía 20-30 viewers (pico era 80-100 después).
            </p>

            <h3 className="font-bold text-white mb-3">Cambio Implementado:</h3>
            <ol className="list-decimal pl-6 space-y-2 text-slate-300 mb-6">
                <li>Creó guion fijo de apertura (2min): bienvenida, recap stream anterior, preview de lo que pasará hoy, CTA para sub/follow</li>
                <li>Integró PromptNinja en OBS con Chroma Key debajo de la webcam (escena Just Chatting)</li>
                <li>Controlaba desde el móvil (móvil viejo como Stream Deck improvisado)</li>
                <li>La intro se volvió PROFESIONAL: confiada, estructurada, siempre menciona todo</li>
            </ol>

            <div className="bg-slate-900/50 p-6 rounded-lg">
                <h3 className="font-bold text-green-400 mb-3">Resultados en 60 Días:</h3>
                <ul className="space-y-2 text-slate-300 text-sm">
                    <li>📈 Viewers promedio: <strong>30 → 65</strong> (+117% crecimiento)</li>
                    <li>⏱️ Watch time promedio: <strong>28min → 47min</strong> (retención +68%)</li>
                    <li>💰 Nuevos subs/mes: <strong>12 → 34</strong> (mencionaba CTA en cada intro)</li>
                    <li>💬 Feedback del chat: "Stream se volvió más profesional", "Parece de canal grande"</li>
                </ul>
            </div>

            <p className="text-slate-400 text-sm mt-6 italic">
                💡 Insight: Los primeros 5 minutos definen si el viewer se queda o se va. Intro profesional = más retención = algoritmo impulsa más.
            </p>

            <p className="text-slate-500 text-xs mt-4">
                *Datos compartidos con permiso. Los resultados varían según calidad de contenido, nicho y consistencia del stream.
            </p>
        </div>

        <div className="text-center mt-12 mb-12">
            <a
                href="/?lang=es#app"
                className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 font-bold py-4 px-10 rounded-full transition hover:brightness-110 hover:scale-105 transform shadow-lg text-lg"
                style={{ color: 'white' }}
            >
                Profesionaliza Tus Lives Ahora (Gratis)
            </a>
            <p className="text-slate-400 mt-4 text-sm">La configuración toma 10 minutos. Los resultados son inmediatos.</p>
        </div>

        <SEOContentFAQ
            title="Preguntas Frecuentes: OBS Studio + Teleprompter"
            items={[
                {
                    question: "¿Cómo remuevo el fondo del texto en OBS?",
                    answer: "Dos métodos: (1) RECOMENDADO: Cambia el tema de PromptNinja a 'Chroma Green'. En OBS, añade filtro 'Chroma Key' a la fuente de navegador. El verde se vuelve transparente, solo queda el texto. (2) Alternativa: Usa tema oscuro semi-transparente y ajusta opacidad de la fuente (Filtros → Corrección de Color)."
                },
                {
                    question: "¿Funciona en Streamlabs OBS, XSplit y vMix?",
                    answer: "¡Sí! Cualquier software que acepte 'Browser Source' (Fuente de Navegador) funciona. La configuración es idéntica: añade como Browser Source, pega la URL de sesión de PromptNinja, ajusta Chroma Key si es necesario."
                },
                {
                    question: "¿El control remoto tiene delay / lag?",
                    answer: "Prácticamente cero. Usamos WebRTC que conecta móvil y PC DIRECTAMENTE vía Wi-Fi local (no pasa por internet). Latencia típica: 15-30ms, totalmente imperceptible. Incluso con stream corriendo a 6000kbps, no compite por ancho de banda."
                },
                {
                    question: "¿Puedo usar con setup de dual PC (PC de streaming separado)?",
                    answer: "Sí. Dos opciones: (1) Instala PromptNinja en la PC de gaming, controla desde móvil. (2) Instala en la PC de streaming como Browser Source, controla desde móvil. Ambos funcionan, elige qué PC tiene más recursos disponibles (generalmente la PC de streaming)."
                },
                {
                    question: "¿Impacta el rendimiento / FPS durante stream?",
                    answer: "Impacto mínimo (1-2 FPS en OBS). PromptNinja es solo HTML/CSS, no usa rendering pesado de GPU. Si tu PC ya está al límite, configura FPS de Browser Source a 30fps (vs 60fps por defecto) en propiedades."
                },
                {
                    question: "¿Puedo guardar múltiples guiones y alternar durante el live?",
                    answer: "Sí. Opción 1: Abre múltiples pestañas de PromptNinja, cada una con guion diferente, añade cada una como Browser Source separada en OBS y alterna visibilidad. Opción 2: Usa un guion largo con secciones marcadas, controla desde móvil desplazándote a la sección deseada."
                },
                {
                    question: "¿Cómo hago para que el texto solo aparezca para mí, no para el stream?",
                    answer: "Setup 3 (Multi-Monitor): Abre PromptNinja en ventana separada en el monitor secundario. NO lo añadas a OBS. Posiciona debajo de la webcam física. Solo tú lo ves, el público nunca sabe que existe."
                },
                {
                    question: "¿Necesito internet durante el live para que funcione el teleprompter?",
                    answer: "Primera vez: sí (cargar el sitio). Luego instala como PWA (acceso directo) y funciona offline. El control remoto P2P solo necesita Wi-Fi local entre móvil y PC (no necesita internet externa). Tu stream puede estar subiendo 6Mbps, el teleprompter no compite por ancho de banda."
                }
            ]}
        />

        <div className="bg-gradient-to-r from-purple-900/20 to-indigo-900/20 p-8 rounded-xl border border-purple-500/30 text-center my-12">
            <h3 className="text-3xl font-bold text-white mb-4">El Streamer Profesional Comienza Aquí</h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                Deja de improvisar intros. Deja de olvidar sponsors. Deja de mirar al segundo monitor y perder viewers. Configura una vez, usa para siempre.
            </p>
            <a
                href="/?lang=es#app"
                className="inline-block bg-gradient-to-r from-purple-500 to-indigo-500 font-bold py-4 px-10 rounded-full transition hover:brightness-110 hover:scale-105 transform shadow-lg text-lg"
                style={{ color: 'white' }}
            >
                Comenzar a Stremar Profesionalmente →
            </a>
        </div>
    </>
);
