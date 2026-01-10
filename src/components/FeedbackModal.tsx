import React, { useState } from "react";
import { trackEvent } from "../utils/analytics";

interface FeedbackModalProps {
    show: boolean;
    onClose: () => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({ show, onClose }) => {
    const [message, setMessage] = useState("");
    const [email, setEmail] = useState("");
    const [type, setType] = useState("suggestion");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

    if (!show) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        setIsSubmitting(true);
        setStatus("idle");

        try {
            const apiEndpoint = "/api/feedback";
            const response = await fetch(apiEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message, email, type }),
            });

            if (response.ok) {
                setStatus("success");
                trackEvent("feedback_submitted", { type });
                setTimeout(() => {
                    onClose();
                    // Reset form after closing
                    setTimeout(() => {
                        setMessage("");
                        setEmail("");
                        setType("suggestion");
                        setStatus("idle");
                    }, 500);
                }, 2000);
            } else {
                setStatus("error");
            }
        } catch (error) {
            console.error("Feedback error:", error);
            setStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md p-6 relative shadow-2xl animate-scale-in">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>

                <h2 className="text-2xl font-bold text-white mb-2">Feedback</h2>
                <p className="text-slate-400 mb-6 text-sm">
                    Ajude-nos a melhorar o PromptNinja. Suas sugestões são muito importantes!
                </p>

                {status === "success" ? (
                    <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 text-center animate-fade-in">
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-white font-bold text-lg mb-1">Obrigado!</h3>
                        <p className="text-green-200 text-sm">Seu feedback foi enviado com sucesso.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-slate-300 text-sm font-medium mb-1.5">Dispositivo / Tipo</label>
                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors text-sm"
                            >
                                <option value="suggestion">💡 Sugestão</option>
                                <option value="bug">🐛 Reportar Bug</option>
                                <option value="compliment">❤️ Elogio</option>
                                <option value="other">📝 Outro</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-slate-300 text-sm font-medium mb-1.5">
                                Mensagem <span className="text-red-400">*</span>
                            </label>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Descreva sua experiência ou sugestão..."
                                required
                                rows={4}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors resize-none"
                            />
                        </div>

                        <div>
                            <label className="block text-slate-300 text-sm font-medium mb-1.5">
                                E-mail (Opcional)
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="seu@email.com"
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
                            />
                        </div>

                        {status === "error" && (
                            <p className="text-red-400 text-sm bg-red-400/10 p-2 rounded-lg text-center">
                                Ocorreu um erro ao enviar. Tente novamente.
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-3 px-6 bg-gradient-to-r from-brand-500 to-blue-600 hover:from-brand-400 hover:to-blue-500 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-brand-500/20 ${isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:scale-[1.02]"
                                }`}
                        >
                            {isSubmitting ? "Enviando..." : "Enviar Feedback"}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};
