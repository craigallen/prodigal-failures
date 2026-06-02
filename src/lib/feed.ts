import Parser from "rss-parser";
import { siteConfig } from "@/config/site";

// ---------------------------------------------------------------------------
// RSS feed loading.
//
// We parse the podcast's RSS feed server-side and normalize it into a small,
// UI-friendly shape. The feed is fetched with Next.js caching enabled and
// revalidated hourly (see REVALIDATE_SECONDS), so the site stays fast and
// doesn't refetch the feed on every request.
//
// If the feed is unreachable or malformed, we never throw to the page — we
// return an empty list plus an `error` flag so the UI can show a friendly
// message instead of crashing.
// ---------------------------------------------------------------------------

export const REVALIDATE_SECONDS = 3600; // re-fetch the feed at most once an hour

export type Episode = {
  id: string;
  title: string;
  description: string; // plain-text, HTML stripped
  /** Publish date as an ISO string (or null if the feed omitted it). */
  isoDate: string | null;
  /** Pre-formatted, human-readable date for display. */
  displayDate: string;
  /** Episode-specific artwork URL, falling back to the show artwork. */
  image: string | null;
  /** Where to listen — the episode page link, falling back to the audio URL. */
  link: string | null;
};

export type FeedResult = {
  /** Show title from the feed channel (falls back to the configured name). */
  podcastTitle: string;
  /** Show-level artwork, used as a fallback for episodes without their own. */
  podcastImage: string | null;
  episodes: Episode[];
  /** True when the feed could not be loaded/parsed. */
  error: boolean;
};

// rss-parser maps common iTunes podcast fields (image, summary, etc.) onto an
// `itunes` object for both the feed channel and each item by default. We declare
// those extra fields here so they're visible to TypeScript.
type FeedExtra = { itunes?: { image?: string } };
type ItemExtra = { itunes?: { image?: string; summary?: string } };

const parser = new Parser<FeedExtra, ItemExtra>();

function stripHtml(input: string | undefined | null): string {
  if (!input) return "";
  return input
    .replace(/<[^>]*>/g, " ") // drop tags
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function formatDate(isoDate: string | null): string {
  if (!isoDate) return "";
  const d = new Date(isoDate);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/** Truncate a description to a short, card-friendly excerpt. */
export function excerpt(text: string, maxLength = 180): string {
  if (text.length <= maxLength) return text;
  const sliced = text.slice(0, maxLength);
  const lastSpace = sliced.lastIndexOf(" ");
  return `${sliced.slice(0, lastSpace > 0 ? lastSpace : maxLength).trim()}…`;
}

export async function getFeed(): Promise<FeedResult> {
  try {
    // Fetch the raw XML ourselves so we can use Next's fetch caching /
    // revalidation, then hand the string to rss-parser.
    const res = await fetch(siteConfig.feedUrl, {
      next: { revalidate: REVALIDATE_SECONDS },
      headers: { "User-Agent": "ProdigalFailuresSite/1.0 (+rss-reader)" },
    });

    if (!res.ok) {
      throw new Error(`Feed request failed with status ${res.status}`);
    }

    const xml = await res.text();
    const feed = await parser.parseString(xml);

    const podcastImage =
      feed.itunes?.image ?? feed.image?.url ?? null;

    const episodes: Episode[] = (feed.items ?? []).map((item, index) => {
      const isoDate = item.isoDate ?? null;
      const description = stripHtml(
        item.contentSnippet ??
          item.itunes?.summary ??
          (item.content as string | undefined) ??
          ""
      );

      return {
        id: item.guid ?? item.link ?? `${index}`,
        title: (item.title ?? "Untitled episode").trim(),
        description,
        isoDate,
        displayDate: formatDate(isoDate),
        image: item.itunes?.image ?? podcastImage,
        link: item.link ?? item.enclosure?.url ?? null,
      };
    });

    return {
      podcastTitle: feed.title ?? siteConfig.name,
      podcastImage,
      episodes,
      error: false,
    };
  } catch (err) {
    // Log for server-side visibility, but never crash the page.
    console.error("Failed to load podcast feed:", err);
    return {
      podcastTitle: siteConfig.name,
      podcastImage: null,
      episodes: [],
      error: true,
    };
  }
}
