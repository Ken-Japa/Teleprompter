import type { VercelRequest, VercelResponse } from '@vercel/node';
import * as admin from 'firebase-admin';
import { db } from './_firebase';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const payload = req.body;
    console.log('Kiwify Webhook received:', JSON.stringify(payload, null, 2));

    // Extract email and access code
    // Note: The exact field name for the access code depends on Kiwify's specific configuration
    // for "Deliverables" or if it's passed as a custom parameter.
    // We check for common fields.
    const email = payload.customer?.email || payload.email;
    
    // Assuming Kiwify sends the code in a field named 'access_token', 'key', or 'product_key'.
    // If the user configured Kiwify to send the 'order_id' as the key, we use that.
    // Ideally, we should check the Kiwify documentation or the specific setup.
    // For now, we try to find a key-like field.
    const key = payload.access_token || payload.key || payload.code || payload.order_id;

    if (!email || !key) {
        console.warn('Missing email or key in payload');
        return res.status(400).json({ error: 'Missing email or key in payload' });
    }

    // Check if key already exists to avoid duplicates
    const keysCollection = db.collection('keys');
    const snapshot = await keysCollection.where('key', '==', String(key)).limit(1).get();

    if (!snapshot.empty) {
        console.log('Key already exists:', key);
        return res.status(200).json({ success: true, message: 'Key already exists' });
    }

    // Save to Firestore
    await keysCollection.add({
        key: String(key),
        email: email,
        status: 'unused',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        source: 'kiwify_webhook',
        originalPayload: payload
    });

    console.log(`Key saved: ${key} for ${email}`);

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
