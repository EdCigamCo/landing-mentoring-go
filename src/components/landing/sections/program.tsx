import { program } from "../data";
import { SectionHeader } from "../section-header";
import { useInViewAnimation } from "../use-in-view-animation";

export default function Program() {
  const { ref, isActive } = useInViewAnimation<HTMLElement>();

  return (
    <section
      ref={ref}
      id="program"
      className={`landing-section landing-section--animatable shrink-0 py-20 sm:py-24${isActive ? " is-animating" : ""}`}
    >
      <div className="landing-section__bg bg-gradient-to-b from-transparent via-surface/40 to-transparent" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Программа"
          title={
            <>
              Путь до <span className="brand-glass brand-glass-heading">первого оффера</span>
            </>
          }
          subtitle="10 шагов индивидуального сопровождения — от знакомства до выхода на собеседования."
        />
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-[repeat(2,minmax(0,1fr))] [&>*]:min-w-0 [&>*]:min-h-fit [&>*]:w-full">
          {program.map((s) => (
            <div key={s.n} className="surface-card surface-card-hover flex min-w-0 gap-4 rounded-xl p-5 sm:gap-5 sm:p-6">
              <div className="font-display text-2xl text-gold/80 tabular-nums shrink-0">{s.n}</div>
              <div className="min-w-0">
                <h3 className="font-semibold">{s.t}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{s.d}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <a href="#cta" className="btn-primary rounded-full px-7 py-3.5 text-sm font-semibold">
            Получить персональный план
          </a>
        </div>
      </div>
    </section>
  );
}
