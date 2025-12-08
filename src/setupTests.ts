import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock ResizeObserver
class ResizeObserver {
 observe = vi.fn();
 unobserve = vi.fn();
 disconnect = vi.fn();
}

vi.stubGlobal("ResizeObserver", ResizeObserver);

vi.mock("nosleep.js", () => {
 return {
  default: class NoSleep {
   enable = vi.fn().mockResolvedValue(undefined);
   disable = vi.fn();
  },
 };
});

vi.mock("peerjs", () => {
 return {
  Peer: class {
   constructor() {
    // Return the global mock if available, or a default one
    if ((window as any).Peer) {
     return new (window as any).Peer();
    }
    return {
     on: vi.fn(),
     connect: vi.fn(),
     reconnect: vi.fn(),
     destroy: vi.fn(),
     disconnect: vi.fn(),
     off: vi.fn(),
     call: vi.fn(),
     id: "mock-peer-id",
    };
   }
  },
 };
});
