import { useEffect, useLayoutEffect, useState } from "react";
import type { SectionId } from "./data/section-id";
import { notifyDeferredLayoutReady, subscribeSectionBoost } from "./prefetch-sections";
type EmblaApi = {
  reInit: () => void;
};

/** Включает карусель при первом попадании секции в viewport и не отключает обратно. */
export function useCarouselLatch(isInView: boolean) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (isInView) setEnabled(true);
  }, [isInView]);

  return enabled;
}

/** Карусель при inView или при navigation boost (scroll path). */
export function useCarouselBoostLatch(sectionId: SectionId, isInView: boolean) {
  const latched = useCarouselLatch(isInView);
  const [boosted, setBoosted] = useState(false);
  const enabled = boosted || latched;

  useEffect(() => {
    return subscribeSectionBoost((id) => {
      if (id === sectionId) setBoosted(true);
    });
  }, [sectionId]);

  useLayoutEffect(() => {
    if (enabled) notifyDeferredLayoutReady(sectionId);
  }, [enabled, sectionId]);

  return enabled;
}

function nextFrame(): Promise<void> {
  return new Promise((resolve) => {
    requestAnimationFrame(() => resolve());
  });
}

/** Ждёт ненулевую ширину контейнера и два кадра layout перед коллбэком. */
export function whenCarouselViewportReady(
  viewport: HTMLElement | null,
  callback: () => void,
): () => void {
  let cancelled = false;

  const attempt = () => {
    if (cancelled) return;

    if (!viewport || viewport.offsetWidth === 0) {
      requestAnimationFrame(attempt);
      return;
    }

    void (async () => {
      await nextFrame();
      await nextFrame();
      if (!cancelled) callback();
    })();
  };

  attempt();

  return () => {
    cancelled = true;
  };
}

export function reInitCarouselAfterLayout(
  emblaApi: EmblaApi | undefined,
  viewport: HTMLElement | null,
): () => void {
  if (!emblaApi) return () => undefined;

  return whenCarouselViewportReady(viewport, () => {
    emblaApi.reInit();
  });
}
