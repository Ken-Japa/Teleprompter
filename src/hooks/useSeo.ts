import { useEffect } from "react";

interface SeoProps {
 title: string;
 description: string;
 canonicalUrl?: string;
}

export const useSeo = ({ title, description, canonicalUrl }: SeoProps) => {
 useEffect(() => {
  // Update Title
  document.title = `${title} | PromptNinja`;

  // Update Meta Description
  let metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
   metaDescription = document.createElement("meta");
   metaDescription.setAttribute("name", "description");
   document.head.appendChild(metaDescription);
  }
  metaDescription.setAttribute("content", description);

  // Update Canonical URL
  let linkCanonical = document.querySelector('link[rel="canonical"]');
  if (!linkCanonical) {
   linkCanonical = document.createElement("link");
   linkCanonical.setAttribute("rel", "canonical");
   document.head.appendChild(linkCanonical);
  }
  if (canonicalUrl) {
   linkCanonical.setAttribute("href", canonicalUrl);
  } else {
   linkCanonical.setAttribute("href", window.location.href);
  }

  // Cleanup function to reset (optional, maybe reset to default app title)
  return () => {
   // We might want to reset to default, but typically navigation will overwrite it.
  };
 }, [title, description, canonicalUrl]);
};
