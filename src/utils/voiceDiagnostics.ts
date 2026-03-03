/**
 * Sistema de Diagnóstico Avançado para Controle de Voz
 * Detecta problemas em tempo real e gera relatórios acionáveis
 */

export interface DiagnosticEvent {
    timestamp: number;
    type: 'match' | 'miss' | 'jump' | 'stuck' | 'performance' | 'error';
    severity: 'info' | 'warning' | 'critical';
    data: any;
}

export interface DiagnosticReport {
    sessionDuration: number;
    totalEvents: number;
    matchRate: number;
    averageConfidence: number;
    problemAreas: ProblemArea[];
    recommendations: string[];
    timeline: DiagnosticEvent[];
}

export interface ProblemArea {
    sentenceId: number;
    sentenceText: string;
    issues: string[];
    missCount: number;
    avgRatio: number;
}

class VoiceDiagnostics {
    private events: DiagnosticEvent[] = [];
    private sessionStartTime: number = 0;
    private lastMatchTime: number = 0;
    private consecutiveMisses: number = 0;
    private isEnabled: boolean = true;
    private verbose: boolean = false; // Default to false to reduce noise

    // Thresholds para detecção de problemas
    private readonly STUCK_THRESHOLD_MS = 5000; // 5s sem progresso = stuck
    private readonly MISS_THRESHOLD = 3; // 3 misses consecutivos = problema
    private readonly CONFIDENCE_WARNING = 0.6; // abaixo de 60% = warning

    startSession() {
        this.sessionStartTime = Date.now();
        this.events = [];
        this.consecutiveMisses = 0;
        this.lastMatchTime = Date.now();

        if (this.verbose) {
            console.log('%c[Voice Diagnostics] Session started (Verbose Mode)', 'color: #2196F3; font-weight: bold');
        }
    }

    /**
     * Registra uma tentativa de match bem-sucedida
     */
    recordMatch(data: {
        sentenceId: number;
        transcript: string;
        matchRatio: number;
        processingTime: number;
        wasJump: boolean;
        note?: string;
    }) {
        if (!this.isEnabled) return;

        const now = Date.now();
        const timeSinceLastMatch = now - this.lastMatchTime;

        // Detecta "stuck" - muito tempo sem progresso
        if (timeSinceLastMatch > this.STUCK_THRESHOLD_MS && this.events.length > 0) {
            this.events.push({
                timestamp: now,
                type: 'stuck',
                severity: 'critical',
                data: {
                    duration: timeSinceLastMatch,
                    lastSentence: data.sentenceId,
                }
            });
        }

        // Detecta jumps problemáticos (grandes saltos)
        if (data.wasJump) {
            this.events.push({
                timestamp: now,
                type: 'jump',
                severity: data.matchRatio < 0.05 ? 'info' : 'warning',
                data: {
                    sentenceId: data.sentenceId,
                    confidence: 1 - data.matchRatio,
                    transcript: data.transcript
                }
            });
        }

        // Registra match de baixa confiança
        if (data.matchRatio > (1 - this.CONFIDENCE_WARNING)) { // > 40% difference = < 60% confidence
            this.events.push({
                timestamp: now,
                type: 'match',
                severity: 'warning',
                data: {
                    sentenceId: data.sentenceId,
                    confidence: 1 - data.matchRatio,
                    transcript: data.transcript,
                    lowConfidence: true
                }
            });
        } else {
            // Optional: Don't log every single good match to save memory, or log as debug
            // But for now, let's log them to calculate stats correctly
            this.events.push({
                timestamp: now,
                type: 'match',
                severity: 'info',
                data: {
                    sentenceId: data.sentenceId,
                    confidence: 1 - data.matchRatio,
                }
            });
        }

        // Performance warning
        if (data.processingTime > 100) {
            this.events.push({
                timestamp: now,
                type: 'performance',
                severity: data.processingTime > 200 ? 'critical' : 'warning',
                data: {
                    processingTime: data.processingTime,
                    sentenceId: data.sentenceId
                }
            });
        }

        this.consecutiveMisses = 0;
        this.lastMatchTime = now;

        if (this.verbose) {
            const style = 'color: #4CAF50';
            console.log(`%c[Voice Match] Sentence ${data.sentenceId} | Conf: ${(1 - data.matchRatio).toFixed(2)} | "${data.transcript}"`, style);
        }
    }

