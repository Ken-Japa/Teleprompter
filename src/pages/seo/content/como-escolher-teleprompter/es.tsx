import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { ROUTES_CONFIG } from "../../../../config/routes";

export const ComoEscolherTeleprompterES = () => (
    <>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Cómo Elegir el Teleprompter Ideal: Guía de Compra Completa
        </h2>

        <p className="lead text-xl text-slate-300 mb-8 font-medium">
            Toma la decisión correcta para tu setup de video. <strong>Descubre qué considerar antes de comprar</strong> un teleprompter y conoce cuándo una solución de software es superior al hardware.
        </p>

        <p className="text-slate-300 mb-8 leading-relaxed">
            En esta guía exhaustiva, navegamos por el complejo mercado de teleprompters para ayudarte a ahorrar tiempo y dinero. Ya sea para un estudio profesional, un canal de YouTube o reuniones remotas, entender las diferencias fundamentales entre equipos físicos costosos y soluciones de software modernas es crucial. Analizamos en detalle los pros y contras de cada tipo de equipo, desde sistemas tradicionales de espejo hasta el poder de apps online como PromptNinja. Aprende a evaluar la calidad del vidrio, portabilidad, facilidad de control y cómo integrar herramientas gratuitas para obtener resultados de élite sin invertir fortunas iniciales. Elige sabiamente y concéntrate en lo que realmente importa: la claridad y autoridad de tu mensaje.
        </p>

        <div className="bg-blue-600/10 border border-blue-500/20 rounded-2xl p-6 md:p-8 text-center mb-12">
            <h3 className="text-2xl font-bold text-white mb-4">Prueba Antes de Invertir</h3>
            <p className="text-slate-300 mb-6">
                No gastes dinero ahora. Usa la pantalla que ya tienes para probar tu flujo de trabajo
                y entender qué es lo que realmente necesitas en un teleprompter.
            </p>
            <a href="/?lang=es#app" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all hover:scale-105 shadow-lg shadow-blue-500/25">
                Abrir Teleprompter Gratis
            </a>
        </div>

        <div className="bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg mb-12">
            <h3 className="text-3xl font-bold text-white mb-6">Los 3 Tipos Principales de Teleprompter</h3>

            <div className="space-y-6">
                <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-purple-500">
                    <h3 className="text-xl font-bold text-white mb-2">1. Teleprompter de Cámara (iPad/Tablet)</h3>
                    <p className="text-slate-300 mb-2"><strong>Qué es:</strong> Un soporte que se acopla a la lente de la DSLR, con un vidrio que refleja la pantalla de una tablet.</p>
                    <p className="text-sm text-slate-400"><strong>Pros:</strong> Contacto visual directo con la lente, profesional. <strong>Contras:</strong> Alto costo ($100+), requiere tablet y cámara.</p>
                </div>

                <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-blue-500">
                    <h3 className="text-xl font-bold text-white mb-2">2. Teleprompter Presidencial (Escenario)</h3>
                    <p className="text-slate-300 mb-2"><strong>Qué es:</strong> Paneles de vidrio transparente sobre pedestales. Usados en discursos.</p>
                    <p className="text-sm text-slate-400"><strong>Pros:</strong> Invisible para la audiencia. <strong>Contras:</strong> Muy caro, difícil de montar y transportar.</p>
                </div>

                <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-green-500">
                    <h3 className="text-xl font-bold text-white mb-2">3. Teleprompter de Software (Web/App)</h3>
                    <p className="text-slate-300 mb-2"><strong>Qué es:</strong> Apps como PromptNinja que corren en pantallas de PC, Laptop o Celular, justo debajo de la webcam.</p>
                    <p className="text-sm text-slate-400"><strong>Pros:</strong> Gratis, configuración instantánea, funciona con webcam. <strong>Contras:</strong> Mirada ligeramente por encima de la lente (imperceptible a 1m de distancia).</p>
                </div>
            </div>
        </div>

        <h3 className="text-3xl font-bold text-white mt-12 mb-6">Checklist de Compra: ¿Qué Considerar?</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            <li className="flex items-center gap-3 bg-slate-800/50 p-4 rounded-lg">
                <span className="text-green-400 text-xl">✅</span>
                <span className="text-slate-300">Tamaño de Pantalla (Legibilidad)</span>
            </li>
            <li className="flex items-center gap-3 bg-slate-800/50 p-4 rounded-lg">
                <span className="text-green-400 text-xl">✅</span>
                <span className="text-slate-300">Portabilidad (Peso)</span>
            </li>
            <li className="flex items-center gap-3 bg-slate-800/50 p-4 rounded-lg">
                <span className="text-green-400 text-xl">✅</span>
                <span className="text-slate-300">Facilidad de Control (Control Remoto)</span>
            </li>
            <li className="flex items-center gap-3 bg-slate-800/50 p-4 rounded-lg">
                <span className="text-green-400 text-xl">✅</span>
                <span className="text-slate-300">Compatibilidad (iOS, Android, Windows)</span>
            </li>
        </ul>

        <h3 className="text-3xl font-bold text-white mt-12 mb-6">Veredicto: ¿Por Dónde Empezar?</h3>
        <p className="text-slate-300 mb-8">
            Si estás empezando un canal de YouTube o grabando videos para redes sociales, <strong>no compres hardware ahora</strong>. Empieza con Software.
        </p>
        <p className="text-slate-300 mb-8">
            <strong>PromptNinja</strong> resuelve el 90% de los casos de uso sin costar un centavo. Simula la experiencia del teleprompter físico usando la pantalla que ya tienes. Si un día sientes la necesidad de comprar un espejo (vidrio beam splitter) para usar con una cámara pro, PromptNinja tiene "Modo Espejo" listo para eso también.
        </p>

        <SEOContentFAQ
            title="Preguntas de Compra"
            items={[
                {
                    question: "¿Vale la pena comprar esos teleprompters baratos de $30?",
                    answer: "Usualmente no. El vidrio suele ser de baja calidad (oscurece demasiado la imagen) y el plástico es frágil. Mejor usar una app en tu laptop."
                },
                {
                    question: "¿Necesito un control remoto físico?",
                    answer: "Con PromptNinja, no. Conviertes cualquier celular viejo (o el actual) en un control remoto vía Wi-Fi. Es más responsivo que los controles Bluetooth baratos."
                },
                {
                    question: "¿Qué tamaño de pantalla es ideal?",
                    answer: "Depende de la distancia. Para webcam (60-90cm), la pantalla de la laptop es perfecta. Para cámara lejos (2m+), usa un monitor grande o TV con texto gigante."
                }
            ]}
        />

        <div className="text-center mt-12 pb-12">
            <a
                href="#app?lang=es"
                className="inline-block bg-gradient-to-r from-purple-700 to-blue-700 font-bold py-4 px-10 rounded-full transition hover:scale-105 shadow-xl text-white text-lg"
            >
                Ahorra $100: Usa PromptNinja Gratis
            </a>
        </div>

        <div className="border-t border-slate-800 pt-12 mt-12">
            <h3 className="text-2xl font-bold text-white mb-6">Ver También</h3>
            <ul className="space-y-4">
                <li>
                    <a href={ROUTES_CONFIG.SEO_VS_TELELESTRADOR.paths.es} className="text-purple-400 hover:text-purple-300 hover:underline text-lg">
                        📺 Teleprompter vs Telestrator: ¿Cuál es la Diferencia?
                    </a>
                </li>
                <li>
                    <a href={ROUTES_CONFIG.SEO_DIY.paths.es} className="text-purple-400 hover:text-purple-300 hover:underline text-lg">
                        🛠️ Cómo Hacer un Teleprompter Casero en 5 Minutos
                    </a>
                </li>
                <li>
                    <a href={ROUTES_CONFIG.SEO_O_QUE_E.paths.es} className="text-purple-400 hover:text-purple-300 hover:underline text-lg">
                        🤔 ¿Qué es un Teleprompter? Guía Básica
                    </a>
                </li>
            </ul>
        </div>
    </>
);
