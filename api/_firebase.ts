import * as admin from "firebase-admin";

if (!admin.apps.length) {
 try {
  // Use um fallback para strings vazias se 'process.env' estiver undefined
  const projectId = process.env.FIREBASE_PROJECT_ID || "";
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL || "";
  // Tratamento da chave privada
  const privateKey = (process.env.FIREBASE_PRIVATE_KEY || "").replace(/\\n/g, "\n");

  // Se qualquer variável crítica estiver faltando, falhe explicitamente.
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
  // O console.error no Vercel loga o erro de forma mais limpa.
  console.error("Firebase admin initialization error:", error);
 }
}

export const db = admin.firestore();
