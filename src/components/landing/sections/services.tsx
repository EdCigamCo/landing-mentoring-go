import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { debounce } from "@/lib/debounce";
import {
  reInitCarouselAfterLayout,
  useCarouselBoostLatch,
  whenCarouselViewportReady,
} from "../carousel-layout";
import { services, type Service } from "../data/services";
import { sectionBlockPadding } from "../section-skeleton-parts";
import { SectionHeader } from "../section-header";
import { sectionAnchorClick } from "../section-nav";
import { useInViewAnimation } from "../use-in-view-animation";

function ServiceCard({ service, isActive }: { service: Service; isActive: boolean }) {
  return (
    <div
      className={cn(
        "@container surface-card surface-card-hover services-carousel__card relative flex h-full min-h-0 w-full flex-col rounded-2xl p-6 sm:p-8 transition-shadow duration-300",
        isActive && "ring-2 ring-gold/70 services-carousel__card--active",
      )}
    >
      <div className="min-w-0 text-xs uppercase tracking-[0.2em] text-gold">{service.tagline}</div>
      <h3 className="mt-3 min-w-0 font-display text-xl sm:text-2xl">{service.name}</h3>
      <p className="mt-2 min-w-0 text-sm leading-relaxed text-muted-foreground">{service.desc}</p>
      <div className="mt-6 flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-1">
        <div className="brand-glass brand-glass-text min-w-0 font-display text-[clamp(1.5rem,6cqi,2.25rem)] leading-none">
          {service.price}
        </div>
        <div className="min-w-0 text-xs text-muted-foreground">{service.unit}</div>
      </div>
      <ul className="mt-6 min-h-0 flex-1 space-y-2.5 text-sm sm:space-y-3">
        {service.features.map((f) => (
          <li key={f} className="flex min-w-0 items-start gap-3">
            <span className="mt-1.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-gold/15 text-gold">
              <svg
                viewBox="0 0 12 12"
                className="h-2.5 w-2.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 6.5L4.5 9L10 3" />
              </svg>
            </span>
            <span className="min-w-0 text-muted-foreground">{f}</span>
          </li>
        ))}
      </ul>
      <a
        href="#cta"
        onClick={sectionAnchorClick("cta")}
        className={cn(
          "mt-6 w-full shrink-0 rounded-full px-6 py-3 text-center text-sm font-semibold transition-colors duration-300 sm:mt-8",
          isActive ? "btn-primary" : "btn-ghost-gold",
        )}
      >
        {service.cta}
      </a>
    </div>
  );
}

function ServicesCarouselShell() {
  return <div className="services-carousel min-h-[41rem]" aria-hidden />;
}

