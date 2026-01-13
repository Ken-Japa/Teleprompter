import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";

export const TeleprompterModoMusicoES = () => (
    <>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Teleprompter para Músicos: Letras y Acordes al Alcance de tu Mano
        </h2>

        <p className="lead text-xl text-slate-300 mb-8 font-medium">
            Lleva tu presentación al siguiente nivel sin miedo a olvidar la letra o perderte en los acordes. <strong>El Modo Músico de PromptNinja</strong> es la solución definitiva para artistas y transmisiones en vivo.
        </p>

        <p className="text-slate-300 mb-8 leading-relaxed">
            En esta guía especializada para artistas, exploramos cómo PromptNinja transforma tu smartphone o tablet en el roadie digital definitivo. Descubre cómo configurar un teleprompter que sigue tu ritmo, permitiéndote concentrarte en la entrega emocional y la conexión con tu audiencia, ya sea en un escenario en vivo o en transmisiones. Con soporte para acordes y control por pedal Bluetooth, nuestra herramienta online gratuita asegura que cada coro y cada puente se ejecuten a la perfección, eliminando la ansiedad del "blanco" y profesionalizando tu setup musical en segundos.
        </p>

        <div className="bg-slate-900/50 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-xl mb-12">
            <h3 className="text-2xl font-bold text-white mb-6">¿Por qué PromptNinja es el Mejor Amigo del Músico?</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <li className="flex items-start gap-3 bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                    <span className="text-yellow-400 text-xl">⏱️</span>
                    <div className="text-sm">
                        <strong className="text-white block mb-1">Desplazamiento Fluido y Rítmico</strong>
                        <span className="text-slate-400">Ajusta la velocidad para igualar el tempo de la canción, asegurando que el texto suba exactamente en el compás correcto.</span>
                    </div>
                </li>
                <li className="flex items-start gap-3 bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                    <span className="text-yellow-400 text-xl">🎼</span>
                    <div className="text-sm">
                        <strong className="text-white block mb-1">Soporte para Letras y Acordes</strong>
                        <span className="text-slate-400">Mantén tus armonías visibles justo encima de la letra, sin perder alineación incluso con fuentes grandes.</span>
                    </div>
                </li>
                <li className="flex items-start gap-3 bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                    <span className="text-yellow-400 text-xl">🦶</span>
                    <div className="text-sm">
                        <strong className="text-white block mb-1">Control Manos Libres</strong>
                        <span className="text-slate-400">Compatible con pedales Bluetooth y controles remotos, para que puedas cambiar de canción sin quitar las manos del instrumento.</span>
                    </div>
                </li>
                <li className="flex items-start gap-3 bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                    <span className="text-yellow-400 text-xl">🌑</span>
                    <div className="text-sm">
                        <strong className="text-white block mb-1">Alto Contraste para Escenario</strong>
                        <span className="text-slate-400">Fondo negro y texto vibrante aseguran legibilidad perfecta incluso bajo luces intensas del escenario.</span>
                    </div>
                </li>
            </ul>
        </div>

        <div className="bg-slate-800 p-8 rounded-xl border border-purple-500/30 mb-12">
            <h3 className="text-2xl font-bold text-white mb-4">Diferente de un Discurso</h3>
            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-lg font-bold text-slate-200 mb-2">🎤 El Problema de la Carpeta</h3>
                    <p className="text-sm text-slate-400">
                        Carpetas con hojas de papel vuelan con el viento, necesitan luz externa para leerse en escenarios oscuros y requieren que dejes de tocar para pasar la página.
                    </p>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-purple-400 mb-2">🎸 La Solución Digital</h3>
                    <p className="text-sm text-slate-300">
                        Pantalla retroiluminada (visible en la oscuridad), auto-scroll (manos libres) y fuentes gigantes (legible desde el suelo).
                    </p>
                </div>
            </div>
        </div>

        <h3 className="text-3xl font-bold text-white mt-12 mb-6">Configurando el "Ninja de Escenario"</h3>

        <div className="space-y-6 mb-12">
            <div className="flex gap-4">
                <div className="text-3xl">🦶</div>
                <div>
                    <h3 className="text-xl font-bold text-white">1. El Pedal Pasa-Páginas</h3>
                    <p className="text-slate-300">
                        PromptNinja acepta atajos de teclado. Si compras un pedal Bluetooth (como PageFlip o iRig), configúralo para simular la tecla "Espacio".
                        <br /> Hemos configurado algunos atajos de fábrica por defecto:
                        <ul className=" text-slate-400">
                            <li>Page Down: Reproducir/Pausar</li>
                            <li>Page Up: Detener/Reiniciar</li>
                            <li>End: Siguiente sesión (usa en la texto [PARTE 1] [PARTE 2] etc)</li>
                            <li>Home: Sesión anterior </li>
                        </ul>
                        <br /><strong>Resultado:</strong> Pisas, la letra avanza. Tus manos se quedan en la guitarra/teclado.
                    </p>
                </div>
            </div>

            <div className="flex gap-4">
                <div className="text-3xl">📱</div>
                <div>
                    <h3 className="text-xl font-bold text-white">2. Tablet en Soporte de Micrófono</h3>
                    <p className="text-slate-300">
                        Usa un soporte de tablet que se fije al pie de micrófono. Pon PromptNinja en pantalla completa. Configura fondo negro puro y texto blanco para evitar iluminar tu cara desde abajo ("efecto fantasma").
                    </p>
                </div>
            </div>

            <div className="flex gap-4">
                <div className="text-3xl">🎼</div>
                <div>
                    <h3 className="text-xl font-bold text-white">3. Formato de Acordes</h3>
                    <p className="text-slate-300">
                        PromptNinja respeta los saltos de línea. Puedes pegar letras con acordes encima.
                        <br /><span className="font-mono text-yellow-400 text-sm">G                D                Em<br />Almost heaven, West Virginia...</span>
                    </p>
                </div>
            </div>
        </div>

        <section id="cases-musica" className="p-8 bg-zinc-900 text-white rounded-2xl my-16 border border-zinc-700 shadow-2xl">
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 text-center mb-10">¡Quienes Brillan en el Escenario con PromptNinja! (E-E-A-T)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-zinc-800 p-6 rounded-xl border-t-2 border-yellow-500">
                    <p className="text-zinc-300 italic">"Mis lives de YouTube cambiaron después del Modo Músico. No más carpetas de papel horribles apareciendo en cámara. El setup con el iPad en el soporte se ve súper profesional."</p>
                    <span className="block mt-4 text-sm font-bold text-yellow-500">— Ricardo Lima, Cantante de Bar y Lives</span>
                </div>
                <div className="bg-zinc-800 p-6 rounded-xl border-t-2 border-orange-500">
                    <p className="text-zinc-300 italic">"El control por pedal Bluetooth de PromptNinja es un salvavidas para quienes tocan guitarra y cantan solos. Puedo desplazar la letra sin interrumpir el ritmo."</p>
                    <span className="block mt-4 text-sm font-bold text-orange-500">— Amanda Rocha, Artista Independiente</span>
                </div>
            </div>
        </section>

        <SEOContentFAQ
            title="FAQ de Banda"
            items={[
                {
                    question: "¿Funciona offline en el escenario?",
                    answer: "¡Sí! Instala PromptNinja PWA (App). Una vez cargado, no necesitas Wi-Fi. El internet del escenario puede caerse, tus letras se quedan ahí."
                },
                {
                    question: "¿Cómo sincronizar con la banda?",
                    answer: "Puedes establecer velocidad de scroll exacta (BPM Visual). O mejor aún, deja el control al baterista vía pedal, ya que él lleva el tempo."
                },
                {
                    question: "¿Y si la canción tiene un solo largo?",
                    answer: "Inserta varios saltos de línea vacíos en el texto entre estrofas. Así, el texto 'camina' en el espacio vacío durante el solo y la siguiente estrofa llega justo a tiempo."
                }
            ]}
        />
    </>
);
