import { ROUTES_CONFIG } from "../../../../config/routes";
import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { SEOContentHowTo } from "../../../../components/seo/SEOContentHowTo";
import { SEOImage } from "../../../../components/seo/SEOImage";

export const TeleprompterCaseiroDIYEN = () => (
    <>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            DIY Homemade Teleprompter: Build Yours Fast & Cheap (and Record Like a Pro)
        </h2>

        <p className="lead text-xl text-slate-300 mb-8 font-medium">
            Want to save hundreds of dollars and still get professional results? Learn how to build your own DIY homemade teleprompter and discover why <strong>PromptNinja</strong> is the perfect free software for your new setup.
        </p>

        <SEOImage
            slug="teleprompter-caseiro-diy"
            src="homemade-teleprompter-diy-setup.webp"
            alt="DIY homemade teleprompter with tablet"
            caption="A homemade teleprompter can be built using simple materials like a cardboard box and a piece of glass or acrylic."
            width={1200}
            height={675}
        />

        <p className="text-slate-300 mb-8 leading-relaxed">
            Recording professional-looking videos requires fluency and confidence, but memorizing scripts is a constant challenge. Professional teleprompter equipment solves this, but the cost can be prohibitive for those just starting out. The good news? You can <strong>build a cheap DIY homemade teleprompter</strong> with simple materials and achieve impressive results.
        </p>

        <div className="bg-blue-600/10 border border-blue-500/20 rounded-2xl p-6 md:p-8 text-center mb-12 shadow-xl">
            <h3 className="text-2xl font-bold text-white mb-4">Free Software with Mirror Mode</h3>
            <p className="text-slate-300 mb-6">
                Built your teleprompter but don't have a way to flip the text?
                <strong>PromptNinja</strong> has the Mirror function 100% free.
            </p>
            <a href="/?lang=en#app" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all hover:scale-105 shadow-lg shadow-blue-500/25">
                Open Teleprompter with Mirroring
            </a>
        </div>

        <h3 className="text-2xl font-bold text-white mt-8 mb-4">Materials Needed to Build Your DIY Teleprompter</h3>

        <div className="bg-slate-800 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-bold text-white mb-4">Shopping List for Your Homemade Teleprompter</h3>
            <ul className="list-disc pl-6 space-y-3">
                <li>
                    <strong>Glass or Clear Acrylic:</strong> A 8x10" or 11x14" picture frame (remove the backing) or a sheet of clear acrylic. This will be your "beam splitter" that reflects the text.
                    <span className="text-slate-400 block mt-1 text-sm">💡 Where to buy: Frame shops, craft stores, or hardware stores (acrylic)</span>
                </li>
                <li>
                    <strong>Support Structure:</strong> A sturdy cardboard box (large shoebox or moving box) or a lightweight wood frame (plywood or MDF). Paint the inside matte black to prevent unwanted reflections.
                    <span className="text-slate-400 block mt-1 text-sm">💡 Where to buy: Office supply stores, craft stores, or lumber yards</span>
                </li>
                <li>
                    <strong>Display Device:</strong> A tablet (7-10 inches is ideal), smartphone, or portable monitor to display the script.
                    <span className="text-slate-400 block mt-1 text-sm">💡 Use what you have! Old tablets work perfectly</span>
                </li>
                <li>
                    <strong>Black Cloth or Cardboard:</strong> To create a "tunnel" between the camera lens and glass, blocking ambient light and ensuring the camera doesn't appear in the reflection.
                    <span className="text-slate-400 block mt-1 text-sm">💡 Where to buy: Fabric stores or office supply stores</span>
                </li>
                <li>
                    <strong>Camera:</strong> Any DSLR, mirrorless, webcam, or even your smartphone camera.
                </li>
                <li>
                    <strong>Tape/Hot Glue:</strong> To secure the pieces.
                    <span className="text-slate-400 block mt-1 text-sm">💡 Hot glue is ideal for quick assembly and adjustments</span>
                </li>
            </ul>

            <div className="mt-4 p-4 bg-slate-700 rounded">
                <p className="text-white font-bold mb-2">💰 Total Estimated Cost: $10 to $30</p>
                <p className="text-slate-300 text-sm">Compare with professional teleprompters that cost $200 to $1,500+</p>
            </div>
        </div>

        <div className="bg-yellow-900/20 border-l-4 border-yellow-500 p-4 mb-6 rounded-r-lg">
            <div className="flex">
                <div className="flex-shrink-0">
                    <span className="text-2xl">⚠️</span>
                </div>
                <div className="ml-3">
                    <h3 className="text-sm font-bold text-yellow-500">Beware of the Mirror Effect!</h3>
                    <div className="mt-2 text-sm text-yellow-200">
                        <p>
                            When using glass to reflect text, it will appear reversed. You'll need software that supports <strong>Mirror Mode</strong>. PromptNinja includes it for free so you can start recording right away.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div className="bg-slate-800 p-4 rounded-lg mb-6 border-l-4 border-purple-500">
            <h3 className="font-bold text-white mb-2">📱 Using a Tablet or iPad?</h3>
            <p className="text-slate-300 text-sm">
                Tablets are excellent for DIY teleprompters due to their screen size and portability. If you plan to use one, check out our specific guide on <a href="/en/teleprompter-app-for-tablet-ipad" className="text-purple-400 hover:text-purple-300 underline">how to use a teleprompter on tablet</a> for positioning tips and setup.
            </p>
        </div>

        <SEOContentHowTo
            title="Step-by-Step: How to Build a Homemade Teleprompter"
            schemaTitle="How to Make a DIY Teleprompter"
            estimatedCost={{ currency: "USD", value: "15" }}
            totalTime="PT30M"
            supplies={["Cardboard Box or Wood", "Glass or Clear Acrylic", "Black Cloth", "Tape or Hot Glue"]}
            tools={["Scissors or Box Cutter", "Smartphone or Tablet (to display text)", "Camera (to record)"]}
            steps={[
                {
                    title: "Step 1: Prepare the Base Structure",
                    text: "Take your cardboard box and cut a front opening for the camera and a bottom opening for the tablet to sit at a 45-degree angle. If using wood, build a box in an inverted \"L\" shape. Tip: Paint the entire interior matte black to eliminate reflections that might appear in the video."
                },
                {
                    title: "Step 2: Position the Glass/Acrylic",
                    text: "Attach the glass or acrylic at a 45-degree angle between the camera (which will be behind) and you (who will be in front). This angle is crucial so the text reflection is only visible to you, not the camera. Use hot glue or double-sided tape."
                },
                {
                    title: "Step 3: Position the Tablet/Monitor",
                    text: "Place the tablet or monitor at the bottom of the structure, facing upward toward the glass. The text on the screen will reflect in the glass and appear in your line of sight, just below the camera lens. Set the tablet's screen brightness to maximum."
                },
                {
                    title: "Step 4: Block Light with Black Cloth",
                    text: "Create a \"tunnel\" with black cloth around the camera and glass. This prevents external light from interfering with the reflection and ensures the camera doesn't appear reflected in the glass."
                },
                {
                    title: "Step 5: Configure the Software (PromptNinja)",
                    text: "The most important step: the text on the tablet needs to be mirrored. 1. Go to promptninja.solutionkit.com.br on your tablet. 2. Paste your script. 3. Click the mirror icon (🪞). 4. Scan the QR code with your phone to use it as a remote control. Done!"
                }
            ]}
        />

        <h3 className="text-2xl font-bold text-white mt-8 mb-4">Why PromptNinja is Perfect for Your DIY Teleprompter</h3>

        <div className="bg-slate-800 p-6 rounded-lg my-6">
            <p className="text-slate-300 mb-6">
                While your DIY structure handles the hardware, <strong>PromptNinja was specifically designed with homemade setups in mind</strong>. All core features are <strong>100% free</strong>.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-700 p-4 rounded-lg">
                    <h4 className="font-bold text-white mb-2">🪞 Smart Mirroring</h4>
                    <p className="text-sm text-slate-300">With 1 click, flips text horizontally and vertically. The glass reflection becomes perfectly readable to you but invisible to the camera.</p>
                </div>
                <div className="bg-slate-700 p-4 rounded-lg">
                    <h4 className="font-bold text-white mb-2">📱 P2P Remote Control via QR Code</h4>
                    <p className="text-sm text-slate-300">Record solo! Scan a QR code and use your phone as a remote. Start, pause, adjust speed without touching the tablet.</p>
                </div>
                <div className="bg-slate-700 p-4 rounded-lg">
                    <h4 className="font-bold text-white mb-2">⚡ No Installation or Lag</h4>
                    <p className="text-sm text-slate-300">Works directly in the browser. P2P control via local Wi-Fi (no internet needed). Instant response, zero lag.</p>
                </div>
                <div className="bg-slate-700 p-4 rounded-lg">
                    <h4 className="font-bold text-white mb-2">🎨 Fully Customizable</h4>
                    <p className="text-sm text-slate-300">Adjust font, size, colors, speed, and more. Perfectly adapt to your setup and lighting.</p>
                </div>
            </div>
        </div>

        <h3 className="text-2xl font-bold text-white mt-8 mb-4">Optimizing PromptNinja for Your DIY Setup</h3>

        <div className="bg-slate-800 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-bold text-white mb-4">Recommended Settings</h3>
            <ul className="space-y-4">
                <li className="flex items-start">
                    <span className="text-2xl mr-3">🔆</span>
                    <div>
                        <strong className="text-white">Screen Brightness:</strong>
                        <p className="text-slate-300 text-sm">Set tablet brightness to maximum. Glass reflection reduces light intensity, so you need to compensate.</p>
                    </div>
                </li>
                <li className="flex items-start">
                    <span className="text-2xl mr-3">📏</span>
                    <div>
                        <strong className="text-white">Font Size:</strong>
                        <p className="text-slate-300 text-sm">Test different sizes. For a 10" tablet, we recommend starting with 48-60px and adjusting based on your distance.</p>
                    </div>
                </li>
                <li className="flex items-start">
                    <span className="text-2xl mr-3">🎨</span>
                    <div>
                        <strong className="text-white">Contrast:</strong>
                        <p className="text-slate-300 text-sm">Use white text on black background for maximum reflection contrast. Avoid light background colors.</p>
                    </div>
                </li>
                <li className="flex items-start">
                    <span className="text-2xl mr-3">⚡</span>
                    <div>
                        <strong className="text-white">Speed:</strong>
                        <p className="text-slate-300 text-sm">Start slow (50-100 WPM) until you get used to the setup. Use the remote to adjust in real-time.</p>
                    </div>
                </li>
                <li className="flex items-start">
                    <span className="text-2xl mr-3">🔋</span>
                    <div>
                        <strong className="text-white">Power Saving Mode:</strong>
                        <p className="text-slate-300 text-sm">Disable tablet's power-saving mode to prevent the screen from dimming during recording.</p>
                    </div>
                </li>
            </ul>
        </div>

        <h3 className="text-2xl font-bold text-white mt-8 mb-4">Common Problems and Solutions (Troubleshooting)</h3>

        <div className="space-y-4 mb-8">
            <div className="bg-red-900/20 border border-red-500/30 p-4 rounded-lg">
                <h4 className="font-bold text-white mb-2">❌ Problem: Reflection is very weak or almost invisible</h4>
                <p className="text-slate-300 text-sm mb-2"><strong>Solution:</strong></p>
                <ul className="list-disc pl-6 text-slate-300 text-sm space-y-1">
                    <li>Increase tablet brightness to maximum</li>
                    <li>Reduce room ambient lighting (reflection is more visible in the dark)</li>
                    <li>Make sure the glass is clean and spotless</li>
                    <li>Check that the glass angle is correct (45 degrees)</li>
                </ul>
            </div>

            <div className="bg-red-900/20 border border-red-500/30 p-4 rounded-lg">
                <h4 className="font-bold text-white mb-2">❌ Problem: Camera is recording the reflected text</h4>
                <p className="text-slate-300 text-sm mb-2"><strong>Solution:</strong></p>
                <ul className="list-disc pl-6 text-slate-300 text-sm space-y-1">
                    <li>Adjust glass angle to exactly 45 degrees</li>
                    <li>Check that black cloth is blocking all light around the camera</li>
                    <li>Reduce tablet brightness (if reflection is still visible to you)</li>
                </ul>
            </div>

            <div className="bg-red-900/20 border border-red-500/30 p-4 rounded-lg">
                <h4 className="font-bold text-white mb-2">❌ Problem: Text is cut off or not fully visible</h4>
                <p className="text-slate-300 text-sm mb-2"><strong>Solution:</strong></p>
                <ul className="list-disc pl-6 text-slate-300 text-sm space-y-1">
                    <li>Adjust distance between tablet and glass</li>
                    <li>Use a larger tablet or glass</li>
                    <li>Reduce font size in PromptNinja</li>
                    <li>Move slightly further from the structure</li>
                </ul>
            </div>

            <div className="bg-red-900/20 border border-red-500/30 p-4 rounded-lg">
                <h4 className="font-bold text-white mb-2">❌ Problem: Text is difficult to read (blurry)</h4>
                <p className="text-slate-300 text-sm mb-2"><strong>Solution:</strong></p>
                <ul className="list-disc pl-6 text-slate-300 text-sm space-y-1">
                    <li>Clean the glass thoroughly (fingerprints cause distortion)</li>
                    <li>Use glass instead of acrylic (scratched acrylic distorts more)</li>
                    <li>Increase font size in PromptNinja</li>
                    <li>Use sans-serif fonts (Arial, Helvetica) which are more readable in reflections</li>
                </ul>
            </div>

            <div className="bg-red-900/20 border border-red-500/30 p-4 rounded-lg">
                <h4 className="font-bold text-white mb-2">❌ Problem: Remote control is not working</h4>
                <p className="text-slate-300 text-sm mb-2"><strong>Solution:</strong></p>
                <ul className="list-disc pl-6 text-slate-300 text-sm space-y-1">
                    <li>Make sure tablet and phone are on the same Wi-Fi network</li>
                    <li>Reload the PromptNinja page on the tablet</li>
                    <li>Scan the QR code again</li>
                    <li>If needed, check our <a href={ROUTES_CONFIG.SEO_GRATIS.paths.en} className="text-purple-400 hover:text-purple-300 underline">P2P remote control guide</a></li>
                </ul>
            </div>
        </div>

        <h3 className="text-2xl font-bold text-white mt-8 mb-4">FAQ: Frequently Asked Questions About Homemade Teleprompters</h3>
        <SEOContentFAQ
            title=""
            items={[
                {
                    question: "Why does the text look backwards on my DIY teleprompter?",
                    answer: "This happens because of the physical reflection on the glass. To fix this, use PromptNinja and toggle 'Mirror Mode', which horizontally flips the text so it's readable in the reflection."
                },
                {
                    question: "Do I need special glass or does regular glass work?",
                    answer: "Regular picture frame glass works perfectly! Professional \"beam splitter\" glass (50/50) is better, but for a DIY homemade setup the difference is minimal and the cost is 10x higher. The important thing is that the glass is clean and scratch-free."
                },
                {
                    question: "How much does it cost to build a homemade teleprompter?",
                    answer: "Between $10 and $30 if you buy all materials from scratch (glass, box/wood, black cloth, glue). If you already have a tablet and camera, it can cost under $15. Compare with professional teleprompters that cost $200 to $1,500+."
                },
                {
                    question: "How do I prevent the camera from recording the reflected text?",
                    answer: "The secret lies in three factors: (1) correct glass angle (45 degrees), (2) black cloth blocking light around the camera, and (3) proper lighting. The camera, positioned behind the glass, captures the image in front of you, while the reflected text is only visible to those in front (you)."
                },
                {
                    question: "Can I use my phone instead of a tablet?",
                    answer: "Yes, but tablets are much better due to their larger screen. If using a phone, choose one with a large screen (6.5\"+) and position it closer to the glass. It will work, but the reflected text will be smaller and harder to read."
                },
                {
                    question: "Does PromptNinja work offline on my DIY teleprompter?",
                    answer: "Yes! After loading the page once, PromptNinja works offline thanks to PWA technology. The P2P remote also works via local Wi-Fi, without needing active internet."
                },
                {
                    question: "Do I need to install an app on the tablet?",
                    answer: "No! PromptNinja works directly in the browser (Chrome, Safari, Edge, Firefox). Just access the website. You can install it as a PWA (Progressive Web App) if you want, but it's not required."
                },
                {
                    question: "Does the PromptNinja remote work with any phone?",
                    answer: "Yes. Any smartphone that can read a QR code and has a modern browser can be used as a remote control. No need to install anything on the phone — everything works in the browser via local P2P connection."
                },
                {
                    question: "Can I use acrylic instead of glass?",
                    answer: "Yes! Clear acrylic works well and is lighter and safer (doesn't break). The only disadvantage is it scratches easier, which can slightly distort the reflection. If using acrylic, protect it with a removable film."
                }
            ]}
        />

        <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-8 rounded-lg my-10 border border-purple-500/30">
            <h3 className="text-3xl font-bold text-white mb-4 text-center">Ready to Transform Your DIY Project into a Professional Tool?</h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto text-center">
                You've already saved hundreds of dollars on hardware. Now, <strong>supercharge your homemade teleprompter with 100% free software</strong> made especially for DIY setups like yours.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                <a
                    href="https://promptninja.solutionkit.com.br"
                    className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 font-bold py-3 px-8 rounded-full transition hover:brightness-110 hover:scale-105"
                    style={{ color: 'white' }}
                >
                    🚀 Try PromptNinja Free
                </a>
                <a
                    href={ROUTES_CONFIG.SEO_GRATIS.paths.en}
                    className="inline-block border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white font-bold py-3 px-8 rounded-full transition"
                >
                    📖 See More Features
                </a>
            </div>
            <p className="text-slate-400 text-sm text-center mt-4">
                ✅ Mirror Mode • ✅ P2P Remote • ✅ No Installation • ✅ 100% Free
            </p>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg mt-8">
            <h3 className="text-xl font-bold text-white mb-3">💡 Extra Tip: Other Useful Features</h3>
            <p className="text-slate-300 mb-4">
                If you're building a homemade teleprompter, these other PromptNinja features might be useful:
            </p>
            <ul className="list-disc pl-6 text-slate-300 space-y-2">
                <li><a href={ROUTES_CONFIG.SEO_MODO_MUSICO.paths.en} className="text-purple-400 hover:text-purple-300 underline">Musician Mode</a> — Perfect if you also record music or need chord charts</li>
                <li><a href={ROUTES_CONFIG.SEO_HUB_GUIDE.paths.en} className="text-purple-400 hover:text-purple-300 underline">How to use teleprompter professionally</a> — Techniques to improve your performance</li>
                <li><a href={ROUTES_CONFIG.SEO_HARDWARE_VS_WEB.paths.en} className="text-purple-400 hover:text-purple-300 underline">Web Teleprompter vs Hardware</a> — Compare your DIY setup with professional options</li>
            </ul>
        </div>
    </>
);
