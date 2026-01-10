import type { VercelRequest, VercelResponse } from "@vercel/node";
import { FieldValue } from "firebase-admin/firestore";
import { db } from "./_firebase.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // CORS
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
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") return res.status(200).end();

    const { deviceId, action, trialData } = req.body;

    if (!deviceId) return res.status(400).json({ error: "deviceId is required" });

    try {
        const trialsCollection = db.collection("trials");

        if (req.method === "POST" && action === "start") {
            // Register new trial
            const snapshot = await trialsCollection.doc(deviceId).get();
            if (snapshot.exists) {
                const data = snapshot.data();
                return res.status(200).json({ success: true, trialData: data?.trialData, message: "Trial already active for this device" });
            }

            await trialsCollection.doc(deviceId).set({
                deviceId,
                trialData,
                startedAt: FieldValue.serverTimestamp(),
                expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
            });
            return res.status(200).json({ success: true });
        }

        if (req.method === "POST" && action === "get") {
            const snapshot = await trialsCollection.doc(deviceId).get();
            if (!snapshot.exists) return res.status(200).json({ success: false, message: "No trial found" });

            const data = snapshot.data();
            return res.status(200).json({ success: true, trialData: data?.trialData });
        }

        return res.status(405).json({ error: "Method not allowed" });
    } catch (error) {
        console.error("[TRIAL_SYNC_ERROR]", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
