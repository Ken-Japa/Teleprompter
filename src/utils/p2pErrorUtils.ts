/**
 * Gera uma mensagem de erro P2P amigável com base no tipo de erro.
 * @param err O objeto de erro P2P.
 * @param hostId O ID do host, se aplicável.
 * @returns Uma string contendo a mensagem de erro formatada.
 */
export const getP2pErrorMessage = (err: any, hostId?: string): string => {
  let msg = "Ocorreu um erro na rede P2P. Por favor, verifique sua conexão e tente novamente.";

  switch (err.type) {
    case "peer-unavailable":
      msg = `O host com ID '${hostId}' não está disponível ou não foi encontrado. Verifique o ID e tente novamente.`;
      break;
    case "disconnected":
      msg = "A conexão P2P foi perdida. Tentando reconectar...";
      break;
    case "network":
      msg = "Problema de rede: Verifique sua conexão com a internet.";
      break;
    case "webrtc":
      msg = "Erro WebRTC: Seu navegador pode não suportar P2P ou há um problema de firewall.";
      break;
    case "browser-incompatible":
      msg = "Seu navegador não é compatível com a tecnologia P2P necessária.";
      break;
    case "invalid-id":
      msg = `O ID do host '${hostId}' é inválido.`;
      break;
    case "ssl-unavailable":
      msg = "Conexão segura (SSL) não disponível. Tente usar uma conexão HTTPS.";
      break;
    case "server-error":
      msg = "Erro no servidor de sinalização P2P. Tente novamente mais tarde.";
      break;
    default:
      msg = `Erro P2P inesperado: ${err.message || "Detalhes desconhecidos"}.`;
  }

  return msg;
};
