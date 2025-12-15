import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";

export const TeleprompterGoogleMeetTeamsEN = () => (
    <>
        <h1 className="text-4xl font-bold text-white mb-6">Teleprompter for Google Meet and Microsoft Teams: Executive Meetings</h1>

        <p className="lead text-xl text-slate-300 mb-8">
            In board meetings, B2B sales calls, or HR presentations, speech precision is key. PromptNinja transforms your Google Meet or Microsoft Teams into a professional stage, allowing you to read your key points while maintaining constant eye contact with stakeholders.
        </p>

        <div className="bg-slate-800 p-6 rounded-lg my-8 border-l-4 border-indigo-500">
            <h2 className="text-2xl font-bold text-white mb-2">Invisible Tech for Enterprise</h2>
            <p className="text-slate-300">
                PromptNinja runs 100% in the browser, <strong>requiring no installation (admin rights)</strong> on company computers.
                <br /><br />
                Security is priority: all scripts are saved locally on your device. Nothing is sent to the cloud, ensuring full compliance with sensitive data policies.
            </p>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">How to Deliver Flawless Executive Presentations</h2>
        <div className="bg-slate-800 p-6 rounded-lg my-6">
            <ol className="list-decimal pl-6 space-y-6 text-slate-300">
                <li>
                    <strong>Transparent Overlay (Tip):</strong> Resize the PromptNinja browser window to be very narrow and position it at the top of the screen, centered just below the webcam.
                </li>
                <li>
                    <strong>Google Meet/Teams:</strong> Open your meeting app. Position PromptNinja "floating" above or side-by-side strategically.
                </li>
                <li>
                    <strong>Discreet Control:</strong> Connect your corporate phone as a remote. Keep hands on the desk and control scrolling with subtle taps, no audible mouse clicks.
                </li>
            </ol>
        </div>

        <div className="text-center mt-12">
            <a
                href="https://promptninja.solutionkit.com.br/?lang=en/#app"
                className="inline-block bg-gradient-to-r from-indigo-600 to-blue-800 font-bold py-3 px-6 rounded-lg transition hover:brightness-110"
                style={{ color: 'white' }}
            >
                Master Your Online Meetings Now
            </a>
        </div>

        <SEOContentFAQ
            title="Online Meeting FAQs"
            items={[
                {
                    question: "Does the teleprompter show up for other participants?",
                    answer: "No. PromptNinja is an independent window in your browser. If you share only a specific Chrome tab (with your presentation) or just speak to the camera, no one will see the scrolling text."
                },
                {
                    question: "Does it work if I only have one monitor?",
                    answer: "Yes. We recommend using 'Window' mode and making it narrow, positioned just below the webcam, partially overlaying Teams/Meet. Adjust transparency if needed."
                },
                {
                    question: "Is it safe for confidential information?",
                    answer: "Totally. PromptNinja operates locally in your browser. The text you paste into it is not sent to cloud servers, ensuring your company's data privacy."
                }
            ]}
        />
    </>
);
