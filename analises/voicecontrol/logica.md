# Lógica do Controle de Voz (PromptNinja)

Este documento explica como o PromptNinja processa a sua voz para rolar o teleprompter automaticamente de forma suave e inteligente.

## 1. Visão Geral
O objetivo do controle de voz é manter a frase que você está lendo sempre em uma "linha de leitura" (geralmente no topo da tela, a cerca de 12% da altura do visor). O sistema não apenas identifica a frase atual, mas também a posição exata (progresso) dentro dela.

## 2. Pilares da Lógica

### A. Arquitetura de "Lock" de Sentença
O sistema divide o texto em frases e trabalha com dois estados:
- **Locked Sentence (Frase Travada):** É a frase que o sistema tem certeza que você está lendo. Para mudar de frase, ele exige uma confirmação (Hysteresis) ou uma correspondência de alta confiança. A Hysteresis é o que impede o sistema de “oscilar” decisões quando a fala humana é naturalmente imperfeita. Define o ritmo de decisão do sistema.
- **Intra-sentence Progress (Progresso Interno):** Dentro da frase travada, o sistema é mais flexível, permitindo que o scroll acompanhe cada palavra falada em tempo real.

### B. O Motor de Busca (Matching Engine)
Quando você fala, o sistema recebe um texto (transcrição) e tenta encontrá-lo no script original usando três técnicas:
1.  **Fuzzy Matching (Busca Difusa):** Calcula a distância de Levenshtein (quantas letras são diferentes) entre o que foi dito e o script.
2.  **Stemming (Radicalização):** Reduz as palavras aos seus radicais (ex: "ajudando" e "ajudamos" viram "ajud"). Isso ajuda a ignorar erros pequenos de conjugação ou plural na transcrição.
3.  **Fonética (Metaphone):** Se a escrita falhar mas o *som* for muito parecido (ex: "Ken" vs "Quem"), o sistema dá um "bônus" de confiança na correspondência. Usa dois códigos fonéticos por palavra para capturar variações de pronúncia e sotaque, aumentando a tolerância a erros comuns do reconhecimento de voz.

### C. Estratégias de Recuperação (Rescue)
Se o sistema não encontrar o que você disse perto da posição atual:
1.  **Busca Segmentada:** Ele quebra a sua fala em pequenos pedaços (n-grams) e tenta encontrar um "consenso" de onde você pode estar.
2.  **Look-Ahead (Olhar para frente):** Ele verifica se você já passou para a próxima frase.
3.  **Emergency Recovery:** Se houver muitas falhas seguidas, o sistema entra em modo de emergência, fazendo uma busca em todo o script e relaxando as exigências de precisão para te encontrar novamente.

### D. Validação de Pulos (Jump Guard)
Para evitar que o teleprompter "pule" acidentalmente por causa de ruídos:
- **Bloqueio de Pulos para Trás:** O sistema é extremamente rigoroso com pulos para trás, permitindo-os apenas se a precisão for quase perfeita (98%+).
- **Hysteresis (Confirmação):** Transições entre frases distantes exigem que o sistema veja a mesma correspondência pelo menos 2 vezes ou por mais de 200ms antes de agir.

## 3. Dinâmica do Scroll
O scroll não é instantâneo; ele usa **Física de Suavização (LERP):**
- O sistema calcula o "alvo" baseado no seu progresso na frase.
- Ele move a tela gradualmente em direção a esse alvo.
- **Adaptação de Velocidade:** O sistema aprende a sua velocidade de fala (WPM - Palavras por Minuto) e ajusta a suavidade do scroll para não ficar "nervoso" ou lento demais.

---
Você fala
  ↓
Transcrição (Web Speech API)
  ↓
Normalização + Fonética
  ↓
Matching Local → Matching Global (se necessário)
  ↓
Confirmação (Hysteresis)
  ↓
Cálculo de Progresso
  ↓
Scroll com Física Suave

---

## Arquivos Responsáveis

### 🧠 Configuração e Inteligência
- `src/config/voiceControlConfig.ts`: Contém todos os "parâmetros de sensibilidade", regras de auto-aprendizado (WPM/Acurácia) e limites de pulos.

### 🎮 Orquestração (O Cérebro)
- `src/hooks/useVoiceControl.ts`: O hook principal. Gerencia a API de fala do navegador, limpa o texto, coordena as buscas e decide quando mudar de frase.
- `src/utils/voiceDiagnostics.ts`: Monitora falhas e acertos em tempo real para diagnóstico técnico.

### ⚙️ Motor de Comparação (O Motor)
- `src/utils/stringSimilarity.ts`: Onde estão os algoritmos matemáticos (Levenshtein, Stemming, Phonetics, Segmented Matching).
- `src/utils/pronunciationMatcher.ts`: Normaliza palavras comuns ou apelidos (ex: transforma "ninja" em "PromptNinja" para facilitar a busca).

### 📐 Física e Movimento
- `src/hooks/physics/voiceScroll.ts`: Calcula a posição exata (pixels) em que o teleprompter deve estar baseado no seu progresso de fala.
- `src/hooks/useScrollPhysics.ts`: Gerencia o movimento físico e a inércia do scroll.

### 🧹 Processamento de Texto
- `src/utils/textParser.ts`: Divide o seu script original em frases limpas e mapeia cada caractere para uma frase, permitindo a sincronização precisa.
