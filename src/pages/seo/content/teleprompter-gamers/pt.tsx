import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";

export const TeleprompterGamersPT = () => (
    <>
        <h1 className="text-4xl font-bold text-white mb-6">Teleprompter Minimalista para Gamers e Streamers</h1>

        <p className="mb-6">
            Durante uma live de gameplay, cada pixel da sua tela é valioso. Você precisa ler o chat, verificar notas de speedrun ou seguir um roteiro de "lore" sem poluir sua visão com interfaces complexas. O <strong>PromptNinja</strong> oferece o modo mais limpo do mercado, desenhado especificamente para quem joga e transmite ao mesmo tempo.
        </p>

        <p className="mb-6">
            Seja você um usuário de OBS, Twitch Studio ou Streamlabs, nosso teleprompter se adapta ao seu setup, não o contrário.
        </p>

        <div className="bg-slate-800 p-6 rounded-lg my-8 border-l-4 border-green-500">
            <h2 className="text-2xl font-bold text-white mb-2">Modo "No HUD" (Interface Invisível)</h2>
            <p className="text-slate-300">
                Aperte a tecla <kbd className="bg-slate-700 px-2 py-1 rounded text-white mx-1">H</kbd> e veja a mágica acontecer. Todos os botões, barras de progresso e menus desaparecem instantaneamente.
            </p>
            <p className="text-slate-300 mt-2">
                Sobra apenas o seu texto flutuando na tela. Isso é perfeito para:
            </p>
            <ul className="list-disc pl-6 mt-4 text-slate-300 space-y-2">
                <li><strong>Speedrunners:</strong> Tenha suas notas e "splits" visíveis sem distrações.</li>
                <li><strong>React Streamers:</strong> Leia artigos ou notícias na tela sem que sua audiência veja os controles do player.</li>
                <li><strong>VTubers:</strong> Mantenha o roteiro próximo à câmera (ou modelo) para manter o contato visual.</li>
            </ul>
        </div>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Chroma Key e Fundos Transparentes</h2>
        <p className="mb-4">
            Precisa integrar o texto diretamente na sua cena do OBS? O PromptNinja possui temas nativos de <a href="/teleprompter-obs-studio" className="text-blue-400 hover:text-blue-300 underline">Chroma Key (Verde e Azul)</a>.
        </p>
        <p className="mb-6">
            Basta selecionar o tema "Chroma Green", capturar a janela no OBS e aplicar o filtro de "Chroma Key". O fundo desaparece e seu texto fica com fundo transparente, parecendo uma legenda profissional integrada à sua live.
        </p>

        <h2 className="text-2xl font-bold text-white mt-8 mb-4">Controle Total Sem Alt-Tab</h2>
        <p className="mb-4">
            Nada quebra mais a imersão do que ter que dar Alt-Tab para pausar o roteiro. Com nossos <a href="/teleprompter-com-atalhos-de-teclado" className="text-blue-400 hover:text-blue-300 underline">atalhos de teclado globais</a> e controle via celular, você comanda o texto sem sair do jogo.
        </p>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-2">Celular como "Stream Deck"</h3>
                <p className="text-sm text-slate-300">Conecte seu celular via QR Code e use-o como um controle remoto dedicado. Deixe-o ao lado do teclado para ajustes rápidos de velocidade ou para reiniciar o texto entre as partidas.</p>
            </div>
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
                <h3 className="text-xl font-bold text-white mb-2">Comandos de Texto</h3>
                <p className="text-sm text-slate-300">Use comandos como <strong>[STOP]</strong> no final de cada parágrafo para que o texto pare sozinho, esperando você acionar a próxima parte da história. Ideal para jogos de RPG ou narrativas.</p>
            </div>
        </div>

        <div className="text-center bg-slate-800 p-8 rounded-lg my-10">
            <h2 className="text-3xl font-bold text-white mb-4">Level Up na Sua Stream</h2>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                Profissionalize sua transmissão com o teleprompter feito para quem entende de setups minimalistas e alta performance.
            </p>
            <a
                href="https://promptninja.solutionkit.com.br/#app"
                className="inline-block bg-white text-slate-900 font-bold py-3 px-8 mx-auto rounded-full transition hover:bg-slate-200"
            >
                Abrir Modo Gamer
            </a>
        </div>

        <SEOContentFAQ
            title="Perguntas Frequentes de Streamers"
            items={[
                {
                    question: "Funciona com OBS e Streamlabs?",
                    answer: "Sim! Você tem duas opções: usar a 'Captura de Janela' para mostrar o texto na stream (usando nossos temas de fundo transparente/chroma key) ou apenas deixar a janela aberta no seu monitor secundário para uso pessoal, invisível para a live."
                },
                {
                    question: "Posso controlar o texto sem sair do jogo?",
                    answer: "Absolutamente. Com o recurso de controle remoto P2P, você usa seu celular para pausar, voltar ou acelerar o texto. Assim, não precisa dar Alt-Tab e arriscar travar seu jogo."
                },
                {
                    question: "Consome muita CPU/GPU?",
                    answer: "Não. O PromptNinja é extremamente leve e roda no navegador. Ele não disputa recursos significativos com seu jogo ou o software de encoding da stream."
                }
            ]}
        />
    </>
);
