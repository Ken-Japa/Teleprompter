import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { ROUTES_CONFIG } from "../../../../config/routes";

export const ErrosComunsTeleprompterEN = () => (
    <>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            5 Amateur Mistakes When Using a Teleprompter That Ruin Your Videos (And How to Fix Them)
        </h1>

        <p className="lead text-xl text-slate-300 mb-8">
            You bought the gear, downloaded the app, but the final video turned out... weird. Robotically read, eyes darting from side to side. Relax, the problem isn't you, it's the technique. Let's fix the 5 classic mistakes right now.
        </p>

        <div className="space-y-8 mb-12">
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-xl shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl font-bold text-red-500">1</div>
                <h2 className="text-2xl font-bold text-red-400 mb-3 relative z-10">The "Watching Tennis" Eyes</h2>
                <p className="text-slate-300 mb-4 relative z-10">
                    The most obvious mistake: your eyes move from left to right while reading, looking like you're watching a ping-pong match.
                </p>
                <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-green-500">
                    <h4 className="font-bold text-green-400 mb-1">How to Fix with PromptNinja:</h4>
                    <p className="text-sm text-slate-300">
                        Increase the distance from the camera (minimum 3 feet / 1 meter) and <strong>narrow the text margins</strong> in the app. The narrower the text column, the less your eyes need to move laterally.
                    </p>
                </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-8 rounded-xl shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl font-bold text-red-500">2</div>
                <h2 className="text-2xl font-bold text-red-400 mb-3 relative z-10">The "Robot Voice"</h2>
                <p className="text-slate-300 mb-4 relative z-10">
                    Speaking in a monotone, without pauses or emotion, just dumping words out. This happens when you try to keep up with the text speed, instead of the text keeping up with you.
                </p>
                <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-green-500">
                    <h4 className="font-bold text-green-400 mb-1">How to Fix with PromptNinja:</h4>
                    <p className="text-sm text-slate-300">
                        Use the <strong>Voice Control (AI)</strong> feature. PromptNinja listens to your voice and scrolls the text only when you speak. This allows you to make dramatic pauses, breathe, and act naturally.
                    </p>
                </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-8 rounded-xl shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl font-bold text-red-500">3</div>
                <h2 className="text-2xl font-bold text-red-400 mb-3 relative z-10">Forgetting to Blink (The Stare)</h2>
                <p className="text-slate-300 mb-4 relative z-10">
                    Anxious not to lose your place, you widen your eyes and stop blinking. The result is scary for the viewer.
                </p>
                <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-green-500">
                    <h4 className="font-bold text-green-400 mb-1">The Solution:</h4>
                    <p className="text-sm text-slate-300">
                        Add emojis or line breaks in the script as visual reminders to [BLINK] or [SMILE]. Relax.
                    </p>
                </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-8 rounded-xl shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl font-bold text-red-500">4</div>
                <h2 className="text-2xl font-bold text-red-400 mb-3 relative z-10">Writing "Books" instead of "Conversations"</h2>
                <p className="text-slate-300 mb-4 relative z-10">
                    Scripts with long sentences and difficult words sound artificial.
                </p>
                <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-green-500">
                    <h4 className="font-bold text-green-400 mb-1">The Solution:</h4>
                    <p className="text-sm text-slate-300">
                        Read your script aloud before recording. If you stumble, rewrite it. Write as if you were talking to a friend at a bar.
                    </p>
                </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-8 rounded-xl shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl font-bold text-red-500">5</div>
                <h2 className="text-2xl font-bold text-red-400 mb-3 relative z-10">Font Too Small</h2>
                <p className="text-slate-300 mb-4 relative z-10">
                    Trying to read tiny letters makes you squint, which conveys insecurity.
                </p>
                <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-green-500">
                    <h4 className="font-bold text-green-400 mb-1">How to Fix with PromptNinja:</h4>
                    <p className="text-sm text-slate-300">
                        Increase the font size to XL. It is better to scroll faster than to strain your eyes.
                    </p>
                </div>
            </div>
        </div>

        <SEOContentFAQ
            title="Technical Mistakes FAQ"
            items={[
                {
                    question: "What if I stumble on a word while recording?",
                    answer: "Keep going! If it's a small and natural mistake, keep it. It adds authenticity. If it's serious, stop, breathe, look at the camera (not the text), and repeat the phrase. Edit later."
                },
                {
                    question: "Can I wear glasses while reading the teleprompter?",
                    answer: "Watch out for screen reflection on your glasses. Try raising the teleprompter light (brightness) or changing the angle of room lighting to avoid reflections on lenses."
                },
                {
                    question: "Can I improvise in the middle?",
                    answer: "Absolutely. PromptNinja has a [SPACE] shortcut that stops scrolling instantly. Improvise, and when you return to the script, hit space again."
                }
            ]}
        />

        <div className="text-center mt-12 pb-12">
            <a
                href="#app?lang=en"
                className="inline-block bg-gradient-to-r from-purple-600 to-blue-700 font-bold py-4 px-10 rounded-full transition hover:scale-105 shadow-xl text-white text-lg"
            >
                Record Flawlessly Now (Free)
            </a>
        </div>

        <div className="border-t border-slate-800 pt-12 mt-12">
            <h3 className="text-2xl font-bold text-white mb-6">See Also</h3>
            <ul className="space-y-4">
                <li>
                    <a href={ROUTES_CONFIG.SEO_READING_SPEED.paths.en} className="text-purple-400 hover:text-purple-300 hover:underline text-lg">
                        🚀 What Is the Ideal Reading Speed (WPM)?
                    </a>
                </li>
                <li>
                    <a href={ROUTES_CONFIG.SEO_ORATORIA.paths.en} className="text-purple-400 hover:text-purple-300 hover:underline text-lg">
                        🗣️ 5 Public Speaking Tips for Video
                    </a>
                </li>
                <li>
                    <a href={ROUTES_CONFIG.SEO_DECORAR.paths.en} className="text-purple-400 hover:text-purple-300 hover:underline text-lg">
                        🧠 How to Memorize Scripts Fast
                    </a>
                </li>
            </ul>
        </div>
    </>
);
