Por que o Google se recusa a indexar muitos sites em Next.js (e uma CLI que eu criei para depurá-lo)
Discussion
Eu continuei esbarrando no mesmo problema em projetos Next.js + Vercel:

• “Descoberto – atualmente não indexado”

• “Página com redirecionamento”

• URLs que funcionam bem no navegador, mas nunca aparecem no Google

Acabou que a maioria dos problemas não eram de SEO ou conteúdo —

eram comportamento de redirecionamento (308s), canônicos, falta de sitemap/robots,

e coisas de nível de plataforma que você não vê no código.

Eu escrevi um post curto explicando as causas reais:

https://yusufhansacak.medium.com/why-google-refuses-to-index-your-next-js-site-04a924948859

E eu open-sourci uma pequena CLI que audita um site da forma que um crawler vê:

https://github.com/JosephDoUrden/vercel-seo-audit

Não estou vendendo nada — apenas compartilhando caso isso salve alguém algumas horas.

Feedback é bem-vindo.

comportamento


Upvote
205

Downvote

37
Ir para os comentários


1

Compartilhar
Avatar de u/OpenAI
OpenAI
•
Patrocinado

Tente criar um mini eu com ChatGPT Imagens.
Cadastrar-se
chatgpt.com
Thumbnail image: Tente criar um mini eu com ChatGPT Imagens.
Participe da conversa
Ordenar por:

Melhores

Buscar nos comentários
Expandir a busca por comentários
Seção de comentários
milanistasbarazzino0
•
há 6 dias
Salvando este post para checar depois



Upvote
6

Downvote

Responder

Premiar

Compartilhar

Rivered1
•
há 5 dias
.


Upvote
1

Downvote

Responder

Premiar

Compartilhar

Avatar de u/Strange_Comfort_4110
Strange_Comfort_4110
•
há 6 dias
Isso é realmente útil. O problema do redirecionamento 308 pega muitas pessoas de surpresa — o Next.js adiciona silenciosamente barras finais por padrão e o Google trata cada redirecionamento como um sinal de que a URL não é canônica.

Algumas coisas que eu adicionaria com base na minha experiência em projetos de clientes:

generateStaticParams não retornar todas as rotas é outro assassino silencioso. O Google descobre URLs através do seu sitemap, mas se a página reverter para SSR, o orçamento de rastreamento é desperdiçado em renders mais lentas.

O robots.txt deve incluir explicitamente a URL do sitemap. Parece óbvio, mas já vi aplicativos Next.js onde o robots.txt gerado automaticamente não fazia referência a isso.

Para o App Router especificamente: certifique-se de que sua exportação de metadata esteja em todas as páginas, não apenas no layout. O Google precisa de títulos/descrições exclusivos por URL.

Marcando o CLI — venho fazendo esse tipo de auditoria manualmente com cadeias de curl.


Upvote
19

Downvote

Responder

Premiar

Compartilhar

gemanepa
•
há 6 dias
Acho que tanto o artigo quanto o CLi precisam de explicações melhores. Por exemplo, eu entendi:

" ℹ [INFO] O middleware do Next.js está modificando a requisição

    Rewrites ou redirects do middleware podem afetar como os mecanismos de busca veem suas páginas. Certifique-se de que o middleware não está alterando páginas críticas para SEO sem querer.

    → Revise seu middleware.ts para garantir que ele não redirecione ou reescreva URLs críticos para SEO.

    URL: https://asdf.com/ "

Tipo... Ok, mas o que isso significa exatamente? "/" está redirecionando para onde? Ou o caminho raiz sem barra no final está sendo redirecionado para a raiz com "/"? Não faço ideia do que o CLI está me dizendo



Upvote
4

Downvote

Responder

Premiar

Compartilhar

Avatar de u/JosephDoUrden
JosephDoUrden
OP
•
há 6 dias
Esse é um feedback totalmente justo — obrigado por mencionar.

O que essa mensagem significa não é “você está definitivamente redirecionando `/` para algum outro lugar”,

mas “O middleware do Next.js está *interceptando o pedido*, então os crawlers podem ver uma resposta diferente dos usuários.”

No Next.js, o middleware roda antes do roteamento e pode:

- reescrever `/` para outro caminho internamente

- redirecionar com base nos cabeçalhos (geo, autenticação, cookies, etc.)

- normalizar barras finais

