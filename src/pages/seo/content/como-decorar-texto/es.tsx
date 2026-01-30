import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { SEOContentHowTo } from "../../../../components/seo/SEOContentHowTo";
import { SEOImage } from "../../../../components/seo/SEOImage";

export const ComoDecorarTextoES = () => (
    <>
        <p className="lead text-xl text-slate-300 mb-8 font-medium">
            ¿Pasas horas intentando memorizar guiones para terminar bloqueado frente a la cámara? La clave de los grandes comunicadores no es una memoria sobrehumana, sino el uso inteligente de herramientas como **PromptNinja**.
        </p>

        <p className="text-slate-300 mb-8 font-medium">
            Memorizar palabra por palabra genera una actuación rígida y antinatural. Libera tu mente para enfocarte en tu lenguaje corporal y tu tono de voz, dejando que nosotros nos encarguemos de sostener tu discurso con fluidez.
        </p>

        <SEOImage
            slug="como-decorar-texto-rapido"
            src="how-to-memorize-text-quick-tablet.webp"
            alt="Persona practicando oratoria con una tablet"
            caption="Memorizar no siempre es la mejor estrategia; el teleprompter ofrece seguridad y naturalidad."
            width={1200}
            height={675}
            priority={true}
        />

        <div className="bg-purple-600/10 border border-purple-500/20 rounded-2xl p-6 md:p-8 text-center mb-12">
            <h3 className="text-2xl font-bold text-white mb-4">Graba con Total Confianza</h3>
            <p className="text-slate-300 mb-6 font-medium">
                Elimina el estrés de olvidar tus líneas. Con PromptNinja,
                siempre sabrás qué decir a continuación, 100% gratis.
            </p>
            <a href="/?lang=es#app" className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full transition-all hover:scale-105 shadow-lg shadow-purple-500/25" style={{ color: 'white' }}>
                Empezar a Grabar sin Memorizar
            </a>
            <p className="mt-4 text-sm text-slate-400 font-medium">Cero Estrés · Fluidez Natural · Sin Registro</p>
        </div>

        <div className="bg-slate-800 p-8 rounded-xl border-l-4 border-yellow-500 mb-12 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-4">El Mito de la Memoria Perfecta</h3>
            <p className="text-slate-300 mb-4">
                Creemos que presentadores, políticos y grandes YouTubers tienen memoria fotográfica. Mentira. Tienen <strong>Teleprompters</strong>.
            </p>
            <p className="text-slate-300">
                La industria TV descubrió hace 50 años que el cerebro humano no se hizo para recitar. Se hizo para conversar. Cuando intentas recordar palabras, tu mirada se pierde ("ojos de pez muerto") y tu voz suena robótica.
            </p>
        </div>

        <h3 className="text-3xl font-bold text-white mt-12 mb-6">La Técnica de "Mirada Invisible"</h3>
        <p className="mb-6 text-slate-300">
            "¡Pero si leo, se notará!"
            No si usas la técnica correcta. El secreto no es qué lees, sino <strong>cómo configuras la pantalla.</strong>
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-red-900/10 p-6 rounded border border-red-500/30">
                <h3 className="font-bold text-red-400 mb-2">âŒ El Error Común</h3>
                <p className="text-sm text-slate-300">
                    Poner texto en pantalla completa en monitor ancho.
                    <br /><strong>Resultado:</strong> Tus ojos corren de lado a lado como viendo tenis. Todos lo notan.
                </p>
            </div>
            <div className="bg-green-900/10 p-6 rounded border border-green-500/50">
                <h3 className="font-bold text-green-400 mb-2">�S& La Técnica Ninja</h3>
                <p className="text-sm text-slate-300">
                    Estrechar margen del texto a solo 3 o 4 palabras por línea, justo en el centro.
                    <br /><strong>Resultado:</strong> Tus ojos se quedan fijos en el centro. Para el espectador, estás mirando profundo a su alma.
                </p>
            </div>
        </div>

        <h3 className="text-3xl font-bold text-white mt-12 mb-6">Paso a Paso: De Lectura a Actuación</h3>

        <SEOContentHowTo
            title=""
            schemaTitle="Cómo Leer Teleprompter Naturalmente"
            totalTime="PT5M"
            tools={["PromptNinja", "Texto"]}
            steps={[
                {
                    title: "1. Configuración Embudo",
                    text: "En PromptNinja, aumenta margen lateral hasta que texto sea columna fina en centro. Aumenta fuente a tamaño gigante."
                },
                {
                    title: "2. Distancia Mágica",
                    text: "Aléjate de la pantalla. Cuanto más lejos, menor es ángulo de movimiento de tus ojos. Mínimo 1 metro."
                },
                {
                    title: "3. Lenguaje Corporal",
                    text: "Público perdona una mirada, pero no falta de energía. Mueve manos. Asiente. Sonríe. Cuando tu cuerpo se mueve, tus ojos vivos disfrazan la lectura."
                }
            ]}
        />

        <div className="mt-12 bg-slate-900 p-8 rounded-xl border border-slate-700">
            <h3 className="text-2xl font-bold text-white mb-4">La Ciencia del "Alivio Cognitivo"</h3>
            <p className="text-slate-300">
                Cuando no gastas 90% de tu CPU cerebral intentando recordar siguiente palabra, esa energía sobra para <strong>Interpretación</strong>.
                Finalmente puedes poner emoción, ironía y pausas en tu habla. El teleprompter no te atrapa; te libera.
            </p>
        </div>

        <SEOContentFAQ
            title="FAQ de Lectura"
            items={[
                {
                    question: "¿Y si pierdo el ritmo?",
                    answer: "PromptNinja tiene 'Voice Activated Scroll' en versión Pro, que escucha tu voz y rueda texto automáticmante. Si paras para estornudar o improvisar, te espera."
                },
                {
                    question: "¿Funciona con gafas?",
                    answer: "¡Sí! De hecho mejor, pues monturas a veces esconden micro-movimientos de ojos. Solo cuidado con reflejo de pantalla en lentes (aumenta brillo ambiente o cambia ángulo)."
                },
                {
                    question: "¿Cuánto tiempo ahorro?",
                    answer: "Estudios muestran que usar teleprompter reduce tiempo grabación en 60% y edición en 80% (elimina cortes de error). Es la herramienta de productividad definitiva."
                }
            ]}
        />

        <div className="text-center mt-12">
            <a
                href="https://promptninja.solutionkit.com.br"
                className="inline-block bg-white text-slate-900 font-bold py-3 px-8 mx-auto rounded-full transition hover:bg-slate-200"
            >
                Abrir Teleprompter Ahora (Sin Login)
            </a>
        </div>
    </>
);

