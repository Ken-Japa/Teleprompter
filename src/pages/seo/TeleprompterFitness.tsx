
import React from 'react';
import { SeoPageLayout } from './SeoPageLayout';
import { useTranslation } from '../../hooks/useTranslation';
import { useFAQSchema } from '../../hooks/useFAQSchema';
import { TeleprompterFitnessContentPT } from './content/teleprompter-fitness/pt';
import { TeleprompterFitnessContentEN } from './content/teleprompter-fitness/en';
import { TeleprompterFitnessContentES } from './content/teleprompter-fitness/es';

export const TeleprompterFitness: React.FC<{ onLaunch: () => void }> = ({ onLaunch }) => {
    const { lang } = useTranslation();
    const currentLang = (['pt', 'en', 'es'].includes(lang) ? lang : 'pt') as 'pt' | 'en' | 'es';

    const handleUseScript = (text: string) => {
        const encodedText = encodeURIComponent(text);
        window.location.href = `/?script=${encodedText}`;
    };

    const workoutScript = currentLang === 'pt' ? `TREINO INTELIGENTE - 4 MINUTOS
(Comandos de Voz e Timer)

[LOOP START]
Flexões (Conte em voz alta): 10 reps
[COUNT 10]
Descanso Automático - 10s
[REST 10]
Agachamentos - 15 reps
[COUNT 15]
Descanso - 10s
[REST 10]
[LOOP 3]

FIM DO TREINO!` : currentLang === 'es' ? `ENTRENAMIENTO INTELIGENTE - 4 MINUTOS
(Comandos de Voz y Timer)

[LOOP START]
Flexiones (Cuenta en voz alta): 10 reps
[COUNT 10]
Descanso Automático - 10s
[REST 10]
Sentadillas - 15 reps
[COUNT 15]
Descanso - 10s
[REST 10]
[LOOP 3]

¡FIN DEL ENTRENAMIENTO!` : `SMART WORKOUT - 4 MINUTES
(Voice Commands & Timer)

[LOOP START]
Push-ups (Count aloud): 10 reps
[COUNT 10]
Auto-Rest - 10s
[REST 10]
Squats - 15 reps
[COUNT 15]
Rest - 10s
[REST 10]
[LOOP 3]

WORKOUT DONE!`;

    const content = {
        title: {
            pt: "Teleprompter para Treinos e Aulas Fitness: Grave sem Interrupções",
            en: "Teleprompter for Fitness & CrossFit: Hands-Free Workout | PromptNinja",
            es: "Teleprompter para Fitness y CrossFit: Entrena con Manos Libres | PromptNinja"
        },
        description: {
            pt: "Crie aulas de fitness e treinos para YouTube e apps sem esquecer os exercícios. Use o roteiro do PromptNinja para manter a energia e o fôlego. Otimizado para mobilidade. Comece grátis.",
            en: "Turn PromptNinja into your ultimate workout partner. Create automated exercise loops, rest timers, and voice-activated sets. Perfect for home workouts and gym boxes.",
            es: "Lleva tu entrenamiento al siguiente nivel con PromptNinja. Temporizadores automáticos, bucles de ejercicios y control por voz para un entrenamiento 100% manos libres."
        }
    };

    const faqItems = [
        {
            q: { pt: "Como usar o teleprompter para treinar?", en: "How to use teleprompter for workouts?", es: "¿Cómo usar el teleprompter para entrenar?" },
            a: {
                pt: "Escreva seu treino. Use [COUNT X] para o app contar suas repetições via microfone, ou [REST X] para cronometrar descansos.",
                en: "Write your workout. Use [COUNT X] for the app to count your reps via mic, or [REST X] for rest timers.",
                es: "Escribe tu rutina. Usa [COUNT X] para que la app cuente reps vía micro, o [REST X] para descansos."
            }
        },
        {
            q: { pt: "Posso colocar na TV?", en: "Can I put it on TV?", es: "¿Puedo ponerlo en la TV?" },
            a: {
                pt: "Sim! Abra o site no navegador da sua TV ou espelhe a tela do celular/computador. O modo tela cheia facilita a visualização de longe.",
                en: "Yes! Open the site on your TV browser or mirror your phone/computer screen. Fullscreen mode makes it easy to see from a distance.",
                es: "¡Sí! Abre el sitio en el navegador de tu TV o duplica la pantalla del móvil/ordenador. El modo pantalla completa facilita la visión de lejos."
            }
        },
        {
            q: { pt: "Funciona offline?", en: "Does it work offline?", es: "¿Funciona offline?" },
            a: {
                pt: "Sim, o PromptNinja é um PWA. Você pode instalar e usar mesmo sem internet na academia ou parque.",
                en: "Yes, PromptNinja is a PWA. You can install and use it even without internet at the gym or park.",
                es: "Sí, PromptNinja es una PWA. Puedes instalarlo y usarlo incluso sin internet en el gimnasio o parque."
            }
        }
    ];

    useFAQSchema(faqItems.map(item => ({ q: item.q[currentLang], a: item.a[currentLang] })));

    let Content = TeleprompterFitnessContentPT;
    if (currentLang === 'en') Content = TeleprompterFitnessContentEN;
    if (currentLang === 'es') Content = TeleprompterFitnessContentES;

    return (
        <SeoPageLayout
            title={content.title[currentLang]}
            description={content.description[currentLang]}
            canonicalUrl={`https://promptninja.solutionkit.com.br${currentLang === 'en' ? '/en/teleprompter-for-fitness-workout' : currentLang === 'es' ? '/es/teleprompter-para-fitness-entrenamiento' : '/teleprompter-para-fitness-treino'}`}
            onLaunch={onLaunch}
        >
            <Content />

            {/* Live Demo Script Preview */}
            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 mb-20">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-mono text-slate-500 uppercase">{currentLang === 'pt' ? 'Prévia do Roteiro' : 'Script Preview'}</span>
                    <button onClick={() => handleUseScript(workoutScript)} className="text-green-400 hover:text-green-300 text-sm font-bold">
                        {currentLang === 'pt' ? 'ABRIR NO EDITOR ->' : 'OPEN IN EDITOR ->'}
                    </button>
                </div>
                <pre className="font-mono text-slate-300 text-sm whitespace-pre-wrap bg-black/50 p-4 rounded-xl border border-white/5">
                    {workoutScript}
                </pre>
            </div>

            {/* FAQ Section */}
            <div className="mb-24 max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-white mb-12">{currentLang === 'pt' ? 'Perguntas Frequentes' : currentLang === 'es' ? 'Preguntas Frecuentes' : 'FAQ'}</h2>
                <div className="grid gap-6">
                    {faqItems.map((item, index) => (
                        <div key={index} className="bg-slate-900/40 border border-slate-800/60 rounded-xl p-6 hover:bg-slate-900/60 transition-colors">
                            <h3 className="text-lg font-bold text-green-300 mb-3 !mt-0">
                                {item.q[currentLang]}
                            </h3>
                            <p className="text-slate-400 leading-relaxed m-0">
                                {item.a[currentLang]}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-16 p-8 bg-slate-900 rounded-2xl border border-slate-800 text-center">
                <h2 className="text-2xl font-semibold text-white mb-4 !mt-0">
                    {currentLang === 'pt' ? "Pronto para suar?" : currentLang === 'es' ? "¿Listo para sudar?" : "Ready to sweat?"}
                </h2>
                <p className="text-slate-400 mb-6">
                    {currentLang === 'pt' ?
                        "O PromptNinja é 100% gratuito e não exige cadastro." :
                        currentLang === 'es' ? "PromptNinja es 100% gratuito y no requiere registro." :
                            "PromptNinja is 100% free and requires no signup."}
                </p>
                <button
                    onClick={onLaunch}
                    className="px-8 py-3 bg-white text-slate-900 font-bold rounded-full hover:bg-slate-200 transition-all transform hover:scale-105"
                >
                    {currentLang === 'pt' ? "Começar Agora" : currentLang === 'es' ? "Empezar Ahora" : "Start Now"}
                </button>
            </div>
        </SeoPageLayout>
    );
};
