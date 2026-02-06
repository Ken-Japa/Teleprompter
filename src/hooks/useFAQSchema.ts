import { useEffect } from 'react';

interface FAQItem {
    q: string;
    a: string;
}

/**
 * Injects FAQPage JSON-LD schema into the document head.
 * @param items Array of question and answer pairs
 */
export const useFAQSchema = (items: FAQItem[]) => {
    useEffect(() => {
        if (!items || items.length === 0) return;

        // Generate the schema object
        const schema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "name": "Perguntas Frequentes (FAQ) - PromptNinja",
            "url": window.location.href,
            "mainEntity": items.map(item => ({
                "@type": "Question",
                "name": item.q,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": item.a
                }
            }))
        };

        // Create or update the script tag
        const scriptId = 'faq-json-ld';
        let scriptElement = document.getElementById(scriptId);

        if (!scriptElement) {
            scriptElement = document.createElement('script');
            scriptElement.id = scriptId;
            scriptElement.setAttribute('type', 'application/ld+json');
            document.head.appendChild(scriptElement);
        }

        scriptElement.textContent = JSON.stringify(schema);

        // Cleanup on unmount
        return () => {
            const el = document.getElementById(scriptId);
            if (el) {
                el.remove();
            }
        };
    }, [items]);
};
