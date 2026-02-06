import { useEffect } from "react";
import { trackSeoPageView } from "../utils/analytics";

interface SeoProps {
    title: string;
    description: string;
    canonicalUrl?: string;
    ogImage?: string;
    ogType?: "website" | "article";
    schema?: object; // JSON-LD structured data
    alternates?: { hreflang: string; href: string }[];
    keywords?: string;
    noindex?: boolean;
}

export const useSeo = ({
    title,
    description,
    canonicalUrl,
    ogImage = "https://promptninja.solutionkit.com.br/og-image.webp",
    ogType = "website",
    schema,
    alternates,
    keywords,
    noindex,
}: SeoProps) => {
    useEffect(() => {
        // Update Title
        document.title = `${title} | PromptNinja`;

        // Helper to update or create meta tag with proper attribute (name vs property)
        const updateSeoMeta = (key: string, content: string) => {
            const isOg = key.startsWith("og:") || key.startsWith("fb:") || key === "al:ios:app_store_id";
            const attr = isOg ? "property" : "name";

            let element = document.querySelector(`meta[${attr}="${key}"]`);
            if (!element) {
                element = document.createElement("meta");
                element.setAttribute(attr, key);
                document.head.appendChild(element);
            }
            element.setAttribute("content", content);
        };

        // Update Meta Tags
        updateSeoMeta("description", description);
        if (keywords) updateSeoMeta("keywords", keywords);

        // Update Open Graph (using property attribute)
        updateSeoMeta("og:title", title);
        updateSeoMeta("og:description", description);
        updateSeoMeta("og:type", ogType);
        updateSeoMeta("og:url", canonicalUrl || window.location.href);
        updateSeoMeta("og:image", ogImage);
        updateSeoMeta("og:site_name", "PromptNinja");

        // fb:app_id for analytics/debugger
        updateSeoMeta("fb:app_id", "966242223397117");

        // Added og:locale for better international SEO
        const currentLang = (window.location.pathname.startsWith('/en') || window.location.search.includes('lang=en')) ? 'en_US' :
            (window.location.pathname.startsWith('/es') || window.location.search.includes('lang=es')) ? 'es_ES' : 'pt_BR';
        updateSeoMeta("og:locale", currentLang);

        // Update Twitter specific (using name attribute)
        updateSeoMeta("twitter:image", ogImage);
        updateSeoMeta("twitter:card", "summary_large_image");
        updateSeoMeta("twitter:title", title);
        updateSeoMeta("twitter:description", description);
        updateSeoMeta("twitter:url", canonicalUrl || window.location.href);

        // Update Thumbnail (Google/Other search engines)
        updateSeoMeta("thumbnail", ogImage);

        // Update Canonical URL
        let linkCanonical = document.querySelector('link[rel="canonical"]');
        if (!linkCanonical) {
            linkCanonical = document.createElement("link");
            linkCanonical.setAttribute("rel", "canonical");
            document.head.appendChild(linkCanonical);
        }
        linkCanonical.setAttribute("href", canonicalUrl || window.location.href);

        // Update Alternates (Hreflang)
        if (alternates && alternates.length > 0) {
            // Remove existing alternates that are not in the current list
            const existingAlternates = document.querySelectorAll('link[rel="alternate"][hreflang]');
            existingAlternates.forEach(el => {
                const hreflang = el.getAttribute('hreflang');
                if (!alternates.find(a => a.hreflang === hreflang)) {
                    el.remove();
                }
            });

            // Update or create alternates
            alternates.forEach(({ hreflang, href }) => {
                let linkAlternate = document.querySelector(`link[rel="alternate"][hreflang="${hreflang}"]`);
                if (!linkAlternate) {
                    linkAlternate = document.createElement("link");
                    linkAlternate.setAttribute("rel", "alternate");
                    linkAlternate.setAttribute("hreflang", hreflang);
                    document.head.appendChild(linkAlternate);
                }
                linkAlternate.setAttribute("href", href);
            });
        }

        // Update Robots (noindex)
        let metaRobots = document.querySelector('meta[name="robots"]');
        if (noindex) {
            if (!metaRobots) {
                metaRobots = document.createElement("meta");
                metaRobots.setAttribute("name", "robots");
                document.head.appendChild(metaRobots);
            }
            metaRobots.setAttribute("content", "noindex, nofollow");
        } else if (metaRobots) {
            metaRobots.remove();
        }

        // Track SEO page view in GA4
        trackSeoPageView(canonicalUrl || window.location.pathname);

        return () => {
            // Cleanup logic if needed (rarely needed for SPA navigation unless full reset desired)
        };
    }, [title, description, canonicalUrl, ogImage, ogType, schema, alternates, keywords, noindex]);
};
