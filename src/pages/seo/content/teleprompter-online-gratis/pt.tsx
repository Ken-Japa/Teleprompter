import { ROUTES_CONFIG } from "../../../../config/routes";
import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { SEOImage } from "../../../../components/seo/SEOImage";

export const TeleprompterOnlineGratisPT = () => (
    <>
        <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-700/50 mb-12">
            <div className="max-w-3xl mx-auto space-y-6 text-lg text-slate-300 leading-relaxed">
                <p>
                    <strong className="text-white">Cansado de tropeçar nas palavras ou esquecer o roteiro no meio da gravação?</strong> Aquele nervosismo que rouba sua espontaneidade e faz suas apresentações parecerem forçadas? Com o <strong>PromptNinja Teleprompter Online Grátis</strong>, esses problemas ficam no passado!
                </p>

                <p>
                    Desenvolvido para criadores de conteúdo, palestrantes, educadores e qualquer um que precise de confiança na frente da câmera, o PromptNinja é a sua solução definitiva. <strong className="text-white">Controle a rolagem do texto com a sua própria voz</strong>, ajuste a velocidade com um toque e grave diretamente seus vídeos com seu roteiro fluindo suavemente na tela.
                </p>

                <div className="grid md:grid-cols-2 gap-4 mt-8">
                    <ul className="space-y-3">
                        <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span><strong className="text-white">Autonomia Total:</strong> Esqueça a memorização e foque na sua paixão.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span><strong className="text-white">Controle por Voz:</strong> A leitura se adapta ao seu ritmo de fala.</span>
                        </li>
                    </ul>
                    <ul className="space-y-3">
                        <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span><strong className="text-white">Gravação Integrada:</strong> Capture vídeos com o roteiro na tela.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span><strong className="text-white">Sem Cadastro:</strong> Comece agora, direto no navegador.</span>
                        </li>
                    </ul>
                </div>

                <div className="text-center pt-8">
                    <p className="text-xl font-semibold text-white mb-6">
                        Pronto para transformar suas ideias em performances impecáveis?
                    </p>
                    <a href="https://promptninja.solutionkit.com.br/#app"
                        className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-blue-500/30 hover:scale-105 transition-all duration-200 text-xl group">
                        Experimente o PromptNinja Totalmente Grátis!
                    </a>
                    <p className="text-sm text-slate-500 mt-4 italic">Sem necessidade de cadastro. Comece em segundos.</p>
                </div>
            </div>
        </div>

        <SEOImage
            slug="teleprompter-online-gratis"
            src="teleprompter-showcase-multi-device.webp"
            alt="PromptNinja funcionando em múltiplos dispositivos sincronizados"
            caption="Acesse seu teleprompter de qualquer lugar e sincronize seus dispositivos instantaneamente."
            width={1200}
            height={675}
            priority={true}
        />


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

        <SEOImage
            slug="teleprompter-online-gratis"
            src="free-online-teleprompter-devices.webp"
            alt="Diferentes dispositivos usando o teleprompter online PromptNinja"
            caption="O PromptNinja se adapta perfeitamente a qualquer tamanho de tela, garantindo legibilidade máxima."
            width={1200}
            height={675}
        />

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

        {/* Visual "Como Funciona" Section for better UX and E-E-A-T */}
        <div className="bg-slate-800/30 p-8 rounded-2xl border border-slate-700/50 my-12">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Como Usar o PromptNinja: Simples, Rápido e Grátis</h2>
            <div className="grid md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mb-4 border border-blue-500/30">
                        <span className="text-2xl">🗒️</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">1. Cole Seu Roteiro</h3>
                    <p className="text-slate-400 text-sm">Copie e cole o texto da sua apresentação, discurso ou roteiro de vídeo diretamente na interface do PromptNinja.</p>
                </div>
                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mb-4 border border-purple-500/30">
                        <span className="text-2xl">⚙️</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">2. Ajuste ao Seu Estilo</h3>
                    <p className="text-slate-400 text-sm">Defina a velocidade de rolagem, tamanho da fonte e cor do texto para uma leitura confortável e personalizada.</p>
                </div>
                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center mb-4 border border-green-500/30">
                        <span className="text-2xl">🎤</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">3. Controle por Voz e Grave!</h3>
                    <p className="text-slate-400 text-sm">Use sua voz para pausar e retomar a rolagem, e grave seu vídeo diretamente, sem preocupações com o roteiro.</p>
                </div>
            </div>
            <div className="mt-10 text-center">
                <a href="https://promptninja.solutionkit.com.br/#app" className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-full transition-all duration-200">
                    Comece Sua Performance Agora!
                </a>
            </div>
        </div>

        <h3 className="text-2xl font-bold text-white mt-12 mb-6 text-center">PromptNinja: Compare e Escolha o Ideal</h3>
        <div className="overflow-x-auto mb-12 shadow-2xl rounded-xl border border-slate-700">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-slate-800 text-white">
                        <th className="p-4 border-b border-slate-700 font-bold uppercase text-sm tracking-wider">Funcionalidade</th>
                        <th className="p-4 border-b border-slate-700 font-bold bg-blue-900/20 text-blue-300 text-center uppercase text-sm tracking-wider">PromptNinja (Grátis)</th>
                        <th className="p-4 border-b border-slate-700 font-bold text-slate-400 text-center uppercase text-sm tracking-wider">Outros Apps</th>
                    </tr>
                </thead>
                <tbody className="bg-slate-900 text-slate-300">
                    <tr>
                        <td className="p-4 border-t border-slate-800 font-medium">Controle Remoto (Via Wi-Fi)</td>
                        <td className="p-4 border-t border-slate-800 text-green-400 font-bold bg-blue-900/10 text-center">✅ Grátis e Ilimitado</td>
                        <td className="p-4 border-t border-slate-800 text-red-400 text-center">❌ Pago ou Limitado</td>
                    </tr>
                    <tr>
                        <td className="p-4 border-t border-slate-800 font-medium">Espelhamento de Texto</td>
                        <td className="p-4 border-t border-slate-800 text-green-400 font-bold bg-blue-900/10 text-center">✅ Sim</td>
                        <td className="p-4 border-t border-slate-800 text-yellow-500 text-center">⚠️ Raro / Pago</td>
                    </tr>
                    <tr>
                        <td className="p-4 border-t border-slate-800 font-medium">Editor de Texto Rico</td>
                        <td className="p-4 border-t border-slate-800 text-green-400 font-bold bg-blue-900/10 text-center">✅ Cores e Formatação</td>
                        <td className="p-4 border-t border-slate-800 text-slate-500 text-center">Básico</td>
                    </tr>
                    <tr>
                        <td className="p-4 border-t border-slate-800 font-medium">Privacidade (Sem Nuvem)</td>
                        <td className="p-4 border-t border-slate-800 text-green-400 font-bold bg-blue-900/10 text-center">✅ Total (Local)</td>
                        <td className="p-4 border-t border-slate-800 text-yellow-500 text-center">⚠️ Incerta</td>
                    </tr>
                    <tr>
                        <td className="p-4 border-t border-slate-800 font-medium">Instalação Necessária</td>
                        <td className="p-4 border-t border-slate-800 text-green-400 font-bold bg-blue-900/10 text-center">✅ Não (Navegador)</td>
                        <td className="p-4 border-t border-slate-800 text-red-400 text-center">❌ Sim (App)</td>
                    </tr>
                    <tr>
                        <td className="p-4 border-t border-slate-800 font-medium">Sem Anúncios</td>
                        <td className="p-4 border-t border-slate-800 text-green-400 font-bold bg-blue-900/10 text-center">✅ Garantido</td>
                        <td className="p-4 border-t border-slate-800 text-red-400 text-center">❌ Pop-ups irritantes</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <SEOImage
            slug="teleprompter-online-gratis"
            src="free-online-teleprompter-monitors.webp"
            alt="Configuração profissional com monitores e teleprompter online"
            caption="O PromptNinja se adapta a setups profissionais ou amadores com a mesma eficiência."
            width={1200}
            height={675}
        />

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
                        <span className="mr-2">📡</span>
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
                href="https://promptninja.solutionkit.com.br/#app"
                className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 font-bold py-3 px-8 mx-auto rounded-full transition hover:brightness-110"
                style={{ color: 'white', textDecoration: 'none' }}
            >
                <span style={{ color: 'white' }}>Usar o PromptNinja de Graça Agora</span>
            </a>
        </div>
    </>
);

