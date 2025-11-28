import { renderHook, act } from "@testing-library/react";
import { useHostController } from "./useHostController";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";

// Mocks
const mockPeer = {
 id: "mock-peer-id",
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

 // Clear hash
 window.location.hash = "";
});

afterEach(() => {
 vi.clearAllMocks();
 localStorage.clear();
 window.location.hash = "";
});

describe("useHostController Hook", () => {
 it("Should initialize with default values", () => {
  const { result } = renderHook(() => useHostController());

  expect(result.current.state.text).toBeDefined();
  expect(result.current.state.isEditMode).toBe(true);
  expect(result.current.state.prompterState.isPlaying).toBe(false);
 });

 it("Should update text", () => {
  const { result } = renderHook(() => useHostController());

  act(() => {
   result.current.actions.setText("New Script Content");
  });

  expect(result.current.state.text).toBe("New Script Content");
 });

 it("Should toggle mode when starting presentation", () => {
  const { result } = renderHook(() => useHostController());

  // Initially in Edit Mode
  expect(result.current.state.isEditMode).toBe(true);

  act(() => {
   result.current.actions.navigation.startPresentation();
  });

  // Hash change should trigger re-render in the component,
  // but in renderHook we might need to simulate the event or wait.
  // However, useHostController listens to hashchange.
  // JSDOM might not fire hashchange automatically on hash assignment in this context immediately
  // or renderHook might not pick it up without a wrapper or manual event dispatch.

  // Let's simulate the event if needed.
  act(() => {
   window.dispatchEvent(new HashChangeEvent("hashchange"));
  });

  expect(window.location.hash).toBe("#app/play");
  expect(result.current.state.isEditMode).toBe(false);
 });

 it("Should handle prompter state changes", () => {
  const { result } = renderHook(() => useHostController());

  act(() => {
   result.current.actions.handlePrompterStateChange(true, 5);
  });

  expect(result.current.state.prompterState.isPlaying).toBe(true);
  expect(result.current.state.prompterState.speed).toBe(5);
 });
});
