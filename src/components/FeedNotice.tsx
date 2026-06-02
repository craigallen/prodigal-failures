import { Star, Triangle } from "./Decorations";

type FeedNoticeProps = {
  error?: boolean;
};

/**
 * Friendly placeholder shown when the feed can't be loaded (error) or simply
 * has no episodes yet. Keeps the page from looking broken in either case.
 */
export default function FeedNotice({ error = false }: FeedNoticeProps) {
  return (
    <div className="panel relative overflow-hidden px-6 py-14 text-center">
      <Star className="absolute -left-3 -top-3 h-14 w-14 text-yellow" />
      <Triangle className="absolute -bottom-2 right-4 h-12 w-12 text-teal" />
      <p className="display text-2xl uppercase text-ink">
        {error ? "Signal lost!" : "Coming soon!"}
      </p>
      <p className="mx-auto mt-3 max-w-md text-sm font-medium text-ink/70">
        {error
          ? "We couldn't reach the podcast feed right now. Rewind and try again in a bit."
          : "We're just getting started — episode one is on its way. Hit a platform below to subscribe and be first in line."}
      </p>
    </div>
  );
}
