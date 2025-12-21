import { ROUTES_CONFIG } from "../../../../config/routes";

export const HubGuideContentES = () => (
    <>
        <div className="lead text-xl text-slate-300 mb-12 font-medium border-l-4 border-purple-500 pl-6 bg-slate-800/30 py-4 rounded-r-lg">
            Bienvenido al repositorio de conocimientos sobre Teleprompters más grande de internet. Si quieres grabar mejores videos, hablar con confianza y dominar la cámara, estás en el lugar correcto.
        </div>

        <section id="oque" className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="bg-purple-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                ¿Qué es un Teleprompter?
            </h2>
            <p>
                El <a href={ROUTES_CONFIG.SEO_O_QUE_E.paths.es}>Teleprompter</a> (o "prompter") es la herramienta secreta detrás de presentadores de TV, presidentes y YouTubers exitosos. Te permite leer un guion mientras miras directamente a la lente de la cámara.
            </p>
            <p>
                Esto crea una conexión inmediata con tu audiencia porque simula el contacto visual natural. Nadie nota que estás leyendo y nunca olvidas lo que tienes que decir.
            </p>
        </section>

        <section id="como-usar" className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="bg-purple-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                Cómo Usar (Paso a Paso)
            </h2>
            <p>
                Usar un teleprompter hoy es mucho más fácil que en la era de la TV analógica. No necesitas equipos de $1,000.
            </p>
            <h3 className="text-xl font-bold text-white mt-8 mb-4">El Setup Básico</h3>
            <ul className="list-disc pl-6 space-y-4 marker:text-purple-500">
                <li>
                    <strong>En PC:</strong> Solo accede a <a href={ROUTES_CONFIG.SEO_PC_WINDOWS.paths.es}>PromptNinja en tu navegador</a>. Ideal para clases online, Zoom y Google Meet.
                </li>
                <li>
                    <strong>En Móvil/Tablet:</strong> Usa nuestra <a href={ROUTES_CONFIG.SEO_PWA_INSTALL.paths.es}>Web App (PWA)</a> que funciona sin conexión. Coloca el móvil cerca de la lente de la cámara.
                </li>
                <li>
                    <strong>Kit Profesional:</strong> Usa un "Beam Splitter" (vidrio reflectante) con una <a href={ROUTES_CONFIG.SEO_TABLET.paths.es}>Tablet</a> debajo.
                </li>
            </ul>
        </section>

        <section id="apps" className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="bg-purple-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
                Mejores Apps y Herramientas
            </h2>
            <p>
                Hay docenas de opciones, pero el futuro es <strong>Web-Based</strong>. ¿Por qué descargar una app pesada si puedes usarla directamente en el navegador?
            </p>
            <div className="bg-slate-800 p-6 rounded-xl my-6">
                <h4 className="font-bold text-lg text-white mb-2">¿Por qué PromptNinja?</h4>
                <ul className="grid md:grid-cols-2 gap-4">
                    <li className="flex items-center gap-2">✅ <strong>100% Gratis</strong> (sin marcas de agua gigantes)</li>
                    <li className="flex items-center gap-2">✅ <strong>Privacidad Total</strong> (tus datos no salen de tu PC)</li>
                    <li className="flex items-center gap-2">✅ <strong>Control por Voz</strong> (el texto avanza cuando hablas)</li>
                    <li className="flex items-center gap-2">✅ <strong>Funciona Offline</strong></li>
                </ul>
            </div>
            <p>
                Mira nuestra comparación completa de la <a href={ROUTES_CONFIG.SEO_MELHOR_APP.paths.es}>Mejor App de Teleprompter</a> y también <a href={ROUTES_CONFIG.SEO_ALTERNATIVAS.paths.es}>Alternativas a competidores</a>.
            </p>
        </section>

        <section id="diy" className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="bg-purple-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">4</span>
                DIY vs Profesional
            </h2>
            <p>
                Puedes empezar con cero inversión. Tenemos una guía increíble sobre <a href={ROUTES_CONFIG.SEO_DIY.paths.es}>Cómo hacer un Teleprompter Casero</a> usando una caja de CD o vidrio de marco de fotos.
            </p>
            <p>
                Si buscas la máxima calidad para YouTube, mira nuestros consejos de <a href={ROUTES_CONFIG.SEO_HARDWARE_VS_WEB.paths.es}>Hardware vs Software</a>.
            </p>
        </section>

        <section id="casos" className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="bg-purple-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">5</span>
                Casos de Uso Específicos
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-purple-500 transition-colors">
                    <h3 className="font-bold text-white mb-2">📹 Youtubers y Creadores</h3>
                    <p className="text-sm text-slate-400 mb-4">
                        Graba videos largos en "One Take". Ahorra horas de edición.
                    </p>
                    <a href={ROUTES_CONFIG.SEO_YOUTUBERS.paths.es} className="text-purple-400 text-sm font-bold hover:underline">Ver Guía para Creadores →</a>
                </div>
                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-purple-500 transition-colors">
                    <h3 className="font-bold text-white mb-2">💼 Home Office y Reuniones</h3>
                    <p className="text-sm text-slate-400 mb-4">
                        Impresiona a tu jefe en Zoom, Teams o Meet. Habla sin tartamudear y con autoridad.
                    </p>
                    <a href={ROUTES_CONFIG.SEO_ZOOM.paths.es} className="text-purple-400 text-sm font-bold hover:underline">Guía para Reuniones →</a>
                </div>
                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-purple-500 transition-colors">
                    <h3 className="font-bold text-white mb-2">🎵 Músicos y Cantantes</h3>
                    <p className="text-sm text-slate-400 mb-4">
                        Nunca más olvides la letra en un show o livestream.
                    </p>
                    <a href={ROUTES_CONFIG.SEO_MODO_MUSICO.paths.es} className="text-purple-400 text-sm font-bold hover:underline">Modo Músico →</a>
                </div>
                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-purple-500 transition-colors">
                    <h3 className="font-bold text-white mb-2">🏋️ Fitness y Entrenamientos</h3>
                    <p className="text-sm text-slate-400 mb-4">
                        Da clases de ejercicios cronometradas con perfección usando nuestro timer.
                    </p>
                    <a href={ROUTES_CONFIG.SEO_FITNESS.paths.es} className="text-purple-400 text-sm font-bold hover:underline">Para Entrenadores Personales →</a>
                </div>
            </div>
        </section>

        <section id="recursos" className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="bg-purple-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">6</span>
                Guiones y Oratoria
            </h2>
            <p>
                La herramienta es inútil sin un buen contenido. Por eso, creamos una biblioteca de <a href={ROUTES_CONFIG.SEO_SCRIPTS.paths.es}>Guiones para Teleprompter</a> listos para usar.
            </p>
            <p>
                Además, mira nuestros <a href={ROUTES_CONFIG.SEO_ORATORIA.paths.es}>Consejos de Oratoria para Video</a> y aprende <a href={ROUTES_CONFIG.SEO_DECORAR.paths.es}>cómo memorizar guiones rápido</a> si el prompter falla (lo que no pasará con nosotros, mira nuestra solución <a href={ROUTES_CONFIG.SEO_TRAVANDO.paths.es}>Anti-Congelamiento</a>).
            </p>
        </section>
    </>
);
