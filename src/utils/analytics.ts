/**
 * @file analytics.ts
 * @description Funções para rastreamento de eventos com Plausible Analytics.
 *              Utiliza a API global 'plausible' injetada pelo script do Plausible.
 */

declare global {
  interface Window {
    plausible: ((eventName: string, options?: PlausibleOptions) => void) | undefined;
  }
}

interface PlausibleOptions {
  props?: Record<string, string | number | boolean>;
  callback?: () => void;
  // Adicione outras opções do Plausible se necessário
}

/**
 * Rastreia um evento personalizado no Plausible Analytics.
 * @param eventName O nome do evento a ser rastreado.
 * @param props Propriedades opcionais para o evento.
 */
function trackEvent(eventName: string, props?: Record<string, string | number | boolean>): void {
  if (window.plausible) {
    window.plausible(eventName, { props });
  } else {
    console.warn(`Plausible not loaded. Event '${eventName}' not tracked.`);
  }
}

/**
 * Rastreia uma conexão bem-sucedida.
 */
export function trackSuccessfulConnection(): void {
  trackEvent('Successful Connection');
}

/**
 * Rastreia um evento de conversão.
 * @param conversionType O tipo de conversão (ex: 'Signup', 'Upgrade').
 */
export function trackConversion(conversionType: string): void {
  trackEvent('Conversion', { type: conversionType });
}

let usageInterval: ReturnType<typeof setInterval> | null = null;
let usageStartTime: number | null = null;

/**
 * Inicia o rastreamento do tempo de uso.
 * Deve ser chamado quando o usuário inicia uma sessão ativa.
 */
export function startUsageTracking(): void {
  if (usageInterval) {
    clearInterval(usageInterval);
  }
  usageStartTime = Date.now();
  usageInterval = setInterval(() => {
    if (usageStartTime) {
      const durationInSeconds = Math.floor((Date.now() - usageStartTime) / 1000);
      trackEvent('Usage Time', { duration: durationInSeconds });
    }
  }, 30000); // Rastreia a cada 30 segundos
}

/**
 * Para o rastreamento do tempo de uso e envia o evento final.
 * Deve ser chamado quando o usuário encerra a sessão ativa.
 */
export function stopUsageTracking(): void {
  if (usageInterval) {
    clearInterval(usageInterval);
    usageInterval = null;
  }
  if (usageStartTime) {
    const durationInSeconds = Math.floor((Date.now() - usageStartTime) / 1000);
    trackEvent('Usage Time', { duration: durationInSeconds });
    usageStartTime = null;
  }
}
