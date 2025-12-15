import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";

export const TeleprompterIphoneIpadPT = () => (
    <>
        <h1 className="text-4xl font-bold text-white mb-6">Teleprompter para iPhone e iPad: Transforme seu iOS em Estúdio</h1>

        <p className="lead text-xl text-slate-300 mb-8">
            A câmera do seu iPhone ou iPad já é incrível. O que falta é uma maneira profissional de ler roteiros sem desviar o olhar. O PromptNinja é o teleprompter perfeito para o ecossistema Apple, funcionando diretamente no Safari com performance nativa e integração total via AirPlay ou P2P.
        </p>

        <div className="bg-slate-800 p-6 rounded-lg my-8 border-l-4 border-slate-200">
            <h2 className="text-2xl font-bold text-white mb-2">A Experiência Apple, Sem o Custo da App Store</h2>
            <p className="text-slate-300">
                A maioria dos apps de teleprompter na App Store cobra assinaturas caras semanalmente. O PromptNinja é diferente: roda no seu navegador Safari, é gratuito e sincroniza instantaneamente com seu Mac ou outro dispositivo.
                <br /><br />
                Além disso, você pode adicionar o PromptNinja à sua tela de início ("Add to Home Screen") para uma experiência de aplicativo de tela cheia, sem barras de navegação.
            </p>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Configuração Ideal para Criadores iOS</h2>
        <div className="bg-slate-800 p-6 rounded-lg my-6">
            <ol className="list-decimal pl-6 space-y-6 text-slate-300">
                <li>
                    <strong>iPad como Monitor Principal:</strong> A tela grande do iPad é perfeita para leitura a média distância. Coloque-o logo abaixo da lente da sua câmera DSLR para um setup profissional de estúdio.
                </li>
                <li>
                    <strong>iPhone como Controle Remoto:</strong> Abra o roteiro no iPad e escaneie o QR Code com a câmera do seu iPhone. Seu celular agora controla a velocidade e play/pause do iPad instantaneamente.
                </li>
                <li>
                    <strong>Vlog com iPhone:</strong> Vai gravar um story ou TikTok? Abra o PromptNinja no próprio iPhone, posicione o texto no topo e grave sem perder o contato visual.
                </li>
            </ol>
        </div>

        <div className="text-center mt-12">
            <a
                href="https://promptninja.solutionkit.com.br"
                className="inline-block bg-gradient-to-r from-slate-600 to-slate-500 font-bold py-3 px-6 rounded-lg transition hover:brightness-110"
                style={{ color: 'white' }}
            >
                Use Agora no seu iPhone ou iPad
            </a>
        </div>

        <SEOContentFAQ
            title="Perguntas Frequentes de Usuários iOS"
            items={[
                {
                    question: "Preciso baixar um aplicativo na App Store?",
                    answer: "Não. O PromptNinja é um Web App (PWA). Você acessa pelo Safari e pode adicioná-lo à tela de início para funcionar exatamente como um app nativo, mas sem ocupar espaço e totalmente grátis."
                },
                {
                    question: "Funciona sem internet (Offline)?",
                    answer: "Sim! Após carregar a página pela primeira vez, o aplicativo fica salvo no cache do seu iPhone/iPad e funciona mesmo em modo avião, garantindo que você nunca fique na mão durante uma gravação."
                },
                {
                    question: "Posso controlar meu iPad usando meu iPhone?",
                    answer: "Com certeza. Essa é a configuração favorita dos nossos usuários. Abra o texto no iPad (que servirá de tela) e escaneie o QR Code com o iPhone para transformá-lo em um controle remoto instantâneo."
                }
            ]}
        />
    </>
);
