import { faq } from "../data/faq";
import { sectionBlockPadding } from "../section-skeleton-parts";
import { SectionHeader } from "../section-header";
import { useInViewAnimation } from "../use-in-view-animation";

export default function FAQ() {
  const { ref, isActive } = useInViewAnimation<HTMLElement>();

  return (
    <div
      ref={ref}
      className={`landing-section landing-section--animatable shrink-0 ${sectionBlockPadding}${isActive ? " is-animating" : ""}`}
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="FAQ"
          title={
            <>
              Частые <span className="brand-glass brand-glass-heading">вопросы</span>
            </>
          }
        />
        <div className="mt-10 divide-y divide-border/60 rounded-2xl border border-border/60 bg-surface/40">
          {faq.map((f) => (
            <details key={f.q} className="group p-5 sm:p-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-left text-base font-semibold">
                <span className="min-w-0">{f.q}</span>
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-border text-gold transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
