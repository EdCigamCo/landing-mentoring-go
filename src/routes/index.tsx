import { createFileRoute } from "@tanstack/react-router";
import { Landing } from "@/components/landing/landing";
import { edcigamLogo } from "@/components/landing/data/images/brand";
import favicon from "@/assets/edcigam-logo.ico?url";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EdCigamCo · Мастерская Go — менторство до оффера Golang Backend" },
      {
        name: "description",
        content:
          "Программа менторства от практикующих Golang-разработчиков. Доведём до оффера на backend позицию: авторские курсы, разбор микросервисов из BigTech, мок-собесы и коучинг.",
      },
      { property: "og:title", content: "EdCigamCo · Мастерская Go" },
      {
        property: "og:description",
        content: "Менторство до оффера Golang Backend — авторская методика, разбор BigTech-микросервисов, коучинг.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: edcigamLogo },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "EdCigamCo · Мастерская Go" },
      { name: "twitter:image", content: edcigamLogo },
    ],
    links: [{ rel: "icon", href: favicon, type: "image/x-icon" }],
  }),
  component: Landing,
});
