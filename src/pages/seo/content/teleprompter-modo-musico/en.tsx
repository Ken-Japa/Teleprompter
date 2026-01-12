import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";

export const TeleprompterModoMusicoEN = () => (
    <>
        <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
            Teleprompter for Musicians: Never Forget Lyrics on Stage Again
        </h2>

        <p className="mb-6 text-xl text-slate-300">
            Every singer's nightmare: you are mid-show, band is playing, crowd is watching... and you blank out. You forget the first verse of next stanza.
        </p>

        <p className="mb-8 text-slate-300">
            Big artists (from Bono to stars like Adele) use teleprompters on stage. It's not shameful, it's <strong>professional safety</strong>. PromptNinja has a secret "Musician Mode" you must know.
        </p>

        <div className="bg-slate-800 p-8 rounded-xl border border-purple-500/30 mb-12">
            <h3 className="text-2xl font-bold text-white mb-4">Different from a Speech</h3>
            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-lg font-bold text-slate-200 mb-2">🎤 The Binder Problem</h3>
                    <p className="text-sm text-slate-400">
                        Binders with paper sheets fly with wind, need external light to be read in dark stages, and require you to stop playing to turn the page.
                    </p>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-purple-400 mb-2">🎸 The Digital Solution</h3>
                    <p className="text-sm text-slate-300">
                        Backlit screen (visible in dark), auto-scroll (hands-free), and giant fonts (readable from floor).
                    </p>
                </div>
            </div>
        </div>

        <h3 className="text-3xl font-bold text-white mt-12 mb-6">Setting up "Stage Ninja"</h3>

        <div className="space-y-6 mb-12">
            <div className="flex gap-4">
                <div className="text-3xl">🦶</div>
                <div>
                    <h3 className="text-xl font-bold text-white">1. The Pedal Page Turner</h3>
                    <p className="text-slate-300">
                        PromptNinja accepts keyboard shortcuts. If you buy a Bluetooth pedal (like PageFlip or iRig), configure it to simulate "Space" key.
                        <br /> We've configured some default factory shortcuts:
                        <ul className=" text-slate-400">
                            <li>Page Down: Play/Pause</li>
                            <li>Page Up: Stop/Reset</li>
                            <li>End: Next session (use in the text [PART 1] [PART 2] etc)</li>
                            <li>Home: Previous session </li>
                        </ul>
                        <br /><strong>Result:</strong> You stomp, lyrics scroll. Your hands stay on guitar/keys.
                    </p>
                </div>
            </div>

            <div className="flex gap-4">
                <div className="text-3xl">📱</div>
                <div>
                    <h3 className="text-xl font-bold text-white">2. Tablet on Mic Stand</h3>
                    <p className="text-slate-300">
                        Use a tablet mount that clamps to mic stand. Put PromptNinja in fullscreen. Set background to pure black and text to white to avoid illuminating your face from below ("ghost effect").
                    </p>
                </div>
            </div>

            <div className="flex gap-4">
                <div className="text-3xl">🎼</div>
                <div>
                    <h3 className="text-xl font-bold text-white">3. Chord Formatting</h3>
                    <p className="text-slate-300">
                        PromptNinja respects line breaks. You can paste lyrics with chords on top.
                        <br /><span className="font-mono text-yellow-400 text-sm">G                D                Em<br />Almost heaven, West Virginia...</span>
                    </p>
                </div>
            </div>
        </div>

        <SEOContentFAQ
            title="Band FAQ"
            items={[
                {
                    question: "Works offline on stage?",
                    answer: "Yes! Install PromptNinja PWA (App). Once loaded, no Wi-Fi needed. Stage internet can crash, your lyrics stay there."
                },
                {
                    question: "How to sync with band?",
                    answer: "You can set exact scroll speed (Visual BPM). Or better yet, leave control to drummer via pedal, since they keep the tempo."
                },
                {
                    question: "What if song has a long solo?",
                    answer: "Insert several empty line breaks in text between stanzas. This way, text 'walks' on empty space during solo and next stanza arrives right on time."
                }
            ]}
        />
    </>
);
