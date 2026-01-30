import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { SEOImage } from "../../../../components/seo/SEOImage";
import { SEORelatedLinks } from "../../../../components/seo/SEORelatedLinks";

export const TeleprompterModoMusicoEN = () => (
    <>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Teleprompter for Musicians: Lyrics and Chords at Your Fingertips
        </h2>

        <p className="lead text-xl text-slate-300 mb-8 font-medium">
            Take your performance to the next level without the fear of forgetting lyrics or getting lost in chords. <strong>PromptNinja's Musician Mode</strong> is the ultimate solution for artists and live streams.
        </p>

        <p className="text-slate-300 mb-8 leading-relaxed">
            In this specialized guide for artists, we explore how PromptNinja transforms your smartphone or tablet into the ultimate digital roadie. Discover how to set up a teleprompter that follows your rhythm, allowing you to stay focused on emotional delivery and connection with your audience, whether on a live stage or in broadcasts. With support for chords and Bluetooth pedal control, our free online tool ensures every chorus and every bridge is executed perfectly, eliminating "blank" anxiety and professionalizing your musical setup in seconds.
        </p>

        <SEOImage
            slug="teleprompter-modo-musico"
            src="teleprompter-music-mode-lyrics-chords.webp"
            alt="Teleprompter displaying lyrics and chords for musicians"
            caption="Musician Mode allows you to see lyrics and chords synchronized with your performance."
            width={1200}
            height={675}
            priority={true}
        />

        <div className="bg-slate-900/50 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-xl mb-12">
            <h3 className="text-2xl font-bold text-white mb-6">Why is PromptNinja the Musician's Best Friend?</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <li className="flex items-start gap-3 bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                    <span className="text-yellow-400 text-xl">⏱️</span>
                    <div className="text-sm">
                        <strong className="text-white block mb-1">Fluid and Rhythmic Scrolling</strong>
                        <span className="text-slate-400">Adjust the speed to match the song's tempo, ensuring the text rises exactly at the right beat.</span>
                    </div>
                </li>
                <li className="flex items-start gap-3 bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                    <span className="text-yellow-400 text-xl">🎼</span>
                    <div className="text-sm">
                        <strong className="text-white block mb-1">Support for Lyrics and Chords</strong>
                        <span className="text-slate-400">Keep your harmonies visible right above the lyrics, without losing alignment even with large fonts.</span>
                    </div>
                </li>
                <li className="flex items-start gap-3 bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                    <span className="text-yellow-400 text-xl">🦶</span>
                    <div className="text-sm">
                        <strong className="text-white block mb-1">Hands-Free Control</strong>
                        <span className="text-slate-400">Compatible with Bluetooth pedals and remote controls, so you can change songs without taking your hands off the instrument.</span>
                    </div>
                </li>
                <li className="flex items-start gap-3 bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                    <span className="text-yellow-400 text-xl">🌑</span>
                    <div className="text-sm">
                        <strong className="text-white block mb-1">High Contrast for Stage</strong>
                        <span className="text-slate-400">Black background and vibrant text ensure perfect legibility even under intense stage lights.</span>
                    </div>
                </li>
            </ul>
        </div>

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

        <section id="cases-musica" className="p-8 bg-zinc-900 text-white rounded-2xl my-16 border border-zinc-700 shadow-2xl">
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 text-center mb-10">Who Shines on Stage with PromptNinja! (E-E-A-T)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-zinc-800 p-6 rounded-xl border-t-2 border-yellow-500">
                    <p className="text-zinc-300 italic">"My YouTube lives changed after Musician Mode. No more horrible paper binders appearing on camera. The setup with the iPad on the stand looks super professional."</p>
                    <span className="block mt-4 text-sm font-bold text-yellow-500">— Ricardo Lima, Bar and Live Singer</span>
                </div>
                <div className="bg-zinc-800 p-6 rounded-xl border-t-2 border-orange-500">
                    <p className="text-zinc-300 italic">"PromptNinja's Bluetooth pedal control is a life saver for those who play guitar and sing solo. I can scroll the lyrics without interrupting the beat."</p>
                    <span className="block mt-4 text-sm font-bold text-orange-500">— Amanda Rocha, Independent Artist</span>
                </div>
            </div>
        </section>

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

        <SEORelatedLinks
            title="Performance Resources"
            links={[
                { label: "Teleprompter for Tablet and iPad", href: "/en/teleprompter-app-for-tablet-ipad" },
                { label: "Improve Reading Speed Guide", href: "/en/teleprompter-reading-speed" },
                { label: "Teleprompter for Live Streaming", href: "/en/teleprompter-for-live-streaming" },
                { label: "Speech Pacing & Timer Online", href: "/en/teleprompter-pacing-timer-online" }
            ]}
        />
    </>
);
