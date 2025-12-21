import { SEOContentHowTo } from "../../../../components/seo/SEOContentHowTo";

export const ComoUsarTeleprompterES = () => (
    <>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Cómo Usar un Teleprompter Gratis: La Guía Definitiva para Vídeos Profesionales
        </h1>

        <p className="lead text-xl text-slate-300 mb-8">
            ¿Primera vez intentando un teleprompter? Abres algún sitio cualquiera, pegas el texto, le das a play y... DESASTRE. El texto avanza muy rápido (pareces un subastador nervioso) o muy lento (pausas incómodas). Intentas pausar pero necesitas <strong>tocar la pantalla y temblar la cámara</strong>. Después de 40 minutos probando, te rindes y vuelves a regrabar 20 veces memorizando.
        </p>

        <p className="mb-6">
            EXACTAMENTE lo que me pasó la primera vez. Pensé "el teleprompter cambiará mi vida". ¿Resultado? Pasé MÁS tiempo peleando con la herramienta que si hubiera gravado sin nada. El problema no era YO. Era usar herramientas hechas para estudios profesionales con equipos de $5000, no para creadores solo grabando con móvil.
        </p>

        <p className="mb-8">
            Esta guía existe para que <strong>aciertes a la primera</strong>. Te mostraré EXACTAMENTE cómo usar un teleprompter de la manera correcta — no solo la parte técnica ("pega texto, dale play") sino los TRUCOS que separan quién parece leyendo de quién parece hablando naturalmente.
        </p>

        <div className="bg-gradient-to-r from-red-900/30 to-green-900/30 p-8 rounded-xl border border-slate-700 mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Primer Video: Sin vs CON Teleprompter</h2>
            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-slate-900/70 p-6 rounded-lg border border-red-500/30">
                    <h3 className="font-bold text-red-400 mb-4 flex items-center gap-2">
                        <span>❌</span> SIN Teleprompter (Memorizando)
                    </h3>
                    <ul className="space-y-3 text-slate-300 text-sm">
                        <li>🧠 <strong>Preparación:</strong> 45min intentando memorizar 2min de texto</li>
                        <li>🎬 <strong>Grabación:</strong> 18 intentos (olvida a mitad, se traba, pierde energía)</li>
                        <li>⏱️ <strong>Tiempo total:</strong> 1h32min para grabar 2min</li>
                        <li>😓 <strong>Resultado:</strong> Video publicado con pequeños tartamudeos "aceptables"</li>
                        <li>💬 <strong>Feedback:</strong> "Parece algo nervioso", "¿Está leyendo algo?"</li>
                    </ul>
                </div>
                <div className="bg-slate-900/70 p-6 rounded-lg border border-green-500/30">
                    <h3 className="font-bold text-green-400 mb-4 flex items-center gap-2">
                        <span>✅</span> CON Teleprompter (Primera Vez Haciéndolo BIEN)
                    </h3>
                    <ul className="space-y-3 text-slate-300 text-sm">
                        <li>🧠 <strong>Preparación:</strong> 3min pegando texto, ajustando velocidad</li>
                        <li>🎬 <strong>Grabación:</strong> 2 intentos (1º para probar velocidad, 2º es el bueno)</li>
                        <li>⏱️ <strong>Tiempo total:</strong> 12min para grabar 2min</li>
                        <li>😊 <strong>Resultado:</strong> Video PERFECTO, cero tartamudeos, energía mantenida</li>
                        <li>💬 <strong>Feedback:</strong> "¡Qué seguridad!", "Parece presentador de TV"</li>
                    </ul>
                </div>
            </div>
            <p className="text-slate-400 text-sm mt-6 italic text-center">
                💡 Diferencia: <strong className="text-green-400">-87% tiempo</strong> (1h32→12min) + <strong className="text-green-400">calidad profesional</strong> en el 1er intento.
            </p>
        </div>

        <div className="bg-slate-900 p-6 rounded-lg border border-slate-800 mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Por Qué los Principiantes Fallan (y Cómo Evitarlo)</h2>
            <p className="text-slate-300 mb-4">
                90% de los creadores que prueban teleprompter por primera vez SE RINDEN. No porque la herramienta no funcione, sino porque cometen 3 errores clásicos:
            </p>
            <div className="space-y-4">
                <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-red-500">
                    <h4 className="font-bold text-red-400 mb-2">Error #1: Fuente Muy Grande</h4>
                    <p className="text-slate-300 text-sm">
                        Piensan: "Necesito ver bien el texto" y ponen fuente tamaño 72px. ¿Resultado? Tus ojos hacen un <strong>movimiento amplio izquierda/derecha</strong> en cada línea. La cámara lo capta. La audiencia nota que estás leyendo.
                        <span className="text-green-400 block mt-2">✅ <strong>Solución:</strong> Fuente 28-36px + estar más LEJOS de la pantalla. Ojos se mueven menos, parece natural.</span>
                    </p>
                </div>
                <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-red-500">
                    <h4 className="font-bold text-red-400 mb-2">Error #2: Texto Lejos de la Cámara</h4>
                    <p className="text-slate-300 text-sm">
                        Colocan teleprompter en una esquina de la pantalla, cámara en otra. Grabas mirando 20º hacia el LADO de la cámara. La audiencia siente que no les estás hablando a ELLOS.
                        <span className="text-green-400 block mt-2">✅ <strong>Solución:</strong> Pega la ventana del teleprompter LITERALMENTE sobre la cámara. Cuanto más cerca, mejor.</span>
                    </p>
                </div>
                <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-red-500">
                    <h4 className="font-bold text-red-400 mb-2">Error #3: Velocidad Incorrecta</h4>
                    <p className="text-slate-300 text-sm">
                        Lo dejan en predeterminado (generalmente muy rápido). Corres para seguir el ritmo, te quedas sin aire, pierdes naturalidad. O muy lento: pausas incómodas gigantes.
                        <span className="text-green-400 block mt-2">✅ <strong>Solución:</strong> SIEMPRE haz una prueba de 30s ANTES de grabar. Ajusta hasta que parezca tu habla natural. No existe "velocidad correcta universal".</span>
                    </p>
                </div>
            </div>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Cómo Usar un Teleprompter: De lo Básico a lo Profesional</h2>
        <p className="text-slate-300 mb-8">
            Existen dos maneras principales de usar un teleprompter, especialmente con herramientas web como PromptNinja, que no requieren la compra de equipos costosos.
        </p>

        <div className="mb-12 space-y-8">
            <div className="bg-slate-800 p-6 rounded-lg">
                <h3 className="font-bold text-xl text-white mb-3">Método 1: El Dispositivo Único (El Inicio Rápido)</h3>
                <p className="text-slate-400 mb-4">
                    Ideal para quienes están empezando o para grabaciones rápidas. Usas el mismo dispositivo para grabar y leer.
                </p>
                <ol className="list-decimal list-inside space-y-2 text-slate-300">
                    <li>Abre la cámara de tu móvil o la webcam de tu portátil.</li>
                    <li>En una ventana al lado, abre <strong>PromptNinja</strong> en el navegador.</li>
                    <li>Pega tu guion, ajusta el tamaño de la fuente y la velocidad.</li>
                    <li>Coloca la ventana del teleprompter lo más cerca posible de la lente de la cámara.</li>
                    <li>Empieza a grabar y luego dale al play en el teleprompter.</li>
                </ol>
                <p className="text-sm text-slate-500 mt-4"><strong>Desventaja:</strong> Es difícil controlar el desplazamiento sin interrumpir la grabación o desviar la mirada. Funciona mejor para vídeos cortos.</p>
            </div>

            <SEOContentHowTo
                title="Método 2: El Control Remoto (La Forma Profesional)"
                schemaTitle="Cómo usar Teleprompter con Control Remoto"
                tools={["Ordenador o Tablet", "Smartphone"]}
                totalTime="PT2M"
                className="border-2 border-blue-500 rounded-lg p-4"
                steps={[
                    {
                        title: "Prepara la Pantalla Principal",
                        text: "Abre PromptNinja en el dispositivo que servirá de pantalla (portátil, tablet, otro monitor). Esta será la pantalla que leerás."
                    },
                    {
                        title: "Activa el Control Remoto",
                        text: "En tu móvil, abre PromptNinja y selecciona la opción \"Control Remoto\" en el menú inicial."
                    },
                    {
                        title: "Conecta los Dispositivos",
                        text: "Escanea el código QR que aparece en la pantalla principal con la cámara de tu móvil. La conexión es P2P (Peer-to-Peer) vía Wi-Fi, instantánea y segura."
                    },
                    {
                        title: "Controla tu Grabación",
                        text: "¡Listo! Tu móvil es ahora un control remoto. Dale al play, pausa, ajusta la velocidad y edita el texto sin moverte de tu sitio."
                    }
                ]}
            />
            <p className="text-sm text-green-400 mt-2 px-4"><strong>Ventaja:</strong> Control total sobre el flujo de la grabación, permitiendo pausas dramáticas, aceleración y una presentación mucho más dinámica y natural.</p>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Errores Comunes al Usar un Teleprompter (y Cómo Evitarlos)</h2>
        <div className="space-y-4">
            <div className="bg-slate-800 p-4 rounded-lg">
                <h3 className="font-bold text-lg text-white">1. Ojos "Bailarines" en la Pantalla</h3>
                <p className="text-slate-300 mt-2"><strong>El Error:</strong> Tus ojos se mueven visiblemente de izquierda a derecha mientras lees, delatando el uso del teleprompter. <br /> <strong>La Solución:</strong> Aumenta la distancia entre tú y la pantalla. Cuanto más lejos estés, menor será el movimiento ocular percibido. Además, reduce el ancho del cuadro de texto en el teleprompter para que las líneas sean más cortas.</p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg">
                <h3 className="font-bold text-lg text-white">2. Ritmo Monótono y Robótico</h3>
                <p className="text-slate-300 mt-2"><strong>El Error:</strong> Entras en "modo lectura" y tu voz pierde emoción, sonando como un robot. <br /> <strong>La Solución:</strong> No escribas el guion como un texto formal. Usa frases cortas, puntuación que indique pausas e incluso anotaciones como "(sonreír aquí)" o "(hacer una pausa)". Practica leer el texto en voz alta una vez antes de grabar para encontrar el ritmo natural.</p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg">
                <h3 className="font-bold text-lg text-white">3. Velocidad de Desplazamiento Incorrecta</h3>
                <p className="text-slate-300 mt-2"><strong>El Error:</strong> El desplazamiento es demasiado lento, creando pausas extrañas, o demasiado rápido, haciéndote tropezar con las palabras. <br /> <strong>La Solución:</strong> Aquí es donde brilla el <strong>control remoto P2P de PromptNinja</strong>. Te permite ajustar la velocidad en tiempo real con latencia cero. Empieza un poco más lento y acelera a medida que coges el ritmo. Un buen consejo es tener siempre la siguiente línea visible en la parte superior de la pantalla.</p>
            </div>
        </div>

        <div className="text-center mt-12">
            <a
                href="https://promptninja.solutionkit.com.br"
                className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 font-bold py-3 px-8 mx-auto rounded-full transition hover:brightness-110"
                style={{ color: 'white' }}
            >
                Transforma Tus Vídeos Hoy. ¡Usa PromptNinja Gratis!
            </a>
            <p className="text-slate-400 mt-4 text-sm">Control remoto, sin instalación, sin límite de tiempo.</p>
        </div>
    </>
);
