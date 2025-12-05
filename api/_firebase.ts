import * as admin from "firebase-admin";

if (!admin.apps.length) {
 try {
  const config = {
   projectId: String(process.env.FIREBASE_PROJECT_ID || ""),
   clientEmail: String(process.env.FIREBASE_CLIENT_EMAIL || ""),
   // Mantenha o tratamento inteligente para a chave privada
   privateKey: String(process.env.FIREBASE_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
  };

  // Checagem para evitar a inicialização com valores vazios (que causaria o erro length)
  if (config.projectId === "" || config.clientEmail === "" || config.privateKey.length < 50) {
   throw new Error("Missing or invalid Firebase Environment Variables.");
  }

  admin.initializeApp({
   credential: admin.credential.cert(config),
  });
 } catch (error) {
  console.error("Firebase admin initialization error", error);
 }
}

export const db = admin.firestore();
