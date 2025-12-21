import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";

export const TeleprompterParaPodcastES = () => (
    <>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Teleprompter para Podcast: El Secreto de Intros y Anuncios Perfectos
        </h1>

        <p className="lead text-xl text-slate-300 mb-8">
            "Hola a todos y bienvenidos a... eh... ¿cuál es el número del episodio?"
            <br /> Los podcasters profesionales no improvisan todo. Existe una estructura invisible que mantiene la charla fluyendo y a los patrocinadores felices. Descubre dónde encaja el teleprompter en tu configuración de audio y video.
        </p>

        <div className="bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Dónde Usar (y Dónde NO Usar)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-green-900/20 border border-green-800 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-green-400 mb-4">✅ USA PARA:</h3>
                    <ul className="space-y-3 text-slate-300">
                        <li><strong>Introducción del Episodio:</strong> "En el episodio de hoy, hablaremos con Fulanito sobre..." (Queda enérgico y sin errores).</li>
                        <li><strong>Lectura de Anuncios (Patrocinio):</strong> Las marcas odian cuando te equivocas en el nombre del producto u olvidas el cupón. Lee el copy exacto.</li>
                        <li><strong>Biografía del Invitado:</strong> "Es graduado de Harvard, autor de 3 libros..." (No confíes en la memoria para currículums).</li>
                        <li><strong>Cierre (CTA):</strong> Pedir likes, campanita y suscripción al newsletter.</li>
                    </ul>
                </div>
                <div className="bg-red-900/20 border border-red-800 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-red-400 mb-4">❌ NO USES PARA:</h3>
                    <ul className="space-y-3 text-slate-300">
                        <li><strong>La Entrevista en Sí:</strong> El encanto del podcast es la conversación espontánea. No guiones las preguntas y respuestas, usa solo puntos clave.</li>
                        <li><strong>Reacciones:</strong> Las risas y sorpresas deben ser genuinas.</li>
                    </ul>
                </div>
            </div>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Setup para Videocast (Escritorio)</h2>
        <p className="text-slate-300 mb-8">
            A diferencia de un estudio de TV, en el podcast generalmente estás mirando al invitado o a un micrófono, y no a la cámara todo el tiempo. Sin embargo, en las introducciones, <strong>el contacto visual con la cámara es esencial</strong> para conectar con quienes miran en YouTube/Spotify Video.
        </p>

        <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-purple-500 mb-12">
            <h3 className="text-xl font-bold text-white mb-2">La Técnica Híbrida de PromptNinja</h3>
            <p className="text-slate-300">
                Coloca una tablet o celular con PromptNinja corriendo justo debajo de la lente de tu cámara principal. Usa el modo "Espejo" si tienes un vidrio, o el modo normal si es solo la pantalla.
                <br /><br />
                Cuando hables con la audiencia (Intro/Ad), mira a la lente/prompter. Cuando hables con el invitado, ignora el prompter.
            </p>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Consejos de Edición</h2>
        <p className="text-slate-300 mb-8">
            Muchos podcasters graban la introducción y los anuncios <strong>después</strong> de que termina la entrevista. Así, ya sabes exactamente qué pasó de bueno en la charla para hacer un "teaser" matador en la apertura. El teleprompter es tu mejor amigo en este momento, ya que estarás cansado y querrás grabar rápido.
        </p>

        <SEOContentFAQ
            title="FAQ de Podcasters"
            items={[
                {
                    question: "¿Necesito un teleprompter para podcast solo de audio?",
                    answer: "¡Ayuda mucho! Incluso sin video, leer el guion de la intro asegura que no tartamudees y mantengas la energía alta en la voz. A nadie le gusta escuchar 'ehhh...' en sus audífonos."
                },
                {
                    question: "¿Cómo controlo el texto con las manos ocupadas?",
                    answer: "PromptNinja tiene desplazamiento automático por voz (Voice Control). Solo lee, y él se desplaza. O usa el pedal de control (si tienes) o la app en el celular."
                },
                {
                    question: "¿Puedo poner los temas de la entrevista en el prompter?",
                    answer: "¡Sí! Usa fuentes grandes y palabras clave (ej: 'PREGUNTAR SOBRE INFANCIA'). Así puedes echar un vistazo rápido y volver al invitado."
                }
            ]}
        />

        <div className="text-center mt-12 pb-12">
            <a
                href="#app?lang=es"
                className="inline-block bg-gradient-to-r from-purple-700 to-blue-700 font-bold py-4 px-10 rounded-full transition hover:scale-105 shadow-xl text-white text-lg"
            >
                Profesionaliza tu Podcast con PromptNinja
            </a>
        </div>
    </>
);
