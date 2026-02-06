# Plano de Refatoração: Sistema de Controle de Voz

Este documento propõe uma estratégia para desmembrar e organizar o sistema de controle de voz do PromptNinja, que atualmente possui componentes com alta densidade de lógica (especialmente `useVoiceControl.ts` com >1600 linhas).

## 1. Problemas Identificados
- **Baixa Coesão:** O hook `useVoiceControl` faz de tudo: gerencia API do browser, calcula métricas, valida pulos, lida com física de scroll e processa algoritmos de busca.
- **Dificuldade de Teste:** É difícil testar a lógica de decisão (pulos/recuperação) sem instanciar todo o hook e o sistema de SpeechRecognition.
- **Resiliência:** A lógica de "onresult" é uma função gigante que dificulta a manutenção e a identificação de bugs específicos em regras acadêmicas (ex: Jump Validation).

## 2. Nova Arquitetura Proposta (Modular)

A ideia é transformar o hook em um **Orquestrador Magro** e delegar a inteligência para módulos especializados.

### A. Camada de Processamento de Sinal (`VoiceSignalEngine.ts`)
- **Responsabilidade:** Receber a transcrição bruta e o histórico, e decidir para onde o teleprompter deve ir.
- **O que sai de `useVoiceControl`:** 
  - Lógica de `findBestMatch` e `findSegmentedMatch`.
  - Regras de Validação de Pulos (Rule 1, 2, 3).
  - Hysteresis (Confirmação de mudanças).
  - Emergency Recovery (Recuperação de falhas).

### B. Camada de Telemetria e Aprendizado (`VoiceMetricsManager.ts`)
- **Responsabilidade:** Monitorar o desempenho e ruído ambiente.
- **O que sai de `useVoiceControl`:**
  - `updateSpeechVelocity` (WPM).
  - `performNoiseCalibration` (Detecção de ruído).
  - `updatePerformanceMetrics` (Throttling adaptativo).
  - `ConfidenceLearning` (Ajuste de thresholds baseado no histórico).

### C. Camada de Sincronização Visual (`VoiceViewportSync.ts`)
- **Responsabilidade:** Lógica que depende do DOM.
- **O que sai de `useVoiceControl`:**
  - `findVisibleSentenceId` (Identificar o que o usuário está vendo no scroll atual).

### D. Camada de Algoritmos Base (`utils/stringSimilarity/`)
- Desmembrar `stringSimilarity.ts` em:
  - `levenshtein.ts`: Apenas o algoritmo de distância puro.
  - `stemming.ts`: Instâncias e lógica dos stemmers (Snowball).
  - `phonetics.ts`: Lógica de Metaphone unificada.

---

## 3. Roteiro de Execução (Fases)

### Fase 1: Limpeza de Utilitários (Baixo Risco)
1. Criar pasta `src/utils/voice/`.
2. Mover lógica de Stemming e Phonetics para arquivos próprios.
3. Isolar o algoritmo de Levenshtein (com cache) em um helper dedicado.

### Fase 2: Extração de Métricas (Médio Risco)
1. Criar um hook ou classe `VoiceMetricsManager`.
2. Mover toda a parte de "Telemetry" (WPM, Noise, Adaptive Throttle) para lá.
3. O `useVoiceControl` passa a apenas consumir os resultados (ex: `metrics.currentWPM`).

### Fase 3: O "Cérebro" (Alto Risco - Core Logic)
1. Criar o `VoiceSignalEngine.ts` como um processador "pure function" (ou classe sem estado de UI).
2. Mover a lógica de decisão do `onresult` para este motor.
3. Criar testes unitários para o motor (simulando casos de pulos e erros de transcrição).

### Fase 4: Sincronização e Física
1. Mover `findVisibleSentenceId` para um utilitário de sincronização visual.
2. Integrar com o `voiceScroll.ts` de forma mais limpa.

---

## 4. Benefícios Esperados
- **Testabilidade:** Poderemos testar a "Inteligência" do teleprompter enviando strings de texto e verificando se ele decide pular corretamente, sem depender do microfone.
- **Performance:** Facilita a implementação de Web Workers para o processamento de busca se o script for muito longo.
- **Leitura:** O arquivo `useVoiceControl.ts` deve cair de 1600 para aproximadamente 300-400 linhas (focado apenas em Lifecycle e Eventos).

---

### 5. Cuidados
🔧 2️⃣ Métricas ≠ Inteligência

Cuidado sutil aqui (o plano quase cai nessa armadilha):

VoiceMetricsManager não deve decidir nada.
Ele só observa, calcula, sugere.

Quem decide:

VoiceSignalEngine

Se métricas começarem a “autorizar” ou “bloquear” decisões, você cria dependência circular difícil de depurar.