- se comportar de maneira diferente para bots e navegadores

Do ponto de vista do crawler, isso significa:

“Não tenho certeza se a resposta para esta URL é estável.”

Agora mesmo, a CLI detecta a *presença* do middleware afetando o pedido,

mas ainda não explica *como* isso muda a resposta — essa parte definitivamente precisa ser mais clara.

Estou planejando melhorar isso:

- mostrando se o middleware causa uma reescrita ou um redirecionamento

- imprimindo a URL antes/depois, se possível

- esclarecendo quando isso é apenas informativo e quando representa um risco real para SEO

Se você estiver a fim, abrir uma issue no GitHub com:

- o que seu middleware faz

- o que você esperava que a mensagem dissesse

ajudaria muito:

https://github.com/JosephDoUrden/vercel-seo-audit/issues

Agradeço o feedback honesto — esse é exatamente o tipo de caso que a ferramenta precisa explicar melhor.


Upvote
2

Downvote

Responder

Premiar

Compartilhar

Paradroid888
•
há 6 dias
Interessante. Eu administro um site pequeno (portfólio pessoal) e percebi com o next.js que ele não estava indexado corretamente, e não consegui entender o porquê. Reescrevi em uma plataforma totalmente SSR e agora está muito mais presente no índice do Google.



Upvote
4

Downvote

Responder

Premiar

Compartilhar

Avatar de u/JosephDoUrden
JosephDoUrden
OP
•
há 6 dias
Sim, mesma experiência aqui. Muitas vezes não se trata de SEO — SSR apenas dá ao Google sinais muito mais claros e estáveis do que algumas configurações do Next.js.


Upvote
2

Downvote

Responder

Premiar

Compartilhar

Avatar de u/tonkotsu-ai
u/tonkotsu-ai
•
Patrocinado

Stop coding, start leading. Manage an entire team of coding agents from a doc. Try Tonkotsu - FREE.
Saiba mais
tonkotsu.ai
Thumbnail image: Stop coding, start leading. Manage an entire team of coding agents from a doc. Try Tonkotsu - FREE.
Avatar de u/Strange_Comfort_4110
Strange_Comfort_4110
•
há 5 dias
A questão do redirecionamento 308 é tão traiçoeira. Tive um site de cliente onde a inconsistência de barra final estava causando metade das páginas aparecerem como "descobertas não indexadas" por semanas. O Google estava vendo o 308 e simplesmente ignorando. Corrigi a configuração de trailingSlash em next.config e tudo começou a ser indexado em poucos dias. Bom texto!



Upvote
3

Downvote

Responder

Premiar

Compartilhar

Avatar de u/JosephDoUrden
JosephDoUrden
OP
•
há 4 dias
Exatamente, essa combinação de 308 + barra final é brutal. Obrigado por compartilhar o exemplo do mundo real


Upvote
1

Downvote

Responder

Premiar

Compartilhar

Avatar de u/gardenia856
gardenia856
•
há 4 dias
Ponto principal: a maioria dos “problemas de SEO” do Next.js que as pessoas culpam pelo conteúdo são na verdade apenas erros de caminho de rastreamento e de redirecionamento, como você está descrevendo.

O que pega muita gente é a parte invisível que a Vercel faz por padrão: 308s de www/no-www, barra no final vs barra sem a barra, prefixos de localidade, e então as próprias regras de redirecionamento do Next empilhadas por cima. Você acaba com cadeias ou loops que os usuários nunca percebem, mas o Google simplesmente desiste.

Uma coisa que achei útil é registrar a solicitação/resposta completa para o agente do usuário do Googlebot em produção por um dia e compará-la a uma execução limpa com o curl no seu CLI. É aí que aparecem os caminhos estranhos 308 → 200 → 404 e canonicais não correspondentes.

Do lado das ferramentas, combinar seu CLI com Screaming Frog e scripts simples de exportação do GSC funciona bem, e coisas como Brand24, Mention ou Pulse são úteis para pegar threads onde as pessoas estão presas na mesma armadilha de “Descoberto - atualmente não indexado”.

Ponto principal: trate redirecionamentos/canonicais como infraestrutura de produção, não como uma ideia tardia, e valide-os do ponto de vista do rastreador, não do seu navegador.



Upvote
2

Downvote

Responder

Premiar

Compartilhar

