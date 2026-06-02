import { siteConfig } from "@/config/site";
import ListenLinks from "./ListenLinks";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20">
      {/* Rainbow stripe cap */}
      <div className="flex h-2">
        <div className="flex-1 bg-blue" />
        <div className="flex-1 bg-purple" />
        <div className="flex-1 bg-teal" />
        <div className="flex-1 bg-yellow" />
        <div className="flex-1 bg-orange" />
        <div className="flex-1 bg-magenta" />
      </div>

      <div className="border-t-[3px] border-ink bg-cream">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-10">
          <ListenLinks heading="Listen on" />
          <p className="text-sm font-semibold text-ink">
            © {year} {siteConfig.name}. Catch you on the flip side.
          </p>
        </div>
      </div>
    </footer>
  );
}
