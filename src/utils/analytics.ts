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
import * as Sentry from "@sentry/react";

/**
 * Sets the analytics storage consent status based on user activity.
 * When inactive (isActive=false), we deny 'analytics_storage' to stop engagement time tracking.
 * @param isActive Whether the user is currently active.
 */
export function setAnalyticsActive(isActive: boolean): void {
    if (typeof window.gtag === "function") {
        const consentState = isActive ? 'granted' : 'denied';
        console.log(`📊 Analytics consent ${isActive ? 'resumed' : 'paused'} (analytics_storage: ${consentState})`);

        window.gtag('consent', 'update', {
            'analytics_storage': consentState
        });
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
        window.gtag("event", eventName, props || {});
    } else {
        // Fallback: Queue directly to dataLayer if gtag() is not ready yet
        // This ensures zero event loss even if scripts are slow
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            'event': eventName,
            ...props
        });
        console.warn(`GA shim not found. Queued '${eventName}' directly to dataLayer.`);
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
    // Send to Google Analytics
    trackEvent("app_error", { error_type: errorType, message: message });

    // Send to Sentry (if initialized)
    if (Sentry.isInitialized()) {
        Sentry.captureException(new Error(message), {
            tags: { error_type: errorType },
        });
    }
}

/**
 * Rastreia a abertura de um script via URL ou seleção.
 * @param source A origem do script (ex: 'url_param', 'selection').
 */
export function trackOpenScript(source: string): void {
    trackEvent("open_script", { source });
}

/**
 * Rastreia o início da apresentação (pacing).
 * @param speed A velocidade definida.
 * @param mode O modo de controle (ex: 'auto', 'voice', 'remote').
 */
export function trackStartPacing(speed: number, mode: string): void {
    trackEvent("start_pacing", { speed_start: speed, mode });
}

/**
 * Rastreia o término da leitura (chegou ao fim do texto).
 * @param duration O tempo total da leitura em segundos.
 */
export function trackFinishReading(duration: number): void {
    trackEvent("finish_reading", { duration_seconds: duration });
}

/**
 * Rastreia quando um dispositivo remoto se conecta com sucesso.
 * @param role O papel do dispositivo ('host' ou 'remote').
 */
export function trackRemoteConnected(role: 'host' | 'remote'): void {
    trackEvent("remote_connected", { role });
}

/**
 * Rastreia a conversão de compra/resgate de chave no Google Ads.
 * @param transactionId ID da transação (opcional).
 */
export function trackGoogleAdsPurchase(transactionId: string = ''): void {
    if (typeof window.gtag === "function") {
        window.gtag('event', 'conversion', {
            'send_to': 'AW-17795014366/RdpSCO2kvdEbEN69qaVC',
            'transaction_id': transactionId
        });
    } else {
        console.warn("Google Analytics (gtag) not loaded. Conversion not tracked.");
    }
}

/**
 * Rastreia o interesse de compra (clique no botão de comprar) no Google Ads.
 * Utiliza callback para redirecionar após o evento ser registrado.
 * @param url A URL de destino (página de checkout).
 */
export function trackGoogleAdsInterest(url: string): void {
    const callback = () => {
        if (typeof url !== 'undefined') {
            window.location.href = url;
        }
    };

    if (typeof window.gtag === "function") {
        window.gtag('event', 'conversion', {
            'send_to': 'AW-17795014366/_3RZCNLTxtEbEN69qaVC',
            'event_callback': callback
        });
    } else {
        // Fallback se o GA não estiver carregado
        console.warn("Google Analytics (gtag) not loaded. Redirecting without tracking.");
        callback();
    }

    // return false; 
}

/**
 * Rastreia a micro-conversão de usuário engajado (uso por > 3min + rolagem).
 */
export function trackEngagedUser(): void {
    trackEvent("micro_conversion_engaged_user", {
        duration_minutes: 3,
        product_status: 'freemium'
    });
}
