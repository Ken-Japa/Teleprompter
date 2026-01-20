import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { SEOContentHowTo } from "../../../../components/seo/SEOContentHowTo";
import { SEOImage } from "../../../../components/seo/SEOImage";

export const TeleprompterModoBilingueEN = () => (
    <>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Bilingual Teleprompter: Reach a Global Audience
        </h2>

        <p className="lead text-xl text-slate-300 mb-8 font-medium">
            In an increasingly connected world, producing content in only one language limits your potential. <strong>PromptNinja's bilingual mode was designed for creators who want to expand their boundaries and speak to the world.</strong>
        </p>

        <p className="text-slate-300 mb-8 leading-relaxed">
            In this guide, you'll discover how our exclusive tool facilitates simultaneous translation and recording videos in multiple languages. Whether you're a language teacher using the "Shadowing" technique, an executive preparing an international presentation, or a YouTuber creating dubbed versions of your content, PromptNinja offers the stability and clarity needed. Explore our side-by-side script features, special character support, and instant translation to ensure your message is understood anywhere on the planet, all for free and intuitively.
        </p>

        <SEOImage
            slug="teleprompter-modo-bilingue"
            src="Teleprompter.webp"
            alt="Teleprompter setup for bilingual content"
            caption="PromptNinja makes it easy to create content in multiple languages with side-by-side scripts."
            width={1200}
            height={675}
            priority={true}
        />

        <div className="bg-slate-800 p-8 rounded-xl border border-blue-500/30 mb-12">
            <h3 className="text-2xl font-bold text-white mb-4">Polyglot's Secret: Shadowing</h3>
            <p className="text-slate-300 mb-4">
                Shadowing is a technique used by spies and diplomats. It consists of listening to a native speaker and repeating aloud *simultaneously*, with just milliseconds of delay.
            </p>
            <p className="text-slate-300">
                PromptNinja is the perfect tool for this. You paste the audio transcript, adjust speed to match native speech, and read along.
            </p>
        </div>

        <SEOImage
            slug="teleprompter-modo-bilingue"
            src="free-online-teleprompter-monitors.webp"
            alt="Multiple monitors displaying PromptNinja interface"
            caption="Work with scripts in different languages simultaneously across multiple monitors."
            width={1200}
            height={675}
        />

        <h3 className="text-3xl font-bold text-white mt-12 mb-6">How to Use Bilingual Mode for Study</h3>

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

        <div className="text-center bg-slate-800 p-8 rounded-lg my-10">
            <h3 className="text-3xl font-bold text-white mb-4">Go Global with Your Message</h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                Break language barriers and speak to millions. Start your bilingual production today.
            </p>
            <a
                href="/?lang=en#app"
                className="inline-block bg-white text-slate-900 font-bold py-3 px-8 mx-auto rounded-full transition hover:bg-slate-200"
            >
                Start Free Global Script
            </a>
        </div>

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
