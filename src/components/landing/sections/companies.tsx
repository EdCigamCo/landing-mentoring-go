import { companies } from "../data/companies";
import { sectionBlockPadding } from "../section-skeleton-parts";
import { SectionHeader } from "../section-header";
import { useInViewAnimation } from "../use-in-view-animation";

export default function Companies() {
  const { ref, isActive } = useInViewAnimation<HTMLElement>();
  const row = [...companies, ...companies];

  return (
    <div
      ref={ref}
      className={`landing-section landing-section--animatable shrink-0 ${sectionBlockPadding}${isActive ? " is-animating" : ""}`}
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
          {row.map((company, i) => (
            <div key={`${company.name ?? company.logo}-${i}`} className="companies-marquee__card">
              <div className="companies-marquee__plaque">
                <div className="companies-marquee__plaque-content">
                  {company.logo ? (
                    <span
                      className={`companies-marquee__logo${company.name ? "" : " companies-marquee__logo--wordmark"}`}
                    >
                      <img src={company.logo} alt="" loading="lazy" decoding="async" />
                    </span>
                  ) : null}
                  {company.name ? (
                    <span className="companies-marquee__plaque-name">{company.name}</span>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
