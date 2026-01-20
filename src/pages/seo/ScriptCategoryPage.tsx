
import React, { useState } from 'react';
import { SeoPageLayout } from './SeoPageLayout';
import { useTranslation } from '../../hooks/useTranslation';
import { SCRIPTS_DATA, Script } from '../../data/teleprompterScripts';
import { SEOImage } from '../../components/seo/SEOImage';

interface ScriptCategoryPageProps {
    categoryId: string;
    onLaunch: () => void;
}

const CATEGORY_IMAGES: Record<string, { slug: string; src: string; alt: Record<string, string>; caption: Record<string, string> }[]> = {
    classes: [
        {
            slug: "scripts-para-aulas",
            src: "scripts-for-teacher-lessons.webp",
            alt: {
                pt: "Professor usando teleprompter para dar aula online",
                en: "Teacher using teleprompter for online classes",
                es: "Profesor usando teleprompter para clases online"
            },
            caption: {
                pt: "O PromptNinja ajuda educadores a manterem o ritmo e o contato visual durante aulas gravadas ou ao vivo.",
                en: "PromptNinja helps educators maintain pacing and eye contact during recorded or live classes.",
                es: "PromptNinja ayuda a los educadores a mantener el ritmo y el contacto visual durante las clases grabadas o en vivo."
            }
        },
        {
            slug: "scripts-para-aulas",
            src: "scripts-for-presentation-classes.webp",
            alt: {
                pt: "Apresentação de slides com teleprompter integrado",
                en: "Slide presentation with integrated teleprompter",
                es: "Presentación de diapositivas con teleprompter integrado"
            },
            caption: {
                pt: "Sincronize seus slides com seu roteiro e nunca mais perca o fio da meada em suas apresentações.",
                en: "Synchronize your slides with your script and never lose your train of thought in your presentations.",
                es: "Sincroniza tus diapositivas con tu guion y nunca más pierdas el hilo en tus presentaciones."
            }
        }
    ],
    sales: [
        {
            slug: "scripts-para-vendas",
            src: "scripts-for-sales-persuasion.webp",
            alt: {
                pt: "Roteiro de vendas persuasivo no teleprompter",
                en: "Persuasive sales script on teleprompter",
                es: "Guion de ventas persuasivo en el teleprompter"
            },
            caption: {
                pt: "Aumente suas conversões com roteiros de vendas estruturados e entrega profissional.",
                en: "Increase your conversions with structured sales scripts and professional delivery.",
                es: "Aumente sus conversiones con guiones de ventas estructurados y entrega profesional."
            }
        },
        {
            slug: "scripts-para-vendas",
            src: "scripts-for-sales-copywriting.webp",
            alt: {
                pt: "Copywriter revisando roteiro de vendas",
                en: "Copywriter reviewing sales script",
                es: "Copywriter revisando guion de ventas"
            },
            caption: {
                pt: "A arte da persuasão aliada à tecnologia do teleprompter para resultados máximos.",
                en: "The art of persuasion combined with teleprompter technology for maximum results.",
                es: "El arte de la persuasión aliado a la tecnología del teleprompter para resultados máximos."
            }
        }
    ],
    institutional: [
        {
            slug: "scripts-institucionais",
            src: "corporate-institutional-scripts.webp",
            alt: {
                pt: "Vídeo institucional com roteiro profissional",
                en: "Institutional video with professional script",
                es: "Video institucional con guion profesional"
            },
            caption: {
                pt: "Transmita a visão da sua empresa com clareza e autoridade usando roteiros institucionais.",
                en: "Communicate your company's vision with clarity and authority using institutional scripts.",
                es: "Transmita la visión de su empresa con claridad y autoridad usando guiones institucionales."
            }
        }
    ]
};

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
            canonicalUrl={`https://promptninja.solutionkit.com.br${currentLang === 'en' ? `/en/${category.slug.en}` : currentLang === 'es' ? `/es/${category.slug.es}` : `/${category.slug.pt}`}`}
            onLaunch={onLaunch}
        >
            <div className="mb-12">
                {category.seoIntro && category.seoIntro[currentLang] ? (
                    <div className="prose prose-invert prose-lg max-w-none mb-12">
                        {category.seoIntro[currentLang].split('\n\n').map((para, i) => {
                            const images = CATEGORY_IMAGES[categoryId] || [];
                            const showFirstImage = i === 1 && images.length > 0;
                            const showSecondImage = i === 3 && images.length > 1;

                            return (
                                <React.Fragment key={i}>
                                    {para.startsWith('#') ?
                                        <h2 className="text-3xl font-bold text-white mb-6 uppercase tracking-tight">{para.replace('## ', '').replace('# ', '').replace('🚀 ', '')}</h2> :
                                        para.startsWith('###') ?
                                            <h3 className="text-xl font-bold text-white mb-4 mt-8">{para.replace('### ', '')}</h3> :
                                            <p className="text-slate-300 mb-6 leading-relaxed">
                                                {para.split('**').map((part, j) => j % 2 === 1 ? <strong key={j} className="text-white">{part}</strong> : part)}
                                            </p>
                                    }
                                    {showFirstImage && (
                                        <div className="my-8">
                                            <SEOImage
                                                slug={images[0].slug}
                                                src={images[0].src}
                                                alt={images[0].alt[currentLang]}
                                                caption={images[0].caption[currentLang]}
                                                width={1200}
                                                height={675}
                                            />
                                        </div>
                                    )}
                                    {showSecondImage && (
                                        <div className="my-8">
                                            <SEOImage
                                                slug={images[1].slug}
                                                src={images[1].src}
                                                alt={images[1].alt[currentLang]}
                                                caption={images[1].caption[currentLang]}
                                                width={1200}
                                                height={675}
                                            />
                                        </div>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </div>
                ) : (
                    <p className="lead text-xl text-slate-300 mb-8">
                        {category.description[currentLang]}
                    </p>
                )}

                {category.seoCases && category.seoCases[currentLang] && (
                    <div dangerouslySetInnerHTML={{ __html: category.seoCases[currentLang] }} />
                )}

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
