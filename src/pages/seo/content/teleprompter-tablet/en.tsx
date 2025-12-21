import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { SEOContentHowTo } from "../../../../components/seo/SEOContentHowTo";

export const TeleprompterTabletEN = () => (
    <>
        <h1 className="text-4xl font-bold text-white mb-6 leading-tight">Teleprompter for Tablet and iPad: The Sweet Spot for Video Creation</h1>

        <p className="mb-6 text-lg text-slate-300">
            You try recording with your phone, but the screen is tiny and you squint. You try using your laptop, but it's heavy and impossible to mount on a tripod. You're stuck in "equipment limbo": either too small or too clumsy.
        </p>

        <p className="mb-6">
            The result? Videos with squinting eyes (trying to read small letters), rigid posture, and eye strain after 15 minutes. Your performance suffers, and your video looks amateur.
        </p>

        <p className="mb-8">
            The Tablet (whether iPad, Samsung Tab, or Kindle Fire) is the golden tool ignored by 90% of creators. With the perfect 10-12 inch screen and extreme portability, it turns any corner into a professional TV studio – if you have the right software.
        </p>

        <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-8 rounded-xl border border-slate-700 mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Tablet vs Phone vs Laptop: The Battle of Screens</h2>
            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-slate-900/70 p-6 rounded-lg border border-red-500/30">
                    <h3 className="font-bold text-red-400 mb-4 text-center">📱 Phone (Smartphone)</h3>
                    <ul className="space-y-3 text-slate-300 text-sm">
                        <li>❌ <strong>Screen:</strong> Too small (6"). Requires tiny font or too-fast scrolling.</li>
                        <li>❌ <strong>Distance:</strong> Only works at less than 20 inches. Must be "on top" of camera.</li>
                        <li>❌ <strong>Glass:</strong> Too small for professional glass teleprompters.</li>
                    </ul>
                </div>
                <div className="bg-slate-900/70 p-6 rounded-lg border border-red-500/30">
                    <h3 className="font-bold text-red-400 mb-4 text-center">💻 Laptop / Monitor</h3>
                    <ul className="space-y-3 text-slate-300 text-sm">
                        <li>❌ <strong>Mounting:</strong> Heavy. Hard to mount on tripods without expensive gear.</li>
                        <li>❌ <strong>Mobility:</strong> Requires desk or stand. Ties you to the studio.</li>
                        <li>❌ <strong>Complexity:</strong> Cables, mouse, keyboard... setup takes 15min.</li>
                    </ul>
                </div>
                <div className="bg-slate-900/70 p-6 rounded-lg border border-green-500/30 shadow-lg shadow-green-900/20 transform scale-105">
                    <h3 className="font-bold text-green-400 mb-4 text-center">✨ Tablet / iPad</h3>
                    <ul className="space-y-3 text-slate-300 text-sm">
                        <li>✅ <strong>Screen:</strong> Perfect (10-12"). Comfortable reading at 6-10 feet.</li>
                        <li>✅ <strong>Mounting:</strong> Lightweight. Any $15 mount holds it on a tripod.</li>
                        <li>✅ <strong>Professional:</strong> Standard size for studio glass teleprompters.</li>
                    </ul>
                </div>
            </div>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">3 Professional Setups with Tablet</h2>
        <div className="space-y-8 mb-12">
            <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-cyan-500">
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-cyan-400 mb-3">Setup #1: The "Backpack Studio" (Mobile Creator)</h3>
                        <p className="text-slate-300 mb-4">
                            Ideal for solo creators in outdoor locations or compact home studios.
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-slate-300 text-sm">
                            <li><strong>Hardware:</strong> iPad/Tablet + Tripod with simple mount.</li>
                            <li><strong>Camera:</strong> Use the tablet's OWN front camera.</li>
                            <li><strong>Positioning:</strong> Tablet at eye level. Clean lens.</li>
                            <li><strong>PromptNinja:</strong> Text centered at top, near camera lens.</li>
                            <li><strong>Advantage:</strong> 30-second setup. 4K quality (on most new iPads). Zero cables.</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-purple-500">
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-purple-400 mb-3">Setup #2: The "Pro Glass" (For DSLRs/Mirrorless)</h3>
                        <p className="text-slate-300 mb-4">
                            The gold standard for big YouTubers and TV. Requires teleprompter hardware (beam splitter).
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-slate-300 text-sm">
                            <li><strong>Hardware:</strong> DSLR camera on tripod + Glass teleprompter + Tablet lying flat on base.</li>
                            <li><strong>How it Works:</strong> Tablet reflects text onto glass. Camera records through the glass.</li>
                            <li><strong>PromptNinja Config:</strong> Enable <strong>Mirror Mode</strong> with one click ('M' icon).</li>
                            <li><strong>Control:</strong> Use your phone as a remote to vary speed while recording.</li>
                            <li><strong>Advantage:</strong> 100% eye contact into the lens. Cinema quality. Tablet is just the monitor.</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-yellow-500">
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-yellow-400 mb-3">Setup #3: The "Sidekick" (Hybrid for Lives)</h3>
                        <p className="text-slate-300 mb-4">
                            Perfect for Instagram/TikTok lives or Webinars where you usually use PC to stream.
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-slate-300 text-sm">
                            <li><strong>Hardware:</strong> PC/Gamer Setup + Tablet on an articulated arm.</li>
                            <li><strong>Positioning:</strong> Tablet positioned EXACTLY under main webcam or beside gaming monitor.</li>
                            <li><strong>Usage:</strong> Tablet runs script (PromptNinja) independently from PC.</li>
                            <li><strong>Advantage:</strong> Frees up 100% of PC monitors for game/chat/OBS. Script doesn't "steal" Windows screen space.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">How to Install (No App Store)</h2>
        <div className="bg-slate-800 p-6 rounded-lg my-6">
            <p className="text-slate-300 mb-6">
                PromptNinja is a PWA (Progressive Web App). This means you don't download from the store, you "install" straight from the browser. Saves 200MB space and ensures instant updates.
            </p>
            <SEOContentHowTo
                title=""
                schemaTitle="How to Install PromptNinja on iPad and Android"
                totalTime="PT2M"
                tools={["Tablet (iPad or Android)", "Browser (Safari or Chrome)"]}
                steps={[
                    {
                        title: "On iPad (Safari)",
                        text: "1. Open 'promptninja.solutionkit.com.br' in Safari.\n2. Tap the 'Share' button (square with arrow up).\n3. Scroll down and tap 'Add to Home Screen'.\n4. The purple icon will appear with your other apps."
                    },
                    {
                        title: "On Android (Chrome)",
                        text: "1. Open site in Chrome.\n2. Tap the three dots (menu) in top right corner.\n3. Select 'Install app' or 'Add to Home screen'.\n4. Confirm and ready, the app is installed."
                    },
                    {
                        title: "Offline Mode",
                        text: "Once added to home screen, open the app. It loads instantly and works EVEN if you turn off Wi-Fi (airplane mode recommended to avoid notifications)."
                    }
                ]}
            />
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">5 Fatal Errors When Using Tablet as Teleprompter</h2>
        <div className="space-y-4 mb-12">
            <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-red-500">
                <h4 className="font-bold text-red-400 mb-2">Error #1: Forgetting to Lock Screen Rotation</h4>
                <p className="text-slate-300 text-sm">
                    You bump the tripod and tablet rotates screen horizontal/vertical mid-recording. Text realigns and you lose your spot.
                    <span className="text-green-400 block mt-2">✅ <strong>Solution:</strong> Enable "Orientation Lock" in iPad/Android control center BEFORE starting.</span>
                </p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-red-500">
                <h4 className="font-bold text-red-400 mb-2">Error #2: Max Screen Brightness (Ghost Reflection)</h4>
                <p className="text-slate-300 text-sm">
                    On glass teleprompters, 100% brightness causes a "halo" or double reflection in camera lens, making image milky.
                    <span className="text-green-400 block mt-2">✅ <strong>Solution:</strong> Use brightness at 60-70%. Sufficient to see text in reflection, but doesn't blow out camera image.</span>
                </p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-red-500">
                <h4 className="font-bold text-red-400 mb-2">Error #3: "Pop-up" Notifications on Video</h4>
                <p className="text-slate-300 text-sm">
                    Mid-inspiring sentence, pop-up appears: "TINDER: New Match!". Ruins recording (and maybe reputation if screen sharing).
                    <span className="text-green-400 block mt-2">✅ <strong>Solution:</strong> Do Not Disturb Mode or Airplane Mode are MANDATORY. PromptNinja works offline, so turn off Wi-Fi if possible.</span>
                </p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-red-500">
                <h4 className="font-bold text-red-400 mb-2">Error #4: Wrong Font Size for Distance</h4>
                <p className="text-slate-300 text-sm">
                    Using font size 40 (phone standard) on a tablet 6 feet away. You squint to read.
                    <span className="text-green-400 block mt-2">✅ <strong>Solution:</strong> Rule is: the further the tablet, BIGGER the font. On tablets at 6ft, use size 70-90px. Test readability before recording.</span>
                </p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-red-500">
                <h4 className="font-bold text-red-400 mb-2">Error #5: Trying to Control by Touching Screen (Far Away)</h4>
                <p className="text-slate-300 text-sm">
                    Tablet is 6 feet away. You miss a line. Have to stand up, walk to tripod, rewind, go back, sit down... Breaks flow.
                    <span className="text-green-400 block mt-2">✅ <strong>Solution:</strong> Use "Remote Control" feature. Keep phone in lap. Mistake? Pause and rewind via phone, without leaving chair.</span>
                </p>
            </div>
        </div>

        <div className="text-center bg-slate-800 p-8 rounded-lg my-10">
            <h2 className="text-3xl font-bold text-white mb-4">Turn Your Tablet Into a Studio</h2>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                Don't leave your iPad gathering dust. It's the $1,000 equipment you already own and aren't using to improve your videos.
            </p>
            <a
                href="/?lang=en#app"
                className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 font-bold py-3 px-8 rounded-full transition hover:brightness-110"
                style={{ color: 'white' }}
            >
                🚀 Open PromptNinja on Tablet
            </a>
            <p className="text-slate-400 mt-4 text-sm">Compatible with iPadOS, Android and Fire OS</p>
        </div>

        <SEOContentFAQ
            title="Frequently Asked Questions - Tablets and iPads"
            items={[
                {
                    question: "Works on old iPads (e.g. iPad 2)?",
                    answer: "Yes! Since we run in browser, compatibility is huge. If tablet opens modern sites, it runs PromptNinja. We gave new life to 2013 iPads sitting in drawers."
                },
                {
                    question: "Do I need a Bluetooth remote?",
                    answer: "Not necessarily. PromptNinja has exclusive Wi-Fi remote control system (P2P). Use your own phone to control tablet. But if you prefer, we also support bluetooth presenters and keyboards."
                },
                {
                    question: "How to mirror text for glass use?",
                    answer: "Very simple. Tap screen to open menu, click 'Settings' icon (gear) or find 'M' button (Mirror). Text flips horizontally instantly. This setting is saved for next time."
                },
                {
                    question: "Does app drain tablet battery?",
                    answer: "Very little. Being optimized and using black background (OLED friendly), consumption is minimal. We recommend using 70% brightness, which saves even more energy on AMOLED screens (Samsung) and lasts hours."
                },
                {
                    question: "What is ideal tablet size for teleprompter?",
                    answer: "Depends on distance. For use at 3 feet (desk), 7-8 inch tablets (iPad Mini) are great. For use at 6-10 feet (standing studio), we recommend 10 inches or more (iPad Air/Pro, Galaxy Tab S)."
                },
                {
                    question: "Can I import scripts from Word or Google Docs on tablet?",
                    answer: "Yes. Easiest way is copying text on PC/Phone and pasting in PromptNinja. If logged in (or using P2P Sync), text appears magically on tablet without needing to type on glass screen."
                },
                {
                    question: "Works with tablet vertical (Portrait) or only horizontal?",
                    answer: "Both! PromptNinja is responsive. Vertical is great for recording TikToks/Reels (narrow text, less eye movement). Horizontal is better for long YouTube videos and traditional glass setups."
                }
            ]}
        />
    </>
);
