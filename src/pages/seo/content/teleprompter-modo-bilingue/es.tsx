import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { SEOContentHowTo } from "../../../../components/seo/SEOContentHowTo";

export const TeleprompterModoBilingueES = () => (
    <>
        <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
            Aprende Inglés con Teleprompter: La Técnica de "Shadowing"
        </h2>

        <p className="mb-6 text-xl text-slate-300">
            Estudias inglés hace años, entiendes gramática, pero cuando vas a hablar... te trabas. Pronunciación no sale.
            Esto pasa porque tu boca no tiene "memoria muscular".
        </p>

        <div className="bg-slate-800 p-8 rounded-xl border border-blue-500/30 mb-12">
            <h3 className="text-2xl font-bold text-white mb-4">Secreto de Políglotas: Shadowing</h3>
            <p className="text-slate-300 mb-4">
                Shadowing (Sombreado) es técnica usada por espías y diplomáticos. Consiste en escuchar a nativo y repetir en voz alta *simultáneamente*, con solo milisegundos de retraso.
            </p>
            <p className="text-slate-300">
                PromptNinja es herramienta perfecta para esto. Pegas transcripción de audio, ajustas velocidad para igualar habla nativa, y lees junto.
            </p>
        </div>

        <h3 className="text-3xl font-bold text-white mt-12 mb-6">Cómo Usar Modo Bilingüe para Estudiar</h3>

        <SEOContentHowTo
            title=""
            schemaTitle="Cómo Practicar Shadowing con Teleprompter"
            totalTime="PT10M"
            tools={["PromptNinja", "Audio Original (Podcast/YouTube)"]}
            steps={[
                {
                    title: "1. Encuentra Material",
                    text: "Toma transcripción de un TED Talk o escena de película."
                },
                {
                    title: "2. Formato Visual",
                    text: "Pega en PromptNinja. Usa MAYÚSCULAS donde hablante enfatiza (entonación)."
                },
                {
                    title: "3. Sincronía",
                    text: "Dale play a video/audio y ajusta velocidad teleprompter para acompañar ritmo exacto de habla original."
                },
                {
                    title: "4. Habla Alto",
                    text: "Intenta imitar no solo palabras, sino la 'música' de la frase. Teleprompter te fuerza a no parar para pensar, creando fluidez."
                }
            ]}
        />

        <SEOContentFAQ
            title="FAQ Estudiantes"
            items={[
                {
                    question: "¿Sirve otros idiomas?",
                    answer: "¡Sí! PromptNinja soporta caracteres especiales (Japonés, Chino, Ruso, Árabe) pues usa codificación UTF-8. Ideal para scripts con alfabetos diferentes."
                },
                {
                    question: "¿Puedo poner traducción?",
                    answer: "Sí. Técnica común es poner línea en Inglés y, justo abajo, traducción en Español en color diferente (usa formato Markdown o solo paréntesis)."
                }
            ]}
        />
    </>
);
