import { edcigamLogoNav } from "./data/images/brand";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex min-w-0 items-center gap-3 ${className}`}>
      <img
        src={edcigamLogoNav}
        alt="EdCigamCo"
        width={40}
        height={40}
        decoding="async"
        className="h-10 w-10 shrink-0 rounded-md object-cover ring-1 ring-border"
      />
      <div className="min-w-0 leading-tight">
        <div className="font-display text-sm font-semibold tracking-wide gradient-edcigam-text truncate">
          EdCigamCo
        </div>
        <div className="brand-glass brand-glass-heading brand-glass-heading--always text-[13px] truncate">
          Мастерская Go
        </div>
      </div>
    </div>
  );
}
