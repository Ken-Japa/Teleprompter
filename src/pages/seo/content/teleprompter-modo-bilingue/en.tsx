import React from "react";
import * as S from "../../../../components/ui/Styled";
import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { SEOContentHowTo } from "../../../../components/seo/SEOContentHowTo";

export const TeleprompterModoBilingueEN: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
                Bilingual Mode Teleprompter: The Revolution for Learning and Presentations
            </h1>

            <div className="prose prose-lg prose-invert mx-auto mb-12">
                <p>
                    If you are learning a new language, preparing for an international presentation, or creating content for a global audience, <strong>PromptNinja's Bilingual Mode</strong> is the tool you've been missing.
                </p>
                <p>
                    Unlike any other <a href="/en/free-online-teleprompter" className="text-blue-400 hover:underline">free online teleprompter</a>, PromptNinja allows you to view two scripts simultaneously, side-by-side, with perfect synchronization and independent control.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                <S.FeatureCard
                    icon={<span className="text-4xl">📚</span>}
                    title="Language Learning"
                    desc="Place the original text on the left and the translation on the right. Follow sentence structures and expand your vocabulary while practicing pronunciation."
                />
                <S.FeatureCard
                    icon={<span className="text-4xl">🎤</span>}
                    title="International Presentations"
                    desc="Keep your native script as a reference while reading the speech in a foreign language. Never get lost in translation again."
                />
            </div>

            <h2 className="text-3xl font-bold text-white mb-6 mt-12">How Does Bilingual Mode Work?</h2>

            <div className="space-y-6 text-gray-300 text-lg mb-12">
                <p>
                    Activating bilingual mode is simple and instant. In the PromptNinja editor, just click the <strong>"Bilingual Mode"</strong> button.
                </p>
                <SEOContentHowTo
                    title=""
                    schemaTitle="How to Use Bilingual Mode"
                    totalTime="PT1M"
                    tools={["PromptNinja", "Original Text", "Translation"]}
                    steps={[
                        {
                            title: "Step 1: Activate",
                            text: "Click the 'Bilingual Mode' button. The screen splits into two columns."
                        },
                        {
                            title: "Step 2: Insert Texts",
                            text: "Paste base text on the left (Primary) and translation/notes on the right (Secondary)."
                        },
                        {
                            title: "Step 3: Synchronize",
                            text: "Use Voice Control or manual scroll. Both texts scroll together."
                        }
                    ]}
                />
                <p>
                    During teleprompter scrolling, both texts move in sync. If you use our exclusive <strong>Voice Control</strong>, you can choose which of the two languages the system should "listen" to in order to advance the text automatically!
                </p>
            </div>

            <h2 className="text-3xl font-bold text-white mb-6">Why Use a Bilingual Teleprompter?</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-slate-800 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-white mb-3">Polyglots and Students</h3>
                    <p className="text-gray-400">
                        The "Shadowing" technique becomes much easier when you have the original text and the translation visible at the same time. Ideal for practicing with <a href="/en/teleprompter-for-presentations" className="text-blue-400 hover:underline">professional presentations</a>.
                    </p>
                </div>
                <div className="bg-slate-800 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-white mb-3">Global Speakers</h3>
                    <p className="text-gray-400">
                        Ensure your jokes and key points are delivered correctly in another language by having your native language backup ready.
                    </p>
                </div>
                <div className="bg-slate-800 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-white mb-3">Content Creators</h3>
                    <p className="text-gray-400">
                        Record versions of the same video in multiple languages without having to memorize new scripts from scratch. If you are a musician, check out our <a href="/en/teleprompter-musician-mode" className="text-blue-400 hover:underline">Musician Mode</a>.
                    </p>
                </div>
            </div>

            <div className="bg-blue-900/30 border border-blue-500/30 p-8 rounded-xl mb-12">
                <h3 className="text-2xl font-bold text-blue-400 mb-4">Pro Tip: Perfect Alignment</h3>
                <p className="text-gray-300">
                    To ensure paragraphs always stay aligned, we recommend using double line breaks (Enter x2) at the same points in both texts. This way, visual synchronization is maintained from start to finish of your recording.
                </p>
            </div>

            <SEOContentFAQ
                title="Bilingual Mode FAQ"
                items={[
                    {
                        question: "Do I need to install software?",
                        answer: "No! PromptNinja is 100% online. You access it directly through your browser on your computer, tablet, or mobile phone, without downloading anything."
                    },
                    {
                        question: "Does voice control work for both languages?",
                        answer: "Yes, but you must select which language the system should 'listen' to for scrolling control. You can toggle between tracking the left or right language in the settings."
                    },
                    {
                        question: "Can I use it for live presentations?",
                        answer: "Absolutely. Bilingual Mode is perfect for lectures where you need visual support in two languages. And since it works offline (PWA), you don't depend on the venue's internet."
                    },
                    {
                        question: "Is it free?",
                        answer: "Yes, Bilingual Mode is available in the free version of PromptNinja so everyone can experiment and improve their language skills."
                    }
                ]}
            />
        </div>
    );
};
