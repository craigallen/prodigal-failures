import { getFeed, excerpt } from "@/lib/feed";
import { siteConfig } from "@/config/site";
import EpisodeCard from "@/components/EpisodeCard";
import ListenLinks from "@/components/ListenLinks";
import FeedNotice from "@/components/FeedNotice";

// Revalidate this page hourly, matching the feed cache (see src/lib/feed.ts).
export const revalidate = 3600;

export default async function HomePage() {
  const { episodes, error } = await getFeed();

  const [featured, ...rest] = episodes;
  const recent = rest.slice(0, 6);

  return (
    <div className="flex flex-col gap-16">
      {/* Intro */}
      <section className="flex flex-col gap-3">
        <h1 className="text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
          {siteConfig.name}
        </h1>
        <p className="max-w-2xl text-lg text-stone-600">{siteConfig.tagline}</p>
      </section>

      {/* Featured: latest episode */}
      {featured ? (
        <section>
          <h2 className="mb-5 text-sm font-medium uppercase tracking-wide text-stone-500">
            Latest episode
          </h2>
          <article className="flex flex-col gap-6 overflow-hidden rounded-2xl border border-stone-200 bg-white p-6 sm:flex-row sm:p-8">
            {featured.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={featured.image}
                alt=""
                className="aspect-square w-full max-w-[220px] flex-shrink-0 self-start rounded-xl object-cover"
              />
            )}
            <div className="flex flex-col gap-3">
              {featured.displayDate && (
                <time className="text-xs font-medium uppercase tracking-wide text-stone-400">
                  {featured.displayDate}
                </time>
              )}
              <h3 className="text-2xl font-semibold leading-tight text-stone-900">
                {featured.title}
              </h3>
              {featured.description && (
                <p className="text-base leading-relaxed text-stone-600">
                  {excerpt(featured.description, 320)}
                </p>
              )}
              {featured.link && (
                <a
                  href={featured.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex w-fit items-center rounded-full bg-accent px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
                >
                  Listen now →
                </a>
              )}
            </div>
          </article>
        </section>
      ) : (
        <FeedNotice error={error} />
      )}

      {/* Recent episodes */}
      {recent.length > 0 && (
        <section>
          <h2 className="mb-5 text-sm font-medium uppercase tracking-wide text-stone-500">
            More episodes
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recent.map((episode) => (
              <EpisodeCard key={episode.id} episode={episode} />
            ))}
          </div>
        </section>
      )}

      {/* Listen on */}
      <section>
        <ListenLinks heading="Listen on" />
      </section>
    </div>
  );
}
