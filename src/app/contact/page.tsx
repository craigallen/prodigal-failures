import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${siteConfig.name}.`,
};

export default function ContactPage() {
  return (
    <div className="flex max-w-xl flex-col gap-8">
      <section className="flex flex-col gap-3">
        <h1 className="text-4xl font-bold tracking-tight text-stone-900">Contact</h1>
        <p className="text-lg text-stone-600">
          Questions, guest pitches, or a failure of your own to confess? Send us a
          note.
        </p>
      </section>

      <ContactForm />
    </div>
  );
}
