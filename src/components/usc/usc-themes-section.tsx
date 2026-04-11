import { getUscAnswer } from "@/data/usc-answers";
import { uscQuestions } from "@/data/usc-questions";

type Audience = "undergrad" | "grad";

export default function UscThemesSection({ audience }: { audience: Audience }) {
  const themes = (audience === "grad" ? uscQuestions.grad : uscQuestions.undergrad)
    .slice()
    .sort((a, b) => {
      if (b.askers.length !== a.askers.length) {
        return b.askers.length - a.askers.length;
      }
      return b.questionCount - a.questionCount;
    });

  return (
    <section className="space-y-4">
      {themes.map((theme) => (
        <article
          key={theme.id}
          className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            {theme.title}
          </p>
          <h2 className="mt-2 text-xl font-semibold text-zinc-900 dark:text-zinc-100">{theme.canonicalQuestion}</h2>
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
                <section
                  key={asker}
                  className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{asker}</h3>
                  <ul className="mt-3 space-y-3">
                    {questions.map(({ question }, index) => {
                      const answer = getUscAnswer(audience, asker, question);
                      return (
                        <li key={`${asker}-${index}`} className="text-sm leading-6 text-zinc-700 dark:text-zinc-300">
                          <p>{question}</p>
                          {answer ? (
                            <details className="mt-2 rounded-md border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-700 dark:bg-zinc-950">
                              <summary className="cursor-pointer text-xs font-medium uppercase tracking-wide text-zinc-600 dark:text-zinc-300">
                                View answer
                              </summary>
                              <p className="mt-2 text-sm leading-6 text-zinc-700 dark:text-zinc-300">{answer}</p>
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
  );
}
