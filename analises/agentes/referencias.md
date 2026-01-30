# Referencias Tecnicas & Detalhamento

### REFERÊNCIAS

### REFERÊNCIAS

### [FEAT-001] - Controle e Gerenciamento Multi-Teleprompter para Eventos (Master/Receiver)
- **Origem:** `growth_strategy_report.md`
- **Contexto:** Demanda por setups multi-dispositivo para gerenciamento remoto em eventos e estúdios.
- **Sugestão:** Interface onde um operador gerencia múltiplos displays (receivers) sincronizados via P2P.

### [FEAT-002] - Gerador de Legendas Automáticas (SRT/VTT) Pós-Gravação via IA
- **Origem:** `growth_strategy_report.md`
- **Contexto:** Aproveitar o Voice Control e Gravação para gerar transcrições automáticas, agregando valor pós-produção.
- **Sugestão:** Implementar transcrição local (Whisper ou similar) para exportação de legendas.

### [FEAT-003] - Modo de Compatibilidade Otimizado (Lite Mode)
- **Origem:** `growth_strategy_report.md` / `product_diagnosis.md`
- **Contexto:** Relatos de crashes e rolagem instável em tablets antigos.
- **Sugestão:** Versão do PWA com efeitos visuais reduzidos e renderização simplicada para hardware limitado.

### [SEO-001] - Corrigir problema de H1 duplicado/ausente
- **Origem:** `seo_diagnosis_report.md` + Pesquisa Técnica
- **Contexto:** Conflito identificado entre o `Header` (Logotipo como H1 oculto) e o `SeoPageLayout` (H1 da página).
- **Sugestão:** Garantir apenas um H1 semântico por página. Remover H1 do Logotipo.

### [SEO-002] - Otimizar Landing Pages: YouTube Scripts, WebRTC e Modo Músico
- **Origem:** `optimization_report.md`
- **Contexto:** Desalinhamento entre intenção de busca ("scripts para youtube") e conteúdo (leitor de scripts).
- **Sugestão:** Reorientar copy para "Como usar teleprompter para vídeos" e destacar USP de <10ms no WebRTC.

### [SEO-003] - Implementar Novas Landings: Eventos profissionais e Checklist Pré-Gravação
- **Origem:** `growth_strategy_report.md`
- **Contexto:** Gaps de busca para termos B2B e preparativos técnicos.
- **Sugestão:** Criar LPs focadas em "Teleprompter para Operadores de Eventos" e checklists de prontidão técnica.

### [TECH-001] - Otimizar a integração de tecnologia P2P e recursos PRO (Onboarding)
- **Origem:** `product_diagnosis.md`
- **Contexto:** Abismo entre `app_launched` e `teleprompter_play`.
- **Sugestão:** Melhorar o tour guiado e tornar a descoberta do controle remoto P2P mais intuitiva.

### [DEV-001] - Implementar Integração Nativa com OBS Studio via WebSocket
- **Origem:** `growth_strategy_report.md`
- **Contexto:** Evolução do Chroma Key atual para overlays transparentes nativos.
- **Sugestão:** Plugin ou conexão WebSocket para controle de cena via PromptNinja.

### [DEV-002] - Ferramentas de Diagnóstico e Teste de Performance Pré-Sessão
- **Origem:** `growth_strategy_report.md`
- **Contexto:** Ansiedade técnica de usuários em lives/eventos.
- **Sugestão:** Overlay de teste de CPU, Rede (WebRTC) e Estabilidade antes do início da leitura.

### [CON-001] - Melhorar a comunicação do valor premium (Diferenciação Free vs Pro)
- **Origem:** `seo_diagnosis_report.md` / `product_diagnosis.md`
- **Contexto:** Falta de clareza sobre o que é grátis e o que exige licença (ex: Voice Control).
- **Sugestão:** Adicionar badges PRO claros e página de comparação de planos.
