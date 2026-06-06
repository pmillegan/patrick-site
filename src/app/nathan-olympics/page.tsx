import type { Metadata } from "next";
import OlympicsApp from "@/components/nathan-olympics/olympics-app";
import { olympicsEvents, sessionLabels, sessionOrder } from "@/data/nathan-olympics-events";

const title = "Nathan Olympics";

const description =
  "Scorekeeper and leaderboard for the Nathan Olympics — teams, events, and box scores.";

export const metadata: Metadata = {
  title,
  description,
  robots: { index: false, follow: false },
};

export default function NathanOlympicsPage() {
  const eventCount = olympicsEvents.length;

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-4 px-3 pb-7 pt-4 sm:px-4">
      <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-6">
        <div className="space-y-3">
          <p className="text-sm font-medium uppercase tracking-wider text-amber-600 dark:text-amber-400">
            🏅 Team competition
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            Nathan Olympics
          </h1>
          <p className="max-w-2xl text-base leading-7 text-zinc-700 dark:text-zinc-300">
            Set up teams of five, score {eventCount} events across the day, and
            track the leaderboard in real time. Morning basketball and cornhole
            pay out big — evening rage cage too — while the rest of the slate
            runs 5 / 3 / 1. Nathan Jeopardy uses custom scoring.
          </p>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {sessionOrder.map((session) => {
            const count = olympicsEvents.filter(
              (e) => e.session === session,
            ).length;
            if (count === 0) return null;
            return (
              <div
                key={session}
                className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-800/50"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  {sessionLabels[session]}
                </p>
                <p className="mt-1 text-2xl font-semibold tabular-nums text-zinc-900 dark:text-zinc-100">
                  {count}
                </p>
                <p className="text-xs text-zinc-500">events</p>
              </div>
            );
          })}
        </div>
      </section>

      <OlympicsApp />
    </main>
  );
}
