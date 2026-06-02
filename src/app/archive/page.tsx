import type { Metadata } from "next";
import { getFeed, excerpt } from "@/lib/feed";
import { siteConfig } from "@/config/site";
import FeedNotice from "@/components/FeedNotice";
import { ZigZag } from "@/components/Decorations";

// Revalidate this page hourly, matching the feed cache (see src/lib/feed.ts).
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Archive",
  description: `Every episode of ${siteConfig.name}.`,
};

const accents = ["bg-magenta", "bg-teal", "bg-purple", "bg-yellow", "bg-orange", "bg-blue"];

export default async function ArchivePage() {
  const { episodes, error } = await getFeed();

  return (
    <div className="flex flex-col gap-10">
      <section>
        <h1 className="display text-5xl uppercase text-ink">
          <span className="text-purple">The</span> archive
        </h1>
        <ZigZag className="mt-3 h-5 w-48 text-teal" />
        <p className="mt-5 max-w-2xl text-lg font-medium text-ink/80">
          Every episode, newest first.
        </p>
      </section>

      {episodes.length === 0 ? (
        <FeedNotice error={error} />
      ) : (
        <ul className="flex flex-col gap-5">
          {episodes.map((episode, i) => (
            <li
              key={episode.id}
              className="panel flex flex-col gap-3 p-6 sm:flex-row sm:items-start sm:justify-between sm:gap-8"
            >
              <div className="flex flex-col gap-2">
                {episode.displayDate && (
                  <span className={`tag w-fit ${accents[i % accents.length]} text-ink`}>
                    {episode.displayDate}
                  </span>
                )}
                <h2 className="display text-xl leading-snug text-ink">
                  {episode.title}
                </h2>
                {episode.description && (
                  <p className="max-w-2xl text-sm font-medium leading-relaxed text-ink/70">
                    {excerpt(episode.description, 200)}
                  </p>
                )}
              </div>
              {episode.link && (
                <a
                  href={episode.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn mt-1 w-fit flex-shrink-0 bg-teal text-ink"
                >
                  Listen →
                </a>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
