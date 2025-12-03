import React from "react";
import * as S from "../../components/ui/Styled";
import { Header } from "../../components/landing/Header";
import { FinalCTA } from "../../components/landing/FinalCTA";
import { useTranslation } from "../../hooks/useTranslation";
import { useSeo } from "../../hooks/useSeo";

interface SeoPageLayoutProps {
    title: string;
    description: string;
    canonicalUrl?: string;
    onLaunch: () => void;
    children: React.ReactNode;
}

export const SeoPageLayout: React.FC<SeoPageLayoutProps> = ({
    title,
    description,
    canonicalUrl,
    onLaunch,
    children
}) => {
    const { t } = useTranslation();
    useSeo({ title, description, canonicalUrl });

    return (
        <S.LandingContainer>
            <Header onLaunch={onLaunch} />
            
            <div className="relative pt-32 pb-16 md:pt-48 md:pb-32 overflow-hidden">
                {/* Background Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none z-0">
                    <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px]" />
                    <div className="absolute top-40 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px]" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 mb-6 leading-tight">
                        {title.split(":")[0]}
                        {title.includes(":") && (
                            <span className="block text-2xl md:text-3xl mt-4 font-normal text-slate-400">
                                {title.split(":")[1]}
                            </span>
                        )}
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full mb-8 opacity-80"></div>
                </div>
            </div>

            <main className="relative z-10 pb-24 px-6 max-w-3xl mx-auto">
                <article className="prose prose-invert prose-lg prose-slate max-w-none 
                    prose-headings:text-white prose-headings:font-bold 
                    prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 
                    prose-h3:text-xl prose-h3:text-blue-400
                    prose-p:text-slate-300 prose-p:leading-relaxed
                    prose-strong:text-white prose-strong:font-semibold
                    prose-ul:my-6 prose-li:marker:text-purple-500
                    prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline">
                    {children}
                </article>
            </main>

            <FinalCTA onLaunch={onLaunch} />

            <footer className="py-12 border-t border-slate-900 text-center text-slate-500 text-sm bg-[#020617]">
                <p>&copy; {new Date().getFullYear()} {t("footer.copyright")}</p>
            </footer>
        </S.LandingContainer>
    );
};
