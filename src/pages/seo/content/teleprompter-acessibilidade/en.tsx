import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";

export const TeleprompterAcessibilidadeEN = () => (
    <>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Teleprompter for ADHD and Dyslexia: How Technology Helps Speech
        </h1>

        <p className="lead text-xl text-slate-300 mb-8">
            For those with ADHD (Attention Deficit Hyperactivity Disorder) or Dyslexia, recording videos can be a nightmare. Forgetting what to say, swapping words, losing focus... A teleprompter is not just a reading tool, it's an <strong>assisted focus</strong> tool.
        </p>

        <div className="bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">PromptNinja Features for Neurodiversity</h2>

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

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Tips for Creators with ADHD</h2>
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
    </>
);
