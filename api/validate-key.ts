import type { VercelRequest, VercelResponse } from "@vercel/node";
import * as admin from "firebase-admin";
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
 // In Vercel, this is often handled by vercel.json, but adding headers here helps.
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
  // Query the 'keys' collection for the provided key string
  // Assuming the document structure is { key: "ABC-123", status: "unused" | "active", email: "..." }
  // Alternatively, the document ID could be the key itself.
  // Using a query is safer if keys are generated elsewhere and just stored as fields.
  const keysCollection = db.collection("keys");
  const snapshot = await keysCollection.where("key", "==", key).limit(1).get();

  if (snapshot.empty) {
   // Key not found
   return res.status(200).json({ success: false, message: "Chave inválida." });
  }

  const doc = snapshot.docs[0];
  const data = doc.data();

  // Check status
  if (data.status === "active") {
   return res.status(200).json({ success: false, message: "Esta chave já foi utilizada." });
  }

  if (data.status === "unused") {
   // Mark as active
   await doc.ref.update({
    status: "active",
    activatedAt: admin.firestore.FieldValue.serverTimestamp(),
    // We could capture IP or User Agent here for security
    activatedByIp: req.headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown",
   });
   return res.status(200).json({ success: true });
  }

  // Any other status (e.g. 'revoked')
  return res.status(200).json({ success: false, message: "Chave inválida ou revogada." });
 } catch (error) {
  console.error("Error validating key:", error);
  return res.status(500).json({ success: false, message: "Erro interno no servidor." });
 }
}
