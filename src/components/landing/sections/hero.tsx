import { preload } from "react-dom";
import { heroBg, heroGofer } from "../data/images/hero";
import { sectionAnchorClick } from "../section-nav";
import { useInViewAnimation } from "../use-in-view-animation";

export function Hero() {
  preload(heroBg, { as: "image", fetchPriority: "high" });
  preload(heroGofer, { as: "image", fetchPriority: "high" });

  const { ref, isActive } = useInViewAnimation<HTMLElement>();

  return (
    <section
      ref={ref}
      className={`landing-section landing-section--animatable relative shrink-0 overflow-visible${isActive ? " is-animating" : ""}`}
    >
      <div
        className="absolute inset-0 -z-10 opacity-60"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/40 via-background/70 to-background" />
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-16 sm:px-6 sm:py-20 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:items-center md:gap-12 md:py-28 lg:py-32">
        <div className="min-w-0">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            набор открыт · поток 2026
          </div>
          <h1 className="font-display text-[2rem] font-bold leading-[1.08] sm:text-5xl md:text-6xl">
            Стань <span className="brand-glass brand-glass-heading brand-glass-heading--always">Golang Backend</span>{" "}
            разработчиком —
            <span className="brand-glass brand-glass-text"> с поддержкой до оффера</span>
          </h1>
          <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
            Авторская программа менторства для тех, кто заходит в IT с нуля или мигрирует с frontend и QA. Без воды.
            Без бесконечных курсов. Только то, что приведёт к найму.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
            <a href="#cta" onClick={sectionAnchorClick("cta")} className="btn-primary rounded-full px-6 py-3 text-sm font-semibold sm:px-7 sm:py-3.5">
              Записаться на разбор
            </a>
            <a href="#program" onClick={sectionAnchorClick("program")} className="btn-ghost-gold rounded-full px-6 py-3 text-sm font-semibold sm:px-7 sm:py-3.5">
              Посмотреть программу
            </a>
          </div>
          <dl className="mt-10 grid w-full max-w-md grid-cols-[repeat(3,minmax(0,1fr))] gap-4 sm:gap-6">
            {[["5+", "лет в Go"], ["10", "шагов до оффера"], ["1:1", "формат работы"]].map(([n, l]) => (
              <div key={l} className="min-w-0">
                <dt className="brand-glass brand-glass-text font-display text-2xl">{n}</dt>
                <dd className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground sm:text-xs">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative flex min-w-0 w-full justify-center overflow-visible">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/15 blur-2xl sm:h-64 sm:w-64 md:h-72 md:w-72"
          />
          <img
            src={heroGofer}
            alt="Go gopher"
            width={640}
            height={640}
            fetchPriority="high"
            decoding="async"
            className="relative z-10 mx-auto w-full max-w-[220px] object-contain sm:max-w-[260px] md:max-w-[280px]"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
