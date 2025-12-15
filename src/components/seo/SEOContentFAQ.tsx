import React from 'react';
import { useFAQSchema } from '../../hooks/useFAQSchema';

type FAQItem = {
    question: string;
    answer: React.ReactNode;
    schemaAnswer?: string; // Optional: raw text/html for schema if answer is complex JSX
};

interface Props {
    title?: string;
    items: FAQItem[];
}

export const SEOContentFAQ: React.FC<Props> = ({
    items,
    title = "Perguntas Frequentes (FAQ)"
}) => {

    // Evaluate schema data
    const schemaData = items.map(item => ({
        q: item.question,
        // Use schemaAnswer if provided, otherwise convert answer to string if possible, or empty string
        a: item.schemaAnswer || (typeof item.answer === 'string' ? item.answer : "")
    }));

    useFAQSchema(schemaData);

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
            <div className="space-y-4">
                {items.map((item, index) => (
                    <div key={index} className="bg-slate-800 p-4 rounded-lg">
                        <h3 className="font-bold text-white">{item.question}</h3>
                        <div className="text-slate-300 mt-2">
                            {item.answer}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
