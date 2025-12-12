
export const ComoInstalarPwaEN = () => (
    <>
        <h1 className="text-4xl font-bold text-white mb-6">How to Install PromptNinja (PWA App)</h1>
        <p className="mb-6 text-xl text-slate-300">
            PromptNinja is a <strong>Progressive Web App (PWA)</strong>. This means you can install it directly from your browser without visiting the App Store or Play Store. It's lighter, faster, and works offline.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mt-12">

            {/* iOS Guide */}
            <div className="bg-slate-800 p-8 rounded-xl border border-slate-700">
                <div className="flex items-center gap-4 mb-6">
                    <span className="text-5xl">🍎</span>
                    <h2 className="text-2xl font-bold text-white">iPhone / iPad (iOS)</h2>
                </div>
                <ol className="space-y-6 text-slate-300 list-decimal pl-5 marker:text-blue-500 marker:font-bold">
                    <li>
                        Open <strong>PromptNinja</strong> in <strong>Safari</strong>.
                        <p className="text-sm text-slate-400 mt-1">(PWAs only install via Safari on iOS)</p>
                    </li>
                    <li>
                        Tap the <strong>Share</strong> button (square with arrow up icon) in the bottom bar.
                    </li>
                    <li>
                        Scroll down and tap <strong>"Add to Home Screen"</strong>.
                    </li>
                    <li>
                        Tap <strong>Add</strong> in the top right corner.
                    </li>
                </ol>
                <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg text-sm text-blue-200">
                    <strong>Tip:</strong> Once installed, PromptNinja looks and behaves like a native app on your home screen, running in full screen without browser bars.
                </div>
            </div>

            {/* Android Guide */}
            <div className="bg-slate-800 p-8 rounded-xl border border-slate-700">
                <div className="flex items-center gap-4 mb-6">
                    <span className="text-5xl">🤖</span>
                    <h2 className="text-2xl font-bold text-white">Android (Chrome)</h2>
                </div>
                <ol className="space-y-6 text-slate-300 list-decimal pl-5 marker:text-green-500 marker:font-bold">
                    <li>
                        Open <strong>PromptNinja</strong> in <strong>Google Chrome</strong>.
                    </li>
                    <li>
                        Tap the <strong>Menu</strong> button (three dots) in the top right corner.
                    </li>
                    <li>
                        Tap <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.
                    </li>
                    <li>
                        Confirm by tapping <strong>Install</strong>.
                    </li>
                </ol>
                <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-sm text-green-200">
                    <strong>Tip:</strong> The app is extremely lightweight (under 2MB) and updates automatically whenever you open it while connected to the internet.
                </div>
            </div>

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
    </>
);
