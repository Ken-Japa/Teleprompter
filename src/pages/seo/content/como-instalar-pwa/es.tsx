import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";

export const ComoInstalarPwaES = () => (
    <>
        <h1 className="text-4xl font-bold text-white mb-6">Cómo Instalar PromptNinja (App PWA)</h1>
        <p className="mb-6 text-xl text-slate-300">
            PromptNinja es una <strong>Progressive Web App (PWA)</strong>. Esto significa que puedes instalarla directamente desde tu navegador sin visitar la App Store o Play Store. Es más ligera, más rápida y funciona sin conexión.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mt-12">

            {/* iOS Guide */}
            <div className="bg-slate-800 p-8 rounded-xl border border-slate-700">
                <div className="flex items-center gap-4 mb-6">
                    <span className="text-5xl">🍎</span>
                    <h2 className="text-2xl font-bold text-white">iPhone / iPad (iOS)</h2>
                </div>
                <ol className="space-y-6 text-slate-300 list-decimal pl-5 marker:text-blue-500 marker:font-bold">
                    <li>
                        Abre <strong>PromptNinja</strong> en <strong>Safari</strong>.
                        <p className="text-sm text-slate-400 mt-1">(Las PWA solo se instalan vía Safari en iOS)</p>
                    </li>
                    <li>
                        Toca el botón <strong>Compartir</strong> (icono del cuadrado con flecha hacia arriba) en la barra inferior.
                    </li>
                    <li>
                        Desplázate hacia abajo y toca en <strong>"Añadir a Inicio"</strong> (Add to Home Screen).
                    </li>
                    <li>
                        Toca en <strong>Añadir</strong> en la esquina superior derecha.
                    </li>
                </ol>
                <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg text-sm text-blue-200">
                    <strong>Consejo:</strong> Una vez instalada, PromptNinja aparece como una app nativa en tu pantalla de inicio, ejecutándose en pantalla completa sin barras de navegador.
                </div>
            </div>

            {/* Android Guide */}
            <div className="bg-slate-800 p-8 rounded-xl border border-slate-700">
                <div className="flex items-center gap-4 mb-6">
                    <span className="text-5xl">🤖</span>
                    <h2 className="text-2xl font-bold text-white">Android (Chrome)</h2>
                </div>
                <ol className="space-y-6 text-slate-300 list-decimal pl-5 marker:text-green-500 marker:font-bold">
                    <li>
                        Abre <strong>PromptNinja</strong> en <strong>Google Chrome</strong>.
                    </li>
                    <li>
                        Toca el botón de <strong>Menú</strong> (tres puntos) en la esquina superior derecha.
                    </li>
                    <li>
                        Toca en <strong>"Instalar aplicación"</strong> o <strong>"Añadir a la pantalla de inicio"</strong>.
                    </li>
                    <li>
                        Confirma tocando <strong>Instalar</strong>.
                    </li>
                </ol>
                <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-sm text-green-200">
                    <strong>Consejo:</strong> La app es extremadamente ligera (menos de 2MB) y se actualiza automáticamente siempre que la abres conectado a internet.
                </div>
            </div>

        </div>

        <div className="mt-16 bg-slate-800/50 p-8 rounded-xl text-center">
            <h2 className="text-2xl font-bold text-white mb-4">¿Por qué instalar la PWA?</h2>
            <div className="grid sm:grid-cols-3 gap-6 text-left mt-8">
                <div>
                    <h3 className="text-lg font-bold text-purple-400 mb-2">⚡ Rendimiento Nativo</h3>
                    <p className="text-slate-400 text-sm">Carga instantánea y navegación fluida, igual que una app de la tienda.</p>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-blue-400 mb-2">📶 Funciona Offline</h3>
                    <p className="text-slate-400 text-sm">¿Sin internet? Sin problemas. La app guarda los recursos necesarios para funcionar en cualquier lugar.</p>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-green-400 mb-2">💾 Ahorro de Espacio</h3>
                    <p className="text-slate-400 text-sm">Ocupa una fracción del espacio de una app convencional. Menos memoria, más eficiencia.</p>
                </div>
            </div>
        </div>

        <SEOContentFAQ
            title="Dudas sobre Instalación (PWA)"
            items={[
                {
                    question: "¿Es seguro? ¿Tiene virus?",
                    answer: "Sí, es 100% seguro. Las PWAs se ejecutan dentro del 'sandbox' del navegador, lo que significa que no tienen acceso a tus archivos sin permiso."
                },
                {
                    question: "¿Funciona sin internet?",
                    answer: "Sí. Tras la instalación (o primera visita), la app guarda los archivos esenciales en tu dispositivo para funcionar offline."
                },
                {
                    question: "¿Ocupa mucho espacio?",
                    answer: "No. A diferencia de las apps nativas que pueden pesar 100MB+, PromptNinja suele ocupar menos de 2MB, ya que reutiliza recursos del navegador."
                }
            ]}
        />
    </>
);
