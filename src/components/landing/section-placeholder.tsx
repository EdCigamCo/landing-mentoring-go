export function SectionPlaceholder({ minHeight }: { minHeight?: string }) {
  return (
    <div
      className="mx-auto max-w-6xl animate-pulse px-4 py-20 sm:px-6 sm:py-24"
      style={minHeight ? { minHeight } : undefined}
      aria-hidden
    >
      <div className="mx-auto h-3 w-24 rounded bg-surface-2" />
      <div className="mx-auto mt-6 h-10 w-2/3 max-w-md rounded bg-surface-2" />
      <div className="mx-auto mt-4 h-4 w-1/2 max-w-sm rounded bg-surface-2/70" />
      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="h-32 rounded-2xl bg-surface-2/60" />
        <div className="h-32 rounded-2xl bg-surface-2/60" />
      </div>
    </div>
  );
}
