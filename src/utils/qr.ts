

export const loadHtml5QrcodeLibrary = (): Promise<void> => {
    return new Promise((resolve, reject) => {
        if (window.Html5QrcodeScanner) {
            resolve();
            return;
        }

        const script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/html5-qrcode/2.3.8/html5-qrcode.min.js";
        script.async = true;
        script.onload = () => {
            resolve();
        };
        script.onerror = () => {
            console.error("Failed to load html5-qrcode library.");
            reject(new Error("Failed to load html5-qrcode library."));
        };
        document.head.appendChild(script);
    });
};

declare global {
    interface Window {

        Html5QrcodeScanner: any;
        Html5Qrcode: any;
    }
}
