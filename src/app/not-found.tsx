import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-16 text-center">
      <h1 className="text-4xl font-semibold tracking-tight">Stranica nije pronađena</h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        Stranica koju tražite ne postoji ili je premeštena.
      </p>
      <Link href="/" className="mt-8 inline-block font-medium underline underline-offset-4">
        Nazad na početnu
      </Link>
    </div>
  );
}
