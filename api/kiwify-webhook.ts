import type { VercelRequest, VercelResponse } from "@vercel/node";
import * as admin from "firebase-admin";
import { FieldValue } from "firebase-admin/firestore";
import { db } from "./_firebase.js";
import * as crypto from "crypto";

const verifySignature = (
 payload: object,
 signature: string | string[] | undefined,
 secret: string
): boolean => {
 if (!signature || typeof signature !== "string") return false;

 // 1. Stringify o objeto JSON (CONFORME DOCUMENTAÇÃO KIWIFY)
 // O Node.js/Vercel já fez o parse para 'payload', agora stringificamos para calcular a hash.
 const payloadString = JSON.stringify(payload);

 // 2. Calcula hmac_sha1 (CONFORME DOCUMENTAÇÃO KIWIFY)
 const hash = crypto.createHmac("sha1", secret).update(payloadString).digest("hex");

 // Compara a hash gerada localmente com a assinatura que veio na URL
 return hash === signature;
};

async function kiwifyHandler(req: VercelRequest, res: VercelResponse) {
 if (req.method !== "POST") {
  return res.status(405).json({ error: "Method not allowed" });
 }

 // A Vercel parseia automaticamente o corpo (req.body)
 const payload = req.body;

 // Assinatura vem na query string (URL)
 const signatureFromQuery = req.query.signature as string | undefined;
 const secret = process.env.KIWIFY_WEBHOOK_SECRET;

 if (secret && signatureFromQuery) {
  if (!verifySignature(payload, signatureFromQuery, secret)) {
   console.error("Invalid Kiwify signature");
   return res.status(401).json({ error: "Invalid signature" });
  }
  console.log("Kiwify signature successfully verified.");
 } else if (secret && !signatureFromQuery) {
  console.error("KIWIFY_WEBHOOK_SECRET is set, but signature is missing from query string.");
  return res.status(401).json({ error: "Signature missing" });
 } else {
  console.warn("KIWIFY_WEBHOOK_SECRET not set. Skipping signature verification.");
 }

 try {
  console.log("Kiwify Webhook received:", JSON.stringify(payload, null, 2));

  // Extrair email e chave
  const email = payload.Customer?.email || payload.email;
  const key = payload.access_token || payload.key || payload.code || payload.order_id;

  if (!email || !key) {
   console.warn("Missing email or key in payload");
   return res.status(400).json({ error: "Missing email or key in payload" });
  }

  // Salvar/Checar no Firestore
  const keysCollection = db.collection("keys");
  const snapshot = await keysCollection.where("key", "==", String(key)).limit(1).get();

  if (!snapshot.empty) {
   console.log("Key already exists:", key);
   return res.status(200).json({ success: true, message: "Key already exists" });
  }

  await keysCollection.add({
   key: String(key),
   email: email,
   status: "unused",
   createdAt: FieldValue.serverTimestamp(),
   source: "kiwify_webhook",
   originalPayload: payload,
  });

  console.log(`Key saved: ${key} for ${email}`);

  console.log(`Key saved: ${key} for ${email}`);

  return res.status(200).json({ success: true });
 } catch (error) {
  console.error("Webhook error:", error);
  return res.status(500).json({ error: "Internal server error" });
 }
}

export default kiwifyHandler;