Avatar de u/JosephDoUrden
JosephDoUrden
OP
•
há 4 dias
Bem dito - especialmente o ponto sobre registrar o tráfego do Googlebot vs uma execução limpa do curl. Essa lacuna de “o navegador funciona, o crawler desiste” é exatamente onde a maioria desses problemas se esconde.


Upvote
1

Downvote

Responder

Premiar

Compartilhar

jasonethedesigner
•
há 6 dias
Muito útil


Upvote
1

Downvote

Responder

Premiar

Compartilhar

Avatar de u/Virtual-Graphics
Virtual-Graphics
•
há 6 dias
Bom tópico... agradeço os insights.


Upvote
1

Downvote

Responder

Premiar

Compartilhar

Avatar de u/Skriblos
Skriblos
•
há 6 dias
Ei, obrigado por fazer isso


Upvote
1

Downvote

Responder

Premiar

Compartilhar

Avatar de u/HostingerCOM
u/HostingerCOM
•
Patrocinado

Enquanto o Kodee se dedica a gerenciar seu site WordPress, você se concentra em realizar e escalar suas grandes ideias online.
Saiba mais
hostinger.com
Thumbnail image: Enquanto o Kodee se dedica a gerenciar seu site WordPress, você se concentra em realizar e escalar suas grandes ideias online.
Avatar de u/Strange_Comfort_4110
Strange_Comfort_4110
•
há 6 dias
A questão do redirecionamento com a barra final é uma pegadinha tão comum com o next no Vercel. Tive um projeto em que metade das nossas páginas não estavam sendo indexadas e era literalmente só o redirecionamento 308 de /about para /about/ que o Google estava travando. Assim que configuramos o trailingSlash no next.config e corrigimos as URLs canônicas, tudo foi indexado em uma semana. Boa explicação


Upvote
1

Downvote

Responder

Premiar

Compartilhar

Alternative-Theme885
•
há 5 dias
Eu também tive dificuldades com problemas de indexação no Google nos meus projetos de Next.js, e geralmente isso se resume a cabeçalhos de redirecionamento incorretos ou metadados faltando. Você encontrou alguma configuração específica no Vercel que pode causar esses problemas, ou é mais uma questão de configurar o próprio Next.js?



Upvote
1

Downvote

Responder

Premiar

Compartilhar

Avatar de u/JosephDoUrden
JosephDoUrden
OP
•
há 5 dias
Principalmente o Next.js em si, na minha experiência. A Vercel apenas aplica as configurações padrão da plataforma — os verdadeiros problemas tendem a ser middleware, redirecionamentos e decisões sobre metadados dentro do app.


Upvote
1

Downvote

Responder

Premiar

Compartilhar

Avatar de u/ParkingSignature7057
ParkingSignature7057
•
há 5 dias
Bom, estou me arrependendo de ter escolhido o nextJS agora... suspiro


Upvote
1

Downvote

Responder

Premiar

Compartilhar

Avatar de u/Zachy24
Zachy24
•
há 5 dias
Salvando para revisitar depois


Upvote
1

Downvote

Responder

Premiar

Compartilhar

Avatar de u/PrinceDome
PrinceDome
•
há 5 dias
Boa informação, obrigado por isso.

Lancei meu site há um mês e estava aprendendo todas essas coisas nesse tempo, mas agora está tudo certo.

Graças ao seu cli, descobri meu último erro, que é o meu arquivo "robot.txt".



Upvote
1

Downvote

Responder

Premiar

Compartilhar

Avatar de u/JosephDoUrden
JosephDoUrden
OP
•
há 5 dias
Fico feliz em saber que ajudou — pegar pequenas coisas como robots.txt é exatamente para isso que o CLI serve :)


Upvote
1

Downvote

Responder

Premiar

Compartilhar

rubixstudios
•
há 5 dias
Problema de habilidade.


Upvote
1

Downvote

Responder

Premiar

Compartilhar

Avatar de u/Illustrious-Layer993
Illustrious-Layer993
•
há 5 dias
Legal! Obrigado!


Upvote
1

Downvote

Responder

Premiar

Compartilhar

seoparadiso
•
há 5 dias
Eu tenho alguns sites em NextJS e não encontrei nenhum problema com a indexação.


Upvote
1

Downvote

Responder

Premiar

Compartilhar

