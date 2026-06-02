import type { Metadata } from "next";
import { hosts, siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "About",
  description: `Meet the hosts of ${siteConfig.name}.`,
};

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-12">
      <section className="flex flex-col gap-3">
        <h1 className="text-4xl font-bold tracking-tight text-stone-900">About</h1>
        <p className="max-w-2xl text-lg text-stone-600">
          {siteConfig.name} is hosted by Craig and Andy. Here&apos;s a little about
          each of them.
        </p>
      </section>

      <section className="flex flex-col gap-10">
        {hosts.map((host) => (
          <article
            key={host.name}
            className="flex flex-col gap-6 sm:flex-row sm:items-start"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={host.image}
              alt={`${host.name} headshot placeholder`}
              className="h-32 w-32 flex-shrink-0 rounded-full border border-stone-200 object-cover"
            />
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-semibold text-stone-900">{host.name}</h2>
              <p className="max-w-2xl leading-relaxed text-stone-600">{host.bio}</p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
