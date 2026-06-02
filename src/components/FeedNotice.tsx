type FeedNoticeProps = {
  /** When true, show the "feed unreachable" message; otherwise "no episodes yet". */
  error?: boolean;
};

/**
 * Friendly placeholder shown when the feed can't be loaded (error) or simply
 * has no episodes yet. Keeps the page from looking broken in either case.
 */
export default function FeedNotice({ error = false }: FeedNoticeProps) {
  return (
    <div className="rounded-xl border border-dashed border-stone-300 bg-white/50 px-6 py-12 text-center">
      <p className="text-base font-medium text-stone-700">
        {error ? "We couldn't load episodes right now." : "No episodes yet."}
      </p>
      <p className="mx-auto mt-2 max-w-md text-sm text-stone-500">
        {error
          ? "The podcast feed seems to be unreachable at the moment. Please check back again shortly."
          : "We're just getting started — the first episode is on its way. Subscribe on your favorite platform to be the first to hear it."}
      </p>
    </div>
  );
}
