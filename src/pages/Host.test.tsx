import { render, screen, fireEvent } from '@testing-library/react';
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
  send: vi.fn()
};

const mockConn = {
  on: vi.fn(),
  send: vi.fn(),
  close: vi.fn()
};

beforeEach(() => {
  window.Peer = vi.fn(() => mockPeer as any);
  window.QRCode = vi.fn();
  window.NoSleep = vi.fn(() => ({ enable: vi.fn().mockResolvedValue(true) }));

  mockPeer.on.mockImplementation((event, callback) => {
    if (event === 'open') callback('mock-peer-id');
    if (event === 'connection') callback(mockConn);
  });
});

afterEach(() => {
  vi.clearAllMocks();
  localStorage.clear();
});

describe('Host Component (Editor & Prompter)', () => {
  it('Should start in Edit Mode and allow text changes', () => {
    render(<Host />);
    const textarea = screen.getByPlaceholderText(/Cole seu roteiro aqui/i);
    fireEvent.change(textarea, { target: { value: 'Script Test' } });
    expect(textarea).toHaveValue('Script Test');
  });

  it('Should switch to Prompter mode when clicking Start', () => {
    render(<Host />);
    const startBtn = screen.getByText(/Modo Apresentação/i);
    fireEvent.click(startBtn);

    // Editor gone
    expect(screen.queryByPlaceholderText(/Cole seu roteiro aqui/i)).not.toBeInTheDocument();
    // Prompter active
    expect(screen.getByText(/Script Test/i)).toBeInTheDocument(); // If previous test state persisted or default
  });

  it('Should show Paywall for PRO features if not authenticated', () => {
    render(<Host />);
    // Go to prompter
    fireEvent.click(screen.getByText(/Modo Apresentação/i));

    // Try to click Voice Control (PRO feature)
    const voiceBtn = screen.getByTitle(/Controle Voz/i);
    fireEvent.click(voiceBtn);

    expect(screen.getByText(/Recurso PRO Bloqueado/i)).toBeInTheDocument();
  });
});