import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { ROUTES_CONFIG } from "../../../../config/routes";

export const HistoriaDoTeleprompterEN = () => (
    <>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            The Secret History of the Teleprompter: From Paper Scrolls to AI
        </h1>

        <p className="lead text-xl text-slate-300 mb-8">
            Have you ever wondered how presidents give speeches for hours without missing a comma, or how news anchors look straight into the camera while reading breaking news? The answer isn't "photographic memory," it's technology. Let's travel back in time and discover how a cardboard box evolved into the app currently in your pocket.
        </p>

        <div className="bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">1950: The Birth of a Legend</h2>
            <p className="text-slate-300 mb-4">
                Imagine a Broadway actor, Fred Barton Jr., in despair. He had to memorize mountains of text for live television (yes, there were no "cuts" back then). The fear of forgetting lines, the famous "blanking out," was terrifying.
            </p>
            <p className="text-slate-300">
                The solution? In 1950, Fred, along with Hubert Schlafly and Irving Berlin Khan, created the first "Teleprompter." It was a mechanical contraption: a motorized roll of butcher paper inside a suitcase, with lines written in huge letters. Someone had to manually crank a handle for the text to scroll up!
            </p>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Evolution in 4 Acts</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="border border-slate-700 p-6 rounded-lg bg-slate-800/50">
                <h3 className="text-xl font-bold text-purple-400 mb-2">1. The Paper Era (1950-1980)</h3>
                <p className="text-slate-400 text-sm">
                    Physical scrolls turned by hand. If the operator sneezed and turned too fast, the presenter went silent. It was tense, expensive, and heavy.
                </p>
            </div>
            <div className="border border-slate-700 p-6 rounded-lg bg-slate-800/50">
                <h3 className="text-xl font-bold text-blue-400 mb-2">2. The Glass Revolution (1980s)</h3>
                <p className="text-slate-400 text-sm">
                    Enter "Beam Splitter Glass." A special glass at 45 degrees reflecting text from a floor monitor but letting the camera see through it. This was the magic of "eye-to-eye" contact.
                </p>
            </div>
            <div className="border border-slate-700 p-6 rounded-lg bg-slate-800/50">
                <h3 className="text-xl font-bold text-green-400 mb-2">3. Digitization (1990-2010)</h3>
                <p className="text-slate-400 text-sm">
                    Computers replaced scrolls. Dedicated software emerged but still required expensive hardware. The "presidential" teleprompter (that glass on a stand) became an icon.
                </p>
            </div>
            <div className="border border-slate-700 p-6 rounded-lg bg-slate-800/50">
                <h3 className="text-xl font-bold text-yellow-400 mb-2">4. The Web & Mobile Era (Today)</h3>
                <p className="text-slate-400 text-sm">
                    Here comes <strong>PromptNinja</strong>. Technology that cost thousands of dollars now runs in your browser, for free. Voice-controlled (AI) and connected via Wi-Fi.
                </p>
            </div>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Historical Curiosities</h2>
        <ul className="list-disc list-inside space-y-3 text-slate-300 mb-12">
            <li><strong>Dwight D. Eisenhower</strong> was the first US president to use a teleprompter in 1952.</li>
            <li>In the beginning, teleprompter operators were considered "artists" because they needed to feel the speaker's rhythm, like a musician.</li>
            <li>The word "Teleprompter" was originally a trademark, but became a generic term for the product (like Kleenex or Xerox).</li>
        </ul>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">The Future is Now</h2>
        <p className="text-slate-300 mb-8">
            Today, you don't need a TV crew. With PromptNinja, you have a studio in your pocket. Technology has evolved to allow YouTube creators, teachers, and salespeople to have the same eloquence as a news anchor, without the cost.
        </p>

        <SEOContentFAQ
            title="History FAQ"
            items={[
                {
                    question: "Who invented the Teleprompter?",
                    answer: "It was Hubert Schlafly, Irving Berlin Khan, and Fred Barton Jr. in the 1950s. Hubert Schlafly didn't use a teleprompter publicly until he was 88 years old!"
                },
                {
                    question: "How much did an old teleprompter cost?",
                    answer: "Professional equipment cost (and some still costs) thousands of dollars. Today, software like PromptNinja has democratized this to $0."
                },
                {
                    question: "What is the 'Presidential Teleprompter'?",
                    answer: "It's those two transparent glass panels on stands beside the podium. They allow the speaker to look left and right at the audience while reading the speech, without looking like they are reading."
                }
            ]}
        />

        <div className="text-center mt-12 pb-12">
            <a
                href="#app?lang=en"
                className="inline-block bg-gradient-to-r from-purple-600 to-blue-500 font-bold py-4 px-10 rounded-full transition hover:scale-105 shadow-xl text-white text-lg"
            >
                Join History: Use PromptNinja Now
            </a>
        </div>

        <div className="border-t border-slate-800 pt-12 mt-12">
            <h3 className="text-2xl font-bold text-white mb-6">See Also</h3>
            <ul className="space-y-4">
                <li>
                    <a href={ROUTES_CONFIG.SEO_VS_TELELESTRADOR.paths.en} className="text-purple-400 hover:text-purple-300 hover:underline text-lg">
                        📺 Teleprompter vs Telestrator: What's the Difference?
                    </a>
                </li>
                <li>
                    <a href={ROUTES_CONFIG.SEO_CELEBRITIES.paths.en} className="text-purple-400 hover:text-purple-300 hover:underline text-lg">
                        ⭐ 7 Celebrities Who Use Teleprompter
                    </a>
                </li>
                <li>
                    <a href={ROUTES_CONFIG.SEO_O_QUE_E.paths.en} className="text-purple-400 hover:text-purple-300 hover:underline text-lg">
                        🤔 What Is a Teleprompter? Basic Guide
                    </a>
                </li>
            </ul>
        </div>
    </>
);
