import { SEOContentFAQ } from "../../../../components/seo/SEOContentFAQ";
import { SEORelatedLinks } from "../../../../components/seo/SEORelatedLinks";

export const TeleprompterEventosProfissionaisPT = () => (
    <>
        <p className="lead text-xl text-slate-300 mb-8 font-medium">
            Transforme qualquer palco em um ambiente de alta performance. O **PromptNinja** oferece a sincronia e confiabilidade que produtores de eventos exigem para palestras, workshops e transmissões corporativas.
        </p>

        <p className="text-slate-300 mb-8">
            Em eventos de grande porte, não há espaço para erros. O atraso na fala ou um esquecimento pode comprometer a autoridade do palestrante. Nossa tecnologia **Master/Receiver P2P** permite que um operador controle o texto silenciosamente de um tablet, enquanto o palestrante lê em um monitor de palco ou espelho divisor de luz, com latência zero.
        </p>

        <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 my-12">
            <h3 className="text-2xl font-bold text-white mb-6">Por que o PromptNinja é o Padrão para Eventos?</h3>
            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <h4 className="text-primary font-bold mb-2">Sincronia Multi-Monitor</h4>
                    <p className="text-sm text-slate-400">Controle múltiplos dispositivos simultaneamente. O que o operador altera no laptop reflete instantaneamente no tablet do palco.</p>
                </div>
                <div>
                    <h4 className="text-primary font-bold mb-2">Privacidade Total</h4>
                    <p className="text-sm text-slate-400">Nenhum dado de script sensível é armazenado em nossos servidores. Tudo trafega via rede local/P2P criptografada.</p>
                </div>
                <div>
                    <h4 className="text-primary font-bold mb-2">Interface Clean e Segura</h4>
                    <p className="text-sm text-slate-400">Botões grandes, modo noturno e atalhos de teclado para que nada distraia o operador ou o palestrante.</p>
                </div>
                <div>
                    <h4 className="text-primary font-bold mb-2">Modo Espelho Integrado</h4>
                    <p className="text-sm text-slate-400">Compatível com hardware de teleprompter profissional (beamsplitter glass) com apenas um clique.</p>
                </div>
            </div>
        </div>

        <h3 className="text-3xl font-bold text-white mt-12 mb-6">Configuração de Palco (Master & Remote)</h3>
        <p className="text-slate-300 mb-6 font-medium">
            Para profissionais, o setup ideal envolve separação de tarefas:
        </p>
        <ul className="list-disc pl-6 mb-8 text-slate-300 space-y-3 font-medium">
            <li><strong>Operador (Master):</strong> Usa um PC/Laptop conectado ao Wi-Fi ou LAN para ajustar velocidade e texto em tempo real.</li>
            <li><strong>Palestrante (Receiver):</strong> Um tablet ou monitor HDMI posicionado estrategicamente no palco recebendo o sinal via URL remota do PromptNinja.</li>
            <li><strong>Feedback Visual:</strong> Use a linha de foco central para garantir que o palestrante nunca perca o ritmo da respiração.</li>
        </ul>

        <div className="bg-gradient-to-br from-slate-900 to-primary/10 p-8 rounded-xl border border-primary/20 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Garantia de Fluidez em Tempo Real</h3>
            <p className="text-slate-300 mb-6">Utilizamos protocolos de baixa latência (WebRTC) para que cada ajuste de velocidade seja sentido no mesmo milissegundo.</p>
            <a href="/?lang=pt#app" className="inline-block bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-full transition-transform hover:scale-105 shadow-xl shadow-primary/20" style={{ color: 'white' }}>
                Criar Evento Grátis
            </a>
        </div>

        <SEOContentFAQ
            title="Dúvidas de Produção"
            items={[
                {
                    question: "Preciso de internet rápida no local?",
                    answer: "Não necessariamente. O PromptNinja usa conexões P2P. Uma vez que os dispositivos se 'encontram', a troca de dados é feita diretamente na rede local, garantindo performance estável mesmo em locais com sinal instável."
                },
                {
                    question: "Funciona em Projetores ou TVs?",
                    answer: "Sim. Basta abrir a URL do modo teleprompter no navegador do dispositivo conectado à tela. O modo tela cheia garante que apenas o texto seja visível para o público ou palestrante."
                },
                {
                    question: "Suporta scripts de longa duração?",
                    answer: "Sim, suportamos scripts de palestras de 1h ou mais sem lentidão, graças ao nosso motor de renderização otimizado para navegadores modernos."
                }
            ]}
        />

        <SEORelatedLinks
            title="Recursos Técnicos Adicionais"
            links={[
                { label: "Tecnologia WebRTC e Latência", href: "/tecnologia-webrtc-baixa-latencia" },
                { label: "Privacidade e Segurança de Dados", href: "/teleprompter-privacidade-seguranca" },
                { label: "Atalhos de Teclado Profissionais", href: "/teleprompter-com-atalhos-de-teclado" },
                { label: "Como Gerenciar Scripts Grandes", href: "/scripts-teleprompter" }
            ]}
        />
    </>
);
