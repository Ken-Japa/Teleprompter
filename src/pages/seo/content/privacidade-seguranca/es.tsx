
import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { SEOContentHowTo } from "../../../../components/seo/SEOContentHowTo";

export const PrivacidadeSegurancaES = () => (
    <>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Privacidad y Seguridad: Tus Guiones Protegidos y 100% Locales
        </h2>

        <p className="lead text-xl text-slate-300 mb-8 font-medium">
            Tu privacidad es nuestra absoluta prioridad. En PromptNinja, adoptamos una arquitectura <strong>Zero Data</strong>, asegurando que tus guiones y grabaciones nunca salgan de tu dispositivo.
        </p>

        <p className="text-slate-300 mb-8 leading-relaxed">
            En este compromiso con tu seguridad digital, detallamos por qué PromptNinja es la opción más confiable para periodistas, ejecutivos y creadores de contenido que valoran la discreción. Entiende cómo nuestra tecnología Peer-to-Peer WebRTC permite el control remoto sin necesidad de intermediarios o almacenamiento en la nube. Descubre cómo procesamos cada comando y cada palabra localmente en tu navegador, eliminando cualquier riesgo de fuga de información o espionaje industrial. Con PromptNinja, tienes el poder de un teleprompter profesional con la tranquilidad de saber que tus datos te pertenecen exclusivamente a ti.
        </p>

        <div className="grid md:grid-cols-2 gap-8 my-12">

            <div className="bg-slate-800 p-8 rounded-xl border border-green-500/30 shadow-lg">
                <h3 className="text-2xl font-bold text-green-400 mb-4 flex items-center gap-3">
                    <span className="text-3xl">🛡️</span> Arquitectura "Local-First"
                </h3>
                <p className="text-slate-300 mb-4">
                    Usamos tecnologías llamadas <code>LocalStorage</code> e <code>IndexedDB</code>. Es como una caja fuerte dentro de tu navegador.
                </p>
                <div className="space-y-4">
                    <div className="flex items-start gap-3">
                        <span className="text-green-500 text-xl">✅</span>
                        <p className="text-sm text-slate-300"><strong>Tus Guiones:</strong> Guardados solo en tu Disco/Móvil.</p>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="text-green-500 text-xl">✅</span>
                        <p className="text-sm text-slate-300"><strong>Tu Micrófono:</strong> Audio se procesa en RAM a tiempo real y se descarta. Nada se graba.</p>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="text-green-500 text-xl">✅</span>
                        <p className="text-sm text-slate-300"><strong>Fugas:</strong> Imposible filtrar tus datos, porque no los tenemos.</p>
                    </div>
                </div>
            </div>

            <div className="bg-slate-800 p-8 rounded-xl border border-blue-500/30">
                <h3 className="text-2xl font-bold text-blue-400 mb-4 flex items-center gap-3">
                    <span className="text-3xl">📡</span> Conexión P2P Blindada
                </h3>
                <p className="text-slate-300 mb-4">
                    "¿Pero cómo controla el celular a la PC si no pasa por el servidor?"
                </p>
                <p className="text-sm text-slate-400 mb-4">
                    Usamos <strong>WebRTC</strong>. Nuestro servidor actúa solo como una "guía telefónica": presenta la IP de tu celular a tu PC. Tras este "apretón de manos" inicial (que dura milisegundos), el servidor abandona la conversación.
                </p>
                <div className="bg-black/30 p-4 rounded border border-slate-700">
                    <p className="text-xs text-slate-400 font-mono">
                        [Celular] &lt;========== Túnel Encriptado (DTLS) ==========&gt; [PC]
                    </p>
                    <p className="text-xs text-green-500 mt-2 font-mono">Estado: Enlace Directo (Sin Intermediario)</p>
                </div>
            </div>
        </div>

        <h3 className="text-3xl font-bold text-white mt-12 mb-6">Auditoría: ¿Cómo verificar?</h3>
        <p className="text-slate-300 mb-6">
            No confíes en nosotros. Confía en la tecnología. Haz la prueba del "Modo Avión":
        </p>

        <SEOContentHowTo
            title=""
            schemaTitle="Cómo Verificar la Privacidad de PromptNinja"
            totalTime="PT1M"
            tools={["Navegador", "PromptNinja"]}
            steps={[
                {
                    title: "1. Carga la App",
                    text: "Abre PromptNinja y escribe un secreto en el editor."
                },
                {
                    title: "2. Corta Internet",
                    text: "Desconecta el cable de red o apaga el Wi-Fi."
                },
                {
                    title: "3. Prueba",
                    text: "Sigue usándolo. ¿La app funciona 100%? Sí. Si estuviéramos enviando tus datos a la nube de la NSA, la app se congelaría o daría error de conexión."
                },
                {
                    title: "4. Borrado Total",
                    text: "¿Quieres borrar todo? Solo limpia la caché del navegador o haz clic en el icono de 'Basura' en la app. Los datos se trituran digitalmente de tu dispositivo."
                }
            ]}
        />

        <div className="mt-12 p-6 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <h3 className="text-lg font-bold text-yellow-500 mb-2">Compromiso con Periodistas y Empresas</h3>
            <p className="text-slate-300">
                Sabemos que muchos usuarios de PromptNinja son reporteros cubriendo historias sensibles o CEOs grabando comunicados internos. Nuestra garantía "Sin-Login" es tu mayor protección legal y técnica contra el espionaje industrial o fugas de primicias.
            </p>
        </div>


        <SEOContentFAQ
            title="FAQ de Privacidad"
            items={[
                {
                    question: "¿PromptNinja usa Cookies?",
                    answer: "Solo cookies técnicas esenciales para guardar tus preferencias (tamaño de letra, velocidad) localmente. No usamos cookies de rastreo intrusivas de terceros."
                },
                {
                    question: "¿Si se rompe mi computadora, pierdo mis guiones?",
                    answer: "Sí. Como no tenemos copia en la nube, tú eres el único dueño de los datos. Recomendamos siempre tener tu guion original guardado en Word/Docs como respaldo."
                },
                {
                    question: "¿El reconocimiento de voz se envía a Google?",
                    answer: "Depende del navegador. En Chrome, el procesamiento de voz puede pasar por servidores de Google para mayor precisión (política del propio navegador). Si la privacidad absoluta es vital, recomendamos usar solo modo manual o scroll automático, sin activar el micrófono."
                }
            ]}
        />
    </>
);
