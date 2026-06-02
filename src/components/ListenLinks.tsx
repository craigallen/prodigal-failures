import { siteConfig } from "@/config/site";

type ListenLinksProps = {
  /** Optional heading shown above the links. */
  heading?: string;
  className?: string;
};

/**
 * A row of "Listen on" links to the podcast's distribution platforms.
 * Edit the platform list in src/config/site.ts.
 */
export default function ListenLinks({ heading, className = "" }: ListenLinksProps) {
  return (
    <div className={className}>
      {heading && (
        <p className="mb-3 text-sm font-medium uppercase tracking-wide text-stone-500">
          {heading}
        </p>
      )}
      <ul className="flex flex-wrap gap-2.5">
        {siteConfig.platforms.map((platform) => (
          <li key={platform.name}>
            <a
              href={platform.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full border border-stone-300 px-4 py-1.5 text-sm font-medium text-stone-700 transition-colors hover:border-accent hover:text-accent"
            >
              {platform.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
