
export interface Script {
    id: string;
    title: {
        pt: string;
        en: string;
        es: string;
    };
    content: {
        pt: string;
        en: string;
        es: string;
    };
    tags: string[];
}

export interface ScriptCategory {
    id: string;
    slug: {
        pt: string;
        en: string;
        es: string;
    };
    title: {
        pt: string;
        en: string;
        es: string;
    };
    description: {
        pt: string;
        en: string;
        es: string;
    };
    scripts: Script[];
}

export const SCRIPTS_DATA: ScriptCategory[] = [
    {
        id: "youtube",
        slug: {
            pt: "scripts-para-youtube",
            en: "scripts-for-youtube",
            es: "guiones-para-youtube"
        },
        title: {
            pt: "Roteiros para YouTube",
            en: "YouTube Scripts",
            es: "Guiones para YouTube"
        },
        description: {
            pt: "Modelos de roteiro testados para vídeos longos, vlogs e tutoriais no YouTube. Aumente sua retenção com estruturas validadas.",
            en: "Tested script templates for long-form videos, vlogs, and tutorials on YouTube. Increase retention with validated structures.",
            es: "Plantillas de guiones probadas para videos largos, vlogs y tutoriales en YouTube. Aumenta tu retención con estructuras validadas."
        },
        scripts: [
            {
                id: "yt-tutorial-classico",
                title: {
                    pt: "Tutorial Clássico (How-To)",
                    en: "Classic How-To Tutorial",
                    es: "Tutorial Clásico (Paso a Paso)"
                },
                tags: ["youtube", "tutorial", "educação"],
                content: {
                    pt: `[GANCHO - 0:00-0:30]
Você quer aprender como [RESULTADO DESEJADO] sem [DOR COMUM]?
Neste vídeo, eu vou te ensinar o passo a passo exato para conseguir isso, mesmo que você seja iniciante.
Fica comigo até o final, porque a última dica é a que faz toda a diferença.

[INTRODUÇÃO - 0:30-1:00]
Ola, eu sou [SEU NOME] e bem-vindo ao canal!
Aqui nós falamos sobre [TEMA DO CANAL].
Se você é novo por aqui, já se inscreve para não perder os próximos conteúdos.

[CONTEÚDO - PASSO 1]
Bora pro conteúdo.
O primeiro passo para [RESULTADO] é [AÇÃO 1].
Muita gente erra aqui porque [ERRO COMUM].
O segredo é [DICA DE OURO].

[CONTEÚDO - PASSO 2]
Agora que você já fez isso, vamos para o passo 2: [AÇÃO 2].
Aqui você precisa prestar atenção em [DETALHE IMPORTANTE].

[CONTEÚDO - PASSO 3]
E por fim, o passo 3: [AÇÃO 3].
É aqui que a mágica acontece.

[CTA / CONCLUSÃO]
Recapitulando: você aprendeu [RESUMO DO VÍDEO].
Se esse vídeo te ajudou, deixa o like pra fortalecer o canal.
E me conta nos comentários: qual sua maior dificuldade hoje com [TEMA]?
Te vejo no próximo vídeo, valeu!`,
                    en: `[HOOK - 0:00-0:30]
Do you want to learn how to [DESIRED RESULT] without [COMMON PAIN]?
In this video, I'm going to teach you the exact step-by-step process to achieve this, even if you're a beginner.
Stick with me until the end, because the last tip is the game-changer.

[INTRO - 0:30-1:00]
Hey there, I'm [YOUR NAME] and welcome to the channel!
Here we talk about [CHANNEL TOPIC].
If you're new here, make sure to subscribe so you don't miss future content.

[CONTENT - STEP 1]
Let's get into it.
The first step to [RESULT] is [ACTION 1].
Many people mistake here because [COMMON MISTAKE].
The secret is [GOLDEN TIP].

[CONTENT - STEP 2]
Now that you've done that, let's move to step 2: [ACTION 2].
Here you need to pay attention to [IMPORTANT DETAIL].

[CONTENT - STEP 3]
And finally, step 3: [ACTION 3].
This is where the magic happens.

[CTA / CONCLUSION]
So, to recap: you learned [VIDEO SUMMARY].
If this video helped you, please hit the like button.
And tell me in the comments: what is your biggest struggle today with [TOPIC]?
I'll see you in the next video, cheers!`,
                    es: `[GANCHO - 0:00-0:30]
¿Quieres aprender cómo [RESULTADO DESEADO] sin [DOLOR COMÚN]?
En este video, te voy a enseñar el paso a paso exacto para lograrlo, incluso si eres principiante.
Quédate conmigo hasta el final, porque el último consejo es el que marca la diferencia.

[INTRODUCCIÓN - 0:30-1:00]
¡Hola! Soy [TU NOMBRE] y bienvenido al canal.
Aquí hablamos sobre [TEMA DEL CANAL].
Si eres nuevo por aquí, suscríbete para no perderte los próximos contenidos.

[CONTENIDO - PASO 1]
Vamos al contenido.
El primer paso para [RESULTADO] es [ACCIÓN 1].
Mucha gente se equivoca aquí porque [ERROR COMÚN].
El secreto es [CONSEJO DE ORO].

[CONTENIDO - PASO 2]
Ahora que ya hiciste eso, vamos al paso 2: [ACCIÓN 2].
Aquí necesitas prestar atención a [DETALLE IMPORTANTE].

[CONTENIDO - PASO 3]
Y por último, el paso 3: [ACCIÓN 3].
Aquí es donde ocurre la magia.

[LLAMADA A LA ACCIÓN / CONCLUSIÓN]
Resumiendo: has aprendido [RESUMEN DEL VIDEO].
Si este video te ayudó, dale like para apoyar al canal.
Y cuéntame en los comentarios: ¿cuál es tu mayor dificultad hoy con [TEMA]?
¡Nos vemos en el próximo video!`,
                }
            },
            {
                id: "yt-vlog-diario",
                title: {
                    pt: "Vlog Diário / Rotina",
                    en: "Daily Vlog / Routine",
                    es: "Vlog Diario / Rutina"
                },
                tags: ["youtube", "vlog", "lifestyle"],
                content: {
                    pt: `[INTRODUÇÃO - MOSTRE, NÃO FALE]
(Comece com uma cena interessante do seu dia)
Bom dia, pessoal! Hoje o dia vai ser uma loucura.
Eu preciso resolver [PROBLEMA OU OBJETIVO DO DIA] e vou levar vocês comigo.

[CONTEXTO]
Pra quem não sabe, eu estou tentando [OBJETIVO LONGO PRAZO].
E hoje é um dia crucial porque...

[DESENVOLVIMENTO]
(Fale sobre o que está fazendo agora)
Acabei de chegar no [LUGAR].
Olha só isso... (Descreva o ambiente)

[CLÍMAX / RESOLUÇÃO]
Bom, finalmente consegui [RESULTADO].
Não foi fácil, tive que [OBSTÁCULO], mas no fim deu tudo certo.

[CONCLUSÃO]
O que eu aprendi hoje foi que [LIÇÃO MORAL].
Espero que vocês tenham gostado de acompanhar.
Não esquece de deixar o like e a gente se vê amanhã. Fui!`,
                    en: `[INTRO - SHOW, DON'T TELL]
(Start with an interesting scene from your day)
Good morning guys! Today is going to be crazy.
I need to solve [PROBLEM OR GOAL OF THE DAY] and I'm taking you with me.

[CONTEXT]
For those who don't know, I'm trying to [LONG TERM GOAL].
And today is a crucial day because...

[DEVELOPMENT]
(Talk about what you are doing right now)
I just arrived at [PLACE].
Look at this... (Describe the environment)

[CLIMAX / RESOLUTION]
Well, I finally managed to [RESULT].
It wasn't easy, I had to [OBSTACLE], but in the end it worked out.

[CONCLUSION]
What I learned today was that [MORAL LESSON].
I hope you enjoyed following along.
Don't forget to like and I'll see you tomorrow. Peace!`,
                    es: `[INTRODUCCIÓN - MUESTRA, NO CUENTES]
(Empieza con una escena interesante de tu día)
¡Buenos días a todos! Hoy va a ser una locura.
Necesito resolver [PROBLEMA U OBJETIVO DEL DÍA] y los voy a llevar conmigo.

[CONTEXTO]
Para quien no lo sepa, estoy tratando de [OBJETIVO A LARGO PLAZO].
Y hoy es un día crucial porque...

[DESARROLLO]
(Habla sobre lo que estás haciendo ahora)
Acabo de llegar a [LUGAR].
Miren esto... (Describe el ambiente)

[CLÍMAX / RESOLUCIÓN]
Bueno, finalmente conseguí [RESULTADO].
No fue fácil, tuve que [OBSTÁCULO], pero al final todo salió bien.

[CONCLUSIÓN]
Lo que aprendí hoy fue que [LECCIÓN MORAL].
Espero que les haya gustado acompañarme.
No olviden dejar su like y nos vemos mañana. ¡Adiós!`,
                }
            }
        ]
    },
    {
        id: "tiktok-reels",
        slug: {
            pt: "scripts-para-tiktok-reels",
            en: "scripts-for-tiktok-shorts",
            es: "guiones-para-tiktok-shorts"
        },
        title: {
            pt: "Scripts para TikTok e Reels",
            en: "TikTok & Reels Scripts",
            es: "Guiones para TikTok y Reels"
        },
        description: {
            pt: "Roteiros curtos e dinâmicos de 15 a 60 segundos. Focados em retenção alta e viralização.",
            en: "Short and dynamic scripts from 15 to 60 seconds. Focused on high retention and virality.",
            es: "Guiones cortos y dinámicos de 15 a 60 segundos. Enfocados en alta retención y viralidad."
        },
        scripts: [
            {
                id: "tiktok-dica-rapida",
                title: {
                    pt: "Dica Rápida (30s)",
                    en: "Quick Tip (30s)",
                    es: "Consejo Rápido (30s)"
                },
                tags: ["tiktok", "reels", "dicas"],
                content: {
                    pt: `Pare de fazer [ERRO COMUM] agora mesmo! 🛑
Se você quer [RESULTADO], faça isso aqui:
1. Primeiro, [AÇÃO 1].
2. Depois, [AÇÃO 2].
Isso vai te economizar horas de trabalho.
Curtiu? Segue pra mais dicas!`,
                    en: `Stop doing [COMMON MISTAKE] right now! 🛑
If you want [RESULT], do this instead:
1. First, [ACTION 1].
2. Then, [ACTION 2].
This will save you hours of work.
Liked it? Follow for more tips!`,
                    es: `¡Deja de hacer [ERROR COMÚN] ahora mismo! 🛑
Si quieres [RESULTADO], haz esto:
1. Primero, [ACCIÓN 1].
2. Después, [ACCIÓN 2].
Esto te ahorrará horas de trabajo.
¿Te gustó? ¡Sígueme para más consejos!`,
                }
            },
            {
                id: "tiktok-mito-verdade",
                title: {
                    pt: "Mito vs Verdade",
                    en: "Myth vs Truth",
                    es: "Mito vs Verdad"
                },
                tags: ["tiktok", "curiosidades"],
                content: {
                    pt: `Mentiram pra você sobre [TEMA]! 🤥
Todo mundo diz que [MITO], mas a verdade é que...
[VERDADE SURPREENDENTE].
A ciência explica que [EXPLICAÇÃO RÁPIDA].
Sabia dessa? Comenta aqui embaixo! 👇`,
                    en: `They lied to you about [TOPIC]! 🤥
Everyone says that [MYTH], but the truth is...
[SURPRISING TRUTH].
Science explains that [QUICK EXPLANATION].
Did you know this? Comment down below! 👇`,
                    es: `¡Te mintieron sobre [TEMA]! 🤥
Todo el mundo dice que [MITO], pero la verdad es...
[VERDAD SORPRENDENTE].
La ciencia explica que [EXPLICACIÓN RÁPIDA].
¿Sabías esto? ¡Comenta aquí abajo! 👇`,
                }
            }
        ]
    },
    {
        id: "sales",
        slug: {
            pt: "scripts-para-vendas",
            en: "scripts-for-sales",
            es: "guiones-para-ventas"
        },
        title: {
            pt: "Scripts de Vendas (VSL)",
            en: "Sales Scripts (VSL)",
            es: "Guiones de Ventas (VSL)"
        },
        description: {
            pt: "Roteiros persuasivos baseados em copywriting para vender produtos ou serviços.",
            en: "Persuasive scripts based on copywriting principles to sell products or services.",
            es: "Guiones persuasivos basados en copywriting para vender productos o servicios."
        },
        scripts: [
            {
                id: "vendas-problema-solucao",
                title: {
                    pt: "Problema -> Agitação -> Solução",
                    en: "Problem -> Agitate -> Solution",
                    es: "Problema -> Agitación -> Solución"
                },
                tags: ["vendas", "marketing"],
                content: {
                    pt: `Você está cansado de [PROBLEMA]?
Sabe, aquela sensação horrível de [SENSAÇÃO RUIM] e ver seu dinheiro indo pro ralo?
Eu sei como é. Eu passei anos tentando resolver isso.
Mas a boa notícia é que existe um jeito novo.
Apresento o [SEU PRODUTO].
Com ele, você consegue [BENEFÍCIO 1] e [BENEFÍCIO 2] sem precisar de [COISA CHATA].
Clique no link abaixo e confira agora mesmo!`,
                    en: `Are you tired of [PROBLEM]?
You know, that terrible feeling of [BAD FEELING] and watching your money go down the drain?
I know how it feels. I spent years trying to solve this.
But the good news is there is a new way.
Introducing [YOUR PRODUCT].
With it, you can get [BENEFIT 1] and [BENEFIT 2] without needing [ANNOYING THING].
Click the link below and check it out right now!`,
                    es: `¿Estás cansado de [PROBLEMA]?
¿Sabes, esa sensación horrible de [MALA SENSACIÓN] y ver tu dinero yéndose por el desagüe?
Sé cómo se siente. Pasé años intentando resolver esto.
Pero la buena noticia es que existe una nueva manera.
Te presento [TU PRODUCTO].
Con él, consigues [BENEFICIO 1] y [BENEFICIO 2] sin necesidad de [COSA MOLESTA].
¡Haz clic en el enlace de abajo y compruébalo ahora mismo!`,
                }
            }
        ]
    },
    {
        id: "classes",
        slug: {
            pt: "scripts-para-aulas",
            en: "scripts-for-classes",
            es: "guiones-para-clases"
        },
        title: {
            pt: "Roteiros para Aulas",
            en: "Class Scripts",
            es: "Guiones para Clases"
        },
        description: {
            pt: "Estruturas ideais para professores e infoprodutores gravarem aulas online.",
            en: "Ideal structures for teachers and course creators to record online classes.",
            es: "Estructuras ideales para profesores y creadores de cursos para grabar clases online."
        },
        scripts: [
            {
                id: "aula-conceito",
                title: {
                    pt: "Explicação de Conceito",
                    en: "Concept Explanation",
                    es: "Explicación de Concepto"
                },
                tags: ["aulas", "educação"],
                content: {
                    pt: `Olá alunos!
Na aula de hoje, vamos desmistificar o conceito de [TEMA].
Muitos acham que é difícil, mas vou mostrar que é mais simples do que parece.
Vamos dividir em 3 partes:
1. O que é [TEMA]?
2. Para que serve?
3. Um exemplo prático.
Então, pegue seu caderno e vamos começar!`,
                    en: `Hello students!
In today's class, we are going to demystify the concept of [TOPIC].
Many think it's difficult, but I'll show you it's simpler than it looks.
We'll divide it into 3 parts:
1. What is [TOPIC]?
2. What is it for?
3. A practical example.
So, grab your notebook and let's get started!`,
                    es: `¡Hola alumnos!
En la clase de hoy, vamos a desmitificar el concepto de [TEMA].
Muchos piensan que es difícil, pero les mostraré que es más simple de lo que parece.
Vamos a dividirlo en 3 partes:
1. ¿Qué es [TEMA]?
2. ¿Para qué sirve?
3. Un ejemplo práctico.
¡Así que tomen su cuaderno y comencemos!`,
                }
            }
        ]
    }
];

export const getAllScripts = () => {
    return SCRIPTS_DATA.flatMap(category => category.scripts);
};

export const getScriptById = (id: string) => {
    return getAllScripts().find(script => script.id === id);
};
