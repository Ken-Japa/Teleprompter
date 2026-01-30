/**
 * Formats milliseconds into SRT time format: HH:MM:SS,mmm
 */
export const formatSrtTime = (ms: number): string => {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = ms % 1000;

    return `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${seconds.toString().padStart(2, '0')},${milliseconds
            .toString()
            .padStart(3, '0')}`;
};

/**
 * Formats milliseconds into VTT time format: HH:MM:SS.mmm
 */
export const formatVttTime = (ms: number): string => {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = ms % 1000;

    return `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds
            .toString()
            .padStart(3, '0')}`;
};

export interface SubtitleSegment {
    startMs: number;
    endMs: number;
    text: string;
}

/**
 * Generates SRT file content from segments
 */
export const generateSrt = (segments: SubtitleSegment[]): string => {
    return segments
        .map((segment, index) => {
            return `${index + 1}\n${formatSrtTime(segment.startMs)} --> ${formatSrtTime(
                segment.endMs
            )}\n${segment.text}\n`;
        })
        .join('\n');
};

/**
 * Generates VTT file content from segments
 */
export const generateVtt = (segments: SubtitleSegment[]): string => {
    let content = 'WEBVTT\n\n';
    content += segments
        .map((segment) => {
            return `${formatVttTime(segment.startMs)} --> ${formatVttTime(
                segment.endMs
            )}\n${segment.text}\n`;
        })
        .join('\n');
    return content;
};

/**
 * Triggers a file download in the browser
 */
export const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 0);
};
