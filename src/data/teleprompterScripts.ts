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
            en: "## YouTube Scripts: How to Structure Videos That Gain Subscribers\n\nMaster your channel's retention with professional scripts. **Discover how to structure your videos** to keep your audience engaged from start to finish using PromptNinja's free templates.\n\nIn this collection of YouTube models, we focus on what really moves the algorithm: powerful hooks and clarity in delivery. Whether you're a tech tutor, a travel vlogger, or a podcaster, having a well-defined script is the difference between an ignored video and viral content. Learn to position your CTAs strategically and use our online teleprompter to maintain eye contact and total authority throughout the entire recording.",
            es: "## Guiones para YouTube: Cómo Estructurar Videos que Ganan Suscriptores\n\nDomina la retención de tu canal con guiones profesionales. **Descubre cómo estructurar tus videos** para mantener a tu audiencia enganchada de principio a fin usando las plantillas gratuitas de PromptNinja.\n\nEn esta colección de modelos para YouTube, nos enfocamos en lo que realmente mueve el algoritmo: ganchos poderosos y claridad en la entrega. Ya seas un tutor en el nicho de tecnología, un vlogger de viajes o un podcaster, tener un guion bien definido es la diferencia entre un video ignorado y un contenido que se vuelve viral. Aprende a posicionar tus CTAs de forma estratégica y usa nuestro teleprompter online para mantener el contacto visual y la autoridad total durante toda la grabación."
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
            en: `<section id="cases-youtube" class="bg-gradient-to-br from-slate-900 to-red-900/20 p-8 rounded-2xl my-16 border border-red-500/20 shadow-2xl text-center">
    <h2 class="text-2xl font-extrabold text-white mb-10">YouTubers who Professionalized Their Channel!</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="bg-slate-800/50 p-6 rounded-xl shadow-lg border-l-4 border-red-500 backdrop-blur-sm text-left">
            <p class="text-slate-300 italic text-sm">"My retention metrics changed like night and day. The tutorial template helped me be much more direct and the comments are now only praise."</p>
            <span class="block mt-4 text-xs font-bold text-red-400 uppercase tracking-widest">— Carlos Tech, Tutorials Channel</span>
        </div>
        <div class="bg-slate-800/50 p-6 rounded-xl shadow-lg border-l-4 border-orange-500 backdrop-blur-sm text-left">
            <p class="text-slate-300 italic text-sm">"PromptNinja's teleprompter combined with the ready-made scripts saved half of my recording time. I can post 3 times a week now!"</p>
            <span class="block mt-4 text-xs font-bold text-orange-400 uppercase tracking-widest">— Ana Clara, Travel Vlogger</span>
        </div>
    </div>
</section>`,
            es: `<section id="cases-youtube" class="bg-gradient-to-br from-slate-900 to-red-900/20 p-8 rounded-2xl my-16 border border-red-500/20 shadow-2xl text-center">
    <h2 class="text-2xl font-extrabold text-white mb-10">¡YouTubers que Profesionalizaron su Canal! (E-E-A-T)</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="bg-slate-800/50 p-6 rounded-xl shadow-lg border-l-4 border-red-500 backdrop-blur-sm text-left">
            <p class="text-slate-300 italic text-sm">"Mis métricas de retención cambiaron de la noche a la mañana. La plantilla de tutorial me ayudó a ser mucho más directo y los comentarios ahora son solo elogios."</p>
            <span class="block mt-4 text-xs font-bold text-red-400 uppercase tracking-widest">— Carlos Tech, Canal de Tutoriales</span>
        </div>
        <div class="bg-slate-800/50 p-6 rounded-xl shadow-lg border-l-4 border-orange-500 backdrop-blur-sm text-left">
            <p class="text-slate-300 italic text-sm">"El teleprompter de PromptNinja combinado con los guiones listos ahorró la mitad de mi tiempo de grabación. ¡Ahora puedo publicar 3 veces por semana!"</p>
            <span class="block mt-4 text-xs font-bold text-orange-400 uppercase tracking-widest">— Ana Clara, Vlogger de Viajes</span>
        </div>
    </div>
</section>`
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
            en: "## TikTok and Reels Scripts: Grab Attention in 3 Seconds\n\nIn the world of vertical videos, every frame matters. **Learn to create fast, magnetic scripts** that turn scrolls into views and views into followers.\n\nThe secret to successful producers on TikTok and Instagram Reels lies in the hook structure. Our free templates are designed to deliver maximum value in the shortest time possible, ensuring your message is conveyed with energy and precision. Use PromptNinja's vertical teleprompter to keep your eyes on the phone lens and broadcast the authenticity needed to go viral on social media.",
            es: "## Guiones para TikTok y Reels: Capta la Atención en 3 Segundos\n\nEn el mundo de los videos verticales, cada frame importa. **Aprende a crear guiones rápidos y magnéticos** que transforman scrolls en visualizaciones y visualizaciones en seguidores.\n\nEl secreto de los productores exitosos en TikTok e Instagram Reels está en la estructura del gancho (hook). Nuestras plantillas gratuitas están diseñadas para entregar el máximo valor en el menor tiempo posible, asegurando que tu mensaje se transmita con energía y precisión. Usa el teleprompter vertical de PromptNinja para mantener la mirada en la lente del celular y transmitir la autenticidad necesaria para viralizar en las redes sociales."
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
            en: `<section id="cases-tiktok" class="bg-gradient-to-br from-slate-900 to-pink-900/20 p-8 rounded-2xl my-16 border border-pink-500/20 shadow-2xl text-center">
    <h2 class="text-2xl font-extrabold text-white mb-10">Creators who went viral with our templates!</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="bg-slate-800/50 p-6 rounded-xl shadow-lg border-l-4 border-pink-500 backdrop-blur-sm text-left">
            <p class="text-slate-300 italic text-sm">"I didn't know how to start my videos. The 'Secret No One Tells You' template gave a huge boost to my retention. My first video passed 100k views!"</p>
            <span class="block mt-4 text-xs font-bold text-pink-400 uppercase tracking-widest">— Julia Mendes, Lifestyle Creator</span>
        </div>
        <div class="bg-slate-800/50 p-6 rounded-xl shadow-lg border-l-4 border-purple-500 backdrop-blur-sm text-left">
            <p class="text-slate-300 italic text-sm">"Recording Reels was a pain because I kept forgetting my lines. With the teleprompter + ready-made scripts, I now record 10 videos in less than an hour."</p>
            <span class="block mt-4 text-xs font-bold text-purple-400 uppercase tracking-widest">— Lucas Silva, Tech Reviewer</span>
        </div>
    </div>
</section>`,
            es: `<section id="cases-tiktok" class="bg-gradient-to-br from-slate-900 to-pink-900/20 p-8 rounded-2xl my-16 border border-pink-500/20 shadow-2xl text-center">
    <h2 class="text-2xl font-extrabold text-white mb-10">¡Creadores que Viralizaron con Nuestros Modelos! (E-E-A-T)</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="bg-slate-800/50 p-6 rounded-xl shadow-lg border-l-4 border-pink-500 backdrop-blur-sm text-left">
            <p class="text-slate-300 italic text-sm">"No sabía cómo empezar mis videos. La plantilla de 'El Secreto que Nadie Te Cuenta' dio un impulso absurdo a mi retención. ¡Mi primer video pasó de 100k vistas!"</p>
            <span class="block mt-4 text-xs font-bold text-pink-400 uppercase tracking-widest">— Julia Mendes, Creadora de Lifestyle</span>
        </div>
        <div class="bg-slate-800/50 p-6 rounded-xl shadow-lg border-l-4 border-purple-500 backdrop-blur-sm text-left">
            <p class="text-slate-300 italic text-sm">"Grabar Reels era un parto porque olvidaba las frases. Con el teleprompter + los guiones listos, ahora grabo 10 videos en menos de 1 hora."</p>
            <span class="block mt-4 text-xs font-bold text-purple-400 uppercase tracking-widest">— Lucas Silva, Reviewer Tech</span>
        </div>
    </div>
</section>`
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
            en: "## Sales and VSL Scripts: The Art of Video Persuasion\n\nTurn your viewers into customers with validated copywriting structures. **Discover how to create impactful sales videos** using models that guide your speech from hook to checkout.\n\nAn efficient sales script isn't just about the product, but about the customer's emotional journey. Our VSL (Video Sales Letter) and ad templates cover everything from identifying pain to an irresistible offer. By using PromptNinja, you ensure a fluid and authoritative reading, maintaining the eye contact that builds the trust needed to close sales online.",
            es: "## Guiones para Ventas y VSL: El Arte de la Persuasión en Video\n\nTransforma tus espectadores en clientes con estructuras de copywriting validadas. **Descubre cómo crear videos de ventas impactantes** usando modelos que guían tu habla del gancho al checkout.\n\nUn guion de ventas eficiente no es solo sobre el producto, sino sobre el viaje emocional del cliente. Nuestras plantillas para VSL (Video Sales Letter) y anuncios cubren desde la identificación del dolor hasta la oferta irresistible. Al usar PromptNinja, garantizas una lectura fluida y autoritaria, manteniendo el contacto visual que genera la confianza necesaria para cerrar ventas online."
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
            en: `<section id="cases-vendas" class="bg-gradient-to-br from-slate-900 to-blue-900/20 p-8 rounded-2xl my-16 border border-blue-500/20 shadow-2xl text-center">
    <h2 class="text-2xl font-extrabold text-white mb-10">Who sold more with our scripts!</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="bg-slate-800/50 p-6 rounded-xl shadow-lg border-l-4 border-blue-500 backdrop-blur-sm text-left">
            <p class="text-slate-300 italic text-sm">"My VSLs were confusing. Using PromptNinja's 'AIDA' template, I was able to structure the pitch better and conversions increased by 20% in the first test."</p>
            <span class="block mt-4 text-xs font-bold text-blue-400 uppercase tracking-widest">— Jonas Rocha, Infoproducer</span>
        </div>
        <div class="bg-slate-800/50 p-6 rounded-xl shadow-lg border-l-4 border-cyan-500 backdrop-blur-sm text-left">
            <p class="text-slate-300 italic text-sm">"The scripts for short ads are sensational. They make recording much easier and we can test several hooks quickly on the teleprompter."</p>
            <span class="block mt-4 text-xs font-bold text-cyan-400 uppercase tracking-widest">— Performance Team, Alpha Agency</span>
        </div>
    </div>
</section>`,
            es: `<section id="cases-vendas" class="bg-gradient-to-br from-slate-900 to-blue-900/20 p-8 rounded-2xl my-16 border border-blue-500/20 shadow-2xl text-center">
    <h2 class="text-2xl font-extrabold text-white mb-10">¡Quienes Vendieron Más con Nuestros Guiones! (E-E-A-T)</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="bg-slate-800/50 p-6 rounded-xl shadow-lg border-l-4 border-blue-500 backdrop-blur-sm text-left">
            <p class="text-slate-300 italic text-sm">"Mis VSLs eran confusas. Usando la plantilla de 'AIDA' de PromptNinja, logré estructurar mejor el pitch y las conversiones aumentaron un 20% en la primera prueba."</p>
            <span class="block mt-4 text-xs font-bold text-blue-400 uppercase tracking-widest">— Jonas Rocha, Infoproductor</span>
        </div>
        <div class="bg-slate-800/50 p-6 rounded-xl shadow-lg border-l-4 border-cyan-500 backdrop-blur-sm text-left">
            <p class="text-slate-300 italic text-sm">"Los guiones para anuncios cortos son sensacionales. Facilitan demasiado la grabación y podemos probar varios ganchos rapidito en el teleprompter."</p>
            <span class="block mt-4 text-xs font-bold text-cyan-400 uppercase tracking-widest">— Equipo de Performance, Agencia Alpha</span>
        </div>
    </div>
</section>`
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
            en: "## Online Course & Lesson Scripts: Professional Didactic Delivery\n\nRaise the pedagogical level of your videos with logical content organizations. **Learn how to structure your lessons** to facilitate learning and maintain authority in front of the camera.\n\nFor educators and online course creators, clarity is the most powerful tool. Our didactic templates help organize introductions, complex concepts, and conclusions naturally. With PromptNinja's support, you can focus entirely on explanation and teaching, without the stress of forgetting topics or losing your train of thought, conveying total confidence to your students.",
            es: "## Guiones para Clases y Cursos: Enseñanza Fluida y Profesional\n\nEleva el nivel pedagógico de tus videos con organizaciones lógicas de contenido. **Aprende a estructurar tus clases** para facilitar el aprendizaje y mantener la autoridad frente a la cámara.\n\nPara educadores y creadores de cursos online, la claridad es la herramienta más poderosa. Nuestras plantillas didácticas ayudan a organizar introducciones, conceptos complejos y conclusiones de forma natural. Con el soporte de PromptNinja, puedes enfocarte totalmente en la explicación y la didáctica, sin el estrés de olvidar temas o perder el hilo, transmitiendo seguridad total a tus alumnos."
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
            en: `<section id="cases-aulas" class="bg-gradient-to-br from-slate-900 to-green-900/20 p-8 rounded-2xl my-16 border border-green-500/20 shadow-2xl text-center">
    <h2 class="text-2xl font-extrabold text-white mb-10">Who elevated their online classes!</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="bg-slate-800/50 p-6 rounded-xl shadow-lg border-l-4 border-green-500 backdrop-blur-sm text-left">
            <p class="text-slate-300 italic text-sm">"I used to waste a lot of time re-recording lessons. With the didactic templates, I can now record an entire module in one morning. My students praised the clarity!"</p>
            <span class="block mt-4 text-xs font-bold text-green-400 uppercase tracking-widest">— Prof. Arthur Lima, Programming Course</span>
        </div>
        <div class="bg-slate-800/50 p-6 rounded-xl shadow-lg border-l-4 border-teal-500 backdrop-blur-sm text-left">
            <p class="text-slate-300 italic text-sm">"PromptNinja's teleprompter is my right hand in recording my infoproduct. The scripts help me not to get lost in technical details."</p>
            <span class="block mt-4 text-xs font-bold text-teal-400 uppercase tracking-widest">— Letícia Gonçalves, Marketing Specialist</span>
        </div>
    </div>
</section>`,
            es: `<section id="cases-aulas" class="bg-gradient-to-br from-slate-900 to-green-900/20 p-8 rounded-2xl my-16 border border-green-500/20 shadow-2xl text-center">
    <h2 class="text-2xl font-extrabold text-white mb-10">¡Quienes Elevaron el Nivel de las Clases Online! (E-E-A-T)</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="bg-slate-800/50 p-6 rounded-xl shadow-lg border-l-4 border-green-500 backdrop-blur-sm text-left">
            <p class="text-slate-300 italic text-sm">"Perdía mucho tiempo regrabando clases. Con las plantillas didácticas, ahora puedo grabar un módulo entero en una mañana. ¡Mis alumnos elogiaron la claridad!"</p>
            <span class="block mt-4 text-xs font-bold text-green-400 uppercase tracking-widest">— Prof. Arthur Lima, Curso de Programación</span>
        </div>
        <div class="bg-slate-800/50 p-6 rounded-xl shadow-lg border-l-4 border-teal-500 backdrop-blur-sm text-left">
            <p class="text-slate-300 italic text-sm">"El teleprompter de PromptNinja es mi brazo derecho en la grabación de mi infoproducto. Los guiones ayudan a no perderme en los detalles técnicos."</p>
            <span class="block mt-4 text-xs font-bold text-teal-400 uppercase tracking-widest">— Leticia Goncalves, Especialista en Marketing</span>
        </div>
    </div>
</section>`
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
            en: "## Corporate Scripts: High-Impact Leadership Messages\n\nEnsure every word of your company is delivered with precision and authority. **Use structured templates** for internal communications, results presentations, and institutional videos.\n\nIn the corporate environment, clarity of message is a strategic asset. Our templates were developed for leaders and managers who need to convey confidence and transparency in their videos. Using the PromptNinja teleprompter, you eliminate the need for risky improvisation, ensuring that sensitive points and vital information are communicated with total naturalness and constant eye contact.",
            es: "## Guiones Corporativos: Mensajes de Liderazgo con Impacto\n\nGarantiza que cada palabra de tu empresa sea entregada con precisión y autoridad. **Utiliza modelos estructurados** para comunicados internos, presentaciones de resultados y vídeos institucionales.\n\nEn el entorno corporativo, la claridad del mensaje es un activo estratégico. Nuestras plantillas fueron desarrolladas para líderes y gestores que necesitan transmitir confianza y transparencia en sus videos. Usando el teleprompter PromptNinja, eliminas la necesidad de improvisaciones arriesgadas, asegurando que puntos sensibles e información vital sean comunicados con total naturalidad y contacto visual constante."
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
            en: `<section id="cases-corp" class="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-2xl my-16 border border-slate-700 shadow-2xl text-center">
    <h2 class="text-2xl font-extrabold text-white mb-10">Companies that Modernized Their Communication!</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="bg-slate-800 p-6 rounded-xl shadow-lg border-l-4 border-slate-500 text-left">
            <p class="text-slate-300 italic text-sm">"Our internal communications became much more professional. Using the teleprompter + ready-made scripts gave our directors more confidence to record weekly messages."</p>
            <span class="block mt-4 text-xs font-bold text-slate-400 uppercase tracking-widest">— HR Manager, Tech Solutions Inc.</span>
        </div>
        <div class="bg-slate-800 p-6 rounded-xl shadow-lg border-l-4 border-indigo-500 text-left">
            <p class="text-slate-300 italic text-sm">"For onboarding videos, the templates are excellent. They make life easier for the person presenting and ensure nothing important is forgotten."</p>
            <span class="block mt-4 text-xs font-bold text-indigo-400 uppercase tracking-widest">— Head of L&D, Vanguard Group</span>
        </div>
    </div>
</section>`,
            es: `<section id="cases-corp" class="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-2xl my-16 border border-slate-700 shadow-2xl text-center">
    <h2 class="text-2xl font-extrabold text-white mb-10">¡Empresas que Modernizaron su Comunicación! (E-E-A-T)</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="bg-slate-800 p-6 rounded-xl shadow-lg border-l-4 border-slate-500 text-left">
            <p class="text-slate-300 italic text-sm">"Nuestros comunicados internos quedaron mucho más profesionales. El uso del teleprompter + guiones listos dio más seguridad a nuestros directores para grabar los mensajes semanales."</p>
            <span class="block mt-4 text-xs font-bold text-slate-400 uppercase tracking-widest">— Gerente de RRHH, Tech Solutions Inc.</span>
        </div>
        <div class="bg-slate-800 p-6 rounded-xl shadow-lg border-l-4 border-indigo-500 text-left">
            <p class="text-slate-300 italic text-sm">"Para videos de onboarding, las plantillas son excelentes. Facilitan la vida de quien está presentando y garantizan que nada importante sea olvidado."</p>
            <span class="block mt-4 text-xs font-bold text-indigo-400 uppercase tracking-widest">— Head de L&D, Grupo Vanguardia</span>
        </div>
    </div>
</section>`
        },
        slug: { pt: "scripts-institucionais", en: "institutional-scripts", es: "guiones-institucionales" },
        scripts: INSTITUTIONAL_SCRIPTS
    }
];
