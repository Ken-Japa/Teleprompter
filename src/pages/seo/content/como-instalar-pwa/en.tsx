import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { SEOContentHowTo } from "../../../../components/seo/SEOContentHowTo";

export const ComoInstalarPwaEN = () => (
    <>
        <h1 className="text-4xl font-bold text-white mb-6">How to Install PromptNinja (PWA App)</h1>
        <p className="mb-6 text-xl text-slate-300">
            PromptNinja is a <strong>Progressive Web App (PWA)</strong>. This means you can install it directly from your browser without visiting the App Store or Play Store. It's lighter, faster, and works offline.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mt-12">

            {/* iOS Guide */}
            <SEOContentHowTo
                title="iPhone / iPad (iOS)"
                schemaTitle="How to Install PromptNinja on iPhone (iOS)"
                steps={[
                    {
                        title: "Step 1",
                        text: "Open PromptNinja in Safari. (Note: PWAs only install via Safari on iOS)."
                    },
                    {
                        title: "Step 2",
                        text: "Tap the Share button (square with arrow up icon) in the bottom bar."
                    },
                    {
                        title: "Step 3",
                        text: "Scroll down and tap \"Add to Home Screen\"."
                    },
                    {
                        title: "Step 4",
                        text: "Tap Add in the top right corner."
                    }
                ]}
                className="bg-slate-800 p-8 rounded-xl border border-slate-700 h-full"
            />

            {/* Android Guide */}
            <SEOContentHowTo
                title="Android (Chrome)"
                schemaTitle="How to Install PromptNinja on Android"
                steps={[
                    {
                        title: "Step 1",
                        text: "Open PromptNinja in Google Chrome."
                    },
                    {
                        title: "Step 2",
                        text: "Tap the Menu button (three dots) in the top right corner."
                    },
                    {
                        title: "Step 3",
                        text: "Tap \"Install app\" or \"Add to Home screen\"."
                    },
                    {
                        title: "Step 4",
                        text: "Confirm by tapping Install."
                    }
                ]}
                className="bg-slate-800 p-8 rounded-xl border border-slate-700 h-full"
            />

        </div>

        <div className="mt-16 bg-slate-800/50 p-8 rounded-xl text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Why install the PWA?</h2>
            <div className="grid sm:grid-cols-3 gap-6 text-left mt-8">
                <div>
                    <h3 className="text-lg font-bold text-purple-400 mb-2">⚡ Native Performance</h3>
                    <p className="text-slate-400 text-sm">Instant loading and smooth navigation, just like a store app.</p>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-blue-400 mb-2">📶 Works Offline</h3>
                    <p className="text-slate-400 text-sm">No internet? No problem. The app caches necessary resources to work anywhere.</p>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-green-400 mb-2">💾 Space Saving</h3>
                    <p className="text-slate-400 text-sm">Takes up a fraction of the space of a conventional app. Less memory, more efficiency.</p>
                </div>
            </div>
        </div>

        <SEOContentFAQ
            title="Installation FAQs (PWA)"
            items={[
                {
                    question: "Is it safe? Any viruses?",
                    answer: "Yes, 100% safe. PWAs run inside the browser's sandbox, meaning they don't have access to your personal files or system without your permission."
                },
                {
                    question: "Does it work without internet?",
                    answer: "Yes. After installation (or first visit), the app saves essential files to your device to work offline."
                },
                {
                    question: "Does it take much space?",
                    answer: "No. Unlike native apps that can weigh 100MB+, PromptNinja usually takes less than 2MB, as it reuses browser resources."
                }
            ]}
        />
    </>
);
