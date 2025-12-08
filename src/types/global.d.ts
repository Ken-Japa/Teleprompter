interface Window {
  Peer: any;
  QRCode: any;
  NoSleep: any;
  SpeechRecognition: any;
  webkitSpeechRecognition: any;
  requestIdleCallback: ((callback: IdleRequestCallback, options?: IdleRequestOptions) => number) & typeof requestIdleCallback;
  cancelIdleCallback: ((handle: number) => void) & typeof cancelIdleCallback;
}
