
export const TeleprompterZoomMeetingPT = () => (
    <>
        <h1 className="text-4xl font-bold text-white mb-6">Como usar Teleprompter no Zoom, Teams e Google Meet</h1>

        <p className="mb-6">
            Manter contato visual durante uma apresentação online é difícil. Se você olha para suas anotações, perde a conexão com o público. Se olha para a câmera, esquece o que falar. O PromptNinja resolve isso, permitindo que você leia seu roteiro enquanto olha diretamente para a lente da câmera.
        </p>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">O Problema do "Olhar Desviado" em Videochamadas</h2>
        <p className="mb-4">
            Em reuniões importantes de vendas, entrevistas de emprego ou apresentações executivas, a confiança é transmitida pelo olhar. Ler um script em papel ou em uma janela lateral faz você parecer despreparado, robótico ou inseguro.
        </p>
        <p className="mb-4">
            A solução técnica é simples, mas exige o posicionamento correto: colocar o texto <strong>o mais próximo possível da webcam</strong>.
        </p>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Passo a Passo Definitivo para Reuniões Online</h2>
        <div className="bg-slate-800 p-6 rounded-lg my-6">
            <ol className="list-decimal pl-6 space-y-4 text-slate-300">
                <li>
                    <strong>Posicionamento da Janela:</strong> Abra o PromptNinja no seu navegador e redimensione a janela para que ela fique estreita. Arraste-a para o topo da tela, centralizada logo abaixo da sua webcam física.
                </li>
                <li>
                    <strong>Configuração do Texto:</strong> Aumente o tamanho da fonte e diminua a largura das margens. Isso faz com que seus olhos se movam menos da esquerda para a direita, disfarçando a leitura.
                </li>
                <li>
                    <strong>Controle Remoto Invisível:</strong> Não toque no mouse ou teclado! O som do clique distrai e o movimento dos ombros denuncia que você está operando o computador. Use seu celular como controle remoto silencioso (basta escanear o QR Code).
                </li>
                <li>
                    <strong>Transparência (Dica Pro):</strong> Se você precisa ver os slides ou o rosto das outras pessoas enquanto fala, diminua a largura da janela do teleprompter para que ele ocupe apenas uma faixa estreita no topo, deixando o resto da tela livre.
                </li>
            </ol>
        </div>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Funciona em qualquer plataforma de videoconferência</h2>
        <p className="mb-6">
            Como o PromptNinja roda no navegador, ele é compatível universalmente. Você não precisa de plugins ou integrações complexas. Ele funciona como uma camada "acima" da sua reunião.
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Zoom:</strong> Ideal para webinars e aulas.</li>
            <li><strong>Microsoft Teams:</strong> Perfeito para reuniões corporativas.</li>
            <li><strong>Google Meet:</strong> Ótimo para chamadas rápidas no navegador.</li>
            <li><strong>Skype, Discord, Slack:</strong> Funciona em qualquer app que use câmera.</li>
        </ul>
        <p className="mb-6">
            <strong>Importante:</strong> Você <em>não</em> precisa compartilhar sua tela para que o teleprompter funcione. Ele é uma ferramenta apenas para seus olhos. Se precisar compartilhar tela, compartilhe apenas a janela da apresentação (PowerPoint/PDF) e mantenha o teleprompter visível apenas para você.
        </p>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Dicas Avançadas de Etiqueta e Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-900 p-4 rounded-lg">
                <h3 className="text-xl font-bold text-purple-400 mb-2">Iluminação</h3>
                <p className="text-sm text-slate-400">Garanta que seu rosto esteja bem iluminado de frente. O reflexo da tela branca do teleprompter pode ajudar a iluminar seu rosto, mas uma luz dedicada é melhor.</p>
            </div>
            <div className="bg-slate-900 p-4 rounded-lg">
                <h3 className="text-xl font-bold text-blue-400 mb-2">Posição da Câmera</h3>
                <p className="text-sm text-slate-400">A câmera deve estar na altura dos olhos. Se usar notebook, coloque livros embaixo dele. Câmera baixa (nariz para cima) passa arrogância; câmera alta passa submissão.</p>
            </div>
        </div>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Perguntas Frequentes</h2>
        <dl className="space-y-4">
            <div>
                <dt className="font-bold text-white">As pessoas vão saber que estou lendo?</dt>
                <dd className="text-slate-300">Se você posicionar o texto bem próximo à câmera e usar uma fonte grande, o movimento dos seus olhos será imperceptível. Pratique ler com entonação natural.</dd>
            </div>
            <div>
                <dt className="font-bold text-white">Posso gravar a reunião?</dt>
                <dd className="text-slate-300">Sim! O teleprompter não aparece na gravação do Zoom/Teams, a menos que você esteja gravando a captura total da sua tela (screen capture) em vez de apenas a câmera.</dd>
            </div>
        </dl>
    </>
);
