import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { SEOContentHowTo } from "../../../../components/seo/SEOContentHowTo";

export const TeleprompterShortcutsEN = () => (
    <>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Teleprompter Keyboard Shortcuts: Master Your Productivity
        </h2>

        <p className="lead text-xl text-slate-300 mb-8 font-medium">
            Speed and total control at your fingertips. <strong>Learn to control PromptNinja via keyboard</strong>, Stream Deck, or pedals for a professional and seamless recording experience.
        </p>

        <p className="text-slate-300 mb-8 leading-relaxed">
            In this essential guide for creators focused on efficiency, we detail PromptNinja's 'Keyboard First' philosophy. Discover how keyboard shortcuts can transform your workflow, allowing you to adjust scroll speed, font size, and play/pause control without ever having to take your hands off the recording position or use the mouse. We explain how to integrate our tool with external hardware like Elgato Stream Deck and USB pedals, ensuring you have a complete command center for your productions, talks, or musical performances. Save time and gain professionalism with simplified commands and smart shortcuts.
        </p>

        <p className="mb-8">
            PromptNinja is the only online teleprompter designed with a "Keyboard First" philosophy. This means you can control 100% of your recording without ever lifting your hands from the keyboard (or your pedal/clicker).
        </p>

        <div className="bg-slate-800 p-8 rounded-xl border border-blue-500/30 mb-12 shadow-2xl">
            <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                ⌨️ Master Command Table
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-xl font-bold text-blue-400 mb-4 border-b border-blue-500/20 pb-2">Flow Control</h3>
                    <ul className="space-y-3">
                        <li className="flex justify-between items-center text-slate-300">
                            <span>Start / Pause Scroll</span>
                            <kbd className="bg-slate-700 text-white px-3 py-1 rounded font-mono border border-slate-600">SPACE</kbd>
                        </li>
                        <li className="flex justify-between items-center text-slate-300">
                            <span>Reset Text (Top)</span>
                            <kbd className="bg-slate-700 text-white px-3 py-1 rounded font-mono border border-slate-600">R</kbd>
                        </li>
                        <li className="flex justify-between items-center text-slate-300">
                            <span>Exit / Back</span>
                            <kbd className="bg-slate-700 text-white px-3 py-1 rounded font-mono border border-slate-600">ESC</kbd>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-xl font-bold text-purple-400 mb-4 border-b border-purple-500/20 pb-2">Dynamic Adjustments</h3>
                    <ul className="space-y-3">
                        <li className="flex justify-between items-center text-slate-300">
                            <span>Speed (+ / -)</span>
                            <div className="flex gap-2">
                                <kbd className="bg-slate-700 text-white px-2 py-1 rounded font-mono border border-slate-600">↑</kbd>
                                <kbd className="bg-slate-700 text-white px-2 py-1 rounded font-mono border border-slate-600">↓</kbd>
                            </div>
                        </li>
                        <li className="flex justify-between items-center text-slate-300">
                            <span>Font Size (+ / -)</span>
                            <div className="flex gap-2">
                                <kbd className="bg-slate-700 text-white px-2 py-1 rounded font-mono border border-slate-600">+</kbd>
                                <kbd className="bg-slate-700 text-white px-2 py-1 rounded font-mono border border-slate-600">-</kbd>
                            </div>
                        </li>
                        <li className="flex justify-between items-center text-slate-300">
                            <span>Mirror Mode</span>
                            <kbd className="bg-slate-700 text-white px-3 py-1 rounded font-mono border border-slate-600">M</kbd>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="mt-8 bg-black/30 p-4 rounded-lg border border-yellow-500/20">
                <h3 className="text-lg font-bold text-yellow-500 mb-2">🎮 Gamer / Streamer Mode (Exclusive)</h3>
                <div className="flex justify-between items-center text-slate-300">
                    <p className="text-sm">Hides the entire UI (buttons, menus), leaving only floating text. Perfect for recording gameplay or software tutorials.</p>
                    <kbd className="bg-yellow-600/20 text-yellow-400 px-4 py-2 rounded font-mono border border-yellow-500/50 text-xl font-bold ml-4">H</kbd>
                </div>
            </div>
        </div>

        <h3 className="text-3xl font-bold text-white mt-12 mb-6">Integration with External Hardware</h3>
        <p className="mb-6 text-slate-300">
            The beauty of using standard keyboard shortcuts is that any device emulating a keyboard works natively with PromptNinja.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-slate-800 p-6 rounded-lg border-t-4 border-blue-500">
                <h3 className="font-bold text-white mb-2">Elgato Stream Deck</h3>
                <p className="text-sm text-slate-400 mb-3">Streamers' favorite tool.</p>
                <p className="text-slate-300 text-sm">
                    Just drag a "Hotkey" action in Elgato software and assign <strong>SPACE</strong> key to a physical button. Add another for <strong>R</strong> (Reset) and you have a command center on your desk.
                </p>
            </div>
            <div className="bg-slate-800 p-6 rounded-lg border-t-4 border-green-500">
                <h3 className="font-bold text-white mb-2">USB Pedals</h3>
                <p className="text-sm text-slate-400 mb-3">For musicians and "busy hands".</p>
                <p className="text-slate-300 text-sm">
                    If you do unboxing or play guitar, your hands are full. Use a USB pedal configured as "Space" to start/pause text with your feet.
                </p>
            </div>
            <div className="bg-slate-800 p-6 rounded-lg border-t-4 border-purple-500">
                <h3 className="font-bold text-white mb-2">Presenters (Clickers)</h3>
                <p className="text-sm text-slate-400 mb-3">Logitech R400, R800, etc.</p>
                <p className="text-slate-300 text-sm">
                    Most slide clickers send "Right/Left Arrow" or "Page Up/Down" commands. PromptNinja intelligently interprets this for scroll control.
                </p>
            </div>
        </div>

        <h3 className="text-3xl font-bold text-white mt-12 mb-6">Ninja Workflow: Edit & Record in Seconds</h3>
        <SEOContentHowTo
            title=""
            schemaTitle="How to Optimize Recording with Shortcuts"
            totalTime="PT5M"
            tools={["PC/Mac", "Keyboard", "PromptNinja"]}
            steps={[
                {
                    title: "Prepare Text",
                    text: "Paste your script. Use ENTER to break long sentences into visual blocks."
                },
                {
                    title: "Visual Adjustment (No Mouse)",
                    text: "Use '+' and '-' to make font giant (comfortable reading). Use 'M' if using glass."
                },
                {
                    title: "The Trick: The Error Loop",
                    text: "Messed up a line? Don't curse. Hit SPACE (Pause). Breathe. Hit Up Arrow (Go back a bit). Hit SPACE (Play). Keep recording. In editing, you'll see the pause visually in audio waveform and cut easily."
                }
            ]}
        />

        <div className="text-center bg-slate-800 p-8 rounded-lg my-10 border border-slate-700">
            <h3 className="text-3xl font-bold text-white mb-4">PromptNinja PRO: Total Mapping</h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                Use Dvorak keyboard? Have a specific remote sending "F5"?
                In PRO version, you can <strong>force</strong> which key does what. Total freedom.
            </p>
            <a
                href="/?lang=en#app"
                className="inline-block bg-white text-slate-900 font-bold py-3 px-8 rounded-full transition hover:bg-slate-200"
            >
                Configure Shortcuts Now
            </a>
        </div>

        <SEOContentFAQ
            title="Technical Keyboard FAQ"
            items={[
                {
                    question: "Do shortcuts work if I'm in another window (e.g. OBS)?",
                    answer: "Not natively (browser security limitation). PromptNinja must be 'in focus' (active window). Tip: Use a second monitor for PromptNinja and click it before starting."
                },
                {
                    question: "Works with iPad Bluetooth keyboards?",
                    answer: "Yes! iPadOS recognizes external keyboards perfectly and PromptNinja responds to same shortcuts (Space, Arrows) in mobile Safari/Chrome."
                },
                {
                    question: "Can I use a game controller (Xbox/PS5)?",
                    answer: "Directly no, but if you use software like 'JoyToKey' (Windows) or 'Mapper' (Mac) to map joystick buttons to keys (A = Space), it works perfectly!"
                },
                {
                    question: "Does 'H' key (Hide) hide text too?",
                    answer: "No, it hides only the UI (User Interface) - buttons, menus, logo. Text remains there, floating. If background is transparent, looks like magic over your video."
                }
            ]}
        />
    </>
);
