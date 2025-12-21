
import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { SEOContentHowTo } from "../../../../components/seo/SEOContentHowTo";

export const PrivacidadeSegurancaEN = () => (
    <>
        <h1 className="text-4xl font-bold text-white mb-6 leading-tight">Privacy & Security: Why We Don't Want Your Data</h1>

        <div className="bg-red-900/20 border border-red-500/30 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-bold text-red-400 mb-2">🚫 The Industry Problem</h2>
            <p className="text-slate-300">
                Most "free" teleprompter apps require you to create an account. Why? To track your habits, read your scripts to train AI, or sell your email. They treat you as the product.
            </p>
        </div>

        <p className="mb-6 text-xl text-slate-300">
            At PromptNinja, we adopt a radical <strong>Zero Data</strong> architecture.
        </p>

        <p className="mb-8">
            We don't know who you are. We don't have your emails. We don't have your scripts. Everything you write is magnetically recorded on the memory chip of <strong>your own device</strong>, and nowhere else.
        </p>

        <div className="grid md:grid-cols-2 gap-8 my-12">

            <div className="bg-slate-800 p-8 rounded-xl border border-green-500/30 shadow-lg">
                <h2 className="text-2xl font-bold text-green-400 mb-4 flex items-center gap-3">
                    <span className="text-3xl">🛡️</span> "Local-First" Architecture
                </h2>
                <p className="text-slate-300 mb-4">
                    We use technology called <code>LocalStorage</code> and <code>IndexedDB</code>. It's like a vault inside your browser.
                </p>
                <div className="space-y-4">
                    <div className="flex items-start gap-3">
                        <span className="text-green-500 text-xl">✅</span>
                        <p className="text-sm text-slate-300"><strong>Your Scripts:</strong> Saved only on your HD/Phone.</p>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="text-green-500 text-xl">✅</span>
                        <p className="text-sm text-slate-300"><strong>Your Microphone:</strong> Audio is processed in real-time RAM and discarded. Nothing is recorded.</p>
                    </div>
                    <div className="flex items-start gap-3">
                        <span className="text-green-500 text-xl">✅</span>
                        <p className="text-sm text-slate-300"><strong>Leaks:</strong> Impossible to leak your data, because we don't have it.</p>
                    </div>
                </div>
            </div>

            <div className="bg-slate-800 p-8 rounded-xl border border-blue-500/30">
                <h2 className="text-2xl font-bold text-blue-400 mb-4 flex items-center gap-3">
                    <span className="text-3xl">📡</span> Shielded P2P Connection
                </h2>
                <p className="text-slate-300 mb-4">
                    "But how does the phone control the PC if it doesn't go through the server?"
                </p>
                <p className="text-sm text-slate-400 mb-4">
                    We use <strong>WebRTC</strong>. Our server acts only as a "phone book": it introduces your phone's IP to your PC. After this initial "handshake" (which lasts milliseconds), the server leaves the conversation.
                </p>
                <div className="bg-black/30 p-4 rounded border border-slate-700">
                    <p className="text-xs text-slate-400 font-mono">
                        [Phone] &lt;========== Encrypted Tunnel (DTLS) ==========&gt; [PC]
                    </p>
                    <p className="text-xs text-green-500 mt-2 font-mono">Status: Direct Link (No Middleman)</p>
                </div>
            </div>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Audit: How to verify?</h2>
        <p className="text-slate-300 mb-6">
            Don't trust us. Trust the technology. Take the "Airplane Mode" test:
        </p>

        <SEOContentHowTo
            title=""
            schemaTitle="How to Verify PromptNinja Privacy"
            totalTime="PT1M"
            tools={["Browser", "PromptNinja"]}
            steps={[
                {
                    title: "1. Load App",
                    text: "Open PromptNinja and write a secret in the editor."
                },
                {
                    title: "2. Cut Internet",
                    text: "Unplug network cable or turn off Wi-Fi."
                },
                {
                    title: "3. Test",
                    text: "Keep using it. Does app work 100%? Yes. If we were sending your data to NSA cloud, app would freeze or give connection error."
                },
                {
                    title: "4. Total Wipe",
                    text: "Want to delete everything? Just clear browser cache or click 'Trash' icon in app. Data is digitally shredded from your device."
                }
            ]}
        />

        <div className="mt-12 p-6 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <h3 className="text-lg font-bold text-yellow-500 mb-2">Pledge to Journalists & Business</h3>
            <p className="text-slate-300">
                We know many PromptNinja users are reporters covering sensitive stories or CEOs recording internal memos. Our "No-Login" guarantee is your biggest legal and technical protection against industrial espionage or scoop leaks.
            </p>
        </div>


        <SEOContentFAQ
            title="Privacy FAQ"
            items={[
                {
                    question: "Does PromptNinja use Cookies?",
                    answer: "Only technical cookies essential to save your preferences (font size, speed) locally. We do not use intrusive third-party tracking cookies."
                },
                {
                    question: "If my computer breaks, do I lose my scripts?",
                    answer: "Yes. Since we don't have a copy in the cloud, you are the sole owner of data. We recommend you always have your original script saved in Word/Docs as backup."
                },
                {
                    question: "Is voice recognition sent to Google?",
                    answer: "Depends on browser. In Chrome, voice processing may pass through Google servers for higher accuracy (browser's own policy). If absolute privacy is vital, we recommend using only manual or automatic scroll mode, without activating microphone."
                }
            ]}
        />
    </>
);
