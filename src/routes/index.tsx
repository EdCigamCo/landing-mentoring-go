import { createFileRoute } from "@tanstack/react-router";
import logoAsset from "@/assets/edcigam-logo.asset.json";
import mentor1 from "@/assets/mentor-1.jpg";
import mentor2 from "@/assets/mentor-2.jpg";
import heroBg from "@/assets/hero-bg.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EdCigamCo · Мастерская Go — менторство до оффера Golang Backend" },
      {
        name: "description",
        content:
          "Программа менторства от практикующих Golang-разработчиков. Доведём до оффера на backend позицию: авторские курсы, разбор микросервисов из BigTech, мок-собесы и коучинг.",
      },
      { property: "og:title", content: "EdCigamCo · Мастерская Go" },
      {
        property: "og:description",
        content: "Менторство до оффера Golang Backend — авторская методика, разбор BigTech-микросервисов, коучинг.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: logoAsset.url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "EdCigamCo · Мастерская Go" },
      { name: "twitter:image", content: logoAsset.url },
    ],
  }),
  component: Landing,
});

const advantages = [
  { t: "Авторские курсы", d: "Собственные программы, заточенные под путь в коммерческую Go-разработку — без воды." },
  { t: "МКП-коучинг", d: "Аналитика и сопровождение по методологии «Метакогнитивное программирование» — экспоненциальный рост." },
  { t: "BigTech-микросервисы", d: "Разбираем реальные сервисы, построенные по микросервисной архитектуре, как в крупных компаниях." },
  { t: "Step-by-step методика", d: "Исследовательский формат обучения, выверенный за 5 лет преподавательской практики." },
  { t: "Только нужное", d: "Баланс теории и практики. Учим то, что реально пригодится на работе — ни строчки лишнего." },
  { t: "Практикующие менторы", d: "Совмещаем преподавание и коммерческую разработку. 5 лет в Go и в найме." },
];

const program = [
  { n: "01", t: "Знакомство", d: "Уточняем запрос, цели и стартовый уровень." },
  { n: "02", t: "Курс «Заря»", d: "Авторский курс по Go с нуля — если ещё не писали на Golang." },
  { n: "03", t: "Scrum · Git · REST", d: "Инструменты и процессы коммерческой разработки на Go." },
  { n: "04", t: "BigTech-сервисы", d: "Практический разбор микросервисной архитектуры на реальных проектах." },
  { n: "05", t: "Пет-проект + ревью", d: "Собираете свой проект и получаете полноценное код-ревью." },
  { n: "06", t: "Материалы к собесам", d: "Структурированная база и разбор формата интервью." },
  { n: "07", t: "Резюме и легенда", d: "Составляем сильное CV и регистрируем вас в источниках для привлечения HR." },
  { n: "08", t: "МКП-диагностика", d: "Индивидуальная психологическая аналитика и настройка мышления." },
  { n: "09", t: "Мок-собесы", d: "Тренировочные интервью, правки резюме и легенды, выход в найм." },
  { n: "10", t: "Сопровождение", d: "Разбор первых реальных собеседований с рекомендациями." },
];

const companies = [
  "Yandex", "Avito", "Ozon", "VK", "Tinkoff", "Sber", "Wildberries", "X5 Tech",
  "Mail.ru", "Kaspersky", "Lamoda", "Циан", "МТС", "AlfaBank",
];

const audiences = [
  { t: "С нуля в IT", d: "Без коммерческого опыта и почти без программирования. Поведём с самого начала." },
  { t: "Frontend → Backend", d: "Уходите с фронта из-за рынка. Конвертируем опыт в крепкий бэкенд на Go." },
  { t: "QA → Developer", d: "Тестируете системы — пора их строить. Структурируем переход в разработку." },
];

const faq = [
  { q: "Сколько длится программа?", a: "В среднем 4–7 месяцев до первых офферов — зависит от стартового уровня и скорости работы." },
  { q: "Нужен ли опыт в программировании?", a: "Нет. Если вы новичок — стартуем с авторского курса «Заря». Если уже пишете — пропускаем базу." },
  { q: "Как проходят занятия?", a: "Индивидуальные созвоны с менторами, асинхронная поддержка в чате, разборы кода и мок-интервью." },
  { q: "Есть ли гарантия трудоустройства?", a: "Мы доводим до оффера: сопровождаем резюме, легенду и собесы. Скорость зависит от вовлечённости ученика." },
];

