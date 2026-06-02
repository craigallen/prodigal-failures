import Link from "next/link";
import { siteConfig } from "@/config/site";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/archive", label: "Archive" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="border-b border-stone-200/70">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        {/* Text logo placeholder */}
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-stone-900"
        >
          {siteConfig.name}
        </Link>

        <nav>
          <ul className="flex items-center gap-6 text-sm font-medium text-stone-600">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
