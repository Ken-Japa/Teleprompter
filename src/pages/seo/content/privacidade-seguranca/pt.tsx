
export const PrivacidadeSegurancaPT = () => (
    <>
        <h1 className="text-4xl font-bold text-white mb-6">Privacidade e Segurança: Como o PromptNinja Protege Seus Dados</h1>
        <p className="mb-6 text-xl text-slate-300">
            Em um mundo onde seus dados são a moeda, o PromptNinja adota uma postura radical: <strong>nós não queremos seus dados</strong>. Nossa arquitetura foi desenhada desde o zero para garantir que seus roteiros e apresentações permaneçam privados e sob seu controle.
        </p>

        <div className="grid md:grid-cols-2 gap-8 my-12">

            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">🚫</span> Sem Login, Sem Rastro
                </h2>
                <p className="text-slate-300 mb-4">
                    A maioria dos serviços exige que você crie uma conta para que eles possam rastrear seu uso e armazenar seus dados. O PromptNinja não.
                </p>
                <ul className="list-disc pl-5 text-slate-300 space-y-2">
                    <li>Não exigimos e-mail ou senha.</li>
                    <li>Não há banco de dados de usuários.</li>
                    <li>O que você digita no navegador, fica no navegador.</li>
                </ul>
            </div>

            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                    <span className="text-3xl">🔒</span> Processamento Local
                </h2>
                <p className="text-slate-300 mb-4">
                    Todo o processamento do texto acontece no seu dispositivo (Client-side).
                </p>
                <ul className="list-disc pl-5 text-slate-300 space-y-2">
                    <li>Seus scripts <strong>nunca</strong> são enviados para nossos servidores.</li>
                    <li>Se a sua internet cair, o teleprompter continua funcionando.</li>
                    <li>Ao fechar a aba, os dados são limpos da memória (a menos que você os salve explicitamente).</li>
                </ul>
            </div>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">A Mágica do WebRTC e P2P</h2>
        <p className="text-slate-300 mb-6">
            Para permitir que você controle o teleprompter pelo celular, usamos uma tecnologia avançada chamada <strong>WebRTC (Web Real-Time Communication)</strong>. Isso cria um túnel direto entre o seu computador e o seu celular.
        </p>

        <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-xl">
            <h3 className="text-xl font-bold text-blue-400 mb-4">Como funciona a conexão P2P (Peer-to-Peer):</h3>
            <ol className="relative border-l border-slate-700 ml-4 space-y-8">
                <li className="mb-10 ml-6">
                    <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-900 rounded-full -left-4 ring-4 ring-slate-900 text-blue-300 font-bold">1</span>
                    <h4 className="font-bold text-white text-lg">Handshake (O "Aperto de Mão")</h4>
                    <p className="text-slate-400 mt-2">
                        Usamos um servidor de sinalização apenas para apresentar seu celular ao seu computador. Ele troca códigos criptografados temporários para que os dispositivos se encontrem. <strong>Nenhum dado do seu roteiro passa por aqui.</strong>
                    </p>
                </li>
                <li className="mb-10 ml-6">
                    <span className="absolute flex items-center justify-center w-8 h-8 bg-green-900 rounded-full -left-4 ring-4 ring-slate-900 text-green-300 font-bold">2</span>
                    <h4 className="font-bold text-white text-lg">Túnel Direto</h4>
                    <p className="text-slate-400 mt-2">
                        Uma vez conectados, os dispositivos criam um túnel direto e criptografado (DTLS). A partir desse momento, a comunicação é 100% direta entre eles, sem passar por nenhum servidor intermediário.
                    </p>
                </li>
                <li className="ml-6">
                    <span className="absolute flex items-center justify-center w-8 h-8 bg-purple-900 rounded-full -left-4 ring-4 ring-slate-900 text-purple-300 font-bold">3</span>
                    <h4 className="font-bold text-white text-lg">Latência Zero & Segurança Total</h4>
                    <p className="text-slate-400 mt-2">
                        Como os dados viajam apenas na sua rede local (ou diretamente pela internet via P2P), a resposta é instantânea e impossível de ser interceptada massivamente.
                    </p>
                </li>
            </ol>
        </div>

        <div className="mt-12 p-6 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <h3 className="text-lg font-bold text-yellow-500 mb-2">Resumo da Segurança</h3>
            <p className="text-slate-300">
                Seus roteiros são seus. O PromptNinja é apenas a ferramenta que os exibe. Não vemos, não guardamos e não vendemos seus textos. É segurança por design, não por política.
            </p>
        </div>
    </>
);
