import { useEffect } from 'react';

interface KeyboardShortcutsProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  speed: number;
  onSpeedChange: (newSpeed: number) => void;
  fontSize: number;
  onFontSizeChange: (newSize: number) => void;
  onToggleMirror: () => void;
  onToggleFlip: () => void;
  onToggleFocus: () => void;
}

/**
 * Hook customizado para gerenciar atalhos de teclado globais.
 * Ouve eventos de 'keydown' na janela e despacha ações apropriadas
 * se o foco não estiver em um campo de entrada de texto.
 */
export const useKeyboardShortcuts = ({
  isPlaying,
  onTogglePlay,
  speed,
  onSpeedChange,
  fontSize,
  onFontSizeChange,
  onToggleMirror,
  onToggleFlip,
  onToggleFocus
}: KeyboardShortcutsProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignora se o usuário estiver digitando em um input ou área editável
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || (e.target as HTMLElement).isContentEditable) {
        return;
      }

      switch (e.code) {
        case 'Space':
        case 'Enter':
          e.preventDefault();
          onTogglePlay();
          break;
        case 'ArrowUp':
          e.preventDefault();
          onSpeedChange(Math.min(speed + 1, 20)); // Aumenta velocidade (limite 20)
          break;
        case 'ArrowDown':
          e.preventDefault();
          onSpeedChange(Math.max(speed - 1, 0)); // Diminui velocidade (min 0)
          break;
        case 'Equal': // Tecla +
        case 'NumpadAdd':
          if (e.ctrlKey || e.metaKey) return; // Permite zoom do navegador
          onFontSizeChange(fontSize + 5);
          break;
        case 'Minus': // Tecla -
        case 'NumpadSubtract':
          if (e.ctrlKey || e.metaKey) return; // Permite zoom do navegador
          onFontSizeChange(Math.max(10, fontSize - 5));
          break;
        case 'KeyM':
          onToggleMirror();
          break;
        case 'KeyV':
          onToggleFlip();
          break;
        case 'KeyF':
          onToggleFocus();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, onTogglePlay, speed, onSpeedChange, fontSize, onFontSizeChange, onToggleMirror, onToggleFlip, onToggleFocus]);
};
