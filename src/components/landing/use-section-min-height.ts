import { useEffect, useState } from "react";
import type { SectionEntry } from "./catalog";

const SM_BREAKPOINT = "(min-width: 640px)";

function resolveMinHeight(entry: SectionEntry, isSmUp: boolean): string {
  if (isSmUp || !entry.minHeightSm) return entry.minHeight;
  return entry.minHeightSm;
}

export function useSectionMinHeight(entry: SectionEntry): string {
  const [minHeight, setMinHeight] = useState(() =>
    resolveMinHeight(entry, typeof window !== "undefined" && window.matchMedia(SM_BREAKPOINT).matches),
  );

  useEffect(() => {
    if (!entry.minHeightSm) return;

    const mq = window.matchMedia(SM_BREAKPOINT);
    const onChange = () => setMinHeight(resolveMinHeight(entry, mq.matches));
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [entry.id, entry.minHeight, entry.minHeightSm]);

  return minHeight;
}
