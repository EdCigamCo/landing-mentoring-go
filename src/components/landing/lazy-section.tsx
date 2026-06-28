import { Suspense, lazy, useEffect, useRef, useState, type ReactNode } from "react";
import type { SectionEntry } from "./catalog";
import type { SectionId } from "./data/section-id";
import { notifySectionMounted, subscribeSectionBoost } from "./prefetch-sections";
import { SectionSkeleton } from "./section-skeletons";
import { useSectionMinHeight } from "./use-section-min-height";

type LazySectionProps = {
  entry: SectionEntry;
};

function SectionMountNotifier({ id, children }: { id: SectionId; children: ReactNode }) {
  useEffect(() => {
    notifySectionMounted(id);
  }, [id]);

  return children;
}

export function LazySection({ entry }: LazySectionProps) {
  const { id, loader } = entry;
  const minHeight = useSectionMinHeight(entry);
  const [shouldMount, setShouldMount] = useState(false);
  const rootRef = useRef<HTMLElement>(null);

  const LazyComponent = lazy(loader);

  useEffect(() => {
    return subscribeSectionBoost((boostedId: SectionId) => {
      if (boostedId === id) setShouldMount(true);
    });
  }, [id]);

  useEffect(() => {
    if (shouldMount) return;

    const node = rootRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([observed]) => {
        if (observed?.isIntersecting) {
          setShouldMount(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px 240px 0px", threshold: 0 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [shouldMount]);

  const skeleton = <SectionSkeleton id={id} />;

  return (
    <section
      ref={rootRef}
      id={id}
      className="landing-section lazy-section shrink-0"
      style={{ minHeight }}
      aria-busy={!shouldMount}
    >
      {shouldMount ? (
        <Suspense fallback={skeleton}>
          <SectionMountNotifier id={id}>
            <LazyComponent />
          </SectionMountNotifier>
        </Suspense>
      ) : (
        skeleton
      )}
    </section>
  );
}
