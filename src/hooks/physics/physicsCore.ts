import { PhysicsMetrics } from "./types";
import { PHYSICS_CONSTANTS } from "../../config/constants";

export const calculateAutoScroll = (
 isPlaying: boolean,
 isUserTouching: boolean,
 isManualScrolling: boolean,
 momentum: number,
 velocityCache: number,
 deltaTime: number,
 internalScrollPos: number,
 metrics: PhysicsMetrics,
 onAutoStop: () => void
): number => {
 if (
  isPlaying &&
  !isUserTouching &&
  !isManualScrolling &&
  Math.abs(momentum) < PHYSICS_CONSTANTS.AUTO_SCROLL_THRESHOLD
 ) {
  if (metrics.scrollHeight > metrics.clientHeight) {
   const moveAmount = (velocityCache * deltaTime) / 1000;

   if (internalScrollPos + metrics.clientHeight < metrics.scrollHeight - 2) {
    return moveAmount;
   } else {
    // Fim do conteúdo atingido
    onAutoStop();
    return 0;
   }
  }
 }
 return 0;
};

export const calculateMomentum = (
 momentum: number,
 isUserTouching: boolean,
 timeScale: number
): { delta: number; newMomentum: number } => {
 let delta = 0;
 let newMomentum = momentum;

 if (Math.abs(newMomentum) > PHYSICS_CONSTANTS.MOMENTUM_THRESHOLD) {
  delta += newMomentum * timeScale;
  if (!isUserTouching) {
   newMomentum *= Math.pow(PHYSICS_CONSTANTS.FRICTION_NATURAL, timeScale); // Desaceleração natural
  } else {
   newMomentum *= PHYSICS_CONSTANTS.FRICTION_TOUCH; // Fricção ao tocar
  }
 } else if (!isUserTouching) {
  newMomentum = 0;
 }

 return { delta, newMomentum };
};
