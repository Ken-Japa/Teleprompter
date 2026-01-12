import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { SEOContentHowTo } from "../../../../components/seo/SEOContentHowTo";

export const TeleprompterGamersEN = () => (
    <>
        <h2 className="text-4xl font-bold text-white mb-6 leading-tight">Teleprompter for Gamers & Streamers: Zero Lag, Maximum Performance</h2>

        <p className="mb-6 text-lg text-slate-300">
            4-hour stream. You're mid-ranked game. 300 viewers watching. Need to read long donation message. Alt-Tab to script. Game FREEZES 2 seconds. You die. Chat explodes: "OMEGALUL". Viewers drop to 250.
        </p>

        <p className="mb-6">
            You think "I need teleprompter". Google "teleprompter for streamers". Find apps that: (1) eat 500MB RAM (your game already uses 6GB), (2) don't work in background (crashes when minimized), or (3) cost $19.99/month for basic functionality.
        </p>

        <p className="mb-8">
            This guide shows EXACTLY how to setup GAMER teleprompter in 90 seconds: zero lag, ~50MB RAM, control without Alt-Tab, chroma key mode for OBS.
        </p>

        <div className="bg-gradient-to-r from-red-900/30 to-green-900/30 p-8 rounded-xl border border-slate-700 mb-12">
            <h3 className="text-3xl font-bold text-white mb-6">Gamer Setup: Amateur vs PRO</h3>
            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-slate-900/70 p-6 rounded-lg border border-red-500/30">
                    <h3 className="font-bold text-red-400 mb-4 flex items-center gap-2">
                        <span>❌</span> Amateur (Improvised Methods)
                    </h3>
                    <ul className="space-y-3 text-slate-300 text-sm">
                        <li>📝 <strong>Notes:</strong> Notepad open (Alt-Tab = game freezes)</li>
                        <li>🎮 <strong>Mid-Stream:</strong> "Uhhh let me check..." (viewers notice)</li>
                        <li>💾 <strong>RAM:</strong> 12 Chrome tabs = 2GB used</li>
                        <li>😓 <strong>Result:</strong> Looks disorganized, loses viewers</li>
                        <li>⏱️ <strong>Efficiency:</strong> 40% time OFF-screen</li>
                    </ul>
                </div>
                <div className="bg-slate-900/70 p-6 rounded-lg border border-green-500/30">
                    <h3 className="font-bold text-green-400 mb-4 flex items-center gap-2">
                        <span>✅</span> PRO (PromptNinja Setup)
                    </h3>
                    <ul className="space-y-3 text-slate-300 text-sm">
                        <li>📝 <strong>Notes:</strong> Secondary monitor (zero Alt-Tab)</li>
                        <li>🎮 <strong>Mid-Stream:</strong> Reads script WITHOUT leaving game</li>
                        <li>💾 <strong>RAM:</strong> ~50MB (less than Discord)</li>
                        <li>😊 <strong>Result:</strong> "He's SO prepared!" in chat</li>
                        <li>⏱️ <strong>Efficiency:</strong> 98% ON-screen, constant flow</li>
                    </ul>
                </div>
            </div>
            <p className="text-slate-400 text-sm mt-6 italic text-center">
                💡 PRO Streamer = invisible script to viewers + hands-free control.
            </p>
        </div>

        <h3 className="text-3xl font-bold text-white mt-12 mb-6">3 Professional Gamer Setups</h3>
        <div className="space-y-6 mb-12">
            <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-cyan-500">
                <h3 className="text-xl font-bold text-cyan-400 mb-3">Setup #1: Single Monitor Speedrunner</h3>
                <p className="text-slate-300 mb-4">
                    <strong>Hardware:</strong> 1 monitor + game fullscreen.
                </p>
                <ol className="list-decimal list-inside space-y-2 text-slate-300 text-sm">
                    <li>Open PromptNinja in SMALL window (300x200px top corner)</li>
                    <li>Paste speedrun notes (splits, skip tricks, safety strats)</li>
                    <li>Press <strong>H</strong> key = hides HUD (only text remains)</li>
                    <li>Adjust opacity 70% (see through text)</li>
                    <li>Position in corner that DOESN'T block game HUD</li>
                    <li>Control via phone (no keyboard touch mid-run)</li>
                </ol>
                <p className="text-green-400 text-sm mt-3">✅ <strong>Ideal for:</strong> Speedruns, competitive gaming, quick notes.</p>
            </div>

            <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-purple-500">
                <h3 className="text-xl font-bold text-purple-400 mb-3">Setup #2: Dual Monitor Streamer</h3>
                <p className="text-slate-300 mb-4">
                    <strong>Hardware:</strong> Monitor 1 = game, Monitor 2 = OBS/chat/teleprompter.
                </p>
                <ol className="list-decimal list-inside space-y-2 text-slate-300 text-sm">
                    <li><strong>Monitor 1:</strong> Game fullscreen (captured in OBS)</li>
                    <li><strong>Monitor 2 (top):</strong> OBS preview</li>
                    <li><strong>Monitor 2 (middle):</strong> Chat/donations overlay</li>
                    <li><strong>Monitor 2 (bottom):</strong> PromptNinja with script</li>
                    <li>Use <strong>[STOP]</strong> command to pause at each segment</li>
                    <li>Phone = remote for scroll/pause (leave on mousepad)</li>
                </ol>
                <p className="text-green-400 text-sm mt-3">✅ <strong>Ideal for:</strong> Variety streamers, just chatting, react content.</p>
            </div>

            <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-red-500">
                <h3 className="text-xl font-bold text-red-400 mb-3">Setup #3: VTuber with Chroma Key</h3>
                <p className="text-slate-300 mb-4">
                    <strong>Hardware:</strong> PC + OBS + VTuber tracking (VSeeFace/VTube Studio).
                </p>
                <ol className="list-decimal list-inside space-y-2 text-slate-300 text-sm">
                    <li>PromptNinja theme = <strong>"Chroma Green"</strong></li>
                    <li>OBS → Add Source → Window Capture (PromptNinja)</li>
                    <li>Add filter "Chroma Key" (removes green background)</li>
                    <li>Position text INSIDE scene (like professional subtitle)</li>
                    <li>Script appears ON-STREAM as "caption" of what you say</li>
                    <li>Audience DOESN'T see controls, only clean text</li>
                </ol>
                <p className="text-yellow-400 text-sm mt-3">⚠️ <strong>Pro tip:</strong> Use [COUNT 3] commands before each take to sync VTuber model.</p>
            </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg my-8 border-l-4 border-green-500">
            <h3 className="text-2xl font-bold text-white mb-2">"No HUD" Mode (H Key = Invisible Interface)</h3>
            <p className="text-slate-300 mb-4">
                Press <kbd className="bg-slate-700 px-2 py-1 rounded text-white mx-1">H</kbd> and POOF: buttons, scrollbars, menus = GONE. Only floating text remains.
            </p>
            <SEOContentHowTo
                title=""
                schemaTitle="How to Activate Gamer Mode (No Interface)"
                totalTime="PT1M"
                tools={["PromptNinja", "Keyboard"]}
                steps={[
                    {
                        title: "Step 1: Open App",
                        text: "Access PromptNinja and paste your script."
                    },
                    {
                        title: "Step 2: Press 'H'",
                        text: "Press H key = activates 'Hide HUD'. Interface disappears."
                    },
                    {
                        title: "Step 3: Adjust Opacity",
                        text: "BEFORE hiding HUD, adjust opacity ~70% to see through text during gameplay."
                    }
                ]}
            />
            <p className="text-slate-300 mt-4">
                <strong>Perfect for:</strong>
            </p>
            <ul className="list-disc pl-6 mt-2 text-slate-300 space-y-2">
                <li><strong>Speedrunners:</strong> Skip/safety notes visible without cluttering screen</li>
                <li><strong>React Streamers:</strong> Read articles/scripts without showing controls</li>
                <li><strong>VTubers:</strong> Script close to eye tracking</li>
            </ul>
        </div>

        <h3 className="text-3xl font-bold text-white mt-12 mb-6">5 Fatal Streamer Errors (That Kill Professionalism)</h3>
        <div className="space-y-4 mb-12">
            <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-red-500">
                <h4 className="font-bold text-red-400 mb-2">Error #1: Alt-Tab During Intense Gameplay</h4>
                <p className="text-slate-300 text-sm">
                    Mid-teamfight ranked game. Need to read donation. Alt-Tab to Notepad. FPS drops from 144→30fps for 2s. You die. Team rages. -25 LP.
                    <span className="text-green-400 block mt-2">✅ <strong>Solution:</strong> Secondary monitor (even cheap 60Hz) OR tiny window in screen corner + H key (no HUD).</span>
                </p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-red-500">
                <h4 className="font-bold text-red-400 mb-2">Error #2: Heavy App Competing with Game</h4>
                <p className="text-slate-300 text-sm">
                    Download "teleprompter pro for streamers" using 500MB RAM. Your PC (16GB total): 6GB game + 2GB OBS + 3GB Chrome = 11GB. +500MB = starts disk swapping. Unstable FPS.
                    <span className="text-green-400 block mt-2">✅ <strong>Solution:</strong> PromptNinja uses ~50MB (verified Task Manager). Literally less than Spotify.</span>
                </p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-red-500">
                <h4 className="font-bold text-red-400 mb-2">Error #3: Text Too Large (Covers Game HUD)</h4>
                <p className="text-slate-300 text-sm">
                    48px giant font. Text covers LoL/Dota minimap. You don't see gank coming. You die. Viewers: "He didn't even look at map".
                    <span className="text-green-400 block mt-2">✅ <strong>Solution:</strong> 24-28px font + 70% opacity + position in corner OPPOSITE critical HUD. See through text.</span>
                </p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-red-500">
                <h4 className="font-bold text-red-400 mb-2">Error #4: Not Using Remote (Dirty Keyboard Binds)</h4>
                <p className="text-slate-300 text-sm">
                    You bind Pause teleprompter to "P". Mid-game press P to pause script. Game ALSO has bind on P (shop/menu). Opens wrong window = you die.
                    <span className="text-green-400 block mt-2">✅ <strong>Solution:</strong> Phone = dedicated control. Zero conflict with game binds. Leave next to mouse.</span>
                </p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-red-500">
                <h4 className="font-bold text-red-400 mb-2">Error #5: Chroma Key Misconfigured (Green Leaks)</h4>
                <p className="text-slate-300 text-sm">
                    Use chroma green but wrong threshold. Green champion skins ALSO become transparent in OBS. Character with visible "holes".
                    <span className="text-green-400 block mt-2">✅ <strong>Solution:</strong> OBS Chroma Key: Similarity = 400, Smoothness = 80, KeyColor Spill = 100. OR use "Chroma Blue" theme if game has lots of green.</span>
                </p>
            </div>
        </div>

        <h3 className="text-2xl font-bold text-white mt-8 mb-4">Chroma Key & OBS Integration</h3>
        <p className="mb-4">
            Need text INSIDE stream (visible to viewer)? PromptNinja has native Chroma Green/Blue themes.
        </p>
        <ol className="list-decimal list-inside space-y-2 mb-6 text-slate-300">
            <li>PromptNinja → Settings → Theme → <strong>"Chroma Green"</strong></li>
            <li>OBS → Add Source → <strong>Window Capture</strong> (select PromptNinja)</li>
            <li>Right-click source → Filters → Add → <strong>"Chroma Key"</strong></li>
            <li>Adjust Similarity ~400 until green background disappears</li>
            <li>Text has transparent background = looks like professional subtitle</li>
        </ol>
        <p className="text-yellow-400 text-sm">💡 <strong>Pro tip:</strong> If your game has LOTS of green (Minecraft, Zelda), use "Chroma Blue".</p>

        <h3 className="text-2xl font-bold text-white mt-8 mb-4">Control Without Alt-Tab (3 Methods)</h3>
        <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-2">📱 P2P Phone</h3>
                <p className="text-sm text-slate-300">Scan QR code. Phone becomes free Stream Deck. Pause/play/speed next to mouse. Zero lag (local WiFi).</p>
            </div>
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-2">⌨️ Global Hotkeys</h3>
                <p className="text-sm text-slate-300">Arrow keys ↑↓ = speed. Space = pause/play. Works EVEN with game fullscreen (no need to focus window).</p>
            </div>
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-2">📝 Text Commands</h3>
                <p className="text-sm text-slate-300">[STOP] = auto pause. [COUNT 3] = countdown. Ideal for segmenting script between boss fights.</p>
            </div>
        </div>

        <div className="text-center bg-slate-800 p-8 rounded-lg my-10">
            <h3 className="text-3xl font-bold text-white mb-4">🎮 Level Up Your Stream</h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                PRO Streamer = invisible script + zero lag + hands-free control. Everything you need, nothing you don't.
            </p>
            <a
                href="/?lang=en#app"
                className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 font-bold py-3 px-8 rounded-full transition hover:brightness-110"
                style={{ color: 'white' }}
            >
                🚀 Open Gamer Mode (Free)
            </a>
            <p className="text-slate-400 mt-4 text-sm">~50MB RAM • Native chroma key • P2P control</p>
        </div>

        <SEOContentFAQ
            title="Frequently Asked Questions - Streamers & Gamers"
            items={[
                {
                    question: "Works with OBS and Streamlabs?",
                    answer: "YES! Two options: (1) Window Capture to show text ON stream (use Chroma Key theme = transparent background) OR (2) window on secondary monitor invisible to viewer (personal use). Both zero lag."
                },
                {
                    question: "Can I control text without Alt-Tab (leaving game)?",
                    answer: "ABSOLUTELY. 3 methods: (1) Phone via P2P (best - hands-free), (2) Global hotkeys (Arrows/Space work EVEN in fullscreen), (3) Text commands [STOP] for auto pause."
                },
                {
                    question: "Heavy on CPU/GPU? Will it lag my game?",
                    answer: "NO. ~50MB RAM (less than Discord/Spotify). GPU usage <1% (only renders text). Tested: CS2 300fps + OBS 1080p60 + PromptNinja = zero frame drops (Ryzen 5 + RTX 3060)."
                },
                {
                    question: "Can I use on Single Monitor without covering game?",
                    answer: "YES. Small window (300x200px) in corner + H key (hide UI) + 70% opacity = see THROUGH text. Position in corner without important HUD. Speedrunners use this way."
                },
                {
                    question: "How to Chroma Key without green leaking from game?",
                    answer: "OBS Chroma settings: Similarity = 400, Smoothness = 80, Key Color Spill = 100. If game has LOTS of green (Minecraft/Zelda), use 'Chroma Blue' theme. Test before stream: pause game in green area to check leaking."
                },
                {
                    question: "Works for VTuber? Can I show text on-stream?",
                    answer: "PERFECT for VTuber! Chroma mode = text appears as professional 'subtitle' on stream. Audience sees what you say (like karaoke). Use [STOP] command to pause between phrases = sync with VTuber model."
                },
                {
                    question: "Remote phone needs cable or WiFi? Is there lag?",
                    answer: "LOCAL WiFi (P2P direct PC↔phone). Lag <50ms (imperceptible). DOESN'T use internet - works offline. Phone stays next to mouse = instant control without removing hand from keyboard."
                },
                {
                    question: "Auto script possible? Like 'read line, wait 5s, next'?",
                    answer: "YES! Use [WAIT 5] command between lines. Or [STOP] to pause until you manually press play. Ideal for: (1) React content (pause between clips), (2) RPG narrative (pause between chapters), (3) Tutorial (pause to demonstrate)."
                }
            ]}
        />
    </>
);
