import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";

export const TeleprompterGoogleMeetTeamsES = () => (
    <>
        <h1 className="text-4xl font-bold text-white mb-6">Teleprompter para Google Meet y Microsoft Teams: Reuniones Ejecutivas</h1>

        <p className="lead text-xl text-slate-300 mb-8">
            En reuniones de junta, ventas B2B o presentaciones de RRHH, la precisión es fundamental. PromptNinja transforma tu Google Meet o Microsoft Teams en un escenario profesional, permitiéndote leer tus puntos clave manteniendo contacto visual constante con los stakeholders.
        </p>

        <div className="bg-slate-800 p-6 rounded-lg my-8 border-l-4 border-indigo-500">
            <h2 className="text-2xl font-bold text-white mb-2">Tecnología Invisible para Empresas</h2>
            <p className="text-slate-300">
                PromptNinja corre 100% en el navegador, <strong>sin necesidad de instalación (derechos de admin)</strong> en ordenadores corporativos.
                <br /><br />
                Seguridad es prioridad: todos los guiones se guardan localmente. Nada se envía a la nube, garantizando conformidad con políticas de datos sensibles.
            </p>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Cómo Hacer Presentaciones Ejecutivas Impecables</h2>
        <div className="bg-slate-800 p-6 rounded-lg my-6">
            <ol className="list-decimal pl-6 space-y-6 text-slate-300">
                <li>
                    <strong>Superposición:</strong> Redimensiona la ventana de PromptNinja para que sea estrecha y colócala arriba, centrada bajo la webcam.
                </li>
                <li>
                    <strong>Google Meet/Teams:</strong> Abre tu app de reunión. Coloca PromptNinja estratégicamente para leer sin desviar la mirada.
                </li>
                <li>
                    <strong>Control Discreto:</strong> Conecta tu móvil corporativo como control remoto. Controla el desplazamiento con toques sutiles, sin clics de ratón audibles.
                </li>
            </ol>
        </div>

        <div className="text-center mt-12">
            <a
                href="https://promptninja.solutionkit.com.br/?lang=es/#app"
                className="inline-block bg-gradient-to-r from-indigo-600 to-blue-800 font-bold py-3 px-6 rounded-lg transition hover:brightness-110"
                style={{ color: 'white' }}
            >
                Domina tus Reuniones Online Ahora
            </a>
        </div>

        <SEOContentFAQ
            title="Preguntas Frecuentes sobre Reuniones Online"
            items={[
                {
                    question: "¿Aparece el teleprompter para los otros participantes?",
                    answer: "No. PromptNinja es una ventana independiente en tu navegador. Si compartes solo una pestaña de Chrome (con tu presentación) o simplemente hablas a la cámara, nadie verá el texto desplazándose."
                },
                {
                    question: "¿Funciona si solo tengo un monitor?",
                    answer: "Sí. Recomendamos usar el modo 'Ventana' y hacerla estrecha, posicionada justo debajo de la webcam, superponiendo parcialmente Teams/Meet. Ajusta la transparencia si es necesario."
                },
                {
                    question: "¿Es seguro para información confidencial?",
                    answer: "Totalmente. PromptNinja opera localmente en tu navegador. El texto que pegas en él no se envía a servidores en la nube, garantizando la privacidad de los datos de tu empresa."
                }
            ]}
        />
    </>
);
