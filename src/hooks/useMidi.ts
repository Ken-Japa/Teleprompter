import { useState, useEffect, useCallback } from 'react';
import { MidiAction, MidiConfig, MidiMapping } from '../types';
import { MIDI_DEFAULTS } from '../config/constants';
import { useLocalStorage } from './useLocalStorage';

// Basic MIDI Types
interface MIDIMessageEvent extends Event {
    data: Uint8Array;
}

interface MIDIInput extends EventTarget {
    onmidimessage: ((event: MIDIMessageEvent) => void) | null;
}

interface MIDIAccess extends EventTarget {
    inputs: {
        values: () => IterableIterator<MIDIInput>;
    };
    onstatechange: ((event: Event) => void) | null;
}

export const useMidi = (onAction?: (action: MidiAction) => void) => {
    const [midiConfig, setMidiConfig] = useLocalStorage<MidiConfig>("neonprompt_midi_v1", MIDI_DEFAULTS as unknown as MidiConfig);
    const [isMidiEnabled, setIsMidiEnabled] = useLocalStorage<boolean>("neonprompt_midi_enabled", false);
    const [midiAccess, setMidiAccess] = useState<MIDIAccess | null>(null);
    const [isLearning, setIsLearning] = useState<MidiAction | null>(null);

    const handleMidiMessage = useCallback((event: MIDIMessageEvent) => {
        if (!event.data) return;
        const [status, data1, data2] = event.data;
        const typeBit = status & 0xF0;

        // 0x90 = Note On, 0x80 = Note Off
        // 0xB0 = Control Change
        let midiType: "note" | "cc" | null = null;
        if (typeBit === 0x90 && data2 > 0) midiType = "note";
        else if (typeBit === 0xB0) midiType = "cc";

        if (!midiType) return;

        if (isLearning) {
            const mapping: MidiMapping = { type: midiType, value: data1 };
            setMidiConfig(prev => ({ ...prev, [isLearning]: mapping }));
            setIsLearning(null);
            return;
        }

        if (onAction && isMidiEnabled) {
            Object.entries(midiConfig).forEach(([action, mapping]) => {
                if (mapping && mapping.type === midiType && mapping.value === data1) {
                    onAction(action as MidiAction);
                }
            });
        }
    }, [isLearning, midiConfig, onAction, setMidiConfig, isMidiEnabled]);

    useEffect(() => {
        if (isMidiEnabled && !midiAccess && typeof navigator !== 'undefined' && (navigator as any).requestMIDIAccess) {
            (navigator as any).requestMIDIAccess().then((access: MIDIAccess) => {
                setMidiAccess(access);
            }).catch((err: Error) => {
                console.error("MIDI access denied", err);
                setIsMidiEnabled(false);
            });
        }
    }, [isMidiEnabled, midiAccess, setIsMidiEnabled]);

    useEffect(() => {
        if (!midiAccess || !isMidiEnabled) return;

        const setupInputs = () => {
            const inputs = Array.from(midiAccess.inputs.values());
            inputs.forEach(input => {
                input.onmidimessage = handleMidiMessage;
            });
        };

        setupInputs();
        midiAccess.onstatechange = setupInputs;

        return () => {
            const inputs = Array.from(midiAccess.inputs.values());
            inputs.forEach(input => {
                input.onmidimessage = null;
            });
            midiAccess.onstatechange = null;
        };
    }, [midiAccess, isMidiEnabled, handleMidiMessage]);

    return {
        isMidiEnabled,
        setIsMidiEnabled,
        midiConfig,
        setMidiConfig,
        isLearning,
        setIsLearning,
        hasMidiSupport: typeof navigator !== 'undefined' && !!(navigator as any).requestMIDIAccess
    };
};
