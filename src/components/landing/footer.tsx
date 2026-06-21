import { Logo } from "./logo";

export function Footer() {
  return (
    <footer className="border-t border-border/40 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 px-4 text-sm text-muted-foreground sm:px-6 md:flex-row">
        <Logo />
        <div className="text-center">
          © {new Date().getFullYear()} EdCigamCo · Мастерская Go. Все права защищены.
        </div>
        <div className="flex gap-5">
          <a href="https://t.me/edcigamco" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
            Telegram
          </a>
          <a href="mailto:hello@edcigam.co" className="hover:text-foreground">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
