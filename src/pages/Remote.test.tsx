import { render, screen, waitFor } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { Remote } from "./Remote";

const mockPeer = {
 id: "remote-peer-id",
 destroyed: false,
 reconnect: vi.fn(),
 on: vi.fn(),
 off: vi.fn(),
 connect: vi.fn(),
 destroy: vi.fn(),
 send: vi.fn(),
 removeAllListeners: vi.fn(),
};

const mockConn = {
 on: vi.fn(),
 send: vi.fn(),
 close: vi.fn(),
};

beforeEach(() => {
 window.Peer = class {
  constructor() {
   return mockPeer;
  }
 } as any;

 window.NoSleep = class {
  enable = vi.fn().mockResolvedValue(true);
  disable = vi.fn();
  constructor() {}
 } as any;

 mockPeer.connect.mockReturnValue(mockConn);
 mockPeer.on.mockImplementation((event, callback) => {
  if (event === "open") callback("remote-id");
 });
});

afterEach(() => {
 vi.clearAllMocks();
});

describe("Remote Component", () => {
 it("Should initialize PeerJS connection on mount", async () => {
  render(<Remote hostId="host-123" />);
  // Peer constructor check removed as it is now a class mock
  await waitFor(() => {
   expect(mockPeer.connect).toHaveBeenCalledWith("host-123", expect.anything());
  });
 });

 it("Should show connecting state initially", () => {
  render(<Remote hostId="host-123" />);
  expect(screen.getByText(/Buscando Ninja Host/i)).toBeInTheDocument();
 });
});
