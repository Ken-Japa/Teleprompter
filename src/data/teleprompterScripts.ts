import { YOUTUBE_SCRIPTS } from './scripts/youtube';
import { TIKTOK_SCRIPTS } from './scripts/tiktok';
import { SALES_SCRIPTS } from './scripts/sales';
import { CLASSES_SCRIPTS } from './scripts/classes';
import { INSTITUTIONAL_SCRIPTS } from './scripts/institutional';

export interface Script {
    id: string;
    title: { pt: string; en: string; es: string };
    tags: string[];
    content: { pt: string; en: string; es: string };
}

export interface ScriptCategory {
    id: string;
    title: { pt: string; en: string; es: string };
    description: { pt: string; en: string; es: string };
    slug: { pt: string; en: string; es: string };
    scripts: Script[];
}

export const SCRIPTS_DATA: ScriptCategory[] = [
    {
        id: "youtube",
        title: { pt: "YouTube", en: "YouTube", es: "YouTube" },
        description: {
            pt: "Roteiros otimizados para vídeos longos, vlogs e tutoriais. Foco em retenção e engajamento.",
            en: "Scripts optimized for long videos, vlogs, and tutorials. Focus on retention and engagement.",
            es: "Guiones optimizados para videos largos, vlogs y tutoriales. Enfoque en retención e interacción."
        },
        slug: { pt: "scripts-para-youtube", en: "scripts-for-youtube", es: "guiones-para-youtube" },
        scripts: YOUTUBE_SCRIPTS
    },
    {
        id: "tiktok-reels",
        title: { pt: "TikTok & Reels", en: "TikTok & Reels", es: "TikTok & Reels" },
        description: {
            pt: "Vídeos curtos e dinâmicos. Ganchos fortes e conteúdo direto ao ponto para viralizar.",
            en: "Short and dynamic videos. Strong hooks and straight-to-the-point content to go viral.",
            es: "Videos cortos y dinámicos. Ganchos fuertes y contenido directo al grano para viralizar."
        },
        slug: { pt: "scripts-para-tiktok-reels", en: "scripts-for-tiktok-shorts", es: "guiones-para-tiktok-shorts" },
        scripts: TIKTOK_SCRIPTS
    },
    {
        id: "sales",
        title: { pt: "Vendas & Marketing", en: "Sales & Marketing", es: "Ventas y Marketing" },
        description: {
            pt: "Scripts de alta conversão para VSLs, anúncios e cartas de vendas.",
            en: "High-conversion scripts for VSLs, ads, and sales letters.",
            es: "Guiones de alta conversión para VSLs, anuncios y cartas de ventas."
        },
        slug: { pt: "scripts-para-vendas", en: "scripts-for-sales", es: "guiones-para-ventas" },
        scripts: SALES_SCRIPTS
    },
    {
        id: "classes",
        title: { pt: "Aulas & Cursos", en: "Classes & Courses", es: "Clases y Cursos" },
        description: {
            pt: "Estruturas didáticas para professores e infoprodutores.",
            en: "Didactic structures for teachers and course creators.",
            es: "Estructuras didácticas para profesores y creadores de cursos."
        },
        slug: { pt: "scripts-para-aulas", en: "scripts-for-classes", es: "guiones-para-clases" },
        scripts: CLASSES_SCRIPTS
    },
    {
        id: "institutional",
        title: { pt: "Institucional & Corporativo", en: "Institutional & Corporate", es: "Institucional y Corporativo" },
        description: {
            pt: "Comunicação interna, mensagens de liderança e comunicados oficiais.",
            en: "Internal communication, leadership messages, and official statements.",
            es: "Comunicación interna, mensajes de liderazgo y comunicados oficiales."
        },
        slug: { pt: "scripts-institucionais", en: "institutional-scripts", es: "guiones-institucionales" },
        scripts: INSTITUTIONAL_SCRIPTS
    }
];
