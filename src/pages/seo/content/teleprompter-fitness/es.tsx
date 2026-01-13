export const TeleprompterFitnessContentES = () => (
    <>
        <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500 mb-6 leading-tight">
            Teleprompter para Fitness y CrossFit: Entrenamiento Manos Libres
        </h2>

        <p className="lead text-xl text-slate-300 mb-8 font-medium">
            Deja de contar repeticiones mentalmente o de ensuciar tu móvil. <strong>Usa PromptNinja para automatizar tus series, timers de descanso y ejercicios</strong> para un rendimiento máximo sin distracciones.
        </p>

        <p className="text-slate-300 mb-8 leading-relaxed">
            Graba tus entrenamientos con fluidez total. Pon tu rutina en la pantalla y deja que PromptNinja guíe tus series y descansos automáticamente. Transforma PromptNinja en tu compañero de entrenamiento definitivo. Crea bucles de ejercicios automatizados, timers de descanso y series activadas por voz. Perfecto para entrenamientos en casa y boxes de crossfit.
        </p>

        <div className="bg-green-600/10 border border-green-500/20 rounded-2xl p-6 md:p-8 text-center mb-12">
            <h3 className="text-2xl font-bold text-white mb-4">Entrena sin Distracciones</h3>
            <p className="text-slate-300 mb-6 font-medium">
                Pon tu rutina en la pantalla grande y deja que PromptNinja controle los tiempos.
                100% gratis, sin registros y listo para el gimnasio.
            </p>
            <a href="/es/#app" className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition-all hover:scale-105 shadow-lg shadow-green-500/25">
                Empezar Sesión de Entrenamiento
            </a>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
            <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 hover:border-green-500/30 transition-all">
                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-400 mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Conteo por Voz</h3>
                <p className="text-slate-400">Usa [COUNT 10] y cuenta 'uno, dos...'. PromptNinja escucha y solo avanza cuando terminas.</p>
            </div>

            <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 hover:border-green-500/30 transition-all">
                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-400 mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Timers de Descanso</h3>
                <p className="text-slate-400">Usa [REST 10] para mostrar un cronómetro gigante. Perfecto para ver de lejos.</p>
            </div>

            <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 hover:border-green-500/30 transition-all">
                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-400 mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Pantalla Grande</h3>
                <p className="text-slate-400">Ideal para TV y Tablets. Ve tu próximo ejercicio de lejos, sin interrumpir el flow.</p>
            </div>
        </div>

        <section className="mb-16">
            <h3 className="text-3xl font-bold text-white mb-8 text-center">Historias de Éxito: Entrenamiento con Datos</h3>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                    <h4 className="font-bold text-white mb-2">Dueño de Box de CrossFit</h4>
                    <p className="text-slate-400 text-sm">"Uso PromptNinja en la TV principal del box para mostrar el WOD. Los temporizadores de descanso automáticos significan que puedo concentrarme 100% en corregir la técnica de mis atletas en lugar de mirar un cronómetro."</p>
                </div>
                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                    <h4 className="font-bold text-white mb-2">Instructora de Yoga</h4>
                    <p className="text-slate-400 text-sm">"Grabar clases de flow solía ser un caos. Ahora tengo mis comandos justo frente a mí, y el comando de voz espera a que termine una secuencia antes de mostrar la siguiente postura."</p>
                </div>
            </div>
        </section>

        <section className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-6">Comparación: PromptNinja vs Cronómetros Tradicionales</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-2xl">
                    <thead>
                        <tr className="bg-slate-800">
                            <th className="p-4 font-bold text-white border-b border-slate-700">Función</th>
                            <th className="p-4 font-bold text-green-400 border-b border-slate-700">PromptNinja</th>
                            <th className="p-4 font-bold text-slate-400 border-b border-slate-700">Cronómetro Estándar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="p-4 border-b border-slate-800 font-medium text-slate-300">Instrucciones de Ejercicio</td>
                            <td className="p-4 border-b border-slate-800 text-green-400">✅ Texto Dinámico</td>
                            <td className="p-4 border-b border-slate-800 text-slate-500">❌ Solo dígitos</td>
                        </tr>
                        <tr>
                            <td className="p-4 border-b border-slate-800 font-medium text-slate-300">Conteo de Reps</td>
                            <td className="p-4 border-b border-slate-800 text-green-400">✅ Activado por Voz</td>
                            <td className="p-4 border-b border-slate-800 text-slate-500">❌ Manual</td>
                        </tr>
                        <tr>
                            <td className="p-4 border-b border-slate-800 font-medium text-slate-300">Flujos Personalizados</td>
                            <td className="p-4 border-b border-slate-800 text-green-400">✅ Bucles Ilimitados</td>
                            <td className="p-4 border-b border-slate-800 text-slate-500">❌ Estáticos</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    </>
);
