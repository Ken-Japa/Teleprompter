import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";

export const TeleprompterOQueEPT = () => (
    <>
        <h1 className="text-4xl font-bold text-white mb-6 leading-tight">
            O Que é Teleprompter? A História da "Cola" Profissional
        </h1>

        <p className="mb-6 text-xl text-slate-300">
            Você vê o Presidente olhando diretamente para a câmera, falando eloquentemente por 30 minutos sem olhar nenhum papel. Gênio? Não. Tecnologia.
        </p>

        <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">Como Funciona a Mágica (O Espelho)</h2>
            <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1">
                    <p className="text-slate-300 mb-4">
                        A mágica está num vidro especial chamado <strong>"Beam Splitter" (Divisor de Feixe)</strong>.
                    </p>
                    <ul className="list-disc pl-6 text-slate-300 space-y-2">
                        <li>De um lado (plateia/câmera), ele é transparente 🪟.</li>
                        <li>Do outro (apresentador), ele é um espelho 🪞.</li>
                    </ul>
                    <p className="text-slate-300 mt-4">
                        Isso permite que uma tela colocada no chão reflita o texto no vidro. O apresentador lê o reflexo, mas a câmera filma através do vidro transparente sem ver o texto.
                        Resultado: O apresentador olha <strong>diretamente nos olhos</strong> da lente enquanto lê.
                    </p>
                </div>
                <div className="bg-black p-4 rounded-lg border border-slate-600 font-mono text-xs text-green-400 w-full md:w-1/3">
                    <div className="text-center mb-2">📷 Câmera (Não vê nada)</div>
                    <div className="border-b border-slate-500 my-2 text-center text-slate-500">| | Vidro Inclinado 45° | |</div>
                    <div className="text-center mt-2">👁️ Apresentador (Vê texto)</div>
                    <div className="mt-4 text-center text-yellow-400">📱 Tablet (Emite luz)</div>
                </div>
            </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
                <h3 className="text-xl font-bold text-white mb-2">1950: O Rolo de Papel</h3>
                <p className="text-sm text-slate-400">
                    O primeiro teleprompter (usado na série <em>The First Hundred Years</em>) era literalmente um rolo de papel de açougueiro motorizado, operado por alguém que girava uma manivela. Se o ator falasse rápido demais, o operador tinha que girar mais rápido!
                </p>
            </div>
            <div>
                <h3 className="text-xl font-bold text-white mb-2">1952: Eisenhower e a Política</h3>
                <p className="text-sm text-slate-400">
                    Dwight Eisenhower foi o primeiro presidente dos EUA a usar um TP em campanha. Ele percebeu que olhar para o público (via câmera) passava muito mais sinceridade do que ler discursos na mesa. Desde então, nenhum político vive sem um.
                </p>
            </div>
        </div>

        <SEOContentFAQ
            title="Curiosidades do Teleprompter"
            items={[
                {
                    question: "O que é um 'Presidential Teleprompter'?",
                    answer: "São aqueles dois vidros de pé, um de cada lado do pódio. Eles são invisíveis para a plateia (parecem vidro fumê), mas refletem o texto vindo de monitores no chão. O político alterna o olhar entre esquerda e direita para parecer que está olhando para todo o público."
                },
                {
                    question: "Por que se chama 'Teleprompter'?",
                    answer: "Vem de 'Tele' (Distância) + 'Prompter' (Aquele que sopra/lembra). No teatro antigo, o 'Ponto' (Prompter) era a pessoa escondida no palco que soprava a fala caso o ator esquecesse."
                },
                {
                    question: "Posso fazer um em casa?",
                    answer: "Sim! Um vidro de porta-retrato comum funciona (com um pouco de reflexo duplo/fantasmas). Para qualidade profissional, você precisa de um vidro especial '70/30 Beam Splitter'."
                }
            ]}
        />
    </>
);
