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
  tagline: "Unpacking the faith that raised us — one episode at a time.",

  /** Longer description used for SEO / metadata. */
  description:
    "Prodigal Failures is an honest, funny podcast about growing up evangelical, deconstructing faith, and who we became after we left.",

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
    { name: "YouTube", href: "https://youtube.com/@prodigalfailures" },
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
    name: "Andy",
    image: "/hosts/andy.svg",
    bio:
      "Andy is one half of Prodigal Failures. This is placeholder bio " +
      "text — replace it with Andy's real introduction. Add a couple of " +
      "sentences about who he is, why he co-hosts the show, and his particular " +
      "brand of cautionary tale.",
  },
  {
    name: "Craig",
    image: "/hosts/craig.svg",
    bio:
      "Craig grew up as a third-generation kid in a a baptist church from the time he was born, surrounded by his extended family. " + 
      "He went on missions trips, led worship in youth group and Sunday mornings, and even met his wife in the church he was raised in. " + 
      "Now he's figuring out how to work through the religious wounds of his youth that caused him to walk away from his early beliefs.",
  },
] as const;

export type Platform = (typeof siteConfig.platforms)[number];
export type Host = (typeof hosts)[number];
