import crypto from 'crypto';
import fetch from 'node-fetch';

/**
 * Calculates Kiwify signature
 * @param {object} payload 
 * @param {string} secret 
 * @returns {string}
 */
function calculateSignature(payload, secret) {
    const payloadString = JSON.stringify(payload);
    return crypto.createHmac('sha1', secret).update(payloadString).digest('hex');
}

async function testWebhook() {
    const email = process.argv[2] || 'kenjapa@gmail.com';
    const secret = process.env.KIWIFY_WEBHOOK_SECRET || 'YOUR_SECRET_HERE';
    const url = process.argv[3] || 'https://promptninja.solutionkit.com.br/api/kiwify-webhook';

    const payload = {
        order_id: `test-${Date.now()}`,
        order_status: 'paid',
        Customer: {
            full_name: 'Test User',
            email: email
        },
        Product: {
            product_name: 'PromptNinja PRO Test'
        }
    };

    const signature = calculateSignature(payload, secret);
    const fullUrl = `${url}?signature=${signature}`;

    console.log(`Sending test webhook to: ${fullUrl}`);
    console.log(`Payload:`, JSON.stringify(payload, null, 2));

    try {
        const response = await fetch(fullUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        console.log(`Response Status: ${response.status}`);
        console.log(`Response Body:`, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error sending webhook:', error);
    }
}

testWebhook();
