import { useEffect } from "react";

interface SeoProps {
    title: string;
    description: string;
    canonicalUrl?: string;
    ogImage?: string;
    ogType?: "website" | "article";
    schema?: object; // JSON-LD structured data
    alternates?: { hreflang: string; href: string }[];
    keywords?: string;
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
}: SeoProps) => {
    useEffect(() => {
        // Update Title
        document.title = `${title} | PromptNinja`;

        // Helper to update or create meta tag
        const updateMeta = (name: string, content: string) => {
            // Try enabling finding by name OR property to cover legacy/index.html cases
            let element = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
            if (!element) {
                element = document.createElement("meta");
                element.setAttribute("name", name);
                document.head.appendChild(element);
            }
            // Ensure consistency (if found by property, might want to normalize, but keeping simple for now)
            element.setAttribute("content", content);
        };

        // Update Meta Description
        updateMeta("description", description);
        if (keywords) updateMeta("keywords", keywords);

        // Update Open Graph
        updateMeta("og:title", title);
        updateMeta("og:description", description);
        updateMeta("og:type", ogType);
        updateMeta("og:url", canonicalUrl || window.location.href);
        updateMeta("og:image", ogImage);
        updateMeta("og:site_name", "PromptNinja");

        // Update Twitter specific
        updateMeta("twitter:image", ogImage);
        updateMeta("twitter:card", "summary_large_image");
        updateMeta("twitter:title", title);
        updateMeta("twitter:description", description);
        updateMeta("twitter:url", canonicalUrl || window.location.href);

        // Update Thumbnail (Google/Other search engines)
        updateMeta("thumbnail", ogImage);

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

        // Update JSON-LD Schema
        let scriptSchema = document.querySelector("#schema-json-ld");
        if (schema) {
            if (!scriptSchema) {
                scriptSchema = document.createElement("script");
                scriptSchema.setAttribute("type", "application/ld+json");
                scriptSchema.setAttribute("id", "schema-json-ld");
                document.head.appendChild(scriptSchema);
            }
            scriptSchema.textContent = JSON.stringify(schema);
        } else if (scriptSchema) {
            scriptSchema.remove();
        }

        return () => {
            // Cleanup logic if needed (rarely needed for SPA navigation unless full reset desired)
        };
    }, [title, description, canonicalUrl, ogImage, ogType, schema, alternates, keywords]);
};
