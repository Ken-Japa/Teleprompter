import { matchBufferPool } from './matcher/MatchBufferManager';

/**
 * Fast Levenshtein distance with memoization and early exit.
 * Optimized for short strings (word/sentence matching).
 * Uses buffer pooling to mitigate GC pressure from TypedArray allocations.
 */
export const levenshteinDistance = (a: string | Uint16Array, b: string | Uint16Array): number => {
    const alen = a.length;
    const blen = b.length;

    // Early returns for common cases
    if (alen === 0) return blen;
    if (blen === 0) return alen;

    // Ensure 'a' is shorter for memory optimization

    // Ensure 'a' is shorter for memory optimization
    let strA = a;
    let strB = b;
    let internalAlen = alen;
    let internalBlen = blen;

    if (internalAlen > internalBlen) {
        [strA, strB] = [strB, strA];
        [internalAlen, internalBlen] = [internalBlen, internalAlen];
    }

    // Use pooled typed arrays if within buffer size limit (1024 chars)
    const isSmall = internalAlen < 1024;
    let prevRow = isSmall ? matchBufferPool.acquireUint16(internalAlen + 1) : new Uint16Array(internalAlen + 1);
    let currentRow = isSmall ? matchBufferPool.acquireUint16(internalAlen + 1) : new Uint16Array(internalAlen + 1);

    try {
        // Initialize first row
        for (let i = 0; i <= internalAlen; i++) {
            prevRow[i] = i;
        }

        const aIsStringInternal = typeof strA === 'string';
        const bIsStringInternal = typeof strB === 'string';

        for (let i = 1; i <= internalBlen; i++) {
            currentRow[0] = i;
            const bChar = bIsStringInternal ? (strB as string).charCodeAt(i - 1) : (strB as Uint16Array)[i - 1];

            for (let j = 1; j <= internalAlen; j++) {
                const aChar = aIsStringInternal ? (strA as string).charCodeAt(j - 1) : (strA as Uint16Array)[j - 1];
                const cost = aChar === bChar ? 0 : 1;
                currentRow[j] = Math.min(
                    currentRow[j - 1] + 1, // insertion
                    prevRow[j] + 1,        // deletion
                    prevRow[j - 1] + cost  // substitution
                );
            }

            // Swap rows
            [prevRow, currentRow] = [currentRow, prevRow];
        }

        return prevRow[internalAlen];
    } finally {
        if (isSmall) {
            matchBufferPool.releaseUint16(prevRow);
            matchBufferPool.releaseUint16(currentRow);
        }
    }
};

export const clearLevenshteinCache = () => {
    // Cache removed for memory efficiency in buffer-based matching
};
