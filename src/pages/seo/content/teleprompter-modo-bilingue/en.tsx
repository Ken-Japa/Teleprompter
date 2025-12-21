import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { SEOContentHowTo } from "../../../../components/seo/SEOContentHowTo";

export const TeleprompterModoBilingueEN = () => (
    <>
        <h1 className="text-4xl font-bold text-white mb-6 leading-tight">
            Learn English with Teleprompter: The "Shadowing" Technique
        </h1>

        <p className="mb-6 text-xl text-slate-300">
            You've studied English for years, understand grammar, but when you speak... you freeze. Pronunciation won't come out.
            This happens because your mouth lacks "muscle memory".
        </p>

        <div className="bg-slate-800 p-8 rounded-xl border border-blue-500/30 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">Polyglot's Secret: Shadowing</h2>
            <p className="text-slate-300 mb-4">
                Shadowing is a technique used by spies and diplomats. It consists of listening to a native speaker and repeating aloud *simultaneously*, with just milliseconds of delay.
            </p>
            <p className="text-slate-300">
                PromptNinja is the perfect tool for this. You paste the audio transcript, adjust speed to match native speech, and read along.
            </p>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">How to Use Bilingual Mode for Study</h2>

        <SEOContentHowTo
            title=""
            schemaTitle="How to Practice Shadowing with Teleprompter"
            totalTime="PT10M"
            tools={["PromptNinja", "Original Audio (Podcast/YouTube)"]}
            steps={[
                {
                    title: "1. Find Material",
                    text: "Get transcript of a TED Talk or movie scene."
                },
                {
                    title: "2. Visual Formatting",
                    text: "Paste into PromptNinja. Use UPPERCASE where speaker emphasizes (intonation)."
                },
                {
                    title: "3. Sync",
                    text: "Play video/audio and adjust teleprompter speed to match original speech rhythm exactly."
                },
                {
                    title: "4. Speak Up",
                    text: "Try to mimic not just words, but the 'music' of the sentence. Teleprompter forces you not to stop and think, creating fluency."
                }
            ]}
        />

        <SEOContentFAQ
            title="Student FAQ"
            items={[
                {
                    question: "Works for other languages?",
                    answer: "Yes! PromptNinja supports special characters (Japanese, Chinese, Russian, Arabic) using UTF-8 encoding. Ideal for scripts with different alphabets."
                },
                {
                    question: "Can I add translation?",
                    answer: "Yes. A common technique is to put English line and, right below, Portuguese translation in different color (use Markdown formatting or just parentheses)."
                }
            ]}
        />
    </>
);
