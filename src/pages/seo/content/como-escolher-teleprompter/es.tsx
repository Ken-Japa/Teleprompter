import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";

export const ComoEscolherTeleprompterES = () => (
    <>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Cómo Elegir el Teleprompter Ideal en 2026: La Guía Definitiva
        </h1>

        <p className="lead text-xl text-slate-300 mb-8">
            ¿Buscaste en Amazon y te confundiste con tantas opciones? Vidrio, iPad, para celular, de estudio... los precios van de $30 a $1,000. Antes de abrir la billetera, lee esta guía. La mejor opción puede costar cero.
        </p>

        <div className="bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Los 3 Tipos Principales de Teleprompter</h2>

            <div className="space-y-6">
                <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-purple-500">
                    <h3 className="text-xl font-bold text-white mb-2">1. Teleprompter de Cámara (iPad/Tablet)</h3>
                    <p className="text-slate-300 mb-2"><strong>Qué es:</strong> Una montura que se acopla a la lente de la cámara DSLR, con un vidrio que refleja la pantalla de una tablet.</p>
                    <p className="text-sm text-slate-400"><strong>Pros:</strong> Mirada directa a la lente, profesional. <strong>Contras:</strong> Costo alto ($100+), requiere tablet y cámara.</p>
                </div>

                <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-blue-500">
                    <h3 className="text-xl font-bold text-white mb-2">2. Teleprompter Presidencial (Escenario)</h3>
                    <p className="text-slate-300 mb-2"><strong>Qué es:</strong> Paneles de vidrio transparentes en pedestales. Usado en discursos.</p>
                    <p className="text-sm text-slate-400"><strong>Pros:</strong> Invisible para la audiencia. <strong>Contras:</strong> Carísimo, difícil de montar y transportar.</p>
                </div>

                <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-green-500">
                    <h3 className="text-xl font-bold text-white mb-2">3. Teleprompter de Software (Web/App)</h3>
                    <p className="text-slate-300 mb-2"><strong>Qué es:</strong> Apps como PromptNinja que corren en la pantalla de la PC, Laptop o Celular, justo debajo de la cámara web.</p>
                    <p className="text-sm text-slate-400"><strong>Pros:</strong> Gratis, configuración instantánea, funciona con webcam. <strong>Contras:</strong> Mirada ligeramente por encima de la lente (imperceptible a 1m de distancia).</p>
                </div>
            </div>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Checklist de Compra: ¿Qué Considerar?</h2>
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

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Veredicto: ¿Por Dónde Empezar?</h2>
        <p className="text-slate-300 mb-8">
            Si estás comenzando un canal de YouTube o grabando videos para redes sociales, <strong>no compres hardware ahora</strong>. Comienza con Software.
        </p>
        <p className="text-slate-300 mb-8">
            <strong>PromptNinja</strong> resuelve el 90% de los casos de uso sin costar un centavo. Simula la experiencia de un teleprompter físico usando la pantalla que ya tienes. Si un día sientes la necesidad de comprar un espejo (vidrio beam splitter) para usar con cámara profesional, PromptNinja tiene el "Modo Espejo" listo para eso también.
        </p>

        <SEOContentFAQ
            title="Dudas al Comprar"
            items={[
                {
                    question: "¿Vale la pena comprar esos teleprompters baratos de $30?",
                    answer: "Generalmente no. El vidrio suele ser de baja calidad (oscurece mucho la imagen) y el plástico es frágil. Mejor usa una app en la laptop."
                },
                {
                    question: "¿Necesito un control remoto físico?",
                    answer: "Con PromptNinja, no. Transformas cualquier celular viejo (o el tuyo actual) en un control remoto vía Wi-Fi. Es más receptivo que los controles Bluetooth baratos."
                },
                {
                    question: "¿Qué tamaño de pantalla es ideal?",
                    answer: "Depende de la distancia. Para webcam (50cm-1m), la pantalla de la laptop es perfecta. Para cámara lejos (2m+), usa un monitor o TV grande con texto gigante."
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
    </>
);
