import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logoAsset from "@/assets/edcigam-logo.asset.json";
import mentor1 from "@/assets/mentor-1.jpg";
import mentor2 from "@/assets/mentor-2.jpg";
import heroBg from "@/assets/hero-bg.jpg";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

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

const services = [
  {
    id: "starter",
    name: "Старт",
    tagline: "Разовая консультация",
    price: "3 500 ₽",
    unit: "за встречу",
    desc: "Точечная помощь: разбор кода, карьерная навигация, ответы на вопросы.",
    features: [
      "Видеовстреча 60 минут",
      "Аудит резюме или кода",
      "Дорожная карта на 1 месяц",
      "Чек-лист после встречи",
    ],
    cta: "Записаться",
    highlight: false,
  },
  {
    id: "mentorship",
    name: "Менторство",
    tagline: "Полная программа до оффера",
    price: "от 25 000 ₽",
    unit: "в месяц",
    desc: "Авторская программа 1:1 с поддержкой до первого оффера на Go-позицию.",
    features: [
      "Курс «Заря» + BigTech-разборы",
      "Еженедельные созвоны 1:1",
      "Код-ревью пет-проекта",
      "Подготовка резюме и легенды",
      "Мок-собесы и сопровождение",
      "Чат с ментором 24/7",
    ],
    cta: "Хочу менторство",
    highlight: true,
    badge: "Популярный",
  },
  {
    id: "vip",
    name: "VIP до оффера",
    tagline: "Максимальное вовлечение",
    price: "по запросу",
    unit: "индивидуально",
    desc: "Двойная скорость и фокус двух менторов — для тех, кому нужен оффер быстро.",
    features: [
      "Всё из тарифа «Менторство»",
      "2 ментора параллельно (Go + МКП)",
      "До 4 созвонов в неделю",
      "Приоритетные мок-интервью",
      "HR-связки и рекомендации",
      "Гарантия сопровождения до оффера",
    ],
    cta: "Обсудить VIP",
    highlight: false,
  },
];

const reviews = [
  {
    name: "Алексей М.",
    role: "Junior Go Developer · Ozon",
    short: "За 5 месяцев из ручного тестировщика вышел на оффер Junior Go в Ozon. Ребята вели до самого конца — буквально по шагам.",
    full: "Пришёл к Эдуарду с минимальным опытом в Python и 3-летним стажем в ручном QA. Сразу составили план: курс «Заря», потом микросервисы, мок-собесы. Поразило, что менторы реально вовлечены — отвечали в чате почти круглосуточно. Самым сложным был системный дизайн, но после 4 мок-интервью с Никитой я уже спокойно говорил про шардинг и kafka. На пятый реальный собес получил оффер в Ozon. До сих пор пишу им, когда упираюсь в задачи. Рекомендую тем, кто готов пахать — результат будет.",
  },
  {
    name: "Дарья К.",
    role: "Frontend → Backend · Avito",
    short: "Перешла с React на Go за 6 месяцев. Без менторства я бы утонула в книжках и тестовых заданиях.",
    full: "Работала фронтендом 4 года, рынок просел, решила переходить в бэкенд. Сама пробовала учиться по курсам — каша в голове. На «Мастерской Go» получила структуру и человека, к которому можно прийти с любым вопросом. Особенно зашёл блок про микросервисы — мы реально разбирали production-сервисы, а не туториалы из YouTube. Резюме и легенду переписали раз пять, зато на собесах HR улыбались. Сейчас работаю в Avito middleware-командой, и впервые за карьеру кайфую от кода.",
  },
  {
    name: "Никита П.",
    role: "Backend Engineer · Tinkoff",
    short: "Менторы не давали поблажек, но и не унижали. Жёсткие ревью + поддержка = быстрый рост.",
    full: "Уже работал джуном на Node.js, но хотел в Go и в крупную компанию. За 3 месяца с Эдуардом разобрали concurrency, контексты, кейсы из BigTech. Никита прокачал собеседовательные навыки и мышление — методология МКП реально работает, я перестал паниковать на технических вопросах. Получил оффер в Тинькофф уже на втором серьёзном собесе. Не пожалел ни одного рубля.",
  },
  {
    name: "Сергей В.",
    role: "С нуля → Junior · Wildberries",
    short: "До программы вообще не программировал. Сейчас пишу production-код на Go. Сам в шоке.",
    full: "Мне 34, работал менеджером в логистике, программировать не умел вообще. Эдуард сразу честно сказал: будет тяжело и долго. 7 месяцев почти без выходных, но каждую неделю — заметный прогресс. Прошёл «Зарю», написал пет-проект (телеграм-бот + микросервис на gRPC), сделали ревью. После мок-собесов с Никитой реальные интервью казались лёгкими. Сейчас джуном в Wildberries, на испытательном уже взяли в продакшн-задачи. Спасибо ребятам — без них бы не справился.",
  },
  {
    name: "Иван Л.",
    role: "QA → Developer · X5 Tech",
    short: "Главная ценность — это не курсы, а живая поддержка и обратная связь по моему конкретному пути.",
    full: "Перепробовал три онлайн-школы — везде поток, никто не помнит твоего имени. Здесь всё по-другому: ментор знает твой уровень, твой пет-проект, твои страхи на собесах. Эдуард адаптировал программу под мой бэкграунд в QA, мы шли быстрее по тестированию и автоматизации, дольше — по архитектуре. В итоге через 4,5 месяца получил оффер в X5 Tech.",
  },
  {
    name: "Мария С.",
    role: "Junior Go · Lamoda",
    short: "Никаких «волшебных» обещаний — только работа. И именно поэтому результат пришёл.",
    full: "Мне нравится, что в «Мастерской» нет маркетингового цирка. Тебе чётко говорят: вот план, вот сроки, вот что нужно от тебя. Я пришла с базой Python, ушла Go-разработчиком в Lamoda. Особенно благодарна за работу с резюме — на него реально начали отвечать. Мок-собесы — отдельная любовь, после них на реальном интервью даже не волновалась.",
  },
];

