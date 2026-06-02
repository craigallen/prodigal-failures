import { siteConfig } from "@/config/site";
import ListenLinks from "./ListenLinks";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-stone-200/70">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-10">
        <ListenLinks heading="Listen on" />
        <p className="text-sm text-stone-500">
          © {year} {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
