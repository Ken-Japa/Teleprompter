// scripts/indexnow.js
const fs = require("fs");
const path = require("path");

const INDEXNOW_KEY = "99093079a04e45069586232f6fad0930";
const HOST = "promptninja.solutionkit.com.br";
const INDEXNOW_URL = `https://api.indexnow.org/IndexNow`;

// O sitemap está na pasta public/
const sitemapPath = path.resolve(process.cwd(), "public", "sitemap.xml");

// Função para extrair URLs do sitemap (método simples)
function getUrlsFromSitemap(filePath) {
    try {
        const xml = fs.readFileSync(filePath, "utf-8");
        const urls = [];
        // Regex simples para encontrar as tags <loc>
        const locs = xml.match(/<loc>(.*?)<\/loc>/g);

        if (locs) {
            locs.forEach((loc) => {
                // Extrai a URL do meio da tag <loc>
                const url = loc.replace("<loc>", "").replace("</loc>", "").trim();
                urls.push(url);
            });
        }
        return urls;
    } catch (error) {
        console.error("Erro ao ler sitemap.xml:", error.message);
        return [];
    }
}

// Função para enviar o lote de URLs
async function submitUrlsToIndexNow() {
    console.log("--- Iniciando submissão IndexNow ---");

    const allUrls = getUrlsFromSitemap(sitemapPath);

    if (allUrls.length === 0) {
        console.log("Nenhuma URL encontrada no sitemap.xml. Abortando IndexNow.");
        return;
    }

    // Agrupar URLs por host
    const urlsByHost = allUrls.reduce((acc, url) => {
        try {
            const parsed = new URL(url);
            const host = parsed.hostname;
            if (!acc[host]) {
                acc[host] = [];
            }
            acc[host].push(url);
        } catch (e) {
            console.warn("URL inválida encontrada:", url);
        }
        return acc;
    }, {});

    const hosts = Object.keys(urlsByHost);
    console.log(`Encontrados ${hosts.length} domínios: ${hosts.join(", ")}`);

    for (const host of hosts) {
        const urls = urlsByHost[host];
        console.log(`Enviando ${urls.length} URLs para o host: ${host}...`);

        const body = JSON.stringify({
            host: host,
            key: INDEXNOW_KEY,
            urlList: urls,
        });

        try {
            const response = await fetch(INDEXNOW_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: body,
            });

            if (response.status === 200 || response.status === 202) {
                console.log(`✅ [${host}] IndexNow Sucesso!`);
            } else {
                // Tenta ler o corpo do erro se possível
                let errorText = "";
                try {
                    errorText = await response.text();
                } catch (e) { }
                console.error(`❌ [${host}] IndexNow Falhou. Status: ${response.status}. ${errorText ? `Detalhe: ${errorText}` : ''}`);
            }
        } catch (error) {
            console.error(`❌ [${host}] Erro de rede:`, error.message);
        }
    }
}

submitUrlsToIndexNow();
