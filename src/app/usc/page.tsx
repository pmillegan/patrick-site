import Link from "next/link";
import { uscQuestions } from "@/data/usc-questions";
import { getUscAnswer } from "@/data/usc-answers";

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
  const themes = (audience === "grad" ? uscQuestions.grad : uscQuestions.undergrad)
    .slice()
    .sort((a, b) => {
      if (b.askers.length !== a.askers.length) {
        return b.askers.length - a.askers.length;
      }
      return b.questionCount - a.questionCount;
    });

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 py-14 sm:px-8">
      <header className="space-y-4">
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          USC Questions
        </h1>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex rounded-full border border-zinc-300 bg-white p-1 dark:border-zinc-700 dark:bg-zinc-900">
            <Link
              href="/usc?audience=undergrad"
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                audience === "undergrad"
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                  : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
              }`}
            >
              Undergrad Questions
            </Link>
            <Link
              href="/usc?audience=grad"
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                audience === "grad"
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                  : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
              }`}
            >
              Grad Questions
            </Link>
          </div>
          <div className="ml-auto flex flex-wrap gap-3">
            <Link
              href="/usc/submit"
              className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
            >
              Submit question
            </Link>
            <Link
              href="/usc/admin"
              className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-800 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
            >
              Admin view
            </Link>
          </div>
        </div>
      </header>

      <section className="space-y-4">
        {themes.map((theme) => (
          <article
            key={theme.id}
            className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              {theme.title}
            </p>
            <h2 className="mt-2 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              {theme.canonicalQuestion}
            </h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">{theme.summary}</p>
            <p className="mt-3 text-sm text-zinc-700 dark:text-zinc-300">
              <span className="font-medium">{theme.askers.length}</span> students asked related questions.
            </p>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{theme.askers.join(", ")}</p>

            <details className="mt-4 rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-950">
              <summary className="cursor-pointer text-sm font-medium text-zinc-800 dark:text-zinc-200">
                View source questions ({theme.questionCount})
              </summary>
              <div className="mt-4 space-y-5">
                {Object.entries(
                  theme.sources.reduce<Record<string, { question: string }[]>>((acc, source) => {
                    if (!acc[source.asker]) {
                      acc[source.asker] = [];
                    }
                    acc[source.asker].push({ question: source.question });
                    return acc;
                  }, {}),
                ).map(([asker, questions]) => (
                  <section key={asker} className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{asker}</h3>
                    <ul className="mt-3 space-y-3">
                      {questions.map(({ question }, index) => {
                        const answer = getUscAnswer(audience, asker, question);
                        return (
                        <li
                          key={`${asker}-${index}`}
                          className="text-sm leading-6 text-zinc-700 dark:text-zinc-300"
                        >
                          <p>{question}</p>
                          {answer ? (
                            <details className="mt-2 rounded-md border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-700 dark:bg-zinc-950">
                              <summary className="cursor-pointer text-xs font-medium uppercase tracking-wide text-zinc-600 dark:text-zinc-300">
                                View answer
                              </summary>
                              <p className="mt-2 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                                {answer}
                              </p>
                            </details>
                          ) : null}
                        </li>
                        );
                      })}
                    </ul>
                  </section>
                ))}
              </div>
            </details>
          </article>
        ))}
      </section>
    </main>
  );
}
