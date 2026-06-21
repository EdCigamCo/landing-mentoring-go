import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { navLinks } from "./data/nav";
import type { SectionId } from "./data/section-id";
import { Logo } from "./logo";
import type { MouseEvent } from "react";
import { logoHomeClick } from "./section-nav";

type NavMobileSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPrefetch: (sectionId: SectionId) => void;
  onNavigate: (sectionId: SectionId, event: MouseEvent<HTMLAnchorElement>) => void;
};

export function NavMobileSheet({ open, onOpenChange, onPrefetch, onNavigate }: NavMobileSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-[min(100%,320px)] border-border/60 bg-card/95 backdrop-blur-md data-[state=closed]:duration-150 data-[state=open]:duration-200"
      >
        <SheetHeader className="text-left">
          <SheetTitle className="sr-only">Навигация</SheetTitle>
          <SheetClose asChild>
            <a
              href="/"
              onClick={(event) => {
                logoHomeClick(event);
                onOpenChange(false);
              }}
              className="inline-block rounded-md outline-offset-4 focus-visible:outline-2 focus-visible:outline-gold"
              aria-label="На главную"
            >
              <Logo />
            </a>
          </SheetClose>
        </SheetHeader>
        <nav className="mt-8 flex flex-col gap-1">
          {navLinks.map((l) => (
            <SheetClose asChild key={l.href}>
              <a
                href={l.href}
                className="nav-sheet-link"
                onMouseEnter={() => onPrefetch(l.sectionId)}
                onFocus={() => onPrefetch(l.sectionId)}
                onClick={(event) => onNavigate(l.sectionId, event)}
              >
                {l.label}
              </a>
            </SheetClose>
          ))}
        </nav>
        <SheetClose asChild>
          <a
            href="#cta"
            className="btn-primary mt-8 block rounded-full px-6 py-3.5 text-center text-sm font-semibold"
            onClick={(event) => onNavigate("cta", event)}
          >
            Записаться
          </a>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
}
