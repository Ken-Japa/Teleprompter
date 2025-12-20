import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { SEOContentHowTo } from "../../../../components/seo/SEOContentHowTo";

export const TeleprompterIphoneIpadES = () => (
    <>
        <h1 className="text-4xl font-bold text-white mb-6">Teleprompter para iPhone y iPad: Convierte tu iOS en un Estudio</h1>

        <p className="lead text-xl text-slate-300 mb-8">
            La cámara de tu iPhone o iPad ya es increíble. Lo que falta es una forma profesional de leer guiones sin desviar la mirada. PromptNinja es el teleprompter perfecto para el ecosistema Apple, funcionando directamente en Safari con rendimiento nativo e integración P2P.
        </p>

        <div className="bg-slate-800 p-6 rounded-lg my-8 border-l-4 border-slate-200">
            <h2 className="text-2xl font-bold text-white mb-2">La Experiencia Apple, Sin Costos de App Store</h2>
            <p className="text-slate-300">
                La mayoría de apps de teleprompter en la App Store cobran suscripciones semanales caras. PromptNinja es diferente: corre en tu navegador Safari, es gratis y sincroniza al instante con tu Mac.
                <br /><br />
                Además, puedes añadirlo a la pantalla de inicio ("Add to Home Screen") para una experiencia de app a pantalla completa.
            </p>
        </div>
        <SEOContentHowTo
            title="Configuración Ideal para Creadores iOS"
            schemaTitle="Cómo Configurar Teleprompter en iPhone y iPad"
            totalTime="PT5M"
            tools={["iPhone", "iPad", "DSLR (Opcional)"]}
            steps={[
                {
                    title: "Opción 1: iPad como Monitor Principal",
                    text: "La pantalla grande del iPad es perfecta para lectura a media distancia. Colócalo bajo la lente de tu DSLR para un setup pro."
                },
                {
                    title: "Opción 2: iPhone como Mando",
                    text: "Abre el guion en el iPad, escanea el QR con el iPhone. Tu móvil ahora controla la velocidad y pausa del iPad al instante."
                },
                {
                    title: "Opción 3: Vlogging con iPhone",
                    text: "¿Grabas Stories o TikToks? Abre PromptNinja en el propio iPhone, coloca el texto arriba y graba sin perder contacto visual."
                }
            ]}
        />

        <div className="text-center mt-12">
            <a
                href="https://promptninja.solutionkit.com.br/?lang=es/#app"
                className="inline-block bg-gradient-to-r from-slate-600 to-slate-500 font-bold py-3 px-6 rounded-lg transition hover:brightness-110"
                style={{ color: 'white' }}
            >
                Úsalo en tu iPhone o iPad Ahora
            </a>
        </div>

        <SEOContentFAQ
            title="Preguntas Frecuentes de Usuarios iOS"
            items={[
                {
                    question: "¿Necesito descargar una aplicación de la App Store?",
                    answer: "No. PromptNinja es una Web App (PWA). Accedes a través de Safari y puedes añadirla a tu pantalla de inicio para que funcione exactamente como una app nativa, pero sin ocupar espacio y totalmente gratis."
                },
                {
                    question: "¿Funciona sin internet (Offline)?",
                    answer: "¡Sí! Después de cargar la página por primera vez, la aplicación se guarda en la caché de tu iPhone/iPad y funciona incluso en modo avión, asegurando que nunca te quedes tirado durante una grabación."
                },
                {
                    question: "¿Puedo controlar mi iPad usando mi iPhone?",
                    answer: "Por supuesto. Esta es la configuración favorita de nuestros usuarios. Abre el texto en el iPad (que servirá de pantalla) y escanea el código QR con el iPhone para convertirlo en un control remoto instantáneo."
                }
            ]}
        />
    </>
);
