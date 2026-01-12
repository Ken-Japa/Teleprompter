import React, { useMemo } from 'react';
import { useHowToSchema, HowToStep, HowToCost } from '../../hooks/useHowToSchema';

interface Props {
    title: string;
    schemaTitle?: string;
    steps: HowToStep[];
    className?: string;
    totalTime?: string;
    estimatedCost?: HowToCost;
    supplies?: string[];
    tools?: string[];
}

export const SEOContentHowTo: React.FC<Props> = ({
    title,
    schemaTitle,
    steps,
    className = "",
    totalTime,
    estimatedCost,
    supplies,
    tools
}) => {
    const options = useMemo(() => ({
        schemaTitle,
        totalTime,
        estimatedCost,
        supplies,
        tools
    }), [schemaTitle, totalTime, estimatedCost, supplies, tools]);

    useHowToSchema(title, steps, options);

    const hasRequirements = (supplies && supplies.length > 0) || (tools && tools.length > 0);

    return (
        <div className={`mt-8 ${className}`}>
            <h3 className="text-3xl font-bold text-white mb-6">{title}</h3>

            {hasRequirements && (
                <div className="bg-slate-900 border border-slate-700 p-6 rounded-lg mb-8">
                    <h4 className="text-xl font-bold text-white mb-4">O que você vai precisar:</h4>
                    <div className="grid md:grid-cols-2 gap-6">
                        {tools && tools.length > 0 && (
                            <div>
                                <h4 className="text-blue-400 font-bold mb-2 uppercase text-sm tracking-wider">Ferramentas</h4>
                                <ul className="list-disc list-inside text-slate-300">
                                    {tools.map((tool, idx) => (
                                        <li key={idx}>{tool}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {supplies && supplies.length > 0 && (
                            <div>
                                <h4 className="text-purple-400 font-bold mb-2 uppercase text-sm tracking-wider">Materiais</h4>
                                <ul className="list-disc list-inside text-slate-300">
                                    {supplies.map((supply, idx) => (
                                        <li key={idx}>{supply}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <div className="space-y-8">
                {steps.map((step, index) => (
                    <div key={index} className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                        <div className="flex flex-col md:flex-row gap-6">
                            {step.image && (
                                <div className="w-full md:w-1/3 shrink-0">
                                    <img
                                        src={step.image}
                                        alt={step.title}
                                        className="w-full h-auto rounded-lg object-cover aspect-video"
                                        loading="lazy"
                                    />
                                </div>
                            )}
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold shrink-0">
                                        {index + 1}
                                    </span>
                                    <h4 className="font-bold text-xl text-white">{step.title}</h4>
                                </div>
                                <div className="text-slate-300 pl-11">
                                    {step.text}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
