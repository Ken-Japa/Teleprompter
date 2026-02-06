1. Voice Control e Matching de Strings: Precisão e Latência (Principais Gargalos)

emergency recovery (threshold 8 falhas em 3s) é reativo, não proativo; ruído (noiseDetectionRef) calibra, mas não filtra ecos comuns em home offices.

Melhor Matching com IA Leve: Integre uma lib browser-based como compromise.js (NLP simples) em stringSimilarity.ts para stemming (ex: ignorar conjugações). Reduz falsos negativos em 15%. Custo: Zero, é JS puro.

2. Scroll Physics e UX Geral: Fluidez e Acessibilidade
Em voice mode, transform offset pode jitter em devices low-end;
Host.tsx e Remote.tsx misturam estados, podendo causar re-renders desnecessários.

Oportunidades de Melhoria:
Otimize Performance: Use useMemo mais em Host.tsx para memoizar states como prompterState — reduz re-renders em 50%.