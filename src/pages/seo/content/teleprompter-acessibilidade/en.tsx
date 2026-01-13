import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { ROUTES_CONFIG } from "../../../../config/routes";

export const TeleprompterAcessibilidadeEN = () => (
    <>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Teleprompter and Accessibility: Assisted Focus Technology
        </h2>

        <p className="lead text-xl text-slate-300 mb-8 font-medium">
            Transform the challenge of speaking to the camera into an experience of confidence. <strong>Discover how inclusive features</strong> help people with ADHD, Dyslexia, and other neurodiversities shine on video.
        </p>

        <p className="text-slate-300 mb-8 leading-relaxed">
            In this deep dive into digital inclusion, we explore the vital role of the teleprompter as an accessibility tool. For neurodiverse creators, the act of recording can be filled with anxiety and loss of focus. PromptNinja was designed to combat these obstacles, offering unique features like the OpenDyslexic font — designed to increase readability and reduce letter flipping — and visual focus markers that isolate relevant information, eliminating cognitive noise. Learn how Voice Control allows the script to wait for your processing time, and how high-contrast color schemes protect against visual stress. We democratize professional public speaking by offering all these tools for free and online, ensuring that no one is left behind in the era of video content.
        </p>

        <div className="bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg mb-12">
            <h3 className="text-3xl font-bold text-white mb-6">PromptNinja Features for Neurodiversity</h3>

            <div className="space-y-6">
                <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-orange-500">
                    <h3 className="text-xl font-bold text-white mb-2">OpenDyslexic Font</h3>
                    <p className="text-slate-300 mb-2">
                        PromptNinja is one of the few apps that natively offers the <strong>OpenDyslexic</strong> font.
                    </p>
                    <p className="text-sm text-slate-400">
                        This font has "heavier" letter bottoms, which helps the brain identify the correct letter direction and prevents them from "dancing" or flipping on the screen.
                    </p>
                </div>

                <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-blue-500">
                    <h3 className="text-xl font-bold text-white mb-2">Visual Focus (The Ruler)</h3>
                    <p className="text-slate-300 mb-2">
                        People with ADHD often get lost in a block of text. PromptNinja has a central visual marker (highlight) that highlights only the current line.
                    </p>
                    <p className="text-sm text-slate-400">
                        This eliminates visual noise from the rest of the text and tells your brain: "Read ONLY this now."
                    </p>
                </div>

                <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-purple-500">
                    <h3 className="text-xl font-bold text-white mb-2">Customizable Colors</h3>
                    <p className="text-slate-300 mb-2">
                        High contrast (black background, white letter) can be tiring for some (visual stress). The app allows changing to gray background, yellow letters, or any combination that is comfortable for your sensory sensitivity.
                    </p>
                </div>
            </div>
        </div>

        <h3 className="text-3xl font-bold text-white mt-12 mb-6">Tips for Creators with ADHD</h3>
        <ul className="list-disc list-inside space-y-4 text-slate-300 mb-12">
            <li><strong>Write Short Scripts:</strong> Break the video into 3-minute blocks. Sustained focus is hard.</li>
            <li><strong>Use Voice Control:</strong> If you ramble (which is normal), the teleprompter waits. If you speed up in excitement, it follows. This reduces the anxiety of "losing the spot."</li>
            <li><strong>Record Standing Up:</strong> Movement helps keep energy and focus. The prompter at eye level allows you to move without losing your reading.</li>
        </ul>

        <SEOContentFAQ
            title="Accessibility FAQ"
            items={[
                {
                    question: "Does PromptNinja work with screen readers?",
                    answer: "We are constantly working to improve compatibility with screen readers and keyboard navigation, ensuring the app is usable by visually impaired people."
                },
                {
                    question: "Is the OpenDyslexic font really proven?",
                    answer: "Studies vary, but many users report a significant improvement in reading fluency. The best thing is to test it: activate it in the settings menu (gear icon) and see if it works for you."
                },
                {
                    question: "Is the app free for educational use?",
                    answer: "Yes! PromptNinja is 100% free. Teachers and students with learning difficulties can use it without restrictions."
                }
            ]}
        />

        <div className="text-center mt-12 pb-12">
            <a
                href="#app?lang=en"
                className="inline-block bg-gradient-to-r from-purple-700 to-blue-700 font-bold py-4 px-10 rounded-full transition hover:scale-105 shadow-xl text-white text-lg"
            >
                Try OpenDyslexic Font Now
            </a>
        </div>

        <div className="border-t border-slate-800 pt-12 mt-12">
            <h3 className="text-2xl font-bold text-white mb-6">See Also</h3>
            <ul className="space-y-4">
                <li>
                    <a href={ROUTES_CONFIG.SEO_READING_SPEED.paths.en} className="text-purple-400 hover:text-purple-300 hover:underline text-lg">
                        🚀 What is the Ideal Reading Speed?
                    </a>
                </li>
                <li>
                    <a href={ROUTES_CONFIG.SEO_GRATIS.paths.en} className="text-purple-400 hover:text-purple-300 hover:underline text-lg">
                        💸 Free Online Teleprompter (No Login)
                    </a>
                </li>
                <li>
                    <a href={ROUTES_CONFIG.SEO_ORATORIA.paths.en} className="text-purple-400 hover:text-purple-300 hover:underline text-lg">
                        🗣️ Public Speaking Tips for Video
                    </a>
                </li>
            </ul>
        </div>
    </>
);
