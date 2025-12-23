# 📋 Funcionalidades Completas - PromptNinja

Este documento detalha todas as funcionalidades do PromptNinja, desde os recursos básicos até os avançados e automações inteligentes.

---

## 🚀 1. Core & Arquitetura (Infraestrutura)
*   **Conexão Peer-to-Peer (P2P):** Utiliza tecnologia WebRTC para conexão direta entre PC (Host) e Celular (Remote) sem passar por servidores de streaming, garantindo latência próxima de zero (<10ms).
*   **PWA (Progressive Web App):** Pode ser instalado como um aplicativo nativo no Chrome, Edge, Safari e Android/iOS, funcionando em tela cheia.
*   **100% Offline:** Após carregada, a aplicação funciona sem internet (ideal para gravação em modo avião ou locais sem sinal). O texto do teleprompter persiste mesmo atualizando a página.
*   **Privacidade Total:** Os roteiros ficam guardados apenas na memória temporária do seu navegador (RAM). Nada é enviado para bancos de dados.

---

## 🎨 2. Interface & Visualização
### Configurações de Texto
*   **Tamanho da Fonte:** Ajuste ultra-fino (de 20px a 200px) para máxima legibilidade à distância.
*   **Margens Laterais:** Controle de preenchimento lateral (0% a 50%) para manter o olhar centralizado na lente da câmera.
*   **Tipografia Selecionável:**
    *   **Sans-serif Profissional:** (Inter/Outfit) para máxima clareza.
    *   **OpenDyslexic:** Fonte especializada para facilitar a leitura por pessoas com dislexia.
    *   Outras: Roboto Mono, Poppins, Lexend.
*   **Modo Todo em Maiúsculas (Case):** Transforma o texto instantaneamente para CAIXA ALTA com um clique.

### Temas e Efeitos
*   **Temas Visuais (9 variações):**
    *   **Ninja:** Dark mode puro (OLED optimized).
    *   **Paper:** Fundo claro (estilo leitura tradicional).
    *   **Contrast:** Alto contraste para ambientes ensolarados.
    *   **Matrix / Cyber:** Estéticas futuristas.
    *   **Cream:** Tom sépia para reduzir a fadiga ocular.
    *   **Chroma Key (Verde/Azul):** Fundo sólido para remoção em editores de vídeo como OBS ou Premiere.
*   **Modo Espelhado (Mirror):** Inversão horizontal de texto para uso em teleprompters físicos com espelho divisor de feixes.
*   **Inversão Vertical (Flip):** Permite rotacionar o texto em 180º para setups complexos de câmera.
*   **Linha de Foco Dinâmica:** Escurece o texto acima e abaixo da linha de leitura ativa, criando um túnel de foco visual no centro da tela.

---

## 🎤 3. Controle & Operação
### Controle Remoto via Celular
*   **Pareamento por QR Code:** Conexão instantânea via câmera, sem login ou configuração.
*   **Trackpad Virtual:** Arraste o dedo no celular para rolar o texto livremente (scroll manual).
*   **Controle de Velocidade:** Botões de incremento e decremento de velocidade em tempo real.
*   **Sincronização Bidirecional:** O que você muda no celular reflete no PC e vice-versa.
*   **Feedback Háptico:** Vibração no celular ao interagir com os comandos (Android/iOS suportados).

### Controle por Voz (IA) - [PRO]
*   **Reconhecimento de Fala:** O texto rola automaticamente seguindo o ritmo da sua fala. Se você parar de falar, o teleprompter para. Se você acelerar, ele acompanha.
*   **Keep-to-Top:** Mantém a frase que você está lendo sempre na parte superior da tela para maximizar a visão do que vem a seguir.

### Atalhos de Teclado (Padrão)
*   `Espaço / Enter`: Iniciar / Pausar
*   `Seta Cima / Baixo`: Ajustar velocidade
*   `+/- (Equal/Minus)`: Aumentar / Diminuir tamanho da fonte
*   `M`: Alternar Espelhamento
*   `V`: Alternar Inversão Vertical
*   `F`: Alternar Modo Foco
*   `H`: Mostrar/Ocultar interface (HUD)
*   `C`: Alternar Câmera de fundo
*   `W`: Alternar Mini-Janela (PiP)
*   `R`: Reiniciar prompter (Voltar ao topo)
*   `Esc`: Sair do modo apresentação

---

