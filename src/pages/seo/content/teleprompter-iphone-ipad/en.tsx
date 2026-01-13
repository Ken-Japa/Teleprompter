import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { SEOContentHowTo } from "../../../../components/seo/SEOContentHowTo";

export const TeleprompterIphoneIpadEN = () => (
    <>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Teleprompter for iPad and iPhone: Transform Your Device into a Professional Studio
        </h2>

        <p className="lead text-xl text-slate-300 mb-8 font-medium">
            The iPad is, without a doubt, the best physical tool for a teleprompter. Its high-definition retina display and generous size are ideal for clear reading, even from several feet away. But why pay for expensive App Store subscriptions when you can get the best performance for free?
        </p>

        <p className="text-slate-300 mb-8 leading-relaxed">
            In this guide, you will learn how to set up <strong>PromptNinja</strong> on your iPad for a TV studio experience. Discover how to save hundreds of dollars by ditching limited "freemium" apps and adopting our Web App technology. We'll show you how to sync your iPhone as a P2P remote control, configure mirror mode for professional equipment, and ensure you never miss a line in your videos or presentations.
        </p>

        <div className="bg-blue-600/10 border border-blue-500/20 rounded-2xl p-6 md:p-8 text-center mb-12 shadow-xl">
            <h3 className="text-2xl font-bold text-white mb-4">Unleash Your Device's Potential</h3>
            <p className="text-slate-300 mb-6 font-medium">
                Professionalism doesn't have to be expensive. Use the power of our PWA
                teleprompter directly in Safari and record like a pro today.
            </p>
            <a href="/?lang=en#app" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all hover:scale-105 shadow-lg shadow-blue-500/25">
                Launch PromptNinja on iOS Now
            </a>
            <p className="mt-4 text-sm text-slate-400 font-medium">No account needed. Works 100% offline.</p>
        </div>


        <div className="bg-gradient-to-r from-red-900/30 to-green-900/30 p-8 rounded-xl border border-slate-700 mb-12">
            <h3 className="text-3xl font-bold text-white mb-6">iOS Setup: App Store vs Web App</h3>
            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-slate-900/70 p-6 rounded-lg border border-red-500/30">
                    <h3 className="font-bold text-red-400 mb-4 flex items-center gap-2">
                        <span>❌</span> App Store Apps (Freemium Trap)
                    </h3>
                    <ul className="space-y-3 text-slate-300 text-sm">
                        <li>💰 <strong>Price:</strong> $9.99/week = $520/year</li>
                        <li>⏱️ <strong>Free tier:</strong> 60s text limit (useless)</li>
                        <li>📱 <strong>Installation:</strong> 250MB download + mandatory login</li>
                        <li>🔒 <strong>Data:</strong> Scripts sent to their cloud</li>
                        <li>💾 <strong>Storage:</strong> Occupies 500MB-1GB iPhone</li>
                    </ul>
                </div>
                <div className="bg-slate-900/70 p-6 rounded-lg border border-green-500/30">
                    <h3 className="font-bold text-green-400 mb-4 flex items-center gap-2">
                        <span>✅</span> PromptNinja (PWA Web App)
                    </h3>
                    <ul className="space-y-3 text-slate-300 text-sm">
                        <li>💰 <strong>Price:</strong> $0.00 (unlimited free)</li>
                        <li>⏱️ <strong>No limits:</strong> 50+ page scripts OK</li>
                        <li>📱 <strong>"Installation":</strong> Add to Home Screen (2s)</li>
                        <li>🔒 <strong>Data:</strong> 100% local (iOS localStorage)</li>
                        <li>💾 <strong>Storage:</strong> ~5MB cache (1% of an app)</li>
                    </ul>
                </div>
            </div>
            <p className="text-slate-400 text-sm mt-6 italic text-center">
                💡 Web App = save $520/year + total privacy.
            </p>
        </div>

        <h3 className="text-3xl font-bold text-white mt-12 mb-6">3 Professional iOS Setups</h3>
        <div className="space-y-6 mb-12">
            <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-cyan-500">
                <h3 className="text-xl font-bold text-cyan-400 mb-3">Setup #1: iPhone Solo (Vlog/TikTok)</h3>
                <p className="text-slate-300 mb-4">
                    <strong>Hardware:</strong> iPhone with tripod/gimbal.
                </p>
                <ol className="list-decimal list-inside space-y-2 text-slate-300 text-sm">
                    <li>Safari → PromptNinja.solutionkit.com.br</li>
                    <li>Share → <strong>Add to Home Screen</strong> (icon appears like app)</li>
                    <li>Paste script, font 28-32px</li>
                    <li>Position iPhone on tripod, front camera</li>
                    <li>PromptNinja below front camera (you read looking "at lens")</li>
                    <li>Record in native Camera app (ProRes/Cinematic)</li>
                </ol>
                <p className="text-green-400 text-sm mt-3">✅ <strong>Ideal for:</strong> Stories, vlogs, reels, vertical content.</p>
            </div>

            <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-purple-500">
                <h3 className="text-xl font-bold text-purple-400 mb-3">Setup #2: iPad + iPhone (Dual Device PRO)</h3>
                <p className="text-slate-300 mb-4">
                    <strong>Hardware:</strong> iPad (teleprompter) + iPhone (remote control).
                </p>
                <ol className="list-decimal list-inside space-y-2 text-slate-300 text-sm">
                    <li><strong>iPad:</strong> PromptNinja fullscreen, position below DSLR/mirrorless</li>
                    <li><strong>iPhone:</strong> Scan iPad QR code ("Remote" button in PromptNinja)</li>
                    <li>iPhone becomes instant wireless control (pause, speed, reset)</li>
                    <li>Record with DSLR looking at iPad = appear to look at camera</li>
                    <li>Hands-free during recording (scroll via iPhone)</li>
                </ol>
                <p className="text-green-400 text-sm mt-3">✅ <strong>Ideal for:</strong> Professional YouTube, online courses, corporate.</p>
            </div>

            <div className="bg-slate-800 p-6 rounded-lg border-l-4 border-red-500">
                <h3 className="text-xl font-bold text-red-400 mb-3">Setup #3: iPad + Mac via AirPlay (Wireless Mirror)</h3>
                <p className="text-slate-300 mb-4">
                    <strong>Hardware:</strong> MacBook + iPad + same WiFi network.
                </p>
                <ol className="list-decimal list-inside space-y-2 text-slate-300 text-sm">
                    <li><strong>Mac:</strong> Open PromptNinja in Safari/Chrome</li>
                    <li><strong>iPad:</strong> Control Center → Screen Mirroring → select Mac</li>
                    <li>Mac screen appears on iPad (wireless zero lag)</li>
                    <li>Control script from Mac, iPad only displays (like external monitor)</li>
                    <li>Position iPad below Mac webcam</li>
                </ol>
                <p className="text-yellow-400 text-sm mt-3">⚠️ <strong>Pro tip:</strong> Or use P2P direct (Mac = display, iPhone = remote) without AirPlay.</p>
            </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg my-8 border-l-4 border-green-500">
            <h3 className="text-2xl font-bold text-white mb-4">PWA on iOS: "Native" App Without App Store</h3>
            <p className="text-slate-300 mb-4">
                iOS has PWA (Progressive Web App) since 2018. PromptNinja becomes "native app" in 3 taps:
            </p>
            <SEOContentHowTo
                title=""
                schemaTitle="How to Install Teleprompter on iPhone/iPad (PWA)"
                totalTime="PT1M"
                tools={["iPhone or iPad", "Safari"]}
                steps={[
                    {
                        title: "Step 1: Open in Safari",
                        text: "Access promptninja.solutionkit.com.br IN SAFARI (Chrome iOS doesn't support PWA)."
                    },
                    {
                        title: "Step 2: Share → Add to Home Screen",
                        text: "Tap Share icon (square with arrow) → 'Add to Home Screen' → Confirm."
                    },
                    {
                        title: "Step 3: Open as App",
                        text: "PromptNinja icon appears on Home Screen. Opens fullscreen, looks like native app, works offline."
                    }
                ]}
            />
            <p className="text-green-400 text-sm mt-4">
                ✅ <strong>PWA Benefits:</strong> (1) Fullscreen without Safari bar, (2) Works offline, (3) Nice icon on Home, (4) Zero space (only cache), (5) Auto-updates.
            </p>
        </div>

        <h3 className="text-3xl font-bold text-white mt-12 mb-6">5 Fatal iOS Errors That Kill Professionalism</h3>
        <div className="space-y-4 mb-12">
            <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-red-500">
                <h4 className="font-bold text-red-400 mb-2">Error #1: Using Chrome iOS for PWA (Doesn't Work)</h4>
                <p className="text-slate-300 text-sm">
                    Open PromptNinja in Chrome iOS. Try "Add to Home Screen"... option disabled. Chrome iOS = just Safari wrapper WITHOUT PWA support.
                    <span className="text-green-400 block mt-2">✅ <strong>Solution:</strong> USE SAFARI. Only iOS browser with real PWA. Chrome/Firefox iOS = limited by Apple.</span>
                </p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-red-500">
                <h4 className="font-bold text-red-400 mb-2">Error #2: iPad Too Far from Camera (Looking Sideways)</h4>
                <p className="text-slate-300 text-sm">
                    iPad 3 feet to the LEFT of DSLR mirrorless. You record looking 60º sideways. Looks like awkward interview where you never look at interviewer.
                    <span className="text-green-400 block mt-2">✅ <strong>Solution:</strong> iPad DIRECTLY below or behind lens. Maximum 6 inches distance. Eyes read = appear to look at camera.</span>
                </p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-red-500">
                <h4 className="font-bold text-red-400 mb-2">Error #3: Low Screen Brightness (Reflection in Glasses Disappears)</h4>
                <p className="text-slate-300 text-sm">
                    iPad brightness 30% to "save battery during recording". Text barely visible. You bring face close = bad posture. Or increase font = giant obvious text.
                    <span className="text-green-400 block mt-2">✅ <strong>Solution:</strong> Brightness 80-100% during recording. iPad plugged in (don't depend on battery). Visible text = natural posture.</span>
                </p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-red-500">
                <h4 className="font-bold text-red-400 mb-2">Error #4: Ignoring "Do Not Disturb" Mode (Notification Mid-Record)</h4>
                <p className="text-slate-300 text-sm">
                    Perfect 5min take. WhatsApp notification COVERS text. You stop, lose line, re-record everything. 5min wasted.
                    <span className="text-green-400 block mt-2">✅ <strong>Solution:</strong> ALWAYS activate "Do Not Disturb" before recording (Control Center → Moon). Or use Focus Mode "Recording".</span>
                </p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-red-500">
                <h4 className="font-bold text-red-400 mb-2">Error #5: Forgetting Safari Goes Back to Previous Tab (Loses Position)</h4>
                <p className="text-slate-300 text-sm">
                    Recording. Safari has PromptNinja open. You accidentally swipe back to Google. When you return to PromptNinja... text reset to beginning. Lost position.
                    <span className="text-green-400 block mt-2">✅ <strong>Solution:</strong> Use PWA (Add to Home Screen) = opens in dedicated app, NEVER mixes with Safari tabs. Or lock screen (Guided Access).</span>
                </p>
            </div>
        </div>

        <h3 className="text-2xl font-bold text-white mt-8 mb-4">Exclusive iOS Features</h3>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-2">🎥 ProRes Recording</h3>
                <p className="text-sm text-slate-300">iPhone 13 Pro+: Record 4K ProRes WHILE reading from teleprompter. PromptNinja in background = zero interference with ProRes codec.</p>
            </div>
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-2">📱 Handoff (Continuity)</h3>
                <p className="text-sm text-slate-300">Start script on Mac. Pick up iPhone. Notification "Continue from Mac" = opens EXACT same point. Apple ecosystem magic.</p>
            </div>
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-2">✈️ Airplane Mode OK</h3>
                <p className="text-sm text-slate-300">PWA works 100% offline. Record on plane, forest, anywhere. Only needs WiFi for P2P remote control (optional).</p>
            </div>
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-2">🎨 Dynamic Island Friendly</h3>
                <p className="text-sm text-slate-300">iPhone 14 Pro+: PromptNinja respects Dynamic Island. Text doesn't go below it. Layout adapts automatically.</p>
            </div>
        </div>

        <h3 className="text-2xl font-bold text-white mt-8 mb-4">P2P Remote Control (iPhone ↔ iPad)</h3>
        <p className="mb-4">
            Most popular setup: iPad = teleprompter display, iPhone = wireless control.
        </p>
        <ol className="list-decimal list-inside space-y-2 mb-6 text-slate-300">
            <li><strong>iPad:</strong> PromptNinja open, tap "Remote" button → QR code appears</li>
            <li><strong>iPhone:</strong> Native Camera scan QR code → opens PromptNinja in Remote mode</li>
            <li>Devices connect via LOCAL WiFi (P2P WebRTC)</li>
            <li>iPhone controls: Play/Pause, Speed ↑↓, Reset, Skip paragraph</li>
            <li>Latency less than 50ms (imperceptible)</li>
        </ol>
        <p className="text-yellow-400 text-sm">💡 <strong>Pro tip:</strong> Works WITHOUT internet. Just needs both on same WiFi network (or iPhone hotspot).</p>

        <div className="text-center bg-slate-800 p-8 rounded-lg my-10">
            <h3 className="text-3xl font-bold text-white mb-4">📱 Transform Your iPhone/iPad Now</h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                PRO camera deserves PRO teleprompter. Zero App Store, zero subscription, zero limits.
            </p>
            <a
                href="/?lang=en#app"
                className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 font-bold py-3 px-8 rounded-full transition hover:brightness-110"
                style={{ color: 'white' }}
            >
                🚀 Open in Safari (Add to Home Screen)
            </a>
            <p className="text-slate-400 mt-4 text-sm">PWA • Offline • P2P Remote • Unlimited free</p>
        </div>

        <SEOContentFAQ
            title="Frequently Asked Questions - iPhone/iPad Users"
            items={[
                {
                    question: "Do I need to download app from App Store?",
                    answer: "NO. PromptNinja is Web App (PWA). Access in Safari → 'Add to Home Screen' = becomes VISUAL native app (fullscreen, icon, offline). But technically didn't download anything from App Store. Savings: $520/year vs paid apps."
                },
                {
                    question: "Does it work offline (no internet)?",
                    answer: "YES! After loading once, stays in iOS cache. Works in airplane mode, subway, forest. Scripts saved in localStorage (on your iPhone). Only needs internet for: (1) first load and (2) P2P remote control (optional)."
                },
                {
                    question: "Can I control iPad using iPhone (2 devices)?",
                    answer: "EXACTLY! Favorite setup: iPad = large display (below DSLR camera), iPhone = wireless remote control (in hand, in pocket, anywhere). Scan QR code = instant connection via local WiFi. Latency less than 50ms."
                },
                {
                    question: "Why use Safari and not Chrome iOS?",
                    answer: "Chrome/Firefox iOS = Safari wrappers limited by Apple. DON'T support real PWA (Add to Home Screen disabled). Safari = ONLY with complete PWA: offline, fullscreen, notifications, unlimited localStorage."
                },
                {
                    question: "Does it drain battery during long recording?",
                    answer: "~5-8% battery per hour (less than YouTube). iPhone 15 Pro (3200mAh battery) = ~4h continuous use. Pro tip: Plug iPad into power if recording >2h. 100% brightness uses more, but text is visible = better posture."
                },
                {
                    question: "Can I record ProRes/Cinematic Mode WHILE using teleprompter?",
                    answer: "YES! PromptNinja runs in background. Record in native Camera app (ProRes, Cinematic, Action Mode) while Safari/PWA is open. iOS manages RAM automatically. Tested iPhone 13 Pro+ = zero issues."
                },
                {
                    question: "Does text appear inverted (mirror mode) for use with DIY glass?",
                    answer: "YES! Settings → Mirror Mode = text mirrors horizontally. Perfect for DIY setup: iPad behind semi-transparent glass (beam splitter). You read through glass, camera sees your face WITHOUT seeing iPad."
                },
                {
                    question: "Can I use with AirPlay (iPad → Mac/Apple TV)?",
                    answer: "YES but unnecessary. Better use P2P direct (Mac teleprompter, iPhone remote). AirPlay adds ~200ms lag. P2P = less than 50ms. Both same WiFi network, but P2P WebRTC much more responsive than AirPlay Mirroring."
                }
            ]}
        />
    </>
);
