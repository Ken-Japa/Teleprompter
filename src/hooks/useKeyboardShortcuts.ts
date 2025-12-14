import { useEffect, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { HotkeyAction, HotkeyConfig } from '../types';
import { HOTKEY_DEFAULTS } from '../config/constants';

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
  onExit?: () => void;
  onReset?: () => void;
  onToggleHud?: () => void;
}

/**
 * Hook customizado para gerenciar atalhos de teclado globais.
 * Permite customização via localStorage e suporta novas ações.
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
  onToggleFocus,
  onExit,
  onReset,
  onToggleHud
}: KeyboardShortcutsProps) => {
  // Ler configurações do localStorage
  const [customHotkeys] = useLocalStorage<HotkeyConfig>("neonprompt_hotkeys_v1", HOTKEY_DEFAULTS as unknown as HotkeyConfig);

  // Criar mapa de lookup reverso (Code -> Action) para performance
  const actionMap = useMemo(() => {
    const map: Record<string, HotkeyAction> = {};
    const config = { ...HOTKEY_DEFAULTS, ...customHotkeys }; // Merge defaults

    Object.entries(config).forEach(([action, code]) => {
      if (code) map[code] = action as HotkeyAction;
    });
    return map;
  }, [customHotkeys]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignora se o usuário estiver digitando em um input ou área editável
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || (e.target as HTMLElement).isContentEditable) {
        return;
      }

      // 1. Identificar Ação
      let action = actionMap[e.code];

      // Hardcode Alias: Enter é sempre Play (pedido do usuário)
      if (e.code === 'Enter') action = HotkeyAction.TOGGLE_PLAY;

      if (!action) return;

      // 2. Executar Ação
      switch (action) {
        case HotkeyAction.TOGGLE_PLAY:
          e.preventDefault();
          onTogglePlay();
          break;
        case HotkeyAction.SPEED_UP:
          e.preventDefault();
          onSpeedChange(Math.min(speed + 1, 20)); // Aumenta velocidade
          break;
        case HotkeyAction.SPEED_DOWN:
          e.preventDefault();
          onSpeedChange(Math.max(speed - 1, 0)); // Diminui velocidade
          break;
        case HotkeyAction.FONT_INCREASE:
          if (e.ctrlKey || e.metaKey) return; // Permite zoom do navegador
          onFontSizeChange(fontSize + 5);
          break;
        case HotkeyAction.FONT_DECREASE:
          if (e.ctrlKey || e.metaKey) return;
          onFontSizeChange(Math.max(10, fontSize - 5));
          break;
        case HotkeyAction.TOGGLE_MIRROR:
          onToggleMirror();
          break;
        case HotkeyAction.TOGGLE_FLIP:
          onToggleFlip();
          break;
        case HotkeyAction.TOGGLE_FOCUS:
          onToggleFocus();
          break;
        case HotkeyAction.EXIT:
          if (onExit) onExit();
          break;
        case HotkeyAction.RESET:
          if (onReset) onReset();
          break;
        case HotkeyAction.TOGGLE_HUD:
          if (onToggleHud) onToggleHud();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    actionMap, // Dependência crítica: recria listener se mapa mudar
    isPlaying,
    onTogglePlay,
    speed,
    onSpeedChange,
    fontSize,
    onFontSizeChange,
    onToggleMirror,
    onToggleFlip,
    onToggleFocus,
    onExit,
    onReset,
    onToggleHud
  ]);
};
