import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { SEOContentHowTo } from "../../../../components/seo/SEOContentHowTo";

export const TeleprompterCapCutEN = () => (
    <>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Teleprompter for CapCut: Stop Wasting 3 Hours Editing Recording Mistakes
        </h1>

        <p className="lead text-xl text-slate-300 mb-8">
            You recorded that perfect video. Good lighting, nice framing, energy on point. Import it to CapCut and... realize half the takes have text mistakes. Stumbling on words, stuttering, forgetting lines. Result? Instead of spending 1 hour editing transitions and effects, you spend 3 hours CUTTING errors.
        </p>

        <p className="mb-6">
            I've been there. I'd record a 2-minute video, but the CapCut timeline had 15 minutes of raw footage filled with retakes. By the time I finished cutting everything, my creativity was gone. Only had energy left to export and publish — no polish on captions, no cool transitions.
        </p>

        <p className="mb-8">
            The problem isn't CapCut. The problem is arriving at CapCut with BAD material. The solution? Record with a <strong>professional teleprompter</strong> first. PromptNinja was born exactly for this: you record on the first take without text mistakes, arriving at CapCut with a clean timeline ready to CREATE, not fix.
        </p>

        <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 p-8 rounded-xl border border-red-500/30 my-12">
            <h2 className="text-3xl font-bold text-white mb-6">The Content Creator's Vicious Cycle</h2>
            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-slate-900/50 p-6 rounded-lg border border-red-500/30">
                    <h3 className="font-bold text-red-400 mb-4 flex items-center gap-2">
                        <span>❌</span> WITHOUT Teleprompter
                    </h3>
                    <ul className="space-y-3 text-slate-300 text-sm">
                        <li>🎬 <strong>Recording:</strong> 2h to record 3min of video (20+ takes)</li>
                        <li>📂 <strong>Raw footage:</strong> 18min of error-filled files</li>
                        <li>✂️ <strong>Editing in CapCut:</strong> 3h cutting mistakes, syncing cuts</li>
                        <li>😫 <strong>Creativity:</strong> Zero. Just want to finish</li>
                        <li>📊 <strong>Result:</strong> "Okay" video, published without care</li>
                        <li>⏰ <strong>Total time:</strong> 5h+ per video</li>
                    </ul>
                </div>
                <div className="bg-slate-900/50 p-6 rounded-lg border border-green-500/30">
                    <h3 className="font-bold text-green-400 mb-4 flex items-center gap-2">
                        <span>✅</span> WITH PromptNinja
                    </h3>
                    <ul className="space-y-3 text-slate-300 text-sm">
                        <li>🎬 <strong>Recording:</strong> 20min to record 3min (1-2 takes)</li>
                        <li>📂 <strong>Raw footage:</strong> 4min of clean files</li>
                        <li>✂️ <strong>Editing in CapCut:</strong> 1h creating effects, captions, transitions</li>
                        <li>😊 <strong>Creativity:</strong> High. Focus on what matters</li>
                        <li>📊 <strong>Result:</strong> Professional video with your brand</li>
                        <li>⏰ <strong>Total time:</strong> 1h20min per video</li>
                    </ul>
                </div>
            </div>
            <p className="text-slate-400 text-sm mt-6 italic text-center">
                💡 Savings: <strong className="text-green-400">3h40min per video</strong>. If you make 4 videos/month, that's <strong className="text-green-400">14 hours saved</strong>!
            </p>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Why CapCut's Built-in Teleprompter Doesn't Cut It</h2>
        <p className="mb-6">
            CapCut has a native teleprompter in the recording function. Sounds practical, but it has critical limitations that prevent professional recordings:
        </p>

        <div className="overflow-x-auto my-8">
            <table className="w-full text-left border-collapse bg-slate-800 rounded-lg">
                <thead>
                    <tr className="bg-slate-700">
                        <th className="p-4 border border-slate-600">Feature</th>
                        <th className="p-4 border border-slate-600 text-center">PromptNinja</th>
                        <th className="p-4 border border-slate-600 text-center">CapCut Teleprompter</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="p-4 border border-slate-700 font-semibold">Remote Control</td>
                        <td className="p-4 border border-slate-700 text-center text-green-400">✔ Via QR Code (another phone)</td>
                        <td className="p-4 border border-slate-700 text-center text-red-400">✖ Screen tap (impossible during recording)</td>
                    </tr>
                    <tr>
                        <td className="p-4 border border-slate-700 font-semibold">Real-time Speed Adjustment</td>
                        <td className="p-4 border border-slate-700 text-center text-green-400">✔ Instant adjustment via remote</td>
                        <td className="p-4 border border-slate-700 text-center text-yellow-400">~ Need to pause recording</td>
                    </tr>
                    <tr>
                        <td className="p-4 border border-slate-700 font-semibold">Voice Control (AI)</td>
                        <td className="p-4 border border-slate-700 text-center text-green-400">✔ Text scrolls as you speak</td>
                        <td className="p-4 border border-slate-700 text-center text-red-400">✖ Not available</td>
                    </tr>
                    <tr>
                        <td className="p-4 border border-slate-700 font-semibold">Works with Any Camera App</td>
                        <td className="p-4 border border-slate-700 text-center text-green-400">✔ Runs separately (overlay)</td>
                        <td className="p-4 border border-slate-700 text-center text-red-400">✖ Only inside CapCut</td>
                    </tr>
                    <tr>
                        <td className="p-4 border border-slate-700 font-semibold">Font Size</td>
                        <td className="p-4 border border-slate-700 text-center text-green-400">Customizable (8px-200px)</td>
                        <td className="p-4 border border-slate-700 text-center text-yellow-400">Limited (3 fixed sizes)</td>
                    </tr>
                    <tr>
                        <td className="p-4 border border-slate-700 font-semibold">Works Offline</td>
                        <td className="p-4 border border-slate-700 text-center text-green-400">✔ Installable PWA</td>
                        <td className="p-4 border border-slate-700 text-center text-yellow-400">~ Depends on CapCut being updated</td>
                    </tr>
                    <tr>
                        <td className="p-4 border border-slate-700 font-semibold">Price</td>
                        <td className="p-4 border border-slate-700 text-center text-green-400">Free (remote included)</td>
                        <td className="p-4 border border-slate-700 text-center text-green-400">Free</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <p className="text-slate-400 text-sm italic mb-12">
            💡 <strong>Pro Tip:</strong> Use PromptNinja to record, but take advantage of your phone's native camera app in 4K (60fps). Then import to CapCut with the best possible quality.
        </p>

        <div className="bg-slate-800 p-6 rounded-lg my-12 border-l-4 border-cyan-500">
            <h2 className="text-2xl font-bold text-white mb-4">Professional Workflow: PromptNinja → CapCut</h2>
            <p className="text-slate-300 mb-4">
                The perfect combo isn't choosing one or the other. It's using each tool for what it does best:
            </p>
            <ul className="space-y-3 text-slate-300">
                <li><strong className="text-cyan-400">PromptNinja:</strong> Record 100% clean material with no text errors</li>
                <li><strong className="text-cyan-400">CapCut:</strong> Add auto captions, viral transitions, trending effects, music</li>
            </ul>
        </div>

        <SEOContentHowTo
            title="Step-by-Step: Perfect Recording for CapCut"
            schemaTitle="How to Use Teleprompter with CapCut"
            totalTime="PT15M"
            tools={["PromptNinja", "Smartphone", "CapCut"]}
            steps={[
                {
                    title: "Step 1: Write Script in PromptNinja",
                    text: "Go to promptninja.solutionkit.com.br and paste your text. Adjust font size to read comfortably from 3 feet away. Use CAPS or colors to mark keywords you want to emphasize."
                },
                {
                    title: "Step 2: Set Up Remote Control (Optional but Recommended)",
                    text: "Click 'Connect Device' and scan the QR Code with a second phone or tablet. This lets you pause/resume/adjust speed without touching the recording phone."
                },
                {
                    title: "Step 3: Position Phone and Teleprompter",
                    text: "Place the recording phone on a tripod at eye level. Open PromptNinja on another device (or the same one using picture-in-picture if available) and position just below or beside the camera."
                },
                {
                    title: "Step 4: Record with Full Focus",
                    text: "Hit REC in your native camera app (not in CapCut yet). Read the text naturally, pausing when needed using the remote. No rush. One perfect take beats 10 mediocre ones."
                },
                {
                    title: "Step 5: Import to CapCut",
                    text: "Open CapCut, create a new project and import the video from gallery. Since you didn't mess up the text, your timeline will be clean. Now just add the magic: Auto Captions, zoom effects, background music."
                },
                {
                    title: "Step 6: High-Precision Auto Captions",
                    text: "Use 'Text → Auto Caption'. Since your diction was guided by the script, CapCut will generate captions with 95%+ accuracy. Fix the few wrong words and apply viral animations (bounce, glitch, etc)."
                }
            ]}
        />

        <h2 className="text-3xl font-bold text-white mt-16 mb-6">Real Case: TikToker Went from 8h to 3h/Week Recording</h2>
        <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 p-8 rounded-xl border border-purple-500/30 mb-12">
            <p className="text-slate-300 mb-4">
                <strong className="text-purple-400">Profile:</strong> Educational content creator on TikTok (@study_with_emma), 87k followers, posts 5 videos/week about study tips.
            </p>
            <p className="text-slate-300 mb-6">
                <strong className="text-purple-400">Problem:</strong> Spent 8h every Monday recording the week's 5 videos. Since she memorized text, she'd stumble often, and each 60s video took 1h30min to get "acceptable". Result: burnout, low-energy videos on last takes.
            </p>

            <h3 className="font-bold text-white mb-3">Implemented Changes:</h3>
            <ol className="list-decimal pl-6 space-y-2 text-slate-300 mb-6">
                <li>Started writing detailed scripts on Sunday (30min for 5 videos)</li>
                <li>Monday: opens PromptNinja on tablet, places behind phone</li>
                <li>Records all 5 videos in 2h (each takes 20-25min, 2 takes max)</li>
                <li>Edits in CapCut: 1h total (12min per video, focusing on captions and effects)</li>
            </ol>

            <div className="bg-slate-900/50 p-6 rounded-lg">
                <h3 className="font-bold text-green-400 mb-3">Results in 2 Months:</h3>
                <ul className="space-y-2 text-slate-300 text-sm">
                    <li>⏱️ Production time: <strong>-62%</strong> (from 8h to 3h/week)</li>
                    <li>📈 Average engagement: <strong>+34%</strong> (smoother videos, fewer visible errors)</li>
                    <li>💪 Mental energy: Creativity left to test new formats</li>
                    <li>🎬 Quality: Videos look "more professional" per comments</li>
                </ul>
            </div>

            <p className="text-slate-400 text-xs italic mt-4">
                *Data shared with permission. Results may vary based on content type and experience.
            </p>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Advanced Tips for CapCut + PromptNinja Users</h2>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
                <h3 className="font-bold text-cyan-400 mb-3 text-xl">📱 Record in Portrait 9:16</h3>
                <p className="text-slate-300 text-sm mb-3">
                    If your content is for TikTok/Reels/Shorts, set PromptNinja in portrait mode (vertical). Adjust text width to fit the screen without horizontal scrolling.
                </p>
                <p className="text-xs text-slate-500">
                    <strong>Pro tip:</strong> Only use landscape if it's for YouTube widescreen.
                </p>
            </div>

            <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
                <h3 className="font-bold text-cyan-400 mb-3 text-xl">🎨 Mark Cut Points in Script</h3>
                <p className="text-slate-300 text-sm mb-3">
                    Use [CUT] or *** in the script to remember where you'll add transitions or b-roll in CapCut. Makes editing easier.
                </p>
                <p className="text-xs text-slate-500">
                    <strong>Example:</strong> "Here are 3 tips [CUT] First: always plan..."
                </p>
            </div>

            <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
                <h3 className="font-bold text-cyan-400 mb-3 text-xl">⚡ Use the [COUNT 3] Feature</h3>
                <p className="text-slate-300 text-sm mb-3">
                    In PromptNinja Pro, you can insert special commands like [COUNT 3] for a spoken countdown. Perfect for creating suspense before revealing something.
                </p>
                <p className="text-xs text-slate-500">
                    <strong>CapCut will love it:</strong> Easy to sync zoom or glitch effect on the countdown.
                </p>
            </div>

            <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
                <h3 className="font-bold text-cyan-400 mb-3 text-xl">🎯 Speed of 180-200 WPM</h3>
                <p className="text-slate-300 text-sm mb-3">
                    For short videos (TikTok/Shorts), set speed between 180-200 words per minute. It's fast but still comprehensible. For long YouTube videos, use 140-160 WPM.
                </p>
                <p className="text-xs text-slate-500">
                    <strong>Test:</strong> Record 30s and see if you could follow comfortably.
                </p>
            </div>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Common Mistakes When Combining Teleprompter + CapCut</h2>

        <div className="space-y-4 mb-12">
            <div className="bg-slate-800 p-5 rounded-lg border-l-4 border-red-500">
                <h3 className="font-bold text-white mb-2">❌ Mistake 1: Recording Directly in CapCut</h3>
                <p className="text-slate-300 text-sm mb-2">
                    Many people record using CapCut's camera because it'll be there anyway. Problem: if the app crashes or you close it accidentally, you lose the recording.
                </p>
                <p className="text-green-400 text-sm">
                    <strong>✅ Solution:</strong> Always record in your phone's native camera app. Auto-saves to gallery and you have a backup.
                </p>
            </div>

            <div className="bg-slate-800 p-5 rounded-lg border-l-4 border-red-500">
                <h3 className="font-bold text-white mb-2">❌ Mistake 2: Not Testing Positioning First</h3>
                <p className="text-slate-300 text-sm mb-2">
                    Positioning the teleprompter too far from camera makes you shift your eyes A LOT, making it obvious you're reading.
                </p>
                <p className="text-green-400 text-sm">
                    <strong>✅ Solution:</strong> Place the device with PromptNinja <em>right below or beside</em> the lens. Ideally no more than 8 inches away.
                </p>
            </div>

            <div className="bg-slate-800 p-5 rounded-lg border-l-4 border-red-500">
                <h3 className="font-bold text-white mb-2">❌ Mistake 3: Font Too Small</h3>
                <p className="text-slate-300 text-sm mb-2">
                    Using 18px font when you're 3 feet away forces you to squint or lean in, breaking naturalness.
                </p>
                <p className="text-green-400 text-sm">
                    <strong>✅ Solution:</strong> Use at least 32-40px. Test: you should be able to read WITHOUT effort. Adjust based on distance and vision quality.
                </p>
            </div>

            <div className="bg-slate-800 p-5 rounded-lg border-l-4 border-red-500">
                <h3 className="font-bold text-white mb-2">❌ Mistake 4: Editing Before Recording Everything</h3>
                <p className="text-slate-300 text-sm mb-2">
                    Record one video, edit it right away, then record another. You lose momentum and each recording has different energy.
                </p>
                <p className="text-green-400 text-sm">
                    <strong>✅ Solution:</strong> Batch method: record ALL the week's videos at once (with same setup). Then edit all at once in CapCut.
                </p>
            </div>
        </div>

        <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 p-8 rounded-xl border border-cyan-500/30 my-12">
            <h2 className="text-2xl font-bold text-white mb-4">🔥 Productivity Hack: Batch Recording</h2>
            <p className="text-slate-300 mb-4">
                If you need to produce multiple videos, set up the environment ONCE and record everything in sequence:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-slate-300 mb-4">
                <li>Prepare 5 scripts in PromptNinja (paste all in separate browser tabs)</li>
                <li>Set up lighting and tripod</li>
                <li>Record video 1, pause 30 seconds, switch tab, record video 2...</li>
                <li>In 1 hour you record material for the entire week</li>
                <li>Dedicate 1 day just to edit everything in CapCut</li>
            </ol>
            <p className="text-cyan-300 font-semibold">
                Result: You "work" 2 days but free the entire week for other tasks (thumbnails, copy, analytics).
            </p>
        </div>

        <div className="text-center mt-12 mb-12">
            <a
                href="https://promptninja.solutionkit.com.br?lang=en"
                className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 font-bold py-4 px-10 rounded-full transition hover:brightness-110 hover:scale-105 transform shadow-lg"
                style={{ color: 'white' }}
            >
                Start Creating Professional Content Now (Free)
            </a>
            <p className="text-slate-400 mt-4 text-sm">No signup. No credit card. No tricks.</p>
        </div>

        <SEOContentFAQ
            title="Frequently Asked Questions: PromptNinja + CapCut"
            items={[
                {
                    question: "Does PromptNinja export directly to CapCut?",
                    answer: "Not directly. The workflow is: you record the video using your phone's native camera app while reading the teleprompter. The video auto-saves to gallery. Then you open CapCut and import from gallery. Simple and safe."
                },
                {
                    question: "Can I use CapCut's effects and transitions normally?",
                    answer: "Yes! That's exactly the point: record the 'clean' video using PromptNinja (no text errors), then add all the magic in CapCut — auto captions, dramatic zoom, viral music, trending transitions. Each tool does what it does best."
                },
                {
                    question: "Is the video quality good?",
                    answer: "Quality depends on your phone's camera, not PromptNinja. Since you record using the native camera app (not a browser recorder), you can use maximum resolution: 4K 60fps if your phone supports it. PromptNinja just shows the text, doesn't touch recording."
                },
                {
                    question: "Do I need internet to use it?",
                    answer: "For first time: yes, to load the site. Then you can install as PWA (shortcut on home screen) and it works 100% offline. The P2P remote control also doesn't need internet — just local Wi-Fi to connect the two devices."
                },
                {
                    question: "What if I want to record a long 30-40 minute podcast?",
                    answer: "Perfect! Use the 'Auto Scroll' feature with adjustable speed, or even better: Voice Control (Pro). Text moves as you speak, no need to touch anything. Ideal for long content where you need to gesture and move around."
                },
                {
                    question: "Works on iPhone and Android?",
                    answer: "Yes, both. PromptNinja runs 100% in browser (Safari on iPhone, Chrome on Android). No need to download anything from App Store or Google Play. Just visit the site and use. You can even install as an app on home screen (PWA)."
                },
                {
                    question: "Is there a recording time limit?",
                    answer: "PromptNinja doesn't limit. It just shows text. The limit is your phone: storage space and battery. Tip: if recording a lot (20min+), leave phone charging."
                },
                {
                    question: "Do CapCut's auto captions get better with a teleprompter?",
                    answer: "YES! Much better. Since you speak following a written script, your diction is clearer without stuttering. CapCut's Auto Caption algorithm can recognize words with 90-95% accuracy (vs ~70% when you improvise). Less manual correction = more time for creativity."
                }
            ]}
        />

        <div className="bg-slate-800 p-8 rounded-lg mt-16 mb-8">
            <h3 className="text-2xl font-bold text-white mb-4 text-center">Related Resources</h3>
            <div className="grid md:grid-cols-2 gap-4">
                <a href="/en/teleprompter-tiktok-shorts" className="block p-4 bg-slate-900 rounded-lg hover:bg-slate-700 transition border border-slate-700">
                    <span className="text-2xl mb-2 block">📱</span>
                    <h4 className="font-bold text-white mb-1">Teleprompter for TikTok & Shorts</h4>
                    <p className="text-sm text-slate-400">Specific tips for short vertical videos</p>
                </a>
                <a href="/en/best-teleprompter-app" className="block p-4 bg-slate-900 rounded-lg hover:bg-slate-700 transition border border-slate-700">
                    <span className="text-2xl mb-2 block">⭐</span>
                    <h4 className="font-bold text-white mb-1">App Comparison</h4>
                    <p className="text-sm text-slate-400">PromptNinja vs paid competitors</p>
                </a>
                <a href="/en/how-to-use-teleprompter" className="block p-4 bg-slate-900 rounded-lg hover:bg-slate-700 transition border border-slate-700">
                    <span className="text-2xl mb-2 block">📖</span>
                    <h4 className="font-bold text-white mb-1">Complete Usage Guide</h4>
                    <p className="text-sm text-slate-400">Step-by-step tutorial for beginners</p>
                </a>
                <a href="/en/video-speaking-tips" className="block p-4 bg-slate-900 rounded-lg hover:bg-slate-700 transition border border-slate-700">
                    <span className="text-2xl mb-2 block">🎤</span>
                    <h4 className="font-bold text-white mb-1">Video Speaking Tips</h4>
                    <p className="text-sm text-slate-400">How to speak naturally while reading</p>
                </a>
            </div>
        </div>

        <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 p-8 rounded-xl border border-purple-500/30 text-center my-12">
            <h2 className="text-3xl font-bold text-white mb-4">Your Creator Journey Starts Here</h2>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                Stop fighting with retakes. Stop spending 3 hours editing mistakes. Start creating content the way you've always dreamed: with focus, quality, and creativity to spare.
            </p>
            <a
                href="https://promptninja.solutionkit.com.br?lang=en"
                className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 font-bold py-4 px-10 rounded-full transition hover:brightness-110 hover:scale-105 transform shadow-lg text-lg"
                style={{ color: 'white' }}
            >
                Use PromptNinja Free Now →
            </a>
        </div>
    </>
);
