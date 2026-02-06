import { useEffect } from 'react';

/**
 * Hook to inject dynamic JSON-LD Schema.org data into the document head.
 * @param schema The Schema.org object or array to inject.
 * @param id Optional ID to identify and replace the specific schema script.
 */
export const useSchema = (schema: object | any[], id: string = 'page-schema') => {
    useEffect(() => {
        if (!schema) return;

        // Remove existing schema if it exists
        const existingScript = document.getElementById(id);
        if (existingScript) {
            existingScript.remove();
        }

        // Create and inject new schema
        const script = document.createElement('script');
        script.id = id;
        script.type = 'application/ld+json';
        script.text = JSON.stringify(schema);
        document.head.appendChild(script);

        // Cleanup function to remove schema when component unmounts
        return () => {
            const scriptToRemove = document.getElementById(id);
            if (scriptToRemove) {
                scriptToRemove.remove();
            }
        };
    }, [schema, id]);
};
