import type { MouseEvent } from "react";
import type { SectionId } from "./data/section-id";
import { navigateToSection } from "./prefetch-sections";

export function sectionAnchorClick(id: SectionId) {
  return (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    void navigateToSection(id);
  };
}

export function scrollToPageTop(options: { behavior?: ScrollBehavior } = {}) {
  if (typeof window === "undefined") return;

  const behavior =
    options.behavior ??
    (window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth");

  window.scrollTo({ top: 0, behavior });
}

export function logoHomeClick(event: MouseEvent<HTMLAnchorElement>) {
  event.preventDefault();
  scrollToPageTop();
}
