import { lazy, Suspense, useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import { Menu } from "lucide-react";
import { navLinks } from "./data/nav";
import type { SectionId } from "./data/section-id";
import { Logo } from "./logo";
import {
  navigateToSection,
  prefetchNavSectionChunks,
  prioritizeSection,
  subscribeSectionMounted,
} from "./prefetch-sections";
import { logoHomeClick, sectionIdFromHash } from "./section-nav";

const MobileSheet = lazy(() =>
  import("./nav-mobile-sheet").then((m) => ({ default: m.NavMobileSheet })),
);

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [useMenu, setUseMenu] = useState(true);
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);
  const stickyHeaderRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const navMeasureRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  const handleNavIntent = useCallback((sectionId: SectionId) => {
    prioritizeSection(sectionId);
  }, []);

  const handleSectionNavigate = useCallback((sectionId: SectionId, event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setMenuOpen(false);
    void navigateToSection(sectionId);
  }, []);

  useEffect(() => {
    const header = stickyHeaderRef.current;
    if (!header) return;

    const updateHeaderHeight = () => {
      document.documentElement.style.setProperty("--header-height", `${header.offsetHeight}px`);
    };

    updateHeaderHeight();
    const ro = new ResizeObserver(updateHeaderHeight);
    ro.observe(header);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const check = () => {
      const header = headerRef.current;
      const navMeasure = navMeasureRef.current;
      const logo = logoRef.current;
      const cta = ctaRef.current;
      if (!header || !navMeasure || !logo || !cta) return;

      const gaps = 40;
      const menuBtn = 44;
      const available = header.clientWidth - logo.offsetWidth - cta.offsetWidth - menuBtn - gaps;
      setUseMenu(navMeasure.scrollWidth > available);
    };

    check();
    const ro = new ResizeObserver(check);
    if (headerRef.current) ro.observe(headerRef.current);
    window.addEventListener("resize", check);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", check);
    };
  }, []);

  useEffect(() => {
    if (!useMenu) setMenuOpen(false);
  }, [useMenu]);

  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    const observeSections = () => {
      observer?.disconnect();

      const sections = navLinks
        .map((link) => document.getElementById(link.sectionId))
        .filter((node): node is HTMLElement => node instanceof HTMLElement);

      if (!sections.length) return;

      observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

          const top = visible[0];
          if (top?.target.id) {
            setActiveSection(top.target.id as SectionId);
          }
        },
        { rootMargin: "-40% 0px -45% 0px", threshold: [0, 0.25, 0.5] },
      );

      sections.forEach((section) => observer!.observe(section));
    };

    observeSections();

    const unsubMount = subscribeSectionMounted(() => {
      requestAnimationFrame(observeSections);
    });

    return () => {
      unsubMount();
      observer?.disconnect();
    };
  }, []);

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const id = sectionIdFromHash(window.location.hash);
    if (id) {
      void navigateToSection(id, { behavior: "auto" });
      return;
    }

    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const onHashChange = () => {
      const id = sectionIdFromHash(window.location.hash);
      if (id) void navigateToSection(id);
    };

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const navLinkClass = (sectionId: SectionId) =>
    [
      "whitespace-nowrap transition-colors hover:text-foreground",
      activeSection === sectionId ? "text-foreground" : "text-muted-foreground",
    ].join(" ");

  return (
    <header
      ref={stickyHeaderRef}
      className="landing-header sticky top-0 z-50 border-b border-border/40 md:bg-background/70 md:backdrop-blur-md"
    >
      <div
        ref={navMeasureRef}
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 -z-50 flex gap-4 text-sm opacity-0 xl:gap-6"
      >
        {navLinks.map((l) => (
          <span key={l.href} className="whitespace-nowrap">
            {l.label}
          </span>
        ))}
      </div>

      <div
        ref={headerRef}
        className="mx-auto grid max-w-6xl grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-3 sm:px-6 sm:py-4"
      >
        <a
          ref={logoRef}
          href="/"
          onClick={logoHomeClick}
          className="min-w-0 rounded-md outline-offset-4 focus-visible:outline-2 focus-visible:outline-gold"
          aria-label="На главную"
        >
          <Logo />
        </a>

        {!useMenu ? (
          <nav className="flex min-w-0 items-center justify-center gap-4 text-sm xl:gap-6">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={navLinkClass(l.sectionId)}
                onMouseEnter={() => handleNavIntent(l.sectionId)}
                onFocus={() => handleNavIntent(l.sectionId)}
                onClick={(event) => handleSectionNavigate(l.sectionId, event)}
              >
                {l.label}
              </a>
            ))}
          </nav>
        ) : (
          <div aria-hidden className="min-w-0" />
        )}

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <a
            ref={ctaRef}
            href="#cta"
            onMouseEnter={() => handleNavIntent("cta")}
            onFocus={() => handleNavIntent("cta")}
            onClick={(event) => handleSectionNavigate("cta", event)}
            className="btn-primary shrink-0 rounded-full px-4 py-2 text-xs font-semibold sm:px-5 sm:text-sm"
          >
            Записаться
          </a>
          {useMenu && (
            <>
              <button
                type="button"
                className="nav-menu-btn"
                aria-label="Открыть меню"
                aria-expanded={menuOpen}
                onClick={() => {
                  prefetchNavSectionChunks();
                  setMenuOpen(true);
                }}
              >
                <Menu className="h-5 w-5" strokeWidth={2.25} />
              </button>
              {menuOpen && (
                <Suspense fallback={null}>
                  <MobileSheet
                    open={menuOpen}
                    onOpenChange={setMenuOpen}
                    onPrefetch={handleNavIntent}
                    onNavigate={handleSectionNavigate}
                  />
                </Suspense>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}
