import Link from "next/link";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

type Audience = "undergrad" | "grad";

function parseAudience(value: string | string[] | undefined): Audience {
  if (value === "grad") {
    return "grad";
  }
  return "undergrad";
}

export default async function UscAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ audience?: string | string[] }>;
}) {
  const params = await searchParams;
  const audience = parseAudience(params.audience);
  const supabase = createSupabaseAdminClient();

  const { data, error } = await supabase
    .from("lecture_questions")
    .select("id, asker_name, question_text, status, created_at, is_anonymous")
    .eq("audience", audience)
    .order("created_at", { ascending: false })
    .limit(500);

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 py-14 sm:px-8">
      <header className="space-y-4">
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          USC Admin
        </h1>
        <div className="inline-flex rounded-full border border-zinc-300 bg-white p-1 dark:border-zinc-700 dark:bg-zinc-900">
          <Link
            href="/usc/admin?audience=undergrad"
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              audience === "undergrad"
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
            }`}
          >
            Undergrad
          </Link>
          <Link
            href="/usc/admin?audience=grad"
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              audience === "grad"
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
            }`}
          >
            Grad
          </Link>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-zinc-600 dark:text-zinc-300">
          <Link href="/usc" className="underline">
            Back to grouped USC view
          </Link>
          <Link href="/usc/submit" className="underline">
            Open submit form
          </Link>
        </div>
      </header>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        {error ? (
          <p className="text-sm text-red-600 dark:text-red-400">
            Could not load questions: {error.message}
          </p>
        ) : (
          <ul className="space-y-3">
            {(data ?? []).map((question) => (
              <li
                key={question.id}
                className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950"
              >
                <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                  <span>
                    {question.is_anonymous ? "Anonymous" : question.asker_name ?? "Unknown asker"}
                  </span>
                  <span>-</span>
                  <span>{new Date(question.created_at).toLocaleString()}</span>
                  <span>-</span>
                  <span className="uppercase">{question.status}</span>
                </div>
                <p className="mt-2 text-sm leading-6 text-zinc-800 dark:text-zinc-200">
                  {question.question_text}
                </p>
              </li>
            ))}
            {data && data.length === 0 ? (
              <li className="text-sm text-zinc-600 dark:text-zinc-300">No questions submitted yet.</li>
            ) : null}
          </ul>
        )}
      </section>
    </main>
  );
}
