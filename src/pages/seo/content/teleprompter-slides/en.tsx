import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { SEOContentHowTo } from "../../../../components/seo/SEOContentHowTo";

export const TeleprompterSlidesEN = () => (
    <>
        <h1 className="text-4xl font-bold text-white mb-6">Sync Teleprompter with PowerPoint: Perfect Presentations</h1>

        <p className="mb-6">
            The biggest nightmare for anyone presenting with slides is desynchronization: the teleprompter keeps scrolling while you are still explaining the graph on the previous slide. <strong>PromptNinja</strong> solves this definitively with the **Command Synchronization** feature.
        </p>

        <p className="mb-6">
            Transform your institutional presentations, online classes, and webinars into professional performances where audio and visuals walk together, effortlessly.
        </p>

        <div className="bg-slate-800 p-6 rounded-lg my-8 border-l-4 border-orange-500">
            <h2 className="text-2xl font-bold text-white mb-2">The Secret: [STOP] Command</h2>
            <p className="text-slate-300 mb-4">
                The logic is simple: your script should wait for you. By inserting the <strong>[STOP]</strong> tag, you create mandatory stop points.
            </p>
            <SEOContentHowTo
                title=""
                schemaTitle="How to Use [STOP] Command for Slides"
                totalTime="PT2M"
                tools={["PromptNinja", "PowerPoint"]}
                steps={[
                    {
                        title: "Step 1: Insert Tag",
                        text: "Type [STOP] (uppercase, brackets) in your script where you want to pause to change slides."
                    },
                    {
                        title: "Step 2: Auto Pause",
                        text: "The teleprompter scrolls until it hits [STOP] and pauses automatically."
                    },
                    {
                        title: "Step 3: Change Slide & Resume",
                        text: "Switch your slide, explain the chart, and click (or use clicker) to resume scrolling."
                    }
                ]}
            />
        </div>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Compatible with Slide Clickers</h2>
        <p className="mb-4">
            Most slide presenters (Logitech clickers, etc.) work by sending keyboard commands (Arrows, Space, or Page Down).
        </p>
        <p className="mb-6">
            PromptNinja recognizes these signals. This means that with a **single device** in your hand, you can control both your computer slides and the text on your teleprompter. Maximum productivity, zero complications.
        </p>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Use Cases</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-2">Sales Webinars</h3>
                <p className="text-sm text-slate-300">Ensure the price and offer appear in your speech exactly at the moment the "Checkout" slide appears on screen. Use <strong>[STOP]</strong> before revealing the price.</p>
            </div>
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-2">Online Classes</h3>
                <p className="text-sm text-slate-300">Teachers can lock the text while drawing on a digital whiteboard or explaining a complex concept off-script.</p>
            </div>
        </div>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Diction and Pacing</h2>
        <p className="mb-6">
            Besides synchronization, using programmed stops helps maintain a more natural speaking rhythm. Learn more about controlling your pace on our <a href="/en/teleprompter-pacing-timer-online" className="text-blue-400 hover:text-blue-300 underline">Pacing and Timer</a> page.
        </p>

        <div className="text-center bg-slate-800 p-8 rounded-lg my-10">
            <h2 className="text-3xl font-bold text-white mb-4">Present with Confidence</h2>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                Never worry about "losing" the text again. With PromptNinja, you run the show.
            </p>
            <a
                href="/?lang=en#app"
                className="inline-block bg-white text-slate-900 font-bold py-3 px-8 mx-auto rounded-full transition hover:bg-slate-200"
            >
                Create Presentation Now
            </a>
        </div>

        <SEOContentFAQ
            title="Slides & Presentation FAQs"
            items={[
                {
                    question: "Does PromptNinja change PowerPoint slides automatically?",
                    answer: "No. PromptNinja controls YOUR SCRIPT. You keep using your clicker or mouse to change slides in PowerPoint, but the [STOP] command ensures you never lose your place in the text."
                },
                {
                    question: "Which clickers are supported?",
                    answer: "Virtually all (Logitech R400, R800, generic ones). If the clicker works by simulating keyboard arrows or PageUp/PageDown, it works natively in PromptNinja."
                },
                {
                    question: "Does it work on Zoom or Teams?",
                    answer: "Perfectly. In online presentations, the standard technique is to share only the presentation window and keep the teleprompter floating on top for reading."
                }
            ]}
        />
    </>
);
