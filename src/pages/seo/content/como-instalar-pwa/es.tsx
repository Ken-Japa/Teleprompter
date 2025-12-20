import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { SEOContentHowTo } from "../../../../components/seo/SEOContentHowTo";

export const ComoInstalarPwaES = () => (
    <>
        <h1 className="text-4xl font-bold text-white mb-6">Cómo Instalar PromptNinja (App PWA)</h1>
        <p className="mb-6 text-xl text-slate-300">
            PromptNinja es una <strong>Progressive Web App (PWA)</strong>. Esto significa que puedes instalarla directamente desde tu navegador sin visitar la App Store o Play Store. Es más ligera, más rápida y funciona sin conexión.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mt-12">

            {/* iOS Guide */}
            <SEOContentHowTo
                title="iPhone / iPad (iOS)"
                schemaTitle="Cómo Instalar PromptNinja en iPhone (iOS)"
                steps={[
                    {
                        title: "Paso 1",
                        text: "Abre PromptNinja en Safari. (Nota: Las PWA solo se instalan vía Safari en iOS)."
                    },
                    {
                        title: "Paso 2",
                        text: "Toca el botón Compartir (icono del cuadrado con flecha hacia arriba) en la barra inferior."
                    },
                    {
                        title: "Paso 3",
                        text: "Desplázate hacia abajo y toca en \"Añadir a Inicio\" (Add to Home Screen)."
                    },
                    {
                        title: "Paso 4",
                        text: "Toca en Añadir en la esquina superior derecha."
                    }
                ]}
                className="bg-slate-800 p-8 rounded-xl border border-slate-700 h-full"
            />

            {/* Android Guide */}
            <SEOContentHowTo
                title="Android (Chrome)"
                schemaTitle="Cómo Instalar PromptNinja en Android"
                steps={[
                    {
                        title: "Paso 1",
                        text: "Abre PromptNinja en Google Chrome."
                    },
                    {
                        title: "Paso 2",
                        text: "Toca el botón de Menú (tres puntos) en la esquina superior derecha."
                    },
                    {
                        title: "Paso 3",
                        text: "Toca en \"Instalar aplicación\" o \"Añadir a la pantalla de inicio\"."
                    },
                    {
                        title: "Paso 4",
                        text: "Confirma tocando Instalar."
                    }
                ]}
                className="bg-slate-800 p-8 rounded-xl border border-slate-700 h-full"
            />

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
