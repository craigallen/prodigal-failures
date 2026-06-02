import { getFeed, excerpt } from "@/lib/feed";
import { siteConfig } from "@/config/site";
import EpisodeCard from "@/components/EpisodeCard";
import ListenLinks from "@/components/ListenLinks";
import FeedNotice from "@/components/FeedNotice";
import { Squiggle, ZigZag, Dots, Triangle, Star, Blob } from "@/components/Decorations";

// Revalidate this page hourly, matching the feed cache (see src/lib/feed.ts).
export const revalidate = 3600;

export default async function HomePage() {
  const { episodes, error } = await getFeed();

  const [featured, ...rest] = episodes;
  const recent = rest.slice(0, 6);

  return (
    <div className="flex flex-col gap-16">
      {/* Hero */}
      <section className="relative isolate overflow-visible pt-2">
        {/* Scattered Memphis confetti */}
        <Blob className="pointer-events-none absolute -left-10 -top-6 -z-10 h-20 w-20 text-yellow opacity-90" />
        <Dots className="pointer-events-none absolute right-2 top-0 -z-10 h-16 w-16 text-purple" />
        <Triangle className="pointer-events-none absolute -right-4 bottom-10 -z-10 h-12 w-12 text-teal" />
        <Star className="pointer-events-none absolute left-1/2 -top-4 -z-10 hidden h-12 w-12 text-magenta sm:block" />

        <h1 className="display text-5xl uppercase leading-[0.95] text-ink sm:text-7xl">
          <span className="text-magenta">Prodigal</span>{" "}
          <span className="text-purple">Failures</span>
        </h1>
        <ZigZag className="mt-3 h-5 w-56 text-orange" />
        <p className="mt-5 max-w-2xl text-lg font-medium text-ink/80">
          {siteConfig.tagline}
        </p>
      </section>

      {/* Featured: latest episode */}
      {featured ? (
        <section>
          <h2 className="display mb-5 inline-flex items-center gap-2 text-sm uppercase tracking-wide text-ink">
            <Squiggle className="h-4 w-12 text-teal" />
            Latest episode
          </h2>
          <article className="panel flex flex-col gap-6 p-6 sm:flex-row sm:p-8">
            {featured.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={featured.image}
                alt=""
                className="aspect-square w-full max-w-[220px] flex-shrink-0 self-start rounded-xl border-[3px] border-ink object-cover shadow-[5px_5px_0_0_var(--color-ink)]"
              />
            )}
            <div className="flex flex-col gap-3">
              {featured.displayDate && (
                <span className="tag w-fit bg-yellow">{featured.displayDate}</span>
              )}
              <h3 className="display text-2xl leading-tight text-ink sm:text-3xl">
                {featured.title}
              </h3>
              {featured.description && (
                <p className="text-base font-medium leading-relaxed text-ink/75">
                  {excerpt(featured.description, 320)}
                </p>
              )}
              {featured.link && (
                <a
                  href={featured.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn mt-1 w-fit bg-magenta text-white"
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
          <h2 className="display mb-5 inline-flex items-center gap-2 text-sm uppercase tracking-wide text-ink">
            <Squiggle className="h-4 w-12 text-magenta" />
            More episodes
          </h2>
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {recent.map((episode, i) => (
              <EpisodeCard key={episode.id} episode={episode} index={i} />
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
