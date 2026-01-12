import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { SEOContentHowTo } from "../../../../components/seo/SEOContentHowTo";

export const ComoDecorarTextoEN = () => (
    <>
        <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
            How to Memorize Lines Fast (The Secret is NOT to Memorize)
        </h2>

        <p className="text-lg text-slate-300 mb-8">
            You have a presentation tomorrow. Script is 5 pages long. Your heart races just thinking about forgetting a line and freezing on camera.
            The brutal truth? <strong>Trying to memorize is amateur.</strong>
        </p>

        <div className="bg-slate-800 p-8 rounded-xl border-l-4 border-yellow-500 mb-12 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-4">The Myth of Perfect Memory</h3>
            <p className="text-slate-300 mb-4">
                We think news anchors, politicians, and big YouTubers have photographic memories. Lie. They have <strong>Teleprompters</strong>.
            </p>
            <p className="text-slate-300">
                TV industry discovered 50 years ago that human brain wasn't made to recite. It was made to converse. When you try to recall words, your eyes go blank ("dead fish eyes") and your voice goes robotic.
            </p>
        </div>

        <h3 className="text-3xl font-bold text-white mt-12 mb-6">The "Invisible Gaze" Technique</h3>
        <p className="mb-6 text-slate-300">
            "But if I read, they will notice!"
            Not if you use the right technique. The secret isn't what you read, but <strong>how you set up the screen.</strong>
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-red-900/10 p-6 rounded border border-red-500/30">
                <h3 className="font-bold text-red-400 mb-2">❌ The Common Mistake</h3>
                <p className="text-sm text-slate-300">
                    Putting text full width on a widescreen monitor.
                    <br /><strong>Result:</strong> Your eyes dart side to side like watching a tennis match. Everyone notices.
                </p>
            </div>
            <div className="bg-green-900/10 p-6 rounded border border-green-500/50">
                <h3 className="font-bold text-green-400 mb-2">✅ The Ninja Technique</h3>
                <p className="text-sm text-slate-300">
                    Narrowing text margin to just 3 or 4 words per line, right in the center.
                    <br /><strong>Result:</strong> Your eyes stay fixed in center. To the viewer, you are looking deep into their soul.
                </p>
            </div>
        </div>

        <h3 className="text-3xl font-bold text-white mt-12 mb-6">Step-by-Step: From Reading to Performance</h3>

        <SEOContentHowTo
            title=""
            schemaTitle="How to Read Teleprompter Naturally"
            totalTime="PT5M"
            tools={["PromptNinja", "Text"]}
            steps={[
                {
                    title: "1. The Funnel Setup",
                    text: "In PromptNinja, increase side margins until text is a thin column in the center. Increase font size to giant."
                },
                {
                    title: "2. The Magic Distance",
                    text: "Step back from screen. The further you are, the smaller the angle of your eye movement. Minimum 3 feet (1 meter)."
                },
                {
                    title: "3. Body Language",
                    text: "Audience forgives a glance, but not lack of energy. Move hands. Nod. Smile. When your body moves, your lively eyes disguise reading."
                }
            ]}
        />

        <div className="mt-12 bg-slate-900 p-8 rounded-xl border border-slate-700">
            <h3 className="text-2xl font-bold text-white mb-4">The Science of "Cognitive Relief"</h3>
            <p className="text-slate-300">
                When you don't spend 90% of your brain power trying to remember next word, that energy is freed for <strong>Acting</strong>.
                You can finally put emotion, irony, and pauses in your speech. Teleprompter doesn't trap you; it frees you.
            </p>
        </div>

        <SEOContentFAQ
            title="Reading FAQ"
            items={[
                {
                    question: "What if I lose rhythm?",
                    answer: "PromptNinja bas 'Voice Activated Scroll' in Pro version, which listens to your voice and scrolls text automatically. If you stop to sneeze or improvise, it waits for you."
                },
                {
                    question: "Works with glasses?",
                    answer: "Yes! Actually better, as frames sometimes hide micro-eye movements. Just watch out for screen reflection in lens (increase room brightness or change angle)."
                },
                {
                    question: "How much time do I save?",
                    answer: "Studies show teleprompter reduces recording time by 60% and editing time by 80% (eliminates error cuts). It is the ultimate productivity tool."
                }
            ]}
        />

        <div className="text-center mt-12">
            <a
                href="https://promptninja.solutionkit.com.br"
                className="inline-block bg-white text-slate-900 font-bold py-3 px-8 mx-auto rounded-full transition hover:bg-slate-200"
            >
                Open Teleprompter Now (No Login)
            </a>
        </div>
    </>
);
