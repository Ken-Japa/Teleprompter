export const resources = {
 pt: {
  title: {
   main: "PROMPT",
   sub: "NINJA",
   remote: "CONTROLE",
  },
  menu: {
   home: "Início",
   features: "Recursos",
   pricing: "Preços",
   backToHome: "Voltar para Home",
  },
  landing: {
   hero: {
    headline: "Role como um Mestre",
    subheadline:
     "O Teleprompter profissional com latência zero e controle remoto via celular. Sem cabos, sem apps, direto no navegador.",
    cta: "Lançar Web App",
   },
   features: {
    sync: {
     title: "Sincronia Instantânea",
     desc: "Tecnologia P2P (Peer-to-Peer) garante controle em tempo real sem delay.",
    },
    offline: {
     title: "Modo Offline",
     desc: "Funciona sem internet após carregar. Seus dados nunca saem do dispositivo.",
    },
    privacy: {
     title: "Privacidade Total",
     desc: "Sem backend, sem banco de dados. Seu roteiro é salvo apenas no seu navegador.",
    },
    voice: {
     title: "Controle por Voz",
     desc: "O texto rola automaticamente conforme você fala. Mãos livres e foco total.",
    },
    focus: {
     title: "Foco Dinâmico",
     desc: "Destaque visual inteligente na linha que você está lendo para nunca se perder.",
    },
    themes: {
     title: "Temas Visuais",
     desc: "Modos Dark, Light, Matrix e Alto Contraste para qualquer ambiente.",
    },
   },
   pricing: {
    title: "Acesso Vitalício",
    subtitle: "Pague uma vez, use para sempre. Sem assinaturas mensais.",
    lifetime: "Lifetime",
    price: "R$ 47",
    oneTime: "pagamento único",
    cta: "Obter Acesso Vitalício",
    features: [
     "Sessões Ilimitadas",
     "Sem Marca D'água",
     "Sem Limite de Tempo",
     "Destaque de Texto (Cores)",
     "Controle por Voz",
     "Linha de Foco Dinâmico",
     "Suporte Prioritário",
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
   startPrompter: "Modo Apresentação",
   editText: "Editar Texto",
   mirror: "Espelhar",
   remoteConnect: "Conexão Remota",
   scanInstruction: "Escaneie para controlar",
   generatingId: "Gerando Link...",
   idLabel: "ID da Sessão:",
   editorPlaceholder: "Cole seu roteiro aqui e torne-se um mestre da oratória...",
   localhostWarning: "Atenção: Localhost detectado. Use o botão abaixo para testar.",
   openRemoteTab: "Abrir Controle (Nova Aba)",
   copyLink: "Copiar Link",
   linkCopied: "Copiado!",
   connectionLost: "CONEXÃO PERDIDA",
   watermark: "PROMPT NINJA FREE VERSION",
   controls: {
    play: "Reproduzir",
    pause: "Pausar",
    reset: "Reiniciar",
    speed: "Velocidade",
    margin: "Foco",
    size: "Texto",
    timer: "Tempo",
    caps: "Caixa Alta",
    voice: "Controle Voz",
    focusLine: "Linha Foco",
    theme: "Tema Visual",
   },
   themes: {
    ninja: "Ninja (Dark)",
    paper: "Papel (Light)",
    contrast: "Contraste",
    matrix: "Matrix",
    cyber: "Cyberpunk",
    cream: "Creme (Leitura)",
   },
   tips: {
    title: "Dicas de Edição PRO",
    desc: "Use tags para destacar texto:",
    red: "Destaque Vermelho",
    yellow: "Destaque Amarelo",
    green: "Destaque Verde",
    caps: "O botão 'TT' ativa o modo Caixa Alta.",
    voice: "Ative o Microfone para rolagem automática por voz.",
   },
   paywall: {
    title: "Recurso PRO Bloqueado",
    desc:
     "Esta funcionalidade é exclusiva para Ninjas PRO. Desbloqueie para usar cores, voz e limite ilimitado.",
    cta: "Desbloquear Vitalício",
    inputPlaceholder: "Insira sua chave PRO...",
    button: "Ativar PRO",
    invalid: "Chave Inválida",
    success: "Ninja Pro Ativado!",
   },
   voice: {
    notSupported: "Seu navegador não suporta controle por voz",
   },
  },
  remote: {
   connecting: "Buscando Ninja Host...",
   targetId: "Alvo: {{id}}",
   touchArea: "TRACKPAD",
   speed: "Velocidade",
   reset: "Reiniciar",
   start: "INICIAR",
   pause: "PAUSAR",
  },
  tutorial: {
   title: "Guia Rápido do PromptNinja",
   overview: {
    title: "Visão Geral",
    description:
     "O PromptNinja é um teleprompter profissional P2P que transforma seu navegador em um estúdio completo e seu smartphone em um controle remoto. Sem apps, contas ou dependência de servidores.",
   },
   howToUse: {
    title: "Como Usar",
    step1: {
     title: "Escreva seu Roteiro",
     description:
      "Use o editor para digitar ou colar seu texto. Você pode usar tags como <r>texto</r> para destacar palavras em cores.",
    },
    step2: {
     title: "Conecte seu Celular",
     description:
      "Escaneie o QR Code com seu smartphone para usá-lo como controle remoto. Ajuste a velocidade e inicie/pause a rolagem.",
    },
    step3: {
     title: "Modo de Apresentação",
     description:
      "Clique em 'Iniciar Apresentação' para entrar no modo teleprompter. Use o controle remoto ou o controle de voz para gerenciar a rolagem.",
    },
   },
   advancedFeatures: {
    title: "Recursos Avançados",
    voiceControl: {
     title: "Controle de Voz (Pro)",
     description:
      "Ative o controle de voz para que o teleprompter role automaticamente conforme você fala. Requer versão Pro.",
    },
    themes: {
     title: "Temas",
     description:
      "Personalize a aparência do teleprompter com diferentes temas para melhor legibilidade em diversas condições de iluminação.",
    },
    focusMode: {
     title: "Modo Foco",
     description:
      "Ative o modo foco para destacar a linha atual, ajudando a manter o foco durante a leitura.",
    },
   },
   tips: {
    title: "Dicas",
    tip1: "Use um fundo escuro e texto claro para reduzir o cansaço visual.",
    tip2: "Pratique com diferentes velocidades para encontrar o ritmo ideal para sua apresentação.",
   },
  },
 },
 en: {
  title: {
   main: "PROMPT",
   sub: "NINJA",
   remote: "CONTROL",
  },
  menu: {
   home: "Home",
   features: "Features",
   pricing: "Pricing",
   backToHome: "Back to Home",
  },
  landing: {
   hero: {
    headline: "Scroll Like a Master",
    subheadline:
     "The professional zero-latency teleprompter with remote control. No cables, no apps, runs in your browser.",
    cta: "Launch Web App",
   },
   features: {
    sync: {
     title: "Instant Sync",
     desc: "P2P (Peer-to-Peer) technology ensures real-time control with zero delay.",
    },
    offline: {
     title: "Offline Mode",
     desc: "Works without internet after loading. Your data never leaves your device.",
    },
    privacy: {
     title: "Total Privacy",
     desc: "No backend, no database. Your script is saved only in your browser.",
    },
    voice: {
     title: "Voice Control",
     desc: "Text scrolls automatically as you speak. Hands-free and total focus.",
    },
    focus: {
     title: "Dynamic Focus",
     desc: "Smart visual highlighting on the line you are reading so you never get lost.",
    },
    themes: {
     title: "Visual Themes",
     desc: "Dark, Light, Matrix, and High Contrast modes for any environment.",
    },
   },
   pricing: {
    title: "Lifetime Access",
    subtitle: "Pay once, use forever. No monthly subscriptions.",
    lifetime: "Lifetime",
    price: "$9",
    oneTime: "one-time payment",
    cta: "Get Lifetime Access",
    features: [
     "Unlimited Sessions",
     "No Watermark",
     "No Time Limit",
     "Color Highlighting",
     "Voice Control",
     "Dynamic Focus Line",
     "Priority Support",
    ],
   },
  },
  status: {
   disconnected: "DISCONNECTED",
   connecting: "CONNECTING...",
   connected: "CONNECTED",
   error: "NETWORK ERROR",
  },
  host: {
   startPrompter: "Presentation Mode",
   editText: "Edit Script",
   mirror: "Mirror",
   remoteConnect: "Remote Connect",
   scanInstruction: "Scan to control",
   generatingId: "Generating Link...",
   idLabel: "Session ID:",
   editorPlaceholder: "Paste your script here and become a master speaker...",
   localhostWarning: "Warning: Localhost detected. Use the button below to test.",
   openRemoteTab: "Open Remote (New Tab)",
   copyLink: "Copy Link",
   linkCopied: "Copied!",
   connectionLost: "CONNECTION LOST",
   watermark: "PROMPT NINJA FREE VERSION",
   controls: {
    play: "Play",
    pause: "Pause",
    reset: "Reset",
    speed: "Speed",
    margin: "Focus",
    size: "Text",
    timer: "Time",
    caps: "All Caps",
    voice: "Voice Control",
    focusLine: "Focus Line",
    theme: "Visual Theme",
   },
   themes: {
    ninja: "Ninja (Dark)",
    paper: "Paper (Light)",
    contrast: "Contrast",
    matrix: "Matrix",
    cyber: "Cyberpunk",
    cream: "Cream (Reader)",
   },
   tips: {
    title: "PRO Editing Tips",
    desc: "Use tags to highlight text:",
    red: "Red Highlight",
    yellow: "Yellow Highlight",
    green: "Green Highlight",
    caps: "Use 'TT' button for All Caps mode.",
    voice: "Enable Mic for voice-activated scrolling.",
   },
   paywall: {
    title: "PRO Feature Locked",
    desc: "This feature is exclusive to Ninja PROs. Unlock to use colors, voice, and unlimited time.",
    cta: "Unlock Lifetime",
    inputPlaceholder: "Enter PRO key...",
    button: "Activate PRO",
    invalid: "Invalid Key",
    success: "Ninja Pro Activated!",
   },
   voice: {
    notSupported: "Your browser does not support voice control",
   },
  },
  remote: {
   connecting: "Searching Ninja Host...",
   targetId: "Target: {{id}}",
   touchArea: "TRACKPAD",
   speed: "Speed",
   reset: "Reset",
   start: "START",
   pause: "PAUSE",
  },
  tutorial: {
   title: "PromptNinja Quick Guide",
   overview: {
    title: "Overview",
    description:
     "PromptNinja is a P2P professional teleprompter that turns your browser into a complete studio and your smartphone into a remote control. No apps, no accounts, no server dependency.",
   },
   howToUse: {
    title: "How to Use",
    step1: {
     title: "Write Your Script",
     description:
      "Use the editor to type or paste your text. You can use tags like <r>text</r> to highlight words in colors.",
    },
    step2: {
     title: "Connect Your Phone",
     description:
      "Scan the QR Code with your smartphone to use it as a remote control. Adjust speed and start/pause scrolling.",
    },
    step3: {
     title: "Presentation Mode",
     description:
      "Click 'Start Presentation' to enter teleprompter mode. Use the remote control or voice control to manage scrolling.",
    },
   },
   advancedFeatures: {
    title: "Advanced Features",
    voiceControl: {
     title: "Voice Control (Pro)",
     description:
      "Activate voice control for the teleprompter to scroll automatically as you speak. Requires Pro version.",
    },
    themes: {
     title: "Themes",
     description:
      "Customize the teleprompter's appearance with different themes for better readability in various lighting conditions.",
    },
    focusMode: {
     title: "Focus Mode",
     description:
      "Activate focus mode to highlight the current line, helping you maintain focus while reading.",
    },
   },
   tips: {
    title: "Tips",
    tip1: "Use a dark background and light text to reduce eye strain.",
    tip2: "Practice with different speeds to find the ideal rhythm for your presentation.",
   },
  },
 },
};

export type Language = "pt" | "en";
export type TranslationKey = keyof typeof resources.pt;
