import type { ReactElement } from "react";
import type { SectionId } from "./data/section-id";
import { SkeletonCard, SkeletonHeader, skeletonSectionShell } from "./section-skeleton-parts";

function AdvantagesSkeleton() {
  return (
    <div className={`mx-auto max-w-6xl ${skeletonSectionShell}`} aria-hidden>
      <SkeletonHeader />
      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} className="h-[8.5rem] sm:h-36" />
        ))}
      </div>
    </div>
  );
}

function ProgramSkeleton() {
  return (
    <div className={`mx-auto max-w-6xl ${skeletonSectionShell}`} aria-hidden>
      <SkeletonHeader />
      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
        {Array.from({ length: 10 }).map((_, i) => (
          <SkeletonCard key={i} className="h-[4.75rem] sm:h-20" />
        ))}
      </div>
      <div className="mt-12 flex justify-center">
        <div className="h-11 w-56 rounded-full bg-surface-2" />
      </div>
    </div>
  );
}

function MentorsSkeleton() {
  return (
    <div className={`mx-auto w-full max-w-[1316px] ${skeletonSectionShell}`} aria-hidden>
      <SkeletonHeader />
      <div className="mx-auto mt-12 grid w-full max-w-[974px] grid-cols-1 gap-6 md:h-[34rem] md:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="grid h-[28rem] grid-rows-[2fr_1fr] overflow-hidden rounded-2xl md:h-full">
            <div className="bg-surface-2/70" />
            <div className="space-y-3 bg-surface-2/50 p-5">
              <div className="h-5 w-2/3 rounded bg-surface-2" />
              <div className="h-3 w-1/2 rounded bg-surface-2/80" />
              <div className="h-3 w-full rounded bg-surface-2/60" />
              <div className="h-3 w-4/5 rounded bg-surface-2/60" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CompaniesSkeleton() {
  return (
    <div className={skeletonSectionShell} aria-hidden>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SkeletonHeader />
      </div>
      <div className="mt-12 flex gap-4 overflow-hidden px-4 sm:px-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} className="h-20 min-w-[11rem] shrink-0 rounded-xl sm:min-w-[12.5rem]" />
        ))}
      </div>
    </div>
  );
}

function AudienceSkeleton() {
  return (
    <div className={`mx-auto max-w-6xl ${skeletonSectionShell}`} aria-hidden>
      <SkeletonHeader />
      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <SkeletonCard key={i} className="h-40 sm:h-44" />
        ))}
      </div>
    </div>
  );
}

function ServicesSkeleton() {
  return (
    <div className={`mx-auto max-w-6xl ${skeletonSectionShell}`} aria-hidden>
      <SkeletonHeader />
      <div className="mt-4 flex items-stretch gap-4 overflow-hidden pt-12 pb-16">
        <SkeletonCard className="mt-8 h-[30rem] w-[42%] shrink-0 rounded-2xl opacity-60" />
        <SkeletonCard className="h-[34rem] w-[min(88vw,340px)] shrink-0 rounded-2xl sm:w-[42%]" />
        <SkeletonCard className="mt-8 h-[30rem] w-[42%] shrink-0 rounded-2xl opacity-60" />
      </div>
      <div className="flex justify-center gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-2 w-2 rounded-full bg-surface-2" />
        ))}
      </div>
      <div className="mx-auto mt-8 h-3 w-72 max-w-full rounded bg-surface-2/50" />
    </div>
  );
}

function ReviewsSkeleton() {
  return (
    <div className={`mx-auto max-w-6xl ${skeletonSectionShell}`} aria-hidden>
      <SkeletonHeader />
      <div className="relative mt-12 px-11 sm:px-10">
        <SkeletonCard className="h-44 sm:hidden" />
        <div className="hidden gap-5 sm:grid sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} className="h-48" />
          ))}
        </div>
        <div className="mt-7 space-y-2 sm:mt-8">
          <div className="h-1.5 w-full rounded-full bg-surface-2/50" />
          <div className="flex justify-between">
            <div className="h-3 w-28 rounded bg-surface-2/60" />
            <div className="h-3 w-10 rounded bg-surface-2/60" />
          </div>
        </div>
      </div>
    </div>
  );
}

function FaqSkeleton() {
  return (
    <div className={`mx-auto max-w-3xl ${skeletonSectionShell}`} aria-hidden>
      <SkeletonHeader withSubtitle={false} />
      <div className="mt-10 divide-y divide-border/40 rounded-2xl border border-border/40 bg-surface/30">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between gap-4 p-5 sm:p-6">
            <div className="h-4 flex-1 rounded bg-surface-2" />
            <div className="h-7 w-7 shrink-0 rounded-full bg-surface-2/80" />
          </div>
        ))}
      </div>
    </div>
  );
}

function CtaSkeleton() {
  return (
    <div className={skeletonSectionShell} aria-hidden>
      <div className="mx-auto max-w-5xl rounded-3xl border border-border/40 bg-surface/40 p-7 sm:p-10 md:p-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
          <div className="space-y-4">
            <div className="h-3 w-32 rounded bg-surface-2" />
            <div className="h-10 w-full max-w-md rounded bg-surface-2 sm:h-12" />
            <div className="h-4 w-full max-w-xl rounded bg-surface-2/70" />
            <div className="h-4 w-4/5 max-w-lg rounded bg-surface-2/60" />
          </div>
          <div className="space-y-3">
            <div className="h-12 rounded-full bg-surface-2" />
            <div className="h-12 rounded-full bg-surface-2/70" />
            <div className="mx-auto mt-2 h-3 w-40 rounded bg-surface-2/50" />
          </div>
        </div>
      </div>
    </div>
  );
}

const sectionSkeletons: Record<SectionId, () => ReactElement> = {
  advantages: AdvantagesSkeleton,
  program: ProgramSkeleton,
  mentors: MentorsSkeleton,
  companies: CompaniesSkeleton,
  audience: AudienceSkeleton,
  services: ServicesSkeleton,
  reviews: ReviewsSkeleton,
  faq: FaqSkeleton,
  cta: CtaSkeleton,
};

export function SectionSkeleton({ id }: { id: SectionId }) {
  const Skeleton = sectionSkeletons[id];
  return <Skeleton />;
}
