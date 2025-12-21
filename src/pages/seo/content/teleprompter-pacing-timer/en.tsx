import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";

export const TeleprompterPacingTimerEN = () => (
    <>
        <h1 className="text-4xl font-bold text-white mb-6 leading-tight">
            Master Timing: How Not to Get Cut Off in Your Pitch or Talk
        </h1>

        <p className="mb-6 text-xl text-slate-300">
            "Your time is up." Nothing is more embarrassing than being interrupted mid-conclusion in a Talk or Sales Pitch because you talked too much.
        </p>

        <div className="bg-slate-800 p-8 rounded-xl border-l-4 border-orange-500 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">The Adrenaline Trap</h2>
            <p className="text-slate-300 mb-4">
                When nervous, our time perception distorts. We think we spoke for 2 minutes, but it was 5. Or we rush and finish in 30 seconds.
            </p>
            <p className="text-slate-300">
                Teleprompter is your visual metronome. If text ends in 3 minutes at speed X, it will <strong>always</strong> end in 3 minutes, no matter how fast your heart beats.
            </p>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Pacing Techniques</h2>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-slate-900/50 p-6 rounded border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-2">⏱️ The TED Method</h3>
                <p className="text-slate-300 text-sm">
                    TED Talks are strictly 18 minutes. Speakers train with teleprompter to internalize this rhythm. Use PromptNinja's built-in HUD timer to monitor real time vs estimated time.
                </p>
            </div>
            <div className="bg-slate-900/50 p-6 rounded border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-2">🐢 Dramatic Pauses</h3>
                <p className="text-slate-300 text-sm">
                    Write <code>[LONG PAUSE]</code> or skip 5 lines in your script. This forces you to breathe and look at audience, creating impact. Silence is as important as speech.
                </p>
            </div>
        </div>

        <SEOContentFAQ
            title="Timing FAQ"
            items={[
                {
                    question: "How many words per minute (WPM)?",
                    answer: "Conversational average is 130-150 WPM. For educational videos, aim for 140 WPM. For energetic ads (sales), go up to 160 WPM. PromptNinja calculates your estimated WPM automatically."
                },
                {
                    question: "Does timer stop if I pause?",
                    answer: "Yes. PromptNinja's timer is linked to text movement. If you pause text to answer an audience question, estimated time stops."
                }
            ]}
        />
    </>
);
