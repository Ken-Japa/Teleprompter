import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { SEOContentHowTo } from "../../../../components/seo/SEOContentHowTo";

export const ComoInstalarPwaEN = () => (
    <>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            How to Install the PromptNinja (PWA) - iPhone and Android
        </h1>

        <p className="lead text-xl text-slate-300 mb-8 font-medium">
            Learn how to install PromptNinja as a native app on your iPhone or Android. Enjoy better performance, offline mode, and a professional full-screen experience.
        </p>

        <p className="text-slate-300 mb-8 font-medium">
            Searched the App Store or Play Store and found nothing? Relax, that's a <strong>feature</strong>, not a bug.
        </p>

        <p className="text-slate-300 mb-8">
            PromptNinja is an <strong>Elite Progressive Web App (PWA)</strong>. It has the power of a native app (works offline, full screen, no lag) but without the store bureaucracy. You install it directly from your browser, in seconds, without eating up your phone's storage.
        </p>

        <div className="bg-blue-600/10 border border-blue-500/20 rounded-2xl p-6 md:p-8 text-center mb-12">
            <h3 className="text-2xl font-bold text-white mb-4">Install PromptNinja in 5 Seconds</h3>
            <p className="text-slate-300 mb-6">
                Get native app performance directly on your phone or computer. Zero storage usage,
                instant updates, and 100% functionality even offline.
            </p>
            <a href="/?lang=en#app" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all hover:scale-105 shadow-lg shadow-blue-500/25">
                Check Installation Steps
            </a>
            <p className="mt-4 text-sm text-slate-400">Available for iPhone, iPad, Android, Mac, and Windows.</p>
        </div>

        <div className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 p-8 rounded-xl border border-purple-500/30 mb-12">
            <h3 className="text-2xl font-bold text-white mb-4">Why is this better?</h3>
            <div className="grid sm:grid-cols-3 gap-6">
                <div className="bg-slate-900/50 p-4 rounded-lg">
                    <h3 className="text-lg font-bold text-green-400 mb-2">💾 Extreme Lightness</h3>
                    <p className="text-slate-400 text-sm">Teleprompter apps weigh ~150MB avg. Installed PromptNinja weighs under <strong>2MB</strong>. More space for your 4K videos.</p>
                </div>
                <div className="bg-slate-900/50 p-4 rounded-lg">
                    <h3 className="text-lg font-bold text-blue-400 mb-2">📱 True Full Screen</h3>
                    <p className="text-slate-400 text-sm">Upon install, Safari/Chrome address bars vanish. You get 15% more screen real estate for your script.</p>
                </div>
                <div className="bg-slate-900/50 p-4 rounded-lg">
                    <h3 className="text-lg font-bold text-purple-400 mb-2">⚡ Offline First</h3>
                    <p className="text-slate-400 text-sm">Recording in the wild? No problem. Once installed, the app opens instantly even without Wi-Fi signal.</p>
                </div>
            </div>
        </div>

        <h3 className="text-3xl font-bold text-white mb-8">Step-by-Step Installation Guide</h3>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* iOS Guide */}
            <SEOContentHowTo
                title="🍎 iPhone / iPad (Safari)"
                schemaTitle="How to Install PromptNinja on iPhone (iOS)"
                steps={[
                    {
                        title: "1. Use Safari",
                        text: "PWAs on iPhone work best on Safari. Open 'promptninja.solutionkit.com.br'."
                    },
                    {
                        title: "2. Share Button",
                        text: "Tap the middle icon on the bottom bar (a square with an arrow pointing up)."
                    },
                    {
                        title: "3. The Secret",
                        text: "Scroll down until you find 'Add to Home Screen'. Careful: It's NOT 'Add to Bookmark'."
                    },
                    {
                        title: "4. Confirm",
                        text: "Tap 'Add' on top right. The purple icon will appear on your home screen."
                    }
                ]}
                className="bg-slate-800 p-8 rounded-xl border-l-4 border-slate-500 h-full"
            />

            {/* Android Guide */}
            <SEOContentHowTo
                title="🤖 Android (Chrome/Samsung)"
                schemaTitle="How to Install PromptNinja on Android"
                steps={[
                    {
                        title: "1. Auto Notification",
                        text: "Often a bar appears at bottom: 'Add PromptNinja to Home Screen'. If so, just tap it!"
                    },
                    {
                        title: "2. Manual Menu",
                        text: "If not, tap the three dots (⋮) on Chrome's top right corner."
                    },
                    {
                        title: "3. Install",
                        text: "Look for 'Install App' or 'Add to Home Screen' in the menu."
                    },
                    {
                        title: "4. Ready",
                        text: "System will create a lightweight APK and install it like a native app."
                    }
                ]}
                className="bg-slate-800 p-8 rounded-xl border-l-4 border-green-500 h-full"
            />
        </div>

        <div className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-6">💻 On Desktop (PC / Mac)</h3>
            <div className="bg-slate-800 p-6 rounded-xl border border-blue-500/30">
                <p className="text-slate-300 mb-4">
                    Yes, you can install on desktop too! This places PromptNinja icon on your Taskbar or Dock, and runs it in an independent window (distraction-free).
                </p>
                <ul className="space-y-4 text-slate-300">
                    <li className="flex gap-3 items-start">
                        <span className="bg-blue-900 text-blue-300 rounded px-2 font-bold">Chrome/Edge:</span>
                        <span>Look at the right side of address bar (URL). You'll see a small icon of a <strong>computer with down arrow</strong> ⬇️. Click it and then 'Install'.</span>
                    </li>
                </ul>
            </div>
        </div>

        <SEOContentFAQ
            title="PWA FAQ"
            items={[
                {
                    question: "Is it safe? Viruses?",
                    answer: "Safer than normal apps. PWAs run isolated in browser's 'sandbox'. They cannot access your contacts, photos, or system files unless you explicitly authorize each action."
                },
                {
                    question: "How do I update?",
                    answer: "Best part: it auto-updates. Whenever you open app connected to internet, it downloads latest version in milliseconds. You'll never see 'Updating...' bars again."
                },
                {
                    question: "Can't find install button on iPhone.",
                    answer: "Make sure you are using **Safari**. Chrome on iOS sometimes hides this option due to Apple restrictions. In Safari, 'Add to Home Screen' is hidden inside Share menu."
                }
            ]}
        />
    </>
);
