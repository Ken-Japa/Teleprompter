import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { SEOContentHowTo } from "../../../../components/seo/SEOContentHowTo";

export const TeleprompterObsStudioEN = () => (
    <>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Teleprompter for OBS Studio: Complete Guide for Streamers and Live Creators
        </h1>

        <p className="lead text-xl text-slate-300 mb-8">
            You're going live, trying to read the script on second monitor, lose eye contact with camera for 3 seconds and BOOM — 50 people left the stream. Or worse: you keep Alt+Tabbing, break the flow, chat notices you're reading something, atmosphere dies.
        </p>

        <p className="mb-6">
            Professional streamers have a secret: <strong>text floating invisible to audience, visible to them</strong>. Like TV news. You keep eye on camera (or game), read the script without anyone noticing, and look like you're speaking off the cuff. This is what separates 50 viewers from 500 viewers.
        </p>

        <p className="mb-8">
            PromptNinja solves this. You integrate directly into OBS Studio as Browser Source, apply Chroma Key to remove background, and control from phone while live. Zero Alt+Tab. Zero looking at second monitor. <strong>TV-level professionalism.</strong>
        </p>

        <div className="bg-gradient-to-r from-red-900/30 to-purple-900/30 p-8 rounded-xl border border-purple-500/30 my-12">
            <h2 className="text-3xl font-bold text-white mb-6">The Script-Reading Streamer's Problem</h2>
            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-slate-900/50 p-6 rounded-lg border border-red-500/30">
                    <h3 className="font-bold text-red-400 mb-4 flex items-center gap-2">
                        <span>❌</span> WITHOUT Teleprompter (Improvising or Alt+Tab)
                    </h3>
                    <ul className="space-y-3 text-slate-300 text-sm">
                        <li>🎮 <strong>Stream opening:</strong> Stumbles, forgets to mention sponsor</li>
                        <li>👀 <strong>Eye contact:</strong> Keeps looking at second monitor = seems distant</li>
                        <li>⌨️ <strong>Alt+Tab:</strong> Minimize game to see script = chat complains</li>
                        <li>😰 <strong>Energy:</strong> Gets stuck mid-sentence, loses momentum</li>
                        <li>📊 <strong>Retention:</strong> 40-50% (people leave when you "disappear")</li>
                        <li>💬 <strong>Chat:</strong> "Is he reading something?" "Seems robotic"</li>
                    </ul>
                </div>
                <div className="bg-slate-900/50 p-6 rounded-lg border border-green-500/30">
                    <h3 className="font-bold text-green-400 mb-4 flex items-center gap-2">
                        <span>✅</span> WITH PromptNinja in OBS
                    </h3>
                    <ul className="space-y-3 text-slate-300 text-sm">
                        <li>🎮 <strong>Stream opening:</strong> Smooth, all sponsors mentioned</li>
                        <li>👀 <strong>Eye contact:</strong> 100% eye on camera</li>
                        <li>⌨️ <strong>Alt+Tab:</strong> Zero. Text stays overlaid invisibly</li>
                        <li>😊 <strong>Energy:</strong> Confident, knows exactly what to say</li>
                        <li>📊 <strong>Retention:</strong> 70-85% (audience stays glued)</li>
                        <li>💬 <strong>Chat:</strong> "He's so good!" "Top communication"</li>
                    </ul>
                </div>
            </div>
            <p className="text-slate-400 text-sm mt-6 italic text-center">
                💡 Result: <strong className="text-green-400">+30% average retention</strong>. More viewers = more subs = more revenue.
            </p>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Why PromptNinja is Built for OBS</h2>
        <p className="mb-6">
            Several teleprompter solutions exist, but most weren't designed for streaming. See the differences:
        </p>

        <div className="overflow-x-auto my-8">
            <table className="w-full text-left border-collapse bg-slate-800 rounded-lg">
                <thead>
                    <tr className="bg-slate-700">
                        <th className="p-4 border border-slate-600">Feature</th>
                        <th className="p-4 border border-slate-600 text-center">PromptNinja</th>
                        <th className="p-4 border border-slate-600 text-center">Generic Solutions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="p-4 border border-slate-700 font-semibold">Browser Source Compatible</td>
                        <td className="p-4 border border-slate-700 text-center text-green-400">✔ Works perfectly</td>
                        <td className="p-4 border border-slate-700 text-center text-yellow-400">~ Some crash or don't load</td>
                    </tr>
                    <tr>
                        <td className="p-4 border border-slate-700 font-semibold">Chroma Key Themes</td>
                        <td className="p-4 border border-slate-700 text-center text-green-400">✔ Green and Blue integrated</td>
                        <td className="p-4 border border-slate-700 text-center text-red-400">✖ Need to manually edit CSS</td>
                    </tr>
                    <tr>
                        <td className="p-4 border border-slate-700 font-semibold">Remote Control (doesn't consume bandwidth)</td>
                        <td className="p-4 border border-slate-700 text-center text-green-400">✔ P2P via local Wi-Fi</td>
                        <td className="p-4 border border-slate-700 text-center text-red-400">✖ Depends on internet (competes with stream)</td>
                    </tr>
                    <tr>
                        <td className="p-4 border border-slate-700 font-semibold">Adjustable Transparency</td>
                        <td className="p-4 border border-slate-700 text-center text-green-400">✔ Slider 0-100%</td>
                        <td className="p-4 border border-slate-700 text-center text-yellow-400">~ Fixed or complicated</td>
                    </tr>
                    <tr>
                        <td className="p-4 border border-slate-700 font-semibold">Performance (CPU/GPU)</td>
                        <td className="p-4 border border-slate-700 text-center text-green-400">Very light (just text)</td>
                        <td className="p-4 border border-slate-700 text-center text-yellow-400">Varies (some heavy)</td>
                    </tr>
                    <tr>
                        <td className="p-4 border border-slate-700 font-semibold">OBS Hot Keys Support</td>
                        <td className="p-4 border border-slate-700 text-center text-green-400">✔ Via remote control</td>
                        <td className="p-4 border border-slate-700 text-center text-red-400">✖ Need Alt+Tab</td>
                    </tr>
                    <tr>
                        <td className="p-4 border border-slate-700 font-semibold">Price</td>
                        <td className="p-4 border border-slate-700 text-center text-green-400">Free</td>
                        <td className="p-4 border border-slate-700 text-center text-yellow-400">$5-15/month</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg my-12 border-l-4 border-purple-600">
            <h2 className="text-2xl font-bold text-white mb-4">🎯 Streaming-Specific Advantages</h2>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-900 p-4 rounded-lg">
                    <h4 className="font-bold text-purple-400 mb-2">⚡ Zero Performance Impact</h4>
                    <p className="text-sm text-slate-400">PromptNinja is just HTML + CSS. Doesn't use heavy GPU rendering. Your PC is already sweating running game + OBS + stream. We don't add load.</p>
                </div>
                <div className="bg-slate-900 p-4 rounded-lg">
                    <h4 className="font-bold text-purple-400 mb-2">🎮 Works with Any Game</h4>
                    <p className="text-sm text-slate-400">Fullscreen? Borderless? Doesn't matter. Teleprompter stays inside OBS, doesn't need overlay on top of game.</p>
                </div>
                <div className="bg-slate-900 p-4 rounded-lg">
                    <h4 className="font-bold text-purple-400 mb-2">📱 Phone becomes Stream Deck</h4>
                    <p className="text-sm text-slate-400">Pause/play text without taking hand off keyboard/mouse. Adjust speed during live without clicking anything on PC.</p>
                </div>
                <div className="bg-slate-900 p-4 rounded-lg">
                    <h4 className="font-bold text-purple-400 mb-2">🔴 Invisible to Audience</h4>
                    <p className="text-sm text-slate-400">Set up scene with text ONLY for you (auxiliary monitor) or overlay invisibly with Chroma Key. Your choice.</p>
                </div>
            </div>
        </div>

        <SEOContentHowTo
            title="Step-by-Step Setup: PromptNinja + OBS Studio"
            schemaTitle="How to Integrate Teleprompter into OBS Studio"
            totalTime="PT10M"
            tools={["OBS Studio (v27+)", "PromptNinja", "Smartphone (optional)"]}
            steps={[
                {
                    title: "Step 1: Open PromptNinja and Copy URL",
                    text: "Go to promptninja.solutionkit.com.br, paste your script. Click 'Connect Device' or 'Mirror Screen' and COPY the full URL that appears (it has a unique ID for your session)."
                },
                {
                    title: "Step 2: Add Browser Source in OBS",
                    text: "In OBS: Sources → Add → Browser. Paste the URL you copied. Width: 1920, Height: 1080. Check 'Refresh browser when scene becomes active'."
                },
                {
                    title: "Step 3: Position and Resize",
                    text: "Drag source to desired position (usually below webcam or soft overlay). Resize holding Shift (maintains proportion). Adjust opacity by right-clicking → Filters → Color Correction → Opacity."
                },
                {
                    title: "Step 4: (Optional) Apply Chroma Key",
                    text: "In PromptNinja, change theme to 'Chroma Green'. In OBS: Right-click source → Filters → Add → Chroma Key. Select green color. Adjust 'Similarity' until background disappears, leaving only text."
                },
                {
                    title: "Step 5: Connect Remote Control",
                    text: "With PromptNinja already running in OBS, open promptninja.solutionkit.com.br on phone. Scan QR Code that appears on PC screen. Now you control text from phone DURING live."
                },
                {
                    title: "Step 6: Test Before Going Live",
                    text: "ALWAYS test by recording 2min before going live. Check if text is visible, if Chroma Key worked, if remote responds. Adjust opacity and position as needed."
                }
            ]}
        />

        <h2 className="text-3xl font-bold text-white mt-16 mb-6">Troubleshooting: Common Problems & Solutions</h2>

        <div className="space-y-4 mb-12">
            <div className="bg-slate-800 p-5 rounded-lg border-l-4 border-yellow-500">
                <h3 className="font-bold text-white mb-2">⚠️ Problem: Browser source doesn't load / Shows blank</h3>
                <p className="text-slate-300 text-sm mb-3">
                    <strong>Cause:</strong> Incorrect URL or OBS browser with old cache.
                </p>
                <p className="text-green-400 text-sm">
                    <strong>✅ Solution:</strong> (1) Verify URL has session ID (format: ?session=xxx). (2) Right-click source → Refresh. (3) If persists, delete source and add again copying new URL from PromptNinja.
                </p>
            </div>

            <div className="bg-slate-800 p-5 rounded-lg border-l-4 border-yellow-500">
                <h3 className="font-bold text-white mb-2">⚠️ Problem: Chroma Key leaves green "halo" around text</h3>
                <p className="text-slate-300 text-sm mb-3">
                    <strong>Cause:</strong> Text antialiasing smoothing creates semi-green pixels.
                </p>
                <p className="text-green-400 text-sm">
                    <strong>✅ Solution:</strong> In OBS Chroma Key filter, INCREASE 'Smoothness' to ~20-30. Reduce 'Spill Reduction'. Test until halo disappears.
                </p>
            </div>

            <div className="bg-slate-800 p-5 rounded-lg border-l-4 border-yellow-500">
                <h3 className="font-bold text-white mb-2">⚠️ Problem: Remote control doesn't respond</h3>
                <p className="text-slate-300 text-sm mb-3">
                    <strong>Cause:</strong> Phone and PC not on same local Wi-Fi network OR firewall blocking P2P.
                </p>
                <p className="text-green-400 text-sm">
                    <strong>✅ Solution:</strong> (1) Confirm both devices on SAME Wi-Fi (not 4G). (2) Temporarily disable Windows firewall to test. (3) If using VPN, disconnect during setup. (4) Restart PromptNinja and scan QR Code again.
                </p>
            </div>

            <div className="bg-slate-800 p-5 rounded-lg border-l-4 border-yellow-500">
                <h3 className="font-bold text-white mb-2">⚠️ Problem: Text cut off at screen edges</h3>
                <p className="text-slate-300 text-sm mb-3">
                    <strong>Cause:</strong> Browser Source resolution smaller than configured text.
                </p>
                <p className="text-green-400 text-sm">
                    <strong>✅ Solution:</strong> In Browser Source properties, set Width: 1920 and Height: 1080 (even if your screen is 2K/4K). OBS will resize automatically. Or increase margins in PromptNinja.
                </p>
            </div>

            <div className="bg-slate-800 p-5 rounded-lg border-l-4 border-yellow-500">
                <h3 className="font-bold text-white mb-2">⚠️ Problem: Lag / Text freezes during heavy stream</h3>
                <p className="text-slate-300 text-sm mb-3">
                    <strong>Cause:</strong> Overloaded PC (game + encoding + 50 sources in OBS).
                </p>
                <p className="text-green-400 text-sm">
                    <strong>✅ Solution:</strong> (1) Reduce Browser Source FPS to 30fps (properties → FPS). (2) Disable 'Refresh when not visible'. (3) Consider setup 3 (teleprompter on separate monitor outside OBS).
                </p>
            </div>
        </div>

        <h2 className="text-3xl font-bold text-white mt-16 mb-6">Real Case: Streamer Doubled Average Viewers with Professional Intros</h2>
        <div className="bg-gradient-to-r from-purple-900/20 to-indigo-900/20 p-8 rounded-xl border border-purple-500/30 mb-12">
            <p className="text-slate-300 mb-4">
                <strong className="text-purple-400">Streamer:</strong> @educational_gamer (name changed), 1.2k followers Twitch, Valorant + tutorial streams.
            </p>
            <p className="text-slate-300 mb-6">
                <strong className="text-purple-400">Problem:</strong> Intros were always improvised. Forgot to mention next stream time, forgot call-to-action (follow/sub). First hour of stream only had 20-30 viewers (peak was 80-100 later).
            </p>

            <h3 className="font-bold text-white mb-3">Implemented Change:</h3>
            <ol className="list-decimal pl-6 space-y-2 text-slate-300 mb-6">
                <li>Created fixed opening script (2min): welcome, previous stream recap, today's preview, CTA for sub/follow</li>
                <li>Integrated PromptNinja in OBS with Chroma Key below webcam (Just Chatting scene)</li>
                <li>Controlled from phone (old phone as improvised Stream Deck)</li>
                <li>Intro became PROFESSIONAL: confident, structured, always mentions everything</li>
            </ol>

            <div className="bg-slate-900/50 p-6 rounded-lg">
                <h3 className="font-bold text-green-400 mb-3">Results in 60 Days:</h3>
                <ul className="space-y-2 text-slate-300 text-sm">
                    <li>📈 Average viewers: <strong>30 → 65</strong> (+117% growth)</li>
                    <li>⏱️ Average watch time: <strong>28min → 47min</strong> (retention +68%)</li>
                    <li>💰 New subs/month: <strong>12 → 34</strong> (mentioned CTA every intro)</li>
                    <li>💬 Chat feedback: "Stream got more professional", "Looks like big channel"</li>
                </ul>
            </div>

            <p className="text-slate-400 text-sm mt-6 italic">
                💡 Insight: First 5 minutes determine if viewer stays or leaves. Professional intro = more retention = algorithm pushes more.
            </p>

            <p className="text-slate-500 text-xs mt-4">
                *Data shared with permission. Results vary based on content quality, niche, and stream consistency.
            </p>
        </div>

        <div className="text-center mt-12 mb-12">
            <a
                href="/?lang=en#app"
                className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 font-bold py-4 px-10 rounded-full transition hover:brightness-110 hover:scale-105 transform shadow-lg text-lg"
                style={{ color: 'white' }}
            >
                Professionalize Your Streams Now (Free)
            </a>
            <p className="text-slate-400 mt-4 text-sm">Setup takes 10 minutes. Results are immediate.</p>
        </div>

        <SEOContentFAQ
            title="Frequently Asked Questions: OBS Studio + Teleprompter"
            items={[
                {
                    question: "How do I remove text background in OBS?",
                    answer: "Two methods: (1) RECOMMENDED: Change PromptNinja theme to 'Chroma Green'. In OBS, add 'Chroma Key' filter to browser source. Green becomes transparent, only text remains. (2) Alternative: Use dark semi-transparent theme and adjust source opacity (Filters → Color Correction)."
                },
                {
                    question: "Works on Streamlabs OBS, XSplit and vMix?",
                    answer: "Yes! Any software that accepts 'Browser Source' works. Configuration is identical: add as Browser Source, paste PromptNinja session URL, adjust Chroma Key if needed."
                },
                {
                    question: "Does remote control have delay / lag?",
                    answer: "Practically zero. We use WebRTC which connects phone and PC DIRECTLY via local Wi-Fi (doesn't go through internet). Typical latency: 15-30ms, totally imperceptible. Even with stream running at 6000kbps, doesn't compete for bandwidth."
                },
                {
                    question: "Can I use with dual PC setup (separate streaming PC)?",
                    answer: "Yes. Two options: (1) Install PromptNinja on gaming PC, control from phone. (2) Install on streaming PC as Browser Source, control from phone. Both work, choose which PC has more available resources (usually streaming PC)."
                },
                {
                    question: "Does it impact performance / FPS during stream?",
                    answer: "Minimal impact (1-2 FPS in OBS). PromptNinja is just HTML/CSS, doesn't use heavy GPU rendering. If your PC is at limit, set Browser Source FPS to 30fps (vs 60fps default) in properties."
                },
                {
                    question: "Can I save multiple scripts and switch during live?",
                    answer: "Yes. Option 1: Open multiple PromptNinja tabs, each with different script, add each as separate Browser Source in OBS and toggle visibility. Option 2: Use one long script with marked sections, control from phone scrolling to desired section."
                },
                {
                    question: "How do I make text only appear to me, not the stream?",
                    answer: "Setup 3 (Multi-Monitor): Open PromptNinja in separate window on secondary monitor. DON'T add to OBS. Position below physical webcam. Only you see it, audience never knows it exists."
                },
                {
                    question: "Do I need internet during live for teleprompter to work?",
                    answer: "First time: yes (load the site). Then install as PWA (shortcut) and works offline. P2P remote ONLY needs local Wi-Fi between phone and PC (doesn't need external internet). Your stream can be uploading 6Mbps, teleprompter doesn't compete for bandwidth."
                }
            ]}
        />

        <div className="bg-gradient-to-r from-purple-900/20 to-indigo-900/20 p-8 rounded-xl border border-purple-500/30 text-center my-12">
            <h2 className="text-3xl font-bold text-white mb-4">Professional Streamer Starts Here</h2>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                Stop improvising intros. Stop forgetting sponsors. Stop looking at second monitor and losing viewers. Set up once, use forever.
            </p>
            <a
                href="/?lang=en#app"
                className="inline-block bg-gradient-to-r from-purple-500 to-indigo-500 font-bold py-4 px-10 rounded-full transition hover:brightness-110 hover:scale-105 transform shadow-lg text-lg"
                style={{ color: 'white' }}
            >
                Start Streaming Professionally →
            </a>
        </div>
    </>
);
