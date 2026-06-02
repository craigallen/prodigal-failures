import type { Metadata } from "next";
import { getFeed, excerpt } from "@/lib/feed";
import { siteConfig } from "@/config/site";
import FeedNotice from "@/components/FeedNotice";

// Revalidate this page hourly, matching the feed cache (see src/lib/feed.ts).
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Archive",
  description: `Every episode of ${siteConfig.name}.`,
};

export default async function ArchivePage() {
  const { episodes, error } = await getFeed();

  return (
    <div className="flex flex-col gap-10">
      <section className="flex flex-col gap-3">
        <h1 className="text-4xl font-bold tracking-tight text-stone-900">Archive</h1>
        <p className="max-w-2xl text-lg text-stone-600">
          Every episode, newest first.
        </p>
      </section>

      {episodes.length === 0 ? (
        <FeedNotice error={error} />
      ) : (
        <ul className="flex flex-col divide-y divide-stone-200 border-y border-stone-200">
          {episodes.map((episode) => (
            <li
              key={episode.id}
              className="flex flex-col gap-2 py-6 sm:flex-row sm:items-start sm:justify-between sm:gap-8"
            >
              <div className="flex flex-col gap-1.5">
                {episode.displayDate && (
                  <time className="text-xs font-medium uppercase tracking-wide text-stone-400">
                    {episode.displayDate}
                  </time>
                )}
                <h2 className="text-lg font-semibold leading-snug text-stone-900">
                  {episode.title}
                </h2>
                {episode.description && (
                  <p className="max-w-2xl text-sm leading-relaxed text-stone-600">
                    {excerpt(episode.description, 200)}
                  </p>
                )}
              </div>
              {episode.link && (
                <a
                  href={episode.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex w-fit flex-shrink-0 items-center text-sm font-medium text-accent transition-colors hover:underline"
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
