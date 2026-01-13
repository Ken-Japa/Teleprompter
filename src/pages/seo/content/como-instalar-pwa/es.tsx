import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { SEOContentHowTo } from "../../../../components/seo/SEOContentHowTo";

export const ComoInstalarPwaES = () => (
    <>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Cómo Instalar PromptNinja (App PWA) en iPhone y Android
        </h1>

        <p className="lead text-xl text-slate-300 mb-8 font-medium">
            Lleva el poder de un teleprompter profesional a tu móvil. Instala **PromptNinja** como una aplicación nativa para obtener el máximo rendimiento, funcionamiento 100% offline y grabación en pantalla completa.
        </p>

        <p className="text-slate-300 mb-8 font-medium">
            ¿Buscaste en App Store o Play Store y no nos encontraste? Eso es una ventaja. PromptNinja es una **PWA (Progressive Web App)** de élite: se instala en segundos directamente desde tu navegador, sin ocupar espacio innecesario y sin procesos lentos de actualización.
        </p>

        <div className="bg-blue-600/10 border border-blue-500/20 rounded-2xl p-6 md:p-8 text-center mb-12">
            <h3 className="text-2xl font-bold text-white mb-4">Tu Teleprompter Siempre Listo</h3>
            <p className="text-slate-300 mb-6 font-medium">
                Accede a tus guiones instantáneamente desde tu pantalla de inicio.
                Rápido, ligero y diseñado para creadores exigentes.
            </p>
            <a href="/?lang=es#app" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all hover:scale-105 shadow-lg shadow-blue-500/25" style={{ color: 'white' }}>
                Abrir Aplicación Ahora
            </a>
            <p className="mt-4 text-sm text-slate-400 font-medium">Peso: &lt; 2MB · Sin Cookies Rastreadoras · 100% Privado</p>
        </div>

        <div className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 p-8 rounded-xl border border-purple-500/30 mb-12">
            <h3 className="text-2xl font-bold text-white mb-4">¿Por qué esto es mejor?</h3>
            <div className="grid sm:grid-cols-3 gap-6">
                <div className="bg-slate-900/50 p-4 rounded-lg">
                    <h3 className="text-lg font-bold text-green-400 mb-2">💾 Ligereza Extrema</h3>
                    <p className="text-slate-400 text-sm">Apps de teleprompter pesan ~150MB. PromptNinja instalado pesa menos de <strong>2MB</strong>. Más espacio para tus videos 4K.</p>
                </div>
                <div className="bg-slate-900/50 p-4 rounded-lg">
                    <h3 className="text-lg font-bold text-blue-400 mb-2">📱 Pantalla Completa Real</h3>
                    <p className="text-slate-400 text-sm">Al instalar, barras de dirección de Safari/Chrome desaparecen. Ganas 15% más pantalla para leer tu guion.</p>
                </div>
                <div className="bg-slate-900/50 p-4 rounded-lg">
                    <h3 className="text-lg font-bold text-purple-400 mb-2">⚡ Offline First</h3>
                    <p className="text-slate-400 text-sm">¿Grabando en la montaña? Sin problemas. Una vez instalada, la app abre instantáneamente aun sin señal Wi-Fi.</p>
                </div>
            </div>
        </div>

        <h3 className="text-3xl font-bold text-white mb-8">Guía de Instalación Paso a Paso</h3>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* iOS Guide */}
            <SEOContentHowTo
                title="🍎 iPhone / iPad (Safari)"
                schemaTitle="Cómo Instalar PromptNinja en iPhone (iOS)"
                steps={[
                    {
                        title: "1. Usa Safari",
                        text: "PWAs en iPhone funcionan mejor en Safari. Abre 'promptninja.solutionkit.com.br'."
                    },
                    {
                        title: "2. Botón Compartir",
                        text: "Toca el icono del medio en la barra inferior (cuadrado con flecha hacia arriba)."
                    },
                    {
                        title: "3. El Secreto",
                        text: "Baja en la lista hasta encontrar 'Agregar a Inicio' (Add to Home Screen). Cuidado: No es 'Marcadores'."
                    },
                    {
                        title: "4. Confirmar",
                        text: "Toca 'Agregar' arriba a la derecha. El icono morado aparecerá en tu inicio."
                    }
                ]}
                className="bg-slate-800 p-8 rounded-xl border-l-4 border-slate-500 h-full"
            />

            {/* Android Guide */}
            <SEOContentHowTo
                title="🤖 Android (Chrome/Samsung)"
                schemaTitle="Cómo Instalar PromptNinja en Android"
                steps={[
                    {
                        title: "1. Notificación Auto",
                        text: "A menudo aparece barra abajo: 'Agregar PromptNinja a pantalla principal'. Si sale, ¡tócala!"
                    },
                    {
                        title: "2. Menú Manual",
                        text: "Si no, toca los tres puntos (⋮) en esquina superior derecha de Chrome."
                    },
                    {
                        title: "3. Instalar",
                        text: "Busca 'Instalar aplicación' o 'Agregar a pantalla principal' en el menú."
                    },
                    {
                        title: "4. Listo",
                        text: "Sistema creará un APK ligero e instalará como app nativa."
                    }
                ]}
                className="bg-slate-800 p-8 rounded-xl border-l-4 border-green-500 h-full"
            />
        </div>

        <div className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-6">💻 En PC / Mac</h3>
            <div className="bg-slate-800 p-6 rounded-xl border border-blue-500/30">
                <p className="text-slate-300 mb-4">
                    ¡Sí, puedes instalar en escritorio también! Pone el icono PromptNinja en tu Barra de Tareas o Dock, y corre en ventana independiente (sin distracciones de pestañas).
                </p>
                <ul className="space-y-4 text-slate-300">
                    <li className="flex gap-3 items-start">
                        <span className="bg-blue-900 text-blue-300 rounded px-2 font-bold">Chrome/Edge:</span>
                        <span>Mira lado derecho de barra de dirección (URL). Verás pequeño icono de <strong>computadora con flecha abajo</strong> ⬇️. Clic y luego 'Instalar'.</span>
                    </li>
                </ul>
            </div>
        </div>

        <SEOContentFAQ
            title="FAQ de PWA"
            items={[
                {
                    question: "¿Es seguro? ¿Virus?",
                    answer: "Más seguro que apps normales. PWAs corren aisladas en 'caja de arena' del navegador. No pueden acceder a contactos, fotos o archivos sistema sin que autorices explícitamente cada acción."
                },
                {
                    question: "¿Cómo actualizo?",
                    answer: "La mejor parte: se auto-actualiza. Siempre que abres app con internet, baja última versión en milisegundos. Nunca más verás barras de carga 'Actualizando...'."
                },
                {
                    question: "No encuentro botón instalar en iPhone.",
                    answer: "Asegúrate de usar **Safari**. Chrome en iOS a veces esconde esto por restricciones de Apple. En Safari, 'Agregar a Inicio' está escondido dentro del menú Compartir."
                }
            ]}
        />
    </>
);
