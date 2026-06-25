import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { debounce } from "@/lib/debounce";
import {
  reInitCarouselAfterLayout,
  useCarouselBoostLatch,
  whenCarouselViewportReady,
} from "../carousel-layout";
import { reviews, type Review } from "../data/reviews";
import { sectionBlockPadding } from "../section-skeleton-parts";
import { SectionHeader } from "../section-header";
import { useInViewAnimation } from "../use-in-view-animation";

function chunkItems<T>(items: T[], size: number): T[][] {
  const pages: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    pages.push(items.slice(i, i + size));
  }
  return pages;
}

function useReviewPageSize() {
  const [pageSize, setPageSize] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(min-width: 640px)").matches ? 4 : 1,
  );

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const onChange = () => setPageSize(mq.matches ? 4 : 1);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return pageSize;
}

const ReviewCard = forwardRef<HTMLElement, { review: Review; onRead: () => void }>(function ReviewCard(
  { review, onRead },
  ref,
) {
  return (
    <article
      ref={ref}
      className="surface-card surface-card-hover flex h-full min-h-0 min-w-0 flex-col gap-3 rounded-2xl p-4 sm:gap-4 sm:p-6"
    >
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-brand-gradient font-display text-xl text-background sm:h-16 sm:w-16 sm:text-2xl">
          {review.name.charAt(0)}
        </div>
        <div className="min-w-0">
          <div className="truncate font-semibold">{review.name}</div>
          <div className="truncate text-xs text-gold">{review.role}</div>
        </div>
      </div>
      <div className="flex min-h-0 flex-1 flex-col justify-between gap-3">
        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-4 sm:line-clamp-5">{review.short}</p>
        <button
          type="button"
          onClick={onRead}
          className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-gold transition-colors hover:text-gold-soft"
        >
          Читать отзыв
          <span aria-hidden>→</span>
        </button>
      </div>
    </article>
  );
});

function ReviewsCarouselShell() {
  return <div className="reviews-carousel mt-12 min-h-[14rem] sm:min-h-[26rem]" aria-hidden />;
}

