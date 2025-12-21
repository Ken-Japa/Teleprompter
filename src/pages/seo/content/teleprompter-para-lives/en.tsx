import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { ROUTES_CONFIG } from "../../../../config/routes";

export const TeleprompterParaLivesEN = () => (
    <>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            How to Use a Teleprompter in Live Streams (OBS, YouTube, Twitch): The Secret Guide
        </h1>

        <p className="lead text-xl text-slate-300 mb-8">
            Live streaming is stressful. Monitoring chat, checking audio, and remembering scripts? Impossible. That's why top streamers use a "little secret" on screen that the audience doesn't see.
        </p>

        <div className="bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">The Problem with Scriptless Lives</h2>
            <p className="text-slate-300 mb-6">
                Have you ever watched a live stream where the host rambles for 10 minutes, stammers, and loses their train of thought? The viewership drops instantly. Having bullet points or a full script on screen ensures you deliver constant value, increasing retention.
            </p>
            <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-red-500">
                <p className="text-slate-300">
                    <strong className="text-red-400">The Challenge:</strong> How to read the script without taking your eyes off the camera and without showing the script on the OBS stream?
                </p>
            </div>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">The Solution: Invisible Overlay with PromptNinja</h2>
        <p className="text-slate-300 mb-8">
            PromptNinja allows you to place a transparent teleprompter window <strong>over</strong> your streaming software (OBS Studio, vMix, Streamlabs), but physically positioned on the screen right below your webcam.
        </p>

        <h3 className="text-2xl font-bold text-white mt-8 mb-4">Step-by-Step Live Setup</h3>
        <ol className="list-decimal list-inside space-y-4 text-slate-300 mb-12">
            <li className="pl-2">
                <strong className="text-white">Open PromptNinja in a Separate Window:</strong>
                <br /> Don't use full screen. Resize the browser window to be narrow and transparent.
            </li>
            <li className="pl-2">
                <strong className="text-white">Position at the Top:</strong>
                <br /> Drag this window to the top center of your monitor, just below the webcam.
            </li>
            <li className="pl-2">
                <strong className="text-white">Control via Mobile (The Trick):</strong>
                <br /> Connect your phone as a remote control. This way, you can play/pause or change speed discreetly, with the phone out of frame, without using the mouse.
            </li>
            <li className="pl-2">
                <strong className="text-white">Don't Capture this Window in OBS:</strong>
                <br /> In OBS, instead of using "Display Capture" (which would show the teleprompter), use "Window Capture" or "Game Capture" to capture only the game or slide you want to show. The teleprompter remains visible only to you!
            </li>
        </ol>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Full Script vs. Bullet Points in Lives</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="border border-slate-700 p-6 rounded-lg bg-slate-800/50">
                <h3 className="text-xl font-bold text-blue-400 mb-2">Full Script</h3>
                <p className="text-slate-400 text-sm mb-4">
                    Ideal for the <strong>Introduction</strong> and the <strong>Conclusion/CTA</strong>. These are critical moments where you cannot make mistakes or forget to ask for likes/subs.
                </p>
            </div>
            <div className="border border-slate-700 p-6 rounded-lg bg-slate-800/50">
                <h3 className="text-xl font-bold text-purple-400 mb-2">Bullet Points</h3>
                <p className="text-slate-400 text-sm mb-4">
                    Ideal for the <strong>Main Content</strong>. Put keywords in the teleprompter and scroll manually as you advance through topics. This maintains the natural feel of the live stream.
                </p>
            </div>
        </div>

        <SEOContentFAQ
            title="Streamer FAQ"
            items={[
                {
                    question: "Does PromptNinja use a lot of CPU during the stream?",
                    answer: "No. PromptNinja is extremely lightweight. It won't drop your FPS in games or overload OBS encoding."
                },
                {
                    question: "Will the audience see my teleprompter?",
                    answer: "Only if you share your entire screen (Display Capture). If you share only specific windows (Window Capture) in OBS, the teleprompter is invisible to the stream but visible to you."
                },
                {
                    question: "How do I control speed if I'm gaming?",
                    answer: "Use your phone as a remote. Keep it on the desk. A quick tap on the phone screen pauses or resumes the text without needing to Alt-Tab out of the game."
                }
            ]}
        />

        <div className="text-center mt-12 pb-12">
            <a
                href="#app?lang=en"
                className="inline-block bg-gradient-to-r from-purple-600 to-indigo-500 font-bold py-4 px-10 rounded-full transition hover:scale-105 shadow-xl text-white text-lg"
            >
                Setup Your Pro Live Stream Now (Free)
            </a>
        </div>

        <div className="border-t border-slate-800 pt-12 mt-12">
            <h3 className="text-2xl font-bold text-white mb-6">See Also</h3>
            <ul className="space-y-4">
                <li>
                    <a href={ROUTES_CONFIG.SEO_ZOOM.paths.en} className="text-purple-400 hover:text-purple-300 hover:underline text-lg">
                        💻 Best Teleprompter for Zoom Meetings
                    </a>
                </li>
                <li>
                    <a href={ROUTES_CONFIG.SEO_ORATORIA.paths.en} className="text-purple-400 hover:text-purple-300 hover:underline text-lg">
                        🗣️ Public Speaking Tips for Video
                    </a>
                </li>
                <li>
                    <a href={ROUTES_CONFIG.SEO_YOUTUBERS.paths.en} className="text-purple-400 hover:text-purple-300 hover:underline text-lg">
                        📹 Teleprompter for YouTubers and Creators
                    </a>
                </li>
            </ul>
        </div>
    </>
);
