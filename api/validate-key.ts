import type { VercelRequest, VercelResponse } from "@vercel/node";
import { FieldValue } from "firebase-admin/firestore";
import { db } from "./_firebase.js";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";
import { APP_CONSTANTS } from "./_config.js";

// Initialize Ratelimit if env vars are present
const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN ? Redis.fromEnv() : null;

// Define o limite de ativações
const DEVICE_LIMIT = APP_CONSTANTS.DEVICE_AUTHENTICATION_LIMIT;

const ratelimit = redis
  ? new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(5, "1 h"),
    analytics: true,
  })
  : null;

const mailersendApiKey = process.env.MAILERSEND_API_KEY;

const mailerSend = mailersendApiKey
  ? new MailerSend({
    apiKey: mailersendApiKey,
  })
  : null;

const sendWelcomeEmail = async (toEmail: string) => {
  if (!mailerSend) {
    console.log(`[EMAIL IGNORADO] E-mail de boas-vindas para ${toEmail} (API Key ausente).`);
    return;
  }

  const sender = new Sender("welcome@solutionkit.com.br", "PromptNinja");
  const recipients = [new Recipient(toEmail)];

  const emailParams = new EmailParams()
    .setFrom(sender)
    .setTo(recipients)
    .setSubject("Bem-vindo(a)! Seu Acesso PRO Está Ativo 🎉")
    .setHtml(
      `
            <p>Seu acesso profissional ao PromptNinja foi ativado com sucesso! Você já pode desfrutar de todos os recursos premium.</p>
            <p>Clique aqui para começar:</p>
            <p><a href="https://promptninja.solutionkit.com.br">Acessar PromptNinja Agora</a></p>
            <p>Se tiver qualquer dúvida, estamos à disposição para ajudar.</p>
        `
    )
    .setText(`Seu acesso Pro foi ativado! Acesse seu site para começar.`);

  try {
    await mailerSend.email.send(emailParams);
    console.log(`Welcome email sent successfully to: ${toEmail} via MailerSend.`);
  } catch (error) {
    console.error("Error sending welcome email via MailerSend:", error);
  }
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Allow CORS for local development or specific domains
  const origin = req.headers.origin;
  const allowedOrigins = [
    "https://promptninja.solutionkit.com.br",
    "https://music.solutionkit.com.br",
  ];

  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else {
    res.setHeader("Access-Control-Allow-Origin", "https://promptninja.solutionkit.com.br");
  }

  res.setHeader("Access-Control-Allow-Credentials", "true");
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

  const { key, deviceId: providedDeviceId } = req.body;

  if (!key) {
    return res.status(400).json({ success: false, message: "Chave é obrigatória.", reason: "missing_key" });
  }

  try {
    const keysCollection = db.collection("keys");
    let snapshot = await keysCollection.where("key", "==", key).limit(1).get();

    // Fallback 1: Try Lowercase (if original wasn't lowercase)
    if (snapshot.empty && key !== key.toLowerCase()) {
      console.log(`[VALIDATION_RETRY] Key not found exactly. Trying lowercase: ${key.toLowerCase()}`);
      snapshot = await keysCollection.where("key", "==", key.toLowerCase()).limit(1).get();
    }

    // Fallback 2: Try Uppercase (if original wasn't uppercase)
    if (snapshot.empty && key !== key.toUpperCase()) {
      console.log(`[VALIDATION_RETRY] Key not found exactly/lower. Trying uppercase: ${key.toUpperCase()}`);
      snapshot = await keysCollection.where("key", "==", key.toUpperCase()).limit(1).get();
    }

    if (snapshot.empty) {
      console.warn(`[VALIDATION_FAIL] Key not found (after retries): ${key}`);
      return res.status(200).json({
        success: false,
        message: "Chave não encontrada. Verifique se digitou corretamente ou cheque seu e-mail da Kiwify (spam inclusive).",
        reason: "invalid_key"
      });
    }

    const doc = snapshot.docs[0];
    const data = doc.data();

    // Determine device ID: Prefer provided deviceId (fingerprint), fallback to IP
    const currentIP = (req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress || "unknown";
    const deviceId = providedDeviceId || currentIP;

    // Existing devices: Handle both old string array and new object array formats
    let devices: { id: string, lastSeen: number }[] = [];
    if (Array.isArray(data.devices)) {
      devices = data.devices.map((d: any) => {
        if (typeof d === 'string') return { id: d, lastSeen: data.activatedAt ? data.activatedAt.toMillis?.() || Date.now() : Date.now() };
        return d;
      });
    }

    const sixMonthsAgo = Date.now() - (6 * 30 * 24 * 60 * 60 * 1000);

    // Filter out inactive devices (older than 6 months)
    const activeDevices = devices.filter(d => d.lastSeen > sixMonthsAgo);
    const existingDeviceIndex = activeDevices.findIndex(d => d.id === deviceId);

    // Scenario 1: Re-login on the same device.
    if (existingDeviceIndex !== -1) {
      // Update lastSeen for this device
      activeDevices[existingDeviceIndex].lastSeen = Date.now();
      await doc.ref.update({ devices: activeDevices });
      return res.status(200).json({ success: true, message: "Acesso reativado com sucesso." });
    }

    // Scenario 2: Limit reached with active devices.
    if (data.status === "active" && activeDevices.length >= DEVICE_LIMIT) {
      console.warn(`[VALIDATION_FAIL] Limit reached for key: ${key}. IPs/Devices: ${activeDevices.length}`);
      return res.status(200).json({
        success: false,
        message: `Limite de ${DEVICE_LIMIT} dispositivos atingido. Se você trocou de aparelho ou formatou o PC, contate o suporte para resetar seus acessos.`,
        reason: "device_limit"
      });
    }

    // Scenario 3: First use or new device within limit.
    const newDevice = { id: deviceId, lastSeen: Date.now() };
    const updatedDevices = [...activeDevices, newDevice];

    const updateData: { [key: string]: any } = {
      devices: updatedDevices,
    };

    if (data.status === "unused") {
      updateData.status = "active";
      updateData.activatedAt = FieldValue.serverTimestamp();
      updateData.activatedByIp = currentIP;
      await sendWelcomeEmail(data.email);
    }

    await doc.ref.update(updateData);
    console.log(`[VALIDATION_SUCCESS] Key ${key} activated on device ${deviceId}`);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("[VALIDATION_ERROR] Error validating key:", error);
    return res.status(500).json({ success: false, message: "Erro interno no servidor. Tente novamente em instantes.", reason: "server_error" });
  }
}
