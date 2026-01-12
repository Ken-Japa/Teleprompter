import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { ROUTES_CONFIG } from "../../../../config/routes";

export const ComoEscolherTeleprompterEN = () => (
    <>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            How to Choose the Ideal Teleprompter in 2026: The Ultimate Guide
        </h2>

        <p className="lead text-xl text-slate-300 mb-8">
            Did you search on Amazon and get confused with so many options? Glass, iPad, for mobile, studio... prices range from $20 to $1,000. Before you open your wallet, read this guide. The best choice might cost zero.
        </p>

        <div className="bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg mb-12">
            <h3 className="text-3xl font-bold text-white mb-6">The 3 Main Types of Teleprompter</h3>

            <div className="space-y-6">
                <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-purple-500">
                    <h3 className="text-xl font-bold text-white mb-2">1. Camera Teleprompter (iPad/Tablet)</h3>
                    <p className="text-slate-300 mb-2"><strong>What it is:</strong> A mount that attaches to the DSLR lens, with a glass reflecting a tablet screen.</p>
                    <p className="text-sm text-slate-400"><strong>Pros:</strong> Direct eye contact with the lens, professional. <strong>Cons:</strong> High cost ($100+), requires tablet and camera.</p>
                </div>

                <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-blue-500">
                    <h3 className="text-xl font-bold text-white mb-2">2. Presidential Teleprompter (Stage)</h3>
                    <p className="text-slate-300 mb-2"><strong>What it is:</strong> Transparent glass panels on stands. Used in speeches.</p>
                    <p className="text-sm text-slate-400"><strong>Pros:</strong> Invisible to the audience. <strong>Cons:</strong> Very expensive, hard to set up and transport.</p>
                </div>

                <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-green-500">
                    <h3 className="text-xl font-bold text-white mb-2">3. Software Teleprompter (Web/App)</h3>
                    <p className="text-slate-300 mb-2"><strong>What it is:</strong> Apps like PromptNinja that run on PC, Laptop, or Phone screens, right below the webcam.</p>
                    <p className="text-sm text-slate-400"><strong>Pros:</strong> Free, instant setup, works with webcam. <strong>Cons:</strong> Eye gaze slightly above the lens (imperceptible at 3ft distance).</p>
                </div>
            </div>
        </div>

        <h3 className="text-3xl font-bold text-white mt-12 mb-6">Buying Checklist: What to Consider?</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            <li className="flex items-center gap-3 bg-slate-800/50 p-4 rounded-lg">
                <span className="text-green-400 text-xl">✅</span>
                <span className="text-slate-300">Screen Size (Readability)</span>
            </li>
            <li className="flex items-center gap-3 bg-slate-800/50 p-4 rounded-lg">
                <span className="text-green-400 text-xl">✅</span>
                <span className="text-slate-300">Portability (Weight)</span>
            </li>
            <li className="flex items-center gap-3 bg-slate-800/50 p-4 rounded-lg">
                <span className="text-green-400 text-xl">✅</span>
                <span className="text-slate-300">Control Ease (Remote Control)</span>
            </li>
            <li className="flex items-center gap-3 bg-slate-800/50 p-4 rounded-lg">
                <span className="text-green-400 text-xl">✅</span>
                <span className="text-slate-300">Compatibility (iOS, Android, Windows)</span>
            </li>
        </ul>

        <h3 className="text-3xl font-bold text-white mt-12 mb-6">Verdict: Where to Start?</h3>
        <p className="text-slate-300 mb-8">
            If you are starting a YouTube channel or recording videos for social media, <strong>do not buy hardware now</strong>. Start with Software.
        </p>
        <p className="text-slate-300 mb-8">
            <strong>PromptNinja</strong> solves 90% of use cases without costing a penny. It simulates the physical teleprompter experience using the screen you already have. If one day you feel the need to buy a mirror (beam splitter glass) to use with a pro camera, PromptNinja has "Mirror Mode" ready for that too.
        </p>

        <SEOContentFAQ
            title="Buying Questions"
            items={[
                {
                    question: "Is it worth buying those cheap $30 teleprompters?",
                    answer: "Usually no. The glass is often low quality (darkens the image too much) and the plastic is fragile. Better to use an app on your laptop."
                },
                {
                    question: "Do I need a physical remote?",
                    answer: "With PromptNinja, no. You turn any old phone (or your current one) into a remote control via Wi-Fi. It's more responsive than cheap Bluetooth remotes."
                },
                {
                    question: "What screen size is ideal?",
                    answer: "Depends on the distance. For webcam (2-3ft), laptop screen is perfect. For camera far away (6ft+), use a large monitor or TV with giant text."
                }
            ]}
        />

        <div className="text-center mt-12 pb-12">
            <a
                href="#app?lang=en"
                className="inline-block bg-gradient-to-r from-purple-700 to-blue-700 font-bold py-4 px-10 rounded-full transition hover:scale-105 shadow-xl text-white text-lg"
            >
                Save $100: Use PromptNinja Free
            </a>
        </div>

        <div className="border-t border-slate-800 pt-12 mt-12">
            <h3 className="text-2xl font-bold text-white mb-6">See Also</h3>
            <ul className="space-y-4">
                <li>
                    <a href={ROUTES_CONFIG.SEO_VS_TELELESTRADOR.paths.en} className="text-purple-400 hover:text-purple-300 hover:underline text-lg">
                        📺 Teleprompter vs Telestrator: What is the Difference?
                    </a>
                </li>
                <li>
                    <a href={ROUTES_CONFIG.SEO_DIY.paths.en} className="text-purple-400 hover:text-purple-300 hover:underline text-lg">
                        🛠️ How to Make a DIY Teleprompter in 5 Minutes
                    </a>
                </li>
                <li>
                    <a href={ROUTES_CONFIG.SEO_O_QUE_E.paths.en} className="text-purple-400 hover:text-purple-300 hover:underline text-lg">
                        🤔 What is a Teleprompter? (Full Definition)
                    </a>
                </li>
            </ul>
        </div>
    </>
);
