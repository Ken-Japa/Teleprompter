import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { SEOContentHowTo } from "../../../../components/seo/SEOContentHowTo";

export const TeleprompterTikTokShortsES = () => (
    <>
        <h1 className="text-4xl font-bold text-white mb-6">Teleprompter para TikTok, Reels y Shorts: Graba Videos Verticales Perfectos</h1>

        <p className="lead text-xl text-slate-300 mb-8">
            La revolución de los videos cortos exige rapidez y precisión. En TikTok, Reels o YouTube Shorts, tienes segundos para captar la atención. PromptNinja es el teleprompter ideal para creadores de contenido vertical, permitiéndote grabar con confianza, mantener la mirada en la cámara y producir videos virales en tiempo récord.
        </p>

        <div className="bg-slate-800 p-6 rounded-lg my-8 border-l-4 border-pink-500">
            <h2 className="text-2xl font-bold text-white mb-2">¿Por qué PromptNinja es Perfecto para Video Vertical?</h2>
            <p className="text-slate-300">
                Creamos un modo específico para pantallas verticales. Al acceder a PromptNinja desde el móvil, la interfaz se adapta perfectamente.
                <br /><br />
                Además, con nuestro exclusivo control <strong>P2P (Peer-to-Peer)</strong>, puedes colocar tu móvil en un trípode y controlar el texto (inicio/parada/velocidad) usando otro dispositivo (como un portátil u otro móvil) en tu mano, sin tocar la pantalla de grabación.
            </p>
        </div>

        <SEOContentHowTo
            title="Cómo Grabar TikToks Profesionales con Teleprompter"
            schemaTitle="Cómo Grabar Videos Verticales con Teleprompter"
            totalTime="PT5M"
            tools={["Smartphone", "PromptNinja", "Trípode"]}
            steps={[
                {
                    title: "Paso 1: Guiones Optimizados",
                    text: "Escribe guiones cortos y directos. Usa nuestro editor para resaltar palabras clave en colores (rojo para énfasis, amarillo para pausas)."
                },
                {
                    title: "Paso 2: Posicionamiento Vertical",
                    text: "Coloca el texto en la parte superior de la pantalla de tu móvil, justo al lado de la cámara frontal. Esto asegura que tus ojos miren directamente al espectador."
                },
                {
                    title: "Paso 3: Control Discreto",
                    text: "Usa PromptNinja en un segundo dispositivo para controlar el desplazamiento. No necesitas estirar el brazo para pausar la grabación o reiniciar el texto."
                }
            ]}
        />

        <div className="text-center mt-12">
            <a
                href="https://promptninja.solutionkit.com.br/?lang=es/#app"
                className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 font-bold py-3 px-6 rounded-lg transition hover:brightness-110"
                style={{ color: 'white' }}
            >
                Crea Videos Virales Ahora - ¡Es Gratis!
            </a>
        </div>

        <SEOContentFAQ
            title="Preguntas de Creadores de Video Vertical"
            items={[
                {
                    question: "¿Cómo evito parecer que estoy leyendo?",
                    answer: "El secreto es el posicionamiento. En el móvil, coloca el texto en la parte superior de la pantalla, pegado a la cámara frontal. Usa una fuente más pequeña y aléjate un poco si es posible."
                },
                {
                    question: "¿Hay una app de PromptNinja para descargar?",
                    answer: "PromptNinja es una Web App. Esto significa que no necesitas descargar nada de la tienda. Solo accede por Chrome o Safari y se adapta perfectamente a la pantalla de tu móvil."
                },
                {
                    question: "¿Cómo grabo solo a distancia?",
                    answer: "Usa nuestra función de Control Remoto. Abre PromptNinja en el móvil que grabará y usa otro móvil u ordenador en tu mano para dar play y controlar la velocidad sin moverte."
                }
            ]}
        />
    </>
);
