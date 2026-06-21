type SkeletonHeaderProps = {
  withSubtitle?: boolean;
};

export function SkeletonHeader({ withSubtitle = true }: SkeletonHeaderProps) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="mx-auto h-3 w-24 rounded bg-surface-2" />
      <div className="mx-auto mt-4 h-9 w-4/5 max-w-md rounded bg-surface-2 sm:h-11" />
      {withSubtitle ? <div className="mx-auto mt-5 h-4 w-3/5 max-w-sm rounded bg-surface-2/70" /> : null}
    </div>
  );
}

export function SkeletonCard({ className = "" }: { className?: string }) {
  return <div className={`rounded-2xl bg-surface-2/60 ${className}`} />;
}

/** Вертикальный паддинг внутреннего блока lazy-секции — синхронизировать со скелетонами. */
export const sectionBlockPadding = "py-[30px]";

export const skeletonSectionShell = `px-4 sm:px-6 ${sectionBlockPadding}`;
