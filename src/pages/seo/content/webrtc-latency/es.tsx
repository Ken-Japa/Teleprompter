import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";

export const WebRtcLatencyContentES = () => (
    <>
        <h1 className="text-4xl font-bold text-white mb-6 leading-tight">¿Por qué PromptNinja es Más Rápido que Bluetooth? (La Ciencia de la Latencia)</h1>

        <p className="lead text-xl text-slate-300 mb-8">
            Presionas "Pausa". El texto sigue rodando por medio segundo más. Te pierdes. Tienes que regrabar.
            Este retraso invisible se llama <strong>latencia</strong>, y es el enemigo número 1 de la fluidez.
        </p>

        <div className="bg-slate-800 p-8 rounded-xl border border-blue-500/30 mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Carrera de Datos: Satélite vs Local</h2>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-red-900/10 p-4 rounded border border-red-500/20 opacity-70">
                    <h3 className="font-bold text-red-400 mb-2">🐢 Apps Tradicionales (Nube)</h3>
                    <div className="font-mono text-xs text-slate-400 mb-2">
                        [Móvil] ➡️ [Router] ➡️ [ISP] ➡️ [Servidor EEUU] ➡️ [Procesamiento] ➡️ [Vuelta a Ti] ➡️ [PC]
                    </div>
                    <p className="text-slate-300 text-sm">
                        Es como enviar una carta al vecino vía correo internacional. La señal viaja 10,000km para moverse 2 metros.
                        <br /><span className="font-bold text-red-400">Latencia: 200ms - 800ms</span> (Perceptible)
                    </p>
                </div>

                <div className="bg-green-900/10 p-4 rounded border border-green-500/50">
                    <h3 className="font-bold text-green-400 mb-2">🚀 PromptNinja (WebRTC P2P)</h3>
                    <div className="font-mono text-xs text-slate-400 mb-2">
                        [Móvil] ➡️ [Router Wi-Fi] ➡️ [PC]
                    </div>
                    <p className="text-slate-300 text-sm">
                        Es como gritar por la ventana. La señal nunca sale de tu casa. Viaja a velocidad de luz por tu red Wi-Fi local.
                        <br /><span className="font-bold text-green-400">Latencia: &lt; 10ms</span> (Instantáneo)
                    </p>
                </div>
            </div>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">¿Por qué importan los milisegundos?</h2>
        <p className="text-slate-300 mb-6">
            El cerebro humano percibe cualquier retraso sobre 100ms como "lag".
        </p>
        <ul className="list-disc pl-6 mb-8 text-slate-300 space-y-3">
            <li><strong>Sincronía Labial:</strong> Si lees y texto no acompaña, empiezas a hablar más lento inconscientemente, sonando "robótico".</li>
            <li><strong>Ajustes Sutiles:</strong> Con latencia cero, puedes acelerar levemente en partes fáciles y frenar en palabras difíciles en tiempo real, como conducir un deportivo.</li>
            <li><strong>Confianza:</strong> Saber que el botón "Pausa" funciona al instante quita la ansiedad de grabación en vivo.</li>
        </ul>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Tecnología Bajo el Capó</h2>
        <p className="text-slate-300 mb-6">
            Usamos <strong>WebRTC Data Channels</strong> con protocolo UDP.
        </p>

        <div className="grid sm:grid-cols-2 gap-6 mb-12">
            <div className="bg-slate-800 p-5 rounded-lg border-l-4 border-purple-500">
                <h3 className="font-bold text-white mb-2">Sin Servidor en Medio</h3>
                <p className="text-sm text-slate-400">
                    Nuestros servidores solo "presentan" los dispositivos (como app de citas). Tras el match, se van del chat y los dejan solos. Menos intermediarios = Menos Lag.
                </p>
            </div>
            <div className="bg-slate-800 p-5 rounded-lg border-l-4 border-yellow-500">
                <h3 className="font-bold text-white mb-2">Protocolo UDP (Velocidad Pura)</h3>
                <p className="text-sm text-slate-400">
                    La mayoría de la web usa TCP (seguro pero lento). Nosotros usamos UDP para controles. No pierde tiempo verificando recibos de entrega. Solo entrega la orden "PLAY" inmediatamente.
                </p>
            </div>
        </div>

        <SEOContentFAQ
            title="FAQ Técnico de Latencia"
            items={[
                {
                    question: "¿Funciona si internet es lento?",
                    answer: "¡Sí! La latencia de PromptNinja depende de calidad de tu Router Wi-Fi, no velocidad de tu proveedor internet. Si router es bueno, conexión será instantánea aun con internet telefónico."
                },
                {
                    question: "¿Por qué a veces tarda en conectar?",
                    answer: "Proceso inicial de 'Handshake' (encontrar dispositivos) puede tomar unos segundos dependiendo de firewalls corporativos. Pero una vez conectado, latencia de control cae a cero."
                },
                {
                    question: "¿Es más rápido que control Bluetooth físico?",
                    answer: "Sorprendentemente, sí o igual. Controles Bluetooth baratos tienen 'input lag' de hardware y procesamiento de driver. Wi-Fi moderno (5Ghz) es absurdamente rápido y estable para transmisión de datos pequeños como comandos texto."
                }
            ]}
        />
    </>
);
