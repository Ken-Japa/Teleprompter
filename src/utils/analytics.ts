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
export function trackEvent(eventName: string, props?: Record<string, string | number | boolean>): void {
    if (typeof window.gtag === "function") {
        // GA4 event structure
        window.gtag("event", eventName, props);
    } else {
        console.warn(`Google Analytics not loaded. Event '${eventName}' not tracked.`);
    }
}

/**
 * Rastreia alterações nas configurações do teleprompter.
 * @param settingName O nome da configuração alterada (ex: 'speed', 'fontSize', 'mirrorMode').
 * @param value O novo valor da configuração.
 */
export function trackSettingChange(settingName: string, value: string | number | boolean): void {
    trackEvent("setting_changed", { setting_name: settingName, value });
}

/**
 * Rastreia o início da rolagem do teleprompter.
 * @param speed A velocidade inicial da rolagem.
 */
export function trackTeleprompterPlay(speed: number): void {
    trackEvent("teleprompter_play", { speed_start: speed });
}

/**
 * Rastreia a pausa da rolagem do teleprompter.
 * @param durationSinceStart O tempo em segundos desde o início da rolagem.
 */
export function trackTeleprompterPause(durationSinceStart: number): void {
    trackEvent("teleprompter_pause", { duration_since_start: durationSinceStart });
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
    }, 60000); // Rastreia a cada minuto
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

let pageUsageInterval: ReturnType<typeof setInterval> | null = null;
let pageUsageStartTime: number | null = null;

/**
 * Inicia o rastreamento do tempo de visualização da página (Host).
 * Rastreia independentemente da conexão.
 */
export function startPageUsageTracking(): void {
    if (pageUsageInterval) {
        clearInterval(pageUsageInterval);
    }
    pageUsageStartTime = Date.now();
    pageUsageInterval = setInterval(() => {
        if (pageUsageStartTime) {
            const durationInSeconds = Math.floor((Date.now() - pageUsageStartTime) / 1000);
            trackEvent("page_heartbeat", { duration_seconds: durationInSeconds });
        }
    }, 60000); // Rastreia a cada minuto
}

/**
 * Para o rastreamento do tempo de visualização da página.
 */
export function stopPageUsageTracking(): void {
    if (pageUsageInterval) {
        clearInterval(pageUsageInterval);
        pageUsageInterval = null;
    }
    if (pageUsageStartTime) {
        const durationInSeconds = Math.floor((Date.now() - pageUsageStartTime) / 1000);
        trackEvent("page_duration", { duration_seconds: durationInSeconds });
        pageUsageStartTime = null;
    }
}

/**
 * Rastreia erros na aplicação.
 * @param errorType O tipo de erro (ex: 'p2p_connection', 'voice_api').
 * @param message A mensagem de erro ou detalhes.
 */
export function trackError(errorType: string, message: string): void {
    trackEvent("app_error", { error_type: errorType, message: message });
}

