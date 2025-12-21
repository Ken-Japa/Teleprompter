import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { SEOContentHowTo } from "../../../../components/seo/SEOContentHowTo";

export const TeleprompterShortcutsES = () => (
    <>
        <h1 className="text-4xl font-bold text-white mb-6 leading-tight">Atajos de Teclado en Teleprompter: El Secreto de Productividad en Video</h1>

        <p className="mb-6 text-lg text-slate-300">
            ¿Alguna vez cronometraste cuánto tiempo pierdes en una grabación solo yendo hasta la cámara, apretando REC, volviendo a posición, equivocándote, levantándote para pausar...?
        </p>

        <p className="mb-6">
            Editores de video profesionales en Adobe Premiere o DaVinci Resolve raramente tocan el mouse. Saben que <strong>atajos de teclado = velocidad</strong>.
        </p>

        <p className="mb-8">
            PromptNinja es el único teleprompter online diseñado con filosofía "Keyboard First". Esto significa que puedes controlar 100% de tu grabación sin nunca quitar las manos del teclado (o de tu pedal/clicker).
        </p>

        <div className="bg-slate-800 p-8 rounded-xl border border-blue-500/30 mb-12 shadow-2xl">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                ⌨️ Tabla Maestra de Comandos
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-xl font-bold text-blue-400 mb-4 border-b border-blue-500/20 pb-2">Control de Flujo</h3>
                    <ul className="space-y-3">
                        <li className="flex justify-between items-center text-slate-300">
                            <span>Iniciar / Pausar Scroll</span>
                            <kbd className="bg-slate-700 text-white px-3 py-1 rounded font-mono border border-slate-600">ESPACIO</kbd>
                        </li>
                        <li className="flex justify-between items-center text-slate-300">
                            <span>Reiniciar Texto (Inicio)</span>
                            <kbd className="bg-slate-700 text-white px-3 py-1 rounded font-mono border border-slate-600">R</kbd>
                        </li>
                        <li className="flex justify-between items-center text-slate-300">
                            <span>Salir / Volver</span>
                            <kbd className="bg-slate-700 text-white px-3 py-1 rounded font-mono border border-slate-600">ESC</kbd>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-xl font-bold text-purple-400 mb-4 border-b border-purple-500/20 pb-2">Ajustes Dinámicos</h3>
                    <ul className="space-y-3">
                        <li className="flex justify-between items-center text-slate-300">
                            <span>Velocidad (+ / -)</span>
                            <div className="flex gap-2">
                                <kbd className="bg-slate-700 text-white px-2 py-1 rounded font-mono border border-slate-600">↑</kbd>
                                <kbd className="bg-slate-700 text-white px-2 py-1 rounded font-mono border border-slate-600">↓</kbd>
                            </div>
                        </li>
                        <li className="flex justify-between items-center text-slate-300">
                            <span>Tamaño Fuente (+ / -)</span>
                            <div className="flex gap-2">
                                <kbd className="bg-slate-700 text-white px-2 py-1 rounded font-mono border border-slate-600">+</kbd>
                                <kbd className="bg-slate-700 text-white px-2 py-1 rounded font-mono border border-slate-600">-</kbd>
                            </div>
                        </li>
                        <li className="flex justify-between items-center text-slate-300">
                            <span>Modo Espejo (Mirror)</span>
                            <kbd className="bg-slate-700 text-white px-3 py-1 rounded font-mono border border-slate-600">M</kbd>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="mt-8 bg-black/30 p-4 rounded-lg border border-yellow-500/20">
                <h3 className="text-lg font-bold text-yellow-500 mb-2">🎮 Modo Gamer / Streamer (Exclusivo)</h3>
                <div className="flex justify-between items-center text-slate-300">
                    <p className="text-sm">Oculta toda la interfaz (UI) (botones, menús), dejando solo texto flotante. Perfecto para grabar gameplays o tutoriales de software.</p>
                    <kbd className="bg-yellow-600/20 text-yellow-400 px-4 py-2 rounded font-mono border border-yellow-500/50 text-xl font-bold ml-4">H</kbd>
                </div>
            </div>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Integración con Hardware Externo</h2>
        <p className="mb-6 text-slate-300">
            La belleza de usar atajos de teclado estándar es que cualquier dispositivo que emule un teclado funciona nativamente con PromptNinja.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-slate-800 p-6 rounded-lg border-t-4 border-blue-500">
                <h3 className="font-bold text-white mb-2">Elgato Stream Deck</h3>
                <p className="text-sm text-slate-400 mb-3">La herramienta favorita de streamers.</p>
                <p className="text-slate-300 text-sm">
                    Solo arrastra la acción "Hotkey" en software de Elgato y asigna tecla <strong>ESPACIO</strong> a un botón físico. Añade otro para <strong>R</strong> (Reset) y tienes centro de comando en tu mesa.
                </p>
            </div>
            <div className="bg-slate-800 p-6 rounded-lg border-t-4 border-green-500">
                <h3 className="font-bold text-white mb-2">Pedales USB</h3>
                <p className="text-sm text-slate-400 mb-3">Para músicos y "manos ocupadas".</p>
                <p className="text-slate-300 text-sm">
                    Si haces unboxing o tocas guitarra, tus manos están llenas. Usa un pedal USB configurado como "Espacio" para iniciar/pausar texto con los pies.
                </p>
            </div>
            <div className="bg-slate-800 p-6 rounded-lg border-t-4 border-purple-500">
                <h3 className="font-bold text-white mb-2">Presentadores (Clickers)</h3>
                <p className="text-sm text-slate-400 mb-3">Logitech R400, R800, etc.</p>
                <p className="text-slate-300 text-sm">
                    La mayoría de pasadores de slides envían comandos "Flecha Derecha/Izquierda" o "Page Up/Down". PromptNinja interpreta esto inteligentemente para control de scroll.
                </p>
            </div>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Workflow Ninja: Edita y Graba en Segundos</h2>
        <SEOContentHowTo
            title=""
            schemaTitle="Cómo Optimizar Grabación con Atajos"
            totalTime="PT5M"
            tools={["PC/Mac", "Teclado", "PromptNinja"]}
            steps={[
                {
                    title: "Prepara Texto",
                    text: "Pega tu guion. Usa ENTER para quebrar frases largas en bloques visuales."
                },
                {
                    title: "Ajuste Visual (Sin Mouse)",
                    text: "Usa '+' y '-' para dejar fuente gigante (lectura cómoda). Usa 'M' si usas vidrio."
                },
                {
                    title: "El Truco: Loop de Error",
                    text: "¿Te equivocaste? No maldigas. Presiona ESPACIO (Pausa). Respira. Presiona Flecha Arriba (Vuelve un poco). Presiona ESPACIO (Play). Sigue grabando. En edición, verás la pausa visualmente en waveform de audio y cortarás fácil."
                }
            ]}
        />

        <div className="text-center bg-slate-800 p-8 rounded-lg my-10 border border-slate-700">
            <h2 className="text-3xl font-bold text-white mb-4">PromptNinja PRO: Mapeo Total</h2>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                ¿Usas teclado Dvorak? ¿Tienes control remoto específico que envía tecla "F5"?
                En versión PRO, puedes <strong>forzar</strong> qué tecla hace qué. Libertad total.
            </p>
            <a
                href="https://promptninja.solutionkit.com.br"
                className="inline-block bg-white text-slate-900 font-bold py-3 px-8 rounded-full transition hover:bg-slate-200"
            >
                Configurar Atajos Ahora
            </a>
        </div>

        <SEOContentFAQ
            title="Dudas Técnicas sobre Teclado"
            items={[
                {
                    question: "¿Atajos funcionan si estoy en otra ventana (ej: OBS)?",
                    answer: "No nativamente (limitación seguridad navegadores). PromptNinja debe estar 'en foco' (ventana activa). Tip: Usa segundo monitor para PromptNinja y haz clic en él antes de empezar."
                },
                {
                    question: "¿Funciona con teclados Bluetooth de iPad?",
                    answer: "¡Sí! iPadOS reconoce teclados externos perfectamente y PromptNinja responde a mismos atajos (Espacio, Flechas) en Safari/Chrome móvil."
                },
                {
                    question: "¿Puedo usar control de videojuegos (Xbox/PS5)?",
                    answer: "Directamente no, pero si usas software como 'JoyToKey' (Windows) o 'Mapper' (Mac) para transformar botones joystick en teclas (A = Espacio), ¡funciona perfectamente!"
                },
                {
                    question: "¿La tecla 'H' (Hide) esconde el texto también?",
                    answer: "No, esconde solo la UI (Interfaz de Usuario) - botones, menús, logo. Texto sigue ahí, flotando. Si fondo es transparente, parece magia sobre tu video."
                }
            ]}
        />
    </>
);
