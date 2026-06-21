import { useEffect } from "react";
import { startBackgroundPrefetch } from "./prefetch-sections";

export function useLandingPrefetch() {
  useEffect(() => {
    startBackgroundPrefetch();
  }, []);
}
