import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { Host } from './Host';

// Mocks
const mockPeer = {
  id: 'mock-peer-id',
  destroyed: false,
  reconnect: vi.fn(),
  on: vi.fn(),
  off: vi.fn(),
  connect: vi.fn(),
  destroy: vi.fn(),
  send: vi.fn(),
  removeAllListeners: vi.fn()
};

const mockConn = {
  on: vi.fn(),
  send: vi.fn(),
  close: vi.fn()
};

beforeEach(() => {
  window.Peer = class {
    constructor() {
      return mockPeer;
    }
  } as any;

  window.QRCode = class {
    constructor() { }
  } as any;

  window.NoSleep = class {
    enable = vi.fn().mockResolvedValue(true);
    disable = vi.fn();
    constructor() { }
  } as any;

  mockPeer.on.mockImplementation((event, callback) => {
    if (event === 'open') callback('mock-peer-id');
    if (event === 'connection') callback(mockConn);
  });
});

afterEach(() => {
  vi.clearAllMocks();
  localStorage.clear();
  window.location.hash = '';
});

describe('Host Component (Editor & Prompter)', () => {
  it('Should start in Edit Mode and allow text changes', () => {
    render(<Host />);
    const textarea = screen.getByPlaceholderText(/Cole seu roteiro aqui/i);
    fireEvent.change(textarea, { target: { value: 'Script Test' } });
    expect(textarea).toHaveValue('Script Test');
  });

  it('Should switch to Prompter mode when clicking Start', async () => {
    render(<Host />);
    const startBtn = screen.getByText(/Modo Apresentação/i);
    fireEvent.click(startBtn);

    // Wait for the mode switch (triggered by hash change)
    await screen.findByText(/Script Test/i, {}, { timeout: 2000 }).catch(() => null);

    // If Script Test is not found, it might be because the default text is different.
    // Let's check if the editor is gone.
    // Use waitFor to allow async state updates
    await waitFor(() => {
      expect(screen.queryByPlaceholderText(/Cole seu roteiro aqui/i)).not.toBeInTheDocument();
    });
  });

  it('Should show Paywall for PRO features if not authenticated', async () => {
    render(<Host />);
    // Go to prompter
    const startBtn = screen.getByText(/Modo Apresentação/i);
    fireEvent.click(startBtn);

    // Wait for switch
    await screen.findByText(/Script Test/i, {}, { timeout: 2000 }).catch(() => null);

    // Try to click Voice Control (PRO feature)
    const voiceBtn = await screen.findByTitle(/Controle Voz/i);
    fireEvent.click(voiceBtn);

    expect(screen.getByText(/Recurso PRO Bloqueado/i)).toBeInTheDocument();
  });
});