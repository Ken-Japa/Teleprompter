import { useState, useCallback } from "react";

export const usePictureInPicture = () => {
 const [pipWindow, setPipWindow] = useState<Window | null>(null);

 const togglePiP = useCallback(async () => {
  // If PiP is already active, close it
  if (pipWindow) {
   pipWindow.close();
   setPipWindow(null);
   return;
  }

  // Check API support
  // @ts-ignore - documentPictureInPicture is not yet in standard TS types
  if (!window.documentPictureInPicture) {
   alert("Picture-in-Picture API not supported in this browser. Try Chrome or Edge.");
   return;
  }

  try {
   // @ts-ignore
   const win = await window.documentPictureInPicture.requestWindow({
    width: 400,
    height: 600,
   });

   // Copy all styles from the main window to the PiP window
   // This is crucial for Tailwind and styled-components to work
   Array.from(document.styleSheets).forEach((styleSheet) => {
    try {
     if (styleSheet.href) {
      const newLink = document.createElement("link");
      newLink.rel = "stylesheet";
      newLink.href = styleSheet.href;
      win.document.head.appendChild(newLink);
     } else if (styleSheet.cssRules) {
      const newStyle = document.createElement("style");
      Array.from(styleSheet.cssRules).forEach((rule) => {
       newStyle.appendChild(document.createTextNode(rule.cssText));
      });
      win.document.head.appendChild(newStyle);
     }
    } catch (e) {
     console.warn("Could not copy stylesheet", e);
    }
   });

   // Handle PiP window closing
   win.addEventListener("pagehide", () => {
    setPipWindow(null);
   });

   setPipWindow(win);
  } catch (err) {
   console.error("Failed to open PiP window:", err);
  }
 }, [pipWindow]);

 return { pipWindow, togglePiP, isPiPActive: !!pipWindow };
};
