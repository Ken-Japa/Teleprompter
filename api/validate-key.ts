import type { VercelRequest, VercelResponse } from "@vercel/node";
import { FieldValue } from "firebase-admin/firestore";
import { db } from "./_firebase.js";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Initialize Ratelimit if env vars are present
const redis =
 process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN ? Redis.fromEnv() : null;

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

  if (data.status === "active") {
   return res.status(200).json({ success: false, message: "Esta chave já foi utilizada." });
  }

  if (data.status === "unused") {
   // Mark as active
   await doc.ref.update({
    status: "active",
    // 🚨 USO CORRIGIDO: Usa FieldValue importado
    activatedAt: FieldValue.serverTimestamp(),
    activatedByIp: req.headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown",
   });
   return res.status(200).json({ success: true });
  }

  return res.status(200).json({ success: false, message: "Chave inválida ou revogada." });
 } catch (error) {
  console.error("Error validating key:", error);
  return res.status(500).json({ success: false, message: "Erro interno no servidor." });
 }
}
