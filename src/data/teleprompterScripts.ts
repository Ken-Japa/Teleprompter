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
        title: { pt: "Scripts para YouTube: Como Estruturar Vídeos! | PromptNinja", en: "YouTube", es: "YouTube" },
        description: {
            pt: "Roteiros otimizados para vídeos longos, vlogs e tutoriais. Templates prontos para YouTube.",
            en: "Scripts optimized for long videos, vlogs, and tutorials. Focus on retention and engagement.",
            es: "Guiones optimizados para videos largos, vlogs y tutoriales. Enfoque en retención e interacción."
        },
        seoIntro: {
            pt: "# Scripts para YouTube: Como Estruturar Vídeos que Geram Retenção e Inscritos!\n\nVocê já começou a gravar um vídeo para o YouTube e percebeu que estava \"dando voltas\" e não chegava ao ponto principal? O YouTube é uma plataforma de busca, mas o que mantém seu canal vivo é a **retenção**. Se o espectador sente que seu vídeo está desorganizado, ele sai. Um roteiro bem estruturado é a diferença entre um vídeo que flopa e um vídeo que o algoritmo recomenda para milhares de pessoas.\n\nNo **PromptNinja**, nossa missão é simplificar sua produção. Desenvolvemos uma coleção de **templates de scripts para YouTube** baseados nas estruturas que mais funcionam hoje: tutoriais passo a passo, vlogs pessoais e vídeos educacionais. Nossos modelos garantem que você tenha um gancho forte, um conteúdo fluido e chamadas para ação que transformam espectadores em inscritos fiéis. Use nosso teleprompter online para gravar com clareza, mantendo a autoridade e o contato visual o tempo todo.\n\n---\n\n### Por que Ter um Roteiro é Obrigatório no YouTube?\n\n*   **Controle do Fluxo:** Evite silêncios constrangedores ou o hábito de dizer \"ééé...\" enquanto pensa no próximo tópico.\n*   **Retenção Otimizada:** Estruturas pensadas para entregar valor rapidamente e manter o interesse até o final do vídeo.\n*   **Posicionamento de CTAs:** Saiba exatamente o momento certo de pedir o like ou a inscrição sem interromper o ritmo do vídeo.\n*   **Profissionalismo:** Criadores que usam roteiro passam muito mais confiança e autoridade sobre o assunto.\n\nNavegue pelos nossos templates abaixo, personalize para o seu nicho e comece a ver suas métricas de retenção subirem!",
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
        title: { pt: "Scripts para TikTok e Reels: Como Viralizar! | PromptNinja", en: "TikTok & Reels", es: "TikTok & Reels" },
        description: {
            pt: "Vídeos curtos e dinâmicos. Ganchos fortes e templates prontos para TikTok e Reels.",
            en: "Short and dynamic videos. Strong hooks and straight-to-the-point content to go viral.",
            es: "Videos cortos y dinámicos. Ganchos fuertes y contenido directo al grano para viralizar."
        },
        seoIntro: {
            pt: "# Scripts para TikTok e Reels: Como Viralizar com Roteiros que Prendem a Atenção!\n\nVocê tem apenas **3 segundos**. Esse é o tempo que você tem para evitar que o espectador arraste para o próximo vídeo. No TikTok e no Instagram Reels, a retenção é o rei. Se você demorar para chegar ao ponto, se sua introdução for lenta ou se você não tiver clareza no que está dizendo, o algoritmo simplesmente para de entregar seu conteúdo. Mas como criar vídeos dinâmicos, autênticos e certeiros de forma consistente?\n\nO segredo está no roteiro otimizado para o formato vertical. No **PromptNinja**, facilitamos sua vida de criador. Nossa curadoria de **templates de scripts para TikTok e Reels** foi pensada para quem precisa de agilidade sem abrir mão da qualidade. São modelos com ganchos (hooks) poderosos, desenvolvimento rápido e CTAs que convertem seguidores em comunidade. E o melhor: use nosso teleprompter para ler enquanto olha para a lente, garantindo aquela conexão olho-no-olho que gera engajamento real.\n\n---\n\n### O Que Faz um Roteiro de Vídeo Curto Viralizar?\n\n*   **O Gancho (Hook) de Impacto:** Nossos scripts começam com frases que despertam curiosidade imediata ou resolvem uma dor do espectador nos primeiros instantes.\n*   **Ritmo e Escaneabilidade:** Modelos escritos para serem lidos de forma dinâmica, evitando frases longas e complexas que cansam o público.\n*   **Pausas Estratégicas:** Sugestões de onde fazer transições ou mudar o ângulo, mantendo o dinamismo visual da peça.\n*   **Calls to Action Rápidas:** Convites para seguir, comentar ou compartilhar integrados de forma orgânica no final do vídeo.\n\nEscolha um dos nossos modelos abaixo, cole no teleprompter e prepare-se para o \"burn\" de visualizações!",
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
        title: { pt: "Scripts para Vendas e VSL: Templates de Alta Conversão | PromptNinja", en: "Sales & Marketing", es: "Ventas y Marketing" },
        description: {
            pt: "Transforme seus vídeos de vendas com roteiros persuasivos. Use nossos templates gratuitos de VSL, anúncios e webinars no teleprompter e venda mais!",
            en: "High-conversion scripts for VSLs, ads, and sales letters.",
            es: "Guiones de alta conversión para VSLs, anuncios y cartas de ventas."
        },
        seoIntro: {
            pt: "# Scripts para Vendas e VSL: Transforme Palavras em Resultados!\n\nVocê já se perguntou por que alguns vídeos de vendas prendem sua atenção do início ao fim e te fazem querer comprar, enquanto outros você fecha nos primeiros segundos? O segredo não está apenas no produto, mas na **estrutura do roteiro**. Um script de vendas eficaz, seja para um anúncio rápido ou uma VSL (Video Sales Letter) de 15 minutos, precisa seguir uma lógica psicológica de persuasão: prender a atenção (Gancho), despertar o interesse, criar desejo e, finalmente, convocar para a ação (CTA).\n\nNo **PromptNinja**, facilitamos sua jornada de vendas. Criamos uma seleção de **templates de scripts para vendas** totalmente gratuitos, baseados nas melhores práticas de copywriting. Esses modelos foram desenhados para serem lidos com naturalidade no teleprompter, garantindo que você mantenha a autoridade, a fluidez e, mais importante, o contato visual que gera confiança no seu potencial cliente.\n\n---\n\n### Os Pilares de um Roteiro de Vendas de Alta Conversão:\n\n*   **O Gancho Irresistível:** Os primeiros 5 segundos definem tudo. Nossos modelos ajudam você a começar com uma promessa forte ou uma pergunta instigante.\n*   **A Jornada da Solução:** Estruturamos o roteiro para que você apresente o problema do seu cliente e mostre como seu produto é a ponte para a solução.\n*   **Prova Social e Autoridade:** Espaços reservados para você inserir feedbacks e conquistas, aumentando a confiança na sua oferta.\n*   **CTA Inequivocável:** Nada de scripts que \"acabam do nada\". Todos os nossos templates guiam para um próximo passo claro e direto.\n\nBaixe ou abra nossos templates de vendas abaixo e comece a escalar seus resultados hoje mesmo!",
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
        title: { pt: "Scripts para Aulas e Cursos Online | PromptNinja", en: "Classes & Courses", es: "Clases y Cursos" },
        description: {
            pt: "Estruturas didáticas para professores e infoprodutores. Templates prontos para aulas.",
            en: "Didactic structures for teachers and course creators.",
            es: "Estructuras didácticas para profesores y creadores de cursos."
        },
        seoIntro: {
            pt: "# Scripts para Aulas e Cursos Online: Ensine com Clareza e Autoridade!\n\nVocê já sentiu que sua aula \"rendeu pouco\" ou que você se perdeu em detalhes técnicos, esquecendo de explicar o cerne do assunto? Para professores, tutores e infoprodutores, a clareza na exposição é fundamental para o aprendizado do aluno (e para a satisfação com o curso). No ambiente online, onde as distrações estão a um clique de distância, uma aula precisa ser estruturada, direta e envolvente.\n\nNo **PromptNinja**, facilitamos sua missão de ensinar. Nossa seleção de **templates de scripts para aulas e cursos** foi desenhada para quem precisa organizar o conhecimento de forma didática e profissional. São modelos que guiam desde a introdução do tema até a conclusão, garantindo que você não esqueça nenhum ponto crucial e mantenha um ritmo constante. Com o uso do teleprompter, você olha fixo na câmera, transmitindo muito mais segurança e conexão com seus alunos, como se estivesse em uma aula presencial de elite.\n\n---\n\n### Por que Usar Roteiros Didáticos em Suas Aulas?\n\n*   **Organização do Pensamento:** Garante que a aula siga uma sequência lógica: Introdução, Desenvolvimento, Exemplos Práticos e Conclusão.\n*   **Economia de Tempo:** Grave suas aulas de primeira. Sem necessidade de regravações por causa de gaguejos ou esquecimentos.\n*   **Foco na Didática:** Com o texto garantido no teleprompter, você pode focar na sua expressão corporal, tom de voz e entonação, tornando a aula muito mais rica.\n*   **Autoridade Flutuante:** Ler com naturalidade enquanto mantém o contato visual eleva instantaneamente sua percepção de autoridade perante o aluno.\n\nNavegue por nossos modelos de aula abaixo, adapte para seu tema e transforme a experiência de aprendizado dos seus alunos!",
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
        title: { pt: "Scripts Institucionais e Corporativos | PromptNinja", en: "Institutional & Corporate", es: "Institucional y Corporativo" },
        description: {
            pt: "Comunicação interna, mensagens de liderança e modelos de roteiro corporativo.",
            en: "Internal communication, leadership messages, and official statements.",
            es: "Comunicación interna, mensajes de liderazgo y comunicados oficiales."
        },
        seoIntro: {
            pt: "# Scripts Institucionais e Corporativos: Comunique sua Marca com Profissionalismo!\n\nA comunicação corporativa exige um equilíbrio delicado entre clareza, autoridade e empatia. Seja um comunicado de liderança, um vídeo de treinamento interno ou uma apresentação institucional para clientes, a forma como a mensagem é entregue diz tanto quanto o conteúdo em si. No mundo corporativo, o tempo é escasso e a precisão é fundamental. Um vídeo mal ensaiado ou com leitura hesitante pode comprometer a credibilidade da marca ou da liderança.\n\nNo **PromptNinja**, entendemos as demandas das empresas modernas. Criamos uma seleção de **templates de scripts institucionais e corporativos** totalmente gratuitos, desenhados para facilitar a gravação de comunicados oficiais e vídeos de marca. Nossos modelos ajudam você a manter o tom de voz correto e a estrutura necessária para uma comunicação eficaz. Combinado com o uso do teleprompter, qualquer porta-voz pode entregar uma mensagem impecável, mantendo o contato visual e a confiança do início ao fim.\n\n---\n\n### Os Benefícios da Roteirização Corporativa:\n\n*   **Precisão na Mensagem:** Garante que todos os pontos chaves e informações sensíveis sejam transmitidos corretamente, sem improvisos arriscados.\n*   **Economia de Tempo Executivo:** Grave comunicados rapidamente. Otimize o tempo de diretores e gestores com uma estrutura pronta e leitura guiada.\n*   **Alinhamento de Marca:** Mantém o tom de voz e a terminologia oficial da empresa em todas as comunicações em vídeo.\n*   **Conexão com Colaboradores:** A leitura natural no teleprompter permite que a liderança mantenha o contato visual com a câmera, humanizando a mensagem corporativa.\n\nExplore nossos modelos institucionais abaixo e eleve o padrão da sua comunicação corporativa!",
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
