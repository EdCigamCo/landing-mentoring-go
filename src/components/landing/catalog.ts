import type { ComponentType } from "react";
import type { SectionId } from "./data";

export type SectionPriority = "high" | "normal";

export type SectionEntry = {
  id: SectionId;
  priority: SectionPriority;
  minHeight: string;
  loader: () => Promise<{ default: ComponentType }>;
};

export const sectionCatalog: SectionEntry[] = [
  {
    id: "advantages",
    priority: "high",
    minHeight: "520px",
    loader: () => import("./sections/advantages"),
  },
  {
    id: "program",
    priority: "high",
    minHeight: "720px",
    loader: () => import("./sections/program"),
  },
  {
    id: "mentors",
    priority: "normal",
    minHeight: "640px",
    loader: () => import("./sections/mentors"),
  },
  {
    id: "companies",
    priority: "normal",
    minHeight: "320px",
    loader: () => import("./sections/companies"),
  },
  {
    id: "audience",
    priority: "normal",
    minHeight: "420px",
    loader: () => import("./sections/audience"),
  },
  {
    id: "services",
    priority: "normal",
    minHeight: "560px",
    loader: () => import("./sections/services"),
  },
  {
    id: "reviews",
    priority: "normal",
    minHeight: "480px",
    loader: () => import("./sections/reviews"),
  },
  {
    id: "faq",
    priority: "normal",
    minHeight: "400px",
    loader: () => import("./sections/faq"),
  },
  {
    id: "cta",
    priority: "normal",
    minHeight: "320px",
    loader: () => import("./sections/cta"),
  },
];

export const sectionById = Object.fromEntries(
  sectionCatalog.map((entry) => [entry.id, entry]),
) as Record<SectionId, SectionEntry>;
