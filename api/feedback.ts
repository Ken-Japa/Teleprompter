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
    limiter: Ratelimit.slidingWindow(5, "1 h"), // 5 requests per hour
    analytics: true,
  })
  : null;

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
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST");
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
    const { success } = await ratelimit.limit(`feedback_${ip}`);
    if (!success) {
      return res.status(429).json({ success: false, message: "Too many requests. Try again later." });
    }
  }

  const { message, email, type } = req.body;

  if (!message || typeof message !== "string" || message.trim().length === 0) {
    return res.status(400).json({ success: false, message: "Message is required." });
  }

  try {
    const feedbackCollection = db.collection("feedbacks");

    // Get IP for security/spam tracking
    const ip = (req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress || "unknown";

    await feedbackCollection.add({
      message: message.trim(),
      email: email ? email.trim() : null,
      type: type || "general",
      createdAt: FieldValue.serverTimestamp(),
      ip: ip,
      userAgent: req.headers["user-agent"] || "unknown",
    });

    return res.status(200).json({ success: true, message: "Feedback received." });
  } catch (error) {
    console.error("Error saving feedback:", error);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
}
