import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { SEOContentHowTo } from "../../../../components/seo/SEOContentHowTo";

export const TeleprompterCaseiroDIYES = () => (
    <>
        <h1 className="text-4xl font-bold text-white mb-6">Cómo Hacer un Teleprompter Casero (DIY): Guía Completa + Software GRATIS</h1>

        <p className="mb-6">
            Grabar vídeos con aspecto profesional requiere fluidez y confianza, pero memorizar guiones es un desafío. Los equipos de teleprompter profesionales lo resuelven, pero son caros. ¿La buena noticia? Puedes <strong>montar un teleprompter casero barato</strong> con materiales sencillos y obtener resultados impresionantes. El principio físico detrás de esto es el "Fantasma de Pepper", una ilusión óptica utilizada en teatros desde el siglo XIX — ¡y que puedes replicar en casa!
        </p>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Materiales Necesarios para Montar tu Teleprompter DIY</h2>

        <div className="bg-slate-800 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-bold text-white mb-4">Lista de Compras para tu Teleprompter Casero</h3>
            <ul className="list-disc pl-6 space-y-3">
                <li>
                    <strong>Vidrio o Acrílico Transparente:</strong> Un marco de fotos de 20x30cm o 30x40cm (quita el fondo) o una lámina de acrílico transparente. Este será tu "divisor de haz" que refleja el texto.
                    <span className="text-slate-400 block mt-1 text-sm">💡 Dónde comprar: Tiendas de marcos, papelerías grandes o ferreterías (acrílico)</span>
                </li>
                <li>
                    <strong>Estructura de Soporte:</strong> Una caja de cartón resistente (caja de zapatos grande o de mudanza) o una estructura de madera ligera (MDF o contrachapado). Pinta el interior de negro mate para evitar reflejos no deseados.
                    <span className="text-slate-400 block mt-1 text-sm">💡 Dónde comprar: Papelerías, tiendas de manualidades o madereras</span>
                </li>
                <li>
                    <strong>Dispositivo de Visualización:</strong> Una tablet (7-10 pulgadas es ideal), smartphone o monitor portátil para mostrar el guion.
                    <span className="text-slate-400 block mt-1 text-sm">💡 ¡Usa lo que ya tienes! Las tablets antiguas funcionan perfectamente</span>
                </li>
                <li>
                    <strong>Tela Negra o Cartulina:</strong> Para crear un "túnel" entre la lente de la cámara y el vidrio, bloqueando la luz ambiental y asegurando que la cámara no aparezca en el reflejo.
                    <span className="text-slate-400 block mt-1 text-sm">💡 Dónde comprar: Tiendas de telas o papelerías</span>
                </li>
                <li>
                    <strong>Cámara:</strong> Cualquier cámara DSLR, mirrorless, webcam o incluso la de tu smartphone.
                </li>
                <li>
                    <strong>Cinta Adhesiva/Silicona Caliente:</strong> Para fijar las piezas.
                    <span className="text-slate-400 block mt-1 text-sm">💡 La silicona caliente es ideal para montajes rápidos y ajustes</span>
                </li>
            </ul>

            <div className="mt-4 p-4 bg-slate-700 rounded">
                <p className="text-white font-bold mb-2">💰 Costo Total Estimado: $5 a $15 USD</p>
                <p className="text-slate-300 text-sm">Compara con teleprompters profesionales que cuestan de $100 a $500+ USD</p>
            </div>
        </div>

        <div className="bg-yellow-900/20 border-l-4 border-yellow-500 p-4 mb-6 rounded-r-lg">
            <div className="flex">
                <div className="flex-shrink-0">
                    <span className="text-2xl">⚠️</span>
                </div>
                <div className="ml-3">
                    <h3 className="text-sm font-bold text-yellow-500">¡Cuidado con el Efecto Espejo!</h3>
                    <div className="mt-2 text-sm text-yellow-200">
                        <p>
                            Al usar un vidrio para reflejar el texto, este aparecerá invertido. Necesitarás un software que soporte <strong>Modo Espejo (Mirror Mode)</strong>. PromptNinja lo incluye gratis para que puedas empezar a grabar de inmediato.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div className="bg-slate-800 p-4 rounded-lg mb-6 border-l-4 border-purple-500">
            <h3 className="font-bold text-white mb-2">📱 ¿Vas a usar una Tablet o iPad?</h3>
            <p className="text-slate-300 text-sm">
                Las tablets son excelentes para teleprompters caseros debido al tamaño de su pantalla y portabilidad. Si planeas usar una, consulta nuestra guía específica sobre <a href="/es/teleprompter-para-tablet-ipad-android" className="text-purple-400 hover:text-purple-300 underline">cómo usar teleprompter en tablet</a> para consejos de posicionamiento y configuración.
            </p>
        </div>

        <SEOContentHowTo
            title="Paso a Paso: Cómo Montar un Teleprompter Casero"
            schemaTitle="Cómo Hacer un Teleprompter Casero (DIY)"
            estimatedCost={{ currency: "USD", value: "15" }}
            totalTime="PT30M"
            supplies={["Caja de Cartón o Madera", "Vidrio o Acrílico Transparente", "Tela Negra", "Cinta Adhesiva o Silicona Caliente"]}
            tools={["Tijeras o Cúter", "Smartphone o Tablet (para mostrar el texto)", "Cámara (para grabar)"]}
            steps={[
                {
                    title: "Paso 1: Prepara la Estructura Base",
                    text: "Toma tu caja de cartón y corta una abertura frontal para la cámara y una abertura inferior para que la tablet quede en un ángulo de 45 grados. Si usas madera, monta una caja en forma de \"L\" invertida. Tip: Pinta todo el interior de negro mate para eliminar reflejos que puedan aparecer en el vídeo."
                },
                {
                    title: "Paso 2: Coloca el Vidrio/Acrílico",
                    text: "Fija el vidrio o acrílico en un ángulo de 45 grados entre la cámara (que estará detrás) y tú (que estarás enfrente). Este ángulo es crucial para que el reflejo del texto sea visible solo para ti, y no para la cámara. Usa soportes de silicona caliente o cinta adhesiva doble cara."
                },
                {
                    title: "Paso 3: Coloca la Tablet/Monitor",
                    text: "Coloca la tablet o monitor en la parte inferior de la estructura, mirando hacia arriba hacia el vidrio. El texto en la pantalla se reflejará en el vidrio y aparecerá en tu línea de visión, justo debajo de la lente de la cámara. Ajusta el brillo de la pantalla de la tablet al máximo."
                },
                {
                    title: "Paso 4: Bloquea la Luz con Tela Negra",
                    text: "Crea un \"túnel\" con tela negra alrededor de la cámara y del vidrio. Esto evita que la luz externa interfiera en el reflejo y asegura que la cámara no aparezca reflejada en el vidrio."
                },
                {
                    title: "Paso 5: Configura el Software (PromptNinja)",
                    text: "El paso más importante: el texto en la tablet necesita estar espejado. 1. Accede a promptninja.solutionkit.com.br en tu tablet. 2. Pega tu guion. 3. Haz clic en el icono de espejo (🪞). 4. Escanea el código QR con tu móvil para usarlo como control remoto. ¡Listo!"
                }
            ]}
        />

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Por Qué PromptNinja es Perfecto para Tu Teleprompter Casero</h2>

        <div className="bg-slate-800 p-6 rounded-lg my-6">
            <p className="text-slate-300 mb-6">
                Mientras que tu estructura DIY resuelve el hardware, <strong>PromptNinja fue diseñado específicamente pensando en configuraciones caseras</strong>. Todas las funcionalidades principales son <strong>100% gratuitas</strong>.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-700 p-4 rounded-lg">
                    <h4 className="font-bold text-white mb-2">🪞 Espejo Inteligente</h4>
                    <p className="text-sm text-slate-300">Con 1 clic, invierte el texto horizontal y verticalmente. El reflejo en el vidrio queda perfectamente legible para ti, pero invisible para la cámara.</p>
                </div>
                <div className="bg-slate-700 p-4 rounded-lg">
                    <h4 className="font-bold text-white mb-2">📱 Control Remoto P2P vía QR Code</h4>
                    <p className="text-sm text-slate-300">¡Graba solo! Escanea un código QR y usa tu móvil como control. Inicia, pausa, ajusta la velocidad sin tocar la tablet.</p>
                </div>
                <div className="bg-slate-700 p-4 rounded-lg">
                    <h4 className="font-bold text-white mb-2">⚡ Sin Instalación ni Lag</h4>
                    <p className="text-sm text-slate-300">Funciona directo en el navegador. Control P2P vía Wi-Fi local (no depende de internet). Respuesta instantánea, cero retraso.</p>
                </div>
                <div className="bg-slate-700 p-4 rounded-lg">
                    <h4 className="font-bold text-white mb-2">🎨 Totalmente Personalizable</h4>
                    <p className="text-sm text-slate-300">Ajusta fuente, tamaño, colores, velocidad y mucho más. Adáptalo perfectamente a tu configuración e iluminación.</p>
                </div>
            </div>
        </div>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Optimizando PromptNinja para Tu Setup DIY</h2>

        <div className="bg-slate-800 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-bold text-white mb-4">Configuraciones Recomendadas</h3>
            <ul className="space-y-4">
                <li className="flex items-start">
                    <span className="text-2xl mr-3">🔆</span>
                    <div>
                        <strong className="text-white">Brillo de la Pantalla:</strong>
                        <p className="text-slate-300 text-sm">Pon la tablet al brillo máximo. El reflejo en el vidrio reduce la intensidad de la luz, así que necesitas compensar.</p>
                    </div>
                </li>
                <li className="flex items-start">
                    <span className="text-2xl mr-3">📏</span>
                    <div>
                        <strong className="text-white">Tamaño de Fuente:</strong>
                        <p className="text-slate-300 text-sm">Prueba diferentes tamaños. Para una tablet de 10", recomendamos empezar con 48-60px y ajustar según tu distancia.</p>
                    </div>
                </li>
                <li className="flex items-start">
                    <span className="text-2xl mr-3">🎨</span>
                    <div>
                        <strong className="text-white">Contraste:</strong>
                        <p className="text-slate-300 text-sm">Usa texto blanco sobre fondo negro para el máximo contraste en el reflejo. Evita colores claros en el fondo.</p>
                    </div>
                </li>
                <li className="flex items-start">
                    <span className="text-2xl mr-3">⚡</span>
                    <div>
                        <strong className="text-white">Velocidad:</strong>
                        <p className="text-slate-300 text-sm">Empieza despacio (50-100 WPM) hasta acostumbrarte. Usa el control remoto para ajustar en tiempo real.</p>
                    </div>
                </li>
                <li className="flex items-start">
                    <span className="text-2xl mr-3">🔋</span>
                    <div>
                        <strong className="text-white">Modo de Ahorro de Energía:</strong>
                        <p className="text-slate-300 text-sm">Desactiva el modo de ahorro de energía de la tablet para evitar que la pantalla se oscurezca durante la grabación.</p>
                    </div>
                </li>
            </ul>
        </div>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Problemas Comunes y Soluciones (Troubleshooting)</h2>

        <div className="space-y-4 mb-8">
            <div className="bg-red-900/20 border border-red-500/30 p-4 rounded-lg">
                <h4 className="font-bold text-white mb-2">❌ Problema: El reflejo es muy débil o casi invisible</h4>
                <p className="text-slate-300 text-sm mb-2"><strong>Solución:</strong></p>
                <ul className="list-disc pl-6 text-slate-300 text-sm space-y-1">
                    <li>Aumenta el brillo de la tablet al máximo</li>
                    <li>Reduce la iluminación ambiental de la sala (el reflejo es más visible en la oscuridad)</li>
                    <li>Asegúrate de que el vidrio esté limpio y sin manchas</li>
                    <li>Verifica si el ángulo del vidrio es correcto (45 grados)</li>
                </ul>
            </div>

            <div className="bg-red-900/20 border border-red-500/30 p-4 rounded-lg">
                <h4 className="font-bold text-white mb-2">❌ Problema: La cámara está grabando el texto reflejado</h4>
                <p className="text-slate-300 text-sm mb-2"><strong>Solución:</strong></p>
                <ul className="list-disc pl-6 text-slate-300 text-sm space-y-1">
                    <li>Ajusta el ángulo del vidrio a exactamente 45 grados</li>
                    <li>Verifica si la tela negra está bloqueando toda la luz alrededor de la cámara</li>
                    <li>Reduce el brillo de la tablet (si aún así el reflejo es visible para ti)</li>
                </ul>
            </div>

            <div className="bg-red-900/20 border border-red-500/30 p-4 rounded-lg">
                <h4 className="font-bold text-white mb-2">❌ Problema: El texto está cortado o no totalmente visible</h4>
                <p className="text-slate-300 text-sm mb-2"><strong>Solución:</strong></p>
                <ul className="list-disc pl-6 text-slate-300 text-sm space-y-1">
                    <li>Ajusta la distancia entre la tablet y el vidrio</li>
                    <li>Usa una tablet o vidrio más grande</li>
                    <li>Reduce el tamaño de la fuente en PromptNinja</li>
                    <li>Aléjate un poco más de la estructura</li>
                </ul>
            </div>

            <div className="bg-red-900/20 border border-red-500/30 p-4 rounded-lg">
                <h4 className="font-bold text-white mb-2">❌ Problema: El texto es difícil de leer (borroso)</h4>
                <p className="text-slate-300 text-sm mb-2"><strong>Solución:</strong></p>
                <ul className="list-disc pl-6 text-slate-300 text-sm space-y-1">
                    <li>Limpia bien el vidrio (las huellas dactilares causan distorsión)</li>
                    <li>Usa vidrio en lugar de acrílico (el acrílico rayado distorsiona más)</li>
                    <li>Aumenta el tamaño de la fuente en PromptNinja</li>
                    <li>Usa fuentes sans-serif (Arial, Helvetica) que son más legibles en reflejos</li>
                </ul>
            </div>

            <div className="bg-red-900/20 border border-red-500/30 p-4 rounded-lg">
                <h4 className="font-bold text-white mb-2">❌ Problema: El control remoto no funciona</h4>
                <p className="text-slate-300 text-sm mb-2"><strong>Solución:</strong></p>
                <ul className="list-disc pl-6 text-slate-300 text-sm space-y-1">
                    <li>Asegúrate de que la tablet y el móvil estén en la misma red Wi-Fi</li>
                    <li>Recarga la página de PromptNinja en la tablet</li>
                    <li>Escanea el código QR de nuevo</li>
                    <li>Si es necesario, consulta nuestra <a href="/es/teleprompter-online-gratis" className="text-purple-400 hover:text-purple-300 underline">guía de control remoto P2P</a></li>
                </ul>
            </div>
        </div>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">FAQ: Preguntas Frecuentes sobre Teleprompters Caseros</h2>
        <SEOContentFAQ
            title=""
            items={[
                {
                    question: "¿Por qué el texto se ve al revés en mi teleprompter casero?",
                    answer: "Esto sucede por la reflexión física en el vidrio. Para solucionarlo, usa PromptNinja y activa el botón de 'Modo Espejo', que invierte el texto horizontalmente para que sea legible en el reflejo."
                },
                {
                    question: "¿Necesito un vidrio especial o el vidrio común sirve?",
                    answer: "¡Un vidrio de marco de fotos común funciona perfectamente! Los vidrios profesionales \"beam splitter\" (50/50) son mejores, pero para una configuración DIY casera la diferencia es mínima y el costo es 10 veces mayor. Lo importante es que el vidrio esté limpio y sin arañazos."
                },
                {
                    question: "¿Cuánto cuesta hacer un teleprompter casero?",
                    answer: "Entre $5 y $15 USD si compras todos los materiales desde cero (vidrio, caja/madera, tela negra, pegamento). Si ya tienes una tablet y una cámara, puede costar casi nada. Compara con teleprompters profesionales que cuestan de $100 a $500+ USD."
                },
                {
                    question: "¿Cómo evito que la cámara grabe el texto reflejado?",
                    answer: "El secreto está en tres factores: (1) ángulo correcto del vidrio (45 grados), (2) tela negra bloqueando la luz alrededor de la cámara, y (3) iluminación adecuada. La cámara, posicionada detrás del vidrio, captura la imagen frente a ti, mientras que el texto reflejado solo es visible para quien está frente al vidrio (tú)."
                },
                {
                    question: "¿Puedo usar mi móvil en lugar de una tablet?",
                    answer: "Sí, pero las tablets son mucho mejores por su pantalla más grande. Si usas móvil, elige uno con pantalla grande (6.5\"+) y posiciónalo más cerca del vidrio. Funcionará, pero el texto reflejado será más pequeño y difícil de leer."
                },
                {
                    question: "¿PromptNinja funciona offline en mi teleprompter casero?",
                    answer: "¡Sí! Después de cargar la página una vez, PromptNinja funciona offline gracias a la tecnología PWA. El control remoto P2P también funciona vía Wi-Fi local, sin necesitar internet activo."
                },
                {
                    question: "¿Necesito instalar alguna app en la tablet?",
                    answer: "¡No! PromptNinja funciona directo en el navegador (Chrome, Safari, Edge, Firefox). Solo accede al sitio. Puedes instalarlo como PWA (Progressive Web App) si quieres, pero no es obligatorio."
                },
                {
                    question: "¿El control remoto de PromptNinja funciona con cualquier móvil?",
                    answer: "Sí. Cualquier smartphone que pueda leer un código QR y tenga un navegador moderno puede usarse como control remoto. No es necesario instalar nada en el móvil — todo funciona en el navegador vía conexión P2P local."
                },
                {
                    question: "¿Puedo usar acrílico en lugar de vidrio?",
                    answer: "¡Sí! El acrílico transparente funciona bien y es más ligero y seguro (no se rompe). La única desventaja es que se raya más fácil, o que puede distorsionar un poco el reflejo. Si usas acrílico, protégelo con una película removible."
                }
            ]}
        />

        <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-8 rounded-lg my-10 border border-purple-500/30">
            <h2 className="text-3xl font-bold text-white mb-4 text-center">¿Listo para Convertir tu Proyecto DIY en una Herramienta Profesional?</h2>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto text-center">
                Ya has ahorrado en el hardware. Ahora, <strong>potencia tu teleprompter casero con un software 100% gratuito</strong> hecho especialmente para setups DIY como el tuyo.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                <a
                    href="https://promptninja.solutionkit.com.br"
                    className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 font-bold py-3 px-8 rounded-full transition hover:brightness-110 hover:scale-105"
                    style={{ color: 'white' }}
                >
                    🚀 Probar PromptNinja Gratis
                </a>
                <a
                    href="/es/teleprompter-online-gratis"
                    className="inline-block border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white font-bold py-3 px-8 rounded-full transition"
                >
                    📖 Ver Más Funciones
                </a>
            </div>
            <p className="text-slate-400 text-sm text-center mt-4">
                ✅ Modo Espejo • ✅ Control Remoto P2P • ✅ Sin Instalación • ✅ 100% Gratis
            </p>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg mt-8">
            <h3 className="text-xl font-bold text-white mb-3">💡 Tip Extra: Otros Recursos Útiles</h3>
            <p className="text-slate-300 mb-4">
                Si estás montando un teleprompter casero, estas otras funciones de PromptNinja pueden ser útiles:
            </p>
            <ul className="list-disc pl-6 text-slate-300 space-y-2">
                <li><a href="/es/teleprompter-modo-musico" className="text-purple-400 hover:text-purple-300 underline">Modo Músico</a> — Perfecto si también grabas música o necesitas acordes</li>
                <li><a href="/es/como-usar-teleprompter" className="text-purple-400 hover:text-purple-300 underline">Cómo usar teleprompter profesionalmente</a> — Técnicas para mejorar tu rendimiento</li>
                <li><a href="/es/teleprompter-web-vs-hardware" className="text-purple-400 hover:text-purple-300 underline">Teleprompter Web vs Hardware</a> — Compara tu setup DIY con opciones profesionales</li>
            </ul>
        </div>
    </>
);
