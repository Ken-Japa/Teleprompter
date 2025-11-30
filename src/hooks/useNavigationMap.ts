import { useEffect } from "react";
import { NavigationItem, Sentence } from "../types";

interface UseNavigationMapProps {
 sentences: Sentence[];
 scrollContainerRef: React.RefObject<HTMLDivElement | null>;
 fontSize: number;
 margin: number;
 isMirrored: boolean;
 isFlipVertical: boolean;
 isUpperCase: boolean;
 onNavigationMapUpdate?: (map: NavigationItem[]) => void;
}

export const useNavigationMap = ({
 sentences,
 scrollContainerRef,
 fontSize,
 margin,
 isMirrored,
 isFlipVertical,
 isUpperCase,
 onNavigationMapUpdate,
}: UseNavigationMapProps) => {
 useEffect(() => {
  if (!onNavigationMapUpdate || !scrollContainerRef.current || sentences.length === 0) return;

  let idleCallbackId: number | null = null;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const calculateMap = () => {
   const container = scrollContainerRef.current;
   if (!container) return;

   const maxScroll = container.scrollHeight - container.clientHeight;
   if (maxScroll <= 0) return;

   const containerRect = container.getBoundingClientRect();
   const centerOffset = container.clientHeight / 2;
   const map: NavigationItem[] = [];

   // Batch read operations?
   // Since we need to get element by ID, we are stuck with document.getElementById or querying children.
   // To avoid layout thrashing, we should try to do this when idle.

   sentences.forEach((s) => {
    const el = document.getElementById(`sentence-${s.id}`);
    if (el) {
     const rect = el.getBoundingClientRect();
     const elementTopRelative = rect.top - containerRect.top + container.scrollTop;
     let targetScroll = elementTopRelative - centerOffset + rect.height / 2;

     targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));

     const label = s.fragments ? s.fragments.map((f: any) => f.text).join("") : "";

     map.push({
      id: s.id,
      label: label,
      progress: targetScroll / maxScroll,
     });
    }
   });

   if (map.length > 0) {
    onNavigationMapUpdate(map);
   }
  };

  // Use requestIdleCallback if available to avoid blocking main thread
  const scheduleCalculation = () => {
   if ("requestIdleCallback" in window) {
    idleCallbackId = window.requestIdleCallback(
     () => {
      calculateMap();
     },
     { timeout: 2000 }
    );
   } else {
    timeoutId = setTimeout(calculateMap, 1000);
   }
  };

  // Delay initial calculation to allow layout to settle
  timeoutId = setTimeout(scheduleCalculation, 1000);

  return () => {
   if (idleCallbackId) window.cancelIdleCallback(idleCallbackId);
   if (timeoutId) clearTimeout(timeoutId);
  };
 }, [sentences, fontSize, margin, isMirrored, isFlipVertical, isUpperCase, onNavigationMapUpdate]);
};
