import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { ROUTES_CONFIG } from "../src/config/routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOMAIN = "https://promptninja.solutionkit.com.br";

const generateSitemap = () => {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`;

  // Home routes for each domain
  const DOMAINS = [
    { url: "https://promptninja.solutionkit.com.br", langs: ['pt', 'en', 'es'] },
    { url: "https://music.solutionkit.com.br", langs: ['pt', 'en', 'es'] }
  ];

  DOMAINS.forEach(domainConfig => {
    xml += `  <url>
    <loc>${domainConfig.url}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
`;
    domainConfig.langs.forEach(lang => {
      const langPath = lang === 'pt' ? '' : `${lang}/`;
      xml += `    <xhtml:link rel="alternate" hreflang="${lang}" href="${domainConfig.url}/${langPath}" />\n`;
    });
    xml += `  </url>\n`;
  });

  // Generate SEO routes (always on main domain)
  Object.values(ROUTES_CONFIG).forEach((routeConfig) => {
    const { priority, changefreq, paths } = routeConfig;
    const languages = Object.keys(paths);

    languages.forEach((lang) => {
      const currentPath = paths[lang];

      xml += `  <url>
    <loc>${DOMAIN}${currentPath}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
`;

      // Add hreflang links
      languages.forEach((altLang) => {
        xml += `    <xhtml:link rel="alternate" hreflang="${altLang}" href="${DOMAIN}${paths[altLang]}" />\n`;
      });

      // Add images
      if (routeConfig.images && routeConfig.images.length > 0) {
        routeConfig.images.forEach((image) => {
          const imageTitle = image.titles[lang] || image.titles["pt"];
          xml += `    <image:image>
      <image:loc>${DOMAIN}/seo/${image.slug}/${image.src}</image:loc>
      <image:title>${imageTitle}</image:title>
    </image:image>\n`;
        });
      }

      xml += `  </url>\n`;
    });
  });

  xml += `</urlset>`;

  const publicDir = path.join(__dirname, "..", "public");

  // Ensure public directory exists (it should)
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }

  fs.writeFileSync(path.join(publicDir, "sitemap.xml"), xml);
  console.log("✅ Sitemap gerado com sucesso em public/sitemap.xml");
};

generateSitemap();
