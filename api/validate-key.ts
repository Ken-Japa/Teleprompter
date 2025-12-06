import type { VercelRequest, VercelResponse } from "@vercel/node";
import { FieldValue } from "firebase-admin/firestore";
import { db } from "./_firebase.js";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Initialize Ratelimit if env vars are present
const redis =
 process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN ? Redis.fromEnv() : null;

// Define o limite de ativações
const DEVICE_LIMIT = 3;

if (redis) {
 console.log("[REDIS] Serviço Upstash Redis inicializado. Rate Limiting está ativo. 🛡️");
} else {
 console.warn("[REDIS] Variáveis UPSTASH não configuradas. Rate Limiting está DESATIVADO. ⚠️");
}

const ratelimit = redis
 ? new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(5, "1 h"),
    analytics: true,
   })
 : null;

export default async function handler(req: VercelRequest, res: VercelResponse) {
 // Allow CORS for local development or specific domains if needed
 res.setHeader("Access-Control-Allow-Credentials", "true");
 res.setHeader("Access-Control-Allow-Origin", "*");
 res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
 res.setHeader(
  "Access-Control-Allow-Headers",
  "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
 );

 if (req.method === "OPTIONS") {
  res.status(200).end();
  return;
 }

 if (req.method !== "POST") {
  return res.status(405).json({ error: "Method not allowed" });
 }

 // Rate Limiting
 if (ratelimit) {
  const ip = (req.headers["x-forwarded-for"] as string) || "127.0.0.1";
  const { success } = await ratelimit.limit(ip);
  if (!success) {
   return res.status(429).json({ success: false, message: "Muitas tentativas. Tente novamente mais tarde." });
  }
 }

 const { key } = req.body;

 if (!key) {
  return res.status(400).json({ success: false, message: "Chave é obrigatória." });
 }

 try {
  const keysCollection = db.collection("keys");
  const snapshot = await keysCollection.where("key", "==", key).limit(1).get();

  if (snapshot.empty) {
   return res.status(200).json({ success: false, message: "Chave inválida." });
  }

  const doc = snapshot.docs[0];
  const data = doc.data();

  const currentIP = (req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress || "unknown";
  // O campo devices pode não existir na primeira venda (se foi feita antes da atualização)
  const currentDevices: string[] = data.devices || [];

  // Cenário 1: Re-login no mesmo dispositivo. Sucesso imediato.
  if (currentDevices.includes(currentIP)) {
   return res.status(200).json({ success: true, message: "Acesso reativado com sucesso." });
  }

  // Cenário 2: Chave já usada e limite atingido.
  if (data.status === "active" && currentDevices.length >= DEVICE_LIMIT) {
   return res.status(200).json({
    success: false,
    message: `Limite de ${DEVICE_LIMIT} dispositivos atingido para esta chave.`,
   });
  }

  // Cenário 3: Primeiro uso ('unused') ou novo dispositivo dentro do limite.
  if (data.status === "unused" || currentDevices.length < DEVICE_LIMIT) {
   const updateData: { [key: string]: any } = {
    // Adiciona o IP atual à lista de dispositivos (usando FieldValue.arrayUnion)
    devices: FieldValue.arrayUnion(currentIP),
   };

   // Se for a primeira ativação, atualiza o status para 'active' e registra o timestamp.
   if (data.status === "unused") {
    updateData.status = "active";
    updateData.activatedAt = FieldValue.serverTimestamp();
    updateData.activatedByIp = currentIP; // IP da primeira ativação
   }

   // ATENÇÃO: Faz uma única atualização no Firestore com todos os dados.
   await doc.ref.update(updateData);

   return res.status(200).json({ success: true });
  }

  // Cenário 4: Qualquer outro status (revogado)
  return res.status(200).json({ success: false, message: "Chave inválida ou revogada." });
 } catch (error) {
  console.error("Error validating key:", error);
  return res.status(500).json({ success: false, message: "Erro interno no servidor." });
 }
}
