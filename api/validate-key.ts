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
    "http://localhost:3000",
    "http://localhost:5173"
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
        await sendWelcomeEmail(data.email);
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
