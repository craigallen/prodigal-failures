"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Handle submission with React state + fetch (no native HTML form submit).
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  }

  const inputClasses =
    "w-full rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-stone-900 outline-none transition-colors placeholder:text-stone-400 focus:border-accent focus:ring-1 focus:ring-accent";

  if (status === "success") {
    return (
      <div className="rounded-xl border border-stone-200 bg-white p-6">
        <p className="text-base font-medium text-stone-900">Thanks — message sent!</p>
        <p className="mt-1 text-sm text-stone-600">
          We&apos;ll get back to you as soon as we can.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm font-medium text-accent hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-sm font-medium text-stone-700">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoComplete="name"
          className={inputClasses}
          placeholder="Your name"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-medium text-stone-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          className={inputClasses}
          placeholder="you@example.com"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-medium text-stone-700">
          Message
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={6}
          className={`${inputClasses} resize-y`}
          placeholder="What's on your mind?"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600" role="alert">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex w-fit items-center rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
