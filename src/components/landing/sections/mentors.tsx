import { useCallback, useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { mentors } from "../data/mentors";
import { sectionBlockPadding } from "../section-skeleton-parts";
import { SectionHeader } from "../section-header";
import { useInViewAnimation } from "../use-in-view-animation";

type ScrollbarIndicator = {
  visible: boolean;
  thumbTop: number;
  thumbHeight: number;
};

const DEFAULT_SCROLLBAR_INDICATOR: ScrollbarIndicator = {
  visible: false,
  thumbTop: 0,
  thumbHeight: 0,
};

function getScrollbarIndicator(el: HTMLDivElement | null): ScrollbarIndicator {
  if (!el) return DEFAULT_SCROLLBAR_INDICATOR;
  const { clientHeight, scrollHeight, scrollTop } = el;
  if (scrollHeight <= clientHeight || clientHeight <= 0) {
    return DEFAULT_SCROLLBAR_INDICATOR;
  }

  const ratio = clientHeight / scrollHeight;
  const minThumbHeight = 24;
  const rawThumbHeight = Math.round(clientHeight * ratio);
  const thumbHeight = Math.min(clientHeight, Math.max(minThumbHeight, rawThumbHeight));
  const maxThumbTop = Math.max(0, clientHeight - thumbHeight);
  const rawThumbTop = Math.round((scrollTop / (scrollHeight - clientHeight)) * maxThumbTop);
  const thumbTop = Math.max(0, Math.min(maxThumbTop, rawThumbTop));

  return { visible: true, thumbTop, thumbHeight };
}

export default function Mentors() {
  const { ref, isActive } = useInViewAnimation<HTMLElement>();
  const [active, setActive] = useState<number | null>(null);
  const current = active !== null ? mentors[active] : null;
  const textRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const [textIndicator, setTextIndicator] = useState<ScrollbarIndicator>(DEFAULT_SCROLLBAR_INDICATOR);
  const [tagsIndicator, setTagsIndicator] = useState<ScrollbarIndicator>(DEFAULT_SCROLLBAR_INDICATOR);

  const updateIndicators = () => {
    setTextIndicator(getScrollbarIndicator(textRef.current));
    setTagsIndicator(getScrollbarIndicator(tagsRef.current));
  };

  const scheduleIndicatorsUpdate = () => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = null;
      updateIndicators();
    });
  };

  useEffect(() => {
    if (active === null) {
      setTextIndicator(DEFAULT_SCROLLBAR_INDICATOR);
      setTagsIndicator(DEFAULT_SCROLLBAR_INDICATOR);
      return;
    }

    scheduleIndicatorsUpdate();

    const resizeObserver = new ResizeObserver(scheduleIndicatorsUpdate);
    if (textRef.current) resizeObserver.observe(textRef.current);
    if (tagsRef.current) resizeObserver.observe(tagsRef.current);

    window.addEventListener("resize", scheduleIndicatorsUpdate);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", scheduleIndicatorsUpdate);
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [active, current]);

  return (
    <div
      ref={ref}
      className={`landing-section landing-section--animatable mx-auto w-full max-w-[1316px] shrink-0 ${sectionBlockPadding}${isActive ? " is-animating" : ""}`}
    >
      <div className="mx-auto flex w-full min-w-0 flex-col items-center justify-center px-4 sm:px-6">
        <SectionHeader
          eyebrow="Менторы"
          title={
            <>
              Команда <span className="gradient-edcigam-text">EdCigamCo</span>
            </>
          }
          subtitle="Двое практикующих инженеров — не методисты, а действующие разработчики."
        />
        <div className="mx-auto mt-12 grid h-auto w-full min-w-0 max-w-[974px] grid-cols-1 items-stretch gap-6 md:h-[546px] md:grid-cols-2 md:grid-rows-1 md:gap-x-[20px] md:gap-y-8 [&>*]:min-h-0 [&>*]:min-w-0 md:[&>*]:h-full">
          {mentors.map((m, i) => (
            <article
              key={m.name}
              className="mentor-card surface-card surface-card-hover grid h-auto min-h-0 w-full grid-rows-[auto_auto] overflow-hidden rounded-2xl md:h-full md:grid-rows-[67fr_33fr]"
            >
              <div className="mentor-card__media relative min-h-0 h-full overflow-hidden">
                <img
                  src={m.img}
                  alt={m.name}
                  loading="lazy"
                  decoding="async"
                  className="mentor-card__photo"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
              </div>
              <div className="mentor-card__body min-h-0 overflow-hidden md:h-full">
                <h3 className="mentor-card__name font-display">{m.name}</h3>
                <div className="mentor-card__role text-gold">{m.role}</div>
                <p className="mentor-card__bio text-muted-foreground">{m.bio}</p>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  className="mentor-card__more inline-flex w-fit items-center gap-2 font-semibold text-gold transition-colors hover:text-gold-soft"
                >
                  Подробнее
                  <span aria-hidden>→</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      <Dialog open={active !== null} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="mentor-dialog max-w-none gap-0 overflow-hidden border-border/60 bg-card p-0">
          {current && (
            <div className="mentor-dialog__layout grid h-full min-h-0 grid-cols-1 grid-rows-[minmax(0,44%)_minmax(0,1fr)] md:grid-cols-[minmax(0,38%)_minmax(0,1fr)] md:grid-rows-1">
              <div className="mentor-dialog__media relative min-h-0 overflow-hidden bg-surface-2/40">
                <img
                  src={current.img}
                  alt={current.name}
                  decoding="async"
                  className="mentor-dialog__photo absolute inset-0 h-full w-full"
                />
              </div>
              <div className="mentor-dialog__content flex min-h-0 flex-col overflow-hidden px-4 pb-4 pt-2 sm:px-6 sm:pb-6 md:px-8 md:py-8">
                <DialogHeader className="shrink-0 text-left">
                  <DialogTitle className="font-display text-xl sm:text-2xl">{current.name}</DialogTitle>
                  <DialogDescription className="text-sm text-gold sm:text-base">{current.role}</DialogDescription>
                </DialogHeader>
                <div className="mentor-dialog-scrollwrap mt-3 min-h-0 flex-1 sm:mt-4 md:mt-5">
                  <div
                    ref={textRef}
                    onScroll={scheduleIndicatorsUpdate}
                    className="mentor-dialog-text min-h-0 h-full text-sm leading-relaxed text-muted-foreground sm:text-base"
                  >
                    {current.full}
                  </div>
                  <div className={`mentor-scrollbar ${textIndicator.visible ? "is-visible" : ""}`} aria-hidden>
                    <div
                      className="mentor-scrollbar__thumb"
                      style={{
                        height: `${textIndicator.thumbHeight}px`,
                        transform: `translateY(${textIndicator.thumbTop}px)`,
                      }}
                    />
                  </div>
                </div>
                <div className="mentor-dialog-scrollwrap mt-4 max-h-[5.5rem] shrink-0 sm:mt-5 sm:max-h-[5.5rem]">
                  <div
                    ref={tagsRef}
                    onScroll={scheduleIndicatorsUpdate}
                    className="mentor-dialog-tags flex h-full flex-wrap content-start gap-1.5 overflow-y-auto sm:gap-2"
                  >
                    {current.tags.map((t, i) => (
                      <span
                        key={`${t}-${i}`}
                        className="rounded-full border border-border bg-surface-2/60 px-2.5 py-1 text-xs text-muted-foreground sm:px-3 sm:py-1.5 sm:text-sm"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className={`mentor-scrollbar ${tagsIndicator.visible ? "is-visible" : ""}`} aria-hidden>
                    <div
                      className="mentor-scrollbar__thumb"
                      style={{
                        height: `${tagsIndicator.thumbHeight}px`,
                        transform: `translateY(${tagsIndicator.thumbTop}px)`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
