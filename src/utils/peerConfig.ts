/**
 * Configuração centralizada para conexões PeerJS (WebRTC).
 * Inclui lista de servidores STUN públicos para melhorar a conectividade através de NATs.
 */
import { PeerJSOption } from "peerjs";

export const PEER_CONFIG: PeerJSOption = {
 config: {
  iceServers: [
   // Google - Servidor STUN confiável e amplamente usado
   { urls: "stun:stun.l.google.com:19302" },
   // Mozilla - Servidor STUN público
   { urls: "stun:stun.services.mozilla.com" },
   // Twilio - Servidor STUN público (TURN requer credenciais pagas)
   { urls: "stun:global.stun.twilio.com:3478" },
   // OpenRelay - Free TURN Project
   {
    urls: "turn:openrelay.metered.ca:80",
    username: "openrelayproject",
    credential: "openrelayproject",
   },
  ],
 },
 // Debug level: 0=none, 1=errors, 2=warnings, 3=all
 debug: 1,
};
