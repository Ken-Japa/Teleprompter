/**
 * @file analytics.ts
 * @description Funções para rastreamento de eventos com Google Analytics.
 *              Utiliza a API global 'gtag' injetada pelo script do GA4.
 */

declare global {
 interface Window {
  dataLayer: any[];
  gtag: (...args: any[]) => void;
 }
}

/**
 * Rastreia um evento personalizado no Google Analytics.
 * @param eventName O nome do evento a ser rastreado.
 * @param props Propriedades opcionais para o evento.
 */
function trackEvent(eventName: string, props?: Record<string, string | number | boolean>): void {
 if (typeof window.gtag === "function") {
  // GA4 event structure
  window.gtag("event", eventName, props);
 } else {
  console.warn(`Google Analytics not loaded. Event '${eventName}' not tracked.`);
 }
}

/**
 * Rastreia uma conexão bem-sucedida.
 */
export function trackSuccessfulConnection(): void {
 trackEvent("successful_connection");
}

/**
 * Rastreia um evento de conversão.
 * @param conversionType O tipo de conversão (ex: 'Signup', 'Upgrade').
 */
export function trackConversion(conversionType: string): void {
 trackEvent("conversion", { type: conversionType });
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
   // Enviar como evento 'usage_tick' ou métrica personalizada
   trackEvent("usage_heartbeat", { duration_seconds: durationInSeconds });
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
  trackEvent("session_duration", { duration_seconds: durationInSeconds });
  usageStartTime = null;
 }
}
