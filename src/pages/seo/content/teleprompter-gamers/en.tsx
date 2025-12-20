import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { SEOContentHowTo } from "../../../../components/seo/SEOContentHowTo";

export const TeleprompterGamersEN = () => (
    <>
        <h1 className="text-4xl font-bold text-white mb-6">Minimalist Teleprompter for Gamers & Streamers</h1>

        <p className="mb-6">
            During a gameplay stream, every pixel of your screen is valuable. You need to read chat, check speedrun notes, or follow a lore script without cluttering your vision with complex interfaces. <strong>PromptNinja</strong> offers the cleanest mode on the market, designed specifically for those who game and stream simultaneously.
        </p>

        <p className="mb-6">
            Whether you use OBS, Twitch Studio, or Streamlabs, our teleprompter adapts to your setup, not the other way around.
        </p>

        <div className="bg-slate-800 p-6 rounded-lg my-8 border-l-4 border-green-500">
            <h2 className="text-2xl font-bold text-white mb-2">"No HUD" Mode (Invisible Interface)</h2>
            <p className="text-slate-300 mb-4">
                Press the <kbd className="bg-slate-700 px-2 py-1 rounded text-white mx-1">H</kbd> key and watch the magic happen. All buttons, progress bars, and menus disappear instantly.
            </p>
            <SEOContentHowTo
                title=""
                schemaTitle="How to Enable Gamer Mode (No HUD)"
                totalTime="PT1M"
                tools={["PromptNinja", "Keyboard"]}
                steps={[
                    {
                        title: "Step 1: Open App",
                        text: "Access PromptNinja and paste your text as usual."
                    },
                    {
                        title: "Step 2: Press 'H'",
                        text: "Press the H key on your keyboard. This activates 'Hide HUD' mode."
                    },
                    {
                        title: "Step 3: Transparent Mode",
                        text: "The entire interface vanishes, leaving only floating text. Press H again to bring back controls."
                    }
                ]}
            />
            <p className="text-slate-300 mt-2">
                This is perfect for:
            </p>
            <ul className="list-disc pl-6 mt-4 text-slate-300 space-y-2">
                <li><strong>Speedrunners:</strong> Keep your notes and splits visible without distractions.</li>
                <li><strong>React Streamers:</strong> Read articles or news on screen without your audience seeing player controls.</li>
                <li><strong>VTubers:</strong> Keep the script close to the camera (or model) to maintain eye contact.</li>
            </ul>
        </div>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Chroma Key & Transparent Backgrounds</h2>
        <p className="mb-4">
            Need to integrate text directly into your OBS scene? PromptNinja has native <a href="/en/teleprompter-obs-studio" className="text-blue-400 hover:text-blue-300 underline">Chroma Key themes (Green and Blue)</a>.
        </p>
        <p className="mb-6">
            Simply select the "Chroma Green" theme, capture the window in OBS, and apply the "Chroma Key" filter. The background disappears, and your text remains with a transparent background, looking like professional closed captions integrated into your stream.
        </p>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Total Control Without Alt-Tab</h2>
        <p className="mb-4">
            Nothing breaks immersion more than having to Alt-Tab to pause your script. With our <a href="/en/teleprompter-keyboard-shortcuts" className="text-blue-400 hover:text-blue-300 underline">global keyboard shortcuts</a> and mobile control, you command the text without leaving the game.
        </p>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-2">Phone as "Stream Deck"</h3>
                <p className="text-sm text-slate-300">Connect your mobile via QR Code and use it as a dedicated remote. Keep it next to your keyboard for quick speed adjustments or to reset text between matches.</p>
            </div>
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-2">Text Commands</h3>
                <p className="text-sm text-slate-300">Use commands like <strong>[STOP]</strong> at the end of each paragraph so the text pauses itself, waiting for you to trigger the next part of the story. Ideal for RPG games or narratives.</p>
            </div>
        </div>

        <div className="text-center bg-slate-800 p-8 rounded-lg my-10">
            <h2 className="text-3xl font-bold text-white mb-4">Level Up Your Stream</h2>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                Professionalize your broadcast with the teleprompter built for those who understand minimalist setups and high performance.
            </p>
            <a
                href="https://promptninja.solutionkit.com.br/?lang=en/#app"
                className="inline-block bg-white text-slate-900 font-bold py-3 px-8 mx-auto rounded-full transition hover:bg-slate-200"
            >
                Open Gamer Mode
            </a>
        </div>

        <SEOContentFAQ
            title="Streamer FAQs"
            items={[
                {
                    question: "Does it work with OBS and Streamlabs?",
                    answer: "Yes! You have two options: use 'Window Capture' to show the text on stream (using our transparent/chroma key themes) or just keep the window open on your secondary monitor for personal use, invisible to the stream."
                },
                {
                    question: "Can I control the text without leaving the game?",
                    answer: "Absolutely. With the P2P remote control feature, you use your phone to pause, rewind, or speed up the text. That way, you don't need to Alt-Tab and risk freezing your game."
                },
                {
                    question: "Does it use a lot of CPU/GPU?",
                    answer: "No. PromptNinja is extremely lightweight and runs in the browser. It doesn't compete for significant resources with your game or streaming encoding software."
                }
            ]}
        />
    </>
);
