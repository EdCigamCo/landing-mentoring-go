import { audiences } from "../data";
import { SectionHeader } from "../section-header";
import { useInViewAnimation } from "../use-in-view-animation";

export default function Audience() {
  const { ref, isActive } = useInViewAnimation<HTMLElement>();

  return (
    <section
      ref={ref}
      id="audience"
      className={`landing-section landing-section--animatable shrink-0 py-20 sm:py-24${isActive ? " is-animating" : ""}`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Для кого"
          title={
            <>
              Кому подойдёт <span className="brand-glass brand-glass-heading">программа</span>
            </>
          }
          subtitle="Три портрета учеников, с которыми мы регулярно работаем — и доводим до оффера."
        />
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-[repeat(3,minmax(0,1fr))] [&>*]:min-w-0 [&>*]:min-h-fit [&>*]:w-full">
          {audiences.map((a) => (
            <div key={a.t} className="surface-card surface-card-hover min-w-0 rounded-2xl p-6 sm:p-7">
              <div className="h-px w-10 bg-gold" />
              <h3 className="mt-5 font-display text-xl">{a.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{a.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
