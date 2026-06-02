import { excerpt, type Episode } from "@/lib/feed";

type EpisodeCardProps = {
  episode: Episode;
};

/** Compact episode card: thumbnail, title, short excerpt, date. */
export default function EpisodeCard({ episode }: EpisodeCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-stone-200 bg-white transition-shadow hover:shadow-sm">
      {episode.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={episode.image}
          alt=""
          className="aspect-square w-full object-cover"
          loading="lazy"
        />
      )}
      <div className="flex flex-1 flex-col gap-2 p-5">
        {episode.displayDate && (
          <time className="text-xs font-medium uppercase tracking-wide text-stone-400">
            {episode.displayDate}
          </time>
        )}
        <h3 className="text-base font-semibold leading-snug text-stone-900">
          {episode.title}
        </h3>
        {episode.description && (
          <p className="text-sm leading-relaxed text-stone-600">
            {excerpt(episode.description, 140)}
          </p>
        )}
        {episode.link && (
          <a
            href={episode.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto pt-2 text-sm font-medium text-accent transition-colors hover:underline"
          >
            Listen →
          </a>
        )}
      </div>
    </article>
  );
}
