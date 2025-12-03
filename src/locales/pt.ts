export const pt = {
 title: {
  main: "PROMPT",
  sub: "NINJA",
  remote: "CONTROLE",
 },
 menu: {
  home: "Início",
  features: "Recursos",
  pricing: "Preços",
  backToHome: "Voltar para Página Inicial",
 },
 landing: {
  hero: {
   headline: "Seu celular é o controle. Sua casa é o estúdio.",
   subheadline:
    "O único teleprompter que funciona offline, sem rastrear seus dados, com controle remoto de baixíssima latência para apresentações ao vivo.",
   cta: "Começar Grátis (20 min)",
   ctaSecondary: "Ver Como Funciona",
   versionLive: "Versão 2.0 Online",
   userCount: "1.247",
   activeCreators: "Criadores ativos",
   freeTrial: "Teste grátis",
   zeroSetup: "Zero Instalação",
   offlineBadge: "Funciona Offline",
   privacyBadge: "Privacidade Total",
  },
  problemSolution: {
   title: "Chega de frustração ao gravar vídeos",
   before: {
    title: "Antes",
    items: [
     "Esqueceu o roteiro no meio da gravação",
     "Perdeu 3 horas regravando o mesmo vídeo",
     "Levantou 15 vezes para pausar/continuar o texto",
     "Gastou dinheiro em teleprompter físico complicado",
     "Apps que travam ou exigem login",
    ],
   },
   after: {
    title: "Agora",
    items: [
     "Roteiro sempre visível na tela do notebook",
     "Controla tudo pelo celular (Play/Pause/Velocidade)",
     "Conexão P2P = Latência sub-milissegundo",
     "Seus dados ficam no SEU dispositivo",
     "Funciona offline (voo, sem internet, eventos ao vivo)",
    ],
   },
  },
  howItWorks: {
   title: "Tão simples que até sua avó consegue",
   step1: {
    title: "Cole seu roteiro",
    desc: "Escreva ou cole o texto da sua apresentação no notebook",
   },
   step2: {
    title: "Escaneie o QR Code",
    desc: "Aponte a câmera do celular. Conexão automática em 2 segundos",
   },
   step3: {
    title: "Grave como um PRO",
    desc: "Controle a velocidade, pause, volte ao topo. Tudo pelo celular",
   },
   cta: "Testar Agora (Grátis)",
  },
  comparison: {
   title: "Por que PromptNinja?",
   subtitle: "Comparação honesta com outras soluções",
   columns: {
    ninja: "PromptNinja",
    paid: "Apps Pagos",
    hardware: "Hardware",
    free: "Sites Grátis",
   },
   rows: {
    remote: "Controle Remoto",
    offline: "Funciona Offline",
    privacy: "Privacidade Total",
    latency: "Latência",
    price: "Preço",
   },
   values: {
    ninja: {
     remote: "Celular",
     offline: "Sim",
     privacy: "P2P",
     latency: "<10ms",
     price: "R$ 67",
    },
    paid: {
     remote: "Não",
     offline: "Não",
     privacy: "Cloud",
     latency: "~100ms",
     price: "R$ 80/ano",
    },
    hardware: {
     remote: "Físico",
     offline: "Sim",
     privacy: "Sim",
     latency: "<5ms",
     price: "R$ 400+",
    },
    free: {
     remote: "Não",
     offline: "Não",
     privacy: "Rastreiam",
     latency: ">500ms",
     price: "Grátis c/ Ads",
    },
   },
  },
  features: {
   sync: {
    title: "Sincronização Instantânea",
    desc:
     "Tecnologia P2P (Peer-to-Peer) garante controle em tempo real e sem atrasos. Sem latência de servidor, sua apresentação flui perfeitamente.",
   },
   offline: {
    title: "Modo Offline",
    desc:
     "Acesse seu teleprompter sem conexão. Seus roteiros permanecem privados, nunca saem do seu dispositivo.",
   },
   privacy: {
    title: "Privacidade Total",
    desc:
     "Seu roteiro é salvo apenas no seu navegador. Sem nuvem, sem servidores, garantindo privacidade total.",
   },
   voice: {
    title: "Controle por Voz",
    desc: "Teleprompter mãos-livres: Seu roteiro rola automaticamente com sua voz, mantendo você focado.",
   },
   focus: {
    title: "Foco Dinâmico",
    desc:
     "Linha de foco dinâmico: O destaque inteligente segue sua leitura, garantindo que você nunca perca o fio.",
   },
   themes: {
    title: "Temas Visuais",
    desc: "Modos Escuro, Claro, Matrix e Alto Contraste para qualquer ambiente.",
   },
  },
  pricing: {
   title: "Preço Simples e Honesto",
   subtitle: "Teste grátis, atualize quando quiser",
   free: {
    title: "Grátis",
    desc: "Para testar e validar",
    price: "R$ 0",
    period: "/sempre",
    cta: "Começar Grátis",
    features: ["20 minutos por sessão", "Sessões ilimitadas", "Controle remoto total", "Todos os temas"],
    missing: ["Marca d'água discreta", "Controle por voz"],
   },
   pro: {
    badge: "PREÇO DE LANÇAMENTO",
    title: "PRO Vitalício",
    desc: "Pagamento único, seu para sempre",
    price: "R$ 67",
    originalPrice: "R$ 147",
    priceNote: "Depois vira R$ 12,90/mês ou R$ 147 vitalício",
    cta: "Garantir Acesso Vitalício",
    timer: "Preço válido apenas para os primeiros 500 usuários",
    features: [
     "Sessões ilimitadas (sem tempo)",
     "Sem marca d'água",
     "Controle por voz",
     "Logo personalizado",
     "Suporte prioritário",
     'Badge "Early Supporter"',
     "Acesso antecipado a features",
    ],
   },
   paymentInfo: "Pagamento único via Cartão, PIX ou Boleto. Garantia de 7 dias.",
   // Keep old keys for backward compatibility if needed during transition
   lifetime: "Vitalício",
   oneTime: "pagamento único",
   limitedOffer: "Oferta Limitada",
   conversionNotice: "",
  },
  faq: {
   title: "Perguntas Frequentes",
   items: [
    {
     q: "Preciso instalar algum app?",
     a: "Não! Funciona 100% no navegador. Abra no notebook, escaneie com o celular, e pronto. É um PWA, então você PODE instalar se quiser.",
    },
    {
     q: "Funciona sem internet?",
     a: "Sim! A conexão é P2P. Se ambos estiverem na mesma rede Wi-Fi ou se você já abriu o app antes, funciona offline.",
    },
    {
     q: "Meus dados ficam salvos onde?",
     a: "No SEU dispositivo (localStorage). Não enviamos nada para servidor. Zero tracking.",
    },
    {
     q: "O que acontece após 20 minutos na versão grátis?",
     a: "Aparece um convite para upgrade. Você pode iniciar uma nova sessão sem limites diários.",
    },
    {
     q: "Funciona em qual navegador?",
     a: "Chrome, Edge, Safari e Firefox. Recomendamos Chrome pela melhor compatibilidade.",
    },
    {
     q: "E se eu não gostar?",
     a: "Garantia de 7 dias. Devolvemos 100% sem perguntas.",
    },
   ],
  },
 },
 status: {
  disconnected: "DESCONECTADO",
  connecting: "CONECTANDO...",
  connected: "CONECTADO",
  error: "ERRO DE REDE",
 },
 host: {
  startPrompter: "Iniciar Teleprompter",
  editText: "Editar Roteiro",
  mirror: "Espelhar",
  mirrorV: "Espelhar Verticalmente",
  remoteConnect: "Conectar Controle Remoto",
  scanInstruction: "Escaneie o QR Code para Controlar",
  generatingId: "Gerando Link...",
  idLabel: "ID da Sessão:",
  editorPlaceholder: "Cole ou digite seu roteiro aqui para uma apresentação impecável...",
  localhostWarning: "Atenção: Você está em localhost. Para usar o controle remoto, abra em outra aba.",
  openRemoteTab: "Abrir Controle Remoto (Nova Aba)",
  copyLink: "Copiar Link",
  linkCopied: "Copiado!",
  connectionLost: "Conexão Perdida com o Teleprompter",
  watermark: "PromptNinja - Versão Gratuita",
  controls: {
   play: "Reproduzir",
   pause: "Pausar",
   reset: "Reiniciar",
   speed: "Velocidade de Rolagem",
   margin: "Margem",
   size: "Tamanho do Texto",
   timer: "Temporizador",
   caps: "Maiúsculas",
   voice: "Controle por Voz",
   focusLine: "Linha de Foco Dinâmico",
   theme: "Tema Visual do Teleprompter",
   fontSize: "Tamanho da Fonte",
   isMirrored: "Espelhar Horizontalmente",
  },
  themes: {
   default: "Padrão",
   ninja: "Ninja (Tema Escuro)",
   paper: "Papel (Tema Claro)",
   contrast: "Alto Contraste",
   matrix: "Matrix",
   cyber: "Cyberpunk (Tecnológico)",
   cream: "Creme (Conforto Visual)",
  },
  tips: {
   title: "Dicas PRO para Edição e Performance",
   desc: "Aproveite as tags para destacar seu texto:",
   red: "Destaque em Vermelho",
   yellow: "Destaque em Amarelo",
   green: "Destaque em Verde",
   caps: "Use o botão 'TT' para ativar o modo MAIÚSCULAS e dar ênfase.",
   voice: "Ative o microfone para rolagem automática por voz e mantenha o ritmo da sua fala.",
  },
  paywall: {
   title: "Recurso Exclusivo PRO",
   desc:
    "Desbloqueie o poder total do PromptNinja! Funcionalidades PRO incluem cores personalizadas, controle por voz avançado e uso ilimitado.",
   cta: "Desbloquear Acesso Vitalício PRO",
   inputPlaceholder: "Insira sua chave de acesso PRO...",
   button: "Ativar Versão PRO",
   invalid: "Chave PRO Inválida",
   success: "PromptNinja PRO Ativado com Sucesso!",
   emptyKey: "Por favor, insira uma chave de desbloqueio.",
   invalidKey: "Chave de desbloqueio inválida. Tente novamente.",
   countdownMessage: "Retornando à página em...",
  },
  voice: {
   notSupported: "Seu navegador não suporta controle por voz",
  },
  exit: "Sair",
  editor: {
   highlight: "Destaque",
  },
  defaultText: `Bem-vindo ao PromptNinja.

O teleprompter definitivo para criadores de conteúdo.

1. Escaneie o QR Code para conectar.
2. Controle a velocidade de rolagem com facilidade.
3. Use o Trackpad para navegação intuitiva.

<r>ATENÇÃO:</r>
Use as tags de cor para destacar momentos importantes no seu roteiro.
<y>Este texto está em amarelo para ênfase leve.</y>
<g>E este em verde para sinalizar calma ou uma transição suave.</g>

Cole seu roteiro aqui e personalize sua experiência para começar a brilhar!`,
 },
 remote: {
  connecting: "Buscando Conexão com o Teleprompter...",
  targetId: "Teleprompter Conectado: {{id}}",
  touchArea: "Área de Controle Remoto",
  speed: "Velocidade",
  reset: "Reiniciar",
  start: "Iniciar",
  pause: "Pausar",
  stop: "Parar",
  theme: "Tema",
  language: "Idioma",
  scanError: "Falha ao acessar a câmera. Verifique as permissões ou se está usando HTTPS.",
 },
 tutorial: {
  tips: {
   title: "Dicas Pro",
   tip1: "Use o controle por voz para operação mãos-livres.",
   tip2: "Escaneie o código QR para controlar do seu telefone.",
  },
  title: "PromptNinja: Guia de Início Rápido",
  overview: {
   title: "Visão Geral do Teleprompter",
   description:
    "PromptNinja: o teleprompter profissional P2P que transforma seu navegador em um estúdio completo e seu smartphone em um controle remoto intuitivo. Sem apps, contas ou servidores, garantindo privacidade e controle total.",
  },
  howToUse: {
   title: "Como Usar o PromptNinja",
   step1: {
    title: "1. Prepare seu Roteiro",
    description:
     "No editor, digite ou cole o texto da sua apresentação. Utilize tags como <r>texto</r> para destacar palavras ou frases com cores vibrantes.",
   },
   step2: {
    title: "2. Conecte seu Smartphone como Controle Remoto",
    description:
     "Escaneie o QR Code exibido na tela com seu smartphone para transformá-lo em um controle remoto. Ajuste a velocidade de rolagem, inicie e pause sua apresentação com facilidade.",
   },
   step3: {
    title: "3. Inicie sua Apresentação",
    description:
     "Clique em 'Iniciar Teleprompter' para ativar o modo de apresentação. Gerencie a rolagem do texto usando seu controle remoto ou o inovador controle por voz.",
   },
  },
  advancedFeatures: {
   title: "Recursos Avançados do Teleprompter",
   voiceControl: {
    title: "Controle por Voz (Exclusivo PRO)",
    description:
     "Ative o controle por voz para que o teleprompter acompanhe automaticamente o ritmo da sua fala. Este recurso avançado requer a versão PRO.",
   },
   themes: {
    title: "Temas Visuais Personalizáveis",
    description:
     "Personalize a aparência do seu teleprompter com uma variedade de temas visuais, garantindo a melhor legibilidade em qualquer ambiente e condição de iluminação.",
   },
   focusMode: {
    title: "Modo Foco Dinâmico",
    description:
     "Ative o modo de foco dinâmico para destacar a linha de texto atual, auxiliando você a manter a concentração e a fluidez durante a leitura.",
   },
  },
 },
 footer: {
  copyright: "PromptNinja. Todos os direitos reservados.",
 },
};
