interface Window {
  togglePro: () => void;
  showPaywallModal: () => void;
  Peer: any;
  QRCode: any;
  NoSleep: any;
  requestIdleCallback: (
    callback: (deadline: { readonly didTimeout: boolean; timeRemaining: () => number }) => void,
    opts?: { timeout?: number }
  ) => number;
  cancelIdleCallback: (handle: number) => void;
}
