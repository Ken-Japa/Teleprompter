import React from "react";
import * as S from "../../../../components/ui/Styled";
import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { SEOContentHowTo } from "../../../../components/seo/SEOContentHowTo";

export const TeleprompterModoBilingueES: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
                Teleprompter Modo Bilingüe: La Revolución para Aprendizaje y Presentaciones
            </h1>

            <div className="prose prose-lg prose-invert mx-auto mb-12">
                <p>
                    Si estás aprendiendo un nuevo idioma, preparando una presentación internacional o creando contenido para una audiencia global, el <strong>Modo Bilingüe de PromptNinja</strong> es la herramienta que faltaba en tu arsenal.
                </p>
                <p>
                    A diferencia de cualquier otro <a href="/es/teleprompter-online-gratis" className="text-blue-400 hover:underline">teleprompter online gratuito</a>, PromptNinja te permite visualizar dos guiones simultáneamente, lado a lado, con sincronización perfecta y control independiente.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                <S.FeatureCard
                    icon={<span className="text-4xl">📚</span>}
                    title="Aprendizaje de Idiomas"
                    desc="Coloca el texto original a la izquierda y la traducción a la derecha. Sigue la estructura de las frases y expande tu vocabulario mientras practicas la pronunciación."
                />
                <S.FeatureCard
                    icon={<span className="text-4xl">🎤</span>}
                    title="Presentaciones Internacionales"
                    desc="Mantén tu guion nativo como referencia mientras lees el discurso en un idioma extranjero. Nunca más te pierdas en la traducción."
                />
            </div>

            <h2 className="text-3xl font-bold text-white mb-6 mt-12">¿Cómo Funciona el Modo Bilingüe?</h2>

            <div className="space-y-6 text-gray-300 text-lg mb-12">
                <p>
                    Activar el modo bilingüe es simple e inmediato. En el editor de PromptNinja, simplemente haz clic en el botón <strong>"Modo Bilingüe"</strong>.
                </p>
                <SEOContentHowTo
                    title=""
                    schemaTitle="Cómo Usar el Modo Bilingüe"
                    totalTime="PT1M"
                    tools={["PromptNinja", "Texto Original", "Traducción"]}
                    steps={[
                        {
                            title: "Paso 1: Activar",
                            text: "Haz clic en el botón 'Modo Bilingüe'. La pantalla se divide en dos columnas."
                        },
                        {
                            title: "Paso 2: Insertar Textos",
                            text: "Pega el texto base a la izquierda (Principal) y la traducción/notas a la derecha (Secundario)."
                        },
                        {
                            title: "Paso 3: Sincronizar",
                            text: "Usa Control de Voz o scroll manual. Ambos textos se desplazan juntos."
                        }
                    ]}
                />
                <p>
                    Durante el desplazamiento del teleprompter, ambos textos se mueven en sincronía. Si usas nuestro exclusivo <strong>Control por Voz</strong>, ¡puedes elegir a cuál de los dos idiomas el sistema debe "escuchar" para avanzar el texto automáticamente!
                </p>
            </div>

            <h2 className="text-3xl font-bold text-white mb-6">¿Por qué usar un Teleprompter Bilingüe?</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-slate-800 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-white mb-3">Políglotas y Estudiantes</h3>
                    <p className="text-gray-400">
                        La técnica de "Shadowing" se vuelve mucho más fácil cuando tienes el texto original y la traducción visibles al mismo tiempo. Ideal para practicar con <a href="/es/teleprompter-para-presentaciones" className="text-blue-400 hover:underline">presentaciones profesionales</a>.
                    </p>
                </div>
                <div className="bg-slate-800 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-white mb-3">Oradores Globales</h3>
                    <p className="text-gray-400">
                        Asegúrate de que tus chistes y puntos clave se entreguen correctamente en otro idioma, teniendo tu respaldo en tu lengua materna.
                    </p>
                </div>
                <div className="bg-slate-800 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-white mb-3">Creadores de Contenido</h3>
                    <p className="text-gray-400">
                        Graba versiones del mismo video en múltiples idiomas sin tener que memorizar nuevos guiones desde cero. Si eres músico, mira también nuestro <a href="/es/teleprompter-modo-musico" className="text-blue-400 hover:underline">Modo Músico</a>.
                    </p>
                </div>
            </div>

            <div className="bg-blue-900/30 border border-blue-500/30 p-8 rounded-xl mb-12">
                <h3 className="text-2xl font-bold text-blue-400 mb-4">Consejo Pro: Alineación Perfecta</h3>
                <p className="text-gray-300">
                    Para asegurar que los párrafos queden siempre alineados, recomendamos usar saltos de línea dobles (Enter x2) en los mismos puntos en ambos textos. Así, la sincronía visual se mantiene desde el principio hasta el final de tu grabación.
                </p>
            </div>

            <SEOContentFAQ
                title="Preguntas Frecuentes sobre el Modo Bilingüe"
                items={[
                    {
                        question: "¿Necesito instalar algún software?",
                        answer: "¡No! PromptNinja es 100% online. Accedes directamente desde el navegador, ya sea en computadora, tablet o celular, sin necesidad de descargar nada."
                    },
                    {
                        question: "¿El control por voz funciona en ambos idiomas?",
                        answer: "Sí, pero debes seleccionar qué idioma el sistema debe 'escuchar' para controlar el desplazamiento. Puedes alternar entre rastrear el idioma de la izquierda o de la derecha en la configuración."
                    },
                    {
                        question: "¿Puedo usarlo en presentaciones en vivo?",
                        answer: "Por supuesto. El Modo Bilingüe es perfecto para conferencias donde necesitas apoyo visual en dos idiomas. Y como funciona offline (PWA), no dependes del internet del evento."
                    },
                    {
                        question: "¿Es gratuito?",
                        answer: "Sí, el Modo Bilingüe está disponible en la versión gratuita de PromptNinja para que todos puedan experimentar y mejorar sus habilidades lingüísticas."
                    }
                ]}
            />
        </div>
    );
};
