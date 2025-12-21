import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";

export const TeleprompterParaLivesES = () => (
    <>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Cómo Usar Teleprompter en Directos (OBS, YouTube, Twitch): La Guía Secreta
        </h1>

        <p className="lead text-xl text-slate-300 mb-8">
            Hacer una transmisión en vivo es estresante. Monitorear el chat, verificar el audio y además recordar el guion? Imposible. Es por eso que los grandes streamers usan un "pequeño secreto" en pantalla que el público no ve.
        </p>

        <div className="bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">El Problema de los Directos Sin Guion</h2>
            <p className="text-slate-300 mb-6">
                ¿Alguna vez has visto un directo donde el presentador divaga por 10 minutos, tartamudea y pierde el hilo? La audiencia se va al instante. Tener puntos clave o un guion completo en pantalla asegura que entregues valor constante, aumentando la retención.
            </p>
            <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-red-500">
                <p className="text-slate-300">
                    <strong className="text-red-400">El Desafío:</strong> ¿Cómo leer el guion sin quitar los ojos de la cámara y sin que el guion aparezca en la transmisión de OBS?
                </p>
            </div>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">La Solución: Superposición Invisible con PromptNinja</h2>
        <p className="text-slate-300 mb-8">
            PromptNinja te permite colocar una ventana transparente de teleprompter <strong>sobre</strong> tu software de transmisión (OBS Studio, vMix, Streamlabs), pero posicionada físicamente en la pantalla justo debajo de tu cámara web.
        </p>

        <h3 className="text-2xl font-bold text-white mt-8 mb-4">Paso a Paso para Setup de Directo</h3>
        <ol className="list-decimal list-inside space-y-4 text-slate-300 mb-12">
            <li className="pl-2">
                <strong className="text-white">Abre PromptNinja en una Ventana Separada:</strong>
                <br /> No uses pantalla completa. Redimensiona la ventana del navegador para que sea estrecha y transparente.
            </li>
            <li className="pl-2">
                <strong className="text-white">Posiciona en la Parte Superior:</strong>
                <br /> Arrastra esta ventana al centro superior de tu monitor, justo debajo de la cámara web.
            </li>
            <li className="pl-2">
                <strong className="text-white">Controla por Celular (El Truco):</strong>
                <br /> Conecta tu celular como control remoto. Así, puedes dar play/pause o cambiar la velocidad discretamente, con el celular fuera de cuadro, sin necesidad de usar el mouse.
            </li>
            <li className="pl-2">
                <strong className="text-white">No Captures esta Ventana en OBS:</strong>
                <br /> En OBS, en lugar de usar "Captura de Pantalla" (que mostraría el teleprompter), usa "Captura de Ventana" o "Captura de Juego" para capturar solo el juego o diapositiva que quieres mostrar. ¡El teleprompter permanece visible solo para ti!
            </li>
        </ol>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Guion Completo vs. Puntos Clave en Directos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="border border-slate-700 p-6 rounded-lg bg-slate-800/50">
                <h3 className="text-xl font-bold text-blue-400 mb-2">Guion Completo</h3>
                <p className="text-slate-400 text-sm mb-4">
                    Ideal para la <strong>Introducción</strong> y la <strong>Conclusión/CTA</strong>. Son momentos críticos donde no puedes equivocarte u olvidar pedir likes/subs.
                </p>
            </div>
            <div className="border border-slate-700 p-6 rounded-lg bg-slate-800/50">
                <h3 className="text-xl font-bold text-purple-400 mb-2">Puntos Clave (Bullet Points)</h3>
                <p className="text-slate-400 text-sm mb-4">
                    Ideal para el <strong>Contenido Principal</strong>. Pon palabras clave en el teleprompter y desplázate manualmente a medida que avanzas en los temas. Esto mantiene la naturalidad del directo.
                </p>
            </div>
        </div>

        <SEOContentFAQ
            title="Dudas de Streamers"
            items={[
                {
                    question: "¿PromptNinja consume mucha CPU durante el directo?",
                    answer: "No. PromptNinja es extremadamente ligero. No bajará tus FPS en juegos ni sobrecargará la codificación de OBS."
                },
                {
                    question: "¿El público verá mi teleprompter?",
                    answer: "Solo si compartes tu pantalla completa (Display Capture). Si compartes solo ventanas específicas (Window Capture) en OBS, el teleprompter es invisible para el directo pero visible para ti."
                },
                {
                    question: "¿Cómo controlo la velocidad si estoy jugando?",
                    answer: "Usa tu celular como control remoto. Déjalo sobre la mesa. Un toque rápido en la pantalla del celular pausa o reanuda el texto sin necesidad de hacer Alt-Tab en el juego."
                }
            ]}
        />

        <div className="text-center mt-12 pb-12">
            <a
                href="#app?lang=es"
                className="inline-block bg-gradient-to-r from-purple-600 to-indigo-500 font-bold py-4 px-10 rounded-full transition hover:scale-105 shadow-xl text-white text-lg"
            >
                Configura tu Directo Pro Ahora (Gratis)
            </a>
        </div>
    </>
);
