import { siteConfig } from "@/config/site";

type ListenLinksProps = {
  heading?: string;
  className?: string;
};

// Rotating bright fills so each platform sticker clashes with the next.
const swatches = [
  "bg-magenta text-white",
  "bg-teal text-ink",
  "bg-purple text-white",
  "bg-yellow text-ink",
  "bg-orange text-white",
  "bg-blue text-white",
];

/**
 * A row of "Listen on" stickers linking to distribution platforms.
 * Edit the platform list in src/config/site.ts.
 */
export default function ListenLinks({ heading, className = "" }: ListenLinksProps) {
  return (
    <div className={className}>
      {heading && (
        <p className="display mb-3 text-sm uppercase tracking-wide text-ink">
          {heading}
        </p>
      )}
      <ul className="flex flex-wrap gap-3">
        {siteConfig.platforms.map((platform, i) => (
          <li key={platform.name}>
            <a
              href={platform.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`pill ${swatches[i % swatches.length]}`}
            >
              {platform.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
