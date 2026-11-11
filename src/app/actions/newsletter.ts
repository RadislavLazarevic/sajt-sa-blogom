"use server";

import { Resend } from "resend";

export type SubscribeState = {
  status: "idle" | "success" | "error";
  message: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function subscribe(
  _prevState: SubscribeState,
  formData: FormData,
): Promise<SubscribeState> {
  // Honeypot: real users never see or fill this field
  if (formData.get("company")) {
    return { status: "success", message: "Hvala na prijavi!" };
  }

  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
    return { status: "error", message: "Unesi ispravnu email adresu." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NEWSLETTER_TO;
  if (!apiKey || !to) {
    console.error("Newsletter: RESEND_API_KEY ili NEWSLETTER_TO nije podešen.");
    return { status: "error", message: "Prijava trenutno nije moguća. Pokušaj kasnije." };
  }

  const resend = new Resend(apiKey);
  const segmentId = process.env.NEWSLETTER_SEGMENT_ID;

  // 1. Save the subscriber as a Resend contact (optionally in a segment)
  const { error: contactError } = await resend.contacts.create({
    email,
    unsubscribed: false,
    ...(segmentId && { segments: [{ id: segmentId }] }),
  });

  if (contactError) {
    if (/already exists/i.test(contactError.message)) {
      return { status: "success", message: "Već si prijavljen. Hvala!" };
    }
    console.error("Newsletter: Resend greška pri čuvanju kontakta", contactError);
    return { status: "error", message: "Nešto nije u redu. Pokušaj ponovo." };
  }

  // 2. Notify the owner. The contact is already saved, so a failure here is only logged.
  const { error: emailError } = await resend.emails.send({
    from: process.env.NEWSLETTER_FROM ?? "Newsletter <onboarding@resend.dev>",
    to,
    replyTo: email,
    subject: "Novi pretplatnik na newsletter",
    text: `Novi pretplatnik: ${email}\nVreme: ${new Date().toISOString()}`,
  });

  if (emailError) {
    console.error("Newsletter: Resend greška pri slanju obaveštenja", emailError);
  }

  return { status: "success", message: "Hvala na prijavi! Javljam se uskoro." };
}
