import { renderHook, act } from "@testing-library/react";
import { useRemoteController } from "./useRemoteController";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { ConnectionStatus, MessageType } from "../types";

// Mocks for dependencies
const mockSendMessage = vi.fn();
const mockSetOnMessage = vi.fn();

vi.mock("./usePeerRemote", () => ({
 usePeerRemote: () => ({
  status: ConnectionStatus.CONNECTED,
  sendMessage: mockSendMessage,
  setOnMessage: mockSetOnMessage,
  errorMessage: null,
 }),
}));

const mockStartListening = vi.fn();
const mockStopListening = vi.fn();
const mockResetVoice = vi.fn();

vi.mock("./useVoiceControl", () => ({
 useVoiceControl: () => ({
  startListening: mockStartListening,
  stopListening: mockStopListening,
  resetVoice: mockResetVoice,
  activeSentenceIndex: 0,
  voiceProgress: 0,
 }),
}));

const mockStartRecording = vi.fn();
const mockStopRecording = vi.fn();
const mockDownloadRecording = vi.fn();

vi.mock("./useMediaRecorder", () => ({
 useMediaRecorder: () => ({
  isRecording: false,
  recordingTime: 0,
  hasRecordedData: false,
  startRecording: mockStartRecording,
  stopRecording: mockStopRecording,
  downloadRecording: mockDownloadRecording,
 }),
}));

// Mock Navigator Vibrate
const mockVibrate = vi.fn();
Object.defineProperty(navigator, "vibrate", {
 value: mockVibrate,
 writable: true,
});

describe("useRemoteController Hook", () => {
 const HOST_ID = "test-host-id";

 beforeEach(() => {
  vi.clearAllMocks();
 });

 it("Should initialize with default values", () => {
  const { result } = renderHook(() => useRemoteController(HOST_ID));

  expect(result.current.state.isPlaying).toBe(false);
  expect(result.current.state.speed).toBe(2);
  expect(result.current.state.status).toBe(ConnectionStatus.CONNECTED);
 });

 it("Should handle incoming SYNC_STATE message", () => {
  const { result } = renderHook(() => useRemoteController(HOST_ID));

  // Retrieve the callback passed to setOnMessage
  const onMessageCallback = mockSetOnMessage.mock.calls[0][0];

  const syncPayload = {
   isPlaying: true,
   speed: 5,
   settings: { fontSize: 40 },
   text: "Remote Text",
   elapsedTime: 10,
   navigationMap: [],
  };

  act(() => {
   onMessageCallback({
    type: MessageType.SYNC_STATE,
    payload: syncPayload,
    timestamp: Date.now(),
   });
  });

  expect(result.current.state.isPlaying).toBe(true);
  expect(result.current.state.speed).toBe(5);
  expect(result.current.state.text).toBe("Remote Text");
 });

 it("Should toggle play/pause and send message", () => {
  const { result } = renderHook(() => useRemoteController(HOST_ID));

  act(() => {
   result.current.actions.handlePlayToggle();
  });

  expect(mockSendMessage).toHaveBeenCalledWith(MessageType.PLAY);

  // Simulate playing state update via message (or just toggle back if state was updated optimistically)
  // Hook updates state optimistically: setIsPlaying(newState)
  expect(result.current.state.isPlaying).toBe(true);

  act(() => {
   result.current.actions.handlePlayToggle();
  });
  expect(mockSendMessage).toHaveBeenCalledWith(MessageType.PAUSE);
  expect(result.current.state.isPlaying).toBe(false);
 });

 it("Should change speed and send message", () => {
  vi.useFakeTimers();
  const { result } = renderHook(() => useRemoteController(HOST_ID));

  act(() => {
   result.current.actions.handleSpeedChange(5);
  });

  // Optimistic update
  expect(result.current.state.speed).toBe(5);

  // Advance timer to trigger debounce
  act(() => {
   vi.advanceTimersByTime(300);
  });

  expect(mockSendMessage).toHaveBeenCalledWith(MessageType.SPEED_UPDATE, 5);
  vi.useRealTimers();
 });
});