function ServicesCarousel({ isInView }: { isInView: boolean }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    containScroll: false,
    loop: false,
    dragFree: false,
    startIndex: 1,
  });
  const [activeIndex, setActiveIndex] = useState(1);
  const slideInnerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeIndexRef = useRef(1);
  const carouselViewportRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const isScrollingRef = useRef(false);

  const setWillChange = useCallback((enabled: boolean) => {
    slideInnerRefs.current.forEach((inner) => {
      if (!inner) return;
      if (enabled) {
        inner.classList.add("services-carousel__slide-inner--scrolling");
      } else {
        inner.classList.remove("services-carousel__slide-inner--scrolling");
      }
    });
  }, []);

  const syncCardHeight = useCallback(() => {
    const viewport = carouselViewportRef.current;
    if (!viewport || viewport.offsetWidth === 0) return;

    const cards = slideInnerRefs.current
      .map((inner) => inner?.firstElementChild)
      .filter((card): card is HTMLElement => card instanceof HTMLElement);

    if (!cards.length) return;

    const slides = emblaApi?.slideNodes() ?? [];

    viewport.style.removeProperty("--services-card-height");
    slides.forEach((slide) => {
      slide.style.height = "auto";
    });
    cards.forEach((card) => {
      card.style.height = "auto";
    });

    const maxHeight = Math.max(...cards.map((card) => card.scrollHeight));

    slides.forEach((slide) => {
      slide.style.height = "";
    });
    cards.forEach((card) => {
      card.style.height = "";
    });

    if (maxHeight > 0) {
      viewport.style.setProperty("--services-card-height", `${maxHeight}px`);
    }
  }, [emblaApi]);

  const applySlideTransforms = useCallback(() => {
    if (!emblaApi) return;

    const viewport = emblaApi.containerNode().parentElement;
    if (!viewport || viewport.offsetWidth === 0) return;

    const viewportRect = viewport.getBoundingClientRect();
    const center = viewportRect.left + viewportRect.width / 2;

    const activeRaise = -14;
    const inactiveLower = 22;
    const inactiveOpacity = 0.82;

    emblaApi.slideNodes().forEach((slide, index) => {
      const inner = slideInnerRefs.current[index];
      if (!inner) return;

      const slideRect = slide.getBoundingClientRect();
      const slideCenter = slideRect.left + slideRect.width / 2;
      const offset = (slideCenter - center) / (slideRect.width || 1);
      const absOffset = Math.min(Math.abs(offset), 1);
      const activeProgress = Math.max(0, 1 - absOffset);
      const translateY = inactiveLower - activeProgress * (inactiveLower - activeRaise);
      const opacity = inactiveOpacity + activeProgress * (1 - inactiveOpacity);
      const zIndex = Math.round(10 + activeProgress * 20);

      slide.style.zIndex = String(zIndex);
      inner.style.transform = `translate3d(0, ${translateY}px, 0)`;
      inner.style.opacity = String(opacity);
    });
  }, [emblaApi]);

  const commitActiveIndex = useCallback(() => {
    if (!emblaApi) return;

    const viewport = emblaApi.containerNode().parentElement;
    if (!viewport || viewport.offsetWidth === 0) return;

    const viewportRect = viewport.getBoundingClientRect();
    const center = viewportRect.left + viewportRect.width / 2;

    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    emblaApi.slideNodes().forEach((slide, index) => {
      const slideRect = slide.getBoundingClientRect();
      const slideCenter = slideRect.left + slideRect.width / 2;
      const distanceToCenter = Math.abs(slideCenter - center);
      if (distanceToCenter < nearestDistance) {
        nearestDistance = distanceToCenter;
        nearestIndex = index;
      }
    });

    if (nearestIndex !== activeIndexRef.current) {
      activeIndexRef.current = nearestIndex;
      setActiveIndex(nearestIndex);
    }
  }, [emblaApi]);

  const scheduleScrollFrame = useCallback(() => {
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      applySlideTransforms();
      commitActiveIndex();
    });
  }, [applySlideTransforms, commitActiveIndex]);

  const runLayout = useCallback(() => {
    syncCardHeight();
    applySlideTransforms();
    commitActiveIndex();
  }, [syncCardHeight, applySlideTransforms, commitActiveIndex]);

  useEffect(() => {
    if (!emblaApi) return;

    const debouncedLayout = debounce(runLayout, 150);

    const onScroll = () => {
      if (!isScrollingRef.current) {
        isScrollingRef.current = true;
        setWillChange(true);
      }
      scheduleScrollFrame();
    };

    const onSettle = () => {
      isScrollingRef.current = false;
      setWillChange(false);
      runLayout();
    };

    emblaApi.on("scroll", onScroll);
    emblaApi.on("reInit", debouncedLayout);
    emblaApi.on("settle", onSettle);

    const cancelReady = whenCarouselViewportReady(carouselViewportRef.current, runLayout);

    window.addEventListener("resize", debouncedLayout);

    return () => {
      cancelReady();
      emblaApi.off("scroll", onScroll);
      emblaApi.off("reInit", debouncedLayout);
      emblaApi.off("settle", onSettle);
      window.removeEventListener("resize", debouncedLayout);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [emblaApi, runLayout, scheduleScrollFrame, setWillChange]);

  useEffect(() => {
    if (!isInView || !emblaApi) return;
    return reInitCarouselAfterLayout(emblaApi, carouselViewportRef.current);
  }, [isInView, emblaApi]);

  useEffect(() => {
    const viewport = carouselViewportRef.current;
    if (!viewport || !emblaApi) return;

    let accumulated = 0;
    const threshold = 50;

    const onWheel = (event: WheelEvent) => {
      if (!viewport.matches(":hover")) return;

      accumulated += event.deltaY;

      if (accumulated >= threshold) {
        if (emblaApi.canScrollNext()) {
          event.preventDefault();
          emblaApi.scrollNext();
        }
        accumulated = 0;
      } else if (accumulated <= -threshold) {
        if (emblaApi.canScrollPrev()) {
          event.preventDefault();
          emblaApi.scrollPrev();
        }
        accumulated = 0;
      }
    };

    viewport.addEventListener("wheel", onWheel, { passive: false });
    return () => viewport.removeEventListener("wheel", onWheel);
  }, [emblaApi]);

  return (
    <div className="services-carousel" role="region" aria-roledescription="carousel" aria-label="Тарифы">
      <div
        ref={(node) => {
          carouselViewportRef.current = node;
          emblaRef(node);
        }}
        className="services-carousel__viewport"
      >
        <div className="services-carousel__track">
          {services.map((s, index) => (
            <div key={s.id} className="services-carousel__slide" role="group" aria-roledescription="slide">
              <div
                ref={(el) => {
                  slideInnerRefs.current[index] = el;
                }}
                className="services-carousel__slide-inner"
              >
                {s.badge && index === activeIndex && (
                  <div className="services-carousel__badge">{s.badge}</div>
                )}
                <ServiceCard service={s} isActive={index === activeIndex} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="services-carousel__dots" role="tablist" aria-label="Выбор тарифа">
        {services.map((s, index) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            aria-label={`${s.name}: ${s.tagline}`}
            onClick={() => emblaApi?.scrollTo(index)}
            className={cn(
              "services-carousel__dot",
              index === activeIndex && "services-carousel__dot--active",
            )}
          />
        ))}
      </div>
    </div>
  );
}

export default function Services() {
  const { ref, isActive } = useInViewAnimation<HTMLElement>();
  const carouselEnabled = useCarouselBoostLatch("services", isActive);

  return (
    <div
      ref={ref}
      className={`landing-section landing-section--animatable shrink-0 ${sectionBlockPadding}${isActive ? " is-animating" : ""}`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Услуги"
          title={
            <>
              Тарифы <span className="brand-glass brand-glass-heading">Мастерской Go</span>
            </>
          }
          subtitle="Три формата работы — от разовой консультации до полного сопровождения до оффера."
        />
        {carouselEnabled ? <ServicesCarousel isInView={isActive} /> : <ServicesCarouselShell />}
        <p className="mt-8 text-center text-xs text-muted-foreground">
          Точная стоимость подбирается под ваш уровень и цели на бесплатном разборе.
        </p>
      </div>
    </div>
  );
}
