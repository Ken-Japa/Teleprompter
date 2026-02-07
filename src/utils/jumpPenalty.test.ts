import { findBestMatch } from "./stringSimilarity";
import { VOICE_CONFIG } from "../config/voiceControlConfig";

describe("Jump Penalty Logic", () => {
    const text = "Alpha Bravo Charlie Delta Echo Foxtrot Golf Hotel India Juliet Kilo Lima Mike November Oscar Papa Quebec Romeo Sierra Tango Uniform Victor Whiskey X-ray Yankee Zulu";

    it("should have a worse ratio (higher) for far matches than local matches for imperfect input", () => {
        const pattern = "Echoo"; // Typos: Echo -> Echoo (imperfect match)
        const targetWord = "Echo";
        const targetIndex = text.indexOf(targetWord);

        // 1. Local match (lastMatchIndex is close)
        const localResult = findBestMatch(text, pattern, 0, 1000, 0.5, 'en', false, false, 0.3, 0.1, targetIndex);

        // 2. Far match (lastMatchIndex is far)
        const farResult = findBestMatch(text, pattern, 0, 1000, 0.5, 'en', false, false, 0.3, 0.1, 0);

        expect(localResult).not.toBeNull();
        expect(farResult).not.toBeNull();

        // Higher ratio = worse match (more distance)
        expect(farResult!.ratio).toBeGreaterThan(localResult!.ratio);
    });

    it("should penalize imperfect matches more when far away", () => {
        const pattern = "Zulo"; // Typos: Zulu -> Zulo (distance 1)
        const targetWord = "Zulu";
        const zuluIndex = text.indexOf(targetWord);

        // 1. Local match
        const localResult = findBestMatch(text, pattern, 0, 1000, 0.5, 'en', false, false, 0.3, 0.1, zuluIndex);

        // 2. Far match
        const farResult = findBestMatch(text, pattern, 0, 1000, 0.5, 'en', false, false, 0.3, 0.1, 0);

        expect(localResult).not.toBeNull();
        expect(farResult).not.toBeNull();

        const jumpDistance = zuluIndex;
        const expectedPenalty = 1 + (VOICE_CONFIG.JUMP_PENALTY.maxPenaltyBonus * (1 - Math.exp(-jumpDistance / VOICE_CONFIG.JUMP_PENALTY.k)));

        // farResult.ratio should be approximately localResult.ratio * expectedPenalty
        expect(farResult!.ratio).toBeCloseTo(localResult!.ratio * expectedPenalty, 2);
    });
});
