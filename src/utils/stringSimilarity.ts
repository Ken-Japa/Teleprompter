import { clearLevenshteinCache } from './voice/levenshtein';
import { clearStemCache } from './voice/stemming';
import { clearPhoneticCache } from './voice/phonetics';

export { findBestMatch } from './voice/matcher/BestMatchEngine';
export { findSegmentedMatch } from './voice/matcher/SegmentOrchestrator';

/**
 * Clear cache when needed (e.g., on text change)
 */
export const clearMatchCache = () => {
    clearLevenshteinCache();
    clearStemCache();
    clearPhoneticCache();
};

