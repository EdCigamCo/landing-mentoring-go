import { companies } from "../data";
import { SectionHeader } from "../section-header";
import { useInViewAnimation } from "../use-in-view-animation";

export default function Companies() {
  const { ref, isActive } = useInViewAnimation<HTMLElement>();
  const row = [...companies, ...companies];

  return (
    <section
      ref={ref}
      id="companies"
      className={`landing-section landing-section--animatable shrink-0 py-20 sm:py-24${isActive ? " is-animating" : ""}`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Трудоустройство"
          title={
            <>
              Куда устраиваются <span className="brand-glass brand-glass-heading">наши ученики</span>
            </>
          }
          subtitle="Компании, в которые наши выпускники и менторы выходили на Go-позиции."
        />
      </div>
      <div className="relative mt-12 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-24" />
        <div className="animate-marquee flex w-max gap-4">
          {row.map((c, i) => (
            <div
              key={`${c}-${i}`}
              className="surface-card flex h-20 min-w-[180px] items-center justify-center rounded-xl px-8 sm:min-w-[200px]"
            >
              <span className="brand-glass brand-glass-text font-display text-lg tracking-wide">{c}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
