export const ComoUsarTeleprompterEN = () => (
    <>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            How to Use a Free Teleprompter: The Ultimate Guide for Professional Videos
        </h1>

        <p className="lead text-xl text-slate-300 mb-8">
            Recording videos can be a nightmare. You have an amazing script, but when it's time to face the camera, the words disappear. You stutter, forget key points, and end up with dozens of takes, wasting hours in editing. If this sounds familiar, a teleprompter isn't a luxury—it's a necessity.
        </p>

        <div className="bg-slate-900 p-6 rounded-lg border border-slate-800 mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">The Core Problem: The Cognitive Load of Memorization</h2>
            <p className="text-slate-300">
                The human brain isn't optimized to do two complex things at once: remember a script word-for-word and present it charismatically and naturally. That's why TV actors, news anchors, and even presidents use teleprompters. They free the mind from the task of memorizing, allowing all energy to be focused on performance, intonation, and connecting with the audience. Trying to do it all "from memory" is a recipe for a robotic, lifeless video.
            </p>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">How to Use a Teleprompter: From Basic to Professional</h2>
        <p className="text-slate-300 mb-8">
            There are two main ways to use a teleprompter, especially with web-based tools like PromptNinja, which don't require purchasing expensive equipment.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-slate-800 p-6 rounded-lg">
                <h3 className="font-bold text-xl text-white mb-3">Method 1: The Single Device (The Quick Start)</h3>
                <p className="text-slate-400 mb-4">
                    Ideal for beginners or for quick recordings. You use the same device to record and read.
                </p>
                <ol className="list-decimal list-inside space-y-2 text-slate-300">
                    <li>Open your phone's camera or your notebook's webcam.</li>
                    <li>In a window next to it, open <strong>PromptNinja</strong> in your browser.</li>
                    <li>Paste your script, adjust the font size and speed.</li>
                    <li>Position the teleprompter window as close as possible to the camera lens.</li>
                    <li>Start recording, then press play on the teleprompter.</li>
                </ol>
                <p className="text-sm text-slate-500 mt-4"><strong>Disadvantage:</strong> It's hard to control the scroll without interrupting the recording or looking away. Works best for short videos.</p>
            </div>

            <div className="bg-slate-800 p-6 rounded-lg border-2 border-blue-500">
                <h3 className="font-bold text-xl text-white mb-3">Method 2: The Remote Control (The Professional Way)</h3>
                <p className="text-slate-400 mb-4">
                    This is the setup that turns your space into a studio. You use one device to read (main screen) and another as a remote control.
                </p>
                <ol className="list-decimal list-inside space-y-2 text-slate-300">
                    <li>Open PromptNinja on the device that will serve as the screen (notebook, tablet, another monitor).</li>
                    <li>On your phone, open PromptNinja and select the "Remote Control" option.</li>
                    <li>Scan the QR Code that appears on the main screen with your phone's camera.</li>
                    <li>Done! Your phone is now a remote control. Play, pause, adjust the speed and text without leaving your position.</li>
                </ol>
                <p className="text-sm text-green-400 mt-4"><strong>Advantage:</strong> Full control over the recording flow, allowing for dramatic pauses, acceleration, and a much more dynamic and natural presentation.</p>
            </div>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Common Mistakes When Using a Teleprompter (and How to Avoid Them)</h2>
        <div className="space-y-4">
            <div className="bg-slate-800 p-4 rounded-lg">
                <h3 className="font-bold text-lg text-white">1. "Dancing" Eyes on the Screen</h3>
                <p className="text-slate-300 mt-2"><strong>The Mistake:</strong> Your eyes visibly move from left to right as you read, giving away that you're using a teleprompter. <br /> <strong>The Solution:</strong> Increase the distance between you and the screen. The farther away you are, the less noticeable the eye movement will be. Also, narrow the width of the text box in the teleprompter so the lines are shorter.</p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg">
                <h3 className="font-bold text-lg text-white">2. Monotonous and Robotic Rhythm</h3>
                <p className="text-slate-300 mt-2"><strong>The Mistake:</strong> You enter "reading mode" and your voice loses emotion, sounding like a robot. <br /> <strong>The Solution:</strong> Don't write the script like a formal text. Use short sentences, punctuation that indicates pauses, and even notes like "(smile here)" or "(pause here)". Practice reading the text aloud once before recording to find the natural rhythm.</p>
            </div>
            <div className="bg-slate-800 p-4 rounded-lg">
                <h3 className="font-bold text-lg text-white">3. Incorrect Scrolling Speed</h3>
                <p className="text-slate-300 mt-2"><strong>The Mistake:</strong> The scroll is too slow, creating awkward pauses, or too fast, causing you to stumble over your words. <br /> <strong>The Solution:</strong> Use the remote control feature to adjust the speed in real-time. Start a little slower and speed up as you get into the rhythm. A good tip is to always have the next line visible at the top of the screen.</p>
            </div>
        </div>

        <div className="text-center mt-12">
            <a
                href="https://promptninja.solutionkit.com.br"
                className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 font-bold py-3 px-8 mx-auto rounded-full transition hover:brightness-110"
                style={{ color: 'white' }}
            >
                Transform Your Videos Today. Use PromptNinja for Free!
            </a>
            <p className="text-slate-400 mt-4 text-sm">Remote control, no installation, no time limit.</p>
        </div>
    </>
);
