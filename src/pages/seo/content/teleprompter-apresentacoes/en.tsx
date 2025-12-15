import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";

export const TeleprompterApresentacoesEN = () => (
    <>
        <h1 className="text-4xl font-bold text-white mb-6">Teleprompter for Presentations (PowerPoint & Keynote)</h1>

        <p className="lead text-xl text-slate-300 mb-8">
            Delivering a slide presentation while remembering every stat and argument is tough. PromptNinja allows you to sync your speech with your PowerPoint, Google Slides, or Keynote decks, ensuring a confident and professional performance.
        </p>

        <div className="bg-slate-800 p-6 rounded-lg my-8 border-l-4 border-orange-500">
            <h2 className="text-2xl font-bold text-white mb-2">The "Second Brain" Technique</h2>
            <p className="text-slate-300">
                Don't clutter your slides with text. Use slides for visuals and PromptNinja for spoken content.
                <br /><br />
                By using our tool as your invisible script, you can keep your slides clean and impactful while speaking with authority, without memorizing every word. <a href="/en/institutional-scripts" className="text-purple-400 hover:text-purple-300 underline">Structure your speech with our corporate script examples</a>.
            </p>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">How to Sync Speech and Slides</h2>
        <div className="bg-slate-800 p-6 rounded-lg my-6">
            <ol className="list-decimal pl-6 space-y-6 text-slate-300">
                <li>
                    <strong>Slide Markers:</strong> In the PromptNinja editor, use visual markers (like [SLIDE 1], [SLIDE 2]) in yellow or red to know exactly when to advance the slide.
                </li>
                <li>
                    <strong>Two-Screen Setup:</strong> If presenting in person, use your laptop as the teleprompter (visible only to you) and the projector for slides.
                </li>
                <li>
                    <strong>Online Presentation:</strong> In virtual meetings, share only the PowerPoint window. Keep PromptNinja floating on top to read your script while advancing slides.
                </li>
            </ol>
        </div>

        <div className="text-center mt-12">
            <a
                href="https://promptninja.solutionkit.com.br/?lang=en/#app"
                className="inline-block bg-gradient-to-r from-orange-500 to-red-600 font-bold py-3 px-6 rounded-lg transition hover:brightness-110"
                style={{ color: 'white' }}
            >
                Deliver Memorable Presentations
            </a>
        </div>

        <SEOContentFAQ
            title="Presentation FAQs"
            items={[
                {
                    question: "Will the audience see I'm reading?",
                    answer: "If you verify positioning near the webcam (online) or glance at your laptop naturally (in-person), it's unnoticeable. The trick is frequent eye contact."
                },
                {
                    question: "Does it work with PowerPoint?",
                    answer: "Yes. In online meetings, share ONLY the PowerPoint window, not your full screen. Keep the teleprompter overlay on top; the audience won't see it."
                },
                {
                    question: "How do I mark slide changes?",
                    answer: "Type visual markers in your script like [SLIDE 1] or use different colors in the PromptNinja editor to visually signal when to click next."
                }
            ]}
        />
    </>
);
