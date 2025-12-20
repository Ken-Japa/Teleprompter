
import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { SEOContentHowTo } from "../../../../components/seo/SEOContentHowTo";

export const TeleprompterCapCutEN = () => (
    <>
        <h1 className="text-4xl font-bold text-white mb-6">How to Use Teleprompter for CapCut: Professional Video Tutorial</h1>

        <p className="lead text-xl text-slate-300 mb-8">
            CapCut is creators' favorite editing tool, but its built-in teleprompter can be limiting. PromptNinja is the perfect companion for CapCut: record your video with our professional prompter and edit in CapCut to add captions, effects, and viral music.
        </p>

        <div className="bg-slate-800 p-6 rounded-lg my-8 border-l-4 border-cyan-500">
            <h2 className="text-2xl font-bold text-white mb-2">Why Not Use CapCut's Built-in Teleprompter?</h2>
            <p className="text-slate-300">
                While useful, CapCut's prompter lacks professional features.
                <br /><br />
                With PromptNinja, you get <strong>P2P Remote Control</strong> (use another phone to control speed while recording), <strong>Voice Control</strong> (text moves as you speak), and advanced text formatting. Record the raw video perfectly in PromptNinja, then bring it to CapCut just for final polish.
            </p>
        </div>

        <SEOContentHowTo
            title="Winning Workflow: PromptNinja + CapCut"
            schemaTitle="How to Use Teleprompter with CapCut"
            totalTime="PT10M"
            tools={["CapCut", "PromptNinja", "Smartphone"]}
            steps={[
                {
                    title: "Step 1: Prep",
                    text: "Write your script in PromptNinja. Use colors to mark where you'll make cuts or apply visual effects in CapCut."
                },
                {
                    title: "Step 2: Recording",
                    text: "Open PromptNinja on mobile, position vertically, and record. Use a second device to control scrolling remotely."
                },
                {
                    title: "Step 3: Editing in CapCut",
                    text: "Import the recorded video. Since you didn't fluff your lines (thanks to the prompter), your timeline will be clean."
                },
                {
                    title: "Step 4: Dynamic Captions",
                    text: "Use CapCut's \"Auto Captions\". Since your diction was guided by the script, captions will be generated with high accuracy."
                }
            ]}
        />

        <div className="text-center mt-12">
            <a
                href="https://promptninja.solutionkit.com.br/?lang=en/#app"
                className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 font-bold py-3 px-6 rounded-lg transition hover:brightness-110"
                style={{ color: 'white' }}
            >
                Try the PromptNinja + CapCut Combo
            </a>
        </div>

        <SEOContentFAQ
            title="Questions: CapCut & PromptNinja"
            items={[
                {
                    question: "Does PromptNinja export directly to CapCut?",
                    answer: "Not directly. You record the video in PromptNinja, it saves to your phone's gallery, and then you open CapCut and import the video from the gallery. Simple."
                },
                {
                    question: "Can I use CapCut effects?",
                    answer: "Yes! The idea is to record the 'clean' video (no text on screen) using PromptNinja for reading, and then add all the magic (effects, captions, music) in CapCut."
                },
                {
                    question: "Is the video quality good?",
                    answer: "Yes. PromptNinja uses your device's native camera at the maximum resolution allowed by the browser (usually Full HD or 4K, depending on the phone)."
                }
            ]}
        />
    </>
);
