
import React from 'react';
import { SeoPageLayout } from './SeoPageLayout';
import { useTranslation } from '../../hooks/useTranslation';
import { useFAQSchema } from '../../hooks/useFAQSchema';

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
            pt: "Teleprompter para Fitness e Crossfit: Treine sem Tocar no Celular",
            en: "Teleprompter for Fitness & CrossFit: Workout Hands-Free",
            es: "Teleprompter para Fitness y CrossFit: Entrena sin Tocar el Móvil"
        },
        description: {
            pt: "Use o PromptNinja como timer de treino. Crie loops de exercícios, cronômetros de descanso e séries automáticas. O melhor app de teleprompter para seus treinos em casa ou box.",
            en: "Use PromptNinja as a workout timer. Create exercise loops, rest timers, and automatic sets. The best teleprompter app for home workouts or gym.",
            es: "Usa PromptNinja como temporizador de entrenamiento. Crea bucles de ejercicios, cronómetros de descanso y series automáticas. La mejor app de teleprompter para entrenar en casa o gimnasio."
        },
        hero: {
            title: {
                pt: "Seu Novo Parceiro de Treino Digital",
                en: "Your New Digital Workout Partner",
                es: "Tu Nuevo Compañero de Entrenamiento Digital"
            },
            subtitle: {
                pt: "Chega de contar repetições de cabeça ou sujar o celular. Coloque seu treino na TV ou Tablet e siga o fluxo.",
                en: "Stop counting reps in your head or getting your phone dirty. Put your workout on TV or Tablet and follow the flow.",
                es: "Deja de contar repeticiones mentalmente o ensuciar el móvil. Pon tu entrenamiento en la TV o Tablet y sigue el flujo."
            }
        },
        features: {
            loop: {
                title: { pt: "Repetições por Voz", en: "Voice Counting", es: "Conteo por Voz" },
                desc: {
                    pt: "Use [COUNT 10] e conte em voz alta 'um, dois...'. O PromptNinja escuta e só avança quando você terminar.",
                    en: "Use [COUNT 10] and count aloud 'one, two...'. PromptNinja listens and only advances when you finish.",
                    es: "Usa [COUNT 10] y cuenta 'uno, dos...'. PromptNinja escucha y solo avanza cuando terminas."
                }
            },
            pause: {
                title: { pt: "Timers de Descanso", en: "Rest Timers", es: "Timers de Descanso" },
                desc: {
                    pt: "Use [REST 10] para exibir um cronômetro gigante na tela. Perfeito para ver de longe.",
                    en: "Use [REST 10] to show a giant timer on screen. Perfect for viewing from afar.",
                    es: "Usa [REST 10] para mostrar un cronómetro gigante. Perfecto para ver de lejos."
                }
            },
            screen: {
                title: { pt: "Tela Grande", en: "Big Screen", es: "Pantalla Grande" },
                desc: {
                    pt: "Ideal para TV e Tablets. Veja seu próximo exercício de longe, sem interromper o flow.",
                    en: "Ideal for TV and Tablets. See your next exercise from afar without interrupting your flow.",
                    es: "Ideal para TV y Tablets. Ve tu próximo ejercicio de lejos, sin interrumpir el flow."
                }
            }
        },
        cta: {
            pt: "Carregar Treino Exemplo",
            en: "Load Example Workout",
            es: "Cargar Entrenamiento Ejemplo"
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

    return (
        <SeoPageLayout
            title={content.title[currentLang]}
            description={content.description[currentLang]}
            canonicalUrl={`https://promptninja.com/${currentLang}/${currentLang === 'pt' ? 'teleprompter-para-fitness-treino' : currentLang === 'es' ? 'teleprompter-para-fitness-entrenamiento' : 'teleprompter-for-fitness-workout'}`}
            onLaunch={onLaunch}
        >
            {/* Hero Section */}
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500 mb-6">
                    {content.hero.title[currentLang]}
                </h1>
                <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                    {content.hero.subtitle[currentLang]}
                </p>

                <div className="mt-8 flex justify-center">
                    <button
                        onClick={() => handleUseScript(workoutScript)}
                        className="px-8 py-4 bg-green-500 hover:bg-green-600 text-slate-900 font-bold rounded-full text-lg shadow-lg hover:shadow-green-500/20 transition-all transform hover:scale-105 flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {content.cta[currentLang]}
                    </button>
                </div>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-20">
                <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 hover:border-green-500/30 transition-all">
                    <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-400 mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{content.features.loop.title[currentLang]}</h3>
                    <p className="text-slate-400">{content.features.loop.desc[currentLang]}</p>
                </div>

                <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 hover:border-green-500/30 transition-all">
                    <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-400 mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{content.features.pause.title[currentLang]}</h3>
                    <p className="text-slate-400">{content.features.pause.desc[currentLang]}</p>
                </div>

                <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 hover:border-green-500/30 transition-all">
                    <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-400 mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{content.features.screen.title[currentLang]}</h3>
                    <p className="text-slate-400">{content.features.screen.desc[currentLang]}</p>
                </div>
            </div>

            {/* Live Demo Script Preview */}
            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 mb-20">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-mono text-slate-500">SCRIPT PREVIEW</span>
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
