import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";

export const TeleprompterOQueEEN = () => (
    <>
        <h1 className="text-4xl font-bold text-white mb-6 leading-tight">
            What is a Teleprompter? History of the "Professional Cheat Sheet"
        </h1>

        <p className="mb-6 text-xl text-slate-300">
            You see the President looking directly into camera, speaking eloquently for 30 minutes without looking at any paper. Genius? No. Technology.
        </p>

        <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">How the Magic Works (The Mirror)</h2>
            <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1">
                    <p className="text-slate-300 mb-4">
                        Magic is in a special glass called <strong>"Beam Splitter"</strong>.
                    </p>
                    <ul className="list-disc pl-6 text-slate-300 space-y-2">
                        <li>One side (audience/camera) is transparent 🪟.</li>
                        <li>Other side (presenter) is a mirror 🪞.</li>
                    </ul>
                    <p className="text-slate-300 mt-4">
                        This allows a screen on floor to reflect text onto glass. Presenter reads reflection, but camera films through transparent glass without acting the text.
                        Result: Presenter looks <strong>directly into lens eyes</strong> while reading.
                    </p>
                </div>
                <div className="bg-black p-4 rounded-lg border border-slate-600 font-mono text-xs text-green-400 w-full md:w-1/3">
                    <div className="text-center mb-2">📷 Camera (Sees nothing)</div>
                    <div className="border-b border-slate-500 my-2 text-center text-slate-500">| | Glass Tilted 45° | |</div>
                    <div className="text-center mt-2">👁️ Presenter (Sees text)</div>
                    <div className="mt-4 text-center text-yellow-400">📱 Tablet (Emits light)</div>
                </div>
            </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
                <h3 className="text-xl font-bold text-white mb-2">1950: The Paper Roll</h3>
                <p className="text-sm text-slate-400">
                    First teleprompter (used in series <em>The First Hundred Years</em>) was literally a motorized butcher paper roll, operated by someone turning a crank. If actor spoke too fast, operator had to crank faster!
                </p>
            </div>
            <div>
                <h3 className="text-xl font-bold text-white mb-2">1952: Eisenhower and Politics</h3>
                <p className="text-sm text-slate-400">
                    Dwight Eisenhower was first US President to use TP in campaign. He realized looking at audience (via camera) conveyed much more sincerity than reading speeches on table. Since then, no politician lives without one.
                </p>
            </div>
        </div>

        <SEOContentFAQ
            title="Teleprompter Curiosities"
            items={[
                {
                    question: "What is a 'Presidential Teleprompter'?",
                    answer: "Those are the two glass stands, one on each side of podium. They are invisible to audience (look like smoked glass), but reflect text from floor monitors. Politician switches gaze between left and right to look like they are addressing whole crowd."
                },
                {
                    question: "Why called 'Teleprompter'?",
                    answer: "From 'Tele' (Distance) + 'Prompter' (Whisperer). In ancient theater, 'Prompter' was person hidden in stage box who whispered lines if actor forgot."
                },
                {
                    question: "Can I DIY one?",
                    answer: "Yes! Regular picture frame glass works (with bit of double reflection/ghosting). For pro quality, you need special '70/30 Beam Splitter' glass."
                }
            ]}
        />
    </>
);
