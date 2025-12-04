export const TeleprompterCaseiroDIYPT = () => (
    <>
        <h1 className="text-4xl font-bold text-white mb-6">Como Fazer um Teleprompter Caseiro: Guia DIY</h1>

        <p className="mb-6">
            Equipamentos profissionais de teleprompter podem custar milhares de reais. Mas você sabia que pode montar um em casa gastando quase nada? O princípio físico é simples: o "Fantasma de Pepper".
        </p>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Lista de Materiais</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Uma moldura de quadro com vidro (ou um pedaço de vidro/acrílico transparente).</li>
            <li>Uma caixa de papelão ou madeira preta.</li>
            <li>Um tablet ou monitor (para exibir o texto).</li>
            <li>Um pano preto (para cobrir a câmera).</li>
        </ul>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">A Parte Mais Importante: O Software</h2>
        <p className="mb-4">
            Depois de montar a estrutura física, você vai perceber um problema: quando você coloca o tablet embaixo do vidro, o texto reflete <strong>invertido</strong>.
        </p>
        <p className="mb-4">
            É aqui que entra o <strong>PromptNinja</strong>. Ele possui uma função nativa de "Espelhamento" (Mirror Mode) que inverte o texto horizontalmente e verticalmente.
        </p>

        <div className="bg-slate-800 p-6 rounded-lg my-6">
            <h3 className="text-lg font-bold text-white mb-2">Passo a Passo do Software:</h3>
            <ol className="list-decimal pl-6 space-y-2 text-slate-300">
                <li>Abra o PromptNinja no seu tablet/monitor.</li>
                <li>Cole seu texto.</li>
                <li>Clique no ícone de Configurações (engrenagem).</li>
                <li>Ative a opção <strong>"Espelhar Texto"</strong>.</li>
                <li>Coloque o dispositivo na sua estrutura caseira e comece a gravar!</li>
            </ol>
        </div>

        <p className="mb-6">
            Você não precisa gastar com software caro depois de economizar no hardware. O PromptNinja é grátis e resolve a parte técnica para seu projeto DIY.
        </p>
    </>
);
