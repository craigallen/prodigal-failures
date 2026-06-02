import Link from "next/link";
import { siteConfig } from "@/config/site";

// Each nav item gets its own clashing hover color, for that 90s pop.
const navLinks = [
  { href: "/", label: "Home", color: "hover:text-magenta" },
  { href: "/about", label: "About", color: "hover:text-teal" },
  { href: "/archive", label: "Archive", color: "hover:text-purple" },
  { href: "/contact", label: "Contact", color: "hover:text-orange" },
];

export default function Header() {
  return (
    <header className="border-b-[3px] border-ink bg-cream">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        {/* Text logo as a magenta sticker */}
        <Link href="/" className="group w-fit">
          <span className="display inline-block rounded-lg border-[3px] border-ink bg-magenta px-3 py-1.5 text-lg uppercase tracking-tight text-white shadow-[4px_4px_0_0_var(--color-ink)] transition-transform group-hover:-rotate-2">
            {siteConfig.name}
          </span>
        </Link>

        <nav>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-bold uppercase tracking-wide">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-ink transition-colors ${link.color}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {/* Rainbow stripe under the header */}
      <div className="flex h-2">
        <div className="flex-1 bg-magenta" />
        <div className="flex-1 bg-yellow" />
        <div className="flex-1 bg-teal" />
        <div className="flex-1 bg-purple" />
        <div className="flex-1 bg-orange" />
        <div className="flex-1 bg-blue" />
      </div>
    </header>
  );
}
