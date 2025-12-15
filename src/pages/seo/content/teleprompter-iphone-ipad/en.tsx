import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";

export const TeleprompterIphoneIpadEN = () => (
    <>
        <h1 className="text-4xl font-bold text-white mb-6">Teleprompter for iPhone and iPad: Turn iOS into a Studio</h1>

        <p className="lead text-xl text-slate-300 mb-8">
            Your iPhone or iPad camera is already amazing. What's missing is a professional way to read scripts without looking away. PromptNinja is the perfect teleprompter for the Apple ecosystem, running directly in Safari with native performance and seamless integration via P2P.
        </p>

        <div className="bg-slate-800 p-6 rounded-lg my-8 border-l-4 border-slate-200">
            <h2 className="text-2xl font-bold text-white mb-2">The Apple Experience, Without App Store Costs</h2>
            <p className="text-slate-300">
                Most App Store teleprompter apps charge expensive weekly subscriptions. PromptNinja is different: it runs in your Safari browser, is free, and syncs instantly with your Mac or other devices.
                <br /><br />
                Plus, you can "Add to Home Screen" for a full-screen app experience, free of address bars.
            </p>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Ideal Setup for iOS Creators</h2>
        <div className="bg-slate-800 p-6 rounded-lg my-6">
            <ol className="list-decimal pl-6 space-y-6 text-slate-300">
                <li>
                    <strong>iPad as Main Monitor:</strong> The iPad's large screen is perfect for medium-distance reading. Place it just below your DSLR lens for a pro studio setup.
                </li>
                <li>
                    <strong>iPhone as Remote:</strong> Open script on iPad, scan QR Code with iPhone camera. Your phone now controls scroll speed and play/pause on the iPad instantly.
                </li>
                <li>
                    <strong>Vlogging with iPhone:</strong> Recording a Story or TikTok? Open PromptNinja on the iPhone itself, position text at the top, and record maintaining eye contact.
                </li>
            </ol>
        </div>

        <div className="text-center mt-12">
            <a
                href="https://promptninja.solutionkit.com.br/?lang=en/#app"
                className="inline-block bg-gradient-to-r from-slate-600 to-slate-500 font-bold py-3 px-6 rounded-lg transition hover:brightness-110"
                style={{ color: 'white' }}
            >
                Use on Your iPhone or iPad Now
            </a>
        </div>

        <SEOContentFAQ
            title="iOS User FAQs"
            items={[
                {
                    question: "Do I need to download an app from the App Store?",
                    answer: "No. PromptNinja is a Web App (PWA). You access it via Safari and can add it to your Home Screen to work exactly like a native app, but without taking up space and completely free."
                },
                {
                    question: "Does it work offline?",
                    answer: "Yes! After loading the page for the first time, the app is cached on your iPhone/iPad and works even in airplane mode, ensuring you're never stranded during a shoot."
                },
                {
                    question: "Can I control my iPad using my iPhone?",
                    answer: "Absolutely. This is our users' favorite setup. Open the text on the iPad (which acts as the screen) and scan the QR Code with the iPhone to turn it into an instant remote control."
                }
            ]}
        />
    </>
);
