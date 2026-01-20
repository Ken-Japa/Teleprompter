import { SEOImage } from "../../../../components/seo/SEOImage";

export const TeleprompterFitnessContentEN = () => (
    <>
        <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500 mb-6 leading-tight">
            Teleprompter for Fitness & CrossFit: Hands-Free Workout
        </h2>

        <p className="lead text-xl text-slate-300 mb-8 font-medium">
            Stop counting reps or getting your phone dirty. <strong>Use PromptNinja to automate your sets, rest timers, and drills</strong> for a high-intensity, distraction-free performance.
        </p>

        <SEOImage
            slug="teleprompter-para-fitness-treino"
            src="teleprompter-fitness-treino-coach.webp"
            alt="Fitness athlete using teleprompter to guide workout"
            caption="PromptNinja works as a digital coach, guiding your sets and rests automatically."
            width={1200}
            height={675}
        />

        <p className="text-slate-300 mb-8 leading-relaxed">
            Record your workouts with total fluidity. Put your script on the screen and let PromptNinja guide your sets and rests automatically. Turn PromptNinja into your ultimate workout partner. Create automated exercise loops, rest timers, and voice-activated sets. Perfect for home workouts and gym boxes.
        </p>

        <div className="bg-green-600/10 border border-green-500/20 rounded-2xl p-6 md:p-8 text-center mb-12">
            <h3 className="text-2xl font-bold text-white mb-4">Train Without Distractions</h3>
            <p className="text-slate-300 mb-6 font-medium">
                Put your workout on the big screen and let PromptNinja handle the timing.
                100% free, no registration, and gym-ready.
            </p>
            <a href="/?lang=en#app" className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition-all hover:scale-105 shadow-lg shadow-green-500/25">
                Start Your Workout Session
            </a>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
            <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 hover:border-green-500/30 transition-all">
                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-400 mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Voice Counting</h3>
                <p className="text-slate-400">Use [COUNT 10] and count aloud 'one, two...'. PromptNinja listens and only advances when you finish.</p>
            </div>

            <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 hover:border-green-500/30 transition-all">
                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-400 mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Rest Timers</h3>
                <p className="text-slate-400">Use [REST 10] to show a giant timer on screen. Perfect for viewing from afar.</p>
            </div>

            <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 hover:border-green-500/30 transition-all">
                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-400 mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Big Screen</h3>
                <p className="text-slate-400">Ideal for TV and Tablets. See your next exercise from afar without interrupting your flow.</p>
            </div>
        </div>

        <section className="mb-16">
            <h3 className="text-3xl font-bold text-white mb-8 text-center">Success Stories: Coaching with Data</h3>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                    <h4 className="font-bold text-white mb-2">CrossFit Box Owner</h4>
                    <p className="text-slate-400 text-sm">"I use PromptNinja on the main box TV to show the WOD. The automatic rest timers mean I can focus 100% on correcting my athletes' form instead of staring at a stopwatch."</p>
                </div>
                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                    <h4 className="font-bold text-white mb-2">Yoga Instructor</h4>
                    <p className="text-slate-400 text-sm">"Recording flow classes used to be a mess. Now I have my cues right in front of me, and the voice command waits for me to finish a sequence before showing the next pose."</p>
                </div>
            </div>
        </section>

        <section className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-6">Comparison: PromptNinja vs Traditional Stopwatches</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-2xl">
                    <thead>
                        <tr className="bg-slate-800">
                            <th className="p-4 font-bold text-white border-b border-slate-700">Feature</th>
                            <th className="p-4 font-bold text-green-400 border-b border-slate-700">PromptNinja</th>
                            <th className="p-4 font-bold text-slate-400 border-b border-slate-700">Standard Timer</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="p-4 border-b border-slate-800 font-medium text-slate-300">Exercise Instructions</td>
                            <td className="p-4 border-b border-slate-800 text-green-400">✅ Dynamic Text</td>
                            <td className="p-4 border-b border-slate-800 text-slate-500">❌ Digits only</td>
                        </tr>
                        <tr>
                            <td className="p-4 border-b border-slate-800 font-medium text-slate-300">Rep Counting</td>
                            <td className="p-4 border-b border-slate-800 text-green-400">✅ Voice Activated</td>
                            <td className="p-4 border-b border-slate-800 text-slate-500">❌ Manual</td>
                        </tr>
                        <tr>
                            <td className="p-4 border-b border-slate-800 font-medium text-slate-300">Custom Flows</td>
                            <td className="p-4 border-b border-slate-800 text-green-400">✅ Unlimited Loops</td>
                            <td className="p-4 border-b border-slate-800 text-slate-500">❌ Hardcoded</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    </>
);