function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img src={logoAsset.url} alt="EdCigamCo" width={40} height={40} className="h-10 w-10 rounded-md object-cover ring-1 ring-border" />
      <div className="leading-tight">
        <div className="font-display text-sm font-semibold tracking-wide gradient-gold-text">EdCigamCo</div>
        <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Мастерская Go</div>
      </div>
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Logo />
        <nav className="hidden gap-8 text-sm text-muted-foreground md:flex">
          <a href="#advantages" className="hover:text-foreground transition-colors">Преимущества</a>
          <a href="#program" className="hover:text-foreground transition-colors">Программа</a>
          <a href="#mentors" className="hover:text-foreground transition-colors">Менторы</a>
          <a href="#companies" className="hover:text-foreground transition-colors">Трудоустройство</a>
          <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
        </nav>
        <a href="#cta" className="btn-primary rounded-full px-5 py-2 text-sm font-semibold">Записаться</a>
      </div>
    </header>
  );
}

function SectionHeader({
  eyebrow, title, subtitle,
}: { eyebrow: string; title: React.ReactNode; subtitle?: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="text-xs uppercase tracking-[0.25em] text-gold">{eyebrow}</div>
      <h2 className="mt-4 font-display text-3xl md:text-5xl">{title}</h2>
      {subtitle && <p className="mt-5 text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 -z-10 opacity-60"
        style={{ backgroundImage: `url(${heroBg})`, backgroundSize: "cover", backgroundPosition: "center" }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/40 via-background/70 to-background" />
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-[1.2fr_1fr] md:items-center md:py-32">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            набор открыт · поток 2026
          </div>
          <h1 className="font-display text-4xl font-bold leading-[1.05] sm:text-5xl md:text-6xl">
            Стань <span className="gradient-gold-text">Golang Backend</span> разработчиком —
            <span className="gradient-silver-text"> с поддержкой до оффера</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Авторская программа менторства для тех, кто заходит в IT с нуля или мигрирует с frontend и QA.
            Без воды. Без бесконечных курсов. Только то, что приведёт к найму.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a href="#cta" className="btn-primary rounded-full px-7 py-3.5 text-sm font-semibold">Записаться на разбор</a>
            <a href="#program" className="btn-ghost-gold rounded-full px-7 py-3.5 text-sm font-semibold">Посмотреть программу</a>
          </div>
          <dl className="mt-12 grid max-w-md grid-cols-3 gap-6">
            {[["5+", "лет в Go"], ["10", "шагов до оффера"], ["1:1", "формат работы"]].map(([n, l]) => (
              <div key={l}>
                <dt className="font-display text-2xl gradient-gold-text">{n}</dt>
                <dd className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative mx-auto w-full max-w-sm md:max-w-none">
          <div className="absolute -inset-8 -z-10 rounded-full bg-gold/10 blur-3xl" />
          <img
            src={logoAsset.url}
            alt="EdCigamCo logo"
            width={640}
            height={640}
            className="animate-float-soft mx-auto w-full max-w-sm rounded-2xl object-cover ring-1 ring-border"
            style={{ boxShadow: "0 30px 80px -30px rgba(0,0,0,0.7)" }}
          />
        </div>
      </div>
    </section>
  );
}

function Advantages() {
  return (
    <section id="advantages" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader eyebrow="Преимущества" title={<>Почему <span className="gradient-gold-text">EdCigamCo</span></>}
          subtitle="Шесть причин, по которым ученики выбирают нашу мастерскую вместо потокового обучения." />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {advantages.map((a, i) => (
            <div key={a.t} className="surface-card surface-card-hover rounded-2xl p-7">
              <div className="font-display text-xs text-gold">0{i + 1}</div>
              <h3 className="mt-3 text-lg font-semibold">{a.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{a.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Program() {
  return (
    <section id="program" className="relative py-24">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-surface/40 to-transparent" />
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader eyebrow="Программа" title={<>Путь до <span className="gradient-gold-text">первого оффера</span></>}
          subtitle="10 шагов индивидуального сопровождения — от знакомства до выхода на собеседования." />
        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {program.map((s) => (
            <div key={s.n} className="surface-card surface-card-hover flex gap-5 rounded-xl p-6">
              <div className="font-display text-2xl text-gold/80 tabular-nums">{s.n}</div>
              <div>
                <h3 className="font-semibold">{s.t}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{s.d}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <a href="#cta" className="btn-primary rounded-full px-7 py-3.5 text-sm font-semibold">Получить персональный план</a>
        </div>
      </div>
    </section>
  );
}

function Mentors() {
  const mentors = [
    {
      img: mentor1,
      name: "Эдуард",
      role: "Senior Go Engineer · Архитектор курса",
      bio: "5 лет коммерческой Go-разработки, 5 лет преподавания. Автор курса «Заря» и методологии step-by-step обучения.",
      tags: ["Go · Microservices", "System Design", "Авторские курсы"],
    },
    {
      img: mentor2,
      name: "Никита",
      role: "Backend Engineer · МКП-коуч",
      bio: "Практикующий разработчик и коуч. Ведёт «Метакогнитивное программирование» — психология и аналитика обучения.",
      tags: ["Go · BigTech", "Mock interviews", "МКП-коучинг"],
    },
  ];
  return (
    <section id="mentors" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader eyebrow="Менторы" title={<>Команда <span className="gradient-gold-text">EdCigamCo</span></>}
          subtitle="Двое практикующих инженеров — не методисты, а действующие разработчики." />
        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {mentors.map((m) => (
            <article key={m.name} className="surface-card surface-card-hover overflow-hidden rounded-2xl">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={m.img} alt={m.name} loading="lazy" width={768} height={576} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
              </div>
              <div className="p-7">
                <h3 className="font-display text-2xl">{m.name}</h3>
                <div className="mt-1 text-sm text-gold">{m.role}</div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{m.bio}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {m.tags.map((t) => (
                    <span key={t} className="rounded-full border border-border bg-surface-2/60 px-3 py-1 text-xs text-muted-foreground">{t}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Companies() {
  const row = [...companies, ...companies];
  return (
    <section id="companies" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader eyebrow="Трудоустройство" title={<>Куда устраиваются <span className="gradient-gold-text">наши ученики</span></>}
          subtitle="Компании, в которые наши выпускники и менторы выходили на Go-позиции." />
      </div>
      <div className="relative mt-14 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
        <div className="flex w-max animate-marquee gap-4">
          {row.map((c, i) => (
            <div key={`${c}-${i}`} className="surface-card flex h-20 min-w-[200px] items-center justify-center rounded-xl px-8">
              <span className="font-display text-lg tracking-wide gradient-silver-text">{c}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Audience() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader eyebrow="Для кого" title={<>Кому подойдёт <span className="gradient-gold-text">программа</span></>}
          subtitle="Три портрета учеников, с которыми мы регулярно работаем — и доводим до оффера." />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {audiences.map((a) => (
            <div key={a.t} className="surface-card surface-card-hover rounded-2xl p-7">
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

function FAQ() {
  return (
    <section id="faq" className="py-24">
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeader eyebrow="FAQ" title={<>Частые <span className="gradient-gold-text">вопросы</span></>} />
        <div className="mt-12 divide-y divide-border/60 rounded-2xl border border-border/60 bg-surface/40">
          {faq.map((f) => (
            <details key={f.q} className="group p-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-6 text-left text-base font-semibold">
                {f.q}
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-border text-gold transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="cta" className="px-6 py-24">
      <div className="surface-card relative mx-auto max-w-5xl overflow-hidden rounded-3xl p-10 md:p-16">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-silver/10 blur-3xl" />
        <div className="relative grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-center">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-gold">Бесплатный разбор</div>
            <h2 className="mt-4 font-display text-3xl md:text-5xl">
              Запишитесь на <span className="gradient-gold-text">персональный разбор</span>
            </h2>
            <p className="mt-5 max-w-xl text-muted-foreground">
              30 минут с ментором: оценим стартовую точку, обсудим цели и составим персональный план до оффера на Go.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <a href="https://t.me/edcigamco" target="_blank" rel="noopener noreferrer"
              className="btn-primary rounded-full px-7 py-4 text-center text-sm font-semibold">Написать в Telegram</a>
            <a href="mailto:hello@edcigam.co"
              className="btn-ghost-gold rounded-full px-7 py-4 text-center text-sm font-semibold">hello@edcigam.co</a>
            <p className="mt-2 text-center text-xs text-muted-foreground">Без спама. Ответ в течение дня.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/40 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted-foreground md:flex-row">
        <Logo />
        <div>© {new Date().getFullYear()} EdCigamCo · Мастерская Go</div>
        <div className="flex gap-5">
          <a href="https://t.me/edcigamco" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">Telegram</a>
          <a href="mailto:hello@edcigam.co" className="hover:text-foreground">Email</a>
        </div>
      </div>
    </footer>
  );
}

function Landing() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <Hero />
        <Advantages />
        <Program />
        <Mentors />
        <Companies />
        <Audience />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
