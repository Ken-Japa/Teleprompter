import admin from "firebase-admin";

// 🚨 Mudança Crítica: Checa se apps existe antes de ler length
if (!(admin.apps && admin.apps.length)) {
 try {
  const projectId = process.env.FIREBASE_PROJECT_ID || "";
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL || "";
  // Tratamento da chave privada (Esperando o formato de linha única com \n)
  const privateKey = (process.env.FIREBASE_PRIVATE_KEY || "").replace(/\\n/g, "\n");

  // Checagem para falhar antes do Admin SDK
  if (!projectId || !clientEmail || privateKey.length < 50) {
   throw new Error("Missing critical Firebase ENV variables.");
  }

  admin.initializeApp({
   credential: admin.credential.cert({
    projectId: projectId,
    clientEmail: clientEmail,
    privateKey: privateKey,
   }),
  });
 } catch (error) {
  console.error("Firebase admin initialization error:", error);
 }
}

export const db = admin.firestore();
