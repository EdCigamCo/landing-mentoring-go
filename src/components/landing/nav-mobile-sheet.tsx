import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { navLinks, type SectionId } from "./data";
import { Logo } from "./logo";

type NavMobileSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigate: (sectionId: SectionId) => void;
};

export function NavMobileSheet({ open, onOpenChange, onNavigate }: NavMobileSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-[min(100%,320px)] border-border/60 bg-card/95 backdrop-blur-md data-[state=closed]:duration-150 data-[state=open]:duration-200"
      >
        <SheetHeader className="text-left">
          <SheetTitle className="sr-only">Навигация</SheetTitle>
          <Logo />
        </SheetHeader>
        <nav className="mt-8 flex flex-col gap-1">
          {navLinks.map((l) => (
            <SheetClose asChild key={l.href}>
              <a
                href={l.href}
                className="nav-sheet-link"
                onMouseEnter={() => onNavigate(l.sectionId)}
                onFocus={() => onNavigate(l.sectionId)}
                onClick={() => onNavigate(l.sectionId)}
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
            onClick={() => onNavigate("cta")}
          >
            Записаться
          </a>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
}
