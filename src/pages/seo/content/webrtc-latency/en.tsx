import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";

export const WebRtcLatencyContentEN = () => (
    <>
        <h1 className="text-4xl font-bold text-white mb-6 leading-tight">Why is PromptNinja Faster Than Bluetooth? (The Science of Latency)</h1>

        <p className="lead text-xl text-slate-300 mb-8">
            You press "Pause". Text keeps scrolling for another half second. You get lost. Need to re-record.
            This invisible delay is called <strong>latency</strong>, and it is the #1 enemy of flow.
        </p>

        <div className="bg-slate-800 p-8 rounded-xl border border-blue-500/30 mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Data Race: Satellite vs Local</h2>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-red-900/10 p-4 rounded border border-red-500/20 opacity-70">
                    <h3 className="font-bold text-red-400 mb-2">🐢 Traditional Apps (Cloud)</h3>
                    <div className="font-mono text-xs text-slate-400 mb-2">
                        [Phone] ➡️ [Router] ➡️ [ISP] ➡️ [Server USA] ➡️ [Processing] ➡️ [Back to You] ➡️ [PC]
                    </div>
                    <p className="text-slate-300 text-sm">
                        It's like sending a letter to your neighbor via international mail. Signal travels 6,000 miles to move 6 feet.
                        <br /><span className="font-bold text-red-400">Latency: 200ms - 800ms</span> (Noticeable)
                    </p>
                </div>

                <div className="bg-green-900/10 p-4 rounded border border-green-500/50">
                    <h3 className="font-bold text-green-400 mb-2">🚀 PromptNinja (WebRTC P2P)</h3>
                    <div className="font-mono text-xs text-slate-400 mb-2">
                        [Phone] ➡️ [Wi-Fi Router] ➡️ [PC]
                    </div>
                    <p className="text-slate-300 text-sm">
                        It's like shouting through the window. Signal never leaves your house. It travels at speed of light through your local Wi-Fi.
                        <br /><span className="font-bold text-green-400">Latency: &lt; 10ms</span> (Instant)
                    </p>
                </div>
            </div>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Why do milliseconds matter?</h2>
        <p className="text-slate-300 mb-6">
            Human brain perceives any delay above 100ms as "lag".
        </p>
        <ul className="list-disc pl-6 mb-8 text-slate-300 space-y-3">
            <li><strong>Lip Sync:</strong> If you read and text doesn't follow, you start speaking slower unconsciously, sounding "robotic".</li>
            <li><strong>Subtle Adjustments:</strong> With zero latency, you can slightly speed up on easy parts and brake on hard words in real-time, like driving a sports car.</li>
            <li><strong>Confidence:</strong> Knowing the "Pause" button works instantly removes anxiety from live recording.</li>
        </ul>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Technology Under the Hood</h2>
        <p className="text-slate-300 mb-6">
            We use <strong>WebRTC Data Channels</strong> with UDP protocol.
        </p>

        <div className="grid sm:grid-cols-2 gap-6 mb-12">
            <div className="bg-slate-800 p-5 rounded-lg border-l-4 border-purple-500">
                <h3 className="font-bold text-white mb-2">No Server in the Middle</h3>
                <p className="text-sm text-slate-400">
                    Our servers just "introduce" the devices (like a dating app). After the match, they leave the chat and leave you alone. Fewer middlemen = Less Lag.
                </p>
            </div>
            <div className="bg-slate-800 p-5 rounded-lg border-l-4 border-yellow-500">
                <h3 className="font-bold text-white mb-2">UDP Protocol (Pure Speed)</h3>
                <p className="text-sm text-slate-400">
                    Most web uses TCP (safe but slow). We use UDP for controls. It doesn't waste time checking delivery receipts. It just delivers the "PLAY" order immediately.
                </p>
            </div>
        </div>

        <SEOContentFAQ
            title="Technical Latency FAQ"
            items={[
                {
                    question: "Does it work if internet is slow?",
                    answer: "Yes! PromptNinja latency depends on your Wi-Fi Router quality, not your ISP internet speed. If router is good, connection is instant even with dial-up internet."
                },
                {
                    question: "Why does it sometimes take long to connect?",
                    answer: "Initial 'Handshake' process (finding devices) can take a few seconds depending on corporate firewalls. But once connected, control latency drops to zero."
                },
                {
                    question: "Is it faster than physical Bluetooth remote?",
                    answer: "Surprisingly, yes or equal. Cheap Bluetooth remotes have hardware 'input lag' and driver processing. Modern local Wi-Fi (5Ghz) is absurdly fast and stable for small data transmission like text commands."
                }
            ]}
        />
    </>
);
