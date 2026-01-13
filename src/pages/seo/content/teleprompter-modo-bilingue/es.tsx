import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { SEOContentHowTo } from "../../../../components/seo/SEOContentHowTo";

export const TeleprompterModoBilingueES = () => (
    <>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Teleprompter Bilingüe: Alcanza una Audiencia Global
        </h2>

        <p className="lead text-xl text-slate-300 mb-8 font-medium">
            En un mundo cada vez más conectado, producir contenido en un solo idioma limita tu potencial. <strong>El modo bilingüe de PromptNinja fue diseñado para creadores que quieren expandir sus fronteras y hablarle al mundo.</strong>
        </p>

        <p className="text-slate-300 mb-8 leading-relaxed">
            En esta guía, descubrirás cómo nuestra herramienta exclusiva facilita la traducción simultánea y la grabación de videos en múltiples idiomas. Ya seas un profesor de idiomas usando la técnica de "Shadowing", un ejecutivo preparando una presentación internacional o un YouTuber creando versiones dobladas de tu contenido, PromptNinja ofrece la estabilidad y claridad necesarias. Explora nuestras funciones de guion lado a lado, soporte para caracteres especiales y traducción instantánea para asegurar que tu mensaje sea entendido en cualquier lugar del planeta, todo de forma gratuita e intuitiva.
        </p>

        <div className="bg-slate-800 p-8 rounded-xl border border-blue-500/30 mb-12">
            <h3 className="text-2xl font-bold text-white mb-4">El Secreto del Políglota: Shadowing</h3>
            <p className="text-slate-300 mb-4">
                Shadowing es una técnica usada por espías y diplomáticos. Consiste en escuchar a un hablante nativo y repetir en voz alta *simultáneamente*, con solo milisegundos de retraso.
            </p>
            <p className="text-slate-300">
                PromptNinja es la herramienta perfecta para esto. Pegas la transcripción del audio, ajustas la velocidad para igualar el habla nativa, y lees a la par.
            </p>
        </div>

        <h3 className="text-3xl font-bold text-white mt-12 mb-6">Cómo Usar el Modo Bilingüe para Estudiar</h3>

        <SEOContentHowTo
            title=""
            schemaTitle="Cómo Practicar Shadowing con Teleprompter"
            totalTime="PT10M"
            tools={["PromptNinja", "Audio Original (Podcast/YouTube)"]}
            steps={[
                {
                    title: "1. Encuentra Material",
                    text: "Consigue la transcripción de una Charla TED o escena de película."
                },
                {
                    title: "2. Formato Visual",
                    text: "Pégalo en PromptNinja. Usa MAYÚSCULAS donde el hablante enfatiza (entonación)."
                },
                {
                    title: "3. Sincronización",
                    text: "Reproduce el video/audio y ajusta la velocidad del teleprompter para igualar exactamente el ritmo del habla original."
                },
                {
                    title: "4. Habla en Voz Alta",
                    text: "Intenta imitar no solo las palabras, sino la 'música' de la frase. El teleprompter te obliga a no detenerte a pensar, creando fluidez."
                }
            ]}
        />

        <div className="text-center bg-slate-800 p-8 rounded-lg my-10">
            <h3 className="text-3xl font-bold text-white mb-4">Hazte Global con Tu Mensaje</h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                Rompe las barreras del idioma y habla a millones. Comienza tu producción bilingüe hoy.
            </p>
            <a
                href="/?lang=es#app"
                className="inline-block bg-white text-slate-900 font-bold py-3 px-8 mx-auto rounded-full transition hover:bg-slate-200"
            >
                Empezar Guion Global Gratis
            </a>
        </div>

        <SEOContentFAQ
            title="FAQ para Estudiantes"
            items={[
                {
                    question: "¿Funciona para otros idiomas?",
                    answer: "¡Sí! PromptNinja soporta caracteres especiales (Japonés, Chino, Ruso, Árabe) usando codificación UTF-8. Ideal para guiones con alfabetos diferentes."
                },
                {
                    question: "¿Puedo agregar traducción?",
                    answer: "Sí. Una técnica común es poner la línea en inglés y, justo debajo, la traducción en español en un color diferente (usa formato Markdown o solo paréntesis)."
                }
            ]}
        />
    </>
);
