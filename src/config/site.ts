// ---------------------------------------------------------------------------
// SITE CONFIG — edit everything site-wide from this one file.
// ---------------------------------------------------------------------------
// This is the single source of truth for editable content:
//   - podcast name + tagline
//   - the RSS feed URL episodes are pulled from
//   - "Listen on" distribution platform links (header/footer/home)
//   - host bios shown on the /about page
//
// You should rarely need to touch anything outside this file for routine
// content updates.
// ---------------------------------------------------------------------------

export const siteConfig = {
  /** Podcast name — shown in the header logo, footer, and page titles. */
  name: "Prodigal Failures",

  /** One-line tagline shown under the name on the home page. */
  tagline: "Honest conversations about the lessons hiding inside our worst ideas.",

  /** Longer description used for SEO / metadata. */
  description:
    "Prodigal Failures is a podcast about the missteps, dead ends, and glorious flops that taught us more than any success ever could.",

  /**
   * The podcast RSS feed URL. Episodes (titles, descriptions, artwork, dates,
   * and listen links) are parsed from this feed server-side.
   *
   * To change the feed, just replace the URL below.
   */
  feedUrl: "https://media.rss.com/prodigal-failures/feed.xml",

  /**
   * "Listen on" links to distribution platforms.
   * These are placeholders — replace `href` values with your real show pages.
   * Order here is the order they render in.
   */
  platforms: [
    { name: "Apple Podcasts", href: "https://podcasts.apple.com/" },
    { name: "Spotify", href: "https://open.spotify.com/" },
    { name: "YouTube", href: "https://youtube.com/" },
    { name: "RSS.com", href: "https://media.rss.com/prodigal-failures/feed.xml" },
  ],
} as const;

// ---------------------------------------------------------------------------
// HOST BIOS — shown on /about. Edit text + headshot image paths here.
// Headshots live in /public (so e.g. "/hosts/craig.svg" => public/hosts/craig.svg).
// Drop in real images and update the `image` path to match.
// ---------------------------------------------------------------------------

export const hosts = [
  {
    name: "Craig",
    image: "/hosts/craig.svg",
    bio:
      "Craig is one half of Prodigal Failures. This is placeholder bio text — " +
      "replace it with Craig's real introduction. A sentence or two about his " +
      "background, what he brings to the show, and the kind of failures he's " +
      "most qualified to talk about goes a long way here.",
  },
  {
    name: "Andy",
    image: "/hosts/andy.svg",
    bio:
      "Andy is the other half of Prodigal Failures. This is placeholder bio " +
      "text — replace it with Andy's real introduction. Add a couple of " +
      "sentences about who he is, why he co-hosts the show, and his particular " +
      "brand of cautionary tale.",
  },
] as const;

export type Platform = (typeof siteConfig.platforms)[number];
export type Host = (typeof hosts)[number];
