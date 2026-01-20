import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { SEOImage } from "../../../../components/seo/SEOImage";

export const TeleprompterModoMusicoPT = () => (
    <>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Teleprompter para Músicos: Letras e Cifras na Ponta dos Dedos
        </h2>

        <p className="lead text-xl text-slate-300 mb-8 font-medium">
            Leve sua performance para o próximo nível sem o medo de esquecer a letra ou se perder nos acordes. <strong>O Modo Músico do PromptNinja</strong> é a solução definitiva para artistas e lives.
        </p>

        <p className="text-slate-300 mb-8">
            Neste guia especializado para artistas, exploramos como o PromptNinja transforma seu smartphone ou tablet no roadie digital definitivo. Descubra como configurar um teleprompter que acompanha seu ritmo, permitindo que você mantenha o foco na entrega emocional e na conexão com seu público, seja em um palco presencial ou em transmissões ao vivo. Com suporte para cifras, acordes e controle via pedal bluetooth, nossa ferramenta online e gratuita garante que cada refrão e cada ponte sejam executados com perfeição, eliminando a ansiedade do 'branco' e profissionalizando seu setup musical em segundos.
        </p>

        <SEOImage
            slug="teleprompter-modo-musico"
            src="teleprompter-music-mode-lyrics-chords.webp"
            alt="Teleprompter exibindo letras e cifras para músicos"
            caption="O Modo Músico permite que você veja letras e acordes sincronizados com sua performance."
            width={1200}
            height={675}
            priority={true}
        />

        <div className="bg-slate-900/50 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-xl mb-12">
            <h3 className="text-2xl font-bold text-white mb-6">Por que o PromptNinja é o Melhor Amigo do Músico?</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <li className="flex items-start gap-3 bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                    <span className="text-yellow-400 text-xl">⏱️</span>
                    <div className="text-sm">
                        <strong className="text-white block mb-1">Rolagem Fluida e Rítmica</strong>
                        <span className="text-slate-400">Ajuste a velocidade para acompanhar o tempo da música, garantindo que o texto suba exatamente no compasso certo.</span>
                    </div>
                </li>
                <li className="flex items-start gap-3 bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                    <span className="text-yellow-400 text-xl">🎼</span>
                    <div className="text-sm">
                        <strong className="text-white block mb-1">Suporte para Cifras e Acordes</strong>
                        <span className="text-slate-400">Mantenha suas harmonias visíveis logo acima da letra, sem perder o alinhamento mesmo com fontes grandes.</span>
                    </div>
                </li>
                <li className="flex items-start gap-3 bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                    <span className="text-yellow-400 text-xl">🦶</span>
                    <div className="text-sm">
                        <strong className="text-white block mb-1">Controle Mãos Livres</strong>
                        <span className="text-slate-400">Compatível com pedais Bluetooth e controles remotos, para que você mude de música sem tirar as mãos do instrumento.</span>
                    </div>
                </li>
                <li className="flex items-start gap-3 bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                    <span className="text-yellow-400 text-xl">🌑</span>
                    <div className="text-sm">
                        <strong className="text-white block mb-1">Alto Contraste para Palco</strong>
                        <span className="text-slate-400">Fundo preto e texto vibrante garantem legibilidade perfeita mesmo sob as luzes intensas do palco.</span>
                    </div>
                </li>
            </ul>
        </div>

        <div className="bg-slate-800 p-8 rounded-xl border border-purple-500/30 mb-12">
            <h3 className="text-2xl font-bold text-white mb-4">Diferente de um Discurso</h3>
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

        <h3 className="text-3xl font-bold text-white mt-12 mb-6">Como Configurar o "Palco Ninja"</h3>

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

        <section id="cases-musica" className="p-8 bg-zinc-900 text-white rounded-2xl my-16 border border-zinc-700 shadow-2xl">
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 text-center mb-10">Quem Brilha no Palco com o PromptNinja! (E-E-A-T)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-zinc-800 p-6 rounded-xl border-t-2 border-yellow-500">
                    <p className="text-zinc-300 italic">"Minhas lives no YouTube mudaram depois do Modo Músico. Não preciso mais de pastas de papel horríveis aparecendo na câmera. O setup com o iPad no pedestal fica super profissional."</p>
                    <span className="block mt-4 text-sm font-bold text-yellow-500">— Ricardo Lima, Cantor de Bares e Lives</span>
                </div>
                <div className="bg-zinc-800 p-6 rounded-xl border-t-2 border-orange-500">
                    <p className="text-zinc-300 italic">"O controle por pedal Bluetooth no PromptNinja é um salva-vidas pra quem toca violão e canta sozinho. Consigo rolar as letras sem interromper a batida."</p>
                    <span className="block mt-4 text-sm font-bold text-orange-500">— Amanda Rocha, Artista Independente</span>
                </div>
            </div>
        </section>

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
