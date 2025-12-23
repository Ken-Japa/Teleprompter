import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";

export const TeleprompterModoMusicoPT = () => (
    <>
        <h1 className="text-4xl font-bold text-white mb-6 leading-tight">
            Teleprompter para Músicos: Nunca Mais Esqueça a Letra no Palco
        </h1>

        <p className="mb-6 text-xl text-slate-300">
            O pesadelo de todo cantor: você está no meio do show, a banda está tocando, o público está olhando... e dá um branco. Você esquece o primeiro verso da próxima estrofe.
        </p>

        <p className="mb-8 text-slate-300">
            Grandes artistas (de Bono Vox a Caetano Veloso) usam teleprompters no palco. Não é vergonha, é <strong>segurança profissional</strong>. O PromptNinja tem um "Modo Músico" secreto que você precisa conhecer.
        </p>

        <div className="bg-slate-800 p-8 rounded-xl border border-purple-500/30 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">Diferente de um Discurso</h2>
            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <h3 className="text-lg font-bold text-slate-200 mb-2">🎤 O Problema das Pastas</h3>
                    <p className="text-sm text-slate-400">
                        Pastas com folhas de papel voam com o vento, precisam de luz externa para serem lidas no escuro do palco e exigem que você pare de tocar para virar a página.
                    </p>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-purple-400 mb-2">🎸 A Solução Digital</h3>
                    <p className="text-sm text-slate-300">
                        Tela iluminada (visível no escuro), rolagem automática (mãos livres) e letras gigantes (legível do chão).
                    </p>
                </div>
            </div>
        </div>

        <h2 className="text-3xl font-bold text-white mt-12 mb-6">Como Configurar o "Palco Ninja"</h2>

        <div className="space-y-6 mb-12">
            <div className="flex gap-4">
                <div className="text-3xl">🦶</div>
                <div>
                    <h3 className="text-xl font-bold text-white">1. O Pedal Vira-Páginas</h3>
                    <p className="text-slate-300">
                        O PromptNinja aceita atalhos de teclado. Se você comprar um pedal Bluetooth (como PageFlip ou iRig BlueTurn), configure ele para simular a tecla "Espaço".
                        <br /> Configuramos alguns atalhos de fábrica para pedais:
                        <ul className=" text-slate-400">
                            <li>Page Down: Play/Pause</li>
                            <li>Page Up: Stop/Reset</li>
                            <li>End: Próxima sessão (use no texto [PART 1] [PART 2] etc)</li>
                            <li>Home: Sessão anterior </li>
                        </ul>
                        <br /><strong>Resultado:</strong> Você pisa, a letra rola. Suas mãos continuam na guitarra/teclado.
                    </p>
                </div>
            </div>

            <div className="flex gap-4">
                <div className="text-3xl">📱</div>
                <div>
                    <h3 className="text-xl font-bold text-white">2. Tablet no Suporte de Microfone</h3>
                    <p className="text-slate-300">
                        Use um suporte de tablet que prenda no pedestal do microfone. Coloque o PromptNinja em tela cheia. Ajuste o fundo para preto total e texto branco para não iluminar seu rosto de baixo para cima ("efeito fantasma").
                    </p>
                </div>
            </div>

            <div className="flex gap-4">
                <div className="text-3xl">🎼</div>
                <div>
                    <h3 className="text-xl font-bold text-white">3. Formatação de Cifras</h3>
                    <p className="text-slate-300">
                        O PromptNinja respeita quebras de linha. Você pode colar a letra com as cifras em cima.
                        <br /><span className="font-mono text-yellow-400 text-sm">G                D                Em<br />Nesta longa estrada da vida...</span>
                    </p>
                </div>
            </div>
        </div>

        <SEOContentFAQ
            title="Dúvidas de Banda"
            items={[
                {
                    question: "Funciona offline no palco?",
                    answer: "Sim! Instale o PWA (App) do PromptNinja. Uma vez carregado, não precisa de Wi-Fi. O palco pode cair a internet que sua letra continua lá."
                },
                {
                    question: "Como sincronizar com a banda?",
                    answer: "Você pode definir a velocidade exata de rolagem (BPM visual). Ou, melhor ainda, deixar o controle na mão (ou pé) do baterista via pedal, já que ele dita o tempo."
                },
                {
                    question: "E se a música tiver um solo longo?",
                    answer: "Insira várias quebras de linha vazias no texto entre as estrofes. Assim, o texto 'anda' no espaço em branco durante o solo e a próxima estrofe chega na hora certa."
                }
            ]}
        />
    </>
);
