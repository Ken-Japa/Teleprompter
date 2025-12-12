
import React, { useState } from 'react';
import { SeoPageLayout } from './SeoPageLayout';
import { useTranslation } from '../../hooks/useTranslation';
import { SCRIPTS_DATA, Script } from '../../data/teleprompterScripts';

interface ScriptCategoryPageProps {
    categoryId: string;
    onLaunch: () => void;
}

export const ScriptCategoryPage: React.FC<ScriptCategoryPageProps> = ({ categoryId, onLaunch }) => {
    const { lang } = useTranslation();
    const currentLang = (['pt', 'en', 'es'].includes(lang) ? lang : 'pt') as 'pt' | 'en' | 'es';

    const [copiedScriptId, setCopiedScriptId] = useState<string | null>(null);

    const category = SCRIPTS_DATA.find(c => c.id === categoryId);

    if (!category) {
        return null;
    }

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
        const encodedText = encodeURIComponent(text);
        window.location.href = `/?script=${encodedText}`;
    };

    return (
        <SeoPageLayout
            title={category.title[currentLang]}
            description={category.description[currentLang]}
            canonicalUrl={`https://promptninja.com/${currentLang}/${category.slug[currentLang]}`}
            onLaunch={onLaunch}
        >
            <div className="mb-12">
                <p>
                    {category.description[currentLang]}
                </p>
                <div className="mt-4 p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg">
                    <p className="text-sm text-purple-200 m-0 !mt-0">
                        {currentLang === 'pt' ?
                            "💡 Dica: Esses são apenas alguns exemplos. Para ver a lista completa com todos os modelos, " :
                            "💡 Tip: These are just a few examples. To see the full list with all templates, "}
                        <a href={currentLang === 'pt' ? "/scripts-teleprompter" : "/en/teleprompter-scripts"} className="text-purple-400 font-bold hover:underline">
                            {currentLang === 'pt' ? "clique aqui." : "click here."}
                        </a>
                    </p>
                </div>
            </div>

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

            <div className="mt-16 p-8 bg-slate-900 rounded-2xl border border-slate-800 text-center">
                <h2 className="text-2xl font-semibold text-white mb-4 !mt-0">
                    {currentLang === 'pt' ? "Mais modelos e scripts?" : "More templates and scripts?"}
                </h2>
                <div className="flex flex-wrap justify-center gap-3 mt-6 max-w-4xl mx-auto">
                    <a href={currentLang === 'pt' ? "/scripts-teleprompter" : "/en/teleprompter-scripts"} className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-medium rounded-lg transition-all shadow-lg shadow-purple-900/20 hover:shadow-purple-700/40 transform hover:-translate-y-0.5">
                        {currentLang === 'pt' ? "Ver Todos os Scripts" : "View All Scripts"}
                    </a>
                    {SCRIPTS_DATA.filter(c => c.id !== categoryId).map(c => (
                        <a key={c.id} href={currentLang === 'pt' ? `/${c.slug.pt}` : `/en/${c.slug.en}`} className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-all border border-slate-700 hover:border-slate-600 text-sm font-medium hover:text-white">
                            {c.title[currentLang]}
                        </a>
                    ))}
                </div>
            </div>
        </SeoPageLayout>
    );
};
