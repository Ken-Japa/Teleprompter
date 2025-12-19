# 🔍 Guia de Integração com Sentry (Opcional)

## Por que Sentry?

O Sentry oferece monitoramento de erros avançado que vai além do que o Google Analytics pode fazer:

- ✅ **Stack traces completos** com source maps
- ✅ **Session Replay** (ver o que o usuário fez antes do crash)
- ✅ **Alertas em tempo real** (email/Slack quando erros ocorrem)
- ✅ **Agrupamento de erros** (identifica bugs recorrentes)
- ✅ **Performance monitoring** (detecta lentidão)
- ✅ **Plano gratuito** (até 5.000 eventos/mês)

---

## 📦 Instalação

```bash
npm install @sentry/react
```

---

## ⚙️ Configuração

### 1. Criar arquivo de configuração do Sentry

Crie `src/utils/sentry.ts`:

```typescript
import * as Sentry from "@sentry/react";

export const initSentry = () => {
    // Only initialize in production
    if (import.meta.env.PROD && import.meta.env.VITE_SENTRY_DSN) {
        Sentry.init({
            dsn: import.meta.env.VITE_SENTRY_DSN,
            
            // Integrations
            integrations: [
                new Sentry.BrowserTracing({
                    // Set `tracePropagationTargets` to control performance monitoring
                    tracePropagationTargets: ["localhost", /^https:\/\/promptninja\.solutionkit\.com\.br/],
                }),
                new Sentry.Replay({
                    maskAllText: false,
                    blockAllMedia: false,
                }),
            ],

            // Performance Monitoring
            tracesSampleRate: 0.1, // Capture 10% of transactions for performance monitoring
            
            // Session Replay
            replaysSessionSampleRate: 0.1, // Sample 10% of sessions normally
            replaysOnErrorSampleRate: 1.0, // Sample 100% of sessions with errors

            // Environment
            environment: import.meta.env.MODE,
            
            // Release tracking (opcional - útil para identificar bugs por versão)
            // release: "promptninja@1.0.0",

            // Ignore common non-critical errors
            ignoreErrors: [
                "ResizeObserver loop limit exceeded",
                "Non-Error promise rejection captured",
            ],
        });
    }
};
```

### 2. Atualizar `src/index.tsx`

Adicione no início do arquivo (antes de renderizar o App):

```typescript
import { initSentry } from "./utils/sentry";

// Initialize Sentry before anything else
initSentry();
```

### 3. Integrar com `trackError` existente

Atualize `src/utils/analytics.ts`:

```typescript
import * as Sentry from "@sentry/react";

export function trackError(errorType: string, message: string): void {
    // Send to Google Analytics
    trackEvent("app_error", { error_type: errorType, message: message });
    
    // Send to Sentry (if initialized)
    if (Sentry.isInitialized()) {
        Sentry.captureException(new Error(message), {
            tags: { error_type: errorType },
        });
    }
}
```

### 4. Atualizar ErrorBoundary para usar Sentry

Em `src/components/ui/ErrorBoundary.tsx`, adicione no `componentDidCatch`:

```typescript
import * as Sentry from "@sentry/react";

componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log to analytics
    trackError("react_render_error", error.message);

    // Send to Sentry with full context
    if (Sentry.isInitialized()) {
        Sentry.captureException(error, {
            contexts: {
                react: {
                    componentStack: errorInfo.componentStack,
                },
            },
        });
    }

    // Log to console for debugging
    console.error("ErrorBoundary caught an error:", error, errorInfo);

    // Update state with error details
    this.setState({ error, errorInfo });
}
```

---

## 🔑 Configurar Variáveis de Ambiente

Adicione no seu `.env.local`:

```env
# Sentry DSN (opcional - deixe vazio se não quiser usar Sentry)
VITE_SENTRY_DSN=https://seu_dsn_sentry_aqui@sentry.io/projeto_id
```

Para obter seu DSN:
1. Crie uma conta gratuita em [sentry.io](https://sentry.io)
2. Crie um novo projeto React
3. Copie o DSN fornecido

---

## 🧪 Testando a Integração

### Testar ErrorBoundary

Adicione um botão temporário para forçar um erro:

```typescript
<button onClick={() => { throw new Error("Test ErrorBoundary"); }}>
  Testar ErrorBoundary
</button>
```

### Testar Global Error Handler

```typescript
<button onClick={() => { 
  setTimeout(() => { throw new Error("Test global error"); }, 100);
}}>
  Testar Global Error
</button>
```

### Testar Unhandled Promise Rejection

```typescript
<button onClick={() => { 
  Promise.reject("Test promise rejection");
}}>
  Testar Promise Rejection
</button>
```

---

## 📊 Verificar no Dashboard do Sentry

Após gerar erros de teste:

1. Acesse [sentry.io](https://sentry.io)
2. Vá para **Issues** → você verá os erros capturados
3. Clique em um erro para ver:
   - Stack trace completo
   - Breadcrumbs (ações do usuário antes do erro)
   - Session replay (se habilitado)
   - Device info (browser, OS, etc.)

---

## 🎯 Boas Práticas

### 1. Adicionar Contexto aos Erros

```typescript
Sentry.setUser({
  id: "user_12345",
  isPro: true,
});

Sentry.setContext("app_state", {
  currentView: "HOST",
  p2pConnected: true,
});
```

### 2. Criar Alertas

No dashboard do Sentry:
- **Settings** → **Alerts** → **Create Alert Rule**
- Configure para receber email quando um erro específico acontecer

### 3. Source Maps

Para ver o código fonte original (não minificado) no Sentry, configure source maps no build.

Atualize `vite.config.ts`:

```typescript
build: {
    sourcemap: true, // Gera source maps para produção
}
```

E instale o plugin do Sentry para upload automático:

```bash
npm install @sentry/vite-plugin --save-dev
```

---

## 🚀 Próximos Passos

1. **Criar conta no Sentry** (gratuito)
2. **Instalar dependências**: `npm install @sentry/react`
3. **Configurar DSN** no `.env.local`
4. **Testar** com erros forçados
5. **Verificar** no dashboard do Sentry

---

## ⚠️ Nota Importante

A integração com Sentry é **completamente opcional**. O sistema de error handling (ErrorBoundary + Global Handlers) já está implementado e funciona perfeitamente com o Google Analytics. O Sentry apenas **adiciona** recursos avançados de debugging.

Se você não configurar o Sentry, tudo continuará funcionando normalmente - os erros serão apenas enviados para o GA4.
