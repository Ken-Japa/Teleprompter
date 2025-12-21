import { ROUTES_CONFIG } from "../../../../config/routes";

export const HubGuideContentEN = () => (
    <>
        <div className="lead text-xl text-slate-300 mb-12 font-medium border-l-4 border-purple-500 pl-6 bg-slate-800/30 py-4 rounded-r-lg">
            Welcome to the internet's largest repository of Teleprompter knowledge. If you want to record better videos, speak with confidence, and master the camera, you are in the right place.
        </div>

        <section id="oque" className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="bg-purple-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                What is a Teleprompter?
            </h2>
            <p>
                The <a href={ROUTES_CONFIG.SEO_O_QUE_E.paths.en}>Teleprompter</a> (or "prompter") is the secret tool behind TV presenters, presidents, and successful YouTubers. It allows you to read a script while looking directly into the camera lens.
            </p>
            <p>
                This creates an immediate connection with your audience because it simulates natural eye contact. No one notices you are reading, and you never forget what you have to say.
            </p>
        </section>

        <section id="como-usar" className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="bg-purple-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                How to Use (Step-by-Step)
            </h2>
            <p>
                Using a teleprompter today is much easier than in the analog TV era. You don't need $1,000 equipment.
            </p>
            <h3 className="text-xl font-bold text-white mt-8 mb-4">The Basic Setup</h3>
            <ul className="list-disc pl-6 space-y-4 marker:text-purple-500">
                <li>
                    <strong>On Computer:</strong> Just access <a href={ROUTES_CONFIG.SEO_PC_WINDOWS.paths.en}>PromptNinja in your browser</a>. Ideal for online classes, Zoom, and Google Meet.
                </li>
                <li>
                    <strong>On Mobile/Tablet:</strong> Use our <a href={ROUTES_CONFIG.SEO_PWA_INSTALL.paths.en}>Web App (PWA)</a> that works offline. Position the phone close to the camera lens.
                </li>
                <li>
                    <strong>Pro Kit:</strong> Use a "Beam Splitter" (reflective glass) with a <a href={ROUTES_CONFIG.SEO_TABLET.paths.en}>Tablet</a> underneath.
                </li>
            </ul>
        </section>

        <section id="apps" className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="bg-purple-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
                Best Apps & Tools
            </h2>
            <p>
                There are dozens of options, but the future is <strong>Web-Based</strong>. Why download a heavy app if you can use it directly in the browser?
            </p>
            <div className="bg-slate-800 p-6 rounded-xl my-6">
                <h4 className="font-bold text-lg text-white mb-2">Why PromptNinja?</h4>
                <ul className="grid md:grid-cols-2 gap-4">
                    <li className="flex items-center gap-2">✅ <strong>100% Free</strong> (no giant watermarks)</li>
                    <li className="flex items-center gap-2">✅ <strong>Total Privacy</strong> (your data doesn't leave your PC)</li>
                    <li className="flex items-center gap-2">✅ <strong>Voice Command</strong> (text scrolls as you speak)</li>
                    <li className="flex items-center gap-2">✅ <strong>Works Offline</strong></li>
                </ul>
            </div>
            <p>
                See our full comparison of the <a href={ROUTES_CONFIG.SEO_MELHOR_APP.paths.en}>Best Teleprompter App</a> and also <a href={ROUTES_CONFIG.SEO_ALTERNATIVAS.paths.en}>Alternatives to competitors</a>.
            </p>
        </section>

        <section id="diy" className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="bg-purple-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">4</span>
                DIY vs Professional
            </h2>
            <p>
                You can start with zero investment. We have an amazing guide on <a href={ROUTES_CONFIG.SEO_DIY.paths.en}>How to make a DIY Teleprompter</a> using a CD case or picture frame glass.
            </p>
            <p>
                If you are looking for maximum quality for YouTube, see our tips on <a href={ROUTES_CONFIG.SEO_HARDWARE_VS_WEB.paths.en}>Hardware vs Software</a>.
            </p>
        </section>

        <section id="casos" className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="bg-purple-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">5</span>
                Specific Use Cases
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-purple-500 transition-colors">
                    <h3 className="font-bold text-white mb-2">📹 Youtubers & Creators</h3>
                    <p className="text-sm text-slate-400 mb-4">
                        Record long videos in "One Take". Save hours of editing.
                    </p>
                    <a href={ROUTES_CONFIG.SEO_YOUTUBERS.paths.en} className="text-purple-400 text-sm font-bold hover:underline">View Guide for Creators →</a>
                </div>
                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-purple-500 transition-colors">
                    <h3 className="font-bold text-white mb-2">💼 Home Office & Meetings</h3>
                    <p className="text-sm text-slate-400 mb-4">
                        Impress your boss on Zoom, Teams, or Meet. Speak without stuttering and with authority.
                    </p>
                    <a href={ROUTES_CONFIG.SEO_ZOOM.paths.en} className="text-purple-400 text-sm font-bold hover:underline">Guide for Meetings →</a>
                </div>
                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-purple-500 transition-colors">
                    <h3 className="font-bold text-white mb-2">🎵 Musicians & Singers</h3>
                    <p className="text-sm text-slate-400 mb-4">
                        Never forget lyrics at a show or livestream again.
                    </p>
                    <a href={ROUTES_CONFIG.SEO_MODO_MUSICO.paths.en} className="text-purple-400 text-sm font-bold hover:underline">Musician Mode →</a>
                </div>
                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-purple-500 transition-colors">
                    <h3 className="font-bold text-white mb-2">🏋️ Fitness & Workouts</h3>
                    <p className="text-sm text-slate-400 mb-4">
                        Teach exercise classes perfectly timed using our timer.
                    </p>
                    <a href={ROUTES_CONFIG.SEO_FITNESS.paths.en} className="text-purple-400 text-sm font-bold hover:underline">For Personal Trainers →</a>
                </div>
            </div>
        </section>

        <section id="recursos" className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="bg-purple-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">6</span>
                Scripts & Public Speaking
            </h2>
            <p>
                The tool is useless without good content. That's why we created a library of <a href={ROUTES_CONFIG.SEO_SCRIPTS.paths.en}>Teleprompter Scripts</a> ready to use.
            </p>
            <p>
                Additionally, check out our <a href={ROUTES_CONFIG.SEO_ORATORIA.paths.en}>Video Public Speaking Tips</a> and learn <a href={ROUTES_CONFIG.SEO_DECORAR.paths.en}>how to memorize scripts fast</a> in case the prompter fails (which won't happen with us, see our <a href={ROUTES_CONFIG.SEO_TRAVANDO.paths.en}>Anti-Freezing</a> solution).
            </p>
        </section>
    </>
);
