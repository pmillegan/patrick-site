import Link from "next/link";

export default function UscThankYouPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-6 py-14 sm:px-8">
      <section className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          Thanks for your question
        </h1>
        <p className="text-zinc-700 dark:text-zinc-300">
          Your submission was received. I appreciate you sending it in.
        </p>
        <div className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
          <p className="font-medium text-zinc-900 dark:text-zinc-100">Stay in touch</p>
          <p>Email: PatrickMillegan@gmail.com</p>
          <p>
            LinkedIn:{" "}
            <a
              href="https://linkedin.com/in/pmillegan"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              linkedin.com/in/pmillegan
            </a>
          </p>
          <p>
            Twitter:{" "}
            <a href="https://x.com/pmillegan" target="_blank" rel="noreferrer" className="underline">
              x.com/pmillegan
            </a>
          </p>
        </div>
        <div className="pt-2">
          <Link href="/usc" className="text-sm underline text-zinc-700 dark:text-zinc-300">
            Back to USC questions
          </Link>
        </div>
      </section>
    </main>
  );
}
