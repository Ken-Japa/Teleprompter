/**
 * Utility to detect if the current device is running iOS.
 */
export const isIOS = (): boolean => {
    return (
        ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(navigator.platform) ||
        // iPad on iOS 13 detection
        (navigator.userAgent.includes("Mac") && "ontouchend" in document)
    );
};

/**
 * Utility to detect if the current browser is Safari.
 */
export const isSafari = (): boolean => {
    const userAgent = navigator.userAgent;
    return /^((?!chrome|android).)*safari/i.test(userAgent);
};
