
export const TeleprompterObsStudioEN = () => (
    <>
        <h1 className="text-4xl font-bold text-white mb-6">How to Use Teleprompter in OBS Studio: The Ultimate Guide for Streamers</h1>

        <p className="lead text-xl text-slate-300 mb-8">
            For streamers and live content creators, alt-tabbing to read scripts is a nightmare that breaks immersion. PromptNinja offers the perfect solution: integrate the teleprompter directly into OBS Studio as a transparent browser source or use it on a secondary monitor with P2P remote control. Use our <strong>Chroma Key themes (green and blue)</strong> to remove the background and leave only floating text over your scene.
        </p>

        <div className="bg-slate-800 p-6 rounded-lg my-8 border-l-4 border-blue-600">
            <h2 className="text-2xl font-bold text-white mb-2">Why Pro Streamers Choose PromptNinja?</h2>
            <p className="text-slate-300">
                Stability is crucial. Our <strong>P2P (Peer-to-Peer)</strong> system ensures that text control (via mobile) doesn't consume your stream's bandwidth.
                <br /><br />
                Plus, the "Chroma Key" theme allows you to overlay text directly onto your game screen or camera feed, visible only to you (if using projection) or your audience (if you want live captions).
            </p>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Tutorial: PromptNinja in OBS Studio</h2>
        <div className="bg-slate-800 p-6 rounded-lg my-6">
            <ol className="list-decimal pl-6 space-y-6 text-slate-300">
                <li>
                    <strong>Browser Source:</strong> In OBS, add a new "Browser Source". Paste the URL of your PromptNinja session ID.
                </li>
                <li>
                    <strong>Interact:</strong> Right-click the source and select "Interact" to make initial adjustments if needed.
                </li>
                <li>
                    <strong>Mobile Stream Deck:</strong> With PromptNinja open in OBS, connect your phone via QR Code. Now you have a dedicated controller for your scripts, zero Alt-Tab required.
                </li>
                <li>
                    <strong>Chroma Key Themes (Green/Blue):</strong> Enable the <strong>Chroma Green</strong> or <strong>Chroma Blue</strong> theme in PromptNinja. In OBS, apply the "Chroma Key" filter to the browser source to completely remove the colored background, leaving only professional floating text over your gameplay or camera. Perfect for that news anchor look.
                </li>
            </ol>
        </div>

        <div className="text-center mt-12">
            <a
                href="https://promptninja.solutionkit.com.br/en"
                className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 font-bold py-3 px-6 rounded-lg transition hover:brightness-110"
                style={{ color: 'white' }}
            >
                Boost Your Stream with PromptNinja
            </a>
        </div>
    </>
);
