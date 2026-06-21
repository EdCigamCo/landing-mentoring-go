import { sectionCatalog } from "./catalog";
import { Footer } from "./footer";
import { Hero } from "./sections/hero";
import { LazySection } from "./lazy-section";
import { Nav } from "./nav";
import { useLandingPrefetch } from "./use-landing-prefetch";

export function Landing() {
  useLandingPrefetch();

  return (
    <div className="landing min-h-screen overflow-x-clip">
      <Nav />
      <main className="flex flex-col">
        <Hero />
        {sectionCatalog.map((entry) => (
          <LazySection key={entry.id} entry={entry} />
        ))}
      </main>
      <Footer />
    </div>
  );
}
