import React, { Component, ReactNode } from "react";
import { trackError } from "../../utils/analytics";
import * as Sentry from "@sentry/react";

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: React.ErrorInfo | null;
}

/**
 * ErrorBoundary component to catch React rendering errors and prevent white screen crashes.
 * Integrates with analytics to track errors in production.
 */
export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
        };
    }

    static getDerivedStateFromError(error: Error): Partial<State> {
        // Update state so the next render will show the fallback UI
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        // Log to analytics
        trackError("react_render_error", error.message);

        // Send to Sentry with full context
        if (Sentry.isInitialized()) {
            Sentry.captureException(error, {
                contexts: {
                    react: {
                        componentStack: errorInfo.componentStack,
                    },
                },
            });
        }

        // Log to console for debugging
        console.error("ErrorBoundary caught an error:", error, errorInfo);

        // Update state with error details
        this.setState({ error, errorInfo });
    }

    handleReload = () => {
        window.location.reload();
    };

    handleGoHome = () => {
        window.location.href = "/";
    };

    render() {
        if (this.state.hasError) {
            // If custom fallback is provided, use it
            if (this.props.fallback) {
                return this.props.fallback;
            }

            // Default fallback UI
            return (
                <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
                    <div className="max-w-md w-full bg-slate-900 rounded-lg shadow-xl p-8 border border-slate-800">
                        <div className="flex items-center justify-center w-16 h-16 mx-auto bg-red-500/10 rounded-full mb-4">
                            <svg
                                className="w-8 h-8 text-red-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                />
                            </svg>
                        </div>

                        <h1 className="text-2xl font-bold text-white text-center mb-2">
                            Oops! Algo deu errado
                        </h1>

                        <p className="text-slate-400 text-center mb-6">
                            Ocorreu um erro inesperado. Não se preocupe, seus dados estão seguros.
                        </p>

                        {/* Show error details in development */}
                        {import.meta.env.DEV && this.state.error && (
                            <details className="mb-6 p-4 bg-slate-800 rounded border border-slate-700">
                                <summary className="text-sm text-slate-300 cursor-pointer mb-2">
                                    Detalhes técnicos (dev only)
                                </summary>
                                <pre className="text-xs text-red-400 overflow-auto max-h-40">
                                    {this.state.error.toString()}
                                    {this.state.errorInfo?.componentStack}
                                </pre>
                            </details>
                        )}

                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={this.handleReload}
                                className="flex-1 bg-primary hover:bg-primary/90 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                            >
                                Recarregar Página
                            </button>
                            <button
                                onClick={this.handleGoHome}
                                className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 px-4 rounded-lg transition-colors border border-slate-700"
                            >
                                Voltar ao Início
                            </button>
                        </div>

                        <p className="text-xs text-slate-500 text-center mt-6">
                            Se o problema persistir, entre em contato com o suporte.
                        </p>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
