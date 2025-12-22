# Novas Funcionalidades para o PromptNinja

Este documento lista as oportunidades de melhoria identificadas na pesquisa de mercado, ordenadas da mais simples para a mais complexa de implementar.

## 1. Suporte Nativo a Pedais Bluetooth (Fácil)
*   **Descrição:** Muitos músicos e palestrantes utilizam pedais que emulam teclas como `PageUp`, `PageDown`, `Home` e `End`. Atualmente, suportamos `Espaço` e `Setas`.
*   **Implementação:** Adicionar aliases para estas teclas no `useKeyboardShortcuts.ts` e `HOTKEY_DEFAULTS`.
*   **Impacto:** Melhora a experiência de músicos em palco e palestrantes que usam passadores de slide/pedais.

## 2. Modo Anti-Glare / Outdoor (Fácil)
*   **Descrição:** Usuários reclamam de legibilidade em ambientes externos com muita claridade.
*   **Implementação:** Criar um novo tema (ex: `OUTDOOR`) com contraste extremo (ex: Amarelo Vibrante sobre fundo Preto Puro ou Branco sobre Preto) e fontes com peso extra.
*   **Impacto:** Resolve a "Dor #85" de estabilidade e leitura em ambientes externos.

## 3. Modo "Browser Source" para OBS (Médio)
*   **Descrição:** Criadores de conteúdo querem integrar o prompter diretamente no OBS como uma fonte de navegador transparente.
*   **Implementação:** Criar uma rota ou flag na URL que force o `isHudless` e torne o fundo da página 100% transparente (alpha 0).
*   **Impacto:** Resolve a integração com OBS de forma profissional, sem a necessidade de "gambiarras" de captura de janela.

## 4. Suporte a LaTeX / Fórmulas Matemáticas (Médio)
*   **Descrição:** Palestras técnicas exigem fórmulas que quebram em teleprompters comuns.
*   **Implementação:** Integrar a biblioteca `KaTeX` para renderizar blocos de texto entre delimitadores (ex: `$...$`).
*   **Impacto:** Diferencial único para o mercado acadêmico e técnico (Pain #79).

## 5. Controle por Gestos / Sinais de Mão (Difícil)
*   **Descrição:** Permitir pausar ou dar play fazendo um sinal de "High Five" ou "Stop" para a câmera.
*   **Implementação:** Utilizar o `MediaPipe` ou `TensorFlow.js` para detecção de gestos em tempo real via webcam.
*   **Impacto:** Inovação "WOW" para quem grava sozinho e não quer usar voz ou controle remoto.

## 6. Sincronização com Stage Displays (Difícil)
*   **Descrição:** Igrejas e grandes eventos usam ProPresenter ou hardware dedicado.
*   **Implementação:** Criar uma integração via Webhooks ou API local para que o Trigger do ProPresenter mova o script no PromptNinja.
*   **Impacto:** Entrada no mercado corporativo e religioso de alto nível (Pain #66).
