"use client";

import { useActionState } from "react";
import { siteConfig } from "@/lib/site";

type SubscribeState = {
  status: "idle" | "success" | "error";
  message: string;
};

const initialState: SubscribeState = { status: "idle", message: "" };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// The site is a static export (GitHub Pages), so the form posts straight to Formspree from the browser.
async function subscribe(_prev: SubscribeState, formData: FormData): Promise<SubscribeState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
    return { status: "error", message: "Unesi ispravnu email adresu." };
  }

  if (!siteConfig.formspreeId) {
    return { status: "error", message: "Prijava trenutno nije moguća. Pokušaj kasnije." };
  }

  try {
    const res = await fetch(`https://formspree.io/f/${siteConfig.formspreeId}`, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: formData,
    });
    if (!res.ok) throw new Error(`Formspree ${res.status}`);
    return { status: "success", message: "Hvala na prijavi! Javljam se uskoro." };
  } catch {
    return { status: "error", message: "Nešto nije u redu. Pokušaj ponovo." };
  }
}

export default function NewsletterForm() {
  const [state, formAction, pending] = useActionState(subscribe, initialState);

  return (
    <div>
      <form
        action={formAction}
        // Remount on success so the input clears
        key={state.status === "success" ? state.message : "form"}
        className="flex flex-col gap-3 bg-white p-3 sm:flex-row sm:items-center"
      >
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="Unesi svoj email"
          aria-label="Email adresa"
          disabled={pending}
          className="min-w-0 flex-1 bg-transparent px-5 py-4 text-lg text-[#2b2c30] placeholder:text-[#2b2c30]/70 focus:outline-none"
        />
        {/* Honeypot: Formspree silently drops submissions that fill "_gotcha" */}
        <input
          type="text"
          name="_gotcha"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          className="absolute -left-[9999px] h-0 w-0 opacity-0"
        />
        <button
          type="submit"
          disabled={pending}
          className="bg-[#2b2c30] px-6 py-5 text-lg font-medium text-white transition-opacity hover:opacity-85 disabled:opacity-60"
        >
          {pending ? "Šaljem…" : "Prijavi se"}
        </button>
      </form>

      <p className="mt-6 text-[15px] text-[#ededea]/75">
        Prijavom pristaješ da povremeno dobijaš vesti i nove postove sa bloga.
      </p>
      <p
        aria-live="polite"
        className={`mt-2 min-h-6 text-[15px] font-medium ${
          state.status === "error" ? "text-[#ff8a70]" : "text-[#9be7a8]"
        }`}
      >
        {state.message}
      </p>
    </div>
  );
}
