# Prodigal Failures

A simple, minimal podcast website built with **Next.js (App Router)**, **TypeScript**,
and **Tailwind CSS**. Episodes are pulled live from the show's RSS feed; there's an
About page, a full Archive, and a Resend-powered contact form.

- **Home** (`/`) — featured latest episode, recent episodes, and "Listen on" links.
- **About** (`/about`) — host bios for Craig and Andy.
- **Archive** (`/archive`) — every episode from the feed, newest first.
- **Contact** (`/contact`) — contact form that posts to an API route (Resend).

---

## Quick edits — where things live

Almost everything you'll want to change routinely lives in **one file**:

### `src/config/site.ts`

| What | Where in the config |
| --- | --- |
| Podcast name | `siteConfig.name` |
| Tagline | `siteConfig.tagline` |
| SEO description | `siteConfig.description` |
| **RSS feed URL** | `siteConfig.feedUrl` |
| "Listen on" platform links | `siteConfig.platforms` (edit the `href`s) |
| **Host bios (Craig & Andy)** | `hosts` array — `name`, `image`, `bio` |

### Host headshots

Bio images live in `public/hosts/` (currently `craig.svg` and `andy.svg`,
placeholders). To use real photos, drop image files into `public/hosts/` and point
each host's `image` field in `src/config/site.ts` at them, e.g. `/hosts/craig.jpg`.

---

## Adding / changing the RSS feed URL

The site reads all episode data (titles, descriptions, artwork, dates, listen links)
from a single RSS feed. To change it, edit **`siteConfig.feedUrl`** in
`src/config/site.ts`:

```ts
feedUrl: "https://media.rss.com/prodigal-failures/feed.xml",
```

The feed is fetched server-side and cached, revalidating **once per hour**
(`REVALIDATE_SECONDS` in `src/lib/feed.ts`). If the feed is unreachable or has no
episodes yet, the site shows a friendly message instead of crashing.

---

## The contact form & Resend API key

The contact form (`/contact`) posts JSON to `src/app/api/contact/route.ts`, which
sends email via [Resend](https://resend.com).

### Where to put the Resend API key

- **Locally:** put it in `.env.local` (gitignored — never committed):

  ```bash
  RESEND_API_KEY=your_real_key_here
  ```

  (`.env.example` documents the variables; copy it with `cp .env.example .env.local`.)

- **On Vercel:** add it in **Project Settings → Environment Variables** (see Deploy
  below).

### Finishing the send (two TODOs)

`src/app/api/contact/route.ts` is wired up but intentionally left as a scaffold.
Before email is actually delivered, edit the `resend.emails.send(...)` call:

1. **`from`** — must be an address on a domain you've verified in Resend. For testing
   you can use Resend's `onboarding@resend.dev`.
2. **`to`** — the inbox where you want contact messages delivered.

Reference: <https://resend.com/docs/send-with-nodejs>

---

## Run locally

Requires Node 18.18+ (Node 20+ recommended).

```bash
npm install
cp .env.example .env.local   # then add your RESEND_API_KEY
npm run dev
```

Open <http://localhost:3000>.

Other scripts:

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

---

## Deploy to Vercel

You have two options. Either works — pick one.

### Option A — Push to Git and import in the Vercel dashboard (recommended)

1. Push this repo to GitHub/GitLab/Bitbucket.
2. Go to <https://vercel.com/new> and **Import** the repository.
3. Vercel auto-detects Next.js — leave the build settings at their defaults and click
   **Deploy**.
4. **Add the environment variable:** in your new project, go to
   **Settings → Environment Variables**, add **`RESEND_API_KEY`** with your key, select
   the environments (Production, Preview, Development), and **Save**. Redeploy so the
   new variable is picked up (**Deployments → ⋯ → Redeploy**, or push a new commit).

### Option B — Vercel CLI

```bash
npm i -g vercel
vercel            # links/creates the project and deploys a preview
vercel --prod     # deploys to production
```

Add the API key via CLI (or in the dashboard as in Option A):

```bash
vercel env add RESEND_API_KEY
```

You'll be prompted for the value and which environments it applies to. Run
`vercel --prod` again afterward so production picks it up.

> Reminder: `.env.local` is **not** uploaded to Vercel — production reads its
> environment variables from the Vercel project settings, so the key must be added
> there regardless of which option you choose.
