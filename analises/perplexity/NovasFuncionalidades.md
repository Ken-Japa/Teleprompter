# Novas Funcionalidades para o PromptNinja

Este documento lista as oportunidades de melhoria identificadas na pesquisa de mercado, ordenadas da mais simples para a mais complexa de implementar.

## 3. Modo "Browser Source" para OBS (Médio)
*   **Descrição:** Criadores de conteúdo querem integrar o prompter diretamente no OBS como uma fonte de navegador transparente.
*   **Implementação:** Criar uma rota ou flag na URL que force o `isHudless` e torne o fundo da página 100% transparente (alpha 0).
*   **Impacto:** Resolve a integração com OBS de forma profissional, sem a necessidade de "gambiarras" de captura de janela.

## 4. Suporte a LaTeX / Fórmulas Matemáticas (Médio)
*   **Descrição:** Palestras técnicas exigem fórmulas que quebram em teleprompters comuns.
*   **Implementação:** Integrar a biblioteca `KaTeX` para renderizar blocos de texto entre delimitadores (ex: `$...$`).
*   **Impacto:** Diferencial único para o mercado acadêmico e técnico (Pain #79).

## 6. Sincronização com Stage Displays (Difícil)
*   **Descrição:** Igrejas e grandes eventos usam ProPresenter ou hardware dedicado.
*   **Implementação:** Criar uma integração via Webhooks ou API local para que o Trigger do ProPresenter mova o script no PromptNinja.
*   **Impacto:** Entrada no mercado corporativo e religioso de alto nível (Pain #66).
