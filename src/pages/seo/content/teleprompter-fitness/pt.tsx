export const TeleprompterFitnessContentPT = () => (
    <>
        <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500 mb-6 leading-tight">
            Teleprompter para Fitness e CrossFit: Treino Hands-Free
        </h2>

        <p className="lead text-xl text-slate-300 mb-8 font-medium">
            Pare de contar repetições mentalmente ou de sujar seu celular. <strong>Use o PromptNinja para automatizar suas séries, timers de descanso e exercícios</strong> para uma performance de alta intensidade e sem distrações.
        </p>

        <p className="text-slate-300 mb-8 leading-relaxed">
            Grave seus treinos com fluidez total. Coloque seu roteiro na tela e deixe o PromptNinja guiar suas séries e descansos automaticamente. Transforme o PromptNinja em seu parceiro de treino definitivo. Crie loops de exercícios automatizados, timers de descanso e séries ativadas por voz. Perfeito para treinos em casa e boxes de crossfit.
        </p>

        <div className="bg-green-600/10 border border-green-500/20 rounded-2xl p-6 md:p-8 text-center mb-12">
            <h3 className="text-2xl font-bold text-white mb-4">Treine sem Distrações</h3>
            <p className="text-slate-300 mb-6 font-medium">
                Coloque seu treino na tela grande e deixe o PromptNinja cuidar do tempo.
                100% grátis, sem registro e pronto para a academia.
            </p>
            <a href="/#app" className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition-all hover:scale-105 shadow-lg shadow-green-500/25">
                Iniciar Sessão de Treino
            </a>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
            <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 hover:border-green-500/30 transition-all">
                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-400 mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Contagem por Voz</h3>
                <p className="text-slate-400">Use [COUNT 10] e conte em voz alta 'um, dois...'. O PromptNinja escuta e só avança quando você terminar.</p>
            </div>

            <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 hover:border-green-500/30 transition-all">
                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-400 mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Timers de Descanso</h3>
                <p className="text-slate-400">Use [REST 10] para exibir um cronômetro gigante na tela. Perfeito para ver de longe.</p>
            </div>

            <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 hover:border-green-500/30 transition-all">
                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-400 mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Tela Grande</h3>
                <p className="text-slate-400">Ideal para TV e Tablets. Veja seu próximo exercício de longe, sem interromper o flow.</p>
            </div>
        </div>

        <section className="mb-16">
            <h3 className="text-3xl font-bold text-white mb-8 text-center">Casos de Sucesso: Treinando com Dados</h3>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                    <h4 className="font-bold text-white mb-2">Dono de Box de CrossFit</h4>
                    <p className="text-slate-400 text-sm">"Uso o PromptNinja na TV principal do box para exibir o WOD. Os timers de descanso automáticos significam que posso focar 100% em corrigir a técnica dos meus atletas em vez de ficar olhando para um cronômetro."</p>
                </div>
                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                    <h4 className="font-bold text-white mb-2">Instrutora de Yoga</h4>
                    <p className="text-slate-400 text-sm">"Gravar aulas de flow costumava ser uma bagunça. Agora tenho meus comandos bem na minha frente, e o comando de voz espera eu terminar uma sequência antes de mostrar a próxima postura."</p>
                </div>
            </div>
        </section>

        <section className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-6">Comparação: PromptNinja vs Cronômetros Tradicionais</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-2xl">
                    <thead>
                        <tr className="bg-slate-800">
                            <th className="p-4 font-bold text-white border-b border-slate-700">Recurso</th>
                            <th className="p-4 font-bold text-green-400 border-b border-slate-700">PromptNinja</th>
                            <th className="p-4 font-bold text-slate-400 border-b border-slate-700">Cronômetro Padrão</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="p-4 border-b border-slate-800 font-medium text-slate-300">Instruções de Exercício</td>
                            <td className="p-4 border-b border-slate-800 text-green-400">✅ Texto Dinâmico</td>
                            <td className="p-4 border-b border-slate-800 text-slate-500">❌ Apenas dígitos</td>
                        </tr>
                        <tr>
                            <td className="p-4 border-b border-slate-800 font-medium text-slate-300">Contagem de Reps</td>
                            <td className="p-4 border-b border-slate-800 text-green-400">✅ Ativado por Voz</td>
                            <td className="p-4 border-b border-slate-800 text-slate-500">❌ Manual</td>
                        </tr>
                        <tr>
                            <td className="p-4 border-b border-slate-800 font-medium text-slate-300">Fluxos Personalizados</td>
                            <td className="p-4 border-b border-slate-800 text-green-400">✅ Loops Ilimitados</td>
                            <td className="p-4 border-b border-slate-800 text-slate-500">❌ Estáticos</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    </>
);
