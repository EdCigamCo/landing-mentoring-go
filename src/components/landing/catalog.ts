import type { ComponentType } from "react";
import type { SectionId } from "./data/section-id";

export type SectionPriority = "high" | "normal";

export type SectionEntry = {
  id: SectionId;
  priority: SectionPriority;
  /** false — секция не рендерится и не попадает в prefetch/nav. */
  enabled?: boolean;
  /** Плейсхолдер до монтирования; на sm+ — основная высота. */
  minHeight: string;
  /** Ниже 640px; если не задан — используется minHeight. */
  minHeightSm?: string;
  loader: () => Promise<{ default: ComponentType }>;
};

export const sectionCatalog: SectionEntry[] = [
  {
    id: "advantages",
    priority: "high",
    minHeight: "820px",
    loader: () => import("./sections/advantages"),
  },
  {
    id: "program",
    priority: "high",
    minHeight: "1000px",
    loader: () => import("./sections/program"),
  },
  {
    id: "mentors",
    priority: "normal",
    minHeight: "900px",
    loader: () => import("./sections/mentors"),
  },
  {
    id: "companies",
    priority: "normal",
    minHeight: "380px",
    loader: () => import("./sections/companies"),
  },
  {
    id: "audience",
    priority: "normal",
    minHeight: "620px",
    loader: () => import("./sections/audience"),
  },
  {
    id: "services",
    priority: "normal",
    minHeight: "980px",
    loader: () => import("./sections/services"),
  },
  {
    id: "reviews",
    priority: "normal",
    enabled: false,
    minHeight: "820px",
    minHeightSm: "520px",
    loader: () => import("./sections/reviews"),
  },
  {
    id: "faq",
    priority: "normal",
    minHeight: "460px",
    loader: () => import("./sections/faq"),
  },
  {
    id: "cta",
    priority: "normal",
    minHeight: "320px",
    loader: () => import("./sections/cta"),
  },
];

export const visibleSections = sectionCatalog.filter((entry) => entry.enabled !== false);

export const sectionById = Object.fromEntries(
  sectionCatalog.map((entry) => [entry.id, entry]),
) as Record<SectionId, SectionEntry>;
