import { memo } from "react";
import * as S from "../ui/Styled";
import { PrompterActions } from "../../hooks/usePrompterSettings";
import { trackSettingChange } from "../../utils/analytics";

interface FontSettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    fontFamily: string;
    setFontFamily: PrompterActions["setFontFamily"];
}

export const FontSettingsModal = memo(({ isOpen, onClose, fontFamily, setFontFamily }: FontSettingsModalProps) => {

    const handleSelectFont = (font: string) => {
        trackSettingChange("font_family", font);
        setFontFamily(font);
        // Optional: close on select? User might want to preview. Let's keep open.
    };

    const fonts = [
        { id: 'sans-serif', name: 'Padrão (Inter)', style: 'font-sans' },
        { id: 'Roboto Mono', name: 'Roboto Mono (Monospace)', style: 'font-[Roboto Mono]' },
        { id: 'Poppins', name: 'Poppins', style: 'font-[Poppins]' },
        { id: 'Lexend', name: 'Lexend', style: 'font-[Lexend]' },
        { id: 'OpenDyslexic', name: 'OpenDyslexic', style: 'font-[OpenDyslexic]' },
    ];

    return (
        <S.Modal isOpen={isOpen} onClose={onClose} title="Fonte do Texto">
            <div className="flex flex-col space-y-4 p-4">
                {fonts.map((f) => (
                    <button
                        key={f.id}
                        onClick={() => handleSelectFont(f.id)}
                        className={`flex items-center justify-between p-4 rounded-xl border transition-all ${fontFamily === f.id
                            ? "bg-brand-600 border-brand-400 text-white shadow-lg"
                            : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:border-slate-600"
                            }`}
                    >
                        <span className={`text-lg ${f.style === 'font-[OpenDyslexic]' ? 'font-[OpenDyslexic]' : 'font-sans'}`}>
                            {f.name}
                        </span>
                        {fontFamily === f.id && (
                            <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
                        )}
                    </button>
                ))}

            </div>
        </S.Modal>
    );
});
