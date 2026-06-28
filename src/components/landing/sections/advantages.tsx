import { advantages } from "../data/advantages";
import { sectionBlockPadding } from "../section-skeleton-parts";
import { SectionHeader } from "../section-header";
import { useInViewAnimation } from "../use-in-view-animation";

export default function Advantages() {
  const { ref, isActive } = useInViewAnimation<HTMLElement>();

  return (
    <div
      ref={ref}
      className={`landing-section--animatable shrink-0 ${sectionBlockPadding}${isActive ? " is-animating" : ""}`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Преимущества"
          title={
            <>
              Почему <span className="gradient-edcigam-text">EdCigamCo</span>
            </>
          }
          subtitle="Шесть причин, по которым ученики выбирают нашу мастерскую вместо потокового обучения."
        />
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-[repeat(3,minmax(0,1fr))] [&>*]:min-w-0 [&>*]:min-h-fit [&>*]:w-full">
          {advantages.map((a, i) => (
            <div key={a.t} className="surface-card surface-card-hover rounded-2xl p-6 sm:p-7">
              <div className="font-display text-l gradient-edcigam-text">𝓝 {i + 1}</div>
              <h3 className="mt-3 text-lg font-semibold">{a.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{a.d}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
