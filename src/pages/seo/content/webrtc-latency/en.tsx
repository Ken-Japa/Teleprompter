import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";

export const WebRtcLatencyContentEN = () => (
    <>
        <h1 className="text-4xl font-bold text-white mb-6">FREE Autocue / Teleprompter: Why WebRTC P2P Guarantees Zero Lag and Total Privacy</h1>
        <p className="lead text-xl text-slate-300 mb-8">
            You hit the "pause" button on the remote. The text keeps scrolling for another half-second. You lose your place, stutter, and have to re-record.
            This "lag" (latency) is every presenter's nightmare. In this technical article, we explain how WebRTC technology has solved this problem for good.
        </p>

        <h2>The Bluetooth Latency Problem</h2>
        <p>
            Most teleprompters on the market use cheap Bluetooth remotes. While popular, they suffer from a structural problem: the protocol stack.
            When you click a button, the signal must:
        </p>
        <ol>
            <li>Be encoded by the remote's chip.</li>
            <li>Travel through the air (2.4GHz frequency, often crowded).</li>
            <li>Be decoded by the computer/phone operating system.</li>
            <li>Be interpreted by the driver.</li>
            <li>Finally reach the application.</li>
        </ol>
        <p>
            In environments with high interference (studios with wireless mics, Wi-Fi routers), this latency can reach <strong>200-500 milliseconds</strong>. It seems small, but for the human brain reading in real-time, it's the difference between a fluid reading and an awkward pause.
        </p>

        <h2>Enter WebRTC (Web Real-Time Communication)</h2>
        <p>
            WebRTC is an open-source technology developed by Google (and adopted by Apple, Microsoft, and Mozilla) that enables direct communication between browsers. This is crucial for privacy: since the signal goes directly from your mobile to your PC, your scripts are never passed through or stored on our server. Completely private and local.
            It's the same technology used in Google Meet and Zoom. But PromptNinja uses it differently: <strong>Data Channels</strong>.
        </p>

        <h3>P2P: The Shortest Path</h3>
        <p>
            Unlike traditional web apps that work on the Client-Server model (where your command goes to a server in Virginia/USA and comes back to your computer), WebRTC creates a <strong>Peer-to-Peer (P2P)</strong> connection.
        </p>
        <p>
            This means your phone (remote) and your computer (screen) talk directly over your local Wi-Fi network. The signal doesn't leave your house.
            Result? Latency of <strong>5 to 20 milliseconds</strong>. It is virtually instant.
        </p>

        <h2>PromptNinja's Technical Architecture</h2>
        <p>
            For developers and the curious, here is how we implemented this magic:
        </p>
        <ul>
            <li><strong>Signaling:</strong> We use a lightweight server only for the initial "handshake". Devices exchange metadata (SDP offers/answers) to find each other.</li>
            <li><strong>STUN Servers:</strong> We use STUN servers to discover the public/private IP address of devices, punching through the NAT (Network Address Translation) barrier.</li>
            <li><strong>Data Channels (UDP):</strong> Unlike TCP (used in the normal web), we use the UDP protocol for control commands. UDP doesn't waste time checking if every packet arrived perfectly in order; it prioritizes speed. For a "Play/Pause" button, this is crucial.</li>
        </ul>

        <div className="bg-slate-900 p-6 rounded-lg border border-slate-700 my-8">
            <h3 className="text-xl font-bold text-white mb-4">Why does this matter to you?</h3>
            <p className="mb-0 text-slate-300">
                You don't need to understand UDP packets or STUN servers. What you feel in practice is <strong>absolute control</strong>.
                When you want the text to stop, it stops. Instantly. This gives you the confidence to speak faster, make dramatic pauses, and be more natural.
            </p>
        </div>

        <h2>Latency Comparison</h2>
        <div className="overflow-x-auto mb-8">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-slate-600">
                        <th className="py-2 text-primary">Technology</th>
                        <th className="py-2 text-primary">Average Latency</th>
                        <th className="py-2 text-primary">Stability</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b border-slate-800">
                        <td className="py-2 text-white font-bold">PromptNinja (WebRTC P2P)</td>
                        <td className="py-2 text-green-400 font-bold">&lt; 20ms</td>
                        <td className="py-2">Extreme (Local Network)</td>
                    </tr>
                    <tr className="border-b border-slate-800">
                        <td className="py-2">Standard Bluetooth</td>
                        <td className="py-2">150ms - 300ms</td>
                        <td className="py-2">Medium (Interference)</td>
                    </tr>
                    <tr className="border-b border-slate-800">
                        <td className="py-2">Web Sockets (Cloud Server)</td>
                        <td className="py-2">200ms - 1000ms+</td>
                        <td className="py-2">Low (Depends on Internet)</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <SEOContentFAQ
            title="Technical Latency FAQs"
            items={[
                {
                    question: "What causes teleprompter lag?",
                    answer: "Usually slow communication between remote and screen. With Bluetooth and WebSockets, the signal takes a long detour. In our P2P system, it goes direct."
                },
                {
                    question: "Is it secure? Do my scripts go to a server?",
                    answer: "Yes, extremely secure. Because the connection is P2P (Peer-to-Peer), your script text and commands travel only within your local network. Nothing is stored on our servers."
                },
                {
                    question: "Does it work if the internet goes down?",
                    answer: "As long as your router is on (keeping the local network active), yes. External internet is not required after the initial page load."
                }
            ]}
        />
    </>
);