const faq = [
  { q: "Сколько длится программа?", a: "В среднем 4–7 месяцев до первых офферов — зависит от стартового уровня и скорости работы." },
  { q: "Нужен ли опыт в программировании?", a: "Нет. Если вы новичок — стартуем с авторского курса «Заря». Если уже пишете — пропускаем базу." },
  { q: "Как проходят занятия?", a: "Индивидуальные созвоны с менторами, асинхронная поддержка в чате, разборы кода и мок-интервью." },
  { q: "Есть ли гарантия трудоустройства?", a: "Мы доводим до оффера: сопровождаем резюме, легенду и собесы. Скорость зависит от вовлечённости ученика." },
];

function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex min-w-0 items-center gap-3 ${className}`}>
      <img
        src={logoAsset.url}
        alt="EdCigamCo"
        width={40}
        height={40}
        className="h-10 w-10 shrink-0 rounded-md object-cover ring-1 ring-border"
      />
      <div className="min-w-0 leading-tight">
        <div className="font-display text-sm font-semibold tracking-wide gradient-gold-text truncate">
          EdCigamCo
        </div>
        <div className="brand-glass brand-glass-sm text-[13px] truncate">Мастерская Go</div>
      </div>
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/40 bg-background/70 backdrop-blur-md">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-6 sm:py-4 lg:grid-cols-[auto_1fr_auto]">
        <Logo />
        <nav className="hidden justify-center gap-6 text-sm text-muted-foreground lg:flex xl:gap-8">
          <a href="#advantages" className="hover:text-foreground transition-colors">Преимущества</a>
          <a href="#program" className="hover:text-foreground transition-colors">Программа</a>
          <a href="#services" className="hover:text-foreground transition-colors">Услуги</a>
          <a href="#mentors" className="hover:text-foreground transition-colors">Менторы</a>
          <a href="#reviews" className="hover:text-foreground transition-colors">Отзывы</a>
          <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
        </nav>
        <a
          href="#cta"
          className="btn-primary shrink-0 rounded-full px-4 py-2 text-xs font-semibold sm:px-5 sm:text-sm"
        >
          Записаться
        </a>
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
      <h2 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl">{title}</h2>
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
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-20 md:grid-cols-[1.2fr_1fr] md:items-center md:gap-12 md:py-28 lg:py-32">
        <div className="min-w-0">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            набор открыт · поток 2026
          </div>
          <h1 className="font-display text-[2rem] font-bold leading-[1.08] sm:text-5xl md:text-6xl">
            Стань <span className="gradient-gold-text">Golang Backend</span> разработчиком —
            <span className="gradient-silver-text"> с поддержкой до оффера</span>
          </h1>
          <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
            Авторская программа менторства для тех, кто заходит в IT с нуля или мигрирует с frontend и QA.
            Без воды. Без бесконечных курсов. Только то, что приведёт к найму.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
            <a href="#cta" className="btn-primary rounded-full px-6 py-3 text-sm font-semibold sm:px-7 sm:py-3.5">Записаться на разбор</a>
            <a href="#program" className="btn-ghost-gold rounded-full px-6 py-3 text-sm font-semibold sm:px-7 sm:py-3.5">Посмотреть программу</a>
          </div>
          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 sm:gap-6">
            {[["5+", "лет в Go"], ["10", "шагов до оффера"], ["1:1", "формат работы"]].map(([n, l]) => (
              <div key={l}>
                <dt className="font-display text-2xl gradient-gold-text">{n}</dt>
                <dd className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground sm:text-xs">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative mx-auto w-full max-w-xs sm:max-w-sm md:max-w-none">
          <div className="absolute -inset-8 -z-10 rounded-full bg-gold/10 blur-3xl" />
          <img
            src={logoAsset.url}
            alt="EdCigamCo logo"
            width={640}
            height={640}
            className="animate-float-soft mx-auto w-full max-w-xs rounded-2xl object-cover ring-1 ring-border sm:max-w-sm"
            style={{ boxShadow: "0 30px 80px -30px rgba(0,0,0,0.7)" }}
          />
        </div>
      </div>
    </section>
  );
}

function Advantages() {
  return (
    <section id="advantages" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader eyebrow="Преимущества" title={<>Почему <span className="gradient-gold-text">EdCigamCo</span></>}
          subtitle="Шесть причин, по которым ученики выбирают нашу мастерскую вместо потокового обучения." />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map((a, i) => (
            <div key={a.t} className="surface-card surface-card-hover rounded-2xl p-6 sm:p-7">
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
    <section id="program" className="relative py-20 sm:py-24">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-surface/40 to-transparent" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader eyebrow="Программа" title={<>Путь до <span className="gradient-gold-text">первого оффера</span></>}
          subtitle="10 шагов индивидуального сопровождения — от знакомства до выхода на собеседования." />
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {program.map((s) => (
            <div key={s.n} className="surface-card surface-card-hover flex gap-4 rounded-xl p-5 sm:gap-5 sm:p-6">
              <div className="font-display text-2xl text-gold/80 tabular-nums shrink-0">{s.n}</div>
              <div className="min-w-0">
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

function Services() {
  return (
    <section id="services" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Услуги"
          title={<>Тарифы <span className="brand-glass brand-glass-sm">Мастерской Go</span></>}
          subtitle="Три формата работы — от разовой консультации до полного сопровождения до оффера."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.id}
              className={`surface-card relative flex flex-col rounded-2xl p-6 sm:p-8 ${
                s.highlight ? "ring-2 ring-gold/70 shadow-[0_30px_80px_-30px_rgba(212,175,55,0.4)]" : ""
              }`}
            >
              {s.highlight && s.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-[oklch(0.88_0.08_90)] to-[oklch(0.72_0.13_70)] px-4 py-1 text-[10px] font-bold uppercase tracking-wider text-background">
                  {s.badge}
                </div>
              )}
              <div className="text-xs uppercase tracking-[0.2em] text-gold">{s.tagline}</div>
              <h3 className="mt-3 font-display text-2xl">{s.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              <div className="mt-6 flex items-baseline gap-2">
                <div className="font-display text-3xl gradient-gold-text sm:text-4xl">{s.price}</div>
                <div className="text-xs text-muted-foreground">{s.unit}</div>
              </div>
              <ul className="mt-6 flex-1 space-y-3 text-sm">
                {s.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className="mt-1.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-gold/15 text-gold">
                      <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 6.5L4.5 9L10 3" />
                      </svg>
                    </span>
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#cta"
                className={`mt-8 rounded-full px-6 py-3 text-center text-sm font-semibold ${
                  s.highlight ? "btn-primary" : "btn-ghost-gold"
                }`}
              >
                {s.cta}
              </a>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-xs text-muted-foreground">
          Точная стоимость подбирается под ваш уровень и цели на бесплатном разборе.
        </p>
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
    <section id="mentors" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader eyebrow="Менторы" title={<>Команда <span className="gradient-gold-text">EdCigamCo</span></>}
          subtitle="Двое практикующих инженеров — не методисты, а действующие разработчики." />
        <div className="mt-12 grid gap-6 md:grid-cols-2 md:gap-8">
          {mentors.map((m) => (
            <article key={m.name} className="surface-card surface-card-hover overflow-hidden rounded-2xl">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={m.img} alt={m.name} loading="lazy" width={768} height={576} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
              </div>
              <div className="p-6 sm:p-7">
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

function Reviews() {
  const [active, setActive] = useState<number | null>(null);
  const current = active !== null ? reviews[active] : null;

  return (
    <section id="reviews" className="relative py-20 sm:py-24">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-surface/30 to-transparent" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Отзывы"
          title={<>Что говорят <span className="gradient-gold-text">выпускники</span></>}
          subtitle="Истории учеников, которые прошли путь до оффера вместе с нами."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <article
              key={r.name}
              className="surface-card surface-card-hover flex flex-col rounded-2xl p-6 sm:p-7"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[oklch(0.88_0.08_90)] to-[oklch(0.72_0.13_70)] font-display text-lg text-background">
                  {r.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <div className="truncate font-semibold">{r.name}</div>
                  <div className="truncate text-xs text-gold">{r.role}</div>
                </div>
              </div>
              <div className="mt-4 text-gold/70" aria-hidden>
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor"><path d="M7 7h4v4H7a2 2 0 0 0-2 2v4H1v-4a6 6 0 0 1 6-6zm12 0h4v4h-4a2 2 0 0 0-2 2v4h-4v-4a6 6 0 0 1 6-6z"/></svg>
              </div>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-5">
                {r.short}
              </p>
              <button
                type="button"
                onClick={() => setActive(i)}
                className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-semibold text-gold transition-colors hover:text-gold-soft"
              >
                Читать отзыв
                <span aria-hidden>→</span>
              </button>
            </article>
          ))}
        </div>
      </div>

      <Dialog open={active !== null} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-2xl border-border/60 bg-card">
          {current && (
            <>
              <DialogHeader className="text-left">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[oklch(0.88_0.08_90)] to-[oklch(0.72_0.13_70)] font-display text-xl text-background">
                    {current.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <DialogTitle className="truncate font-display text-xl">{current.name}</DialogTitle>
                    <DialogDescription className="truncate text-gold">{current.role}</DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              <div className="max-h-[60vh] overflow-y-auto pr-1 text-sm leading-relaxed text-muted-foreground">
                {current.full}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

function Companies() {
  const row = [...companies, ...companies];
  return (
    <section id="companies" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader eyebrow="Трудоустройство" title={<>Куда устраиваются <span className="gradient-gold-text">наши ученики</span></>}
          subtitle="Компании, в которые наши выпускники и менторы выходили на Go-позиции." />
      </div>
      <div className="relative mt-12 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-24" />
        <div className="flex w-max animate-marquee gap-4">
          {row.map((c, i) => (
            <div key={`${c}-${i}`} className="surface-card flex h-20 min-w-[180px] items-center justify-center rounded-xl px-8 sm:min-w-[200px]">
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
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader eyebrow="Для кого" title={<>Кому подойдёт <span className="gradient-gold-text">программа</span></>}
          subtitle="Три портрета учеников, с которыми мы регулярно работаем — и доводим до оффера." />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((a) => (
            <div key={a.t} className="surface-card surface-card-hover rounded-2xl p-6 sm:p-7">
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
    <section id="faq" className="py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeader eyebrow="FAQ" title={<>Частые <span className="gradient-gold-text">вопросы</span></>} />
        <div className="mt-10 divide-y divide-border/60 rounded-2xl border border-border/60 bg-surface/40">
          {faq.map((f) => (
            <details key={f.q} className="group p-5 sm:p-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-left text-base font-semibold">
                <span className="min-w-0">{f.q}</span>
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
    <section id="cta" className="px-4 py-20 sm:px-6 sm:py-24">
      <div className="surface-card relative mx-auto max-w-5xl overflow-hidden rounded-3xl p-7 sm:p-10 md:p-16">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-silver/10 blur-3xl" />
        <div className="relative grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center md:gap-10">
          <div className="min-w-0">
            <div className="text-xs uppercase tracking-[0.25em] text-gold">Бесплатный разбор</div>
            <h2 className="mt-4 font-display text-2xl sm:text-3xl md:text-5xl">
              Запишитесь на <span className="gradient-gold-text">персональный разбор</span>
            </h2>
            <p className="mt-5 max-w-xl text-muted-foreground">
              30 минут с ментором: оценим стартовую точку, обсудим цели и составим персональный план до оффера на Go.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <a href="https://t.me/edcigamco" target="_blank" rel="noopener noreferrer"
              className="btn-primary rounded-full px-6 py-4 text-center text-sm font-semibold">Написать в Telegram</a>
            <a href="mailto:hello@edcigam.co"
              className="btn-ghost-gold rounded-full px-6 py-4 text-center text-sm font-semibold break-all">hello@edcigam.co</a>
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
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 px-4 text-sm text-muted-foreground sm:px-6 md:flex-row">
        <Logo />
        <div className="text-center">© {new Date().getFullYear()} EdCigamCo · <span className="brand-glass brand-glass-sm">Мастерская Go</span></div>
        <div className="flex gap-5">
          <a href="https://t.me/edcigamco" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">Telegram</a>
          <a href="mailto:hello@edcigam.co" className="hover:text-foreground">Email</a>
        </div>
      </div>
    </footer>
  );
}

function Landing() {
  // suppress unused import warning under strict TS
  useEffect(() => {}, []);
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Nav />
      <main>
        <Hero />
        <Advantages />
        <Program />
        <Services />
        <Mentors />
        <Reviews />
        <Companies />
        <Audience />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
