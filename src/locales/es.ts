export const es = {
  title: {
   main: "PROMPT",
   sub: "NINJA",
   remote: "CONTROL",
  },
  menu: {
   home: "Inicio",
   features: "Características",
   pricing: "Precios",
   backToHome: "Volver a Inicio",
  },
  landing: {
   hero: {
    headline: "Desplázate como un Maestro",
    subheadline:
     "El teleprompter profesional de latencia cero con control remoto. Sin cables, sin apps, directamente en tu navegador.",
    cta: "Lanzar Aplicación Web",
   },
   features: {
    sync: {
     title: "Sincronización Instantánea",
     desc: "La tecnología P2P (Peer-to-Peer) garantiza un control en tiempo real sin demoras.",
    },
    offline: {
     title: "Modo Offline",
     desc: "Funciona sin internet después de cargar. Tus datos nunca salen de tu dispositivo.",
    },
    privacy: {
     title: "Privacidad Total",
     desc: "Sin backend, sin base de datos. Tu guion se guarda solo en tu navegador.",
    },
    voice: {
     title: "Control por Voz",
     desc: "El texto se desplaza automáticamente mientras hablas. Manos libres y enfoque total.",
    },
    focus: {
     title: "Enfoque Dinámico",
     desc: "Resaltado visual inteligente en la línea que estás leyendo para que nunca te pierdas.",
    },
    themes: {
     title: "Temas Visuales",
     desc: "Modos Oscuro, Claro, Matrix y Alto Contraste para cualquier entorno.",
    },
   },
   pricing: {
    title: "Acceso de por Vida",
    subtitle: "Paga una vez, úsalo para siempre. Sin suscripciones mensuales.",
    lifetime: "De por Vida",
    price: "€9",
    oneTime: "pago único",
    cta: "Obtener Acceso de por Vida",
    features: [
     "Sesiones Ilimitadas",
     "Sin Marca de Agua",
     "Sin Límite de Tiempo",
     "Resaltado de Color",
     "Control por Voz",
     "Línea de Enfoque Dinámico",
     "Soporte Prioritario",
    ],
   },
  },
  status: {
   disconnected: "DESCONECTADO",
   connecting: "CONECTANDO...",
   connected: "CONECTADO",
   error: "ERROR DE RED",
  },
  host: {
   startPrompter: "Modo Presentación",
   editText: "Editar Guion",
   mirror: "Espejo",
   remoteConnect: "Conexión Remota",
   scanInstruction: "Escanea para controlar",
   generatingId: "Generando Enlace...",
   idLabel: "ID de Sesión:",
   editorPlaceholder: "Pega tu guion aquí y conviértete en un maestro orador...",
   localhostWarning: "Advertencia: Localhost detectado. Usa el botón de abajo para probar.",
   openRemoteTab: "Abrir Control Remoto (Nueva Pestaña)",
   copyLink: "Copiar Enlace",
   linkCopied: "¡Copiado!",
   connectionLost: "CONEXIÓN PERDIDA",
   watermark: "PROMPT NINJA VERSIÓN GRATUITA",
   controls: {
    play: "Reproducir",
    pause: "Pausar",
    reset: "Reiniciar",
    speed: "Velocidad",
    margin: "Enfoque",
    size: "Texto",
    timer: "Tiempo",
    caps: "Mayúsculas",
    voice: "Control por Voz",
    focusLine: "Línea de Enfoque",
    theme: "Tema Visual",
   },
   themes: {
    ninja: "Ninja (Oscuro)",
    paper: "Papel (Claro)",
    contrast: "Contraste",
    matrix: "Matrix",
    cyber: "Cyberpunk",
    cream: "Crema (Lector)",
   },
   tips: {
    title: "Consejos de Edición PRO",
    desc: "Usa etiquetas para resaltar texto:",
    red: "Resaltado Rojo",
    yellow: "Resaltado Amarillo",
    green: "Resaltado Verde",
    caps: "El botón 'TT' activa el modo Mayúsculas.",
    voice: "Activa el Micrófono para el desplazamiento automático por voz.",
   },
   paywall: {
    title: "Función PRO Bloqueada",
    desc:
     "Esta función es exclusiva para Ninjas PRO. Desbloquea para usar colores, voz y límite ilimitado.",
    cta: "Desbloquear de por Vida",
    inputPlaceholder: "Introduce tu clave PRO...",
    button: "Activar PRO",
    invalid: "Clave Inválida",
    success: "¡Ninja Pro Activado!",
   },
   voice: {
    notSupported: "Tu navegador no soporta control por voz",
   },
  },
  remote: {
   connecting: "Buscando Ninja Host...",
   targetId: "Objetivo: {{id}}",
   touchArea: "TRACKPAD",
   speed: "Velocidad",
   reset: "Reiniciar",
   start: "INICIAR",
   pause: "PAUSAR",
  },
  tutorial: {
   title: "Guía Rápida de PromptNinja",
   overview: {
    title: "Visión General",
    description:
     "PromptNinja es un teleprompter profesional P2P que convierte tu navegador en un estudio completo y tu smartphone en un control remoto. Sin aplicaciones, cuentas o dependencia de servidores.",
   },
   howToUse: {
    title: "Cómo Usar",
    step1: {
     title: "Escribe tu Guion",
     description:
      "Usa el editor para escribir o pegar tu texto. Puedes usar etiquetas como <r>texto</r> para resaltar palabras en colores.",
    },
    step2: {
     title: "Conecta tu Teléfono",
     description:
      "Escanea el Código QR con tu smartphone para usarlo como control remoto. Ajusta la velocidad e inicia/pausa el desplazamiento.",
    },
    step3: {
     title: "Modo de Presentación",
     description:
      "Haz clic en 'Iniciar Presentación' para entrar en el modo teleprompter. Usa el control remoto o el control por voz para gestionar el desplazamiento.",
    },
   },
   advancedFeatures: {
    title: "Características Avanzadas",
    voiceControl: {
     title: "Control por Voz (Pro)",
     description:
      "Activa el control por voz para que el teleprompter se desplace automáticamente mientras hablas. Requiere la versión Pro.",
    },
    themes: {
     title: "Temas",
     description:
      "Personaliza la apariencia del teleprompter con diferentes temas para una mejor legibilidad en diversas condiciones de iluminación.",
    },
    focusMode: {
     title: "Modo Enfoque",
     description:
      "Activa el modo enfoque para resaltar la línea actual, ayudándote a mantener el enfoque durante la lectura.",
    },
   },
   tips: {
    title: "Consejos",
    tip1: "Usa un fondo oscuro y texto claro para reducir la fatiga visual.",
    tip2: "Practica con diferentes velocidades para encontrar el ritmo ideal para tu presentación.",
   },
  },
 };