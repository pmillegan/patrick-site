import type { Metadata } from "next";
import Scorekeeper from "@/components/crokinole/scorekeeper";

const description =
  "Crokinole scorekeeper: track rounds, totals, and game history for conventional (play to 100) and tournament (4-round, 2/1/0) play.";

export const metadata: Metadata = {
  title: "Crokinole",
  description,
  alternates: {
    canonical: "/crokinole",
  },
  openGraph: {
    title: "Crokinole",
    description,
    url: "/crokinole",
  },
  twitter: {
    description,
  },
};

export default function CrokinolePage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-4 px-3 pb-7 pt-4 sm:px-4">
      <header className="space-y-3">
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          Crokinole
        </h1>
        <p className="max-w-3xl text-base leading-7 text-zinc-700 dark:text-zinc-300">
          Score-keeping and game history for crokinole. Pick conventional (play
          to 100 with cancellation scoring) or tournament (four rounds, 2 for a
          win, 1 for a tie). Games are saved to this device.
        </p>
      </header>

      <section className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <details>
          <summary className="cursor-pointer select-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
            How scoring works
          </summary>
          <div className="mt-3 space-y-3 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
            <p>
              <strong>Zones</strong>: center hole = 20, inside the pegs = 15,
              outside the pegs = 10, outer ring = 5. A disc touching a line
              counts as the lower value. Discs on or past the shooting line are
              out and don&apos;t score.
            </p>
            <p>
              <strong>20s</strong> are removed from the board as they&apos;re
              made and added to a side&apos;s round total at the end.
            </p>
            <p>
              <strong>Conventional play (cancellation)</strong>: at the end of
              each round, subtract the lower side&apos;s board points from the
              higher side&apos;s. The winner of the round banks the difference.
              First to 100 (or the target you set) wins.
            </p>
            <p>
              <strong>Tournament play</strong>: each round is worth 2 points —
              winner gets 2, loser 0, ties split 1-1. A match is typically 4
              rounds; high score wins.
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-500">
              Source: World Crokinole Championship and Crokinole Depot rules.
            </p>
          </div>
        </details>
      </section>

      <Scorekeeper />
    </main>
  );
}
