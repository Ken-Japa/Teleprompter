
import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";

export const PrivacidadeSegurancaES = () => (
    <>
        <h1 className="text-4xl font-bold text-white mb-6">Privacidad y Seguridad: Cómo PromptNinja Protege tus Datos</h1>
        <p className="mb-6 text-xl text-slate-300">
            En un mundo donde tus datos son moneda de cambio, PromptNinja adopta una postura radical: <strong>no queremos tus datos</strong>. Nuestra arquitectura fue diseñada desde cero para garantizar que tus guiones y presentaciones permanezcan privados y bajo tu control.
        </p>

        <div className="grid md:grid-cols-2 gap-8 my-12">

            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">🚫</span> Sin Login, Sin Rastro
                </h2>
                <p className="text-slate-300 mb-4">
                    La mayoría de los servicios requieren que crees una cuenta para poder rastrear tu uso y almacenar tus datos. PromptNinja no.
                </p>
                <ul className="list-disc pl-5 text-slate-300 space-y-2">
                    <li>No requerimos correo electrónico ni contraseña.</li>
                    <li>No hay base de datos de usuarios.</li>
                    <li>Lo que escribes en el navegador, se queda en el navegador.</li>
                </ul>
            </div>

            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">🔒</span> Procesamiento Local
                </h2>
                <p className="text-slate-300 mb-4">
                    Todo el procesamiento del texto ocurre en tu dispositivo (Client-side).
                </p>
                <ul className="list-disc pl-5 text-slate-300 space-y-2">
                    <li>Tus guiones <strong>nunca</strong> se envían a nuestros servidores.</li>
                    <li>Si tu internet se cae, el teleprompter sigue funcionando.</li>
                    <li>Al cerrar la pestaña, los datos se borran de la memoria (a menos que los guardes explícitamente).</li>
                </ul>
            </div>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">La Magia de WebRTC y P2P</h2>
        <p className="text-slate-300 mb-6">
            Para permitirte controlar el teleprompter con tu móvil, usamos una tecnología avanzada llamada <strong>WebRTC (Web Real-Time Communication)</strong>. Esto crea un túnel directo entre tu ordenador y tu móvil.
        </p>

        <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-xl">
            <h3 className="text-xl font-bold text-blue-400 mb-4">Cómo funciona la conexión P2P (Peer-to-Peer):</h3>
            <ol className="relative border-l border-slate-700 ml-4 space-y-8">
                <li className="mb-10 ml-6">
                    <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-900 rounded-full -left-4 ring-4 ring-slate-900 text-blue-300 font-bold">1</span>
                    <h4 className="font-bold text-white text-lg">Handshake (Apretón de Manos)</h4>
                    <p className="text-slate-400 mt-2">
                        Usamos un servidor de señalización solo para presentar tu móvil a tu ordenador. Intercambia códigos cifrados temporales para que los dispositivos se encuentren. <strong>Ningún dato de tu guion pasa por aquí.</strong>
                    </p>
                </li>
                <li className="mb-10 ml-6">
                    <span className="absolute flex items-center justify-center w-8 h-8 bg-green-900 rounded-full -left-4 ring-4 ring-slate-900 text-green-300 font-bold">2</span>
                    <h4 className="font-bold text-white text-lg">Túnel Directo</h4>
                    <p className="text-slate-400 mt-2">
                        Una vez conectados, los dispositivos crean un túnel cifrado directo (DTLS). A partir de ese momento, la comunicación es 100% directa entre ellos, sin pasar por ningún servidor intermedio.
                    </p>
                </li>
                <li className="ml-6">
                    <span className="absolute flex items-center justify-center w-8 h-8 bg-purple-900 rounded-full -left-4 ring-4 ring-slate-900 text-purple-300 font-bold">3</span>
                    <h4 className="font-bold text-white text-lg">Latencia Cero & Seguridad Total</h4>
                    <p className="text-slate-400 mt-2">
                        Como los datos viajan solo en tu red local (o directamente vía internet por P2P), la respuesta es instantánea e imposible de interceptar masivamente.
                    </p>
                </li>
            </ol>
        </div>

        <div className="mt-12 p-6 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <h3 className="text-lg font-bold text-yellow-500 mb-2">Resumen de Seguridad</h3>
            <p className="text-slate-300">
                Tus guiones son tuyos. PromptNinja es solo la herramienta que los muestra. No vemos, no guardamos y no vendemos tus textos. Es seguridad por diseño, no por política.
            </p>
        </div>


        <SEOContentFAQ
            title="Preguntas Frecuentes sobre Privacidad"
            items={[
                {
                    question: "¿PromptNinja tiene acceso a mi cámara?",
                    answer: "Solo cuando usas el teleprompter, y todo el procesamiento de video se realiza localmente en tu navegador. No se nos envía ninguna imagen."
                },
                {
                    question: "¿Dónde se guardan mis textos?",
                    answer: "En el almacenamiento local (LocalStorage) de tu propio navegador. Si borras la caché, los textos desaparecen. No tenemos copias de seguridad porque no tenemos tus datos."
                },
                {
                    question: "¿Es seguro para guiones confidenciales?",
                    answer: "Sí. Como no hay transmisión de datos de texto a la nube, es imposible que haya fugas por parte del servidor. Es como escribir en el Bloc de Notas de tu PC."
                }
            ]}
        />
    </>
);
