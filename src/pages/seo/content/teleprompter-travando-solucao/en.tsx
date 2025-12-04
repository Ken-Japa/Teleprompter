export const TeleprompterTravandoSolucaoEN = () => (
    <>
        <h1 className="text-4xl font-bold text-white mb-6">Teleprompter Freezing: Why It Happens and How to Fix It</h1>

        <p className="mb-6">
            There's nothing worse than being in the middle of a perfect take and the teleprompter text freezes or jumps abruptly. This breaks your rhythm and ruins the video.
        </p>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Why do traditional apps freeze?</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>CPU Usage:</strong> Poorly optimized apps consume a lot of battery and processing power.</li>
            <li><strong>Unstable Bluetooth Connection:</strong> Many bluetooth remote controls lose connection and cause "lags" in scrolling.</li>
            <li><strong>Slow Internet Dependency:</strong> Old online teleprompters rely on slow servers to sync.</li>
        </ul>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">PromptNinja's P2P Solution</h2>
        <p className="mb-4">
            PromptNinja uses a different technology called WebRTC Data Channels (P2P). This creates a direct "tunnel" between your phone (remote) and your computer (screen), via your local Wi-Fi network.
        </p>
        <p className="mb-6">
            <strong>The result?</strong> Near zero latency. When you press "pause" on your phone, the text stops instantly on the screen. Scrolling is smooth (60fps) because we use the modern browser rendering engine.
        </p>

        <div className="bg-slate-900 p-6 rounded border-l-4 border-red-500 mb-8">
            <h3 className="text-lg font-bold text-white mb-2">Stop suffering from freezing</h3>
            <p className="text-slate-300">
                Test PromptNinja's smoothness now. Your eyes (and your audience) will thank you.
            </p>
        </div>
    </>
);
