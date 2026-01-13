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
    seoIntro?: { pt: string; en: string; es: string };
    seoCases?: { pt: string; en: string; es: string };
    slug: { pt: string; en: string; es: string };
    scripts: Script[];
}

export const SCRIPTS_DATA: ScriptCategory[] = [
    {
        id: "youtube",
        title: { pt: "Scripts para YouTube: Modelos de Roteiro para Crescer seu Canal", en: "YouTube", es: "YouTube" },
        description: {
            pt: "Aumente sua retenção no YouTube com nossos templates de roteiro. De tutoriais a vlogs, use o teleprompter PromptNinja para gravar com naturalidade.",
            en: "Scripts optimized for long videos, vlogs, and tutorials. Focus on retention and engagement.",
            es: "Guiones optimizados para videos largos, vlogs y tutoriales. Enfoque en retención e interacción."
        },
        seoIntro: {
            pt: "## Scripts para YouTube: Como Estruturar Vídeos que Geram Inscritos\n\nDomine a retenção do seu canal com roteiros profissionais. **Descubra como estruturar seus vídeos** para manter sua audiência engajada do início ao fim usando os templates gratuitos do PromptNinja.\n\nNesta coleção de modelos para YouTube, focamos no que realmente move o algoritmo: ganchos poderosos e clareza na entrega. Seja você um tutor no nicho de tecnologia, um vlogger de viagens ou um podcaster, ter um roteiro bem definido é a diferença entre um vídeo ignorado e um conteúdo que viraliza. Aprenda a posicionar seus CTAs de forma estratégica e use nosso teleprompter online para manter o contato visual e a autoridade total durante toda a gravação.",
            en: "",
            es: ""
        },
        seoCases: {
            pt: `<section id="cases-youtube" class="bg-gradient-to-br from-slate-900 to-red-900/20 p-8 rounded-2xl my-16 border border-red-500/20 shadow-2xl text-center">
    <h2 class="text-2xl font-extrabold text-white mb-10">YouTubers que Profissionalizaram seu Canal! (E-E-A-T)</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="bg-slate-800/50 p-6 rounded-xl shadow-lg border-l-4 border-red-500 backdrop-blur-sm text-left">
            <p class="text-slate-300 italic text-sm">"Minhas métricas de retenção mudaram da água pro vinho. O template de tutorial me ajudou a ser muito mais direto ao ponto e os comentários agora são só elogios."</p>
            <span class="block mt-4 text-xs font-bold text-red-400 uppercase tracking-widest">— Carlos Tech, Canal de Tutoriais</span>
        </div>
        <div class="bg-slate-800/50 p-6 rounded-xl shadow-lg border-l-4 border-orange-500 backdrop-blur-sm text-left">
            <p class="text-slate-300 italic text-sm">"O teleprompter do PromptNinja combinado com os roteiros prontos economizou metade do meu tempo de gravação. Consigo postar 3 vezes por semana agora!"</p>
            <span class="block mt-4 text-xs font-bold text-orange-400 uppercase tracking-widest">— Ana Clara, Vlogger de Viagens</span>
        </div>
    </div>
</section>`,
            en: "",
            es: ""
        },
        slug: { pt: "scripts-para-youtube", en: "scripts-for-youtube", es: "guiones-para-youtube" },
        scripts: YOUTUBE_SCRIPTS
    },
    {
        id: "tiktok-reels",
        title: { pt: "Scripts para TikTok e Reels: Ganchos que Viralizam", en: "TikTok & Reels", es: "TikTok & Reels" },
        description: {
            pt: "Crie vídeos curtos dinâmicos com ganchos impossíveis de ignorar. Use nossos templates para TikTok e Reels e grave sem erros com o PromptNinja.",
            en: "Short and dynamic videos. Strong hooks and straight-to-the-point content to go viral.",
            es: "Videos cortos y dinámicos. Ganchos fuertes y contenido directo al grano para viralizar."
        },
        seoIntro: {
            pt: "## Scripts para TikTok e Reels: Prenda a Atenção em 3 Segundos\n\nNo mundo dos vídeos verticais, cada frame importa. **Aprenda a criar roteiros rápidos e magnéticos** que transformam scrolls em visualizações e visualizações em seguidores.\n\nO segredo dos produtores de sucesso no TikTok e Instagram Reels está na estrutura do gancho (hook). Nossos templates gratuitos foram desenhados para entregar o máximo de valor no menor tempo possível, garantindo que sua mensagem seja transmitida com energia e precisão. Use o teleprompter vertical do PromptNinja para manter o olhar na lente do celular e transmitir a autenticidade necessária para viralizar nas redes sociais.",
            en: "",
            es: ""
        },
        seoCases: {
            pt: `<section id="cases-tiktok" class="bg-gradient-to-br from-slate-900 to-pink-900/20 p-8 rounded-2xl my-16 border border-pink-500/20 shadow-2xl text-center">
    <h2 class="text-2xl font-extrabold text-white mb-10">Criadores que Viralizaram com Nossos Modelos! (E-E-A-T)</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="bg-slate-800/50 p-6 rounded-xl shadow-lg border-l-4 border-pink-500 backdrop-blur-sm text-left">
            <p class="text-slate-300 italic text-sm">"Eu não sabia como começar meus vídeos. O template de 'O Segredo que Ninguém Te Conta' deu um boost absurdo na minha retenção. Meu primeiro vídeo passou de 100k views!"</p>
            <span class="block mt-4 text-xs font-bold text-pink-400 uppercase tracking-widest">— Julia Mendes, Criadora de Lifestyle</span>
        </div>
        <div class="bg-slate-800/50 p-6 rounded-xl shadow-lg border-l-4 border-purple-500 backdrop-blur-sm text-left">
            <p class="text-slate-300 italic text-sm">"Gravar Reels era um parto porque eu esquecia as frases. Com o teleprompter + os scripts prontos, agora gravo 10 vídeos em menos de 1 hora."</p>
            <span class="block mt-4 text-xs font-bold text-purple-400 uppercase tracking-widest">— Lucas Silva, Tech Reviewer</span>
        </div>
    </div>
</section>`,
            en: "",
            es: ""
        },
        slug: { pt: "scripts-para-tiktok-reels", en: "scripts-for-tiktok-shorts", es: "guiones-para-tiktok-shorts" },
        scripts: TIKTOK_SCRIPTS
    },
    {
        id: "sales",
        title: { pt: "Scripts para Vendas e VSL: Modelos de Alta Conversão", en: "Sales & Marketing", es: "Ventas y Marketing" },
        description: {
            pt: "Venda mais com roteiros baseados em gatilhos mentais e persuasão. Templates de VSL e anúncios otimizados para usar no teleprompter PromptNinja.",
            en: "High-conversion scripts for VSLs, ads, and sales letters.",
            es: "Guiones de alta conversión para VSLs, anuncios y cartas de ventas."
        },
        seoIntro: {
            pt: "## Scripts para Vendas e VSL: A Arte da Persuasão em Vídeo\n\nTransforme seus espectadores em clientes com estruturas de copywriting validadas. **Descubra como criar vídeos de vendas impactantes** usando modelos que guiam sua fala do gancho ao checkout.\n\nUm roteiro de vendas eficiente não é apenas sobre o produto, mas sobre a jornada emocional do cliente. Nossos templates para VSL (Video Sales Letter) e anúncios cobrem desde a identificação da dor até a oferta irresistível. Ao usar o PromptNinja, você garante uma leitura fluida e autoritária, mantendo o contato visual que gera a confiança necessária para fechar vendas online.",
            en: "",
            es: ""
        },
        seoCases: {
            pt: `<section id="cases-vendas" class="bg-gradient-to-br from-slate-900 to-blue-900/20 p-8 rounded-2xl my-16 border border-blue-500/20 shadow-2xl text-center">
    <h2 class="text-2xl font-extrabold text-white mb-10">Quem Vendeu Mais com Nossos Scripts! (E-E-A-T)</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="bg-slate-800/50 p-6 rounded-xl shadow-lg border-l-4 border-blue-500 backdrop-blur-sm text-left">
            <p class="text-slate-300 italic text-sm">"Minhas VSLs eram confusas. Usando o template de 'AIDA' do PromptNinja, consegui estruturar melhor o pitch e as conversões aumentaram em 20% no primeiro teste."</p>
            <span class="block mt-4 text-xs font-bold text-blue-400 uppercase tracking-widest">— Jonas Rocha, Infoprodutor</span>
        </div>
        <div class="bg-slate-800/50 p-6 rounded-xl shadow-lg border-l-4 border-cyan-500 backdrop-blur-sm text-left">
            <p class="text-slate-300 italic text-sm">"Os scripts para anúncios curtos são sensacionais. Facilitam demais a gravação e a gente consegue testar vários ganchos rapidinho no teleprompter."</p>
            <span class="block mt-4 text-xs font-bold text-cyan-400 uppercase tracking-widest">— Equipe de Performance, Agencia Alpha</span>
        </div>
    </div>
</section>`,
            en: "",
            es: ""
        },
        slug: { pt: "scripts-para-vendas", en: "scripts-for-sales", es: "guiones-para-ventas" },
        scripts: SALES_SCRIPTS
    },
    {
        id: "classes",
        title: { pt: "Scripts para Aulas e Cursos: Transmita Autoridade Didática", en: "Classes & Courses", es: "Clases y Cursos" },
        description: {
            pt: "Grave suas aulas online com clareza e ritmo profissional. Modelos de roteiro didático para professores e infoprodutores usarem no PromptNinja.",
            en: "Didactic structures for teachers and course creators.",
            es: "Estructuras didácticas para profesores y creadores de cursos."
        },
        seoIntro: {
            pt: "## Scripts para Aulas e Cursos: Ensino Fluido e Profissional\n\nEleve o nível pedagógico dos seus vídeos com organizações lógicas de conteúdo. **Saiba como estruturar suas aulas** para facilitar o aprendizado e manter a autoridade em frente à câmera.\n\nPara educadores e criadores de cursos online, a clareza é a ferramenta mais poderosa. Nossos templates didáticos ajudam a organizar introduções, conceitos complexos e conclusões de forma natural. Com o suporte do PromptNinja, você pode focar totalmente na explicação e na didática, sem o estresse de esquecer tópicos ou perder o fio da meada, transmitindo segurança total aos seus alunos.",
            en: "",
            es: ""
        },
        seoCases: {
            pt: `<section id="cases-aulas" class="bg-gradient-to-br from-slate-900 to-green-900/20 p-8 rounded-2xl my-16 border border-green-500/20 shadow-2xl text-center">
    <h2 class="text-2xl font-extrabold text-white mb-10">Quem Elevou o Nível das Aulas Online! (E-E-A-T)</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="bg-slate-800/50 p-6 rounded-xl shadow-lg border-l-4 border-green-500 backdrop-blur-sm text-left">
            <p class="text-slate-300 italic text-sm">"Eu perdia muito tempo regravando aulas. Com os templates didáticos, agora consigo gravar um módulo inteiro em uma manhã. Meus alunos elogiaram a clareza!"</p>
            <span class="block mt-4 text-xs font-bold text-green-400 uppercase tracking-widest">— Prof. Arthur Lima, Curso de Programação</span>
        </div>
        <div class="bg-slate-800/50 p-6 rounded-xl shadow-lg border-l-4 border-teal-500 backdrop-blur-sm text-left">
            <p class="text-slate-300 italic text-sm">"O teleprompter do PromptNinja é meu braço direito na gravação do meu infoproduto. Os roteiros ajudam a não me perder nos detalhes técnicos."</p>
            <span class="block mt-4 text-xs font-bold text-teal-400 uppercase tracking-widest">— Letícia Gonçalves, Especialista em Marketing</span>
        </div>
    </div>
</section>`,
            en: "",
            es: ""
        },
        slug: { pt: "scripts-para-aulas", en: "scripts-for-classes", es: "guiones-para-clases" },
        scripts: CLASSES_SCRIPTS
    },
    {
        id: "institutional",
        title: { pt: "Scripts Corporativos: Comunicação Profissional e Líder", en: "Institutional & Corporate", es: "Institucional y Corporativo" },
        description: {
            pt: "Grave comunicados e vídeos de marca com precisão executiva. Templates para mensagens de liderança e comunicados corporativos no PromptNinja.",
            en: "Internal communication, leadership messages, and official statements.",
            es: "Comunicación interna, mensajes de liderazgo y comunicados oficiales."
        },
        seoIntro: {
            pt: "## Scripts Corporativos: Mensagens de Liderança com Impacto\n\nGaranta que cada palavra da sua empresa seja entregue com precisão e autoridade. **Utilize modelos estruturados** para comunicados internos, apresentações de resultados e vídeos institucionais.\n\nNo ambiente corporativo, a clareza da mensagem é um ativo estratégico. Nossos templates foram desenvolvidos para líderes e gestores que precisam transmitir confiança e transparência em seus vídeos. Usando o teleprompter PromptNinja, você elimina a necessidade de improvisos arriscados, garantindo que pontos sensíveis e informações vitais sejam comunicados com total naturalidade e contato visual constante.",
            en: "",
            es: ""
        },
        seoCases: {
            pt: `<section id="cases-corp" class="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-2xl my-16 border border-slate-700 shadow-2xl text-center">
    <h2 class="text-2xl font-extrabold text-white mb-10">Empresas que Modernizaram sua Comunicação! (E-E-A-T)</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="bg-slate-800 p-6 rounded-xl shadow-lg border-l-4 border-slate-500 text-left">
            <p class="text-slate-300 italic text-sm">"Nossos comunicados internos ficaram muito mais profissionais. O uso do teleprompter + roteiros prontos deu mais segurança para nossos diretores gravarem as mensagens semanais."</p>
            <span class="block mt-4 text-xs font-bold text-slate-400 uppercase tracking-widest">— Gerente de RH, Tech Solutions Inc.</span>
        </div>
        <div class="bg-slate-800 p-6 rounded-xl shadow-lg border-l-4 border-indigo-500 text-left">
            <p class="text-slate-300 italic text-sm">"Para vídeos de onboarding, os templates são excelentes. Facilitam a vida de quem está apresentando e garantem que nada importante seja esquecido."</p>
            <span class="block mt-4 text-xs font-bold text-indigo-400 uppercase tracking-widest">— Head de L&D, Grupo Vanguarda</span>
        </div>
    </div>
</section>`,
            en: "",
            es: ""
        },
        slug: { pt: "scripts-institucionais", en: "institutional-scripts", es: "guiones-institucionales" },
        scripts: INSTITUTIONAL_SCRIPTS
    }
];
