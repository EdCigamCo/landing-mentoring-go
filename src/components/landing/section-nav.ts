import type { MouseEvent } from "react";
import type { SectionId } from "./data/section-id";
import { sectionById } from "./catalog";
import { navigateToSection } from "./prefetch-sections";

export function sectionIdFromHash(hash: string): SectionId | null {
  const id = hash.replace(/^#/, "");
  if (id in sectionById) return id as SectionId;
  return null;
}

export function sectionAnchorClick(id: SectionId) {
  return (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    void navigateToSection(id);
  };
}

export function scrollToPageTop(options: { behavior?: ScrollBehavior } = {}) {
  if (typeof window === "undefined") return;

  const { pathname, search } = window.location;
  if (window.location.hash) {
    history.pushState(null, "", `${pathname}${search}`);
  }

  window.scrollTo({ top: 0, behavior: options.behavior ?? "smooth" });
}

export function logoHomeClick(event: MouseEvent<HTMLAnchorElement>) {
  event.preventDefault();
  scrollToPageTop();
}
