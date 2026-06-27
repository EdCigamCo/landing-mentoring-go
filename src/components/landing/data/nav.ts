import { visibleSections } from "../catalog";
import type { SectionId } from "./section-id";

const visibleSectionIds = new Set(visibleSections.map((entry) => entry.id));

const allNavLinks = [
  { href: "#advantages", label: "Преимущества", sectionId: "advantages" as const },
  { href: "#program", label: "Программа", sectionId: "program" as const },
  { href: "#mentors", label: "Менторы", sectionId: "mentors" as const },
  { href: "#services", label: "Услуги", sectionId: "services" as const },
  { href: "#reviews", label: "Отзывы", sectionId: "reviews" as const },
  { href: "#faq", label: "FAQ", sectionId: "faq" as const },
] satisfies ReadonlyArray<{ href: string; label: string; sectionId: SectionId }>;

export const navLinks = allNavLinks.filter((link) => visibleSectionIds.has(link.sectionId));