    /**
     * Registra uma tentativa de match que falhou
     */
    recordMiss(data: {
        transcript: string;
        expectedSentence?: number;
        reason: string;
    }) {
        if (!this.isEnabled) return;

        this.consecutiveMisses++;

        this.events.push({
            timestamp: Date.now(),
            type: 'miss',
            severity: this.consecutiveMisses >= this.MISS_THRESHOLD ? 'critical' : 'warning',
            data: {
                transcript: data.transcript,
                consecutiveMisses: this.consecutiveMisses,
                reason: data.reason
            }
        });
    }

    /**
     * Registra erro crítico
     */
    recordError(error: Error, context: any) {
        if (!this.isEnabled) return;

        this.events.push({
            timestamp: Date.now(),
            type: 'error',
            severity: 'critical',
            data: {
                message: error.message,
                stack: error.stack,
                context
            }
        });
    }

    /**
     * Gera relatório diagnóstico completo
     */
    generateReport(sentences: Array<{ id: number; cleanContent: string }>): DiagnosticReport {
        const duration = Date.now() - this.sessionStartTime;
        const matches = this.events.filter(e => e.type === 'match');
        const misses = this.events.filter(e => e.type === 'miss');

        // Calcula match rate
        const totalAttempts = matches.length + misses.length;
        const matchRate = totalAttempts > 0 ? matches.length / totalAttempts : 0;

        // Calcula confiança média
        const avgConfidence = matches.length > 0
            ? matches.reduce((sum, e) => sum + (e.data.confidence || 0), 0) / matches.length
            : 0;

        // Identifica áreas problemáticas
        const problemAreas = this.findProblemAreas(sentences);

        // Gera recomendações
        const recommendations = this.generateRecommendations(problemAreas, matchRate, avgConfidence);

        return {
            sessionDuration: duration,
            totalEvents: this.events.length,
            matchRate,
            averageConfidence: avgConfidence,
            problemAreas,
            recommendations,
            timeline: this.events
        };
    }

    /**
     * Identifica frases problemáticas
     */
    private findProblemAreas(sentences: Array<{ id: number; cleanContent: string }>): ProblemArea[] {
        const sentenceStats = new Map<number, { missCount: number; ratios: number[] }>();

        // Agrupa eventos por sentença
        this.events.forEach(event => {
            if (event.data.sentenceId !== undefined) {
                const id = event.data.sentenceId;
                if (!sentenceStats.has(id)) {
                    sentenceStats.set(id, { missCount: 0, ratios: [] });
                }

                const stats = sentenceStats.get(id)!;

                if (event.type === 'miss') {
                    stats.missCount++;
                } else if (event.type === 'match' && event.data.lowConfidence) {
                    stats.ratios.push(event.data.confidence);
                }
            }
        });

        // Build O(1) lookup map — avoids O(n) sentences.find() inside forEach
        const sentenceMap = new Map(sentences.map(s => [s.id, s]));

        // Filtra apenas frases com problemas
        const problemAreas: ProblemArea[] = [];

        sentenceStats.forEach((stats, sentenceId) => {
            if (stats.missCount >= 2 || stats.ratios.length >= 3) {
                const sentence = sentenceMap.get(sentenceId);
                if (!sentence) return;

                const issues: string[] = [];

                if (stats.missCount >= 2) {
                    issues.push(`Falhou ${stats.missCount} vezes`);
                }

                if (stats.ratios.length >= 3) {
                    const avg = stats.ratios.reduce((a, b) => a + b, 0) / stats.ratios.length;
                    issues.push(`Baixa confiança (${(avg * 100).toFixed(0)}%)`);
                }

                problemAreas.push({
                    sentenceId,
                    sentenceText: sentence.cleanContent,
                    issues,
                    missCount: stats.missCount,
                    avgRatio: stats.ratios.length > 0
                        ? stats.ratios.reduce((a, b) => a + b, 0) / stats.ratios.length
                        : 0
                });
            }
        });

        return problemAreas.sort((a, b) => b.missCount - a.missCount);
    }