## 📝 4. Editor de Scripts & Modos Especializados
### Editor Inteligente
*   **Syntax Highlighting (Tags de Cor):**
    *   `<r>Texto</r>`: Vermelho (Alertas ou paradas).
    *   `<y>Texto</y>`: Amarelo (Ênfase).
    *   `<g>Texto</g>`: Verde (Ações ou início).
    *   `<b>Texto</b>`: Azul (Observações de direção).
*   **Quick Edit:** Edição rápida do texto sem sair do modo teleprompter.

### Modos Especiais
*   **Modo Músico:** Mantém formatação original de parágrafos, ideal para letras de música com cifras alinhadas. Atalhos no teclado como Page Up, Page Down, Home e End para facilitar integração com pedais.
*   **Modo Bilíngue:** Exibe dois roteiros lado a lado (50/50). O controle por voz pode ser configurado para rastrear o idioma da esquerda ou da direita individualmente.
*   **Modo HUD-less:** Inicia o teleprompter sem nenhum botão visível na tela, deixando a imagem 100% limpa para gravação.

---

## 🤖 5. Automação via Comandos no Texto
Você pode inserir comandos entre colchetes diretamente no script para controle automático:
*   `[SPEED 5]`: Altera a velocidade para o nível 5 naquele ponto do texto.
*   `[PAUSE 10]`: Pausa a rolagem por 10 segundos e retoma sozinho.
*   `[STOP]`: Para a rolagem completamente.
*   `[LOOP START] / [LOOP 3]`: Cria um loop que repete o trecho do texto 3 vezes (ideal para treinos).
*   **Fitness Mode (Modo Exercícios):**
    *   `[REST 30]`: Exibe um HUD de descanso de 30 segundos.
    *   `[COUNT 15]`: Exibe um contador de repetições que integra com o controle de voz para contar repetições de exercícios.

---

## 📹 6. Recursos de Vídeo & Gravação
*   **Picture-in-Picture (PiP):** Abre o teleprompter em uma janela flutuante que fica por cima de outros apps (Zoom, Teams, Meet). Transparencia não funcional ainda (problemas para implementar a transparencia)
*   **Camera Overlay:** Exibe a webcam do seu computador como fundo do teleprompter (selfie mode).
*   **Gravação de Áudio:** Permite gravar sua fala enquanto lê o roteiro para revisão e download em `.webm`. Permite gravar o vídeo também (mp4). Permite usar a camera como o background do teleprompter.
*   **Calculadora de Pacing (WPM):** Calcula automaticamente o tempo de leitura com base no número de palavras e velocidade selecionada.
*   **Sugestões por Plataforma:** Indica se o seu tempo de roteiro está adequado para TikTok/Reels (60s) ou YouTube (5min).

---

## 💎 7. Recursos Exclusivos PRO
*   **Sessões Ilimitadas:** Sem interrupções após 20 minutos de uso.
*   **Controle por Voz Completo:** Acesso total à IA de acompanhamento de fala.
*   **Sem Marca d'Água:** Remove a menção "Versão Gratuita" do rodapé.
*   **Customização de Atalhos:** Altere as teclas de comando para o que for mais confortável.
*   **Multi-Remote:** Conecte vários celulares no mesmo teleprompter (útil para equipes de produção).
*   **Logo Personalizado:** Exibe seu próprio logo no teleprompter.

## Novas funcionalidades
*   Agora o usuário pode enviar seu feedback, também dar estrelas para o produto e compartilhar.
*   Temos uma função que desativa o pro por 24 horas (locastorage encrypted)
*   Modal de Tutorial
*   Ao clicar em recursos pro ou usar o teleprompter por 20 minutos aparece o Redeem Modal (pede para assinar, ou compartilhar, dar um feedback ou ativar o pro por 24 horas gratis, se fechar tem um countdown de 3 segundos e fecha).
*   Cerca de 40 páginas de SEO parasita (long-tail) para atrair trafégo orgânico.
*   Diversos eventos para rastrear o uso pelo analytics (destacam-se: micro_conversion - uso de 3 minutos do usuario, paywall_cta_click - interesse em assina ao clicar em comprar, pro_key_redeemed - assinatura efetuada, successful_connection - conexão p2p feita, pro_trial_started - inicio de trial pro por 24 horas, app_error - com tipo de erro e mensagem, setting_changed - quando o usuario muda uma configuração, )