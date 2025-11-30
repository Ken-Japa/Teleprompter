# 🥷 PromptNinja - Teleprompter Profissional P2P

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/react-18.x-cyan.svg)
![TypeScript](https://img.shields.io/badge/typescript-5.x-blue.svg)
![Vite](https://img.shields.io/badge/vite-5.x-purple.svg)
![Tailwind](https://img.shields.io/badge/tailwind-3.4-teal.svg)
![PWA](https://img.shields.io/badge/PWA-Ready-orange.svg)

**PromptNinja** é um teleprompter web de nível profissional, código aberto e focado em privacidade. Ele transforma seu navegador em um estúdio de teleprompter completo e seu smartphone em um controle remoto de precisão, sem a necessidade de instalar aplicativos, criar contas ou depender de servidores para armazenar seus dados.

Desenvolvido para criadores de conteúdo, jornalistas, palestrantes e educadores que buscam uma solução robusta, gratuita e livre de bloatware.

---

## ✨ Funcionalidades em Destaque

### 🚀 Core & Arquitetura

- **Conexão Peer-to-Peer (P2P):** Utiliza WebRTC (via PeerJS) para estabelecer um túnel direto entre seu PC e Celular. A latência é virtualmente zero.
- **100% Offline (PWA):** Instale como um aplicativo no Chrome/Edge. Uma vez carregado, não requer internet para funcionar.
- **Privacidade Total:** Arquitetura "Serverless" para dados. Seus roteiros residem apenas na memória RAM do seu dispositivo. Nada é salvo em banco de dados.

### 💻 Host (Apresentador / PC)

- **Editor Inteligente com Tags de Cor:**
  - `<r>Texto Vermelho</r>` para alertas/pare.
  - `<y>Texto Amarelo</y>` para ênfase leve.
  - `<g>Texto Verde</g>` para sinalizações de calma/início.
  - `<b>Texto Azul</b>` para notas de direção.
- **Modo Espelho (Mirror):** Inverte o texto horizontalmente e verticalmente para uso com espelhos _beam splitter_ profissionais.
- **Voice Control (IA):** O texto rola automaticamente sincronizado com sua fala (Web Speech API). _Requer HTTPS e permissão de microfone._
- **Linha de Foco (Focus Mode):** Escurece drasticamente o texto fora da linha central de leitura, eliminando distrações visuais.
- **6 Temas Profissionais:**
  - 🥷 **Ninja:** Dark mode padrão (Otimizado para OLED).
  - 📄 **Paper:** Fundo claro para ambientes iluminados.
  - 🌓 **Contrast:** Alto contraste (Amarelo no Preto) para acessibilidade.
  - 🟢 **Matrix:** Estilo terminal hacker.
  - 🔮 **Cyber:** Paleta Cyberpunk Neon.
  - 🍦 **Cream:** Baixo contraste e temperatura quente para leitura longa.
- **Tipografia Ajustável:** Controle de tamanho de fonte de 24px a 200px.

### 📱 Remote (Controle / Celular)

- **Pareamento Instantâneo:** Basta escanear o QR Code gerado pelo Host.
- **Trackpad Virtual Inteligente:**
  - **Gestos Naturais:** Deslize o dedo para cima para avançar o texto (rolar para baixo), deslize para baixo para voltar.
  - **Física de Inércia:** O texto responde com peso e suavidade ao seu toque.
  - **Toque para Pausar:** Um toque rápido na tela pausa ou retoma a rolagem.
- **Controles Completos:**
  - Play / Pause.
  - Ajuste fino de velocidade.
  - Reiniciar roteiro.
  - Botões de ação rápida.
- **Feedback Hápitco:** O celular vibra levemente ao realizar ações (sujeito a compatibilidade do dispositivo).
- **Sincronização Bidirecional:** O estado (velocidade, posição) é mantido perfeitamente sincronizado entre as duas telas.

---

## 🛠️ Guia de Instalação e Desenvolvimento

Para rodar o PromptNinja localmente e contribuir com o código.

### Pré-requisitos

- [Node.js](https://nodejs.org/) (Versão 18 ou superior recomendada)
- Gerenciador de pacotes (NPM, Yarn ou PNPM)

### Passo a Passo

1. **Clone o repositório**

   ```bash
   git clone https://github.com/seu-usuario/prompt-ninja.git
   cd prompt-ninja
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Inicie o Servidor de Desenvolvimento**

   ```bash
   npm run dev
   ```

   > **Nota:** O script `dev` roda o Vite com a flag `--host` (`vite --host`). Isso é **essencial** para que o servidor seja exposto na sua rede local (LAN), permitindo que seu celular acesse a aplicação pelo IP do seu computador (ex: `http://192.168.1.5:5173`).

4. **Acesse a Aplicação**
   - No PC: Abra o link `Local` (ex: `http://localhost:5173`) ou o link `Network` exibido no terminal.
   - No Celular: Conecte-se à **mesma rede Wi-Fi** e escaneie o QR Code dentro da aplicação.

### Scripts Disponíveis

- `npm run dev`: Inicia servidor de desenvolvimento.
- `npm run build`: Gera a build de produção na pasta `dist`.
- `npm run preview`: Visualiza a build de produção localmente.

---

## 🚀 Deploy na Vercel

A Vercel oferece uma plataforma de deploy fácil e rápida para aplicações web.

1. **Crie uma conta na Vercel:** Se você ainda não tem uma, crie uma conta em [vercel.com](https://vercel.com/).
2. **Instale a Vercel CLI (opcional, mas recomendado):**
   ```bash
   npm install -g vercel
   ```
3. **Faça login na Vercel CLI:**
   ```bash
   vercel login
   ```
4. **Faça o deploy do seu projeto:**
   Navegue até a pasta raiz do seu projeto no terminal e execute:
   ```bash
   vercel
   ```
   Siga as instruções no terminal. A Vercel detectará automaticamente que é um projeto Vite e configurará o deploy.
5. **HTTPS:** A Vercel configura automaticamente o HTTPS para o seu deploy.

---

## 🚀 Deploy na Netlify

A Netlify oferece uma plataforma de deploy poderosa e fácil de usar.

1. **Crie uma conta na Netlify:** Se você ainda não tem uma, crie uma conta em [netlify.com](https://www.netlify.com/).
2. **Instale a Netlify CLI (opcional, mas recomendado):**
   ```bash
   npm install -g netlify-cli
   ```
3. **Faça login na Netlify CLI:**
   ```bash
   netlify login
   ```
4. **Faça o deploy do seu projeto:**
   Navegue até a pasta raiz do seu projeto no terminal e execute:
   ```bash
   netlify deploy
   ```
   Siga as instruções no terminal. A Netlify detectará automaticamente que é um projeto Vite e configurará o deploy.
5. **HTTPS:** A Netlify configura automaticamente o HTTPS para o seu deploy.

---

## 🧩 Estrutura do Projeto

O projeto segue uma arquitetura moderna baseada em React Hooks e Componentização.

```
/
├── components/
│   ├── host/              # Lógica e UI exclusiva do modo Apresentador
│   │   ├── controls/      # Botões e painéis (Fonte, Tema, Velocidade)
│   │   ├── script/        # Renderização do texto (Sentenças, Fragmentos)
│   │   ├── Prompter.tsx   # Core do teleprompter (Loop de rolagem)
│   │   └── Editor.tsx     # Área de input de texto
│   ├── remote/            # Lógica e UI exclusiva do modo Controle Remoto
│   │   ├── Trackpad.tsx   # Área de toque gestual
│   │   └── Connection...  # Feedback de estado da conexão
│   └── ui/                # Componentes base (Botões, Ícones, Layouts)
├── hooks/
│   ├── usePeerHost.ts     # Gerencia WebRTC lado Host (Cria sala, QR Code)
│   ├── usePeerRemote.ts   # Gerencia WebRTC lado Remote (Conecta na sala)
│   ├── useScrollPhysics.ts# Lógica de física de rolagem suave
│   └── useVoiceControl.ts # Integração com Web Speech API
├── utils/
│   └── textParser.ts      # Parser de tags (<r>, <y>) e quebra de sentenças
├── types.ts               # Definições de tipos TypeScript globais
└── ...configs             # Vite, Tailwind, PostCSS
```

## 🔌 Como Funciona a Conexão (Deep Dive)

O PromptNinja resolve o problema de comunicação em tempo real usando **PeerJS**:

1. **Signaling:** Quando o Host inicia, ele se conecta a um servidor de _broker_ público do PeerJS para obter um ID único (Session ID).
2. **Discovery:** Este ID é embutido na URL do QR Code (`.../#remote?id=UUID`).
3. **Handshake:** O celular lê o ID da URL e inicia uma conexão direta (P2P) com o PC.
4. **Data Channel:** Uma vez conectados, os dados não passam mais por nenhum servidor. O celular envia comandos (ex: `SCROLL_DELTA`, `PLAY`) e o PC responde com estados (`SYNC_STATE`).

> **Nota sobre Redes:** Em algumas redes corporativas ou com firewalls restritivos (NAT simétrico), a conexão P2P pode falhar. Nestes casos, o WebRTC tentaria usar um servidor TURN, que não está configurado na versão gratuita padrão.

---

## 🎨 Guia de Formatação de Texto

Você pode colar qualquer texto no editor. Para usar os recursos avançados de coloração, use as seguintes tags HTML-like:

| Tag          | Cor          | Uso Recomendado                               |
| :----------- | :----------- | :-------------------------------------------- |
| `<r>...</r>` | **Vermelho** | Paradas obrigatórias, alertas, erros.         |
| `<y>...</y>` | **Amarelo**  | Ênfase na entonação, palavras-chave.          |
| `<g>...</g>` | **Verde**    | Início de seção, respiração, calma.           |
| `<b>...</b>` | **Azul**     | Notas de direção (ex: "Olhar para câmera 2"). |

**Exemplo:**

```html
Olá e bem-vindos! <g>Respire fundo.</g> Hoje vamos falar sobre <y>performance</y>.
<r>PAUSA DRAMÁTICA</r>
Mas antes, <b>sorria para a câmera</b>.
```

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Se você tiver ideias para melhorar o PromptNinja:

1. Faça um Fork do projeto.
2. Crie uma Branch para sua Feature (`git checkout -b feature/IncrivelRecurso`).
3. Commit suas mudanças (`git commit -m 'Add: IncrivelRecurso'`).
4. Push para a Branch (`git push origin feature/IncrivelRecurso`).
5. Abra um Pull Request.

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Feito com 💜 e código.
