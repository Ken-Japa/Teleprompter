import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";

export const TeleprompterShortcutsEN = () => (
    <>
        <h1 className="text-4xl font-bold text-white mb-6">Teleprompter with Keyboard Shortcuts: The Professional Workflow</h1>

        <p className="mb-6">
            Did you know that every time you take your hand off the keyboard to use the mouse, you break your creative flow? For video professionals recording solo, agility is not a luxury, it's a necessity. <strong>PromptNinja</strong> is the only <a href="/en/teleprompter-pc-windows" className="text-blue-400 hover:text-blue-300 underline">teleprompter for PC & Windows</a> designed with a "Keyboard First" philosophy.
        </p>

        <p className="mb-6">
            Our interface has been built ensuring you can control absolutely everything without touching the mouse. This is essential for those recording away from the computer or using Bluetooth pedals mapped as keys.
        </p>

        <div className="bg-slate-800 p-6 rounded-lg my-8 border-l-4 border-blue-500">
            <h2 className="text-2xl font-bold text-white mb-4">Default Hotkeys List</h2>
            <div className="grid md:grid-cols-2 gap-4 text-slate-300">
                <div>
                    <h3 className="font-bold text-white border-b border-slate-600 pb-2 mb-2">Playback Control</h3>
                    <ul className="space-y-2">
                        <li><kbd className="bg-slate-700 px-2 py-1 rounded">Space</kbd> or <kbd className="bg-slate-700 px-2 py-1 rounded">Enter</kbd> : Start / Pause</li>
                        <li><kbd className="bg-slate-700 px-2 py-1 rounded">ESC</kbd> : Exit Full Screen / Back</li>
                        <li><kbd className="bg-slate-700 px-2 py-1 rounded">R</kbd> : Reset Text to Top</li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold text-white border-b border-slate-600 pb-2 mb-2">Visual Adjustments</h3>
                    <ul className="space-y-2">
                        <li><kbd className="bg-slate-700 px-2 py-1 rounded">↑</kbd> / <kbd className="bg-slate-700 px-2 py-1 rounded">↓</kbd> : Increase / Decrease Speed</li>
                        <li><kbd className="bg-slate-700 px-2 py-1 rounded">+</kbd> / <kbd className="bg-slate-700 px-2 py-1 rounded">-</kbd> : Increase / Decrease Font Size</li>
                        <li><kbd className="bg-slate-700 px-2 py-1 rounded">M</kbd> : Mirror Text</li>
                    </ul>
                </div>
                <div className="md:col-span-2">
                    <h3 className="font-bold text-white border-b border-slate-600 pb-2 mb-2">Special Modes</h3>
                    <ul className="space-y-2">
                        <li><kbd className="bg-slate-700 px-2 py-1 rounded">H</kbd> : Hide UI (HUD) - <em>Gamer/Minimalist Mode</em></li>
                        <li><kbd className="bg-slate-700 px-2 py-1 rounded">F</kbd> : Focus Mode (Dims sides)</li>
                        <li><kbd className="bg-slate-700 px-2 py-1 rounded">V</kbd> : Vertical Flip</li>
                    </ul>
                </div>
            </div>
        </div>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Compatible with Presenters and Pedals (Elgato Stream Deck)</h2>
        <p className="mb-4">
            Since we use standard keyboard shortcuts, PromptNinja is natively compatible with any device that emulates a keyboard.
        </p>
        <ul className="list-disc pl-6 mb-6 text-slate-300 space-y-2">
            <li><strong>Elgato Stream Deck:</strong> Configure buttons for "Space", "R", or "M".</li>
            <li><strong>USB Pedals:</strong> Use your feet to play/pause while your hands gesture freely.</li>
            <li><strong>Presentation Clickers:</strong> Most slide clickers use arrow keys, working perfectly to control teleprompter speed.</li>
        </ul>

        <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-6 rounded-lg my-8 border border-yellow-600">
            <h2 className="text-2xl font-bold text-yellow-500 mb-2 flex items-center">
                <span className="bg-yellow-500 text-black text-xs px-2 py-1 rounded mr-3">PRO</span>
                Custom Keyboard Configuration
            </h2>
            <p className="text-slate-300 mb-4">
                Need different shortcuts? With <strong>PromptNinja PRO</strong>, you have the total freedom to remap all keys.
            </p>
            <p className="text-slate-300 text-sm">
                This is vital if you use non-standard keyboard layouts (Dvorak, AZERTY) or if your external devices send specific commands that cannot be changed. Adapt the software to your hardware, not the other way around.
            </p>
        </div>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Tip for Gamers and Streamers: The "H" Hotkey</h2>
        <p className="mb-6">
            Recording gameplay or reacting to a video and don't want teleprompter buttons appearing in your OBS capture? Simply press <kbd className="bg-slate-700 px-2 py-1 rounded text-white">H</kbd>.
        </p>
        <p className="mb-6">
            This activates "No UI" mode, leaving only the text visible with a transparent background (if configured). It's the cleanest solution for live stream overlays.
        </p>

        <div className="text-center bg-slate-800 p-8 rounded-lg my-10">
            <h2 className="text-3xl font-bold text-white mb-4">Speed Up Your Production</h2>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                Try recording using only the keyboard. You'll notice you have more energy for what matters: your performance.
            </p>
            <a
                href="https://promptninja.solutionkit.com.br/?lang=en/#app"
                className="inline-block bg-white text-slate-900 font-bold py-3 px-8 mx-auto rounded-full transition hover:bg-slate-200"
            >
                Try Shortcuts Now
            </a>
        </div>

        <SEOContentFAQ
            title="Shortcuts & Control FAQs"
            items={[
                {
                    question: "Can I customize the hotkeys?",
                    answer: "Yes, in the PromptNinja PRO version you can fully remap all functions (start, stop, speed, mirror) to any key you prefer."
                },
                {
                    question: "Does it work with foot pedals and clickers?",
                    answer: "Yes! Most of these devices simulate keyboard strokes (like Space or Arrow keys). PromptNinja recognizes these signals natively, without needing extra drivers."
                },
                {
                    question: "What does the 'H' key do?",
                    answer: "The 'H' key hides the User Interface (HUD). It's perfect for screen recording (gameplay, tutorials) when you want only the text to appear, with no distracting buttons or menus."
                }
            ]}
        />
    </>
);
