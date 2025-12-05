import type { VercelRequest, VercelResponse } from "@vercel/node";
import * as admin from "firebase-admin";
import { db } from "./_firebase.js";
import * as crypto from "crypto";

const verifySignature = (
 rawBody: string,
 signature: string | string[] | undefined,
 secret: string
): boolean => {
 if (!signature || typeof signature !== "string") return false;

 const payloadString = rawBody;

 // Try SHA256 (common)
 const hash256 = crypto.createHmac("sha256", secret).update(payloadString).digest("hex");
 if (hash256 === signature) return true;

 // Try SHA1 (legacy)
 const hash1 = crypto.createHmac("sha1", secret).update(payloadString).digest("hex");
 if (hash1 === signature) return true;

 return false;
};

// Função auxiliar para obter o corpo RAW
const getRawBody = (req: VercelRequest): Promise<Buffer> => {
 return new Promise((resolve, reject) => {
  const bodyChunks: Uint8Array[] = [];
  req.on("data", (chunk) => bodyChunks.push(chunk));
  req.on("end", () => resolve(Buffer.concat(bodyChunks)));
  req.on("error", reject);
 });
};

async function kiwifyHandler(req: VercelRequest, res: VercelResponse) {
 if (req.method !== "POST") {
  return res.status(405).json({ error: "Method not allowed" });
 }

 // 1. Obter Corpo RAW
 const rawBodyBuffer = await getRawBody(req);
 const rawBody = rawBodyBuffer.toString("utf-8");

 // 2. Segurança: Verificação de Assinatura
 const secret = process.env.KIWIFY_WEBHOOK_SECRET;
 if (secret) {
  const signature = req.headers["x-kiwify-signature"];
  // Passa o rawBody (string) para verificação
  if (!verifySignature(rawBody, signature, secret)) {
   console.error("Invalid Kiwify signature");
   return res.status(401).json({ error: "Invalid signature" });
  }
 } else {
  console.warn("KIWIFY_WEBHOOK_SECRET not set. Skipping signature verification.");
 }

 try {
  // 3. Parsear o corpo RAW para obter o objeto JSON
  const payload = JSON.parse(rawBody);
  console.log("Kiwify Webhook received:", JSON.stringify(payload, null, 2));

  // 4. Extrair email e chave
  const email = payload.Customer?.email || payload.email; // Já corrigido para 'Customer' maiúsculo
  const key = payload.access_token || payload.key || payload.code || payload.order_id;

  if (!email || !key) {
   console.warn("Missing email or key in payload");
   return res.status(400).json({ error: "Missing email or key in payload" });
  }

  // 5. Salvar/Checar no Firestore
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
   createdAt: admin.firestore.FieldValue.serverTimestamp(),
   source: "kiwify_webhook",
   originalPayload: payload,
  });

  console.log(`Key saved: ${key} for ${email}`);

  return res.status(200).json({ success: true });
 } catch (error) {
  console.error("Webhook error:", error);
  return res.status(500).json({ error: "Internal server error" });
 }
}

// Configuração para desativar o parsing automático da Vercel
export const config = {
 api: {
  bodyParser: false,
 },
};

export default kiwifyHandler;
