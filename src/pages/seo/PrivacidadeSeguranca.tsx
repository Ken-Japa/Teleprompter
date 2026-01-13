import React from "react";
import { useTranslation } from "../../hooks/useTranslation";
import { SeoPageLayout } from "./SeoPageLayout";
import { PrivacidadeSegurancaPT } from "./content/privacidade-seguranca/pt";
import { PrivacidadeSegurancaEN } from "./content/privacidade-seguranca/en";
import { PrivacidadeSegurancaES } from "./content/privacidade-seguranca/es";

interface Props {
    onLaunch: () => void;
}

export const PrivacidadeSeguranca: React.FC<Props> = ({ onLaunch }) => {
    const { lang } = useTranslation();

    let Content = PrivacidadeSegurancaPT;
    let title = "Privacidade e Segurança no Teleprompter: Seus Dados 100% Locais";
    let description = "Entenda como o PromptNinja protege sua privacidade. Sem login, sem armazenamento em nuvem e com tecnologia WebRTC P2P para controle remoto seguro e privado.";
    let canonicalUrl = "https://promptninja.solutionkit.com.br/teleprompter-privacidade-seguranca";
    let ogImage = "https://promptninja.solutionkit.com.br/og-image.webp";

    // Schema for tech article/privacy policy equivalent
    let schema: object = {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "headline": title,
        "description": description,
        "image": ogImage,
        "author": {
            "@type": "Organization",
            "name": "PromptNinja",
            "url": "https://promptninja.solutionkit.com.br"
        },
        "about": "WebRTC Privacy and Peer-to-Peer Security"
    };

    let ctaText = "Usar com Privacidade Total";

    if (lang === 'en') {
        Content = PrivacidadeSegurancaEN;
        title = "Privacy & Security: WebRTC P2P Teleprompter";
        description = "Understand how PromptNinja protects your data using WebRTC P2P technology. No login, no cloud storage, and 100% local processing.";
        canonicalUrl = "https://promptninja.solutionkit.com.br/en/teleprompter-privacy-security";
        ctaText = "Use with Total Privacy";
    } else if (lang === 'es') {
        Content = PrivacidadeSegurancaES;
        title = "Privacidad y Seguridad: Teleprompter WebRTC P2P";
        description = "Entiende cómo PromptNinja protege tus datos usando tecnología WebRTC P2P. Sin login, sin almacenamiento en la nube y con procesamiento 100% local.";
        canonicalUrl = "https://promptninja.solutionkit.com.br/es/teleprompter-privacidad-seguridad";
        ctaText = "Usar con Privacidad Total";
    }

    return (
        <SeoPageLayout
            title={title}
            description={description}
            canonicalUrl={canonicalUrl}
            ogImage={ogImage}
            schema={schema}
            onLaunch={onLaunch}
        >
            <Content />

            <div className="my-8 p-6 bg-slate-900 rounded-lg border border-slate-800 text-center">
                <button
                    onClick={onLaunch}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-2xl hover:scale-105 transition transform duration-200"
                >
                    {ctaText}
                </button>
            </div>
        </SeoPageLayout>
    );
};
