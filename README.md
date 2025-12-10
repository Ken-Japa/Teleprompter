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
