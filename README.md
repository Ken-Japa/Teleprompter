# 🥷 PromptNinja - Teleprompter Profissional P2P

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/react-18.x-cyan.svg)
![TypeScript](https://img.shields.io/badge/typescript-5.x-blue.svg)
![Vite](https://img.shields.io/badge/vite-5.x-purple.svg)
![Tailwind](https://img.shields.io/badge/tailwind-3.4-teal.svg)
![PWA](https://img.shields.io/badge/PWA-Ready-orange.svg)

**PromptNinja** é um teleprompter web de nível profissional, código aberto e focado em privacidade. Ele transforma seu navegador em um estúdio de teleprompter completo e seu smartphone em um controle remoto de precisão, sem a necessidade de instalar aplicativos, criar contas ou depender de servidores para armazenar seus dados sensíveis.

Desenvolvido para criadores de conteúdo, jornalistas, palestrantes e educadores que buscam uma solução robusta, gratuita e livre de bloatware.

🚀 Live Demo: https://promptninja.solutionkit.com.br

---

## ✨ Funcionalidades Principais

### 🚀 Core & Arquitetura

- **Conexão Peer-to-Peer (P2P):** Utiliza WebRTC (via PeerJS) para estabelecer um túnel de dados direto entre seu PC e Celular. A latência é virtualmente zero, garantindo sincronia perfeita.
- **100% Offline (PWA):** Instale como um aplicativo no Chrome/Edge/Safari. Uma vez carregado, não requer internet para funcionar (exceto para o handshake inicial do P2P).
- **Privacidade em Primeiro Lugar:** Arquitetura "Serverless" para dados do usuário. Seus roteiros residem apenas na memória RAM do seu dispositivo. Nada é salvo em banco de dados.

### 💻 Host (Apresentador / PC)

- **Editor Inteligente com Syntax Highlighting:**
  - `<r>Texto Vermelho</r>`: Alertas ou paradas.
  - `<y>Texto Amarelo</y>`: Ênfase leve.
  - `<g>Texto Verde</g>`: Sinalizações de início/calma.
  - `<b>Texto Azul</b>`: Notas de direção.
- **Modo Espelho (Mirror):** Inverte o texto horizontalmente (e verticalmente se necessário) para uso com espelhos _beam splitter_ profissionais.
- **Voice Control (IA):** O texto rola automaticamente sincronizado com sua fala usando a Web Speech API. _(Requer navegador compatível e HTTPS)_.
- **Linha de Foco (Focus Mode):** Escurece o texto fora da linha central de leitura para eliminar distrações.
- **6 Temas Profissionais:** De "Ninja" (Dark Mode OLED) a "Matrix" e "Cyber", adaptáveis a qualquer ambiente de iluminação.
- **Tipografia Ajustável:** Controle total de tamanho de fonte, margens e velocidade.

### 📱 Remote (Controle / Celular)

- **Pareamento Instantâneo:** Basta escanear o QR Code gerado pelo Host. Sem logins, sem senhas.
- **Trackpad Virtual:**
  - **Gestos Naturais:** Deslize para rolar, toque para pausar.
  - **Física de Inércia:** Sensação tátil e responsiva.
- **Feedback Háptico:** Vibrações sutis ao interagir com controles (em dispositivos suportados).
- **Sincronização Bidirecional:** O estado (velocidade, posição, play/pause) é mantido em perfeita sincronia entre Host e Remote.

### � Funcionalidades Pro (Opcional)

O projeto inclui uma estrutura de API Serverless (`/api`) para validação de chaves de licença "Pro", integrando com Firebase e Kiwify. Isso permite funcionalidades premium ou suporte monetizado, mantendo o core da aplicação open-source.

---

## 🛠️ Stack Tecnológico

### Frontend

- **React 18**: Biblioteca de UI.
- **TypeScript**: Tipagem estática e segurança.
- **Vite**: Build tool e dev server ultrarrápido.
- **Tailwind CSS**: Estilização utilitária.
- **PeerJS**: Abstração para WebRTC (Comunicação P2P).
- **React Router**: Navegação (usado para páginas de SEO e rotas de Host/Remote).

### Backend (Serverless Functions)

- **Vercel Functions**: Execução de código backend.
- **Firebase Admin SDK**: Gerenciamento de chaves de licença e validação.
- **Upstash Redis**: Rate limiting para proteção da API.

### Testes

- **Vitest**: Unit testing framework.
- **React Testing Library**: Testes de componentes.

---

## 📂 Estrutura do Projeto

```
/
├── api/                  # Funções Serverless (Validação de Chave, Webhooks)
├── public/               # Assets estáticos (Imagens, ícones, manifest)
├── scripts/              # Scripts de build e utilitários (ex: sitemap)
├── src/
│   ├── components/
│   │   ├── host/         # Componentes da interface do PC (Editor, Prompter)
│   │   ├── remote/       # Componentes da interface do Celular (Trackpad)
│   │   ├── landing/      # Componentes da Landing Page
│   │   └── ui/           # Componentes de UI reutilizáveis (Modais, Botões)
│   ├── config/           # Constantes e configurações globais
│   ├── hooks/            # Custom Hooks (Lógica de P2P, Física, Estado)
│   ├── locales/          # Arquivos de tradução (i18n)
│   ├── pages/            # Páginas principais (Host, Remote, Landing, SEO)
│   ├── types/            # Definições de tipos TypeScript globais
│   └── utils/            # Funções utilitárias (Analytics, QR Code, Parser)
└── ...config files       # (vite.config.ts, tailwind.config.js, etc.)
```

---

## � Guia de Desenvolvimento

Siga estes passos para rodar o projeto localmente.

### Pré-requisitos

- **Node.js** (v18+)
- **npm**, **yarn** ou **pnpm**

### 1. Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/prompt-ninja.git
cd prompt-ninja

# Instale as dependências
npm install
```

### 2. Configuração de Variáveis de Ambiente

Para funcionalidades completas (especialmente a parte de API/Validação de Chaves), você precisará configurar as variáveis de ambiente. Crie um arquivo `.env` na raiz:

```env
# Opcional: Apenas se for desenvolver/testar a validação de chaves Pro
FIREBASE_PROJECT_ID=seu_project_id
FIREBASE_CLIENT_EMAIL=seu_client_email
FIREBASE_PRIVATE_KEY="sua_private_key"
UPSTASH_REDIS_REST_URL=sua_url_upstash
UPSTASH_REDIS_REST_TOKEN=seu_token_upstash
```

_Nota: Se você não configurar essas variáveis, o frontend funcionará normalmente, mas as chamadas para `/api/_` falharão (o que não afeta o uso básico do teleprompter).\*

### 3. Rodando Localmente

```bash
npm run dev
```

> **Importante:** O comando `npm run dev` roda o Vite com a flag `--host`. Isso expõe o servidor na sua rede local (LAN), permitindo que você teste a conexão P2P entre seu PC e seu Celular. Verifique o terminal para ver o IP de acesso (ex: `http://192.168.x.x:5173`).

### 4. Build para Produção

```bash
npm run build
```

Isso gera os arquivos otimizados na pasta `dist`, prontos para deploy.

### Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento.
- `npm run build`: Compila o projeto para produção (inclui geração de sitemap).
- `npm run preview`: Visualiza a build de produção localmente.
- `npm run test`: Executa a suíte de testes com Vitest.

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir Issues ou Pull Requests.

1. Faça um Fork do projeto.
2. Crie uma Branch para sua Feature (`git checkout -b feature/NovaFeature`).
3. Faça o Commit (`git commit -m 'Add some NovaFeature'`).
4. Push para a Branch (`git push origin feature/NovaFeature`).
5. Abra um Pull Request.

## Comandos Úteis

window.togglePro()
PRO-NINJA-2025
window.showPaywallModal()
npx tsc --noEmit

## 📊 Analytics Events

Este projeto utiliza Google Analytics 4 (GA4) para rastrear engajamento do usuário e saúde do sistema. Abaixo está a documentação completa de todos os eventos configurados.

### Eventos Automáticos do GA4

Estes eventos são rastreados automaticamente pelo Google Analytics 4 (não requerem configuração):

| Evento | Descrição |
| :--- | :--- |
| `first_visit` | Primeira visita do usuário ao site |
| `session_start` | Início de uma nova sessão de usuário |
| `page_view` | Visualização de página |
| `user_engagement` | Engajamento do usuário (tempo ativo na página) |
| `scroll` | Usuário rolou a página até 90% de profundidade |

### Eventos Personalizados do PromptNinja

Estes eventos foram implementados especificamente para rastrear funcionalidades do PromptNinja:

#### Ciclo de Vida da Aplicação

| Evento | Descrição | Parâmetros |
| :--- | :--- | :--- |
| `app_launched` | Aplicação iniciada | - |
| `app_error` | Erro genérico da aplicação | `error_type` (string), `message` (string) |
| `feature_error` | Funcionalidade bloqueada (ex: voice control sem Pro) | `feature_name` (string) |

#### Teleprompter & Rolagem

| Evento | Descrição | Parâmetros |
| :--- | :--- | :--- |
| `teleprompter_play` | Rolagem do teleprompter iniciada | `speed_start` (number) |
| `teleprompter_pause` | Rolagem do teleprompter pausada | `duration_since_start` (number) |
| `start_pacing` | Apresentação iniciada com timer/pacer | `speed_start` (number), `mode` (string: auto/voice) |
| `finish_reading` | Usuário chegou ao final do roteiro | `duration_seconds` (number) |

#### Conexão P2P & Remoto

| Evento | Descrição | Parâmetros |
| :--- | :--- | :--- |
| `successful_connection` | Handshake P2P bem-sucedido | - |
| `remote_connected` | Dispositivo remoto conectado | `role` (string: host/remote) |

#### Configurações & Personalização

| Evento | Descrição | Parâmetros |
| :--- | :--- | :--- |
| `setting_changed` | Qualquer configuração foi modificada | `setting_name` (string), `value` (string\|number\|boolean) |

#### Compartilhamento & Social

| Evento | Descrição | Parâmetros |
| :--- | :--- | :--- |
| `share_button_clicked` | Botão de compartilhar clicado | `lang` (string), `url` (string) |
| `share_copied_to_clipboard` | URL copiada para área de transferência | `lang` (string), `url` (string) |

#### Monetização & Conversão

| Evento | Descrição | Parâmetros |
| :--- | :--- | :--- |
| `paywall_view` | Modal de paywall exibido | `trigger` (string: manual/timer) |
| `paywall_cta_click` | Botão do paywall clicado | `cta_type` (string) |
| `pro_key_redeemed` | Chave Pro resgatada com sucesso | - |
| `pro_trial_started` | Início de trial pro por 24 horas | - |

#### Gravação

| Evento | Descrição | Parâmetros |
| :--- | :--- | :--- |
| `recording_start` | Gravação de vídeo iniciada | `mode` (string: host/remote) |
| `recording_stop` | Gravação de vídeo finalizada | `mode` (string), `duration` (number) |

#### Métricas de Engajamento

| Evento | Descrição | Parâmetros |
| :--- | :--- | :--- |
| `page_heartbeat` | Enviado a cada 60s enquanto a página Host está aberta | `duration_seconds` (number) |
| `page_duration` | Enviado ao sair da página Host | `duration_seconds` (number) |
| `usage_heartbeat` | Enviado a cada 60s durante conexão P2P ativa | `duration_seconds` (number) |

### 🔍 Como Visualizar Parâmetros no GA4

Os eventos listados acima **possuem parâmetros** (quando indicado), mas eles não aparecem nos relatórios padrão do GA4. Para visualizá-los:

#### Opção 1: DebugView (Recomendado para Desenvolvimento)
1. Acesse **Admin → DebugView** no console do GA4
2. Visualize eventos em tempo real com todos os parâmetros detalhados
3. Note: O projeto já está configurado com `debug_mode: true`

#### Opção 2: Análise Livre (Produção)
1. Acesse **Explorar → Análise livre** no GA4
2. Selecione o evento desejado
3. Adicione os parâmetros como **dimensões personalizadas**
4. Crie relatórios customizados agrupando por parâmetros

#### Opção 3: Dimensões Personalizadas
1. Acesse **Admin → Definições personalizadas → Criar dimensão personalizada**
2. Mapeie parâmetros importantes (ex: `error_type`, `setting_name`, `cta_type`)
3. Aguarde 24-48h para os dados começarem a aparecer nos relatórios padrão

### 📝 Exemplos de Uso dos Parâmetros

```javascript
// Rastreando erro com detalhes
trackEvent("app_error", { 
  error_type: "p2p_connection", 
  message: "Failed to establish peer connection" 
});

// Rastreando mudança de configuração
trackEvent("setting_changed", { 
  setting_name: "fontSize", 
  value: 48 
});

// Rastreando início de apresentação com voice control
trackEvent("start_pacing", { 
  speed_start: 150, 
  mode: "voice" 
});
```
