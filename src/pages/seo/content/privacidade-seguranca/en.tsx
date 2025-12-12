
export const PrivacidadeSegurancaEN = () => (
    <>
        <h1 className="text-4xl font-bold text-white mb-6">Privacy & Security: How PromptNinja Protects Your Data</h1>
        <p className="mb-6 text-xl text-slate-300">
            In a world where your data is currency, PromptNinja takes a radical stance: <strong>we don't want your data</strong>. Our architecture was built from the ground up to ensure your scripts and presentations remain private and under your control.
        </p>

        <div className="grid md:grid-cols-2 gap-8 my-12">

            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">🚫</span> No Login, No Trace
                </h2>
                <p className="text-slate-300 mb-4">
                    Most services require you to create an account so they can track your usage and store your data. PromptNinja does not.
                </p>
                <ul className="list-disc pl-5 text-slate-300 space-y-2">
                    <li>No email or password required.</li>
                    <li>No user database.</li>
                    <li>What you type in the browser, stays in the browser.</li>
                </ul>
            </div>

            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">🔒</span> Local Processing
                </h2>
                <p className="text-slate-300 mb-4">
                    All text processing happens on your device (Client-side).
                </p>
                <ul className="list-disc pl-5 text-slate-300 space-y-2">
                    <li>Your scripts are <strong>never</strong> sent to our servers.</li>
                    <li>If your internet goes down, the teleprompter keeps working.</li>
                    <li>When you close the tab, data is wiped from memory (unless you explicitly save it).</li>
                </ul>
            </div>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">The Magic of WebRTC & P2P</h2>
        <p className="text-slate-300 mb-6">
            To allow you to control the teleprompter with your phone, we use advanced technology called <strong>WebRTC (Web Real-Time Communication)</strong>. This creates a direct tunnel between your computer and your phone.
        </p>

        <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-xl">
            <h3 className="text-xl font-bold text-blue-400 mb-4">How P2P (Peer-to-Peer) works:</h3>
            <ol className="relative border-l border-slate-700 ml-4 space-y-8">
                <li className="mb-10 ml-6">
                    <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-900 rounded-full -left-4 ring-4 ring-slate-900 text-blue-300 font-bold">1</span>
                    <h4 className="font-bold text-white text-lg">Handshake</h4>
                    <p className="text-slate-400 mt-2">
                        We use a signaling server only to introduce your phone to your computer. It exchanges temporary encrypted codes so the devices can find each other. <strong>No script data passes through here.</strong>
                    </p>
                </li>
                <li className="mb-10 ml-6">
                    <span className="absolute flex items-center justify-center w-8 h-8 bg-green-900 rounded-full -left-4 ring-4 ring-slate-900 text-green-300 font-bold">2</span>
                    <h4 className="font-bold text-white text-lg">Direct Tunnel</h4>
                    <p className="text-slate-400 mt-2">
                        Once connected, the devices create a direct encrypted tunnel (DTLS). From this moment on, communication is 100% direct between them, without passing through any intermediate server.
                    </p>
                </li>
                <li className="ml-6">
                    <span className="absolute flex items-center justify-center w-8 h-8 bg-purple-900 rounded-full -left-4 ring-4 ring-slate-900 text-purple-300 font-bold">3</span>
                    <h4 className="font-bold text-white text-lg">Zero Latency & Total Security</h4>
                    <p className="text-slate-400 mt-2">
                        Since data travels only on your local network (or directly via internet P2P), the response is instant and impossible to intercept en masse.
                    </p>
                </li>
            </ol>
        </div>

        <div className="mt-12 p-6 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <h3 className="text-lg font-bold text-yellow-500 mb-2">Security Summary</h3>
            <p className="text-slate-300">
                Your scripts are yours. PromptNinja is just the tool that displays them. We don't see, store, or sell your texts. It's security by design, not by policy.
            </p>
        </div>
    </>
);
