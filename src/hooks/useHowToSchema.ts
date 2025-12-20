import { useEffect } from 'react';

export interface HowToStep {
    title: string;
    text: string;
    image?: string;
    url?: string;
}

export interface HowToCost {
    currency: string;
    value: string;
}

export interface HowToOptions {
    schemaTitle?: string;
    totalTime?: string; // ISO 8601 duration e.g. "PT2M"
    estimatedCost?: HowToCost;
    supplies?: string[];
    tools?: string[];
}

/**
 * Injects HowTo JSON-LD schema into the document head.
 * @param title The main title of the HowTo guide (used for UI, schema if schemaTitle not provided)
 * @param steps Array of steps for the guide
 * @param options Additional schema options
 */
export const useHowToSchema = (title: string, steps: HowToStep[], options: HowToOptions = {}) => {
    useEffect(() => {
        if (!steps || steps.length === 0) return;

        // Generate the schema object
        const schema = {
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": options.schemaTitle || title,
            ...(options.totalTime && { "totalTime": options.totalTime }),
            ...(options.estimatedCost && {
                "estimatedCost": {
                    "@type": "MonetaryAmount",
                    "currency": options.estimatedCost.currency,
                    "value": options.estimatedCost.value
                }
            }),
            ...(options.supplies && {
                "supply": options.supplies.map(supply => ({
                    "@type": "HowToSupply",
                    "name": supply
                }))
            }),
            ...(options.tools && {
                "tool": options.tools.map(tool => ({
                    "@type": "HowToTool",
                    "name": tool
                }))
            }),
            "step": steps.map((step, index) => ({
                "@type": "HowToStep",
                "position": index + 1,
                "name": step.title,
                "itemListElement": [
                    {
                        "@type": "HowToDirection",
                        "text": step.text
                    }
                ],
                ...(step.image && { "image": step.image }),
                ...(step.url && { "url": step.url })
            }))
        };

        // Create or update the script tag
        const scriptId = 'howto-json-ld';
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
    }, [title, steps, options]); // Deep comparison for complex objects isn't done here, but objects are usually recreated on render. 
    // To avoid infinite loops if 'options' is a new object every render, we rely on the fact that useEffect only runs if deps change.
    // Ideally, the caller should memoize options or use primitives. But for this simple case, standard React behavior is fine unless the parent re-renders rapidly.
};
