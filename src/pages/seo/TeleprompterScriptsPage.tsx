
import React, { useState } from 'react';
import { SeoPageLayout } from './SeoPageLayout';
import { useTranslation } from '../../hooks/useTranslation';
import { SCRIPTS_DATA, Script } from '../../data/teleprompterScripts';
import { SEO_CONTENT } from '../../data/seoContent';
import { useFAQSchema } from '../../hooks/useFAQSchema';

export const TeleprompterScriptsPage: React.FC<{ onLaunch: () => void }> = ({ onLaunch }) => {
    const { t, lang } = useTranslation();
    const currentLang = (['pt', 'en', 'es'].includes(lang) ? lang : 'pt') as 'pt' | 'en' | 'es';
    const content = SEO_CONTENT.scripts;

    // Prepare FAQ data for schema
    const faqItems = content.faq.items.map(item => ({
        q: item.q[currentLang],
        a: item.a[currentLang]
    }));

    useFAQSchema(faqItems);

    const [copiedScriptId, setCopiedScriptId] = useState<string | null>(null);

    const handleCopy = async (text: string, id: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedScriptId(id);
            setTimeout(() => setCopiedScriptId(null), 2000);
        } catch (err) {
            // Fallback for non-secure context
            const textArea = document.createElement("textarea");
            textArea.value = text;
            textArea.style.position = "fixed";
            textArea.style.left = "-9999px";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                document.execCommand('copy');
                setCopiedScriptId(id);
                setTimeout(() => setCopiedScriptId(null), 2000);
            } catch (err) {
                console.error('Copy failed', err);
            }
            document.body.removeChild(textArea);
        }
    };

    const handleUseScript = (text: string) => {
        // Encode text and redirect to app
        const encodedText = encodeURIComponent(text);
        window.location.href = `/?script=${encodedText}`;
    };

    return (
        <SeoPageLayout
            title={t('seo.scripts.title') || (currentLang === 'pt' ? "Scripts Prontos para Teleprompter: Modelos de Roteiro Grátis" : "Ready-to-Use Teleprompter Scripts: Free Templates")}
            description={t('seo.scripts.description') || "Coleção completa de scripts para teleprompter. Roteiros para YouTube, TikTok, Vendas e Aulas prontos para usar."}
            canonicalUrl={`https://promptninja.com/${currentLang}/scripts-teleprompter`}
            onLaunch={onLaunch}
        >
            <div className="mb-12">
                <p>
                    {content.header_intro[currentLang]}
                </p>
            </div>

            {/* Header Category Navigation */}
            <div className="flex flex-wrap justify-center gap-3 mb-16">
                {SCRIPTS_DATA.map(category => (
                    <a
                        key={category.id}
                        href={`#${category.id}`}
                        onClick={(e) => {
                            e.preventDefault();
                            const element = document.getElementById(category.id);
                            if (element) {
                                element.scrollIntoView({ behavior: 'smooth' });
                            }
                        }}
                        className="px-4 py-2 bg-slate-800/80 hover:bg-purple-600 text-slate-300 hover:text-white rounded-full border border-slate-700 hover:border-purple-500 transition-all text-sm font-medium backdrop-blur-sm"
                    >
                        {category.title[currentLang]}
                    </a>
                ))}
            </div>

            {SCRIPTS_DATA.map((category) => (
                <div key={category.id} className="mb-16">
                    <div className="flex items-center gap-4 mb-6 border-b border-slate-700 pb-4">
                        <h2 id={category.id} className="text-3xl font-bold text-white m-0 !mt-0">
                            {category.title[currentLang]}
                        </h2>
                    </div>

                    <p className="mb-8 text-slate-300">
                        {category.description[currentLang]}
                    </p>

                    <div className="grid gap-8">
                        {category.scripts.map((script: Script) => (
                            <div key={script.id} className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden hover:border-purple-500/30 transition-all duration-300">
                                <div className="p-6">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                        <h3 className="text-xl font-semibold text-purple-400 m-0 !mt-0">
                                            {script.title[currentLang]}
                                        </h3>
                                        <div className="flex gap-2">
                                            {script.tags.map(tag => (
                                                <span key={tag} className="text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded-full uppercase tracking-wider">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bg-slate-950 rounded-lg p-4 mb-6 font-mono text-sm text-slate-300 whitespace-pre-wrap max-h-[300px] overflow-y-auto border border-slate-900 custom-scrollbar">
                                        {script.content[currentLang]}
                                    </div>

                                    <div className="flex flex-wrap gap-4">
                                        <button
                                            onClick={() => handleUseScript(script.content[currentLang])}
                                            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-purple-500/25 flex items-center gap-2"
                                            title="Abrir este texto no Teleprompter agora"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                            </svg>
                                            {currentLang === 'pt' ? "Abrir no Teleprompter" : "Open in Teleprompter"}
                                        </button>

                                        <button
                                            onClick={() => handleCopy(script.content[currentLang], script.id)}
                                            className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-lg transition-all border border-slate-700 flex items-center gap-2"
                                        >
                                            {copiedScriptId === script.id ? (
                                                <>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                    {currentLang === 'pt' ? "Copiado!" : "Copied!"}
                                                </>
                                            ) : (
                                                <>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                                                        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                                                    </svg>
                                                    {currentLang === 'pt' ? "Copiar Texto" : "Copy Text"}
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {/* Category Navigation */}
            <div className="mb-24 flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
                <a href={currentLang === 'pt' ? '/scripts-para-youtube' : currentLang === 'es' ? '/es/guiones-para-youtube' : '/en/scripts-for-youtube'}
                    className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors border border-slate-700 font-semibold">
                    YouTube
                </a>
                <a href={currentLang === 'pt' ? '/scripts-para-tiktok-reels' : currentLang === 'es' ? '/es/guiones-para-tiktok-shorts' : '/en/scripts-for-tiktok-shorts'}
                    className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors border border-slate-700 font-semibold">
                    TikTok & Reels
                </a>
                <a href={currentLang === 'pt' ? '/scripts-para-vendas' : currentLang === 'es' ? '/es/guiones-para-ventas' : '/en/scripts-for-sales'}
                    className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors border border-slate-700 font-semibold">
                    {currentLang === 'pt' ? 'Vendas' : currentLang === 'es' ? 'Ventas' : 'Sales'}
                </a>
                <a href={currentLang === 'pt' ? '/scripts-para-aulas' : currentLang === 'es' ? '/es/guiones-para-clases' : '/en/scripts-for-classes'}
                    className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors border border-slate-700 font-semibold">
                    {currentLang === 'pt' ? 'Aulas' : currentLang === 'es' ? 'Clases' : 'Classes'}
                </a>
                <a href={currentLang === 'pt' ? '/scripts-institucionais' : currentLang === 'es' ? '/es/guiones-institucionales' : '/en/institutional-scripts'}
                    className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors border border-slate-700 font-semibold">
                    {currentLang === 'pt' ? 'Institucional' : 'Institutional'}
                </a>
            </div>

            {/* Editorial Content Section */}
            <div className="mt-24 mb-16 max-w-4xl mx-auto">
                <article className="prose prose-invert prose-lg max-w-none">
                    <h2 className="text-3xl font-bold text-purple-400 mb-6">{content.intro[currentLang].title}</h2>
                    <p className="text-slate-300 mb-6 leading-relaxed">
                        {content.intro[currentLang].p1}
                    </p>
                    <p className="text-slate-300 mb-6 leading-relaxed">
                        {content.intro[currentLang].p2}
                    </p>
                    <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 my-8">
                        <h3 className="text-xl font-bold text-white mb-4 mt-0">{content.intro[currentLang].h2_1}</h3>
                        <ul className="space-y-2 mb-0">
                            {content.intro[currentLang].ul_1.map((item, i) => (
                                <li key={i} className="text-slate-300 flex items-start gap-2">
                                    <span className="text-purple-500 mt-1.5">•</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <p className="text-slate-300 mb-6 leading-relaxed">
                        {content.intro[currentLang].p3}
                    </p>
                </article>
            </div>

            {/* FAQ Section */}
            <div className="mb-24 max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-white mb-12">{content.faq.title[currentLang]}</h2>
                <div className="grid gap-6">
                    {content.faq.items.map((item, index) => (
                        <div key={index} className="bg-slate-900/40 border border-slate-800/60 rounded-xl p-6 hover:bg-slate-900/60 transition-colors">
                            <h3 className="text-lg font-bold text-purple-300 mb-3 !mt-0">
                                {item.q[currentLang]}
                            </h3>
                            <p className="text-slate-400 leading-relaxed m-0">
                                {item.a[currentLang]}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-16 p-8 bg-slate-900 rounded-2xl border border-slate-800 text-center">
                <h2 className="text-2xl font-semibold text-white mb-4 !mt-0">
                    {currentLang === 'pt' ? "Não achou o que procurava?" : "Didn't find what you were looking for?"}
                </h2>
                <p className="text-slate-400 mb-6">
                    {currentLang === 'pt' ?
                        "Crie seu próprio roteiro agora mesmo usando nosso editor profissional." :
                        "Create your own script right now using our professional editor."}
                </p>
                <button
                    onClick={onLaunch}
                    className="px-8 py-3 bg-white text-slate-900 font-bold rounded-full hover:bg-slate-200 transition-all transform hover:scale-105"
                >
                    {currentLang === 'pt' ? "Abrir Editor em Branco" : "Open Blank Editor"}
                </button>
            </div>
        </SeoPageLayout>
    );
};
