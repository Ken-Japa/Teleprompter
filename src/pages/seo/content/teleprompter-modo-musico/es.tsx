import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";

export const TeleprompterModoMusicoES = () => (
    <>
        <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
            Teleprompter para Músicos: Nunca Más Olvides Letra en Escenario
        </h2>

        <p className="mb-6 text-xl text-slate-300">
            Pesadilla de todo cantante: estás a medio show, banda toca, público mira... y te quedas en blanco. Olvidas primer verso de siguiente estrofa.
        </p>

        <p className="mb-8 text-slate-300">
            Grandes artistas (de Bono a Caetano) usan teleprompters en escenario. No es vergüenza, es <strong>seguridad profesional</strong>. PromptNinja tiene un "Modo Músico" secreto que debes conocer.
        </p>

        <div className="bg-slate-800 p-8 rounded-xl border border-purple-500/30 mb-12">
            <h3 className="text-2xl font-bold text-white mb-4">Diferente a un Discurso</h3>
            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-lg font-bold text-slate-200 mb-2">🎤 Problema de Carpetas</h3>
                    <p className="text-sm text-slate-400">
                        Carpetas con hojas papel vuelan con viento, necesitan luz externa para leerse en oscuro escenario y exigen que pares de tocar para voltear página.
                    </p>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-purple-400 mb-2">🎸 Solución Digital</h3>
                    <p className="text-sm text-slate-300">
                        Pantalla iluminada (visible en oscuro), scroll automático (manos libres) y letras gigantes (legible desde suelo).
                    </p>
                </div>
            </div>
        </div>

        <h3 className="text-3xl font-bold text-white mt-12 mb-6">Configurando "Escenario Ninja"</h3>

        <div className="space-y-6 mb-12">
            <div className="flex gap-4">
                <div className="text-3xl">🦶</div>
                <div>
                    <h3 className="text-xl font-bold text-white">1. Pedal Pasapáginas</h3>
                    <p className="text-slate-300">
                        PromptNinja acepta atajos teclado. Si compras pedal Bluetooth (como PageFlip o iRig), configúralo para simular tecla "Espacio".
                        <br /> Hemos configurado algunos accesos directos de fábrica predeterminados:
                        <ul className=" text-slate-400">
                            <li>Page Down: Play/Pause</li>
                            <li>Page Up: Stop/Reset</li>
                            <li>End: Próxima sesión (utilizar en el texto [PARTE 1] [PARTE 2] etc.)</li>
                            <li>Home: Sesión anterior </li>
                        </ul>
                        <br /><strong>Resultado:</strong> Pisas, letra rueda. Tus manos siguen en guitarra/teclado.
                    </p>
                </div>
            </div>

            <div className="flex gap-4">
                <div className="text-3xl">📱</div>
                <div>
                    <h3 className="text-xl font-bold text-white">2. Tablet en Pie de Micro</h3>
                    <p className="text-slate-300">
                        Usa soporte de tablet que agarre al pedestal micrófono. Pon PromptNinja en pantalla completa. Ajusta fondo a negro total y texto blanco para no iluminar tu cara desde abajo ("efecto fantasma").
                    </p>
                </div>
            </div>

            <div className="flex gap-4">
                <div className="text-3xl">🎼</div>
                <div>
                    <h3 className="text-xl font-bold text-white">3. Formato de Acordes</h3>
                    <p className="text-slate-300">
                        PromptNinja respeta saltos de línea. Puedes pegar letra con acordes encima.
                        <br /><span className="font-mono text-yellow-400 text-sm">G                D                Em<br />En este largo camino de vida...</span>
                    </p>
                </div>
            </div>
        </div>

        <SEOContentFAQ
            title="FAQ de Banda"
            items={[
                {
                    question: "¿Funciona offline en show?",
                    answer: "¡Sí! Instala PWA (App) de PromptNinja. Una vez cargado, no necesita Wi-Fi. Internet del escenario puede caer, tu letra sigue ahí."
                },
                {
                    question: "¿Cómo sincronizar con banda?",
                    answer: "Puedes definir velocidad exacta de scroll (BPM Visual). O mejor, deja control a baterista vía pedal, ya que él lleva el tiempo."
                },
                {
                    question: "¿Y si canción tiene solo largo?",
                    answer: "Inserta varios saltos de línea vacíos en texto entre estrofas. Así, texto 'camina' en espacio blanco durante solo y siguiente estrofa llega a tiempo."
                }
            ]}
        />
    </>
);