function ReviewsCarousel({
  isInView,
  onReadReview,
}: {
  isInView: boolean;
  onReadReview: (index: number) => void;
}) {
  const pageSize = useReviewPageSize();
  const pages = useMemo(
    () => chunkItems(reviews.map((review, index) => ({ review, index })), pageSize),
    [pageSize],
  );

  const reviewCardRefs = useRef<(HTMLElement | null)[]>([]);
  const carouselViewportRef = useRef<HTMLDivElement | null>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    containScroll: "trimSnaps",
    duration: pageSize === 1 ? 20 : 25,
  });
  const emblaApiRef = useRef(emblaApi);
  emblaApiRef.current = emblaApi;

  const syncVisibleCardHeights = useCallback(() => {
    const api = emblaApiRef.current;
    const viewport = carouselViewportRef.current;
    if (!api || !viewport || viewport.offsetWidth === 0) return;

    const selected = api.selectedScrollSnap();
    const slide = api.slideNodes()[selected];
    if (!slide) return;

    const cards = Array.from(slide.querySelectorAll("article")).filter(
      (card): card is HTMLElement => card instanceof HTMLElement,
    );

    if (!cards.length) return;

    viewport.style.removeProperty("--reviews-card-height");
    cards.forEach((card) => {
      card.style.height = "auto";
    });

    const maxHeight = Math.max(...cards.map((card) => card.scrollHeight));

    if (maxHeight > 0) {
      viewport.style.setProperty("--reviews-card-height", `${maxHeight}px`);
      cards.forEach((card) => {
        card.style.height = `${maxHeight}px`;
      });
    }
  }, []);

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const updateScrollState = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    updateScrollState();
    emblaApi.on("select", updateScrollState);
    emblaApi.on("reInit", updateScrollState);
    return () => {
      emblaApi.off("select", updateScrollState);
      emblaApi.off("reInit", updateScrollState);
    };
  }, [emblaApi, updateScrollState]);

  useEffect(() => {
    if (!emblaApi) return;

    const debouncedLayout = debounce(() => {
      syncVisibleCardHeights();
    }, 150);

    emblaApi.on("reInit", debouncedLayout);
    emblaApi.on("settle", syncVisibleCardHeights);

    const cancelReady = whenCarouselViewportReady(carouselViewportRef.current, () => {
      emblaApi.reInit();
      syncVisibleCardHeights();
      updateScrollState();
    });

    window.addEventListener("resize", debouncedLayout);

    return () => {
      cancelReady();
      emblaApi.off("reInit", debouncedLayout);
      emblaApi.off("settle", syncVisibleCardHeights);
      window.removeEventListener("resize", debouncedLayout);
    };
  }, [emblaApi, syncVisibleCardHeights, updateScrollState, pages, pageSize]);

  useEffect(() => {
    if (!isInView || !emblaApi) return;
    return reInitCarouselAfterLayout(emblaApi, carouselViewportRef.current);
  }, [isInView, emblaApi]);

  const progressLabel =
    pageSize === 1
      ? `Отзыв ${selectedIndex + 1} из ${reviews.length}`
      : `Отзывы ${selectedIndex * pageSize + 1}–${Math.min((selectedIndex + 1) * pageSize, reviews.length)} из ${reviews.length}`;

  const progressPercent = pages.length <= 1 ? 100 : (selectedIndex / (pages.length - 1)) * 100;

  return (
    <div
      key={pageSize}
      className="reviews-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Отзывы выпускников"
    >
      <div className="reviews-carousel__stage">
        <button
          type="button"
          className="reviews-carousel__arrow reviews-carousel__arrow--prev"
          aria-label="Предыдущие отзывы"
          disabled={!canScrollPrev}
          onClick={() => emblaApi?.scrollPrev()}
        >
          <ChevronLeft className="h-5 w-5" aria-hidden />
        </button>
        <div
          ref={(node) => {
            carouselViewportRef.current = node;
            emblaRef(node);
          }}
          className="reviews-carousel__viewport"
        >
          <div className="reviews-carousel__track">
            {pages.map((page, pageIndex) => (
              <div
                key={pageIndex}
                className="reviews-carousel__slide"
                role="group"
                aria-roledescription="slide"
                aria-label={`Страница ${pageIndex + 1} из ${pages.length}`}
              >
                <div className="reviews-carousel__grid">
                  {Array.from({ length: pageSize }).map((_, slotIndex) => {
                    const item = page[slotIndex];

                    if (!item) {
                      return (
                        <div
                          key={`placeholder-${pageIndex}-${slotIndex}`}
                          className="reviews-carousel__placeholder"
                          aria-hidden
                        />
                      );
                    }

                    return (
                      <ReviewCard
                        key={item.review.name}
                        ref={(node) => {
                          reviewCardRefs.current[item.index] = node;
                        }}
                        review={item.review}
                        onRead={() => onReadReview(item.index)}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          type="button"
          className="reviews-carousel__arrow reviews-carousel__arrow--next"
          aria-label="Следующие отзывы"
          disabled={!canScrollNext}
          onClick={() => emblaApi?.scrollNext()}
        >
          <ChevronRight className="h-5 w-5" aria-hidden />
        </button>
      </div>
      <div className="reviews-carousel__progress" role="group" aria-label="Прогресс просмотра отзывов">
        <div className="reviews-carousel__progress-track" aria-hidden>
          <div className="reviews-carousel__progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>
        <div className="reviews-carousel__progress-meta">
          <span>{progressLabel}</span>
          <span>
            {selectedIndex + 1} / {pages.length}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Reviews() {
  const { ref, isActive } = useInViewAnimation<HTMLElement>();
  const carouselEnabled = useCarouselBoostLatch("reviews", isActive);
  const [active, setActive] = useState<number | null>(null);
  const current = active !== null ? reviews[active] : null;

  return (
    <div
      ref={ref}
      className={`landing-section landing-section--animatable shrink-0 ${sectionBlockPadding}${isActive ? " is-animating" : ""}`}
    >
      <div className="landing-section__bg bg-gradient-to-b from-transparent via-surface/30 to-transparent" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Отзывы"
          title={
            <>
              Что говорят <span className="brand-glass brand-glass-heading">выпускники</span>
            </>
          }
          subtitle="Истории учеников, которые прошли путь до оффера вместе с нами."
        />
        {carouselEnabled ? (
          <ReviewsCarousel isInView={isActive} onReadReview={setActive} />
        ) : (
          <ReviewsCarouselShell />
        )}
      </div>

      <Dialog open={active !== null} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="landing-dialog max-w-2xl border-border/60 bg-card">
          {current && (
            <>
              <DialogHeader className="text-left">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-brand-gradient font-display text-xl text-background">
                    {current.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <DialogTitle className="truncate font-display text-xl">{current.name}</DialogTitle>
                    <DialogDescription className="truncate text-gold">{current.role}</DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              <div className="max-h-[60vh] overflow-y-auto pr-1 text-sm leading-relaxed text-muted-foreground">
                {current.full}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
