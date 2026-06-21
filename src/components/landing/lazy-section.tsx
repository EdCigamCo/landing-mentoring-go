import { Suspense, lazy, useEffect, useRef, useState } from "react";
import type { SectionEntry } from "./catalog";
import type { SectionId } from "./data";
import { subscribeSectionBoost } from "./prefetch-sections";
import { SectionPlaceholder } from "./section-placeholder";

type LazySectionProps = {
  entry: SectionEntry;
};

export function LazySection({ entry }: LazySectionProps) {
  const { id, minHeight, loader } = entry;
  const [shouldMount, setShouldMount] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const LazyComponent = lazy(loader);

  useEffect(() => {
    return subscribeSectionBoost((boostedId: SectionId) => {
      if (boostedId === id) setShouldMount(true);
    });
  }, [id]);

  useEffect(() => {
    if (shouldMount) return;

    const node = sentinelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([observed]) => {
        if (observed?.isIntersecting) {
          setShouldMount(true);
          observer.disconnect();
        }
      },
      { rootMargin: "240px 0px", threshold: 0 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [shouldMount]);

  if (!shouldMount) {
    return (
      <div ref={sentinelRef} id={id} style={{ minHeight }} aria-busy="true">
        <SectionPlaceholder minHeight={minHeight} />
      </div>
    );
  }

  return (
    <Suspense fallback={<SectionPlaceholder minHeight={minHeight} />}>
      <LazyComponent />
    </Suspense>
  );
}