    /**
     * Gera recomendações acionáveis
     */
    private generateRecommendations(
        problemAreas: ProblemArea[],
        matchRate: number,
        avgConfidence: number
    ): string[] {
        const recommendations: string[] = [];

        // Match rate muito baixo
        if (matchRate < 0.5) {
            recommendations.push('⚠️ CRÍTICO: Taxa de match muito baixa (<50%). Verifique qualidade do áudio e pronúncia.');
        } else if (matchRate < 0.7) {
            recommendations.push('⚠️ Taxa de match abaixo do ideal (<70%). Considere melhorar ambiente (menos ruído).');
        }

        // Confiança baixa
        if (avgConfidence < 0.7) {
            recommendations.push('⚠️ Confiança média baixa. Script pode ter palavras difíceis de reconhecer.');
        }

        // Áreas problemáticas
        if (problemAreas.length > 0) {
            recommendations.push(`🎯 ${problemAreas.length} frases identificadas como problemáticas (veja detalhes abaixo).`);

            // Analisa padrões
            const hasLongSentences = problemAreas.some(p => p.sentenceText.length > 100);
            if (hasLongSentences) {
                recommendations.push('📝 Algumas frases problemáticas são muito longas. Considere quebrar em frases menores.');
            }

            const hasSpecialWords = problemAreas.some(p =>
                /\b(webrtc|p2p|peer|teleprompter|ninja)\b/i.test(p.sentenceText)
            );
            if (hasSpecialWords) {
                recommendations.push('🔤 Termos técnicos (WebRTC, P2P, etc) causaram problemas. Considere adicionar ao dicionário de pronúncia.');
            }
        }

        // Performance
        const perfIssues = this.events.filter(e => e.type === 'performance' && e.severity === 'critical');
        if (perfIssues.length > 3) {
            recommendations.push('⚡ Problemas de performance detectados. Considere reduzir tamanho do texto ou simplificar script.');
        }

        // Stuck events
        const stuckEvents = this.events.filter(e => e.type === 'stuck');
        if (stuckEvents.length > 0) {
            recommendations.push(`🔒 Sistema travou ${stuckEvents.length} vez(es). Verifique se o script tem seções muito similares.`);
        }

        if (recommendations.length === 0) {
            recommendations.push('✅ Sessão sem problemas significativos! Continue assim.');
        }

        return recommendations;
    }

    /**
     * Log formatado no console
     */
    logReport(report: DiagnosticReport) {
        console.group('🔍 Voice Control Diagnostics Report');

        console.log(`⏱️  Duração: ${(report.sessionDuration / 1000).toFixed(1)}s`);
        console.log(`📊 Taxa de Match: ${(report.matchRate * 100).toFixed(1)}%`);
        console.log(`🎯 Confiança Média: ${(report.averageConfidence * 100).toFixed(1)}%`);
        console.log(`📝 Total de Eventos: ${report.totalEvents}`);

        if (report.problemAreas.length > 0) {
            console.group('⚠️  Áreas Problemáticas:');
            report.problemAreas.forEach((area, idx) => {
                console.log(`${idx + 1}. Frase ${area.sentenceId}: "${area.sentenceText.substring(0, 50)}..."`);
                console.log(`   Issues: ${area.issues.join(', ')}`);
            });
            console.groupEnd();
        }

        if (report.recommendations.length > 0) {
            console.group('💡 Recomendações:');
            report.recommendations.forEach(rec => console.log(rec));
            console.groupEnd();
        }

        console.groupEnd();
    }

    /**
     * Exporta relatório como JSON para análise externa
     */
    exportReport(report: DiagnosticReport): string {
        return JSON.stringify(report, null, 2);
    }

    /**
     * Ativa/desativa diagnóstico
     */
    setEnabled(enabled: boolean) {
        this.isEnabled = enabled;
    }

    setVerbose(verbose: boolean) {
        this.verbose = verbose;
    }

    getVerbose() {
        return this.verbose;
    }
}

// Singleton para uso global
export const voiceDiagnostics = new VoiceDiagnostics();

// Expor no window para debugging manual
if (typeof window !== 'undefined') {
    (window as any).voiceDiagnostics = voiceDiagnostics;

    // Helper para baixar relatório facilmente
    (window as any).downloadVoiceReport = () => {
        const report = voiceDiagnostics.generateReport([]);
        // Note: passing empty sentences array means problem areas might lack context text, 
        // but raw events will still be there. Ideally logic would grab sentences from active hook,
        // but for global debug this is a good start.

        const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `voice-report-${new Date().toISOString().slice(0, 19).replace(/[:]/g, '-')}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        console.log('✅ Relatório baixado com sucesso!');
    };

    (window as any).toggleVoiceDebug = () => {
        const newState = !voiceDiagnostics.getVerbose();
        voiceDiagnostics.setVerbose(newState);
        console.log(`[Voice Diagnostics] Verbose Mode: ${newState ? 'ON' : 'OFF'}`);
    }
}
