import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import ContactForm from "./ContactForm";
import { ZigZag } from "@/components/Decorations";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${siteConfig.name}.`,
};

export default function ContactPage() {
  return (
    <div className="flex max-w-xl flex-col gap-8">
      <section>
        <h1 className="display text-5xl uppercase text-ink">
          <span className="text-orange">Holler</span> at us
        </h1>
        <ZigZag className="mt-3 h-5 w-48 text-purple" />
        <p className="mt-5 text-lg font-medium text-ink/80">
          Questions, guest pitches, or a failure of your own to confess? Drop us a
          line.
        </p>
      </section>

      <ContactForm />
    </div>
  );
}
