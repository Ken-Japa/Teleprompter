export const WebRtcLatencyContentES = () => (
    <>
        <p className="lead text-xl text-slate-300 mb-8">
            Presionas el botón de "pausa" en el control remoto. El texto sigue desplazándose por medio segundo más. Pierdes tu lugar, tartamudeas y tienes que volver a grabar.
            Este "retraso" (latencia) es la pesadilla de cualquier presentador. En este artículo técnico, explicamos cómo la tecnología WebRTC ha resuelto este problema definitivamente.
        </p>

        <h2>El Problema de la Latencia en Dispositivos Bluetooth</h2>
        <p>
            La mayoría de los teleprompters del mercado utilizan controles remotos Bluetooth baratos. Aunque populares, sufren de un problema estructural: la pila de protocolos.
            Cuando haces clic en un botón, la señal debe:
        </p>
        <ol>
            <li>Ser codificada por el chip del control.</li>
            <li>Viajar por el aire (frecuencia 2.4GHz, a menudo saturada).</li>
            <li>Ser decodificada por el sistema operativo de la computadora/teléfono.</li>
            <li>Ser interpretada por el controlador (driver).</li>
            <li>Finalmente llegar a la aplicación.</li>
        </ol>
        <p>
            En entornos con mucha interferencia (estudios con micrófonos inalámbricos, enrutadores Wi-Fi), esta latencia puede llegar a <strong>200-500 milisegundos</strong>. Parece poco, pero para el cerebro humano leyendo en tiempo real, es la diferencia entre una lectura fluida y una pausa incómoda.
        </p>

        <h2>Entra WebRTC (Web Real-Time Communication)</h2>
        <p>
            WebRTC es una tecnología de código abierto desarrollada por Google (y adoptada por Apple, Microsoft y Mozilla) que permite la comunicación directa entre navegadores.
            Es la misma tecnología utilizada en Google Meet y Zoom. Pero PromptNinja la utiliza de manera diferente: <strong>Data Channels</strong>.
        </p>

        <h3>P2P: El Camino Más Corto</h3>
        <p>
            A diferencia de las aplicaciones web tradicionales que funcionan en el modelo Cliente-Servidor (donde tu comando va a un servidor en Virginia/EE. UU. y regresa a tu computadora), WebRTC crea una conexión <strong>Peer-to-Peer (P2P)</strong>.
        </p>
        <p>
            Esto significa que tu teléfono (control) y tu computadora (pantalla) conversan directamente a través de tu red Wi-Fi local. La señal no sale de tu casa.
            ¿Resultado? Latencia de <strong>5 a 20 milisegundos</strong>. Es virtualmente instantáneo.
        </p>

        <h2>La Arquitectura Técnica de PromptNinja</h2>
        <p>
            Para los desarrolladores y curiosos, así es como implementamos esta magia:
        </p>
        <ul>
            <li><strong>Signaling (Señalización):</strong> Usamos un servidor ligero solo para el "apretón de manos" inicial (Handshake). Los dispositivos intercambian metadatos (SDP offers/answers) para encontrarse.</li>
            <li><strong>STUN Servers:</strong> Usamos servidores STUN para descubrir la dirección IP pública/privada de los dispositivos, atravesando la barrera NAT (Network Address Translation).</li>
            <li><strong>Data Channels (UDP):</strong> A diferencia de TCP (usado en la web normal), usamos el protocolo UDP para los comandos de control. UDP no pierde tiempo verificando si cada paquete llegó perfectamente en orden; prioriza la velocidad. Para un botón de "Play/Pausa", esto es crucial.</li>
        </ul>

        <div className="bg-slate-900 p-6 rounded-lg border border-slate-700 my-8">
            <h3 className="text-xl font-bold text-white mb-4">¿Por qué te importa esto?</h3>
            <p className="mb-0 text-slate-300">
                No necesitas entender paquetes UDP o servidores STUN. Lo que sientes en la práctica es <strong>control absoluto</strong>.
                Cuando quieres que el texto se detenga, se detiene. Al instante. Esto te da confianza para hablar más rápido, hacer pausas dramáticas y ser más natural.
            </p>
        </div>

        <h2>Comparativa de Latencia</h2>
        <div className="overflow-x-auto mb-8">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-slate-600">
                        <th className="py-2 text-primary">Tecnología</th>
                        <th className="py-2 text-primary">Latencia Promedio</th>
                        <th className="py-2 text-primary">Estabilidad</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b border-slate-800">
                        <td className="py-2 text-white font-bold">PromptNinja (WebRTC P2P)</td>
                        <td className="py-2 text-green-400 font-bold">&lt; 20ms</td>
                        <td className="py-2">Extrema (Red Local)</td>
                    </tr>
                    <tr className="border-b border-slate-800">
                        <td className="py-2">Bluetooth Estándar</td>
                        <td className="py-2">150ms - 300ms</td>
                        <td className="py-2">Media (Interferencia)</td>
                    </tr>
                    <tr className="border-b border-slate-800">
                        <td className="py-2">Web Sockets (Servidor Cloud)</td>
                        <td className="py-2">200ms - 1000ms+</td>
                        <td className="py-2">Baja (Depende de Internet)</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </>
);
