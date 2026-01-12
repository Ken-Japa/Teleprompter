import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { ROUTES_CONFIG } from "../../../../config/routes";

export const HistoriaDoTeleprompterES = () => (
    <>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            La Historia Secreta del Teleprompter: De Rollos de Papel a la Inteligencia Artificial
        </h2>

        <p className="lead text-xl text-slate-300 mb-8">
            ¿Alguna vez te has preguntado cómo los presidentes dan discursos durante horas sin fallar una coma, o cómo los presentadores de noticias miran fijamente a la cámara mientras leen noticias urgentes? La respuesta no es "memoria fotográfica", es tecnología. Viajemos en el tiempo para descubrir cómo una caja de cartón evolucionó hasta convertirse en la aplicación que tienes en tu bolsillo hoy.
        </p>

        <div className="bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg mb-12">
            <h3 className="text-3xl font-bold text-white mb-6">1950: El Nacimiento de una Leyenda</h3>
            <p className="text-slate-300 mb-4">
                Imagina a un actor de Broadway, Fred Barton Jr., desesperado. Tenía que memorizar montañas de texto para la televisión en vivo (sí, no había "corte y graba de nuevo" en ese entonces). El miedo a olvidar las líneas, quedarse "en blanco", era aterrador.
            </p>
            <p className="text-slate-300">
                ¿La solución? En 1950, Fred, junto con Hubert Schlafly e Irving Berlin Khan, creó el primer "Teleprompter". Era un artilugio mecánico: un rollo motorizado de papel de carnicero dentro de una maleta, con líneas escritas en letras gigantes. ¡Alguien tenía que girar una manivela manualmente para que el texto subiera!
            </p>
        </div>

        <h3 className="text-3xl font-bold text-white mt-12 mb-6">La Evolución en 4 Actos</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="border border-slate-700 p-6 rounded-lg bg-slate-800/50">
                <h3 className="text-xl font-bold text-purple-400 mb-2">1. La Era del Papel (1950-1980)</h3>
                <p className="text-slate-400 text-sm">
                    Rollos físicos girados a mano. Si el operador estornudaba y giraba demasiado rápido, el presentador se quedaba mudo. Era tenso, caro y pesado.
                </p>
            </div>
            <div className="border border-slate-700 p-6 rounded-lg bg-slate-800/50">
                <h3 className="text-xl font-bold text-blue-400 mb-2">2. La Revolución del Vidrio (1980s)</h3>
                <p className="text-slate-400 text-sm">
                    Surge el "Beam Splitter Glass". Un vidrio especial a 45 grados que refleja el texto desde un monitor en el suelo pero deja ver a la cámara a través de él. Fue la magia del contacto "ojo a ojo".
                </p>
            </div>
            <div className="border border-slate-700 p-6 rounded-lg bg-slate-800/50">
                <h3 className="text-xl font-bold text-green-400 mb-2">3. Digitalización (1990-2010)</h3>
                <p className="text-slate-400 text-sm">
                    Las computadoras reemplazaron los rollos. Surgió software dedicado pero aún requería hardware costoso. El teleprompter "presidencial" (ese vidrio en un pedestal) se convirtió en un ícono.
                </p>
            </div>
            <div className="border border-slate-700 p-6 rounded-lg bg-slate-800/50">
                <h3 className="text-xl font-bold text-yellow-400 mb-2">4. La Era Web y Móvil (Hoy)</h3>
                <p className="text-slate-400 text-sm">
                    Aquí entra <strong>PromptNinja</strong>. La tecnología que costaba miles de dólares ahora corre en tu navegador, gratis. Controlado por voz (IA) y conectado vía Wi-Fi.
                </p>
            </div>
        </div>

        <h3 className="text-3xl font-bold text-white mt-12 mb-6">Curiosidades Históricas</h3>
        <ul className="list-disc list-inside space-y-3 text-slate-300 mb-12">
            <li><strong>Dwight D. Eisenhower</strong> fue el primer presidente de EE. UU. en usar un teleprompter en 1952.</li>
            <li>Al principio, los operadores de teleprompter eran considerados "artistas" porque necesitaban sentir el ritmo del orador, como un músico.</li>
            <li>La palabra "Teleprompter" era originalmente una marca registrada, pero se convirtió en un término genérico para el producto (como Kleenex o Xerox).</li>
        </ul>

        <h3 className="text-3xl font-bold text-white mt-12 mb-6">El Futuro es Ahora</h3>
        <p className="text-slate-300 mb-8">
            Hoy, no necesitas un equipo de TV. Con PromptNinja, tienes un estudio en tu bolsillo. La tecnología ha evolucionado para permitir que creadores de YouTube, profesores y vendedores tengan la misma elocuencia que un presentador de noticias, sin el costo.
        </p>

        <SEOContentFAQ
            title="Preguntas de Historia"
            items={[
                {
                    question: "¿Quién inventó el Teleprompter?",
                    answer: "Fueron Hubert Schlafly, Irving Berlin Khan y Fred Barton Jr. en la década de 1950. ¡Hubert Schlafly no usó un teleprompter públicamente hasta que tuvo 88 años!"
                },
                {
                    question: "¿Cuánto costaba un teleprompter antiguo?",
                    answer: "El equipo profesional costaba (y algunos aún cuestan) miles de dólares. Hoy, software como PromptNinja ha democratizado esto a $0."
                },
                {
                    question: "¿Qué es el 'Teleprompter Presidencial'?",
                    answer: "Son esos dos paneles de vidrio transparentes en pedestales al lado del podio. Permiten al orador mirar a la izquierda y derecha de la audiencia mientras lee el discurso, sin parecer que está leyendo."
                }
            ]}
        />

        <div className="text-center mt-12 pb-12">
            <a
                href="#app?lang=es"
                className="inline-block bg-gradient-to-r from-purple-600 to-blue-500 font-bold py-4 px-10 rounded-full transition hover:scale-105 shadow-xl text-white text-lg"
            >
                Sé Parte de la Historia: Usa PromptNinja Ahora
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
                    <a href={ROUTES_CONFIG.SEO_CELEBRITIES.paths.es} className="text-purple-400 hover:text-purple-300 hover:underline text-lg">
                        ⭐ 7 Celebridades que Usan Teleprompter
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
