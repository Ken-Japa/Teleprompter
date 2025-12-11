import fs from 'fs';
import path from 'path';
import https from 'https';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SCRIPT_URL = 'https://t.contentsquare.net/uxa/9f676d4da3fcc.js';
const INDEX_HTML_PATH = path.join(__dirname, '../index.html');

console.log('🔄 Update Integrity: Starting SRI update for Contentsquare...');

// Helper to calculate SHA-384
function calculateIntegrity(content) {
    const hash = crypto.createHash('sha384').update(content).digest('base64');
    return `sha384-${hash}`;
}

// Fetch the script content
const options = {
    headers: {
        'Accept-Encoding': 'identity',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
};

https.get(SCRIPT_URL, options, (res) => {
    if (res.statusCode !== 200) {
        console.error(`❌ Failed to fetch script. Status Code: ${res.statusCode}`);
        process.exit(1);
    }

    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        try {
            const integrity = calculateIntegrity(data);
            console.log(`✅ Computed Integrity: ${integrity}`);

            // Read index.html
            let indexHtml = fs.readFileSync(INDEX_HTML_PATH, 'utf8');

            // Regex to match the script tag. 
            // Matches: <script ... src="...URL..." ... > or similar variations
            const scriptRegex = /<script\s+defer\s+src="https:\/\/t\.contentsquare\.net\/uxa\/9f676d4da3fcc\.js"(?:[^>]*)><\/script>/;
            const simpleRegex = /<script defer src="https:\/\/t\.contentsquare\.net\/uxa\/9f676d4da3fcc\.js"(?:.*)><\/script>/;

            // Construct the new script tag with the calculated integrity
            const newScriptTag = `<script defer src="${SCRIPT_URL}" integrity="${integrity}" crossorigin="anonymous"></script>`;

            if (indexHtml.includes(SCRIPT_URL)) {
                // More robust: Find the line/block containing the script src and replace the whole tag
                const updatedHtml = indexHtml.replace(
                    /<script\s+defer\s+src="https:\/\/t\.contentsquare\.net\/uxa\/9f676d4da3fcc\.js".*?><\/script>/s,
                    newScriptTag
                );

                fs.writeFileSync(INDEX_HTML_PATH, updatedHtml, 'utf8');
                console.log('✅ index.html updated successfully with new integrity hash.');
            } else {
                console.warn('⚠️ Could not find Contentsquare script tag in index.html to replace.');
            }
        } catch (err) {
            console.error('❌ Error updating integrity:', err);
            process.exit(1);
        }
    });

}).on('error', (err) => {
    console.error('❌ Network error fetching script:', err);
    process.exit(1);
});
