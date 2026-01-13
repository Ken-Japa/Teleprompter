import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { SEOContentHowTo } from "../../../../components/seo/SEOContentHowTo";

export const ComoInstalarPwaES = () => (
    <>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Cómo Instalar el Teleprompter PromptNinja en tu Celular o PC
        </h2>

        <p className="lead text-xl text-slate-300 mb-8 font-medium">
            Transforma PromptNinja en una poderosa app nativa. <strong>Aprende cómo instalar nuestra PWA</strong> para obtener máximo rendimiento, funcionalidad offline y una experiencia de teleprompter profesional a pantalla completa.
        </p>

        <p className="text-slate-300 mb-8 leading-relaxed">
            Muchos buscan un teleprompter en App Store o Google Play, pero PromptNinja ofrece una alternativa superior mediante tecnología PWA (Progressive Web App). En esta guía detallada, explicamos paso a paso cómo puedes 'descargar' nuestra herramienta directamente desde tu navegador, ya sea en iPhone, Android, Mac o Windows. Descubre las ventajas de tener una app ultraligera que no consume la memoria de tu dispositivo, garantiza privacidad total y permite grabaciones impecables en cualquier lugar, incluso sin internet. Sigue nuestras instrucciones simples y empieza a grabar como un profesional en segundos.
        </p>

        <div className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 p-8 rounded-xl border border-purple-500/30 mb-12">
            <h3 className="text-2xl font-bold text-white mb-4">¿Por qué es mejor esto?</h3>
            <div className="grid sm:grid-cols-3 gap-6">
                <div className="bg-slate-900/50 p-4 rounded-lg">
                    <h3 className="text-lg font-bold text-green-400 mb-2">💾 Ligereza Extrema</h3>
                    <p className="text-slate-400 text-sm">Apps de teleprompter pesan ~150MB prom. PromptNinja instalado pesa menos de <strong>2MB</strong>. Más espacio para tus videos 4K.</p>
                </div>
                <div className="bg-slate-900/50 p-4 rounded-lg">
                    <h3 className="text-lg font-bold text-blue-400 mb-2">📱 Pantalla Completa Real</h3>
                    <p className="text-slate-400 text-sm">Al instalar, barras de Safari/Chrome desaparecen. Ganas 15% más de espacio de pantalla para tu guion.</p>
                </div>
                <div className="bg-slate-900/50 p-4 rounded-lg">
                    <h3 className="text-lg font-bold text-purple-400 mb-2">⚡ Primero Offline</h3>
                    <p className="text-slate-400 text-sm">¿Grabando afuera? Sin problema. Una vez instalada, la app abre al instante incluso sin señal Wi-Fi.</p>
                </div>
            </div>
        </div>

        <h3 className="text-3xl font-bold text-white mb-8">Guía de Instalación Paso a Paso</h3>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Guía iOS */}
            <SEOContentHowTo
                title="🍎 iPhone / iPad (Safari)"
                schemaTitle="Cómo Instalar PromptNinja en iPhone (iOS)"
                steps={[
                    {
                        title: "1. Usa Safari",
                        text: "Las PWA en iPhone funcionan mejor en Safari. Abre 'promptninja.solutionkit.com.br'."
                    },
                    {
                        title: "2. Botón Compartir",
                        text: "Toca el icono del medio en la barra inferior (un cuadrado con una flecha apuntando arriba)."
                    },
                    {
                        title: "3. El Secreto",
                        text: "Desliza hacia abajo hasta encontrar 'Agregar a Inicio'. Cuidado: NO es 'Agregar a Marcadores'."
                    },
                    {
                        title: "4. Confirmar",
                        text: "Toca 'Agregar' arriba a la derecha. El icono púrpura aparecerá en tu pantalla de inicio."
                    }
                ]}
                className="bg-slate-800 p-8 rounded-xl border-l-4 border-slate-500 h-full"
            />

            {/* Guía Android */}
            <SEOContentHowTo
                title="🤖 Android (Chrome/Samsung)"
                schemaTitle="Cómo Instalar PromptNinja en Android"
                steps={[
                    {
                        title: "1. Notificación Auto",
                        text: "A menudo aparece una barra abajo: 'Agregar PromptNinja a Inicio'. Si es así, ¡solo tócala!"
                    },
                    {
                        title: "2. Menú Manual",
                        text: "Si no, toca los tres puntos (⋮) en la esquina superior derecha de Chrome."
                    },
                    {
                        title: "3. Instalar",
                        text: "Busca 'Instalar App' o 'Agregar a la pantalla principal' en el menú."
                    },
                    {
                        title: "4. Listo",
                        text: "El sistema creará un APK ligero y lo instalará como una app nativa."
                    }
                ]}
                className="bg-slate-800 p-8 rounded-xl border-l-4 border-green-500 h-full"
            />
        </div>

        <div className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-6">💻 En Escritorio (PC / Mac)</h3>
            <div className="bg-slate-800 p-6 rounded-xl border border-blue-500/30">
                <p className="text-slate-300 mb-4">
                    ¡Sí, puedes instalar en escritorio también! Esto pone el icono de PromptNinja en tu Barra de Tareas o Dock, y lo ejecuta en ventana independiente (sin distracciones).
                </p>
                <ul className="space-y-4 text-slate-300">
                    <li className="flex gap-3 items-start">
                        <span className="bg-blue-900 text-blue-300 rounded px-2 font-bold">Chrome/Edge:</span>
                        <span>Mira al lado derecho de la barra de direcciones (URL). Verás un pequeño icono de una <strong>computadora con flecha abajo</strong> ⬇️. Haz clic y luego 'Instalar'.</span>
                    </li>
                </ul>
            </div>
        </div>

        <SEOContentFAQ
            title="FAQ de PWA"
            items={[
                {
                    question: "¿Es seguro? ¿Virus?",
                    answer: "Más seguro que apps normales. Las PWA corren aisladas en la 'caja de arena' del navegador. No pueden acceder a tus contactos, fotos o archivos del sistema a menos que autorices explícitamente cada acción."
                },
                {
                    question: "¿Cómo actualizo?",
                    answer: "Lo mejor: se auto-actualiza. Siempre que abres la app conectado a internet, baja la última versión en milisegundos. Nunca verás barras de 'Actualizando...'."
                },
                {
                    question: "No encuentro el botón instalar en iPhone.",
                    answer: "Asegúrate de usar **Safari**. Chrome en iOS a veces esconde esta opción por restricciones de Apple. En Safari, 'Agregar a Inicio' está escondido dentro del menú Compartir."
                }
            ]}
        />
    </>
);
