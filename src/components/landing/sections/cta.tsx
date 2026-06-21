import { useInViewAnimation } from "../use-in-view-animation";

export default function CTA() {
  const { ref, isActive } = useInViewAnimation<HTMLElement>();

  return (
    <section
      ref={ref}
      id="cta"
      className={`landing-section landing-section--animatable shrink-0 px-4 py-20 sm:px-6 sm:py-24${isActive ? " is-animating" : ""}`}
    >
      <div className="surface-card relative mx-auto max-w-5xl overflow-hidden rounded-3xl p-7 sm:p-10 md:p-16">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gold/20 blur-2xl" />
        <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-silver/10 blur-2xl" />
        <div className="relative grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:items-center md:gap-10 [&>*]:min-w-0">
          <div className="min-w-0">
            <div className="text-xs uppercase tracking-[0.25em] text-gold">Бесплатный разбор</div>
            <h2 className="mt-4 font-display text-2xl sm:text-3xl md:text-5xl">
              Запишитесь на <span className="brand-glass brand-glass-heading">персональный разбор</span>
            </h2>
            <p className="mt-5 max-w-xl text-muted-foreground">
              30 минут с ментором: оценим стартовую точку, обсудим цели и составим персональный план до оффера на Go.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <a
              href="https://t.me/edcigamco"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary rounded-full px-6 py-4 text-center text-sm font-semibold"
            >
              Написать в Telegram
            </a>
            <a
              href="mailto:hello@edcigam.co"
              className="btn-ghost-gold rounded-full px-6 py-4 text-center text-sm font-semibold break-all"
            >
              hello@edcigam.co
            </a>
            <p className="mt-2 text-center text-xs text-muted-foreground">Без спама. Ответ в течение дня.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
