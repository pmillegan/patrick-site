import Link from "next/link";
import UscEngagementCard from "@/components/usc/engagement-card";
import UscThemesSection from "@/components/usc/usc-themes-section";

type Audience = "undergrad" | "grad";

function audienceFromParam(value: string | string[] | undefined): Audience {
  if (value === "grad") {
    return "grad";
  }
  return "undergrad";
}

export default async function UscQuestionsPage({
  searchParams,
}: {
  searchParams: Promise<{ audience?: string | string[] }>;
}) {
  const params = await searchParams;
  const audience = audienceFromParam(params.audience);

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-4 px-3 pb-7 pt-4 sm:px-4">
      <UscEngagementCard photoLayout="both" />

      <header className="space-y-4">
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          USC Questions
        </h1>
        <div className="flex w-full flex-wrap items-center gap-3">
          <div className="flex w-full rounded-full border border-zinc-300 bg-white p-1 dark:border-zinc-700 dark:bg-zinc-900">
            <Link
              href="/usc?audience=undergrad"
              className={`flex flex-1 items-center justify-center rounded-full px-4 py-2 text-center text-sm font-medium transition ${
                audience === "undergrad"
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                  : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
              }`}
            >
              Undergrad Questions
            </Link>
            <Link
              href="/usc?audience=grad"
              className={`flex flex-1 items-center justify-center rounded-full px-4 py-2 text-center text-sm font-medium transition ${
                audience === "grad"
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                  : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
              }`}
            >
              Grad Questions
            </Link>
          </div>
        </div>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Direct links:{" "}
          <Link href="/usc-undergrad" className="font-medium underline hover:text-zinc-900 dark:hover:text-zinc-200">
            Undergrad only
          </Link>
          {" · "}
          <Link href="/usc-grad" className="font-medium underline hover:text-zinc-900 dark:hover:text-zinc-200">
            Grad only
          </Link>
        </p>
      </header>

      <UscThemesSection audience={audience} />

      {audience === "undergrad" ? (
        <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex justify-center sm:justify-end">
            <Link
              href="/darkvoid"
              className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-800 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
            >
              Darkvoid
            </Link>
          </div>
        </section>
      ) : null}
    </main>
  );
}
