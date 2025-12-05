import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOMAIN = "https://promptninja.solutionkit.com.br";

const routes = [
 { path: "/", changefreq: "weekly", priority: "1.0" },
 { path: "/teleprompter-online-gratis", changefreq: "monthly", priority: "0.8" },
 { path: "/como-usar-teleprompter-celular", changefreq: "monthly", priority: "0.8" },
 { path: "/melhor-teleprompter-app", changefreq: "monthly", priority: "0.8" },
 { path: "/alternativas-teleprompter-concorrente", changefreq: "monthly", priority: "0.8" },
 { path: "/teleprompter-para-youtubers-e-criadores", changefreq: "monthly", priority: "0.8" },
 { path: "/teleprompter-travando-solucao", changefreq: "monthly", priority: "0.8" },
 { path: "/teleprompter-caseiro-diy", changefreq: "monthly", priority: "0.8" },
 { path: "/dicas-oratoria-video", changefreq: "monthly", priority: "0.8" },
 { path: "/como-decorar-texto-rapido", changefreq: "monthly", priority: "0.8" },
 { path: "/tecnologia-webrtc-baixa-latencia", changefreq: "monthly", priority: "0.8" },
 { path: "/teleprompter-pc-windows", changefreq: "monthly", priority: "0.8" },
 { path: "/teleprompter-zoom-meeting", changefreq: "monthly", priority: "0.8" },
];

const generateSitemap = () => {
 const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
 .map((route) => {
  return `  <url>
    <loc>${DOMAIN}${route.path}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
 })
 .join("\n")}
</urlset>`;

 const publicDir = path.join(__dirname, "..", "public");

 // Ensure public directory exists (it should)
 if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
 }

 fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemap);
 console.log("✅ Sitemap gerado com sucesso em public/sitemap.xml");
};

generateSitemap();
