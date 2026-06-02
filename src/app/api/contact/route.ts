import { NextResponse } from "next/server";
import { Resend } from "resend";

// ---------------------------------------------------------------------------
// Contact form API route.
//
// This is a PLACEHOLDER implementation. It validates the incoming form data
// and is wired up to send via Resend's official Node SDK, but you MUST finish
// the two TODOs below before email will actually be delivered:
//
//   1. Set RESEND_API_KEY in your environment (.env.local locally, and in the
//      Vercel project settings for production — see README).
//   2. Set a verified `from` address and your destination `to` address.
//
// Resend Node SDK docs: https://resend.com/docs/send-with-nodejs
// ---------------------------------------------------------------------------

export async function POST(request: Request) {
  let body: { name?: string; email?: string; message?: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const message = body.message?.trim();

  // Basic server-side validation.
  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are all required." },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Misconfiguration: don't pretend the message was sent.
    console.error("RESEND_API_KEY is not set — cannot send contact email.");
    return NextResponse.json(
      { error: "The contact form isn't configured yet. Please try again later." },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);

  try {
    // -----------------------------------------------------------------------
    // TODO: Finish configuring the send.
    //
    // - `from` MUST be an address on a domain you've verified in Resend.
    //   Until your domain is verified you can use Resend's onboarding sender
    //   "onboarding@resend.dev" for testing.
    // - `to` should be the inbox where you want contact messages delivered.
    //
    // The call below follows the current Resend Node SDK API
    // (resend.emails.send -> { data, error }). Verify against the docs if it
    // ever changes: https://resend.com/docs/send-with-nodejs
    // -----------------------------------------------------------------------
    const { data, error } = await resend.emails.send({
      from: "Prodigal Failures <onboarding@resend.dev>", // TODO: replace with your verified sender
      to: ["you@example.com"], // TODO: replace with your destination inbox
      replyTo: email,
      subject: `New contact form message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    if (error) {
      console.error("Resend returned an error:", error);
      return NextResponse.json(
        { error: "We couldn't send your message. Please try again later." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, id: data?.id ?? null }, { status: 200 });
  } catch (err) {
    console.error("Failed to send contact email:", err);
    return NextResponse.json(
      { error: "We couldn't send your message. Please try again later." },
      { status: 500 }
    );
  }
}
