import { renderHook, act } from "@testing-library/react";
import { useNavigationMap } from "./useNavigationMap";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";

describe("useNavigationMap Hook", () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    vi.useFakeTimers();
    // Setup DOM mock
    container = document.createElement("div");
    Object.defineProperty(container, "scrollHeight", { value: 2000, configurable: true });
    Object.defineProperty(container, "clientHeight", { value: 500, configurable: true });
    Object.defineProperty(container, "scrollTop", { value: 0, writable: true });
    container.getBoundingClientRect = vi.fn().mockReturnValue({ top: 0, height: 500 });
  });

  afterEach(() => {
    vi.useRealTimers();
    document.body.innerHTML = "";
  });

  it("Should calculate navigation map correctly", () => {
    const onUpdate = vi.fn();
    const sentences = [
      { id: 0, fragments: [{ text: "Start" }], startIndex: 0, cleanContent: "Start" },
      { id: 1, fragments: [{ text: "Middle" }], startIndex: 10, cleanContent: "Middle" },
      { id: 2, fragments: [{ text: "End" }], startIndex: 20, cleanContent: "End" },
    ];

    // Mock elements in DOM
    const el0 = document.createElement("div");
    el0.id = "sentence-0";
    el0.getBoundingClientRect = vi.fn().mockReturnValue({ top: 100, height: 50 }); // Relative to viewport top (0)
    document.body.appendChild(el0);

    const el1 = document.createElement("div");
    el1.id = "sentence-1";
    el1.getBoundingClientRect = vi.fn().mockReturnValue({ top: 1000, height: 50 });
    document.body.appendChild(el1);

    const el2 = document.createElement("div");
    el2.id = "sentence-2";
    el2.getBoundingClientRect = vi.fn().mockReturnValue({ top: 1900, height: 50 });
    document.body.appendChild(el2);

    renderHook(() =>
      useNavigationMap({
        sentences: sentences as any,
        scrollContainerRef: { current: container },
        fontSize: 16,
        margin: 10,
        isMirrored: false,
        isFlipVertical: false,
        isUpperCase: false,
        onNavigationMapUpdate: onUpdate,
      })
    );

    // Fast-forward timers to trigger calculation (initial delay + idle/timeout)
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(onUpdate).toHaveBeenCalled();
    const map = onUpdate.mock.calls[0][0];
    expect(map).toHaveLength(3);
    
    // Verify first item
    expect(map[0].id).toBe(0);
    expect(map[0].label).toBe("Start");
    // Calculation:
    // Container top: 0
    // el0 top: 100
    // el0 relative top: 100 - 0 + 0 = 100
    // centerOffset: 250
    // targetScroll: 100 - 250 + 25 = -125 -> clamped to 0
    // maxScroll: 2000 - 500 = 1500
    // progress: 0 / 1500 = 0
    expect(map[0].progress).toBe(0);

    // Verify last item
    // el2 top: 1900
    // el2 relative top: 1900
    // targetScroll: 1900 - 250 + 25 = 1675 -> clamped to 1500
    // progress: 1500 / 1500 = 1
    expect(map[2].progress).toBe(1);
  });

  it("Should not update if no container", () => {
    const onUpdate = vi.fn();
    renderHook(() =>
      useNavigationMap({
        sentences: [],
        scrollContainerRef: { current: null },
        fontSize: 16,
        margin: 10,
        isMirrored: false,
        isFlipVertical: false,
        isUpperCase: false,
        onNavigationMapUpdate: onUpdate,
      })
    );

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(onUpdate).not.toHaveBeenCalled();
  });
});
