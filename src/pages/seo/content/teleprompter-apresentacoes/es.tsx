import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { SEOContentHowTo } from "../../../../components/seo/SEOContentHowTo";

export const TeleprompterApresentacoesES = () => (
    <>
        <h1 className="text-4xl font-bold text-white mb-6 leading-tight">Teleprompter para Presentaciones: PowerPoint PRO Sin Memorizar</h1>

        <p className="mb-6 text-lg text-slate-300">
            Presentación trimestral. Reunión directorio. 40 slides PowerPoint. Memorizaste 80% del guion. Slide 12... blanco. "Ehhh...". 5 segundos silencio eterno. Miras notas. Pierdes credibilidad. CEO levanta ceja.
        </p>

        <p className="mb-6">
            Piensas "necesito teleprompter profesional". Googleas "teleprompter PowerPoint". Encuentras: (1) apps que SE INTEGRAN con PPT pero cuestan $299 licencia perpetua, (2) teleprompters físicos $500 (absurdo para usar 4x/año), o (3) "memorizar todo" (mes de prep).
        </p>

        <p className="mb-8">
            Esta guía muestra EXACTAMENTE cómo hacer presentaciones IMPECABLES en 10 minutos prep: teleprompter sincronizado con slides, invisible para audiencia, funciona presencial Y online (Zoom/Teams).
        </p>

        <div className="bg-gradient-to-r from-red-900/30 to-green-900/30 p-8 rounded-xl border border-slate-700 mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Presentación: Memorizar vs Teleprompter PRO</h2>
            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-slate-900/70 p-6 rounded-lg border border-red-500/30">
                    <h3 className="font-bold text-red-400 mb-4 flex items-center gap-2">
                        <span>❌</span> Método Tradicional (Memorizar)
                    </h3>
                    <ul className="space-y-3 text-slate-300 text-sm">
                        <li>📚 <strong>Prep:</strong> 2 semanas memorizando guion</li>
                        <li>🧠 <strong>Estrés:</strong> Miedo de olvidar estadística crítica</li>
                        <li>😰 <strong>Mid-presentación:</strong> Blanco en slide 15 = nervios</li>
                        <li>📄 <strong>Backup:</strong> Papel en escritorio (miras ABAJO = pierdes contacto)</li>
                        <li>⏱️ <strong>Resultado:</strong> Parece inseguro, frecuente "hummm"</li>
                    </ul>
                </div>
                <div className="bg-slate-900/70 p-6 rounded-lg border border-green-500/30">
                    <h3 className="font-bold text-green-400 mb-4 flex items-center gap-2">
                        <span>✅</span> PromptNinja + PowerPoint
                    </h3>
                    <ul className="space-y-3 text-slate-300 text-sm">
                        <li>📚 <strong>Prep:</strong> 10 minutos pegando guion</li>
                        <li>🧠 <strong>Estrés:</strong> Cero (guion siempre visible SOLO para ti)</li>
                        <li>😌 <strong>Mid-presentación:</strong> Lee fluentemente = confiado</li>
                        <li>📱 <strong>Backup:</strong> Laptop/tablet que SOLO tú ves</li>
                        <li>⏱️ <strong>Resultado:</strong> "Domina tema", cero hesitación</li>
                    </ul>
                </div>
            </div>
            <p className="text-slate-400 text-sm mt-6 italic text-center">
                💡 Teleprompter = presentador confiado SIN meses de memorización.
            </p>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">3 Setups Presentación Profesional</h2>
        <div className="space-y-6 mb-12">
            <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-cyan-500">
                <h3 className="text-xl font-bold text-cyan-400 mb-3">Setup #1: Presencial Auditorio (Sala Conferencias)</h3>
                <p className="text-slate-300 mb-4">
                    <strong>Hardware:</strong> Laptop en podio + proyector mostrando PPT.
                </p>
                <ol className="list-decimal list-inside space-y-2 text-slate-300 text-sm">
                    <li><strong>Proyector:</strong> Muestra PowerPoint fullscreen (audiencia ve slides)</li>
                    <li><strong>Laptop (tú):</strong> "Presenter View" PowerPoint en un monitor</li>
                    <li><strong>Tablet al lado:</strong> PromptNinja con guion completo</li>
                    <li>Miras audiencia, lees discretamente del tablet (al lado del laptop)</li>
                    <li>Audiencia ve: tú mirando "al frente" (en realidad leyendo tablet invisible)</li>
                    <li>Usa marcador [SLIDE X] en guion = sabes cuándo avanzar PPT</li>
                </ol>
                <p className="text-green-400 text-sm mt-3">✅ <strong>Ideal para:</strong> Pitch inversores, presentaciones directorio, keynotes.</p>
            </div>

            <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-purple-500">
                <h3 className="text-xl font-bold text-purple-400 mb-3">Setup #2: Online Zoom/Teams (Híbrido)</h3>
                <p className="text-slate-300 mb-4">
                    <strong>Hardware:</strong> PC/Mac + webcam + presentación online.
                </p>
                <ol className="list-decimal list-inside space-y-2 text-slate-300 text-sm">
                    <li><strong>Zoom:</strong> Compartir Pantalla → selecciona SOLO PowerPoint (no "Pantalla Completa")</li>
                    <li><strong>Monitor 1:</strong> PowerPoint en Presenter Mode (slides + notas privadas)</li>
                    <li><strong>Monitor 2:</strong> PromptNinja fullscreen DEBAJO de webcam</li>
                    <li>Zoom muestra: PowerPoint. Tú ves: PowerPoint + PromptNinja</li>
                    <li>Lees del teleprompter mirando "a webcam" = contacto visual perfecto</li>
                    <li>Audiencia online: solo ve slides + tu cara confiada</li>
                </ol>
                <p className="text-green-400 text-sm mt-3">✅ <strong>Ideal para:</strong> Webinars, reuniones cliente, entrenamientos corporativos online.</p>
            </div>

            <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-red-500">
                <h3 className="text-xl font-bold text-red-400 mb-3">Setup #3: Google Slides + Móvil Remoto</h3>
                <p className="text-slate-300 mb-4">
                    <strong>Hardware:</strong> Laptop + móvil (control dual).
                </p>
                <ol className="list-decimal list-inside space-y-2 text-slate-300 text-sm">
                    <li><strong>Laptop:</strong> Google Slides presentando + PromptNinja ventana lateral</li>
                    <li><strong>Móvil #1:</strong> Google Slides remoto (avanza slides)</li>
                    <li><strong>Móvil #2:</strong> PromptNinja P2P remoto (controla scroll guion)</li>
                    <li>Tú controlas: slides con mano derecha, teleprompter con izquierda</li>
                    <li>Sync perfecto: avanza slide = pausa teleprompter = explica visual</li>
                    <li>Retoma teleprompter = continua narrativa</li>
                </ol>
                <p className="text-yellow-400 text-sm mt-3">⚠️ <strong>Pro tip:</strong> Usa comando [STOP] en guion = pausa automática en cada slide.</p>
            </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg my-8 border-l-4 border-orange-500">
            <h2 className="text-2xl font-bold text-white mb-4">Técnica "Segundo Cerebro" (Slides Limpios + Guion Rico)</h2>
            <p className="text-slate-300 mb-4">
                <strong>ERROR CLÁSICO:</strong> Slides SATURADOS de texto porque tienes miedo de olvidar. Audiencia lee slide = IGNORA tu habla.
            </p>
            <p className="text-slate-300 mb-4">
                <strong>MÉTODO PRO:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-300 text-sm">
                <li><strong>Slides:</strong> SOLO imágenes/gráficos impactantes + título (máx 10 palabras)</li>
                <li><strong>PromptNinja:</strong> Guion COMPLETO con estadísticas, argumentos, transiciones</li>
                <li>Tú hablas: datos ricos del teleprompter. Audiencia ve: visual limpio slide</li>
                <li>Atención 100% en TI (no leyendo slide como robot)</li>
            </ul>
            <p className="text-green-400 text-sm mt-4">
                ✅ <strong>Resultado:</strong> Presentación estilo-TED. Slides = soporte visual. Tú = estrella.
            </p>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Cómo Sincronizar Slides con Guion</h2>
        <div className="bg-slate-800 p-6 rounded-lg my-6">
            <SEOContentHowTo
                title=""
                schemaTitle="Cómo Sincronizar Teleprompter y Slides"
                totalTime="PT5M"
                tools={["PromptNinja", "PowerPoint o Google Slides"]}
                steps={[
                    {
                        title: "Paso 1: Estructura Guion por Slide",
                        text: "Copia el texto de cada slide en el guion. Coloca [SLIDE 1] y [SLIDE 2] al principio de cada slide para saber cuándo continuar."
                    },
                    {
                        title: "Paso 2: Navegar por Slides",
                        text: "Puedes navegar a través de las diapositivas de tu guión usando los atajos de flecha: '→' para avanzar y '←' para retroceder."
                    },
                    {
                        title: "Paso 3: Usa Comandos STOP Para Pausas",
                        text: "Inserta [STOP] después de cada marcador de slide. Teleprompter pausa automático = tú explicas visual del slide antes continuar guion. O utilice el comando [PAUSE X], que le permite pausar durante X segundos."
                    },
                    {
                        title: "Paso 4: Ensayo con Timer",
                        text: "Primera run-through: marca tiempo REAL de cada slide. Ajusta guion si algún slide está muy largo/corto. Meta: +/- 15% de lo planeado."
                    }
                ]}
            />
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">5 Errores Fatales de Presentación con Teleprompt</h2>
        <div className="space-y-4 mb-12">
            <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-red-500">
                <h4 className="font-bold text-red-400 mb-2">Error #1: Compartir Pantalla ENTERA en Zoom (Expone Teleprompter)</h4>
                <p className="text-slate-300 text-sm">
                    Zoom → Compartir Pantalla → "Pantalla Completa". Audiencia VE todo: PowerPoint + PromptNinja abierto + tus pestañas Chrome. Vergonzoso.
                    <span className="text-green-400 block mt-2">✅ <strong>Solución:</strong> Comparte SOLO ventana PowerPoint. PromptNinja queda fuera del compartido = invisible para audiencia.</span>
                </p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-red-500">
                <h4 className="font-bold text-red-400 mb-2">Error #2: Guion Desincronizado con Slides (Orden Equivocado)</h4>
                <p className="text-slate-300 text-sm">
                    PowerPoint slide 10. Guion teleprompter = texto del slide 8. Hablas datos antiguos mientras slide muestra gráfico diferente. Audiencia confusa.
                    <span className="text-green-400 block mt-2">✅ <strong>Solución:</strong> SIEMPRE prueba ANTES. Avanza slides manualmente mientras lees guion = verifica sincronía. Ajusta marcadores [SLIDE X].</span>
                </p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-red-500">
                <h4 className="font-bold text-red-400 mb-2">Error #3: Leer "Como Robot" (Sin Variación Tono)</h4>
                <p className="text-slate-300 text-sm">
                    Usas teleprompter pero lees monótono como GPS. Audiencia duerme en 3min. Pareces insincero aunque sepas contenido.
                    <span className="text-green-400 block mt-2">✅ <strong>Solución:</strong> Marca ÉNFASIS en guion (MAYÚSCULAS, negrita, **destaque**). Pausa 2s en comas importantes. ENSAYA variando tono.</span>
                </p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-red-500">
                <h4 className="font-bold text-red-400 mb-2">Error #4: Laptop/Tablet Muy Lejos (Movimiento Ojos Obvio)</h4>
                <p className="text-slate-300 text-sm">
                    Teleprompter 2 metros A LA IZQUIERDA. Presentas girando cabeza 60º para leer. Audiencia SABE que estás leyendo. Pierdes credibilidad.
                    <span className="text-green-400 block mt-2">✅ <strong>Solución:</strong> Tablet/laptop MÁXIMO 30cm de donde miras naturalmente. Presencial: al lado del podio. Online: debajo webcam.</span>
                </p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-red-500">
                <h4 className="font-bold text-red-400 mb-2">Error #5: No Tener Backup si Laptop Crashea</h4>
                <p className="text-slate-300 text-sm">
                    Presentación en vivo. Laptop crashea (¿Windows update?!). Teleprompter desaparece. NO memorizaste = improvisa HORRIBLE. Cliente nota.
                    <span className="text-green-400 block mt-2">✅ <strong>Solución:</strong> PromptNinja en móvil también (sync QR code). Laptop crashea = toma móvil discreto, continúa leyendo. Audiencia ni nota.</span>
                </p>
            </div>
        </div>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Tips PowerPoint/Keynote Específicos</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-2">📊 Presenter View</h3>
                <p className="text-sm text-slate-300">PowerPoint/Keynote tiene "Presenter View": tú ves notas privadas, audiencia ve solo slides. Combina CON teleprompter = notas visuales + guion completo.</p>
            </div>
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-2">🎨 Slides Minimalistas</h3>
                <p className="text-sm text-slate-300">Con teleprompter, slides pueden tener CERO texto. Solo imágenes impactantes. Tú hablas rico del guion, visual limpio.</p>
            </div>
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-2">⏱️ Auto-Avance Slides</h3>
                <p className="text-sm text-slate-300">PowerPoint puede auto-avanzar slides cada Xmin. COMBINA con comando [WAIT Xs] en teleprompter = sincronía automática perfecta.</p>
            </div>
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-2">📱 Clicker Bluetooth</h3>
                <p className="text-sm text-slate-300">Clicker avanza PPT slides (mano derecha). Móvil controla teleprompter (mano izquierda). Control total sin tocar laptop.</p>
            </div>
        </div>

        <div className="text-center bg-slate-800 p-8 rounded-lg my-10">
            <h2 className="text-3xl font-bold text-white mb-4">🎤 Presentaciones Memorables Sin Memorizar</h2>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                Slides impactantes + guion invisible = presentador confiado que "domina tema".
            </p>
            <a
                href="https://promptninja.solutionkit.com.br"
                className="inline-block bg-gradient-to-r from-orange-500 to-red-600 font-bold py-3 px-8 rounded-full transition hover:brightness-110"
                style={{ color: 'white' }}
            >
                🚀 Prepara Presentación Ahora (Gratis)
            </a>
            <p className="text-slate-400 mt-4 text-sm">Sync con PowerPoint • Control remoto • Invisible para audiencia</p>
        </div>

        <SEOContentFAQ
            title="Preguntas Frecuentes - Presentaciones PowerPoint/Keynote"
            items={[
                {
                    question: "¿La audiencia notará que estoy leyendo de un teleprompter?",
                    answer: "NO si posicionas correcto. Online: teleprompter debajo de webcam = miras 'a cámara'. Presencial: laptop/tablet al lado del podio = mira discreto. Secreto: no FIJAR ojos en texto 100% tiempo. Mira audiencia, vuelve al texto, repite naturalmente."
                },
                {
                    question: "¿Funciona junto con PowerPoint Presenter Mode?",
                    answer: "¡PERFECTAMENTE! Presenter Mode muestra: (1) slide actual, (2) próximo slide, (3) notas privadas, (4) timer. PromptNinja = guion COMPLETO en segunda pantalla. Tienes: visual del slide + notas cortas + guion detallado. Triple backup."
                },
                {
                    question: "¿Cómo sincronizo slides con el guion del teleprompter?",
                    answer: "Usa marcadores [SLIDE 1], [SLIDE 2] en NEGRITA en guion. Cuando ves [SLIDE 5], avanzas PowerPoint manualmente (clicker o flecha). O usa comando [STOP] = teleprompter pausa, avanzas slide, retomas lectura."
                },
                {
                    question: "¿Puedo usar en reunión Zoom compartiendo pantalla?",
                    answer: "¡SÍ! Crítico: comparte SOLO ventana PowerPoint (no Pantalla Completa). PromptNinja queda abierto fuera del compartido = tú ves, audiencia NO ve. Prueba ANTES: inicia Zoom, comparte, ve preview = confirma que teleprompter está invisible."
                },
                {
                    question: "¿Necesita internet durante presentación o funciona offline?",
                    answer: "Funciona 100% OFFLINE después de cargado. Presentación auditorio sin WiFi = OK. Guion guardado localmente. Solo necesita internet si: (1) primera carga o (2) control remoto móvil (usa WiFi local pero puedes crear hotspot)."
                },
                {
                    question: "¿Cómo evito que PowerPoint auto-dim pantalla durante presentación?",
                    answer: "Windows: Settings → System → Power → Screen timeout = Never (durante presentación). Mac: System Preferences → Energy Saver → desactiva sleep. O mantén laptop enchufado = generalmente previene auto-dim."
                },
                {
                    question: "¿Puedo usar teleprompter para Q&A después de los slides?",
                    answer: "¡SÍ! Prepara sección separada guion: 'FAQ PREPARADO'. Lista 10-15 preguntas probables + respuestas. Durante Q&A: busca pregunta similar en teleprompter (Ctrl+F), lee respuesta preparada = parece improviso pero es PERFECTO."
                },
                {
                    question: "¿Y si quiero improvisar parte de la presentación (no leer todo)?",
                    answer: "Guion = GUÍA, no camisa-de-fuerza. Marca secciones [AD-LIB] donde improvisas. O usa colores: verde = lee exacto (estadísticas críticas), amarillo = parafrasea libremente. Teleprompter = seguridad, no prisión."
                }
            ]}
        />
    </>
);
