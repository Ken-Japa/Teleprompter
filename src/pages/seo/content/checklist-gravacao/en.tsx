import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { SEOContentHowTo } from "../../../../components/seo/SEOContentHowTo";
import { SEORelatedLinks } from "../../../../components/seo/SEORelatedLinks";

export const ChecklistGravacaoEN = () => (
    <>
        <p className="lead text-xl text-slate-300 mb-8 font-medium">
            Record videos like a pro from your first try. Follow our ultimate checklist to ensure your teleprompter setup, lighting, and audio are flawless.
        </p>

        <p className="text-slate-300 mb-8">
            Many creators focus only on the script and forget that technical preparation is what separates an amateur video from an authoritative production. A poorly configured teleprompter can result in eyes "scanning" the text or a mechanical reading. This guide solves that.
        </p>

        <SEOContentHowTo
            title="Pre-Recording Checklist: Essential Steps"
            schemaTitle="How to Prepare for Recording with a Teleprompter"
            totalTime="PT20M"
            tools={["PromptNinja", "Camera", "Lighting", "Microphone"]}
            steps={[
                {
                    title: "1. The Ninja Script",
                    text: "In PromptNinja, break your text into short paragraphs. Use CAPITAL LETTERS only for emotional emphasis. Leave white spaces for breathing."
                },
                {
                    title: "2. Camera Positioning",
                    text: "Your lens should be aligned with your eyes. If using a beamsplitter mirror, ensure no light enters from behind the fabric (hood)."
                },
                {
                    title: "3. 3-Point Lighting",
                    text: "Key light, Fill light, and Back light. Avoid strong shadows on the face that distract the viewer."
                },
                {
                    title: "4. Audio Test",
                    text: "Record for 30 seconds and listen with headphones. Check if air conditioning or external noise is being captured."
                },
                {
                    title: "5. Speed Adjustment",
                    text: "Do a reading test in PromptNinja. The speed should be slightly faster than your comfortable speech to keep the energy high."
                }
            ]}
        />

        <div className="bg-yellow-600/10 border border-yellow-500/20 rounded-2xl p-8 my-12 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-4">Pro Tip: The 2-Meter Rule</h3>
            <p className="text-slate-300 mb-4">
                The further away you are from the teleprompter screen, the less your eye movement will be noticed by the camera.
            </p>
            <p className="text-sm text-slate-400 italic">
                Increase the font size in PromptNinja to be able to read clearly from 2 to 3 meters away.
            </p>
        </div>

        <SEOContentFAQ
            title="Recording FAQ"
            items={[
                {
                    question: "Should I stare at the teleprompter?",
                    answer: "No. Try to gesture and move your head slightly. Imagine the teleprompter is a friend behind the camera reminding you what to say. Maintain eye contact with the lens, not the individual letters."
                },
                {
                    question: "What should I do if I mess up a sentence?",
                    answer: "Don't stop the recording. Breathe, take a 2-second silent pause (to make editing easier), and restart the sentence. PromptNinja has quick shortcuts to rewind the text if necessary."
                },
                {
                    question: "What's the best background color for the teleprompter?",
                    answer: "For most setups, a BLACK background with WHITE or YELLOW letters. This prevents screen glare from reflecting in your eyes or glasses."
                }
            ]}
        />

        <SEORelatedLinks
            title="Keep Evolving"
            links={[
                { label: "Public Speaking Tips for Video", href: "/en/public-speaking-tips-video" },
                { label: "How to Memorize Scripts Fast", href: "/en/how-to-memorize-scripts-fast" },
                { label: "Ideal Reading Speed", href: "/en/teleprompter-reading-speed" },
                { label: "YouTube Writing Guide", href: "/en/scripts-for-youtube" }
            ]}
        />
    </>
);
