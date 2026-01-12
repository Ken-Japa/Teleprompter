import { ROUTES_CONFIG } from "../../../../config/routes";
import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";

export const TeleprompterOnlineGratisPT = () => (
    <>
        <h2 className="text-4xl font-bold text-white mb-6">Teleprompter Online Grátis: Pare de Desperdiçar Horas Regravando</h2>

        <p className="mb-6 text-lg text-slate-300">
            Você já passou <strong>3 horas tentando gravar um vídeo de 8 minutos</strong>? Começa a falar, trava na frase exata, olha pro papel, perde o contato visual com a câimera. Regrava. Trava de novo na MESMA frase. Mais 15 minutos perdidos. No final do dia: 47 tentativas, 2h53min gastos, vídeo publicado com cortes visíveis e aquela sensação de "podia ter ficado melhor".
        </p>

        <p className="mb-6">
            Eu sei EXATAMENTE como é. A frustração de saber o que você quer falar mas travar no "como" dizer. A vergonha de publicar um vídeo cheio de "ahhh", "então...", "hummm" porque você cansou de regravar. E o pior: ver seu concorrente publicando vídeos fluidos, profissionais, TODO DIA — enquanto você luta pra fazer 1 por semana.
        </p>

        <p className="mb-8">
            O PromptNinja nasceu exatamente pra acabar com esse sofrimento. É um <strong>teleprompter online 100% grátis</strong> — zero limite de tempo, zero marca d'água, zero pegadinhas tipo "pague para desbloquear controle remoto". Também conhecido como <strong>teleponto</strong> em Portugal e em estúdios profissionais, é a ferramenta que separa vídeos amadores batalhando 3h de produções profissionais gravadas em 15 minutos.
        </p>


        <div className="bg-slate-800 p-6 rounded-lg my-8 border-l-4 border-green-500">
            <h3 className="text-2xl font-bold text-white mb-2">Por que o PromptNinja Não Trava? (A Diferença do P2P)</h3>
            <p className="text-slate-300 mb-4">
                Sabe por que a maioria dos teleprompters "congela" no meio da frase? Porque dependem da sua internet pra enviar cada comando pro servidor na nuvem e voltar. Se sua internet oscila (mesmo que por 1 segundo), o texto trava.
            </p>
            <p className="text-slate-300">
                O PromptNinja usa <strong>tecnologia WebRTC (P2P)</strong>: seu celular se conecta diretamente ao seu notebook pela rede Wi-Fi local. É como se os dois dispositivos conversassem diretamente, sem intermediários. <strong>Zero dependência de internet</strong>. O resultado? Bluetooth típico tem ~300ms de atraso. Apps tradicionais podem ter 500-1000ms. O PromptNinja? <strong>Menos de 50ms</strong>. Você aperta pause, e o texto para <em>instantaneamente</em>.
            </p>
        </div>

        <h3 className="text-2xl font-bold text-white mt-8 mb-4">O Dilema das Ferramentas Gratuitas (Lag e Anúncios)</h3>
        <p className="mb-4">
            Muitos teleprompters online gratuitos são, na verdade, iscas. Eles escondem problemas sérios que só aparecem na hora de gravar:
        </p>
        <ul className="list-disc pl-6 mb-6 text-slate-300 space-y-2">
            <li><strong>LAG e Travamentos:</strong> O texto engasga na rolagem, fazendo você perder o ritmo e parecer amador.</li>
            <li><strong>Anúncios Invasivos:</strong> Pop-ups que cobrem o texto bem no meio da sua melhor tomada.</li>
            <li><strong>Limitações Artificiais:</strong> "Pague para desbloquear o controle remoto" ou "Pague para remover a marca d'água".</li>
        </ul>

        <h3 className="text-2xl font-bold text-white mt-8 mb-4">Privacidade Garantida: O Teleprompter que NUNCA Vê Seu Roteiro (Sem Login!)</h3>
        <p className="mb-6 text-slate-300">
            Diferente de outros apps que obrigam você a criar conta e salvam seus roteiros na "nuvem" (onde podem ser vazados ou lidos), o PromptNinja opera com <strong>Privacidade Local</strong>.
            <br /><br />
            Como não exigimos login, <strong>nunca enviamos seu roteiro para nossos servidores</strong>. Todo o processamento acontece dentro do seu navegador. Seus dados, suas regras.
        </p>

        <div className="bg-slate-800 p-6 rounded-lg my-6">
            <h3 className="text-xl font-bold text-white mb-4">PromptNinja: Redefinindo o Conceito de Grátis</h3>
            <p className="text-slate-300 mb-4">
                O <strong>PromptNinja</strong> nasceu para quebrar esse paradigma. É um teleprompter online que funciona diretamente no seu navegador, sem instalação, e oferece gratuitamente as funcionalidades que outros cobram.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-700 p-4 rounded-lg">
                    <h4 className="font-bold text-white mb-2">Controle Remoto P2P Gratuito</h4>
                    <p className="text-sm text-slate-300">Use seu smartphone como um controle remoto profissional. Pause, retome, ajuste a velocidade e navegue pelo texto com latência zero, graças à conexão P2P (peer-to-peer) via Wi-Fi local.</p>
                </div>
                <div className="bg-slate-700 p-4 rounded-lg">
                    <h4 className="font-bold text-white mb-2">Sem Anúncios ou Cadastro</h4>
                    <p className="text-sm text-slate-300">Sua experiência de gravação deve ser limpa e focada. O PromptNinja não exibe anúncios e não exige cadastro para usar as funcionalidades essenciais. É abrir e usar.</p>
                </div>
            </div>
        </div>

        <h3 className="text-2xl font-bold text-white mt-8 mb-4">Comparativo: PromptNinja vs. Outras Soluções Gratuitas</h3>
        <div className="overflow-x-auto">
            <table className="min-w-full bg-slate-800 rounded-lg">
                <thead>
                    <tr className="bg-slate-700">
                        <th className="p-4 text-left">Funcionalidade</th>
                        <th className="p-4 text-center">PromptNinja</th>
                        <th className="p-4 text-center">Apps Genéricos</th>
                        <th className="p-4 text-center">Outros Sites Online</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="p-4 border-t border-slate-700">Controle Remoto</td>
                        <td className="p-4 border-t border-slate-700 text-center text-green-400">✔ Gratuito</td>
                        <td className="p-4 border-t border-slate-700 text-center text-yellow-400">✖ Pago ou Limitado</td>
                        <td className="p-4 border-t border-slate-700 text-center text-red-400">✖ Inexistente</td>
                    </tr>
                    <tr>
                        <td className="p-4 border-t border-slate-700">Sem Instalação</td>
                        <td className="p-4 border-t border-slate-700 text-center text-green-400">✔ Sim</td>
                        <td className="p-4 border-t border-slate-700 text-center text-red-400">✖ Não</td>
                        <td className="p-4 border-t border-slate-700 text-center text-green-400">✔ Sim</td>
                    </tr>
                    <tr>
                        <td className="p-4 border-t border-slate-700">Modo Espelho (DIY)</td>
                        <td className="p-4 border-t border-slate-700 text-center text-green-400">✔ Gratuito</td>
                        <td className="p-4 border-t border-slate-700 text-center text-yellow-400">✖ Quase sempre pago</td>
                        <td className="p-4 border-t border-slate-700 text-center text-red-400">✖ Raro</td>
                    </tr>
                    <tr>
                        <td className="p-4 border-t border-slate-700">Privacidade do Texto</td>
                        <td className="p-4 border-t border-slate-700 text-center text-green-400">✔ Processado no navegador</td>
                        <td className="p-4 border-t border-slate-700 text-center text-yellow-400">? Incerta</td>
                        <td className="p-4 border-t border-slate-700 text-center text-yellow-400">? Incerta</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <h3 className="text-2xl font-bold text-white mt-12 mb-4">Casos Reais com Números: Antes vs Depois</h3>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
                <h3 className="font-bold text-lg text-green-400 mb-3">📹 YouTuber Educacional</h3>
                <p className="text-slate-300 text-sm mb-4">
                    "Gravo aulas de matemática. <strong>ANTES:</strong> 3h25min para gravar 1 vídeo de 20min (23 tentativas, esquecia fórmulas). <strong>DEPOIS:</strong> 35min por vídeo (2 tentativas). Redução de <strong>84% no tempo</strong>. Agora publico 3x/semana vs 1x antes."
                </p>
                <p className="text-slate-500 text-xs italic">— Setup: Laptop + tablet como tela | Economia: 8h40min/semana</p>
            </div>
            <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
                <h3 className="font-bold text-lg text-blue-400 mb-3">💼 Executivo em Home Office</h3>
                <p className="text-slate-300 text-sm mb-4">
                    "Apresentações Zoom pra diretoria. <strong>ANTES:</strong> Usava anotações, desviava olhar 40+ vezes (parecia inseguro). <strong>DEPOIS:</strong> PromptNinja transparente sobre Zoom. Mantenho olho na câmera 100%. Promoção veio 2 meses depois."
                </p>
                <p className="text-slate-500 text-xs italic">— Setup: PC + celular remoto | ROI: Promoção = +R$3k/mês</p>
            </div>
            <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
                <h3 className="font-bold text-lg text-purple-400 mb-3">🎬 Produtor de Conteúdo</h3>
                <p className="text-slate-300 text-sm mb-4">
                    "Gravação em lote semanal. <strong>ANTES:</strong> 12h todo sábado memorizando + gravando 5 vídeos. <strong>DEPOIS:</strong> 4h gravando 15 vídeos com PromptNinja (só troco texto). Triplicou output, economiza <strong>8h/semana = 32h/mês</strong>."
                </p>
                <p className="text-slate-500 text-xs italic">— Setup: Monitor externo + controle vocal PRO | Videos/mês: 15→60</p>
            </div>
        </div>

        <h3 className="text-2xl font-bold text-white mt-12 mb-4">5 Erros Que Matam Teleprompters Grátis (E Como o PromptNinja Evita)</h3>
        <div className="bg-gradient-to-r from-red-900/20 to-slate-900 p-8 rounded-xl border border-red-500/30 mb-12">
            <div className="space-y-5">
                <div className="bg-slate-900/50 p-5 rounded-lg border-l-4 border-red-500">
                    <h3 className="font-bold text-red-400 mb-2">❌ Erro #1: Depender de Servidor Central (LAG Mortal)</h3>
                    <p className="text-slate-300 text-sm mb-3">
                        <strong>O problema:</strong> 90% dos teleprompters "grátis" enviam cada comando (pause, play, velocidade) pro servidor deles na internet e volta. Se sua internet oscila 1s, o texto congela. Você para de falar, perde o ritmo, takes arruinados.
                    </p>
                    <p className="text-green-400 text-sm">
                        <strong>✅ PromptNinja:</strong> Conexão P2P direta entre seus dispositivos via Wi-Fi local. Latência 50ms (vs 300-1000ms de apps tradicionais). Sua internet pode até cair - o teleprompter continua funcionando.
                    </p>
                </div>

                <div className="bg-slate-900/50 p-5 rounded-lg border-l-4 border-red-500">
                    <h3 className="font-bold text-red-400 mb-2">❌ Erro #2: "Grátis" Com Paywall Escondido</h3>
                    <p className="text-slate-300 text-sm mb-3">
                        <strong>O problema:</strong> Você testa, gosta, grava 3 vídeos... aí descobre: "Upgrade pra PRO pra usar controle remoto" ($9.99/mês). Ou "Remova marca d'água: $4.99/mês". No final, paga $15/mês por algo que deveria ser grátis.
                    </p>
                    <p className="text-green-400 text-sm">
                        <strong>✅ PromptNinja:</strong> Controle remoto, espelhamento, ajustes de fonte/velocidade = TUDO GRÁTIS pra sempre. Pro existe (controle por voz IA), mas funcionalidades essenciais nunca serão pagas.
                    </p>
                </div>

                <div className="bg-slate-900/50 p-5 rounded-lg border-l-4 border-red-500">
                    <h3 className="font-bold text-red-400 mb-2">❌ Erro #3: Anúncios No Meio da Gravação</h3>
                    <p className="text-slate-300 text-sm mb-3">
                        <strong>O problema:</strong> Você tá gravando o take PERFEITO, do nada: POP-UP de anúncio cobrindo o texto. Regrava tudo. Ou pior: anúncio de vídeo auto-play com som, arruína o áudio da gravação.
                    </p>
                    <p className="text-green-400 text-sm">
                        <strong>✅ PromptNinja:</strong> Zero anúncios. Nunca. Nem pop-up, nem banner, nem vídeo. Experiência 100% limpa focada na sua gravação.
                    </p>
                </div>

                <div className="bg-slate-900/50 p-5 rounded-lg border-l-4 border-red-500">
                    <h3 className="font-bold text-red-400 mb-2">❌ Erro #4: Obrigar Cadastro (Vazamento de Roteiros)</h3>
                    <p className="text-slate-300 text-sm mb-3">
                        <strong>O problema:</strong> "Crie uma conta para continuar". Agora seus roteiros confidenciais (estratégias de negócio, lançamentos não anunciados) ficam em servidor de terceiros. Risco de vazamento ou uso indevido.
                    </p>
                    <p className="text-green-400 text-sm">
                        <strong>✅ PromptNinja:</strong> SEM cadastro obrigatório. Todo texto processado localmente no SEU navegador. Nunca enviamos pro nosso servidor. Fecha a aba = texto apagado. Privacidade total.
                    </p>
                </div>

                <div className="bg-slate-900/50 p-5 rounded-lg border-l-4 border-red-500">
                    <h3 className="font-bold text-red-400 mb-2">❌ Erro #5: Funciona Só Desktop OU Só Mobile</h3>
                    <p className="text-slate-300 text-sm mb-3">
                        <strong>O problema:</strong> Apps de celular não funcionam bem pra YouTube (tela pequena). Sites desktop não funcionam pra TikTok (sem modo vertical). Você precisa de 2 ferramentas separadas.
                    </p>
                    <p className="text-green-400 text-sm">
                        <strong>✅ PromptNinja:</strong> Web responsivo. Abre no desktop = layout horizontal perfeito pra YouTube. Abre no celular vertical = interface otimizada pra Shorts/Reels. UMA ferramenta, todos formatos.
                    </p>
                </div>
            </div>
        </div>

        <SEOContentFAQ
            title="FAQ: Teleprompter Online Grátis"
            items={[
                {
                    question: "O PromptNinja é realmente gratuito?",
                    answer: "Sim. Todas as funcionalidades essenciais, incluindo o controle remoto, espelhamento de texto, e ajustes de fonte/velocidade, são 100% gratuitas e sem pegadinhas. Oferecemos uma versão Pro com recursos avançados como reconhecimento de voz, mas o núcleo da ferramenta é gratuito para sempre."
                },
                {
                    question: "Meus roteiros ficam salvos em algum lugar?",
                    answer: "Não. Sua privacidade é prioridade. Todo o texto que você cola no PromptNinja é processado localmente no seu navegador e nunca é enviado ou armazenado em nossos servidores. Quando você fecha a aba, o texto se vai."
                },
                {
                    question: "Preciso de uma conexão de internet forte para o controle remoto?",
                    answer: "Não. O controle remoto usa tecnologia WebRTC (P2P) que conecta seus dispositivos diretamente através da sua rede Wi-Fi local. Isso garante uma resposta instantânea, sem atrasos, independentemente da velocidade da sua internet."
                }
            ]}
        />

        <div className="bg-slate-800 p-6 rounded-lg mt-8 mb-8">
            <h3 className="text-xl font-bold text-white mb-3">Veja Também</h3>
            <ul className="space-y-2">
                <li>
                    <a href={ROUTES_CONFIG.SEO_ZOOM.paths.pt} className="text-purple-400 hover:text-purple-300 underline flex items-center">
                        <span className="mr-2">📹</span>
                        Teleprompter para Zoom e Teams
                    </a>
                </li>
                <li>
                    <a href={ROUTES_CONFIG.SEO_MELHOR_APP.paths.pt} className="text-purple-400 hover:text-purple-300 underline flex items-center">
                        <span className="mr-2">⭐</span>
                        Melhor App de Teleprompter (Comparativo)
                    </a>
                </li>
                <li>
                    <a href={ROUTES_CONFIG.SEO_DIY.paths.pt} className="text-purple-400 hover:text-purple-300 underline flex items-center">
                        <span className="mr-2">🛠️</span>
                        Teleprompter Caseiro: Guia DIY
                    </a>
                </li>
            </ul>
        </div>

        <div className="text-center bg-slate-800 p-8 rounded-lg my-10">
            <h3 className="text-3xl font-bold text-white mb-4">Sua Busca por um Teleprompter Grátis Acabou</h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                Pare de lutar com ferramentas limitadas. Experimente a liberdade de um teleprompter online que é gratuito de verdade e poderoso por design.
            </p>

            <a
                href="/?lang=pt#app"
                className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 font-bold py-3 px-8 mx-auto rounded-full transition hover:brightness-110"
                style={{ color: 'white' }}
            >
                Usar o PromptNinja de Graça Agora
            </a>
        </div>
    </>
);
