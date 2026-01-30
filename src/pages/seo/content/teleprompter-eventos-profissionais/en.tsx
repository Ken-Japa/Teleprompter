import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { SEORelatedLinks } from "../../../../components/seo/SEORelatedLinks";

export const TeleprompterEventosProfissionaisEN = () => (
    <>
        <p className="lead text-xl text-slate-300 mb-8 font-medium">
            Transform any stage into a high-performance environment. **PromptNinja** delivers the synchronization and reliability that event producers demand for lectures, workshops, and corporate broadcasts.
        </p>

        <p className="text-slate-300 mb-8">
            In large-scale events, there is no room for error. A speech delay or a forgotten line can compromise the speaker's authority. Our **Master/Receiver P2P** technology allows an operator to control the text silently from a tablet, while the speaker reads on a stage monitor or light-splitting mirror, with zero latency.
        </p>

        <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 my-12">
            <h3 className="text-2xl font-bold text-white mb-6">Why PromptNinja is the Standard for Events?</h3>
            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <h4 className="text-primary font-bold mb-2">Multi-Monitor Sync</h4>
                    <p className="text-sm text-slate-400">Control multiple devices simultaneously. What the operator changes on the laptop reflects instantly on the stage tablet.</p>
                </div>
                <div>
                    <h4 className="text-primary font-bold mb-2">Total Privacy</h4>
                    <p className="text-sm text-slate-400">No sensitive script data is stored on our servers. Everything travels via encrypted local/P2P network.</p>
                </div>
                <div>
                    <h4 className="text-primary font-bold mb-2">Clean and Secure Interface</h4>
                    <p className="text-sm text-slate-400">Large buttons, dark mode, and keyboard shortcuts so nothing distracts the operator or the speaker.</p>
                </div>
                <div>
                    <h4 className="text-primary font-bold mb-2">Integrated Mirror Mode</h4>
                    <p className="text-sm text-slate-400">Compatible with professional teleprompter hardware (beamsplitter glass) with just one click.</p>
                </div>
            </div>
        </div>

        <h3 className="text-3xl font-bold text-white mt-12 mb-6">Stage Configuration (Master & Remote)</h3>
        <p className="text-slate-300 mb-6 font-medium">
            For professionals, the ideal setup involves separation of tasks:
        </p>
        <ul className="list-disc pl-6 mb-8 text-slate-300 space-y-3 font-medium">
            <li><strong>Operator (Master):</strong> Uses a PC/Laptop connected to Wi-Fi or LAN to adjust speed and text in real-time.</li>
            <li><strong>Speaker (Receiver):</strong> A tablet or HDMI monitor strategically positioned on stage receiving the signal via PromptNinja remote URL.</li>
            <li><strong>Visual Feedback:</strong> Use the central focus line to ensure the speaker never loses their breathing rhythm.</li>
        </ul>

        <div className="bg-gradient-to-br from-slate-900 to-primary/10 p-8 rounded-xl border border-primary/20 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Real-Time Fluidity Guarantee</h3>
            <p className="text-slate-300 mb-6">We use low-latency protocols (WebRTC) so every speed adjustment is felt in the same millisecond.</p>
            <a href="/?lang=en#app" className="inline-block bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-full transition-transform hover:scale-105 shadow-xl shadow-primary/20" style={{ color: 'white' }}>
                Create Free Event
            </a>
        </div>

        <SEOContentFAQ
            title="Production FAQ"
            items={[
                {
                    question: "Do I need fast internet on site?",
                    answer: "Not necessarily. PromptNinja uses P2P connections. Once the devices 'meet', data exchange is done directly on the local network, ensuring stable performance even in locations with unstable signal."
                },
                {
                    question: "Does it work on Projectors or TVs?",
                    answer: "Yes. Just open the teleprompter mode URL in the browser of the device connected to the screen. Full-screen mode ensures only the text is visible to the audience or speaker."
                },
                {
                    question: "Does it support long scripts?",
                    answer: "Yes, we support scripts for 1-hour lectures or more without slowdowns, thanks to our rendering engine optimized for modern browsers."
                }
            ]}
        />

        <SEORelatedLinks
            title="Additional Technical Resources"
            links={[
                { label: "WebRTC Technology and Latency", href: "/en/webrtc-low-latency-technology" },
                { label: "Privacy and Data Security", href: "/en/teleprompter-privacy-security" },
                { label: "Professional Keyboard Shortcuts", href: "/en/teleprompter-keyboard-shortcuts" },
                { label: "How to Manage Large Scripts", href: "/en/teleprompter-scripts" }
            ]}
        />
    </>
);
