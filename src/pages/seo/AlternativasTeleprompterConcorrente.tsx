import React from "react";
import { SeoPageLayout } from "./SeoPageLayout";

interface Props {
    onLaunch: () => void;
}

export const AlternativasTeleprompterConcorrente: React.FC<Props> = ({ onLaunch }) => {
    return (
        <SeoPageLayout
            title="Alternativa ao Teleprompter Pro e PrompterPro (Grátis e Online)"
            description="Procurando uma alternativa ao Teleprompter Pro? Conheça o PromptNinja: gratuito, sem login, funciona no PC e Celular com controle remoto."
            onLaunch={onLaunch}
        >
            <h1 className="text-4xl font-bold text-white mb-6">A Melhor Alternativa ao Teleprompter Pro em 2025</h1>
            
            <p className="mb-6">
                Muitos criadores buscam alternativas a aplicativos pagos como o <strong>Teleprompter Pro</strong> ou serviços que exigem login obrigatório. Se você quer simplicidade e potência, o PromptNinja é a resposta.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Comparativo: PromptNinja vs Outros Apps</h2>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-slate-700">
                            <th className="py-4 px-2 text-slate-400">Recurso</th>
                            <th className="py-4 px-2 text-primary font-bold">PromptNinja</th>
                            <th className="py-4 px-2 text-slate-500">Apps Tradicionais</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-slate-800">
                            <td className="py-4 px-2">Preço Inicial</td>
                            <td className="py-4 px-2 text-green-400 font-bold">Grátis</td>
                            <td className="py-4 px-2">Pago / Freemium Limitado</td>
                        </tr>
                        <tr className="border-b border-slate-800">
                            <td className="py-4 px-2">Login Obrigatório</td>
                            <td className="py-4 px-2 text-green-400 font-bold">Não</td>
                            <td className="py-4 px-2">Sim</td>
                        </tr>
                        <tr className="border-b border-slate-800">
                            <td className="py-4 px-2">Controle Remoto</td>
                            <td className="py-4 px-2 text-green-400 font-bold">Incluso (Wi-Fi P2P)</td>
                            <td className="py-4 px-2">Geralmente Pago à parte</td>
                        </tr>
                        <tr className="border-b border-slate-800">
                            <td className="py-4 px-2">Plataforma</td>
                            <td className="py-4 px-2">Navegador (PC/Mac/Celular)</td>
                            <td className="py-4 px-2">App Específico</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Por que mudar para o PromptNinja?</h2>
            <p className="mb-4">
                O maior diferencial do PromptNinja é a liberdade. Você não fica preso a um sistema operacional (pode usar um PC Windows para exibir o texto e um iPhone para controlar).
            </p>
            <p className="mb-6">
                Além disso, utilizamos tecnologia P2P para garantir que seus dados (o texto do roteiro) não fiquem salvos em nossos servidores. É mais privacidade para seus projetos.
            </p>

            <div className="text-center mt-10">
                <button 
                    onClick={onLaunch}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-2xl hover:scale-105 transition transform duration-200"
                >
                    Trocar para o PromptNinja (Sem Instalar Nada)
                </button>
            </div>
        </SeoPageLayout>
    );
};
