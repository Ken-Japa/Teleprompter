import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { SEOContentHowTo } from "../../../../components/seo/SEOContentHowTo";
import { SEOImage } from "../../../../components/seo/SEOImage";

export const TeleprompterParaYoutubersES = () => (
    <>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Teleprompter para YouTubers: Cómo Duplicar Retención y Grabar como un PRO
        </h1>

        <p className="lead text-xl text-slate-300 mb-8 font-medium">
            Domina la cámara, mantén el contacto visual y elimina los errores. Usa **PromptNinja** para grabar vídeos fluidos, reducir el tiempo de edición a la mitad y aumentar la autoridad de tu canal.
        </p>

        <p className="text-slate-300 mb-8 font-medium">
            Conoces el dolor: enciendes la cámara, dices dos frases y te trabas. "Corta, de nuevo". Al final del día, tienes 2 horas de material crudo para un vídeo de 8 minutos. La edición se convierte en una pesadilla de cortes para esconder errores.
        </p>

        <SEOImage
            slug="teleprompter-para-youtubers-e-criadores"
            src="teleprompter-for-youtubers-setup.webp"
            alt="Creador de contenido usando teleprompter"
            caption="Los YouTubers profesionales usan teleprompter para reducir el tiempo de edición y aumentar la autoridad."
            width={1200}
            height={675}
            priority={true}
        />

        <div className="bg-red-600/10 border border-red-500/20 rounded-2xl p-6 md:p-8 text-center mb-12">
            <h3 className="text-2xl font-bold text-white mb-4">Gana el Juego del Algoritmo</h3>
            <p className="text-slate-300 mb-6 font-medium">
                Los grandes canales no memorizan, usan tecnología. Empieza a
                grabar hoy mismo con el flujo de trabajo de los expertos.
            </p>
            <a href="/?lang=es#app" className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition-all hover:scale-105 shadow-lg shadow-red-500/25" style={{ color: 'white' }}>
                Empezar a Grabar Ahora
            </a>
            <p className="mt-4 text-sm text-slate-400 font-medium">Sincronización P2P · Modo Espejo · 100% Gratis</p>
        </div>

        <div className="bg-slate-800 p-8 rounded-xl border-l-4 border-red-500 mb-12 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-4">El Algoritmo Odia la Inseguridad</h3>
            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-lg font-bold text-red-300 mb-2">📉 Sin Teleprompter</h3>
                    <ul className="space-y-2 text-slate-400 text-sm">
                        <li>Mirada desviada (leyendo notas) = Rompe conexión.</li>
                        <li>Muchos "Ehh", "Mmm" = Caída de retención.</li>
                        <li>Edición picada = Fatiga visual.</li>
                        <li>Resultado: Espectador sale en 30 segundos.</li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-green-400 mb-2">📈 Con PromptNinja</h3>
                    <ul className="space-y-2 text-slate-300 text-sm">
                        <li>Ojo en lente 100% del tiempo = Autoridad.</li>
                        <li>Habla continua y segura = "Flow" hipnótico.</li>
                        <li>Edición mínima = Video listo en minutos.</li>
                        <li>Resultado: Watch Time (Tiempo de Visualización) se dispara.</li>
                    </ul>
                </div>
            </div>
        </div>

        <h3 className="text-3xl font-bold text-white mt-12 mb-6">3 Formas de Usar (De Principiante a Pro)</h3>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-700 hover:border-blue-500 transition">
                <div className="text-3xl mb-4">💻</div>
                <h3 className="text-xl font-bold text-white mb-2">1. El "Laptop Studio"</h3>
                <p className="text-sm text-slate-400 mb-4">Ideal para Webcam / Lives.</p>
                <p className="text-slate-300 text-sm">
                    Pon ventana PromptNinja al tope de la pantalla, justo debajo de webcam del portátil.
                    <br /><strong>Costo: $0.</strong>
                </p>
            </div>

            <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-700 hover:border-purple-500 transition">
                <div className="text-3xl mb-4">📱</div>
                <h3 className="text-xl font-bold text-white mb-2">2. El "Mobile Creator"</h3>
                <p className="text-sm text-slate-400 mb-4">Ideal para Reels/Shorts.</p>
                <p className="text-slate-300 text-sm">
                    Usa PromptNinja en celular. Sostén móvil cerca del lente de cámara principal si grabas a alguien, o usa frontal.
                </p>
            </div>

            <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-700 hover:border-green-500 transition">
                <div className="text-3xl mb-4">🎥</div>
                <h3 className="text-xl font-bold text-white mb-2">3. El "Pro Glass"</h3>
                <p className="text-sm text-slate-400 mb-4">Ideal para DSLR/Mirrorless.</p>
                <p className="text-slate-300 text-sm">
                    Usa un iPad con PromptNinja acostado bajo un espejo divisor (beam splitter). Activa <strong>Modo Espejo</strong> (Tecla 'M') para leer "a través" del lente.
                </p>
            </div>
        </div>

        <h3 className="text-3xl font-bold text-white mt-12 mb-6">Workflow Ninja: Guion a Publicado en 1h</h3>
        <SEOContentHowTo
            title=""
            schemaTitle="Cómo Grabar Videos YouTube con Teleprompter"
            totalTime="PT15M"
            tools={["PromptNinja", "Cámara", "Micrófono"]}
            steps={[
                {
                    title: "1. Escribe como Hablas",
                    text: "No escribas un libro. Escribe una charla. Frases cortas. En PromptNinja, rompe líneas donde quieras respirar."
                },
                {
                    title: "2. Ajusta 'Zona de Lectura'",
                    text: "No dejes que texto llene toda la pantalla. Reduce márgenes laterales en PromptNinja para que tus ojos no 'escaneen' de izq a der. Texto debe estar en columna central estrecha."
                },
                {
                    title: "3. Truco de Distancia",
                    text: "Ponte a 1-1.5 metros de cámara. Cuanto más lejos, menos se nota movimiento de ojos."
                },
                {
                    title: "4. ¡Acción!",
                    text: "Dale Play (Espacio). Sonríe. Habla con energía (20% más que normal). Si fallas, PAUSA, respira, vuelve una frase. No pares grabación."
                }
            ]}
        />

        <div className="mt-16 bg-gradient-to-r from-red-600/20 to-red-900/20 p-8 rounded-xl border border-red-500/30">
            <h3 className="text-2xl font-bold text-white mb-4">Deja de perder tiempo editando "Ehmmm..."</h3>
            <p className="text-slate-300 mb-6">
                Grandes canales (MrBeast, Ali Abdaal) usan guiones o teleprompters. Su consistencia viene del flujo de trabajo. PromptNinja te da ese superpoder gratis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <a href="/app" className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-bold transition text-center">
                    Empezar a Grabar Ahora
                </a>
            </div>
        </div>

        <SEOContentFAQ
            title="FAQ para Creadores"
            items={[
                {
                    question: "¿YouTube penaliza leer?",
                    answer: "Al contrario. Algoritmo ama Watch Time. Si hablas bien, sin pausas aburridas, gente ve hasta el final. YouTube no sabe si lees, solo sabe que gente no se va."
                },
                {
                    question: "¿Cómo parecer natural?",
                    answer: "Secreto es lenguaje corporal. Mueve manos. Sonríe. Frunce ceño. Usa teleprompter solo como guía de palabras, pero pon emoción en voz. Y configura velocidad un poco MÁS RÁPIDA que cómodo para forzarte a energía alta."
                },
                {
                    question: "¿Sirve para Shorts y TikTok?",
                    answer: "Perfecto para eso. En videos de 60s, cada segundo cuenta. No puedes perder tiempo pensando. Con guion en pantalla, entregas valor en exactos 59 segundos sin tartamudear."
                }
            ]}
        />
    </>
);
