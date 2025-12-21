
import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { SEOContentHowTo } from "../../../../components/seo/SEOContentHowTo";

export const PrivacidadeSegurancaES = () => (
    <>
        <h1 className="text-4xl font-bold text-white mb-6 leading-tight">Privacidad y Seguridad: Por Qué No Queremos Tus Datos</h1>

        <div className="bg-red-900/20 border border-red-500/30 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-bold text-red-400 mb-2">🚫 El Problema de la Industria</h2>
            <p className="text-slate-300">
                La mayoría de apps de teleprompter "gratis" exigen que crees una cuenta. ¿Por qué? Para rastrear tus hábitos, leer tus guiones para entrenar IA, o vender tu email. Te tratan como el producto.
            </p>
        </div>

        <p className="mb-6 text-xl text-slate-300">
            En PromptNinja, adoptamos una arquitectura radical de <strong>Cero Datos</strong>.
        </p>

        <p className="mb-8">
            No sabemos quién eres. No tenemos tus emails. No tenemos tus guiones. Todo lo que escribes queda grabado magnéticamente en el chip de memoria de <strong>tu propio dispositivo</strong>, y en ningún otro lugar.
        </p>

        <div className="grid md:grid-cols-2 gap-8 my-12">

            <div className="bg-slate-800 p-8 rounded-xl border border-green-500/30 shadow-lg">
                <h2 className="text-2xl font-bold text-green-400 mb-4 flex items-center gap-3">
                    <span className="text-3xl">🛡️</span> Arquitectura "Local-First"
                </h2>
                <p className="text-slate-300 mb-4">
                    Usamos tecnología llamada <code>LocalStorage</code> e <code>IndexedDB</code>. Es como una caja fuerte dentro de tu navegador.
                </p>
                <div className="space-y-4">
                    <div className="flex items-start gap-3">
                        <span className="text-green-500 text-xl">✅</span>
                        <p className="text-sm text-slate-300"><strong>Tus Textos:</strong> Guardados solo en tu HD/Móvil.</p>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="text-green-500 text-xl">✅</span>
                        <p className="text-sm text-slate-300"><strong>Tu Micrófono:</strong> Audio se procesa en tiempo real RAM y se descarta. Nada se graba.</p>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="text-green-500 text-xl">✅</span>
                        <p className="text-sm text-slate-300"><strong>Fugas:</strong> Imposible fugar tus datos, pues no los tenemos.</p>
                    </div>
                </div>
            </div>

            <div className="bg-slate-800 p-8 rounded-xl border border-blue-500/30">
                <h2 className="text-2xl font-bold text-blue-400 mb-4 flex items-center gap-3">
                    <span className="text-3xl">📡</span> Conexión P2P Blindada
                </h2>
                <p className="text-slate-300 mb-4">
                    "¿Pero cómo controla el móvil al PC si no pasa por el servidor?"
                </p>
                <p className="text-sm text-slate-400 mb-4">
                    Usamos <strong>WebRTC</strong>. Nuestro servidor actúa solo como "guía telefónica": presenta la IP de tu móvil a tu PC. Tras ese "apretón de manos" inicial (que dura milisegundos), el servidor sale de la conversación.
                </p>
                <div className="bg-black/30 p-4 rounded border border-slate-700">
                    <p className="text-xs text-slate-400 font-mono">
                        [Móvil] &lt;========== Túnel Cifrado (DTLS) ==========&gt; [PC]
                    </p>
                    <p className="text-xs text-green-500 mt-2 font-mono">Estado: Enlace Directo (Sin Intermediarios)</p>
                </div>
            </div>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Auditoría: ¿Cómo verificar?</h2>
        <p className="text-slate-300 mb-6">
            No confíes en nosotros. Confía en la tecnología. Haz la prueba del "Modo Avión":
        </p>

        <SEOContentHowTo
            title=""
            schemaTitle="Cómo Verificar Privacidad de PromptNinja"
            totalTime="PT1M"
            tools={["Navegador", "PromptNinja"]}
            steps={[
                {
                    title: "1. Carga App",
                    text: "Abre PromptNinja y escribe un secreto en el editor."
                },
                {
                    title: "2. Corta Internet",
                    text: "Quita cable de red o apaga Wi-Fi."
                },
                {
                    title: "3. Prueba",
                    text: "Sigue usando. ¿La app funciona 100%? Sí. Si estuviéramos enviando tus datos a la nube de la NSA, la app se congelaría o daría error de conexión."
                },
                {
                    title: "4. Borrado Total",
                    text: "¿Quieres borrar todo? Solo limpia caché del navegador o clic icono 'Papelera' en app. Datos son triturados digitalmente de tu dispositivo."
                }
            ]}
        />

        <div className="mt-12 p-6 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <h3 className="text-lg font-bold text-yellow-500 mb-2">Compromiso con Periodistas y Empresas</h3>
            <p className="text-slate-300">
                Sabemos que muchos usuarios PromptNinja son reporteros cubriendo notas sensibles o CEOs grabando comunicados internos. Nuestra garantía "No-Login" es tu mayor protección legal y técnica contra espionaje industrial o filtración de primicias.
            </p>
        </div>


        <SEOContentFAQ
            title="FAQ de Privacidad"
            items={[
                {
                    question: "¿PromptNinja usa Cookies?",
                    answer: "Solo cookies técnicas esenciales para guardar tus preferencias (tamaño fuente, velocidad) localmente. No usamos cookies de rastreo publicitario intrusivo de terceros."
                },
                {
                    question: "¿Si mi computadora se rompe, pierdo mis guiones?",
                    answer: "Sí. Como no tenemos copia en la nube, eres único dueño de los datos. Recomendamos que siempre tengas tu guion original guardado en Word/Docs como respaldo."
                },
                {
                    question: "¿El reconocimiento de voz se envía a Google?",
                    answer: "Depende del navegador. En Chrome, el procesamiento de voz puede pasar por servidores de Google para mayor precisión (política del propio navegador). Si privacidad absoluta es vital, recomendamos usar solo modo scroll manual o automático, sin activar micrófono."
                }
            ]}
        />
    </>
);
