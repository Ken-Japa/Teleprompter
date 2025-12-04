interface Window {
  togglePro: () => void;
  showPaywallModal: () => void;
  QRCode: any;
  requestIdleCallback: (
    callback: (deadline: { readonly didTimeout: boolean; timeRemaining: () => number }) => void,
    opts?: { timeout?: number }
  ) => number;
  cancelIdleCallback: (handle: number) => void;
}
