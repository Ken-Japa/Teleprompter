import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { SEOContentHowTo } from "../../../../components/seo/SEOContentHowTo";

export const TeleprompterCapCutES = () => (
    <>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Teleprompter para CapCut: Deja de Perder 3 Horas Editando Errores de Grabación
        </h1>

        <p className="lead text-xl text-slate-300 mb-8">
            Grabaste ese video perfecto. Buena iluminación, encuadre cuidado, energía al máximo. Lo importas a CapCut y... te das cuenta de que la mitad de las tomas tienen errores de texto. Trabas en las palabras, tartamudeas, olvidas la frase. Resultado? En vez de pasar 1 hora editando transiciones y efectos, pasas 3 horas CORTANDO errores.
        </p>

        <p className="mb-6">
            He pasado por eso. Grababa un video de 2 minutos, pero la línea de tiempo en CapCut tenía 15 minutos de material bruto lleno de regrabaciones. Cuando terminaba de cortar todo, mi creatividad ya se había ido. Solo quedaba energía para exportar y publicar — sin cuidar los subtítulos, sin transiciones geniales.
        </p>

        <p className="mb-8">
            El problema no es CapCut. El problema es llegar a CapCut con material MALO. La solución? Grabar con un <strong>teleprompter profesional</strong> primero. PromptNinja nació exactamente para esto: grabas de primera sin errores de texto y llegas a CapCut con una línea de tiempo limpia lista para CREAR, no para arreglar.
        </p>

        <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 p-8 rounded-xl border border-red-500/30 my-12">
            <h2 className="text-3xl font-bold text-white mb-6">El Ciclo Vicioso del Creador de Contenido</h2>
            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-slate-900/50 p-6 rounded-lg border border-red-500/30">
                    <h3 className="font-bold text-red-400 mb-4 flex items-center gap-2">
                        <span>❌</span> SIN Teleprompter
                    </h3>
                    <ul className="space-y-3 text-slate-300 text-sm">
                        <li>🎬 <strong>Grabación:</strong> 2h para grabar 3min de video (20+ tomas)</li>
                        <li>📂 <strong>Material bruto:</strong> 18min de archivo lleno de errores</li>
                        <li>✂️ <strong>Edición en CapCut:</strong> 3h cortando fallas, sincronizando cortes</li>
                        <li>😫 <strong>Creatividad:</strong> Cero. Solo quieres terminar</li>
                        <li>📊 <strong>Resultado:</strong> Video "ok", publicado sin cuidado</li>
                        <li>⏰ <strong>Tiempo total:</strong> 5h+ por video</li>
                    </ul>
                </div>
                <div className="bg-slate-900/50 p-6 rounded-lg border border-green-500/30">
                    <h3 className="font-bold text-green-400 mb-4 flex items-center gap-2">
                        <span>✅</span> CON PromptNinja
                    </h3>
                    <ul className="space-y-3 text-slate-300 text-sm">
                        <li>🎬 <strong>Grabación:</strong> 20min para grabar 3min (1-2 tomas)</li>
                        <li>📂 <strong>Material bruto:</strong> 4min de archivo limpio</li>
                        <li>✂️ <strong>Edición en CapCut:</strong> 1h creando efectos, subtítulos, transiciones</li>
                        <li>😊 <strong>Creatividad:</strong> Alta. Enfocas en lo que importa</li>
                        <li>📊 <strong>Resultado:</strong> Video profesional con tu marca</li>
                        <li>⏰ <strong>Tiempo total:</strong> 1h20min por video</li>
                    </ul>
                </div>
            </div>
            <p className="text-slate-400 text-sm mt-6 italic text-center">
                💡 Ahorro: <strong className="text-green-400">3h40min por video</strong>. Si haces 4 videos/mes, son <strong className="text-green-400">14 horas ahorradas</strong>!
            </p>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Por Qué el Teleprompter Integrado de CapCut No Es Suficiente</h2>
        <p className="mb-6">
            CapCut tiene un teleprompter nativo en la función de grabación. Parece práctico, pero tiene limitaciones críticas que impiden grabaciones profesionales:
        </p>

        <div className="overflow-x-auto my-8">
            <table className="w-full text-left border-collapse bg-slate-800 rounded-lg">
                <thead>
                    <tr className="bg-slate-700">
                        <th className="p-4 border border-slate-600">Función</th>
                        <th className="p-4 border border-slate-600 text-center">PromptNinja</th>
                        <th className="p-4 border border-slate-600 text-center">Teleprompter CapCut</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="p-4 border border-slate-700 font-semibold">Control Remoto</td>
                        <td className="p-4 border border-slate-700 text-center text-green-400">✔ Vía código QR (otro móvil)</td>
                        <td className="p-4 border border-slate-700 text-center text-red-400">✖ Toque en pantalla (imposible durante grabación)</td>
                    </tr>
                    <tr>
                        <td className="p-4 border border-slate-700 font-semibold">Ajuste de Velocidad en Tiempo Real</td>
                        <td className="p-4 border border-slate-700 text-center text-green-400">✔ Ajuste instantáneo por control</td>
                        <td className="p-4 border border-slate-700 text-center text-yellow-400">~ Necesitas pausar grabación</td>
                    </tr>
                    <tr>
                        <td className="p-4 border border-slate-700 font-semibold">Control por Voz (IA)</td>
                        <td className="p-4 border border-slate-700 text-center text-green-400">✔ El texto avanza mientras hablas</td>
                        <td className="p-4 border border-slate-700 text-center text-red-400">✖ No disponible</td>
                    </tr>
                    <tr>
                        <td className="p-4 border border-slate-700 font-semibold">Funciona con Cualquier App de Cámara</td>
                        <td className="p-4 border border-slate-700 text-center text-green-400">✔ Se ejecuta por separado (overlay)</td>
                        <td className="p-4 border border-slate-700 text-center text-red-400">✖ Solo dentro de CapCut</td>
                    </tr>
                    <tr>
                        <td className="p-4 border border-slate-700 font-semibold">Tamaño de Fuente</td>
                        <td className="p-4 border border-slate-700 text-center text-green-400">Personalizable (8px-200px)</td>
                        <td className="p-4 border border-slate-700 text-center text-yellow-400">Limitado (3 tamaños fijos)</td>
                    </tr>
                    <tr>
                        <td className="p-4 border border-slate-700 font-semibold">Funciona Sin Conexión</td>
                        <td className="p-4 border border-slate-700 text-center text-green-400">✔ PWA instalable</td>
                        <td className="p-4 border border-slate-700 text-center text-yellow-400">~ Depende de CapCut actualizado</td>
                    </tr>
                    <tr>
                        <td className="p-4 border border-slate-700 font-semibold">Precio</td>
                        <td className="p-4 border border-slate-700 text-center text-green-400">Gratis (control remoto incluido)</td>
                        <td className="p-4 border border-slate-700 text-center text-green-400">Gratis</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <p className="text-slate-400 text-sm italic mb-12">
            💡 <strong>Consejo Pro:</strong> Usa PromptNinja para grabar, pero aprovecha la app de cámara nativa del móvil en 4K (60fps). Luego importa a CapCut con la mejor calidad posible.
        </p>

        <div className="bg-slate-800 p-6 rounded-lg my-12 border-l-4 border-cyan-500">
            <h2 className="text-2xl font-bold text-white mb-4">Flujo Profesional: PromptNinja → CapCut</h2>
            <p className="text-slate-300 mb-4">
                La combinación perfecta no es elegir uno u otro. Es usar cada herramienta para lo que hace mejor:
            </p>
            <ul className="space-y-3 text-slate-300">
                <li><strong className="text-cyan-400">PromptNinja:</strong> Grabar material 100% limpio sin errores de texto</li>
                <li><strong className="text-cyan-400">CapCut:</strong> Añadir subtítulos automáticos, transiciones virales, efectos trending, música</li>
            </ul>
        </div>

        <SEOContentHowTo
            title="Paso a Paso: Grabación Perfecta para CapCut"
            schemaTitle="Cómo Usar Teleprompter con CapCut"
            totalTime="PT15M"
            tools={["PromptNinja", "Smartphone", "CapCut"]}
            steps={[
                {
                    title: "Paso 1: Escribir el Guion en PromptNinja",
                    text: "Accede a promptninja.solutionkit.com.br y pega tu texto. Ajusta el tamaño de fuente para leer cómodamente a 1 metro de distancia. Usa MAYÚSCULAS o colores para marcar palabras clave que quieres enfatizar."
                },
                {
                    title: "Paso 2: Configurar Control Remoto (Opcional pero Recomendado)",
                    text: "Haz clic en 'Conectar Dispositivo' y escanea el código QR con un segundo móvil o tablet. Esto te permite pausar/reanudar/ajustar velocidad sin tocar el móvil que está grabando."
                },
                {
                    title: "Paso 3: Posicionar el Móvil y el Teleprompter",
                    text: "Coloca el móvil que grabará en un trípode a la altura de los ojos. Abre PromptNinja en otro dispositivo (o en el mismo usando picture-in-picture si está disponible) y posiciona justo debajo o al lado de la cámara."
                },
                {
                    title: "Paso 4: Grabar con Total Concentración",
                    text: "Pulsa REC en la app de cámara nativa (no en CapCut todavía). Lee el texto naturalmente, pausando cuando sea necesario usando el control remoto. Sin prisa. Una toma perfecta vale más que 10 mediocres."
                },
                {
                    title: "Paso 5: Importar a CapCut",
                    text: "Abre CapCut, crea un nuevo proyecto e importa el video de la galería. Como no te equivocaste en el texto, tu línea de tiempo estará limpia. Ahora solo añade la magia: Auto Captions, efectos de zoom, música de fondo."
                },
                {
                    title: "Paso 6: Subtítulos Automáticos de Alta Precisión",
                    text: "Usa 'Texto → Auto Caption'. Como tu dicción fue guiada por el guion, CapCut generará subtítulos con 95%+ de precisión. Corrige las pocas palabras erróneas y aplica animaciones virales (bounce, glitch, etc)."
                }
            ]}
        />

        <h2 className="text-3xl font-bold text-white mt-16 mb-6">Caso Real: TikToker Pasó de 8h a 3h/Semana Grabando</h2>
        <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 p-8 rounded-xl border border-purple-500/30 mb-12">
            <p className="text-slate-300 mb-4">
                <strong className="text-purple-400">Perfil:</strong> Creadora de contenido educativo en TikTok (@estudiar_con_maria), 87k seguidores, publica 5 videos/semana sobre técnicas de estudio.
            </p>
            <p className="text-slate-300 mb-6">
                <strong className="text-purple-400">Problema:</strong> Gastaba 8h todos los lunes grabando los 5 videos de la semana. Como memorizaba el texto, se trababa mucho, y cada video de 60s le tomaba 1h30min para quedar "aceptable". Resultado: agotamiento, videos sin energía en las últimas tomas.
            </p>

            <h3 className="font-bold text-white mb-3">Cambios Implementados:</h3>
            <ol className="list-decimal pl-6 space-y-2 text-slate-300 mb-6">
                <li>Comenzó a escribir guiones detallados los domingos (30min para 5 videos)</li>
                <li>Lunes: abre PromptNinja en tablet, lo coloca detrás del móvil</li>
                <li>Graba los 5 videos en 2h (cada uno toma 20-25min, 2 tomas máximo)</li>
                <li>Edita en CapCut: 1h total (12min por video, enfocándose en subtítulos y efectos)</li>
            </ol>

            <div className="bg-slate-900/50 p-6 rounded-lg">
                <h3 className="font-bold text-green-400 mb-3">Resultados en 2 Meses:</h3>
                <ul className="space-y-2 text-slate-300 text-sm">
                    <li>⏱️ Tiempo de producción: <strong>-62%</strong> (de 8h a 3h/semana)</li>
                    <li>📈 Engagement promedio: <strong>+34%</strong> (videos más fluidos, menos errores visibles)</li>
                    <li>💪 Energía mental: Creatividad de sobra para probar nuevos formatos</li>
                    <li>🎬 Calidad: Videos se ven "más profesionales" según comentarios</li>
                </ul>
            </div>

            <p className="text-slate-400 text-xs italic mt-4">
                *Datos compartidos con permiso. Los resultados pueden variar según el tipo de contenido y experiencia.
            </p>
        </div>

        <div className="text-center mt-12 mb-12">
            <a
                href="https://promptninja.solutionkit.com.br?lang=es"
                className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 font-bold py-4 px-10 rounded-full transition hover:brightness-110 hover:scale-105 transform shadow-lg"
                style={{ color: 'white' }}
            >
                Comienza a Crear Contenido Profesional Ahora (Gratis)
            </a>
            <p className="text-slate-400 mt-4 text-sm">Sin registro. Sin tarjeta. Sin trucos.</p>
        </div>

        <SEOContentFAQ
            title="Preguntas Frecuentes: PromptNinja + CapCut"
            items={[
                {
                    question: "¿PromptNinja exporta directamente a CapCut?",
                    answer: "No directamente. El flujo es: grabas el video usando la app de cámara nativa de tu móvil mientras lees el teleprompter. El video se guarda automáticamente en la galería. Luego abres CapCut e importas desde la galería. Simple y seguro."
                },
                {
                    question: "¿Puedo usar los efectos y transiciones de CapCut normalmente?",
                    answer: "¡Sí! Exactamente ese es el punto: grabar el video 'limpio' usando PromptNinja (sin errores de texto), y luego añadir toda la magia en CapCut — subtítulos automáticos, zoom dramático, música viral, transiciones trending. Cada herramienta hace lo que hace mejor."
                },
                {
                    question: "¿La calidad del video es buena?",
                    answer: "La calidad depende de la cámara de tu móvil, no de PromptNinja. Como grabas usando la app de cámara nativa (no un grabador del navegador), puedes usar resolución máxima: 4K 60fps si tu móvil lo soporta. PromptNinja solo muestra el texto, no toca la grabación."
                },
                {
                    question: "¿Necesito internet para usarlo?",
                    answer: "Para la primera vez: sí, para cargar el sitio. Luego puedes instalarlo como PWA (acceso directo en la pantalla de inicio) y funciona 100% sin conexión. El control remoto P2P tampoco necesita internet — solo Wi-Fi local para conectar los dos dispositivos."
                },
                {
                    question: "¿Funciona en iPhone y Android?",
                    answer: "Sí, ambos. PromptNinja funciona 100% en el navegador (Safari en iPhone, Chrome en Android). No necesitas descargar nada de App Store o Google Play. Solo visita el sitio y úsalo. Incluso puedes instalarlo como app en la pantalla de inicio (PWA)."
                },
                {
                    question: "¿Los subtítulos automáticos de CapCut mejoran con un teleprompter?",
                    answer: "¡SÍ! Mucho mejores. Como hablas siguiendo un guion escrito, tu dicción es más clara sin tartamudeos. El algoritmo de Auto Caption de CapCut puede reconocer palabras con 90-95% de precisión (vs ~70% cuando improvisas). Menos corrección manual = más tiempo para creatividad."
                }
            ]}
        />

        <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 p-8 rounded-xl border border-purple-500/30 text-center my-12">
            <h2 className="text-3xl font-bold text-white mb-4">Tu Viaje como Creador Comienza Aquí</h2>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                Deja de pelear con regrabaciones. Deja de pasar 3 horas editando errores. Comienza a crear contenido como siempre soñaste: con enfoque, calidad y creatividad de sobra.
            </p>
            <a
                href="https://promptninja.solutionkit.com.br?lang=es"
                className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 font-bold py-4 px-10 rounded-full transition hover:brightness-110 hover:scale-105 transform shadow-lg text-lg"
                style={{ color: 'white' }}
            >
                Usar PromptNinja Gratis Ahora →
            </a>
        </div>
    </>
);
