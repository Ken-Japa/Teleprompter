import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { SEOContentHowTo } from "../../../../components/seo/SEOContentHowTo";

export const TeleprompterCaseiroDIYPT = () => (
    <>
        <h1 className="text-4xl font-bold text-white mb-6">Como Fazer um Teleprompter Caseiro (DIY): Guia Completo + Software GRÁTIS</h1>

        <p className="mb-6">
            Gravar vídeos com aparência profissional exige fluidez e confiança, mas memorizar roteiros é um desafio. Equipamentos de teleprompter profissionais resolvem isso, mas custam caro. A boa notícia? Você pode <strong>montar um teleprompter caseiro barato</strong> com materiais simples e obter resultados impressionantes. O princípio físico por trás disso é o "Fantasma de Pepper", uma ilusão de ótica usada em teatros desde o século XIX — e que você pode replicar em casa!
        </p>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Materiais Necessários para Montar seu Teleprompter DIY</h2>

        <div className="bg-slate-800 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-bold text-white mb-4">Lista de Compras para seu Teleprompter Caseiro</h3>
            <ul className="list-disc pl-6 space-y-3">
                <li>
                    <strong>Vidro ou Acrílico Transparente:</strong> Uma moldura de quadro 20x30cm ou 30x40cm (retire o fundo) ou uma placa de acrílico transparente. Este será seu "beam splitter" que reflete o texto.
                    <span className="text-slate-400 block mt-1 text-sm">💡 Onde comprar: Lojas de molduras, papelarias grandes, ou lojas de material de construção (acrílico)</span>
                </li>
                <li>
                    <strong>Estrutura de Suporte:</strong> Uma caixa de papelão resistente (caixa de sapato grande ou caixa de mudança) ou uma estrutura de madeira leve (MDF ou compensado). Pinte o interior de preto fosco para evitar reflexos indesejados.
                    <span className="text-slate-400 block mt-1 text-sm">💡 Onde comprar: Papelarias, lojas de artesanato, ou madeireiras</span>
                </li>
                <li>
                    <strong>Dispositivo de Exibição:</strong> Um tablet (7-10 polegadas é ideal), smartphone, ou monitor portátil para exibir o roteiro.
                    <span className="text-slate-400 block mt-1 text-sm">💡 Use o que você já tem! Tablets antigos funcionam perfeitamente</span>
                </li>
                <li>
                    <strong>Pano ou Cartolina Preta:</strong> Para criar um "túnel" entre a lente da câmera e o vidro, bloqueando a luz ambiente e garantindo que a câmera não apareça no reflexo.
                    <span className="text-slate-400 block mt-1 text-sm">💡 Onde comprar: Lojas de tecido ou papelarias</span>
                </li>
                <li>
                    <strong>Câmera:</strong> Qualquer câmera DSLR, mirrorless, webcam, ou até mesmo a do seu smartphone.
                </li>
                <li>
                    <strong>Fita Adesiva/Cola Quente:</strong> Para fixar as peças.
                    <span className="text-slate-400 block mt-1 text-sm">💡 Cola quente é ideal para montagens rápidas e ajustes</span>
                </li>
            </ul>

            <div className="mt-4 p-4 bg-slate-700 rounded">
                <p className="text-white font-bold mb-2">💰 Custo Total Estimado: R$ 30 a R$ 80</p>
                <p className="text-slate-300 text-sm">Compare com teleprompters profissionais que custam R$ 500 a R$ 3.000+</p>
            </div>
        </div>

        <div className="bg-slate-800 p-4 rounded-lg mb-6 border-l-4 border-purple-500">
            <h3 className="font-bold text-white mb-2">📱 Vai usar um Tablet ou iPad?</h3>
            <p className="text-slate-300 text-sm">
                Tablets são excelentes para teleprompter caseiro devido ao tamanho da tela e portabilidade. Se você planeja usar um, confira nosso guia específico sobre <a href="/teleprompter-para-tablet-ipad-android" className="text-purple-400 hover:text-purple-300 underline">como usar teleprompter no tablet</a> para dicas de posicionamento e configuração.
            </p>
        </div>

        <SEOContentHowTo
            title="Passo a Passo: Como Montar um Teleprompter Caseiro"
            schemaTitle="Como Fazer um Teleprompter Caseiro (DIY)"
            estimatedCost={{ currency: "BRL", value: "50" }}
            totalTime="PT30M"
            supplies={["Caixa de Papelão ou Madeira", "Vidro ou Acrílico Transparente", "Pano Preto", "Fita Adesiva ou Cola Quente"]}
            tools={["Tesoura ou Estilete", "Smartphone ou Tablet (para exibir o texto)", "Câmera (para gravar)"]}
            steps={[
                {
                    title: "Passo 1: Prepare a Estrutura Base",
                    text: "Pegue sua caixa de papelão e corte uma abertura frontal para a câmera e uma abertura inferior para o tablet ficar em um ângulo de 45 graus. Se estiver usando madeira, monte uma caixa em formato de \"L\" invertido. Dica: Pinte todo o interior de preto fosco para eliminar reflexos que possam aparecer no vídeo."
                },
                {
                    title: "Passo 2: Posicione o Vidro/Acrílico",
                    text: "Fixe o vidro ou acrílico em um ângulo de 45 graus entre a câmera (que ficará atrás) e você (que ficará na frente). Este ângulo é crucial para que o reflexo do texto seja visível apenas para você, e não para a câmera. Use suportes de cola quente ou fita adesiva dupla face."
                },
                {
                    title: "Passo 3: Posicione o Tablet/Monitor",
                    text: "Coloque o tablet ou monitor na parte inferior da estrutura, virado para cima em direção ao vidro. O texto na tela será refletido no vidro e aparecerá na sua linha de visão, logo abaixo da lente da câmera. Ajuste o brilho da tela do tablet para o máximo."
                },
                {
                    title: "Passo 4: Bloqueie a Luz com Pano Preto",
                    text: "Crie um \"túnel\" com pano preto ao redor da câmera e do vidro. Isso evita que luz externa interfira no reflexo e garante que a câmera não apareça refletida no vidro."
                },
                {
                    title: "Passo 5: Configure o Software (PromptNinja)",
                    text: "O passo mais importante: o texto no tablet precisa estar espelhado. 1. Acesse promptninja.solutionkit.com.br no tablet. 2. Cole seu roteiro. 3. Clique no ícone de espelho (🪞). 4. Escaneie o QR code com seu celular para usar como controle remoto. Pronto!"
                }
            ]}
        />

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Por Que o PromptNinja é Perfeito para Seu Teleprompter Caseiro</h2>

        <div className="bg-slate-800 p-6 rounded-lg my-6">
            <p className="text-slate-300 mb-6">
                Enquanto sua estrutura DIY resolve o hardware, o <strong>PromptNinja foi projetado especificamente pensando em setups caseiros</strong>. Todas as funcionalidades principais são <strong>100% gratuitas</strong>.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-700 p-4 rounded-lg">
                    <h4 className="font-bold text-white mb-2">🪞 Espelhamento Inteligente</h4>
                    <p className="text-sm text-slate-300">Com 1 clique, inverte o texto horizontal e verticalmente. O reflexo no vidro fica perfeitamente legível para você, mas invisível para a câmera.</p>
                </div>
                <div className="bg-slate-700 p-4 rounded-lg">
                    <h4 className="font-bold text-white mb-2">📱 Controle Remoto P2P via QR Code</h4>
                    <p className="text-sm text-slate-300">Grave sozinho! Escaneie um QR code e use seu celular como controle. Inicie, pause, ajuste velocidade sem tocar no tablet.</p>
                </div>
                <div className="bg-slate-700 p-4 rounded-lg">
                    <h4 className="font-bold text-white mb-2">⚡ Sem Instalação ou Lag</h4>
                    <p className="text-sm text-slate-300">Funciona direto no navegador. Controle P2P via Wi-Fi local (não depende de internet). Resposta instantânea, zero atraso.</p>
                </div>
                <div className="bg-slate-700 p-4 rounded-lg">
                    <h4 className="font-bold text-white mb-2">🎨 Totalmente Personalizável</h4>
                    <p className="text-sm text-slate-300">Ajuste fonte, tamanho, cores, velocidade, e muito mais. Adapte perfeitamente ao seu setup e iluminação.</p>
                </div>
            </div>
        </div>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Otimizando o PromptNinja para Seu Setup DIY</h2>

        <div className="bg-slate-800 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-bold text-white mb-4">Configurações Recomendadas</h3>
            <ul className="space-y-4">
                <li className="flex items-start">
                    <span className="text-2xl mr-3">🔆</span>
                    <div>
                        <strong className="text-white">Brilho da Tela:</strong>
                        <p className="text-slate-300 text-sm">Coloque o tablet no brilho máximo. O reflexo no vidro reduz a intensidade da luz, então você precisa compensar.</p>
                    </div>
                </li>
                <li className="flex items-start">
                    <span className="text-2xl mr-3">📏</span>
                    <div>
                        <strong className="text-white">Tamanho da Fonte:</strong>
                        <p className="text-slate-300 text-sm">Teste diferentes tamanhos. Para um tablet 10", recomendamos começar com 48-60px e ajustar conforme sua distância.</p>
                    </div>
                </li>
                <li className="flex items-start">
                    <span className="text-2xl mr-3">🎨</span>
                    <div>
                        <strong className="text-white">Contraste:</strong>
                        <p className="text-slate-300 text-sm">Use texto branco em fundo preto para máximo contraste no reflexo. Evite cores claras no fundo.</p>
                    </div>
                </li>
                <li className="flex items-start">
                    <span className="text-2xl mr-3">⚡</span>
                    <div>
                        <strong className="text-white">Velocidade:</strong>
                        <p className="text-slate-300 text-sm">Comece devagar (50-100 WPM) até se acostumar com o setup. Use o controle remoto para ajustar em tempo real.</p>
                    </div>
                </li>
                <li className="flex items-start">
                    <span className="text-2xl mr-3">🔋</span>
                    <div>
                        <strong className="text-white">Modo de Economia de Energia:</strong>
                        <p className="text-slate-300 text-sm">Desative o modo de economia de energia do tablet para evitar que a tela escureça durante a gravação.</p>
                    </div>
                </li>
            </ul>
        </div>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Problemas Comuns e Soluções (Troubleshooting)</h2>

        <div className="space-y-4 mb-8">
            <div className="bg-red-900/20 border border-red-500/30 p-4 rounded-lg">
                <h4 className="font-bold text-white mb-2">❌ Problema: O reflexo está muito fraco ou quase invisível</h4>
                <p className="text-slate-300 text-sm mb-2"><strong>Solução:</strong></p>
                <ul className="list-disc pl-6 text-slate-300 text-sm space-y-1">
                    <li>Aumente o brilho do tablet para o máximo</li>
                    <li>Reduza a iluminação ambiente da sala (o reflexo fica mais visível no escuro)</li>
                    <li>Certifique-se de que o vidro está limpo e sem manchas</li>
                    <li>Verifique se o ângulo do vidro está correto (45 graus)</li>
                </ul>
            </div>

            <div className="bg-red-900/20 border border-red-500/30 p-4 rounded-lg">
                <h4 className="font-bold text-white mb-2">❌ Problema: A câmera está gravando o texto refletido</h4>
                <p className="text-slate-300 text-sm mb-2"><strong>Solução:</strong></p>
                <ul className="list-disc pl-6 text-slate-300 text-sm space-y-1">
                    <li>Ajuste o ângulo do vidro para exatamente 45 graus</li>
                    <li>Verifique se o pano preto está bloqueando toda a luz ao redor da câmera</li>
                    <li>Reduza o brilho do tablet (se ainda assim o reflexo está visível para você)</li>
                </ul>
            </div>

            <div className="bg-red-900/20 border border-red-500/30 p-4 rounded-lg">
                <h4 className="font-bold text-white mb-2">❌ Problema: O texto está cortado ou não inteiro visível</h4>
                <p className="text-slate-300 text-sm mb-2"><strong>Solução:</strong></p>
                <ul className="list-disc pl-6 text-slate-300 text-sm space-y-1">
                    <li>Ajuste a distância entre o tablet e o vidro</li>
                    <li>Use um tablet ou vidro maior</li>
                    <li>Reduza o tamanho da fonte no PromptNinja</li>
                    <li>Afaste-se um pouco mais da estrutura</li>
                </ul>
            </div>

            <div className="bg-red-900/20 border border-red-500/30 p-4 rounded-lg">
                <h4 className="font-bold text-white mb-2">❌ Problema: O texto está difícil de ler (borrado)</h4>
                <p className="text-slate-300 text-sm mb-2"><strong>Solução:</strong></p>
                <ul className="list-disc pl-6 text-slate-300 text-sm space-y-1">
                    <li>Limpe bem o vidro (manchas de dedo causam distorção)</li>
                    <li>Use vidro em vez de acrílico (acrílico arranhado distorce mais)</li>
                    <li>Aumente o tamanho da fonte no PromptNinja</li>
                    <li>Use fontes sem serifa (Arial, Helvetica) que são mais legíveis no reflexo</li>
                </ul>
            </div>

            <div className="bg-red-900/20 border border-red-500/30 p-4 rounded-lg">
                <h4 className="font-bold text-white mb-2">❌ Problema: O controle remoto não está funcionando</h4>
                <p className="text-slate-300 text-sm mb-2"><strong>Solução:</strong></p>
                <ul className="list-disc pl-6 text-slate-300 text-sm space-y-1">
                    <li>Certifique-se de que tablet e celular estão na mesma rede Wi-Fi</li>
                    <li>Recarregue a página do PromptNinja no tablet</li>
                    <li>Escaneie o QR code novamente</li>
                    <li>Se necessário, consulte nosso <a href="/teleprompter-online-gratis" className="text-purple-400 hover:text-purple-300 underline">guia de controle remoto P2P</a></li>
                </ul>
            </div>
        </div>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">FAQ: Perguntas Frequentes sobre Teleprompter Caseiro</h2>
        <SEOContentFAQ
            title=""
            items={[
                {
                    question: "Preciso de um vidro especial ou vidro comum funciona?",
                    answer: "Um vidro de porta-retrato comum funciona perfeitamente! Vidros profissionais \"beam splitter\" (50/50) são melhores, mas para um setup DIY caseiro a diferença é mínima e o custo é 10x maior. O importante é que o vidro esteja limpo e sem arranhões."
                },
                {
                    question: "Quanto custa fazer um teleprompter caseiro?",
                    answer: "Entre R$ 30 e R$ 80 se você comprar todos os materiais do zero (vidro, caixa/madeira, pano preto, cola). Se você já tem um tablet e uma câmera, pode custar menos de R$ 50. Compare com teleprompters profissionais que custam R$ 500 a R$ 3.000+."
                },
                {
                    question: "Como evito que a câmera grave o texto refletido?",
                    answer: "O segredo está em três fatores: (1) ângulo correto do vidro (45 graus), (2) pano preto bloqueando a luz ao redor da câmera, e (3) iluminação adequada. A câmera, posicionada atrás do vidro, captura a imagem à sua frente, enquanto o texto refletido só é visível para quem está na frente (você)."
                },
                {
                    question: "Posso usar meu celular em vez de um tablet?",
                    answer: "Sim, mas tablets são muito melhores pela tela maior. Se usar celular, escolha um com tela grande (6.5\"+) e posicione-o mais próximo do vidro. Vai funcionar, mas o texto refletido será menor e mais difícil de ler."
                },
                {
                    question: "O PromptNinja funciona offline no meu teleprompter caseiro?",
                    answer: "Sim! Depois de carregar a página uma vez, o PromptNinja funciona offline graças à tecnologia PWA. O controle remoto P2P também funciona via Wi-Fi local, sem precisar de internet ativa."
                },
                {
                    question: "Preciso instalar algum app no tablet?",
                    answer: "Não! O PromptNinja funciona direto no navegador (Chrome, Safari, Edge, Firefox). Basta acessar o site. Você pode instalar como PWA (Progressive Web App) se quiser, mas não é obrigatório."
                },
                {
                    question: "O controle remoto do PromptNinja funciona com qualquer celular?",
                    answer: "Sim. Qualquer smartphone que consiga ler um QR code e tenha um navegador moderno pode ser usado como controle remoto. Não precisa instalar nada no celular — tudo funciona no navegador via conexão P2P local."
                },
                {
                    question: "Posso usar acrílico em vez de vidro?",
                    answer: "Sim! Acrílico transparente funciona bem e é mais leve e seguro (não quebra). A única desvantagem é que arranha mais fácil, o que pode distorcer um pouco o reflexo. Se usar acrílico, proteja com uma película removível."
                }
            ]}
        />

        <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-8 rounded-lg my-10 border border-purple-500/30">
            <h2 className="text-3xl font-bold text-white mb-4 text-center">Pronto para Transformar seu Projeto DIY em uma Ferramenta Profissional?</h2>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto text-center">
                Você já economizou centenas de reais no hardware. Agora, <strong>potencialize seu teleprompter caseiro com um software 100% gratuito</strong> feito especialmente para setups DIY como o seu.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                <a
                    href="https://promptninja.solutionkit.com.br"
                    className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 font-bold py-3 px-8 rounded-full transition hover:brightness-110 hover:scale-105"
                    style={{ color: 'white' }}
                >
                    🚀 Testar o PromptNinja Grátis
                </a>
                <a
                    href="/teleprompter-online-gratis"
                    className="inline-block border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white font-bold py-3 px-8 rounded-full transition"
                >
                    📖 Ver Mais Recursos
                </a>
            </div>
            <p className="text-slate-400 text-sm text-center mt-4">
                ✅ Modo Espelho • ✅ Controle Remoto P2P • ✅ Sem Instalação • ✅ 100% Grátis
            </p>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg mt-8">
            <h3 className="text-xl font-bold text-white mb-3">💡 Dica Extra: Outros Recursos Úteis</h3>
            <p className="text-slate-300 mb-4">
                Se você está montando um teleprompter caseiro, essas outras funcionalidades do PromptNinja podem ser úteis:
            </p>
            <ul className="list-disc pl-6 text-slate-300 space-y-2">
                <li><a href="/teleprompter-modo-musico" className="text-purple-400 hover:text-purple-300 underline">Modo Músico</a> — Perfeito se você também grava músicas ou precisa de cifras</li>
                <li><a href="/como-usar-teleprompter" className="text-purple-400 hover:text-purple-300 underline">Como usar teleprompter profissionalmente</a> — Técnicas para melhorar sua performance</li>
                <li><a href="/teleprompter-vs-hardware" className="text-purple-400 hover:text-purple-300 underline">Teleprompter Web vs Hardware</a> — Compare seu setup DIY com opções profissionais</li>
            </ul>
        </div>
    </>
);
