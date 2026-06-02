import { excerpt, type Episode } from "@/lib/feed";

// Cycle accent colors so a grid of cards clashes pleasantly.
const accents = ["bg-magenta", "bg-teal", "bg-purple", "bg-yellow", "bg-orange", "bg-blue"];

type EpisodeCardProps = {
  episode: Episode;
  /** Index in the list — used to pick a rotating accent color. */
  index?: number;
};

/** Compact episode card: thumbnail, title, short excerpt, date. */
export default function EpisodeCard({ episode, index = 0 }: EpisodeCardProps) {
  const accent = accents[index % accents.length];

  return (
    <article className="panel flex flex-col overflow-hidden transition-transform duration-100 hover:-translate-y-1">
      {/* Colored accent strip */}
      <div className={`h-2.5 ${accent}`} />

      {episode.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={episode.image}
          alt=""
          className="aspect-square w-full border-b-[3px] border-ink object-cover"
          loading="lazy"
        />
      )}
      <div className="flex flex-1 flex-col gap-3 p-5">
        {episode.displayDate && (
          <span className={`tag w-fit ${accent} text-ink`}>
            {episode.displayDate}
          </span>
        )}
        <h3 className="display text-lg leading-tight text-ink">{episode.title}</h3>
        {episode.description && (
          <p className="text-sm font-medium leading-relaxed text-ink/70">
            {excerpt(episode.description, 140)}
          </p>
        )}
        {episode.link && (
          <a
            href={episode.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto pt-1 text-sm font-bold uppercase tracking-wide text-magenta hover:underline"
          >
            Listen →
          </a>
        )}
      </div>
    </article>
  );
}
