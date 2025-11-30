import { render, screen, waitFor } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import App from "./App";

// Basic Mocks for Global Objects used in App
const mockPeer = {
 id: "test-peer",
 destroyed: false,
 reconnect: vi.fn(),
 on: vi.fn(),
 off: vi.fn(),
 connect: vi.fn(),
 destroy: vi.fn(),
 send: vi.fn(),
 removeAllListeners: vi.fn(),
};

beforeEach(() => {
 window.Peer = class {
  constructor() {
   return mockPeer;
  }
 } as any;

 window.QRCode = class {
  constructor() {}
 } as any;

 window.NoSleep = class {
  enable = vi.fn().mockResolvedValue(true);
  disable = vi.fn();
  constructor() {}
 } as any;
});

afterEach(() => {
 vi.clearAllMocks();
 localStorage.clear();
 window.location.hash = "";
});

describe("App Routing Integration", () => {
 it("Should render Landing Page by default", () => {
  render(<App />);
  // Updated matcher for "PROMPT NINJA" or other landing text
  // The landing page might have changed text or structure.
  // "Start Your Free Teleprompter" is a CTA
  expect(screen.getByText(/Start Your Free Teleprompter/i)).toBeInTheDocument();
 });

 it("Should route to Host (Editor) when hash is #app", async () => {
  window.location.hash = "#app";
  render(<App />);
  await waitFor(() => {
   expect(screen.getAllByLabelText(/Start Presentation Mode/i)[0]).toBeInTheDocument();
  });
 });

 it("Should route to Remote when hash contains #remote", async () => {
  window.location.hash = "#remote?id=test-123";
  render(<App />);
  await waitFor(() => {
   expect(screen.getByText(/Searching Ninja Host/i)).toBeInTheDocument();
  });
 });
});
