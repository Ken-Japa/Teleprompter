import { useEffect, useRef, useState } from "react";
import { logger } from "../utils/logger";
import NoSleep from "nosleep.js";

// Singleton instance for NoSleep to share across components and hooks
let globalNoSleepInstance: any = null;

const getNoSleep = () => {
 if (typeof window === "undefined") return null;
 if (!globalNoSleepInstance) {
  try {
   globalNoSleepInstance = new NoSleep();
  } catch (e) {
   logger.error("Failed to init NoSleep global instance", { error: e as Error });
  }
 }
 return globalNoSleepInstance;
};

// Helper to detect iOS
const isIOS = () => {
 if (typeof navigator === "undefined") return false;
 return (
  /iPad|iPhone|iPod/.test(navigator.userAgent) ||
  (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
 );
};

/**
 * Explicitly try to enable NoSleep (useful to call from a click handler)
 */
export const tryEnableNoSleep = () => {
 const noSleep = getNoSleep();
 if (noSleep) {
  try {
   noSleep.enable();
   logger.info("NoSleep enabled explicitly via user interaction.");
  } catch (e) {
   logger.error("Failed to enable NoSleep explicitly", { error: e as Error });
  }
 }
};

export const useWakeLock = (active: boolean = true) => {
 const [status, setStatus] = useState<"active" | "inactive" | "unsupported">("inactive");
 const wakeLockRef = useRef<any>(null);

 useEffect(() => {
  if (!active) {
   // Release Native
   if (wakeLockRef.current) {
    wakeLockRef.current.release().catch(() => {});
    wakeLockRef.current = null;
   }
   // Disable NoSleep
   const noSleep = getNoSleep();
   if (noSleep) {
    noSleep.disable();
   }
   setStatus("inactive");
   return;
  }

  let isCancelled = false;
  const cleanupFunctions: (() => void)[] = [];

  const requestLock = async () => {
   const ios = isIOS();

   // 1. Try Native Wake Lock API
   // Skip native API on iOS because it may not prevent WebRTC background throttling effectively.
   // We prefer NoSleep.js (video loop) on iOS to keep the connection alive.
   if ("wakeLock" in navigator && !ios) {
    try {
     const lock = await (navigator as any).wakeLock.request("screen");
     if (!isCancelled) {
      wakeLockRef.current = lock;
      setStatus("active");

      lock.addEventListener("release", () => {
       if (!isCancelled) setStatus("inactive");
      });
     }
     return; // Native success, skip NoSleep
    } catch (err) {
     logger.warn("Wake Lock request failed, falling back:", { error: err as Error });
    }
   }

   // 2. Fallback to NoSleep.js
   const noSleep = getNoSleep();
   if (noSleep) {
    try {
     // NoSleep requires a user gesture interaction to enable.
     const enableNoSleep = () => {
      if (!isCancelled) {
       noSleep.enable();
       setStatus("active");
      }
      cleanupNoSleepListeners();
     };

     const cleanupNoSleepListeners = () => {
      document.removeEventListener("click", enableNoSleep);
      document.removeEventListener("touchstart", enableNoSleep);
     };

     document.addEventListener("click", enableNoSleep);
     document.addEventListener("touchstart", enableNoSleep);

     // Ensure cleanup if component unmounts before gesture
     cleanupFunctions.push(cleanupNoSleepListeners);
    } catch (err) {
     logger.error("NoSleep enable failed", { error: err as Error });
    }
   } else {
    if (!isCancelled) setStatus("unsupported");
   }
  };

  requestLock();

  // Re-acquire on visibility change (tabs backgrounding releases lock automatically)
  const handleVisibilityChange = () => {
   if (document.visibilityState === "visible" && active) {
    requestLock();
   }
  };

  document.addEventListener("visibilitychange", handleVisibilityChange);

  return () => {
   isCancelled = true;
   document.removeEventListener("visibilitychange", handleVisibilityChange);
   cleanupFunctions.forEach((cleanup) => cleanup());
   if (wakeLockRef.current) {
    wakeLockRef.current.release().catch(() => {});
    wakeLockRef.current = null;
   }
   // Disable NoSleep
   const noSleep = getNoSleep();
   if (noSleep) {
    noSleep.disable();
   }
  };
 }, [active]);

 return { status };
};
