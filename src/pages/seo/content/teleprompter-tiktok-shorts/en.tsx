import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { SEOContentHowTo } from "../../../../components/seo/SEOContentHowTo";

export const TeleprompterTikTokShortsEN = () => (
    <>
        <h1 className="text-4xl font-bold text-white mb-6">Teleprompter for TikTok, Reels, and Shorts: Record Perfect Vertical Videos</h1>

        <p className="lead text-xl text-slate-300 mb-8">
            The short-video revolution demands speed and precision. On TikTok, Reels, or YouTube Shorts, you have seconds to capture attention. PromptNinja is the ideal teleprompter for vertical content creators, allowing you to record with confidence, maintain eye contact, and produce viral videos in record time.
        </p>

        <div className="bg-slate-800 p-6 rounded-lg my-8 border-l-4 border-pink-500">
            <h2 className="text-2xl font-bold text-white mb-2">Why PromptNinja is Perfect for Vertical Video?</h2>
            <p className="text-slate-300">
                We designed a mode specifically for vertical screens. When accessing PromptNinja via mobile, the interface adapts perfectly.
                <br /><br />
                Plus, with our exclusive <strong>P2P (Peer-to-Peer)</strong> control, you can position your phone on a tripod and control the text (start/stop/speed) using another device (like a laptop or another phone) in your hand, without touching the recording screen.
            </p>
        </div>


        <SEOContentHowTo
            title="How to Record Professional TikToks with a Teleprompter"
            schemaTitle="How to Record Vertical Videos with Teleprompter"
            totalTime="PT5M"
            tools={["Smartphone", "PromptNinja", "Tripod"]}
            steps={[
                {
                    title: "Step 1: Optimized Scripts",
                    text: "Write short, punchy scripts. Use our editor to highlight keywords in colors (red for emphasis, yellow for pauses)."
                },
                {
                    title: "Step 2: Vertical Positioning",
                    text: "Place the text at the top of your phone screen, right next to the front camera. This ensures your eyes look directly at the viewer, creating instant connection."
                },
                {
                    title: "Step 3: Discreet Control",
                    text: "Use PromptNinja on a second device to control scrolling. No need to reach out to pause recording or restart text, saving hours of editing."
                }
            ]}
        />

        <div className="text-center mt-12">
            <a
                href="https://promptninja.solutionkit.com.br/?lang=en/#app"
                className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 font-bold py-3 px-6 rounded-lg transition hover:brightness-110"
                style={{ color: 'white' }}
            >
                Create Viral Videos Now - It's Free!
            </a>
        </div>

        <SEOContentFAQ
            title="Vertical Video Creator FAQs"
            items={[
                {
                    question: "How do I stop looking like I'm reading?",
                    answer: "Positioning is key. On mobile, keep the text at the very top of the screen, right next to the front camera. Use a smaller font and stand a bit further back if possible."
                },
                {
                    question: "Is there a PromptNinja app to download?",
                    answer: "PromptNinja is a Web App. This means you don't need to download anything from the store. Just access it via Chrome or Safari and it adapts perfectly to your mobile screen."
                },
                {
                    question: "How do I record solo from a distance?",
                    answer: "Use our Remote Control feature. Open PromptNinja on the recording phone and use another phone or laptop in your hand to hit play and control speed without moving."
                }
            ]}
        />
    </>
);
