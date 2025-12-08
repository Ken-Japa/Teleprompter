import { useEffect } from "react";

interface SeoProps {
 title: string;
 description: string;
 canonicalUrl?: string;
 ogImage?: string;
 ogType?: "website" | "article";
 schema?: object; // JSON-LD structured data
}

export const useSeo = ({
 title,
 description,
 canonicalUrl,
 ogImage = "https://promptninja.solutionkit.com.br/og-image.webp",
 ogType = "website",
 schema,
}: SeoProps) => {
 useEffect(() => {
  // Update Title
  document.title = `${title} | PromptNinja`;

  // Helper to update or create meta tag
  const updateMeta = (name: string, content: string, attribute: "name" | "property" = "name") => {
   let element = document.querySelector(`meta[${attribute}="${name}"]`);
   if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
   }
   element.setAttribute("content", content);
  };

  // Update Meta Description
  updateMeta("description", description);

  // Update Open Graph
  updateMeta("og:title", title, "property");
  updateMeta("og:description", description, "property");
  updateMeta("og:type", ogType, "property");
  updateMeta("og:url", canonicalUrl || window.location.href, "property");
  updateMeta("og:image", ogImage, "property");
  updateMeta("og:site_name", "PromptNinja", "property");

  // Update Canonical URL
  let linkCanonical = document.querySelector('link[rel="canonical"]');
  if (!linkCanonical) {
   linkCanonical = document.createElement("link");
   linkCanonical.setAttribute("rel", "canonical");
   document.head.appendChild(linkCanonical);
  }
  linkCanonical.setAttribute("href", canonicalUrl || window.location.href);

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
 }, [title, description, canonicalUrl, ogImage, ogType, schema]);
};
