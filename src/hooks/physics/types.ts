export interface PhysicsMetrics {
  scrollHeight: number;
  clientHeight: number;
}

export interface PhysicsState {
  momentum: number;
  internalScrollPos: number;
  lastFrameTime: number;
  velocityCache: number;
}