Avatar de u/andamonium
andamonium
•
há 4 dias
Só queria voltar a isso e dizer que essa ferramenta foi extremamente útil para identificar alguns problemas incômodos. Obrigado!



Upvote
1

Downvote

Responder

Premiar

Compartilhar

Avatar de u/JosephDoUrden
JosephDoUrden
OP
•
há 4 dias
Fico realmente feliz que ajudou - obrigado por voltar para dizer isso, eu agradeço muito 🙂


Upvote
1

Downvote

Responder

Premiar

Compartilhar

okandship
•
há 4 dias
também fique atento para: O caminho Home "/" também é acessível via "/index" automaticamente no Vercel
https://github.com/vercel/next.js/issues/87275


Upvote
1

Downvote

Responder

Premiar

Compartilhar

Avatar de u/Goandlearnapply
Goandlearnapply
•
há 4 dias
Salvar para voltar, valeu


Upvote
1

Downvote

Responder

Premiar

Compartilhar

Avatar de u/SpiritualDiamond8370
SpiritualDiamond8370
•
há 4 dias
Um tópico que contém informações realmente úteis e não está vendendo nada. Definitivamente vale um upvote.


Upvote
1

Downvote

Responder

Premiar

Compartilhar

Avatar de u/Late_Measurement_273
Late_Measurement_273
•
há 3 dias
App Next js com full ssr é uma droga para SEO... eu mudei para outro framework que não usa js e está muito melhor, mesmo o json ld já escrito corretamente, ainda é uma droga



Upvote
1

Downvote

Responder

Premiar

Compartilhar

Avatar de u/JosephDoUrden
JosephDoUrden
OP
•
há 3 dias
Sim, eu já vi essa frustração muitas vezes. Em muitos casos, não é que o SSR "não funcione", mas que os sinais de rastreamento ao redor dele (redirecionamentos, canônicos, cabeçalhos) acabam instáveis — trocar de frameworks muitas vezes resolve isso implicitamente, que é por isso que parece instantaneamente melhor.


Upvote
1

Downvote

Responder

Premiar

Compartilhar

Avatar de u/Fabulous-Hunter7145
Fabulous-Hunter7145
•
há 3 dias
Sou um grande fã desse pacote, Joseph, dei uma estrela no GitHub. Obrigado por isso!



Upvote
1

Downvote

Responder

Premiar

Compartilhar

Avatar de u/JosephDoUrden
JosephDoUrden
OP
•
há 2 dias
Obrigado - realmente aprecio a estrela e as palavras gentis! Fico feliz que você tenha achado útil 🙏


Upvote
1

Downvote

Responder

Premiar

Compartilhar

unchiusm
•
há 5 h
Minha Experiência com Next.js e Payload CMS: Um Conto de Advertência

Acabei de construir um site para um cliente usando Next.js e Payload CMS, e cometi alguns erros ao longo do caminho. Estou escrevendo isso para que você não repita.

Eu fiz uma auditoria de plugins no meu site e sugeriu que eu ativasse trailing slashes na configuração do Next.js. Eu ativei, mas meu erro foi que não li sobre isso e não tinha ideia do que realmente faz. Também é bom mencionar que isso não foi um aviso, foi uma simples mensagem de INFO e não consigo recordar exatamente se usei www. ou apenas mydomain.com para a auditoria, então provavelmente é um problema de habilidade da minha parte.

Se trailing slashes estiver ativado e eu navegar para www.somedomain.com/some-page, o servidor emitirá um redirecionamento 308 e então um código de status 200 uma vez que ele te enviar para www.somedomain.com/some-page/.

Do ponto de vista do usuário, isso não tem efeito visível. No entanto, se você conferir seu Google Search Console, notará erros de redirecionamento nessas páginas (no meu caso, mais de 30).

Por que aconteceu:

Todos os meus URLs do sitemap não tinham trailing slashes.

Os meus campos canônicos estavam apontando para páginas sem trailing slashes (não sei se isso foi um influenciador ou não).

Mistérios restantes:

Redirecionamentos de Sitemap: Quando uso a ferramenta para auditar meu site, recebo um aviso em relação a um redirecionamento de sitemap quando audito a página sem www.. (Eu me lembro que mydomain.com redireciona para www.mydomain.com nas configurações do Vercel, em algum lugar; não tenho ideia se isso está certo ou não).

A Melhor Prática: Qual é a real sobre os trailing slashes, devemos realmente usá-los ou não?