import React from 'react';

interface LinkItem {
    label: string;
    href: string;
}

interface Props {
    title?: string;
    links: LinkItem[];
}

/**
 * Componente para exibir links relacionados em páginas de SEO.
 * Melhora a linkagem interna e o tempo de permanência do usuário.
 */
export const SEORelatedLinks: React.FC<Props> = ({
    title = "Conteúdos Relacionados",
    links
}) => {
    if (!links || links.length === 0) return null;

    return (
        <div className="mt-16 pt-8 border-t border-slate-800">
            <h3 className="text-2xl font-bold text-white mb-6">{title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {links.map((link, index) => (
                    <a
                        key={index}
                        href={link.href}
                        className="group p-4 bg-slate-900/50 border border-slate-800 rounded-xl hover:border-blue-500/50 transition-all hover:bg-slate-800"
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-slate-300 group-hover:text-white font-medium transition-colors">
                                {link.label}
                            </span>
                            <span className="text-slate-500 group-hover:text-blue-400 transform group-hover:translate-x-1 transition-all">
                                →
                            </span>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};
